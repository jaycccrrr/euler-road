// 模块类型
export type ModuleCategory = 'math';

// 模块经验值
export interface ModuleExperience {
  exp: number;
  level: number;
  selectedTitle: string | null; // 用户选择的第7级称号
}

// 用户模块数据
export interface UserModuleData {
  math: ModuleExperience;
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
}

// 经验值奖励规则
//
// 设计原则：
// 1. 参与即有保底（基础分），避免"答错白忙"的挫败感；
// 2. 质量分层加成，得分越高加成越大，鼓励追求完整解答；
// 3. 连续学习加成随连续天数递增但有上限，鼓励长期坚持而非单日刷量；
// 4. 社区贡献（每日首发帖）给予固定奖励。
//
// 单次答题经验 = 基础参与 + 质量加成 + 连续学习加成
export const EXP_REWARDS = {
  BASE_PARTICIPATION: 5,   // 完成作答保底
  QUALITY_EXCELLENT: 15,   // 得分 ≥ 90
  QUALITY_GOOD: 10,        // 得分 80–89
  QUALITY_PASS: 5,         // 得分 60–79
  STREAK_BONUS_CAP: 10,    // 连续学习加成上限（每连续学习 1 天 +1）
  DAILY_FIRST_POST: 10,    // 每日首次发帖
};

// 等级配置（所有模块共用等级经验值要求）
// 阈值按几何节奏递增：以每日 3 题、平均 15 EXP/题估算，
// Lv.2 ≈ 2 天，Lv.3 ≈ 1 周，Lv.4 ≈ 3 周，Lv.5 ≈ 2 个月，Lv.6 ≈ 3 个月以上
export const LEVEL_CONFIG: LevelConfig[] = [
  { level: 1, minExp: 0, maxExp: 99, frame: 'default', reward: '默认头像框' },
  { level: 2, minExp: 100, maxExp: 299, frame: 'bronze', reward: '铜色头像框' },
  { level: 3, minExp: 300, maxExp: 699, frame: 'silver', reward: '银色头像框' },
  { level: 4, minExp: 700, maxExp: 1499, frame: 'gold', reward: '金色头像框' },
  { level: 5, minExp: 1500, maxExp: 2999, frame: 'diamond', reward: '钻石头像框' },
  { level: 6, minExp: 3000, maxExp: 99999, frame: 'starry', reward: '星空头像框' },
];

// 数学模块称号 - 与等级头像框统一
export const MATH_TITLES: ModuleTitles = {
  level1: '初学者',
  level2: '铜阶学者',
  level3: '银阶学者',
  level4: '金阶学者',
  level5: '钻石学者',
  level6: '星空传奇',
};

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

// 头像框样式
export const FRAME_STYLES: Record<string, string> = {
  default: 'border-2 border-gray-300',
  bronze: 'border-4 border-amber-600 shadow-[0_0_10px_rgba(180,83,9,0.5)]',
  silver: 'border-4 border-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.5)]',
  gold: 'border-4 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]',
  diamond: 'border-4 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]',
  starry: 'border-4 border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.7)]',
};

// 头像框颜色
export const FRAME_COLORS: Record<string, { bg: string; text: string }> = {
  default: { bg: 'bg-gray-100', text: 'text-gray-600' },
  bronze: { bg: 'bg-amber-100', text: 'text-amber-700' },
  silver: { bg: 'bg-slate-100', text: 'text-slate-600' },
  gold: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  diamond: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  starry: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
};

// 省份列表（中国34个省级行政区）
export const PROVINCES = [
  '北京', '天津', '上海', '重庆',
  '河北', '山西', '辽宁', '吉林', '黑龙江',
  '江苏', '浙江', '安徽', '福建', '江西', '山东',
  '河南', '湖北', '湖南', '广东', '海南',
  '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾',
  '内蒙古', '广西', '西藏', '宁夏', '新疆',
  '香港', '澳门'
] as const;

export type Province = typeof PROVINCES[number];

// π力数据结构
export interface PiPowerData {
  currentPi: number;           // 当前π力值
  monthlyPi: number;           // 本月π力值
  totalAnswered: number;       // 累计答对题数
  monthlyAnswered: number;     // 本月答对题数
  lastAnswerDate: string | null; // 最后答题日期
  currentStreak: number;       // 连续答对天数
  monthlyResetDate: string;    // 下次清零日期
  isFirstAttemptToday: boolean; // 今日是否首次尝试
}

// 称号历史记录
export interface TitleHistoryRecord {
  id: string;
  title: string;           // 称号名称（如"北京欧拉"、"欧拉本尊"）
  province?: Province;     // 省份（全站称号无省份）
  rankType: 'province' | 'global'; // 排行类型
  rank: number;            // 排名
  obtainedAt: string;      // 获得时间
  month: string;           // 所属月份（YYYY-MM）
}

// 初始化π力数据
export function initPiPowerData(): PiPowerData {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return {
    currentPi: 0,
    monthlyPi: 0,
    totalAnswered: 0,
    monthlyAnswered: 0,
    lastAnswerDate: null,
    currentStreak: 0,
    monthlyResetDate: nextMonth.toISOString(),
    isFirstAttemptToday: true,
  };
}

// 检查是否需要清零
export function shouldResetMonthlyPi(piPower: PiPowerData): boolean {
  const now = new Date();
  const resetDate = new Date(piPower.monthlyResetDate);
  return now >= resetDate;
}

// 重置月度π力
export function resetMonthlyPi(piPower: PiPowerData): PiPowerData {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return {
    ...piPower,
    monthlyPi: 0,
    monthlyAnswered: 0,
    currentStreak: 0,
    monthlyResetDate: nextMonth.toISOString(),
    isFirstAttemptToday: true,
  };
}

// 计算π力旋转角度（1π = 180°）
export function calculatePiRotation(piPower: number): number {
  return piPower * 180;
}

// 格式化π力显示
export function formatPiPower(piPower: number): string {
  if (piPower === 0) return '0π';
  if (piPower === Math.floor(piPower)) return `${piPower}π`;
  return `${piPower.toFixed(1)}π`;
}

// 获取省份欧拉称号名称
export function getProvinceEulerTitle(province: Province): string {
  return `${province}欧拉`;
}

// 获取全站称号名称
export function getGlobalEulerTitle(): string {
  return '欧拉本尊';
}

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

