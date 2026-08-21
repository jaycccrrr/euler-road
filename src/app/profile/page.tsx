'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FRAME_STYLES,
  FRAME_COLORS,
  LEVEL_NAMES,
  LEVEL_ICONS,
  getExpProgress,
  getExpToNextLevel,
  LEVEL_CONFIG,
  getModuleTitles,
  getTitleByLevel,
  getPrimaryFrame,
  initModuleData,
  getModuleDisplayName,
  ModuleCategory,
  EXP_REWARDS,
} from '@/lib/gamification';
import {
  User,
  Calendar,
  Trophy,
  Star,
  Settings,
  LogOut,
  Crown,
  Flame,
  BookOpen,
  Award,
  Calculator,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  MessageSquare,
  Heart,
  Users,
  MapPin,
  Sparkles,
  TrendingUp,
  Zap,
  Trash2,
  PenLine,
  ExternalLink,
  Shield,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { Post, Note, User as UserType, AnswerRecord } from '@/types';
import { getAllPosts, deletePost, getNotesByUser, deleteNote, getFollowing, getFollowers, getUserById, getAnswerRecordsByUser, areFriends } from '@/lib/db';
import { syncPostDeleteToBackend, getFollowingWithBackend, getFollowersWithBackend } from '@/lib/api-sync';
import CubeLoader from '@/components/ui/cube-loader';
import { navigateTo } from '@/lib/asset';
import { getDailyQuestionsByDate } from '@/lib/daily-question-bank';
import { findBankQuestion } from '@/lib/question-bank-lookup';
import { formatRelativeTime, formatLocalDate } from '@/lib/utils';
import { EditProfileDialog } from '@/components/profile/EditProfileDialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

import { LocationSettingDialog } from '@/components/location/LocationSettingDialog';
import { UserProfileCard } from '@/components/user/UserProfileCard';
import { PiPowerCalendarDialog } from '@/components/pipower/PiPowerOrb';
import { useDailyQuestion } from '@/hooks/useDailyQuestion';
import { LazyImage } from '@/components/LazyImage';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, hasHydrated, logout, updateUserInfo, updatePrivacy, followUser, unfollowUser, isFollowing } = useAuth();
  const loadUserAnswerHistory = useDailyQuestion((s) => s.loadUserAnswerHistory);
  const [selectedModule, setSelectedModule] = useState<ModuleCategory | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'posts' | 'following' | 'notes' | 'settings'>('overview');
  const [followingList, setFollowingList] = useState<UserType[]>([]);
  const [followersList, setFollowersList] = useState<UserType[]>([]);
  const [followingSubTab, setFollowingSubTab] = useState<'following' | 'followers' | 'friends'>('following');
  const [socialLoading, setSocialLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [selectedUserIsFriend, setSelectedUserIsFriend] = useState(false);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[]>([]);
  const [selectedUserFollowing, setSelectedUserFollowing] = useState<UserType[]>([]);
  const [selectedUserFollowers, setSelectedUserFollowers] = useState<UserType[]>([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);
  // π力统计筛选：日期范围（7/30/90 天或自定义）与科目范围
  const [statsRange, setStatsRange] = useState<7 | 30 | 90 | 'custom'>(30);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [statsSubject, setStatsSubject] = useState<'all' | 'highschool-math' | 'advanced-math' | 'linear-algebra'>('all');
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [favoritesSubTab, setFavoritesSubTab] = useState<'posts' | 'questions'>('posts');
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  // 待删除确认的笔记 id（应用内确认弹窗，替代原生 confirm）
  const [noteDeleteId, setNoteDeleteId] = useState<string | null>(null);
  const [isPiCalendarOpen, setIsPiCalendarOpen] = useState(false);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push('/login/');
    }
  }, [isAuthenticated, hasHydrated, router]);

  useEffect(() => {
    if (user) {
      loadPosts();
      loadAnswerStats();
      // 刷新答题历史，保证 π力日历与每日挑战同步
      void loadUserAnswerHistory();
    }
  }, [user]);

  const loadPosts = async () => {
    const allPosts = await getAllPosts();
    setPosts(allPosts);
  };

  // 加载答题记录（统计由 useMemo 按筛选条件实时计算）
  const loadAnswerStats = async () => {
    if (!user) return;
    try {
      const records = await getAnswerRecordsByUser(user.id);
      setAnswerRecords(records);
    } catch (err) {
      console.error('Failed to load answer stats:', err);
    }
  };

  const loadNotes = async () => {
    if (!user) return;
    setNotesLoading(true);
    try {
      const allNotes = await getNotesByUser(user.id);
      allNotes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      setNotes(allNotes);
    } catch (err) {
      console.error('Failed to load notes:', err);
    } finally {
      setNotesLoading(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  // 切换标签时保持滚动位置（避免内容高度变化导致页面回弹）
  const handleTabChange = (tabId: typeof activeTab) => {
    const scrollY = window.scrollY;
    setActiveTab(tabId);
    if (tabId === 'following') loadSocial();
    if (tabId === 'notes') loadNotes();
    // 内容切换 + 异步加载完成前多次恢复滚动位置
    const restore = () => window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
    requestAnimationFrame(restore);
    setTimeout(restore, 100);
    setTimeout(restore, 350);
  };

  const favoritePosts = posts.filter(post =>
    user?.favoritePosts?.includes(post.id)
  );

  const myPosts = posts.filter(post => post.userId === user?.id);

  // ── π力统计：连续学习天数（全局，不受筛选影响） ──
  const studyStreak = useMemo(() => computeStudyStreak(answerRecords), [answerRecords]);

  // ── π力统计：按日期范围 + 科目范围筛选答题记录 ──
  const filteredStats = useMemo(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    let start: Date;
    let end: Date = now;
    if (statsRange === 'custom') {
      if (customStart && customEnd) {
        start = new Date(`${customStart}T00:00:00`);
        end = new Date(`${customEnd}T23:59:59.999`);
      } else {
        start = new Date(0); // 自定义未填全时不过滤起点
      }
    } else {
      start = new Date(now);
      start.setDate(start.getDate() - statsRange + 1);
      start.setHours(0, 0, 0, 0);
    }
    const moduleOf = (questionId: string) => {
      const m = questionId.match(/^daily-\d{4}-\d{2}-\d{2}-(.+)$/);
      return m ? m[1] : 'other';
    };
    const scoped = answerRecords
      .filter((r) => {
        const t = new Date(r.submittedAt);
        return t >= start && t <= end;
      })
      .filter((r) => statsSubject === 'all' || moduleOf(r.questionId) === statsSubject);
    const total = scoped.length;
    const correct = scoped.filter((r) => r.isCorrect).length;
    const avgScore = total > 0 ? Math.round(scoped.reduce((s, r) => s + (r.aiScore || 0), 0) / total) : 0;
    const byModule: Record<string, { total: number; correct: number }> = {};
    for (const r of scoped) {
      const mod = moduleOf(r.questionId);
      byModule[mod] = byModule[mod] || { total: 0, correct: 0 };
      byModule[mod].total++;
      if (r.isCorrect) byModule[mod].correct++;
    }
    return { total, correct, avgScore, byModule };
  }, [answerRecords, statsRange, customStart, customEnd, statsSubject]);

  const loadSocial = async () => {
    if (!user) return;
    setSocialLoading(true);
    try {
      const [following, followers] = await Promise.all([
        getFollowingWithBackend(user.id),
        getFollowersWithBackend(user.id),
      ]);
      setFollowingList(following);
      setFollowersList(followers);
    } catch (error) {
      console.error('Failed to load social data:', error);
    } finally {
      setSocialLoading(false);
    }
  };

  // 打开用户详情弹窗（替代静态导出下不存在的 /users/[id] 路由）
  const handleOpenUserDialog = async (userId: string) => {
    const userData = await getUserById(userId);
    if (!userData) return;
    setSelectedUser(userData);
    setSelectedUserPosts(posts.filter((p) => p.userId === userId));
    // 加载该用户的社交数据（新版用户卡片需要）
    const [following, followers] = await Promise.all([
      getFollowingWithBackend(userId),
      getFollowersWithBackend(userId),
    ]);
    setSelectedUserFollowing(following);
    setSelectedUserFollowers(followers);
    // 好友（互相关注）才显示私信入口
    setSelectedUserIsFriend(user ? await areFriends(user.id, userId) : false);
    setIsUserDialogOpen(true);
  };

  // 在用户卡片中关注/取关后，同步刷新自己的关注列表
  const handleToggleFollow = async () => {
    if (!user || !selectedUser) return;
    if (isFollowing(selectedUser.id)) {
      await unfollowUser(selectedUser.id);
    } else {
      await followUser(selectedUser.id);
    }
    await loadSocial();
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <CubeLoader screen text="加载中" subtext="正在准备你的主页…" />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <p className="text-slate-500">请先登录</p>
        </main>
      </div>
    );
  }

  const moduleData = user.moduleData || initModuleData();
  const primaryFrame = getPrimaryFrame(moduleData, user.displayCategory);

  const modules: { category: ModuleCategory; icon: React.ReactNode; color: string; gradient: string }[] = [
    {
      category: 'math',
      icon: <Calculator className="w-5 h-5" />,
      color: 'text-indigo-600',
      gradient: 'from-indigo-500 to-violet-600'
    },
  ];

  const handleSaveProfile = async (data: {
    nickname: string;
    avatar: string;
    bio?: string;
    coverImage?: string;
  }) => {
    await updateUserInfo({
      nickname: data.nickname,
      avatar: data.avatar,
      bio: data.bio,
      coverImage: data.coverImage,
    });
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;
    try {
      await deletePost(postToDelete.id);
      void syncPostDeleteToBackend(postToDelete.id);
      // 重新加载帖子列表
      await loadPosts();
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const openDeleteDialog = (post: Post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 个人资料头部 - 高级感设计 */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm mb-8">
          {/* 背景装饰（设置了封面图时以封面为准） */}
          {user.coverImage ? (
            <>
              <img src={user.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/55" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              </div>
            </>
          )}

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 头像 - 全新等级头像框设计 */}
              <div className="relative group">
                <div className={`w-32 h-32 md:w-40 md:h-40 avatar-frame avatar-frame-${primaryFrame} p-1`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={user.avatar} className="object-cover" />
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-slate-700 to-slate-600 text-white">
                        {user.avatar?.startsWith('data:') || user.avatar?.startsWith('http') ? '👤' : (user.avatar || '👤')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* 等级徽章 */}
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 level-badge level-badge-${moduleData.math.level}`}>
                  <span>{LEVEL_ICONS[moduleData.math.level]}</span>
                  <span>LV.{moduleData.math.level}</span>
                </div>

                {/* 6级特殊皇冠标识 */}
                {moduleData.math.level >= 6 && (
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Crown className="w-6 h-6 text-amber-900" />
                  </div>
                )}
              </div>

              {/* 用户信息 */}
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {user.nickname}
                  </h1>
                  {user.isAdmin && (
                    <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30">
                      管理员
                    </Badge>
                  )}
                </div>

                {/* 个性签名 */}
                {user.bio && (
                  <p className="text-slate-300 text-sm mb-3 max-w-md">
                    {user.bio}
                  </p>
                )}

                {/* 等级名称 - 全新设计 */}
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${FRAME_COLORS[primaryFrame]?.bg || 'bg-gray-100'} ${FRAME_COLORS[primaryFrame]?.text || 'text-gray-600'} border ${FRAME_COLORS[primaryFrame]?.border || 'border-gray-300'} shadow-sm`}>
                    {LEVEL_NAMES[moduleData.math.level]}
                  </div>
                </div>

                {/* 等级进度条 - 全新设计 */}
                <div className="mb-6 max-w-md">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>等级进度</span>
                    <span>{getExpProgress(moduleData.math.exp)}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        moduleData.math.level >= 6
                          ? 'bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500'
                          : moduleData.math.level >= 5
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                          : moduleData.math.level >= 4
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                          : moduleData.math.level >= 3
                          ? 'bg-gradient-to-r from-slate-300 to-slate-400'
                          : moduleData.math.level >= 2
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}
                      style={{ width: `${getExpProgress(moduleData.math.exp)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-1.5">
                    <span>{moduleData.math.exp.toLocaleString()} EXP</span>
                    <span>
                      {getExpToNextLevel(moduleData.math.exp) > 0
                        ? `还需 ${getExpToNextLevel(moduleData.math.exp).toLocaleString()} EXP 升级`
                        : '已达到最高等级'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <button
                    onClick={() => setIsEditDialogOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium transition-all border border-white/10"
                  >
                    <Settings className="w-4 h-4" />
                    编辑资料
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2.5 text-slate-400 text-sm">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>{moduleData.math.exp.toLocaleString()} 总经验</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>加入于 {new Date(user.createdAt).toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              </div>

              {/* 等级徽章 - 全新设计 */}
              <div className="hidden lg:flex flex-col items-center gap-3">
                <div className={`w-28 h-28 rounded-2xl ${FRAME_COLORS[primaryFrame]?.bg || 'bg-gray-100'} border-2 ${FRAME_COLORS[primaryFrame]?.border || 'border-gray-300'} flex flex-col items-center justify-center backdrop-blur-sm shadow-lg relative overflow-hidden`}
                >
                  {/* 背景装饰 */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                  </div>

                  <span className="text-4xl mb-1">{LEVEL_ICONS[moduleData.math.level]}</span>
                  <span className={`text-2xl font-bold ${FRAME_COLORS[primaryFrame]?.text || 'text-gray-600'}`}>Lv.{moduleData.math.level}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">{LEVEL_NAMES[moduleData.math.level]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 底部进度条 */}
          <div className="relative z-10 px-8 md:px-12 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">等级进度</span>
                  <span className="text-indigo-400 font-medium">{getExpProgress(moduleData.math.exp)}%</span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${getExpProgress(moduleData.math.exp)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 标签页导航 -  pill 样式 */}
        <div className="flex gap-2 mb-8 p-1 bg-white rounded-xl border border-slate-200 shadow-sm w-fit">
          {[
            { id: 'overview', label: '概览', icon: User },
            { id: 'favorites', label: '收藏夹', icon: Bookmark, count: (user?.favoritePosts?.length || 0) + (user?.favoriteQuestions?.length || 0) },
            { id: 'notes', label: '笔记', icon: PenLine, count: notes.length },
            { id: 'posts', label: '我的帖子', icon: MessageSquare, count: myPosts.length },
            { id: 'following', label: '关注', icon: Users },
            { id: 'settings', label: '设置', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧栏 */}
            <div className="space-y-6">
              {/* 数学模块卡片 */}
              {modules.map(({ category, icon, color, gradient }) => {
                const data = moduleData[category];
                const expProgress = getExpProgress(data.exp);
                const expToNext = getExpToNextLevel(data.exp);
                const nextLevel = LEVEL_CONFIG.find(l => l.level === data.level + 1);
                const title = getTitleByLevel(category, data.level, data.selectedTitle);

                return (
                  <Card key={category} className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{getModuleDisplayName(category)}</h3>
                        <p className={`text-sm ${color} font-medium`}>{title}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-500">等级 {data.level}</span>
                          <span className="font-semibold text-slate-900">{expProgress}%</span>
                        </div>
                        <AnimatedExpBar value={expProgress} className="h-2 bg-slate-100" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{data.exp}</div>
                          <div className="text-xs text-slate-500">当前经验</div>
                        </div>
                        {nextLevel ? (
                          <div>
                            <div className="text-2xl font-bold text-indigo-600">{expToNext}</div>
                            <div className="text-xs text-slate-500">升级还需</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-2xl font-bold text-amber-500">MAX</div>
                            <div className="text-xs text-slate-500">已达满级</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* 右侧栏 */}
            <div className="lg:col-span-2 space-y-6">
              {/* π力 + 答题统计合并卡片（点击进入π力日历） */}
              <Card
                onClick={() => setIsPiCalendarOpen(true)}
                className="relative overflow-hidden p-6 bg-gradient-to-br from-violet-50/80 via-white to-fuchsia-50/60 border-violet-200 shadow-sm hover:shadow-lg hover:shadow-violet-500/10 hover:border-violet-300 cursor-pointer group motion-safe:transition-all motion-safe:duration-300 motion-safe:active:duration-75 motion-safe:active:scale-[0.99]"
                title="点击查看π力日历"
              >
                {/* 右上角装饰光晕 */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-violet-200/40 to-fuchsia-200/30 blur-2xl pointer-events-none group-hover:scale-125 motion-safe:transition-transform motion-safe:duration-500" />

                <div className="relative flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 border border-violet-200 flex items-center justify-center shadow-inner">
                      <span className="text-violet-600 text-sm font-bold" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>π</span>
                    </div>
                    我的π力 · 答题情况
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-violet-500 group-hover:text-violet-700 group-hover:translate-x-0.5 motion-safe:transition-all motion-safe:duration-200">
                    <Calendar className="w-3.5 h-3.5" />
                    π力日历
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* π力数据 */}
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: '累计π力', value: `${user.piPower?.currentPi || 0}π`, icon: TrendingUp, iconBg: 'bg-indigo-100 text-indigo-600' },
                    { label: '本月π力', value: `${user.piPower?.monthlyPi || 0}π`, icon: Flame, iconBg: 'bg-violet-100 text-violet-600' },
                    { label: '总做题数', value: filteredStats.total, icon: CheckCircle2, iconBg: 'bg-emerald-100 text-emerald-600' },
                    { label: '连续学习', value: `${studyStreak}天`, icon: Zap, iconBg: 'bg-rose-100 text-rose-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/80 backdrop-blur border border-violet-100 hover:border-violet-300 hover:shadow-sm motion-safe:transition-all motion-safe:duration-200">
                      <div className={`w-9 h-9 rounded-lg ${stat.iconBg} flex items-center justify-center shrink-0`}>
                        <stat.icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-lg font-bold text-slate-900 leading-tight truncate">{stat.value}</div>
                        <div className="text-[11px] text-slate-500">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 统计筛选：日期范围 + 科目范围（点击不触发卡片跳转） */}
                <div
                  className="relative mt-5 pt-4 border-t border-violet-100 space-y-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-400 shrink-0">日期范围</span>
                    {([
                      { id: 7, label: '近7天' },
                      { id: 30, label: '近30天' },
                      { id: 90, label: '近90天' },
                      { id: 'custom', label: '自定义' },
                    ] as const).map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setStatsRange(r.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          statsRange === r.id
                            ? 'bg-violet-600 text-white shadow-sm'
                            : 'bg-white/80 text-slate-500 border border-violet-100 hover:border-violet-300 hover:text-violet-700'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                    {statsRange === 'custom' && (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <input
                          type="date"
                          value={customStart}
                          onChange={(e) => setCustomStart(e.target.value)}
                          className="px-2 py-1 rounded-lg border border-violet-200 bg-white text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-400"
                        />
                        至
                        <input
                          type="date"
                          value={customEnd}
                          onChange={(e) => setCustomEnd(e.target.value)}
                          className="px-2 py-1 rounded-lg border border-violet-200 bg-white text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-400"
                        />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-400 shrink-0">科目范围</span>
                    {([
                      { id: 'all', label: '全部科目' },
                      { id: 'highschool-math', label: '高中数学' },
                      { id: 'advanced-math', label: '高等数学' },
                      { id: 'linear-algebra', label: '线性代数' },
                    ] as const).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStatsSubject(s.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          statsSubject === s.id
                            ? 'bg-violet-600 text-white shadow-sm'
                            : 'bg-white/80 text-slate-500 border border-violet-100 hover:border-violet-300 hover:text-violet-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 答题统计（随筛选联动） */}
                <div className="relative mt-5 pt-5 border-t border-violet-100">
                  {filteredStats.total === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-3">该范围内暂无答题记录</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 gap-4 mb-5">
                        <div className="text-center p-3 rounded-xl bg-white/80 border border-violet-100">
                          <div className="text-xl font-bold text-slate-900">{filteredStats.total}</div>
                          <div className="text-[11px] text-slate-500">做题数</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/80 border border-violet-100">
                          <div className="text-xl font-bold text-emerald-600">
                            {Math.round((filteredStats.correct / filteredStats.total) * 100)}%
                          </div>
                          <div className="text-[11px] text-slate-500">正确率</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/80 border border-violet-100">
                          <div className="text-xl font-bold text-indigo-600">{filteredStats.avgScore}</div>
                          <div className="text-[11px] text-slate-500">平均得分</div>
                        </div>
                      </div>
                      {statsSubject === 'all' && (
                        <div className="space-y-3">
                          {Object.entries(filteredStats.byModule).map(([mod, stat]) => {
                            const name =
                              mod === 'highschool-math' ? '高中数学'
                              : mod === 'advanced-math' ? '高等数学'
                              : mod === 'linear-algebra' ? '线性代数'
                              : mod;
                            const rate = Math.round((stat.correct / stat.total) * 100);
                            return (
                              <div key={mod}>
                                <div className="flex justify-between text-sm mb-1.5">
                                  <span className="text-slate-600">{name}</span>
                                  <span className="text-slate-500">{stat.correct}/{stat.total} · {rate}%</span>
                                </div>
                                <div className="h-2 bg-white rounded-full overflow-hidden border border-violet-100">
                                  <div
                                    className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full transition-all duration-500"
                                    style={{ width: `${rate}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="relative mt-5 pt-4 border-t border-violet-100 text-right">
                  <span className="text-[11px] text-violet-400">点击查看答题日历与每日题目 →</span>
                </div>
              </Card>

              {/* 等级 */}
              <Card className="p-6 bg-white border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  等级
                </h3>
                <div className="space-y-3">
                  {modules.map(({ category, icon, color, gradient }) => {
                    const data = moduleData[category];
                    const titles = getModuleTitles(category);

                    return (
                      <div key={category} className="space-y-3">
                        <div className={`flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r ${gradient} text-white`}>
                          {icon}
                          <span className="font-bold">{getModuleDisplayName(category)}</span>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                          {LEVEL_CONFIG.map((level) => {
                            const isCurrent = level.level === data.level;
                            const isPast = level.level < data.level;
                            const title = getTitleByLevel(category, level.level, null);

                            return (
                              <div
                                key={level.level}
                                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                                  isCurrent
                                    ? 'border-indigo-500 bg-indigo-50 shadow-md'
                                    : isPast
                                      ? 'border-slate-200 bg-slate-50 opacity-60'
                                      : 'border-slate-100 bg-white opacity-40'
                                }`}
                              >
                                <div className={`w-10 h-10 avatar-frame avatar-frame-${level.frame} mb-2 flex items-center justify-center text-sm font-bold ${
                                  isCurrent ? 'scale-110' : ''
                                } ${isPast || isCurrent ? 'opacity-100' : 'opacity-50'}`}
                                >
                                  {LEVEL_ICONS[level.level]}
                                </div>
                                <span className={`text-xs text-center font-medium line-clamp-2 ${
                                  isCurrent ? 'text-slate-900' : 'text-slate-500'
                                }`}>
                                  {title}
                                </span>
                                {isCurrent && (
                                  <Badge className="mt-2 bg-indigo-500 text-[10px]">当前</Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* 欧拉称号记录 */}
              {user.eulerTitleHistory && user.eulerTitleHistory.length > 0 && (
                <Card className="p-6 bg-white border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" />
                    欧拉称号记录
                  </h3>
                  <div className="space-y-3">
                    {[...user.eulerTitleHistory].reverse().slice(0, 5).map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md">
                            <Crown className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{record.title}</div>
                            <div className="text-xs text-slate-500">
                              {record.rankType === 'global' ? '全站排行' : '全省排行'} 第{record.rank}名
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-700">{record.month}</div>
                          <div className="text-xs text-slate-400">
                            {new Date(record.obtainedAt).toLocaleDateString('zh-CN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* 经验值规则 */}
              <Card className="p-6 bg-white border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  经验值获得规则
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-emerald-800">优秀作答</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 mb-1">+{EXP_REWARDS.BASE_PARTICIPATION + EXP_REWARDS.QUALITY_EXCELLENT}</p>
                    <p className="text-xs text-emerald-600">得分 ≥ 90分（基础 {EXP_REWARDS.BASE_PARTICIPATION} + 质量 {EXP_REWARDS.QUALITY_EXCELLENT}）</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-5 h-5 text-amber-600" />
                      <span className="font-bold text-amber-800">合格作答</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600 mb-1">+{EXP_REWARDS.BASE_PARTICIPATION + EXP_REWARDS.QUALITY_PASS} ~ +{EXP_REWARDS.BASE_PARTICIPATION + EXP_REWARDS.QUALITY_GOOD}</p>
                    <p className="text-xs text-amber-600">60–89分（基础 {EXP_REWARDS.BASE_PARTICIPATION} + 质量 {EXP_REWARDS.QUALITY_PASS}~{EXP_REWARDS.QUALITY_GOOD}）</p>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span className="font-bold text-rose-800">参与作答</span>
                    </div>
                    <p className="text-2xl font-bold text-rose-600 mb-1">+{EXP_REWARDS.BASE_PARTICIPATION}</p>
                    <p className="text-xs text-rose-600">得分 &lt; 60分（基础保底）</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-violet-600" />
                      <span className="font-bold text-slate-800">连续学习加成</span>
                      <span className="text-lg font-bold text-violet-600 ml-auto">+1/天</span>
                    </div>
                    <p className="text-xs text-slate-500">每连续学习 1 天，当次答题经验 +1，上限 +{EXP_REWARDS.STREAK_BONUS_CAP}，鼓励长期坚持</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="w-5 h-5 text-indigo-600" />
                      <span className="font-bold text-slate-800">每日首帖</span>
                      <span className="text-lg font-bold text-indigo-600 ml-auto">+{EXP_REWARDS.DAILY_FIRST_POST}</span>
                    </div>
                    <p className="text-xs text-slate-500">每天在社区发布第一个帖子可获得额外经验值</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* 收藏夹 */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            {/* 子标签切换 */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFavoritesSubTab('posts')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  favoritesSubTab === 'posts' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                帖子 ({user?.favoritePosts?.length || 0})
              </button>
              <button
                onClick={() => setFavoritesSubTab('questions')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  favoritesSubTab === 'questions' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                题目 ({user?.favoriteQuestions?.length || 0})
              </button>
            </div>

            {favoritesSubTab === 'posts' && (
              <>
                {favoritePosts.length === 0 ? (
                  <Card className="p-12 text-center bg-white border-slate-200 shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                      <Bookmark className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 mb-4">暂无收藏帖子</p>
                    <Link href="/community/">
                      <Button className="bg-slate-900 hover:bg-slate-800">
                        去社区看看
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {favoritePosts.map((post) => (
                      <Card
                        key={post.id}
                        onClick={() => router.push(`/community/post/#id=${post.id}`)}
                        className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white text-xl flex-shrink-0 overflow-hidden">
                            {post.userAvatar?.startsWith('data:') || post.userAvatar?.startsWith('http')
                              ? <LazyImage src={post.userAvatar} alt="" className="w-full h-full object-cover" />
                              : (post.userAvatar || '👤')
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-slate-900">{post.userNickname}</span>
                              <span className="text-xs text-slate-400">{formatRelativeTime(post.createdAt)}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-2">{post.title}</h4>
                            <p className="text-slate-600 text-sm line-clamp-2">{post.content}</p>
                            <div className="flex items-center gap-6 mt-3 text-sm text-slate-500">
                              <span className="flex items-center gap-1.5">
                                <Heart className="w-4 h-4" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4" />
                                {post.comments.length} 评论
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            {favoritesSubTab === 'questions' && (
              <>
                {(user?.favoriteQuestions?.length || 0) === 0 ? (
                  <Card className="p-12 text-center bg-white border-slate-200 shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                      <Bookmark className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 mb-4">暂无收藏题目</p>
                    <Link href="/daily/">
                      <Button className="bg-slate-900 hover:bg-slate-800">
                        去每日一题
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {(user?.favoriteQuestions || []).map((qid) => {
                      const match = qid.match(/^daily-(\d{4}-\d{2}-\d{2})-(.+)$/);
                      // 题库收藏题（非每日一题）：从题库索引反查
                      if (!match) {
                        const info = findBankQuestion(qid);
                        if (!info) return null;
                        return (
                          <Card
                            key={qid}
                            onClick={() => router.push('/question-bank/')}
                            className="p-5 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="secondary" className="text-xs">题库</Badge>
                                  <Badge className="tag-math text-xs">{info.subjectName}</Badge>
                                  <span className="text-xs text-slate-400 truncate">{info.chapterTitle}</span>
                                </div>
                                <p className="text-slate-700 text-sm line-clamp-2">{info.preview || '查看题目详情'}</p>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-indigo-500 shrink-0 self-center">
                                前往题库
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </Card>
                        );
                      }
                      const [, dateStr, moduleId] = match;
                      const dailyQs = getDailyQuestionsByDate(dateStr);
                      const q = dailyQs.find(dq => dq.moduleId === moduleId);
                      if (!q) return null;
                      return (
                        <Card
                          key={qid}
                          onClick={() => router.push(`/daily/#date=${dateStr}&module=${moduleId}`)}
                          className="p-5 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs">
                                  {dateStr}
                                </Badge>
                                <Badge className="tag-math text-xs">
                                  {moduleId === 'highschool-math' ? '高中数学' : moduleId === 'advanced-math' ? '高等数学' : '线性代数'}
                                </Badge>
                                <div className="flex items-center gap-0.5">
                                  {Array(5).fill(0).map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < q.difficulty ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`} />
                                  ))}
                                </div>
                              </div>
                              <h4 className="font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-1">{q.title}</h4>
                              <p className="text-slate-600 text-sm line-clamp-2">{q.content.replace(/\$.*?\$/g, '').replace(/\\/g, '')}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-indigo-500 shrink-0 self-center">
                              前往该题
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* 笔记 */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {notesLoading ? (
              <CubeLoader compact text="加载中" subtext="正在加载笔记…" />
            ) : notes.length === 0 ? (
              <Card className="p-12 text-center bg-white border-slate-200 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <PenLine className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 mb-4">暂无笔记</p>
                <Link href="/courses">
                  <Button className="bg-slate-900 hover:bg-slate-800">
                    去知识库学习并记笔记
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                  <Card key={note.id} className="overflow-hidden bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className="p-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {note.moduleId === 'highschool-math' ? '高中数学' : note.moduleId === 'advanced-math' ? '高等数学' : '线性代数'}
                        </Badge>
                        <span className="text-xs text-slate-400">
                          {new Date(note.updatedAt).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1 truncate">{note.title || (note.content || '').split('\n')[0] || '空便签'}</h4>
                      <p className="text-xs text-slate-500 truncate mb-2">{note.chapterTitle}</p>
                      {note.content ? (
                        <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50 rounded p-2">{note.content}</p>
                      ) : (
                        <p className="text-xs text-slate-400 italic">无文本内容</p>
                      )}
                      {note.canvasData && (
                        <div className="mt-2 h-20 bg-amber-50 rounded overflow-hidden">
                          <img src={note.canvasData} alt="涂鸦" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-3">
                      <Link href={`/module/${note.moduleId}/#chapter=${encodeURIComponent(note.chapterTitle)}&note=${encodeURIComponent(note.id)}`} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                        前往原文
                      </Link>
                      <button
                        onClick={() => setNoteDeleteId(note.id)}
                        className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        删除
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 我的帖子 */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            {myPosts.length === 0 ? (
              <Card className="p-12 text-center bg-white border-slate-200 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 mb-4">还没有发布过帖子</p>
                <Link href="/community/">
                  <Button className="bg-slate-900 hover:bg-slate-800">
                    去发布第一条帖子
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myPosts.map((post) => (
                  <Card
                    key={post.id}
                    onClick={() => router.push(`/community/post/#id=${post.id}`)}
                    className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl flex-shrink-0 overflow-hidden">
                        {post.userAvatar?.startsWith('data:') || post.userAvatar?.startsWith('http')
                          ? <LazyImage src={post.userAvatar} alt="" className="w-full h-full object-cover" />
                          : (post.userAvatar || '👤')
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400">{formatRelativeTime(post.createdAt)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteDialog(post);
                            }}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                            title="删除帖子"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className="font-bold text-slate-900 hover:text-indigo-600 transition-colors mb-2">{post.title}</h4>
                        <p className="text-slate-600 text-sm line-clamp-2">{post.content}</p>
                        {post.images.length > 0 && (
                          <div className="flex gap-2 mt-3">
                            {post.images.slice(0, 3).map((img, idx) => (
                              <LazyImage key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded-lg border border-slate-200" />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-6 mt-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments.length} 评论
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 关注 / 粉丝 / 好友 */}
        {activeTab === 'following' && (() => {
          const followerIds = new Set(followersList.map((u) => u.id));
          const friendsList = followingList.filter((u) => followerIds.has(u.id));
          const displayList =
            followingSubTab === 'following' ? followingList
            : followingSubTab === 'followers' ? followersList
            : friendsList;
          const emptyText =
            followingSubTab === 'following' ? '还没有关注任何人'
            : followingSubTab === 'followers' ? '还没有粉丝'
            : '还没有互相关注的好友';

          return (
            <div className="space-y-4">
              {/* 子标签切换 */}
              <div className="flex gap-2 mb-4">
                {([
                  { id: 'following', label: `关注 (${followingList.length})` },
                  { id: 'followers', label: `粉丝 (${followersList.length})` },
                  { id: 'friends', label: `好友 (${friendsList.length})` },
                ] as const).map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setFollowingSubTab(sub.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      followingSubTab === sub.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {socialLoading ? (
                <CubeLoader compact text="加载中" subtext="正在加载社交数据…" />
              ) : displayList.length === 0 ? (
                <Card className="p-12 text-center bg-white border-slate-200 shadow-sm">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <Users className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 mb-4">{emptyText}</p>
                  <Link href="/community/">
                    <Button className="bg-slate-900 hover:bg-slate-800">
                      去社区发现有趣的作者
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {displayList.map((u) => (
                    <Card key={u.id} className="p-5 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <button onClick={() => handleOpenUserDialog(u.id)} className="flex items-center gap-4 w-full text-left">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white text-2xl overflow-hidden shrink-0">
                          {u.avatar?.startsWith('data:') || u.avatar?.startsWith('http')
                            ? <LazyImage src={u.avatar} alt="" className="w-full h-full object-cover" />
                            : (u.avatar || '👤')
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">{u.nickname}</h4>
                          <p className="text-sm text-slate-500 truncate">
                            {u.bio || `Lv.${u.moduleData?.math?.level || 1} ${LEVEL_NAMES[u.moduleData?.math?.level || 1]}`}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      </button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {/* 设置 */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-4">
            <Card className="p-6 bg-white border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-500" />
                账号与资料
              </h3>
              <div className="divide-y divide-slate-100">
                <button
                  onClick={() => setIsEditDialogOpen(true)}
                  className="w-full flex items-center justify-between py-3.5 hover:text-indigo-600 transition-colors"
                >
                  <span className="flex items-center gap-3 text-slate-700">
                    <PenLine className="w-4 h-4 text-slate-400" />
                    编辑资料（昵称 / 头像 / 签名 / 封面）
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => setIsLocationDialogOpen(true)}
                  className="w-full flex items-center justify-between py-3.5 hover:text-indigo-600 transition-colors"
                >
                  <span className="flex items-center gap-3 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    位置设置{user.location?.province ? `（${user.location.province}）` : ''}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                隐私设置
              </h3>
              <p className="text-xs text-slate-400 mb-4">控制其他用户在你的个人简介页能看到的内容</p>
              <div className="space-y-3">
                {([
                  {
                    key: 'showFollowing' as const,
                    label: '关注列表',
                    desc: '允许其他人查看你关注的用户',
                    icon: <Users className="w-4 h-4 text-blue-600" />,
                    iconBg: 'bg-blue-100',
                  },
                  {
                    key: 'showFollowers' as const,
                    label: '粉丝列表',
                    desc: '允许其他人查看关注你的用户',
                    icon: <UserPlus className="w-4 h-4 text-green-600" />,
                    iconBg: 'bg-green-100',
                  },
                  {
                    key: 'showBio' as const,
                    label: '个性签名',
                    desc: '允许其他人查看你的个性签名',
                    icon: <PenLine className="w-4 h-4 text-amber-600" />,
                    iconBg: 'bg-amber-100',
                  },
                ]).map((item) => {
                  const enabled = user.privacy?.[item.key] !== false;
                  return (
                    <div key={item.key} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 ${item.iconBg} rounded-full flex items-center justify-center shrink-0`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">{item.label}</div>
                          <div className="text-xs text-slate-400">{item.desc}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => updatePrivacy({ [item.key]: !enabled })}
                        className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                          enabled ? 'bg-indigo-500' : 'bg-slate-300'
                        }`}
                        title={enabled ? '点击关闭' : '点击开启'}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${
                            enabled ? 'left-[22px]' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-3">关闭后，其他用户将无法在你的个人简介页查看对应信息</p>
            </Card>

            <Card className="p-6 bg-white border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                数据
              </h3>
              <div className="divide-y divide-slate-100">
                <Link href="/export-data/" className="w-full flex items-center justify-between py-3.5 hover:text-indigo-600 transition-colors">
                  <span className="flex items-center gap-3 text-slate-700">
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    导出我的数据
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </Card>

            <Card className="p-6 bg-white border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <LogOut className="w-5 h-5 text-rose-500" />
                会话
              </h3>
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-red-50 hover:text-red-600 hover:border-red-200 border-slate-200"
                onClick={() => {
                  logout();
                  router.push('/');
                }}
              >
                <span className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  退出登录
                </span>
              </Button>
            </Card>
          </div>
        )}

        {/* 编辑资料对话框 */}
        {user && (
          <>
            <EditProfileDialog
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
              currentNickname={user.nickname}
              currentAvatar={user.avatar}
              currentBio={user.bio}
              currentCoverImage={user.coverImage}
              onSave={handleSaveProfile}
            />
            <LocationSettingDialog
              open={isLocationDialogOpen}
              onOpenChange={setIsLocationDialogOpen}
            />
            <PiPowerCalendarDialog
              open={isPiCalendarOpen}
              onClose={() => setIsPiCalendarOpen(false)}
            />
            <ConfirmDialog
              open={noteDeleteId !== null}
              onOpenChange={(o) => {
                if (!o) setNoteDeleteId(null);
              }}
              title="删除笔记"
              description="删除后不可恢复，这条笔记的内容将一并移除。"
              confirmText="删除"
              onConfirm={() => {
                if (noteDeleteId) void handleDeleteNote(noteDeleteId);
              }}
            />

            {/* 用户详情弹窗 - 知乎风格卡片（与社区页一致） */}
            <Dialog open={isUserDialogOpen} onOpenChange={(o) => {
              if (!o) {
                setIsUserDialogOpen(false);
                setSelectedUser(null);
              }
            }}>
              <DialogContent className="!w-[94vw] !max-w-3xl !h-[85vh] p-0 overflow-hidden flex flex-col rounded-2xl gap-0">
                {selectedUser && (
                  <>
                    <DialogTitle className="sr-only">{selectedUser.nickname} 的主页</DialogTitle>
                    <UserProfileCard
                      user={selectedUser}
                      posts={selectedUserPosts}
                      following={selectedUserFollowing}
                      followers={selectedUserFollowers}
                      friends={selectedUserFollowing.filter((u) =>
                        selectedUserFollowers.some((f) => f.id === u.id)
                      )}
                      isCurrentUser={user.id === selectedUser.id}
                      isFollowing={isFollowing(selectedUser.id)}
                      onToggleFollow={handleToggleFollow}
                      onMessage={
                        user.id !== selectedUser.id && selectedUserIsFriend
                          ? () => {
                              setIsUserDialogOpen(false);
                              setSelectedUser(null);
                              navigateTo(`/messages/#user=${encodeURIComponent(selectedUser.id)}`);
                            }
                          : undefined
                      }
                      onPostClick={(post) => {
                        setIsUserDialogOpen(false);
                        setSelectedUser(null);
                        navigateTo(`/community/post/#id=${post.id}`);
                      }}
                      canViewFollowing={selectedUser.privacy?.showFollowing !== false}
                      canViewFollowers={selectedUser.privacy?.showFollowers !== false}
                    />
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* 删除帖子确认对话框 */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-rose-600">
                    <Trash2 className="w-5 h-5" />
                    确认删除帖子
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-slate-600 mb-2">
                    你确定要删除这篇帖子吗？此操作不可恢复。
                  </p>
                  {postToDelete && (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <p className="font-medium text-slate-900 line-clamp-1">{postToDelete.title}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDeleteDialogOpen(false);
                      setPostToDelete(null);
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeletePost}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-medium"
                  >
                    确认删除
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </main>
    </div>
  );
}

// 连续学习天数：有任意答题记录的连续天数（今天没答则从昨天算起，保持连续感）
function computeStudyStreak(records: AnswerRecord[]): number {
  if (records.length === 0) return 0;
  const days = new Set(records.map((r) => formatLocalDate(new Date(r.submittedAt))));
  const cursor = new Date();
  if (!days.has(formatLocalDate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(formatLocalDate(cursor))) return 0;
  }
  let streak = 0;
  while (days.has(formatLocalDate(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// 经验进度条：挂载/数值变化时以 easeOut 动画增长，reduced-motion 时直接取值
function AnimatedExpBar({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const from = currentRef.current;
    const to = value;
    if (from === to) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const start = performance.now();
    const duration = reduce ? 0 : 700;
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (to - from) * eased;
      currentRef.current = v;
      setDisplay(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <Progress value={display} className={className} />;
}
