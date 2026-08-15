'use client';

import { useState } from 'react';
import { User, Post } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/LazyImage';
import { getPrimaryFrame, initModuleData, getModuleTitles } from '@/lib/gamification';
import { formatRelativeTime } from '@/lib/utils';
import {
  Heart,
  MessageSquare,
  UserPlus,
  UserCheck,
  Users,
  MapPin,
  Calendar,
  Crown,
  ChevronRight,
  ThumbsUp,
} from 'lucide-react';

type TabId = 'posts' | 'following' | 'followers';

interface UserProfileCardProps {
  user: User;
  posts: Post[];
  following: User[];
  followers: User[];
  friends: User[];
  isCurrentUser: boolean;
  isFollowing: boolean;
  onToggleFollow: () => void;
  /** 私信入口(好友可见);不传则不显示私信按钮 */
  onMessage?: () => void;
  onPostClick: (post: Post) => void;
  canViewFollowing?: boolean;
  canViewFollowers?: boolean;
}

function getAvatarFrame(level: number) {
  if (level >= 7) return 'avatar-frame-halo';
  if (level >= 5) return 'avatar-frame-gold';
  if (level >= 3) return 'avatar-frame-silver';
  return 'avatar-frame-default';
}

/** 用户列表项(关注/粉丝/好友) */
function UserListItem({ u, isFriend, badge }: { u: User; isFriend: boolean; badge?: 'friend' | 'followsYou' }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="relative shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg overflow-hidden ${getAvatarFrame(u.moduleData?.math?.level || 1)}`}>
          {u.avatar?.startsWith('data:') || u.avatar?.startsWith('http')
            ? <LazyImage src={u.avatar} alt="" className="w-full h-full object-cover" />
            : (u.avatar || '👤')}
        </div>
        {isFriend && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center" title="好友">
            <Heart className="w-2.5 h-2.5 text-white fill-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-slate-900 truncate">{u.nickname}</div>
        <div className="text-[11px] text-slate-500 truncate">
          Lv.{u.moduleData?.math?.level || 1} {u.moduleData?.math?.selectedTitle || u.title}
        </div>
      </div>
      {badge === 'friend' && <Badge variant="secondary" className="text-[10px]">好友</Badge>}
      {badge === 'followsYou' && <Badge variant="outline" className="text-[10px]">关注了你</Badge>}
    </div>
  );
}

/**
 * 用户主页卡片(知乎风格):
 * 封面横幅 + 叠加头像 + 右侧操作按钮,左侧 Tab 内容区 + 右侧数据统计栏。
 * 社区页与帖子详情页共用。
 */
export function UserProfileCard({
  user,
  posts,
  following,
  followers,
  friends,
  isCurrentUser,
  isFollowing,
  onToggleFollow,
  onMessage,
  onPostClick,
  canViewFollowing = true,
  canViewFollowers = true,
}: UserProfileCardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('posts');

  const moduleData = user.moduleData || initModuleData();
  const frame = getPrimaryFrame(moduleData, user.displayCategory);
  const titles = getModuleTitles('math');
  const currentTitle = titles[`level${moduleData.math.level}` as keyof typeof titles];
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);

  const tabs: { id: TabId; label: string; count?: number; hidden?: boolean }[] = [
    { id: 'posts', label: '帖子', count: posts.length },
    { id: 'following', label: '关注', count: following.length, hidden: !canViewFollowing },
    { id: 'followers', label: '粉丝', count: followers.length, hidden: !canViewFollowers },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ===== 封面横幅 ===== */}
      <div className="relative h-32 md:h-36 shrink-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 overflow-hidden">
        {user.coverImage ? (
          <img src={user.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <>
            <span className="absolute top-4 right-24 text-white/10 text-5xl font-serif select-none">π</span>
            <span className="absolute bottom-3 right-10 text-white/10 text-3xl font-serif select-none">∫</span>
            <span className="absolute top-7 left-1/3 text-white/[0.07] text-6xl font-serif select-none">Σ</span>
            <span className="absolute -bottom-4 left-1/2 text-white/[0.06] text-7xl font-serif select-none">e</span>
            <span className="absolute top-2 left-8 text-white/[0.08] text-4xl font-serif select-none">√</span>
          </>
        )}
        {/* IP 属地角标 */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-white/90 text-[11px]">
          <MapPin className="w-3 h-3" />
          IP 属地{user.location?.province || '未知'}
        </div>
      </div>

      {/* ===== 头部信息区 ===== */}
      <div className="shrink-0 px-5 md:px-6 pb-4 border-b border-slate-100">
        <div className="flex items-end justify-between gap-4">
          {/* 头像(叠加封面上) */}
          <div className={`-mt-10 md:-mt-12 w-20 h-20 md:w-24 md:h-24 avatar-frame avatar-frame-${frame} p-[3px] relative z-10 shrink-0`}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl md:text-4xl overflow-hidden ring-4 ring-white">
              {user.avatar?.startsWith('data:') || user.avatar?.startsWith('http')
                ? <LazyImage src={user.avatar} alt={user.nickname} className="w-full h-full object-cover" />
                : (user.avatar || '👤')}
            </div>
          </div>
          {/* 操作按钮 */}
          {!isCurrentUser && (
            <div className="flex gap-2 pb-1">
              {onMessage && friends.length >= 0 && (
                <Button variant="outline" size="sm" onClick={onMessage} className="rounded-full px-4">
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                  私信
                </Button>
              )}
              <Button
                size="sm"
                onClick={onToggleFollow}
                className={`rounded-full px-5 ${
                  isFollowing
                    ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? (
                  <><UserCheck className="w-3.5 h-3.5 mr-1.5" />已关注</>
                ) : (
                  <><UserPlus className="w-3.5 h-3.5 mr-1.5" />关注</>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* 昵称 + 徽章 */}
        <div className="flex items-center gap-2 flex-wrap mt-2.5">
          <h2 className="text-xl font-bold text-slate-900">{user.nickname}</h2>
          <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200 text-[11px]">{currentTitle}</Badge>
          <Badge className="bg-amber-50 text-amber-600 border border-amber-200 text-[11px]">Lv.{moduleData.math.level}</Badge>
          {user.isAdmin && (
            <Badge className="bg-rose-50 text-rose-600 border border-rose-200 text-[11px]">
              <Crown className="w-3 h-3 mr-1" />管理员
            </Badge>
          )}
        </div>

        {/* 简介 */}
        {user.bio && (
          <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">{user.bio}</p>
        )}

        {/* 加入时间 */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(user.createdAt).toLocaleDateString('zh-CN')} 加入
        </div>
      </div>

      {/* ===== 主体:左内容 + 右数据栏 ===== */}
      <div className="flex-1 min-h-0 flex">
        {/* 左:Tab + 内容 */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="shrink-0 flex items-center gap-1 px-4 pt-3 pb-2 border-b border-slate-100">
            {tabs.filter(t => !t.hidden).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1 text-[11px] text-slate-400">{tab.count}</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {/* 帖子 */}
            {activeTab === 'posts' && (
              posts.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">暂无帖子</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {posts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                      onClick={() => onPostClick(p)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {p.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-1">{p.content}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                            <span>{formatRelativeTime(p.createdAt)}</span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />{p.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />{p.comments.length}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* 关注 */}
            {activeTab === 'following' && canViewFollowing && (
              following.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <UserPlus className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">暂无关注</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {following.map((u) => (
                    <UserListItem
                      key={u.id}
                      u={u}
                      isFriend={friends.some(f => f.id === u.id)}
                      badge={friends.some(f => f.id === u.id) ? 'friend' : undefined}
                    />
                  ))}
                </div>
              )
            )}

            {/* 粉丝 */}
            {activeTab === 'followers' && canViewFollowers && (
              followers.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">暂无粉丝</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {followers.map((u) => (
                    <UserListItem
                      key={u.id}
                      u={u}
                      isFriend={friends.some(f => f.id === u.id)}
                      badge={friends.some(f => f.id === u.id) ? 'friend' : 'followsYou'}
                    />
                  ))}
                </div>
              )
            )}

          </div>
        </div>

        {/* 右:数据栏 */}
        <div className="w-44 md:w-52 shrink-0 border-l border-slate-100 p-4 space-y-4 overflow-y-auto">
          {/* 关注/粉丝 */}
          <div className="flex rounded-xl border border-slate-100 overflow-hidden">
            <button
              onClick={() => canViewFollowing && setActiveTab('following')}
              className="flex-1 py-2.5 text-center hover:bg-slate-50 transition-colors"
            >
              <div className="text-base font-bold text-slate-900">{following.length}</div>
              <div className="text-[11px] text-slate-400">关注了</div>
            </button>
            <div className="w-px bg-slate-100" />
            <button
              onClick={() => canViewFollowers && setActiveTab('followers')}
              className="flex-1 py-2.5 text-center hover:bg-slate-50 transition-colors"
            >
              <div className="text-base font-bold text-slate-900">{followers.length}</div>
              <div className="text-[11px] text-slate-400">关注者</div>
            </button>
          </div>

          {/* 个人成就 */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">个人成就</p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-[13px] text-slate-600">
                <ThumbsUp className="w-4 h-4 text-slate-400 shrink-0" />
                获得 <span className="font-semibold text-slate-900">{totalLikes}</span> 次赞同
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate-600">
                <span className="w-4 h-4 flex items-center justify-center text-violet-500 font-serif font-bold text-sm shrink-0">π</span>
                累计 <span className="font-semibold text-violet-600">{user.piPower?.currentPi || 0}π</span> 力
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate-600">
                <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
                发布 <span className="font-semibold text-slate-900">{posts.length}</span> 篇帖子
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
