'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Share2, ArrowRight } from 'lucide-react';
import CountUp from '@/components/CountUp';

gsap.registerPlugin(useGSAP);

interface PiPowerAnimationProps {
  piGained: number;
  previousTotal: number;
  /** 区分上方字样：回答正确！/ 已作答 */
  isCorrect: boolean;
  onComplete: () => void;
  /** 分享题目卡片；不传则不显示分享按钮 */
  onShare?: () => void;
}

/**
 * π力旋转动画：1π = 半圈（180°），2π = 一圈（360°）。
 * 动画结束后不自动退出，等待用户点击「分享卡片」或「继续」。
 */
export function PiPowerAnimation({
  piGained,
  previousTotal,
  isCorrect,
  onComplete,
  onShare,
}: PiPowerAnimationProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const [actionsReady, setActionsReady] = useState(false);
  const [closing, setClosing] = useState(false);

  const startRotation = previousTotal * 180;
  const targetRotation = startRotation + piGained * 180;
  const newTotal = previousTotal + piGained;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          noReduce: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean; noReduce: boolean };

          if (reduce) {
            // 降级：直接呈现终态，不播放动画
            gsap.set('.pi-dial', { rotation: targetRotation });
            setActionsReady(true);
            return;
          }

          const tl = gsap.timeline({ onComplete: () => setActionsReady(true) });
          tl.fromTo('.pi-overlay', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' })
            .fromTo(
              '.pi-card',
              { autoAlpha: 0, y: 24, scale: 0.96 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
              '<'
            )
            .fromTo(
              '.pi-header',
              { autoAlpha: 0, y: -10 },
              { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
              '-=0.2'
            )
            .fromTo(
              dialRef.current,
              { rotation: startRotation },
              { rotation: targetRotation, duration: 1.6, ease: 'power3.inOut' },
              '-=0.1'
            )
            .fromTo('.pi-badge', { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.6')
            .fromTo(
              '.pi-total',
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
              '-=0.3'
            )
            .fromTo(
              '.pi-actions',
              { autoAlpha: 0, y: 10 },
              { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
              '-=0.1'
            );
          return () => {
            tl.kill();
          };
        },
        rootRef
      );
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  /** 点击按钮后淡出并退出/跳转分享 */
  const dismiss = (next: () => void) => {
    if (closing) return;
    setClosing(true);
    gsap.to('.pi-card', { autoAlpha: 0, y: 12, scale: 0.97, duration: 0.2, ease: 'power2.in' });
    gsap.to('.pi-overlay', { autoAlpha: 0, duration: 0.22, ease: 'power1.in', onComplete: next });
  };

  return (
    <div ref={rootRef} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 遮罩（不用 backdrop-blur：避免遮挡动画背景时逐帧重算模糊） */}
      <div className="pi-overlay absolute inset-0 bg-slate-900/50" />

      <div className="pi-card relative bg-white rounded-3xl px-8 pt-8 pb-6 max-w-sm w-full mx-4 shadow-2xl border border-slate-100">
        {/* 标题区 */}
        <div className="pi-header text-center mb-6">
          <p className="text-[11px] tracking-[0.3em] text-slate-400 uppercase mb-2">π Power</p>
          <h3 className="font-serif text-2xl font-bold text-slate-800">
            {isCorrect ? '回答正确！' : '已作答'}
          </h3>
          <p className="text-sm text-slate-500 mt-2 flex items-center justify-center gap-1">
            <span>获得</span>
            <CountUp
              from={0}
              to={piGained}
              duration={1.6}
              delay={0.2}
              className="font-bold text-indigo-600 text-lg"
            />
            <span>π 力</span>
          </p>
        </div>

        {/* 单位圆动画 */}
        <div className="relative w-44 h-44 mx-auto mb-6">
          {/* 外圆 */}
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-200" />

          {/* 坐标轴 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-px bg-slate-200" />
            <div className="absolute h-full w-px bg-slate-200" />
          </div>

          {/* 角度标记 */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[10px] text-slate-300">π/2</div>
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] text-slate-300">3π/2</div>
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-300">π</div>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-300">0</div>

          {/* 旋转的半径线和端点 */}
          <div ref={dialRef} className="pi-dial absolute inset-0" style={{ transform: `rotate(${startRotation}deg)` }}>
            <div className="absolute top-1/2 left-1/2 w-[calc(50%-6px)] h-[3px] rounded-full bg-indigo-600 origin-left -translate-y-1/2" />
            <div className="absolute top-1/2 right-1 w-3 h-3 bg-indigo-600 rounded-full -translate-y-1/2 shadow-md shadow-indigo-600/30" />
          </div>

          {/* 中心点 */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-slate-400 rounded-full -translate-x-1/2 -translate-y-1/2" />

          {/* π 徽标（外层负责居中，内层由 GSAP 控制缩放，避免 transform 冲突） */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="pi-badge">
              <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/25">
                <span className="font-serif text-xl font-bold text-white">π</span>
              </div>
            </div>
          </div>
        </div>

        {/* 累计 π 力 */}
        <div className="pi-total text-center">
          <div className="text-xs text-slate-400 mb-1">累计 π 力</div>
          <div className="text-3xl font-bold text-slate-800 flex items-baseline justify-center gap-1">
            <CountUp from={previousTotal} to={newTotal} duration={1.8} delay={0.6} />
            <span className="font-serif text-indigo-600">π</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            本次旋转 {piGained * 180}°（1π = 半圈）
          </div>
        </div>

        {/* 操作区：动画结束后出现，等待用户点击 */}
        <div className={`pi-actions mt-6 flex gap-2 ${actionsReady ? '' : 'pointer-events-none'}`}>
          {onShare && (
            <button
              onClick={() => dismiss(onShare)}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              分享卡片
            </button>
          )}
          <button
            onClick={() => dismiss(onComplete)}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            继续
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
