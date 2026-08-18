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
        favoriteQuestions: user.favoriteQuestions,
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
  return PATCH(req);
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = getAuthUserId(req);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { avatar, displayCategory, moduleData, favoritePosts, favoriteQuestions } = await req.json();

    const updateData: any = {};
    if (avatar !== undefined) updateData.avatar = avatar;
    if (displayCategory !== undefined) updateData.displayCategory = displayCategory;
    if (moduleData !== undefined) updateData.moduleData = moduleData;
    if (favoritePosts !== undefined) updateData.favoritePosts = favoritePosts;
    if (favoriteQuestions !== undefined) updateData.favoriteQuestions = favoriteQuestions;

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
        favoriteQuestions: user.favoriteQuestions,
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
