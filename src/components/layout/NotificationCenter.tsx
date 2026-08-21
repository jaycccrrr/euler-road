'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Bell,
  Heart,
  MessageSquare,
  UserPlus,
  MessagesSquare,
  CheckCheck,
  Loader2,
  Send,
  Sparkles,
} from 'lucide-react';
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
import { getChatSessions, getAllUsers, getUnreadMessageCount } from '@/lib/db';
import { ChatDialog } from '@/components/community/ChatDialog';
import { LazyImage } from '@/components/LazyImage';
import { formatRelativeTime } from '@/lib/utils';
import { navigateTo } from '@/lib/asset';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

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

function resolveTarget(n: AppNotification): string | null {
  if (n.targetType === 'post' && n.targetId) return `/community/post/#id=${n.targetId}`;
  if (n.targetType === 'answer' || n.targetType === 'discussion') return '/daily/';
  return null;
}

type NoticeTab = 'follow' | 'message';
type Section = 'notice' | 'dm';

interface SessionItem {
  friendId: string;
  friend: User | undefined;
  lastMessage: { content: string; createdAt: string; messageType?: string };
  unreadCount: number;
}

/**
 * Header 消息中心（通知 + 私信合并，知乎风格大画幅）：
 * 顶部「通知 / 私信」页签；通知内分「关注 / 消息」；附带好友与私信快捷入口与推荐用户。
 */
export function NotificationCenter() {
  const { user, isAuthenticated, followUser, unfollowUser, isFollowing } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [msgUnread, setMsgUnread] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState<Section>('notice');
  const [tab, setTab] = useState<NoticeTab>('follow');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [recommended, setRecommended] = useState<User[]>([]);
  const [chatFriend, setChatFriend] = useState<User | null>(null);

  const refreshUnread = useCallback(async () => {
    if (!user || !hasApiToken()) return;
    try {
      const data = await notificationsAPI.list(1);
      setUnreadCount(data.unreadCount);
    } catch {
      // 后端不可用时静默
    }
  }, [user]);

  const refreshMsgUnread = useCallback(async () => {
    if (!user) return;
    try {
      setMsgUnread(await getUnreadMessageCount(user.id));
    } catch {
      // 忽略
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    void refreshUnread();
    void refreshMsgUnread();
    const interval = setInterval(() => {
      void refreshUnread();
      void refreshMsgUnread();
    }, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user, refreshUnread, refreshMsgUnread]);

  const loadSidebar = useCallback(
    async (uid: string) => {
      try {
        const list = await getChatSessions(uid);
        setSessions(
          list.sort((a, b) => b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt))
        );
      } catch {
        setSessions([]);
      }
      try {
        const all = await getAllUsers();
        const following = user?.following || [];
        setRecommended(
          all.filter((u) => u.id !== uid && !following.includes(u.id)).slice(0, 6)
        );
      } catch {
        setRecommended([]);
      }
    },
    [user]
  );

  const handleOpen = async () => {
    if (!user) return;
    setIsOpen(true);
    setSection('notice');
    if (!hasApiToken()) {
      setIsLoading(false);
      void loadSidebar(user.id);
      return;
    }
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
    void loadSidebar(user.id);
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

  const followNotifications = notifications.filter((n) => n.type === 'follow');
  const messageNotifications = notifications.filter((n) => n.type !== 'follow');
  const followUnread = followNotifications.filter((n) => !n.isRead).length;
  const messageUnread = messageNotifications.filter((n) => !n.isRead).length;
  const activeList = tab === 'follow' ? followNotifications : messageNotifications;
  const totalUnread = unreadCount + msgUnread;

  const renderNotification = (n: AppNotification) => {
    const meta = TYPE_META[n.type] || TYPE_META.post_like;
    const Icon = meta.icon;
    const target = resolveTarget(n);
    return (
      <button
        key={n.id}
        onClick={() => void handleClickNotification(n)}
        className={cn(
          'w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left',
          n.isRead ? 'hover:bg-gray-50' : 'bg-blue-50/50 hover:bg-blue-50',
          target ? 'cursor-pointer' : 'cursor-default'
        )}
      >
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden">
            {n.actorAvatar?.startsWith('data:') || n.actorAvatar?.startsWith('http')
              ? <LazyImage src={n.actorAvatar} alt="" className="w-full h-full object-cover" />
              : (n.actorAvatar || '👤')}
          </div>
          <span className={cn('absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white', meta.iconClass)}>
            <Icon className="w-2.5 h-2.5" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800">
            <span className="font-medium">{n.actorNickname}</span>
            <span className="text-gray-500"> {meta.text}</span>
          </p>
          {n.content && <p className="text-xs text-gray-400 truncate mt-0.5">{n.content}</p>}
          <p className="text-[10px] text-gray-400 mt-1">{formatRelativeTime(n.createdAt)}</p>
        </div>
        {!n.isRead && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />}
      </button>
    );
  };

  const renderSession = (s: SessionItem, large = false) => (
    <button
      key={s.friendId}
      onClick={() => {
        if (!s.friend) return;
        setChatFriend(s.friend);
        setIsOpen(false);
      }}
      className={cn(
        'w-full flex items-center gap-3 rounded-lg hover:bg-slate-50 transition-colors text-left',
        large ? 'p-3' : 'px-2 py-2'
      )}
    >
      <div className={cn('relative shrink-0', large ? '' : '')}>
        <div className={cn('rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center overflow-hidden', large ? 'w-11 h-11' : 'w-9 h-9')}>
          {s.friend?.avatar?.startsWith('data:') || s.friend?.avatar?.startsWith('http')
            ? <LazyImage src={s.friend!.avatar} alt="" className="w-full h-full object-cover" />
            : (s.friend?.avatar || '👤')}
        </div>
        {s.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {s.unreadCount > 99 ? '99+' : s.unreadCount}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-800 truncate">
            {s.friend?.nickname || '未知用户'}
          </span>
          <span className="text-[10px] text-gray-400 shrink-0 ml-2">
            {formatRelativeTime(s.lastMessage.createdAt)}
          </span>
        </div>
        <p className="text-xs text-slate-400 truncate mt-0.5">
          {s.lastMessage.messageType === 'question-card'
            ? '[题目卡片]'
            : s.lastMessage.messageType === 'post-card'
              ? '[帖子卡片]'
              : s.lastMessage.content || '[图片]'}
        </p>
      </div>
      <Send className="w-3.5 h-3.5 text-slate-300 shrink-0" />
    </button>
  );

  if (!isAuthenticated || !user) return null;

  return (
    <>
      <button
        onClick={() => void handleOpen()}
        className="relative p-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 transition-all duration-200 active:scale-95"
        title="通知 · 私信"
      >
        <Bell className="w-5 h-5" />
        {totalUnread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {totalUnread > 99 ? '99+' : totalUnread}
          </span>
        )}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="!w-[94vw] !max-w-3xl !h-[85vh] p-0 overflow-hidden flex flex-col rounded-2xl gap-0">
          <DialogHeader className="px-4 py-3 border-b shrink-0 flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-base">消息中心</DialogTitle>
            {section === 'notice' && unreadCount > 0 && (
              <button
                onClick={() => void handleMarkAllRead()}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                全部已读
              </button>
            )}
          </DialogHeader>

          {/* 一级页签：通知 / 私信 */}
          <div className="flex items-center gap-1 px-4 pt-3 shrink-0">
            {(['notice', 'dm'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                  section === s
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                )}
              >
                {s === 'notice' ? '通知' : '私信'}
                {s === 'notice'
                  ? unreadCount > 0 && <span className="ml-1 text-xs text-red-500">{unreadCount}</span>
                  : msgUnread > 0 && <span className="ml-1 text-xs text-red-500">{msgUnread}</span>}
              </button>
            ))}
          </div>

          {section === 'notice' ? (
            <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
              {/* 左：关注 / 消息通知 */}
              <div className="md:w-[58%] flex flex-col min-h-0 md:border-r border-slate-100">
                <div className="flex items-center gap-1 px-3 pt-2 shrink-0">
                  {(['follow', 'message'] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => setTab(k)}
                      className={cn(
                        'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                        tab === k
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                      )}
                    >
                      {k === 'follow' ? '关注' : '消息'}
                      {k === 'follow'
                        ? followUnread > 0 && <span className="ml-1 text-xs text-red-500">{followUnread}</span>
                        : messageUnread > 0 && <span className="ml-1 text-xs text-red-500">{messageUnread}</span>}
                    </button>
                  ))}
                </div>
                <ScrollArea className="flex-1 min-h-0">
                  <div className="p-2">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">加载中…</span>
                      </div>
                    ) : activeList.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">
                        <div className="text-3xl mb-2">🔔</div>
                        <p className="text-sm">{tab === 'follow' ? '暂无关注通知' : '暂无消息通知'}</p>
                        <p className="text-xs mt-1">有人关注、点赞或评论时会在这里提醒</p>
                      </div>
                    ) : (
                      activeList.map(renderNotification)
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* 右：好友与私信 + 推荐用户 */}
              <div className="md:w-[42%] flex flex-col min-h-0">
                <div className="px-4 pt-3 pb-1 shrink-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    好友与私信
                  </p>
                </div>
                <div className="px-2">
                  {sessions.length === 0 ? (
                    <p className="text-xs text-slate-400 px-2 py-2">暂无会话，与好友互相关注后即可私信</p>
                  ) : (
                    sessions.slice(0, 5).map((s) => renderSession(s, false))
                  )}
                </div>

                <div className="px-4 pt-3 pb-1 shrink-0 border-t border-slate-100">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    推荐用户
                  </p>
                </div>
                <div className="px-2 pb-3">
                  {recommended.length === 0 ? (
                    <p className="text-xs text-slate-400 px-2 py-2">暂无推荐</p>
                  ) : (
                    recommended.map((u) => {
                      const following = isFollowing(u.id);
                      return (
                        <div key={u.id} className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center overflow-hidden shrink-0">
                            {u.avatar?.startsWith('data:') || u.avatar?.startsWith('http')
                              ? <LazyImage src={u.avatar} alt="" className="w-full h-full object-cover" />
                              : (u.avatar || '👤')}
                          </div>
                          <span className="flex-1 min-w-0 text-sm text-slate-700 truncate">{u.nickname}</span>
                          <button
                            onClick={() => {
                              if (following) {
                                void unfollowUser(u.id);
                              } else {
                                void followUser(u.id);
                              }
                            }}
                            className={cn(
                              'shrink-0 text-xs px-2.5 py-1 rounded-full transition-colors',
                              following
                                ? 'bg-slate-100 text-slate-500'
                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            )}
                          >
                            {following ? '已关注' : '关注'}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* 私信：会话列表 */
            <ScrollArea className="flex-1 min-h-0">
              <div className="p-3">
                {sessions.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-3xl mb-2">💬</div>
                    <p className="text-sm">暂无私信</p>
                    <p className="text-xs mt-1">在社区与好友互相关注后即可聊天</p>
                  </div>
                ) : (
                  sessions.map((s) => renderSession(s, true))
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* 聊天窗口 */}
      {chatFriend && (
        <ChatDialog
          isOpen={!!chatFriend}
          onClose={() => {
            setChatFriend(null);
            void refreshMsgUnread();
          }}
          currentUser={user}
          friend={chatFriend}
        />
      )}
    </>
  );
}
