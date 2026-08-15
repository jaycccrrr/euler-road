'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'lg';
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export function GlassButton({
  children,
  variant = 'primary',
  size = 'default',
  onClick,
  className = '',
  icon,
}: GlassButtonProps) {
  const isPrimary = variant === 'primary';
  const isLarge = size === 'lg';

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-full font-semibold
        transition-all duration-300
        ${isLarge ? 'px-10 py-7 text-xl' : 'px-8 py-6 text-lg'}
        ${isPrimary
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* 玻璃反光效果层 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: { duration: 0.5, ease: 'easeInOut' }
        }}
      >
        <div className={`
          absolute inset-0 -skew-x-12 w-[200%]
          ${isPrimary
            ? 'bg-gradient-to-r from-transparent via-white/60 to-transparent'
            : 'bg-gradient-to-r from-transparent via-slate-300/50 to-transparent'}
        `} />
      </motion.div>

      {/* 高光边缘 */}
      <div className={`
        absolute inset-0 rounded-full pointer-events-none
        ${isPrimary
          ? 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.1)]'
          : 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.1)]'}
      `} />

      {/* 内容 */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>

      {/* 底部光晕 */}
      <div className={`
        absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2
        blur-xl opacity-60 pointer-events-none
        ${isPrimary
          ? 'bg-gradient-to-t from-green-400/60 to-transparent'
          : 'bg-gradient-to-t from-slate-300/40 to-transparent'}
      `} />
    </motion.button>
  );
}
