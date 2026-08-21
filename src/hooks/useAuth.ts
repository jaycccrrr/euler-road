import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ModuleCategory, Message } from '@/types';
import { getUserByNickname, getUserById, updateUser, createUser, initAdminUser, updateUserPostsAvatar, updateUserCommentsAvatar, createMessage, areFriends } from '@/lib/db';
import { hashPassword, comparePassword, legacyComparePassword, isBcryptHash, generateId, formatLocalDate } from '@/lib/utils';
import { initModuleData, addExperience, getPrimaryTitle, getPrimaryFrame, UserModuleData, Province, PROVINCES } from '@/lib/gamification';
import { authAPI, usersAPI } from '@/lib/api-client';
import { apiUserToLocalUser, hasApiToken, setApiToken, syncUserToApi, apiErrorMessage, mergeBackendAndLocal } from '@/lib/api-auth';
import { mergeAnswersFromBackend, syncMessageToBackend } from '@/lib/api-sync';

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
  register: (nickname: string, password: string, avatar?: string) => Promise<boolean>;
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
        // 校验后端令牌是否仍有效：失效（401）时清除，避免后续接口静默 401
        if (hasApiToken()) {
          try {
            await authAPI.getMe();
          } catch (tokenError) {
            const status = (tokenError as Error & { status?: number })?.status;
            if (status === 401) setApiToken(null);
          }
        }
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },

      login: async (nickname: string, password: string) => {
        set({ isLoading: true, error: null });

        // 1) 优先走后端（Supabase）：账号真实存在、跨设备可用
        try {
          const res = await authAPI.login(nickname, password);
          setApiToken(res.token);
          const backendUser = apiUserToLocalUser(res.user, await hashPassword(password));
          // 合并本地进度（π力、称号、关注等），避免后端覆盖
          const localUser = await getUserById(backendUser.id).catch(() => undefined);
          const finalUser = localUser ? mergeBackendAndLocal(backendUser, localUser) : backendUser;
          try {
            await updateUser(finalUser);
          } catch (updateError) {
            console.error('Failed to cache backend user locally:', updateError);
          }
          set({
            user: finalUser,
            currentUserId: finalUser.id,
            lastLoginAt: finalUser.lastLoginAt,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          // 拉取后端答题记录（其他设备提交的），合并进本地
          void mergeAnswersFromBackend();

          return true;
        } catch (apiError) {
          console.warn('后端登录失败，尝试本地登录:', apiError);

          // 2) 本地兜底：仅当本地存在同名账号时使用，否则显示后端返回的错误
          try {
            const localUser = await getUserByNickname(nickname);
            if (!localUser) {
              set({ error: apiErrorMessage(apiError, '登录失败'), isLoading: false });
              return false;
            }

            // 使用 bcrypt 比较密码。如果是旧明文或旧弱哈希，则一次性迁移为 bcrypt。
            let isPasswordValid = await comparePassword(password, localUser.passwordHash);
            if (!isPasswordValid && !isBcryptHash(localUser.passwordHash) && legacyComparePassword(password, localUser.passwordHash)) {
              localUser.passwordHash = await hashPassword(password);
              await updateUser(localUser);
              isPasswordValid = true;
            }
            if (!isPasswordValid) {
              set({ error: '密码错误', isLoading: false });
              return false;
            }

            let user = localUser;
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
        }
      },

      register: async (nickname: string, password: string, avatar = '👤') => {
        set({ isLoading: true, error: null });

        // 1) 优先注册到后端（Supabase）
        try {
          const res = await authAPI.register(nickname, password, avatar);
          setApiToken(res.token);
          const backendUser = apiUserToLocalUser(res.user, await hashPassword(password));
          // 合并本地进度（π力、称号、关注等），避免后端覆盖
          const localUser = await getUserById(backendUser.id).catch(() => undefined);
          const finalUser = localUser ? mergeBackendAndLocal(backendUser, localUser) : backendUser;
          try {
            await createUser(finalUser);
          } catch (createError) {
            console.error('Failed to cache backend user locally:', createError);
          }
          set({
            user: finalUser,
            currentUserId: finalUser.id,
            lastLoginAt: finalUser.lastLoginAt,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return true;
        } catch (apiError) {
          const apiMessage = apiErrorMessage(apiError, '注册失败');
          if (/已被使用/.test(apiMessage)) {
            set({ error: apiMessage, isLoading: false });
            return false;
          }
          console.warn('后端注册不可用，回退本地注册:', apiError);

          // 2) 本地注册兜底（原 AuthSwitch 逻辑）
          try {
            const existingUser = await getUserByNickname(nickname);
            if (existingUser) {
              set({ error: '该昵称已被使用', isLoading: false });
              return false;
            }

            const moduleData = initModuleData();
            const now = new Date();
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const passwordHash = await hashPassword(password);

            const newUser: User = {
              id: generateId(),
              nickname: nickname.trim(),
              passwordHash,
              avatar: avatar || '👤',
              moduleData,
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
              level: 1,
              experience: 0,
              title: getPrimaryTitle(moduleData).title,
              frame: getPrimaryFrame(moduleData),
              isAdmin: false,
              createdAt: now.toISOString(),
              lastLoginAt: now.toISOString(),
            };

            await createUser(newUser);

            set({
              user: newUser,
              currentUserId: newUser.id,
              lastLoginAt: newUser.lastLoginAt,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          } catch (error) {
            console.error('Unexpected register error:', error);
            set({ error: '注册失败，请重试', isLoading: false });
            return false;
          }
        }
      },

      logout: () => {
        setApiToken(null);
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
        // 同步到后端（头像/展示模块/经验/收藏，最佳努力）
        void syncUserToApi(updatedUser).catch((syncError) =>
          console.warn('同步资料到后端失败:', syncError)
        );

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
        void syncUserToApi(updatedUser).catch((syncError) =>
          console.warn('同步经验到后端失败:', syncError)
        );
        set({ user: updatedUser });
      },

      // 设置主展示模块
      setDisplayCategory: async (category: ModuleCategory) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = { ...user, displayCategory: category };
        await updateUser(updatedUser);
        void syncUserToApi(updatedUser).catch((syncError) =>
          console.warn('同步展示模块到后端失败:', syncError)
        );
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
        void syncUserToApi(updatedUser).catch((syncError) =>
          console.warn('同步收藏到后端失败:', syncError)
        );
        set({ user: updatedUser });
      },

      // 取消收藏
      removeFromFavorites: async (postId: string) => {
        const { user } = get();
        if (!user) return;

        const favorites = user.favoritePosts || [];
        const updatedUser = { ...user, favoritePosts: favorites.filter(id => id !== postId) };
        await updateUser(updatedUser);
        void syncUserToApi(updatedUser).catch((syncError) =>
          console.warn('同步取消收藏到后端失败:', syncError)
        );
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
        void syncUserToApi(updatedUser).catch((syncError) =>
          console.warn('同步题目收藏到后端失败:', syncError)
        );
        set({ user: updatedUser });
      },

      // 取消题目收藏
      removeFavoriteQuestion: async (questionId: string) => {
        const { user } = get();
        if (!user) return;
        const favorites = user.favoriteQuestions || [];
        const updatedUser = { ...user, favoriteQuestions: favorites.filter(id => id !== questionId) };
        await updateUser(updatedUser);
        void syncUserToApi(updatedUser).catch((syncError) =>
          console.warn('同步取消题目收藏到后端失败:', syncError)
        );
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

        // 后端会话下优先走后端关注关系，并检测是否因此达成互关（成为好友）
        let becameFriends = false;
        if (hasApiToken()) {
          try {
            const before = await usersAPI.friendsStatus(user.id, userId);
            if (!before.areFriends) {
              const state = await usersAPI.isFollowing(userId);
              if (!state.following) {
                await usersAPI.follow(userId);
              }
              const after = await usersAPI.friendsStatus(user.id, userId);
              becameFriends = !!after.areFriends;
            }
          } catch (error) {
            console.warn('后端关注失败，回退本地:', error);
          }
        }

        const updatedUser = { ...user, following: [...following, userId] };
        await updateUser(updatedUser);
        set({ user: updatedUser });

        // 本地回退：无后端会话时用本地互关判定
        if (!becameFriends && !hasApiToken()) {
          try {
            becameFriends = await areFriends(user.id, userId);
          } catch {
            becameFriends = false;
          }
        }

        // 互关达成：由后关注的一方自动发送欢迎消息
        if (becameFriends) {
          try {
            const welcomeMsg: Message = {
              id: generateId(),
              senderId: user.id,
              receiverId: userId,
              content: '我们已经是好友啦，欢迎一起交流！',
              images: [],
              createdAt: new Date().toISOString(),
              isRead: false,
              messageType: 'text',
            };
            await createMessage(welcomeMsg);
            void syncMessageToBackend(welcomeMsg);
          } catch (error) {
            console.warn('发送好友欢迎消息失败:', error);
          }
        }
      },

      // 取消关注用户
      unfollowUser: async (userId: string) => {
        const { user } = get();
        if (!user) return;

        const following = user.following || [];
        if (!following.includes(userId)) return;

        // 后端会话下优先走后端关注关系
        if (hasApiToken()) {
          try {
            const state = await usersAPI.isFollowing(userId);
            if (state.following) {
              await usersAPI.follow(userId);
            }
          } catch (error) {
            console.warn('后端取消关注失败，回退本地:', error);
          }
        }

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
          void syncUserToApi(updatedUser).catch((syncError) => console.warn('同步π力到后端失败:', syncError));
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
          void syncUserToApi(updatedUser).catch((syncError) => console.warn('同步π力到后端失败:', syncError));
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

        // 只持久化非敏感字段；恢复时优先从后端拉取完整用户，失败再回退本地
        if (state.isAuthenticated && state.currentUserId) {
          if (hasApiToken()) {
            try {
              const res = await authAPI.getMe();
              const apiUser = apiUserToLocalUser(res.user);
              // 合并本地进度（π力等），避免后端覆盖
              const localUser = await getUserById(apiUser.id).catch(() => undefined);
              const mergedUser = localUser ? mergeBackendAndLocal(apiUser, localUser) : apiUser;
              useAuth.setState({
                user: mergedUser,
                currentUserId: mergedUser.id,
                lastLoginAt: mergedUser.lastLoginAt,
                isAuthenticated: true,
                hasHydrated: true,
              });
              void mergeAnswersFromBackend();
              return;
            } catch (error) {
              console.error('后端会话失效，回退本地:', error);
              setApiToken(null);
            }
          }

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
