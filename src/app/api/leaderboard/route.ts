import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'experience'; // 'experience' | 'answers'
    const limit = parseInt(searchParams.get('limit') || '20');

    let leaderboard;

    if (type === 'experience') {
      // 当前 schema 无全局经验字段，按粉丝数作为轻量排行（后续可扩展为 moduleData 聚合）
      leaderboard = await prisma.user.findMany({
        orderBy: { followerCount: 'desc' },
        take: limit,
        select: {
          id: true,
          nickname: true,
          avatar: true,
          displayCategory: true,
          followerCount: true,
        },
      });
    } else {
      // 按答题数排行
      leaderboard = await prisma.user.findMany({
        take: limit,
        select: {
          id: true,
          nickname: true,
          avatar: true,
          displayCategory: true,
          _count: {
            select: { answers: true },
          },
        },
        orderBy: {
          answers: { _count: 'desc' },
        },
      });
    }

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('获取排行榜失败:', error);
    return NextResponse.json({ error: '获取排行榜失败' }, { status: 500 });
  }
}
