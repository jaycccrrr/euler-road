import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 删除讨论区消息（仅作者本人）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const payload = token ? verifyToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const existing = await prisma.discussionMessage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: '消息不存在' }, { status: 404 });
    }
    if (existing.userId !== payload.userId) {
      return NextResponse.json({ error: '无权操作' }, { status: 403 });
    }

    await prisma.discussionMessage.delete({ where: { id } });
    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除讨论区消息失败:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
