'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { GradientWave } from '@/components/ui/gradient-wave';

gsap.registerPlugin(useGSAP);

const SYMBOLS = ['π', '∫', 'Σ', 'e', '∞', 'Δ', '√', 'φ', 'λ', 'θ', '∂', 'Ω'];

// 模块级常量：内联数组每次渲染都是新引用，会导致 GradientWave 的 effect 反复销毁重建 WebGL 上下文
const WAVE_COLORS = ['#c7d8ff', '#ffffff', '#e9d5ff', '#ffffff', '#c7d8ff', '#e9d5ff'];

interface FloatingSymbol {
  char: string;
  left: number; // %
  top: number; // %
  size: number; // px
  depth: number; // 视差深度系数 0~1
  drift: number; // 漂移幅度 px
  duration: number; // 漂移周期 s
  opacity: number;
}

/** 用黄金角分布生成确定性的符号位置（避免 SSR  hydration 不一致） */
function buildSymbols(): FloatingSymbol[] {
  return SYMBOLS.map((char, i) => {
    const angle = i * 137.508;
    const rad = (angle * Math.PI) / 180;
    // 半径在 18%~48% 之间交替，铺满但不居中堆叠
    const radius = 20 + (i % 5) * 7;
    const left = 50 + radius * Math.cos(rad) * 1.15;
    const top = 48 + radius * Math.sin(rad) * 0.72;
    const depth = 0.25 + ((i * 37) % 100) / 140; // 0.25 ~ 0.95
    return {
      char,
      left: Math.max(4, Math.min(94, left)),
      top: Math.max(6, Math.min(90, top)),
      size: 26 + ((i * 53) % 60),
      depth,
      drift: 14 + ((i * 29) % 26),
      duration: 7 + ((i * 41) % 70) / 10,
      opacity: 0.1 + depth * 0.16,
    };
  });
}

/**
 * 每日挑战页动态背景：
 * 底层 WebGL 渐变波浪（GradientWave）+ GSAP 漂浮数学符号 + 鼠标分层视差。
 * prefers-reduced-motion / 后台标签页时波浪暂停。
 */
export function ChallengeBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const symbols = useMemo(() => buildSymbols(), []);
  const [wavePlaying, setWavePlaying] = useState(true);

  // 减少动态偏好或页面隐藏时暂停 WebGL 渲染
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setWavePlaying(!mq.matches && !document.hidden);
    const onVis = () => update();
    mq.addEventListener('change', update);
    document.addEventListener('visibilitychange', onVis);
    update();
    return () => {
      mq.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  useGSAP(
    (context, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 符号无限漂移（各自不同相位/周期，正弦缓动最柔和）
        const els = gsap.utils.toArray<HTMLElement>('.bg-symbol');
        const tweens = els.map((el, i) =>
          gsap.to(el, {
            y: `+=${symbols[i].drift}`,
            x: `+=${symbols[i].drift * 0.6}`,
            rotation: i % 2 === 0 ? 6 : -6,
            duration: symbols[i].duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: -(symbols[i].duration * ((i * 13) % 10)) / 10,
          })
        );

        // 鼠标分层视差：深度越大移动越多（近大远小）
        const layers = gsap.utils.toArray<HTMLElement>('.parallax-layer');
        const quicks = layers.map((layer) => ({
          depth: parseFloat(layer.dataset.depth || '0.5'),
          xTo: gsap.quickTo(layer, 'x', { duration: 0.9, ease: 'power2.out' }),
          yTo: gsap.quickTo(layer, 'y', { duration: 0.9, ease: 'power2.out' }),
        }));

        // rAF 节流:每次 mousemove 只记录坐标,每帧最多应用一次
        let pendingX = 0;
        let pendingY = 0;
        let rafId = 0;
        let listening = false;

        const applyMove = () => {
          rafId = 0;
          for (const q of quicks) {
            q.xTo(pendingX * 46 * q.depth);
            q.yTo(pendingY * 30 * q.depth);
          }
        };

        const onMove = contextSafe?.((e: MouseEvent) => {
          pendingX = e.clientX / window.innerWidth - 0.5;
          pendingY = e.clientY / window.innerHeight - 0.5;
          if (!rafId) rafId = requestAnimationFrame(applyMove);
        });
        if (!onMove) return;

        const onVisChange = () => {
          // 后台标签页移除监听,恢复时再挂上
          if (document.hidden && listening) {
            window.removeEventListener('mousemove', onMove);
            listening = false;
          } else if (!document.hidden && !listening) {
            window.addEventListener('mousemove', onMove);
            listening = true;
          }
        };
        window.addEventListener('mousemove', onMove);
        document.addEventListener('visibilitychange', onVisChange);
        listening = true;

        return () => {
          window.removeEventListener('mousemove', onMove);
          document.removeEventListener('visibilitychange', onVisChange);
          if (rafId) cancelAnimationFrame(rafId);
          tweens.forEach((t) => t.kill());
        };
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* 底层：WebGL 渐变波浪 */}
      <div className="absolute inset-0">
        <GradientWave
          colors={WAVE_COLORS}
          isPlaying={wavePlaying}
        />
      </div>

      {/* 中层：漂浮数学符号（两个深度层） */}
      <div className="parallax-layer absolute inset-0" data-depth="0.35">
        {symbols.filter((_, i) => i % 2 === 0).map((s) => (
          <span
            key={s.char}
            className="bg-symbol absolute font-serif select-none text-indigo-400"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              fontSize: s.size * 0.8,
              opacity: s.opacity * 0.7,
            }}
          >
            {s.char}
          </span>
        ))}
      </div>
      <div className="parallax-layer absolute inset-0" data-depth="0.8">
        {symbols.filter((_, i) => i % 2 === 1).map((s) => (
          <span
            key={s.char}
            className="bg-symbol absolute font-serif select-none text-violet-500"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              fontSize: s.size,
              opacity: s.opacity,
            }}
          >
            {s.char}
          </span>
        ))}
      </div>

      {/* 顶层：柔光晕影，保证中央内容可读 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 42%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 55%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default ChallengeBackground;
