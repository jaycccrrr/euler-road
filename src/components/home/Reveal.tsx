'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal —— 滚动入场容器
 * Minimalist Modern：0.7s easeOut、28px 上移、进入视口 15% 触发一次
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionLabel —— 区块标签胶囊（脉冲圆点 + 等宽大写）
 */
export function SectionLabel({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? 'inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2'
          : 'inline-flex items-center gap-3 rounded-full border border-[#0052FF]/30 bg-[#0052FF]/5 px-5 py-2'
      }
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
            dark ? 'bg-[#4D7CFF]' : 'bg-[#4D7CFF]'
          }`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            dark ? 'bg-[#7DA2FF]' : 'bg-[#0052FF]'
          }`}
        />
      </span>
      <span
        className={`font-mono text-xs uppercase tracking-[0.15em] ${
          dark ? 'text-[#7DA2FF]' : 'text-[#0052FF]'
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/** 渐变文字（签名渐变，深/浅底通用） */
export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: 'linear-gradient(to right, #0052FF, #4D7CFF)' }}
    >
      {children}
    </span>
  );
}
