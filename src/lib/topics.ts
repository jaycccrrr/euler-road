// 热门话题列表
export const HOT_TOPICS = [
  // 数学相关
  '高等数学',
  '线性代数',
  '概率论',
  '微积分',
  '离散数学',
  '数学分析',
  '抽象代数',
  '数论',
  '几何学',
  '拓扑学',
  '实变函数',
  '复变函数',
  '常微分方程',
  '偏微分方程',
  '数值分析',
  '运筹学',
  '最优化',
  '图论',
  '组合数学',
  '数理逻辑',

  // 学习相关
  '考研数学',
  '数学竞赛',
  '学习方法',
  '解题技巧',
  '错题分析',
  '知识总结',
  '笔记分享',
  '备考经验',

  // 技术相关
  'Python',
  'MATLAB',
  'LaTeX',
  '数学建模',
  '数据分析',
  '机器学习',
  '深度学习',
  '算法',

  // 综合讨论
  '数学史',
  '数学之美',
  '数学应用',
  '科普分享',
  '资源推荐',
  '求助答疑',
  '经验交流',
] as const;

// 话题分类
export const TOPIC_CATEGORIES = {
  math: {
    name: '数学基础',
    topics: ['高等数学', '线性代数', '概率论', '微积分', '离散数学', '数学分析'],
  },
  advanced: {
    name: '高等数学',
    topics: ['抽象代数', '数论', '几何学', '拓扑学', '实变函数', '复变函数'],
  },
  applied: {
    name: '应用数学',
    topics: ['常微分方程', '偏微分方程', '数值分析', '运筹学', '最优化', '图论'],
  },
  study: {
    name: '学习交流',
    topics: ['考研数学', '数学竞赛', '学习方法', '解题技巧', '错题分析', '知识总结'],
  },
  tech: {
    name: '技术工具',
    topics: ['Python', 'MATLAB', 'LaTeX', '数学建模', '数据分析', '机器学习'],
  },
  general: {
    name: '综合讨论',
    topics: ['数学史', '数学之美', '数学应用', '科普分享', '资源推荐', '求助答疑'],
  },
} as const;

// 搜索话题
export function searchTopics(query: string, limit: number = 10): string[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return HOT_TOPICS
    .filter(topic => topic.toLowerCase().includes(lowerQuery))
    .slice(0, limit);
}

// 获取推荐话题
export function getRecommendedTopics(exclude: string[] = [], limit: number = 5): string[] {
  const available = HOT_TOPICS.filter(topic => !exclude.includes(topic));
  // 随机选择
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

// 获取分类话题
export function getTopicsByCategory(category: keyof typeof TOPIC_CATEGORIES): string[] {
  return [...(TOPIC_CATEGORIES[category]?.topics || [])];
}

// 验证话题是否有效
export function isValidTopic(topic: string): boolean {
  return HOT_TOPICS.includes(topic as any);
}

// 话题使用统计（用于本地存储）
export interface TopicUsage {
  topic: string;
  count: number;
  lastUsed: string;
}

// 获取用户常用话题
export function getUserFrequentTopics(userId: string): string[] {
  if (typeof window === 'undefined') return [];
  const key = `user_topics_${userId}`;
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    const usages: TopicUsage[] = JSON.parse(stored);
    return usages
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(u => u.topic);
  } catch {
    return [];
  }
}

// 记录话题使用
export function recordTopicUsage(userId: string, topic: string): void {
  if (typeof window === 'undefined') return;
  const key = `user_topics_${userId}`;
  const stored = localStorage.getItem(key);
  let usages: TopicUsage[] = [];
  if (stored) {
    try {
      usages = JSON.parse(stored);
    } catch {
      usages = [];
    }
  }

  const existing = usages.find(u => u.topic === topic);
  if (existing) {
    existing.count++;
    existing.lastUsed = new Date().toISOString();
  } else {
    usages.push({
      topic,
      count: 1,
      lastUsed: new Date().toISOString(),
    });
  }

  localStorage.setItem(key, JSON.stringify(usages));
}
