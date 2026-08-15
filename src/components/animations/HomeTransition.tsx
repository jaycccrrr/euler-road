'use client';

import { useEffect, useState } from 'react';
import { useAnimation } from '@/contexts/AnimationContext';
import { useRouter } from 'next/navigation';

export function HomeTransition() {
  const { phase, setPhase } = useAnimation();
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== 'register-success') return;

    // 动画序列
    const sequence = async () => {
      // 1. 蓝色背景渐变为白色方格纸
      const bgTimer = setInterval(() => {
        setProgress((p) => {
          if (p >= 1) {
            clearInterval(bgTimer);
            return 1;
          }
          return p + 0.02;
        });
      }, 30);

      // 等待背景动画完成
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 2. 进入主页显示阶段
      setPhase('home');

      // 3. 短暂延迟后标记为完成
      setTimeout(() => {
        setPhase('complete');
      }, 2000);
    };

    sequence();
  }, [phase, setPhase]);

  if (phase !== 'register-success') return null;

  return (
    <div
      className="fixed inset-0 z-[80] pointer-events-none"
      style={{
        background:
          progress < 0.5
            ? `linear-gradient(135deg,
                rgba(219, 234, 254, ${1 - progress * 2}) 0%,
                rgba(191, 219, 254, ${1 - progress * 2}) 50%,
                rgba(147, 197, 253, ${1 - progress * 2}) 100%)`
            : '#faf8f3',
        opacity: 1,
        transition: 'background 0.1s linear',
      }}
    >
      {/* 渐变到方格纸的过渡 */}
      {progress > 0.3 && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(#e2e8f0 1px, transparent 1px),
              linear-gradient(90deg, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: (progress - 0.3) / 0.7,
          }}
        />
      )}

      {/* Euler Road 重新入场 */}
      {progress > 0.6 && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: (progress - 0.6) / 0.4,
            transform: `translateY(${(1 - (progress - 0.6) / 0.4) * 50}px)`,
          }}
        >
          <div
            style={{
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 400,
              letterSpacing: '0.05em',
              color: '#1e293b',
            }}
          >
            {'Euler Road'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  opacity: progress > 0.6 + index * 0.03 ? 1 : 0,
                  transform:
                    progress > 0.6 + index * 0.03
                      ? 'translateY(0)'
                      : 'translateY(30px)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
