'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';

/**
 * ScrollWorld —— 滚动驱动的 3D 数学世界（飞越镜头）
 *
 * 滚动条即时间轴：相机从场景外俯冲、驻留（缓动在场景中心斜率≈0）、
 * 再侧摆穿过传送门环飞往下一个场景。5 个场景对应平台五大功能。
 *
 * Apple Design 映射：
 * - §3 可中断：相机进度由弹簧平滑（stiffness 90 / damping 24），反向滚动即从当前值折返
 * - §4 驻留缓动 E(x)=x−k·sin(2πx)/2π，整数点导数≈0 → 相机在每个场景自然减速停驻
 * - §11 只动 transform / opacity
 * - §14 prefers-reduced-motion：退化为静态纵向列表
 */

const N = 5; // 场景数
const D = 1000; // 场景间距（px，Z 轴）
const EASE_K = 0.85; // 驻留强度（1 = 完全停驻）

/** 驻留缓动：整数点导数 ≈ 0，相机在场景中心减速停驻 */
function camE(x: number) {
  return x - (EASE_K * Math.sin(2 * Math.PI * x)) / (2 * Math.PI);
}

/** 场景透明度：远处隐约可见 → 接近时清晰 → 穿过后消失（避免穿过相机后的镜像投影） */
function sceneOpacity(v: number, i: number) {
  const x = Math.min(N - 1, Math.max(0, v * (N - 1)));
  const rz = camE(x) - (i + 0.55); // 单位：D；相机驻留时 rz = -0.55
  if (rz >= 0.28) return 0;
  if (rz >= 0.05) return 1 - (rz - 0.05) / 0.23;
  if (rz >= -0.35) return 1;
  if (rz >= -2.2) return 1 - ((-0.35 - rz) / 1.85) * 0.9;
  return 0.1;
}

const GLASS_CARD: React.CSSProperties = {
  background: 'rgba(255,255,255,0.55)',
  backdropFilter: 'blur(14px) saturate(150%)',
  WebkitBackdropFilter: 'blur(14px) saturate(150%)',
  border: '1px solid rgba(191,219,254,0.65)',
  boxShadow: '0 18px 48px -16px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.7)',
};

const GLASS_TILE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(191,219,254,0.55)',
  boxShadow: '0 10px 28px -12px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.65)',
};

/* ================= 立体通用件 ================= */

/** 迷你玻璃公式立方体（自旋） */
function MiniCube({ size = 96, dur = 18 }: { size?: number; dur?: number }) {
  const half = size / 2;
  const faces = [
    `translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];
  const syms = ['π', '∫', 'Σ', 'e', 'Δ', '∞'];
  return (
    <div
      className="sw-anim relative"
      style={{
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        animation: `sw-cube ${dur}s linear infinite`,
      }}
    >
      {faces.map((t, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center rounded-xl"
          style={{
            transform: t,
            background:
              'linear-gradient(135deg, rgba(224,242,254,0.5) 0%, rgba(147,197,253,0.34) 60%, rgba(59,130,246,0.24) 100%)',
            border: '1px solid rgba(147,197,253,0.6)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <span
            className="font-bold select-none"
            style={{
              fontSize: size * 0.34,
              fontFamily: '"Playfair Display", Georgia, serif',
              background: 'linear-gradient(135deg, #1d4ed8, #38bdf8)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {syms[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

/** 漂浮玻璃标签片 */
function FloatChip({
  text,
  style,
  dur = 6,
  delay = 0,
  z = 60,
}: {
  text: string;
  style?: React.CSSProperties;
  dur?: number;
  delay?: number;
  z?: number;
}) {
  return (
    <div
      className="absolute whitespace-nowrap"
      style={{ ...style, transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}
    >
      <div
        className="sw-anim px-3.5 py-1.5 rounded-full text-xs text-slate-600"
        style={{ ...GLASS_TILE, animation: `sw-float ${dur}s ease-in-out ${delay}s infinite` }}
      >
        {text}
      </div>
    </div>
  );
}

/* ================= 五个场景的视觉 ================= */

/** ① 每日挑战：玻璃题卡 + 双层虚线环 + 轨道卫星片 */
function DailyVisual() {
  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      {/* 双层旋转虚线环 */}
      <div
        className="sw-anim absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#3b82f6]/25"
        style={{ animation: 'sw-spin 50s linear infinite' }}
      />
      <div
        className="sw-anim absolute left-1/2 top-1/2 w-[460px] h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#93c5fd]/30"
        style={{ animation: 'sw-spin-rev 34s linear infinite' }}
      />
      {/* 轨道卫星片（反向自转保持文字水平） */}
      <div
        className="sw-anim absolute left-1/2 top-1/2 w-[600px] h-[600px]"
        style={{ animation: 'sw-spin 28s linear infinite', transformStyle: 'preserve-3d' }}
      >
        <span className="absolute left-1/2 top-0">
          <span
            className="sw-anim block px-3.5 py-1.5 rounded-full text-xs text-slate-600 whitespace-nowrap"
            style={{ ...GLASS_TILE, animation: 'sw-spin-rev-c 28s linear infinite' }}
          >
            ✓ 今日 128 人已作答
          </span>
        </span>
        <span className="absolute left-1/2 bottom-0">
          <span
            className="sw-anim block px-3.5 py-1.5 rounded-full text-xs text-slate-600 whitespace-nowrap"
            style={{ ...GLASS_TILE, animation: 'sw-spin-rev-c 28s linear infinite' }}
          >
            🔥 连续 7 天
          </span>
        </span>
      </div>

      {/* 主题卡 */}
      <div className="relative w-[440px] rounded-3xl p-8" style={GLASS_CARD}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#0052FF]">
            Daily Challenge
          </span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
        </div>
        <p className="mt-4 text-lg text-slate-800 font-medium leading-relaxed">
          求 f(x) = x³ − 3x² + 2 的极值点
        </p>
        <div className="flex gap-1.5 mt-4">
          {[1, 2, 3].map((s) => (
            <svg key={s} width="17" height="17" viewBox="0 0 24 24" fill="#3b82f6">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <div className="mt-5 h-2 rounded-full bg-slate-200/70 overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#0052FF] to-[#4D7CFF]" />
        </div>
        <p className="text-xs text-slate-400 mt-2.5">今日进度 2 / 3</p>
      </div>

      <FloatChip text="⏰ 每天 5:00 更新" style={{ right: -64, top: -44 }} z={90} dur={6} />
      <FloatChip text="即时评分 · AI 批改" style={{ left: -72, bottom: -36 }} z={-60} dur={7} delay={1.2} />
    </div>
  );
}

/** ② 知识模块：四层叠放讲义板 + 迷你玻璃立方体 */
function ModulesVisual() {
  const layers = ['概念 · Concept', '例题 · Examples', '习题 · Practice', '挑战 · Challenge'];
  return (
    <div className="relative w-[460px] h-[360px]" style={{ transformStyle: 'preserve-3d' }}>
      {layers.map((t, i) => (
        <div
          key={t}
          className="absolute left-1/2 top-1/2 w-[400px] h-[72px] rounded-2xl flex items-center gap-4 px-6"
          style={{
            ...GLASS_CARD,
            transform: `translate(-50%,-50%) translateY(${(i - 1.5) * 66}px) translateZ(${(1.5 - i) * 56}px)`,
          }}
        >
          <span
            className="text-2xl bg-clip-text text-transparent font-bold"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              backgroundImage: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
            }}
          >
            0{i + 1}
          </span>
          <span className="text-base font-medium text-slate-700">{t}</span>
          <span className="ml-auto h-1.5 w-16 rounded-full bg-slate-200/70 overflow-hidden">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-[#0052FF] to-[#4D7CFF]"
              style={{ width: `${88 - i * 18}%` }}
            />
          </span>
        </div>
      ))}
      {/* 迷你玻璃立方体（右侧悬浮） */}
      <div
        className="absolute"
        style={{ right: -30, top: -40, transform: 'translateZ(90px)', transformStyle: 'preserve-3d' }}
      >
        <MiniCube size={92} dur={16} />
      </div>
      <FloatChip text="三科完整讲义" style={{ left: -30, bottom: -10 }} z={70} dur={6.4} delay={0.5} />
    </div>
  );
}

/** ③ 题库·笔记：3×3 符号瓦片矩阵 + 漂浮公式片 */
function BankVisual() {
  const symbols = ['∑', '∫', 'π', 'Δ', '√', '∞', 'θ', 'λ', 'φ'];
  const depths = [34, -20, 42, -26, 38, -18, 28, -32, 24];
  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      <div
        className="sw-anim relative grid grid-cols-3 gap-4"
        style={{ transformStyle: 'preserve-3d', animation: 'sw-sway 12s ease-in-out infinite' }}
      >
        {symbols.map((s, i) => (
          <div
            key={s}
            className="w-[104px] h-[104px] rounded-3xl flex items-center justify-center text-4xl text-slate-700"
            style={{
              ...GLASS_TILE,
              fontFamily: 'Georgia, serif',
              transform: `translateZ(${depths[i]}px)`,
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <FloatChip text="e^(iπ) + 1 = 0" style={{ left: -40, top: -52 }} z={110} dur={6.2} />
      <FloatChip text="按考点索引" style={{ right: -36, bottom: -44 }} z={-70} dur={7.2} delay={0.8} />
      <FloatChip text="∫ f(x) dx" style={{ right: -70, top: -30 }} z={60} dur={5.6} delay={1.5} />
    </div>
  );
}

/** ④ 社区：节点连线星座 + 雷达脉冲 */
function CommunityVisual() {
  const nodes = [
    { x: 56, y: 86, e: '🧑‍🎓' },
    { x: 170, y: 44, e: '👩‍🔬' },
    { x: 296, y: 100, e: '🤓' },
    { x: 406, y: 58, e: '🦉' },
    { x: 128, y: 238, e: '👨‍💻' },
    { x: 336, y: 238, e: '🚀' },
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [2, 5], [1, 4]];
  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      <svg width="470" height="300" aria-hidden style={{ transform: 'translateZ(30px)' }}>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#3b82f6"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="sw-anim"
            style={{ animation: `sw-dash ${2.6 + i * 0.3}s linear infinite` }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            {(i === 1 || i === 4) && (
              <circle
                cx={n.x}
                cy={n.y}
                r="30"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                className="sw-anim"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animation: `sw-ping2 3s ease-out ${i * 0.7}s infinite`,
                }}
              />
            )}
            <circle cx={n.x} cy={n.y} r="30" fill="rgba(255,255,255,0.85)" stroke="#bfdbfe" strokeWidth="1.5" />
            <text x={n.x} y={n.y} textAnchor="middle" dy="0.36em" fontSize="22">
              {n.e}
            </text>
          </g>
        ))}
      </svg>
      <FloatChip text="💬 解法 +1" style={{ right: -28, top: -8 }} z={80} dur={6.8} delay={0.6} />
      <FloatChip text="📝 笔记被收藏" style={{ left: -44, bottom: 10 }} z={-50} dur={7.4} delay={1.4} />
    </div>
  );
}

/** ⑤ π力成长：上升柱状 + 漂浮 π + 环形轨道 */
function PiVisual() {
  const bars = [52, 92, 132, 176, 224];
  return (
    <div className="relative flex items-end gap-4 h-[280px]" style={{ transformStyle: 'preserve-3d' }}>
      {/* 背景弧环 */}
      <div
        className="sw-anim absolute left-1/2 top-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#0052FF]/15"
        style={{ animation: 'sw-spin 44s linear infinite' }}
      />
      <span
        className="sw-anim absolute -top-28 left-1/2 -translate-x-1/2 text-8xl font-bold bg-clip-text text-transparent"
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          backgroundImage: 'linear-gradient(135deg, #0052FF, #4D7CFF)',
          textShadow: '0 0 28px rgba(77,124,255,0.35)',
          animation: 'sw-float 5s ease-in-out infinite',
        }}
      >
        π
      </span>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{ transform: `translateZ(${(i - 2) * 14}px)`, transformStyle: 'preserve-3d' }}
        >
          <div
            className="sw-anim w-16 rounded-t-2xl"
            style={{
              height: h,
              background: 'linear-gradient(to top, #0052FF, #4D7CFF)',
              boxShadow: '0 12px 26px -8px rgba(0,82,255,0.4)',
              opacity: 0.75 + i * 0.06,
              animation: `sw-bar 4.5s ease-in-out ${i * 0.4}s infinite`,
              transformOrigin: 'bottom',
            }}
          />
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-300/70" />
      <FloatChip text="+12 π力 · 昨日" style={{ right: -60, top: -10 }} z={90} dur={6} delay={0.4} />
      <FloatChip text="称号 · 欧拉学徒" style={{ left: -84, top: 40 }} z={-60} dur={7} delay={1.1} />
    </div>
  );
}

/* ================= 场景数据 ================= */

const SCENES = [
  {
    eyebrow: '01 · 每日挑战',
    title: '每天一道，保持手感',
    body: '每天 5:00 更新，三科精选题目轮换，当天作答、即时评分。',
    x: 150,
    y: 0,
    visual: <DailyVisual />,
  },
  {
    eyebrow: '02 · 知识模块',
    title: '讲义，层层递进',
    body: '概念、例题、习题环环相扣，从基础到进阶有迹可循。',
    x: -250,
    y: -70,
    visual: <ModulesVisual />,
  },
  {
    eyebrow: '03 · 题库 · 笔记',
    title: '把练习，沉淀为路径',
    body: '题库按考点索引，笔记与收藏构建你的专属复习路径。',
    x: 250,
    y: 80,
    visual: <BankVisual />,
  },
  {
    eyebrow: '04 · 社区交流',
    title: '在讨论中，碰撞思路',
    body: '分享解法与笔记，让答案因交流而更完整。',
    x: -250,
    y: -70,
    visual: <CommunityVisual />,
  },
  {
    eyebrow: '05 · π力成长',
    title: '看得见的坚持',
    body: '连续作答积累 π 力，称号与成长见证每一步。',
    x: 150,
    y: 30,
    visual: <PiVisual />,
  },
];

/** 空间漂浮粒子：散布在场景之间的纵深里，相机飞过时产生强视差 */
const PARTICLES: { s: string; x: number; y: number; z: number; size: number; dur: number; delay: number }[] = [
  { s: '∂', x: -560, y: -280, z: -300, size: 30, dur: 9, delay: 0 },
  { s: 'ξ', x: 540, y: 240, z: -520, size: 24, dur: 11, delay: 1 },
  { s: '√2', x: -480, y: 300, z: -900, size: 26, dur: 10, delay: 0.5 },
  { s: '∮', x: 560, y: -260, z: -1300, size: 32, dur: 12, delay: 2 },
  { s: 'φ', x: -600, y: -100, z: -1700, size: 24, dur: 9.5, delay: 0.8 },
  { s: 'ε', x: 500, y: 300, z: -2100, size: 28, dur: 10.5, delay: 1.6 },
  { s: '∇', x: -520, y: 260, z: -2500, size: 30, dur: 11.5, delay: 0.3 },
  { s: 'λ', x: 580, y: -240, z: -2900, size: 26, dur: 9.8, delay: 2.2 },
  { s: 'Ω', x: -540, y: -300, z: -3300, size: 32, dur: 12.5, delay: 1.2 },
  { s: 'θ', x: 520, y: 220, z: -3700, size: 26, dur: 10.2, delay: 0.6 },
  { s: '∞', x: -560, y: 120, z: -4100, size: 34, dur: 11.2, delay: 1.9 },
  { s: 'e', x: 540, y: -180, z: -4400, size: 28, dur: 9.2, delay: 0.2 },
];

/* ================= 子组件 ================= */

/** 3D 场景层：透明度随相机距离变化 */
function SceneLayer({
  p,
  i,
  x,
  y,
  children,
}: {
  p: MotionValue<number>;
  i: number;
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(p, (v) => sceneOpacity(v, i));
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        opacity,
        transform: `translate(-50%,-50%) translate3d(${x}px, ${y}px, ${-(i + 0.55) * D}px)`,
        transformStyle: 'preserve-3d',
      }}
      aria-hidden
    >
      {children}
    </motion.div>
  );
}

/** 传送门环：位于相邻场景之间，相机穿越而过 */
function PortalLayer({ p, i }: { p: MotionValue<number>; i: number }) {
  const opacity = useTransform(p, (v) => sceneOpacity(v, i + 0.45) * 0.9);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        opacity,
        transform: `translate(-50%,-50%) translateZ(${-(i + 1) * D}px)`,
        transformStyle: 'preserve-3d',
      }}
      aria-hidden
    >
      <div
        className="sw-anim w-[920px] h-[920px] rounded-full"
        style={{
          border: '2px dashed rgba(59,130,246,0.20)',
          transform: 'translate(-50%,-50%)',
          animation: `sw-spin-c ${46 + i * 6}s linear infinite`,
        }}
      />
      <div
        className="sw-anim absolute left-1/2 top-1/2 w-[680px] h-[680px] rounded-full"
        style={{
          border: '1px solid rgba(147,197,253,0.28)',
          boxShadow: '0 0 60px rgba(147,197,253,0.15) inset',
          transform: 'translate(-50%,-50%)',
          animation: `sw-spin-rev-c ${34 + i * 5}s linear infinite`,
        }}
      />
      {/* 环上四颗符号卫星 */}
      {[0, 90, 180, 270].map((a, k) => (
        <span
          key={a}
          className="absolute left-1/2 top-1/2 text-2xl"
          style={{
            fontFamily: 'Georgia, serif',
            color: 'rgba(59,130,246,0.5)',
            transform: `rotate(${a}deg) translateX(460px) rotate(${-a}deg) translate(-50%,-50%)`,
          }}
        >
          {['π', '∫', 'Σ', 'e'][k]}
        </span>
      ))}
    </motion.div>
  );
}

/** 文案层：在相机驻留窗口内淡入淡出 */
function CopyLayer({
  p,
  i,
  eyebrow,
  title,
  body,
}: {
  p: MotionValue<number>;
  i: number;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const w = 0.085;
  const pc = i / (N - 1);
  const stops = i === 0 ? [0, 0.045, 0.09] : i === N - 1 ? [pc - w, pc - w * 0.4, 1] : [pc - w, pc - w * 0.4, pc + w * 0.4, pc + w];
  const outs = i === 0 ? [1, 1, 0] : i === N - 1 ? [0, 1, 1] : [0, 1, 1, 0];
  const opacity = useTransform(p, stops, outs);
  const y = useTransform(p, stops, outs.map((o) => (o === 0 ? 26 : 0)));
  const side = i % 2 === 0;

  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center ${
        side ? 'md:justify-start' : 'md:justify-end'
      }`}
      style={{ opacity, y }}
    >
      <div
        className={`max-w-xs md:max-w-md px-6 md:px-0 text-center ${
          side ? 'md:text-left md:ml-[6%]' : 'md:text-right md:mr-[6%]'
        }`}
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#0052FF]">{eyebrow}</p>
        <h3
          className="mt-3 text-3xl md:text-5xl text-slate-900 leading-[1.15]"
          style={{ fontFamily: '"Playfair Display", Georgia, "Noto Serif SC", serif' }}
        >
          {title}
        </h3>
        <p className="mt-4 text-sm md:text-base text-slate-500 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

/** 进度圆点 */
function Dot({ p, i }: { p: MotionValue<number>; i: number }) {
  const act = useTransform(p, (v) => Math.max(0, 1 - Math.abs(v * (N - 1) - i)));
  const scale = useTransform(act, (a) => 1 + 0.6 * a);
  const opacity = useTransform(act, (a) => 0.3 + 0.7 * a);
  return <motion.span className="w-2 h-2 rounded-full bg-[#0052FF]" style={{ scale, opacity }} />;
}

/* ================= 主组件 ================= */

export function ScrollWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // §3/§4 弹簧平滑：反向滚动从当前值折返，天然可中断
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  // 指针视差（世界整体微倾）
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const srx = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 150, damping: 25 });
  const sry = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, mx, my]);

  // 相机轨迹：Z 轴驻留缓动推进 + X/Y 侧摆（飞越 hop 的弧线）
  const camZ = useTransform(p, (v) => D * camE(Math.min(N - 1, Math.max(0, v * (N - 1)))));
  const worldX = useTransform(p, (v) => -120 * Math.sin(Math.min(1, Math.max(0, v)) * (N - 1) * Math.PI));
  const worldY = useTransform(p, (v) => 42 * Math.sin(Math.min(1, Math.max(0, v)) * (N - 1) * Math.PI * 0.8 + 1.1));
  const worldTransform = useMotionTemplate`rotateX(${srx}deg) rotateY(${sry}deg) translate3d(${worldX}px, ${worldY}px, ${camZ}px)`;

  // §14 减动效：静态纵向列表
  if (reduce) {
    return (
      <section className="py-24 bg-[#f0f7ff]">
        <div className="max-w-2xl mx-auto px-6 space-y-14">
          {SCENES.map((s) => (
            <div key={s.eyebrow}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#0052FF]">{s.eyebrow}</p>
              <h3
                className="mt-3 text-3xl text-slate-900"
                style={{ fontFamily: '"Playfair Display", Georgia, "Noto Serif SC", serif' }}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-slate-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `${(N - 1) * 85 + 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: 1300 }}>
        <style>{`
          @keyframes sw-spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
          @keyframes sw-spin-rev { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
          @keyframes sw-spin-c { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
          @keyframes sw-spin-rev-c { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
          @keyframes sw-cube {
            from { transform: rotateX(-20deg) rotateY(0deg); }
            to   { transform: rotateX(-20deg) rotateY(360deg); }
          }
          @keyframes sw-float {
            0%, 100% { transform: translateY(-8px); }
            50%      { transform: translateY(8px); }
          }
          @keyframes sw-sway {
            0%, 100% { transform: rotateY(-7deg); }
            50%      { transform: rotateY(7deg); }
          }
          @keyframes sw-dash { to { stroke-dashoffset: -20; } }
          @keyframes sw-drift {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(-4deg); }
            50%      { transform: translate3d(16px, -22px, 40px) rotate(5deg); }
          }
          @keyframes sw-ping2 {
            0% { transform: scale(1); opacity: 0.55; }
            80%, 100% { transform: scale(2); opacity: 0; }
          }
          @keyframes sw-bar {
            0%, 100% { transform: scaleY(1); }
            50%      { transform: scaleY(1.06); }
          }
          @media (prefers-reduced-motion: reduce) {
            .sw-anim { animation: none !important; }
          }
        `}</style>

        {/* 背景氛围：延续首页浅蓝 + 光晕 */}
        <div className="absolute inset-0 bg-[#f0f7ff]" />
        <div className="absolute top-1/4 -left-40 w-[480px] h-[480px] rounded-full bg-[#93c5fd]/25 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-[#c7d2fe]/30 blur-[140px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.14) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* 3D 世界（移动端整体缩小） */}
        <div
          className="absolute inset-0 scale-[0.66] sm:scale-[0.82] lg:scale-100"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ transform: worldTransform, transformStyle: 'preserve-3d' }}
          >
            {/* 空间漂浮粒子（贯穿全程的纵深视差） */}
            {PARTICLES.map((pt, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%,-50%) translate3d(${pt.x}px, ${pt.y}px, ${pt.z}px)`,
                  transformStyle: 'preserve-3d',
                }}
                aria-hidden
              >
                <span
                  className="sw-anim block"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: pt.size,
                    color: 'rgba(59,130,246,0.32)',
                    animation: `sw-drift ${pt.dur}s ease-in-out ${pt.delay}s infinite`,
                  }}
                >
                  {pt.s}
                </span>
              </div>
            ))}

            {/* 场景之间的传送门环 */}
            {Array.from({ length: N - 1 }, (_, i) => (
              <PortalLayer key={i} p={p} i={i} />
            ))}

            {SCENES.map((s, i) => (
              <SceneLayer key={s.eyebrow} p={p} i={i} x={s.x} y={s.y}>
                {s.visual}
              </SceneLayer>
            ))}
          </motion.div>
        </div>

        {/* 文案层 */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {SCENES.map((s, i) => (
            <CopyLayer key={s.eyebrow} p={p} i={i} eyebrow={s.eyebrow} title={s.title} body={s.body} />
          ))}
        </div>

        {/* 进度轨道 */}
        <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
          {SCENES.map((s, i) => (
            <Dot key={s.eyebrow} p={p} i={i} />
          ))}
        </div>

        {/* 上下边缘渐隐（距离雾） */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f0f7ff] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f0f7ff] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}

export default ScrollWorld;
