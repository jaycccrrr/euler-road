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

// 获取帖子的评论列表
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = await prisma.comment.findMany({
      where: { postId: id },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: { id: true, nickname: true, avatar: true },
        },
      },
    });
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('获取帖子评论失败:', error);
    return NextResponse.json({ error: '获取帖子评论失败' }, { status: 500 });
  }
}

// 发布帖子评论
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { id, content } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: '请输入评论内容' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        ...(id ? { id } : {}),
        postId,
        userId,
        content: content.trim(),
      },
      include: {
        user: {
          select: { id: true, nickname: true, avatar: true },
        },
      },
    });

    // 通知帖子作者有新评论
    const post = await prisma.post.findUnique({ where: { id: postId }, select: { userId: true } });
    if (post) {
      void createNotification({
        userId: post.userId,
        type: 'post_comment',
        actorId: userId,
        targetType: 'post',
        targetId: postId,
        content: content.trim(),
      });
    }

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('发布帖子评论失败:', error);
    return NextResponse.json({ error: '发布评论失败' }, { status: 500 });
  }
}
