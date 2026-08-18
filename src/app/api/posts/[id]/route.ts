import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 获取当前登录用户（返回 userId 或 null）
function getUserId(request: NextRequest): string | null {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId || null;
}

// 更新帖子（标题、内容、图片、类型、话题等）
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: '帖子不存在' }, { status: 404 });
    }
    if (existing.userId !== userId) {
      return NextResponse.json({ error: '无权操作' }, { status: 403 });
    }

    const { title, content, images, moduleId, postType, topics, likes, likedBy } = await request.json();
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (images !== undefined) updateData.images = images;
    if (moduleId !== undefined) updateData.moduleId = moduleId;
    if (postType !== undefined) updateData.postType = postType;
    if (topics !== undefined) updateData.topics = topics;
    if (likes !== undefined) updateData.likes = likes;
    if (likedBy !== undefined) updateData.likedBy = likedBy;

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
            displayCategory: true,
          },
        },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error('更新帖子失败:', error);
    return NextResponse.json({ error: '更新帖子失败' }, { status: 500 });
  }
}

// 删除帖子
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: '帖子不存在' }, { status: 404 });
    }
    if (existing.userId !== userId) {
      return NextResponse.json({ error: '无权操作' }, { status: 403 });
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除帖子失败:', error);
    return NextResponse.json({ error: '删除帖子失败' }, { status: 500 });
  }
}
