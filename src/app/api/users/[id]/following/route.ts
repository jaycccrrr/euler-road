import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// 获取用户的关注列表
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const following = await prisma.follow.findMany({
      where: { followerId: id },
      include: {
        following: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
            level: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(following.map((f) => f.following));
  } catch (error) {
    console.error('获取关注列表失败:', error);
    return NextResponse.json({ error: '获取关注列表失败' }, { status: 500 });
  }
}
