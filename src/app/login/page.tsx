'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { AuthSwitch } from '@/components/ui/auth-switch';
import { AuroraBackground } from '@/components/backgrounds/AuroraBackground';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuth();

  // 已登录用户直接回首页
  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace('/');
    }
  }, [hasHydrated, isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#f0f7ff]">
      <AuroraBackground />

      <div className="relative z-10 w-full flex flex-col items-center gap-6">
        <AuthSwitch
          defaultMode="login"
                    onLoginSuccess={() => router.push('/')}
          onRegisterSuccess={() => router.push('/')}
          onGuest={() => router.push('/')}
        />
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          返回首页
        </Link>
      </div>
    </div>
  );
}
