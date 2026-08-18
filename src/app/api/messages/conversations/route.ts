import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// 会话列表：与我有消息往来的用户 + 最后一条消息 + 未读数
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const payload = token ? verifyToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const userId = payload.userId;
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
      include: {
        sender: { select: { id: true, nickname: true, avatar: true } },
        receiver: { select: { id: true, nickname: true, avatar: true } },
      },
    });

    const byPeer = new Map<string, { last: any; unread: number }>();
    for (const msg of messages) {
      const peerId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!byPeer.has(peerId)) {
        byPeer.set(peerId, { last: msg, unread: 0 });
      }
      if (msg.receiverId === userId && !msg.isRead) {
        const entry = byPeer.get(peerId)!;
        entry.unread += 1;
      }
    }

    const conversations = Array.from(byPeer.entries()).map(([peerId, entry]) => {
      const peer = entry.last.senderId === userId ? entry.last.receiver : entry.last.sender;
      return {
        peer,
        lastMessage: entry.last,
        unreadCount: entry.unread,
      };
    });

    conversations.sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime());
    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('获取会话列表失败:', error);
    return NextResponse.json({ error: '获取会话列表失败' }, { status: 500 });
  }
}
