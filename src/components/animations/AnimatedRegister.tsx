'use client';

import { useAnimation } from '@/contexts/AnimationContext';
import { AuthPanel } from './AuthPanel';

export function AnimatedRegister() {
  const { phase } = useAnimation();

  // 只在注册阶段显示（撕裂动画后）
  if (phase !== 'register' && phase !== 'register-success') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden">
      <AuthPanel />
    </div>
  );
}
