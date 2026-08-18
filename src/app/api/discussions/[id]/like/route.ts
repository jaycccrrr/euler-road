import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 讨论区消息点赞（toggle）
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const payload = token ? verifyToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const msg = await prisma.discussionMessage.findUnique({ where: { id } });
    if (!msg) {
      return NextResponse.json({ error: '消息不存在' }, { status: 404 });
    }

    const likedBy = msg.likedBy || [];
    const liked = likedBy.includes(payload.userId);
    const updated = await prisma.discussionMessage.update({
      where: { id },
      data: {
        likedBy: liked ? likedBy.filter((u) => u !== payload.userId) : [...likedBy, payload.userId],
        likes: liked ? Math.max(0, msg.likes - 1) : msg.likes + 1,
      },
    });

    return NextResponse.json({ liked: !liked, likes: updated.likes, likedBy: updated.likedBy });
  } catch (error) {
    console.error('讨论区点赞失败:', error);
    return NextResponse.json({ error: '操作失败' }, { status: 500 });
  }
}
