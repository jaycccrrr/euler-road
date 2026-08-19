'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { getPostById, getUserById, getAllPosts, createComment, updatePost, getFollowing, getFollowers, areFriends } from '@/lib/db';
import { mergePostCommentsFromBackend, syncPostCommentToBackend, fetchAndCacheUser } from '@/lib/api-sync';
import CubeLoader from '@/components/ui/cube-loader';
import { navigateTo } from '@/lib/asset';
import { Textarea } from '@/components/ui/textarea';
import { generateId } from '@/lib/utils';
import { Post, User } from '@/types';
import { LazyImage } from '@/components/LazyImage';
import { UserProfileCard } from '@/components/user/UserProfileCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ArrowLeft,
  MoreHorizontal,
  HelpCircle,
  FileText,
  Lightbulb,
  Crown,
  MapPin,
  Calendar,
  Award,
  ChevronRight,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { initModuleData, getModuleTitles, FRAME_STYLES, getPrimaryFrame } from '@/lib/gamification';
import { getRelatedPosts } from '@/lib/hot-feed';
import { SharePostToFriendDialog } from '@/components/community';
import { PollDisplay } from '@/components/community/PollDisplay';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const POST_TYPE_ICONS = {
  question: <HelpCircle className="w-4 h-4" />,
  article: <FileText className="w-4 h-4" />,
  answer: <MessageSquare className="w-4 h-4" />,
  thought: <Lightbulb className="w-4 h-4" />,
};

const POST_TYPE_LABELS = {
  question: '提问',
  article: '文章',
  answer: '回答',
  thought: '想法',
};

// Hook to get post ID from hash
function useHashParam() {
  const [hashValue, setHashValue] = useState<string>('');

  useEffect(() => {
    const getHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#id=')) {
        setHashValue(hash.slice(4));
      } else {
        setHashValue('');
      }
    };

    getHash();
    window.addEventListener('hashchange', getHash);
    return () => window.removeEventListener('hashchange', getHash);
  }, []);

  return hashValue;
}

function PostDetailContent() {
  const router = useRouter();
  const postId = useHashParam();
  const { isAuthenticated, user: currentUser, isFavorite, addToFavorites, removeFromFavorites } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [authorPosts, setAuthorPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentUserFrames, setCommentUserFrames] = useState<Record<string, string>>({});
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isShareToFriendOpen, setIsShareToFriendOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (postId) {
      loadPost();
    } else {
      setIsLoading(false);
    }

    // 监听用户头像更新事件，刷新帖子数据
    const handleAvatarUpdated = () => {
      // 延迟刷新确保 IndexedDB 事务完成
      setTimeout(() => loadPost(), 100);
    };
    window.addEventListener('userAvatarUpdated', handleAvatarUpdated);

    return () => {
      window.removeEventListener('userAvatarUpdated', handleAvatarUpdated);
    };
  }, [postId]);

  const loadPost = async () => {
    if (!postId) return;
    try {
      setIsLoading(true);
      const postData = await getPostById(postId);
      if (postData) {
        // 合并云端评论
        const cloudComments = await mergePostCommentsFromBackend(postId);
        const byId = new Map<string, Post['comments'][number]>();
        for (const c of [...(postData.comments || []), ...cloudComments]) {
          byId.set(c.id, c);
        }
        const mergedPost: Post = {
          ...postData,
          comments: Array.from(byId.values()).sort((a, b) =>
            a.createdAt.localeCompare(b.createdAt)
          ),
        };
        setPost(mergedPost);
        setLikeCount(mergedPost.likes);
        if (currentUser) {
          setIsLiked(mergedPost.likedBy.includes(currentUser.id));
        }
        const authorData = await fetchAndCacheUser(mergedPost.userId);
        if (authorData) {
          setAuthor(authorData);
          // 获取作者的所有帖子
          const allPosts = await getAllPosts();
          const userPosts = allPosts.filter(p => p.userId === authorData.id);
          setAuthorPosts(userPosts);
          // 相关推荐：同模块/同话题，按热度排序
          setRelatedPosts(getRelatedPosts(mergedPost, allPosts, 5));
        }

        // 获取所有评论用户的头像框信息
        const commentUserIds = [...new Set(mergedPost.comments.map(c => c.userId))];
        const frameMap: Record<string, string> = {};

        await Promise.all(
          commentUserIds.map(async (userId) => {
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

        setCommentUserFrames(frameMap);
      }
    } catch (error) {
      console.error('Failed to load post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated || !currentUser || !post) {
      router.push('/login/');
      return;
    }
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);

    // 持久化到数据库（热榜依赖点赞信号）
    const updatedPost: Post = {
      ...post,
      likes: newLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
      likedBy: newLiked
        ? [...post.likedBy, currentUser.id]
        : post.likedBy.filter(id => id !== currentUser.id),
    };
    setPost(updatedPost);
    try {
      await updatePost(updatedPost);
    } catch (error) {
      console.error('Failed to persist like:', error);
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated || !post) {
      router.push('/login/');
      return;
    }
    if (isFavorite(post.id)) {
      await removeFromFavorites(post.id);
    } else {
      await addToFavorites(post.id);
    }
  };

  // 打开帖子作者详情
  const handleOpenAuthorDialog = () => {
    if (author) {
      setSelectedUser(author);
      setSelectedUserPosts(authorPosts);
      setIsUserDialogOpen(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || '分享帖子',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  // 发送给好友（需登录）
  const handleShareToFriend = () => {
    if (!isAuthenticated) {
      router.push('/login/');
      return;
    }
    setIsShareToFriendOpen(true);
  };

  // 打开用户详情弹窗
  const handleOpenUserDialog = async (userId: string) => {
    const userData = await fetchAndCacheUser(userId);
    if (userData) {
      setSelectedUser(userData);
      const allPosts = await getAllPosts();
      const userPosts = allPosts.filter(p => p.userId === userId);
      setSelectedUserPosts(userPosts);
      setIsUserDialogOpen(true);
    }
  };

  const handleSubmitComment = async () => {
    if (!isAuthenticated || !currentUser || !post) {
      router.push('/login/');
      return;
    }

    if (!commentContent.trim()) {
      setCommentError('请输入评论内容');
      return;
    }

    setIsSubmittingComment(true);
    setCommentError(null);

    try {
      const newComment = {
        id: generateId(),
        postId: post.id,
        userId: currentUser.id,
        userNickname: currentUser.nickname,
        userAvatar: currentUser.avatar,
        content: commentContent.trim(),
        createdAt: new Date().toISOString(),
      };

      // Save comment to database
      await createComment(newComment);
      void syncPostCommentToBackend(newComment);

      // Update post's comments array
      const updatedComments = [...post.comments, newComment];
      const updatedPost = { ...post, comments: updatedComments };
      await updatePost(updatedPost);

      // Update local state
      setPost(updatedPost);
      setCommentContent('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      setCommentError('评论发布失败，请重试');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const getModuleInfo = (id: string) => {
    const moduleMap: Record<string, { name: string; color: string }> = {
      'general': { name: '综合讨论', color: 'bg-gray-100 text-gray-700' },
      'highschool-math': { name: '高中数学', color: 'bg-blue-100 text-blue-700' },
      'advanced-math': { name: '高等数学', color: 'bg-purple-100 text-purple-700' },
      'linear-algebra': { name: '线性代数', color: 'bg-green-100 text-green-700' },
      'probability': { name: '概率统计', color: 'bg-orange-100 text-orange-700' },
    };
    return moduleMap[id] || { name: '其他', color: 'bg-gray-100 text-gray-700' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <CubeLoader screen text="加载中" subtext="正在加载帖子…" />
        </main>
      </div>
    );
  }

  if (!postId || !post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">帖子不存在</h1>
            <p className="text-gray-500 mb-6">该帖子可能已被删除或您没有访问权限</p>
            <Link href="/community/">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回社区
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const moduleInfo = getModuleInfo(post.moduleId);

  // 帖子内容进入过渡：加载完成后内容淡入上浮（reduced-motion 时仅快速淡入）
  const contentMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: 18, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { type: 'spring' as const, stiffness: 300, damping: 26, mass: 0.9 },
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <Link href="/community/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回社区
            </Button>
          </Link>
        </div>

        <motion.div
          key={post.id}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          style={{ transformOrigin: 'center top' }}
          {...contentMotion}
        >
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                {(() => {
                  const frame = author ? getPrimaryFrame(author.moduleData || initModuleData(), author.displayCategory) : 'default';
                  return (
                    <div
                      className={`w-12 h-12 avatar-frame avatar-frame-${frame} p-[2px] cursor-pointer`}
                      onClick={handleOpenAuthorDialog}
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white overflow-hidden">
                        {post.userAvatar?.startsWith('data:') || post.userAvatar?.startsWith('http')
                            ? <LazyImage src={post.userAvatar} alt={post.userNickname} className="w-full h-full object-cover" />
                            : (post.userAvatar || '👤')
                        }
                      </div>
                    </div>
                  );
                })()}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-medium text-gray-900 hover:text-purple-600 cursor-pointer"
                      onClick={handleOpenAuthorDialog}
                    >
                      {post.userNickname}
                    </span>
                    <Badge className={moduleInfo.color}>{moduleInfo.name}</Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      {POST_TYPE_ICONS[post.postType || 'question']}
                      {POST_TYPE_LABELS[post.postType || 'question']}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span>{formatRelativeTime(post.createdAt)}</span>
                    {post.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.location.province}
                        {post.location.city && `· ${post.location.city}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

              {post.topics && post.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 cursor-pointer"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose prose-slate max-w-none mb-6">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
              </div>

              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {post.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`图片 ${idx + 1}`}
                        className="w-full rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => window.open(img, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              )}

              {post.poll && (
                <div className="mb-6">
                  <PollDisplay
                    post={post}
                    currentUserId={currentUser?.id}
                    onVote={async (updated) => {
                      setPost(updated);
                      await updatePost(updated);
                    }}
                  />
                </div>
              )}

              <Separator className="my-6" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                    onClick={handleLike}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{likeCount}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-gray-500 hover:text-blue-500"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">{post.comments.length}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${isFavorite(post.id) ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}
                    onClick={handleFavorite}
                  >
                    <Bookmark className={`w-5 h-5 ${isFavorite(post.id) ? 'fill-current' : ''}`} />
                    <span className="font-medium">{isFavorite(post.id) ? '已收藏' : '收藏'}</span>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-gray-500 hover:text-blue-500"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">分享</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-gray-500 hover:text-purple-500"
                  onClick={handleShareToFriend}
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">发给好友</span>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                评论 ({post.comments.length})
              </h3>

              {/* Comment Input */}
              {isAuthenticated ? (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10">
                      {currentUser?.avatar?.startsWith('data:') || currentUser?.avatar?.startsWith('http')
                        ? <AvatarImage src={currentUser.avatar} alt={currentUser.nickname} />
                        : null}
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                        {currentUser?.avatar?.startsWith('data:') || currentUser?.avatar?.startsWith('http')
                          ? '👤'
                          : (currentUser?.avatar || '👤')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="写下你的评论..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="min-h-[100px] mb-2 resize-none"
                        maxLength={1000}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {commentContent.length}/1000
                        </span>
                        {commentError && (
                          <span className="text-xs text-red-500">{commentError}</span>
                        )}
                        <Button
                          size="sm"
                          onClick={handleSubmitComment}
                          disabled={isSubmittingComment || !commentContent.trim()}
                          className="bg-gradient-to-r from-blue-500 to-blue-600"
                        >
                          {isSubmittingComment ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              发布中...
                            </>
                          ) : (
                            <>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              发表评论
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-500 mb-3">登录后即可发表评论</p>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/login/')}
                  >
                    去登录
                  </Button>
                </div>
              )}

              {/* Comments List */}
              {post.comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>暂无评论，来说两句吧~</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {post.comments.map((comment) => {
                    const isAuthor = comment.userId === post.userId;
                    const frame = commentUserFrames[comment.userId] || 'default';
                    return (
                      <div key={comment.id} className="flex gap-3">
                        <div
                          className={`w-10 h-10 avatar-frame avatar-frame-${frame} p-[2px] cursor-pointer flex-shrink-0`}
                          onClick={() => handleOpenUserDialog(comment.userId)}
                        >
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white overflow-hidden">
                            {comment.userAvatar?.startsWith('data:') || comment.userAvatar?.startsWith('http')
                              ? <LazyImage src={comment.userAvatar} alt={comment.userNickname} className="w-full h-full object-cover" />
                              : (comment.userAvatar || '👤')
                            }
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="font-medium text-sm cursor-pointer hover:text-purple-600 transition-colors"
                              onClick={() => handleOpenUserDialog(comment.userId)}
                            >
                              {comment.userNickname}
                            </span>
                            {isAuthor && (
                              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[10px] px-1.5 py-0">
                                作者
                              </Badge>
                            )}
                            <span className="text-xs text-gray-400">{formatRelativeTime(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">关于作者</h3>
              {author ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {(() => {
                      const frame = getPrimaryFrame(author.moduleData || initModuleData(), author.displayCategory);
                      return (
                        <div
                          className={`w-14 h-14 avatar-frame avatar-frame-${frame} p-[2px] cursor-pointer`}
                          onClick={handleOpenAuthorDialog}
                        >
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white overflow-hidden">
                            {author.avatar?.startsWith('data:') || author.avatar?.startsWith('http')
                                ? <LazyImage src={author.avatar} alt={author.nickname} className="w-full h-full object-cover" />
                                : (author.avatar || '👤')
                            }
                          </div>
                        </div>
                      );
                    })()}
                    <div>
                      <div
                        className="font-medium text-lg hover:text-purple-600 cursor-pointer"
                        onClick={handleOpenAuthorDialog}
                      >
                        {author.nickname}
                      </div>
                      <div className="text-sm text-gray-500">
                        {(() => {
                          const moduleData = author.moduleData || initModuleData();
                          const titles = getModuleTitles('math');
                          return titles[`level${moduleData.math.level}` as keyof typeof titles];
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center py-4 border-t">
                    <div>
                      <div className="font-bold text-lg">{author.piPower?.currentPi || 0}</div>
                      <div className="text-xs text-gray-500">π力</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        {new Date(author.createdAt).toLocaleDateString('zh-CN', { month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-500">加入时间</div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500"
                    onClick={() => setIsUserDialogOpen(true)}
                  >
                    查看主页
                  </Button>
                </div>
              ) : (
                <CubeLoader compact text="加载中" subtext="正在加载作者信息…" />
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">相关推荐</h3>
              {relatedPosts.length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-4">暂无相关帖子</div>
              ) : (
                <div className="space-y-3">
                  {relatedPosts.map((rp) => (
                    <div
                      key={rp.id}
                      className="group cursor-pointer"
                      onClick={() => router.push(`/community/post/#id=${rp.id}`)}
                    >
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {rp.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span>{rp.userNickname}</span>
                        <span className="flex items-center gap-0.5">
                          <Heart className="w-3 h-3" /> {rp.likes}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <MessageSquare className="w-3 h-3" /> {rp.comments?.length || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </motion.div>
      </main>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="!w-[94vw] !max-w-3xl !h-[85vh] p-0 overflow-hidden flex flex-col rounded-2xl gap-0">
          {(selectedUser || author) && (
            <>
              <DialogTitle className="sr-only">{(selectedUser || author)!.nickname} 的主页</DialogTitle>
              <UserDialogContent
                user={(selectedUser || author)!}
                posts={selectedUser ? selectedUserPosts : authorPosts}
                onClose={() => {
                  setIsUserDialogOpen(false);
                  setSelectedUser(null);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 发送给好友 */}
      {currentUser && post && (
        <SharePostToFriendDialog
          isOpen={isShareToFriendOpen}
          onClose={() => setIsShareToFriendOpen(false)}
          currentUser={currentUser}
          post={post}
        />
      )}
    </div>
  );
}

// 用户详情弹窗内容组件
interface UserDialogContentProps {
  user: User;
  posts: Post[];
  onClose: () => void;
}

// 获取头像框样式
function getAvatarFrame(level: number) {
  if (level >= 7) return 'avatar-frame-halo';
  if (level >= 5) return 'avatar-frame-gold';
  if (level >= 3) return 'avatar-frame-silver';
  return 'avatar-frame-default';
}

function UserDialogContent({ user: initialUser, posts, onClose }: UserDialogContentProps) {
  const [user, setUser] = useState(initialUser);
  const [following, setFollowing] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const { user: currentUser, isFollowing, followUser, unfollowUser } = useAuth();
  const isCurrentUser = currentUser?.id === user.id;

  // 隐私设置计算
  const canViewFollowing = user.privacy?.showFollowing !== false || isCurrentUser;
  const canViewFollowers = user.privacy?.showFollowers !== false || isCurrentUser;

  // 加载关注/粉丝/好友数据
  useEffect(() => {
    const loadSocialData = async () => {
      if (canViewFollowing) {
        const followingList = await getFollowing(user.id);
        setFollowing(followingList);
      }

      if (canViewFollowers) {
        const followersList = await getFollowers(user.id);
        setFollowers(followersList);

        // 计算好友（互相关注）
        const friendList: User[] = [];
        for (const follower of followersList) {
          const isFriend = await areFriends(user.id, follower.id);
          if (isFriend) {
            friendList.push(follower);
          }
        }
        setFriends(friendList);
      }
    };
    loadSocialData();
  }, [user.id, user.privacy, isCurrentUser]);

  const handleFollow = async () => {
    if (!currentUser) return;
    if (isFollowing(user.id)) {
      await unfollowUser(user.id);
    } else {
      await followUser(user.id);
    }
    // 刷新用户数据
    const updatedUser = await getUserById(user.id);
    if (updatedUser) setUser(updatedUser);
  };

  return (
    <UserProfileCard
      user={user}
      posts={posts}
      following={following}
      followers={followers}
      friends={friends}
      isCurrentUser={isCurrentUser}
      isFollowing={isFollowing(user.id)}
      onToggleFollow={handleFollow}
      onMessage={
        currentUser && !isCurrentUser && friends.some((f) => f.id === currentUser.id)
          ? () => {
              onClose();
              navigateTo(`/messages/#user=${encodeURIComponent(user.id)}`);
            }
          : undefined
      }
      onPostClick={(p) => {
        onClose();
        navigateTo(`/community/post/#id=${p.id}`);
      }}
      canViewFollowing={canViewFollowing}
      canViewFollowers={canViewFollowers}
    />
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <CubeLoader screen text="加载中" subtext="正在准备页面…" />
        </main>
      </div>
    }>
      <PostDetailContent />
    </Suspense>
  );
}
