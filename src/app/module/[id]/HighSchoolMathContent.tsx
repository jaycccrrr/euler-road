'use client';

import Link from 'next/link';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import Header from '@/components/layout/Header';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import { SubTopic } from '@/data/highschoolMath';
import { ReadonlyAdvancedTopics } from './ReadonlyAdvancedTopics';
import { staticAdvancedTopics, StaticTopic } from '@/data/highschoolStatic';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { StickyNoteManagerRef } from '@/components/note/StickyNoteManager';
import { useAuth } from '@/hooks/useAuth';

interface HighSchoolMathContentProps {
  module: import('@/types').KnowledgeModule | undefined;
  moduleId: string;
}

const STORAGE_KEY = 'highschool-advanced-topics-v2';

// 将 localStorage 数据转换为 StaticTopic 格式
function convertTopicsToStaticFormat(topicsData: Record<string, SubTopic[]>): StaticTopic[] {
  const topicMap: Record<string, { id: string; title: string; description: string; icon: string }> = {
    'hs-adv-inequality': { id: 'hs-adv-inequality', title: '不等式', description: '均值不等式、柯西不等式、排序不等式等高级不等式技巧', icon: '≠' },
    'hs-adv-function': { id: 'hs-adv-function', title: '函数', description: '函数方程、迭代函数、抽象函数等深入内容', icon: 'ƒ' },
    'hs-adv-trig': { id: 'hs-adv-trig', title: '三角函数', description: '三角恒等变换、三角不等式、反三角函数', icon: '∠' },
    'hs-adv-triangle': { id: 'hs-adv-triangle', title: '三角形专题', description: '三角形几何、三角不等式、特殊点性质', icon: '△' },
    'hs-adv-analytic-geo': { id: 'hs-adv-analytic-geo', title: '平面解析几何', description: '圆锥曲线进阶、参数方程、极坐标', icon: '⊕' },
    'hs-adv-combination': { id: 'hs-adv-combination', title: '排列组合', description: '计数原理、容斥原理、递推方法', icon: 'C' },
    'hs-adv-sequence': { id: 'hs-adv-sequence', title: '数列', description: '递推数列、数列求和、数列不等式', icon: 'Σ' },
    'hs-adv-limit': { id: 'hs-adv-limit', title: '极限与导数', description: '函数极限、导数应用、泰勒展开', icon: '∂' },
    'hs-adv-complex': { id: 'hs-adv-complex', title: '复数', description: '复数运算、复数几何、单位根', icon: 'ℂ' },
    'hs-adv-solid-geo': { id: 'hs-adv-solid-geo', title: '立体几何', description: '空间向量、几何体性质、空间角', icon: '◈' },
  };

  return Object.entries(topicMap).map(([id, info]) => ({
    ...info,
    subTopics: (topicsData[id] || []) as unknown as StaticTopic['subTopics']
  }));
}

// localStorage 快照缓存：useSyncExternalStore 要求快照引用稳定
let topicsCacheRaw: string | null = null;
let topicsCacheParsed: StaticTopic[] = staticAdvancedTopics;

function getClientTopics(): StaticTopic[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === topicsCacheRaw) return topicsCacheParsed;
    topicsCacheRaw = raw;
    const parsed: Record<string, SubTopic[]> = raw ? JSON.parse(raw) : {};
    topicsCacheParsed = Object.keys(parsed).length > 0
      ? convertTopicsToStaticFormat(parsed)
      : staticAdvancedTopics;
    return topicsCacheParsed;
  } catch {
    return staticAdvancedTopics;
  }
}

const subscribeNoop = () => () => {};
const getServerTopics = () => staticAdvancedTopics;

export default function HighSchoolMathContent({
  module: initialModule,
  moduleId,
}: HighSchoolMathContentProps) {
  const mod = initialModule ?? KNOWLEDGE_MODULES.find((m) => m.id === moduleId);

  // 便签笔记
  const stickyNoteRef = useRef<StickyNoteManagerRef>(null);
  const { user } = useAuth();

  // SSR/水合用静态数据，水合后自动重读 localStorage
  const topicsData = useSyncExternalStore(subscribeNoop, getClientTopics, getServerTopics);

  // 清理旧的 localStorage 缓存（包含失效的图片链接）
  useEffect(() => {
    try {
      localStorage.removeItem('highschool-advanced-topics');
      localStorage.removeItem('highschool-question-bank');
    } catch {
      // ignore
    }
  }, []);

  if (!mod) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">模块未找到</h1>
          <Link href="/courses">
            <Button>所有课程</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link href="/courses">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            所有课程
          </Button>
        </Link>

        {/* 模块头部 */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-b from-slate-50 via-white to-white p-8 md:p-12 mb-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${mod.color}`} />
          <div className="pointer-events-none absolute inset-0 bg-pattern-dots opacity-20" />
          <div className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${mod.color} opacity-20 blur-3xl`} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className={`w-24 h-24 bg-gradient-to-br ${mod.color} rounded-2xl flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/70`}>
              {mod.icon}
            </div>
            <div className="text-center md:text-left">
              <Badge className="border border-slate-200 bg-white/80 text-slate-500 shadow-sm mb-2">数学</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">{mod.name}</h1>
              <p className="text-slate-500 max-w-xl leading-relaxed">{mod.description}</p>
            </div>
          </div>
        </div>

        {/* 课程内容：小章节卡片 */}
        <ReadonlyAdvancedTopics
          topics={topicsData}
          moduleId={moduleId || ''}
          moduleName={mod.name}
          userId={user?.id}
          stickyNoteRef={stickyNoteRef}
          onCreateNote={() => { stickyNoteRef.current?.addNote(); }}
          onEditNote={() => {}}
        />
      </main>

    </div>
  );
}
