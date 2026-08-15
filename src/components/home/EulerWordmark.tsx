'use client';

import { motion } from 'framer-motion';

// §4 Apple 弹簧语义：临界阻尼为默认，字母悬停的小弹跳是唯一允许"活泼"的地方
const SPRING_SOFT = { type: 'spring', stiffness: 130, damping: 19 } as const;
// 悬停层专用：欠阻尼弹簧，松开时带回弹缓冲而非直落
const SPRING_HOVER = { type: 'spring', stiffness: 240, damping: 16 } as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * EulerWordmark —— 首页活力字标（呼吸版）
 *
 * Minimalist Modern 映射：
 * - 末词 "Road" 使用签名渐变（#0052FF → #4D7CFF）+ 慢速呼吸流光
 * - 渐变下划线（gradient-underline）在字母入场后展开，随后缓慢明灭
 * - 逐字母柔和弹簧入场 + 错峰有机漂浮（每字母独立振幅/周期/相位，非机械同步）
 * - 整体字标缓慢"呼吸"缩放
 * - §15 大字负字距、紧凑行高
 */
export function EulerWordmark({ base = 0 }: { base?: number }) {
  const renderLetter = (letter: string, i: number, isRoad: boolean) => {
    // 每个字母的呼吸参数不同：振幅、周期、相位错峰 → 有机起伏而非机械同步
    const amp = 3 + (i % 3) * 1.4;
    const dur = 3.8 + (i % 4) * 0.45;
    const phase = (i * 0.31) % 1.4;
    return (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ opacity: 0, y: 46, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ ...SPRING_SOFT, delay: base + 0.55 + i * 0.05 + (i % 2) * 0.025 }}
      >
        {/* 悬停层独立于漂浮层：移出时由 SPRING_HOVER 弹簧缓动带回，避免直落 */}
        <motion.span
          className="inline-block"
          transition={SPRING_HOVER}
          whileHover={{ y: -10, rotate: isRoad ? 3 : -3 }}
        >
          <motion.span
            className={
              isRoad
                ? 'ew-road inline-block bg-clip-text text-transparent'
                : 'inline-block text-slate-800'
            }
            style={
              isRoad
                ? {
                    backgroundImage: 'linear-gradient(90deg, #0052FF, #4D7CFF, #60a5fa, #0052FF)',
                    backgroundSize: '220% 100%',
                    animation: 'ew-sheen 9s ease-in-out infinite',
                  }
                : undefined
            }
            animate={{ y: [0, -amp, 0, amp * 0.45, 0] }}
            transition={{
              duration: dur,
              times: [0, 0.34, 0.56, 0.8, 1],
              repeat: Infinity,
              ease: 'easeInOut',
              delay: base + 1.4 + phase,
            }}
          >
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        </motion.span>
      </motion.span>
    );
  };

  return (
    <motion.h1
      className="text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-[-0.02em] select-none origin-center"
      style={{ fontFamily: '"Playfair Display", Georgia, "Noto Serif SC", serif', fontWeight: 700 }}
      animate={{ scale: [1, 1.012, 1] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: base + 2 }}
    >
      <style>{`
        @keyframes ew-sheen {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 110% 50%; }
          100% { background-position: 220% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ew-road { animation: none !important; }
        }
      `}</style>

      {'Euler '.split('').map((letter, i) => renderLetter(letter, i, false))}

      <span className="relative inline-block">
        {'Road'.split('').map((letter, i) => renderLetter(letter, 6 + i, true))}
        {/* 渐变下划线：入场展开（外层）→ 缓慢明灭呼吸（内层） */}
        <motion.span
          className="absolute -bottom-2 md:-bottom-3 left-0 h-2.5 md:h-3.5 w-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: base + 1.2 }}
        >
          <motion.span
            className="block h-full w-full rounded-sm"
            style={{
              background: 'linear-gradient(to right, rgba(0,82,255,0.18), rgba(77,124,255,0.10))',
            }}
            animate={{ opacity: [0.85, 0.45, 0.85] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: base + 2.4 }}
          />
        </motion.span>
      </span>
    </motion.h1>
  );
}

export default EulerWordmark;
