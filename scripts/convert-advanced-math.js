const fs = require('fs');
const path = require('path');

// 读取原始高等数学数据
const inputPath = path.join(__dirname, '../src/data/advancedMathFull.ts');
const outputPath = path.join(__dirname, '../src/data/advancedMathBlocks.ts');

// 读取文件内容
const content = fs.readFileSync(inputPath, 'utf8');

// 提取所有 SubLesson 定义
const lessonRegex = /export const (\w+Lesson): SubLesson = \{[\s\S]*?^\};$/gm;
const lessons = [];
let match;

while ((match = lessonRegex.exec(content)) !== null) {
  lessons.push(match[0]);
}

// 解析单个 lesson 并转换为 ContentBlock 结构
function parseLesson(lessonStr) {
  // 提取 id
  const idMatch = lessonStr.match(/id: '([^']+)'/);
  const id = idMatch ? idMatch[1] : '';

  // 提取 title
  const titleMatch = lessonStr.match(/title: '([^']+)'/);
  const title = titleMatch ? titleMatch[1] : '';

  // 提取 has3D
  const has3DMatch = lessonStr.match(/has3D: (true|false)/);
  const has3D = has3DMatch ? has3DMatch[1] === 'true' : false;

  // 提取 vizType
  const vizTypeMatch = lessonStr.match(/vizType: '([^']+)'/);
  const vizType = vizTypeMatch ? vizTypeMatch[1] : undefined;

  // 提取 theory 内容 - 从 theory: ` 到 `,
  const theoryMatch = lessonStr.match(/theory: `([\s\S]*?)`,\s*\n  formula:/);
  const theory = theoryMatch ? theoryMatch[1] : '';

  // 提取 formula 内容
  const formulaMatch = lessonStr.match(/formula: `([\s\S]*?)`,\s*\n  examples:/);
  const formula = formulaMatch ? formulaMatch[1] : '';

  return { id, title, has3D, vizType, theory, formula };
}

// 预处理数学公式：给裸 LaTeX 命令添加 <span class="math"> 包裹
function preprocessMath(text) {
  if (!text) return text;

  // 步骤1: 修复反斜杠
  // 原始文件中的 \\ 实际上是两个反斜杠字符（因为 TypeScript 转义）
  // 我们需要将它们转换为单个反斜杠
  text = text.replace(/\\\\/g, '\\');

  // 步骤2: 保护已有的 $$...$$ 公式
  const protectedBlocks = [];
  let result = text.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
    protectedBlocks.push(match);
    return `<<<PROTECTED_${protectedBlocks.length - 1}>>>`;
  });
  // 也保护已有的 $...$ 公式
  result = result.replace(/\$[^$\n]+?\$/g, (match) => {
    protectedBlocks.push(match);
    return `<<<PROTECTED_${protectedBlocks.length - 1}>>>`;
  });

  // 步骤3: 给裸 LaTeX 命令添加 <span class="math"> 包裹
  const latexCommandRegex = /\\[a-zA-Z]+(?:\[[^\]]*\])?(?:\{[^}]*\}){0,2}/g;
  result = result.replace(latexCommandRegex, (match) => {
    return `<span class="math">${match}</span>`;
  });

  // 步骤3b: 给常见的裸数学函数名添加反斜杠和 <span class="math"> 包裹
  // 原始数据中有些数学函数如 cos, sin, tan 没有反斜杠
  const mathFunctions = ['cos', 'sin', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'exp', 'sup', 'inf', 'lim', 'max', 'min', 'det', 'tr', 'rank'];
  const mathFuncRegex = new RegExp(`(?<![\\\\a-zA-Z])(${mathFunctions.join('|')})(?![a-zA-Z])`, 'g');
  result = result.replace(mathFuncRegex, (match) => {
    return `<span class="math">\\${match}</span>`;
  });

  // 步骤4: 恢复保护的公式（去掉 $ 包裹，改为 span 包裹）
  result = result.replace(/<<<PROTECTED_(\d+)>>>/g, (_, index) => {
    const block = protectedBlocks[parseInt(index)];
    if (block.startsWith('$') && block.endsWith('$') && !block.startsWith('$$')) {
      const content = block.slice(1, -1);
      return `<span class="math">${content}</span>`;
    }
    return block;
  });

  return result;
}

// 自定义序列化函数
function serializeBlocks(blocks) {
  return '[\n' + blocks.map(block => {
    const lines = ['  {'];
    for (const [key, value] of Object.entries(block)) {
      if (typeof value === 'string') {
        // 对字符串值进行 JSON 转义
        // 注意：在 JavaScript 字符串字面量中，'\\' 表示一个反斜杠
        const escaped = value
          .replace(/\\/g, '\\\\\\\\')  // \ 变成 \\
          .replace(/"/g, '\\"')       // " 变成 \\"
          .replace(/\n/g, '\\n')       // 换行符变成 \\n
          .replace(/\r/g, '\\r');      // 回车符变成 \\r
        lines.push(`    "${key}": "${escaped}",`);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        lines.push(`    "${key}": ${value},`);
      }
    }
    if (lines[lines.length - 1].endsWith(',')) {
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
    }
    lines.push('  }');
    return lines.join('\n');
  }).join(',\n') + '\n]';
}

// 将文本转换为 ContentBlock[]
function convertToBlocks(text, blockIdPrefix) {
  const blocks = [];
  let blockIndex = 0;

  // 预处理数学公式
  text = preprocessMath(text);

  // 分割内容：按 ``` 或 $$ 分割
  const parts = text.split(/(```[\s\S]*?```|\$\$[\s\S]*?\$\$)/);

  for (const part of parts) {
    if (!part.trim()) continue;

    const trimmed = part.trim();

    // 代码块/公式块
    if (trimmed.startsWith('```') || trimmed.startsWith('$$')) {
      const content = trimmed
        .replace(/^```\s*\n?/, '')
        .replace(/\n?```$/, '')
        .replace(/^\$\$\s*\n?/, '')
        .replace(/\n?\$\$$/, '')
        .trim();

      if (content) {
        blocks.push({
          id: `${blockIdPrefix}-formula-${blockIndex++}`,
          type: 'formula',
          content: content
        });
      }
    }
    // 文本块
    else {
      // 检查是否包含图片占位符
      const imageRegex = /\*\[3D可视化图表\]\*|<!--\s*.*?\s*-->/g;
      const textParts = trimmed.split(imageRegex);
      const images = trimmed.match(imageRegex) || [];

      for (let i = 0; i < textParts.length; i++) {
        const textPart = textParts[i].trim();
        if (textPart) {
          blocks.push({
            id: `${blockIdPrefix}-text-${blockIndex++}`,
            type: 'text',
            content: textPart
          });
        }

        // 如果有对应的图片
        if (i < images.length && images[i].includes('3D')) {
          blocks.push({
            id: `${blockIdPrefix}-image-${blockIndex++}`,
            type: 'image',
            content: `/images/3d-viz-${blockIdPrefix}.png`,
            width: 600
          });
        }
      }
    }
  }

  return blocks;
}

// 处理所有 lessons
const parsedLessons = lessons.map(parseLesson);

// 生成新的 TypeScript 文件
let output = `// 高等数学详细内容 - ContentBlock 格式
// 生成时间: ${new Date().toLocaleString()}

import { ContentBlock } from './highschoolMath';

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

`;

// 为每个 lesson 生成转换后的数据
for (const lesson of parsedLessons) {
  const theoryBlocks = convertToBlocks(lesson.theory, lesson.id);
  const formulaBlocks = convertToBlocks(lesson.formula, `${lesson.id}-formula`);

  // 合并所有 blocks
  const allBlocks = [...theoryBlocks, ...formulaBlocks];

  // 重新编号
  allBlocks.forEach((block, idx) => {
    block.id = `block-${lesson.id}-${idx}`;
  });

  // 使用 JSON.stringify，它会正确处理反斜杠转义
  const blocksJson = JSON.stringify(allBlocks, null, 2);

  output += `export const ${lesson.id.replace(/-/g, '')}Lesson: AdvancedSubLesson = {
  id: '${lesson.id}',
  title: '${lesson.title}',
  has3D: ${lesson.has3D},${lesson.vizType ? `\n  vizType: '${lesson.vizType}',` : ''}
  blocks: ${blocksJson},
};

`;
}

// 提取 allLessons 映射
const allLessonsMatch = content.match(/export const allLessons: Record<string, SubLesson\[\]> = \{([\s\S]*?)\};/);
if (allLessonsMatch) {
  const allLessonsContent = allLessonsMatch[1];

  // 解析 each key-value pair
  const lessonMapping = {};
  const keyValueRegex = /'([^']+)':\s*\[([^\]]+)\]/g;
  let kvMatch;
  while ((kvMatch = keyValueRegex.exec(allLessonsContent)) !== null) {
    const key = kvMatch[1];
    const lessonNames = kvMatch[2].split(',').map(s => s.trim()).filter(Boolean);
    lessonMapping[key] = lessonNames;
  }

  // 生成 allLessons 导出
  output += `export const allLessons: Record<string, AdvancedSubLesson[]> = {\n`;
  for (const [key, lessonNames] of Object.entries(lessonMapping)) {
    output += `  '${key}': [${lessonNames.join(', ')}],\n`;
  }
  output += `};\n\n`;
}

// 添加 Chapter 接口和 basicChapters
output += `// 章节定义
export interface Chapter {
  id: string;
  title: string;
  description?: string;
  icon: string;
  lessons: AdvancedSubLesson[];
}

// 基础篇章节
export const basicChapters: Chapter[] = [
  {
    id: 'am-1',
    title: '向量与空间解析几何',
    icon: '📐',
    lessons: allLessons['am-1'] || [],
  },
  {
    id: 'am-2',
    title: '多元函数微分学',
    icon: '📈',
    lessons: allLessons['am-2'] || [],
  },
  {
    id: 'am-3',
    title: '重积分',
    icon: '🔲',
    lessons: allLessons['am-3'] || [],
  },
  {
    id: 'am-4',
    title: '曲线积分与曲面积分',
    icon: '🔄',
    lessons: allLessons['am-4'] || [],
  },
  {
    id: 'am-5',
    title: '常微分方程',
    icon: '⚡',
    lessons: allLessons['am-5'] || [],
  },
  {
    id: 'am-6',
    title: '应用与实践',
    icon: '🚀',
    lessons: allLessons['am-6'] || [],
  },
];

// 获取课时内容
export function getLessonContent(moduleId: string, lessonId: string): AdvancedSubLesson | undefined {
  const lessons = allLessons[moduleId];
  if (!lessons) return undefined;
  return lessons.find(l => l.id === lessonId);
}

// 获取模块下所有课时
export function getModuleLessons(moduleId: string): AdvancedSubLesson[] {
  return allLessons[moduleId] || [];
}
`;

// 写入文件
fs.writeFileSync(outputPath, output, 'utf8');

console.log('转换完成！');
console.log(`处理了 ${parsedLessons.length} 个 lessons`);
console.log(`输出文件: ${outputPath}`);
