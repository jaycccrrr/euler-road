import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuthUserId } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: targetUserId } = await params;
    const currentUserId = getAuthUserId(req);

    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (currentUserId === targetUserId) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });

    await prisma.user.update({
      where: { id: currentUserId },
      data: { followingCount: { increment: 1 } },
    });

    await prisma.user.update({
      where: { id: targetUserId },
      data: { followerCount: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Already following' }, { status: 409 });
    }
    console.error('Follow error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: targetUserId } = await params;
    const currentUserId = getAuthUserId(req);

    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await prisma.follow.deleteMany({
      where: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: 'Not following' }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: currentUserId },
      data: { followingCount: { decrement: 1 } },
    });

    await prisma.user.update({
      where: { id: targetUserId },
      data: { followerCount: { decrement: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unfollow error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
