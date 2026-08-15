'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Upload,
  FileText,
  BookOpen,
  ClipboardList,
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
  Download,
  Save,
  Pencil,
  Eye,
  Database,
} from 'lucide-react';
import {
  extractTextFromFile,
  chunkText,
  structureLessonChunk,
  extractQuestionsFromExam,
  generateLessonsTs,
  generateQuestionsTs,
  type ImportedQuestion,
} from '@/lib/import-pipeline';
import {
  createCustomLesson,
  getAllCustomLessons,
  deleteCustomLesson,
  updateCustomLesson,
} from '@/lib/db';
import { MathRenderer } from '@/components/math/MathRenderer';
import type { CustomLesson } from '@/types';

const MODULE_OPTIONS = [
  { id: 'highschool-math', name: '高中数学' },
  { id: 'advanced-math', name: '高等数学' },
  { id: 'linear-algebra', name: '线性代数' },
];

interface ChunkState {
  text: string;
  status: 'pending' | 'processing' | 'done' | 'failed';
}

export default function AdminImportPage() {
  const router = useRouter();
  const { user, isAuthenticated, hasHydrated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 上传配置
  const [importType, setImportType] = useState<'lesson' | 'exam'>('lesson');
  const [moduleId, setModuleId] = useState('advanced-math');
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 处理状态
  const [extracting, setExtracting] = useState(false);
  const [chunks, setChunks] = useState<ChunkState[]>([]);
  const [lessons, setLessons] = useState<CustomLesson[]>([]);
  const [questions, setQuestions] = useState<ImportedQuestion[]>([]);
  const [error, setError] = useState('');

  // 校验台
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // 已入库课时
  const [storedLessons, setStoredLessons] = useState<CustomLesson[]>([]);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) router.push('/login/');
  }, [isAuthenticated, hasHydrated, router]);

  useEffect(() => {
    if (user?.isAdmin) loadStored();
  }, [user?.isAdmin]);

  const loadStored = async () => {
    setStoredLessons(await getAllCustomLessons());
  };

  const handleParse = async () => {
    if (!selectedFile) return;
    setError('');
    setExtracting(true);
    setLessons([]);
    setQuestions([]);
    setSelectedLessonId(null);
    try {
      const text = await extractTextFromFile(selectedFile);
      const parts = chunkText(text);
      if (parts.length === 0) {
        setError('未能从文件中提取到文本内容');
        return;
      }
      setChunks(parts.map((text) => ({ text, status: 'pending' })));
    } catch (err) {
      console.error(err);
      setError('文件解析失败，请确认文件格式（支持 PDF / Markdown / 纯文本）');
    } finally {
      setExtracting(false);
    }
  };

  const processChunk = async (index: number) => {
    setChunks((prev) => prev.map((c, i) => (i === index ? { ...c, status: 'processing' } : c)));
    try {
      if (importType === 'lesson') {
        const lesson = await structureLessonChunk(chunks[index].text, moduleId, fileName);
        if (lesson) {
          setLessons((prev) => [...prev, lesson]);
          setChunks((prev) => prev.map((c, i) => (i === index ? { ...c, status: 'done' } : c)));
        } else {
          throw new Error('AI 返回无效结果');
        }
      } else {
        const qs = await extractQuestionsFromExam(chunks[index].text);
        setQuestions((prev) => [...prev, ...qs]);
        setChunks((prev) => prev.map((c, i) => (i === index ? { ...c, status: 'done' } : c)));
      }
    } catch (err) {
      console.error(err);
      setChunks((prev) => prev.map((c, i) => (i === index ? { ...c, status: 'failed' } : c)));
    }
  };

  const processAll = async () => {
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].status === 'pending' || chunks[i].status === 'failed') {
        await processChunk(i);
      }
    }
  };

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId) || null;
  const selectedChunk = selectedLesson
    ? chunks[lessons.findIndex((l) => l.id === selectedLessonId)]?.text
    : null;

  const updateLesson = (updated: CustomLesson) => {
    setLessons((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  };

  const handleSaveLesson = async (lesson: CustomLesson) => {
    const toSave = { ...lesson, status: 'published' as const };
    await createCustomLesson(toSave);
    setSavedIds((prev) => new Set(prev).add(lesson.id));
    updateLesson(toSave);
    await loadStored();
  };

  const downloadFile = (content: string, name: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center text-slate-500">加载中...</main>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center text-slate-500">无权限访问此页面</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">知识源导入</h1>
            <p className="text-sm text-slate-500">电子教材 / 电子试卷 → AI 结构化 → 人工校验 → 入库</p>
          </div>
        </div>

        {/* 第一步：上传 */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label className="text-slate-600 mb-1.5 block">导入类型</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={importType === 'lesson' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setImportType('lesson')}
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  电子教材
                </Button>
                <Button
                  type="button"
                  variant={importType === 'exam' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setImportType('exam')}
                >
                  <ClipboardList className="w-4 h-4 mr-1" />
                  电子试卷
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-slate-600 mb-1.5 block">目标模块</Label>
              <select
                value={moduleId}
                onChange={(e) => setModuleId(e.target.value)}
                className="w-full h-9 px-3 rounded-md border border-slate-200 bg-white text-sm"
              >
                {MODULE_OPTIONS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-slate-600 mb-1.5 block">源文件（PDF / MD / TXT）</Label>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{fileName || '选择文件'}</span>
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.md,.txt"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setSelectedFile(f);
                    setFileName(f.name);
                    setChunks([]);
                    setLessons([]);
                    setQuestions([]);
                  }
                }}
              />
            </div>
            <Button onClick={handleParse} disabled={!selectedFile || extracting}>
              {extracting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  解析中...
                </>
              ) : (
                '解析文件'
              )}
            </Button>
          </div>
          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
        </Card>

        {/* 第二步：切块与 AI 结构化 */}
        {chunks.length > 0 && (
          <Card className="p-6 bg-white border-slate-200 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">
                已切分为 {chunks.length} 个文本块
              </h2>
              <Button size="sm" onClick={processAll}>
                全部结构化
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {chunks.map((chunk, i) => (
                <button
                  key={i}
                  onClick={() => chunk.status !== 'processing' && processChunk(i)}
                  disabled={chunk.status === 'processing' || chunk.status === 'done'}
                  className={`p-3 rounded-lg border text-sm transition-colors ${
                    chunk.status === 'done'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : chunk.status === 'failed'
                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {chunk.status === 'processing' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {chunk.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {chunk.status === 'failed' && <XCircle className="w-3.5 h-3.5" />}
                    <span className="font-medium">块 {i + 1}</span>
                  </div>
                  <div className="text-xs opacity-70">
                    {chunk.status === 'done' ? '已完成' : chunk.status === 'failed' ? '重试' : chunk.status === 'processing' ? '处理中' : `${chunk.text.length} 字`}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* 第三步（教材）：校验台 */}
        {importType === 'lesson' && lessons.length > 0 && (
          <Card className="p-6 bg-white border-slate-200 shadow-sm mb-6">
            <h2 className="font-bold text-slate-900 mb-4">校验台（{lessons.length} 个课时）</h2>
            <div className="flex gap-2 mb-4 flex-wrap">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedLessonId === lesson.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lesson.title}
                  {savedIds.has(lesson.id) && <CheckCircle2 className="w-3 h-3 inline ml-1" />}
                </button>
              ))}
            </div>

            {selectedLesson && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <Input
                    value={selectedLesson.title}
                    onChange={(e) => updateLesson({ ...selectedLesson, title: e.target.value })}
                    className="max-w-sm font-medium"
                  />
                  <Button size="sm" onClick={() => handleSaveLesson(selectedLesson)} disabled={savedIds.has(selectedLesson.id)}>
                    <Save className="w-4 h-4 mr-1" />
                    {savedIds.has(selectedLesson.id) ? '已入库' : '确认入库'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadFile(generateLessonsTs([selectedLesson]), `${selectedLesson.title}.ts`)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    导出 TS
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* 左：原文 */}
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-1.5">原文</div>
                    <div className="h-[480px] overflow-y-auto p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">
                      {selectedChunk}
                    </div>
                  </div>
                  {/* 右：渲染预览（可编辑） */}
                  <div>
                    <div className="text-xs font-medium text-slate-500 mb-1.5">
                      渲染预览（点击 <Pencil className="w-3 h-3 inline" /> 编辑内容块）
                    </div>
                    <div className="h-[480px] overflow-y-auto p-4 rounded-lg bg-white border border-slate-200">
                      {selectedLesson.blocks.map((block) => (
                        <div key={block.id} className="group relative mb-3 pb-3 border-b border-slate-100 last:border-0">
                          {editingBlockId === block.id ? (
                            <div className="space-y-2">
                              <Textarea
                                value={block.content}
                                onChange={(e) =>
                                  updateLesson({
                                    ...selectedLesson,
                                    blocks: selectedLesson.blocks.map((b) =>
                                      b.id === block.id ? { ...b, content: e.target.value } : b
                                    ),
                                  })
                                }
                                className="min-h-[120px] text-sm"
                              />
                              <Button size="sm" variant="outline" onClick={() => setEditingBlockId(null)}>
                                <Eye className="w-3.5 h-3.5 mr-1" />
                                预览
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="prose prose-sm max-w-none text-slate-700">
                                {block.type === 'formula' ? (
                                  <div className="bg-slate-50 rounded p-3 text-center">
                                    <MathRenderer>{`$$${block.content}$$`}</MathRenderer>
                                  </div>
                                ) : (
                                  <MathRenderer>{block.content}</MathRenderer>
                                )}
                              </div>
                              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button
                                  onClick={() => setEditingBlockId(block.id)}
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-500"
                                >
                                  <Pencil className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() =>
                                    updateLesson({
                                      ...selectedLesson,
                                      blocks: selectedLesson.blocks.filter((b) => b.id !== block.id),
                                    })
                                  }
                                  className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      {selectedLesson.examples && selectedLesson.examples.length > 0 && (
                        <div className="mt-4">
                          <Badge variant="secondary" className="mb-2">{selectedLesson.examples.length} 道例题</Badge>
                          {selectedLesson.examples.map((ex) => (
                            <div key={ex.id} className="mb-3 p-3 rounded-lg bg-slate-50 text-sm">
                              <MathRenderer>{ex.question}</MathRenderer>
                              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                                {ex.options.map((opt, i) => (
                                  <li key={i} className={i === ex.correct ? 'text-emerald-700 font-medium' : ''}>
                                    {String.fromCharCode(65 + i)}. {opt} {i === ex.correct && '✓'}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        )}

        {/* 第三步（试卷）：题目预览与导出 */}
        {importType === 'exam' && questions.length > 0 && (
          <Card className="p-6 bg-white border-slate-200 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">抽取到 {questions.length} 道题目</h2>
              <Button
                size="sm"
                onClick={() => downloadFile(generateQuestionsTs(questions, moduleId), `题库导入-${fileName}.ts`)}
              >
                <Download className="w-4 h-4 mr-1" />
                导出题库 TS 片段
              </Button>
            </div>
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="tag-math text-xs">{MODULE_OPTIONS.find((m) => m.id === moduleId)?.name}</Badge>
                    <span className="text-xs text-amber-600">{'★'.repeat(q.difficulty)}</span>
                    <span className="font-medium text-slate-800 text-sm">{q.title}</span>
                  </div>
                  <div className="text-sm text-slate-700 mb-2">
                    <MathRenderer>{q.content}</MathRenderer>
                  </div>
                  <details className="text-xs text-slate-500">
                    <summary className="cursor-pointer hover:text-slate-700">查看解答</summary>
                    <div className="mt-2 p-3 bg-white rounded border border-slate-200">
                      <MathRenderer>{q.answer}</MathRenderer>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 已入库课时管理 */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-slate-500" />
            已入库课时（{storedLessons.length}）
          </h2>
          {storedLessons.length === 0 ? (
            <p className="text-sm text-slate-400">暂无导入的课时</p>
          ) : (
            <div className="space-y-2">
              {storedLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                  <span className="font-medium text-sm text-slate-800 flex-1 truncate">{lesson.title}</span>
                  <Badge variant="secondary" className="text-xs">
                    {MODULE_OPTIONS.find((m) => m.id === lesson.moduleId)?.name || lesson.moduleId}
                  </Badge>
                  <Badge className={`text-xs ${lesson.status === 'published' ? 'bg-emerald-500' : 'bg-slate-400'}`}>
                    {lesson.status === 'published' ? '已发布' : '草稿'}
                  </Badge>
                  <span className="text-xs text-slate-400">{lesson.sourceName}</span>
                  <button
                    onClick={async () => {
                      await updateCustomLesson({
                        ...lesson,
                        status: lesson.status === 'published' ? 'draft' : 'published',
                      });
                      await loadStored();
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    {lesson.status === 'published' ? '下线' : '发布'}
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm(`确定删除课时「${lesson.title}」？`)) return;
                      await deleteCustomLesson(lesson.id);
                      await loadStored();
                    }}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
