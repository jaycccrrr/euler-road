'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { zhCN } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useDailyQuestion } from '@/hooks/useDailyQuestion';
import { getDailyQuestionsByDate } from '@/lib/daily-question-bank';
import { getQuestionDateString } from '@/lib/ai-question-generator';
import { getModuleById } from '@/data/modules';

// 上线日期：题库自 2026-03-14 起可用
const LAUNCH_DATE = new Date(2026, 2, 14);

// 题目时间线的"今天"（5 点日界），日历高亮/禁用未来日期都以它为准，不用实际日期
function getTimelineToday(): Date {
  return new Date(getQuestionDateString() + 'T12:00:00');
}

function toLocalDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-[10px] ${i < difficulty ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
      ))}
    </span>
  );
}

// ── π力日历弹窗：左日历 / 右当日题目，供水晶球和个人中心复用 ──
export function PiPowerCalendarDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { userAnswerHistory } = useDailyQuestion();
  const [closing, setClosing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => getTimelineToday());

  const monthlyPi = currentUser?.piPower?.monthlyPi || 0;

  // 已答题日期集合（从 questionId: daily-YYYY-MM-DD-xxx 解析）
  const answeredDateMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of userAnswerHistory) {
      const m = r.questionId.match(/^daily-(\d{4}-\d{2}-\d{2})-/);
      if (m) map.set(m[1], (map.get(m[1]) || 0) + 1);
    }
    return map;
  }, [userAnswerHistory]);

  const answeredDates = useMemo(
    () => Array.from(answeredDateMap.keys()).map((s) => new Date(s + 'T12:00:00')),
    [answeredDateMap]
  );

  const selectedDateStr = toLocalDateString(selectedDate);
  const selectedQuestions = useMemo(() => getDailyQuestionsByDate(selectedDateStr), [selectedDateStr]);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  // 打开时重置到今天（渲染期间调整状态，避免 effect 级联渲染）
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setSelectedDate(getTimelineToday());
    }
  }

  // ESC 关闭 + 锁定背景滚动
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const today = useMemo(() => getTimelineToday(), []);
  const calendarDisabled = useMemo(() => [{ before: LAUNCH_DATE }, { after: today }], [today]);
  const calendarModifiers = useMemo(() => ({ answered: answeredDates }), [answeredDates]);
  const calendarModifiersClassNames = useMemo(() => ({ answered: 'pi-answered' }), []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-slate-900/40 ${closing ? 'animate-[fadeOut_0.2s_ease-in_forwards]' : 'animate-[fadeIn_0.25s_ease-out]'}`}
      />
      {/* 面板 */}
      <div
        className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white shadow-2xl shadow-violet-500/10 border border-violet-100 ${
          closing ? 'animate-[fadeOutScale_0.2s_ease-in_forwards]' : 'animate-[fadeInScale_0.3s_cubic-bezier(0.32,0.72,0,1)]'
        }`}
      >
        {/* 头部 */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-violet-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 border border-violet-200 flex items-center justify-center shadow-inner">
              <span className="text-violet-600 font-bold text-sm" style={{ fontFamily: "Georgia, serif", fontStyle: 'italic' }}>π</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 leading-tight">π力日历</h3>
              <p className="text-[11px] text-slate-500">本月 π力 <span className="font-semibold text-violet-600">{monthlyPi}</span> · 已累计答题 {userAnswerHistory.length} 次</p>
            </div>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-violet-100 text-slate-500 hover:text-violet-600 flex items-center justify-center motion-safe:transition-all motion-safe:duration-200 motion-safe:active:duration-75 hover:rotate-90 active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 主体：左日历 / 右当日题目 */}
        <div className="grid md:grid-cols-[auto_1fr] gap-6 p-6">
          {/* 左：日历 */}
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(d) => d && setSelectedDate(d)}
              locale={zhCN}
              disabled={calendarDisabled}
              modifiers={calendarModifiers}
              modifiersClassNames={calendarModifiersClassNames}
              className="rounded-2xl border border-violet-100 bg-gradient-to-b from-violet-50/50 to-white p-3"
            />
            <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 inline-block" /> 已答题
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-violet-300 inline-block" /> 今日
              </span>
            </div>
            {/* π力规则说明 */}
            <div className="mt-3 w-full rounded-xl bg-violet-50/60 border border-violet-100 px-3 py-2.5 text-[10px] leading-relaxed text-slate-500 space-y-1">
              <p className="font-semibold text-violet-600 text-[11px]">π力规则</p>
              <p>· 今日题有效作答 <span className="font-semibold text-violet-600">+1π</span>，答对 <span className="font-semibold text-violet-600">+2π</span></p>
              <p>· 历史题答对 <span className="font-semibold text-violet-600">+1π</span>，答错不得π力</p>
              <p>· 每题最多获得 2π，重复作答不再获得</p>
              <p>· 无效文本（乱填内容）不获得π力</p>
              <p>· π力累计不清零，每月单独统计本月π力</p>
            </div>
          </div>

          {/* 右：当日题目 */}
          <div key={selectedDateStr} className="min-w-0 animate-[fadeIn_0.3s_ease-out]">
            <p className="text-sm font-bold text-slate-800 mb-3">
              {selectedDate.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
              <span className="ml-2 text-[11px] font-normal text-slate-400">
                {selectedDateStr === toLocalDateString(today) ? '今日题目' : '当日题目'}
              </span>
            </p>
            <div className="space-y-2.5">
              {selectedQuestions.map((q, idx) => {
                const mod = getModuleById(q.moduleId);
                const questionId = `daily-${selectedDateStr}-${q.moduleId}`;
                const answered = userAnswerHistory.some((r) => r.questionId === questionId);
                return (
                  <div key={q.moduleId}>
                    <button
                      type="button"
                      onClick={() => {
                        const hash = `date=${selectedDateStr}&module=${q.moduleId}`;
                        onClose();
                        // App Router 软导航不触发原生 hashchange:
                        // 已在 /daily 页时直接写 location.hash,让 DailyChallenge 的 hashchange 监听生效
                        if (window.location.pathname.replace(/\/+$/, '') === '/daily') {
                          window.location.hash = hash;
                        } else {
                          router.push(`/daily/#${hash}`);
                        }
                      }}
                      title="点击查看当天挑战"
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60 text-left cursor-pointer hover:bg-violet-50/60 hover:border-violet-200 hover:shadow-sm motion-safe:transition-all motion-safe:duration-200 motion-safe:active:duration-75 motion-safe:active:scale-[0.98]"
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${mod?.color || 'from-slate-400 to-slate-600'} flex items-center justify-center text-white text-sm shrink-0 shadow-sm`}>
                        {mod?.icon || '📚'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-medium text-slate-500">{mod?.name}</span>
                          <DifficultyStars difficulty={q.difficulty} />
                        </div>
                        <p className="text-xs font-semibold text-slate-800 truncate">{q.title}</p>
                      </div>
                      {answered ? (
                        <Badge className="bg-emerald-100 text-emerald-600 border-emerald-200 text-[10px] shrink-0">
                          <CheckCircle className="w-3 h-3 mr-0.5" /> 已答
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px] shrink-0">未答</Badge>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── π力水晶球：浅色多层渐变 + 漂浮 + 高光 + 星芒，点击弹出π力日历大窗口 ──
export function PiPowerOrb() {
  const { isAuthenticated, user: currentUser } = useAuth();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated || !currentUser) return null;

  const monthlyPi = currentUser.piPower?.monthlyPi || 0;

  return (
    <>
      {/* 水晶球本体 */}
      <button
        onClick={() => setOpen(true)}
        title={`π力 ${monthlyPi} · 点击查看π力日历`}
        className="relative group outline-none motion-safe:transition-transform motion-safe:duration-200 motion-safe:active:duration-75 hover:scale-110 active:scale-90"
      >
        {/* 外部光晕 */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-300/50 via-fuchsia-200/40 to-sky-200/50 blur-lg opacity-70 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300 animate-[pulse-soft_3s_ease-in-out_infinite]" />
        {/* 球体（漂浮动画） */}
        <div
          className="relative w-14 h-14 rounded-full border border-white/70 shadow-[inset_0_-6px_12px_rgba(139,92,246,0.18),inset_0_4px_8px_rgba(255,255,255,0.9),0_8px_20px_rgba(139,92,246,0.25)] bg-gradient-to-br from-white via-violet-100 to-fuchsia-200 overflow-hidden motion-safe:animate-[float_3.5s_ease-in-out_infinite]"
        >
          {/* 顶部高光 */}
          <div className="absolute top-1.5 left-3 w-5 h-3 bg-white/90 rounded-full blur-[3px] -rotate-12" />
          {/* 底部反光 */}
          <div className="absolute bottom-1 right-2.5 w-4 h-2 bg-fuchsia-300/50 rounded-full blur-[3px]" />
          {/* 星芒装饰 */}
          <Sparkles className="absolute top-1 right-1.5 w-3 h-3 text-violet-400/80 motion-safe:animate-[pulse-soft_2s_ease-in-out_infinite]" />
          {/* 数字（艺术字体，数字在前） */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-violet-600 font-bold text-lg leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: 'italic' }}
            >
              {monthlyPi}
              <span className="text-fuchsia-500">π</span>
            </span>
          </div>
        </div>
      </button>

      {open && <PiPowerCalendarDialog open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
