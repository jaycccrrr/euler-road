'use client';

/**
 * AuthMathScene —— 登录/注册彩色面板内的 3D 数学微场景
 *
 * 玻璃公式立方体 + 单层符号轨道 + 漂浮符号，白瓷质感，衬在蓝色渐变上。
 * 纯 CSS 动画（transform/opacity），prefers-reduced-motion 时整体冻结。
 */

const CUBE = 84;
const HALF = CUBE / 2;

const FACES: { t: string; symbol: string }[] = [
  { t: `translateZ(${HALF}px)`, symbol: 'π' },
  { t: `rotateY(180deg) translateZ(${HALF}px)`, symbol: '∫' },
  { t: `rotateY(90deg) translateZ(${HALF}px)`, symbol: 'Σ' },
  { t: `rotateY(-90deg) translateZ(${HALF}px)`, symbol: 'e' },
  { t: `rotateX(90deg) translateZ(${HALF}px)`, symbol: 'Δ' },
  { t: `rotateX(-90deg) translateZ(${HALF}px)`, symbol: '∞' },
];

const ORBIT_SYMBOLS = ['π', 'e', 'i', 'φ'];

const FLOATERS: { s: string; style: React.CSSProperties; dur: number; delay: number }[] = [
  { s: '∑', style: { top: '12%', left: '14%' }, dur: 6, delay: 0 },
  { s: '∞', style: { bottom: '16%', right: '12%' }, dur: 7.4, delay: 0.8 },
  { s: '∫', style: { top: '18%', right: '16%' }, dur: 6.8, delay: 1.4 },
  { s: 'Δ', style: { bottom: '20%', left: '10%' }, dur: 8, delay: 0.4 },
];

export function AuthMathScene() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: 900 }}
      aria-hidden
    >
      <style>{`
        @keyframes ams-cube-spin {
          from { transform: rotateX(-20deg) rotateY(0deg); }
          to   { transform: rotateX(-20deg) rotateY(360deg); }
        }
        @keyframes ams-orbit-cw  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ams-orbit-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes ams-float {
          0%, 100% { transform: translateY(-8px); opacity: 0.55; }
          50%      { transform: translateY(8px);  opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ams-anim { animation: none !important; }
        }
      `}</style>

      {/* 中心舞台 */}
      <div
        className="absolute left-1/2 top-[38%]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 玻璃公式立方体 */}
        <div
          className="ams-anim relative"
          style={{
            width: CUBE,
            height: CUBE,
            marginLeft: -HALF,
            marginTop: -HALF,
            transformStyle: 'preserve-3d',
            animation: 'ams-cube-spin 22s linear infinite',
          }}
        >
          {FACES.map((f, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center rounded-lg"
              style={{
                transform: f.t,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0.06) 100%)',
                border: '1px solid rgba(255,255,255,0.45)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <span
                className="text-3xl font-bold select-none text-white"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  textShadow: '0 0 18px rgba(255,255,255,0.55)',
                }}
              >
                {f.symbol}
              </span>
            </div>
          ))}
        </div>

        {/* 符号轨道 */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(70deg)' }}
        >
          <div
            className="ams-anim relative"
            style={{
              width: 240,
              height: 240,
              marginLeft: -120,
              marginTop: -120,
              transformStyle: 'preserve-3d',
              animation: 'ams-orbit-cw 16s linear infinite',
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            />
            {ORBIT_SYMBOLS.map((s, i) => {
              const a = (360 / ORBIT_SYMBOLS.length) * i;
              return (
                <span
                  key={i}
                  className="ams-anim absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${a}deg) translateX(120px) rotate(${-a}deg)`,
                    animation: 'ams-orbit-ccw 16s linear infinite',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full text-sm text-white"
                    style={{
                      transform: 'rotateX(-70deg) translate(-50%, -50%)',
                      background: 'rgba(255,255,255,0.16)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      backdropFilter: 'blur(6px)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
                    }}
                  >
                    {s}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 角落漂浮符号 */}
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="ams-anim absolute text-2xl font-serif italic text-white/60 select-none"
          style={{
            ...f.style,
            textShadow: '0 0 14px rgba(255,255,255,0.4)',
            animation: `ams-float ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        >
          {f.s}
        </span>
      ))}
    </div>
  );
}

export default AuthMathScene;
