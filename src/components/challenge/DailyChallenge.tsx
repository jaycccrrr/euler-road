'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useReducedMotion } from 'framer-motion';
import {
  Bookmark,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileSignature,
  MessageCircle,
  Send,
  Share2,
  Star,
  ThumbsUp,
  Trash2,
  Upload,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MathRenderer } from '@/components/math/MathRenderer';
import { GradingLoader } from '@/components/question/GradingLoader';
import { MyAnswerRecords } from '@/components/question/MyAnswerRecords';
import { DiscussionComposer } from '@/components/challenge/DiscussionComposer';
import { ShareCardDialog } from '@/components/share/ShareCardDialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { PiPowerAnimation } from '@/components/pipower/PiPowerAnimation';
import { StarFavoriteButton } from '@/components/ui/star-favorite-button';
import { PiPowerCalendarDialog } from '@/components/pipower/PiPowerOrb';
import { useAuth } from '@/hooks/useAuth';
import { useDailyQuestion } from '@/hooks/useDailyQuestion';
import { getDailyQuestionsByDate } from '@/lib/daily-question-bank';
import { getQuestionDateString } from '@/lib/ai-question-generator';
import { getModuleById } from '@/data/modules';
import { getUserById } from '@/lib/db';
import { compressImage } from '@/lib/utils';
import { pickQuote } from '@/lib/quotes';
import type { AnswerRecord, DailyQuestion, DiscussionMessage } from '@/types';

// 题库上线日：最早的可用日期
const LAUNCH_DATE = '2026-03-14';

interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
}

function shiftDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isValidDateStr(s: string | undefined, today: string): s is string {
  return !!s && /^\d{4}-\d{2}-\d{2}$/.test(s) && s >= LAUNCH_DATE && s <= today;
}

function parseHash(): { date?: string; module?: string } {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return { date: p.get('date') ?? undefined, module: p.get('module') ?? undefined };
}

function writeHash(date: string, moduleId?: string) {
  const p = new URLSearchParams();
  p.set('date', date);
  if (moduleId) p.set('module', moduleId);
  window.location.hash = p.toString();
}

/** 讨论消息时间：M月D日 HH:mm */
function formatMessageTime(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < difficulty ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
        />
      ))}
    </>
  );
}

/** 逐字渐显文字 */
function TypewriterText({ text, step = 36, startDelay = 0, disabled }: { text: string; step?: number; startDelay?: number; disabled?: boolean }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block"
          style={disabled ? undefined : { animation: `fadeIn 0.45s ease both`, animationDelay: `${startDelay + i * step}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  );
}

/** 评论区头像：支持图片头像（data:/http）与表情/首字符兜底 */
function FeedAvatar({ avatar, nickname, className }: { avatar?: string; nickname?: string; className?: string }) {
  const isImage = avatar?.startsWith('data:') || avatar?.startsWith('http');
  return (
    <Avatar className={className}>
      {isImage ? <AvatarImage src={avatar} /> : null}
      <AvatarFallback className="text-[10px] bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        {avatar && !isImage ? avatar : nickname?.[0] || '?'}
      </AvatarFallback>
    </Avatar>
  );
}

/**
 * 每日挑战大页面主体：日期栏（左右切换 + 日历）+ 三栏挑战内容。
 * 日期经 location.hash（#date=YYYY-MM-DD&module=xxx）同步，切换时 GSAP 3D 翻转过渡。
 */
export function DailyChallenge() {
  const { isAuthenticated, user: currentUser, addPiPower, addFavoriteQuestion, removeFavoriteQuestion, isFavoriteQuestion } = useAuth();
  const {
    todayQuestions,
    questionAnswers,
    discussionMessages,
    discussionQuestionId,
    userAnswerHistory,
    loadTodayQuestions,
    loadQuestionById,
    loadQuestionAnswers,
    loadDiscussionMessages,
    loadUserAnswerHistory,
    submitAnswer,
    submitHistoryAnswer,
    likeAnswer,
    unlikeAnswer,
    addComment,
    removeDiscussionMessage,
    toggleDiscussionMessageLike,
    replyDiscussionMessage,
    toggleDiscussionReplyLike,
    clearUserSession,
  } = useDailyQuestion();

  const reduceMotion = useReducedMotion() ?? false;
  const todayStr = getQuestionDateString();

  // ── 日期与模块选择（hash 为单一事实来源） ──
  const [dateStr, setDateStr] = useState(todayStr);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // 作答区状态
  const [answer, setAnswer] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    record?: AnswerRecord;
    feedback?: string;
  } | null>(null);
  const [userInfos, setUserInfos] = useState<Record<string, UserInfo>>({});
  const [commentText, setCommentText] = useState('');
  const [commentingAnswerId, setCommentingAnswerId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyingMessageId, setReplyingMessageId] = useState<string | null>(null);
  const [replyingToNickname, setReplyingToNickname] = useState<string | null>(null); // 回复某条回复时 @ 对方
  const [collapsedMessageIds, setCollapsedMessageIds] = useState<Set<string>>(new Set()); // 收起回复的消息
  const [deleteMessageTarget, setDeleteMessageTarget] = useState<DiscussionMessage | null>(null);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [showPiAnimation, setShowPiAnimation] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [piAnimationData, setPiAnimationData] = useState<{
    piGained: number;
    previousTotal: number;
    isCorrect: boolean;
  } | null>(null);

  // 当日三道题（同步生成，任意日期可用）
  const questions = useMemo<DailyQuestion[]>(
    () =>
      getDailyQuestionsByDate(dateStr).map((q) => ({
        id: `daily-${dateStr}-${q.moduleId}`,
        moduleId: q.moduleId,
        date: dateStr,
        title: q.title,
        content: q.content,
        images: [],
        answer: q.answer,
        answerImages: [],
        difficulty: q.difficulty,
        isAutoGenerated: true,
        createdAt: new Date(dateStr + 'T05:00:00').toISOString(),
      })),
    [dateStr]
  );

  const selectedQuestion =
    questions.find((q) => q.moduleId === selectedModuleId) ?? questions[0] ?? null;

  const isTodayView = dateStr === todayStr;
  const isQuestionAnswered = (questionId: string) =>
    userAnswerHistory.some((a) => a.questionId === questionId);
  const answeredCount = questions.filter((q) => isQuestionAnswered(q.id)).length;
  const quote = pickQuote(dateStr);

  // 分享所需的最近一条提交记录
  const shareRecord = selectedQuestion
    ? result?.record ?? userAnswerHistory.find((a) => a.questionId === selectedQuestion.id)
    : undefined;

  // 当前题目的讨论消息（防止渲染到其他题目的旧数据）
  const visibleMessages = useMemo(
    () => (selectedQuestion && discussionQuestionId === selectedQuestion.id ? discussionMessages : []),
    [discussionMessages, discussionQuestionId, selectedQuestion]
  );

  // 讨论区合并流：公开答案 + 讨论消息。
  // 排序：一天内的新评论优先（按时间倒序），更早的按点赞数降序（同赞按时间倒序）
  const discussionFeed = useMemo(() => {
    const DAY_MS = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const all = [
      ...questionAnswers.map((a) => ({
        kind: 'answer' as const,
        time: a.submittedAt,
        likes: a.likes ?? 0,
        answer: a,
      })),
      ...visibleMessages.map((m) => ({
        kind: 'message' as const,
        time: m.createdAt,
        likes: m.likes ?? 0,
        message: m,
      })),
    ];
    const isFresh = (t: string) => now - new Date(t).getTime() <= DAY_MS;
    const fresh = all.filter((i) => isFresh(i.time)).sort((x, y) => y.time.localeCompare(x.time));
    const older = all
      .filter((i) => !isFresh(i.time))
      .sort((x, y) => y.likes - x.likes || y.time.localeCompare(x.time));
    return [...fresh, ...older];
  }, [questionAnswers, visibleMessages]);

  // ── hash 同步：挂载时读取 + 监听 hashchange（日历跳转 / 前进后退） ──
  useEffect(() => {
    const applyHash = () => {
      const { date, module } = parseHash();
      if (isValidDateStr(date, todayStr)) setDateStr(date);
      if (module) setSelectedModuleId(module);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 首次进入无 hash 时写入当前日期，保证可分享/刷新一致
  useEffect(() => {
    if (!parseHash().date) writeHash(dateStr, selectedModuleId ?? undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 日期切换（写 hash → hashchange 驱动 state） ──
  const goToDate = (next: string) => {
    if (next < LAUNCH_DATE || next > todayStr) return;
    writeHash(next, selectedModuleId ?? undefined);
  };

  // ── 横移切换动画：renderedDate 滞后于 dateStr，退出动画完成后才替换内容 ──
  const contentRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [renderedDate, setRenderedDate] = useState(dateStr);
  const enterDirRef = useRef<1 | -1>(1);
  const switchTlRef = useRef<gsap.core.Timeline | null>(null);

  // 日期变化 → 退出动画（可被再次点击打断：kill 后直接替换）
  useEffect(() => {
    if (dateStr === renderedDate) return;
    const el = contentRef.current;
    switchTlRef.current?.kill();
    enterDirRef.current = dateStr > renderedDate ? 1 : -1;
    // 切换日期时清空作答区瞬时状态
    setResult(null);
    setAnswer('');
    setImages([]);
    setShowDiscussion(false);
    if (!el || reduceMotion) {
      setRenderedDate(dateStr);
      return;
    }
    const dir = enterDirRef.current;
    switchTlRef.current = gsap.timeline().to(el, {
      x: -110 * dir,
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => setRenderedDate(dateStr),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStr, reduceMotion]);

  // renderedDate 实际替换（DOM 更新）后 → 进入动画
  const skipEnterRef = useRef(true);
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (skipEnterRef.current) {
      skipEnterRef.current = false;
      return;
    }
    if (reduceMotion) {
      gsap.set(el, { clearProps: 'all' });
      return;
    }
    const dir = enterDirRef.current;
    const tween = gsap.fromTo(
      el,
      { x: 110 * dir, autoAlpha: 0, scale: 0.985 },
      {
        x: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
      }
    );
    return () => {
      tween.kill();
    };
  }, [renderedDate, reduceMotion]);

  // 悬浮窗入场
  useEffect(() => {
    if (!windowRef.current || reduceMotion) return;
    const tween = gsap.from(windowRef.current, {
      y: 28,
      autoAlpha: 0,
      duration: 0.65,
      ease: 'power3.out',
      clearProps: 'transform,opacity,visibility',
    });
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 数据加载 ──
  useEffect(() => {
    loadTodayQuestions();
  }, [loadTodayQuestions]);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserAnswerHistory();
    } else {
      clearUserSession();
    }
  }, [isAuthenticated, loadUserAnswerHistory, clearUserSession]);

  // 选中的题目变化 → 加载讨论区（公开答案 + 讨论消息） + 清空作答
  useEffect(() => {
    if (selectedQuestion?.id) {
      loadQuestionAnswers(selectedQuestion.id);
      loadDiscussionMessages(selectedQuestion.id);
      setResult(null);
      setAnswer('');
      setImages([]);
    }
  }, [selectedQuestion?.id, loadQuestionAnswers, loadDiscussionMessages]);

  // 讨论区用户信息（公开答案作者 + 消息作者）
  useEffect(() => {
    const loadUserInfos = async () => {
      const infos: Record<string, UserInfo> = {};
      const authorIds = [
        ...questionAnswers.map((a) => a.userId),
        ...visibleMessages.map((m) => m.userId),
      ];
      for (const uid of authorIds) {
        if (!userInfos[uid]) {
          const user = await getUserById(uid);
          if (user) {
            infos[uid] = { id: user.id, nickname: user.nickname, avatar: user.avatar };
          }
        }
      }
      if (Object.keys(infos).length > 0) {
        setUserInfos((prev) => ({ ...prev, ...infos }));
      }
    };
    if (questionAnswers.length > 0 || visibleMessages.length > 0) loadUserInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionAnswers, visibleMessages]);

  // ── 作答 ──
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: string[] = [];
    let failedCount = 0;
    for (const file of Array.from(files).slice(0, 3)) {
      try {
        newImages.push(await compressImage(file));
      } catch (err) {
        console.error('Image upload failed:', err);
        failedCount++;
      }
    }
    if (failedCount > 0) {
      setUploadError(`${failedCount} 张图片处理失败，请换用 JPG/PNG 图片重试`);
    } else {
      setUploadError('');
    }
    setImages((prev) => [...prev, ...newImages].slice(0, 3));
  };

  const handleSubmit = async () => {
    if (!selectedQuestion || (!answer.trim() && images.length === 0)) return;
    setSubmitting(true);

    let res;
    if (isTodayView && todayQuestions.some((q) => q.id === selectedQuestion.id)) {
      // 今日题：给经验值（默认私密，不自动发到讨论区）
      res = await submitAnswer(selectedQuestion.id, answer, images, false);
    } else {
      // 历史题：无经验值；需先确保 store 的 currentQuestion 为该题
      await loadQuestionById(selectedQuestion.id);
      res = await submitHistoryAnswer(selectedQuestion.id, answer, images, false);
      await loadUserAnswerHistory();
    }

    // π力：今日题 有效+1π/答对+2π；历史题 仅答对+1π；按题去重补差
    if (res.record && currentUser) {
      const isValid = res.record.aiScore > 0 || images.length > 0;
      const { piGained, newTotal } = await addPiPower(
        selectedQuestion.id,
        res.record.isCorrect,
        isValid,
        todayStr,
        { historical: !isTodayView }
      );
      if (piGained > 0) {
        setPiAnimationData({ piGained, previousTotal: newTotal - piGained, isCorrect: res.record.isCorrect });
        setShowPiAnimation(true);
      }
    }

    setResult(res);
    setSubmitting(false);
  };

  const handleLike = async (answerId: string) => {
    const ans = questionAnswers.find((a) => a.id === answerId);
    if (!ans || !currentUser) return;
    if ((ans.likedBy || []).includes(currentUser.id)) {
      await unlikeAnswer(answerId);
    } else {
      await likeAnswer(answerId);
    }
  };

  const handleAddComment = async (answerId: string) => {
    if (!commentText.trim()) return;
    const success = await addComment(answerId, commentText);
    if (success) {
      setCommentText('');
      setCommentingAnswerId(null);
    }
  };

  const handleReplyMessage = async (messageId: string) => {
    if (!replyText.trim()) return;
    const success = await replyDiscussionMessage(messageId, replyText, replyingToNickname ?? undefined);
    if (success) {
      setReplyText('');
      setReplyingMessageId(null);
      setReplyingToNickname(null);
    }
  };

  // 打开回复输入框；toNickname 非空表示回复某条回复（@ 对方）
  const openReplyInput = (messageId: string, toNickname?: string) => {
    if (replyingMessageId === messageId && !toNickname && !replyingToNickname) {
      setReplyingMessageId(null);
      return;
    }
    setReplyingMessageId(messageId);
    setReplyingToNickname(toNickname ?? null);
  };

  const toggleRepliesCollapsed = (messageId: string) => {
    setCollapsedMessageIds((prev) => {
      const next = new Set(prev);
      if (next.has(messageId)) next.delete(messageId);
      else next.add(messageId);
      return next;
    });
  };

  const dateLabel = new Date(renderedDate + 'T12:00:00').toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <section className="relative z-10 flex-1 flex flex-col">
      {showPiAnimation && piAnimationData && (
        <PiPowerAnimation
          piGained={piAnimationData.piGained}
          previousTotal={piAnimationData.previousTotal}
          isCorrect={piAnimationData.isCorrect}
          onComplete={() => setShowPiAnimation(false)}
          onShare={
            shareRecord
              ? () => {
                  setShowPiAnimation(false);
                  setShowShareDialog(true);
                }
              : undefined
          }
        />
      )}

      {currentUser && selectedQuestion && shareRecord && (
        <ShareCardDialog
          open={showShareDialog}
          onOpenChange={setShowShareDialog}
          recordId={shareRecord.id}
          data={{
            questionId: selectedQuestion.id,
            questionTitle: selectedQuestion.title,
            questionContent: selectedQuestion.content,
            moduleId: selectedQuestion.moduleId,
            date: selectedQuestion.date,
            difficulty: selectedQuestion.difficulty,
            isCorrect: shareRecord.isCorrect,
            score: shareRecord.aiScore,
            nickname: currentUser.nickname,
            avatar: currentUser.avatar,
            streak: currentUser.piPower?.currentStreak ?? 0,
            answerContent: shareRecord.content,
            answerImages: shareRecord.images,
          }}
        />
      )}

      <PiPowerCalendarDialog open={calendarOpen} onClose={() => setCalendarOpen(false)} />

      <ConfirmDialog
        open={deleteMessageTarget !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteMessageTarget(null);
        }}
        title="删除讨论消息"
        description="删除后不可恢复，该消息将从讨论区移除。"
        confirmText="删除"
        onConfirm={() => {
          if (deleteMessageTarget) void removeDiscussionMessage(deleteMessageTarget.id);
        }}
      />

      <div className="container mx-auto px-4 pt-8 pb-10 w-full">
        {/* 大标题 */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            每日挑战
          </h1>
          <p
            key={dateStr}
            className="text-sm md:text-lg text-slate-500 mt-2.5 italic"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            <TypewriterText text={`「${quote.text}」`} disabled={reduceMotion} />
            <span className="whitespace-nowrap">
              <TypewriterText
                text={` —— ${quote.author}`}
                startDelay={(quote.text.length + 2) * 36 + 150}
                disabled={reduceMotion}
              />
            </span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1.5">
            {isTodayView
              ? `今日进度 ${answeredCount}/${questions.length}`
              : '历史题目答对可获得 1π 力'}
          </p>
        </div>

        {/* 半透明悬浮窗 */}
        <div
          ref={windowRef}
          className="max-w-[1520px] mx-auto rounded-3xl border border-white/60 bg-white/85 backdrop-blur-sm shadow-2xl shadow-indigo-500/10 p-5 md:p-8"
        >
          {/* 日期栏 */}
          <div className="flex items-center justify-between gap-3 mb-7">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToDate(shiftDate(dateStr, -1))}
              disabled={dateStr <= LAUNCH_DATE}
              className="rounded-full h-10 px-4 bg-white/80"
              title="前一天"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">前一天</span>
            </Button>

            <div className="text-center min-w-0">
              <div className="flex items-center justify-center gap-2.5">
                <span className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">{dateLabel}</span>
                {isTodayView ? (
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs border-0 px-2.5 py-0.5">
                    今天
                  </Badge>
                ) : (
                  <button
                    type="button"
                    onClick={() => goToDate(todayStr)}
                    className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    回到今天
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isTodayView ? '今日题目' : '历史挑战'} · 已答 {answeredCount}/{questions.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCalendarOpen(true)}
                className="w-10 h-10 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-300 transition-colors"
                title="打开 π力日历选择日期"
              >
                <Calendar className="w-4.5 h-4.5" />
              </button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToDate(shiftDate(dateStr, 1))}
                disabled={dateStr >= todayStr}
                className="rounded-full h-10 px-4 bg-white/80"
                title="后一天"
              >
                <span className="hidden sm:inline text-sm">后一天</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 横移切换容器（裁剪滑出内容，形成轮播感） */}
          <div className="overflow-hidden">
            <div ref={contentRef} key={renderedDate}>
              {questions.length > 0 && selectedQuestion ? (
                <div className="grid gap-5 lg:grid-cols-[220px_1.3fr_1.3fr] items-stretch">
                  {/* 左栏：当日三道题 */}
                  <div className="space-y-2">
                    {questions.map((question) => {
                      const mod = getModuleById(question.moduleId);
                      const isAnswered = isQuestionAnswered(question.id);
                      const isSelected = selectedQuestion.id === question.id;
                      return (
                        <button
                          key={question.id}
                          onClick={() => {
                            setSelectedModuleId(question.moduleId);
                            setShowDiscussion(false);
                          }}
                          className={`w-full text-left p-3 rounded-xl border motion-safe:transition-all motion-safe:duration-200 motion-safe:active:duration-75 motion-safe:active:scale-[0.97] ${
                            isSelected
                              ? 'bg-white ring-2 ring-blue-400 border-blue-300 shadow-md'
                              : 'bg-white/80 border-slate-200 hover:bg-white hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mod?.color || 'from-slate-400 to-slate-600'} flex items-center justify-center text-white text-sm shrink-0`}
                            >
                              {mod?.icon || '📚'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-slate-800 text-xs truncate">
                                  {mod?.name}
                                </span>
                                {isAnswered && (
                                  <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-0.5">
                                <DifficultyStars difficulty={question.difficulty} />
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* 中栏：题目 */}
                  <Card className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[460px] flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      {isAuthenticated ? (
                        <StarFavoriteButton
                          active={!!selectedQuestion && isFavoriteQuestion(selectedQuestion.id)}
                          onToggle={() => {
                            if (!selectedQuestion) return;
                            if (isFavoriteQuestion(selectedQuestion.id)) {
                              void removeFavoriteQuestion(selectedQuestion.id);
                            } else {
                              void addFavoriteQuestion(selectedQuestion.id);
                            }
                          }}
                          className="text-xs rounded-lg px-2 py-1"
                        />
                      ) : (
                        <span />
                      )}
                      <div className="flex items-center gap-0.5">
                        <DifficultyStars difficulty={selectedQuestion.difficulty} />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-2">{selectedQuestion.title}</h3>
                    <div className="bg-slate-50 rounded-lg p-4 text-slate-700 border border-slate-100 text-sm md:text-[15px] leading-relaxed flex-1 min-h-0 overflow-y-auto max-h-[620px]">
                      <MathRenderer>{selectedQuestion.content}</MathRenderer>
                    </div>
                  </Card>

                  {/* 右栏：作答 */}
                  <div className="min-w-0">
                    {!isAuthenticated ? (
                      <Card className="p-5 rounded-2xl border border-slate-200 bg-white text-center min-h-[460px] h-full flex flex-col items-center justify-center">
                        <p className="text-slate-500 text-sm mb-2">登录后即可参与每日挑战</p>
                        <Link href="/login/">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg h-9 px-5 shadow-md shadow-blue-600/25"
                          >
                            立即登录
                          </Button>
                        </Link>
                      </Card>
                    ) : (
                      <Card className="relative p-5 md:p-6 rounded-2xl border border-slate-200 bg-white flex flex-col min-h-[460px] h-full">
                        <Textarea
                          placeholder="输入你的答案..."
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          disabled={submitting}
                          className="min-h-[180px] mb-3 rounded-xl border-slate-200 focus:border-blue-300 text-sm md:text-base resize-none shrink-0"
                        />
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <div className="flex flex-wrap gap-1.5">
                            {images.map((img, idx) => (
                              <div key={idx} className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={img}
                                  alt={`上传图片 ${idx + 1}`}
                                  className="w-12 h-12 object-cover rounded-lg border"
                                />
                                <button
                                  onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                            {images.length < 3 && (
                              <label className="w-12 h-12 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                                <Upload className="w-4 h-4 text-slate-400" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                  multiple
                                />
                              </label>
                            )}
                          </div>
                          {uploadError && (
                            <p className="w-full text-xs text-red-500">{uploadError}</p>
                          )}
                          <div className="flex-1" />
                          <Button
                            size="sm"
                            onClick={handleSubmit}
                            disabled={submitting || (!answer.trim() && images.length === 0)}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg h-9 px-5 shadow-md shadow-blue-600/25"
                          >
                            {submitting ? (
                              'AI 判题中...'
                            ) : (
                              <>
                                <Send className="w-3 h-3 mr-1" />提交
                              </>
                            )}
                          </Button>
                        </div>
                        {result && !result.success && (
                          <Alert className="mt-2 py-2 shrink-0" variant="destructive">
                            <AlertDescription className="text-xs">{result.feedback}</AlertDescription>
                          </Alert>
                        )}

                        {/* AI 判题等待动画：整卡覆盖 */}
                        {submitting && (
                          <div className="absolute inset-0 z-10 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center animate-fade-in-scale">
                            <GradingLoader />
                          </div>
                        )}

                        {/* 判题结果 */}
                        {result?.success && (
                          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 shrink-0 animate-fade-in-scale">
                            <div className="flex items-center gap-2">
                              {result.record?.isCorrect ? (
                                <>
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                  <span className="text-sm font-bold text-emerald-700">解答正确</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-5 h-5 text-orange-500" />
                                  <span className="text-sm font-bold text-orange-600">解答错误</span>
                                </>
                              )}
                              <span className="text-xs text-slate-400 ml-auto">
                                得分 {result.record?.aiScore ?? 0}
                                {isTodayView
                                  ? ` · +${result.record?.experienceGained} EXP`
                                  : result.record?.isCorrect
                                    ? ' · 历史题答对 +1π'
                                    : ' · 历史题无经验值'}
                              </span>
                            </div>

                            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '80ms' }}>
                              <h4 className="font-semibold text-slate-800 mb-1 text-xs">AI 评解：</h4>
                              <div className="bg-slate-50 rounded-lg p-3 text-left border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                                {result.record?.aiFeedback || result.feedback || '暂无评解'}
                              </div>
                            </div>

                            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '160ms' }}>
                              <h4 className="font-semibold text-slate-800 mb-1 text-xs">参考答案：</h4>
                              <div className="bg-slate-50 rounded-lg p-3 text-left border border-slate-100 text-sm leading-relaxed max-h-52 overflow-y-auto">
                                <MathRenderer>{selectedQuestion.answer}</MathRenderer>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 分享入口 + 我的提交记录 */}
                        <div className="shrink-0 flex items-start justify-between gap-2">
                          <MyAnswerRecords questionId={selectedQuestion.id} />
                          {shareRecord && currentUser && (
                            <button
                              type="button"
                              onClick={() => setShowShareDialog(true)}
                              className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors shrink-0"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              分享
                            </button>
                          )}
                        </div>
                      </Card>
                    )}
                  </div>

                  {/* 讨论区：跨中右两列，左对齐题目栏、右对齐作答栏 */}
                  {isAuthenticated && (
                    <Card className="rounded-2xl border border-slate-200 bg-white overflow-hidden lg:col-start-2 lg:col-span-2">
                        <button
                          onClick={() => setShowDiscussion((v) => !v)}
                          className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors motion-safe:active:bg-slate-100/70"
                        >
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                            <span className="font-bold text-slate-800 text-xs">讨论区</span>
                            <Badge variant="secondary" className="text-[10px]">
                              {discussionFeed.length}
                            </Badge>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${showDiscussion ? '' : '-rotate-90'}`}
                          />
                        </button>
                        {showDiscussion && (
                        <div
                          className="grid grid-rows-[1fr] motion-safe:animate-[fadeIn_0.2s_ease-out]"
                        >
                          <div className="overflow-hidden">
                            <div className="px-3 pb-3">
                              {/* 发言框：直接发消息，可引用题目 / 我的解答 */}
                              {currentUser && selectedQuestion && (
                                <div className="mb-3">
                                  <DiscussionComposer
                                    questionId={selectedQuestion.id}
                                    currentUser={currentUser}
                                  />
                                </div>
                              )}
                              {discussionFeed.length === 0 ? (
                                <div className="text-center py-4 text-slate-400 text-xs">
                                  <p>还没有讨论，来发第一条消息吧</p>
                                  <p className="mt-1 text-slate-300">也可以在「我的提交记录」中公开你的解答</p>
                                </div>
                              ) : (
                                <div className="max-h-[320px] overflow-y-auto pr-1 divide-y divide-slate-100">
                                  {/* 折叠时整条讨论区不挂载,避免每条答案都跑 KaTeX */}
                                  {discussionFeed.map((item) => {
                                    if (item.kind === 'message') {
                                      const msg = item.message;
                                      const msgUser = userInfos[msg.userId];
                                      const msgLiked = currentUser ? (msg.likedBy || []).includes(currentUser.id) : false;
                                      const msgReplies = msg.replies || [];
                                      const repliesCollapsed = collapsedMessageIds.has(msg.id);
                                      return (
                                        <div key={msg.id} className="flex gap-2.5 py-3">
                                          <FeedAvatar
                                            avatar={msgUser?.avatar}
                                            nickname={msgUser?.nickname}
                                            className="w-7 h-7 shrink-0 mt-0.5"
                                          />
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                              <p className="font-medium text-[11px] text-slate-700">
                                                {msgUser?.nickname || '未知用户'}
                                                {msg.userId === currentUser?.id && (
                                                  <span className="text-blue-600 ml-1">（我）</span>
                                                )}
                                              </p>
                                              {msg.userId === currentUser?.id && (
                                                <button
                                                  onClick={() => setDeleteMessageTarget(msg)}
                                                  className="ml-auto p-1 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                  title="删除这条消息"
                                                >
                                                  <Trash2 className="w-3 h-3" />
                                                </button>
                                              )}
                                            </div>
                                            <p className="text-[10px] text-slate-400">{formatMessageTime(msg.createdAt)}</p>
                                            <div className="mt-1 text-xs text-slate-700 whitespace-pre-wrap break-words">
                                              <MathRenderer>{msg.content}</MathRenderer>
                                            </div>
                                            {msg.refAnswerId && (
                                              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] rounded-md border border-emerald-100 bg-emerald-50/50 px-2 py-1.5">
                                                <FileSignature className="w-3 h-3 text-emerald-500 shrink-0" />
                                                <span className="text-slate-600 truncate">
                                                  {msg.userId === currentUser?.id ? '我的解答' : 'TA 的解答'} · {msg.refAnswerScore}分
                                                  {msg.refAnswerIsCorrect ? '（正确）' : ''} · {msg.refAnswerExcerpt || '（图片作答）'}
                                                </span>
                                              </div>
                                            )}
                                            <div className="mt-1.5 flex items-center gap-4">
                                              <button
                                                onClick={() => void toggleDiscussionMessageLike(msg.id)}
                                                className={`flex items-center gap-1 text-[10px] transition-colors ${
                                                  msgLiked ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'
                                                }`}
                                              >
                                                <ThumbsUp className={`w-3 h-3 ${msgLiked ? 'fill-current' : ''}`} />
                                                <span>{msg.likes ?? 0}</span>
                                              </button>
                                              <button
                                                onClick={() => openReplyInput(msg.id)}
                                                className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-blue-600 transition-colors"
                                              >
                                                <MessageCircle className="w-3 h-3" />
                                                回复
                                              </button>
                                              {msgReplies.length > 0 && (
                                                <button
                                                  onClick={() => toggleRepliesCollapsed(msg.id)}
                                                  className="text-[10px] text-slate-400 hover:text-blue-600 transition-colors"
                                                >
                                                  {repliesCollapsed ? `展开 ${msgReplies.length} 条回复` : '收起回复'}
                                                </button>
                                              )}
                                            </div>
                                            {msgReplies.length > 0 && !repliesCollapsed && (
                                              <div className="mt-1">
                                                {msgReplies.map((reply) => {
                                                  const replyLiked = currentUser
                                                    ? (reply.likedBy || []).includes(currentUser.id)
                                                    : false;
                                                  return (
                                                    <div key={reply.id} className="flex gap-2 py-1.5">
                                                      <FeedAvatar
                                                        avatar={reply.userAvatar}
                                                        nickname={reply.userNickname}
                                                        className="w-5 h-5 shrink-0 mt-0.5"
                                                      />
                                                      <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-[11px] text-slate-700">
                                                          {reply.userNickname}
                                                          {reply.userId === currentUser?.id && (
                                                            <span className="text-blue-600 ml-1">（我）</span>
                                                          )}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400">
                                                          {formatMessageTime(reply.createdAt)}
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-slate-600 break-words">
                                                          {reply.replyToNickname && (
                                                            <span className="text-blue-500">回复 @{reply.replyToNickname}：</span>
                                                          )}
                                                          {reply.content}
                                                        </p>
                                                        <div className="mt-1 flex items-center gap-4">
                                                          <button
                                                            onClick={() => void toggleDiscussionReplyLike(msg.id, reply.id)}
                                                            className={`flex items-center gap-1 text-[10px] transition-colors ${
                                                              replyLiked ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'
                                                            }`}
                                                          >
                                                            <ThumbsUp className={`w-2.5 h-2.5 ${replyLiked ? 'fill-current' : ''}`} />
                                                            <span>{reply.likes ?? 0}</span>
                                                          </button>
                                                          <button
                                                            onClick={() => openReplyInput(msg.id, reply.userNickname)}
                                                            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-blue-600 transition-colors"
                                                          >
                                                            <MessageCircle className="w-2.5 h-2.5" />
                                                            回复
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            )}
                                            {replyingMessageId === msg.id && (
                                              <div className="mt-2 flex gap-2">
                                                <input
                                                  type="text"
                                                  value={replyText}
                                                  onChange={(e) => setReplyText(e.target.value)}
                                                  placeholder={replyingToNickname ? `回复 @${replyingToNickname}…` : '回复…'}
                                                  className="flex-1 px-2.5 py-1.5 border rounded-md text-xs border-slate-200 focus:outline-none focus:border-blue-300"
                                                  onKeyDown={(e) => e.key === 'Enter' && void handleReplyMessage(msg.id)}
                                                />
                                                <Button
                                                  size="sm"
                                                  className="h-7 text-xs px-2.5"
                                                  onClick={() => void handleReplyMessage(msg.id)}
                                                  disabled={!replyText.trim()}
                                                >
                                                  发送
                                                </Button>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    }
                                    const ans = item.answer;
                                    const userInfo = userInfos[ans.userId];
                                    const isLiked = currentUser
                                      ? (ans.likedBy || []).includes(currentUser.id)
                                      : false;
                                    const ansComments = ans.comments || [];
                                    return (
                                      <div key={ans.id} className="flex gap-2.5 py-3">
                                        <FeedAvatar
                                          avatar={userInfo?.avatar}
                                          nickname={userInfo?.nickname}
                                          className="w-7 h-7 shrink-0 mt-0.5"
                                        />
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-1.5">
                                            <p className="font-medium text-[11px] text-slate-700">
                                              {userInfo?.nickname || '未知用户'}
                                              {ans.userId === currentUser?.id && (
                                                <span className="text-blue-600 ml-1">（我）</span>
                                              )}
                                            </p>
                                            <Badge
                                              variant={ans.isCorrect ? 'default' : 'secondary'}
                                              className={
                                                ans.isCorrect
                                                  ? 'bg-emerald-500 text-white text-[10px]'
                                                  : 'text-[10px]'
                                              }
                                            >
                                              {ans.isCorrect ? '正确' : '待改进'}
                                            </Badge>
                                          </div>
                                          <p className="text-[10px] text-slate-400">{formatMessageTime(ans.submittedAt)}</p>
                                          <div className="mt-1 text-xs text-slate-700 line-clamp-3 break-words">
                                            <MathRenderer>{ans.content}</MathRenderer>
                                          </div>
                                          <div className="mt-1.5 flex items-center gap-4">
                                            <button
                                              onClick={() => handleLike(ans.id)}
                                              className={`flex items-center gap-1 text-[10px] transition-colors ${
                                                isLiked ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'
                                              }`}
                                            >
                                              <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                                              <span>{ans.likes}</span>
                                            </button>
                                            <button
                                              onClick={() =>
                                                setCommentingAnswerId(
                                                  commentingAnswerId === ans.id ? null : ans.id
                                                )
                                              }
                                              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-blue-600 transition-colors"
                                            >
                                              <MessageCircle className="w-3 h-3" />
                                              评论{ansComments.length > 0 ? ` ${ansComments.length}` : ''}
                                            </button>
                                          </div>
                                          {ansComments.length > 0 && (
                                            <div className="mt-1">
                                              {ansComments.map((comment) => (
                                                <div key={comment.id} className="flex gap-2 py-1.5">
                                                  <FeedAvatar
                                                    avatar={comment.userAvatar}
                                                    nickname={comment.userNickname}
                                                    className="w-5 h-5 shrink-0 mt-0.5"
                                                  />
                                                  <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-[11px] text-slate-700">
                                                      {comment.userNickname}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400">
                                                      {formatMessageTime(comment.createdAt)}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-slate-600 break-words">
                                                      {comment.content}
                                                    </p>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                          {commentingAnswerId === ans.id && (
                                            <div className="mt-2 flex gap-2">
                                              <input
                                                type="text"
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                placeholder="评论..."
                                                className="flex-1 px-2.5 py-1.5 border rounded-md text-xs border-slate-200 focus:outline-none focus:border-blue-300"
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(ans.id)}
                                              />
                                              <Button
                                                size="sm"
                                                className="h-7 text-xs px-2.5"
                                                onClick={() => handleAddComment(ans.id)}
                                                disabled={!commentText.trim()}
                                              >
                                                发送
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        )}
                    </Card>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">当日暂无题目</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DailyChallenge;
