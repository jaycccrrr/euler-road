import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { createNotification } from '@/lib/notifications';

function getUserId(request: NextRequest): string | null {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId || null;
}

// 获取答案的评论列表
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = await prisma.answerComment.findMany({
      where: { answerId: id },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: { id: true, nickname: true, avatar: true },
        },
      },
    });
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('获取答案评论失败:', error);
    return NextResponse.json({ error: '获取答案评论失败' }, { status: 500 });
  }
}

// 发布答案评论
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: answerId } = await params;
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { id, content } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: '请输入评论内容' }, { status: 400 });
    }

    const comment = await prisma.answerComment.create({
      data: {
        ...(id ? { id } : {}),
        answerId,
        userId,
        content: content.trim(),
      },
      include: {
        user: {
          select: { id: true, nickname: true, avatar: true },
        },
      },
    });

    // 通知答案作者有新评论
    const answer = await prisma.answerRecord.findUnique({ where: { id: answerId }, select: { userId: true } });
    if (answer) {
      void createNotification({
        userId: answer.userId,
        type: 'answer_comment',
        actorId: userId,
        targetType: 'answer',
        targetId: answerId,
        content: content.trim(),
      });
    }

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('发布答案评论失败:', error);
    return NextResponse.json({ error: '发布评论失败' }, { status: 500 });
  }
}
