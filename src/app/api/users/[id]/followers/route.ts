import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// 获取用户的粉丝列表
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const followers = await prisma.follow.findMany({
      where: { followingId: id },
      include: {
        follower: {
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

    return NextResponse.json(followers.map((f) => f.follower));
  } catch (error) {
    console.error('获取粉丝列表失败:', error);
    return NextResponse.json({ error: '获取粉丝列表失败' }, { status: 500 });
  }
}
