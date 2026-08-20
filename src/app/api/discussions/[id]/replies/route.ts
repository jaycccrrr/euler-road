import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { createNotification } from '@/lib/notifications';

// 回复讨论区消息
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: messageId } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const payload = token ? verifyToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { id, content, replyToNickname } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: '请输入回复内容' }, { status: 400 });
    }

    const reply = await prisma.discussionReply.create({
      data: {
        ...(id ? { id } : {}),
        messageId,
        userId: payload.userId,
        content: content.trim(),
        replyToNickname: replyToNickname || null,
      },
      include: {
        user: { select: { id: true, nickname: true, avatar: true } },
      },
    });

    // 通知讨论消息作者有新回复
    const message = await prisma.discussionMessage.findUnique({
      where: { id: messageId },
      select: { userId: true, questionId: true },
    });
    if (message) {
      void createNotification({
        userId: message.userId,
        type: 'discussion_reply',
        actorId: payload.userId,
        targetType: 'discussion',
        targetId: message.questionId,
        content: content.trim(),
      });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('回复讨论区消息失败:', error);
    return NextResponse.json({ error: '回复失败' }, { status: 500 });
  }
}
