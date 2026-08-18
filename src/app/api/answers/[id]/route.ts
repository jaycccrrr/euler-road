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

// 更新答题记录（公开状态、点赞等）
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

    const existing = await prisma.answerRecord.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: '记录不存在' }, { status: 404 });
    }
    if (existing.userId !== userId) {
      return NextResponse.json({ error: '无权操作' }, { status: 403 });
    }

    const { content, images, isPublic, likes, likedBy } = await request.json();
    const updateData: any = {};
    if (content !== undefined) updateData.content = content;
    if (images !== undefined) updateData.images = images;
    if (isPublic !== undefined) updateData.isPublic = !!isPublic;
    if (likes !== undefined) updateData.likes = likes;
    if (likedBy !== undefined) updateData.likedBy = likedBy;

    const answer = await prisma.answerRecord.update({ where: { id }, data: updateData });
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('更新答题记录失败:', error);
    return NextResponse.json({ error: '更新答题记录失败' }, { status: 500 });
  }
}

// 删除答题记录
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

    const existing = await prisma.answerRecord.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: '记录不存在' }, { status: 404 });
    }
    if (existing.userId !== userId) {
      return NextResponse.json({ error: '无权操作' }, { status: 403 });
    }

    await prisma.answerRecord.delete({ where: { id } });
    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除答题记录失败:', error);
    return NextResponse.json({ error: '删除答题记录失败' }, { status: 500 });
  }
}
