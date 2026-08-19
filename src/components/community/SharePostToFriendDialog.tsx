'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CubeLoader from '@/components/ui/cube-loader';
import { getFollowing, areFriends, createMessage } from '@/lib/db';
import { User, Post, PostCardPayload } from '@/types';
import { LazyImage } from '@/components/LazyImage';
import { Send, CheckCircle2 } from 'lucide-react';

interface SharePostToFriendDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  post: Post;
}

/**
 * 把帖子以卡片消息的形式发送给互相关注的好友。
 */
export function SharePostToFriendDialog({ isOpen, onClose, currentUser, post }: SharePostToFriendDialogProps) {
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sentTo, setSentTo] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setSentTo(new Set());

    const load = async () => {
      setIsLoading(true);
      try {
        const following = await getFollowing(currentUser.id);
        const checks = await Promise.all(
          following.map(async (u) => ({ user: u, isFriend: await areFriends(currentUser.id, u.id) }))
        );
        if (!cancelled) {
          setFriends(checks.filter((c) => c.isFriend).map((c) => c.user));
        }
      } catch (error) {
        console.error('Failed to load friends:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [isOpen, currentUser.id]);

  const handleSend = async (friend: User) => {
    const payload: PostCardPayload = {
      kind: 'post-card',
      postId: post.id,
      title: post.title,
      contentPreview: post.content.replace(/[#*$`\n]/g, ' ').slice(0, 80),
      moduleId: post.moduleId,
      authorNickname: post.userNickname,
      authorAvatar: post.userAvatar,
      likes: post.likes || 0,
      commentCount: post.comments?.length || 0,
    };
    const message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      senderId: currentUser.id,
      receiverId: friend.id,
      content: `[帖子] ${post.title}`,
      images: [],
      createdAt: new Date().toISOString(),
      isRead: false,
      messageType: 'post-card' as const,
      cardPayload: payload,
    };
    try {
      await createMessage(message);
      setSentTo((prev) => new Set(prev).add(friend.id));
    } catch (error) {
      console.error('Failed to send post card:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[400px] !max-h-[480px] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-4 py-3 border-b shrink-0">
          <DialogTitle className="text-base">发送给好友</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {isLoading ? (
              <CubeLoader compact text="加载中" subtext="正在加载好友列表…" />
            ) : friends.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-3xl mb-2">👥</div>
                <p className="text-sm">暂无互相关注的好友</p>
                <p className="text-xs mt-1">互相关注后即可分享帖子</p>
              </div>
            ) : (
              friends.map((friend) => {
                const sent = sentTo.has(friend.id);
                return (
                  <div
                    key={friend.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-sm overflow-hidden shrink-0">
                      {friend.avatar?.startsWith('data:') || friend.avatar?.startsWith('http')
                        ? <LazyImage src={friend.avatar} alt="" className="w-full h-full object-cover" />
                        : (friend.avatar || '👤')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{friend.nickname}</p>
                      <p className="text-xs text-gray-400">Lv.{friend.moduleData?.math?.level || 1}</p>
                    </div>
                    {sent ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> 已发送
                      </span>
                    ) : (
                      <Button size="sm" variant="outline" className="shrink-0" onClick={() => void handleSend(friend)}>
                        <Send className="w-3.5 h-3.5 mr-1" /> 发送
                      </Button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
