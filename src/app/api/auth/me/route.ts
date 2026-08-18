import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const userId = getAuthUserId(req);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        moduleData: user.moduleData,
        displayCategory: user.displayCategory,
        favoritePosts: user.favoritePosts,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userId = getAuthUserId(req);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { avatar, displayCategory, moduleData } = await req.json();

    const updateData: any = {};
    if (avatar !== undefined) updateData.avatar = avatar;
    if (displayCategory !== undefined) updateData.displayCategory = displayCategory;
    if (moduleData !== undefined) updateData.moduleData = moduleData;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        moduleData: user.moduleData,
        displayCategory: user.displayCategory,
        favoritePosts: user.favoritePosts,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
