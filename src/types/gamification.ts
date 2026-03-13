// 模块类型
export type ModuleCategory = 'math' | 'physics' | 'cs';

// 模块经验值
export interface ModuleExperience {
  exp: number;
  level: number;
  selectedTitle: string | null; // 用户选择的第7级称号
}

// 用户模块数据
export interface UserModuleData {
  math: ModuleExperience;
  physics: ModuleExperience;
  cs: ModuleExperience;
}

// 等级配置
export interface LevelConfig {
  level: number;
  minExp: number;
  maxExp: number;
  frame: string;
  reward?: string;
}

// 模块称号配置
export interface ModuleTitles {
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
  level6: string;
  level7: string[]; // 第7级多个选项
}

// 经验值奖励
export const EXP_REWARDS = {
  CORRECT_ANSWER: 20,
  PARTIAL_ANSWER: 10,
  WRONG_ANSWER: 5,
  DAILY_FIRST_POST: 10,
};

// 等级配置（所有模块共用等级经验值要求）
export const LEVEL_CONFIG: LevelConfig[] = [
  { level: 1, minExp: 0, maxExp: 49, frame: 'default', reward: '默认头像框' },
  { level: 2, minExp: 50, maxExp: 149, frame: 'bronze', reward: '铜色头像框' },
  { level: 3, minExp: 150, maxExp: 299, frame: 'silver', reward: '银色头像框' },
  { level: 4, minExp: 300, maxExp: 499, frame: 'gold', reward: '金色头像框' },
  { level: 5, minExp: 500, maxExp: 799, frame: 'diamond', reward: '钻石头像框' },
  { level: 6, minExp: 800, maxExp: 1199, frame: 'starry', reward: '星空头像框' },
  { level: 7, minExp: 1200, maxExp: 1699, frame: 'halo', reward: '光晕头像框 + 传奇称号' },
];

// 数学模块称号
export const MATH_TITLES: ModuleTitles = {
  level1: '数学学徒',
  level2: '数学新锐',
  level3: '数学达人',
  level4: '数学精英',
  level5: '数学宗师',
  level6: '数学传奇',
  level7: ['欧拉', '高斯', '黎曼', '笛卡尔', '柯西', '傅里叶'],
};

// 物理模块称号
export const PHYSICS_TITLES: ModuleTitles = {
  level1: '物理学徒',
  level2: '物理新锐',
  level3: '物理达人',
  level4: '物理精英',
  level5: '物理宗师',
  level6: '物理传奇',
  level7: ['牛顿', '麦克斯韦', '爱因斯坦', '薛定谔', '伽利略', '普朗克'],
};

// 计算机模块称号
export const CS_TITLES: ModuleTitles = {
  level1: '计算机学徒',
  level2: '计算机新锐',
  level3: '计算机达人',
  level4: '计算机精英',
  level5: '计算机宗师',
  level6: '计算机传奇',
  level7: ['图灵', '冯·诺依曼', '香农'],
};

// 获取模块称号配置
export function getModuleTitles(category: ModuleCategory): ModuleTitles {
  switch (category) {
    case 'math':
      return MATH_TITLES;
    case 'physics':
      return PHYSICS_TITLES;
    case 'cs':
      return CS_TITLES;
    default:
      return MATH_TITLES;
  }
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
export function getTitleByLevel(category: ModuleCategory, level: number, selectedTitle: string | null): string {
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
    case 7:
      // 第7级使用用户选择的称号，如果未选择则使用第一个
      return selectedTitle || titles.level7[0];
    default:
      return titles.level1;
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

// 计算答题获得的经验值
export function calculateAnswerExp(score: number): number {
  if (score >= 90) return EXP_REWARDS.CORRECT_ANSWER;
  if (score >= 60) return EXP_REWARDS.PARTIAL_ANSWER;
  return EXP_REWARDS.WRONG_ANSWER;
}

// 获取模块显示名称
export function getModuleDisplayName(category: ModuleCategory): string {
  switch (category) {
    case 'math':
      return '数学';
    case 'physics':
      return '物理';
    case 'cs':
      return '计算机';
    default:
      return '未知';
  }
}

// 头像框样式
export const FRAME_STYLES: Record<string, string> = {
  default: 'border-2 border-gray-300',
  bronze: 'border-4 border-amber-600 shadow-[0_0_10px_rgba(180,83,9,0.5)]',
  silver: 'border-4 border-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.5)]',
  gold: 'border-4 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]',
  diamond: 'border-4 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]',
  starry: 'border-4 border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.7)]',
  halo: 'border-4 border-amber-300 shadow-[0_0_20px_rgba(252,211,77,0.8)]',
};

// 头像框颜色
export const FRAME_COLORS: Record<string, { bg: string; text: string }> = {
  default: { bg: 'bg-gray-100', text: 'text-gray-600' },
  bronze: { bg: 'bg-amber-100', text: 'text-amber-700' },
  silver: { bg: 'bg-slate-100', text: 'text-slate-600' },
  gold: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  diamond: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  starry: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  halo: { bg: 'bg-amber-50', text: 'text-amber-600' },
};

// 初始化模块数据
export function initModuleData(): UserModuleData {
  return {
    math: { exp: 0, level: 1, selectedTitle: null },
    physics: { exp: 0, level: 1, selectedTitle: null },
    cs: { exp: 0, level: 1, selectedTitle: null },
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

  // 添加经验值
  const newExp = current.exp + expToAdd;
  const newLevel = getLevelByExp(newExp);

  // 如果升级到7级且没有选择过称号，默认选择第一个
  let newSelectedTitle = current.selectedTitle;
  if (newLevel === 7 && current.level < 7 && !newSelectedTitle) {
    const titles = getModuleTitles(category);
    newSelectedTitle = titles.level7[0];
  }

  newModuleData[category] = {
    exp: newExp,
    level: newLevel,
    selectedTitle: newSelectedTitle,
  };

  return newModuleData;
}

// 选择第7级称号
export function selectLegendaryTitle(
  moduleData: UserModuleData,
  category: ModuleCategory,
  title: string
): UserModuleData {
  const newModuleData = { ...moduleData };
  const current = newModuleData[category];

  // 只有在7级才能选择称号
  if (current.level === 7) {
    const titles = getModuleTitles(category);
    if (titles.level7.includes(title)) {
      newModuleData[category] = {
        ...current,
        selectedTitle: title,
      };
    }
  }

  return newModuleData;
}
