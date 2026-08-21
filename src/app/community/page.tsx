'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { getPostsPaginated, getAllPosts, createPost, updatePost, getUserById, resetDatabase, getFollowing, getFollowers, areFriends, searchUsers } from '@/lib/db';
import { mergePostsFromBackend, syncPostToBackend, syncPostUpdateToBackend, fetchAndCacheUser, getFollowingWithBackend } from '@/lib/api-sync';
import { StarFavoriteButton } from '@/components/ui/star-favorite-button';
import CubeLoader from '@/components/ui/cube-loader';
import { likesAPI, usersAPI } from '@/lib/api-client';
import { hasApiToken } from '@/lib/api-auth';
import { apiUserToLocalUser } from '@/lib/api-auth';
import { navigateTo } from '@/lib/asset';
import { VirtualList } from '@/components/VirtualList';
import { getPrimaryFrame, FRAME_STYLES, initModuleData, getModuleTitles } from '@/lib/gamification';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  MessageSquare,
  Heart,
  Plus,
  TrendingUp,
  Search,
  Bookmark,
  BookmarkCheck,
  Crown,
  MapPin,
  Calendar,
  Calculator,
  Award,
  UserPlus,
  UserCheck,
  ChevronRight,
  HelpCircle,
  FileText,
  Lightbulb,
  Users,
  X,
  Flame,
  History,
  Trash2,
} from 'lucide-react';
import { formatRelativeTime, generateId } from '@/lib/utils';
import { KNOWLEDGE_MODULES, MODULE_CATEGORIES } from '@/data/modules';
import { Post, User, PostType } from '@/types';
import Link from 'next/link';
import { PostEditor, ChatDialog } from '@/components/community';
import { LazyImage } from '@/components/LazyImage';
import { UserProfileCard } from '@/components/user/UserProfileCard';
import { PollDisplay } from '@/components/community/PollDisplay';
import { sortByHot } from '@/lib/hot-feed';
import { useSearchHistory } from '@/hooks/useSearchHistory';

const POST_TYPE_ICONS: Record<PostType, React.ReactNode> = {
  question: <HelpCircle className="w-3 h-3" />,
  article: <FileText className="w-3 h-3" />,
  answer: <MessageSquare className="w-3 h-3" />,
  thought: <Lightbulb className="w-3 h-3" />,
};

const POST_TYPE_LABELS: Record<PostType, string> = {
  question: '提问',
  article: '文章',
  answer: '回答',
  thought: '想法',
};

export default function CommunityPage() {
  const router = useRouter();
  const { isAuthenticated, user, addToFavorites, removeFromFavorites, isFavorite, followUser, unfollowUser, isFollowing } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [nextLastId, setNextLastId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 用户详情弹窗状态
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  // 用户社交数据状态
  const [userFollowing, setUserFollowing] = useState<User[]>([]);
  const [userFollowers, setUserFollowers] = useState<User[]>([]);
  const [userFriends, setUserFriends] = useState<User[]>([]);
  const [userActiveTab, setUserActiveTab] = useState('posts');

  // 聊天状态
  const [chatFriend, setChatFriend] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 用户等级信息缓存
  const [userFrames, setUserFrames] = useState<Record<string, string>>({});

  // 关注相关状态
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const [friendIds, setFriendIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('all');

  // 热榜状态（全量排序，独立于分页加载）
  const [hotPosts, setHotPosts] = useState<Post[]>([]);
  const [isHotLoading, setIsHotLoading] = useState(false);

  // 搜索结果
  const [userSearchResults, setUserSearchResults] = useState<User[]>([]);
  const [postSearchResults, setPostSearchResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // 搜索历史（localStorage 持久化）
  const {
    history: searchHistory,
    addHistory: addSearchHistory,
    removeHistory: removeSearchHistory,
    clearHistory: clearSearchHistory,
  } = useSearchHistory('community');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // 点击搜索框外部时收起历史记录下拉
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 加载关注列表和好友关系
  const loadFollowingData = useCallback(async () => {
    if (!user) return;
    try {
      const following = await getFollowingWithBackend(user.id);
      setFollowingUsers(following);

      // 检查哪些是好友（互相关注）
      const friends = new Set<string>();
      await Promise.all(
        following.map(async (u) => {
          const isFriend = await areFriends(user.id, u.id);
          if (isFriend) {
            friends.add(u.id);
          }
        })
      );
      setFriendIds(friends);
    } catch (error) {
      console.error('Failed to load following:', error);
    }
  }, [user]);

  useEffect(() => {
    loadPosts();
    loadFollowingData();
    // 当页面重新获得焦点时刷新帖子（用于头像更新后同步）
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadPosts();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 监听用户头像更新事件
    const handleAvatarUpdated = () => {
      // 延迟刷新确保 IndexedDB 事务完成
      setTimeout(() => loadPosts(), 100);
    };
    window.addEventListener('userAvatarUpdated', handleAvatarUpdated);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('userAvatarUpdated', handleAvatarUpdated);
    };
  }, []);

  // 切换到热榜时全量加载并按热度排序
  useEffect(() => {
    if (activeTab !== 'hot') return;
    let cancelled = false;
    const load = async () => {
      setIsHotLoading(true);
      try {
        const all = await getAllPosts();
        const migrated = all.map(post => ({
          ...post,
          postType: post.postType || 'question',
          topics: post.topics || [],
          commentPermission: post.commentPermission || 'all',
          mentions: post.mentions || [],
        }));
        if (!cancelled) setHotPosts(sortByHot(migrated).slice(0, 50));
      } catch (error) {
        console.error('Failed to load hot posts:', error);
      } finally {
        if (!cancelled) setIsHotLoading(false);
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [activeTab]);

  const loadPosts = async (cursor?: string, append = false, lastId?: string | null) => {
    if (append) setIsLoadingMore(true);
    else setIsLoading(true);
    try {
      // 先把后端（其他设备发布的）帖子合并进本地
      await mergePostsFromBackend();

      const { posts: newPosts, nextCursor: newNextCursor, nextLastId: newNextLastId } = await getPostsPaginated({
        cursor,
        lastId: lastId ?? undefined,
        limit: 20,
        order: 'desc',
      });
      // 确保所有帖子都有新字段的默认值
      const migratedPosts = newPosts.map(post => ({
        ...post,
        postType: post.postType || 'question',
        topics: post.topics || [],
        commentPermission: post.commentPermission || 'all',
        mentions: post.mentions || [],
      }));

      if (append) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          return [...prev, ...migratedPosts.filter(p => !existingIds.has(p.id))];
        });
      } else {
        setPosts(migratedPosts);
      }
      setNextCursor(newNextCursor);
      setNextLastId(newNextLastId);
      setHasMore(!!newNextCursor);

      // 获取新加载帖子用户的等级信息
      const userIds = [...new Set(migratedPosts.map(p => p.userId))];
      const frameMap: Record<string, string> = {};

      await Promise.all(
        userIds.map(async (userId) => {
          try {
            const userData = await fetchAndCacheUser(userId);
            if (userData) {
              const moduleData = userData.moduleData || initModuleData();
              const frame = getPrimaryFrame(moduleData, userData.displayCategory);
              frameMap[userId] = frame;
            }
          } catch (e) {
            console.error('Failed to get user frame:', e);
          }
        })
      );

      setUserFrames(prev => ({ ...prev, ...frameMap }));
    } catch (error) {
      console.error('Failed to load posts:', error);
      if (!append) setPosts([]);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || !nextCursor) return;
    await loadPosts(nextCursor, true, nextLastId);
  }, [isLoadingMore, hasMore, nextCursor, nextLastId]);

  const handleSubmitPost = async (postData: Omit<Post, 'id' | 'createdAt' | 'likes' | 'likedBy' | 'comments'>) => {
    if (!user) throw new Error('未登录，无法发布');

    const newPost: Post = {
      ...postData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: [],
    };

    await createPost(newPost);
    void syncPostToBackend(newPost);
    setDialogOpen(false);
    await loadPosts(undefined, false);
  };

  const handleSaveDraft = (draft: Partial<Post>) => {
    localStorage.setItem('post_draft', JSON.stringify({
      ...draft,
      savedAt: new Date().toISOString(),
    }));
    console.log('草稿已保存');
  };

  const filterPostsByModule = (moduleId: string) => {
    let filtered = posts;
    if (moduleId !== 'all') {
      filtered = posts.filter(p => p.moduleId === moduleId || (moduleId === 'general' && !p.moduleId));
    }
    // 搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.userNickname.toLowerCase().includes(query) ||
        p.topics?.some(t => t.toLowerCase().includes(query))
      );
    }
    return filtered;
  };

  // 投票/卡片内联更新：本地即时刷新 + 持久化
  const handleUpdatePost = async (updated: Post) => {
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setHotPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    await updatePost(updated);
    void syncPostUpdateToBackend(updated);
  };

  // 帖子卡片渲染（提取复用）
  const renderPostCard = (post: Post) => {
    const moduleInfo = getModuleInfo(post.moduleId);
    return (
      <Card
        key={post.id}
        className="p-6 cartoon-card hover:scale-[1.01] transition-transform cursor-pointer break-inside-avoid mb-4"
        onClick={() => router.push(`/community/post/#id=${post.id}`)}
      >
        <div className="flex items-start gap-4">
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpenUserDialog(post.userId);
            }}
            className={`w-10 h-10 avatar-frame avatar-frame-${userFrames[post.userId] || 'default'} p-[2px] flex-shrink-0 hover:scale-110 transition-transform cursor-pointer`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm overflow-hidden">
              {post.userAvatar?.startsWith('data:') || post.userAvatar?.startsWith('http')
                ? <LazyImage src={post.userAvatar} alt="" className="w-full h-full object-cover" />
                : (post.userAvatar || '👤')}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenUserDialog(post.userId);
                }}
                className="font-medium hover:text-purple-600 transition-colors"
              >
                {post.userNickname}
              </button>
              <Badge className={moduleInfo.color}>{moduleInfo.name}</Badge>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                {POST_TYPE_ICONS[post.postType || 'question']}
                {POST_TYPE_LABELS[post.postType || 'question']}
              </Badge>
              <span className="text-xs text-gray-400">{formatRelativeTime(post.createdAt)}</span>
            </div>
            <Link href={`/community/post/#id=${post.id}`}>
              <h3 className="text-lg font-bold mb-2 hover:text-purple-600 transition-colors">{post.title}</h3>
            </Link>
            <p className="text-gray-600 line-clamp-2 mb-3">{post.content}</p>
            {post.topics && post.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.topics.map((topic, idx) => (
                  <span key={idx} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    #{topic}
                  </span>
                ))}
              </div>
            )}
            {post.images.length > 0 && (
              <div className="flex gap-2 mb-3">
                {post.images.slice(0, 3).map((img, idx) => (
                  <LazyImage
                    key={idx}
                    src={img}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            {post.poll && (
              <div onClick={(e) => e.stopPropagation()}>
                <PollDisplay
                  post={post}
                  currentUserId={user?.id}
                  compact
                  onVote={handleUpdatePost}
                />
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button
                onClick={(e) => handleLikePost(e, post.id)}
                className={`flex items-center gap-1 transition-colors ${
                  user && post.likedBy?.includes(user.id) ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${user && post.likedBy?.includes(user.id) ? 'fill-current' : ''}`} />
                {post.likes}
              </button>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {post.comments.length} 评论
              </span>
              <StarFavoriteButton
                active={isFavorite(post.id)}
                onToggle={() => {
                  if (!isAuthenticated) {
                    router.push('/login/');
                    return;
                  }
                  if (isFavorite(post.id)) {
                    void removeFromFavorites(post.id);
                  } else {
                    void addToFavorites(post.id);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  };

  // 加载更多按钮
  const LoadMoreButton = () => (
    <div className="flex justify-center py-6">
      {hasMore ? (
        <Button
          variant="outline"
          onClick={loadMore}
          disabled={isLoadingMore}
          className="px-8"
        >
          {isLoadingMore ? '加载中...' : '加载更多'}
        </Button>
      ) : (
        <span className="text-sm text-gray-400">没有更多帖子了</span>
      )}
    </div>
  );

  const handleToggleFavorite = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push('/login/');
      return;
    }
    if (isFavorite(postId)) {
      await removeFromFavorites(postId);
    } else {
      await addToFavorites(postId);
    }
  };

  // 帖子点赞
  const handleLikePost = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated || !user) {
      router.push('/login/');
      return;
    }
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const likedBy = post.likedBy || [];
    const alreadyLiked = likedBy.includes(user.id);

    let nextLikes = post.likes;
    let nextLikedBy = likedBy;
    if (hasApiToken()) {
      try {
        const res = await likesAPI.togglePost(postId);
        nextLikes = res.likes;
        nextLikedBy = res.likedBy;
      } catch (error) {
        console.warn('后端点赞失败，本地切换:', error);
        nextLikes = alreadyLiked ? post.likes - 1 : post.likes + 1;
        nextLikedBy = alreadyLiked ? likedBy.filter(id => id !== user.id) : [...likedBy, user.id];
      }
    } else {
      nextLikes = alreadyLiked ? post.likes - 1 : post.likes + 1;
      nextLikedBy = alreadyLiked ? likedBy.filter(id => id !== user.id) : [...likedBy, user.id];
    }

    const updatedPost = { ...post, likes: nextLikes, likedBy: nextLikedBy };
    await updatePost(updatedPost);
    void syncPostUpdateToBackend(updatedPost);
    setPosts(prev => prev.map(p => p.id === postId ? updatedPost : p));
  };

  // 打开用户详情弹窗
  const handleOpenUserDialog = async (userId: string) => {
    const userData = await fetchAndCacheUser(userId);
    if (userData) {
      setSelectedUser(userData);
      const filteredPosts = posts.filter(p => p.userId === userId);
      setUserPosts(filteredPosts);

      // 加载用户社交数据
      const [following, followers] = await Promise.all([
        getFollowing(userId),
        getFollowers(userId),
      ]);

      // 筛选出好友（互相关注）
      const friendIds = new Set(followers.map(u => u.id));
      const friends = following.filter(u => friendIds.has(u.id));

      setUserFollowing(following);
      setUserFollowers(followers);
      setUserFriends(friends);
      setUserActiveTab('posts');

      setIsUserDialogOpen(true);
    }
  };

  // 处理关注/取消关注
  const handleFollow = async () => {
    if (!user || !selectedUser) return;
    if (isFollowing(selectedUser.id)) {
      await unfollowUser(selectedUser.id);
    } else {
      await followUser(selectedUser.id);
    }
    // 刷新关注列表
    await loadFollowingData();
  };

  // 搜索（同时搜索帖子和用户）
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setUserSearchResults([]);
      setPostSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    setIsSearching(true);
    setShowSearchResults(true);

    try {
      // 搜索用户
      const [localUserResults, apiUserResults] = await Promise.all([
        searchUsers(searchQuery),
        usersAPI.search(searchQuery)
          .then((r) => (r.users || []).map((u: any) => apiUserToLocalUser(u)))
          .catch(() => []),
      ]);
      const byId = new Map<string, any>();
      for (const u of [...localUserResults, ...apiUserResults]) {
        byId.set(u.id, u);
      }
      setUserSearchResults(Array.from(byId.values()).filter(u => u.id !== user?.id));

      // 搜索帖子
      const query = searchQuery.toLowerCase();
      const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.userNickname.toLowerCase().includes(query) ||
        p.topics?.some(t => t.toLowerCase().includes(query))
      );
      setPostSearchResults(filteredPosts);
    } catch (error) {
      console.error('Failed to search:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // 搜索防抖：输入变化后 300ms 自动触发搜索
  useEffect(() => {
    if (!searchQuery.trim()) {
      setUserSearchResults([]);
      setPostSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 清除搜索
  const clearSearch = () => {
    setSearchQuery('');
    setUserSearchResults([]);
    setPostSearchResults([]);
    setShowSearchResults(false);
  };

    // 获取头像框样式
  const getAvatarFrame = (level: number) => {
    if (level >= 7) return 'avatar-frame-halo';
    if (level >= 5) return 'avatar-frame-gold';
    if (level >= 3) return 'avatar-frame-silver';
    return 'avatar-frame-default';
  };

  const getModuleInfo = (id: string) => {
    if (!id || id === 'general') return { name: '综合讨论', color: 'bg-gray-100 text-gray-700' };
    const mod = KNOWLEDGE_MODULES.find(m => m.id === id);
    if (mod) {
      return { name: mod.name, color: MODULE_CATEGORIES[mod.category].color };
    }
    return { name: '其他', color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              社区交流
            </h1>
            <p className="text-gray-500 mt-2">与其他同学一起讨论学习，分享知识</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div ref={searchBoxRef} className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索帖子、用户..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value.trim()) {
                    setShowSearchResults(false);
                    setUserSearchResults([]);
                  }
                }}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSearchHistory(searchQuery);
                    handleSearch();
                  }
                }}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* 搜索历史下拉（聚焦且无输入时展示） */}
              {isSearchFocused && !searchQuery.trim() && searchHistory.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 p-3 origin-top animate-popover-in">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5" />
                      搜索历史
                    </p>
                    <button
                      onClick={clearSearchHistory}
                      className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      清空
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((term) => (
                      <span
                        key={term}
                        className="inline-flex items-center gap-1 pl-3 pr-1.5 py-1 bg-slate-50 hover:bg-blue-50 rounded-full text-sm text-slate-600 transition-colors"
                      >
                        <button
                          onClick={() => {
                            setSearchQuery(term);
                            addSearchHistory(term);
                          }}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => removeSearchHistory(term)}
                          className="p-0.5 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                          aria-label={`删除搜索历史 ${term}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Plus className="w-4 h-4 mr-2" />
                    发布帖子
                  </Button>
                </DialogTrigger>
                <DialogContent className="!w-[90vw] !h-[90vh] !max-w-none p-0 overflow-hidden flex flex-col">
                  <DialogHeader className="px-6 py-4 border-b shrink-0">
                    <DialogTitle>发布内容</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto p-6">
                    {user && (
                      <PostEditor
                        user={{
                          id: user.id,
                          nickname: user.nickname,
                          avatar: user.avatar,
                        }}
                        onSubmit={handleSubmitPost}
                        onSaveDraft={handleSaveDraft}
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Link href="/login/">
                <Button>登录后发帖</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Posts List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              全部
            </TabsTrigger>
            <TabsTrigger value="hot" className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              热榜
            </TabsTrigger>
            {isAuthenticated && (
              <TabsTrigger value="following" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                关注
                {followingUsers.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {followingUsers.length}
                  </Badge>
                )}
              </TabsTrigger>
            )}
            <TabsTrigger value="highschool-math" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              高中数学
            </TabsTrigger>
            <TabsTrigger value="advanced-math" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              高等数学
            </TabsTrigger>
            <TabsTrigger value="linear-algebra" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              线性代数
            </TabsTrigger>
          </TabsList>

          {/* 关注选项卡 */}
          {isAuthenticated && (
            <TabsContent value="following" className="space-y-4">
              {/* 关注用户头像列表 */}
              {followingUsers.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-purple-500" />
                    我关注的用户
                    <span className="text-xs text-gray-400">({followingUsers.length})</span>
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {followingUsers.map((followingUser) => {
                      const isFriend = friendIds.has(followingUser.id);
                      const frame = userFrames[followingUser.id] || 'default';
                      return (
                        <div
                          key={followingUser.id}
                          className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0"
                          onClick={() => handleOpenUserDialog(followingUser.id)}
                        >
                          <div className={`w-12 h-12 avatar-frame avatar-frame-${frame} p-[2px] relative`}>
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white overflow-hidden">
                              {followingUser.avatar?.startsWith('data:') || followingUser.avatar?.startsWith('http')
                                ? <LazyImage src={followingUser.avatar} alt="" className="w-full h-full object-cover" />
                                : (followingUser.avatar || '👤')}
                            </div>
                            {/* 好友标识 */}
                            {isFriend && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center border-2 border-white">
                                <Heart className="w-3 h-3 text-white fill-current" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs truncate max-w-[60px]">{followingUser.nickname}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* 关注用户的帖子 */}
              <div>
                {isLoading ? (
                  <CubeLoader compact text="加载中" subtext="正在获取关注动态…" />
                ) : posts.filter(p => followingUsers.some(u => u.id === p.userId)).length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <UserCheck className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>暂无关注用户的帖子</p>
                    <p className="text-sm mt-1">关注更多用户，在这里看到他们的动态</p>
                  </div>
                ) : (
                  <>
                    <div className="columns-1 md:columns-2 gap-4">
                      {posts
                        .filter(p => followingUsers.some(u => u.id === p.userId))
                        .map((post) => renderPostCard(post))}
                    </div>
                    <LoadMoreButton />
                  </>
                )}
              </div>
            </TabsContent>
          )}

          {/* 搜索结果展示 */}
          {showSearchResults && (
            <Card className="p-4 mb-4 origin-top animate-popover-in">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-500">
                  搜索结果
                  {(postSearchResults.length > 0 || userSearchResults.length > 0) &&
                    ` (帖子 ${postSearchResults.length}, 用户 ${userSearchResults.length})`
                  }
                </h4>
                <button
                  onClick={() => setShowSearchResults(false)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  收起
                </button>
              </div>

              {isSearching ? (
                <div className="text-center py-4 text-gray-400">搜索中...</div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {/* 帖子结果 */}
                  {postSearchResults.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        相关帖子 ({postSearchResults.length})
                      </h5>
                      <div className="space-y-2">
                        {postSearchResults.slice(0, 5).map((post) => (
                          <div
                            key={post.id}
                            className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            onClick={() => {
                              addSearchHistory(searchQuery);
                              router.push(`/community/post/#id=${post.id}`);
                              setShowSearchResults(false);
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 avatar-frame avatar-frame-${userFrames[post.userId] || 'default'} p-[2px] flex-shrink-0`}>
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs overflow-hidden">
                                  {post.userAvatar?.startsWith('data:') || post.userAvatar?.startsWith('http')
                                    ? <LazyImage src={post.userAvatar} alt="" className="w-full h-full object-cover" />
                                    : (post.userAvatar || '👤')}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h6 className="font-medium text-sm text-slate-900 line-clamp-1">{post.title}</h6>
                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{post.content}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                  <span>{post.userNickname}</span>
                                  <span>{formatRelativeTime(post.createdAt)}</span>
                                  <span className="flex items-center gap-0.5">
                                    <Heart className="w-3 h-3" />
                                    {post.likes}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {postSearchResults.length > 5 && (
                          <div className="text-center text-xs text-gray-400 py-1">
                            还有 {postSearchResults.length - 5} 篇帖子...
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 用户结果 */}
                  {userSearchResults.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        相关用户 ({userSearchResults.length})
                      </h5>
                      <div className="space-y-2">
                        {userSearchResults.map((result) => (
                          <div
                            key={result.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                            onClick={() => {
                              addSearchHistory(searchQuery);
                              handleOpenUserDialog(result.id);
                              setShowSearchResults(false);
                            }}
                          >
                            <div className={`w-10 h-10 avatar-frame avatar-frame-${userFrames[result.id] || 'default'} p-[2px]`}>
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white overflow-hidden">
                                {result.avatar?.startsWith('data:') || result.avatar?.startsWith('http')
                                  ? <LazyImage src={result.avatar} alt="" className="w-full h-full object-cover" />
                                  : (result.avatar || '👤')}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{result.nickname}</div>
                              {result.bio && <div className="text-xs text-gray-500 line-clamp-1">{result.bio}</div>}
                            </div>
                            {user && user.id !== result.id && (
                              <Button
                                size="sm"
                                variant={isFollowing(result.id) ? "outline" : "default"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isFollowing(result.id)) {
                                    unfollowUser(result.id).then(() => loadFollowingData());
                                  } else {
                                    followUser(result.id).then(() => loadFollowingData());
                                  }
                                }}
                              >
                                {isFollowing(result.id) ? '已关注' : '关注'}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 无结果 */}
                  {postSearchResults.length === 0 && userSearchResults.length === 0 && (
                    <div className="text-center py-4 text-gray-400 text-sm">未找到匹配的帖子或用户</div>
                  )}
                </div>
              )}
            </Card>
          )}

          {['all', 'highschool-math', 'advanced-math', 'linear-algebra'].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              <div>
                {isLoading ? (
                  <CubeLoader compact text="加载中" subtext="正在获取社区帖子…" />
                ) : filterPostsByModule(tabValue).length === 0 ? (
                  <div className="text-center py-12 text-gray-500">暂无帖子</div>
                ) : (
                  <>
                    <p className="mb-4 text-sm text-slate-400">共 {filterPostsByModule(tabValue).length} 篇</p>
                    <div className="columns-1 md:columns-2 gap-4">
                      {filterPostsByModule(tabValue).map((post) => renderPostCard(post))}
                    </div>
                    <LoadMoreButton />
                  </>
                )}
              </div>
            </TabsContent>
          ))}

          {/* 热榜选项卡 */}
          <TabsContent value="hot">
            <div>
              {isHotLoading ? (
                <CubeLoader compact text="加载中" subtext="正在生成热榜…" />
              ) : hotPosts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Flame className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>暂无热门帖子</p>
                  <p className="text-sm mt-1">点赞和评论会让好帖上榜</p>
                </div>
              ) : (
                <div className="columns-1 md:columns-2 gap-4">
                  {hotPosts.map((post, index) => (
                    <div key={post.id} className="relative break-inside-avoid mb-4">
                    {/* 排名角标 */}
                    <div className={`absolute -left-2 -top-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                      index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                      'bg-white text-slate-500 border border-slate-200'
                    }`}>
                      {index + 1}
                    </div>
                    {renderPostCard(post)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* 用户详情弹窗 - 知乎风格卡片 */}
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent className="!w-[94vw] !max-w-3xl !h-[85vh] p-0 overflow-hidden flex flex-col rounded-2xl gap-0">
            {selectedUser && (
              <>
                <DialogTitle className="sr-only">{selectedUser.nickname} 的主页</DialogTitle>
                <UserProfileCard
                  user={selectedUser}
                  posts={userPosts}
                  following={userFollowing}
                  followers={userFollowers}
                  friends={userFriends}
                  isCurrentUser={user?.id === selectedUser.id}
                  isFollowing={isFollowing(selectedUser.id)}
                  onToggleFollow={handleFollow}
                  onMessage={
                    user && user.id !== selectedUser.id && userFriends.some(f => f.id === selectedUser.id)
                      ? () => {
                          setIsUserDialogOpen(false);
                          setChatFriend(selectedUser);
                          setIsChatOpen(true);
                        }
                      : undefined
                  }
                  onPostClick={(post) => {
                    setIsUserDialogOpen(false);
                    navigateTo(`/community/post/#id=${post.id}`);
                  }}
                />
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* 聊天弹窗 */}
        {user && chatFriend && (
          <ChatDialog
            isOpen={isChatOpen}
            onClose={() => {
              setIsChatOpen(false);
              setChatFriend(null);
            }}
            currentUser={user}
            friend={chatFriend}
          />
        )}

      </main>
    </div>
  );
}
