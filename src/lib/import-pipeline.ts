import { CustomLesson, LessonBlock, LessonExample } from '@/types';
import { generateId } from './utils';

const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// ==================== 1. 文本提取 ====================

/** 从上传文件提取纯文本（支持 .md / .txt / .pdf） */
export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith('.pdf')) {
    return extractFromPdf(file);
  }
  return file.text();
}

async function extractFromPdf(file: File): Promise<string> {
  const pdfjs = await import('pdfjs-dist');
  const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const data = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data }).promise;

  const parts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    parts.push(pageText);
  }
  return parts.join('\n\n');
}

// ==================== 2. 文本切块 ====================

/** 按标题/空行切块，每块不超过 maxChars，保证 AI 处理质量 */
export function chunkText(text: string, maxChars = 2500): string[] {
  // 优先按 Markdown 标题或空行切分
  const segments = text.split(/\n(?=#{1,3}\s)|\n{2,}/).filter((s) => s.trim());

  const chunks: string[] = [];
  let current = '';
  for (const seg of segments) {
    if (current.length + seg.length > maxChars && current) {
      chunks.push(current.trim());
      current = '';
    }
    // 单段超过上限则硬切
    if (seg.length > maxChars) {
      if (current) {
        chunks.push(current.trim());
        current = '';
      }
      for (let i = 0; i < seg.length; i += maxChars) {
        chunks.push(seg.slice(i, i + maxChars).trim());
      }
      continue;
    }
    current += (current ? '\n\n' : '') + seg;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

// ==================== 3. AI 结构化 ====================

interface AILessonBlock {
  type: 'text' | 'formula';
  content: string;
}

interface AILessonOutput {
  title: string;
  blocks: AILessonBlock[];
  examples?: Omit<LessonExample, 'id'>[];
}

/** 教材模式：把一块原始文本结构化为课时 */
export async function structureLessonChunk(
  chunk: string,
  moduleId: string,
  sourceName: string
): Promise<CustomLesson | null> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('未配置 NEXT_PUBLIC_DEEPSEEK_API_KEY');
  }

  const parsed = await callDeepSeek<AILessonOutput>(
    '你是一位专业的数学教材编辑。请把给定的教材原文结构化为一个课时的 JSON 数据。' +
      '要求：1) title 为简洁的课时标题；2) blocks 为内容块数组，text 块放 Markdown 讲解（数学公式用 $...$ 或 $$...$$ 包裹），' +
      'formula 块放需要单独展示的核心公式（LaTeX 源码，不含 $ 符号）；3) 如原文含例题，整理为 examples，' +
      '每道例题给出 question、4个 options、correct（正确选项索引0-3）、explanation、difficulty（easy/medium/hard）；' +
      '4) 保留原文的数学严谨性，不要编造原文没有的内容；5) 严格输出 JSON，不要 markdown 代码块标记。' +
      '输出格式：{"title": "...", "blocks": [{"type": "text"|"formula", "content": "..."}], "examples": [...]}',
    `【教材原文】\n${chunk}`
  );

  if (!parsed || !parsed.title || !Array.isArray(parsed.blocks)) return null;

  const lessonId = generateId();
  return {
    id: lessonId,
    moduleId,
    title: parsed.title,
    blocks: parsed.blocks
      .filter((b) => b.content)
      .map((b, i) => ({
        id: `block-${lessonId}-${i}`,
        type: b.type === 'formula' ? 'formula' : 'text',
        content: b.content,
      })),
    examples: (parsed.examples || []).map((e, i) => ({
      id: `example-${lessonId}-${i}`,
      difficulty: e.difficulty || 'medium',
      question: e.question || '',
      options: Array.isArray(e.options) ? e.options : [],
      correct: typeof e.correct === 'number' ? e.correct : 0,
      explanation: e.explanation || '',
    })),
    sourceName,
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
}

// ==================== 4. 试卷模式：题目抽取 ====================

export interface ImportedQuestion {
  title: string;
  content: string;
  answer: string;
  difficulty: number;
}

/** 试卷模式：把试卷文本抽取为题目数组 */
export async function extractQuestionsFromExam(
  chunk: string
): Promise<ImportedQuestion[]> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('未配置 NEXT_PUBLIC_DEEPSEEK_API_KEY');
  }

  const parsed = await callDeepSeek<{ questions: ImportedQuestion[] }>(
    '你是一位专业的数学题库编辑。请从给定的试卷文本中抽取所有题目，输出 JSON。' +
      '每道题包含：title（简短标题）、content（完整题干，数学公式用 $...$ 包裹）、' +
      'answer（详细解答过程，含最终答案）、difficulty（1-5 的整数难度）。' +
      '如果原文没有给出答案，请严谨地补全解答。严格输出 JSON，不要 markdown 代码块标记。' +
      '输出格式：{"questions": [{"title": "...", "content": "...", "answer": "...", "difficulty": 3}]}',
    `【试卷原文】\n${chunk}`
  );

  if (!parsed || !Array.isArray(parsed.questions)) return [];
  return parsed.questions.filter((q) => q.title && q.content && q.answer);
}

// ==================== 5. TS 文件导出 ====================

/** 把课时不数据导出为符合 advancedMathBlocks 格式的 TS 文件内容 */
export function generateLessonsTs(lessons: CustomLesson[]): string {
  const entries = lessons
    .map((l) => {
      const varName = `lesson_${l.id.replace(/-/g, '_')}`;
      return `export const ${varName}: AdvancedSubLesson = ${JSON.stringify(
        {
          id: l.id,
          title: l.title,
          has3D: false,
          blocks: l.blocks,
          ...(l.examples && l.examples.length > 0 ? { examples: l.examples } : {}),
        },
        null,
        2
      )};`;
    })
    .join('\n\n');

  const varNames = lessons.map((l) => `lesson_${l.id.replace(/-/g, '_')}`);

  return `import { ContentBlock } from './highschoolMath';

export interface Example {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface AdvancedSubLesson {
  id: string;
  title: string;
  has3D: boolean;
  vizType?: string;
  blocks: ContentBlock[];
  examples?: Example[];
}

${entries}

export const importedLessons: AdvancedSubLesson[] = [${varNames.join(', ')}];
`;
}

/** 把试卷题目导出为可追加到 daily-question-bank 的 TS 片段 */
export function generateQuestionsTs(questions: ImportedQuestion[], moduleId: string): string {
  const entries = questions
    .map(
      (q) => `  {
    moduleId: '${moduleId}',
    title: ${JSON.stringify(q.title)},
    content: ${JSON.stringify(q.content)},
    answer: ${JSON.stringify(q.answer)},
    difficulty: ${q.difficulty},
  },`
    )
    .join('\n');

  return `// 导入时间：${new Date().toLocaleString('zh-CN')}\n// 请人工审核后追加到 daily-question-bank.ts\n[\n${entries}\n]\n`;
}

// ==================== 内部工具 ====================

async function callDeepSeek<T>(systemPrompt: string, userPrompt: string): Promise<T | null> {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      console.error('[Import Pipeline] DeepSeek API error:', response.status);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content) as T;
  } catch (error) {
    console.error('[Import Pipeline] AI structuring failed:', error);
    return null;
  }
}
