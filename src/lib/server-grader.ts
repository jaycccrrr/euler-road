// 服务端 AI 判卷（识图 + 文本），供答题提交接口与每日一题共用
// 判卷链路：识图判卷（视觉模型）→ 文本 AI 判卷（DeepSeek）→ 返回 null 由调用方降级

// 判卷图片限制：防止超大 base64 打爆内存和视觉 API 账单
export const MAX_GRADING_IMAGES = 4;
export const MAX_GRADING_IMAGE_LENGTH = 2_000_000; // base64 字符数，约 1.5MB

/**
 * 校验并清洗判卷图片数组。
 * 只接受 data:image/* 或 https? URL，超限/非法的条目被丢弃。
 */
export function sanitizeGradingImages(images: unknown): string[] {
  if (!Array.isArray(images)) return [];
  return images
    .filter(
      (src): src is string =>
        typeof src === 'string' &&
        src.length <= MAX_GRADING_IMAGE_LENGTH &&
        (/^data:image\//i.test(src) || /^https?:\/\//i.test(src))
    )
    .slice(0, MAX_GRADING_IMAGES);
}

export interface GradingResult {
  score: number;
  feedback: string;
  isCorrect: boolean;
}

// 从 AI 返回文本中提取 JSON（兼容 markdown 代码块包裹）
export function extractJson(text: string): any {
  const cleaned = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    // 尝试截取第一个 { 到最后一个 } 之间的内容
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {
        // ignore
      }
    }
  }
  throw new Error('无法解析 AI 返回内容');
}

// 识图判卷（视觉模型，默认通义千问 Qwen3-VL-Plus；未配置 Key 或无图片时返回 null）
export async function gradeWithVision(
  question: { title: string; content: string; answer?: string | null },
  content: string,
  images: string[]
): Promise<GradingResult | null> {
  const apiKey = process.env.VISION_API_KEY;
  if (!apiKey || !images?.length) return null;

  try {
    const model = process.env.VISION_MODEL || 'qwen-vl-plus';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    const res = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [
          {
            role: 'system',
            content:
              '你是数学作业批改助手。请根据题目、参考答案和学生作答（可能包含手写图片），严格返回 JSON：{"score": 0到100的整数, "isCorrect": 是否判对, "feedback": "简短中文评语"}。请仔细识别图片中的手写内容与公式。不要返回其他内容。',
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `【题目】${question.title}\n${question.content}\n【参考答案】${question.answer || '无'}\n【学生文字作答】${content || '（仅图片作答）'}`,
              },
              ...images.map((src) => ({
                type: 'image_url',
                image_url: { url: src },
              })),
            ],
          },
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      console.warn('识图判卷接口返回异常:', res.status, (await res.text()).slice(0, 200));
      return null;
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || '';
    const parsed = extractJson(text);
    const score = Math.max(0, Math.min(100, Number(parsed.score) || 60));
    return {
      score,
      feedback: String(parsed.feedback || '已批改完成'),
      isCorrect: typeof parsed.isCorrect === 'boolean' ? parsed.isCorrect : score >= 80,
    };
  } catch (error) {
    console.warn('识图判卷失败，降级到文本判卷:', error);
    return null;
  }
}

// 文本 AI 判卷（DeepSeek）：失败时返回 null
export async function gradeWithAI(
  question: { title: string; content: string; answer?: string | null },
  content: string
): Promise<GradingResult | null> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return null;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        temperature: 0.3,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              '你是数学作业批改助手。请根据题目、参考答案和学生答案，严格返回 JSON：{"score": 0到100的整数, "isCorrect": 是否判对, "feedback": "简短中文评语"}。不要返回其他内容。',
          },
          {
            role: 'user',
            content: `【题目】${question.title}\n${question.content}\n【参考答案】${question.answer || '无'}\n【学生答案】${content}`,
          },
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      console.warn('识图判卷接口返回异常:', res.status, (await res.text()).slice(0, 200));
      return null;
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || '';
    const parsed = extractJson(text);
    const score = Math.max(0, Math.min(100, Number(parsed.score) || 60));
    return {
      score,
      feedback: String(parsed.feedback || '已批改完成'),
      isCorrect: typeof parsed.isCorrect === 'boolean' ? parsed.isCorrect : score >= 80,
    };
  } catch (error) {
    console.warn('文本 AI 判卷失败:', error);
    return null;
  }
}

// 完整判卷链路：识图 → 文本 AI → null（调用方自行降级）
export async function gradeAnswerServer(
  question: { title: string; content: string; answer?: string | null },
  content: string,
  images: string[]
): Promise<GradingResult | null> {
  // 有图片时只走识图判卷；识图不可用/失败时返回 null，
  // 避免纯文本 AI 无视图片硬批改，产生误导性反馈
  if (images && images.length > 0) {
    return gradeWithVision(question, content, images);
  }
  return gradeWithAI(question, content);
}