import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'experience'; // 'experience' | 'answers'
    const limit = parseInt(searchParams.get('limit') || '20');

    let leaderboard;

    if (type === 'experience') {
      leaderboard = await prisma.user.findMany({
        orderBy: { experience: 'desc' },
        take: limit,
        select: {
          id: true,
          nickname: true,
          avatar: true,
          level: true,
          experience: true,
          title: true,
          frame: true,
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
          level: true,
          experience: true,
          title: true,
          frame: true,
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
