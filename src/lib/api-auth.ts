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
    favoriteQuestions: apiUser.favoriteQuestions || [],
    following: [],
    privacy: { showFollowing: true, showFollowers: true, showBio: true },
    piPower: parsePiPower(apiUser?.piPower, nextMonth.toISOString()),
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
    favoriteQuestions: user.favoriteQuestions || [],
    piPower: user.piPower,
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

/** 解析后端 π力数据（可能为 JSON 字符串或对象），缺失时用默认值 */
function parsePiPower(raw: unknown, monthlyResetDate: string): User['piPower'] {
  let obj: any = raw;
  if (typeof raw === 'string') {
    try {
      obj = JSON.parse(raw);
    } catch {
      obj = null;
    }
  }
  if (!obj || typeof obj !== 'object') {
    return {
      currentPi: 0,
      monthlyPi: 0,
      totalAnswered: 0,
      monthlyAnswered: 0,
      lastAnswerDate: null,
      currentStreak: 0,
      monthlyResetDate,
      dailyAttempts: {},
    };
  }
  return {
    currentPi: Number(obj.currentPi) || 0,
    monthlyPi: Number(obj.monthlyPi) || 0,
    totalAnswered: Number(obj.totalAnswered) || 0,
    monthlyAnswered: Number(obj.monthlyAnswered) || 0,
    lastAnswerDate: obj.lastAnswerDate ?? null,
    currentStreak: Number(obj.currentStreak) || 0,
    monthlyResetDate: obj.monthlyResetDate || monthlyResetDate,
    dailyAttempts: obj.dailyAttempts || {},
    questionPi: obj.questionPi || {},
  };
}

/** 合并后端用户与本地用户：本地特有的进度字段（π力、称号、关注等）优先保留 */
export function mergeBackendAndLocal(backend: User, local: User): User {
  return {
    ...backend,
    piPower: local.piPower || backend.piPower,
    eulerTitleHistory: local.eulerTitleHistory || backend.eulerTitleHistory || [],
    currentEulerTitle: local.currentEulerTitle || backend.currentEulerTitle,
    following: local.following || backend.following || [],
    location: local.location || backend.location,
    privacy: local.privacy || backend.privacy,
    bio: local.bio ?? backend.bio,
    coverImage: local.coverImage ?? backend.coverImage,
    favoriteQuestions: (backend.favoriteQuestions?.length ?? 0) > 0 ? backend.favoriteQuestions || [] : local.favoriteQuestions || [],
  };
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
