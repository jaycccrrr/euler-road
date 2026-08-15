'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * TiltCard —— 指针跟随的 3D 倾斜玻璃卡片
 *
 * Apple Design 映射：
 * - §2 直接操作：倾斜角度与指针位置 1:1 对应。
 * - §4/§3 弹簧 + 可中断：指针移出时由临界阻尼弹簧从当前角度平滑回正，无"砖墙"跳变。
 * - §12 材质：高光随指针移动（glare），玻璃面在光下"活"起来。
 * - §1 即时反馈：whileTap scale 0.97，按下即响应。
 * - §14 减动效：prefers-reduced-motion 时禁用倾斜。
 */
export function TiltCard({
  children,
  className = '',
  intensity = 9,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 25, mass: 1 });
  const sy = useSpring(my, { stiffness: 150, damping: 25, mass: 1 });

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const glareX = useTransform(sx, [0, 1], ['20%', '80%']);
  const glareY = useTransform(sy, [0, 1], ['15%', '85%']);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle 180px at ${x} ${y}, rgba(255,255,255,0.55) 0%, transparent 65%)`
  );

  const handleMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    // 回中——弹簧从当前值接管，平滑无跳变
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden ${className}`}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
    >
      {/* 随指针移动的材质高光 */}
      {!reduce && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glare }}
        />
      )}
      {children}
    </motion.div>
  );
}
