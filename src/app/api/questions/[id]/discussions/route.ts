import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

function getUserId(request: NextRequest): string | null {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId || null;
}

const userSelect = { id: true, nickname: true, avatar: true };

// 获取题目的讨论区消息（含回复）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;
    const messages = await prisma.discussionMessage.findMany({
      where: { questionId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: { select: userSelect },
        replies: {
          orderBy: { createdAt: 'asc' },
          include: { user: { select: userSelect } },
        },
      },
    });
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('获取讨论区消息失败:', error);
    return NextResponse.json({ error: '获取讨论区消息失败' }, { status: 500 });
  }
}

// 发布讨论区消息
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const {
      id,
      content,
      refQuestionId,
      refQuestionTitle,
      refQuestionModuleId,
      refQuestionDate,
      refAnswerId,
      refAnswerExcerpt,
      refAnswerScore,
      refAnswerIsCorrect,
    } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: '请输入内容' }, { status: 400 });
    }

    const message = await prisma.discussionMessage.create({
      data: {
        ...(id ? { id } : {}),
        questionId,
        userId,
        content: content.trim(),
        refQuestionId: refQuestionId || null,
        refQuestionTitle: refQuestionTitle || null,
        refQuestionModuleId: refQuestionModuleId || null,
        refQuestionDate: refQuestionDate || null,
        refAnswerId: refAnswerId || null,
        refAnswerExcerpt: refAnswerExcerpt || null,
        refAnswerScore: typeof refAnswerScore === 'number' ? refAnswerScore : null,
        refAnswerIsCorrect: typeof refAnswerIsCorrect === 'boolean' ? refAnswerIsCorrect : null,
      },
      include: {
        user: { select: userSelect },
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('发布讨论区消息失败:', error);
    return NextResponse.json({ error: '发布失败' }, { status: 500 });
  }
}
