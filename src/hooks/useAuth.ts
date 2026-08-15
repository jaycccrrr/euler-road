import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ModuleCategory } from '@/types';
import { getUserByNickname, getUserById, updateUser, initAdminUser, updateUserPostsAvatar, updateUserCommentsAvatar } from '@/lib/db';
import { hashPassword, comparePassword, legacyComparePassword, isBcryptHash, generateId, formatLocalDate } from '@/lib/utils';
import { initModuleData, addExperience, UserModuleData, Province, PROVINCES } from '@/lib/gamification';

interface AuthState {
  user: User | null;
  currentUserId: string | null;
  lastLoginAt: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;

  // Actions
  login: (nickname: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserInfo: (updates: Partial<User>) => Promise<void>;
  addModuleExp: (category: ModuleCategory, exp: number) => Promise<void>;
  setDisplayCategory: (category: ModuleCategory) => Promise<void>;
  // 帖子收藏
  addToFavorites: (postId: string) => Promise<void>;
  removeFromFavorites: (postId: string) => Promise<void>;
  isFavorite: (postId: string) => boolean;
  // 题目收藏
  addFavoriteQuestion: (questionId: string) => Promise<void>;
  removeFavoriteQuestion: (questionId: string) => Promise<void>;
  isFavoriteQuestion: (questionId: string) => boolean;
  // 关注功能
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  isFollowing: (userId: string) => boolean;
  // 隐私设置
  updatePrivacy: (privacy: Partial<User['privacy']>) => Promise<void>;
  // π力系统
  addPiPower: (questionId: string, isCorrect: boolean, isValid: boolean, date: string, opts?: { historical?: boolean }) => Promise<{ piGained: number; newTotal: number }>;
  updateUserLocation: (province: string, city?: string) => Promise<void>;
  checkAndResetMonthlyPi: () => Promise<boolean>;
  addEulerTitle: (title: string, rankType: 'province' | 'global', rank: number, province?: string) => Promise<void>;
  // 获取今日尝试次数
  getDailyAttempts: (date: string) => number;
  clearError: () => void;
  init: () => Promise<void>;
  setHasHydrated: (value: boolean) => void;
}

// 迁移旧用户数据到新格式
function migrateUserData(user: User): User {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // 创建新的模块数据，将旧的经验值复制到数学模块
  let moduleData = user.moduleData;
  if (!moduleData) {
    moduleData = initModuleData();
    if (user.experience && user.experience > 0) {
      moduleData.math.exp = user.experience;
      moduleData.math.level = user.level || 1;
    }
  }

  // 初始化π力数据
  const piPower = user.piPower || {
    currentPi: 0,
    monthlyPi: 0,
    totalAnswered: 0,
    monthlyAnswered: 0,
    lastAnswerDate: null,
    currentStreak: 0,
    monthlyResetDate: nextMonth.toISOString(),
    dailyAttempts: {},
  };

  // 初始化称号历史
  const eulerTitleHistory = user.eulerTitleHistory || [];

  // 初始化关注列表
  const following = user.following || [];

  // 初始化收藏题目列表
  const favoriteQuestions = user.favoriteQuestions || [];

  // 初始化隐私设置
  const privacy = user.privacy || {
    showFollowing: true,
    showFollowers: true,
    showBio: true,
  };

  return {
    ...user,
    moduleData,
    piPower,
    eulerTitleHistory,
    following,
    favoriteQuestions,
    privacy,
  };
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      currentUserId: null,
      lastLoginAt: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasHydrated: false,

      init: async () => {
        await initAdminUser();
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },

      login: async (nickname: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          let user;
          try {
            user = await getUserByNickname(nickname);
          } catch (dbError) {
            console.error('Database error when fetching user:', dbError);
            set({ error: '数据库连接失败，请刷新页面重试', isLoading: false });
            return false;
          }

          if (!user) {
            set({ error: '用户不存在', isLoading: false });
            return false;
          }

          // 使用 bcrypt 比较密码。如果是旧明文或旧弱哈希，则一次性迁移为 bcrypt。
          let isPasswordValid = await comparePassword(password, user.passwordHash);
          if (!isPasswordValid && !isBcryptHash(user.passwordHash) && legacyComparePassword(password, user.passwordHash)) {
            user.passwordHash = await hashPassword(password);
            await updateUser(user);
            isPasswordValid = true;
          }
          if (!isPasswordValid) {
            set({ error: '密码错误', isLoading: false });
            return false;
          }

          // 迁移旧数据
          try {
            user = migrateUserData(user);
          } catch (migrateError) {
            console.error('Migration error:', migrateError);
            // Continue with original user data if migration fails
          }

          // Update last login time
          user.lastLoginAt = new Date().toISOString();
          try {
            await updateUser(user);
          } catch (updateError) {
            console.error('Failed to update last login time:', updateError);
            // Continue even if update fails
          }

          set({
            user,
            currentUserId: user.id,
            lastLoginAt: user.lastLoginAt,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          console.error('Unexpected login error:', error);
          set({ error: '登录失败，请重试', isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          currentUserId: null,
          lastLoginAt: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateUserInfo: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        await updateUser(updatedUser);

        // 如果更新了头像或昵称，同步更新所有帖子和评论
        if (updates.avatar || updates.nickname) {
          try {
            await updateUserPostsAvatar(
              user.id,
              updates.avatar || user.avatar,
              updates.nickname || user.nickname
            );
            await updateUserCommentsAvatar(
              user.id,
              updates.avatar || user.avatar,
              updates.nickname || user.nickname
            );
          } catch (error) {
            console.error('Failed to update avatar in posts/comments:', error);
          }
          // 发送全局事件通知所有页面刷新
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('userAvatarUpdated', {
              detail: { userId: user.id, avatar: updates.avatar || user.avatar }
            }));
          }
        }

        set({ user: updatedUser });
      },

      // 添加模块经验值
      addModuleExp: async (category: ModuleCategory, exp: number) => {
        const { user } = get();
        if (!user) return;

        const currentModuleData = user.moduleData || initModuleData();
        const newModuleData = addExperience(currentModuleData, category, exp);

        const updatedUser = { ...user, moduleData: newModuleData };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 设置主展示模块
      setDisplayCategory: async (category: ModuleCategory) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = { ...user, displayCategory: category };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 添加收藏
      addToFavorites: async (postId: string) => {
        const { user } = get();
        if (!user) return;

        const favorites = user.favoritePosts || [];
        if (favorites.includes(postId)) return;

        const updatedUser = { ...user, favoritePosts: [...favorites, postId] };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 取消收藏
      removeFromFavorites: async (postId: string) => {
        const { user } = get();
        if (!user) return;

        const favorites = user.favoritePosts || [];
        const updatedUser = { ...user, favoritePosts: favorites.filter(id => id !== postId) };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 检查是否已收藏
      isFavorite: (postId: string) => {
        const { user } = get();
        if (!user) return false;
        return (user.favoritePosts || []).includes(postId);
      },

      // 添加题目收藏
      addFavoriteQuestion: async (questionId: string) => {
        const { user } = get();
        if (!user) return;
        const favorites = user.favoriteQuestions || [];
        if (favorites.includes(questionId)) return;
        const updatedUser = { ...user, favoriteQuestions: [...favorites, questionId] };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 取消题目收藏
      removeFavoriteQuestion: async (questionId: string) => {
        const { user } = get();
        if (!user) return;
        const favorites = user.favoriteQuestions || [];
        const updatedUser = { ...user, favoriteQuestions: favorites.filter(id => id !== questionId) };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 检查题目是否已收藏
      isFavoriteQuestion: (questionId: string) => {
        const { user } = get();
        if (!user) return false;
        return (user.favoriteQuestions || []).includes(questionId);
      },

      // 关注用户
      followUser: async (userId: string) => {
        const { user } = get();
        if (!user) return;

        const following = user.following || [];
        if (following.includes(userId)) return;

        const updatedUser = { ...user, following: [...following, userId] };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 取消关注用户
      unfollowUser: async (userId: string) => {
        const { user } = get();
        if (!user) return;

        const following = user.following || [];
        const updatedUser = { ...user, following: following.filter(id => id !== userId) };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 检查是否已关注
      isFollowing: (userId: string) => {
        const { user } = get();
        if (!user) return false;
        return (user.following || []).includes(userId);
      },

      // 获取今日尝试次数
      getDailyAttempts: (date: string) => {
        const { user } = get();
        if (!user || !user.piPower) return 0;
        return user.piPower.dailyAttempts[date] || 0;
      },

      // 添加π力
      // 规则：今日题每题最多 2π —— 有效作答 +1π，AI 判对 +2π；历史题仅答对 +1π；重复作答不重复获得；无效文本 +0π
      addPiPower: async (questionId: string, isCorrect: boolean, isValid: boolean, date: string, opts?: { historical?: boolean }) => {
        const { user } = get();
        if (!user) return { piGained: 0, newTotal: 0 };

        const now = new Date();
        const piPower = user.piPower || {
          currentPi: 0,
          monthlyPi: 0,
          totalAnswered: 0,
          monthlyAnswered: 0,
          lastAnswerDate: null,
          currentStreak: 0,
          monthlyResetDate: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
          dailyAttempts: {},
          questionPi: {},
        };

        // 检查是否需要重置月度数据（仅重置每月统计，累计不清零）
        const resetDate = new Date(piPower.monthlyResetDate);
        if (now >= resetDate) {
          const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          piPower.monthlyPi = 0;
          piPower.monthlyAnswered = 0;
          piPower.currentStreak = 0;
          piPower.monthlyResetDate = nextMonth.toISOString();
          piPower.dailyAttempts = {};
        }

        // 该题本次应得的π力上限：历史题答对 1π、否则 0π；今日题无效 0π、有效 1π、答对 2π
        const targetPi = opts?.historical
          ? (isCorrect && isValid ? 1 : 0)
          : !isValid ? 0 : isCorrect ? 2 : 1;
        const questionPi = piPower.questionPi || {};
        const alreadyEarned = questionPi[questionId] || 0;
        // 只补差额（首次答对得2π；先有效作答得1π后再答对补1π）
        const piGained = Math.max(0, targetPi - alreadyEarned);

        if (piGained > 0) {
          questionPi[questionId] = alreadyEarned + piGained;
          piPower.questionPi = questionPi;
          piPower.currentPi += piGained;
          piPower.monthlyPi += piGained;

          // 更新连续答题天数（仅在实际获得π力时累计）
          const lastDate = piPower.lastAnswerDate;
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = formatLocalDate(yesterday);

          if (lastDate === yesterdayStr) {
            piPower.currentStreak += 1;
          } else if (lastDate !== date) {
            piPower.currentStreak = 1;
          }

          piPower.totalAnswered += 1;
          piPower.monthlyAnswered += 1;
          piPower.lastAnswerDate = date;

          // 更新今日尝试次数
          piPower.dailyAttempts[date] = (piPower.dailyAttempts[date] || 0) + 1;

          const updatedUser = { ...user, piPower };
          await updateUser(updatedUser);
          set({ user: updatedUser });
        }

        return { piGained, newTotal: piPower.currentPi };
      },

      // 更新用户位置
      updateUserLocation: async (province: string, city?: string) => {
        const { user } = get();
        if (!user) return;

        const location = {
          province,
          city,
          updatedAt: new Date().toISOString(),
        };

        const updatedUser = { ...user, location };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 检查并重置月度π力
      checkAndResetMonthlyPi: async () => {
        const { user } = get();
        if (!user || !user.piPower) return false;

        const now = new Date();
        const resetDate = new Date(user.piPower.monthlyResetDate);

        if (now >= resetDate) {
          const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          const updatedUser = {
            ...user,
            piPower: {
              ...user.piPower,
              monthlyPi: 0,
              monthlyAnswered: 0,
              currentStreak: 0,
              monthlyResetDate: nextMonth.toISOString(),
              dailyAttempts: {},
            },
          };
          await updateUser(updatedUser);
          set({ user: updatedUser });
          return true;
        }
        return false;
      },

      // 添加欧拉称号
      addEulerTitle: async (title: string, rankType: 'province' | 'global', rank: number, province?: string) => {
        const { user } = get();
        if (!user) return;

        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        const newTitleRecord = {
          id: generateId(),
          title,
          province,
          rankType,
          rank,
          obtainedAt: now.toISOString(),
          month,
        };

        const eulerTitleHistory = [...(user.eulerTitleHistory || []), newTitleRecord];
        const currentEulerTitle = newTitleRecord;

        const updatedUser = { ...user, eulerTitleHistory, currentEulerTitle };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      // 更新隐私设置
      updatePrivacy: async (privacy: Partial<User['privacy']>) => {
        const { user } = get();
        if (!user) return;

        const updatedUser: User = {
          ...user,
          privacy: {
            showFollowing: user.privacy?.showFollowing ?? true,
            showFollowers: user.privacy?.showFollowers ?? true,
            showBio: user.privacy?.showBio ?? true,
            ...privacy,
          },
        };
        await updateUser(updatedUser);
        set({ user: updatedUser });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        currentUserId: state.currentUserId,
        isAuthenticated: state.isAuthenticated,
        lastLoginAt: state.lastLoginAt,
      }),
      onRehydrateStorage: () => async (state) => {
        if (!state) return;

        // 只持久化非敏感字段；恢复时从 IndexedDB 重新加载完整用户
        if (state.isAuthenticated && state.currentUserId) {
          try {
            const user = await getUserById(state.currentUserId);
            if (user) {
              useAuth.setState({
                user,
                currentUserId: user.id,
                lastLoginAt: user.lastLoginAt,
                isAuthenticated: true,
                hasHydrated: true,
              });
              return;
            }
          } catch (error) {
            console.error('Failed to rehydrate auth user:', error);
          }
          // 用户不存在或加载失败，清除登录状态
          useAuth.setState({
            user: null,
            currentUserId: null,
            lastLoginAt: null,
            isAuthenticated: false,
            hasHydrated: true,
          });
        } else {
          state.hasHydrated = true;
        }
      },
    }
  )
);
