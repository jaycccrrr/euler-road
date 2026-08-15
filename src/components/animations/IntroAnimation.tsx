'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAnimation } from '@/contexts/AnimationContext';
import { AuthPanel } from './AuthPanel';

gsap.registerPlugin(useGSAP);

// 符号星野：黄金角确定性分布（避免 hydration 不一致）
const GLYPHS = ['π', '∑', '∫', 'e', 'i', '∞', 'φ', '√', 'Δ', 'θ', 'λ', '∂', 'Ω', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'μ', 'σ', 'ψ', 'ω'];

interface GlyphSpec {
  char: string;
  left: number; // %
  top: number; // %
  size: number; // px
  opacity: number;
}

function buildGlyphs(): GlyphSpec[] {
  return GLYPHS.map((char, i) => {
    const angle = i * 137.508;
    const rad = (angle * Math.PI) / 180;
    const radius = 16 + (i % 6) * 6.5; // 16% ~ 48%
    return {
      char,
      left: Math.max(3, Math.min(95, 50 + radius * Math.cos(rad) * 1.2)),
      top: Math.max(5, Math.min(92, 48 + radius * Math.sin(rad) * 0.75)),
      size: 20 + ((i * 47) % 54),
      opacity: 0.1 + ((i * 31) % 100) / 380, // 0.10 ~ 0.36
    };
  });
}

const glyphs = buildGlyphs();

// 欧拉恒等式 e^{iπ} + 1 = 0
const FORMULA: { t: string; sup?: boolean }[] = [
  { t: 'e' },
  { t: 'iπ', sup: true },
  { t: '+' },
  { t: '1' },
  { t: '=' },
  { t: '0' },
];

// 铅笔字迹：Caveat 手写体 + 石墨色
const titleFontStyle: React.CSSProperties = {
  fontFamily: '"Caveat", "Segoe Script", cursive',
  fontWeight: 600,
  letterSpacing: '0.01em',
  color: '#3f4756',
};

/**
 * 首屏沉浸动画（GSAP 时间线）：
 * 深空星野 → 欧拉恒等式汇聚 → 星野收拢爆发 → 标题冲出 → 虹膜缩放揭示下一页。
 * 结束后：近期登录 → complete（首页）；新用户 → register（注册）。
 */
export function IntroAnimation() {
  const { phase, setPhase, isRecentLogin } = useAnimation();
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (phase !== 'intro') return;

      const finish = () => setPhase(isRecentLogin ? 'complete' : 'register');
      let drifts: gsap.core.Tween[] = [];
      const killDrift = () => {
        drifts.forEach((t) => t.kill());
        drifts = [];
      };

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          noReduce: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };

          if (reduce) {
            // 降级：直接呈现标题终态，短暂停留后淡出
            gsap.set('.intro-bg', { autoAlpha: 1 });
            gsap.set('.intro-title', { autoAlpha: 1, y: 0 });
            gsap.set('.sk-path', { strokeDashoffset: 0 });
            gsap.set('.intro-sub', { autoAlpha: 1, y: 0 });
            gsap.set('.intro-skip', { autoAlpha: 1 });
            gsap.set(['.intro-formula-wrap', '.intro-burst'], { autoAlpha: 0 });
            const call = gsap.delayedCall(1.4, () => {
              gsap.to('.intro-layer', { autoAlpha: 0, duration: 0.3, onComplete: finish });
            });
            return () => call.kill();
          }

          const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, onComplete: finish });
          tlRef.current = tl;

          // 1. 浅蓝纸面淡入
          tl.fromTo('.intro-bg', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: 'power1.out' }, 0);

          // 2. 符号星野浮现
          tl.fromTo(
            '.intro-glyph',
            { autoAlpha: 0, scale: 0.5 },
            {
              autoAlpha: (i, el) => parseFloat((el as HTMLElement).dataset.o || '0.2'),
              scale: 1,
              duration: 1,
              ease: 'power2.out',
              stagger: { amount: 0.6, from: 'random' },
            },
            0.1
          );

          // 星野缓慢漂移（无限，汇聚前杀死）
          tl.call(
            () => {
              drifts = gsap.utils.toArray<HTMLElement>('.intro-glyph', rootRef.current).map((el) =>
                gsap.to(el, {
                  x: gsap.utils.random(-16, 16),
                  y: gsap.utils.random(-26, 26),
                  rotation: gsap.utils.random(-10, 10),
                  duration: gsap.utils.random(4, 7),
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                })
              );
            },
            [],
            1
          );

          // 3. 欧拉恒等式字符从四面八方汇聚成形
          tl.fromTo(
            '.f-char',
            {
              x: () => gsap.utils.random(-420, 420),
              y: () => gsap.utils.random(-300, 300),
              rotation: () => gsap.utils.random(-120, 120),
              autoAlpha: 0,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: { each: 0.05, from: 'random' },
            },
            0.55
          );
          tl.fromTo('.f-line', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, '-=0.25');
          tl.fromTo('.f-glow', { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.35 }, '<');
          tl.to('.f-glow', { scale: 1.18, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' });

          // 4. 星野向公式收拢（能量汇聚）
          tl.call(killDrift, [], '+=0.1');
          tl.to(
            '.intro-glyph',
            {
              x: (i, el) => {
                const r = (el as HTMLElement).getBoundingClientRect();
                return window.innerWidth / 2 - (r.left + r.width / 2);
              },
              y: (i, el) => {
                const r = (el as HTMLElement).getBoundingClientRect();
                return window.innerHeight / 2 - (r.top + r.height / 2);
              },
              scale: 0.1,
              autoAlpha: 0,
              duration: 0.55,
              ease: 'power3.in',
              overwrite: 'auto',
              stagger: { amount: 0.15, from: 'random' },
            },
            '<'
          );

          // 5. 公式坍缩 + 光爆发
          tl.to('.intro-formula', { scale: 1.12, duration: 0.25, ease: 'power2.in' }, '<');
          tl.to('.intro-formula', { scale: 0.3, y: -40, autoAlpha: 0, duration: 0.3, ease: 'power3.in' });
          tl.fromTo(
            '.intro-burst',
            { scale: 0.15, autoAlpha: 0 },
            { scale: 2.8, autoAlpha: 0.85, duration: 0.3, ease: 'power2.out' },
            '-=0.1'
          );
          tl.to('.intro-burst', { autoAlpha: 0, duration: 0.35, ease: 'power1.out' }, '-=0.05');

          // 6. 标题直接浮现 + 欧拉铅笔素描浮现 + 坐标系/圆锥曲线手绘描边
          tl.fromTo(
            '.intro-title',
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.35'
          );
          tl.fromTo(
            '.sk-path',
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', stagger: 0.18 },
            '-=0.55'
          );
          tl.fromTo('.intro-sub', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=1');
          tl.fromTo('.intro-skip', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, '-=0.3');

          // 7. 沉浸推进 + 虹膜缩放揭示下一页（缓慢收拢）
          tl.to('.intro-stage', { scale: 1.07, duration: 1.2, ease: 'power2.in' }, '+=0.55');
          tl.fromTo(
            '.intro-layer',
            { clipPath: 'circle(141% at 50% 50%)' },
            { clipPath: 'circle(0% at 50% 50%)', duration: 1.6, ease: 'power2.inOut' },
            '-=0.3'
          );

          return () => {
            tl.kill();
            killDrift();
          };
        },
        rootRef
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [phase, isRecentLogin] }
  );

  const handleSkip = () => {
    tlRef.current?.kill();
    gsap.to('.intro-layer', {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power1.in',
      onComplete: () => setPhase(isRecentLogin ? 'complete' : 'register'),
    });
  };

  if (phase !== 'intro') return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] overflow-hidden">
      {/* 底层：动画揭示后露出的内容（新用户=注册卡；近期登录=首页由 AnimatedHome 渲染在更下层） */}
      <div className="absolute inset-0 z-[5]">
        {!isRecentLogin && <AuthPanel />}
      </div>

      {/* 动画层（结尾虹膜裁剪揭示底层） */}
      <div className="intro-layer absolute inset-0 z-[40]" style={{ clipPath: 'circle(141% at 50% 50%)' }}>
        {/* 浅蓝纸面背景（与网站主色调一致） */}
        <div
          className="intro-bg absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 50% 42%, #ffffff 0%, #f0f7ff 52%, #dbeafe 100%)',
          }}
        />
        {/* 细网格（同网站方格纸） */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(#e2e8f0 1px, transparent 1px),
              linear-gradient(90deg, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
          }}
        />

        <div className="intro-stage absolute inset-0">
          {/* 符号星野 */}
          {glyphs.map((g, i) => (
            <span
              key={i}
              data-o={g.opacity}
              className="intro-glyph absolute font-serif select-none"
              style={{
                left: `${g.left}%`,
                top: `${g.top}%`,
                fontSize: g.size,
                opacity: 0,
                color: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#94a3b8' : '#818cf8',
              }}
              aria-hidden
            >
              {g.char}
            </span>
          ))}

          {/* 欧拉恒等式 */}
          <div className="intro-formula-wrap absolute inset-0 flex items-center justify-center">
            <div className="intro-formula relative flex items-baseline">
              {/* 辉光 */}
              <div
                className="f-glow absolute -inset-x-16 -inset-y-10 rounded-full bg-blue-400/20 blur-3xl"
                style={{ opacity: 0 }}
                aria-hidden
              />
              {FORMULA.map((c, i) =>
                c.sup ? (
                  <span
                    key={i}
                    className="f-char relative font-serif italic text-blue-600"
                    style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)', alignSelf: 'flex-start', marginTop: '0.2em' }}
                  >
                    {c.t}
                  </span>
                ) : (
                  <span
                    key={i}
                    className="f-char relative font-serif italic text-slate-800"
                    style={{
                      fontSize: 'clamp(3rem, 8vw, 6rem)',
                      textShadow: '0 2px 24px rgba(59, 130, 246, 0.25)',
                      margin: '0 0.08em',
                    }}
                  >
                    {c.t}
                  </span>
                )
              )}
              {/* 下划光线 */}
              <div
                className="f-line absolute left-0 right-0 -bottom-5 h-px origin-center"
                style={{
                  background: 'linear-gradient(90deg, transparent, #818cf8 30%, #fbbf24 70%, transparent)',
                  transform: 'scaleX(0)',
                }}
                aria-hidden
              />
            </div>
          </div>

          {/* 光爆发 */}
          <div
            className="intro-burst absolute rounded-full"
            style={{
              width: '60vmax',
              height: '60vmax',
              left: '50%',
              top: '50%',
              marginLeft: '-30vmax',
              marginTop: '-30vmax',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(147, 197, 253, 0.45) 35%, transparent 70%)',
              opacity: 0,
            }}
            aria-hidden
          />

          {/* 标题 + 数学草画（手绘坐标系 + 圆锥曲线） */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative">
              {/* 铅笔笔触滤镜：微扰边缘模拟手绘 */}
              <svg width="0" height="0" className="absolute" aria-hidden>
                <filter id="pencil-rough">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" seed="7" />
                  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
                </filter>
              </svg>

              {/* 手绘坐标系 + 圆锥曲线 */}
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1120px,150vw)] pointer-events-none"
                viewBox="0 0 1200 600"
                fill="none"
                aria-hidden
              >
                {/* 椭圆（环绕标题） */}
                <ellipse
                  className="sk-path"
                  cx="600"
                  cy="300"
                  rx="530"
                  ry="205"
                  pathLength={1}
                  stroke="#94a3b8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.75"
                  transform="rotate(-5 600 300)"
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
                {/* 抛物线（下方开口弧） */}
                <path
                  className="sk-path"
                  d="M 200 372 Q 600 660 1000 372"
                  pathLength={1}
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.85"
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
                {/* 手绘坐标系：x 轴 + 箭头 */}
                <path
                  className="sk-path"
                  d="M 70 300 L 1120 300 M 1100 286 L 1130 300 L 1100 314"
                  pathLength={1}
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.55"
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
                {/* y 轴 + 箭头 */}
                <path
                  className="sk-path"
                  d="M 600 545 L 600 80 M 586 100 L 600 70 L 614 100"
                  pathLength={1}
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.55"
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
                {/* 坐标刻度 */}
                <path
                  className="sk-path"
                  d="M 335 290 L 335 310 M 865 290 L 865 310 M 590 210 L 610 210 M 590 405 L 610 405"
                  pathLength={1}
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.45"
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
              </svg>

              {/* 铅笔手写体标题 */}
              <h1
                className="intro-title relative z-10 text-center"
                style={{
                  ...titleFontStyle,
                  fontSize: 'clamp(3rem, 7.5vw, 5.75rem)',
                  whiteSpace: 'nowrap',
                  filter: 'url(#pencil-rough)',
                  opacity: 0,
                }}
              >
                Euler Road
              </h1>
            </div>
            <p
              className="intro-sub mt-6 text-sm md:text-base tracking-[0.6em] text-slate-500"
              style={{ fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", serif', opacity: 0 }}
            >
              做纯粹的数学
            </p>
          </div>
        </div>

        {/* 跳过按钮 */}
        <button
          onClick={handleSkip}
          className="intro-skip absolute bottom-8 right-8 z-[50] px-4 py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-900/5"
          style={{ opacity: 0 }}
        >
          跳过动画 →
        </button>
      </div>
    </div>
  );
}
