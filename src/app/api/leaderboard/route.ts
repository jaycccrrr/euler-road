import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get('moduleId') || 'math';
    const limit = parseInt(searchParams.get('limit') || '100');

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        nickname: true,
        avatar: true,
        moduleData: true,
      },
    });

    const rankedUsers = users
      .map((user: any) => {
        const moduleKey = moduleId === 'advanced-math' ? 'math' : moduleId;
        const moduleInfo = user.moduleData?.[moduleKey] || { exp: 0, level: 1 };
        return {
          id: user.id,
          nickname: user.nickname,
          avatar: user.avatar,
          level: moduleInfo.level || 1,
          experience: moduleInfo.exp || 0,
        };
      })
      .sort((a: any, b: any) => b.experience - a.experience)
      .slice(0, limit);

    return NextResponse.json({
      users: rankedUsers,
      moduleId,
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
