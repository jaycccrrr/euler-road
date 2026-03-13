'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LEVEL_CONFIG,
  FRAME_STYLES,
  getPrimaryTitle,
  getPrimaryFrame,
  getModuleDisplayName,
  ModuleCategory,
  UserModuleData,
} from '@/lib/gamification';
import { Trophy, Medal, Crown, Flame, Star, Target, Calculator, Atom, Cpu } from 'lucide-react';

// Mock users for leaderboard with new module data structure
const MOCK_USERS = [
  {
    id: '1',
    nickname: '数学小王子',
    avatar: '👨‍🎓',
    moduleData: {
      math: { exp: 2500, level: 7, selectedTitle: '高斯' },
      physics: { exp: 800, level: 5, selectedTitle: null },
      cs: { exp: 600, level: 4, selectedTitle: null },
    } as UserModuleData,
  },
  {
    id: '2',
    nickname: '物理狂人',
    avatar: '👩‍🔬',
    moduleData: {
      math: { exp: 900, level: 5, selectedTitle: null },
      physics: { exp: 2800, level: 7, selectedTitle: '爱因斯坦' },
      cs: { exp: 400, level: 3, selectedTitle: null },
    } as UserModuleData,
  },
  {
    id: '3',
    nickname: '代码侠',
    avatar: '👨‍💻',
    moduleData: {
      math: { exp: 700, level: 4, selectedTitle: null },
      physics: { exp: 500, level: 3, selectedTitle: null },
      cs: { exp: 3200, level: 7, selectedTitle: '图灵' },
    } as UserModuleData,
  },
  {
    id: '4',
    nickname: '学霸君',
    avatar: '🤓',
    moduleData: {
      math: { exp: 1200, level: 6, selectedTitle: null },
      physics: { exp: 1100, level: 6, selectedTitle: null },
      cs: { exp: 1000, level: 6, selectedTitle: null },
    } as UserModuleData,
  },
  {
    id: '5',
    nickname: '欧拉传人',
    avatar: '🦉',
    moduleData: {
      math: { exp: 3500, level: 7, selectedTitle: '欧拉' },
      physics: { exp: 2000, level: 6, selectedTitle: null },
      cs: { exp: 1800, level: 6, selectedTitle: null },
    } as UserModuleData,
  },
  {
    id: '6',
    nickname: '理性派',
    avatar: '👩‍🎓',
    moduleData: {
      math: { exp: 600, level: 4, selectedTitle: null },
      physics: { exp: 700, level: 4, selectedTitle: null },
      cs: { exp: 550, level: 4, selectedTitle: null },
    } as UserModuleData,
  },
  {
    id: '7',
    nickname: '好奇宝宝',
    avatar: '🚀',
    moduleData: {
      math: { exp: 400, level: 3, selectedTitle: null },
      physics: { exp: 350, level: 3, selectedTitle: null },
      cs: { exp: 420, level: 3, selectedTitle: null },
    } as UserModuleData,
  },
  {
    id: '8',
    nickname: '勤奋小生',
    avatar: '🧑‍🎓',
    moduleData: {
      math: { exp: 200, level: 2, selectedTitle: null },
      physics: { exp: 180, level: 2, selectedTitle: null },
      cs: { exp: 220, level: 2, selectedTitle: null },
    } as UserModuleData,
  },
];

// 计算总经验值
function getTotalExp(moduleData: UserModuleData): number {
  return moduleData.math.exp + moduleData.physics.exp + moduleData.cs.exp;
}

export default function LeaderboardPage() {
  const [users] = useState(MOCK_USERS);
  const [activeTab, setActiveTab] = useState<'total' | 'math' | 'physics' | 'cs'>('total');

  // 根据当前标签排序用户
  const sortedUsers = [...users].sort((a, b) => {
    if (activeTab === 'total') {
      return getTotalExp(b.moduleData) - getTotalExp(a.moduleData);
    }
    return b.moduleData[activeTab].exp - a.moduleData[activeTab].exp;
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-400">{index + 1}</span>;
    }
  };

  const getRankBg = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300';
      case 1:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-300';
      case 2:
        return 'bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300';
      default:
        return 'bg-white';
    }
  };

  const getModuleIcon = (category: ModuleCategory) => {
    switch (category) {
      case 'math':
        return <Calculator className="w-4 h-4" />;
      case 'physics':
        return <Atom className="w-4 h-4" />;
      case 'cs':
        return <Cpu className="w-4 h-4" />;
    }
  };

  const getModuleColor = (category: ModuleCategory) => {
    switch (category) {
      case 'math':
        return 'text-blue-600 bg-blue-50';
      case 'physics':
        return 'text-pink-600 bg-pink-50';
      case 'cs':
        return 'text-cyan-600 bg-cyan-50';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            排行榜
          </h1>
          <p className="text-gray-500">看看谁是真正的理科之王！</p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {sortedUsers.slice(0, 3).map((user, idx) => {
            const heights = ['h-32', 'h-40', 'h-24'];
            const orders = [1, 0, 2];
            const colors = [
              'bg-gradient-to-t from-gray-300 to-gray-100',
              'bg-gradient-to-t from-yellow-400 to-yellow-100',
              'bg-gradient-to-t from-amber-600 to-amber-200',
            ];
            const primaryFrame = getPrimaryFrame(user.moduleData);
            const primaryTitle = getPrimaryTitle(user.moduleData);
            const displayExp = activeTab === 'total'
              ? getTotalExp(user.moduleData)
              : user.moduleData[activeTab].exp;

            return (
              <div
                key={user.id}
                className={`flex flex-col items-center ${orders[idx] === 0 ? 'order-2' : orders[idx] === 1 ? 'order-1' : 'order-3'}`}
              >
                <div className={`w-16 h-16 rounded-full ${FRAME_STYLES[primaryFrame]} p-1 mb-2`}>
                  <Avatar className="w-full h-full">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-400">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p className="font-bold text-sm mb-1">{user.nickname}</p>
                <p className="text-xs text-gray-500 mb-2">{displayExp} EXP</p>
                <p className="text-xs text-purple-600 mb-2">{primaryTitle.title}</p>
                <div className={`w-24 ${heights[orders[idx]]} ${colors[orders[idx]]} rounded-t-xl flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-gray-700">
                    {orders[idx] === 0 ? '🥇' : orders[idx] === 1 ? '🥈' : '🥉'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard Table */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="mb-6 grid grid-cols-4">
            <TabsTrigger value="total" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              总排行
            </TabsTrigger>
            <TabsTrigger value="math" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              数学
            </TabsTrigger>
            <TabsTrigger value="physics" className="flex items-center gap-2">
              <Atom className="w-4 h-4" />
              物理
            </TabsTrigger>
            <TabsTrigger value="cs" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              计算机
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card className="overflow-hidden">
              <div className="divide-y">
                {sortedUsers.map((user, index) => {
                  const primaryFrame = getPrimaryFrame(user.moduleData);
                  const primaryTitle = getPrimaryTitle(user.moduleData);
                  const moduleLevel = activeTab === 'total'
                    ? Math.max(user.moduleData.math.level, user.moduleData.physics.level, user.moduleData.cs.level)
                    : user.moduleData[activeTab].level;
                  const displayExp = activeTab === 'total'
                    ? getTotalExp(user.moduleData)
                    : user.moduleData[activeTab].exp;

                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 ${getRankBg(index)}`}
                    >
                      <div className="flex-shrink-0">{getRankIcon(index)}</div>

                      <div className={`w-12 h-12 rounded-full ${FRAME_STYLES[primaryFrame]} p-0.5`}>
                        <Avatar className="w-full h-full">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-xl bg-gradient-to-br from-purple-400 to-pink-400">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{user.nickname}</span>
                          <Badge variant="secondary" className="text-xs">
                            Lv.{moduleLevel}
                          </Badge>
                          {activeTab !== 'total' && (
                            <Badge className={`text-xs ${getModuleColor(activeTab)}`}>
                              {getModuleIcon(activeTab)}
                              <span className="ml-1">{getModuleDisplayName(activeTab)}</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{primaryTitle.title}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-purple-600">{displayExp}</p>
                        <p className="text-xs text-gray-400">EXP</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Level Info */}
        <Card className="mt-8 p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            等级说明
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {LEVEL_CONFIG.map((level) => (
              <div key={level.level} className="text-center p-3 rounded-lg bg-gray-50">
                <div className={`w-10 h-10 mx-auto rounded-full ${FRAME_STYLES[level.frame]} mb-2`} />
                <p className="font-bold text-sm">Lv.{level.level}</p>
                <p className="text-xs text-gray-400">{level.minExp}+ EXP</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>每个模块的经验值独立计算，达到7级可选择传奇称号</p>
          </div>
        </Card>
      </main>
    </div>
  );
}
