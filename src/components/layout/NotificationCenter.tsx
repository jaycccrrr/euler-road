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
  ChevronDown,
  MessageCircle,
  ArrowLeft,
  Send,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { notificationsAPI } from '@/lib/api-client';
import { hasApiToken } from '@/lib/api-auth';
import { useAuth } from '@/hooks/useAuth';
import {
  getChatSessions,
  getUnreadMessageCount,
  getMessagesBetweenUsers,
  markMessagesAsRead,
  createMessage,
} from '@/lib/db';
import { getFriends, syncMessageToBackend } from '@/lib/api-sync';
import { LazyImage } from '@/components/LazyImage';
import { formatRelativeTime, generateId } from '@/lib/utils';
import { navigateTo } from '@/lib/asset';
import { cn } from '@/lib/utils';
import type { User, Message } from '@/types';

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

interface SessionItem {
  friendId: string;
  friend: User | undefined;
  lastMessage: { content: string; createdAt: string; messageType?: string };
  unreadCount: number;
}

// 最近 10 分钟内登录过视为“在线”（无实时长连接时的近似判定）
function isOnline(u: User | undefined): boolean {
  if (!u?.lastLoginAt) return false;
  try {
    return Date.now() - new Date(u.lastLoginAt).getTime() < 10 * 60 * 1000;
  } catch {
    return false;
  }
}

/**
 * Header 消息中心：顶部互动消息横条（可展开、可跳转来源），
 * 下方完整好友与私信列表（互关即出现），聊天直接嵌入本面板。
 */
export function NotificationCenter() {
  const { user, isAuthenticated } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [msgUnread, setMsgUnread] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotices, setShowNotices] = useState(false);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [chatFriend, setChatFriend] = useState<User | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [sending, setSending] = useState(false);

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

  const loadLists = useCallback(async (uid: string) => {
    try {
      const list = await getChatSessions(uid);
      setSessions(list.sort((a, b) => b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt)));
    } catch {
      setSessions([]);
    }
    try {
      setFriends(await getFriends(uid));
    } catch {
      setFriends([]);
    }
  }, []);

  const handleOpen = async () => {
    if (!user) return;
    setIsOpen(true);
    setShowNotices(false);
    setChatFriend(null);
    if (!hasApiToken()) {
      setIsLoading(false);
      void loadLists(user.id);
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
    void loadLists(user.id);
  };

  // 打开聊天：加载历史消息并标记已读（聊天嵌入消息中心，返回不退出）
  useEffect(() => {
    if (!user || !chatFriend) return;
    let cancelled = false;
    void (async () => {
      try {
        const msgs = await getMessagesBetweenUsers(user.id, chatFriend.id);
        if (!cancelled) setChatMessages(msgs);
        await markMessagesAsRead(user.id, chatFriend.id);
        void refreshMsgUnread();
        void loadLists(user.id);
      } catch {
        // 忽略
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, chatFriend?.id]);

  const sendChat = async () => {
    if (!user || !chatFriend || !chatInput.trim()) return;
    const content = chatInput.trim();
    setChatInput('');
    setSending(true);
    const msg: Message = {
      id: generateId(),
      senderId: user.id,
      receiverId: chatFriend.id,
      content,
      images: [],
      createdAt: new Date().toISOString(),
      isRead: false,
      messageType: 'text',
    };
    setChatMessages((prev) => [...prev, msg]);
    try {
      await createMessage(msg);
      void syncMessageToBackend(msg);
    } catch (error) {
      console.warn('发送私信失败:', error);
    } finally {
      setSending(false);
      void loadLists(user.id);
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

  // 好友与私信：有会话的按最近消息排序在前，无消息的互关好友排在后面
  const sessionMap = new Map(sessions.map((s) => [s.friendId, s]));
  const rows: { friend: User; session?: SessionItem }[] = [];
  for (const f of friends) {
    rows.push({ friend: f, session: sessionMap.get(f.id) });
  }
  for (const s of sessions) {
    if (s.friend && !rows.some((r) => r.friend.id === s.friendId)) {
      rows.push({ friend: s.friend, session: s });
    }
  }
  rows.sort((a, b) => {
    if (a.session && b.session) return b.session.lastMessage.createdAt.localeCompare(a.session.lastMessage.createdAt);
    if (a.session) return -1;
    if (b.session) return 1;
    return a.friend.nickname.localeCompare(b.friend.nickname);
  });

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

  const renderAvatar = (u: User | undefined, size: string) => (
    <div className="relative shrink-0">
      <div className={cn('rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center overflow-hidden', size)}>
        {u?.avatar?.startsWith('data:') || u?.avatar?.startsWith('http')
          ? <LazyImage src={u!.avatar} alt="" className="w-full h-full object-cover" />
          : (u?.avatar || '👤')}
      </div>
      <span
        className={cn(
          'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
          isOnline(u) ? 'bg-emerald-500' : 'bg-slate-300'
        )}
        title={isOnline(u) ? '在线' : '离线'}
      />
    </div>
  );

  const renderRow = (friend: User, session?: SessionItem) => (
    <button
      key={friend.id}
      onClick={() => setChatFriend(friend)}
      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
    >
      {renderAvatar(friend, 'w-11 h-11')}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-800 truncate">{friend.nickname}</span>
          {session && (
            <span className="text-[10px] text-gray-400 shrink-0 ml-2">
              {formatRelativeTime(session.lastMessage.createdAt)}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 truncate mt-0.5">
          {session
            ? session.lastMessage.messageType === 'question-card'
              ? '[题目卡片]'
              : session.lastMessage.messageType === 'post-card'
                ? '[帖子卡片]'
                : session.lastMessage.content || '[图片]'
            : '互关成功，打个招呼吧'}
        </p>
      </div>
      {session && session.unreadCount > 0 && (
        <span className="min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
          {session.unreadCount > 99 ? '99+' : session.unreadCount}
        </span>
      )}
      <MessageCircle className="w-4 h-4 text-slate-300 shrink-0" />
    </button>
  );

  const totalUnread = unreadCount + msgUnread;

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
            <DialogTitle className="text-base">{chatFriend ? '私信' : '消息中心'}</DialogTitle>
            {!chatFriend && unreadCount > 0 && (
              <button
                onClick={() => void handleMarkAllRead()}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                全部已读
              </button>
            )}
          </DialogHeader>

          {chatFriend ? (
            /* 内嵌聊天视图（画幅与消息中心一致，返回不退出） */
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-slate-100 shrink-0">
                <button
                  onClick={() => setChatFriend(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                  title="返回好友列表"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                {renderAvatar(chatFriend, 'w-9 h-9')}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{chatFriend.nickname}</p>
                  <p className={cn('text-[10px]', isOnline(chatFriend) ? 'text-emerald-500' : 'text-slate-400')}>
                    {isOnline(chatFriend) ? '在线' : '离线'}
                  </p>
                </div>
              </div>
              <ScrollArea className="flex-1 min-h-0 p-4">
                <div className="space-y-2.5">
                  {chatMessages.length === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-8">还没有消息，打个招呼吧</p>
                  ) : (
                    chatMessages.map((m) => {
                      const isSelf = m.senderId === user.id;
                      return (
                        <div key={m.id} className={cn('flex', isSelf ? 'justify-end' : 'justify-start')}>
                          <div
                            className={cn(
                              'max-w-[72%] rounded-2xl px-3 py-2 text-sm break-words',
                              isSelf
                                ? 'bg-blue-500 text-white rounded-br-md'
                                : 'bg-slate-100 text-slate-800 rounded-bl-md'
                            )}
                          >
                            {m.messageType === 'question-card'
                              ? '[题目卡片]'
                              : m.messageType === 'post-card'
                                ? '[帖子卡片]'
                                : m.content || '[图片]'}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
              <div className="flex items-center gap-2 border-t border-slate-100 p-3 shrink-0">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void sendChat();
                    }
                  }}
                  placeholder="输入消息…"
                  className="flex-1 rounded-full bg-slate-50 border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-300 focus:bg-white transition-colors"
                />
                <Button
                  size="sm"
                  className="rounded-full shrink-0"
                  onClick={() => void sendChat()}
                  disabled={sending || !chatInput.trim()}
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* 互动消息横条 */}
              <div className="px-4 pt-3 shrink-0">
                <button
                  onClick={() => setShowNotices((v) => !v)}
                  className="w-full flex items-center justify-between rounded-xl bg-blue-50 border border-blue-100 px-4 py-2.5 transition-colors hover:bg-blue-100/70"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-blue-700">
                    <Bell className="w-4 h-4" />
                    互动消息
                    {unreadCount > 0 && (
                      <span className="min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </span>
                  <ChevronDown className={cn('w-4 h-4 text-blue-400 transition-transform', showNotices && 'rotate-180')} />
                </button>

                {showNotices && (
                  <div className="mt-2 rounded-xl border border-blue-100 bg-white overflow-hidden">
                    <ScrollArea className="max-h-[260px]">
                      <div className="p-2">
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2 py-8 text-gray-400">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">加载中…</span>
                          </div>
                        ) : notifications.length === 0 ? (
                          <div className="text-center py-8 text-gray-400">
                            <div className="text-3xl mb-2">🔔</div>
                            <p className="text-sm">暂无互动消息</p>
                            <p className="text-xs mt-1">有人点赞、评论或关注你时会在这里提醒</p>
                          </div>
                        ) : (
                          notifications.map(renderNotification)
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>

              {/* 好友与私信列表 */}
              <div className="px-4 pt-3 pb-1 shrink-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">好友与私信</p>
              </div>
              <ScrollArea className="flex-1 min-h-0 px-2 pb-3">
                {rows.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-3xl mb-2">💬</div>
                    <p className="text-sm">还没有好友</p>
                    <p className="text-xs mt-1">在社区与好友互相关注后即可出现在这里</p>
                  </div>
                ) : (
                  rows.map((r) => renderRow(r.friend, r.session))
                )}
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
