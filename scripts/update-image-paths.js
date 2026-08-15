const fs = require('fs');

const filePath = 'src/data/highschoolStatic.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 章节映射: id -> 中文名
const chapterMap = {
  'functions': '函数',
  'inequality': '不等式',
  'trigonometry': '三角函数',
  'derivative': '导数',
  'complex': '复数',
  'solid-geometry': '立体几何',
  'combinatorics': '排列组合',
  'sequence': '数列',
  'analytic-geometry': '解析几何',
};

const lines = content.split('\n');
const chapterRanges = [];
let inQuestionBank = false;
let currentChapterId = null;
let currentChapterStart = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('staticQuestionBankChapters')) {
    inQuestionBank = true;
    continue;
  }

  if (!inQuestionBank) continue;

  // 检测章节开始: "id": "xxx",
  const idMatch = line.match(/^\s+"id":\s+"([a-z-]+)"/);
  if (idMatch && chapterMap[idMatch[1]]) {
    if (currentChapterId) {
      chapterRanges.push({
        id: currentChapterId,
        name: chapterMap[currentChapterId],
        start: currentChapterStart,
        end: i - 1,
      });
    }
    currentChapterId = idMatch[1];
    currentChapterStart = i;
  }

  // 检测章节数组结束
  if (line.match(/^\];/) && inQuestionBank) {
    if (currentChapterId) {
      chapterRanges.push({
        id: currentChapterId,
        name: chapterMap[currentChapterId],
        start: currentChapterStart,
        end: i,
      });
    }
    break;
  }
}

// 处理每一行，替换图片路径
let modified = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.includes('/images/picui/')) continue;

  // 找到该行所属的章节
  let chapterName = '解析几何'; // 默认
  for (const ch of chapterRanges) {
    if (i >= ch.start && i <= ch.end) {
      chapterName = ch.name;
      break;
    }
  }

  // 替换路径
  const newLine = line.replace(/\/images\/picui\//g, `/images/高中数学精编题库/${chapterName}/`);
  if (newLine !== line) {
    lines[i] = newLine;
    modified = true;
  }
}

if (modified) {
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log('Updated all image paths successfully');
} else {
  console.log('No paths needed updating');
}
