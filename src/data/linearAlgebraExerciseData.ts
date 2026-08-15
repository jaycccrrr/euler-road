// 线性代数基础篇 - 例题练习数据
import { StaticQuestionBankChapter } from './highschoolStatic';

export const linearAlgebraExerciseChapters: StaticQuestionBankChapter[] = [
  {
    id: 'la-ch-1',
    title: '行列式',
    icon: '| |',
    questions: [
      {
        id: 'la-1-q-1',
        blocks: [
          { id: 'la-1-q-1-b', type: 'text', content: '行列式 $$\\begin{vmatrix} 2 & 5 \\\\ 3 & 8 \\end{vmatrix}$$ 的值为 $[\\quad]$' },
        ],
        options: ['$1$', '$-1$', '$31$', '$-31$'],
        correctOption: 0,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-1-q-1-s', type: 'text', content: '$$\\begin{vmatrix} 2 & 5 \\\\ 3 & 8 \\end{vmatrix} = 2 \\times 8 - 5 \\times 3 = 16 - 15 = 1$$' },
        ],
      },
      {
        id: 'la-1-q-2',
        blocks: [
          { id: 'la-1-q-2-b', type: 'text', content: '若 $D = 5$，则 $$D_1 = \\begin{vmatrix} 3a & 3b \\\\ c & d \\end{vmatrix}$$ 的值为 $[\\quad]$' },
        ],
        options: ['$5$', '$15$', '$-5$', '$-15$'],
        correctOption: 1,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-1-q-2-s', type: 'text', content: '将第一行提取公因子 3：$$D_1 = 3 \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = 3D = 3 \\times 5 = 15$$' },
        ],
      },
      {
        id: 'la-1-q-3',
        blocks: [
          { id: 'la-1-q-3-b', type: 'text', content: '设 $A$ 为3阶方阵，$|A| = 3$，则 $|2A| = [\\quad]$' },
        ],
        options: ['$6$', '$12$', '$24$', '$3$'],
        correctOption: 2,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-1-q-3-s', type: 'text', content: '对于 $n$ 阶方阵 $A$，$|kA| = k^n |A|$。\n$$|2A| = 2^3 |A| = 8 \\times 3 = 24$$' },
        ],
      },
      {
        id: 'la-1-q-4',
        blocks: [
          { id: 'la-1-q-4-b', type: 'text', content: '行列式 $$\\begin{vmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{vmatrix}$$ 的值为 $[\\quad]$' },
        ],
        options: ['$0$', '$1$', '$-1$', '$9$'],
        correctOption: 0,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-1-q-4-s', type: 'text', content: '第2行减去第1行的2倍，第3行减去第2行：\n$$\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & -3 & -6 \\\\ 0 & 0 & 0 \\end{vmatrix} = 0$$\n第三行全为零，故行列式为 0。' },
        ],
      },
    ],
  },
  {
    id: 'la-ch-2',
    title: '矩阵及其运算',
    icon: '[ ]',
    questions: [
      {
        id: 'la-2-q-1',
        blocks: [
          { id: 'la-2-q-1-b', type: 'text', content: '设 $A$ 为 $n$ 阶可逆矩阵，$|A| = 2$，则 $|A^{-1}| = [\\quad]$' },
        ],
        options: ['$2$', '$-2$', '$\\frac{1}{2}$', '$-\\frac{1}{2}$'],
        correctOption: 2,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-2-q-1-s', type: 'text', content: '由 $AA^{-1} = E$，得 $|A| \\cdot |A^{-1}| = |E| = 1$\n$$|A^{-1}| = \\frac{1}{|A|} = \\frac{1}{2}$$' },
        ],
      },
      {
        id: 'la-2-q-2',
        blocks: [
          { id: 'la-2-q-2-b', type: 'text', content: '设 $A$, $B$ 均为 $n$ 阶方阵，下列等式正确的是 $[\\quad]$' },
        ],
        options: ['$(AB)^T = A^T B^T$', '$|AB| = |A| \\cdot |B|$', '$AB = BA$', '$(AB)^{-1} = A^{-1} B^{-1}$'],
        correctOption: 1,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-2-q-2-s', type: 'text', content: '- A 错：$(AB)^T = B^T A^T$\n- **B 对**：$|AB| = |A| \\cdot |B|$（行列式乘法性质）\n- C 错：矩阵乘法一般不满足交换律\n- D 错：$(AB)^{-1} = B^{-1} A^{-1}$' },
        ],
      },
      {
        id: 'la-2-q-3',
        blocks: [
          { id: 'la-2-q-3-b', type: 'text', content: '设 $$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$$，则 $A^T = [\\quad]$' },
        ],
        options: ['$\\left(\\begin{smallmatrix} 1 & 3 \\\\ 2 & 4 \\end{smallmatrix}\\right)$', '$\\left(\\begin{smallmatrix} 4 & 2 \\\\ 3 & 1 \\end{smallmatrix}\\right)$', '$\\left(\\begin{smallmatrix} 1 & 2 \\\\ 3 & 4 \\end{smallmatrix}\\right)$', '$\\left(\\begin{smallmatrix} 4 & 3 \\\\ 2 & 1 \\end{smallmatrix}\\right)$'],
        correctOption: 0,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-2-q-3-s', type: 'text', content: '转置即将行列互换：$$A^T = \\begin{pmatrix} 1 & 3 \\\\ 2 & 4 \\end{pmatrix}$$' },
        ],
      },
      {
        id: 'la-2-q-4',
        blocks: [
          { id: 'la-2-q-4-b', type: 'text', content: '设矩阵 $A$ 的秩 $r(A) = r$，则 $r(A^T) = [\\quad]$' },
        ],
        options: ['$r$', '$2r$', '$r/2$', '无法确定'],
        correctOption: 0,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-2-q-4-s', type: 'text', content: '矩阵的秩与其转置矩阵的秩相等：$$r(A^T) = r(A) = r$$\n这是因为行列式子式的转置仍然存在且非零性不变。' },
        ],
      },
    ],
  },
  {
    id: 'la-ch-3',
    title: '向量组的线性相关性',
    icon: '→',
    questions: [
      {
        id: 'la-3-q-1',
        blocks: [
          { id: 'la-3-q-1-b', type: 'text', content: '若向量组 $\\alpha_1, \\alpha_2, \\alpha_3$ 线性无关，则下列向量组也线性无关的是 $[\\quad]$' },
        ],
        options: [
          '$\\alpha_1 + \\alpha_2, \\alpha_2 + \\alpha_3, \\alpha_3 + \\alpha_1$',
          '$\\alpha_1 - \\alpha_2, \\alpha_2 - \\alpha_3, \\alpha_3 - \\alpha_1$',
          '$\\alpha_1, \\alpha_1 + \\alpha_2, \\alpha_1 + \\alpha_2 + \\alpha_3$',
          '$\\alpha_1, 2\\alpha_2, 3\\alpha_3$',
        ],
        correctOption: 2,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-3-q-1-s', type: 'text', content: '- A：$(\\alpha_1+\\alpha_2) + (\\alpha_2+\\alpha_3) - (\\alpha_3+\\alpha_1) = 2\\alpha_2$，线性相关\n- B：$(\\alpha_1-\\alpha_2) + (\\alpha_2-\\alpha_3) + (\\alpha_3-\\alpha_1) = 0$，线性相关\n- **C 对**：设 $k_1\\alpha_1 + k_2(\\alpha_1+\\alpha_2) + k_3(\\alpha_1+\\alpha_2+\\alpha_3) = 0$，整理得 $(k_1+k_2+k_3)\\alpha_1 + (k_2+k_3)\\alpha_2 + k_3\\alpha_3 = 0$，由线性无关知 $k_1=k_2=k_3=0$\n- D：含比例因子，仍线性无关，但C是更典型的结论' },
        ],
      },
      {
        id: 'la-3-q-2',
        blocks: [
          { id: 'la-3-q-2-b', type: 'text', content: '向量组 $\\alpha_1, \\alpha_2, \\cdots, \\alpha_m$ 线性相关的充要条件是 $[\\quad]$' },
        ],
        options: [
          '其中有一个向量是零向量',
          '其中有一个向量可由其余向量线性表示',
          '其中至少有一个向量可由其余向量线性表示',
          '每个向量都可由其余向量线性表示',
        ],
        correctOption: 2,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-3-q-2-s', type: 'text', content: '**充要条件**：向量组线性相关 $\\Leftrightarrow$ 至少有一个向量可由其余向量线性表示。\n\n注意区分：\n- "有一个" 是充分条件但非必要（例如 $\\alpha_1=(1,0), \\alpha_2=(2,0), \\alpha_3=(0,1)$ 线性相关，但没有零向量）\n- "每个" 是充分条件但非必要' },
        ],
      },
    ],
  },
  {
    id: 'la-ch-4',
    title: '线性方程组',
    icon: 'Ax=b',
    questions: [
      {
        id: 'la-4-q-1',
        blocks: [
          { id: 'la-4-q-1-b', type: 'text', content: '设 $A$ 是 $m \\times n$ 矩阵，齐次线性方程组 $Ax = 0$ 仅有零解的充要条件是 $[\\quad]$' },
        ],
        options: [
          '$A$ 的行向量组线性无关',
          '$A$ 的列向量组线性无关',
          '$A$ 的行向量组线性相关',
          '$A$ 的列向量组线性相关',
        ],
        correctOption: 1,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-4-q-1-s', type: 'text', content: '$Ax = 0$ 仅有零解 $\\Leftrightarrow$ $r(A) = n$（列数）$\\Leftrightarrow$ $A$ 的列向量组线性无关。\n\n因为 $Ax = x_1\\alpha_1 + x_2\\alpha_2 + \\cdots + x_n\\alpha_n = 0$ 仅有零解，即列向量的线性组合为零当且仅当系数全为零。' },
        ],
      },
      {
        id: 'la-4-q-2',
        blocks: [
          { id: 'la-4-q-2-b', type: 'text', content: '非齐次线性方程组 $Ax = b$ 有无穷多解的充要条件是 $[\\quad]$' },
        ],
        options: [
          '$r(A) = r(\\bar{A}) < n$',
          '$r(A) = r(\\bar{A}) = n$',
          '$r(A) < r(\\bar{A})$',
          '$r(A) = r(\\bar{A})$',
        ],
        correctOption: 0,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-4-q-2-s', type: 'text', content: '**非齐次方程组解的判定**：\n- 无解：$r(A) \\neq r(\\bar{A})$（即 $r(A) < r(\\bar{A})$）\n- **唯一解**：$r(A) = r(\\bar{A}) = n$\n- **无穷多解**：$r(A) = r(\\bar{A}) < n$\n\n其中 $\\bar{A} = (A|b)$ 为增广矩阵，$n$ 为未知数个数。' },
        ],
      },
    ],
  },
  {
    id: 'la-ch-5',
    title: '特征值与特征向量',
    icon: 'λ',
    questions: [
      {
        id: 'la-5-q-1',
        blocks: [
          { id: 'la-5-q-1-b', type: 'text', content: '设 $A$ 是 $n$ 阶方阵，$\\lambda_0$ 是 $A$ 的一个特征值，则 $\\lambda_0$ 是 $[\\quad]$ 的根' },
        ],
        options: ['$|A| = 0$', '$|\\lambda E + A| = 0$', '$|\\lambda E - A| = 0$', '$|A - \\lambda E| = 0$'],
        correctOption: 2,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-5-q-1-s', type: 'text', content: '$\\lambda_0$ 是 $A$ 的特征值 $\\Leftrightarrow$ 存在非零向量 $x$ 使得 $Ax = \\lambda_0 x$\n$\\Leftrightarrow$ $(\\lambda_0 E - A)x = 0$ 有非零解\n$\\Leftrightarrow$ $|\\lambda_0 E - A| = 0$\n\n因此 $\\lambda_0$ 是特征方程 $|\\lambda E - A| = 0$ 的根。' },
        ],
      },
      {
        id: 'la-5-q-2',
        blocks: [
          { id: 'la-5-q-2-b', type: 'text', content: '设3阶矩阵 $A$ 的特征值为 $1, 2, 3$，则 $|A| = [\\quad]$' },
        ],
        options: ['$1$', '$6$', '$-6$', '$0$'],
        correctOption: 1,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-5-q-2-s', type: 'text', content: '**特征值与行列式的关系**：$$|A| = \\lambda_1 \\cdot \\lambda_2 \\cdot \\lambda_3 = 1 \\times 2 \\times 3 = 6$$\n\n一般地，$n$ 阶方阵的行列式等于其所有特征值之积。' },
        ],
      },
      {
        id: 'la-5-q-3',
        blocks: [
          { id: 'la-5-q-3-b', type: 'text', content: '设 $A$ 的特征值为 $\\lambda$，则 $A^2$ 的特征值为 $[\\quad]$' },
        ],
        options: ['$\\lambda$', '$2\\lambda$', '$\\lambda^2$', '$\\sqrt{\\lambda}$'],
        correctOption: 2,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-5-q-3-s', type: 'text', content: '设 $Ax = \\lambda x$（$x \\neq 0$），则：$$A^2 x = A(Ax) = A(\\lambda x) = \\lambda Ax = \\lambda \\cdot \\lambda x = \\lambda^2 x$$\n\n因此 $A^2$ 的特征值为 $\\lambda^2$。\n\n推广：$A^k$ 的特征值为 $\\lambda^k$，$f(A)$ 的特征值为 $f(\\lambda)$。' },
        ],
      },
    ],
  },
  {
    id: 'la-ch-6',
    title: '二次型',
    icon: 'Q',
    questions: [
      {
        id: 'la-6-q-1',
        blocks: [
          { id: 'la-6-q-1-b', type: 'text', content: '实二次型 $f(x_1,x_2,x_3) = x_1^2 + 2x_2^2 + 3x_3^2 + 2x_1x_2$ 的矩阵为 $[\\quad]$' },
        ],
        options: [
          '$\\left(\\begin{smallmatrix} 1 & 2 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{smallmatrix}\\right)$',
          '$\\left(\\begin{smallmatrix} 1 & 1 & 0 \\\\ 1 & 2 & 0 \\\\ 0 & 0 & 3 \\end{smallmatrix}\\right)$',
          '$\\left(\\begin{smallmatrix} 1 & 1 & 0 \\\\ 2 & 2 & 0 \\\\ 0 & 0 & 3 \\end{smallmatrix}\\right)$',
          '$\\left(\\begin{smallmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{smallmatrix}\\right)$',
        ],
        correctOption: 1,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-6-q-1-s', type: 'text', content: '二次型的矩阵必须是对称矩阵。交叉项 $2x_1x_2$ 对应 $a_{12} = a_{21} = 1$。\n$$A = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 2 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$$\n验证：$f = x^TAx = x_1^2 + x_1x_2 + x_2x_1 + 2x_2^2 + 3x_3^2 = x_1^2 + 2x_1x_2 + 2x_2^2 + 3x_3^2$ ✓' },
        ],
      },
      {
        id: 'la-6-q-2',
        blocks: [
          { id: 'la-6-q-2-b', type: 'text', content: '实对称矩阵 $A$ 正定的充要条件是 $[\\quad]$' },
        ],
        options: [
          '所有特征值非负',
          '所有特征值大于零',
          '主对角线元素都大于零',
          '行列式大于零',
        ],
        correctOption: 1,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-6-q-2-s', type: 'text', content: '**正定的充要条件**：实对称矩阵 $A$ 正定 $\\Leftrightarrow$ 所有特征值 $\\lambda_i > 0$。\n\n注意其他选项的问题：\n- A："非负" 包括零，不是正定（是半正定）\n- C：主对角线大于零是正定的必要条件但非充分条件\n- D：行列式大于零是正定的必要条件但非充分条件（需所有顺序主子式都大于零）' },
        ],
      },
    ],
  },
  {
    id: 'la-ch-7',
    title: '线性空间与线性变换',
    icon: 'V',
    questions: [
      {
        id: 'la-7-q-1',
        blocks: [
          { id: 'la-7-q-1-b', type: 'text', content: '下列集合关于给定的运算构成实数域 $\\mathbb{R}$ 上的线性空间的是 $[\\quad]$' },
        ],
        options: [
          '全体 $n$ 阶实对称矩阵关于矩阵加法和数乘',
          '全体 $n$ 阶实可逆矩阵关于矩阵加法和数乘',
          '全体次数等于 $n$ 的实系数多项式关于多项式加法和数乘',
          '全体正实数关于普通加法和数乘',
        ],
        correctOption: 0,
        choiceType: 'single',
        hintBlocks: [],
        solutionBlocks: [
          { id: 'la-7-q-1-s', type: 'text', content: '- **A 对**：实对称矩阵的和仍为实对称矩阵，数乘仍为实对称矩阵，满足8条线性空间公理。\n- B 错：可逆矩阵之和未必可逆（如 $E + (-E) = 0$），不封闭。\n- C 错：次数等于 $n$ 的多项式之和次数可能小于 $n$（如 $x^n + (-x^n + 1) = 1$），不封闭。\n- D 错：正实数的数乘 $k \\cdot a$（$k<0$时）结果为负数，不在集合内，不封闭。' },
        ],
      },
    ],
  },
];

// 大章节分组
export const linearAlgebraMajorChapters = [
  { id: 'la-major-1', title: '行列式与矩阵', icon: '📊' },
  { id: 'la-major-2', title: '向量与方程组', icon: '→' },
  { id: 'la-major-3', title: '特征值与二次型', icon: 'λ' },
  { id: 'la-major-4', title: '线性空间', icon: 'V' },
];

export function getLinearAlgebraGroupedChapters() {
  const groups = [
    { major: linearAlgebraMajorChapters[0], chapters: linearAlgebraExerciseChapters.slice(0, 2) },
    { major: linearAlgebraMajorChapters[1], chapters: linearAlgebraExerciseChapters.slice(2, 4) },
    { major: linearAlgebraMajorChapters[2], chapters: linearAlgebraExerciseChapters.slice(4, 6) },
    { major: linearAlgebraMajorChapters[3], chapters: linearAlgebraExerciseChapters.slice(6, 7) },
  ];
  return groups;
}

export const linearAlgebraTotalExercises = linearAlgebraExerciseChapters.reduce(
  (sum, ch) => sum + ch.questions.length,
  0,
);
