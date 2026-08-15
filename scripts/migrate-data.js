const fs = require('fs');
const path = require('path');

// 读取JSON文件
const topicsData = JSON.parse(fs.readFileSync('C:/Users/Lenovo/Downloads/topics-data.json', 'utf8'));
const questionBankData = JSON.parse(fs.readFileSync('C:/Users/Lenovo/Downloads/question-bank-data.json', 'utf8'));

// 知识点标题映射
const topicTitleMap = {
  'hs-adv-inequality': { title: '不等式', description: '均值不等式、柯西不等式、排序不等式等高级不等式技巧', icon: '≠' },
  'hs-adv-function': { title: '函数', description: '函数性质、图像变换、三次函数等综合内容', icon: 'f(x)' },
  'hs-adv-triangle': { title: '三角形专题', description: '三角形五心、面积公式、向量性质等综合内容', icon: '△' },
  'hs-adv-analytic-geo': { title: '解析几何', description: '圆锥曲线、直线与圆、参数方程等解析几何内容', icon: '⌬' },
  'hs-adv-sequence': { title: '数列', description: '等差等比数列、递推数列、数列求和等', icon: '∑' },
  'hs-adv-thinking': { title: '数学思想', description: '函数与方程、数形结合、分类讨论等数学思想方法', icon: '💡' }
};

// 精编题库章节标题映射
const chapterTitleMap = {
  'functions': { title: '函数', icon: 'f(x)' },
  'inequality': { title: '不等式', icon: '≠' },
  'trigonometry': { title: '三角函数', icon: '∠' },
  'derivative': { title: '导数', icon: '∂' },
  'complex': { title: '复数', icon: 'i' },
  'solid-geometry': { title: '立体几何', icon: '◻' },
  'combinatorics': { title: '排列组合', icon: 'C' },
  'sequence': { title: '数列', icon: '∑' },
  'analytic-geometry': { title: '解析几何', icon: '⌬' }
};

// 转换知识点数据
const staticAdvancedTopics = Object.entries(topicsData).map(([key, subTopics]) => {
  const meta = topicTitleMap[key] || { title: key, description: '', icon: '📐' };
  return {
    id: key,
    title: meta.title,
    description: meta.description,
    icon: meta.icon,
    subTopics: subTopics.map(st => ({
      id: st.id,
      title: st.title,
      blocks: st.blocks || []
    }))
  };
});

// 转换精编题库数据
const staticQuestionBankChapters = Object.entries(questionBankData).map(([key, questions]) => {
  const meta = chapterTitleMap[key] || { title: key, icon: '📝' };
  return {
    id: key,
    title: meta.title,
    icon: meta.icon,
    questions: questions.map(q => ({
      id: q.id,
      blocks: q.blocks || [],
      options: q.options,
      correctOption: q.correctOption,
      correctOptions: q.correctOptions,
      choiceType: q.choiceType,
      hintBlocks: q.hintBlocks || [],
      solutionBlocks: q.solutionBlocks || []
    }))
  };
});

// 生成TypeScript文件内容
const tsContent = `// 高中数学提高篇 - 静态正式内容
// 此文件存储已编辑完成的知识点内容，上线后不可编辑

import { ContentBlock } from './highschoolMath';

// 子章节/课时
export interface StaticSubTopic {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

// 知识点分类
export interface StaticTopic {
  id: string;
  title: string;
  description: string;
  icon?: string;
  subTopics: StaticSubTopic[];
}

// 精编题库题目
export interface StaticQuestion {
  id: string;
  blocks: ContentBlock[];
  options?: string[];
  correctOption?: number;
  correctOptions?: number[];
  choiceType?: 'single' | 'multiple';
  hintBlocks?: ContentBlock[];
  solutionBlocks?: ContentBlock[];
}

// 精编题库章节
export interface StaticQuestionBankChapter {
  id: string;
  title: string;
  icon: string;
  questions: StaticQuestion[];
}

// 提高篇知识点数据
export const staticAdvancedTopics: StaticTopic[] = ${JSON.stringify(staticAdvancedTopics, null, 2)};

// 精编题库数据
export const staticQuestionBankChapters: StaticQuestionBankChapter[] = ${JSON.stringify(staticQuestionBankChapters, null, 2)};

// 加载本地存储的数据（开发时使用，上线前将数据导出到此文件）
export function loadStaticContent(): { topics: StaticTopic[]; questionBank: StaticQuestionBankChapter[] } {
  // 默认返回空数据结构
  return {
    topics: staticAdvancedTopics,
    questionBank: staticQuestionBankChapters
  };
}
`;

// 写入文件
const outputPath = path.join(__dirname, '../src/data/highschoolStatic.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');

console.log('数据迁移完成！');
console.log(`知识点章节数: ${staticAdvancedTopics.length}`);
console.log(`精编题库章节数: ${staticQuestionBankChapters.length}`);
console.log(`总题目数: ${staticQuestionBankChapters.reduce((sum, c) => sum + c.questions.length, 0)}`);
