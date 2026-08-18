'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContentBlockView } from './ContentBlockView';
import { StaticTopic } from '@/data/highschoolStatic';
import type { ContentBlock } from '@/data/highschoolMath';
import { NotePanel } from '@/components/note/NotePanel';
import { StickyNoteManager, StickyNoteManagerRef } from '@/components/note/StickyNoteManager';
import { Note } from '@/types';
import { BookOpen, ChevronRight, Download, Pencil, Save, Trash2, Upload } from 'lucide-react';
import {
  loadKbEdits,
  saveKbEdit,
  deleteKbEdit,
  downloadKbFillEdits,
  type KbFillEdit,
  type KbFillImage,
} from '@/lib/kb-fill-edits';
import { useMissingRefs } from '@/lib/useMissingRefs';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// 收集课时内容里的本地图片引用（图片块 + 文本中的 <img>/![...]）
function collectImageRefs(blocks: ContentBlock[]): string[] {
  const out: string[] = [];
  const re = /<img[^>]+src\s*=\s*["']([^"']+)["']|!\[[^\]]*\]\(([^)]+)\)/gi;
  for (const b of blocks) {
    if (b.type === 'image') {
      if (b.content && !out.includes(b.content)) out.push(b.content);
    } else {
      let m;
      re.lastIndex = 0;
      while ((m = re.exec(b.content))) {
        const u = (m[1] || m[2] || '').trim();
        if (u && u.startsWith('/') && !out.includes(u)) out.push(u);
      }
    }
  }
  return out;
}

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
  editMode,
  kbEdits,
  onSaveEdit,
  onDeleteEdit,
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
  editMode: boolean;
  kbEdits: Record<string, KbFillEdit>;
  onSaveEdit: (edit: KbFillEdit) => void;
  onDeleteEdit: (key: string) => void;
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
  const subKey = selectedSubTopic ? `${topic.id}:${selectedSubTopic.id}` : '';
  const subRefs = selectedSubTopic ? collectImageRefs(selectedSubTopic.blocks) : [];
  const missingMap = useMissingRefs(subRefs);
  const [images, setImages] = useState<KbFillImage[]>([]);
  useEffect(() => {
    setImages(kbEdits[subKey]?.images ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subKey]);
  const missCount = subRefs.filter((r) => missingMap[r] === true).length;

  const uploadForRef = async (ref: string, file?: File | null) => {
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    setImages((prev) => [...prev.filter((i) => i.ref !== ref), { ref, dataUrl, name: file.name }]);
  };

  const removeImage = (ref: string) => setImages((prev) => prev.filter((i) => i.ref !== ref));

  const handleSave = () => {
    if (!selectedSubTopic || !subKey) return;
    onSaveEdit({
      key: subKey,
      topicId: topic.id,
      subId: selectedSubTopic.id,
      images,
      updatedAt: Date.now(),
    });
  };

  const handleDelete = () => {
    if (!subKey) return;
    onDeleteEdit(subKey);
    setImages([]);
  };

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
              {editMode && (
                <div className="mt-6 max-w-3xl mx-auto p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 font-medium text-sm">
                    <Pencil className="w-4 h-4" />
                    编辑区
                    <span className="font-normal text-amber-700/80">
                      本课时缺失图片 {missCount} 张 · 改动保存在本机，完成后点右上角“导出编辑数据”
                    </span>
                  </div>
                  {subRefs.length === 0 ? (
                    <p className="text-xs text-amber-700/80">本课时没有图片引用</p>
                  ) : (
                    <div className="space-y-1.5">
                      {subRefs.map((ref) => {
                        const img = images.find((i) => i.ref === ref);
                        return (
                          <div key={ref} className="flex items-center gap-2 text-xs">
                            <code className="text-[11px] text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded break-all">
                              {ref}
                            </code>
                            <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-white border border-amber-300 text-amber-800 hover:bg-amber-100 shrink-0">
                              <Upload className="w-3 h-3" />
                              上传图片
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  void uploadForRef(ref, e.target.files?.[0]);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                            {img ? (
                              <>
                                <img
                                  src={img.dataUrl}
                                  alt="预览"
                                  className="h-10 w-10 object-cover rounded border border-amber-200"
                                />
                                <button
                                  type="button"
                                  className="text-amber-700 hover:text-rose-600"
                                  onClick={() => removeImage(ref)}
                                  title="移除该图"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : missingMap[ref] === false ? (
                              <span className="text-emerald-600/70">已存在</span>
                            ) : missingMap[ref] === true ? (
                              <span className="text-rose-600/70">缺失，待上传</span>
                            ) : (
                              <span className="text-amber-600/70">检测中…</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white" onClick={handleSave}>
                      <Save className="w-3.5 h-3.5 mr-1" />
                      保存本课时
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-300 text-amber-800"
                      onClick={handleDelete}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      删除本课时编辑
                    </Button>
                  </div>
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
  const [editMode, setEditMode] = useState(false);
  const [kbEdits, setKbEdits] = useState<Record<string, KbFillEdit>>({});

  useEffect(() => {
    let alive = true;
    void loadKbEdits().then((m) => {
      if (alive) setKbEdits(m);
    });
    return () => {
      alive = false;
    };
  }, []);

  const handleSaveEdit = (edit: KbFillEdit) => {
    void saveKbEdit(edit).then(() => {
      setKbEdits((prev) => ({ ...prev, [edit.key]: edit }));
    });
  };

  const handleDeleteEdit = (key: string) => {
    void deleteKbEdit(key).then(() => {
      setKbEdits((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    });
  };

  const handleExport = () => downloadKbFillEdits(kbEdits);

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

  const editToolbar = (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="sm"
        variant={editMode ? 'default' : 'outline'}
        className={editMode ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'border-slate-200 text-slate-600'}
        onClick={() => setEditMode((v) => !v)}
      >
        <Pencil className="w-3.5 h-3.5 mr-1" />
        {editMode ? '退出编辑' : '编辑模式'}
      </Button>
      {editMode && (
        <Button
          size="sm"
          variant="outline"
          className="border-amber-300 text-amber-800 hover:bg-amber-100"
          onClick={handleExport}
        >
          <Download className="w-3.5 h-3.5 mr-1" />
          导出编辑数据
        </Button>
      )}
    </div>
  );

  if (selectedTopic) {
    return (
      <div className="space-y-6">
        {editToolbar}
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
          editMode={editMode}
          kbEdits={kbEdits}
          onSaveEdit={handleSaveEdit}
          onDeleteEdit={handleDeleteEdit}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {editToolbar}
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
