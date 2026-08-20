import {
  ModuleCategory,
  ModuleExperience,
  UserModuleData,
  LevelConfig,
  ModuleTitles,
  EXP_REWARDS,
  LEVEL_CONFIG,
  MATH_TITLES,
} from '@/types/gamification';

// 重新导出所有类型和常量
export * from '@/types/gamification';

// 获取模块称号配置
export function getModuleTitles(category: ModuleCategory): ModuleTitles {
  return MATH_TITLES;
}

// 根据经验值获取等级
export function getLevelByExp(exp: number): number {
  for (let i = LEVEL_CONFIG.length - 1; i >= 0; i--) {
    if (exp >= LEVEL_CONFIG[i].minExp) {
      return LEVEL_CONFIG[i].level;
    }
  }
  return 1;
}

// 获取等级配置
export function getLevelConfig(level: number): LevelConfig | undefined {
  return LEVEL_CONFIG.find(l => l.level === level);
}

// 获取当前等级的称号
export function getTitleByLevel(
  category: ModuleCategory,
  level: number,
  selectedTitle: string | null
): string {
  const titles = getModuleTitles(category);

  switch (level) {
    case 1:
      return titles.level1;
    case 2:
      return titles.level2;
    case 3:
      return titles.level3;
    case 4:
      return titles.level4;
    case 5:
      return titles.level5;
    case 6:
      return titles.level6;
    default:
      return titles.level6;
  }
}

// 计算经验值进度百分比
export function getExpProgress(exp: number): number {
  const level = getLevelByExp(exp);
  const currentLevelConfig = LEVEL_CONFIG.find(l => l.level === level);
  const nextLevelConfig = LEVEL_CONFIG.find(l => l.level === level + 1);

  if (!currentLevelConfig) return 0;
  if (!nextLevelConfig) return 100;

  const expInCurrentLevel = exp - currentLevelConfig.minExp;
  const expNeededForNextLevel = nextLevelConfig.minExp - currentLevelConfig.minExp;

  return Math.min(100, Math.round((expInCurrentLevel / expNeededForNextLevel) * 100));
}

// 计算升到下一级所需经验值
export function getExpToNextLevel(exp: number): number {
  const level = getLevelByExp(exp);
  const nextLevelConfig = LEVEL_CONFIG.find(l => l.level === level + 1);

  if (!nextLevelConfig) return 0;

  return nextLevelConfig.minExp - exp;
}

// 计算答题获得的经验值：基础参与 + 质量加成 + 连续学习加成
export function calculateAnswerExp(score: number, streakDays = 0): number {
  let exp = EXP_REWARDS.BASE_PARTICIPATION;
  if (score >= 90) exp += EXP_REWARDS.QUALITY_EXCELLENT;
  else if (score >= 80) exp += EXP_REWARDS.QUALITY_GOOD;
  else if (score >= 60) exp += EXP_REWARDS.QUALITY_PASS;
  exp += Math.min(Math.max(0, streakDays), EXP_REWARDS.STREAK_BONUS_CAP);
  return exp;
}

// 获取模块显示名称
export function getModuleDisplayName(category: ModuleCategory): string {
  return '数学';
}

// 头像框样式 - 全新设计，从低到高越来越华丽
export const FRAME_STYLES: Record<string, string> = {
  default: 'avatar-frame avatar-frame-default',
  bronze: 'avatar-frame avatar-frame-bronze',
  silver: 'avatar-frame avatar-frame-silver',
  gold: 'avatar-frame avatar-frame-gold',
  diamond: 'avatar-frame avatar-frame-diamond',
  starry: 'avatar-frame avatar-frame-starry',
};

// 头像框颜色
export const FRAME_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  default: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' },
  bronze: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-500' },
  silver: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-400' },
  gold: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500' },
  diamond: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-500' },
  starry: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-500' },
};

// 等级显示名称
export const LEVEL_NAMES: Record<number, string> = {
  1: '初学者',
  2: '铜阶学者',
  3: '银阶学者',
  4: '金阶学者',
  5: '钻石学者',
  6: '星空传奇',
};

// 等级图标
export const LEVEL_ICONS: Record<number, string> = {
  1: '🌱',
  2: '🥉',
  3: '🥈',
  4: '🥇',
  5: '💎',
  6: '⭐',
};

// 初始化模块数据
export function initModuleData(): UserModuleData {
  return {
    math: { exp: 0, level: 1, selectedTitle: null },
  };
}

// 添加经验值并更新等级
export function addExperience(
  moduleData: UserModuleData,
  category: ModuleCategory,
  expToAdd: number
): UserModuleData {
  const newModuleData = { ...moduleData };
  const current = newModuleData[category];

  // 添加经验值（最高到6级）
  const newExp = Math.min(current.exp + expToAdd, LEVEL_CONFIG[LEVEL_CONFIG.length - 1].minExp);
  const newLevel = getLevelByExp(newExp);

  newModuleData[category] = {
    exp: newExp,
    level: newLevel,
    selectedTitle: current.selectedTitle,
  };

  return newModuleData;
}

// 获取用户主称号（根据用户设置的 displayCategory 或经验值最高的模块）
export function getPrimaryTitle(
  moduleData: UserModuleData,
  displayCategory?: ModuleCategory
): { title: string; category: ModuleCategory } {
  // 如果用户设置了展示模块，使用设置的模块
  const primaryCategory = displayCategory || getHighestExpModule(moduleData);

  const data = moduleData[primaryCategory];
  return {
    title: getTitleByLevel(primaryCategory, data.level, data.selectedTitle),
    category: primaryCategory,
  };
}

// 获取经验值最高的模块
export function getHighestExpModule(moduleData: UserModuleData): ModuleCategory {
  let maxExp = -1;
  let primaryCategory: ModuleCategory = 'math';

  (Object.keys(moduleData) as ModuleCategory[]).forEach(category => {
    if (moduleData[category].exp > maxExp) {
      maxExp = moduleData[category].exp;
      primaryCategory = category;
    }
  });

  return primaryCategory;
}

// 获取用户主头像框（根据用户设置的 displayCategory 或经验值最高的模块）
export function getPrimaryFrame(moduleData: UserModuleData, displayCategory?: ModuleCategory): string {
  // 如果用户设置了展示模块，使用设置的模块的等级
  const primaryCategory = displayCategory || getHighestExpModule(moduleData);
  const primaryLevel = moduleData[primaryCategory].level;

  const config = getLevelConfig(primaryLevel);
  return config?.frame || 'default';
}
