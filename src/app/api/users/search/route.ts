import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 用户搜索（按昵称模糊匹配）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50);

    if (!q) {
      return NextResponse.json({ users: [] });
    }

    const users = await prisma.user.findMany({
      where: {
        nickname: { contains: q, mode: 'insensitive' },
      },
      take: limit,
      select: {
        id: true,
        nickname: true,
        avatar: true,
        displayCategory: true,
        isAdmin: true,
        followingCount: true,
        followerCount: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('用户搜索失败:', error);
    return NextResponse.json({ error: '用户搜索失败' }, { status: 500 });
  }
}
