'use client';

import { motion } from 'framer-motion';
import { EASE_OUT } from './Reveal';

const W = 440;
const H = 220;
const PAD = 20;

// y = sin(x) 采样路径
const points: string[] = [];
for (let x = 0; x <= W; x += 8) {
  const y = H / 2 - 70 * Math.sin((x / W) * Math.PI * 2);
  points.push(`${x === 0 ? 'M' : 'L'}${x + PAD},${y.toFixed(1)}`);
}
const CURVE = points.join(' ');
const AREA = `${CURVE} L${W + PAD},${H - 30} L${PAD},${H - 30} Z`;

/**
 * MathCurve —— 自绘正弦曲线 + 积分面积（理论 × 实践的视觉隐喻）
 * 进入视口时描边绘制一次，随后面积淡入、终点圆点脉冲。
 */
export function MathCurve() {
  return (
    <svg viewBox={`0 0 ${W + PAD * 2} ${H}`} className="w-full h-auto" role="img" aria-label="函数 f(x)=sin x 与其积分面积示意图">
      <defs>
        <linearGradient id="mc-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0052FF" />
          <stop offset="100%" stopColor="#4D7CFF" />
        </linearGradient>
        <linearGradient id="mc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0052FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4D7CFF" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* 坐标轴 */}
      <line x1={PAD} y1={H - 30} x2={W + PAD - 6} y2={H - 30} stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1={PAD + 6} y1={14} x2={PAD + 6} y2={H - 24} stroke="#CBD5E1" strokeWidth="1.5" />
      <path d={`M${W + PAD - 10},${H - 34} l10,4 l-10,4`} fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d={`M${PAD + 2},20 l4,-10 l4,10`} fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* 中线（x轴） */}
      <line x1={PAD} y1={H / 2} x2={W + PAD} y2={H / 2} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 6" />

      {/* 积分面积 */}
      <motion.path
        d={AREA}
        fill="url(#mc-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay: 1.0, ease: EASE_OUT }}
      />

      {/* 正弦曲线：描边绘制 */}
      <motion.path
        d={CURVE}
        fill="none"
        stroke="url(#mc-stroke)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      {/* 终点圆点 + 脉冲环 */}
      <motion.circle
        cx={W + PAD}
        cy={H / 2}
        r="5"
        fill="#0052FF"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.7 }}
        style={{ transformOrigin: `${W + PAD}px ${H / 2}px` }}
      />
      <motion.circle
        cx={W + PAD}
        cy={H / 2}
        r="5"
        fill="none"
        stroke="#4D7CFF"
        strokeWidth="1.5"
        initial={{ scale: 1, opacity: 0 }}
        whileInView={{ scale: [1, 2.2], opacity: [0.8, 0] }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, delay: 2.0, repeat: Infinity, ease: 'easeOut' }}
        style={{ transformOrigin: `${W + PAD}px ${H / 2}px` }}
      />

      {/* 标注 */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <text x={PAD + 150} y={40} fontSize="15" fontStyle="italic" fill="#334155" fontFamily="Georgia, serif">
          f(x) = sin x
        </text>
        <text x={PAD + 250} y={H - 60} fontSize="14" fontStyle="italic" fill="#64748B" fontFamily="Georgia, serif">
          ∫ f(x) dx
        </text>
      </motion.g>
    </svg>
  );
}

export default MathCurve;
