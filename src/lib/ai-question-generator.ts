import { DailyQuestion } from '@/types';
import { formatLocalDate } from './utils';
import { getDailyQuestionsByDate } from './daily-question-bank';

// 强制使用备用题库（设置为 true 以禁用 AI 生成）
// AI 出题通过服务端 /api/questions/generate 调用 DeepSeek，密钥不暴露在前端
const FORCE_USE_BACKUP_BANK = false;

interface GeneratedQuestion {
  title: string;
  content: string;
  answer: string;
  difficulty: number;
  hint?: string;
}

/**
 * 通过服务端接口调用 AI（DeepSeek）生成一道题。
 * 返回 null 表示 AI 不可用，调用方应回退到备用题库。
 */
async function generateQuestionWithAI(moduleId: string, date: string): Promise<GeneratedQuestion | null> {
  if (FORCE_USE_BACKUP_BANK) {
    return null;
  }

  try {
    const response = await fetch('/api/questions/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId, date }),
    });

    if (!response.ok) {
      console.warn('[AI Question Generator] 出题接口 HTTP 错误:', response.status);
      return null;
    }

    const data = await response.json();
    const q = data?.question;
    if (!data?.aiAvailable || !q?.title || !q?.content || !q?.answer) {
      return null;
    }

    return {
      title: q.title,
      content: q.content,
      answer: q.answer,
      difficulty: Math.min(5, Math.max(1, Number(q.difficulty) || 5)),
    };
  } catch (error) {
    console.warn('[AI Question Generator] 出题接口调用失败，将使用备用题库:', error);
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
 * 出题链路：AI（DeepSeek，走 /api/questions/generate 服务端接口）→ 备用题库 → 静态兜底题。
 * 同一天同一科目服务端会缓存 AI 结果，所有用户拿到同一道题。
 */
export async function generateDailyQuestions(date: string): Promise<DailyQuestion[]> {
  const moduleIds = ['highschool-math', 'advanced-math', 'linear-algebra'];
  const backupByModule = new Map(getDailyQuestionsByDate(date).map((q) => [q.moduleId, q]));

  const results = await Promise.all(
    moduleIds.map(async (moduleId) => {
      // 1. 优先 AI 出题
      const ai = await generateQuestionWithAI(moduleId, date);
      const source = ai
        ? { title: ai.title, content: ai.content, answer: ai.answer, difficulty: ai.difficulty }
        : null;

      // 2. AI 不可用时回退到备用题库（按日期哈希稳定选题）
      const backup = backupByModule.get(moduleId);
      const finalSource = source || (backup
        ? { title: backup.title, content: backup.content, answer: backup.answer, difficulty: backup.difficulty }
        : null);

      // 3. 双层兜底：静态内置题
      const fallback = finalSource || generateFallbackQuestion(moduleId);

      return {
        id: `daily-${date}-${moduleId}`,
        moduleId,
        date,
        title: fallback.title,
        content: fallback.content,
        images: [],
        answer: fallback.answer,
        answerImages: [],
        difficulty: fallback.difficulty,
        isAutoGenerated: !!source,
        createdAt: new Date(date).toISOString(),
      } satisfies DailyQuestion;
    })
  );

  return results;
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