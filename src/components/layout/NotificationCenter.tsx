'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, Heart, MessageSquare, UserPlus, MessagesSquare, CheckCheck, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { notificationsAPI } from '@/lib/api-client';
import { hasApiToken } from '@/lib/api-auth';
import { useAuth } from '@/hooks/useAuth';
import { LazyImage } from '@/components/LazyImage';
import { formatRelativeTime } from '@/lib/utils';
import { navigateTo } from '@/lib/asset';

interface AppNotification {
  id: string;
  type: string;
  actorNickname: string;
  actorAvatar: string;
  targetType?: string | null;
  targetId?: string | null;
  content: string;
  isRead: boolean;
  createdAt: string;
}

const TYPE_META: Record<string, { icon: typeof Heart; iconClass: string; text: string }> = {
  post_like: { icon: Heart, iconClass: 'bg-red-50 text-red-500', text: '赞了你的帖子' },
  post_comment: { icon: MessageSquare, iconClass: 'bg-blue-50 text-blue-500', text: '评论了你的帖子' },
  answer_like: { icon: Heart, iconClass: 'bg-red-50 text-red-500', text: '赞了你的答案' },
  answer_comment: { icon: MessageSquare, iconClass: 'bg-blue-50 text-blue-500', text: '评论了你的答案' },
  follow: { icon: UserPlus, iconClass: 'bg-emerald-50 text-emerald-600', text: '关注了你' },
  discussion_reply: { icon: MessagesSquare, iconClass: 'bg-violet-50 text-violet-600', text: '回复了你的讨论' },
};

// 根据通知类型计算跳转地址；返回 null 表示不可跳转
function resolveTarget(n: AppNotification): string | null {
  if (n.targetType === 'post' && n.targetId) return `/community/post/#id=${n.targetId}`;
  if (n.targetType === 'answer' || n.targetType === 'discussion') return '/daily/';
  return null;
}

/**
 * Header 通知中心：铃铛红点 + 通知列表。
 * 每 30s 轮询未读数；点击通知标记已读并跳转到目标。
 */
export function NotificationCenter() {
  const { user, isAuthenticated } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshUnread = useCallback(async () => {
    if (!user || !hasApiToken()) return;
    try {
      const data = await notificationsAPI.list(1);
      setUnreadCount(data.unreadCount);
    } catch {
      // 后端不可用时静默
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    // 延迟到宏任务执行，避免在 effect 内同步 setState 造成级联渲染
    const first = setTimeout(() => void refreshUnread(), 0);
    const interval = setInterval(() => void refreshUnread(), 30000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [isAuthenticated, user, refreshUnread]);

  const handleOpen = async () => {
    if (!user) return;
    setIsOpen(true);
    if (!hasApiToken()) return;
    setIsLoading(true);
    try {
      const data = await notificationsAPI.list(30);
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const data = await notificationsAPI.markRead({ all: true });
      setUnreadCount(data.unreadCount);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark notifications read:', error);
    }
  };

  const handleClickNotification = async (n: AppNotification) => {
    if (!n.isRead) {
      setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)));
      setUnreadCount((c) => Math.max(0, c - 1));
      try {
        await notificationsAPI.markRead({ ids: [n.id] });
      } catch {
        // 已读失败不影响跳转
      }
    }
    const target = resolveTarget(n);
    if (target) {
      setIsOpen(false);
      navigateTo(target);
    }
  };

  if (!isAuthenticated || !user) return null;

  return (
    <>
      <button
        onClick={() => void handleOpen()}
        className="relative p-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 transition-all duration-200 active:scale-95"
        title="通知"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="!w-[min(400px,calc(100vw-2rem))] !max-h-[480px] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-4 py-3 border-b shrink-0 flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-base">通知</DialogTitle>
            {unreadCount > 0 && (
              <button
                onClick={() => void handleMarkAllRead()}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                全部已读
              </button>
            )}
          </DialogHeader>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">加载中…</span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <div className="text-3xl mb-2">🔔</div>
                  <p className="text-sm">暂无通知</p>
                  <p className="text-xs mt-1">有人点赞、评论或关注你时会在这里提醒</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const meta = TYPE_META[n.type] || TYPE_META.post_like;
                  const Icon = meta.icon;
                  const target = resolveTarget(n);
                  return (
                    <button
                      key={n.id}
                      onClick={() => void handleClickNotification(n)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${
                        n.isRead ? 'hover:bg-gray-50' : 'bg-blue-50/50 hover:bg-blue-50'
                      } ${target ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden">
                          {n.actorAvatar?.startsWith('data:') || n.actorAvatar?.startsWith('http')
                            ? <LazyImage src={n.actorAvatar} alt="" className="w-full h-full object-cover" />
                            : (n.actorAvatar || '👤')}
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${meta.iconClass}`}>
                          <Icon className="w-2.5 h-2.5" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800">
                          <span className="font-medium">{n.actorNickname}</span>
                          <span className="text-gray-500"> {meta.text}</span>
                        </p>
                        {n.content && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">{n.content}</p>
                        )}
                        <p className="text-[10px] text-gray-400 mt-1">{formatRelativeTime(n.createdAt)}</p>
                      </div>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
