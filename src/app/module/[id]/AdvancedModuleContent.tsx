'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import Header from '@/components/layout/Header';
import { KnowledgeModule } from '@/types';
import { KNOWLEDGE_MODULES } from '@/data/modules';
import type { Chapter } from '@/data/advancedMathBlocks';
import { linearAlgebraChapters as laChaptersSource } from '@/data/linearAlgebraBlocks';
import { ReadonlyAdvancedTopics } from './ReadonlyAdvancedTopics';
import { StaticTopic } from '@/data/highschoolStatic';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getCustomLessonsByModule } from '@/lib/db';
import { StickyNoteManagerRef } from '@/components/note/StickyNoteManager';
import CubeLoader from '@/components/ui/cube-loader';

interface AdvancedModuleContentProps {
  module: KnowledgeModule | undefined;
  moduleId: string;
}

// 将章节(Chapter)数据直接转换为 StaticTopic[] 格式
// 每个 Chapter 对应一个 Topic，每个 Lesson 对应一个 SubTopic
// 线性代数只有1个大章节(7课时全在一起)，需拆分为每课时独立章节
function chaptersToTopics(chapters: Chapter[], moduleId: string): StaticTopic[] {
  // 线性代数：把单个大章节拆为每课时一个独立章节
  if (moduleId === 'linear-algebra' && chapters.length === 1) {
    const ch = chapters[0];
    const laIcons = ['| |', '[ ]', '→', 'Ax=b', 'λ', 'Q', 'V'];
    return ch.lessons.map((lesson, idx) => ({
      id: lesson.id,
      title: lesson.title,
      description: `${lesson.blocks?.length || 0} 个内容块`,
      icon: laIcons[idx] || '📐',
      subTopics: [{
        id: `${lesson.id}-content`,
        title: lesson.title,
        blocks: lesson.blocks || [],
      }],
    }));
  }

  return chapters.map(ch => ({
    id: ch.id,
    title: ch.title,
    description: ch.description || `${ch.lessons.length} 个课时`,
    icon: ch.icon,
    subTopics: ch.lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      blocks: lesson.blocks || [],
    })),
  }));
}

// 动态加载高等数学/线性代数课程章节
function useCourseChapters(moduleId: string) {
  const [data, setData] = useState<{
    chapters: Chapter[];
    loading: boolean;
    error: Error | null;
  }>({
    chapters: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        // 加载导入管线入库的自定义课时（已发布），作为额外章节挂载
        const customLessons = await getCustomLessonsByModule(moduleId).catch(() => []);
        const published = customLessons.filter((l) => l.status === 'published');
        const customChapter: Chapter | null =
          published.length > 0
            ? {
                id: 'custom-imported',
                title: '导入内容',
                description: `${published.length} 个导入课时`,
                icon: '📥',
                lessons: published.map((l) => ({
                  id: l.id,
                  title: l.title,
                  has3D: false,
                  blocks: l.blocks,
                  examples: l.examples,
                })),
              }
            : null;

        if (moduleId === 'linear-algebra') {
          // 线性代数：使用独立数据
          if (!mounted) return;
          const laChapters: Chapter[] = laChaptersSource.map(ch => ({
            ...ch,
            description: '',
            lessons: ch.lessons.map(l => ({
              ...l,
              has3D: false,
              examples: [],
            })),
          }));
          setData({
            chapters: customChapter ? [...laChapters, customChapter] : laChapters,
            loading: false,
            error: null,
          });
          return;
        }

        // 高等数学
        const { basicChapters } = await import('@/data/advancedMathBlocks');
        if (!mounted) return;

        setData({
          chapters: customChapter ? [...basicChapters, customChapter] : basicChapters,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!mounted) return;
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error : new Error('加载失败'),
        }));
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, [moduleId]);

  return data;
}

export default function AdvancedModuleContent({ module: initialModule, moduleId }: AdvancedModuleContentProps) {
  const mod = initialModule ?? KNOWLEDGE_MODULES.find((m) => m.id === moduleId);

  // 便签笔记
  const stickyNoteRef = useRef<StickyNoteManagerRef>(null);
  const { user } = useAuth();

  const { chapters, loading, error } = useCourseChapters(moduleId || '');

  // 将课程数据转换为 StaticTopic[] 格式（与高中数学知识点模块一致）
  const topicsData = useMemo(() => chaptersToTopics(chapters, moduleId || 'advanced-math'), [chapters, moduleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <CubeLoader screen text="加载中" subtext="正在加载课程内容…" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">加载失败</h1>
          <p className="text-slate-500 mb-4">{error.message}</p>
          <Link href="/courses"><Button>所有课程</Button></Link>
        </main>
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">模块未找到</h1>
          <Link href="/courses"><Button>所有课程</Button></Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/courses">
          <Button variant="ghost" className="mb-4"><ArrowLeft className="w-4 h-4 mr-2" />所有课程</Button>
        </Link>

        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${mod.color} p-8 md:p-12 mb-8`}>
          <div className="absolute inset-0 bg-pattern-dots opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm">{mod.icon}</div>
            <div className="text-center md:text-left text-white">
              <Badge className="bg-white/20 text-white mb-2">数学</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{mod.name}</h1>
              <p className="text-white/90 max-w-xl">{mod.description}</p>
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
