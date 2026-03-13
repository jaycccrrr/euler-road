'use client';

import { useEffect, useState } from 'react';
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
  getExpProgress,
  getExpToNextLevel,
  LEVEL_CONFIG,
  getModuleTitles,
  getTitleByLevel,
  getPrimaryTitle,
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
  Target,
  Settings,
  LogOut,
  Crown,
  Flame,
  BookOpen,
  Award,
  Calculator,
  Atom,
  Cpu,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  MessageSquare,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/types';
import { getAllPosts } from '@/lib/db';
import { formatRelativeTime } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, hasHydrated, logout, selectLegendaryTitle, setDisplayCategory } = useAuth();
  const [selectedModule, setSelectedModule] = useState<ModuleCategory | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'posts'>('overview');

  useEffect(() => {
    // 等待 hydration 完成后再检查认证状态
    if (hasHydrated && !isAuthenticated) {
      router.push('/login/');
    }
  }, [isAuthenticated, hasHydrated, router]);

  // 加载帖子数据
  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [user]);

  const loadPosts = async () => {
    const allPosts = await getAllPosts();
    setPosts(allPosts);
  };

  // 获取用户收藏的帖子
  const favoritePosts = posts.filter(post =>
    user?.favoritePosts?.includes(post.id)
  );

  // 获取用户发布的帖子
  const myPosts = posts.filter(post => post.userId === user?.id);

  // 等待 hydration 完成
  if (!hasHydrated) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-500">请先登录</p>
        </main>
      </div>
    );
  }

  const moduleData = user.moduleData || initModuleData();
  const primaryTitleInfo = getPrimaryTitle(moduleData, user.displayCategory);
  const primaryFrame = getPrimaryFrame(moduleData, user.displayCategory);

  // 获取各模块数据
  const modules: { category: ModuleCategory; icon: React.ReactNode; color: string }[] = [
    { category: 'math', icon: <Calculator className="w-5 h-5" />, color: 'from-blue-500 to-indigo-600' },
    { category: 'physics', icon: <Atom className="w-5 h-5" />, color: 'from-pink-500 to-rose-600' },
    { category: 'cs', icon: <Cpu className="w-5 h-5" />, color: 'from-cyan-500 to-blue-600' },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${
          primaryTitleInfo.category === 'math' ? 'from-blue-500 to-indigo-600' :
          primaryTitleInfo.category === 'physics' ? 'from-pink-500 to-rose-600' :
          'from-cyan-500 to-blue-600'
        } p-8 md:p-12 mb-8`}>
          <div className="absolute inset-0 bg-pattern-dots opacity-20" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${FRAME_STYLES[primaryFrame]} p-1 bg-white`}>
              <Avatar className="w-full h-full">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-400 to-pink-400">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="text-center md:text-left text-white">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{user.nickname}</h1>
                {user.isAdmin && (
                  <Badge className="bg-yellow-400 text-yellow-900">管理员</Badge>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5" />
                <span className="text-xl font-bold">{primaryTitleInfo.title}</span>
                <Badge className="bg-white/20 text-white">
                  {getModuleDisplayName(primaryTitleInfo.category)}
                </Badge>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {moduleData.math.exp + moduleData.physics.exp + moduleData.cs.exp} 总EXP
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  加入于 {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            概览
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'favorites'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            收藏夹 ({favoritePosts.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'posts'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            我的帖子 ({myPosts.length})
          </button>
        </div>

        {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Module Stats */}
          <div className="space-y-6">
            {/* 展示称号选择 */}
            <Card className="p-6 cartoon-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                展示称号设置
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                选择要展示给其他用户看的称号（每个模块的称号都可以选择）
              </p>
              <div className="space-y-2">
                {modules.map(({ category, icon, color }) => {
                  const data = moduleData[category];
                  const title = getTitleByLevel(category, data.level, data.selectedTitle);
                  const isSelected = user.displayCategory === category ||
                    (!user.displayCategory && primaryTitleInfo.category === category);

                  return (
                    <button
                      key={category}
                      onClick={() => setDisplayCategory(category)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                        {icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold">{title}</div>
                        <div className="text-xs text-gray-500">{getModuleDisplayName(category)} Lv.{data.level}</div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-500" />}
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Module Experience Cards */}
            {modules.map(({ category, icon, color }) => {
              const data = moduleData[category];
              const expProgress = getExpProgress(data.exp);
              const expToNext = getExpToNextLevel(data.exp);
              const currentLevel = LEVEL_CONFIG.find(l => l.level === data.level);
              const nextLevel = LEVEL_CONFIG.find(l => l.level === data.level + 1);
              const title = getTitleByLevel(category, data.level, data.selectedTitle);

              return (
                <Card key={category} className="p-6 cartoon-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{getModuleDisplayName(category)}</h3>
                      <p className="text-sm text-gray-500">{title}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">等级 {data.level}</span>
                      <span className="font-bold">{expProgress}%</span>
                    </div>
                    <Progress value={expProgress} className="h-2" />
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">当前经验</span>
                      <span className="font-bold">{data.exp} EXP</span>
                    </div>
                    {nextLevel && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">升级还需</span>
                        <span className="font-bold text-purple-600">{expToNext} EXP</span>
                      </div>
                    )}
                  </div>

                  {/* 7级称号选择按钮 */}
                  {data.level === 7 && (
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-4"
                          onClick={() => setSelectedModule(category)}
                        >
                          <Award className="w-4 h-4 mr-2" />
                          选择传奇称号
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>选择你的传奇称号</DialogTitle>
                        </DialogHeader>
                        <LegendaryTitleSelector
                          category={category}
                          currentTitle={data.selectedTitle}
                          onSelect={(title) => selectLegendaryTitle(category, title)}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Right Column - Achievements & Settings */}
          <div className="md:col-span-2 space-y-6">
            {/* Module Progress Overview */}
            <Card className="p-6 cartoon-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                等级成长路线
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {modules.map(({ category, icon, color }) => {
                  const data = moduleData[category];
                  const titles = getModuleTitles(category);

                  return (
                    <div key={category} className="space-y-2">
                      <div className={`flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r ${color} text-white`}>
                        {icon}
                        <span className="font-bold">{getModuleDisplayName(category)}</span>
                      </div>
                      <div className="space-y-1">
                        {LEVEL_CONFIG.map((level) => {
                          const isCurrent = level.level === data.level;
                          const isPast = level.level < data.level;
                          const title = level.level === 7
                            ? (data.selectedTitle || titles.level7[0])
                            : getTitleByLevel(category, level.level, null);

                          return (
                            <div
                              key={level.level}
                              className={`flex items-center gap-2 p-2 rounded text-sm ${
                                isCurrent ? 'bg-purple-50 border border-purple-200' :
                                isPast ? 'bg-gray-50 text-gray-400' :
                                'bg-white text-gray-300'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full ${FRAME_STYLES[level.frame]} flex-shrink-0`} />
                              <span className="truncate flex-1">{title}</span>
                              {isCurrent && <Badge className="bg-purple-500 text-xs">当前</Badge>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* 经验值获得规则 */}
            <Card className="p-6 cartoon-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                经验值获得规则
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-700">完全正确</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">+{EXP_REWARDS.CORRECT_ANSWER} EXP</p>
                    <p className="text-xs text-green-600 mt-1">得分 ≥ 90分</p>
                  </div>
                  <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5 text-yellow-600" />
                      <span className="font-bold text-yellow-700">部分正确</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">+{EXP_REWARDS.PARTIAL_ANSWER} EXP</p>
                    <p className="text-xs text-yellow-600 mt-1">{'60分 ≤ 得分 < 90分'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-red-700">需要努力</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600">+{EXP_REWARDS.WRONG_ANSWER} EXP</p>
                    <p className="text-xs text-red-600 mt-1">{'得分 < 60分'}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-blue-700">每日首帖</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">+{EXP_REWARDS.DAILY_FIRST_POST} EXP</p>
                  <p className="text-xs text-blue-600 mt-1">每天在社区发布第一个帖子可获得额外经验值</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p className="font-medium mb-1">等级说明：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>每个模块的经验值独立计算</li>
                    <li>每日一题根据题目所属模块增加对应经验值</li>
                    <li>达到7级后可以选择传奇称号展示给其他用户</li>
                    <li>等级头像框根据你选择的展示称号决定</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 cartoon-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                学习统计
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBox icon="📝" label="答题数" value="0" />
                <StatBox icon="🔥" label="连续打卡" value="0天" />
                <StatBox icon="💬" label="发帖数" value="0" />
                <StatBox icon="👍" label="获赞数" value="0" />
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6 cartoon-card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-500" />
                设置
              </h3>
              <div className="space-y-3">
                <Link href="/daily/">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    去答题
                  </Button>
                </Link>
                <Link href="/community/">
                  <Button variant="outline" className="w-full justify-start">
                    <Flame className="w-4 h-4 mr-2" />
                    去社区
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  退出登录
                </Button>
              </div>
            </Card>
          </div>
        </div>
        )}

        {/* 收藏夹 */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-purple-500" />
              我的收藏 ({favoritePosts.length})
            </h3>
            {favoritePosts.length === 0 ? (
              <Card className="p-8 text-center text-slate-500">
                <Bookmark className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>暂无收藏帖子</p>
                <Link href="/community/">
                  <Button variant="outline" className="mt-4">
                    去社区看看
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {favoritePosts.map((post) => (
                  <Card key={post.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-lg">
                        {post.userAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{post.userNickname}</span>
                          <span className="text-xs text-slate-400">{formatRelativeTime(post.createdAt)}</span>
                        </div>
                        <Link href={`/community/post/${post.id}/`}>
                          <h4 className="font-bold hover:text-purple-600 transition-colors">{post.title}</h4>
                        </Link>
                        <p className="text-slate-600 text-sm line-clamp-2 mt-1">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
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

        {/* 我的帖子 */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              我的帖子 ({myPosts.length})
            </h3>
            {myPosts.length === 0 ? (
              <Card className="p-8 text-center text-slate-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>还没有发布过帖子</p>
                <Link href="/community/">
                  <Button variant="outline" className="mt-4">
                    去发布第一条帖子
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {myPosts.map((post) => (
                  <Card key={post.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-lg">
                        {post.userAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-slate-400">{formatRelativeTime(post.createdAt)}</span>
                        </div>
                        <Link href={`/community/post/${post.id}/`}>
                          <h4 className="font-bold hover:text-purple-600 transition-colors">{post.title}</h4>
                        </Link>
                        <p className="text-slate-600 text-sm line-clamp-2 mt-1">{post.content}</p>
                        {post.images.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {post.images.slice(0, 3).map((img, idx) => (
                              <img key={idx} src={img} alt="" className="w-16 h-16 object-cover rounded-lg" />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
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
      </main>
    </div>
  );
}

// 传奇称号选择组件
function LegendaryTitleSelector({
  category,
  currentTitle,
  onSelect,
}: {
  category: ModuleCategory;
  currentTitle: string | null;
  onSelect: (title: string) => void;
}) {
  const titles = getModuleTitles(category);
  const [selected, setSelected] = useState(currentTitle || titles.level7[0]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        你已到达{getModuleDisplayName(category)}最高等级，可以选择一个传奇称号展示给其他用户。
      </p>
      <div className="grid grid-cols-2 gap-3">
        {titles.level7.map((title) => (
          <button
            key={title}
            onClick={() => setSelected(title)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selected === title
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="font-bold text-lg">{title}</div>
            <div className="text-xs text-gray-500 mt-1">
              {selected === title ? '已选择' : '点击选择'}
            </div>
          </button>
        ))}
      </div>
      <Button
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
        onClick={() => onSelect(selected)}
      >
        确认选择
      </Button>
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="text-center p-3 rounded-lg bg-gray-50">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-bold text-lg">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
