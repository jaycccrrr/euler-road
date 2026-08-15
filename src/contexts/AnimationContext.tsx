'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type AnimationPhase =
  | 'intro'           // 开场：方格纸 + Euler Road 滚动
  | 'e-expand'        // E字母扩大
  | 'tear'            // 页面撕裂
  | 'register'        // 注册页面
  | 'register-success' // 注册完成动画
  | 'home'            // 主页完整显示
  | 'complete';       // 动画完成

interface AnimationContextType {
  phase: AnimationPhase;
  isNewUser: boolean;
  isRecentLogin: boolean;
  setPhase: (phase: AnimationPhase) => void;
  markAsRegistered: () => void;
  markAsLoggedIn: () => void;
  resetAnimation: () => void;
  skipIntro: () => void;
}

// 默认值用于 SSR
const defaultContext: AnimationContextType = {
  phase: 'complete',
  isNewUser: false,
  isRecentLogin: false,
  setPhase: () => {},
  markAsRegistered: () => {},
  markAsLoggedIn: () => {},
  resetAnimation: () => {},
  skipIntro: () => {},
};

const AnimationContext = createContext<AnimationContextType>(defaultContext);

const STORAGE_KEY = 'euler-road-animation-state';

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<AnimationPhase>('intro');
  const [isNewUser, setIsNewUser] = useState(true);
  const [isRecentLogin, setIsRecentLogin] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 从 localStorage 恢复状态
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let hasCompletedRegistration = false;

    if (stored) {
      try {
        const state = JSON.parse(stored);
        hasCompletedRegistration = !!state.hasCompletedRegistration;
        setIsNewUser(!hasCompletedRegistration);
      } catch {
        // 解析失败，保持默认新用户状态
      }
    }

    // 近期自动登录检测：如果用户一周内登录过且未主动登出，
    // 直接跳过开场动画进入首页
    if (!hasCompletedRegistration) {
      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const authState = JSON.parse(authStorage);
          const isAuthenticated = authState?.state?.isAuthenticated;
          const lastLoginAt = authState?.state?.lastLoginAt;
          if (isAuthenticated && lastLoginAt) {
            const lastLogin = new Date(lastLoginAt);
            const now = new Date();
            const diffDays = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
            if (diffDays <= 7) {
              setIsRecentLogin(true);
              // 标记为已完成注册，下次访问直接跳过动画
              const currentState = stored ? JSON.parse(stored) : {};
              localStorage.setItem(STORAGE_KEY, JSON.stringify({
                ...currentState,
                hasCompletedRegistration: true,
              }));
              // 近期登录用户跳过开场动画
              setPhase('complete');
            }
          }
        }
      } catch {
        // 检查失败，继续正常流程
      }
    }

    // 如果已经注册过，直接进入主页（跳过动画）
    if (hasCompletedRegistration) {
      setPhase('complete');
    }

    setIsHydrated(true);
  }, []);

  // 保存状态到 localStorage
  const saveState = useCallback((updates: { hasCompletedRegistration?: boolean }) => {
    const current = localStorage.getItem(STORAGE_KEY);
    const state = current ? JSON.parse(current) : {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, ...updates }));
  }, []);

  const markAsRegistered = useCallback(() => {
    setIsNewUser(false);
    saveState({ hasCompletedRegistration: true });
    setPhase('register-success');
  }, [saveState]);

  // 登录（已有账号）也视为已完成引导：持久化标记，下次访问不再重播开场动画
  const markAsLoggedIn = useCallback(() => {
    setIsNewUser(false);
    saveState({ hasCompletedRegistration: true });
  }, [saveState]);

  const resetAnimation = useCallback(() => {
    // 退出登录时重置为新用户状态
    setIsNewUser(true);
    setIsRecentLogin(false);
    saveState({ hasCompletedRegistration: false });
    setPhase('intro');
  }, [saveState]);

  const skipIntro = useCallback(() => {
    setPhase('complete');
  }, []);

  const handleSetPhase = useCallback((newPhase: AnimationPhase) => {
    setPhase(newPhase);
  }, []);

  // 防止服务端渲染和客户端渲染不匹配
  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <AnimationContext.Provider
      value={{
        phase,
        isNewUser,
        isRecentLogin,
        setPhase: handleSetPhase,
        markAsRegistered,
        markAsLoggedIn,
        resetAnimation,
        skipIntro,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}
