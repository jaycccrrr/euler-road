'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  dist: number;
}

interface StarFavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  /** 仅图标（用于题目卡片右上角） */
  iconOnly?: boolean;
  className?: string;
}

/**
 * 星形收藏按钮：点击切换收藏并向外迸发一圈金色粒子
 */
export function StarFavoriteButton({ active, onToggle, iconOnly = false, className }: StarFavoriteButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onToggle();
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const base = Date.now() + Math.random();
    const ps: Particle[] = Array.from({ length: 10 }, (_, i) => ({
      id: base + i,
      x: cx,
      y: cy,
      angle: (Math.PI * 2 * i) / 10 + Math.random() * 0.5,
      dist: 24 + Math.random() * 20,
    }));
    setParticles((prev) => [...prev, ...ps]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !ps.some((q) => q.id === p.id)));
    }, 650);
  };

  if (iconOnly) {
    return (
      <button
        onClick={handleClick}
        aria-label={active ? '取消收藏' : '收藏本题'}
        title={active ? '取消收藏' : '收藏本题'}
        className={cn(
          'relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-amber-500 hover:bg-amber-50 motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-90',
          className
        )}
      >
        <Star className={cn('w-5 h-5', active && 'text-amber-500 fill-amber-400')} />
        {particles.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none absolute w-1.5 h-1.5 rounded-full bg-amber-400 animate-particle"
            style={{
              left: p.x,
              top: p.y,
              ['--dx' as any]: `${Math.cos(p.angle) * p.dist}px`,
              ['--dy' as any]: `${Math.sin(p.angle) * p.dist}px`,
            }}
          />
        ))}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      title={active ? '取消收藏' : '收藏'}
      className={cn(
        'relative inline-flex items-center gap-1.5 text-sm font-medium motion-safe:transition-colors motion-safe:duration-200',
        active ? 'text-amber-500' : 'text-gray-500 hover:text-amber-500',
        className
      )}
    >
      <Star className={cn('w-4 h-4', active && 'fill-amber-400')} />
      {active ? '已收藏' : '收藏'}
      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute w-1.5 h-1.5 rounded-full bg-amber-400 animate-particle"
          style={{
            left: p.x,
            top: p.y,
            ['--dx' as any]: `${Math.cos(p.angle) * p.dist}px`,
            ['--dy' as any]: `${Math.sin(p.angle) * p.dist}px`,
          }}
        />
      ))}
    </button>
  );
}