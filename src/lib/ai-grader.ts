import { DailyQuestion, AnswerRecord } from '@/types';
import { generateId } from './utils';

// Hugging Face Inference API configuration
const HF_API_TOKEN = process.env.NEXT_PUBLIC_HF_API_TOKEN || '';
const HF_MODEL = 'facebook/bart-large-mnli';
const USE_AI_GRADING = process.env.NEXT_PUBLIC_USE_AI_GRADING === 'true' || false; // 默认关闭 AI 批阅，使用本地算法

// 评分权重配置
const GRADING_CONFIG = {
  // 数值匹配权重
  exactMatch: 100,
  closeMatch: 85,
  partialMatch: 60,

  // 阈值
  correctThreshold: 75, // 超过此分数视为答对

  // 公式匹配
  formulaMatchBonus: 10,
};

export interface GradingResult {
  score: number;
  feedback: string;
  isCorrect: boolean;
  // 本地算法置信度：最终答案直接命中为高，仅过程评分为低（低置信度将触发 AI 二次批改）
  confidence: 'high' | 'low';
}

export async function gradeAnswer(
  question: DailyQuestion,
  userAnswer: string,
  userImages: string[]
): Promise<GradingResult> {
  // 如果用户只传了图片没有文字
  if (userImages.length > 0 && !userAnswer.trim()) {
    return {
      score: 50,
      feedback: '已收到您的图片答案，由于技术限制，请对照参考答案自行评分。参与即可获得5点经验值！',
      isCorrect: false,
      confidence: 'low',
    };
  }

  const referenceAnswer = question.answer;
  const user = normalizeText(userAnswer);
  const reference = normalizeText(referenceAnswer);

  // ========== 核心逻辑：答案优先原则 ==========
  // 第一步：检查最终答案是否正确（提取答案部分的数值/公式）
  const finalAnswerCheck = checkFinalAnswer(userAnswer, referenceAnswer);
  if (finalAnswerCheck.isCorrect) {
    return {
      score: finalAnswerCheck.score,
      feedback: finalAnswerCheck.score >= 100
        ? '完美！答案完全正确！'
        : `答案正确！${finalAnswerCheck.feedback || ''}`,
      isCorrect: true,
      confidence: 'high',
    };
  }

  // 第二步：检查是否完全匹配（整段文字）
  if (user === reference || isSemanticMatch(user, reference)) {
    return {
      score: 100,
      feedback: '完美！答案完全正确！思路清晰，步骤完整。',
      isCorrect: true,
      confidence: 'high',
    };
  }

  // 第三步：答案不正确，进入过程评分阶段
  const numericalScore = compareNumericalAnswers(user, reference);
  const formulaScore = compareFormulas(userAnswer, referenceAnswer);
  const keywordScore = compareKeywords(user, reference);
  const structureScore = compareStructure(user, reference);

  // 综合评分（加权平均）- 答案不正确时看过程
  let finalScore = Math.max(
    numericalScore * 0.5,  // 数值部分权重降低
    formulaScore * 0.3 + keywordScore * 0.4 + structureScore * 0.3
  );

  // 限制过程分上限（答案错误最高给75分）
  finalScore = Math.min(finalScore, 75);

  return { ...generateFeedback(Math.round(finalScore), userAnswer, referenceAnswer), confidence: 'low' };
}

// 检查最终答案是否正确（答案优先原则的核心函数）
function checkFinalAnswer(userText: string, refText: string): { isCorrect: boolean; score: number; feedback?: string } {
  // 提取最终答案（通常是最后出现的数值、公式或等号后的内容）
  const userFinal = extractFinalAnswer(userText);
  const refFinal = extractFinalAnswer(refText);

  if (!refFinal) return { isCorrect: false, score: 0 }; // 参考答案没有明确答案
  if (!userFinal) return { isCorrect: false, score: 0 }; // 用户没有给出明确答案

  // 1. 数值答案比较
  const userNums = extractNumbers(userFinal);
  const refNums = extractNumbers(refFinal);

  // 防误判：参考答案含有公式/变量（如 "y=2x-1"、"e^x"）时，纯数字答案不得直接判对
  const refHasFormula = /[a-zA-Z\\^_{}]|\$[^$]+\$/.test(refFinal);
  const userHasFormula = /[a-zA-Z\\^_{}]|\$[^$]+\$/.test(userFinal);

  if (refNums.length > 0 && userNums.length > 0 && (!refHasFormula || userHasFormula)) {
    // 检查最后一个数值是否匹配（通常是最终答案）
    const lastUserNum = userNums[userNums.length - 1];
    const lastRefNum = refNums[refNums.length - 1];

    const tolerance = Math.abs(lastRefNum) * 0.02; // 2% 误差容忍
    const diff = Math.abs(lastUserNum - lastRefNum);

    if (diff === 0) {
      return { isCorrect: true, score: 100, feedback: '数值完全匹配' };
    }
    if (diff <= tolerance) {
      return { isCorrect: true, score: 95, feedback: '数值在误差范围内' };
    }
    if (diff <= tolerance * 2) {
      return { isCorrect: true, score: 90, feedback: '数值基本正确' };
    }
  }

  // 2. 公式答案比较
  const userFormulas = extractFormulas(userFinal);
  const refFormulas = extractFormulas(refFinal);

  if (refFormulas.length > 0 && userFormulas.length > 0) {
    const lastUserFormula = normalizeFormula(userFormulas[userFormulas.length - 1]);
    const lastRefFormula = normalizeFormula(refFormulas[refFormulas.length - 1]);

    if (lastUserFormula === lastRefFormula) {
      return { isCorrect: true, score: 100, feedback: '公式完全匹配' };
    }
    if (calculateSimilarity(lastUserFormula, lastRefFormula) > 0.85) {
      return { isCorrect: true, score: 95, feedback: '公式基本匹配' };
    }
  }

  // 3. 文本答案比较（如 "O(n^2)"、"是/否" 等）
  const normalizedUser = normalizeText(userFinal).replace(/\s+/g, '');
  const normalizedRef = normalizeText(refFinal).replace(/\s+/g, '');

  if (normalizedUser === normalizedRef) {
    return { isCorrect: true, score: 100, feedback: '答案完全匹配' };
  }
  if (calculateSimilarity(normalizedUser, normalizedRef) > 0.9) {
    return { isCorrect: true, score: 95, feedback: '答案基本匹配' };
  }

  return { isCorrect: false, score: 0 };
}

// 提取最终答案（从答案文本中提取核心答案部分）
function extractFinalAnswer(text: string): string {
  if (!text) return '';

  // 移除 HTML 标签
  text = text.replace(/<[^>]+>/g, '');

  // 按行分割，取最后一行（通常是答案）
  const lines = text.split(/\n/).filter(line => line.trim());
  if (lines.length === 0) return '';

  // 优先查找包含 "="、"为"、"是"、"答案" 的行
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (/[=为是]|答案|结果|等于|为\s*[:：]/.test(line)) {
      return line.trim();
    }
  }

  // 查找包含 LaTeX 公式的行
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/\$[^$]+\$/.test(lines[i])) {
      return lines[i].trim();
    }
  }

  // 返回最后一行
  return lines[lines.length - 1].trim();
}

// 归一化文本
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[，。！？、；：""''（）【】《》]/g, '')
    .replace(/\\[\(\)\[\]]/g, '') // 移除 LaTeX 括号
    .trim();
}

// 语义匹配（处理同义表达）
function isSemanticMatch(user: string, reference: string): boolean {
  // 移除常见连接词后比较
  const connectors = ['所以', '因此', '故', '得', '可知', '即', '则'];
  const cleanUser = connectors.reduce((s, c) => s.replace(new RegExp(c, 'g'), ''), user);
  const cleanRef = connectors.reduce((s, c) => s.replace(new RegExp(c, 'g'), ''), reference);

  // 计算相似度
  const similarity = calculateSimilarity(cleanUser, cleanRef);
  return similarity > 0.85;
}

// 计算字符串相似度（Levenshtein 距离）
function calculateSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;

  const len = Math.max(s1.length, s2.length);
  const distance = levenshteinDistance(s1, s2);
  return 1 - distance / len;
}

function levenshteinDistance(s1: string, s2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= s2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= s1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[s2.length][s1.length];
}

// 比较数值答案（改进版）
function compareNumericalAnswers(user: string, reference: string): number {
  const userNumbers = extractNumbers(user);
  const refNumbers = extractNumbers(reference);

  if (refNumbers.length === 0) return 0;
  if (userNumbers.length === 0) return 0;

  // 对于只有一个数值的简单答案
  if (refNumbers.length === 1 && userNumbers.length >= 1) {
    const target = refNumbers[0];
    // 查找最接近的答案数值
    const closest = userNumbers.reduce((prev, curr) =>
      Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
    );

    const diff = Math.abs(closest - target);
    const tolerance = Math.abs(target) * 0.05; // 5% 误差容忍

    if (diff === 0) return 100;
    if (diff <= tolerance) return 90;
    if (diff <= tolerance * 2) return 75;
    return 0;
  }

  // 多个数值的情况
  let matchCount = 0;
  const tolerance = 0.01;

  for (const refNum of refNumbers) {
    for (const userNum of userNumbers) {
      if (Math.abs(refNum - userNum) <= tolerance * Math.abs(refNum)) {
        matchCount++;
        break;
      }
    }
  }

  const matchRatio = matchCount / refNumbers.length;
  if (matchRatio >= 0.9) return 95;
  if (matchRatio >= 0.7) return 80;
  if (matchRatio >= 0.5) return 60;
  return Math.max(0, matchRatio * 100);
}

// 提取数值（改进版，支持分数和小数）
function extractNumbers(text: string): number[] {
  const matches: number[] = [];

  // 匹配小数和整数
  const decimalPattern = /-?\d+\.?\d*/g;
  const decimals = text.match(decimalPattern);
  if (decimals) {
    matches.push(...decimals.map(Number));
  }

  // 匹配分数（如 1/2、3/4）
  const fractionPattern = /(\d+)\/(\d+)/g;
  let match;
  while ((match = fractionPattern.exec(text)) !== null) {
    matches.push(parseInt(match[1]) / parseInt(match[2]));
  }

  return [...new Set(matches)]; // 去重
}

// 比较 LaTeX/数学公式
function compareFormulas(userText: string, refText: string): number {
  // 提取 LaTeX 公式
  const userFormulas = extractFormulas(userText);
  const refFormulas = extractFormulas(refText);

  if (refFormulas.length === 0) return 50; // 没有公式，给中等分
  if (userFormulas.length === 0) return 0;

  // 标准化公式后比较
  let matchCount = 0;
  for (const refFormula of refFormulas) {
    const normalizedRef = normalizeFormula(refFormula);
    for (const userFormula of userFormulas) {
      const normalizedUser = normalizeFormula(userFormula);
      if (normalizedUser === normalizedRef ||
          calculateSimilarity(normalizedUser, normalizedRef) > 0.8) {
        matchCount++;
        break;
      }
    }
  }

  const ratio = matchCount / refFormulas.length;
  return Math.round(ratio * 100);
}

// 提取公式
function extractFormulas(text: string): string[] {
  const formulas: string[] = [];

  // 匹配 $...$ 和 $$...$$
  const inlinePattern = /\$([^$]+)\$/g;
  let match;
  while ((match = inlinePattern.exec(text)) !== null) {
    formulas.push(match[1]);
  }

  // 匹配 \( ... \) 和 \[ ... \]
  const latexPattern = /\\[\(\[]([\s\S]*?)\\[\)\]]/g;
  while ((match = latexPattern.exec(text)) !== null) {
    formulas.push(match[1]);
  }

  return formulas;
}

// 标准化公式
function normalizeFormula(formula: string): string {
  return formula
    .replace(/\s+/g, '')
    .replace(/\\frac/g, 'f') // 分数
    .replace(/\\partial/g, 'd') // 偏导
    .replace(/\\cdot|\*/g, '') // 乘号
    .toLowerCase();
}

// 比较关键词
function compareKeywords(user: string, reference: string): number {
  const userKeywords = extractKeywords(user);
  const refKeywords = extractKeywords(reference);

  if (refKeywords.length === 0) return 50;

  const matching = refKeywords.filter(k => userKeywords.includes(k));
  const ratio = matching.length / refKeywords.length;

  // 如果用户包含了所有关键概念，给高分
  if (ratio >= 0.9) return 90;
  if (ratio >= 0.7) return 75;
  if (ratio >= 0.5) return 55;
  if (ratio >= 0.3) return 35;
  return Math.max(10, ratio * 100);
}

// 提取关键词（扩充版）
function extractKeywords(text: string): string[] {
  const keywordCategories = {
    // 微积分
    calculus: ['导数', '微分', '积分', '极限', '偏导', '全微分', '梯度', '旋度', '散度',
               'derivative', 'differentiate', 'integral', 'limit', 'partial', 'gradient'],
    // 代数
    algebra: ['函数', '方程', '不等式', '多项式', '因式', '分解', '根', '解',
              'function', 'equation', 'inequality', 'polynomial', 'factor', 'root', 'solution'],
    // 矩阵
    matrix: ['矩阵', '行列式', '逆矩阵', '转置', '特征值', '特征向量', '秩',
             'matrix', 'determinant', 'inverse', 'transpose', 'eigenvalue', 'eigenvector', 'rank'],
    // 几何
    geometry: ['向量', '点', '线', '面', '角', '距离', '面积', '体积',
               'vector', 'point', 'line', 'plane', 'angle', 'distance', 'area', 'volume'],
    // 概率统计
    probability: ['概率', '期望', '方差', '分布', '样本', '统计',
                  'probability', 'expectation', 'variance', 'distribution', 'sample', 'statistics'],
    // 物理
    physics: ['加速度', '速度', '力', '能量', '动量', '功率', '功', '质量',
             'acceleration', 'velocity', 'force', 'energy', 'momentum', 'power', 'work', 'mass'],
    // 计算机
    cs: ['算法', '数据结构', '递归', '循环', '迭代', '复杂度', '时间', '空间',
         'algorithm', 'data structure', 'recursion', 'loop', 'iteration', 'complexity', 'time', 'space'],
    // 逻辑
    logic: ['证明', '推导', '归纳', '演绎', '假设', '结论', '因为', '所以', '因此',
            'prove', 'proof', 'derive', 'deduction', 'induction', 'hypothesis', 'conclusion', 'because', 'therefore'],
    // 运算
    operation: ['计算', '求解', '化简', '展开', '合并', '移项', '代入',
                'calculate', 'solve', 'simplify', 'expand', 'combine', 'substitute'],
  };

  const allKeywords = Object.values(keywordCategories).flat();
  return allKeywords.filter(k => text.toLowerCase().includes(k.toLowerCase()));
}

// 比较结构（步骤数、段落数）
function compareStructure(user: string, reference: string): number {
  const userSteps = countSteps(user);
  const refSteps = countSteps(reference);

  if (refSteps === 0) return 50;

  // 步骤数相近给高分
  const stepDiff = Math.abs(userSteps - refSteps);
  if (stepDiff === 0) return 100;
  if (stepDiff === 1) return 85;
  if (stepDiff <= 2) return 70;
  return Math.max(30, 100 - stepDiff * 15);
}

// 计算步骤数
function countSteps(text: string): number {
  // 通过标点符号和连接词估算步骤数
  const stepIndicators = ['，', '。', '；', '第一步', '第二步', '首先', '然后', '接着', '最后'];
  let count = 0;
  for (const indicator of stepIndicators) {
    const matches = text.split(indicator).length - 1;
    count += matches;
  }
  return Math.max(1, Math.round(count / 2));
}

// Hugging Face API 评分
async function getHuggingFaceScore(userAnswer: string, referenceAnswer: string): Promise<number> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (HF_API_TOKEN) {
    headers['Authorization'] = `Bearer ${HF_API_TOKEN}`;
  }

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${HF_MODEL}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: {
          text: userAnswer,
          text_pair: referenceAnswer,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error('HF API failed');
  }

  const result = await response.json();
  const entailment = result.find((r: { label: string }) => r.label === 'ENTAILMENT');

  if (entailment) {
    return Math.round(entailment.score * 100);
  }

  return 50;
}

// 生成反馈
function generateFeedback(
  score: number,
  userAnswer: string,
  referenceAnswer: string
): { score: number; feedback: string; isCorrect: boolean } {
  const isCorrect = score >= GRADING_CONFIG.correctThreshold;

  if (score >= 95) {
    return {
      score,
      feedback: '完美！答案完全正确！思路清晰，步骤完整。',
      isCorrect: true,
    };
  } else if (score >= 85) {
    return {
      score,
      feedback: '很好！答案基本正确，但还可以更加精确或完善。',
      isCorrect: true,
    };
  } else if (score >= 75) {
    return {
      score,
      feedback: '正确！答案抓住了核心要点，但部分细节可以改进。',
      isCorrect: true,
    };
  } else if (score >= 60) {
    return {
      score,
      feedback: '部分正确！思路是对的，但答案不够完整或存在一些错误。',
      isCorrect: false,
    };
  } else if (score >= 40) {
    return {
      score,
      feedback: '有一些正确的思路，但答案还需要完善。建议查看参考答案，理解完整解法。',
      isCorrect: false,
    };
  } else {
    return {
      score,
      feedback: '答案与参考答案有较大差异。建议仔细查看参考答案，理解解题思路和关键步骤。',
      isCorrect: false,
    };
  }
}

// 预定义题目库
export const QUESTION_BANK: Partial<DailyQuestion>[] = [
  {
    moduleId: 'advanced-math',
    title: '求偏导数',
    content: '设函数 $f(x,y) = x^2y + \\sin(xy)$，求 $\\frac{\\partial f}{\\partial x}$ 和 $\\frac{\\partial f}{\\partial y}$',
    answer: '$\\frac{\\partial f}{\\partial x} = 2xy + y\\cos(xy)$，$\\frac{\\partial f}{\\partial y} = x^2 + x\\cos(xy)$',
    difficulty: 3,
  },
  {
    moduleId: 'linear-algebra',
    title: '矩阵求逆',
    content: '已知矩阵 $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$，求 $A^{-1}$',
    answer: '$A^{-1} = \\frac{1}{-2}\\begin{pmatrix} 4 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 \\\\ 1.5 & -0.5 \\end{pmatrix}$',
    difficulty: 3,
  },
  {
    moduleId: 'highschool-math',
    title: '函数极值',
    content: '求函数 $f(x) = x^3 - 3x^2 + 2$ 在区间 $[-1, 3]$ 上的最大值和最小值。',
    answer: '求导得 $f\'(x) = 3x^2 - 6x = 3x(x-2)$，临界点为 $x=0$ 和 $x=2$。计算得 $f(-1)=-2$，$f(0)=2$，$f(2)=-2$，$f(3)=2$。最大值为2，最小值为-2。',
    difficulty: 2,
  },
  {
    moduleId: 'cs',
    title: '时间复杂度分析',
    content: '分析以下算法的时间复杂度：\n```\nfor i in range(n):\n    for j in range(i, n):\n        print(i, j)\n```',
    answer: '内层循环执行次数为 $n + (n-1) + (n-2) + ... + 1 = \\frac{n(n+1)}{2}$，因此时间复杂度为 $O(n^2)$',
    difficulty: 2,
  },
  {
    moduleId: 'highschool-physics',
    title: '牛顿第二定律应用',
    content: '一个质量为 $2\\text{kg}$ 的物体受到 $10\\text{N}$ 的水平拉力，在光滑水平面上运动，求物体的加速度。',
    answer: '根据牛顿第二定律 $F = ma$，加速度 $a = \\frac{F}{m} = \\frac{10}{2} = 5\\text{m/s}^2$',
    difficulty: 1,
  },
];

// 生成随机题目
export function generateRandomQuestion(date: string, moduleId: string): DailyQuestion {
  const moduleQuestions = QUESTION_BANK.filter(q => q.moduleId === moduleId);
  const questions = moduleQuestions.length > 0 ? moduleQuestions : QUESTION_BANK;

  const randomIndex = Math.floor(Math.random() * questions.length);
  const template = questions[randomIndex];

  return {
    id: `dq-v2-${date}-${moduleId}-${generateId()}`,
    moduleId: moduleId,
    date,
    title: template.title || '每日一题',
    content: template.content || '',
    images: [],
    answer: template.answer || '',
    answerImages: [],
    difficulty: template.difficulty || 2,
    isAutoGenerated: true,
    createdAt: new Date().toISOString(),
  };
}
