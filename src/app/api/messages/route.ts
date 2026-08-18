import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

function getUserId(request: NextRequest): string | null {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId || null;
}

// 获取与某用户的聊天记录（自动把对方发来的消息标记为已读）
export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const withUserId = searchParams.get('with');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    if (!withUserId) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: withUserId },
          { senderId: withUserId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    // 标记对方发来的消息为已读
    await prisma.message.updateMany({
      where: {
        senderId: withUserId,
        receiverId: userId,
        isRead: false,
      },
      data: { isRead: true },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('获取聊天记录失败:', error);
    return NextResponse.json({ error: '获取聊天记录失败' }, { status: 500 });
  }
}

// 发送私信
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { id, receiverId, content, images, messageType, cardPayload } = await request.json();
    if (!receiverId || !content?.trim()) {
      return NextResponse.json({ error: '缺少收件人或内容' }, { status: 400 });
    }

    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
    if (!receiver) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        ...(id ? { id } : {}),
        senderId: userId,
        receiverId,
        content: content.trim(),
        images: images || [],
        messageType: messageType || 'text',
        cardPayload: cardPayload || undefined,
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('发送私信失败:', error);
    return NextResponse.json({ error: '发送私信失败' }, { status: 500 });
  }
}
