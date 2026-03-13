import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ModuleCategory } from '@/types';
import { getUserByNickname, updateUser, initAdminUser } from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { initModuleData, addExperience, selectLegendaryTitle, UserModuleData } from '@/lib/gamification';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;

  // Actions
  login: (nickname: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserInfo: (updates: Partial<User>) => Promise<void>;
  addModuleExp: (category: ModuleCategory, exp: number) => Promise<void>;
  selectLegendaryTitle: (category: ModuleCategory, title: string) => Promise<void>;
  setDisplayCategory: (category: ModuleCategory) => Promise<void>;
  // 帖子收藏
  addToFavorites: (postId: string) => Promise<void>;
  removeFromFavorites: (postId: string) => Promise<void>;
  isFavorite: (postId: string) => boolean;
  clearError: () => void;
  init: () => Promise<void>;
  setHasHydrated: (value: boolean) => void;
}

// 迁移旧用户数据到新格式
function migrateUserData(user: User): User {
  // 如果已经有 moduleData，不需要迁移
  if (user.moduleData) {
    return user;
  }

  // 创建新的模块数据，将旧的经验值复制到数学模块
  const moduleData = initModuleData();
  if (user.experience && user.experience > 0) {
    moduleData.math.exp = user.experience;
    moduleData.math.level = user.level || 1;
  }

  return {
    ...user,
    moduleData,
  };
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
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
          let user = await getUserByNickname(nickname);

          if (!user) {
            set({ error: '用户不存在', isLoading: false });
            return false;
          }

          // Simple password check (in production, use proper hashing)
          if (user.passwordHash !== password && user.passwordHash !== hashPassword(password)) {
            set({ error: '密码错误', isLoading: false });
            return false;
          }

          // 迁移旧数据
          user = migrateUserData(user);

          // Update last login time
          user.lastLoginAt = new Date().toISOString();
          await updateUser(user);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return true;
        } catch (error) {
          set({ error: '登录失败', isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateUserInfo: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        await updateUser(updatedUser);
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

      // 选择传奇称号
      selectLegendaryTitle: async (category: ModuleCategory, title: string) => {
        const { user } = get();
        if (!user) return;

        const currentModuleData = user.moduleData || initModuleData();
        const newModuleData = selectLegendaryTitle(currentModuleData, category, title);

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

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
