'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnimation } from '@/contexts/AnimationContext';
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import Header from '@/components/layout/Header';
import { EulerScene } from '@/components/home/EulerScene';
import { EulerWordmark } from '@/components/home/EulerWordmark';
import { ScrollWorld } from '@/components/home/ScrollWorld';
import { LandingSections } from '@/components/home/LandingSections';
import { TiltCard } from '@/components/home/TiltCard';
import Link from 'next/link';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

// §4 Apple 弹簧语义：临界阻尼（无过冲）为默认，回弹只留给有动量的手势
const SPRING_GENTLE = { type: 'spring', stiffness: 100, damping: 22 } as const;
const SPRING_SNAPPY = { type: 'spring', stiffness: 220, damping: 24 } as const;

const MODULES = [
  {
    name: '高中数学',
    en: 'High School',
    href: '/module/highschool-math/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 3L3 20h18L12 3z" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
  },
  {
    name: '高等数学',
    en: 'Calculus',
    href: '/module/advanced-math/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6 4v16M6 8c2-3 6-3 6 0s-4 5-6 8" />
        <path d="M14 4h6M17 4v16" />
      </svg>
    ),
  },
  {
    name: '线性代数',
    en: 'Linear Algebra',
    href: '/module/linear-algebra/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <line x1="4" y1="16" x2="20" y2="16" />
        <line x1="10" y1="4" x2="10" y2="20" />
        <line x1="16" y1="4" x2="16" y2="20" />
      </svg>
    ),
  },
];

export function AnimatedHome() {
  const { phase } = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const reduce = useReducedMotion();

  // 由 phase 派生入场延迟，替代 effect + setState
  // 'home'（首次进入，紧随过渡动画）延迟揭示；'complete'（已完成引导）立即呈现
  const isDelayed = phase === 'home';
  const navDelay = isDelayed ? 0.2 : 0;
  const base = isDelayed ? 0.6 : 0;

  // 滚动视差：3D 场景缓慢下沉淡出，内容轻微上移（§11 只动 transform/opacity）
  const { scrollY } = useScroll();
  const sceneOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const sceneY = useTransform(scrollY, [0, 600], [0, 140]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);

  // 鼠标跟随柔光（背景层，低频视觉）
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (phase !== 'home' && phase !== 'complete') return null;

  return (
    // §14 减动效：reducedMotion="user" 时 framer 自动禁用位移动画，仅保留透明度渐变
    <MotionConfig reducedMotion="user">
      <div className="bg-[#f0f7ff]">
        {/* 导航栏 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: navDelay }}
        >
          <Header />
        </motion.div>

        {/* Hero */}
        <section
          ref={heroRef}
          className="relative h-[calc(100vh-64px)] min-h-[640px] flex items-center justify-center overflow-hidden"
        >
          {/* 背景氛围（与滚动世界一致） */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#f0f7ff]" />
            <div className="absolute top-1/4 -left-40 w-[480px] h-[480px] rounded-full bg-[#93c5fd]/25 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-40 w-[480px] h-[480px] rounded-full bg-[#c7d2fe]/30 blur-[140px] pointer-events-none" />
            {/* 方格纸网格（与滚动世界一致） */}
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.14) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle 320px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(147,197,253,0.10) 0%, transparent 70%)`,
                transition: 'background 0.6s ease-out',
              }}
            />
          </div>

          {/* ===== 3D 数学场景（滚动视差：下沉淡出） ===== */}
          <motion.div
            className="absolute inset-0"
            style={reduce ? undefined : { opacity: sceneOpacity, y: sceneY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING_GENTLE, delay: base + 0.2 }}
            >
              <EulerScene />
            </motion.div>
          </motion.div>

          {/* 中心内容（滚动视差：轻微上移） */}
          <motion.div
            className="relative text-center px-4 max-w-4xl mx-auto z-10 pt-36 md:pt-44"
            style={reduce ? undefined : { y: contentY }}
          >
            {/* 标签 */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...SPRING_GENTLE, delay: base + 0.35 }}
              className="mb-6 mt-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-[#bfdbfe]/40 shadow-sm backdrop-blur-sm text-sm text-[#334155]/60">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                数学学习 · 每日挑战 · 社区交流
              </span>
            </motion.div>

            {/* 主标题 —— 活力字标（渐变末词 + 流光 + 下划线 + 逐字母漂浮） */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: base + 0.4 }}
            >
              <EulerWordmark base={base} />
            </motion.div>

            {/* 副标题 */}
            <motion.p
              className="text-xl md:text-2xl mb-3 font-light tracking-wide text-slate-400"
              style={{ fontFamily: 'var(--font-noto-serif-sc), "Noto Serif SC", Georgia, serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_GENTLE, delay: base + 1.0 }}
            >
              以实践驱动数学认知
            </motion.p>

            {/* 描述 */}
            <motion.p
              className="text-sm text-[#334155]/50 mb-7 max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_GENTLE, delay: base + 1.1 }}
            >
              高中数学 · 高等数学 · 线性代数<br />
              从基础概念到高级理论，通过每日挑战与社区互动掌握数学知识
            </motion.p>

            {/* CTA 按钮组 —— §1 按下即反馈 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_GENTLE, delay: base + 1.2 }}
            >
              <Link href="/daily/">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_SNAPPY}
                  className="group relative px-10 py-5 rounded-full text-lg font-semibold text-white overflow-hidden shadow-lg shadow-[#3b82f6]/25 hover:shadow-xl hover:shadow-[#3b82f6]/35"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa] via-[#93c5fd] to-[#3b82f6]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-3">
                    开始每日挑战
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <Link href="/courses/">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_SNAPPY}
                  className="group relative px-10 py-5 rounded-full text-lg font-semibold text-[#334155] border border-[#bfdbfe] hover:border-[#3b82f6] hover:text-[#1e293b] overflow-hidden bg-white/40 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa]/0 via-[#60a5fa]/10 to-[#60a5fa]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-3">
                    <Play className="w-5 h-5" />
                    浏览课程
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* 模块导航 —— 3D 倾斜玻璃卡 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_GENTLE, delay: base + 1.35 }}
            >
              {MODULES.map((mod) => (
                <Link key={mod.name} href={mod.href} className="group w-full sm:w-auto">
                  <TiltCard
                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/50 border border-[#bfdbfe]/50 backdrop-blur-md shadow-[0_8px_24px_-10px_rgba(59,130,246,0.25)] hover:border-[#3b82f6]/60 transition-colors"
                    intensity={10}
                  >
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa]/15 to-[#3b82f6]/15 border border-[#bfdbfe]/60 flex items-center justify-center text-[#3b82f6] group-hover:text-[#2563eb] transition-colors">
                      {mod.icon}
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-semibold text-[#1e293b]">{mod.name}</span>
                      <span className="block text-[11px] text-slate-400 tracking-wide">{mod.en}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 text-slate-300 group-hover:text-[#3b82f6] group-hover:translate-x-0.5 transition-all" />
                  </TiltCard>
                </Link>
              ))}
            </motion.div>

            {/* 今日挑战预览卡片 */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_GENTLE, delay: base + 1.5 }}
            >
              <Link href="/daily/" className="group inline-block">
                <TiltCard className="px-5 py-3 rounded-xl" intensity={6}>
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.35)',
                      backdropFilter: 'blur(24px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    }}
                  />
                  <div className="relative flex items-center gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center shadow-md shadow-[#60a5fa]/20">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[#3b82f6]">今日挑战</span>
                        <span className="flex gap-0.5">
                          {[1, 2, 3].map((s) => (
                            <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="#60a5fa" stroke="none">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[#1e293b] truncate mt-0.5">
                        求函数 f(x) = x³ - 3x² + 2 的极值点
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#3b82f6] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          </motion.div>

          {/* 下滑提示 */}
          <motion.div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: base + 1.9 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.div>
        </section>

        {/* ===== 滚动世界：滚动驱动相机飞越五大数学场景 ===== */}
        <ScrollWorld />

        {/* ===== 滚动落地区块：功能 / 纯粹 / 理论×实践 / 体验 / CTA ===== */}
        <LandingSections />
      </div>
    </MotionConfig>
  );
}
