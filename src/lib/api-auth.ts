// 前端与后端（API Routes + Supabase）之间的用户映射与同步辅助
import type { User } from '@/types';
import { initModuleData, getPrimaryTitle, getPrimaryFrame } from '@/lib/gamification';
import { authAPI } from '@/lib/api-client';

export function setApiToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) {
    window.localStorage.setItem('token', token);
  } else {
    window.localStorage.removeItem('token');
  }
}

export function getApiToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('token');
}

export function hasApiToken(): boolean {
  return !!getApiToken();
}

/** 把后端返回的用户对象补全为前端完整的 User（本地特性字段用默认值） */
export function apiUserToLocalUser(apiUser: any, passwordHash = ''): User {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const moduleData = parseModuleData(apiUser?.moduleData);

  return {
    id: apiUser.id,
    nickname: apiUser.nickname,
    passwordHash: passwordHash || apiUser.passwordHash || '',
    avatar: apiUser.avatar || '👤',
    moduleData,
    displayCategory: apiUser.displayCategory || 'math',
    favoritePosts: apiUser.favoritePosts || [],
    favoriteQuestions: [],
    following: [],
    privacy: { showFollowing: true, showFollowers: true, showBio: true },
    piPower: {
      currentPi: 0,
      monthlyPi: 0,
      totalAnswered: 0,
      monthlyAnswered: 0,
      lastAnswerDate: null,
      currentStreak: 0,
      monthlyResetDate: nextMonth.toISOString(),
      dailyAttempts: {},
    },
    eulerTitleHistory: [],
    level: moduleData.math?.level ?? 1,
    experience: moduleData.math?.exp ?? 0,
    title: getPrimaryTitle(moduleData).title,
    frame: getPrimaryFrame(moduleData),
    isAdmin: !!apiUser.isAdmin,
    createdAt: apiUser.createdAt || now.toISOString(),
    lastLoginAt: apiUser.lastLoginAt || now.toISOString(),
  };
}

/** 后端有会话时，把用户资料中的后端字段同步上去（最佳努力，失败不影响本地） */
export async function syncUserToApi(user: User): Promise<void> {
  if (!hasApiToken()) return;
  await authAPI.updateProfile({
    avatar: user.avatar,
    displayCategory: user.displayCategory,
    moduleData: user.moduleData,
    favoritePosts: user.favoritePosts || [],
  });
}

/** 把异常信息转换成更友好的提示 */
export function apiErrorMessage(err: unknown, fallback: string): string {
  const msg = err instanceof Error ? err.message : '';
  if (/fetch|network|load failed|ECONNREFUSED/i.test(msg)) {
    return '网络异常，请稍后重试';
  }
  return msg || fallback;
}

function parseModuleData(raw: unknown): any {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return initModuleData();
    }
  }
  if (raw && typeof raw === 'object' && (raw as any).math) {
    return raw;
  }
  return initModuleData();
}
