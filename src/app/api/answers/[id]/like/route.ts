import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 点赞 / 取消点赞答案（toggle）
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

    const answer = await prisma.answerRecord.findUnique({ where: { id } });
    if (!answer) {
      return NextResponse.json({ error: '答案不存在' }, { status: 404 });
    }

    const likedBy = answer.likedBy || [];
    const liked = likedBy.includes(payload.userId);
    const updated = await prisma.answerRecord.update({
      where: { id },
      data: {
        likedBy: liked ? likedBy.filter((u) => u !== payload.userId) : [...likedBy, payload.userId],
        likes: liked ? Math.max(0, answer.likes - 1) : answer.likes + 1,
      },
    });

    return NextResponse.json({ liked: !liked, likes: updated.likes, likedBy: updated.likedBy });
  } catch (error) {
    console.error('答案点赞失败:', error);
    return NextResponse.json({ error: '操作失败' }, { status: 500 });
  }
}
