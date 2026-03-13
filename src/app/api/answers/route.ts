import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

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

    const { questionId, content, images } = await request.json();

    if (!questionId || !content) {
      return NextResponse.json({ error: '请填写答案' }, { status: 400 });
    }

    // 检查是否已回答
    const existingAnswer = await prisma.answerRecord.findFirst({
      where: {
        userId: payload.userId,
        questionId,
      },
    });

    if (existingAnswer) {
      return NextResponse.json({ error: '您已经回答过这道题了' }, { status: 400 });
    }

    // 获取题目信息
    const question = await prisma.dailyQuestion.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return NextResponse.json({ error: '题目不存在' }, { status: 404 });
    }

    // AI判卷（简化版，实际应调用AI服务）
    const aiScore = Math.floor(Math.random() * 40) + 60; // 模拟60-100分
    const isCorrect = aiScore >= 80;
    const experienceGained = isCorrect ? 20 : aiScore >= 60 ? 10 : 5;

    // 创建答题记录
    const answer = await prisma.answerRecord.create({
      data: {
        userId: payload.userId,
        questionId,
        content,
        images: images || [],
        aiScore,
        aiFeedback: isCorrect ? '回答正确，思路清晰！' : '回答基本正确，但还有改进空间。',
        isCorrect,
        experienceGained,
      },
    });

    // 更新用户经验值
    await prisma.user.update({
      where: { id: payload.userId },
      data: {
        experience: { increment: experienceGained },
      },
    });

    return NextResponse.json({
      answer,
      experienceGained,
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

    return NextResponse.json(answers);
  } catch (error) {
    console.error('获取答题记录失败:', error);
    return NextResponse.json({ error: '获取答题记录失败' }, { status: 500 });
  }
}
