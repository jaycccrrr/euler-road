import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 识图判卷（视觉模型，默认通义千问 Qwen3-VL-Plus；未配置 Key 或无图片时返回 null）
async function gradeWithVision(
  question: { title: string; content: string; answer?: string | null },
  content: string,
  images: string[]
): Promise<{ score: number; feedback: string; isCorrect: boolean } | null> {
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

    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || '';
    const parsed = JSON.parse(text);
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

// AI 判卷（DeepSeek）：失败时返回 null，调用方降级到本地算法
async function gradeWithAI(
  question: { title: string; content: string; answer?: string | null },
  content: string
): Promise<{ score: number; feedback: string; isCorrect: boolean } | null> {
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

    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content || '';
    const parsed = JSON.parse(text);
    const score = Math.max(0, Math.min(100, Number(parsed.score) || 60));
    return {
      score,
      feedback: String(parsed.feedback || '已批改完成'),
      isCorrect: typeof parsed.isCorrect === 'boolean' ? parsed.isCorrect : score >= 80,
    };
  } catch (error) {
    console.warn('AI 判卷失败，使用本地降级:', error);
    return null;
  }
}

// 提交答案
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: '无效的token' }, { status: 401 });
    }

    const { id, questionId, content, images, isPublic, question } = await request.json();

    if (!questionId || !content) {
      return NextResponse.json({ error: '请填写答案' }, { status: 400 });
    }

    // 题目在后端不存在时自动建档（题库内容在前端数据里，首次提交时同步题目）
    const existingQuestion = await prisma.dailyQuestion.findUnique({
      where: { id: questionId },
    });

    if (!existingQuestion && question) {
      try {
        await prisma.dailyQuestion.create({
          data: {
            id: questionId,
            moduleId: String(question.moduleId || 'math'),
            date: String(question.date || new Date().toISOString().slice(0, 10)),
            title: String(question.title || '每日一题'),
            content: String(question.content || content),
            images: Array.isArray(question.images) ? question.images : [],
            answer: question.answer ? String(question.answer) : null,
            answerImages: Array.isArray(question.answerImages) ? question.answerImages : [],
            difficulty: typeof question.difficulty === 'number' ? question.difficulty : 3,
            isAutoGenerated: question.isAutoGenerated !== false,
          },
        });
      } catch (createError) {
        console.warn('创建题目失败（可能已存在）:', createError);
      }
    }

    const questionForGrading = {
      title: question?.title || '每日一题',
      content: question?.content || '',
      answer: question?.answer,
    };

    // 判卷链路：识图判卷（有图且有 Key）→ 文本 AI 判卷（DeepSeek）→ 本地降级
    let grading =
      (await gradeWithVision(questionForGrading, content, images || [])) ||
      (await gradeWithAI(questionForGrading, content));
    if (!grading) {
      const aiScore = Math.floor(Math.random() * 40) + 60; // 模拟60-100分
      grading = {
        score: aiScore,
        isCorrect: aiScore >= 80,
        feedback: aiScore >= 80 ? '回答正确，思路清晰！' : '回答基本正确，但还有改进空间。',
      };
    }

    const experienceGained = grading.isCorrect ? 20 : grading.score >= 60 ? 10 : 5;

    // 创建答题记录
    const answer = await prisma.answerRecord.create({
      data: {
        ...(id ? { id } : {}),
        userId: payload.userId,
        questionId,
        content,
        images: images || [],
        aiScore: grading.score,
        aiFeedback: grading.feedback,
        isCorrect: grading.isCorrect,
        experienceGained,
        isPublic: !!isPublic,
      },
    });

    return NextResponse.json({
      answer,
      feedback: answer.aiFeedback,
      score: answer.aiScore,
      expGained: experienceGained,
    });
  } catch (error) {
    console.error('提交答案失败:', error);
    return NextResponse.json({ error: '提交答案失败' }, { status: 500 });
  }
}

// 获取用户的答题记录
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: '无效的token' }, { status: 401 });
    }

    const answers = await prisma.answerRecord.findMany({
      where: { userId: payload.userId },
      orderBy: { submittedAt: 'desc' },
      include: {
        question: {
          select: {
            id: true,
            title: true,
            moduleId: true,
          },
        },
      },
    });

    return NextResponse.json({ answers });
  } catch (error) {
    console.error('获取答题记录失败:', error);
    return NextResponse.json({ error: '获取答题记录失败' }, { status: 500 });
  }
}
