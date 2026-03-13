import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const follows = await prisma.follow.findMany({
      where: { followerId: id },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        following: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
            followerCount: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.follow.count({
      where: { followerId: id },
    });

    return NextResponse.json({
      users: follows.map((f) => f.following),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get following list error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
