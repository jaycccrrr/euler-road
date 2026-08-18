'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send, Image as ImageIcon, X, FileQuestion, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import { LazyImage } from '@/components/LazyImage';
import { ShareQuestionPicker } from '@/components/community/ShareQuestionPicker';
import { QuestionCardBubble, PostCardBubble } from '@/components/community/ChatDialog';
import {
  getChatSessions,
  getMessagesBetweenUsers,
  createMessage,
  markMessagesAsRead,
  getUserById,
  areFriends,
} from '@/lib/db';
import { subscribeToTable } from '@/lib/cloud-sync';
import { mergeMessagesFromBackend, mergeConversationsFromBackend, syncMessageToBackend } from '@/lib/api-sync';
import { useAuth } from '@/hooks/useAuth';
import { cn, formatRelativeTime } from '@/lib/utils';
import { User, Message, QuestionCardPayload, PostCardPayload } from '@/types';

type ChatSession = Awaited<ReturnType<typeof getChatSessions>>[number];

/** 从 hash 读取目标用户：/messages/#user=<userId> */
function useHashUserId(): string {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const read = () => {
      const hash = window.location.hash;
      setUserId(hash.startsWith('#user=') ? decodeURIComponent(hash.slice(6)) : '');
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  return userId;
}

function UserAvatar({ user, className }: { user: User; className?: string }) {
  const isImage = user.avatar?.startsWith('data:') || user.avatar?.startsWith('http');
  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center overflow-hidden shrink-0',
        className
      )}
    >
      {isImage ? (
        <LazyImage src={user.avatar} alt="" className="w-full h-full object-cover" />
      ) : (
        <span className="text-white text-sm">{user.avatar || '👤'}</span>
      )}
    </div>
  );
}

/** 消息气泡（chat-messages 动效：入场位移 + 回弹 easing） */
function MessageBubble({ msg, isSelf, sender }: { msg: Message; isSelf: boolean; sender: User }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96, x: isSelf ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex w-full', isSelf ? 'justify-end' : 'justify-start')}
    >
      <div className={cn('flex items-end gap-2 max-w-full', isSelf && 'flex-row-reverse')}>
        <UserAvatar user={sender} className="w-8 h-8" />
        <div className={cn('flex flex-col max-w-[75%]', isSelf ? 'items-end' : 'items-start')}>
          {msg.messageType === 'question-card' && msg.cardPayload?.kind === 'question-card' ? (
            <QuestionCardBubble payload={msg.cardPayload} isSelf={isSelf} senderNickname={sender.nickname} />
          ) : msg.messageType === 'post-card' && msg.cardPayload?.kind === 'post-card' ? (
            <PostCardBubble payload={msg.cardPayload} isSelf={isSelf} />
          ) : (
            <motion.div
              whileHover={{ scale: 1.01, y: -1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={cn(
                'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                isSelf
                  ? 'rounded-tr-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_8px_24px_-4px_rgba(99,102,241,0.35)]'
                  : 'rounded-tl-md border border-slate-200 bg-white text-slate-800 shadow-sm'
              )}
            >
              {msg.content && <p className="whitespace-pre-wrap break-words">{msg.content}</p>}
              {msg.images && msg.images.length > 0 && (
                <div className={cn(msg.content && 'mt-2')}>
                  <img
                    src={msg.images[0]}
                    alt="图片"
                    className="max-w-full max-h-[200px] rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(msg.images![0], '_blank')}
                  />
                </div>
              )}
            </motion.div>
          )}
          <span className="text-[10px] text-slate-400 mt-1 px-1">{formatRelativeTime(msg.createdAt)}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MessagesPage() {
  const { user: currentUser, isAuthenticated, hasHydrated } = useAuth();
  const hashUserId = useHashUserId();

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeFriend, setActiveFriend] = useState<User | null>(null);
  const [activeIsFriend, setActiveIsFriend] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showQuestionPicker, setShowQuestionPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadSessions = useCallback(async () => {
    if (!currentUser) return;
    try {
      await mergeConversationsFromBackend();
      setSessions(await getChatSessions(currentUser.id));
    } catch (error) {
      console.error('Failed to load chat sessions:', error);
    }
  }, [currentUser]);

  // hash 指定目标用户 → 选中会话（无历史会话时新建临时会话）
  useEffect(() => {
    if (!currentUser || !hashUserId) return;
    if (hashUserId === currentUser.id) return;
    if (activeFriend?.id === hashUserId) return;

    let cancelled = false;
    const open = async () => {
      const friend = await getUserById(hashUserId);
      if (!friend || cancelled) return;
      setActiveFriend(friend);
      setActiveIsFriend(await areFriends(currentUser.id, friend.id));
    };
    void open();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashUserId, currentUser]);

  const loadMessages = useCallback(async () => {
    if (!currentUser || !activeFriend) return;
    try {
      await mergeMessagesFromBackend(currentUser.id, activeFriend.id);
      const msgs = await getMessagesBetweenUsers(currentUser.id, activeFriend.id);
      setMessages(msgs);
      await markMessagesAsRead(currentUser.id, activeFriend.id);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }, [currentUser, activeFriend]);

  // 实时订阅（无云端时降级轮询）
  useEffect(() => {
    if (!currentUser || !activeFriend) return;
    void loadMessages();

    const unsubscribe = subscribeToTable('messages', (payload) => {
      const row = payload.new as { data?: Message } | null;
      const msg = row?.data;
      if (!msg) return;
      const involvesPair =
        (msg.senderId === currentUser.id && msg.receiverId === activeFriend.id) ||
        (msg.senderId === activeFriend.id && msg.receiverId === currentUser.id);
      if (involvesPair) {
        void loadMessages();
        void loadSessions();
      }
    });
    if (unsubscribe) return unsubscribe;

    const interval = setInterval(() => {
      void loadMessages();
      void loadSessions();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentUser, activeFriend, loadMessages, loadSessions]);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  // 新消息平滑滚动到底部
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSelectSession = (friend: User | undefined) => {
    if (!friend || !currentUser) return;
    window.location.hash = `user=${encodeURIComponent(friend.id)}`;
    setActiveFriend(friend);
    void areFriends(currentUser.id, friend.id).then(setActiveIsFriend);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || sending || !currentUser || !activeFriend) return;

    setSending(true);
    try {
      const newMsg: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        senderId: currentUser.id,
        receiverId: activeFriend.id,
        content: input.trim(),
        images: selectedImage ? [selectedImage] : [],
        createdAt: new Date().toISOString(),
        isRead: false,
        messageType: 'text',
      };
      await createMessage(newMsg);
      void syncMessageToBackend(newMsg);
      setInput('');
      setSelectedImage(null);
      await loadMessages();
      await loadSessions();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const sendCardMessage = async (payload: QuestionCardPayload | PostCardPayload) => {
    if (!currentUser || !activeFriend) return;
    const newMsg: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      senderId: currentUser.id,
      receiverId: activeFriend.id,
      content: payload.kind === 'question-card' ? `[题目卡片] ${payload.questionTitle}` : `[帖子] ${payload.title}`,
      images: [],
      createdAt: new Date().toISOString(),
      isRead: false,
      messageType: payload.kind,
      cardPayload: payload,
    };
    await createMessage(newMsg);
    void syncMessageToBackend(newMsg);
    await loadMessages();
    await loadSessions();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex flex-col items-center justify-center pt-40 text-slate-400">
          <MessageCircle className="w-10 h-10 mb-3 opacity-50" />
          <p className="text-sm">登录后才能查看私信</p>
          <Link href="/login/" className="mt-3 text-sm text-blue-600 hover:underline">
            去登录
          </Link>
        </div>
      </div>
    );
  }

  const canSend = (input.trim().length > 0 || !!selectedImage) && !sending && activeIsFriend;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 pt-20 pb-6 h-screen flex flex-col">
        <div className="flex-1 min-h-0 grid md:grid-cols-[260px_1fr] rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* 左：会话列表 */}
          <aside className="border-r border-slate-100 flex flex-col min-h-0 max-md:hidden">
            <div className="px-4 py-3 border-b border-slate-100 shrink-0">
              <h1 className="text-sm font-bold text-slate-800">私信</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {sessions.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <div className="text-3xl mb-2">💬</div>
                  <p className="text-xs">暂无私信</p>
                  <p className="text-[11px] mt-1">与好友互相关注后即可聊天</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <button
                    key={session.friendId}
                    onClick={() => handleSelectSession(session.friend)}
                    className={cn(
                      'w-full flex items-center gap-2.5 p-2.5 rounded-xl transition-colors text-left',
                      activeFriend?.id === session.friendId ? 'bg-indigo-50' : 'hover:bg-slate-50'
                    )}
                  >
                    {session.friend && <UserAvatar user={session.friend} className="w-9 h-9" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-medium text-slate-800 truncate">
                          {session.friend?.nickname || '未知用户'}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {formatRelativeTime(session.lastMessage.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-1 mt-0.5">
                        <p className="text-[11px] text-slate-500 truncate">
                          {session.lastMessage.messageType === 'question-card'
                            ? '[题目卡片]'
                            : session.lastMessage.messageType === 'post-card'
                              ? '[帖子卡片]'
                              : session.lastMessage.content || '[图片]'}
                        </p>
                        {session.unreadCount > 0 && (
                          <span className="min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                            {session.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* 右：聊天窗口 */}
          <section className="flex flex-col min-h-0 bg-gradient-to-b from-slate-50/80 to-white">
            {!activeFriend ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <MessageCircle className="w-10 h-10 mb-3 opacity-40" />
                <p className="text-sm">选择左侧会话开始聊天</p>
                <p className="text-[11px] mt-1 md:hidden">也可以从对方主页的「私信」按钮进入</p>
              </div>
            ) : (
              <>
                {/* 头部 */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white/80 shrink-0">
                  <UserAvatar user={activeFriend} className="w-9 h-9" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{activeFriend.nickname}</p>
                    <p className="text-[11px] text-slate-400">
                      Lv.{activeFriend.moduleData?.math?.level || 1}{' '}
                      {activeFriend.moduleData?.math?.selectedTitle || activeFriend.title || ''}
                    </p>
                  </div>
                </div>

                {/* 消息列表 */}
                <div ref={scrollRef} role="log" aria-live="polite" className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <div className="text-4xl mb-2">💬</div>
                      <p className="text-sm">暂无消息</p>
                      <p className="text-xs mt-1">开始和 {activeFriend.nickname} 聊天吧</p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isSelf = msg.senderId === currentUser.id;
                      return (
                        <MessageBubble
                          key={msg.id}
                          msg={msg}
                          isSelf={isSelf}
                          sender={isSelf ? currentUser : activeFriend}
                        />
                      );
                    })
                  )}
                </div>

                {/* 输入区 */}
                <div className="border-t border-slate-100 p-3 shrink-0">
                  {!activeIsFriend && (
                    <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5 mb-2">
                      你们还没有互相关注，成为好友后才能发送私信
                    </p>
                  )}
                  {selectedImage && (
                    <div className="relative mb-2 inline-block">
                      <img src={selectedImage} alt="预览" className="h-16 w-16 object-cover rounded-lg border" />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition-colors focus-within:border-indigo-300 focus-within:bg-white">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      title="发送图片"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                    <button
                      onClick={() => setShowQuestionPicker(true)}
                      title="分享题目卡片"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <FileQuestion className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          void handleSend();
                        }
                      }}
                      disabled={!activeIsFriend}
                      placeholder={activeIsFriend ? `发消息给 ${activeFriend.nickname}…` : '互相关注后才能发送'}
                      aria-label="输入私信内容"
                      className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                    />
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => void handleSend()}
                      disabled={!canSend}
                      aria-label="发送"
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                        canSend
                          ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_4px_12px_-2px_rgba(99,102,241,0.4)]'
                          : 'bg-slate-100 text-slate-300'
                      )}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <ShareQuestionPicker
                  isOpen={showQuestionPicker}
                  onClose={() => setShowQuestionPicker(false)}
                  currentUser={currentUser}
                  onSelect={(payload) => {
                    setShowQuestionPicker(false);
                    void sendCardMessage(payload);
                  }}
                />
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
