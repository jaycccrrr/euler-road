// 线性代数详细内容 - ContentBlock 格式
// 生成时间: 2025-04-02

import { ContentBlock } from './highschoolMath';

export interface LinearAlgebraLesson {
  id: string;
  title: string;
  difficulty: number;
  blocks: ContentBlock[];
}

export interface LinearAlgebraChapter {
  id: string;
  title: string;
  icon: string;
  lessons: LinearAlgebraLesson[];
}

// 行列式课程
const determinantBlocks: ContentBlock[] = [
  {
    id: 'block-la-1-0',
    type: 'text',
    content: '## 行列式的定义\n\n### 二阶行列式\n$$\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$$\n\n### 三阶行列式\n对角线法则展开，共6项\n\n### n阶行列式\n$$D = \\sum (-1)^{\\tau(j_1 j_2 \\cdots j_n)} a_{1j_1}a_{2j_2} \\cdots a_{nj_n}$$'
  },
  {
    id: 'block-la-1-1',
    type: 'text',
    content: '## 行列式的性质\n\n1. **转置不变**：$D^{T} = D$\n2. **交换两行（列）**：变号\n3. **某行（列）乘$k$**：等于$kD$\n4. **拆行（列）**：某行可拆分为两数之和时，$D$可拆为两个行列式之和\n5. **倍加不变**：某行（列）的$k$倍加到另一行（列），$D$不变'
  },
  {
    id: 'block-la-1-2',
    type: 'text',
    content: '## 行列式展开\n\n**余子式**：$M_{ij}$，划去第$i$行第$j$列后的$n-1$阶行列式\n\n**代数余子式**：$A_{ij} = (-1)^{i+j} M_{ij}$\n\n**展开定理**：\n- 按行展开：$D = a_{i1}A_{i1} + a_{i2}A_{i2} + \\cdots + a_{in}A_{in}$\n- 异乘性质：$a_{i1}A_{j1} + a_{i2}A_{j2} + \\cdots + a_{in}A_{jn} = 0$（$i \\neq j$）'
  },
  {
    id: 'block-la-1-3',
    type: 'text',
    content: '## 特殊行列式\n\n- 对角行列式、三角行列式\n- 范德蒙德行列式\n- 分块行列式\n\n### 克拉默法则\n对于$n$元线性方程组$Ax=b$，当$|A| \\neq 0$时：\n$$x_i = \\frac{D_i}{D} \\quad (i=1,2,\\ldots,n)$$\n其中$D_i$是将$D$的第$i$列换为$b$所得的行列式'
  }
];

// 矩阵及其运算课程
const matrixBlocks: ContentBlock[] = [
  {
    id: 'block-la-2-0',
    type: 'text',
    content: '## 矩阵的基本概念\n\n**定义**：$m \\times n$个数排成的$m$行$n$列的数表\n\n**特殊矩阵**：\n- 零矩阵、单位矩阵$E$、对角矩阵\n- 数量矩阵、三角矩阵\n- 对称矩阵：$A^{T} = A$\n- 反对称矩阵：$A^{T} = -A$\n- 正交矩阵：$A^{T}A = AA^{T} = E$'
  },
  {
    id: 'block-la-2-1',
    type: 'text',
    content: '## 矩阵运算\n\n**加法**：对应元素相加（同型矩阵）\n\n**数乘**：$kA = (ka_{ij})$\n\n**乘法**：\n- 条件：$A_{m \\times n}B_{n \\times p} = C_{m \\times p}$\n- 元素：$c_{ij} = \\sum_{k=1}^{n} a_{ik}b_{kj}$\n- 性质：一般不满足交换律，满足结合律、分配律\n\n**转置**：\n- $(A^{T})^{T} = A$\n- $(A+B)^{T} = A^{T} + B^{T}$\n- $(kA)^{T} = kA^{T}$\n- $(AB)^{T} = B^{T}A^{T}$'
  },
  {
    id: 'block-la-2-2',
    type: 'text',
    content: '## 逆矩阵\n\n**定义**：若$AB=BA=E$，则$B=A^{-1}$\n\n**存在的充要条件**：$|A| \\neq 0$\n\n**求逆方法**：\n- 伴随矩阵法：$A^{-1} = \\dfrac{A^{*}}{|A|}$\n- 初等变换法：$[A \\mid E] \\to [E \\mid A^{-1}]$\n\n**性质**：\n- $(A^{-1})^{-1} = A$\n- $(kA)^{-1} = \\frac{1}{k}A^{-1}$（$k \\neq 0$）\n- $(AB)^{-1} = B^{-1}A^{-1}$\n- $(A^{T})^{-1} = (A^{-1})^{T}$'
  },
  {
    id: 'block-la-2-3',
    type: 'text',
    content: '## 矩阵的秩\n\n**定义**：矩阵中非零子式的最高阶数\n\n**求秩方法**：初等行变换化为行阶梯形，非零行数即为秩\n\n**性质**：\n- $r(A) = r(A^{T})$\n- $r(kA) = r(A)$（$k \\neq 0$）\n- $r(A+B) \\leq r(A) + r(B)$\n- $r(AB) \\leq \\min\\{r(A), r(B)\\}$'
  }
];

// 向量组的线性相关性课程
const vectorBlocks: ContentBlock[] = [
  {
    id: 'block-la-3-0',
    type: 'text',
    content: '## n维向量\n\n**定义**：$n$个有序数$(a_1, a_2, \\ldots, a_n)$组成的数组\n\n**运算**：加法、数乘（同矩阵运算）'
  },
  {
    id: 'block-la-3-1',
    type: 'text',
    content: '## 线性组合与线性表示\n\n**线性组合**：$k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_m\\alpha_m$\n\n**线性表示**：$\\beta$可由$\\alpha_1, \\alpha_2, \\ldots, \\alpha_m$线性表示\n$\\Leftrightarrow$存在$k_1, k_2, \\ldots, k_m$使得$\\beta = k_1\\alpha_1 + k_2\\alpha_2 + \\cdots + k_m\\alpha_m$\n$\\Leftrightarrow r(\\alpha_1, \\ldots, \\alpha_m) = r(\\alpha_1, \\ldots, \\alpha_m, \\beta)$'
  },
  {
    id: 'block-la-3-2',
    type: 'text',
    content: '## 线性相关与线性无关\n\n**定义**：\n- 线性相关：存在不全为零的$k_1, k_2, \\ldots, k_m$使$k_1\\alpha_1 + \\cdots + k_m\\alpha_m = 0$\n- 线性无关：仅当$k_1 = \\cdots = k_m = 0$时上式成立\n\n**判定方法**：\n- 向量组$\\alpha_1, \\alpha_2, \\ldots, \\alpha_m$线性相关 $\\Leftrightarrow r(\\alpha_1, \\ldots, \\alpha_m) < m$\n- 向量组$\\alpha_1, \\alpha_2, \\ldots, \\alpha_m$线性无关 $\\Leftrightarrow r(\\alpha_1, \\ldots, \\alpha_m) = m$\n\n**重要结论**：\n- $n+1$个$n$维向量必线性相关\n- 部分相关则整体相关，整体无关则部分无关\n- 线性无关组添加分量仍无关，线性相关组减少分量仍相关'
  },
  {
    id: 'block-la-3-3',
    type: 'text',
    content: '## 向量组的秩\n\n**极大线性无关组**：\n- 部分组线性无关\n- 原向量组中任一向量可由它线性表示\n\n**向量组的秩**：极大线性无关组所含向量的个数\n\n**矩阵的行秩=列秩=矩阵的秩**\n\n### 向量空间\n**基**：向量空间的极大线性无关组\n**维数**：基所含向量的个数\n**坐标**：向量在基下的表示系数'
  }
];

// 线性方程组课程
const equationBlocks: ContentBlock[] = [
  {
    id: 'block-la-4-0',
    type: 'text',
    content: '## 线性方程组的表示\n\n**一般形式**：\n$$\\begin{cases} a_{11}x_1 + \\cdots + a_{1n}x_n = b_1 \\\\ \\cdots \\\\ a_{m1}x_1 + \\cdots + a_{mn}x_n = b_m \\end{cases}$$\n\n**矩阵形式**：$Ax = b$\n- $A$：系数矩阵\n- $[A \\mid b]$：增广矩阵\n\n**向量形式**：$x_1\\alpha_1 + x_2\\alpha_2 + \\cdots + x_n\\alpha_n = b$'
  },
  {
    id: 'block-la-4-1',
    type: 'text',
    content: '## 解的判定\n\n**齐次方程组$Ax=0$**：\n- 有非零解 $\\Leftrightarrow r(A) < n$\n- 只有零解 $\\Leftrightarrow r(A) = n$\n\n**非齐次方程组$Ax=b$**：\n- 有解 $\\Leftrightarrow r(A) = r([A \\mid b])$\n- 唯一解 $\\Leftrightarrow r(A) = r([A \\mid b]) = n$\n- 无穷多解 $\\Leftrightarrow r(A) = r([A \\mid b]) < n$\n- 无解 $\\Leftrightarrow r(A) \\neq r([A \\mid b])$'
  },
  {
    id: 'block-la-4-2',
    type: 'text',
    content: '## 解的结构\n\n**齐次方程组**：\n- 基础解系：解空间的极大线性无关组\n- 基础解系含$n - r(A)$个解向量\n- 通解：$X = k_1\\xi_1 + k_2\\xi_2 + \\cdots + k_{n-r}\\xi_{n-r}$\n\n**非齐次方程组**：\n- 通解 = 特解 + 对应齐次的通解\n- $X = \\eta^{*} + k_1\\xi_1 + \\cdots + k_{n-r}\\xi_{n-r}$'
  },
  {
    id: 'block-la-4-3',
    type: 'text',
    content: '## 求解方法\n\n**高斯消元法**：\n- 对增广矩阵进行初等行变换\n- 化为行阶梯形（判断解的情况）\n- 化为行最简形（求通解）\n\n**克拉默法则**：$|A| \\neq 0$时，$x_i = \\dfrac{D_i}{D}$'
  }
];

// 特征值与特征向量课程
const eigenvalueBlocks: ContentBlock[] = [
  {
    id: 'block-la-5-0',
    type: 'text',
    content: '## 定义\n\n对于$n$阶方阵$A$，若存在数$\\lambda$和非零向量$\\xi$使得：\n$$A\\xi = \\lambda\\xi$$\n\n则$\\lambda$称为$A$的特征值，$\\xi$称为$A$的属于$\\lambda$的特征向量。'
  },
  {
    id: 'block-la-5-1',
    type: 'text',
    content: '## 特征值与特征向量的求法\n\n1. **求特征多项式**：$|\\lambda E - A| = 0$\n2. **求特征值**：解特征方程得$\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$\n3. **求特征向量**：对每个$\\lambda_i$，解$(\\lambda_i E - A)x = 0$得基础解系'
  },
  {
    id: 'block-la-5-2',
    type: 'text',
    content: '## 特征值的性质\n\n- $\\lambda_1 + \\lambda_2 + \\cdots + \\lambda_n = \\operatorname{tr}(A) = a_{11} + a_{22} + \\cdots + a_{nn}$\n- $\\lambda_1\\lambda_2 \\cdots \\lambda_n = |A|$\n- 若$\\lambda$是$A$的特征值，则：\n  - $\\lambda^{k}$是$A^{k}$的特征值\n  - $f(\\lambda)$是$f(A)$的特征值\n  - $\\dfrac{1}{\\lambda}$是$A^{-1}$的特征值（$A$可逆时）'
  },
  {
    id: 'block-la-5-3',
    type: 'text',
    content: '## 特征向量的性质\n\n- 属于不同特征值的特征向量线性无关\n- 属于同一特征值的特征向量的非零线性组合仍是该特征值的特征向量\n\n### 相似矩阵\n**定义**：若$P^{-1}AP = B$，则$A$与$B$相似\n\n**性质**：\n- 相似矩阵有相同的特征多项式、特征值\n- 相似矩阵有相同的行列式、迹、秩\n- 相似矩阵的幂、逆也相似'
  },
  {
    id: 'block-la-5-4',
    type: 'text',
    content: '## 矩阵的对角化\n\n**可对角化条件**：\n- $n$阶矩阵$A$可对角化 $\\Leftrightarrow$ $A$有$n$个线性无关的特征向量\n- $A$有$n$个不同特征值 $\\Rightarrow$ $A$可对角化\n\n**对角化方法**：\n- 求特征值$\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$\n- 求对应的线性无关特征向量$\\xi_1, \\xi_2, \\ldots, \\xi_n$\n- 令$P = [\\xi_1, \\xi_2, \\ldots, \\xi_n]$，则$P^{-1}AP = \\operatorname{diag}(\\lambda_1, \\lambda_2, \\ldots, \\lambda_n)$\n\n### 实对称矩阵\n**性质**：\n- 特征值都是实数\n- 不同特征值对应的特征向量正交\n- 必可正交相似对角化\n\n**正交对角化步骤**：\n1. 求特征值\n2. 求特征向量并正交化、单位化\n3. 构造正交矩阵$Q$，使$Q^{T}AQ = \\Lambda$'
  }
];

// 二次型课程
const quadraticBlocks: ContentBlock[] = [
  {
    id: 'block-la-6-0',
    type: 'text',
    content: '## 二次型的概念\n\n**定义**：$n$元二次齐次多项式\n$$f(x_1, \\ldots, x_n) = \\sum_{i} a_{ii}x_i^{2} + 2\\sum_{i<j} a_{ij}x_ix_j$$\n\n**矩阵表示**：$f = x^{T}Ax$\n- $A$是对称矩阵，称$A$为二次型的矩阵\n- $r(A)$为二次型的秩'
  },
  {
    id: 'block-la-6-1',
    type: 'text',
    content: '## 标准形与规范形\n\n**标准形**：只含平方项的二次型\n$$f = d_1y_1^{2} + d_2y_2^{2} + \\cdots + d_ny_n^{2}$$\n\n**规范形**：系数为$\\pm 1$或$0$的标准形\n$$f = y_1^{2} + \\cdots + y_p^{2} - y_{p+1}^{2} - \\cdots - y_r^{2}$$\n\n**惯性定理**：规范形中正项个数$p$（正惯性指数）、负项个数$q$（负惯性指数）是唯一确定的。'
  },
  {
    id: 'block-la-6-2',
    type: 'text',
    content: '## 化二次型为标准形\n\n**正交变换法**：\n- 对实对称矩阵$A$，求正交矩阵$Q$使$Q^{T}AQ = \\Lambda$\n- 令$x = Qy$，则$f = y^{T}\\Lambda y = \\lambda_1y_1^{2} + \\cdots + \\lambda_ny_n^{2}$\n\n**配方法**：\n- 按变量顺序逐步配方\n- 若平方项不全，先做可逆线性变换产生平方项\n\n**初等变换法**：\n- 对矩阵$[A \\mid E]$进行合同变换'
  },
  {
    id: 'block-la-6-3',
    type: 'text',
    content: '## 正定二次型\n\n**定义**：$\\forall x \\neq 0$，$f = x^{T}Ax > 0$\n\n**等价条件**：\n- 正惯性指数$= n$\n- $A$的特征值全大于$0$\n- $A$的各阶顺序主子式全大于$0$\n- 存在可逆矩阵$C$使$A = C^{T}C$\n\n**半正定**：$\\forall x$，$f \\geq 0$\n**负定**：$\\forall x \\neq 0$，$f < 0$'
  }
];

// 线性空间与线性变换课程
const linearSpaceBlocks: ContentBlock[] = [
  {
    id: 'block-la-7-0',
    type: 'text',
    content: '## 线性空间\n\n**定义**：非空集合$V$，数域$P$，定义加法和数乘运算，满足8条运算规律。\n\n**例子**：\n- $P^{n}$：$n$维向量空间\n- $P[x]$：多项式空间\n- $P[x]_n$：次数小于$n$的多项式加零多项式\n- $M_{m \\times n}(P)$：$m \\times n$矩阵空间'
  },
  {
    id: 'block-la-7-1',
    type: 'text',
    content: '## 基、维数与坐标\n\n**基**：线性空间的极大线性无关组\n**维数**：基中向量的个数，记为$\\dim(V)$\n\n**坐标**：\n- 设$\\varepsilon_1, \\varepsilon_2, \\ldots, \\varepsilon_n$是$V$的一组基\n- $\\alpha = x_1\\varepsilon_1 + x_2\\varepsilon_2 + \\cdots + x_n\\varepsilon_n$\n- $(x_1, x_2, \\ldots, x_n)^{T}$称为$\\alpha$在该基下的坐标\n\n**基变换与坐标变换**：\n- 设$(\\eta_1, \\ldots, \\eta_n) = (\\varepsilon_1, \\ldots, \\varepsilon_n)P$，$P$为过渡矩阵\n- 坐标变换：$x = Py$或$y = P^{-1}x$'
  },
  {
    id: 'block-la-7-2',
    type: 'text',
    content: '## 子空间\n\n**定义**：$V$的非空子集$W$，对$V$的运算也构成线性空间\n\n**常见子空间**：\n- 生成子空间：$L(\\alpha_1, \\alpha_2, \\ldots, \\alpha_m)$\n- 核空间：$\\ker(A) = \\{x \\mid Ax = 0\\}$\n- 像空间：$\\operatorname{Im}(A) = \\{Ax \\mid x \\in V\\}$\n\n**维数公式**：\n$$\\dim(V_1 + V_2) = \\dim(V_1) + \\dim(V_2) - \\dim(V_1 \\cap V_2)$$'
  },
  {
    id: 'block-la-7-3',
    type: 'text',
    content: '## 线性变换\n\n**定义**：$V$到自身的映射$T$，满足：\n- $T(\\alpha + \\beta) = T(\\alpha) + T(\\beta)$\n- $T(k\\alpha) = kT(\\alpha)$\n\n**例子**：\n- 恒等变换、零变换\n- 数乘变换\n- 微分变换、积分变换'
  },
  {
    id: 'block-la-7-4',
    type: 'text',
    content: '## 线性变换的矩阵\n\n**矩阵表示**：\n- 设$\\varepsilon_1, \\ldots, \\varepsilon_n$是$V$的一组基\n- $T(\\varepsilon_1, \\ldots, \\varepsilon_n) = (\\varepsilon_1, \\ldots, \\varepsilon_n)A$\n- $A$称为$T$在该基下的矩阵\n\n**同一线性变换在不同基下的矩阵相似**\n\n### 特征值与特征向量\n**定义**：$T(\\xi) = \\lambda\\xi$，$\\xi \\neq 0$\n\n**性质**：\n- 不同特征值的特征向量线性无关\n- 特征子空间：$V_{\\lambda} = \\{\\xi \\mid T(\\xi) = \\lambda\\xi\\}$\n\n### 不变子空间\n**定义**：$W$是$V$的子空间，若$T(W) \\subseteq W$，则$W$是$T$的不变子空间\n\n**例子**：特征子空间是不变子空间'
  }
];

// 课程定义
export const determinantLesson: LinearAlgebraLesson = {
  id: 'la-1',
  title: '行列式',
  difficulty: 2,
  blocks: determinantBlocks,
};

export const matrixLesson: LinearAlgebraLesson = {
  id: 'la-2',
  title: '矩阵及其运算',
  difficulty: 3,
  blocks: matrixBlocks,
};

export const vectorLesson: LinearAlgebraLesson = {
  id: 'la-3',
  title: '向量组的线性相关性',
  difficulty: 3,
  blocks: vectorBlocks,
};

export const equationLesson: LinearAlgebraLesson = {
  id: 'la-4',
  title: '线性方程组',
  difficulty: 3,
  blocks: equationBlocks,
};

export const eigenvalueLesson: LinearAlgebraLesson = {
  id: 'la-5',
  title: '特征值与特征向量',
  difficulty: 4,
  blocks: eigenvalueBlocks,
};

export const quadraticLesson: LinearAlgebraLesson = {
  id: 'la-6',
  title: '二次型',
  difficulty: 4,
  blocks: quadraticBlocks,
};

export const linearSpaceLesson: LinearAlgebraLesson = {
  id: 'la-7',
  title: '线性空间与线性变换',
  difficulty: 5,
  blocks: linearSpaceBlocks,
};

// 所有课程
export const allLinearAlgebraLessons: LinearAlgebraLesson[] = [
  determinantLesson,
  matrixLesson,
  vectorLesson,
  equationLesson,
  eigenvalueLesson,
  quadraticLesson,
  linearSpaceLesson,
];

// 章节定义
export const linearAlgebraChapters: LinearAlgebraChapter[] = [
  {
    id: 'la-basic',
    title: '线性代数基础',
    icon: '📊',
    lessons: allLinearAlgebraLessons,
  },
];

// 获取课程
export function getLessonById(id: string): LinearAlgebraLesson | undefined {
  return allLinearAlgebraLessons.find(l => l.id === id);
}

// 获取所有课程
export function getAllLessons(): LinearAlgebraLesson[] {
  return allLinearAlgebraLessons;
}
