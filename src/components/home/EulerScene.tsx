'use client';

import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * EulerScene —— 首页 3D 数学场景
 *
 * Apple Design 映射：
 * - §4 弹簧即行为：视差由临界阻尼弹簧驱动（stiffness 150 / damping 25 ≈ ζ1.0, response 0.4s），
 *   指针离开/反向时从当前值平滑回中，天然可中断、无速度突变。
 * - §11 帧级顺滑：只动 transform / opacity，全部走合成器。
 * - §14 减动效：prefers-reduced-motion 时停用全部旋转与漂浮（见 <style> 媒体查询 + useReducedMotion）。
 */

const CUBE = 168;
const HALF = CUBE / 2;

const FACES: { t: string; symbol: string }[] = [
  { t: `translateZ(${HALF}px)`, symbol: 'π' },
  { t: `rotateY(180deg) translateZ(${HALF}px)`, symbol: '∫' },
  { t: `rotateY(90deg) translateZ(${HALF}px)`, symbol: 'Σ' },
  { t: `rotateY(-90deg) translateZ(${HALF}px)`, symbol: 'e' },
  { t: `rotateX(90deg) translateZ(${HALF}px)`, symbol: 'Δ' },
  { t: `rotateX(-90deg) translateZ(${HALF}px)`, symbol: '∞' },
];

const OUTER_SYMBOLS = ['π', 'e', 'i', 'φ'];
const INNER_SYMBOLS = ['∑', '∫', 'Δ', '∞'];

const CHIPS: {
  text: string;
  style: React.CSSProperties;
  z: number;
  dur: number;
  delay: number;
}[] = [
  { text: 'e^(iπ) + 1 = 0', style: { top: '14%', left: '7%' }, z: 130, dur: 6.4, delay: 0 },
  { text: 'a² + b² = c²', style: { bottom: '18%', left: '5%' }, z: -70, dur: 7.6, delay: 0.9 },
  { text: 'lim (1+1/n)ⁿ = e', style: { top: '12%', right: '6%' }, z: -90, dur: 8.2, delay: 0.5 },
  { text: 'f′(x) = dy/dx', style: { bottom: '14%', right: '7%' }, z: 110, dur: 5.8, delay: 1.3 },
];

function OrbitRing({
  radius,
  tilt,
  duration,
  reverse,
  symbols,
  symbolClass,
}: {
  radius: number;
  tilt: number;
  duration: number;
  reverse?: boolean;
  symbols: string[];
  symbolClass: string;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transformStyle: 'preserve-3d', transform: `rotateX(${tilt}deg)` }}
    >
      <div
        className="es-anim relative"
        style={{
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
          transformStyle: 'preserve-3d',
          animation: `es-orbit-${reverse ? 'ccw' : 'cw'} ${duration}s linear infinite`,
        }}
      >
        {/* 轨道环 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid rgba(96,165,250,0.28)' }}
        />
        {symbols.map((s, i) => {
          const a = (360 / symbols.length) * i;
          return (
            <span
              key={i}
              className="es-anim absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${a}deg) translateX(${radius}px) rotate(${-a}deg)`,
                animation: `es-orbit-${reverse ? 'cw' : 'ccw'} ${duration}s linear infinite`,
                transformStyle: 'preserve-3d',
              }}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full border backdrop-blur-md ${symbolClass}`}
                style={{
                  transform: `rotateX(${-tilt}deg) translate(-50%, -50%)`,
                  boxShadow: '0 6px 18px -6px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
              >
                {s}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function EulerScene() {
  const reduce = useReducedMotion();

  // §4 临界阻尼弹簧：视差永远从当前值出发，可中断、无跳变
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 25, mass: 1 });
  const sy = useSpring(my, { stiffness: 150, damping: 25, mass: 1 });
  const sceneRotateY = useTransform(sx, [0, 1], [-9, 9]);
  const sceneRotateX = useTransform(sy, [0, 1], [7, -7]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, mx, my]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 1200 }}>
      <style>{`
        @keyframes es-cube-spin {
          from { transform: rotateX(-22deg) rotateY(0deg); }
          to   { transform: rotateX(-22deg) rotateY(360deg); }
        }
        @keyframes es-orbit-cw  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes es-orbit-ccw { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        @keyframes es-chip-float {
          0%, 100% { transform: translateY(-10px); }
          50%      { transform: translateY(10px); }
        }
        @keyframes es-shadow-breathe {
          0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.55; }
          50%      { transform: translateX(-50%) scaleX(1.12); opacity: 0.35; }
        }
        /* §14 减动效：全部冻结为静态 */
        @media (prefers-reduced-motion: reduce) {
          .es-anim { animation: none !important; }
        }
      `}</style>

      <motion.div
        className="absolute inset-0"
        style={{
          rotateX: reduce ? 0 : sceneRotateX,
          rotateY: reduce ? 0 : sceneRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ===== 中心舞台（位于标题上方） ===== */}
        <div
          className="absolute left-1/2 top-[16%]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 底部呼吸阴影 */}
          <div
            className="es-anim absolute left-1/2 top-[150px] w-[220px] h-[36px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(59,130,246,0.30) 0%, transparent 70%)',
              filter: 'blur(6px)',
              animation: 'es-shadow-breathe 6s ease-in-out infinite',
            }}
          />

          {/* 玻璃公式立方体 */}
          <div
            className="es-anim relative"
            style={{
              width: CUBE,
              height: CUBE,
              marginLeft: -HALF,
              marginTop: -HALF,
              transformStyle: 'preserve-3d',
              animation: 'es-cube-spin 26s linear infinite',
            }}
          >
            {FACES.map((f, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center rounded-xl"
                style={{
                  transform: f.t,
                  background:
                    'linear-gradient(135deg, rgba(224,242,254,0.42) 0%, rgba(147,197,253,0.30) 55%, rgba(59,130,246,0.22) 100%)',
                  border: '1px solid rgba(147,197,253,0.55)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <span
                  className="text-5xl font-bold select-none"
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    background: 'linear-gradient(135deg, #1d4ed8, #38bdf8)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 0 24px rgba(147,197,253,0.35)',
                  }}
                >
                  {f.symbol}
                </span>
              </div>
            ))}
          </div>

          {/* 双层符号轨道 */}
          <OrbitRing
            radius={210}
            tilt={72}
            duration={22}
            symbols={OUTER_SYMBOLS}
            symbolClass="bg-white/55 border-sky-200/70 text-sky-600 text-lg"
          />
          <OrbitRing
            radius={140}
            tilt={60}
            duration={15}
            reverse
            symbols={INNER_SYMBOLS}
            symbolClass="bg-white/45 border-blue-200/60 text-blue-500 text-base"
          />
        </div>

        {/* ===== 漂浮公式玻璃片（不同景深 → 视差分层） ===== */}
        {CHIPS.map((c, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              ...c.style,
              transform: `translateZ(${c.z}px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="es-anim px-4 py-2 rounded-full text-sm font-medium text-slate-600 whitespace-nowrap"
              style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(14px) saturate(150%)',
                WebkitBackdropFilter: 'blur(14px) saturate(150%)',
                border: '1px solid rgba(191,219,254,0.6)',
                boxShadow: '0 8px 24px -10px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.7)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                animation: `es-chip-float ${c.dur}s ease-in-out ${c.delay}s infinite`,
              }}
            >
              {c.text}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
