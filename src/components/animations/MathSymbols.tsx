'use client';

import { useEffect, useState } from 'react';

interface Symbol {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  direction: 'left' | 'right';
}

const MATH_SYMBOLS = ['∫', '∑', 'π', '√', '∞', '∂', '∆', '∏', '∇', 'α', 'β', 'γ', 'θ', 'λ', 'μ', 'σ', 'φ', 'ψ', 'Ω', '≈', '≠', '≤', '≥', '∈', '∉', '∪', '∩', '⊂', '⊃', '∴', '∵'];

export function MathSymbols() {
  const [symbols, setSymbols] = useState<Symbol[]>([]);

  useEffect(() => {
    const generated: Symbol[] = [];
    for (let i = 0; i < 25; i++) {
      generated.push({
        id: i,
        char: MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 24 + 16,
        opacity: Math.random() * 0.15 + 0.05,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        direction: Math.random() > 0.5 ? 'left' : 'right',
      });
    }
    setSymbols(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol) => (
        <span
          key={symbol.id}
          className="absolute font-serif text-slate-400 select-none animate-float-symbol"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}px`,
            opacity: symbol.opacity,
            animationDuration: `${symbol.duration}s`,
            animationDelay: `${symbol.delay}s`,
            ['--float-direction' as string]: symbol.direction === 'left' ? '-1' : '1',
          }}
        >
          {symbol.char}
        </span>
      ))}

      {/* 几何图形装饰 */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-slate-200 rounded-full opacity-20 animate-rotate-slow" />
      <div className="absolute top-40 right-20 w-24 h-24 border-2 border-slate-300 rotate-45 opacity-10 animate-pulse-soft" />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg opacity-30 animate-float" />
      <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-slate-200 opacity-15 animate-rotate-slow" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />

      {/* 坐标轴线条 */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
