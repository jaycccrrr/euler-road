import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 好友状态：判断两个用户是否互相关注（关注关系属于公开数据，无需登录）
export async function GET(request: NextRequest) {
  try {
    const a = request.nextUrl.searchParams.get('userIdA');
    const b = request.nextUrl.searchParams.get('userIdB');
    if (!a || !b) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const [aFollowsB, bFollowsA] = await Promise.all([
      prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: a, followingId: b } },
      }),
      prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: b, followingId: a } },
      }),
    ]);

    return NextResponse.json({
      following: !!aFollowsB,
      followedBy: !!bFollowsA,
      areFriends: !!(aFollowsB && bFollowsA),
    });
  } catch (error) {
    console.error('好友状态查询失败:', error);
    return NextResponse.json({ error: '查询失败' }, { status: 500 });
  }
}
