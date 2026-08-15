'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, Sparkles } from 'lucide-react';

const STEPS = ['正在阅读你的解答', '正在核对推导过程', '正在生成评解与得分'];

/**
 * AI 判题等待动画：提交后填充作答区下方的空白，避免"白屏"感。
 * 入场使用仓库统一的 fadeInScale；旋转动效经 motion-safe 门控。
 */
export function GradingLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in-scale" role="status" aria-live="polite">
      <div className="flex flex-col items-center py-5">
        {/* π 旋转指示器 */}
        <div className="relative w-14 h-14 mb-3">
          <div className="absolute inset-0 rounded-full border-2 border-blue-100" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 motion-safe:animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-serif font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              π
            </span>
          </div>
        </div>

        <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          AI 正在判题
        </p>

        {/* 判题步骤 */}
        <div className="space-y-1.5 w-full max-w-[220px]">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div
                key={label}
                className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
                  done ? 'text-emerald-600' : active ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {done ? (
                  <Check className="w-3 h-3 shrink-0" />
                ) : active ? (
                  <Loader2 className="w-3 h-3 shrink-0 motion-safe:animate-spin" />
                ) : (
                  <span className="w-3 h-3 shrink-0 rounded-full border border-current inline-block" />
                )}
                {label}
                {active && <span className="animate-pulse">…</span>}
              </div>
            );
          })}
        </div>

        {/* 骨架条：预示即将出现的评解内容 */}
        <div className="w-full mt-4 space-y-2">
          <div className="h-2.5 rounded-full bg-slate-100 animate-pulse w-2/3" />
          <div className="h-2.5 rounded-full bg-slate-100 animate-pulse w-full [animation-delay:150ms]" />
          <div className="h-2.5 rounded-full bg-slate-100 animate-pulse w-5/6 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
