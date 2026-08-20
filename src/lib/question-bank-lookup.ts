// 题库题目全局索引：按题目 ID 反查所属科目/章节与文本预览。
// 用于个人主页收藏夹展示题库收藏题（收藏 ID 不仅限于 daily- 前缀的每日一题）。
import { staticQuestionBankChapters, StaticQuestionBankChapter } from '@/data/highschoolStatic';
import { advancedMathExerciseChapters } from '@/data/advancedMathExerciseData';
import { linearAlgebraExerciseChapters } from '@/data/linearAlgebraExerciseData';

export interface BankQuestionInfo {
  id: string;
  subjectId: string;
  subjectName: string;
  chapterTitle: string;
  preview: string;
}

const SOURCES: { subjectId: string; subjectName: string; chapters: StaticQuestionBankChapter[] }[] = [
  { subjectId: 'highschool-math', subjectName: '高中数学', chapters: staticQuestionBankChapters },
  { subjectId: 'advanced-math', subjectName: '高等数学', chapters: advancedMathExerciseChapters },
  { subjectId: 'linear-algebra', subjectName: '线性代数', chapters: linearAlgebraExerciseChapters },
];

let cache: Map<string, BankQuestionInfo> | null = null;

function stripToText(content: string): string {
  return content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\$\$?/g, '')
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildCache(): Map<string, BankQuestionInfo> {
  const map = new Map<string, BankQuestionInfo>();
  for (const src of SOURCES) {
    for (const ch of src.chapters) {
      for (const q of ch.questions) {
        if (map.has(q.id)) continue;
        const text = (q.blocks || [])
          .filter((b) => b.type !== 'image')
          .map((b) => stripToText(b.content))
          .filter(Boolean)
          .join(' ');
        map.set(q.id, {
          id: q.id,
          subjectId: src.subjectId,
          subjectName: src.subjectName,
          chapterTitle: ch.title,
          preview: text.slice(0, 80),
        });
      }
    }
  }
  return map;
}

/** 按题目 ID 查找题库题目；找不到返回 null（可能是每日一题或已删除的题） */
export function findBankQuestion(id: string): BankQuestionInfo | null {
  if (!cache) cache = buildCache();
  return cache.get(id) || null;
}
