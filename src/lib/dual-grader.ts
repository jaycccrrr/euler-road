import { DailyQuestion, GradingMeta, ScorePoint } from '@/types';
import { gradeAnswer } from './ai-grader';

// Kimi（月之暗面）API，OpenAI 兼容格式
const KIMI_API_KEY = process.env.NEXT_PUBLIC_KIMI_API_KEY || '';
const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';
// 可通过 NEXT_PUBLIC_KIMI_MODEL 覆盖，默认使用 Kimi 最新模型
const KIMI_MODEL = process.env.NEXT_PUBLIC_KIMI_MODEL || 'kimi-k2-0711-preview';

const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
// DeepSeek V4（deepseek-chat 别名已于 2026-07-24 弃用）
const DEEPSEEK_MODEL = process.env.NEXT_PUBLIC_DEEPSEEK_MODEL || 'deepseek-v4-flash';

// 优先使用 DeepSeek，未配置 DeepSeek Key 时回退 Kimi
const AI_PROVIDER = DEEPSEEK_API_KEY ? 'deepseek' : KIMI_API_KEY ? 'kimi' : null;

// 两通道分差超过此值则标记人工复核
const DISAGREEMENT_THRESHOLD = 20;

export interface DualGradingResult {
  score: number;
  feedback: string;
  isCorrect: boolean;
  meta: GradingMeta;
}

interface AIGradingResponse {
  score: number;
  isCorrect: boolean;
  breakdown?: ScorePoint[];
  feedback: string;
}

/**
 * 双通道批改：
 * 1. 本地算法先行评分
 * 2. 配置了 AI Key 时始终调用 AI（DeepSeek/Kimi）生成具体评解与得分点拆解
 * 3. AI 不可用时回退本地结果；两通道分差过大标记 needsReview，进入管理员复核队列
 */
export async function gradeAnswerDual(
  question: DailyQuestion,
  userAnswer: string,
  userImages: string[]
): Promise<DualGradingResult> {
  const local = await gradeAnswer(question, userAnswer, userImages);

  // 优先走后端 AI 判卷（识图 + DeepSeek，服务端密钥），浏览器直连作为兜底
  const ai =
    (await gradeViaBackend(question, userAnswer, userImages)) ||
    (AI_PROVIDER ? await gradeWithAI(question, userAnswer, userImages) : null);

  if (!ai) {
    // AI 不可用，回退本地结果（明确标注，避免本地模板文案冒充 AI 评解）
    return {
      score: local.score,
      feedback: `（AI 判题服务暂不可用，以下为本地算法评解，仅供参考）\n${local.feedback}`,
      isCorrect: local.isCorrect,
      meta: { localScore: local.score, needsReview: false },
    };
  }

  const aiScore = Math.max(0, Math.min(100, Math.round(ai.score)));
  const needsReview = Math.abs(local.score - aiScore) > DISAGREEMENT_THRESHOLD;

  // 组合反馈：总评 + 得分点拆解
  let feedback = ai.feedback;
  if (ai.breakdown && ai.breakdown.length > 0) {
    const lines = ai.breakdown.map(
      (p, i) => `${i + 1}. ${p.earned ? '✓' : '✗'} ${p.point}：${p.comment}`
    );
    feedback += `\n\n得分点拆解：\n${lines.join('\n')}`;
  }
  if (needsReview) {
    feedback += '\n\n（本地评分与 AI 评分分歧较大，已提交人工复核，最终得分可能调整）';
  }

  return {
    score: aiScore,
    feedback,
    isCorrect: ai.isCorrect,
    meta: {
      localScore: local.score,
      aiScore,
      needsReview,
      breakdown: ai.breakdown,
    },
  };
}

async function gradeViaBackend(
  question: DailyQuestion,
  userAnswer: string,
  userImages: string[]
): Promise<AIGradingResponse | null> {
  try {
    // 判卷接口需要登录，附带 JWT
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch('/api/grade', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: question.title,
        content: question.content,
        answer: question.answer,
        studentContent: userAnswer,
        images: userImages,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.aiAvailable) {
      if (data.reason) console.warn('[Dual Grader] AI 判卷不可用：', data.reason);
      return null;
    }
    return {
      score: data.score,
      isCorrect: data.isCorrect,
      breakdown: Array.isArray(data.breakdown) ? data.breakdown : undefined,
      feedback: data.feedback || 'AI 批改完成。',
    };
  } catch (error) {
    console.warn('[Dual Grader] Backend grading unavailable:', error);
    return null;
  }
}
async function gradeWithAI(
  question: DailyQuestion,
  userAnswer: string,
  userImages: string[]
): Promise<AIGradingResponse | null> {
  const apiUrl = AI_PROVIDER === 'kimi' ? KIMI_API_URL : DEEPSEEK_API_URL;
  const apiKey = AI_PROVIDER === 'kimi' ? KIMI_API_KEY : DEEPSEEK_API_KEY;
  const model = AI_PROVIDER === 'kimi' ? KIMI_MODEL : DEEPSEEK_MODEL;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              '你是一位严谨公正的数学老师，负责批改学生作业。' +
              '请根据题目和参考答案，为学生答案打分（0-100），并拆解得分点。' +
              '评分标准：最终答案正确且过程合理得90-100分；最终答案正确但过程有瑕疵得75-89分；' +
              '思路正确但最终答案错误得40-74分；思路错误得0-39分。' +
              '严格按 JSON 格式输出，不要包含 markdown 代码块标记。输出格式：' +
              '{"score": 数字, "isCorrect": 是否得分>=75, "breakdown": [{"point": "得分点描述", "earned": true/false, "comment": "评语"}], "feedback": "总评（100字以内）"}',
          },
          {
            role: 'user',
            content:
              `【题目】\n${question.title}\n${question.content}\n\n` +
              `【参考答案】\n${question.answer}\n\n` +
              `【学生答案】\n${userAnswer || `（学生仅提交了 ${userImages.length} 张图片答案，无文字）`}`,
          },
        ],
        temperature: 0.2,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
        // DeepSeek V4 默认开启思考模式，判题任务延迟敏感，显式关闭
        ...(AI_PROVIDER === 'deepseek' ? { thinking: { type: 'disabled' } } : {}),
      }),
    });

    if (!response.ok) {
      console.error(`[Dual Grader] ${AI_PROVIDER} API error:`, response.status);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);
    if (typeof parsed.score !== 'number') return null;

    return {
      score: parsed.score,
      isCorrect: parsed.isCorrect ?? parsed.score >= 75,
      breakdown: Array.isArray(parsed.breakdown) ? parsed.breakdown : undefined,
      feedback: parsed.feedback || 'AI 批改完成。',
    };
  } catch (error) {
    console.error(`[Dual Grader] Failed to grade with ${AI_PROVIDER}:`, error);
    return null;
  }
}
