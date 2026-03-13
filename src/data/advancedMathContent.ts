// 高等数学完整内容 - 从高等数学学习工具迁移
// 生成时间: 2026/3/13

export interface Example {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface TopicContent {
  title: string;
  theory: string;
  formula: string;
  examples: Example[];
  has3D: boolean;
  vizType?: string;
}

// 第一章：向量与空间解析几何 - 方向角与方向余弦
const directionCosinesContent: TopicContent = {
  title: '方向角与方向余弦',
  theory: `## 一、方向角的概念

**💡 思考引导**：在空间中，如何精确描述一个向量的"方向"？

- 仅说"指向东北"太模糊
- 需要一种数学化的、可计算的方向表示方法
- 方向角和方向余弦就是解决这个问题的工具

### 1.1 定义

设向量 **a** = (a₁, a₂, a₃)，它与 x 轴、y 轴、z 轴正方向的夹角分别记为 α、β、γ，称为向量的**方向角**。

α = ∠(**a**, **i**)， β = ∠(**a**, **j**)， γ = ∠(**a**, **k**)

其中 **i**、**j**、**k** 分别是 x、y、z 轴的单位向量。

### 1.2 方向角范围

0 ≤ α, β, γ ≤ π

*[3D可视化图表]*

## 二、方向余弦

### 2.1 定义与公式

方向角的余弦称为**方向余弦**：

cos α = a₁/|**a**| = a₁/√(a₁² + a₂² + a₃²)

cos β = a₂/|**a**| = a₂/√(a₁² + a₂² + a₃²)

cos γ = a₃/|**a**| = a₃/√(a₁² + a₂² + a₃²)

### 2.2 公式推导

**推导一：方向余弦与分量关系**

设向量 **a** = (a₁, a₂, a₃)，其模为 |**a**| = √(a₁² + a₂² + a₃²)。

根据点乘定义：**a** · **i** = |**a**||**i**|cos α = |**a**|cos α

又因为 **a** · **i** = a₁，所以：

cos α = a₁/|**a**| = a₁/√(a₁² + a₂² + a₃²)

同理可得 cos β 和 cos γ 的表达式。

**推导二：方向余弦基本恒等式**

方向余弦满足一个重要恒等式：

cos²α + cos²β + cos²γ = 1

> **证明**：
> cos²α + cos²β + cos²γ = (a₁² + a₂² + a₃²) / |**a**|² = |**a**|² / |**a**|² = 1

*[3D可视化图表]*

## 三、方向余弦的应用

### 3.1 单位向量表示

向量 **a** 的单位向量可以用方向余弦表示：

**a**⁰ = **a**/|**a**| = (cos α, cos β, cos γ)

### 3.2 两向量夹角

设向量 **a** 和 **b** 的方向余弦分别为 (cos α₁, cos β₁, cos γ₁) 和 (cos α₂, cos β₂, cos γ₂)，则：

cos θ = cos α₁ cos α₂ + cos β₁ cos β₂ + cos γ₁ cos γ₂`,
  formula: `## 方向余弦公式推导

### 一、从点乘定义推导方向余弦

设向量 **a** = (a₁, a₂, a₃)，其模为 |**a**| = √(a₁² + a₂² + a₃²)。

根据向量点乘的定义，**a** 与 x 轴单位向量 **i** = (1, 0, 0) 的点乘为：

**a** · **i** = |**a**||**i**|cos α = |**a**|cos α

另一方面，通过分量计算点乘：

**a** · **i** = a₁×1 + a₂×0 + a₃×0 = a₁

因此得到方向余弦的第一个公式：

cos α = a₁/|**a**| = a₁/√(a₁² + a₂² + a₃²)

同理可得 cos β 和 cos γ 的表达式。

### 二、方向余弦基本恒等式的证明

**定理**：对于任意非零向量，其方向余弦满足：

cos²α + cos²β + cos²γ = 1

**证明**：

cos²α + cos²β + cos²γ
= (a₁²/|**a**|²) + (a₂²/|**a**|²) + (a₃²/|**a**|²)
= (a₁² + a₂² + a₃²) / |**a**|²
= |**a**|² / |**a**|²
= 1

> **几何意义**：单位向量的终点总是落在单位球面上。方向余弦 (cos α, cos β, cos γ) 正是单位向量 **a**⁰ 的坐标。

### 三、单位向量的方向余弦表示

向量 **a** 的单位向量 **a**⁰ 可以表示为：

**a**⁰ = **a**/|**a**| = (cos α, cos β, cos γ)

### 四、两向量夹角公式

cos θ = cos α₁ cos α₂ + cos β₁ cos β₂ + cos γ₁ cos γ₂`,
  examples: [
    {
      id: 'dc-1',
      difficulty: 'easy',
      question: '已知向量 **a** = (1, 2, 2)，求其方向余弦。',
      options: ['(1/3, 2/3, 2/3)', '(1/√5, 2/√5, 2/√5)', '(1/2, 1, 1)', '(1, 2, 2)/5'],
      correct: 0,
      explanation: '|**a**| = √(1² + 2² + 2²) = √9 = 3\ncos α = 1/3, cos β = 2/3, cos γ = 2/3'
    },
    {
      id: 'dc-2',
      difficulty: 'medium',
      question: '一向量的方向角满足 α = β = γ，求各方向角的值。',
      options: ['均为 45°', '均为 arccos(1/√3) ≈ 54.7°', '均为 60°', '不存在这样的向量'],
      correct: 1,
      explanation: '由 cos²α + cos²β + cos²γ = 1，且 α = β = γ\n得 3cos²α = 1，cos α = 1/√3\nα = arccos(1/√3) ≈ 54.7°'
    },
    {
      id: 'dc-3',
      difficulty: 'hard',
      question: '已知向量 **a** 的方向余弦为 (1/2, √2/2, 1/2)，求其与 z 轴的夹角。',
      options: ['30°', '45°', '60°', '90°'],
      correct: 2,
      explanation: '与 z 轴的夹角为 γ，cos γ = 1/2\n因此 γ = 60°'
    }
  ],
  has3D: true,
  vizType: 'directionCosines'
};

// 叉乘内容
const crossProductContent: TopicContent = {
  title: '叉乘（向量积）',
  theory: `## 一、为什么要定义叉乘？

**💡 思考引导**：点乘 **a** · **b** 可以告诉我们两个向量的"相似程度"（投影关系），但还有很多问题无法回答：

- 如何求同时垂直于两个向量的方向？（求平面法向量）
- 如何计算两个向量张成的平行四边形面积？
- 物理中力矩、角动量的方向如何确定？

**核心需求**：我们需要一种新的运算，它接受两个向量，产生一个新的向量，这个向量要**同时垂直于原来的两个向量**。

[图片: 右手定则示意图]

## 二、从几何需求到代数定义

### 2.1 确定方向：右手定则

**右手定则**：右手四指从 **a** 转向 **b**，拇指指向即为 **a** × **b** 的方向。

这样规定使得 **a** × **b** = -(**b** × **a**)，即叉乘是**反交换**的。

### 2.2 确定大小：面积的几何意义

叉乘的大小应该如何确定？几何上一个自然的想法是：**等于以 a, b 为邻边的平行四边形面积**。

|**a** × **b**| = |**a**||**b**|sin(θ)

其中 θ 是两向量夹角。

## 三、分量公式的推导

### 3.1 行列式记忆法

上述分量公式可以巧妙地用行列式表示：

**a** × **b** = |**i**   **j**   **k**|
              |a₁   a₂   a₃|
              |b₁   b₂   b₃|

= (a₂b₃ - a₃b₂)**i** + (a₃b₁ - a₁b₃)**j** + (a₁b₂ - a₂b₁)**k**

按第一行展开，恰好得到三个分量。

## 四、几何意义与应用

### 4.1 平行四边形与三角形面积

**定理**：|**a** × **b**| = 以 **a**, **b** 为邻边的平行四边形面积

**推论**：三角形面积 = ½|**a** × **b**|

### 4.2 判断共线性

**定理**：**a** × **b** = **0** ⟺ **a** ∥ **b**（两向量共线/平行）`,
  formula: `## 叉乘公式

### 一、几何定义

|**a** × **b**| = |**a**||**b**|sin(θ)

### 二、分量公式（行列式表示）

**a** × **b** = |**i**   **j**   **k**|
              |a₁   a₂   a₃|
              |b₁   b₂   b₃|

= (a₂b₃ - a₃b₂)**i** + (a₃b₁ - a₁b₃)**j** + (a₁b₂ - a₂b₁)**k**

### 三、几何应用公式

**平行四边形面积**：S = |**a** × **b**|

**三角形面积**：S = ½|**a** × **b**|

**共线条件**：**a** × **b** = **0** ⟺ **a** ∥ **b**

### 四、代数性质

- **反交换律**：**a** × **b** = -(**b** × **a**)
- **分配律**：**a** × (**b** + **c**) = **a** × **b** + **a** × **c**
- **数乘结合律**：(λ**a**) × **b** = λ(**a** × **b**) = **a** × (λ**b**)
- **自叉乘为零**：**a** × **a** = **0**`,
  examples: [
    {
      id: 'cp-1',
      difficulty: 'easy',
      question: '已知 **a** = (1, 0, 0)，**b** = (0, 1, 0)，求 **a** × **b**。',
      options: ['(0, 0, 1)', '(0, 0, -1)', '(1, 1, 0)', '(0, 1, 0)'],
      correct: 0,
      explanation: '由右手定则，**i** × **j** = **k** = (0, 0, 1)'
    },
    {
      id: 'cp-2',
      difficulty: 'medium',
      question: '求以 **a** = (1, 2, 3) 和 **b** = (4, 5, 6) 为邻边的平行四边形面积。',
      options: ['√6', '3√6', '6', '√42'],
      correct: 1,
      explanation: '**a** × **b** = (-3, 6, -3)，|**a** × **b**| = √(9+36+9) = √54 = 3√6'
    },
    {
      id: 'cp-3',
      difficulty: 'hard',
      question: '已知 **a** × **b** = (2, -1, 3)，则 **b** × **a** = ?',
      options: ['(2, -1, 3)', '(-2, 1, -3)', '(1, 2, 3)', '(-2, -1, -3)'],
      correct: 1,
      explanation: '由反交换律，**b** × **a** = -(**a** × **b**) = (-2, 1, -3)'
    }
  ],
  has3D: true,
  vizType: 'crossProduct'
};

// 其他模块的基础内容
const defaultAdvancedMathContent: Record<string, TopicContent> = {
  'am-1': directionCosinesContent,
  'am-2': {
    title: '多元函数微分学',
    theory: `## 一、多元函数概念

### 1.1 二元函数
z = f(x, y)，定义域为平面点集
- **邻域**：以P₀为中心，δ为半径的圆内所有点
- **区域**：开区域、闭区域、有界区域、无界区域

### 1.2 极限与连续
- **二重极限**：lim₍(x,y)→(x₀,y₀)₎ f(x,y) = A
- **连续性**：lim₍(x,y)→(x₀,y₀)₎ f(x,y) = f(x₀,y₀)

## 二、偏导数

### 2.1 定义
- ∂z/∂x = lim(Δx→0) [f(x+Δx,y) - f(x,y)]/Δx
- ∂z/∂y = lim(Δy→0) [f(x,y+Δy) - f(x,y)]/Δy

### 2.2 几何意义
偏导数是函数沿坐标轴方向的变化率

### 2.3 高阶偏导数
- ∂²z/∂x², ∂²z/∂y², ∂²z/∂x∂y, ∂²z/∂y∂x
- **重要定理**：当二阶混合偏导数连续时，∂²z/∂x∂y = ∂²z/∂y∂x

*[3D可视化图表]*`,
    formula: `## 偏导数与全微分公式

### 一、偏导数定义
∂z/∂x = lim(Δx→0) [f(x+Δx,y) - f(x,y)]/Δx
∂z/∂y = lim(Δy→0) [f(x,y+Δy) - f(x,y)]/Δy

### 二、全微分公式
dz = (∂z/∂x)dx + (∂z/∂y)dy

### 三、链式法则
**一元复合**：
若 z = f(u,v)，u = u(x)，v = v(x)
则 dz/dx = (∂z/∂u)(du/dx) + (∂z/∂v)(dv/dx)

**多元复合**：
若 z = f(u,v)，u = u(x,y)，v = v(x,y)
则 ∂z/∂x = (∂z/∂u)(∂u/∂x) + (∂z/∂v)(∂v/∂x)`,
    examples: [
      {
        id: 'pd-1',
        difficulty: 'easy',
        question: '设 z = x²y + y³，求 ∂z/∂x 和 ∂z/∂y',
        options: ['∂z/∂x = 2xy，∂z/∂y = x² + 3y²', '∂z/∂x = x²y，∂z/∂y = 2xy + 3y²', '∂z/∂x = 2x，∂z/∂y = x² + 3y', '∂z/∂x = xy，∂z/∂y = x² + y²'],
        correct: 0,
        explanation: '对x求偏导时y看作常数：∂z/∂x = 2xy\n对y求偏导时x看作常数：∂z/∂y = x² + 3y²'
      }
    ],
    has3D: true,
    vizType: 'surface'
  },
  'am-3': {
    title: '重积分',
    theory: `## 一、二重积分

### 1.1 定义
∬ᴅ f(x,y)dσ = lim(λ→0) Σf(ξᵢ,ηᵢ)Δσᵢ

### 1.2 几何意义
曲顶柱体的体积（f(x,y)≥0时）

### 1.3 基本性质
- **线性性质**
- **区域可加性**
- **比较定理**

*[3D可视化图表]*`,
    formula: `## 重积分计算公式

### 一、二重积分
**直角坐标**：
X型：∫ₐᵇdx ∫ᵩ₁₍ₓ₎ᵩ₂₍ₓ₎ f(x,y)dy
Y型：∫ᶜᵈdy ∫ᵩ₁₍ᵧ₎ᵩ₂₍ᵧ₎ f(x,y)dx

**极坐标**：
∬ᴅ f(x,y) dσ = ∬ᴅ' f(rcosθ, rsinθ) r dr dθ

### 二、三重积分
**柱坐标**：dV = r dr dθ dz
**球坐标**：dV = r²sinφ dr dφ dθ`,
    examples: [
      {
        id: 'di-1',
        difficulty: 'easy',
        question: '计算 ∬ᴅ xy dxdy，其中 D: 0≤x≤1, 0≤y≤1',
        options: ['1/4', '1/2', '1', '0'],
        correct: 0,
        explanation: '∫₀¹ dx ∫₀¹ xy dy = ∫₀¹ x [y²/2]₀¹ dx = ∫₀¹ x/2 dx = [x²/4]₀¹ = 1/4'
      }
    ],
    has3D: true,
    vizType: 'volume'
  },
  'am-4': {
    title: '曲线积分与曲面积分',
    theory: `## 一、第一类曲线积分（对弧长）

### 1.1 定义
∫ₗ f(x,y)ds，其中ds为弧长微元

### 1.2 物理意义
曲线形构件的质量（f为线密度）

## 二、格林公式

**条件**：L是正向闭曲线，P、Q在D上有连续偏导数
**公式**：∮ₗ Pdx + Qdy = ∬ᴅ (∂Q/∂x - ∂P/∂y) dxdy

*[3D可视化图表]*`,
    formula: `## 曲线积分与曲面积分公式

### 一、格林公式
∮ₗ Pdx + Qdy = ∬ᴅ (∂Q/∂x - ∂P/∂y) dxdy

### 二、高斯公式
∯Σ Pdydz + Qdzdx + Rdxdy = ∭Ω (∂P/∂x + ∂Q/∂y + ∂R/∂z) dV

### 三、斯托克斯公式
∮Γ Pdx + Qdy + Rdz = ∬Σ |(dydz, dzdx, dxdy), (∂/∂x, ∂/∂y, ∂/∂z), (P, Q, R)|`,
    examples: [
      {
        id: 'li-1',
        difficulty: 'easy',
        question: '利用格林公式计算 ∮ₗ xdy - ydx，其中 L 为圆 x²+y² = R² 的正向',
        options: ['2πR²', 'πR²', '0', '2πR'],
        correct: 0,
        explanation: 'P = -y，Q = x，∂Q/∂x = 1，∂P/∂y = -1\n原式 = ∬ᴅ (1-(-1)) dxdy = 2∬ᴅ dxdy = 2πR²'
      }
    ],
    has3D: true,
    vizType: 'curve'
  },
  'am-5': {
    title: '无穷级数',
    theory: `## 一、常数项级数

### 1.1 基本概念
- **级数**：Σₙ₌₁^∞ uₙ = u₁ + u₂ + ... + uₙ + ...
- **部分和**：Sₙ = u₁ + u₂ + ... + uₙ
- **收敛**：lim(n→∞) Sₙ = S 存在

### 1.2 判别法
**正项级数**：比较判别法、比值判别法、根值判别法
**交错级数**：莱布尼茨判别法`,
    formula: `## 级数公式

### 一、常见级数
**几何级数**：Σ arⁿ = a/(1-r) (|r| < 1)

**p-级数**：Σ 1/nᵖ 收敛（p > 1），发散（p ≤ 1）

### 二、幂级数
**收敛半径**：R = lim |aₙ/aₙ₊₁|

### 三、泰勒展开
eˣ = 1 + x + x²/2! + x³/3! + ...
sin x = x - x³/3! + x⁵/5! - ...
cos x = 1 - x²/2! + x⁴/4! - ...`,
    examples: [
      {
        id: 'se-1',
        difficulty: 'easy',
        question: '判断级数 Σ 1/n² 的敛散性',
        options: ['收敛', '发散', '无法判断', '条件收敛'],
        correct: 0,
        explanation: '这是p-级数，p = 2 > 1，因此收敛。'
      }
    ],
    has3D: false
  },
  'am-6': {
    title: '常微分方程',
    theory: `## 一、基本概念

- **微分方程**：含有未知函数及其导数的方程
- **阶**：方程中出现的最高阶导数的阶数
- **解**：通解（含任意常数）、特解

## 二、一阶微分方程

**可分离变量**：dy/dx = f(x)g(y) → ∫dy/g(y) = ∫f(x)dx

**一阶线性方程**：dy/dx + P(x)y = Q(x)
通解：y = e^(-∫Pdx)[∫Qe^(∫Pdx)dx + C]`,
    formula: `## 微分方程解法公式

### 一、一阶方程
**可分离变量**：∫ dy/g(y) = ∫ f(x) dx

**一阶线性**：y = e^(-∫Pdx)[∫Qe^(∫Pdx)dx + C]

### 二、二阶常系数齐次方程
**特征方程**：r² + pr + q = 0

**解的情况**：
1. Δ > 0：y = C₁e^(r₁x) + C₂e^(r₂x)
2. Δ = 0：y = (C₁+C₂x)e^(rx)
3. Δ < 0：y = e^(αx)(C₁cosβx + C₂sinβx)`,
    examples: [
      {
        id: 'de-1',
        difficulty: 'easy',
        question: '解微分方程 dy/dx = 2x',
        options: ['y = x² + C', 'y = 2x + C', 'y = x²', 'y = 2x² + C'],
        correct: 0,
        explanation: 'dy = 2x dx，两边积分：y = x² + C'
      }
    ],
    has3D: false
  },
  'am-7': {
    title: '傅里叶级数',
    theory: `## 一、三角函数系的正交性

在[-π,π]上，函数系{1, cosx, sinx, cos2x, sin2x, ...}具有正交性。

## 二、傅里叶级数展开

**周期为2π的函数**：
f(x) = a₀/2 + Σₙ₌₁^∞ (aₙcosnx + bₙsinnx)

其中：
- aₙ = (1/π)∫₋ₚᵢₚᵢ f(x)cosnx dx
- bₙ = (1/π)∫₋ₚᵢₚᵢ f(x)sinnx dx`,
    formula: `## 傅里叶级数公式

### 一、傅里叶系数
aₙ = (1/π)∫₋ₚᵢₚᵢ f(x)cosnx dx
bₙ = (1/π)∫₋ₚᵢₚᵢ f(x)sinnx dx

### 二、级数形式
f(x) ∼ a₀/2 + Σₙ₌₁^∞ (aₙcosnx + bₙsinnx)

### 三、收敛定理
- 连续点：收敛于f(x)
- 间断点：收敛于[f(x-0)+f(x+0)]/2`,
    examples: [
      {
        id: 'fs-1',
        difficulty: 'easy',
        question: '函数 f(x) = x 在 [-π, π] 上的傅里叶级数是正弦级数还是余弦级数？',
        options: ['正弦级数', '余弦级数', '两者都是', '两者都不是'],
        correct: 0,
        explanation: 'f(x) = x 是奇函数，因此傅里叶级数为正弦级数，所有 aₙ = 0。'
      }
    ],
    has3D: false
  }
};

// 导出所有高等数学内容
export const ADVANCED_MATH_CONTENT: Record<string, TopicContent> = defaultAdvancedMathContent;

// 获取主题内容的辅助函数
export function getTopicContent(topicId: string): TopicContent | undefined {
  return ADVANCED_MATH_CONTENT[topicId];
}

// 检查是否有3D可视化
export function hasVisualization(topicId: string): boolean {
  return ADVANCED_MATH_CONTENT[topicId]?.has3D ?? false;
}

// 获取可视化类型
export function getVizType(topicId: string): string | undefined {
  return ADVANCED_MATH_CONTENT[topicId]?.vizType;
}

// 类型从 advancedMathFull.ts 导入
