// 数据加载工具 - 使用动态导入实现代码分割
// 避免大数据文件被打包到初始 bundle 中

import { KnowledgeModule } from '@/types';

// 模块数据加载函数
export async function loadKnowledgeModules(): Promise<KnowledgeModule[]> {
  const { KNOWLEDGE_MODULES } = await import('@/data/modules');
  return KNOWLEDGE_MODULES;
}

// 高中数学数据加载
export async function loadHighSchoolMathData() {
  const {
    highSchoolBasicChapters,
    highSchoolAdvancedTopics,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = await import('@/data/highschoolMath') as any;
  return {
    highSchoolBasicChapters,
    highSchoolAdvancedTopics,
  };
}

// 高等数学数据加载
export async function loadAdvancedMathData() {
  const {
    getAdvancedLessons,
    basicChapters,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = await import('@/data/advancedMathFull') as any;
  return {
    getAdvancedLessons,
    basicChapters,
  };
}

// 带缓存的数据加载器
class DataCache {
  private cache = new Map<string, unknown>();

  async get<T>(key: string, loader: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key) as T;
    }
    const data = await loader();
    this.cache.set(key, data);
    return data;
  }

  clear() {
    this.cache.clear();
  }
}

export const dataCache = new DataCache();
