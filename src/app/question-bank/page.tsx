'use client';

import { useState, useEffect, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { StarFavoriteButton } from '@/components/ui/star-favorite-button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MathRenderer } from '@/components/math/MathRenderer';
import { assetPath } from '@/lib/asset';
import { staticQuestionBankChapters } from '@/data/highschoolStatic';
import { advancedMathExerciseChapters, getGroupedChapters } from '@/data/advancedMathExerciseData';
import { linearAlgebraExerciseChapters } from '@/data/linearAlgebraExerciseData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { StaticQuestion } from '@/data/highschoolStatic';
import type { ContentBlock } from '@/data/highschoolMath';
import {
  Calendar,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Ruler,
  Sigma,
  Grid3X3,
    Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  List,
  X,
  Sparkles,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';

// ── Unified Question Type ──
interface QuizQuestion {
  id: string;
  content: string;
  options: string[];
  correctOption: number | number[];
  choiceType: 'single' | 'multiple';
  explanation: string;
  hint: string;
}

interface ChapterNode {
  id: string;
  title: string;
  icon: string;
  count: number;
  questions: QuizQuestion[];
}

/** 大章节分组（如高等数学：第一章 极限与连续 > 各小节） */
interface ChapterGroup {
  id: string;
  title: string;
  icon: string;
  num: number;
  chapters: ChapterNode[];
}

interface SubjectNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient: string;
  bgLight: string;
  text: string;
  border: string;
  chapters: ChapterNode[];
  groups?: ChapterGroup[];
}

const QUESTIONS_PER_PAGE = 10;

// ── Apple 风格按压反馈：按下（pointer-down）即时缩放、临界阻尼无回弹、尊重 prefers-reduced-motion ──
const PRESS =
  'motion-safe:transition-all motion-safe:duration-200 motion-safe:active:duration-75 motion-safe:active:scale-[0.98]';

// ── 题库答题进度（localStorage 持久化） ──
const PROGRESS_KEY = 'euler-qb-progress-v1';
type QbProgress = Record<string, true>;

const EMPTY_PROGRESS: QbProgress = {};
let progressCacheRaw: string | null = null;
let progressCacheParsed: QbProgress = EMPTY_PROGRESS;

function readProgress(): QbProgress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw === progressCacheRaw) return progressCacheParsed;
    progressCacheRaw = raw;
    progressCacheParsed = raw ? (JSON.parse(raw) as QbProgress) : EMPTY_PROGRESS;
    return progressCacheParsed;
  } catch {
    return EMPTY_PROGRESS;
  }
}

// localStorage 无变更事件，订阅为空即可；快照经缓存保持稳定引用
const subscribeNoop = () => () => {};
const getServerProgress = () => EMPTY_PROGRESS;

function chapterProgress(ch: ChapterNode, progress: QbProgress) {
  const done = ch.questions.reduce((s, q) => s + (progress[q.id] ? 1 : 0), 0);
  const pct = ch.count > 0 ? Math.round((done / ch.count) * 100) : 0;
  return { done, pct };
}

// ── 收藏模式：仅保留含收藏题的章节，章节内仅保留收藏题 ──
type PracticeMode = 'all' | 'favorites';

function filterSubjectsByFavorites(subjects: SubjectNode[], favIds: Set<string>): SubjectNode[] {
  const filterChapter = (ch: ChapterNode): ChapterNode | null => {
    const qs = ch.questions.filter((q) => favIds.has(q.id));
    if (qs.length === 0) return null;
    return { ...ch, questions: qs, count: qs.length };
  };
  return subjects.map((s) => ({
    ...s,
    chapters: s.chapters.map(filterChapter).filter((c): c is ChapterNode => c !== null),
    groups: s.groups
      ?.map((g) => ({
        ...g,
        chapters: g.chapters.map(filterChapter).filter((c): c is ChapterNode => c !== null),
      }))
      .filter((g) => g.chapters.length > 0),
  }));
}

// ── 刷题模式切换（全部 / 收藏），放在「选择科目」下方 ──
function ModeToggle({
  mode,
  favCount,
  onChange,
}: {
  mode: PracticeMode;
  favCount: number;
  onChange: (mode: PracticeMode) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100">
      {([
        { id: 'all', label: '全部题目', icon: BookOpen },
        { id: 'favorites', label: favCount > 0 ? `收藏 ${favCount}` : '收藏题目', icon: Bookmark },
      ] as const).map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium motion-safe:transition-all motion-safe:duration-200 ${PRESS} ${
            mode === m.id ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <m.icon className="w-3.5 h-3.5" />
          {m.label}
        </button>
      ))}
    </div>
  );
}

// ── 收藏模式空状态 ──
function FavoritesEmptyState({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Card className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-16 text-center">
      <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
      {isAuthenticated ? (
        <>
          <p className="text-slate-500 text-sm">该科目还没有收藏题目</p>
          <p className="text-slate-400 text-xs mt-1">刷题时点击题目右上角的书签即可收藏</p>
        </>
      ) : (
        <>
          <p className="text-slate-500 text-sm">登录后才能使用收藏模式</p>
          <p className="text-slate-400 text-xs mt-1">收藏的题目会同步到你的账号</p>
        </>
      )}
    </Card>
  );
}

// ── Helpers ──
// 高等数学习题数据里混有 `<span ...>标签: ...</span>` 原始 HTML 标签块，渲染前剔除
const TAG_BLOCK_RE = /^\s*<span[^>]*>\s*标签[:：]/;

// 题目内容/解析：文本块直接拼接，图片块转为 <img>（由 MathRenderer 统一渲染并补 basePath）
function blocksToHtml(blocks: ContentBlock[]): string {
  return blocks
    .filter((b) => !TAG_BLOCK_RE.test(b.content))
    .map((b) => {
      if (b.type === 'image' && b.content) {
        const widthAttr = b.width ? ` width="${b.width}"` : '';
        return `<img src="${assetPath(b.content)}" alt="题目图片"${widthAttr} class="max-w-full rounded-lg my-2" loading="lazy" decoding="async" />`;
      }
      return b.content;
    })
    .join('\n');
}

function convertStaticQuestion(q: StaticQuestion): QuizQuestion {
  const content = blocksToHtml(q.blocks);
  const explanation = blocksToHtml(q.solutionBlocks || []);
  const correct = q.correctOptions?.length
    ? q.correctOptions
    : q.correctOption !== undefined
    ? q.correctOption
    : 0;
  return {
    id: q.id,
    content,
    options: q.options || [],
    correctOption: correct,
    choiceType: q.choiceType || 'single',
    explanation,
    hint: blocksToHtml(q.hintBlocks || []),
  };
}

// ── Build Data（基础/提高已合并，每科目一份扁平章节列表） ──
function buildSubjects(): SubjectNode[] {
  // 高中数学：删去基础题，提高题并入「高中数学习题」
  const hsChapters: ChapterNode[] = staticQuestionBankChapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    icon: ch.icon,
    count: ch.questions.length,
    questions: ch.questions.map(convertStaticQuestion),
  }));

  // 高等数学：基础与提高合并为一份，并按数据自带的大章节分组
  const amChapters: ChapterNode[] = advancedMathExerciseChapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    icon: ch.icon,
    count: ch.questions.length,
    questions: ch.questions.map(convertStaticQuestion),
  }));
  const amGroups: ChapterGroup[] = getGroupedChapters()
    .map(({ major, chapters }) => ({
      id: major.id,
      title: major.title,
      icon: major.icon,
      num: major.chapterNum,
      chapters: chapters.map((ch) => ({
        id: ch.id,
        title: ch.title,
        icon: ch.icon,
        count: ch.questions.length,
        questions: ch.questions.map(convertStaticQuestion),
      })),
    }))
    .filter((g) => g.chapters.length > 0);

  const laChapters: ChapterNode[] = linearAlgebraExerciseChapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    icon: ch.icon,
    count: ch.questions.length,
    questions: ch.questions.map(convertStaticQuestion),
  }));

  return [
    {
      id: 'highschool-math',
      name: '高中数学',
      icon: <Ruler className="w-6 h-6" />,
      gradient: 'from-blue-500 to-blue-700',
      bgLight: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      chapters: hsChapters,
    },
    {
      id: 'advanced-math',
      name: '高等数学',
      icon: <Sigma className="w-6 h-6" />,
      gradient: 'from-indigo-500 to-indigo-700',
      bgLight: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      chapters: amChapters,
      groups: amGroups,
    },
    {
      id: 'linear-algebra',
      name: '线性代数',
      icon: <Grid3X3 className="w-6 h-6" />,
      gradient: 'from-violet-500 to-violet-700',
      bgLight: 'bg-violet-50',
      text: 'text-violet-700',
      border: 'border-violet-200',
      chapters: laChapters,
    },
  ];
}

// ── 每日一题动效横条入口 ──
function DailyBanner() {
  const today = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  return (
    <Link
      href="/daily/"
      className="group relative block w-full overflow-hidden rounded-2xl text-left shadow-[0_10px_30px_-12px_rgba(0,82,255,0.45)] transition-transform duration-300 hover:-translate-y-0.5 motion-safe:active:scale-[0.99] motion-safe:active:translate-y-0 motion-safe:active:duration-75"
    >
      <style>{`
        @keyframes qbn-sheen {
          0% { transform: translateX(-100%) skewX(-18deg); }
          55%, 100% { transform: translateX(260%) skewX(-18deg); }
        }
        @keyframes qbn-sparkle {
          0%, 100% { opacity: 0.25; transform: translateY(0) scale(1); }
          50% { opacity: 0.9; transform: translateY(-4px) scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          .qbn-anim { animation: none !important; }
        }
      `}</style>
      {/* 渐变底 + 流光扫过 */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0052FF] via-[#3b82f6] to-[#60a5fa]" />
      <div
        className="qbn-anim absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        style={{ animation: 'qbn-sheen 3.8s ease-in-out infinite' }}
      />
      {/* 漂浮符号点缀 */}
      <span className="qbn-anim absolute right-24 top-2 text-white/40 text-lg select-none" style={{ animation: 'qbn-sparkle 3s ease-in-out infinite', fontFamily: 'Georgia, serif' }}>π</span>
      <span className="qbn-anim absolute right-40 bottom-1.5 text-white/30 text-sm select-none" style={{ animation: 'qbn-sparkle 3.6s ease-in-out 0.8s infinite', fontFamily: 'Georgia, serif' }}>∫</span>
      <span className="qbn-anim absolute right-12 bottom-2 text-white/35 text-base select-none" style={{ animation: 'qbn-sparkle 4.2s ease-in-out 1.5s infinite', fontFamily: 'Georgia, serif' }}>Σ</span>

      <div className="relative flex items-center gap-3.5 px-5 py-6 md:px-6 md:py-7">
        <span className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 backdrop-blur flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-white" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="flex items-center gap-2">
            <span className="text-white font-bold text-sm md:text-base">每日一题</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          </span>
          <span className="block text-white/75 text-xs mt-1 truncate">{today} · 每天 5:00 更新</span>
        </span>
        <span className="flex items-center gap-1 text-white text-xs font-medium bg-white/15 border border-white/25 rounded-full px-3 py-1.5 shrink-0 group-hover:bg-white/25 transition-colors">
          去挑战
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

// ── 科目选择列表（与章节列表同款 UI） ──
function SubjectList({
  subjects,
  progress,
  activeId,
  onSelect,
}: {
  subjects: SubjectNode[];
  progress: QbProgress;
  activeId: string;
  onSelect: (subjectId: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      {subjects.map((s) => {
        const totalQ = s.chapters.reduce((sum, c) => sum + c.count, 0);
        const doneQ = s.chapters.reduce((sum, c) => sum + chapterProgress(c, progress).done, 0);
        const pct = totalQ > 0 ? Math.round((doneQ / totalQ) * 100) : 0;
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`w-full text-left p-3 rounded-xl border ${PRESS} ${
              active
                ? `${s.bgLight} ${s.border} shadow-sm`
                : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  active ? `bg-gradient-to-br ${s.gradient} text-white` : 'bg-slate-100 text-slate-400'
                }`}
              >
                {s.icon}
              </span>
              <span className="flex-1 min-w-0">
                <span className={`block text-sm truncate ${active ? `font-bold ${s.text}` : 'font-medium text-slate-700'}`}>
                  {s.name}
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  {s.chapters.length} 章 · {totalQ} 题
                </span>
              </span>
              <span className={`text-xs tabular-nums shrink-0 ${active ? `font-semibold ${s.text}` : 'text-slate-400'}`}>
                {pct}%
              </span>
            </div>
            <div className="mt-2.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${s.gradient} transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── 章节行：折叠态即显示进度，点击直接开始练习 ──
function ChapterRow({
  ch,
  subject,
  progress,
  label,
  onClick,
}: {
  ch: ChapterNode;
  subject: SubjectNode;
  progress: QbProgress;
  label?: string;
  onClick: () => void;
}) {
  const { done, pct } = chapterProgress(ch, progress);
  return (
    <button
      onClick={onClick}
      className="group w-full text-left px-3 py-3 rounded-xl transition-all duration-200 hover:bg-slate-50 motion-safe:active:scale-[0.99] motion-safe:active:duration-75"
    >
      <div className="flex items-center gap-3">
        <span className="flex-1 min-w-0 text-sm font-medium text-slate-800 truncate">
          {label && <span className={`mr-1.5 font-mono text-xs ${subject.text}`}>{label}</span>}
          {ch.title}
        </span>
        <span className="text-xs text-slate-400 tabular-nums shrink-0">
          {done > 0 ? `${done}/` : ''}{ch.count} 题
        </span>
        <span className={`text-xs tabular-nums shrink-0 w-9 text-right ${pct > 0 ? `font-semibold ${subject.text}` : 'text-slate-400'}`}>
          {pct}%
        </span>
        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 transition-all group-hover:text-blue-500 group-hover:translate-x-0.5" />
      </div>
      <div className="mt-2 mr-14 h-1 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${subject.gradient} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </button>
  );
}

// ── 题库主页（左：科目选择；右：每日横条 + 章节列表） ──
function BankHome({
  subjects,
  progress,
  mode,
  favCount,
  isAuthenticated,
  onModeChange,
  onStartChapter,
}: {
  subjects: SubjectNode[];
  progress: QbProgress;
  mode: PracticeMode;
  favCount: number;
  isAuthenticated: boolean;
  onModeChange: (mode: PracticeMode) => void;
  onStartChapter: (subjectId: string, chapterId: string) => void;
}) {
  const [subjectId, setSubjectId] = useState(subjects[0].id);
  const subject = subjects.find((s) => s.id === subjectId) || subjects[0];
  const subjectEmpty = subject.chapters.length === 0;

  return (
    <section className="container mx-auto px-4 py-6 md:py-8 flex-1">
      <div className="max-w-6xl mx-auto grid gap-5 lg:grid-cols-[280px_1fr] items-start">
        {/* 左栏：科目选择 + 模式切换 */}
        <div className="lg:sticky lg:top-6 lg:self-stretch lg:flex lg:flex-col">
          <Card className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm lg:flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-3 px-1">选择科目</p>
            <SubjectList
              subjects={subjects}
              progress={progress}
              activeId={subjectId}
              onSelect={(v) => {
                setSubjectId(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <ModeToggle mode={mode} favCount={favCount} onChange={onModeChange} />
          </Card>
        </div>

        {/* 右栏：每日横条 + 章节列表 */}
        <div className="space-y-4 min-w-0">
          <DailyBanner />

          {mode === 'favorites' && subjectEmpty ? (
            <FavoritesEmptyState isAuthenticated={isAuthenticated} />
          ) : (
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm px-3 md:px-4 py-2">
            {subject.groups && subject.groups.length > 0 ? (
              /* 有大章节：手风琴分组，展开为小章节（点击即练） */
              <Accordion type="single" collapsible className="w-full">
                {subject.groups.map((g) => {
                  const gq = g.chapters.reduce((s, c) => s + c.count, 0);
                  const gdone = g.chapters.reduce((s, c) => s + chapterProgress(c, progress).done, 0);
                  const gpct = gq > 0 ? Math.round((gdone / gq) * 100) : 0;
                  return (
                    <AccordionItem key={g.id} value={g.id} className="border-slate-100 last:border-b-0">
                      <AccordionTrigger className="rounded-xl transition-all duration-200 hover:no-underline hover:opacity-60 motion-safe:active:scale-[0.99] motion-safe:active:duration-75 py-4 px-1">
                        <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                              gpct > 0 ? `bg-gradient-to-br ${subject.gradient} text-white` : 'bg-slate-100 text-slate-500'
                            }`}
                            style={{ fontFamily: 'Georgia, serif' }}
                          >
                            {g.icon}
                          </span>
                          <span className="font-semibold text-sm md:text-[15px] text-slate-800 truncate">
                            {g.title}
                          </span>
                          <span className="ml-auto shrink-0 text-xs text-slate-400 tabular-nums">
                            {g.chapters.length} 节 · {gq} 题 ·{' '}
                            <span className={gpct > 0 ? `font-semibold ${subject.text}` : ''}>{gpct}%</span>
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-3">
                        <div className="space-y-0.5">
                          {g.chapters.map((ch, i) => (
                            <ChapterRow
                              key={ch.id}
                              ch={ch}
                              subject={subject}
                              progress={progress}
                              label={`${g.num}.${i + 1}`}
                              onClick={() => onStartChapter(subject.id, ch.id)}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              /* 无大章节：扁平章节列表（点击即练） */
              <div className="divide-y divide-slate-50">
                {subject.chapters.map((ch) => (
                  <ChapterRow
                    key={ch.id}
                    ch={ch}
                    subject={subject}
                    progress={progress}
                    onClick={() => onStartChapter(subject.id, ch.id)}
                  />
                ))}
              </div>
            )}
          </Card>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Single Question Item ──
function QuestionItem({
  question,
  index,
  onAnswered,
}: {
  question: QuizQuestion;
  index: number;
  onAnswered?: (questionId: string) => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { user, isAuthenticated, isFavoriteQuestion, addFavoriteQuestion, removeFavoriteQuestion } = useAuth();
  const router = useRouter();
  const isFav = isFavoriteQuestion(question.id);
  const handleToggleFavorite = () => {
    if (!isAuthenticated || !user) {
      router.push('/login/');
      return;
    }
    if (isFav) {
      void removeFavoriteQuestion(question.id);
    } else {
      void addFavoriteQuestion(question.id);
    }
  };

  const toggleOption = (idx: number) => {
    if (submitted) return;
    if (question.choiceType === 'single') {
      setSelected([idx]);
      setSubmitted(true);
      onAnswered?.(question.id);
    } else {
      setSelected((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    }
  };

  const handleMultiSubmit = () => {
    if (selected.length === 0) return;
    setSubmitted(true);
    onAnswered?.(question.id);
  };

  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <Card className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="secondary" className="text-xs font-mono">
          {index + 1}
        </Badge>
        <StarFavoriteButton active={isFav} onToggle={handleToggleFavorite} iconOnly />
      </div>
      <div className="mb-4 text-slate-800 leading-relaxed text-base md:text-lg">
        <MathRenderer>{question.content}</MathRenderer>
      </div>
      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => {
          const isSelected = selected.includes(i);
          const correctArr = Array.isArray(question.correctOption)
            ? question.correctOption
            : [question.correctOption];
          const isCorrectOpt = correctArr.includes(i);

          let btnClass =
            'w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-3 motion-safe:active:scale-[0.98] motion-safe:active:duration-75 ';
          if (submitted) {
            if (isCorrectOpt) {
              btnClass += 'bg-emerald-50 border-emerald-300 text-emerald-800';
            } else if (isSelected) {
              btnClass += 'bg-rose-50 border-rose-300 text-rose-800';
            } else {
              btnClass += 'bg-slate-50 border-slate-100 text-slate-400';
            }
          } else {
            btnClass += isSelected
              ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50';
          }

          return (
            <button key={i} className={btnClass} onClick={() => toggleOption(i)} disabled={submitted}>
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  submitted
                    ? isCorrectOpt
                      ? 'bg-emerald-500 text-white'
                      : isSelected
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                    : isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {optionLabels[i]}
              </span>
              <span className="text-sm md:text-base">
                <MathRenderer>{opt}</MathRenderer>
              </span>
            </button>
          );
        })}
      </div>
      {question.choiceType === 'multiple' && !submitted && (
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 mb-3"
          onClick={handleMultiSubmit}
          disabled={selected.length === 0}
        >
          提交答案
        </Button>
      )}
            <div className="mb-3 flex items-center gap-2">
        {question.hint.trim() && (
          <button
            onClick={() => setShowHint((v) => !v)}
            aria-label={showHint ? '收起提示' : '查看提示'}
            title={showHint ? '收起提示' : '查看提示'}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-90"
          >
            {showHint ? <EyeOff className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
          </button>
        )}
        <button
          onClick={() => setShowExp((v) => !v)}
          aria-label={showExp ? '收起解析' : '查看解析'}
          title={showExp ? '收起解析' : '查看解析'}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-90"
        >
          {showExp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {showHint && (
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 text-sm md:text-base text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 mb-2 text-emerald-700 font-medium">
            <Lightbulb className="w-4 h-4" />
            提示
          </div>
          <MathRenderer>{question.hint}</MathRenderer>
        </div>
      )}
      {showExp && (
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-sm md:text-base text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2 mb-2 text-blue-700 font-medium">
            <Lightbulb className="w-4 h-4" />
            解析
          </div>
          <MathRenderer>{question.explanation || '暂无解析'}</MathRenderer>
        </div>
      )}
    </Card>
  );
}

// ── 返回按钮：圆角方块 + 左箭头，悬停向左提示方向，按下即时缩放 ──
function BackButton({ onClick, label = '返回' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow hover:-translate-x-0.5 motion-safe:transition-all motion-safe:duration-200 motion-safe:active:duration-75 motion-safe:active:scale-90 shrink-0"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}

// ── Pagination ──
function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  if (total <= 1) return null;
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, '...', total);
    } else if (current >= total - 2) {
      pages.push(1, '...', total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }
  }
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 rounded-lg"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="text-slate-400 text-sm px-1">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              current === p
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {p}
          </button>
        )
      )}
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 rounded-lg"
        onClick={() => onChange(current + 1)}
        disabled={current === total}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

// ── 练习视图（左：科目 + 章节列表；右：题目） ──
function QuizView({
  subjects,
  initialSubject,
  initialChapter,
  progress,
  mode,
  favCount,
  isAuthenticated,
  onModeChange,
  onAnswered,
  onBack,
}: {
  subjects: SubjectNode[];
  initialSubject: string;
  initialChapter: string | null;
  progress: QbProgress;
  mode: PracticeMode;
  favCount: number;
  isAuthenticated: boolean;
  onModeChange: (mode: PracticeMode) => void;
  onAnswered: (questionId: string) => void;
  onBack: () => void;
}) {
  const [activeSubject, setActiveSubject] = useState(initialSubject || subjects[0].id);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(initialChapter);
  const [page, setPage] = useState(1);
  const [navOpen, setNavOpen] = useState(false);

  // ESC 关闭抽屉
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  // 抽屉打开时锁定背景滚动
  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [navOpen]);

  const subject = subjects.find((s) => s.id === activeSubject) || subjects[0];

  const currentChapter = subject.chapters.find((c) => c.id === activeChapterId) || subject.chapters[0];

  const totalPages = useMemo(() => {
    if (!currentChapter) return 0;
    return Math.ceil(currentChapter.questions.length / QUESTIONS_PER_PAGE);
  }, [currentChapter]);

  const pageQuestions = useMemo(() => {
    if (!currentChapter) return [];
    const start = (page - 1) * QUESTIONS_PER_PAGE;
    return currentChapter.questions.slice(start, start + QUESTIONS_PER_PAGE);
  }, [currentChapter, page]);

  const handleSelectChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-4 py-6 md:py-8 flex-1">
      {/* 题目主体：宽布局自适应，占据页面大部分 */}
      <div className="max-w-6xl mx-auto">
        <main className="min-w-0">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <BackButton onClick={onBack} label="返回题库" />
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-800 font-medium">{subject.name}习题</span>
            {currentChapter && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-slate-500 truncate">{currentChapter.title}</span>
              </>
            )}
            {mode === 'favorites' && (
              <Badge className="bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-100 shrink-0">
                <Bookmark className="w-3 h-3 mr-1" />
                收藏模式
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">{currentChapter?.title || '收藏题目'}</h2>
              <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                共 {currentChapter?.count || 0} 道题{currentChapter ? ` · 第 ${page} / ${Math.max(totalPages, 1)} 页` : ''}
              </p>
            </div>
          </div>
          {pageQuestions.length > 0 ? (
            <div className="space-y-4">
              {pageQuestions.map((q, i) => (
                <QuestionItem
                  key={q.id}
                  question={q}
                  index={(page - 1) * QUESTIONS_PER_PAGE + i}
                  onAnswered={onAnswered}
                />
              ))}
            </div>
          ) : mode === 'favorites' ? (
            <FavoritesEmptyState isAuthenticated={isAuthenticated} />
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">该章节暂无题目，请选择其他章节</p>
            </div>
          )}
          <Pagination current={page} total={totalPages} onChange={setPage} />
        </main>
      </div>

      {/* 右下角圆形浮动按钮：打开章节导航 */}
      <button
        onClick={() => setNavOpen(true)}
        aria-label="打开章节导航"
        title="章节导航"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 motion-safe:transition-all motion-safe:duration-200 motion-safe:active:duration-75 motion-safe:active:scale-90"
      >
        <List className="w-5 h-5" />
      </button>

      {/* 章节导航抽屉：从右侧滑入，关闭时沿同路径滑出（空间一致性） */}
      <div className={`fixed inset-0 z-50 ${navOpen ? '' : 'pointer-events-none'}`} aria-hidden={!navOpen}>
        {/* 调光遮罩：聚焦当前任务 */}
        <div
          onClick={() => setNavOpen(false)}
          className={`absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] motion-safe:transition-opacity motion-safe:duration-300 ${
            navOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* 面板 */}
        <div
          role="dialog"
          aria-label="章节导航"
          className={`absolute right-0 top-0 h-full w-[360px] max-w-[88vw] bg-white shadow-2xl flex flex-col motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-opacity motion-reduce:duration-200 ${
            navOpen
              ? 'motion-safe:translate-x-0 motion-reduce:opacity-100'
              : 'motion-safe:translate-x-full motion-reduce:opacity-0'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
            <p className="text-sm font-bold text-slate-800">章节导航</p>
            <button
              onClick={() => setNavOpen(false)}
              aria-label="关闭章节导航"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-3 px-1">选择科目</p>
              <SubjectList
                subjects={subjects}
                progress={progress}
                activeId={activeSubject}
                onSelect={(v) => {
                  setActiveSubject(v);
                  setActiveChapterId(null);
                  setPage(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <ModeToggle mode={mode} favCount={favCount} onChange={onModeChange} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-3 px-1">章节</p>
              {(() => {
                const renderChapterBtn = (ch: ChapterNode, label?: string) => {
                  const { pct } = chapterProgress(ch, progress);
                  const active = ch.id === currentChapter?.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        handleSelectChapter(ch.id);
                        setNavOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${PRESS} ${
                        active
                          ? `${subject.bgLight} ${subject.text} font-medium`
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex-1 min-w-0 truncate text-xs">
                        {label && <span className={`mr-1.5 font-mono ${subject.text}`}>{label}</span>}
                        {ch.title}
                      </span>
                      <span className="text-[10px] text-slate-400 tabular-nums shrink-0">
                        {ch.count}题{pct > 0 ? ` · ${pct}%` : ''}
                      </span>
                    </button>
                  );
                };
                return subject.groups ? (
                  /* 大章节折叠分组（如高等数学） */
                  <Accordion type="single" collapsible className="w-full">
                    {subject.groups.map((g) => (
                      <AccordionItem key={g.id} value={g.id} className="border-slate-100 last:border-b-0">
                        <AccordionTrigger className="rounded-lg transition-all duration-200 hover:no-underline hover:opacity-60 motion-safe:active:scale-[0.99] motion-safe:active:duration-75 py-3 px-1">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0 text-left">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                g.chapters.some((c) => c.id === currentChapter?.id)
                                  ? `bg-gradient-to-br ${subject.gradient} text-white`
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                              style={{ fontFamily: 'Georgia, serif' }}
                            >
                              {g.icon}
                            </span>
                            <span className="font-semibold text-sm text-slate-800 truncate">{g.title}</span>
                            <span className="ml-auto shrink-0 text-[11px] text-slate-400 tabular-nums">
                              {g.chapters.length} 节
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                          <div className="space-y-1">
                            {g.chapters.map((ch, i) => renderChapterBtn(ch, `${g.num}.${i + 1}`))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  /* 扁平章节列表 */
                  <div className="space-y-1">{subject.chapters.map((ch) => renderChapterBtn(ch))}</div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ──
export default function QuestionBankPage() {
  const subjects = useMemo(() => buildSubjects(), []);
  const { user, isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<'bank' | 'quiz'>('bank');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('all');
  const [selected, setSelected] = useState<{ subject: string; chapter: string | null }>({
    subject: '',
    chapter: null,
  });
  // SSR/水合时用空快照，水合后自动重读 localStorage，避免挂载 effect
  const storedProgress = useSyncExternalStore(subscribeNoop, readProgress, getServerProgress);
  const [answered, setAnswered] = useState<QbProgress>(EMPTY_PROGRESS);
  const progress = useMemo(() => ({ ...storedProgress, ...answered }), [storedProgress, answered]);

  // 收藏的题目 ID 集合；收藏模式下科目/章节/题目全部按此过滤
  const favoriteIds = useMemo(
    () => new Set(user?.favoriteQuestions || []),
    [user?.favoriteQuestions]
  );
  const displaySubjects = useMemo(
    () => (practiceMode === 'favorites' ? filterSubjectsByFavorites(subjects, favoriteIds) : subjects),
    [subjects, practiceMode, favoriteIds]
  );

  const markAnswered = (questionId: string) => {
    if (progress[questionId]) return;
    const next = { ...progress, [questionId]: true as const };
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch {
      // 存储失败不影响答题
    }
    setAnswered((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleStartChapter = (subjectId: string, chapterId: string) => {
    setSelected({ subject: subjectId, chapter: chapterId });
    setViewMode('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModeChange = (mode: PracticeMode) => {
    setPracticeMode(mode);
    // 切换模式后回到题库主页，避免当前章节在新模式下被过滤掉导致空白
    setViewMode('bank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] relative overflow-hidden">
      {/* 淡蓝粉光晕背景 */}
      <div aria-hidden className="pointer-events-none fixed -bottom-28 -left-24 w-[26rem] h-[26rem] rounded-full bg-sky-300/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none fixed -bottom-24 -right-24 w-[30rem] h-[30rem] rounded-full bg-pink-300/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 w-[24rem] h-[24rem] rounded-full bg-indigo-200/25 blur-3xl" />
      <div className="relative z-10 flex flex-col flex-1">
        <Header />

      {viewMode === 'bank' ? (
        <BankHome
          subjects={displaySubjects}
          progress={progress}
          mode={practiceMode}
          favCount={favoriteIds.size}
          isAuthenticated={isAuthenticated}
          onModeChange={handleModeChange}
          onStartChapter={handleStartChapter}
        />
      ) : (
        <QuizView
          subjects={displaySubjects}
          initialSubject={selected.subject}
          initialChapter={selected.chapter}
          progress={progress}
          mode={practiceMode}
          favCount={favoriteIds.size}
          isAuthenticated={isAuthenticated}
          onModeChange={handleModeChange}
          onAnswered={markAnswered}
          onBack={() => setViewMode('bank')}
        />
      )}
      </div>
    </div>
  );
}
