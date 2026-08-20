'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  getMessagesBetweenUsers,
  createMessage,
  markMessagesAsRead,
} from '@/lib/db';
import { User, Message, QuestionCardPayload, PostCardPayload } from '@/types';
import { Send, Image as ImageIcon, X, FileQuestion, FileText, Flame, ExternalLink } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import { formatRelativeTime } from '@/lib/utils';
import { getPrimaryFrame, initModuleData } from '@/lib/gamification';
import { ShareQuestionPicker } from './ShareQuestionPicker';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  friend: User;
}

const MODULE_NAMES: Record<string, string> = {
  'highschool-math': '高中数学',
  'advanced-math': '高等数学',
  'linear-algebra': '线性代数',
};

export function ChatDialog({ isOpen, onClose, currentUser, friend }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showQuestionPicker, setShowQuestionPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 加载消息
  const loadMessages = useCallback(async () => {
    if (!isOpen) return;
    try {
      const msgs = await getMessagesBetweenUsers(currentUser.id, friend.id);
      setMessages(msgs);
      // 标记消息为已读
      await markMessagesAsRead(currentUser.id, friend.id);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }, [isOpen, currentUser.id, friend.id]);

  useEffect(() => {
    loadMessages();

    // 轮询刷新当前会话消息
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [loadMessages, currentUser.id, friend.id]);

  // 滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 发送消息
  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !selectedImage) || isLoading) return;

    setIsLoading(true);
    try {
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        senderId: currentUser.id,
        receiverId: friend.id,
        content: inputMessage.trim(),
        images: selectedImage ? [selectedImage] : [],
        createdAt: new Date().toISOString(),
        isRead: false,
        messageType: 'text',
      };

      await createMessage(newMessage);
      setInputMessage('');
      setSelectedImage(null);
      await loadMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 发送卡片消息（题目卡片 / 帖子卡片共用）
  const sendCardMessage = async (payload: QuestionCardPayload | PostCardPayload) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      senderId: currentUser.id,
      receiverId: friend.id,
      content: payload.kind === 'question-card' ? `[题目卡片] ${payload.questionTitle}` : `[帖子] ${payload.title}`,
      images: [],
      createdAt: new Date().toISOString(),
      isRead: false,
      messageType: payload.kind,
      cardPayload: payload,
    };
    await createMessage(newMessage);
    await loadMessages();
  };

  // 处理图片选择
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 获取头像框样式
  const getAvatarFrameClass = (user: User) => {
    const moduleData = user.moduleData || initModuleData();
    return getPrimaryFrame(moduleData, user.displayCategory);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[500px] !h-[600px] p-0 overflow-hidden flex flex-col">
        {/* 头部 */}
        <DialogHeader className="px-4 py-3 border-b bg-gradient-to-r from-blue-500 to-purple-500 shrink-0">
          <DialogTitle className="text-white flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg bg-white/20 ${getAvatarFrameClass(friend)}`}>
              {friend.avatar?.startsWith('data:') || friend.avatar?.startsWith('http')
                ? <LazyImage src={friend.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                : (friend.avatar || '👤')
              }
            </div>
            <div>
              <div className="font-medium">{friend.nickname}</div>
              <div className="text-xs text-white/70">
                Lv.{friend.moduleData?.math?.level || 1} {friend.moduleData?.math?.selectedTitle}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* 消息列表 */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-2">💬</div>
                <p>暂无消息</p>
                <p className="text-sm">开始和好友聊天吧</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isSelf = msg.senderId === currentUser.id;
                const sender = isSelf ? currentUser : friend;

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}
                  >
                    {/* 头像 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0 ${getAvatarFrameClass(sender)}`}>
                      {sender.avatar?.startsWith('data:') || sender.avatar?.startsWith('http')
                        ? <LazyImage src={sender.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                        : (sender.avatar || '👤')
                      }
                    </div>

                    {/* 消息内容 */}
                    <div className={`max-w-[75%] ${isSelf ? 'items-end' : 'items-start'} flex flex-col`}>
                      {msg.messageType === 'question-card' && msg.cardPayload?.kind === 'question-card' ? (
                        <QuestionCardBubble payload={msg.cardPayload} isSelf={isSelf} senderNickname={sender.nickname} />
                      ) : msg.messageType === 'post-card' && msg.cardPayload?.kind === 'post-card' ? (
                        <PostCardBubble payload={msg.cardPayload} isSelf={isSelf} />
                      ) : (
                        <div
                          className={`px-3 py-2 rounded-lg ${
                            isSelf
                              ? 'bg-blue-500 text-white rounded-br-none'
                              : 'bg-gray-100 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          {msg.content && <p className="text-sm whitespace-pre-wrap">{msg.content}</p>}
                          {msg.images && msg.images.length > 0 && (
                            <div className="mt-2">
                              <img
                                src={msg.images[0]}
                                alt="图片"
                                className="max-w-full max-h-[200px] rounded cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => window.open(msg.images![0], '_blank')}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      <span className="text-xs text-gray-400 mt-1">
                        {formatRelativeTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        {/* 输入区域 */}
        <div className="p-3 border-t bg-gray-50">
          {/* 图片预览 */}
          {selectedImage && (
            <div className="relative mb-2 inline-block">
              <img
                src={selectedImage}
                alt="预览"
                className="h-16 w-16 object-cover rounded-lg border"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="flex gap-2">
            {/* 图片按钮 */}
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => fileInputRef.current?.click()}
              title="发送图片"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            {/* 分享题目卡片按钮 */}
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => setShowQuestionPicker(true)}
              title="分享题目卡片"
            >
              <FileQuestion className="w-4 h-4" />
            </Button>

            {/* 输入框 */}
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="输入消息..."
              className="flex-1"
            />

            {/* 发送按钮 */}
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputMessage.trim() && !selectedImage)}
              className="shrink-0 bg-gradient-to-r from-blue-500 to-purple-500"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 题目卡片选择器 */}
        <ShareQuestionPicker
          isOpen={showQuestionPicker}
          onClose={() => setShowQuestionPicker(false)}
          currentUser={currentUser}
          onSelect={(payload) => {
            setShowQuestionPicker(false);
            void sendCardMessage(payload);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

/** 每日一题卡片气泡 */
export function QuestionCardBubble({
  payload,
  isSelf,
  senderNickname,
}: {
  payload: QuestionCardPayload;
  isSelf: boolean;
  senderNickname: string;
}) {
  return (
    <Link href={`/daily/#date=${payload.date}&module=${payload.moduleId}`} className="block group">
      <div className="w-[280px] rounded-xl border border-amber-200 bg-[#faf8f3] overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
        {/* 卡片头 */}
        <div className="px-3 py-2 border-b border-amber-100 flex items-center justify-between">
          <span className="font-serif text-xs tracking-widest text-amber-800">欧拉之路 · 每日一题</span>
          <span className="text-[10px] text-amber-600">{MODULE_NAMES[payload.moduleId] || payload.moduleId}</span>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-[10px] ${i < payload.difficulty ? 'text-amber-500' : 'text-gray-300'}`}>★</span>
            ))}
            <span className="text-[10px] text-gray-400 ml-1">{payload.date}</span>
          </div>
          <p className="text-sm font-medium text-gray-800 line-clamp-2">{payload.questionTitle}</p>
          {typeof payload.score === 'number' && (
            <div className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              payload.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {payload.isCorrect ? '✓ 答对' : '✗ 未答对'} · {payload.score} 分
            </div>
          )}
          {typeof payload.streak === 'number' && payload.streak > 0 && (
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-orange-500 ml-2">
              <Flame className="w-3 h-3" /> 连续 {payload.streak} 天
            </div>
          )}
        </div>
        <div className="px-3 py-1.5 bg-amber-50/60 flex items-center justify-between text-[10px] text-gray-500">
          <span>{isSelf ? '我' : senderNickname} 分享的题目</span>
          <span className="inline-flex items-center gap-0.5 text-blue-600 group-hover:underline">
            查看 <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** 帖子卡片气泡 */
export function PostCardBubble({ payload, isSelf }: { payload: PostCardPayload; isSelf: boolean }) {
  return (
    <Link href={`/community/post/#id=${payload.postId}`} className="block group">
      <div className="w-[280px] rounded-xl border border-blue-100 bg-white overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
        <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs text-white overflow-hidden">
            {payload.authorAvatar?.startsWith('data:') || payload.authorAvatar?.startsWith('http')
              ? <LazyImage src={payload.authorAvatar} alt="" className="w-full h-full object-cover" />
              : (payload.authorAvatar || '👤')}
          </div>
          <span className="text-xs text-gray-600">{payload.authorNickname}</span>
          <span className="ml-auto text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
            {MODULE_NAMES[payload.moduleId] || payload.moduleId}
          </span>
        </div>
        <div className="p-3">
          <p className="text-sm font-medium text-gray-800 line-clamp-1 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            {payload.title}
          </p>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{payload.contentPreview}</p>
        </div>
        <div className="px-3 py-1.5 bg-gray-50 flex items-center justify-between text-[10px] text-gray-500">
          <span>❤️ {payload.likes} · 💬 {payload.commentCount}</span>
          <span className="inline-flex items-center gap-0.5 text-blue-600 group-hover:underline">
            查看帖子 <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
