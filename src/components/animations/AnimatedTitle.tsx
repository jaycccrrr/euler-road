'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const mathSymbols = ['∫', '∑', '∏', '√', 'π', '∞', '∂', '∇', '≠', '≈', '≤', '≥', '∈', '∉', '∪', '∩', '∀', '∃', '⇒', '⇔', 'α', 'β', 'γ', 'δ', 'ε', 'θ', 'λ', 'μ', 'σ', 'φ', 'ω'];

interface FloatingSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function AnimatedTitle({ text = "Euler Road" }: { text?: string }) {
  const [floatingSymbols, setFloatingSymbols] = useState<FloatingSymbol[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const symbols: FloatingSymbol[] = [];
    for (let i = 0; i < 20; i++) {
      symbols.push({
        id: i,
        symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 16 + Math.random() * 32,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }
    setFloatingSymbols(symbols);
  }, []);

  return (
    <div className="relative">
      {/* 背景浮动数学符号 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingSymbols.map((item) => (
          <motion.span
            key={item.id}
            className="absolute text-blue-400/20 font-serif select-none"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: item.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [item.opacity, item.opacity * 2, item.opacity],
              rotate: [0, 360],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {item.symbol}
          </motion.span>
        ))}
      </div>

      {/* 数学公式背景 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse-slow">
        <span className="text-[8rem] md:text-[12rem] text-blue-300/50 font-serif select-none">
          ∑∫∂
        </span>
      </div>

      {/* 主标题 - CSS 动画，无延迟 */}
      <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-slate-900 tracking-tight">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="flex justify-center flex-wrap">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-letter-flip"
              style={{
                animationDelay: `${index * 0.03}s`,
                transformStyle: 'preserve-3d',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </h1>

      {/* 光晕效果 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 blur-3xl" />
      </div>
    </div>
  );
}
