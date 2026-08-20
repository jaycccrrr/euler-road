'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getUnreadMessageCount, getChatSessions } from '@/lib/db';
import { useAuth } from '@/hooks/useAuth';
import { ChatDialog } from '@/components/community/ChatDialog';
import { LazyImage } from '@/components/LazyImage';
import { formatRelativeTime } from '@/lib/utils';
import { User } from '@/types';

/**
 * Header 消息中心：铃铛红点 + 会话列表 + 打开聊天窗口。
 * 每 15s 轮询刷新未读数。
 */
export function MessageCenter() {
  const { user, isAuthenticated } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState<Awaited<ReturnType<typeof getChatSessions>>>([]);
  const [chatFriend, setChatFriend] = useState<User | null>(null);

  const refresh = useCallback(async () => {
    if (!user) return;
    try {
      const count = await getUnreadMessageCount(user.id);
      setUnreadCount(count);
    } catch {
      // 忽略
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    void refresh();

    // 每 15s 轮询未读数
    const interval = setInterval(() => void refresh(), 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user, refresh]);

  // 打开会话列表
  const handleOpen = async () => {
    if (!user) return;
    setIsOpen(true);
    try {
      const list = await getChatSessions(user.id);
      setSessions(list);
    } catch (error) {
      console.error('Failed to load chat sessions:', error);
    }
  };

  const handleOpenChat = (friend: User | undefined) => {
    if (!friend) return;
    setChatFriend(friend);
    setIsOpen(false);
  };

  if (!isAuthenticated || !user) return null;

  return (
    <>
      <button
        onClick={() => void handleOpen()}
        className="relative p-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 transition-all duration-200 active:scale-95"
        title="私信"
      >
        <MessageCircle className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* 会话列表 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="!w-[400px] !max-h-[480px] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-4 py-3 border-b shrink-0">
            <DialogTitle className="text-base">私信</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {sessions.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <div className="text-3xl mb-2">💬</div>
                  <p className="text-sm">暂无私信</p>
                  <p className="text-xs mt-1">在社区与好友互相关注后即可聊天</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <button
                    key={session.friendId}
                    onClick={() => handleOpenChat(session.friend)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden shrink-0">
                      {session.friend?.avatar?.startsWith('data:') || session.friend?.avatar?.startsWith('http')
                        ? <LazyImage src={session.friend!.avatar} alt="" className="w-full h-full object-cover" />
                        : (session.friend?.avatar || '👤')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800 truncate">
                          {session.friend?.nickname || '未知用户'}
                        </span>
                        <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                          {formatRelativeTime(session.lastMessage.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-xs text-gray-500 truncate">
                          {session.lastMessage.messageType === 'question-card'
                            ? '[题目卡片]'
                            : session.lastMessage.messageType === 'post-card'
                              ? '[帖子卡片]'
                              : session.lastMessage.content || '[图片]'}
                        </p>
                        {session.unreadCount > 0 && (
                          <span className="min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 ml-2">
                            {session.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* 聊天窗口 */}
      {chatFriend && (
        <ChatDialog
          isOpen={!!chatFriend}
          onClose={() => {
            setChatFriend(null);
            void refresh();
          }}
          currentUser={user}
          friend={chatFriend}
        />
      )}
    </>
  );
}
