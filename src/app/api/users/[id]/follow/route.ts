import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 关注/取消关注用户
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: followingId } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: '无效的token' }, { status: 401 });
    }

    const followerId = payload.userId;

    if (followerId === followingId) {
      return NextResponse.json({ error: '不能关注自己' }, { status: 400 });
    }

    // 检查是否已关注
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      // 取消关注
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      // 更新计数
      await prisma.user.update({
        where: { id: followerId },
        data: { followingCount: { decrement: 1 } },
      });

      await prisma.user.update({
        where: { id: followingId },
        data: { followerCount: { decrement: 1 } },
      });

      return NextResponse.json({ message: '取消关注成功', following: false });
    } else {
      // 添加关注
      await prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      });

      // 更新计数
      await prisma.user.update({
        where: { id: followerId },
        data: { followingCount: { increment: 1 } },
      });

      await prisma.user.update({
        where: { id: followingId },
        data: { followerCount: { increment: 1 } },
      });

      return NextResponse.json({ message: '关注成功', following: true });
    }
  } catch (error) {
    console.error('关注操作失败:', error);
    return NextResponse.json({ error: '关注操作失败' }, { status: 500 });
  }
}

// 检查是否已关注
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: followingId } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ following: false });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ following: false });
    }

    const followerId = payload.userId;

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return NextResponse.json({ following: !!existingFollow });
  } catch (error) {
    console.error('检查关注状态失败:', error);
    return NextResponse.json({ following: false });
  }
}
