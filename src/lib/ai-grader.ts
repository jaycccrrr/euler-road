import { DailyQuestion, AnswerRecord } from '@/types';
import { generateId } from './utils';

// Hugging Face Inference API configuration
const HF_API_TOKEN = process.env.NEXT_PUBLIC_HF_API_TOKEN || '';
const HF_MODEL = 'facebook/bart-large-mnli'; // Using a general-purpose model

// Alternative: Use a simpler similarity-based approach without API
export async function gradeAnswer(
  question: DailyQuestion,
  userAnswer: string,
  userImages: string[]
): Promise<{ score: number; feedback: string; isCorrect: boolean }> {
  // If user has images, we can't grade automatically (for now)
  if (userImages.length > 0 && !userAnswer.trim()) {
    return {
      score: 50,
      feedback: '已收到您的图片答案，由于技术限制，请对照参考答案自行评分。参与即可获得5点经验值！',
      isCorrect: false,
    };
  }

  const referenceAnswer = question.answer;

  // If no API token, use simple similarity check
  if (!HF_API_TOKEN) {
    return simpleGrading(userAnswer, referenceAnswer);
  }

  try {
    // Try to use Hugging Face API
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            text: userAnswer,
            text_pair: referenceAnswer,
          },
        }),
      }
    );

    if (!response.ok) {
      // Fall back to simple grading
      return simpleGrading(userAnswer, referenceAnswer);
    }

    const result = await response.json();

    // Parse result and calculate score
    const entailment = result.find((r: { label: string }) => r.label === 'ENTAILMENT');
    const contradiction = result.find((r: { label: string }) => r.label === 'CONTRADICTION');

    let score = 50; // Default score

    if (entailment && entailment.score > 0.7) {
      score = 95;
    } else if (entailment && entailment.score > 0.5) {
      score = 75;
    } else if (contradiction && contradiction.score > 0.7) {
      score = 20;
    } else if (contradiction && contradiction.score > 0.5) {
      score = 40;
    }

    return generateFeedback(score, userAnswer, referenceAnswer);
  } catch (error) {
    console.error('AI grading error:', error);
    return simpleGrading(userAnswer, referenceAnswer);
  }
}

// Simple grading without API
function simpleGrading(userAnswer: string, referenceAnswer: string): { score: number; feedback: string; isCorrect: boolean } {
  const user = normalizeText(userAnswer);
  const reference = normalizeText(referenceAnswer);

  // Exact match
  if (user === reference) {
    return {
      score: 100,
      feedback: '完美！答案完全正确！思路清晰，步骤完整。',
      isCorrect: true,
    };
  }

  // Check for numerical matches (for math problems)
  const userNumbers = extractNumbers(user);
  const refNumbers = extractNumbers(reference);

  if (userNumbers.length > 0 && refNumbers.length > 0) {
    const matchingNumbers = userNumbers.filter(n => refNumbers.includes(n));
    const matchRatio = matchingNumbers.length / Math.max(userNumbers.length, refNumbers.length);

    if (matchRatio >= 0.8) {
      return {
        score: 90,
        feedback: '很好！答案的核心数值正确，但步骤或表述可以更加完整。',
        isCorrect: true,
      };
    } else if (matchRatio >= 0.5) {
      return {
        score: 60,
        feedback: '部分正确！部分数值正确，但可能遗漏了关键步骤或计算有误。',
        isCorrect: false,
      };
    }
  }

  // Keyword matching
  const userKeywords = extractKeywords(user);
  const refKeywords = extractKeywords(reference);
  const matchingKeywords = userKeywords.filter(k => refKeywords.includes(k));

  if (matchingKeywords.length >= refKeywords.length * 0.7) {
    return {
      score: 80,
      feedback: '不错！答案包含关键概念，但可能需要更准确的计算或更清晰的表述。',
      isCorrect: true,
    };
  } else if (matchingKeywords.length >= refKeywords.length * 0.4) {
    return {
      score: 50,
      feedback: '思路有一定道理，但答案不够完整或存在一些问题。建议查看参考答案学习。',
      isCorrect: false,
    };
  }

  return {
    score: 25,
    feedback: '答案与参考答案有较大差异。建议仔细查看参考答案，理解解题思路。',
    isCorrect: false,
  };
}

// Normalize text for comparison
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[，。！？、；：""''（）【】《》]/g, '')
    .trim();
}

// Extract numbers from text
function extractNumbers(text: string): number[] {
  const matches = text.match(/-?\d+\.?\d*/g);
  return matches ? matches.map(Number) : [];
}

// Extract keywords from text
function extractKeywords(text: string): string[] {
  // Common math and science keywords
  const keywords = [
    '导数', '积分', '微分', '极限', '函数', '方程', '矩阵', '向量',
    '加速度', '速度', '力', '能量', '动量', '功率', '功',
    '算法', '数据结构', '递归', '循环', '条件', '变量',
    '证明', '求解', '计算', '推导', '结论', '因为', '所以',
    'derivative', 'integral', 'limit', 'function', 'equation',
    'matrix', 'vector', 'acceleration', 'velocity', 'force',
    'algorithm', 'recursion', 'iteration', 'proof', 'solution'
  ];

  return keywords.filter(k => text.includes(k));
}

// Generate feedback based on score
function generateFeedback(
  score: number,
  userAnswer: string,
  referenceAnswer: string
): { score: number; feedback: string; isCorrect: boolean } {
  if (score >= 90) {
    return {
      score,
      feedback: '完美！答案完全正确！思路清晰，步骤完整。',
      isCorrect: true,
    };
  } else if (score >= 75) {
    return {
      score,
      feedback: '很好！答案基本正确，但还可以更加精确或完善。',
      isCorrect: true,
    };
  } else if (score >= 60) {
    return {
      score,
      feedback: '部分正确！思路是对的，但可能有些细节需要改进。',
      isCorrect: false,
    };
  } else if (score >= 40) {
    return {
      score,
      feedback: '有一些正确的思路，但答案还需要完善。建议查看参考答案。',
      isCorrect: false,
    };
  } else {
    return {
      score,
      feedback: '答案与参考答案有较大差异。建议仔细查看参考答案，理解解题思路。',
      isCorrect: false,
    };
  }
}

// Predefined questions bank (for auto-generation)
export const QUESTION_BANK: Partial<DailyQuestion>[] = [
  {
    moduleId: 'advanced-math',
    title: '求偏导数',
    content: '设函数 $f(x,y) = x^2y + \sin(xy)$，求 $\frac{\partial f}{\partial x}$ 和 $\frac{\partial f}{\partial y}$',
    answer: '$\frac{\partial f}{\partial x} = 2xy + y\cos(xy)$，$\frac{\partial f}{\partial y} = x^2 + x\cos(xy)$',
    difficulty: 3,
  },
  {
    moduleId: 'linear-algebra',
    title: '矩阵求逆',
    content: '已知矩阵 $A = \\begin{pmatrix} 1 & 2 \\ 3 & 4 \\end{pmatrix}$，求 $A^{-1}$',
    answer: '$A^{-1} = \\frac{1}{-2}\\begin{pmatrix} 4 & -2 \\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 \\ 1.5 & -0.5 \\end{pmatrix}$',
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

// Generate a random question from bank for a specific module
export function generateRandomQuestion(date: string, moduleId: string): DailyQuestion {
  // 过滤出该模块的题目
  const moduleQuestions = QUESTION_BANK.filter(q => q.moduleId === moduleId);

  // 如果没有该模块的题目，使用默认题目
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
