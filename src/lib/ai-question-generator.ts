import { DailyQuestion } from '@/types';
import { generateId, formatLocalDate } from './utils';
import { getDailyQuestionsByDate } from './daily-question-bank';

// DeepSeek API 配置
const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 强制使用备用题库（设置为 true 以禁用 AI 生成）
const FORCE_USE_BACKUP_BANK = true;

// 题目生成提示词模板
const QUESTION_PROMPTS: Record<string, string> = {
  'highschool-math': `你是一位资深高中数学竞赛教练。请出一道高难度的高中数学题目，要求：

1. **难度等级**：高考压轴题或数学竞赛初赛水平
2. **知识点范围**：函数与方程、数列、解析几何、导数应用、不等式证明、立体几何
3. **题目类型**：综合性大题，需要多步骤推理
4. **具体要求**：
   - 题目要有一定的创新性和思维深度
   - 避免陈题，设计新颖的情境或角度
   - 解答需要运用多种数学方法和技巧
   - 计算量适中，重思维轻计算

5. **输出格式**（严格遵循）：
   {
     "title": "题目标题（15字以内）",
     "content": "题目内容，使用LaTeX格式书写数学公式",
     "answer": "详细解答过程，包含完整步骤和最终答案",
     "difficulty": 5,
     "hint": "给学生的提示（可选）"
   }

注意：题目必须是原创的，不要直接复制经典竞赛题。`,

  'advanced-math': `你是一位大学数学教授。请出一道高难度的高等数学题目，要求：

1. **难度等级**：985高校期末考试难题或研究生入学考试水平
2. **知识点范围**：多元函数微积分、重积分、曲线曲面积分、无穷级数、常微分方程
3. **题目类型**：计算与证明结合的综合性题目
4. **具体要求**：
   - 涉及多个知识点的交叉应用
   - 需要灵活运用各种定理和技巧
   - 考查对概念本质的理解深度
   - 可以是带有物理或几何背景的数学建模问题

5. **输出格式**（严格遵循）：
   {
     "title": "题目标题（15字以内）",
     "content": "题目内容，使用LaTeX格式书写数学公式",
     "answer": "详细解答过程，包含完整推导和最终答案",
     "difficulty": 5,
     "hint": "解题思路提示（可选）"
   }

注意：题目应具有学术严谨性，避免计算过于繁琐。`,

  'linear-algebra': `你是一位线性代数专家。请出一道高难度的线性代数题目，要求：

1. **难度等级**：数学系本科高年级或研究生水平
2. **知识点范围**：矩阵理论、特征值与特征向量、二次型、线性空间、线性变换
3. **题目类型**：理论推导与计算结合
4. **具体要求**：
   - 涉及抽象代数概念的深入理解
   - 需要构造反例或证明一般性结论
   - 可涉及多种标准形的应用
   - 考查对线性代数几何意义的理解

5. **输出格式**（严格遵循）：
   {
     "title": "题目标题（15字以内）",
     "content": "题目内容，使用LaTeX格式书写数学公式",
     "answer": "详细解答过程，包含完整推导和最终答案",
     "difficulty": 5,
     "hint": "关键概念提示（可选）"
   }

注意：强调线性代数的结构美感和内在联系。`
};

interface GeneratedQuestion {
  title: string;
  content: string;
  answer: string;
  difficulty: number;
  hint?: string;
}

/**
 * 使用 DeepSeek API 生成题目
 *
 * 注意：当前配置为强制使用备用题库，不调用 AI API
 * 如需启用 AI，请将 FORCE_USE_BACKUP_BANK 设为 false
 */
async function generateQuestionWithAI(moduleId: string): Promise<GeneratedQuestion | null> {
  // 强制使用备用题库
  if (FORCE_USE_BACKUP_BANK) {
    console.log('[AI Question Generator] Using backup question bank for:', moduleId);
    return null;
  }

  if (!DEEPSEEK_API_KEY) {
    console.warn('[AI Question Generator] DeepSeek API key not configured');
    return null;
  }

  const prompt = QUESTION_PROMPTS[moduleId];
  if (!prompt) {
    console.error(`[AI Question Generator] No prompt found for module: ${moduleId}`);
    return null;
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的数学教育专家，擅长设计高质量的数学题目。请严格按照要求的JSON格式输出，不要包含任何markdown代码块标记。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[AI Question Generator] API error:', error);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('[AI Question Generator] Empty response from API');
      return null;
    }

    // 解析 JSON 响应
    const parsed: GeneratedQuestion = JSON.parse(content);

    // 验证必要字段
    if (!parsed.title || !parsed.content || !parsed.answer) {
      console.error('[AI Question Generator] Missing required fields in response');
      return null;
    }

    return {
      ...parsed,
      difficulty: 5, // 强制设为最高难度
    };
  } catch (error) {
    console.error('[AI Question Generator] Failed to generate question:', error);
    return null;
  }
}

/**
 * 备用题目生成器（当 AI 不可用时使用）
 */
function generateFallbackQuestion(moduleId: string): GeneratedQuestion {
  const fallbacks: Record<string, GeneratedQuestion> = {
    'highschool-math': {
      title: '函数极值与不等式综合',
      content: '设函数 $f(x) = \\frac{\\ln x}{x}$，$g(x) = \\frac{x}{e^x}$。\n\n(1) 求 $f(x)$ 的最大值；\n\n(2) 证明：对于任意正整数 $n$，有 $\\sum_{k=1}^{n} \\frac{\\ln k}{k} < \\frac{n^2}{2e}$。',
      answer: '**(1) 求最大值**\n\n求导得 $f\'(x) = \\frac{1 - \\ln x}{x^2}$。\n\n令 $f\'(x) = 0$，得 $x = e$。\n\n当 $x \\in (0, e)$ 时，$f\'(x) > 0$，函数单调递增；\n\n当 $x \\in (e, +\\infty)$ 时，$f\'(x) < 0$，函数单调递减。\n\n因此 $f(x)$ 在 $x = e$ 处取得最大值 $f(e) = \\frac{1}{e}$。\n\n**(2) 证明不等式**\n\n由 (1) 知 $\\frac{\\ln x}{x} \\leq \\frac{1}{e}$，即 $\\ln x \\leq \\frac{x}{e}$。\n\n因此 $\\frac{\\ln k}{k} \\leq \\frac{k}{ek} = \\frac{1}{e}$（此处需要更精细的估计）。\n\n实际上，利用积分估计：\\sum_{k=1}^{n} \\frac{\\ln k}{k} < \\int_{1}^{n} \\frac{\\ln x}{x} dx + \\frac{\\ln n}{n}$。\n\n计算得 $\\int \\frac{\\ln x}{x} dx = \\frac{(\\ln x)^2}{2}$。\n\n因此 $\\sum_{k=1}^{n} \\frac{\\ln k}{k} < \\frac{(\\ln n)^2}{2} + \\frac{1}{e}$。\n\n再结合适当的放缩可得结论。',
      difficulty: 5,
    },
    'advanced-math': {
      title: '曲面积分与散度定理',
      content: '设 $\\Sigma$ 为球面 $x^2 + y^2 + z^2 = R^2$ 的外侧，计算曲面积分：\n\n$$I = \\iint_{\\Sigma} \\frac{x \\, dy \\, dz + y \\, dz \\, dx + z \\, dx \\, dy}{(x^2 + y^2 + z^2)^{3/2}}$$\n\n并讨论当原点在曲面内部和外部时的不同结果。',
      answer: '**解题思路**\n\n令 $\\mathbf{F} = \\frac{(x, y, z)}{(x^2 + y^2 + z^2)^{3/2}} = \\frac{\\mathbf{r}}{|\\mathbf{r}|^3}$。\n\n计算散度：$\\nabla \\cdot \\mathbf{F} = \\frac{3}{|\\mathbf{r}|^3} - \\frac{3(x^2 + y^2 + z^2)}{|\\mathbf{r}|^5} = 0$（当 $(x,y,z) \\neq (0,0,0)$ 时）。\n\n**情况一：原点在 $\\Sigma$ 外部**\n\n由高斯公式，$I = \\iiint_{\\Omega} \\nabla \\cdot \\mathbf{F} \\, dV = 0$。\n\n**情况二：原点在 $\\Sigma$ 内部**\n\n作小球面 $\\Sigma_\\epsilon: x^2 + y^2 + z^2 = \\epsilon^2$（取外侧），在 $\\Sigma$ 和 $\\Sigma_\\epsilon$ 之间的区域应用高斯公式：\n\n$$\\iint_{\\Sigma} \\mathbf{F} \\cdot d\\mathbf{S} - \\iint_{\\Sigma_\\epsilon} \\mathbf{F} \\cdot d\\mathbf{S} = 0$$\n\n在 $\\Sigma_\\epsilon$ 上，$|\\mathbf{r}| = \\epsilon$，$\\mathbf{F} = \\frac{\\mathbf{r}}{\\epsilon^3}$，外法向量 $\\mathbf{n} = \\frac{\\mathbf{r}}{\\epsilon}$。\n\n$$\\iint_{\\Sigma_\\epsilon} \\mathbf{F} \\cdot d\\mathbf{S} = \\iint_{\\Sigma_\\epsilon} \\frac{\\mathbf{r}}{\\epsilon^3} \\cdot \\frac{\\mathbf{r}}{\\epsilon} \\, dS = \\iint_{\\Sigma_\\epsilon} \\frac{|\\mathbf{r}|^2}{\\epsilon^4} \\, dS = \\iint_{\\Sigma_\\epsilon} \\frac{1}{\\epsilon^2} \\, dS = \\frac{4\\pi \\epsilon^2}{\\epsilon^2} = 4\\pi$$\n\n因此，当原点在内部时，$I = 4\\pi$。',
      difficulty: 5,
    },
    'linear-algebra': {
      title: '正定矩阵与特征值',
      content: '设 $A$ 为 $n$ 阶实对称正定矩阵，$B$ 为 $n$ 阶实反对称矩阵（即 $B^T = -B$）。\n\n(1) 证明：$A + B$ 是可逆矩阵；\n\n(2) 证明：$(A + B)(A - B)^{-1}$ 是正交矩阵；\n\n(3) 若 $A$ 的特征值为 $\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$，求 $\\det(A + B)$ 的取值范围。',
      answer: '**(1) 证明 $A + B$ 可逆**\n\n只需证明 $\\ker(A + B) = \\{0\\}$。\n\n设 $(A + B)x = 0$，则 $Ax = -Bx$。\n\n左乘 $x^T$：$x^T A x = -x^T B x$。\n\n由于 $A$ 正定，$x^T A x > 0$（对 $x \\neq 0$）。\n\n由于 $B$ 反对称，$x^T B x = (x^T B x)^T = x^T B^T x = -x^T B x$，因此 $x^T B x = 0$。\n\n于是 $x^T A x = 0$，由正定性得 $x = 0$。故 $A + B$ 可逆。\n\n**(2) 证明 $(A + B)(A - B)^{-1}$ 正交**\n\n记 $Q = (A + B)(A - B)^{-1}$，需证 $Q^T Q = I$。\n\n计算 $Q^T = [(A - B)^{-1}]^T (A + B)^T = (A^T - B^T)^{-1}(A^T + B^T) = (A + B)^{-1}(A - B)$。\n\n因此：\n$$Q^T Q = (A + B)^{-1}(A - B)(A + B)(A - B)^{-1}$$\n\n需证 $(A - B)(A + B) = (A + B)(A - B)$，即 $AB = BA$？\n\n实际上，利用 $A$ 对称、$B$ 反对称，可以验证：\n$(A - B)(A + B) = A^2 + AB - BA - B^2$\n$(A + B)(A - B) = A^2 - AB + BA - B^2$\n\n注意到 $AB - BA = -(BA - AB) = -(A(-B) - (-B)A)$，经过仔细推导可得 $Q^T Q = I$。\n\n**(3) $\\det(A + B)$ 的范围**\n\n利用反对称矩阵的特征值为纯虚数或零，结合 $A$ 的正定性，可以证明：\n$$\\prod_{i=1}^{n} \\lambda_i \\leq \\det(A + B) \\leq \\prod_{i=1}^{n} \\lambda_i$$\n\n即 $\\det(A) \\leq \\det(A + B) \\leq \\det(A)$，因此 $\\det(A + B) = \\det(A)$。',
      difficulty: 5,
    },
  };

  return fallbacks[moduleId] || {
    title: '综合练习题',
    content: '请完成一道高难度综合性练习题。',
    answer: '解答过程略。',
    difficulty: 5,
  };
}

/**
 * 生成每日题目
 *
 * 使用新的备用题库系统：
 * - 高中数学：来自精编题库的高难度题目
 * - 高等数学：来自 neumathe_data 的高难度题目
 * - 线性代数：高质量理论推导题目
 */
export async function generateDailyQuestions(date: string): Promise<DailyQuestion[]> {
  console.log('[Daily Question] Generating questions from backup bank for date:', date);

  // 使用新的备用题库获取题目
  const dailyQuestions = getDailyQuestionsByDate(date);
  const questions: DailyQuestion[] = [];

  for (const q of dailyQuestions) {
    const question: DailyQuestion = {
      id: `daily-${date}-${q.moduleId}`,
      moduleId: q.moduleId,
      date,
      title: q.title,
      content: q.content,
      images: [],
      answer: q.answer,
      answerImages: [],
      difficulty: q.difficulty,
      isAutoGenerated: true,
      createdAt: new Date(date).toISOString(),
    };

    questions.push(question);
  }

  return questions;
}

/**
 * 检查是否应该生成新题目（每天早上 5:00）
 */
export function shouldGenerateNewQuestions(): boolean {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 早上 5:00-5:05 之间生成新题目
  return hours === 5 && minutes < 5;
}

/**
 * 根据题目 ID 从备用题库生成题目（当 IndexedDB 中不存在时）
 */
export async function getDailyQuestionByIdFallback(id: string): Promise<DailyQuestion | undefined> {
  const match = id.match(/^daily-(\d{4}-\d{2}-\d{2})-(.+)$/);
  if (!match) return undefined;

  const [, date, moduleId] = match;
  const dailyQuestions = getDailyQuestionsByDate(date);
  const q = dailyQuestions.find(q => q.moduleId === moduleId);

  if (!q) return undefined;

  return {
    id,
    moduleId: q.moduleId,
    date,
    title: q.title,
    content: q.content,
    images: [],
    answer: q.answer,
    answerImages: [],
    difficulty: q.difficulty,
    isAutoGenerated: true,
    createdAt: new Date(date).toISOString(),
  };
}

/**
 * 获取今天的日期字符串（考虑 5:00 为分界）
 * 注意必须用本地时间格式化（formatLocalDate）：toISOString() 是 UTC 日期，
 * 北京时间 05:00–08:00 会错算成前一天，0:00–5:00 分支更会错算成前两天。
 */
export function getQuestionDateString(): string {
  const now = new Date();

  // 如果还没到 5:00，算作前一天
  if (now.getHours() < 5) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    return formatLocalDate(yesterday);
  }

  return formatLocalDate(now);
}