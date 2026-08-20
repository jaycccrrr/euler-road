import { prisma } from '@/lib/prisma';

// 服务端通知辅助：在互动行为发生时给目标用户写入一条通知。
// 约定：不给"自己触发的行为"发通知；失败只记录日志，不影响主流程。

export type NotificationType =
  | 'post_like'
  | 'post_comment'
  | 'answer_like'
  | 'answer_comment'
  | 'follow'
  | 'discussion_reply';

export async function createNotification(params: {
  userId: string; // 接收者
  type: NotificationType;
  actorId: string; // 触发者
  targetType?: 'post' | 'answer' | 'discussion' | 'user';
  targetId?: string;
  content?: string; // 摘要（如评论节选）
}): Promise<void> {
  const { userId, type, actorId, targetType, targetId, content } = params;

  // 自己触发的行为不通知自己
  if (!userId || userId === actorId) return;

  try {
    const actor = await prisma.user.findUnique({
      where: { id: actorId },
      select: { nickname: true, avatar: true },
    });
    if (!actor) return;

    await prisma.notification.create({
      data: {
        userId,
        type,
        actorId,
        actorNickname: actor.nickname,
        actorAvatar: actor.avatar,
        targetType: targetType || null,
        targetId: targetId || null,
        content: (content || '').slice(0, 100),
      },
    });
  } catch (error) {
    console.warn('创建通知失败:', error);
  }
}
