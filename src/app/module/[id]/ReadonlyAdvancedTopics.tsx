'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContentBlockView } from './ContentBlockView';
import { StaticTopic } from '@/data/highschoolStatic';
import { NotePanel } from '@/components/note/NotePanel';
import { StickyNoteManager, StickyNoteManagerRef } from '@/components/note/StickyNoteManager';
import { Note } from '@/types';
import { BookOpen, ChevronRight } from 'lucide-react';

interface ReadonlyAdvancedTopicsProps {
  topics: StaticTopic[];
  moduleId?: string;
  moduleName?: string;
  userId?: string;
  stickyNoteRef?: React.RefObject<StickyNoteManagerRef | null>;
  onCreateNote?: (chapterTitle: string) => void;
  onEditNote?: (note: Note) => void;
}

// 知识点卡片
function TopicCard({
  topic,
  isSelected,
  onClick,
}: {
  topic: StaticTopic;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className={`p-5 cursor-pointer transition-all hover:scale-[1.02] ${
        isSelected
          ? 'ring-2 ring-blue-500 bg-blue-50'
          : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shrink-0">
          <span className="text-xl">{topic.icon || '📐'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 mb-1">{topic.title}</h3>
          <p className="text-sm text-slate-500 line-clamp-2">
            {topic.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {topic.subTopics.length} 个课时
            </Badge>
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${
          isSelected ? 'rotate-90' : ''
        }`} />
      </div>
    </Card>
  );
}

// 子章节导航和内容展示
function TopicDetail({
  topic,
  initialSubTopicTitle,
  onBack,
  moduleId,
  moduleName,
  userId,
  stickyNoteRef,
  focusNote,
  onCreateNote,
  onEditNote,
}: {
  topic: StaticTopic;
  initialSubTopicTitle?: string;
  onBack: () => void;
  moduleId?: string;
  moduleName?: string;
  userId?: string;
  stickyNoteRef?: React.RefObject<StickyNoteManagerRef | null>;
  focusNote?: { id: string; ts: number } | null;
  onCreateNote?: (chapterTitle: string) => void;
  onEditNote?: (note: Note) => void;
}) {
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<string>(() => {
    if (initialSubTopicTitle) {
      const st = topic.subTopics.find((s) => s.title === initialSubTopicTitle);
      if (st) return st.id;
    }
    return topic.subTopics[0]?.id || '';
  });

  const selectedSubTopic = topic.subTopics.find(
    (st) => st.id === selectedSubTopicId
  );

  const chapterTitle = selectedSubTopic?.title || topic.title;

  return (
    <div className="flex gap-4">
      {/* 左侧课时导航 - sticky 固定 */}
      <div className="w-64 shrink-0">
        <div className="sticky top-4 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-slate-200">
            <button
              onClick={onBack}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2"
            >
              ← 返回知识点列表
            </button>
            <h3 className="font-bold text-slate-800">{topic.title}</h3>
          </div>
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            {topic.subTopics.map((subTopic, index) => (
              <button
                key={subTopic.id}
                onClick={() => setSelectedSubTopicId(subTopic.id)}
                className={`w-full text-left px-4 py-3 border-b border-slate-100 transition-colors ${
                  selectedSubTopicId === subTopic.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-r-blue-500'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium truncate">
                    {subTopic.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧内容区 - 全屏滚动 */}
      <div className="flex-1 min-w-0 relative">
        {userId && moduleId && (
          <StickyNoteManager
            ref={stickyNoteRef}
            moduleId={moduleId}
            chapterTitle={chapterTitle}
            userId={userId}
            focusNote={focusNote}
          />
        )}
        {selectedSubTopic ? (
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span>当前学习</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  {selectedSubTopic.title}
                </h2>
              </div>
              {moduleId && moduleName && (
                <NotePanel
                  moduleId={moduleId}
                  moduleName={moduleName}
                  chapterTitle={chapterTitle}
                  onCreateNote={() => stickyNoteRef?.current?.addNote()}
                  onEditNote={onEditNote || (() => {})}
                />
              )}
            </div>
            <div className="p-6">
              {selectedSubTopic.blocks.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p>该课时暂无内容</p>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto space-y-4">
                  {selectedSubTopic.blocks.map((block) => (
                    <ContentBlockView key={block.id} block={block} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 flex items-center justify-center text-slate-400">
            <p>请选择一个课时开始学习</p>
          </div>
        )}
      </div>
    </div>
  );
}

/** 解析 location.hash 中的定位参数（#topic=章节标题或 id / #chapter=课时标题 / #note=笔记 id） */
function parseLocationHash(): { topic?: string; chapter?: string; note?: string } {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return {
    topic: params.get('topic') || undefined,
    chapter: params.get('chapter') || undefined,
    note: params.get('note') || undefined,
  };
}

// 主组件
export function ReadonlyAdvancedTopics({ topics, moduleId, moduleName, userId, stickyNoteRef, onCreateNote, onEditNote }: ReadonlyAdvancedTopicsProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [initialChapter, setInitialChapter] = useState<string | undefined>(undefined);
  // 「前往原文」要定位的笔记（ts 区分对同一笔记的重复点击）
  const [focusNote, setFocusNote] = useState<{ id: string; ts: number } | null>(null);

  // 支持 hash 深度定位：搜索结果（#topic=）与笔记"前往原文"（#chapter=&note=）
  useEffect(() => {
    const apply = () => {
      const { topic, chapter, note } = parseLocationHash();
      if (!topic && !chapter) return;
      let target = topic
        ? topics.find((t) => t.id === topic || t.title === topic)
        : undefined;
      if (!target && chapter) {
        target = topics.find(
          (t) => t.title === chapter || t.subTopics.some((st) => st.title === chapter)
        );
      }
      if (target) {
        setSelectedTopicId(target.id);
        setInitialChapter(chapter);
        if (note) {
          // 滚动到笔记由 StickyNoteManager 在笔记加载后完成（跟随笔记当前位置）
          setFocusNote({ id: note, ts: Date.now() });
        } else {
          window.scrollTo({ top: 0 });
        }
      }
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, [topics]);

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  if (selectedTopic) {
    return (
      <div className="space-y-6">
        <TopicDetail
          key={`${selectedTopic.id}:${initialChapter || ''}`}
          topic={selectedTopic}
          initialSubTopicTitle={initialChapter}
          onBack={() => setSelectedTopicId(null)}
          moduleId={moduleId}
          moduleName={moduleName}
          userId={userId}
          stickyNoteRef={stickyNoteRef}
          focusNote={focusNote}
          onCreateNote={onCreateNote}
          onEditNote={onEditNote}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            isSelected={selectedTopicId === topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}
