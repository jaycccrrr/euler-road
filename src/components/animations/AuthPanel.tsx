'use client';

import { useAnimation } from '@/contexts/AnimationContext';
import { useRouter } from 'next/navigation';
import { AuthSwitch } from '@/components/ui/auth-switch';
import { AuroraBackground } from '@/components/backgrounds/AuroraBackground';

export function AuthPanel() {
  const router = useRouter();
  const { phase, setPhase, markAsRegistered, markAsLoggedIn } = useAnimation();

  // 只在注册/撕裂/成功阶段显示；intro 阶段作为虹膜揭示的底层提前渲染，避免白页
  if (phase !== 'register' && phase !== 'register-success' && phase !== 'tear' && phase !== 'intro') {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Aurora 极光背景 */}
      <AuroraBackground />

      <AuthSwitch
        className="relative z-10"
        onLoginSuccess={() => {
          markAsLoggedIn();
          setPhase('complete');
          router.push('/');
        }}
        onRegisterSuccess={() => {
          markAsRegistered();
          setPhase('register-success');
        }}
      />
    </div>
  );
}
