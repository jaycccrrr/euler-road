// 高等数学详细内容 - 完全迁移自高等数学学习工具

export interface Example {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface SubLesson {
  id: string;
  title: string;
  theory: string;
  formula: string;
  examples: Example[];
  has3D: boolean;
  vizType?: string;
}

// 第一章：向量与空间解析几何 - 方向角与方向余弦
export const directionCosinesLesson: SubLesson = {
  id: 'direction-cosines',
  title: '方向角与方向余弦',
  has3D: true,
  vizType: 'directionCosines',
  theory: `
## 一、方向角的概念

**思考引导**：在空间中，如何精确描述一个向量的"方向"？

* 仅说"指向东北"太模糊
* 需要一种数学化的、可计算的方向表示方法
* 方向角和方向余弦就是解决这个问题的工具

### 1.1 定义
设向量 **a** = (a₁, a₂, a₃)，它与 x 轴、y 轴、z 轴正方向的夹角分别记为 α、β、γ，称为向量的**方向角**。

α = ∠(**a**, **i**)， β = ∠(**a**, **j**)， γ = ∠(**a**, **k**)

其中 **i**、**j**、**k** 分别是 x、y、z 轴的单位向量。

### 1.2 方向角范围
0 ≤ α, β, γ ≤ π

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

**证明**：
cos²α + cos²β + cos²γ = (a₁² + a₂² + a₃²) / |**a**|² = |**a**|² / |**a**|² = 1

## 三、方向余弦的应用

### 3.1 单位向量表示
向量 **a** 的单位向量可以用方向余弦表示：

**a**⁰ = **a**/|**a**| = (cos α, cos β, cos γ)

### 3.2 两向量夹角
设向量 **a** 和 **b** 的方向余弦分别为 (cos α₁, cos β₁, cos γ₁) 和 (cos α₂, cos β₂, cos γ₂)，则：

cos θ = cos α₁ cos α₂ + cos β₁ cos β₂ + cos γ₁ cos γ₂
  `,
  formula: `
## 方向余弦公式推导

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
cos²α + cos²β + cos²γ = (a₁² + a₂² + a₃²) / |**a**|² = |**a**|² / |**a**|² = 1

**几何意义**：单位向量的终点总是落在单位球面上。方向余弦 (cos α, cos β, cos γ) 正是单位向量 **a**⁰ 的坐标。

### 三、单位向量的方向余弦表示
向量 **a** 的单位向量 **a**⁰ 可以表示为：

**a**⁰ = **a**/|**a**| = (cos α, cos β, cos γ)

### 四、两向量夹角公式
cos θ = cos α₁ cos α₂ + cos β₁ cos β₂ + cos γ₁ cos γ₂
  `,
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
  ]
};

// 叉乘课时
export const crossProductLesson: SubLesson = {
  id: 'cross-product',
  title: '叉乘（向量积）',
  has3D: true,
  vizType: 'crossProduct',
  theory: `
## 一、为什么要定义叉乘？

**思考引导**：点乘 **a** · **b** 可以告诉我们两个向量的"相似程度"（投影关系），但还有很多问题无法回答：

* 如何求同时垂直于两个向量的方向？（求平面法向量）
* 如何计算两个向量张成的平行四边形面积？
* 物理中力矩、角动量的方向如何确定？

**核心需求**：我们需要一种新的运算，它接受两个向量，产生一个新的向量，这个向量要**同时垂直于原来的两个向量**。

## 二、从几何需求到代数定义

### 2.1 确定方向：右手定则
假设我们已经确定了叉乘结果的方向垂直于 **a** 和 **b** 所在平面，但还有一个问题：垂直方向有两个（"向上"和"向下"），选哪一个？

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

按第一行展开，恰好得到三个分量。

## 四、几何意义与应用

### 4.1 平行四边形与三角形面积
**定理**：|**a** × **b**| = 以 **a**, **b** 为邻边的平行四边形面积

**推论**：三角形面积 = ½|**a** × **b**|

### 4.2 判断共线性
**定理**：**a** × **b** = **0** ⟺ **a** ∥ **b**（两向量共线/平行）
  `,
  formula: `
## 叉乘公式

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
  `,
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
    }
  ]
};

// 所有课时映射
export const allLessons: Record<string, SubLesson[]> = {
  'am-1': [directionCosinesLesson, crossProductLesson],
};

// 获取课时内容
export function getLessonContent(moduleId: string, lessonId: string): SubLesson | undefined {
  const lessons = allLessons[moduleId];
  if (!lessons) return undefined;
  return lessons.find(l => l.id === lessonId);
}

// 获取模块下所有课时
export function getModuleLessons(moduleId: string): SubLesson[] {
  return allLessons[moduleId] || [];
}
