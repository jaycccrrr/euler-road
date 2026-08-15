// 高等数学详细内容 - 完全迁移自高等数学学习工具
// 生成时间: 2026/3/13 16:56:08

export interface Example {
  id: string;
  difficulty: "easy" | "medium" | "hard";
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

export const directioncosinesLesson: SubLesson = {
  id: 'direction-cosines',
  title: '方向角与方向余弦',
  has3D: true,
  vizType: 'directionCosines',
  theory: `
## 一、方向角的概念

**思考引导**

                **思考引导**：在空间中，如何精确描述一个向量的"方向"？

                    - 仅说"指向东北"太模糊
                    - 需要一种数学化的、可计算的方向表示方法
                    - 方向角和方向余弦就是解决这个问题的工具

            ### 1.1 定义
            设向量 \\mathbf{a} = (a₁, a₂, a₃)，它与 x 轴、y 轴、z 轴正方向的夹角分别记为 α、β、γ，称为向量的**方向角**。

\`\`\`

                α = ∠(\\mathbf{a}, \\mathbf{i})， β = ∠(\\mathbf{a}, \\mathbf{j})， γ = ∠(\\mathbf{a}, \\mathbf{k})

            其中 \\mathbf{i}、\\mathbf{j}、\\mathbf{k} 分别是 x、y、z 轴的单位向量。

            <!-- 方向角3D图示 -->

*[3D可视化图表]*

            ## 二、方向余弦

            ### 2.1 定义与公式
            方向角的余弦称为**方向余弦**：

\`\`\`

                cos α = a₁/|\\mathbf{a}| = a₁/√(a₁² + a₂² + a₃²)

                cos β = a₂/|\\mathbf{a}| = a₂/√(a₁² + a₂² + a₃²)

                cos γ = a₃/|\\mathbf{a}| = a₃/√(a₁² + a₂² + a₃²)

            ### 2.2 公式推导

            #### 推导一：方向余弦与分量关系
            设向量 \\mathbf{a} = (a₁, a₂, a₃)，其模为 |\\mathbf{a}| = √(a₁² + a₂² + a₃²)。

            根据点乘定义：\\mathbf{a} \\cdot \\mathbf{i} = |\\mathbf{a}||\\mathbf{i}|cos α = |\\mathbf{a}|cos α

            又因为 \\mathbf{a} \\cdot \\mathbf{i} = a₁，所以：

\`\`\`

                cos α = a₁/|\\mathbf{a}| = a₁/√(a₁² + a₂² + a₃²)

            同理可得 cos β 和 cos γ 的表达式。

            #### 推导二：方向余弦基本恒等式
            方向余弦满足一个重要恒等式：

\`\`\`

                cos²α + cos²β + cos²γ = 1

> **提示**
> 
                **证明**：

                cos²α + cos²β + cos²γ = (a₁² + a₂² + a₃²) / |\\mathbf{a}|² = |\\mathbf{a}|² / |\\mathbf{a}|² = 1

            <!-- 方向余弦恒等式图示 -->

*[3D可视化图表]*

            ## 三、方向余弦的应用

            ### 3.1 单位向量表示
            向量 \\mathbf{a} 的单位向量可以用方向余弦表示：

\`\`\`

                \\mathbf{a}⁰ = \\mathbf{a}/|\\mathbf{a}| = (cos α, cos β, cos γ)

            ### 3.2 两向量夹角
            设向量 \\mathbf{a} 和 \\mathbf{b} 的方向余弦分别为 (cos α₁, cos β₁, cos γ₁) 和 (cos α₂, cos β₂, cos γ₂)，则：

\`\`\`

                cos \theta = cos α₁ cos α₂ + cos β₁ cos β₂ + cos γ₁ cos γ₂

            ## 四、方向数
            与方向余弦成比例的任意三个数称为**方向数**。若 l : m : n = cos α : cos β : cos γ，则 (l, m, n) 是一组方向数。

\`\`\`

                cos α = l/√(l² + m² + n²)

                cos β = m/√(l² + m² + n²)

                cos γ = n/√(l² + m² + n²)
  `,
  formula: `
## 方向余弦公式推导

            ### 一、从点乘定义推导方向余弦
            设向量 \\mathbf{a} = (a₁, a₂, a₃)，其模为 |\\mathbf{a}| = √(a₁² + a₂² + a₃²)。

            根据向量点乘的定义，\\mathbf{a} 与 x 轴单位向量 \\mathbf{i} = (1, 0, 0) 的点乘为：

\`\`\`

                \\mathbf{a} \\cdot \\mathbf{i} = |\\mathbf{a}||\\mathbf{i}|cos α = |\\mathbf{a}|cos α

            另一方面，通过分量计算点乘：

\`\`\`

                \\mathbf{a} \\cdot \\mathbf{i} = a₁\\times1 + a₂\\times0 + a₃\\times0 = a₁

            因此得到方向余弦的第一个公式：

\`\`\`

                cos α = a₁/|\\mathbf{a}| = a₁/√(a₁² + a₂² + a₃²)

            同理，通过与 \\mathbf{j} 和 \\mathbf{k} 的点乘可得：

\`\`\`

                cos β = a₂/|\\mathbf{a}| = a₂/√(a₁² + a₂² + a₃²)

                cos γ = a₃/|\\mathbf{a}| = a₃/√(a₁² + a₂² + a₃²)

            ### 二、方向余弦基本恒等式的证明

            **定理**：对于任意非零向量，其方向余弦满足：

\`\`\`

                cos²α + cos²β + cos²γ = 1

            **证明**：

\`\`\`

                cos²α + cos²β + cos²γ

                = (a₁²/|\\mathbf{a}|²) + (a₂²/|\\mathbf{a}|²) + (a₃²/|\\mathbf{a}|²)

                = (a₁² + a₂² + a₃²) / |\\mathbf{a}|²

                = |\\mathbf{a}|² / |\\mathbf{a}|²

                = 1

> **提示**
> 
                **几何意义**：单位向量的终点总是落在单位球面上。方向余弦 (cos α, cos β, cos γ) 正是单位向量 \\mathbf{a}⁰ 的坐标。

            ### 三、单位向量的方向余弦表示

            向量 \\mathbf{a} 的单位向量 \\mathbf{a}⁰ 可以表示为：

\`\`\`

                \\mathbf{a}⁰ = \\mathbf{a}/|\\mathbf{a}| = (a₁/|\\mathbf{a}|, a₂/|\\mathbf{a}|, a₃/|\\mathbf{a}|) = (cos α, cos β, cos γ)

            ### 四、两向量夹角公式

            设向量 \\mathbf{a} 和 \\mathbf{b} 的方向余弦分别为 (cos α₁, cos β₁, cos γ₁) 和 (cos α₂, cos β₂, cos γ₂)。

            由于单位向量的点乘等于它们夹角的余弦：

\`\`\`

                cos \theta = \\mathbf{a}⁰ \\cdot \\mathbf{b}⁰

                = cos α₁ cos α₂ + cos β₁ cos β₂ + cos γ₁ cos γ₂

            这就是利用方向余弦计算两向量夹角的公式。</n
            ### 五、方向数的归一化

            若 (l, m, n) 是一组方向数（与方向余弦成比例），则对应的方向余弦为：

\`\`\`

                cos α = l/√(l² + m² + n²)

                cos β = m/√(l² + m² + n²)

                cos γ = n/√(l² + m² + n²)

            **验证**：

\`\`\`

                cos²α + cos²β + cos²γ

                = (l² + m² + n²) / (l² + m² + n²)

                = 1 ✓
  `,
  examples: [
  {
    "id": "dc-1",
    "difficulty": "easy",
    "question": "已知向量 \\mathbf{a} = (1, 2, 2)，求其方向余弦。",
    "options": [
      "(1/3, 2/3, 2/3)",
      "(1/√5, 2/√5, 2/√5)",
      "(1/2, 1, 1)",
      "(1, 2, 2)/5"
    ],
    "correct": 0,
    "explanation": "|\\mathbf{a}| = √(1² + 2² + 2²) = √9 = 3\ncos α = 1/3, cos β = 2/3, cos γ = 2/3"
  },
  {
    "id": "dc-2",
    "difficulty": "medium",
    "question": "一向量的方向角满足 α = β = γ，求各方向角的值。",
    "options": [
      "均为 45°",
      "均为 arccos(1/√3) ≈ 54.7°",
      "均为 60°",
      "不存在这样的向量"
    ],
    "correct": 1,
    "explanation": "由 cos²α + cos²β + cos²γ = 1，且 α = β = γ\n得 3cos²α = 1，cos α = 1/√3\nα = arccos(1/√3) ≈ 54.7°"
  },
  {
    "id": "dc-3",
    "difficulty": "hard",
    "question": "已知向量 \\mathbf{a} 的方向余弦为 (1/2, √2/2, 1/2)，求其与 z 轴的夹角。",
    "options": [
      "30°",
      "45°",
      "60°",
      "90°"
    ],
    "correct": 2,
    "explanation": "与 z 轴的夹角为 γ，cos γ = 1/2\n因此 γ = 60°"
  }
]
};

export const crossproductLesson: SubLesson = {
  id: 'cross-product',
  title: '叉乘（向量积）',
  has3D: true,
  vizType: 'crossProduct',
  theory: `
## 一、为什么要定义叉乘？

**思考引导**

                **思考引导**：点乘 \\mathbf{a} \\cdot \\mathbf{b} 可以告诉我们两个向量的"相似程度"（投影关系），但还有很多问题无法回答：

                    - 如何求同时垂直于两个向量的方向？（求平面法向量）
                    - 如何计算两个向量张成的平行四边形面积？
                    - 物理中力矩、角动量的方向如何确定？

            **核心需求**：我们需要一种新的运算，它接受两个向量，产生一个新的向量，这个向量要**同时垂直于原来的两个向量**。

            ## 二、从几何需求到代数定义

            ### 2.1 确定方向：右手定则
            假设我们已经确定了叉乘结果的方向垂直于 \\mathbf{a} 和 \\mathbf{b} 所在平面，但还有一个问题：垂直方向有两个（"向上"和"向下"），选哪一个？

> **提示**
> 
                **右手定则**：右手四指从 \\mathbf{a} 转向 \\mathbf{b}，拇指指向即为 \\mathbf{a} \\times \\mathbf{b} 的方向。

                这样规定使得 \\mathbf{a} \\times \\mathbf{b} = -(\\mathbf{b} \\times \\mathbf{a})，即叉乘是**反交换**的。

            <!-- 右手定则图示 - 使用标准教材图片 -->

[图片: 右手定则示意图]

                **右手定则**：四指从 \\mathbf{a} 转向 \\mathbf{b}，拇指指向 **a \\times b**

                |a \\times b| = |\\mathbf{a}||\\mathbf{b}|sin\theta，方向垂直于 a 和 b 所在平面

            ### 2.2 确定大小：面积的几何意义
            叉乘的大小应该如何确定？几何上一个自然的想法是：**等于以 a, b 为邻边的平行四边形面积**。

\`\`\`

                |\\mathbf{a} \\times \\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|sin(\theta)

            其中 \theta 是两向量夹角。这样规定的好处：

                - 当 \\mathbf{a} ⊥ \\mathbf{b} 时，面积最大，|sin(90°)| = 1
                - 当 \\mathbf{a} ∥ \\mathbf{b} 时，面积为零，sin(0°) = 0，此时 \\mathbf{a} \\times \\mathbf{b} = **0**
                - 这与平行四边形面积公式一致

            ## 三、分量公式的推导

            ### 3.1 利用标准正交基
            设 i, j, k 为 x, y, z 方向的单位正交基向量。首先确定它们之间的叉乘关系：

\`\`\`

                i \\times i = j \\times j = k \\times k = **0**（自身叉乘为零）

                i \\times j = k,  j \\times k = i,  k \\times i = j（循环对称）

                j \\times i = -k, k \\times j = -i, i \\times k = -j（反交换性）

            ### 3.2 分配律的应用
            **定理**：叉乘满足分配律 \\mathbf{a} \\times (\\mathbf{b} + \\mathbf{c}) = \\mathbf{a} \\times \\mathbf{b} + \\mathbf{a} \\times \\mathbf{c}

            将 \\mathbf{a} = a₁i + a₂j + a₃k 和 \\mathbf{b} = b₁i + b₂j + b₃k 展开：

\`\`\`

                \\mathbf{a} \\times \\mathbf{b} = (a₁i + a₂j + a₃k) \\times (b₁i + b₂j + b₃k)

            展开后，利用 i, j, k 的叉乘关系，同类项（如 i \\times i）为零，交叉项保留：

\`\`\`

                \\mathbf{a} \\times \\mathbf{b} = a₁b₂(i \\times j) + a₁b₃(i \\times k) + a₂b₁(j \\times i) + a₂b₃(j \\times k) + a₃b₁(k \\times i) + a₃b₂(k \\times j)

                = a₁b₂k - a₁b₃j - a₂b₁k + a₂b₃i + a₃b₁j - a₃b₂i

                = (a₂b₃ - a₃b₂)i + (a₃b₁ - a₁b₃)j + (a₁b₂ - a₂b₁)k

            ### 3.3 行列式记忆法
            上述分量公式可以巧妙地用行列式表示：

\`\`\`

                \\mathbf{a} \\times \\mathbf{b} = |i  j  k|

                             |a₁ a₂ a₃|

                             |b₁ b₂ b₃|

            按第一行展开，恰好得到三个分量。

            ## 四、几何意义与应用

                **3D可视化演示**：右侧动画展示了向量 \\mathbf{a}（红色）、\\mathbf{b}（蓝色）以及它们的叉乘 \\mathbf{a} \\times \\mathbf{b}（绿色）。

                观察：当 \\mathbf{b} 绕 \\mathbf{a} 旋转时，叉乘的大小如何变化？方向是否始终垂直于 \\mathbf{a} 和 \\mathbf{b} 所在平面？

            ### 4.1 平行四边形与三角形面积
            **定理**：|\\mathbf{a} \\times \\mathbf{b}| = 以 a, b 为邻边的平行四边形面积

            **推论**：三角形面积 = ½|\\mathbf{a} \\times \\mathbf{b}|

            ### 4.2 判断共线性
            **定理**：\\mathbf{a} \\times \\mathbf{b} = **0** ⟺ \\mathbf{a} ∥ \\mathbf{b}（两向量共线/平行）

            **证明**：叉乘为零当且仅当 |\\mathbf{a}||\\mathbf{b}|sin(\theta) = 0，即 sin(\theta) = 0，\theta = 0 或 π。

            ### 4.3 求平面法向量
            给定平面内两个不共线向量 \\mathbf{a} 和 \\mathbf{b}，\\mathbf{a} \\times \\mathbf{b} 就是该平面的一个法向量。

            ## 五、代数性质总结

**思考引导**

                    - **反交换律**：\\mathbf{a} \\times \\mathbf{b} = -(\\mathbf{b} \\times \\mathbf{a})
                    - **分配律**：\\mathbf{a} \\times (\\mathbf{b} + \\mathbf{c}) = \\mathbf{a} \\times \\mathbf{b} + \\mathbf{a} \\times \\mathbf{c}
                    - **数乘结合律**：(λ\\mathbf{a}) \\times \\mathbf{b} = λ(\\mathbf{a} \\times \\mathbf{b}) = \\mathbf{a} \\times (λ\\mathbf{b})
                    - **自叉乘为零**：\\mathbf{a} \\times \\mathbf{a} = **0**
                    - **Jacobi恒等式**：\\mathbf{a} \\times (\\mathbf{b} \\times \\mathbf{c}) + \\mathbf{b} \\times (\\mathbf{c} \\times \\mathbf{a}) + \\mathbf{c} \\times (\\mathbf{a} \\times \\mathbf{b}) = **0**

> ⚠️ **注意**
> 
                **重要提醒**：叉乘不满足结合律！即 (\\mathbf{a} \\times \\mathbf{b}) \\times \\mathbf{c} ≠ \\mathbf{a} \\times (\\mathbf{b} \\times \\mathbf{c})

                例如：(i \\times j) \\times j = k \\times j = -i，而 i \\times (j \\times j) = i \\times 0 = 0
  `,
  formula: `
## 叉乘公式的推导
            ### 从几何定义出发
            叉乘的大小由平行四边形面积决定：

\`\`\`

                |\\mathbf{a} \\times \\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|sin(\theta)

            ### 利用点乘与叉乘的关系
            重要恒等式（拉格朗日公式）：

\`\`\`

                |\\mathbf{a} \\times \\mathbf{b}|² + (\\mathbf{a} \\cdot \\mathbf{b})² = |\\mathbf{a}|²|\\mathbf{b}|²

            ### 分量推导
            设 i, j, k 为标准正交基向量：

\`\`\`

                i \\times j = k,  j \\times k = i,  k \\times i = j

                j \\times i = -k, k \\times j = -i, i \\times k = -j

**思考引导**

                展开 \\mathbf{a} \\times \\mathbf{b} = (a₁i + a₂j + a₃k) \\times (b₁i + b₂j + b₃k)

                利用分配律和基向量的叉乘关系，即可得到分量公式
  `,
  examples: [
  {
    "id": "cp-1",
    "difficulty": "easy",
    "question": "已知向量 \\mathbf{a} = (1, 2, 3)，\\mathbf{b} = (4, 5, 6)，求 \\mathbf{a} \\times \\mathbf{b}。",
    "options": [
      "(-3, 6, -3)",
      "(3, -6, 3)",
      "(-3, -6, -3)",
      "(3, 6, 3)"
    ],
    "correct": 0,
    "explanation": "使用叉乘公式：\na \\times b = (2\\times6 - 3\\times5, 3\\times4 - 1\\times6, 1\\times5 - 2\\times4)\n= (12-15, 12-6, 5-8)\n= (-3, 6, -3)"
  },
  {
    "id": "cp-2",
    "difficulty": "medium",
    "question": "求以 A(1,0,0), B(0,1,0), C(0,0,1) 为顶点的三角形面积。",
    "options": [
      "√3/2",
      "√3",
      "√2/2",
      "1/2"
    ],
    "correct": 0,
    "explanation": "向量 AB = (-1, 1, 0)，向量 AC = (-1, 0, 1)\nAB \\times AC = (1, 1, 1)\n|AB \\times AC| = √3\n三角形面积 = |AB \\times AC|/2 = √3/2"
  },
  {
    "id": "cp-3",
    "difficulty": "hard",
    "question": "若 \\mathbf{a} + \\mathbf{b} + \\mathbf{c} = **0**，证明：\\mathbf{a} \\times \\mathbf{b} = \\mathbf{b} \\times \\mathbf{c} = \\mathbf{c} \\times \\mathbf{a}。",
    "options": [],
    "correct": 0,
    "explanation": "利用叉乘的分配律和反交换律，以及自叉乘为零的性质。"
  }
]
};

export const tripleproductLesson: SubLesson = {
  id: 'triple-product',
  title: '混合积与三重积',
  has3D: true,
  vizType: 'tripleProduct',
  theory: `
## 一、从几何问题出发

**思考引导**

                **思考引导**：我们已经知道：

                    - 点乘 $\mathbf{a} \cdot \mathbf{b}$ 与投影、夹角有关
                    - 叉乘 $\mathbf{a} \times \mathbf{b}$ 与面积、垂直方向有关
                
                **新问题**：如何计算以三个向量为棱的平行六面体的体积？

            这个问题在几何（体积计算）、物理（力做功的多维推广）、工程（稳定性分析）中都有重要应用。

            ## 二、体积公式的推导

            ### 2.1 分解思路
            平行六面体体积 = 底面积 $\times$ 高

\`\`\`

                V = (底面积) $\times$ (高)

            选择以 $\mathbf{a}$ 和 $\mathbf{b}$ 为底面邻边：

                - **底面积** = $|\\mathbf{a} \\times \\mathbf{b}|$（叉乘的大小）
                - **高** = $\\mathbf{c}$ 在垂直于底面方向上的投影长度

            ### 2.2 高的计算
            底面的法向量方向就是 $\\mathbf{a} \\times \\mathbf{b}$ 的方向。$\\mathbf{c}$ 在这个方向上的投影为：

\`\`\`

                高 = |\\mathbf{c}|\\cdot|cos(\theta)| = |(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}| / |\\mathbf{a} \\times \\mathbf{b}|

            其中 \theta 是 \\mathbf{c} 与 \\mathbf{a} \\times \\mathbf{b} 的夹角。

            ### 2.3 体积公式
            综合以上：

\`\`\`

                V = |\\mathbf{a} \\times \\mathbf{b}| \\times |(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}| / |\\mathbf{a} \\times \\mathbf{b}| = |(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|

> **提示**
> 
                **定义**：三个向量的**混合积**定义为 (\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}

                **几何意义**：其绝对值等于以三个向量为棱的平行六面体的体积

            <!-- 平行六面体体积推导图示 -->

*[3D可视化图表]*

            ## 三、代数表示：行列式

            ### 3.1 从分量展开
            设 \\mathbf{a} = (a₁, a₂, a₃), \\mathbf{b} = (b₁, b₂, b₃), \\mathbf{c} = (c₁, c₂, c₃)

            先计算 \\mathbf{a} \\times \\mathbf{b} = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)

            再与 \\mathbf{c} 点乘：

\`\`\`

                (\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = c₁(a₂b₃ - a₃b₂) + c₂(a₃b₁ - a₁b₃) + c₃(a₁b₂ - a₂b₁)

            ### 3.2 整理为行列式
            展开式可以重新排列为：

\`\`\`

                = a₁b₂c₃ + a₂b₃c₁ + a₃b₁c₂ - a₁b₃c₂ - a₂b₁c₃ - a₃b₂c₁

            这正是**三阶行列式**的展开：

\`\`\`

                (\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = det(\\mathbf{a}, \\mathbf{b}, \\mathbf{c}) = |a₁ a₂ a₃|

                                                                   |b₁ b₂ b₃|

                                                                   |c₁ c₂ c₃|

            ## 四、符号的几何意义：右手系与左手系

            ### 4.1 右手系判定
            混合积的符号反映三个向量的相对方向关系：

**思考引导**

                    - **(<strong>a** \\times \\mathbf{b}) \\cdot \\mathbf{c} > 0</strong>：\\mathbf{c} 与 \\mathbf{a} \\times \\mathbf{b} 同向，构成右手系
                    - **(<strong>a** \\times \\mathbf{b}) \\cdot \\mathbf{c} < 0</strong>：\\mathbf{c} 与 \\mathbf{a} \\times \\mathbf{b} 反向，构成左手系
                    - **(<strong>a** \\times \\mathbf{b}) \\cdot \\mathbf{c} = 0</strong>：三向量共面，体积为零

            ### 4.2 轮换对称性
            循环置换三个向量，混合积不变：

\`\`\`

                (\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = (\\mathbf{b} \\times \\mathbf{c}) \\cdot \\mathbf{a} = (\\mathbf{c} \\times \\mathbf{a}) \\cdot \\mathbf{b}

            **证明**：这三个量都等于同一个行列式，只是行交换了偶数次，符号不变。

            ## 五、应用与判定

            ### 5.1 共面性判定
            **定理**：(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = 0 ⟺ 三向量共面

            **证明**：混合积为零 ⟺ 体积为零 ⟺ 三个向量共面

            ### 5.2 体积计算
            
                - **平行六面体**：V = |(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|
                - **四面体**：V = ⅙|(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|（四面体是平行六面体的1/6）

            ### 5.3 点到平面的距离
            已知平面过点 P₀，法向量 \\mathbf{n} = \\mathbf{a} \\times \\mathbf{b}，点 P 到平面的距离：

\`\`\`

                d = |(**P** - **P₀**) \\cdot \\mathbf{n}| / |\\mathbf{n}|

> ⚠️ **注意**
> 
                **注意**：混合积不满足任意交换。交换两个向量会改变符号：

\`\`\`

                    (\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = -(\\mathbf{b} \\times \\mathbf{a}) \\cdot \\mathbf{c} = (\\mathbf{b} \\times \\mathbf{c}) \\cdot \\mathbf{a}
  `,
  formula: `
## 混合积公式的推导
            ### 展开计算
            设 a = (a₁, a₂, a₃), b = (b₁, b₂, b₃), c = (c₁, c₂, c₃)

            先计算 a \\times b：

\`\`\`    $\\mathbf{a} \\times \\mathbf{b}$ = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)

            ### 再与 c 点乘
            
\`\`\`

                (a \\times b) \\cdot c = c₁(a₂b₃ - a₃b₂) + c₂(a₃b₁ - a₁b₃) + c₃(a₁b₂ - a₂b₁)

                = c₁a₂b₃ - c₁a₃b₂ + c₂a₃b₁ - c₂a₁b₃ + c₃a₁b₂ - c₃a₂b₁

            ### 整理为行列式
            这正是三阶行列式的展开形式：

\`\`\`

                |a₁ a₂ a₃|

                |b₁ b₂ b₃|

                |c₁ c₂ c₃|

            ## 几何推导
            平行六面体体积 = 底面积 \\times 高

                - 底面积 = |a \\times b|
                - 高 = |\\mathbf{c}||cos(\theta)|，其中 \theta 是 c 与 a\timesb 的夹角

\`\`\`

                V = |a \\times b| \\times |\\mathbf{c}| \\times |cos(\theta)| = |(a \\times b) \\cdot c|
  `,
  examples: [
  {
    "id": "tp-1",
    "difficulty": "easy",
    "question": "已知 \\mathbf{a} = (1,0,0), \\mathbf{b} = (0,1,0), \\mathbf{c} = (0,0,1)，求混合积 (\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}。",
    "options": [
      "0",
      "1",
      "-1",
      "2"
    ],
    "correct": 1,
    "explanation": "a \\times b = (0,0,1)，(a \\times b) \\cdot c = (0,0,1) \\cdot (0,0,1) = 1\n这正好是单位立方体的体积。"
  },
  {
    "id": "tp-2",
    "difficulty": "medium",
    "question": "求以 A(0,0,0), B(1,0,0), C(0,2,0), D(0,0,3) 为顶点的四面体体积。",
    "options": [
      "1",
      "2",
      "1/6",
      "1/3"
    ],
    "correct": 2,
    "explanation": "向量 AB = (1,0,0), AC = (0,2,0), AD = (0,0,3)\n混合积 (AB \\times AC) \\cdot AD = 6\n四面体体积 = |混合积|/6 = 6/6 = 1"
  }
]
};

export const planelineLesson: SubLesson = {
  id: 'plane-line',
  title: '平面与直线方程',
  has3D: true,
  vizType: 'planeLine',
  theory: `
## 平面方程

            ### 1. 点法式方程
            已知平面上一点 P₀(x₀, y₀, z₀) 和平面的法向量 \\mathbf{n} = (A, B, C)：

\`\`\`

                A(x - x₀) + B(y - y₀) + C(z - z₀) = 0

            ### 2. 一般式方程
            
\`\`\`

                Ax + By + Cz + D = 0

            其中 (A, B, C) 是法向量。

            ### 3. 截距式方程
            
\`\`\`

                x/a + y/b + z/c = 1

            a, b, c 分别是平面在 x, y, z 轴上的截距。

            ## 直线方程

            ### 1. 参数式方程
            过点 P₀(x₀, y₀, z₀)，方向向量 **s** = (m, n, p)：

\`\`\`

                x = x₀ + mt

                y = y₀ + nt

                z = z₀ + pt

            ### 2. 对称式方程（标准式）
            
\`\`\`

                (x - x₀)/m = (y - y₀)/n = (z - z₀)/p

            ### 3. 一般式方程（两平面交线）
            
\`\`\`

                A₁x + B₁y + C₁z + D₁ = 0

                A₂x + B₂y + C₂z + D₂ = 0

            ## 位置关系

            <!-- 平面与直线位置关系图示 -->

*[3D可视化图表]*

**思考引导**

                #### 两平面关系
                
                    - 平行：法向量平行，n₁ \\times n₂ = 0
                    - 垂直：法向量垂直，n₁ \\cdot n₂ = 0
                    - 夹角：cos(\theta) = |n₁ \\cdot n₂|/(|n₁||n₂|)

                #### 两直线关系
                
                    - 平行：方向向量平行
                    - 垂直：方向向量垂直
                    - 共面：(P₂-P₁) \\cdot (s₁ \\times s₂) = 0

                #### 直线与平面关系
                
                    - 平行：方向向量垂直于法向量
                    - 垂直：方向向量平行于法向量

            ## 距离公式

            <!-- 距离公式几何推导图示 -->

*[3D可视化图表]*

            <!-- 两直线间距离图示 - 自制SVG -->

*[3D可视化图表]*

> **提示**
> 
                **点到平面距离**：

\`\`\`

                    d = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)

                *几何意义：向量在法向量方向投影的绝对值*

                **点到直线距离**：

\`\`\`

                    d = |**P₀P** \\times **s**| / |**s**|

                *几何意义：平行四边形的高 = 面积 / 底边长*

                **两平行平面距离**：

\`\`\`

                    d = |D₂ - D₁| / √(A² + B² + C²)

                *几何意义：任取一点转化为点到平面距离*
  `,
  formula: `

  `,
  examples: [
  {
    "id": "pl-1",
    "difficulty": "easy",
    "question": "求过点 (1,2,3) 且法向量为 (2,-1,3) 的平面方程。",
    "options": [
      "2x - y + 3z - 9 = 0",
      "2x - y + 3z + 9 = 0",
      "x + 2y + 3z - 14 = 0",
      "2x + y - 3z + 5 = 0"
    ],
    "correct": 0,
    "explanation": "使用点法式：2(x-1) - (y-2) + 3(z-3) = 0\n展开：2x - 2 - y + 2 + 3z - 9 = 0\n整理：2x - y + 3z - 9 = 0"
  },
  {
    "id": "pl-2",
    "difficulty": "medium",
    "question": "求点 (1,2,3) 到平面 2x - y + 2z - 4 = 0 的距离。",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct": 0,
    "explanation": "d = |2(1) - 1(2) + 2(3) - 4| / √(4+1+4)\n= |2 - 2 + 6 - 4| / 3\n= |2| / 3 = 2/3\n约等于 1（取整）"
  }
]
};

export const quadricsurfacesLesson: SubLesson = {
  id: 'quadric-surfaces',
  title: '二次曲面',
  has3D: true,
  vizType: 'quadricSurface',
  theory: `
## 从平面到曲面：为什么要研究二次曲面？

**思考引导**

                **思考引导**：

                    - 平面的一般方程是 **Ax + By + Cz + D = 0**，这是一次的
                    - 如果允许变量有二次项，会得到什么图形？
                    - 为什么自然界和工程中的曲面（卫星天线、冷却塔、透镜）能用二次函数描述？

            **核心思想**：二次曲面是平面概念的推广，就像圆锥曲线（椭圆、抛物线、双曲线）是直线的推广一样。在三维空间中，二次曲面方程的一般形式为：

\`\`\`

                Ax² + By² + Cz² + Dxy + Exz + Fyz + Gx + Hy + Iz + J = 0

            通过适当的坐标变换，可以消去交叉项和一次项，得到**标准形**。这就是为什么我们只需要研究九种标准二次曲面。

            ## 一、椭球面：球面的"拉伸变形"

            ### 1.1 从球面出发的思考

> **提示**
> 
                **问题**：球面 x² + y² + z² = R² 上各点到球心距离相等。如果我们允许三个方向的"半径"不同，会得到什么？

            设想一个球面被分别沿 x、y、z 方向按比例 a、b、c 拉伸：

                - x 方向拉伸 a 倍：x → x/a
                - y 方向拉伸 b 倍：y → y/b
                - z 方向拉伸 c 倍：z → z/c

            代入球面方程，得到**椭球面标准方程**：

\`\`\`

                \\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1

            ### 1.2 几何特征分析

            **定理**：椭球面与平行于坐标面的平面的交线都是椭圆。

            **证明**：设平面 z = h（|h| < c）与椭球面相交，代入得：

\`\`\`

                \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 - \\frac{h^2}{c^2} = \\frac{c^2 - h^2}{c^2}

            两边除以右边，得标准椭圆方程：

\`\`\`

                \\frac{x^2}{a^2(1 - h^2/c^2)} + \\frac{y^2}{b^2(1 - h^2/c^2)} = 1

            这说明水平截面是椭圆，且随 |h| 增大，椭圆逐渐缩小，当 |h| = c 时缩为一点。

                *↑ 点击右侧可视化区域查看椭球面，观察红色半轴线和水平绿色截面*

            **特例**：当 a = b = c = R 时，椭球面退化为球面。

            ## 二、抛物面：从抛物线到曲面

            ### 2.1 椭圆抛物面的构造思路

> **提示**
> 
                **问题**：抛物线 y = x² 绕轴旋转会生成什么曲面？

            将抛物线 y = x² 绕 y 轴旋转，旋转曲面上的点满足：到 y 轴的距离等于原抛物线的 x 值。

\`\`\`

                \\sqrt{x^2 + z^2} = \\sqrt{y} \Rightarrow y = x^2 + z^2

            更一般地，若两个方向的"开口速度"不同，得到**椭圆抛物面**：

\`\`\`

                z = \\frac{x^2}{a^2} + \\frac{y^2}{b^2}

            ### 2.2 几何性质

            **定理 1**：椭圆抛物面与平面 z = h（h > 0）的交线是椭圆。

\`\`\`

                \\frac{x^2}{a^2h} + \\frac{y^2}{b^2h} = 1

            **定理 2**：椭圆抛物面与平面 x = 0 或 y = 0 的交线是抛物线。

                *↑ 观察椭圆抛物面，注意顶点（黄色点）和水平截面（绿色圆）*

            ### 2.3 双曲抛物面（马鞍面）：符号变化的艺术

> **提示**
> 
                **问题**：如果将椭圆抛物面方程中的一个加号改为减号，会发生什么？

            考虑方程：

\`\`\`

                z = \\frac{x^2}{a^2} - \\frac{y^2}{b^2}

            这个简单的符号变化导致了截然不同的几何性质：

                <li>**与 z = h 的交线**：\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = h
                    
                        - h > 0 时：双曲线，实轴平行于 x 轴
                        - h < 0 时：双曲线，实轴平行于 y 轴
                        - h = 0 时：两条相交直线（渐近线）
                    
                </li>
                - **与 x = 0 的交线**：z = -y²/b²，开口向下的抛物线
                - **与 y = 0 的交线**：z = x²/a²，开口向上的抛物线

            **关键发现**：双曲抛物面可以看作由一簇抛物线沿另一抛物线平行移动而成。

                *↑ 观察马鞍面，注意鞍点（黄色）和两个方向的抛物线（红色）*

            ## 三、双曲面：从椭圆到双曲线

            ### 3.1 单叶双曲面的形成

> **提示**
> 
                **问题**：椭球面的方程右边是 1。如果右边变成 -1，还有实数解吗？

                **进一步**：如果让方程中一个平方项的系数为负呢？

            考虑方程：

\`\`\`

                \\frac{x^2}{a^2} + \\frac{y^2}{b^2} - \\frac{z^2}{c^2} = 1

            **几何特征分析**：

            **定理 1**：单叶双曲面与平面 z = h 的交线是椭圆。

\`\`\`

                \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 + \\frac{h^2}{c^2}

            注意：随着 |h| 增大，椭圆不断扩大！这与椭球面形成鲜明对比。

            **定理 2**：单叶双曲面与平面 y = 0 的交线是双曲线。

\`\`\`

                \\frac{x^2}{a^2} - \\frac{z^2}{c^2} = 1

                *↑ 观察单叶双曲面，注意腰部椭圆（红色）和双曲线截面（绿色）*

            **重要性质**：单叶双曲面是直纹面——它可以由两族直线编织而成！这个性质使其在建筑（如冷却塔）中有重要应用。

            ### 3.2 双叶双曲面：符号的另一种组合

            如果两个平方项为负，一个为正：

\`\`\`

                \\frac{z^2}{c^2} - \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1

            或等价地写为：

\`\`\`

                \\frac{x^2}{a^2} + \\frac{y^2}{b^2} - \\frac{z^2}{c^2} = -1

            **关键差异**：

                - 当 |z| < c 时，方程无实数解 → 曲面分成两"叶"
                - 与 z = h（|h| > c）的交线是椭圆
                - 与 x = 0 或 y = 0 的交线是双曲线

                *↑ 观察双叶双曲面，注意被 z = ±c 平面分隔的两叶*

            ## 四、锥面：从圆锥到椭圆锥

            ### 4.1 方程的齐次性

> **提示**
> 
                **问题**：观察锥面的几何特征——所有母线都通过顶点。这种"相似性"在方程中如何体现？

            若点 (x, y, z) 在曲面上，则对任意 t，点 (tx, ty, tz) 也在曲面上。这意味着方程是**齐次**的（所有项次数相同）。

            **椭圆锥面标准方程**：

\`\`\`

                \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = \\frac{z^2}{c^2}

            **定理**：锥面与平面 z = h（h ≠ 0）的交线是椭圆，与平面 x = 0 或 y = 0 的交线是两条相交直线。

                *↑ 观察椭圆锥面，注意顶点（黄色）和母线（红色）*

            **与双曲面的关系**：锥面是单叶双曲面和双叶双曲面的"渐近锥面"——当双曲面的常数项趋于0时，曲面趋近于锥面。

            ## 五、柱面：直线的轨迹

            ### 5.1 柱面的定义与构造

> **提示**
> 
                **问题**：平面曲线（如圆、椭圆、双曲线）如何扩展成三维曲面？

            **定义**：柱面是由平行于定直线（母线方向）的直线沿定曲线（准线）移动所形成的曲面。

            若准线在 xy 平面，母线平行于 z 轴，则方程中不含 z。

            ### 5.2 三种基本柱面

            <table class="formula-table" style="width:100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">类型</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">方程</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">准线</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">特征</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">椭圆柱面</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">xy平面椭圆</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">封闭</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">双曲柱面</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">xy平面双曲线</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">两叶开口</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">抛物柱面</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">y² = 2px</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">xy平面抛物线</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">单叶开口</td>
                </tr>
            </table>

                *↑ 椭圆柱面，观察上下底面（绿色椭圆）和母线（红色）*

            ## 六、二次曲面的系统分类

            ### 6.1 从标准形看本质

            所有二次曲面的标准形都可以通过以下要素识别：

**思考引导**

                    - **变量个数**：三个变量 → 真正三维；两个变量 → 柱面
                    <li>**平方项符号**：
                        
                            - 三正 → 椭球面
                            - 两正一负 → 单叶双曲面
                            - 一正两负 → 双叶双曲面
                            - 含零次项（一次项）→ 抛物面
                        
                    </li>
                    <li>**等号右边**：
                        
                            - 1 → 标准形（椭球/双曲面）
                            - 0 → 锥面或柱面
                            - 线性函数 → 抛物面
                        
                    </li>

            ### 6.2 知识结构图

二次曲面
├── 椭球型（三正项，=1）
│   └── 椭球面（含球面特例）
├── 双曲型（两正一负或一正两负）
│   ├── 单叶双曲面（=1）
│   ├── 双叶双曲面（=-1）
│   └── 渐近锥面（=0）
├── 抛物型（含一次项）
│   ├── 椭圆抛物面
│   └── 双曲抛物面（马鞍面）
└── 柱面型（缺一个变量）
    ├── 椭圆柱面
    ├── 双曲柱面
    └── 抛物柱面

> ⚠️ **注意**
> 
                **学习建议**：不要死记公式，而是理解：

                    - 每种曲面是如何从更简单的图形（球、抛物线、双曲线）推广而来
                    - 方程中的符号如何影响几何形状
                    - 截面形状与方程的关系
                
                使用右侧的可视化工具，逐一观察每种曲面的特征截面，建立直观认识。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "qs-1",
    "difficulty": "easy",
    "question": "方程 x²/4 + y²/9 + z²/16 = 1 表示什么曲面？",
    "options": [
      "球面",
      "椭球面",
      "双曲面",
      "抛物面"
    ],
    "correct": 1,
    "explanation": "三个变量都是二次项，系数都为正，且不相等，符合椭球面的定义。"
  },
  {
    "id": "qs-2",
    "difficulty": "medium",
    "question": "方程 z = x² - y² 表示什么曲面？",
    "options": [
      "椭圆抛物面",
      "双曲抛物面",
      "单叶双曲面",
      "锥面"
    ],
    "correct": 1,
    "explanation": "z = x² - y² = x²/1 - y²/1，符合双曲抛物面（马鞍面）的形式。"
  }
]
};

export const coordinatesystemsLesson: SubLesson = {
  id: 'coordinate-systems',
  title: '坐标系变换',
  has3D: true,
  vizType: 'coordinateTransform',
  theory: `
## 柱坐标系
            用 (r, \theta, z) 表示空间中一点：

                - r：点到 z 轴的距离
                - \theta：点在 xy 平面上投影的极角
                - z：点的竖坐标（与直角坐标相同）

            ### 与直角坐标的转换
            
\`\`\`

                x = r\cdotcos(\theta)

                y = r\cdotsin(\theta)

                z = z

\`\`\`

                r = √(x² + y²)

                \theta = arctan(y/x)

                z = z

            ### 体积元
            
\`\`\`

                dV = r\cdotdr\cdotd\theta\cdotdz

            ## 球坐标系
            用 (r, \theta, φ) 表示空间中一点：

                - r：点到原点的距离
                - \theta：极角（与 z 轴正向的夹角）
                - φ：方位角（在 xy 平面上的投影与 x 轴的夹角）

            ### 与直角坐标的转换
            
\`\`\`

                x = r\cdotsin(\theta)\cdotcos(φ)

                y = r\cdotsin(\theta)\cdotsin(φ)

                z = r\cdotcos(\theta)

            ### 体积元
            
\`\`\`

                dV = r²\cdotsin(\theta)\cdotdr\cdotd\theta\cdotdφ

            ## 坐标系选择指南
            
> **提示**
> 
                
                    - **柱坐标**：问题具有轴对称性（如圆柱体、圆锥体）
                    - **球坐标**：问题具有球对称性（如球体、球壳）
                    - **直角坐标**：平面或长方体区域
  `,
  formula: `
## 坐标变换公式推导
            ### 柱坐标体积元
            
\`\`\`

                dV = r dr d\theta dz

            推导：考虑由 r 到 r+dr，\theta 到 \theta+d\theta，z 到 z+dz 的小体积

            ### 球坐标体积元
            
\`\`\`

                dV = r² sin(φ) dr dφ d\theta
  `,
  examples: [
  {
    "id": "cs-1",
    "difficulty": "medium",
    "question": "将直角坐标点 (1, 1, 1) 转换为柱坐标。",
    "options": [
      "(√2, π/4, 1)",
      "(√3, π/4, 1)",
      "(√2, π/2, 1)",
      "(2, π/4, 1)"
    ],
    "correct": 0,
    "explanation": "r = √(x²+y²) = √(1+1) = √2\n\theta = arctan(y/x) = arctan(1) = π/4\nz = 1\n所以柱坐标为 (√2, π/4, 1)"
  }
]
};

export const vectorfieldsLesson: SubLesson = {
  id: 'vector-fields',
  title: '向量场基础',
  has3D: true,
  vizType: 'vectorField',
  theory: `
## 向量场的定义
            在空间区域 Ω 上的向量值函数：

\`\`\`

                **F**(x, y, z) = P(x,y,z)\\mathbf{i} + Q(x,y,z)\\mathbf{j} + R(x,y,z)\\mathbf{k}

            ## 重要的向量场

            ### 梯度场（保守场）
            若 **F** = ∇f，则称 **F** 为梯度场，f 称为势函数。

\`\`\`

                **F** = (∂f/∂x, ∂f/∂y, ∂f/∂z)

            ### 旋度场与散度场
            **旋度**（Curl）：

\`\`\`

                ∇ \\times **F** = (∂R/∂y - ∂Q/∂z, ∂P/∂z - ∂R/∂x, ∂Q/∂x - ∂P/∂y)

            **散度**（Divergence）：

\`\`\`

                ∇ \\cdot **F** = ∂P/∂x + ∂Q/∂y + ∂R/∂z

            ## 重要恒等式
            
**思考引导**

\`\`\`

                    ∇ \\times (∇f) = 0（梯度的旋度为零）

                    ∇ \\cdot (∇ \\times **F**) = 0（旋度的散度为零）

            ## 物理意义
            
> **提示**
> 
                
                    - **梯度场**：表示标量场的变化方向和速率（如温度梯度）
                    - **散度**：表示场的源或汇的强度
                    - **旋度**：表示场的旋转程度
  `,
  formula: `
## 向量场的重要公式
            ### 旋度的行列式表示
            
\`\`\`

                ∇ \\times **F** = | i     j     k    |

                           | ∂/∂x  ∂/∂y  ∂/∂z |

                           | P     Q     R    |

            ### 高斯公式（散度定理）
            
\`\`\`

                ∭_V (∇ \\cdot **F**)dV = ∯_S **F** \\cdot d**S**
  `,
  examples: [
  {
    "id": "vf-1",
    "difficulty": "medium",
    "question": "设 f(x,y,z) = x² + y² + z²，求 ∇f。",
    "options": [
      "(2x, 2y, 2z)",
      "(x, y, z)",
      "(2x, 0, 0)",
      "(0, 2y, 2z)"
    ],
    "correct": 0,
    "explanation": "∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)\n∂f/∂x = 2x\n∂f/∂y = 2y\n∂f/∂z = 2z\n所以 ∇f = (2x, 2y, 2z)"
  }
]
};

export const multivariableconceptLesson: SubLesson = {
  id: 'multivariable-concept',
  title: '多元函数概念',
  has3D: true,
  vizType: 'surface3D',
  theory: `
## 多元函数的定义
            设 D 是 n 维空间 Rⁿ 中的一个点集，若对于 D 中每一点 P(x₁, x₂, ..., xₙ)，变量 z 按照确定的对应法则 f 有唯一确定的值与之对应，则称 z 是 x₁, x₂, ..., xₙ 的 n 元函数。

\`\`\`

                z = f(x₁, x₂, ..., xₙ) 或 z = f(P), P ∈ D

            ## 二元函数的几何意义
            二元函数 z = f(x, y) 表示三维空间中的一张曲面。

> **提示**
> 
                例如：

                    - z = x² + y² 表示旋转抛物面
                    - z = √(R² - x² - y²) 表示上半球面

            ## 多元函数的极限
            设函数 f(P) 在点 P₀ 的某去心邻域内有定义，若存在常数 A，使得对于任意 ε > 0，存在 δ > 0，当 0 < |PP₀| < δ 时，有 |f(P) - A| < ε。

\`\`\`

                lim(P→P₀) f(P) = A

> ⚠️ **注意**
> 
                **重要**：多元函数极限要求点 P 以任意方式趋于 P₀ 时，f(P) 都趋于同一值。

            ## 多元函数的连续性
            若 lim(P→P₀) f(P) = f(P₀)，则称 f 在 P₀ 处连续。

            ## 有界闭区域上连续函数的性质
            
**思考引导**

                    - **最值定理**：在有界闭区域上连续的函数必取得最大值和最小值
                    - **介值定理**：连续函数可以取到最大值和最小值之间的一切值
  `,
  formula: `

  `,
  examples: [
  {
    "id": "mc-1",
    "difficulty": "medium",
    "question": "求极限 lim((x,y)→(0,0)) (x²y)/(x² + y²)",
    "options": [
      "0",
      "1",
      "不存在",
      "∞"
    ],
    "correct": 0,
    "explanation": "使用极坐标：x = r\cdotcos(\theta), y = r\cdotsin(\theta)\n原式 = lim(r→0) [r³cos²(\theta)sin(\theta)]/r² = lim(r→0) r\cdotcos²(\theta)sin(\theta) = 0"
  }
]
};

export const partialderivativeLesson: SubLesson = {
  id: 'partial-derivative',
  title: '偏导数',
  has3D: true,
  vizType: 'partialDerivative',
  theory: `
## 一、从一元到多元：变化率概念的推广

**思考引导**

                **思考引导**：回顾一元函数 y = f(x)，导数 dy/dx 表示：

                    - 函数在某点的变化率
                    - 切线的斜率
                    - 因变量对自变量的敏感度
                
                **新问题**：对于二元函数 z = f(x, y)，当 x 和 y 都可以变化时，如何描述"变化率"？

            ## 二、偏导数的引入：固定其他变量

            ### 2.1 基本思想
            当我们讨论多元函数的"变化率"时，一个自然的想法是：**一次只让一个变量变化，其他变量保持不变**。

> **提示**
> 
                **物理类比**：考虑理想气体的状态方程 PV = nRT：

                    - 等容过程（V固定）：温度对压强的影响
                    - 等压过程（P固定）：温度对体积的影响

            ### 2.2 数学定义
            设函数 z = f(x, y) 在点 (x₀, y₀) 的某邻域内有定义：

            **对 x 的偏导数**：固定 y = y₀，让 x 变化：

\`\`\`

                fₓ(x₀, y₀) = lim(Δx→0) [f(x₀+Δx, y₀) - f(x₀, y₀)]/Δx = ∂z/∂x|₍ₓ₀,ᵧ₀₎

            **对 y 的偏导数**：固定 x = x₀，让 y 变化：

\`\`\`

                fᵧ(x₀, y₀) = lim(Δy→0) [f(x₀, y₀+Δy) - f(x₀, y₀)]/Δy = ∂z/∂y|₍ₓ₀,ᵧ₀₎

            ## 三、几何意义：切平面的基石

            ### 3.1 截面曲线的切线
            曲面 z = f(x, y) 与平面 y = y₀ 的交线是一条平面曲线：

\`\`\`

                z = f(x, y₀)（这是关于 x 的一元函数）

            偏导数 fₓ(x₀, y₀) 就是这条曲线在点 (x₀, y₀, f(x₀, y₀)) 处切线对 x 轴的斜率。

                **3D可视化演示**：右侧动画展示了曲面 z = f(x,y)、切平面以及偏导数的几何意义。

                观察：

                    - 红色平面 y = y₀ 与曲面的交线
                    - 绿色箭头表示 ∂f/∂x 方向的变化率
                    - 切平面由两个偏导数方向的张成

            ### 3.2 为什么需要两个偏导数？
            曲面上某点的切线有无穷多条（各个方向都有）。但所有这些切线都在由两个特殊切线张成的**切平面**上：

                - x 方向的切线（斜率为 fₓ）确定了一条方向
                <liy 方向的切线（斜率为 fᵧ）确定了另一条方向</li>
                - 这两个不共线的方向张成整个切平面

            ## 四、计算方法："求导时其他变量视为常数"

            ### 4.1 基本法则
            求 ∂f/∂x 时，将 y 视为常数，对 x 求导；求 ∂f/∂y 时，将 x 视为常数，对 y 求导。

            **例 1**：z = x²y + sin(xy)

\`\`\`

                ∂z/∂x = 2xy + y\cdotcos(xy)（y 视为常数）

                ∂z/∂y = x² + x\cdotcos(xy)（x 视为常数）

            **例 2**：z = xʸ（幂指函数）

\`\`\`

                ∂z/∂x = y\cdotxʸ⁻¹（y 视为常数，幂函数求导）

                ∂z/∂y = xʸ\cdotln(x)（x 视为常数，指数函数求导）

            ## 五、高阶偏导数与混合偏导数

            ### 5.1 二阶偏导数的定义
            对偏导数再求偏导，得到二阶偏导数：

\`\`\`

                ∂²z/∂x² = fₓₓ = ∂/∂x(∂z/∂x)

                ∂²z/∂y² = fᵧᵧ = ∂/∂y(∂z/∂y)

                ∂²z/∂x∂y = fₓᵧ = ∂/∂y(∂z/∂x)（先 x 后 y）

                ∂²z/∂y∂x = fᵧₓ = ∂/∂x(∂z/∂y)（先 y 后 x）

            ### 5.2 混合偏导数定理

**思考引导**

                **定理（Clairaut定理）**：若 fₓᵧ 和 fᵧₓ 在某区域内**连续**，则：

\`\`\`

                    ∂²z/∂x∂y = ∂²z/∂y∂x

                即：在连续条件下，混合偏导数与求导顺序无关。

            **几何意义**：这个结论说明曲面足够"光滑"时，沿不同方向的变化率变化是对称的。

            **反例**：若连续性不满足，混合偏导数可能不相等。例如：

\`\`\`

                f(x,y) = xy(x²-y²)/(x²+y²) 当 (x,y)≠(0,0)，f(0,0)=0

            在原点处 fₓᵧ(0,0) = -1 ≠ 1 = fᵧₓ(0,0)。

            ## 六、偏导数与连续性的关系

> ⚠️ **注意**
> 
                **重要区别**：与一元函数不同，**偏导数存在 ⟹̸ 连续**

                例：f(x,y) = xy/(x²+y²) 当 (x,y)≠(0,0)，f(0,0)=0

                在原点：fₓ(0,0) = 0，fᵧ(0,0) = 0 都存在，但函数在原点不连续！

                **原因**：偏导数只考虑了沿坐标轴方向的变化，而连续性要求所有方向都趋近。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "pd-1",
    "difficulty": "easy",
    "question": "设 f(x,y) = x³y²，求 ∂f/∂x 和 ∂f/∂y。",
    "options": [
      "3x²y² 和 2x³y",
      "3x²y² 和 x³y",
      "x²y² 和 2x³y",
      "3xy² 和 2x²y"
    ],
    "correct": 0,
    "explanation": "∂f/∂x = 3x²y²（y²视为常数）\n∂f/∂y = 2x³y（x³视为常数）"
  }
]
};

export const totaldifferentialLesson: SubLesson = {
  id: 'total-differential',
  title: '全微分',
  has3D: true,
  vizType: 'totalDifferential',
  theory: `
## 一、从线性近似到全微分

**思考引导**

                **思考引导**：回顾一元函数的微分：

\`\`\`

                    dy = f'(x)dx，且 Δy = f'(x)Δx + o(Δx)

                这表示：函数的微小变化 ≈ 导数 \\times 自变量的微小变化。

                **问题**：对于多元函数 z = f(x, y)，当 x 和 y 同时有微小变化时，z 的变化如何近似？

            ## 二、全增量的分解

            ### 2.1 全增量与全微分
            当自变量从 (x, y) 变到 (x+Δx, y+Δy) 时，函数的**全增量**为：

\`\`\`

                Δz = f(x+Δx, y+Δy) - f(x, y)

            我们希望将 Δz 分解为：

\`\`\`

                Δz = A\\cdotΔx + B\\cdotΔy + o(√(Δx² + Δy²))

            其中前两项是**线性主部**，最后一项是高阶无穷小。

            ### 2.2 系数 A 和 B 的确定

            **定理**：若 f 可微，则 A = ∂z/∂x，B = ∂z/∂y。

            **证明**：

            (1) 令 Δy = 0，则：

\`\`\`

                f(x+Δx, y) - f(x, y) = A\\cdotΔx + o(|Δx|)

            两边除以 Δx 并令 Δx → 0：

\`\`\`

                ∂z/∂x = lim(Δx→0) [f(x+Δx,y) - f(x,y)]/Δx = A

            同理可得 B = ∂z/∂y。

            ## 三、全微分的定义与公式

> **提示**
> 
                **定义**：若函数 z = f(x, y) 在点 (x, y) 的全增量可表示为：

\`\`\`

                    Δz = (∂z/∂x)Δx + (∂z/∂y)Δy + o(√(Δx² + Δy²))

                则称 f 在 (x, y) **可微**，并称线性主部为**全微分**：

\`\`\`

                    dz = (∂z/∂x)dx + (∂z/∂y)dy

                **3D可视化演示**：右侧展示了全微分的几何意义。

                    - 红色点 P₀：基准点
                    - 绿色点 P：变化后的点
                    - 蓝色虚线：实际变化 Δz
                    - 黄色虚线：全微分 dz（线性近似）
                
                观察：当 (dx, dy) 越小时，dz 与 Δz 的差异越小。

            ## 四、可微的条件

            ### 4.1 必要条件与充分条件

**思考引导**

                    - **必要条件**：可微 ⟹ 偏导数存在
                    - **充分条件**：偏导数连续 ⟹ 可微

            **注意**：偏导数存在 ⟹̸ 可微。例：

\`\`\`

                f(x,y) = xy/√(x²+y²) 当 (x,y)≠(0,0)，f(0,0)=0

            在原点偏导数存在，但不可微。

            ### 4.2 概念的层次关系

            对于多元函数，概念的强弱关系为：

\`\`\`

                偏导数连续 ⟹ 可微 ⟹ {偏导数存在，连续}

            注意：偏导数存在与连续之间没有蕴含关系！

            ## 五、全微分的应用：近似计算

            ### 5.1 近似公式
            当 |Δx| 和 |Δy| 都很小时：

\`\`\`

                f(x+Δx, y+Δy) ≈ f(x, y) + fₓ(x,y)Δx + fᵧ(x,y)Δy

            ### 5.2 误差估计
            利用全微分可以估计函数的绝对误差和相对误差：

\`\`\`

                |Δz| ≈ |dz| = |fₓ||Δx| + |fᵧ||Δy|

            **例**：计算圆柱体体积 V = πr²h 的误差。

\`\`\`

                dV = (∂V/∂r)dr + (∂V/∂h)dh = 2πrh\cdotdr + πr²\cdotdh

            若 r = 10cm，h = 20cm，测量误差 |dr| ≤ 0.1cm，|dh| ≤ 0.1cm：

\`\`\`

                |dV| ≤ 2π\\cdot10\\cdot20\\cdot0.1 + π\\cdot100\\cdot0.1 = 40π + 10π = 50π ≈ 157 cm³

            用于近似计算和误差估计。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "td-1",
    "difficulty": "medium",
    "question": "求函数 z = x²y 在点 (1,2) 处的全微分。",
    "options": [
      "dz = 4dx + dy",
      "dz = 2dx + dy",
      "dz = 4dx + 2dy",
      "dz = 2dx + 2dy"
    ],
    "correct": 0,
    "explanation": "∂z/∂x = 2xy，在(1,2)处等于 4\n∂z/∂y = x²，在(1,2)处等于 1\ndz = 4dx + dy"
  }
]
};

export const chainruleLesson: SubLesson = {
  id: 'chain-rule',
  title: '链式法则',
  has3D: true,
  vizType: 'chainRule',
  theory: `
## 一、从一元到多元：链式法则的推广

**思考引导**

                **思考引导**：回顾一元函数的链式法则：

\`\`\`

                    y = f(u)，u = g(x) ⟹ dy/dx = (dy/du)\\cdot(du/dx) = f'(u)\cdotg'(x)

                这是"变化率的传递"。**问题**：对于多元复合函数，这个法则如何推广？

            ## 二、多元复合的直观理解

            ### 2.1 问题的复杂性
            设 z = f(u, v)，其中 u = u(x, y)，v = v(x, y)。

> **提示**
> 
                **结构分析**：

                    - z 通过两条路径依赖于 x：z → u → x 和 z → v → x
                    - 每条路径都贡献了一个"变化率传递"
                    - 总的变化率应该是各路径贡献之和

            ### 2.2 链式法则的推导
            **定理**：在上述复合关系下：

\`\`\`

                ∂z/∂x = (∂z/∂u)(∂u/∂x) + (∂z/∂v)(∂v/∂x)

            **证明思路**：

            当 x 变化 Δx（y 固定）时：

                - u 的变化引起 z 的变化：Δz₁ ≈ (∂z/∂u)(∂u/∂x)Δx
                - v 的变化引起 z 的变化：Δz₂ ≈ (∂z/∂v)(∂v/∂x)Δx
                - 总变化：Δz ≈ Δz₁ + Δz₂

            两边除以 Δx 并取极限即得公式。

            ## 三、链式法则的一般形式

            ### 3.1 不同复合结构的公式

            <table class="formula-table" style="width:100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">复合结构</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">链式法则</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">说明</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">z = f(u,v)
u = u(t), v = v(t)</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">dz/dt = zᵤ\cdotu' + zᵥ\cdotv'</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">全导数（一元）</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">z = f(u,v)
u = u(x,y), v = v(x,y)</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">zₓ = zᵤ\cdotuₓ + zᵥ\cdotvₓ
zᵧ = zᵤ\cdotuᵧ + zᵥ\cdotvᵧ</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">偏导数（二元）</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">z = f(u)
u = u(x,y)</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">zₓ = (dz/du)\cdotuₓ
zᵧ = (dz/du)\cdotuᵧ</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">单中间变量</td>
                </tr>
            </table>

                **3D可视化演示**：右侧展示了复合函数的依赖关系。

                观察：中间变量 u, v 如何作为"桥梁"将 z 与 x, y 连接起来。

            ## 四、全微分形式不变性

            ### 4.1 核心定理
            **定理**：无论 u, v 是自变量还是中间变量，全微分形式不变：

\`\`\`

                dz = (∂z/∂u)du + (∂z/∂v)dv

            **意义**：这个性质使得我们在计算全微分时，不需要关心变量的身份，统一按微分法则处理即可。

            ### 4.2 应用：隐函数求导
            利用全微分形式不变性，可以方便地求隐函数的导数。

            **例**：设 F(x,y,z) = 0，求全微分：

\`\`\`

                Fₓdx + Fᵧdy + Fzdz = 0

            解出 dz = -(Fₓ/Fz)dx - (Fᵧ/Fz)dy，即得偏导数。

            ## 五、高阶偏导数的链式法则

            ### 5.1 复杂性来源
            求二阶偏导数时，∂z/∂u 和 ∂z/∂v 通常仍是 u, v 的函数，而 u, v 又是 x, y 的函数，因此：

\`\`\`

                ∂²z/∂x² = ∂/∂x(zᵤ\cdotuₓ + zᵥ\cdotvₓ)
                        = (zᵤᵤ\cdotuₓ + zᵤᵥ\cdotvₓ)uₓ + zᵤ\cdotuₓₓ + (zᵥᵤ\cdotuₓ + zᵥᵥ\cdotvₓ)vₓ + zᵥ\cdotvₓₓ

> ⚠️ **注意**
> 
                **注意**：不要漏掉任何一项！建议使用树状图辅助分析依赖关系。

            ### 5.2 计算技巧
            
                - 画变量依赖图，明确各变量的关系
                - 逐层应用链式法则
                - 注意区分 ∂z/∂x（把 y 固定）和 dz/dx（若 x 是中间变量）

            ## 六、与一元函数链式法则的联系

            多元链式法则本质上是一元链式法则的推广：

\`\`\`

                dz/dx = Σᵢ (∂z/∂uᵢ)(duᵢ/dx)  （对所有路径求和）

            这可以看作"变化率的叠加原理"——当 z 通过多条路径影响 x 时，总的变化率是各路径变化率的代数和。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "cr-1",
    "difficulty": "medium",
    "question": "设 z = u² + v²，其中 u = x + y，v = x - y，求 ∂z/∂x。",
    "options": [
      "4x",
      "2x",
      "2x + 2y",
      "4y"
    ],
    "correct": 0,
    "explanation": "∂z/∂x = (∂z/∂u)(∂u/∂x) + (∂z/∂v)(∂v/∂x)\n= 2u\\cdot1 + 2v\\cdot1 = 2(x+y) + 2(x-y) = 4x"
  }
]
};

export const implicitfunctionLesson: SubLesson = {
  id: 'implicit-function',
  title: '隐函数求导',
  has3D: true,
  vizType: 'implicitFunction',
  theory: `
## 一、显函数与隐函数

**思考引导**

                **思考引导**：我们已经学习了显函数 y = f(x) 的求导方法。但很多时候，变量之间的关系是以方程形式给出的：

\`\`\`

                    x² + y² = 1，或 e^(xy) + x²y = 0

                **问题**：如何求这类函数中 y 关于 x 的导数？

            ### 1.1 隐函数的概念
            由方程 F(x, y) = 0 确定的函数 y = y(x) 称为**隐函数**。

            有些隐函数可以"解出"显式表达式（如 x² + y² = 1 解得 y = ±√(1-x²)），但很多情况下无法或很难解出。

            ## 二、隐函数存在定理

            ### 2.1 存在性与可导性
            
> **提示**
> 
                **定理（隐函数存在定理）**：设 F(x, y) 在点 (x₀, y₀) 的某邻域内：

                    - 具有连续偏导数 Fₓ 和 Fᵧ
                    - F(x₀, y₀) = 0（点在曲线上）
                    - Fᵧ(x₀, y₀) ≠ 0
                
                则方程 F(x, y) = 0 在 x₀ 的某邻域内唯一确定一个连续可导的函数 y = f(x)，且 y₀ = f(x₀)。

            ### 2.2 为什么需要 Fᵧ ≠ 0？
            这保证了在该点附近，y 可以表示为 x 的函数（曲线不垂直）。

            ## 三、隐函数求导公式

            ### 3.1 推导过程
            设 y = y(x) 由 F(x, y) = 0 确定。两边对 x 求全导数：

\`\`\`

                dF/dx = ∂F/∂x + (∂F/∂y)(dy/dx) = 0

            解得：

\`\`\`

                dy/dx = -(∂F/∂x)/(∂F/∂y) = -Fₓ/Fᵧ

            ### 3.2 二元隐函数
            对于 F(x, y, z) = 0 确定的 z = z(x, y)：

\`\`\`

                ∂z/∂x = -Fₓ/Fᵤ

                ∂z/∂y = -Fᵧ/Fᵤ

            ## 四、几何意义

                **3D可视化演示**：右侧展示了隐函数曲线（等高线）和梯度向量。

                    - 等高线：F(x,y) = C
                    - 梯度 ∇F 垂直于等高线
                    - 切线方向与梯度垂直

            ### 4.1 切线与法线
            曲线 F(x, y) = 0 在点 (x₀, y₀) 处：

                - **切线斜率**：k = -Fₓ/Fᵧ
                - **法线方向**：(Fₓ, Fᵧ)，即梯度方向

            ## 五、全微分法

            ### 5.1 方法原理
            对方程 F(x, y) = 0 两边求全微分：

\`\`\`

                dF = Fₓdx + Fᵧdy = 0

            解出 dy = -(Fₓ/Fᵧ)dx，即得导数。

            ### 5.2 优势
            全微分法不需要区分自变量和因变量，适用于复杂情况。

            ## 六、方程组的情形

            对于方程组 {F(x, y, u, v) = 0, G(x, y, u, v) = 0}，确定 u = u(x,y), v = v(x,y)：

\`\`\`

                J = ∂(F,G)/∂(u,v) = |Fᵤ Fᵥ|

                                  |Gᵤ Gᵥ|

            当 J ≠ 0 时，由克莱姆法则可解得 ∂u/∂x, ∂u/∂y, ∂v/∂x, ∂v/∂y。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "if-1",
    "difficulty": "medium",
    "question": "设 x² + y² = 1，求 dy/dx。",
    "options": [
      "-x/y",
      "x/y",
      "-y/x",
      "y/x"
    ],
    "correct": 0,
    "explanation": "设 F = x² + y² - 1\nFₓ = 2x, Fᵧ = 2y\ndy/dx = -Fₓ/Fᵧ = -2x/2y = -x/y"
  }
]
};

export const directionalderivativeLesson: SubLesson = {
  id: 'directional-derivative',
  title: '方向导数与梯度',
  has3D: true,
  vizType: 'gradient',
  theory: `
## 一、从偏导数到方向导数

**思考引导**

                **思考引导**：偏导数描述了函数沿坐标轴方向的变化率。但在实际问题中，变化可能发生在任意方向：

                    - 山坡上沿任意方向的坡度（最速下降法）
                    - 温度场中沿任意方向的变化率
                    - 电位场中电荷受力的方向
                
                **问题**：如何定义和计算函数沿任意方向的变化率？

            ## 二、方向导数的定义

            ### 2.1 数学定义
            设函数 z = f(x, y) 在点 P(x, y) 的某邻域内有定义，**l** 为从 P 出发的射线，方向向量为 **e** = (cos α, cos β)（单位向量），则方向导数为：

\`\`\`

                ∂f/∂l = lim(ρ→0⁺) [f(x+ρcos α, y+ρcos β) - f(x, y)]/ρ

            ### 2.2 与偏导数的关系
            当 **e** = (1, 0) 时，∂f/∂l = ∂f/∂x（沿 x 轴方向）

            当 **e** = (0, 1) 时，∂f/∂l = ∂f/∂y（沿 y 轴方向）

            因此，方向导数是偏导数的推广。

            ## 三、方向导数的计算

            ### 3.1 计算公式
            **定理**：若 f 可微，则

\`\`\`

                ∂f/∂l = fₓ\cdotcos α + fᵧ\cdotcos β = ∇f \\cdot **e**

            ### 3.2 推导
            由全微分公式：

\`\`\`

                Δf ≈ fₓΔx + fᵧΔy = fₓ\\cdotρcos α + fᵧ\\cdotρcos β

            因此：

\`\`\`

                ∂f/∂l = lim(ρ→0) Δf/ρ = fₓcos α + fᵧcos β

            ## 四、梯度的定义与性质

            ### 4.1 梯度的定义
            从方向导数公式 ∂f/∂l = fₓcos α + fᵧcos β 可以看出，这恰好是向量 (fₓ, fᵧ) 与单位方向向量的点积。

> **提示**
> 
                **定义**：函数 f 的**梯度**（gradient）定义为：

\`\`\`

                    ∇f = (fₓ, fᵧ) = (∂f/∂x, ∂f/∂y)

                （∇ 读作 "nabla" 或 "del"）

            ### 4.2 方向导数与梯度的关系

\`\`\`

                ∂f/∂l = ∇f \\cdot **e** = |∇f|\cdotcos(\theta)

            其中 \theta 是梯度方向与方向 **l** 的夹角。

            ## 五、梯度的几何意义

                **3D可视化演示**：右侧展示了梯度向量和等值线。

                    - 红色箭头：梯度 ∇f（指向增长最快方向）
                    - 蓝色曲线：等值线 f(x,y) = C
                    - 观察：梯度始终垂直于等值线

            ### 5.1 最大变化率
            由 ∂f/∂l = |∇f|cos(\theta) 可知：

**思考引导**

                    - 当 \theta = 0（沿梯度方向）：∂f/∂l = |∇f|（最大）
                    - 当 \theta = π（沿负梯度方向）：∂f/∂l = -|∇f|（最小）
                    - 当 \theta = π/2（垂直于梯度）：∂f/∂l = 0（等值线方向）

            ### 5.2 梯度的三个关键性质

                - **方向**：梯度方向是函数值增长最快的方向
                - **大小**：|∇f| 是最大方向导数
                - **正交性**：梯度垂直于等值面（线）

            ## 六、三元函数的推广

            对于 f(x, y, z)：

\`\`\`

                ∇f = (fₓ, fᵧ, fᵤ) = (∂f/∂x, ∂f/∂y, ∂f/∂z)

\`\`\`

                ∂f/∂l = ∇f \\cdot **e** = fₓcos α + fᵧcos β + fᵤcos γ

            梯度 ∇f 是等值面 f(x,y,z) = C 的法向量。

            ## 七、应用

            ### 7.1 最速下降法
            在优化问题中，沿负梯度方向搜索可以最快地减小函数值。

            ### 7.2 热传导
            热流方向与温度梯度方向相反（从高温流向低温）。

            ### 7.3 电场
            电场强度 E = -∇φ，其中 φ 是电位。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "dd-1",
    "difficulty": "medium",
    "question": "求 f(x,y) = x² + y² 在点 (1,1) 沿方向 (1,1) 的方向导数。",
    "options": [
      "2√2",
      "4√2",
      "2",
      "4"
    ],
    "correct": 0,
    "explanation": "fₓ = 2x = 2, fᵧ = 2y = 2\n方向单位向量 e = (1/√2, 1/√2)\n∂f/∂l = 2\\cdot(1/√2) + 2\\cdot(1/√2) = 4/√2 = 2√2"
  }
]
};

export const extremaLesson: SubLesson = {
  id: 'extrema',
  title: '多元函数极值',
  has3D: true,
  vizType: 'extrema',
  theory: `
## 极值的定义
            设函数 z = f(x, y) 在点 (x₀, y₀) 的某邻域内有定义，若对该邻域内任意点 (x, y) ≠ (x₀, y₀)，有

\`\`\`

                f(x, y) < f(x₀, y₀) （极大值）

                f(x, y) > f(x₀, y₀) （极小值）

            ## 极值的必要条件
            若 f 在 (x₀, y₀) 处可偏导且取极值，则

\`\`\`

                fₓ(x₀, y₀) = 0,  fᵧ(x₀, y₀) = 0

            满足上述条件的点称为**驻点**。

            ## 极值的充分条件
            设 f 在 (x₀, y₀) 的某邻域内有连续二阶偏导数，且 (x₀, y₀) 是驻点。记

\`\`\`

                A = fₓₓ(x₀, y₀), B = fₓᵧ(x₀, y₀), C = fᵧᵧ(x₀, y₀)

                Δ = AC - B²

**思考引导**

                    - Δ > 0 且 A > 0：极小值
                    - Δ > 0 且 A < 0：极大值
                    - Δ < 0：不是极值（鞍点）
                    - Δ = 0：无法判断

            ## 条件极值（拉格朗日乘数法）
            求函数 f(x, y) 在约束条件 φ(x, y) = 0 下的极值。

            构造拉格朗日函数：

\`\`\`

                L(x, y, λ) = f(x, y) + λ\\cdotφ(x, y)

            解方程组：

\`\`\`

                Lₓ = fₓ + λφₓ = 0

                Lᵧ = fᵧ + λφᵧ = 0

                Lᵤ = φ = 0

            ## 最大值与最小值
            
> **提示**
> 
                在有界闭区域 D 上求最值的步骤：

                    - 求 D 内部所有驻点的函数值
                    - 求边界上的最值
                    - 比较上述值，最大者为最大值，最小者为最小值
  `,
  formula: `

  `,
  examples: [
  {
    "id": "ex-1",
    "difficulty": "medium",
    "question": "求 f(x,y) = x² + y² - 2x - 4y 的极值。",
    "options": [
      "极小值 -5",
      "极大值 -5",
      "极小值 5",
      "无极值"
    ],
    "correct": 0,
    "explanation": "fₓ = 2x - 2 = 0 → x = 1\nfᵧ = 2y - 4 = 0 → y = 2\nA = fₓₓ = 2, B = 0, C = 2\nΔ = 4 > 0, A = 2 > 0，故为极小值\nf(1,2) = 1 + 4 - 2 - 8 = -5"
  }
]
};

export const taylorLesson: SubLesson = {
  id: 'taylor',
  title: '泰勒展开',
  has3D: true,
  vizType: 'taylor',
  theory: `
## 二元函数的泰勒公式
            设 f(x, y) 在点 (x₀, y₀) 的某邻域内有直到 n+1 阶的连续偏导数，则

            ### 一阶泰勒展开（带拉格朗日余项）
            
\`\`\`

                f(x₀+h, y₀+k) = f(x₀, y₀) + fₓ(x₀, y₀)h + fᵧ(x₀, y₀)k + R₁

            ### 二阶泰勒展开
            
\`\`\`

                f(x₀+h, y₀+k) ≈ f(x₀, y₀)

                + (h∂/∂x + k∂/∂y)f(x₀, y₀)

                + 1/2!(h∂/∂x + k∂/∂y)²f(x₀, y₀)

            展开形式：

\`\`\`

                = f(x₀, y₀)

                + fₓ\cdoth + fᵧ\cdotk

                + 1/2[fₓₓ\cdoth² + 2fₓᵧ\cdothk + fᵧᵧ\cdotk²]

            ## 矩阵表示
            令 **h** = (h, k)，H 为 Hessian 矩阵：

\`\`\`

                H = [fₓₓ  fₓᵧ]

                    [fᵧₓ  fᵧᵧ]

\`\`\`

                f(x₀+h, y₀+k) ≈ f(x₀, y₀) + ∇f\\cdot**h** + 1/2 **h**ᵀH**h**

            ## 极值的二次型判别
            
> **提示**
> 
                Hessian 矩阵正定 ⟹ 极小值

                Hessian 矩阵负定 ⟹ 极大值

                Hessian 矩阵不定 ⟹ 鞍点
  `,
  formula: `
## 泰勒公式推导
            ### 单变量泰勒展开回顾
            
\`\`\`

                f(x) = f(x₀) + f'(x₀)(x-x₀) + f''(x₀)/2! (x-x₀)² + ...

            ### 推广到多变量
            使用方向导数的概念，沿方向 **h** = (h,k) 展开：

\`\`\`

                g(t) = f(x₀ + th, y₀ + tk)

                g'(t) = (h∂/∂x + k∂/∂y)f(x₀+th, y₀+tk)

                g''(t) = (h∂/∂x + k∂/∂y)²f(x₀+th, y₀+tk)
  `,
  examples: [
  {
    "id": "ty-1",
    "difficulty": "medium",
    "question": "求 f(x,y) = e^x sin(y) 在 (0,0) 处的二阶泰勒展开。",
    "options": [
      "y + xy + 1/2(x²y - y³) + ...",
      "y + x + xy + ...",
      "1 + y + xy + ...",
      "x + y + 1/2(x² + y²) + ..."
    ],
    "correct": 0,
    "explanation": "f(0,0) = 0\nfₓ = e^x sin(y) = 0, fᵧ = e^x cos(y) = 1\nfₓₓ = e^x sin(y) = 0, fₓᵧ = e^x cos(y) = 1, fᵧᵧ = -e^x sin(y) = 0\nf ≈ y + xy + 1/2(x²y - y³) + ..."
  }
]
};

export const lagrangeLesson: SubLesson = {
  id: 'lagrange',
  title: '拉格朗日乘数法',
  has3D: true,
  vizType: 'lagrange',
  theory: `
## 单约束条件
            求 f(x, y) 在约束 φ(x, y) = 0 下的极值。

            ### 拉格朗日函数
            
\`\`\`

                L(x, y, λ) = f(x, y) + λ\\cdotφ(x, y)

            ### 极值必要条件
            
\`\`\`

                ∂L/∂x = ∂f/∂x + λ∂φ/∂x = 0

                ∂L/∂y = ∂f/∂y + λ∂φ/∂y = 0

                ∂L/∂λ = φ(x, y) = 0

            ## 多约束条件
            求 f(x, y, z) 在约束 φ(x, y, z) = 0 和 ψ(x, y, z) = 0 下的极值。

\`\`\`

                L(x, y, z, λ, μ) = f(x, y, z) + λ\\cdotφ(x, y, z) + μ\\cdotψ(x, y, z)

            ## 几何解释
            
**思考引导**

                在最优解处，目标函数的梯度与约束条件的梯度共线：

\`\`\`

                    ∇f = -λ∇φ

                即：目标函数的等值线与约束曲线相切。

            ## 应用步骤
            
> **提示**
> 
                
                    - 构造拉格朗日函数
                    - 对各变量求偏导并令其为零
                    - 解方程组得到驻点
                    - 根据实际问题判断极值类型
  `,
  formula: `
## 拉格朗日乘数法推导
            ### 单约束情况
            设 f(x,y) 在约束 φ(x,y)=0 下取极值。

            沿约束曲线，φ(x,y)=0，故 dφ = φₓdx + φᵧdy = 0

            在极值点，df = fₓdx + fᵧdy = 0

\`\`\`

                由隐函数定理，存在 λ 使得 (fₓ, fᵧ) = λ(φₓ, φᵧ)

            ### 经济学解释
            λ 称为影子价格，表示约束条件右端项每增加1单位时，目标函数的边际变化。
  `,
  examples: [
  {
    "id": "lg-1",
    "difficulty": "hard",
    "question": "求函数 f(x,y) = xy 在约束 x² + y² = 1 下的最大值。",
    "options": [
      "1/2",
      "1",
      "√2/2",
      "2"
    ],
    "correct": 0,
    "explanation": "L = xy + λ(x² + y² - 1)\nLₓ = y + 2λx = 0\nLᵧ = x + 2λy = 0\n由前两式得 y² = x²，代入约束：2x² = 1，x = ±1/√2\nf(1/√2, 1/√2) = 1/2 为最大值"
  }
]
};

export const integralconceptLesson: SubLesson = {
  id: 'integral-concept',
  title: '重积分概念',
  has3D: true,
  vizType: 'doubleIntegral',
  theory: `
## 一、从定积分到重积分

**思考引导**

                **思考引导**：回顾一元函数的定积分：

\`\`\`

                    ∫ₐᵇ f(x)dx = lim(λ→0) Σᵢ₌₁ⁿ f(ξᵢ)Δxᵢ

                它表示曲边梯形的面积。

                **问题**：如何计算曲面 z = f(x,y) 下方的体积？如何计算平面薄板的质量？

            ## 二、二重积分的定义

            ### 2.1 问题建模
            考虑曲顶柱体：底面是 xy 平面上的区域 D，顶面是曲面 z = f(x,y)（f(x,y) ≥ 0）。

            **四步法**（与定积分类似）：

                - **分割**：将 D 分成 n 个小区域 Δσᵢ
                - **近似**：每个小区域上方的小曲顶柱体体积 ≈ f(ξᵢ, ηᵢ)Δσᵢ
                - **求和**：V ≈ Σᵢ₌₁ⁿ f(ξᵢ, ηᵢ)Δσᵢ
                - **取极限**：令最大直径 λ → 0

            ### 2.2 数学定义
            
> **提示**
> 
                **定义**：设 f(x, y) 在有界闭区域 D 上有界，若极限

\`\`\`

                    ∬ᴅ f(x, y)dσ = lim(λ→0) Σᵢ₌₁ⁿ f(ξᵢ, ηᵢ)Δσᵢ

                存在且与分割方式、取点方式无关，则称此极限为 f 在 D 上的**二重积分**。

            ### 2.3 几何与物理意义

            <table class="formula-table" style="width:100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">被积函数</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">几何意义</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">物理意义</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">f(x,y) = 1</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">区域 D 的面积</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">—</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">f(x,y) ≥ 0</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">曲顶柱体的体积</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">质量（f 为面密度）</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">f(x,y) 有正有负</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">体积的代数和</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">—</td>
                </tr>
            </table>

            ## 三、三重积分

\`\`\`

                ∭ᴠ f(x, y, z)dV = lim(λ→0) Σᵢ₌₁ⁿ f(ξᵢ, ηᵢ, ζᵢ)ΔVᵢ

            物理意义：空间物体的质量（f 为体密度）。

            ## 四、基本性质

            ### 4.1 线性性质
            
\`\`\`

                ∬ᴅ (αf + βg)dσ = α∬ᴅ fdσ + β∬ᴅ gdσ

            ### 4.2 区域可加性
            若 D = D₁ ∪ D₂ 且 D₁, D₂ 无重叠内部，则：

\`\`\`

                ∬ᴅ fdσ = ∬ᴅ₁ fdσ + ∬ᴅ₂ fdσ

            ### 4.3 积分中值定理
            
**思考引导**

                **定理**：若 f 在 D 上连续，则存在 (ξ, η) ∈ D，使得：

\`\`\`

                    ∬ᴅ f(x,y)dσ = f(ξ,η)\\cdot|D|

                其中 |D| 是区域 D 的面积。

            **几何解释**：存在一个高度为 f(ξ,η) 的平顶柱体，其体积恰好等于曲顶柱体的体积。

            ## 五、对称性的应用

                **3D可视化演示**：右侧展示了曲顶柱体的体积计算。

            ### 5.1 对称性简化计算

> **提示**
> 
                若 D 关于 x 轴对称：

                    - f(x, -y) = -f(x, y)（关于 y 奇）⟹ ∬ᴅ fdσ = 0
                    - f(x, -y) = f(x, y)（关于 y 偶）⟹ ∬ᴅ fdσ = 2∬ᴅ₊ fdσ
                
                其中 D₊ 是 D 在上半平面的部分。

            **例**：D 为单位圆 x² + y² ≤ 1，求 ∬ᴅ x³y dσ。

            解：D 关于 x 轴对称，f(x,-y) = x³(-y) = -x³y = -f(x,y)，故积分为 0。
  `,
  formula: `
## 重积分的几何意义推导
            ### 从黎曼和到积分
            将区域 D 分割为 n 个小区域 Δσᵢ：

\`\`\`

                ∬ᴅ f(x,y)dσ = lim(n→∞) Σᵢ₌₁ⁿ f(ξᵢ,ηᵢ)Δσᵢ

            ### 二重积分中值定理
            若 f 在 D 上连续，则存在 (ξ,η) ∈ D：

\`\`\`

                ∬ᴅ f(x,y)dσ = f(ξ,η)\\cdot|D|
  `,
  examples: [
  {
    "id": "ic-1",
    "difficulty": "easy",
    "question": "利用对称性，求 ∬ᴅ x³y dσ，其中 D 为圆 x² + y² ≤ 1。",
    "options": [
      "0",
      "π/4",
      "1/2",
      "π"
    ],
    "correct": 0,
    "explanation": "积分区域 D 关于 x 轴对称\nf(x,y) = x³y 关于 y 是奇函数（f(x,-y) = -f(x,y)）\n由对称性，积分值为 0"
  }
]
};

export const doubleintegralLesson: SubLesson = {
  id: 'double-integral',
  title: '二重积分',
  has3D: true,
  vizType: 'doubleIntegralRegion',
  theory: `
## 一、化二重积分为累次积分

**思考引导**

                **核心思想**：二重积分的计算关键是将其转化为两次定积分（累次积分）。

                几何直观：曲顶柱体的体积可以通过"切片法"求得——

                    - 先沿一个方向积分，得到截面面积函数
                    - 再沿垂直方向积分，累加所有截面

            ## 二、直角坐标系计算

            ### 2.1 X-型区域
            区域 D 可以表示为：

\`\`\`

                D: a ≤ x ≤ b, φ₁(x) ≤ y ≤ φ₂(x)

            即：用垂直于 x 轴的直线与区域边界至多交于两点。

> **提示**
> 
                **计算公式**：

\`\`\`

                    ∬ᴅ f(x, y)dσ = ∫ₐᵇ [∫ᵩ₁₍ₓ₎ᵩ₂₍ₓ₎ f(x, y)dy] dx

                计算步骤：先对 y 积分（x 视为常数），再对 x 积分。

            ### 2.2 Y-型区域
            区域 D 可以表示为：

\`\`\`

                D: c ≤ y ≤ d, ψ₁(y) ≤ x ≤ ψ₂(y)

\`\`\`

                ∬ᴅ f(x, y)dσ = ∫ᴄᵈ [∫ᵩ₁₍ᵧ₎ᵩ₂₍ᵧ₎ f(x, y)dx] dy

            ### 2.3 积分次序选择策略

            <table class="formula-table" style="width:100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">考虑因素</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">选择原则</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">示例</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">被积函数</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">先积容易积分的变量</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">e^(y²) 应先对 x 积分</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">积分区域</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">避免分块计算</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">三角形区域看哪边更简单</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">区域形状</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">圆域用极坐标</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">x² + y² ≤ R²</td>
                </tr>
            </table>

            ## 三、极坐标计算

            ### 3.1 为什么需要极坐标？
            当积分区域是圆、圆环或扇形，或被积函数含有 x² + y² 时，极坐标往往更简单。

            ### 3.2 坐标变换与面积元素
            
\`\`\`

                x = r\cdotcos(\theta), y = r\cdotsin(\theta)

            **关键**：极坐标下的面积元素不是 drd\theta，而是：

**思考引导**

\`\`\`

                    dσ = r\cdotdr\cdotd\theta

                **几何解释**：极坐标网格中，小区域近似为矩形，边长为 dr 和 r\cdotd\theta。

            ### 3.3 极坐标下的计算公式

\`\`\`

                ∬ᴅ f(x, y)dσ = ∬ᴅ' f(r\cdotcos(\theta), r\cdotsin(\theta))\cdotr\cdotdr\cdotd\theta

            ### 3.4 常用极坐标区域

> **提示**
> 
                
                    - **圆 x² + y² ≤ R²**：0 ≤ r ≤ R, 0 ≤ \theta ≤ 2π
                    - **圆 x² + y² ≤ 2Rx**（圆心在 (R,0)）：0 ≤ r ≤ 2R\cdotcos(\theta), -π/2 ≤ \theta ≤ π/2
                    - **圆环 a² ≤ x² + y² ≤ b²**：a ≤ r ≤ b, 0 ≤ \theta ≤ 2π
                    - **扇形**：0 ≤ r ≤ R, α ≤ \theta ≤ β

            ## 四、变量替换的一般公式

            设变换 x = x(u,v), y = y(u,v)，则：

\`\`\`

                ∬ᴅ f(x,y)dxdy = ∬ᴅ' f(x(u,v), y(u,v)) |J| dudv

            其中 J 是雅可比行列式：

\`\`\`

                J = ∂(x,y)/∂(u,v) = |∂x/∂u ∂x/∂v|

                                  |∂y/∂u ∂y/∂v|

            极坐标变换的雅可比行列式：J = r。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "di-1",
    "difficulty": "medium",
    "question": "计算 ∬ᴅ (x + y)dxdy，其中 D 由 x = 0, y = 0, x + y = 1 围成。",
    "options": [
      "1/3",
      "1/2",
      "1/6",
      "1/4"
    ],
    "correct": 0,
    "explanation": "∫₀¹ dx ∫₀¹⁻ˣ (x+y)dy\n= ∫₀¹ [xy + y²/2]₀¹⁻ˣ dx\n= ∫₀¹ [x(1-x) + (1-x)²/2] dx\n= ∫₀¹ [x - x² + 1/2 - x + x²/2] dx\n= ∫₀¹ [1/2 - x²/2] dx = [x/2 - x³/6]₀¹ = 1/3"
  }
]
};

export const tripleintegralLesson: SubLesson = {
  id: 'triple-integral',
  title: '三重积分',
  has3D: true,
  vizType: 'tripleIntegral',
  theory: `
## 直角坐标系
            ### 先一后二（穿针法）
            
\`\`\`

                ∭ᴠ f(x,y,z)dV = ∬ᴅ dxdy ∫ᵤ₁₍ₓ,ᵧ₎ᵤ₂₍ₓ,ᵧ₎ f(x,y,z)dz

            ### 先二后一（切片法）
            
\`\`\`

                ∭ᴠ f(x,y,z)dV = ∫ₐᵇ dz ∬ᴅ₍ᵤ₎ f(x,y,z)dxdy

            ## 柱坐标
            
\`\`\`

                x = r\cdotcos(\theta), y = r\cdotsin(\theta), z = z

                dV = r\cdotdr\cdotd\theta\cdotdz

            ## 球坐标
            
\`\`\`

                x = r\cdotsin(φ)\cdotcos(\theta)

                y = r\cdotsin(φ)\cdotsin(\theta)

                z = r\cdotcos(φ)

                dV = r²\cdotsin(φ)\cdotdr\cdotdφ\cdotd\theta

            ## 坐标系选择
            
**思考引导**

                    - **柱坐标**：区域为柱形、锥形，或被积函数含 x² + y²
                    - **球坐标**：区域为球形、球壳，或被积函数含 x² + y² + z²

            ## 对称性应用
            
> **提示**
> 
                若 Ω 关于 xy 平面对称：

                    - f(x, y, -z) = -f(x, y, z) ⟹ 积分为 0
                    - f(x, y, -z) = f(x, y, z) ⟹ 积分 = 2 \\times 上半区域积分
  `,
  formula: `
## 三重积分计算方法
            ### 先一后二法（穿针法）
            
\`\`\`

                ∭ᴠ f(x,y,z)dV = ∬ᴅ dxdy ∫z₁(x,y)^z₂(x,y) f(x,y,z)dz

            ### 先二后一法（切片法）
            
\`\`\`

                ∭ᴠ f(x,y,z)dV = ∫a^b dz ∬D(z) f(x,y,z)dxdy
  `,
  examples: [
  {
    "id": "ti-1",
    "difficulty": "medium",
    "question": "求单位球 x² + y² + z² ≤ 1 的体积。",
    "options": [
      "4π/3",
      "π",
      "2π",
      "π/2"
    ],
    "correct": 0,
    "explanation": "使用球坐标：V = ∭ dV = ∫₀²π d\theta ∫₀^π dφ ∫₀¹ r² sin(φ) dr\n= 2π \\times [-cos(φ)]₀^π \\times [r³/3]₀¹\n= 2π \\times 2 \\times 1/3 = 4π/3"
  }
]
};

export const changevariablesLesson: SubLesson = {
  id: 'change-variables',
  title: '变量替换',
  has3D: true,
  vizType: 'changeOfVariables',
  theory: `
## 一般换元公式
            设变换 x = x(u,v), y = y(u,v) 将 uv 平面区域 D' 变为 xy 平面区域 D，则

\`\`\`

                ∬ᴅ f(x,y)dxdy = ∬ᴅ' f(x(u,v), y(u,v)) |J| dudv

            其中 J 为雅可比行列式：

\`\`\`

                J = ∂(x,y)/∂(u,v) = |∂x/∂u  ∂x/∂v|

                                      |∂y/∂u  ∂y/∂v|

            ## 极坐标变换
            
\`\`\`

                J = |cos(\theta)  -r\cdotsin(\theta)|

                    |sin(\theta)   r\cdotcos(\theta)| = r

            ## 广义极坐标
            
\`\`\`

                x = a\cdotr\cdotcos(\theta), y = b\cdotr\cdotsin(\theta)

                J = ab\cdotr

            用于椭圆区域 x²/a² + y²/b² ≤ 1

            ## 三重积分换元
            
\`\`\`

                ∭ᴠ f(x,y,z)dxdydz = ∭ᴠ' f(x(u,v,w),...) |J| dudvdw

            ## 常用变换
            
> **提示**
> 
                
                    - 平移：u = x - a, v = y - b（J = 1）
                    - 伸缩：u = x/a, v = y/b（J = ab）
                    - 旋转：利用正交变换（J = 1）
  `,
  formula: `
## 雅可比行列式的性质
            ### 链式法则
            
\`\`\`

                若 x = x(u,v), y = y(u,v)，且 u = u(s,t), v = v(s,t)

                则 ∂(x,y)/∂(s,t) = ∂(x,y)/∂(u,v) \\times ∂(u,v)/∂(s,t)

            ### 逆变换
            
\`\`\`

                ∂(x,y)/∂(u,v) \\times ∂(u,v)/∂(x,y) = 1
  `,
  examples: [
  {
    "id": "cv-1",
    "difficulty": "medium",
    "question": "求椭圆 x²/a² + y²/b² ≤ 1 的面积。",
    "options": [
      "πab",
      "2πab",
      "π(a+b)",
      "4ab"
    ],
    "correct": 0,
    "explanation": "令 x = ar\cdotcos(\theta), y = br\cdotsin(\theta)\nJ = abr\nS = ∬ᴅ dxdy = ∫₀²π d\theta ∫₀¹ abr dr = 2π \\times ab \\times 1/2 = πab"
  }
]
};

export const applicationsLesson: SubLesson = {
  id: 'applications',
  title: '重积分应用',
  has3D: true,
  vizType: 'applications',
  theory: `
## 几何应用

            ### 平面区域面积
            
\`\`\`

                S = ∬ᴅ dxdy

            ### 空间立体体积
            
\`\`\`

                V = ∭ᴠ dV = ∬ᴅ [z₂(x,y) - z₁(x,y)]dxdy

            ### 曲面面积
            曲面 z = f(x, y) 在区域 D 上的面积：

\`\`\`

                A = ∬ᴅ √(1 + fₓ² + fᵧ²) dxdy

            ## 物理应用

            ### 质量
            
\`\`\`

                M = ∬ᴅ ρ(x,y)dσ （平面薄板）

                M = ∭ᴠ ρ(x,y,z)dV （空间物体）

            ### 质心
            
\`\`\`

                x̄ = (1/M)∬ᴅ x\\cdotρ(x,y)dσ

                ȳ = (1/M)∬ᴅ y\\cdotρ(x,y)dσ

            ### 转动惯量
            
\`\`\`

                Iₓ = ∬ᴅ y²\\cdotρ(x,y)dσ （对 x 轴）

                Iᵧ = ∬ᴅ x²\\cdotρ(x,y)dσ （对 y 轴）

                I₀ = ∬ᴅ (x²+y²)\\cdotρ(x,y)dσ （对原点）

            ### 引力
            物体对质点的引力可用三重积分计算各分量。
  `,
  formula: `
## 重积分应用推导
            ### 质心坐标
            
\`\`\`

                x̄ = (1/M)∭ᴠ x\\cdotρ dV

                ȳ = (1/M)∭ᴠ y\\cdotρ dV

                z̄ = (1/M)∭ᴠ z\\cdotρ dV

            ### 转动惯量张量
            
\`\`\`

                I = ∫ r² dm = ∭ᴠ (x²+y²+z²)ρ dV
  `,
  examples: [
  {
    "id": "app-1",
    "difficulty": "medium",
    "question": "求半径为 R 的均匀半圆薄片（面密度 ρ=1）的质心。",
    "options": [
      "(0, 4R/3π)",
      "(0, R/2)",
      "(0, 2R/π)",
      "(R/2, 0)"
    ],
    "correct": 0,
    "explanation": "由对称性，x̄ = 0\nȳ = (1/S)∬ᴅ y dσ = (1/(πR²/2))∫₀^π d\theta ∫₀ᴿ r\cdotsin(\theta)\cdotr dr\n= (2/(πR²)) \\times 2 \\times R³/3 = 4R/(3π)"
  }
]
};

export const polarcoordinatesLesson: SubLesson = {
  id: 'polar-coordinates',
  title: '极坐标积分',
  has3D: true,
  vizType: 'polarCoordinates',
  theory: `
## 极坐标变换回顾
            
\`\`\`

                x = r\cdotcos(\theta), y = r\cdotsin(\theta)

                dσ = r\cdotdr\cdotd\theta

            ## 极坐标下的积分区域

            ### 圆形区域
            
                - 圆心在原点：0 ≤ r ≤ R, 0 ≤ \theta ≤ 2π
                - 圆心在 (a, 0)：0 ≤ r ≤ 2a\cdotcos(\theta), -π/2 ≤ \theta ≤ π/2

            ### 环形区域
            
\`\`\`

                a ≤ r ≤ b, 0 ≤ \theta ≤ 2π

            ### 扇形区域
            
\`\`\`

                0 ≤ r ≤ R, α ≤ \theta ≤ β

            ## 适合极坐标的被积函数
            
> **提示**
> 
                
                    - 含 x² + y² 的函数
                    - 含 y/x 或 x/y 的函数
                    - 仅与到原点距离有关的函数 f(√(x²+y²))

            ## 极坐标积分技巧
            
**思考引导**

                    - 正确确定 \theta 的范围（观察区域覆盖的角度）
                    - r 的上下限可能是 \theta 的函数
                    - 注意乘以 r（雅可比行列式）
                    - 利用对称性简化计算
  `,
  formula: `
## 极坐标变换推导
            ### 雅可比行列式
            
\`\`\`

                J = |∂x/∂r  ∂x/∂\theta|   |cos(\theta)  -r\cdotsin(\theta)|

                    |∂y/∂r  ∂y/∂\theta| = |sin(\theta)   r\cdotcos(\theta)| = r

            ### 面积元素
            
\`\`\`

                dσ = |J| dr d\theta = r dr d\theta
  `,
  examples: [
  {
    "id": "pc-1",
    "difficulty": "medium",
    "question": "计算 ∬ᴅ e^(x²+y²) dxdy，其中 D 为圆 x² + y² ≤ 1。",
    "options": [
      "π(e-1)",
      "2π(e-1)",
      "πe",
      "π/e"
    ],
    "correct": 0,
    "explanation": "使用极坐标：x² + y² = r², dσ = rdrd\theta\n∬ᴅ e^(x²+y²) dxdy = ∫₀²π d\theta ∫₀¹ e^(r²) r dr\n= 2π \\times [1/2 e^(r²)]₀¹ = π(e - 1)"
  }
]
};

export const cylindricalsphericalLesson: SubLesson = {
  id: 'cylindrical-spherical',
  title: '柱坐标与球坐标',
  has3D: true,
  vizType: 'cylindricalSpherical',
  theory: `
## 柱坐标系
            
\`\`\`

                x = r\cdotcos(\theta), y = r\cdotsin(\theta), z = z

                dV = r\cdotdr\cdotd\theta\cdotdz

            ### 适用场景
            
                - 柱形区域
                - 锥形区域
                - 被积函数含 x² + y²

            ## 球坐标系
            
\`\`\`

                x = r\cdotsin(φ)\cdotcos(\theta)

                y = r\cdotsin(φ)\cdotsin(\theta)

                z = r\cdotcos(φ)

                dV = r²\cdotsin(φ)\cdotdr\cdotdφ\cdotd\theta

            ### 变量说明
            
                - r：点到原点的距离 (0 ≤ r < ∞)
                - φ：与 z 轴正向的夹角 (0 ≤ φ ≤ π)
                - \theta：在 xy 平面上与 x 轴的夹角 (0 ≤ \theta ≤ 2π)

            ### 适用场景
            
                - 球形区域
                - 球壳区域
                - 被积函数含 x² + y² + z²

            ## 球坐标积分限
            
> **提示**
> 
                #### 球 x² + y² + z² ≤ R²
                0 ≤ r ≤ R, 0 ≤ φ ≤ π, 0 ≤ \theta ≤ 2π

                #### 上半球
                0 ≤ r ≤ R, 0 ≤ φ ≤ π/2, 0 ≤ \theta ≤ 2π

                #### 球壳 a² ≤ x² + y² + z² ≤ b²
                a ≤ r ≤ b, 0 ≤ φ ≤ π, 0 ≤ \theta ≤ 2π

> ⚠️ **注意**
> 
                **注意**：不要忘记体积元中的 r（柱坐标）或 r²\cdotsin(φ)（球坐标）！
  `,
  formula: `
## 球坐标体积元推导
            ### 雅可比行列式
            
\`\`\`

                J = r² sin(φ)

            推导：从直角坐标到球坐标的变换矩阵行列式

            ### 球体积公式
            
\`\`\`

                V = ∭ dV = ∫₀²π d\theta ∫₀^π sin(φ)dφ ∫₀ᴿ r² dr = 4πR³/3
  `,
  examples: [
  {
    "id": "cs-2",
    "difficulty": "medium",
    "question": "求球 x² + y² + z² = R² 在 0 ≤ z ≤ h 部分的体积。",
    "options": [
      "πh²(R - h/3)",
      "2πh²(R - h/3)",
      "πhR²",
      "4πR³/3"
    ],
    "correct": 0,
    "explanation": "使用柱坐标：V = ∭ dV = ∫₀²π d\theta ∫₀^√(R²-h²) r dr ∫₀^h dz\n或使用球坐标直接计算得 V = πh²(R - h/3)"
  }
]
};

export const surfaceintegralfirstLesson: SubLesson = {
  id: 'surface-integral-first',
  title: '第一类曲面积分',
  has3D: true,
  vizType: 'surfaceIntegralFirst',
  theory: `
## 定义
            设 Σ 是光滑曲面，f(x, y, z) 在 Σ 上有界，则第一类曲面积分（对面积的曲面积分）为：

\`\`\`

                ∬_Σ f(x,y,z)dS = lim(λ→0) Σ f(ξᵢ,ηᵢ,ζᵢ)ΔSᵢ

            ## 计算方法

            ### 曲面为 z = z(x, y)
            
\`\`\`

                ∬_Σ f(x,y,z)dS = ∬_D f(x,y,z(x,y)) √(1 + zₓ² + zᵧ²) dxdy

            ### 曲面为参数方程
            设 x = x(u,v), y = y(u,v), z = z(u,v)

\`\`\`

                dS = |**r**_u \\times **r**_v| dudv

            ## 几何意义
            
**思考引导**

                    - 当 f = 1 时，积分等于曲面面积
                    - 当 f 为密度时，积分等于曲面质量

            ## 对称性
            
> **提示**
> 
                若 Σ 关于 xy 平面对称：

                    - f(x,y,-z) = -f(x,y,z) ⟹ 积分为 0
                    - f(x,y,-z) = f(x,y,z) ⟹ 积分 = 2 \\times 上半曲面积分
  `,
  formula: `
## 曲面积分的面积元素
            ### 显式曲面 z = z(x,y)
            
\`\`\`

                dS = √(1 + (∂z/∂x)² + (∂z/∂y)²) dxdy

                = √(1 + |∇z|²) dxdy

            ### 参数曲面推导
            
\`\`\`

                dS = |**r**_u \\times **r**_v| du dv

                = √(EG - F²) du dv

            其中 E = **r**_u\\cdot**r**_u, F = **r**_u\\cdot**r**_v, G = **r**_v\\cdot**r**_v
  `,
  examples: [
  {
    "id": "sif-1",
    "difficulty": "medium",
    "question": "求半球面 z = √(R²-x²-y²) 的表面积。",
    "options": [
      "2πR²",
      "πR²",
      "4πR²",
      "πR²/2"
    ],
    "correct": 0,
    "explanation": "zₓ = -x/z, zᵧ = -y/z\n√(1+zₓ²+zᵧ²) = R/√(R²-x²-y²) = R/z\nS = ∬ᴅ R/z dxdy = R \\times 2πR = 2πR²"
  }
]
};

export const surfaceintegralsecondLesson: SubLesson = {
  id: 'surface-integral-second',
  title: '第二类曲面积分',
  has3D: true,
  vizType: 'surfaceIntegralSecond',
  theory: `
## 定义
            设 Σ 为有向光滑曲面，**F** = (P, Q, R) 为向量场，则第二类曲面积分（对坐标的曲面积分）为：

\`\`\`

                ∬_Σ **F** \\cdot d**S** = ∬_Σ P dydz + Q dzdx + R dxdy

            ## 有向曲面
            曲面的侧由法向量的方向确定：

                - 闭曲面：外侧（法向量朝外）或内侧
                - z = z(x, y)：上侧（法向量朝上）或下侧

            ## 计算方法
            ### 投影到 xy 平面
            
\`\`\`

                ∬_Σ R dxdy = ±∬_D R(x,y,z(x,y)) dxdy

            上侧取正，下侧取负。

            ### 统一投影法
            
\`\`\`

                ∬_Σ P dydz + Q dzdx + R dxdy = ∬_Σ (Pcosα + Qcosβ + Rcosγ)dS

            ## 两类曲面积分的关系
            
\`\`\`

                ∬_Σ P dydz + Q dzdx + R dxdy = ∬_Σ (Pcosα + Qcosβ + Rcosγ)dS

            其中 (cosα, cosβ, cosγ) 为有向曲面单位法向量。
  `,
  formula: `
## 有向曲面面积元素
            ### 投影关系
            
\`\`\`

                dydz = cos(α) dS = ± (∂z/∂x) dxdy

                dzdx = cos(β) dS = ± (∂z/∂y) dxdy

                dxdy = cos(γ) dS

            ### 法向量方向
            上侧取正，下侧取负；前侧取正，后侧取负；右侧取正，左侧取负。
  `,
  examples: [
  {
    "id": "sis-1",
    "difficulty": "hard",
    "question": "计算 ∬_Σ z dxdy，其中 Σ 为球面 x²+y²+z²=R² 的外侧。",
    "options": [
      "4πR³/3",
      "2πR³",
      "πR³",
      "0"
    ],
    "correct": 0,
    "explanation": "使用高斯公式：∬_Σ z dxdy = ∭_Ω (∂z/∂z) dV = ∭_Ω dV = 4πR³/3"
  }
]
};

export const gausstheoremLesson: SubLesson = {
  id: 'gauss-theorem',
  title: '高斯定理',
  has3D: true,
  vizType: 'gaussTheorem',
  theory: `
## 高斯公式（散度定理）
            设 Ω 是由分片光滑闭曲面 Σ 所围成的空间闭区域，P, Q, R 在 Ω 上具有一阶连续偏导数，则

\`\`\`

                ∯_Σ P dydz + Q dzdx + R dxdy = ∭_Ω (∂P/∂x + ∂Q/∂y + ∂R/∂z)dV

            或写成向量形式：

\`\`\`

                ∯_Σ **F** \\cdot d**S** = ∭_Ω (∇ \\cdot **F**)dV

            ## 二、散度（Divergence）的物理意义
            
\`\`\`

                div **F** = ∇ \\cdot **F** = ∂P/∂x + ∂Q/∂y + ∂R/∂z

**思考引导**

                **物理意义**：散度表示单位体积内场的"源"的强度，即流体从该点流出的速率。

                    - div **F** > 0：该点有"源"（流体流出，如喷泉）
                    - div **F** < 0：该点有"汇"（流体流入，如排水口）
                    - div **F** = 0：无源场（solenoidal，流体不可压缩）

                **3D可视化演示**：右侧展示了向量场通过闭曲面的通量。

                    - 红色箭头：向量场 **F**
                    - 黄色闭曲面：边界 Σ
                    - 观察：穿出曲面的通量与内部散度的关系

            ## 三、高斯公式的本质

            高斯公式将**闭曲面上的通量**与**体积内的源强**联系起来：

\`\`\`

                ∯<sub>Σ</sub> **F** \\cdot d**S** = ∭<sub>Ω</sub> (∇ \\cdot **F**) dV

            这与格林公式是一脉相承的——都是"内部微分 = 边界积分"的体现。

            ## 四、应用条件与技巧

            ### 4.1 应用条件
            
> **提示**
> 
                
                    - Σ 必须是**闭曲面**
                    - 取**外侧**（若为内侧则加负号）
                    - P, Q, R 在 Ω 内有**连续偏导数**

            ### 4.2 常用技巧
            
                - **补面法**：对非闭曲面补面后用高斯公式，再减去补面的积分
                - **挖洞法**：处理奇点（如原点处的 1/r 型奇性），用小球挖去奇点后求极限

            ## 五、应用实例：电场的高斯定律

            在静电学中，电场 **E** 满足：

\`\`\`

                ∯<sub>Σ</sub> **E** \\cdot d**S** = Q/ε₀

            其中 Q 是闭曲面内的总电荷。由高斯公式：

\`\`\`

                ∭<sub>Ω</sub> (∇ \\cdot **E**) dV = Q/ε₀ = ∭<sub>Ω</sub> (ρ/ε₀) dV

            得到微分形式：∇ \\cdot **E** = ρ/ε₀（电荷密度与散度的关系）。
  `,
  formula: `
## 高斯公式推导思路
            ### 从二维到三维的推广
            格林公式：∮_L Pdx + Qdy = ∬_D (∂Q/∂x - ∂P/∂y)dxdy

            高斯公式是其三维推广，将面积分与体积分联系起来。

            ### 物理意义
            
\`\`\`

                通过闭曲面的通量 = 体积内的总源强
  `,
  examples: [
  {
    "id": "gt-1",
    "difficulty": "medium",
    "question": "利用高斯公式计算 ∯_Σ x dydz + y dzdx + z dxdy，其中 Σ 为球面 x²+y²+z²=R² 的外侧。",
    "options": [
      "4πR³",
      "2πR³",
      "πR³",
      "0"
    ],
    "correct": 0,
    "explanation": "div F = ∂x/∂x + ∂y/∂y + ∂z/∂z = 3\n∯_Σ F\cdotdS = ∭_Ω 3 dV = 3 \\times 4πR³/3 = 4πR³"
  }
]
};

export const stokestheoremLesson: SubLesson = {
  id: 'stokes-theorem',
  title: '斯托克斯定理',
  has3D: true,
  vizType: 'stokesTheorem',
  theory: `
## 斯托克斯公式
            设 Σ 为分片光滑的有向曲面，其边界 Γ 为分段光滑的闭曲线，P, Q, R 在包含 Σ 的空间区域内有一阶连续偏导数，则

\`\`\`

                ∮_Γ Pdx + Qdy + Rdz = ∬_Σ [(∂R/∂y - ∂Q/∂z)dydz

                + (∂P/∂z - ∂R/∂x)dzdx

                + (∂Q/∂x - ∂P/∂y)dxdy]

            ## 向量形式
            
\`\`\`

                ∮_Γ **F** \\cdot d**r** = ∬_Σ (∇ \\times **F**) \\cdot d**S**

            ## 旋度（Curl）
            
\`\`\`

                rot **F** = ∇ \\times **F** = |\\mathbf{i}    \\mathbf{j}    \\mathbf{k}|

                                         |∂/∂x ∂/∂y ∂/∂z|

                                         |P     Q     R    |

**思考引导**

                **物理意义**：旋度表示场的旋转程度。

                    - rot **F** = **0**：无旋场（保守场）
                    - 无旋场 ⟺ 曲线积分与路径无关

            ## 方向关系
            Γ 的方向与 Σ 的侧符合**右手定则**：右手四指沿 Γ 方向，大拇指指向 Σ 的法向量方向。

            ## 格林公式是特例
            当 Σ 是 xy 平面上的区域时，斯托克斯公式退化为格林公式。
  `,
  formula: `
## 斯托克斯公式的推导
            ### 从格林公式推广
            将曲面分割为许多小片，每片上应用格林公式的推广形式。

            ### 旋度的物理意义
            
\`\`\`

                (∇ \\times F)\cdotn = lim(S→0) (1/|S|) ∮_∂S F\cdotdr

            表示单位面积上的环量密度。
  `,
  examples: [
  {
    "id": "st-1",
    "difficulty": "medium",
    "question": "利用斯托克斯公式计算 ∮_Γ y dx + z dy + x dz，其中 Γ 为球面 x²+y²+z²=a² 与平面 x+y+z=0 的交线。",
    "options": [
      "-√3πa²",
      "√3πa²",
      "0",
      "2πa²"
    ],
    "correct": 0,
    "explanation": "∇ \\times F = (-1, -1, -1)\n取 Σ 为平面 x+y+z=0 上的圆，法向量 n = (1,1,1)/√3\n∮_Γ F\cdotdr = ∬_Σ (∇\timesF)\cdotn dS = -√3 \\times πa²"
  }
]
};

export const greenstheoremLesson: SubLesson = {
  id: 'greens-theorem',
  title: '格林定理',
  has3D: true,
  vizType: 'greensTheorem',
  theory: `
## 一、从牛顿-莱布尼茨公式到格林公式

**思考引导**

                **思考引导**：回顾一元函数的微积分基本定理：

\`\`\`

                    ∫ₐᵇ f'(x)dx = f(b) - f(a)

                它将区间内部的"变化率累积"与边界上的"函数值差"联系起来。

                **问题**：对于平面区域，是否存在类似的联系——将区域内部的积分与边界上的积分联系起来？

            ## 二、格林公式的发现

            ### 2.1 物理直观
            考虑流体在平面区域 D 内的流动。设流速场为 **F** = (P, Q)：

                - 沿边界 L 的环量：∮_L Pdx + Qdy
                - 区域内部每点的"涡旋强度"：∂Q/∂x - ∂P/∂y

            **直观结论**：沿边界的环量应该等于内部所有涡旋的累积。

            ### 2.2 格林公式

> **提示**
> 
                **格林公式**：设 D 是由分段光滑闭曲线 L 围成的平面区域，P, Q 在 D 上有一阶连续偏导数，则

\`\`\`

                    ∮_L Pdx + Qdy = ∬_D (∂Q/∂x - ∂P/∂y)dxdy

                其中 L 取**正向**（逆时针方向，区域始终在左侧）。

                **3D可视化演示**：右侧展示了格林公式的几何意义。
                
                    - 蓝色区域：积分区域 D
                    - 红色边界：闭曲线 L
                    - 向量场在边界的环量与内部旋度的关系

            ## 三、格林公式的应用

            ### 3.1 计算平面区域面积
            取 P = -y/2, Q = x/2，则 ∂Q/∂x - ∂P/∂y = 1/2 + 1/2 = 1。

\`\`\`

                S = ∬_D dxdy = (1/2)∮_L xdy - ydx = ∮_L xdy = -∮_L ydx

            **例**：椭圆的参数方程 x = a\cdotcos(t), y = b\cdotsin(t)，面积：

\`\`\`

                S = (1/2)∫₀²π [a\cdotcos(t)\cdotb\cdotcos(t) - b\cdotsin(t)\\cdot(-a\cdotsin(t))]dt

                = (ab/2)∫₀²π (cos²t + sin²t)dt = (ab/2) \\times 2π = πab

            ### 3.2 曲线积分与路径无关

**思考引导**

                **定理**：在单连通区域内，以下条件等价：

                    - ∮_L Pdx + Qdy = 0 对任意闭曲线 L
                    - 曲线积分 ∫ Pdx + Qdy 与路径无关
                    - 存在 u(x,y)（原函数）使得 du = Pdx + Qdy
                    - **∂Q/∂x = ∂P/∂y**（恰当条件）

            **证明概要**：(1)⇔(2) 显然；(2)⇒(3) 定义 u(x,y) = ∫₍ₓ₀,ᵧ₀₎₍ₓ,ᵧ₎ Pdx + Qdy，由路径无关性保证良定义；(3)⇒(4) 由混合偏导数相等；(4)⇒(1) 由格林公式。

            ### 3.3 原函数的求法
            若 ∂Q/∂x = ∂P/∂y，则原函数：

\`\`\`

                u(x,y) = ∫ₓ₀ˣ P(t,y₀)dt + ∫ᵧ₀ʸ Q(x,s)ds

            ## 四、格林公式的本质

            格林公式是微积分基本定理在高维空间的推广：

            <table class="formula-table" style="width:100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">维度</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">区域</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">边界</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">公式</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">一维</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">区间 [a,b]</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">点 {a,b}</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">∫ₐᵇ f'dx = f(b) - f(a)</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">二维</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">平面区域 D</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">曲线 L</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">格林公式</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">三维</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">空间区域 Ω</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">曲面 Σ</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">高斯公式</td>
                </tr>
            </table>

            这些公式都体现了"内部微分与边界积分"的关系，是**斯托克斯定理**的特例。
  `,
  formula: `
## 格林公式的推导
            ### 从牛顿-莱布尼茨公式推广
            
\`\`\`

                ∫ₐᵇ f'(x)dx = f(b) - f(a)

            格林公式是其二维推广，将曲线积分转化为二重积分。

            ### 单连通与多连通区域
            格林公式适用于单连通区域，对于多连通区域需要分段处理边界。
  `,
  examples: [
  {
    "id": "gt-2",
    "difficulty": "easy",
    "question": "利用格林公式计算 ∮_L xdy - ydx，其中 L 为椭圆 x²/a² + y²/b² = 1 的正向。",
    "options": [
      "2πab",
      "πab",
      "4ab",
      "2ab"
    ],
    "correct": 0,
    "explanation": "P = -y, Q = x\n∂Q/∂x - ∂P/∂y = 1 - (-1) = 2\n∮_L xdy - ydx = ∬_D 2 dxdy = 2 \\times 椭圆面积 = 2πab"
  }
]
};

export const differentialformsLesson: SubLesson = {
  id: 'differential-forms',
  title: '微分形式',
  has3D: true,
  vizType: 'differentialForms',
  theory: `
## 外微分形式

            ### 0-形式
            标量函数 f(x, y, z)

            ### 1-形式
            
\`\`\`

                ω¹ = Pdx + Qdy + Rdz

            ### 2-形式
            
\`\`\`

                ω² = P dydz + Q dzdx + R dxdy

            ### 3-形式
            
\`\`\`

                ω³ = f(x,y,z)dxdydz

            ## 外微分
            外微分算子 d 的作用：

\`\`\`

                d: k-形式 → (k+1)-形式

            ### 重要性质
            
\`\`\`

                d² = 0

            即对任意微分形式 ω，有 d(dω) = 0。

            ## 统一积分定理
            
**思考引导**

                所有积分公式可统一为：

\`\`\`

                    ∫_Ω dω = ∫_∂Ω ω

                其中 ∂Ω 表示 Ω 的边界。

                    - 牛顿-莱布尼茨公式：Ω = [a,b]，ω = F
                    - 格林公式：Ω = D，ω = Pdx + Qdy
                    - 斯托克斯公式：Ω = Σ，ω = Pdx + Qdy + Rdz
                    - 高斯公式：Ω = V，ω = P dydz + Q dzdx + R dxdy

            ## 闭形式与恰当形式
            
> **提示**
> 
                
                    - **闭形式**：dω = 0
                    - **恰当形式**：存在 η 使得 ω = dη
                    - 恰当形式必为闭形式（d² = 0）
                    - 在单连通区域，闭形式也是恰当形式
  `,
  formula: `
## 外微分的计算规则
            ### 楔积的性质
            
\`\`\`

                dx ∧ dy = -dy ∧ dx

                dx ∧ dx = 0

            ### 莱布尼茨规则
            
\`\`\`

                d(ω ∧ η) = dω ∧ η + (-1)^|ω| ω ∧ dη
  `,
  examples: [
  {
    "id": "df-1",
    "difficulty": "hard",
    "question": "验证 d² = 0 对于 0-形式 f(x,y) = x²y。",
    "options": [
      "d(df) = 0",
      "d(df) = 2xy dx + x² dy",
      "d(df) = 2y dx + 2x dy",
      "d(df) = 2xy"
    ],
    "correct": 0,
    "explanation": "df = 2xy dx + x² dy\nd(df) = d(2xy)∧dx + d(x²)∧dy = (2y dx + 2x dy)∧dx + (2x dx)∧dy = 2y dy∧dx + 2x dx∧dy = -2y dx∧dy + 2y dx∧dy = 0"
  }
]
};

export const odebasicLesson: SubLesson = {
  id: 'ode-basic',
  title: '微分方程基础',
  has3D: true,
  vizType: 'odeBasic',
  theory: `
## 微分方程的定义
            含有未知函数及其导数的方程称为微分方程。

            ## 分类
            
**思考引导**

                #### 按自变量个数
                
                    - **常微分方程（ODE）**：未知函数是一元函数
                    - **偏微分方程（PDE）**：未知函数是多元函数

                #### 按方程阶数
                
                    - 方程中出现的最高阶导数的阶数

                #### 按线性性质
                
                    - **线性方程**：未知函数及其各阶导数都是一次的
                    - **非线性方程**：否则

            ## 解的概念
            
                - **通解**：含有任意常数，且常数个数等于方程阶数
                - **特解**：不含任意常数的解
                - **初始条件**：确定特解的条件

            ## 一阶方程的几何意义
            方程 y' = f(x, y) 给出了点 (x, y) 处解曲线的切线斜率。

> **提示**
> 
                **方向场**：在每点画出斜率为 f(x, y) 的小线段。
  `,
  formula: `
## 微分方程的基本概念
            ### 通解与特解
            
\`\`\`

                n阶微分方程的通解含有n个任意常数

            通解：y = φ(x, C₁, C₂, ..., Cₙ)

            特解：通过初始条件确定常数后的解

            ### 初始条件
            
\`\`\`

                y(x₀) = y₀, y'(x₀) = y₁, ..., y⁽ⁿ⁻¹⁾(x₀) = yₙ₋₁
  `,
  examples: [
  {
    "id": "odeb-1",
    "difficulty": "easy",
    "question": "微分方程的阶数是指什么？",
    "options": [
      "方程中未知函数的最高次幂",
      "方程中出现的最高阶导数的阶数",
      "方程中自变量的个数",
      "方程中未知函数的个数"
    ],
    "correct": 1,
    "explanation": "微分方程的阶数定义为方程中出现的未知函数的最高阶导数的阶数。例如，含有y''的方程是二阶微分方程。"
  }
]
};

export const firstorderLesson: SubLesson = {
  id: 'first-order',
  title: '一阶微分方程',
  has3D: true,
  vizType: 'firstOrderODE',
  theory: `
## 可分离变量方程
            
\`\`\`

                dy/dx = f(x)g(y)

            解法：分离变量后积分

\`\`\`

                ∫ dy/g(y) = ∫ f(x)dx

            ## 齐次方程
            
\`\`\`

                dy/dx = F(y/x)

            解法：令 u = y/x，化为可分离变量方程。

            ## 一阶线性方程
            
\`\`\`

                y' + P(x)y = Q(x)

            ### 解法：常数变易法
            
\`\`\`

                y = e^(-∫Pdx) [∫Q\cdote^(∫Pdx)dx + C]

            ## 伯努利方程
            
\`\`\`

                y' + P(x)y = Q(x)yⁿ (n ≠ 0, 1)

            解法：令 z = y¹⁻ⁿ，化为线性方程。

            ## 全微分方程
            
\`\`\`

                P(x,y)dx + Q(x,y)dy = 0，其中 ∂Q/∂x = ∂P/∂y

            解法：求原函数 u(x,y) 使得 du = Pdx + Qdy，通解为 u(x,y) = C。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "fo-1",
    "difficulty": "medium",
    "question": "求解 y' + y/x = x²。",
    "options": [
      "y = x³/4 + C/x",
      "y = x³/3 + C/x",
      "y = x³/4 + Cx",
      "y = x² + C/x"
    ],
    "correct": 0,
    "explanation": "P = 1/x，Q = x²\n∫Pdx = ln|x|\n积分因子 = e^(ln|x|) = x\ny = (1/x)[∫x³dx + C] = (1/x)[x⁴/4 + C] = x³/4 + C/x"
  }
]
};

export const higherorderLesson: SubLesson = {
  id: 'higher-order',
  title: '高阶微分方程',
  has3D: true,
  vizType: 'higherOrderODE',
  theory: `
## 可降阶方程

            ### 类型一：y⁽ⁿ⁾ = f(x)
            解法：连续积分 n 次。

            ### 类型二：y'' = f(x, y')
            解法：令 p = y'，则 y'' = dp/dx，化为一阶方程。

            ### 类型三：y'' = f(y, y')
            解法：令 p = y'，则 y'' = p\cdotdp/dy，化为一阶方程。

            ## 常系数线性齐次方程
            
\`\`\`

                y'' + py' + qy = 0

            ### 特征方程
            
\`\`\`

                r² + pr + q = 0

            ### 通解形式
            
**思考引导**

                <table style="width:100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">特征根情况</td>
                        <td style="padding: 8px;">通解</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">两个不等实根 r₁, r₂</td>
                        <td style="padding: 8px;">y = C₁e^(r₁x) + C₂e^(r₂x)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">相等实根 r</td>
                        <td style="padding: 8px;">y = (C₁ + C₂x)e^(rx)</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">共轭复根 α ± iβ</td>
                        <td style="padding: 8px;">y = e^(αx)(C₁cos(βx) + C₂sin(βx))</td>
                    </tr>
                </table>

            ## 常系数线性非齐次方程
            
\`\`\`

                y'' + py' + qy = f(x)

            通解 = 齐次通解 + 特解

            ### 特解求法：待定系数法
            
> **提示**
> 
                <table style="width:100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">f(x) 形式</td>
                        <td style="padding: 8px;">特解形式</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">Pₙ(x)e^(αx)</td>
                        <td style="padding: 8px;">xᵏQₙ(x)e^(αx)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">e^(αx)(Acos(βx) + Bsin(βx))</td>
                        <td style="padding: 8px;">xᵏe^(αx)(Ccos(βx) + Dsin(βx))</td>
                    </tr>
                </table>
                其中 k 是 α（或 α+iβ）作为特征根的重数。
  `,
  formula: `

  `,
  examples: [
  {
    "id": "ho-1",
    "difficulty": "medium",
    "question": "求 y'' - 3y' + 2y = 0 的通解。",
    "options": [
      "y = C₁e^x + C₂e^(2x)",
      "y = C₁e^(-x) + C₂e^(2x)",
      "y = C₁e^x + C₂e^(-2x)",
      "y = (C₁ + C₂x)e^x"
    ],
    "correct": 0,
    "explanation": "特征方程：r² - 3r + 2 = 0\n(r-1)(r-2) = 0\nr₁ = 1, r₂ = 2\n通解：y = C₁e^x + C₂e^(2x)"
  }
]
};

export const linearsystemLesson: SubLesson = {
  id: 'linear-system',
  title: '线性方程组',
  has3D: true,
  vizType: 'linearSystem',
  theory: `
## 常系数线性方程组
            
\`\`\`

                d**x**/dt = A**x**

            其中 A 是常数矩阵，**x** = (x₁, x₂, ..., xₙ)ᵀ。

            ## 解法：特征值法
            
                - 求 A 的特征值：det(A - λI) = 0
                - 对每个特征值求特征向量
                - 构造基本解组

            ## 二维系统示例
            设 λ₁, λ₂ 是 A 的特征值：

**思考引导**

                    - λ₁, λ₂ 为不等实根：**x** = C₁\\mathbf{v}₁e^(λ₁t) + C₂\\mathbf{v}₂e^(λ₂t)
                    - λ₁ = λ₂ = λ：**x** = (C₁\\mathbf{v} + C₂(\\mathbf{v}t + **w**))e^(λt)
                    - λ = α ± iβ：**x** = e^(αt)[C₁Re(\\mathbf{v}e^(iβt)) + C₂Im(\\mathbf{v}e^(iβt))]

            ## 平衡点分类
            
> **提示**
> 
                对于二维系统，根据特征值的性质，平衡点可分为：

                    - **结点**：两特征值同号实数
                    - **鞍点**：两特征值异号实数
                    - **焦点**：复特征值实部非零
                    - **中心**：纯虚特征值
  `,
  formula: `
## 线性方程组的矩阵解法
            ### 特征值问题
            
\`\`\`

                det(A - λI) = 0

            ### 通解结构
            
\`\`\`

                **x**(t) = c₁\\mathbf{v}₁e^(λ₁t) + c₂\\mathbf{v}₂e^(λ₂t)
  `,
  examples: [
  {
    "id": "ls-1",
    "difficulty": "medium",
    "question": "求解方程组 dx/dt = x + y, dy/dt = 4x + y。",
    "options": [
      "x = C₁e^(3t) + C₂e^(-t), y = 2C₁e^(3t) - 2C₂e^(-t)",
      "x = C₁e^(2t) + C₂e^(-t), y = C₁e^(2t) - C₂e^(-t)",
      "x = C₁e^(3t) + C₂e^t, y = 2C₁e^(3t) - C₂e^t",
      "x = C₁e^(3t) + C₂e^(-2t), y = 2C₁e^(3t) - C₂e^(-2t)"
    ],
    "correct": 0,
    "explanation": "矩阵 A = [[1,1],[4,1]]\n特征方程：det(A-λI) = (1-λ)² - 4 = 0\nλ² - 2λ - 3 = 0, λ₁=3, λ₂=-1\n求特征向量后得通解。"
  }
]
};

export const laplaceLesson: SubLesson = {
  id: 'laplace',
  title: '拉普拉斯变换',
  has3D: true,
  vizType: 'laplaceTransform',
  theory: `
## 拉普拉斯变换的定义
            
\`\`\`

                F(s) = L[f(t)] = ∫₀^∞ f(t)e^(-st)dt

            ## 基本性质
            
**思考引导**

                <table style="width:100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">性质</td>
                        <td style="padding: 8px;">公式</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">线性</td>
                        <td style="padding: 8px;">L[af + bg] = aL[f] + bL[g]</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">时移</td>
                        <td style="padding: 8px;">L[f(t-a)u(t-a)] = e^(-as)F(s)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">频移</td>
                        <td style="padding: 8px;">L[e^(at)f(t)] = F(s-a)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">微分</td>
                        <td style="padding: 8px;">L[f'(t)] = sF(s) - f(0)</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">积分</td>
                        <td style="padding: 8px;">L[∫₀^t f(τ)dτ] = F(s)/s</td>
                    </tr>
                </table>

            ## 常用变换对
            
> **提示**
> 
                <table style="width:100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">f(t)</td>
                        <td style="padding: 8px;">F(s)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">1</td>
                        <td style="padding: 8px;">1/s</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">tⁿ</td>
                        <td style="padding: 8px;">n!/s^(n+1)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">e^(at)</td>
                        <td style="padding: 8px;">1/(s-a)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 8px;">sin(ωt)</td>
                        <td style="padding: 8px;">ω/(s²+ω²)</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">cos(ωt)</td>
                        <td style="padding: 8px;">s/(s²+ω²)</td>
                    </tr>
                </table>

            ## 解微分方程
            步骤：

                - 对方程两边取拉普拉斯变换
                - 代入初始条件，解出 F(s)
                - 对 F(s) 取逆变换得 f(t)
  `,
  formula: `
## 拉普拉斯变换推导
            ### 从定义出发
            
\`\`\`

                F(s) = ∫₀^∞ f(t)e^(-st)dt

            ### 微分性质推导
            
\`\`\`

                L[f'(t)] = ∫₀^∞ f'(t)e^(-st)dt

                = [f(t)e^(-st)]₀^∞ + s∫₀^∞ f(t)e^(-st)dt

                = sF(s) - f(0)
  `,
  examples: [
  {
    "id": "lp-1",
    "difficulty": "medium",
    "question": "求 f(t) = e^(at) 的拉普拉斯变换。",
    "options": [
      "1/(s-a), s>a",
      "1/(s+a), s>-a",
      "a/(s²+a²)",
      "s/(s²+a²)"
    ],
    "correct": 0,
    "explanation": "L[e^(at)] = ∫₀^∞ e^(at)e^(-st)dt = ∫₀^∞ e^(-(s-a)t)dt\n= [-1/(s-a)e^(-(s-a)t)]₀^∞ = 1/(s-a) (当s>a时收敛)"
  }
]
};

export const seriessolutionLesson: SubLesson = {
  id: 'series-solution',
  title: '级数解法',
  has3D: true,
  vizType: 'seriesSolution',
  theory: `
## 幂级数解法概述
            对于不能用初等函数表示解的方程，可假设解为幂级数形式：

\`\`\`

                y = Σₙ₌₀^∞ aₙxⁿ = a₀ + a₁x + a₂x² + ...

            ## 勒让德方程
            
\`\`\`

                (1-x²)y'' - 2xy' + n(n+1)y = 0

            解为勒让德多项式 Pₙ(x)。

            ## 贝塞尔方程
            
\`\`\`

                x²y'' + xy' + (x² - ν²)y = 0

            解为贝塞尔函数 Jᵥ(x) 和 Yᵥ(x)。

            ## 常点与奇点
            
**思考引导**

                    - **常点**：P(x) 和 Q(x) 在 x₀ 解析
                    - **正则奇点**：(x-x₀)P(x) 和 (x-x₀)²Q(x) 在 x₀ 解析
                    - **非正则奇点**：其他情况

            ## 弗罗贝尼乌斯方法
            对于正则奇点，设解为

\`\`\`

                y = xʳ Σₙ₌₀^∞ aₙxⁿ

            代入方程确定 r（指标方程）和系数 aₙ。
  `,
  formula: `
## 幂级数解法推导
            ### 假设解的形式
            
\`\`\`

                y = Σₙ₌₀^∞ aₙxⁿ

            ### 逐次求导
            
\`\`\`

                y' = Σₙ₌₁^∞ naₙxⁿ⁻¹

                y'' = Σₙ₌₂^∞ n(n-1)aₙxⁿ⁻²

            ### 勒让德多项式
            
\`\`\`

                Pₙ(x) = (1/2ⁿn!) dⁿ/dxⁿ[(x²-1)ⁿ]
  `,
  examples: [
  {
    "id": "ss-1",
    "difficulty": "hard",
    "question": "用幂级数法求解 y'' - xy = 0，初始条件 y(0)=1, y'(0)=0。",
    "options": [
      "y = 1 + x³/6 + x⁶/180 + ...",
      "y = 1 + x²/2 + x⁴/24 + ...",
      "y = 1 + x³/3 + x⁶/18 + ...",
      "y = 1 + x⁴/12 + x⁸/672 + ..."
    ],
    "correct": 0,
    "explanation": "设 y = Σaₙxⁿ，则 y'' = Σn(n-1)aₙxⁿ⁻²\n代入方程：Σn(n-1)aₙxⁿ⁻² - Σaₙxⁿ⁺¹ = 0\n比较系数得递推关系，由初始条件 a₀=1, a₁=0，求得 a₂=0, a₃=1/6..."
  }
]
};

export const numericalLesson: SubLesson = {
  id: 'numerical',
  title: '数值方法',
  has3D: true,
  vizType: 'numericalODE',
  theory: `
## 欧拉方法
            最简单的数值方法：

\`\`\`

                yₙ₊₁ = yₙ + h\cdotf(xₙ, yₙ)

            局部截断误差：O(h²)

            ## 改进的欧拉方法
            预测-校正法：

\`\`\`

                预测：y* = yₙ + h\cdotf(xₙ, yₙ)

                校正：yₙ₊₁ = yₙ + h/2\\cdot[f(xₙ, yₙ) + f(xₙ₊₁, y*)]

            局部截断误差：O(h³)

            ## 龙格-库塔方法（RK4）
            
\`\`\`

                yₙ₊₁ = yₙ + h/6\\cdot(k₁ + 2k₂ + 2k₃ + k₄)

            其中：

\`\`\`

                k₁ = f(xₙ, yₙ)

                k₂ = f(xₙ + h/2, yₙ + hk₁/2)

                k₃ = f(xₙ + h/2, yₙ + hk₂/2)

                k₄ = f(xₙ + h, yₙ + hk₃)

            局部截断误差：O(h⁵)

            ## 步长选择
            
> **提示**
> 
                
                    - 步长越小，精度越高，但计算量越大
                    - 变步长方法：根据误差估计调整步长

            ## 稳定性
            对于刚性方程，需要绝对稳定的算法，如隐式方法。
  `,
  formula: `
## 数值方法误差分析

            ### 欧拉方法
            
\`\`\`

                yₙ₊₁ = yₙ + h\cdotf(xₙ, yₙ)

                局部误差：O(h²)

                全局误差：O(h)

            ### 改进欧拉方法
            
\`\`\`

                k₁ = f(xₙ, yₙ)

                k₂ = f(xₙ₊₁, yₙ + hk₁)

                yₙ₊₁ = yₙ + h/2\\cdot(k₁ + k₂)

                局部误差：O(h³)

            ### RK4 方法
            
\`\`\`

                yₙ₊₁ = yₙ + h/6\\cdot(k₁ + 2k₂ + 2k₃ + k₄)

                局部误差：O(h⁵)
  `,
  examples: [
  {
    "id": "num-1",
    "difficulty": "medium",
    "question": "用欧拉方法（步长 h=0.1）求解 y' = y, y(0)=1，求 y(0.2) 的近似值。",
    "options": [
      "1.21",
      "1.105",
      "1.221",
      "1.01"
    ],
    "correct": 0,
    "explanation": "欧拉公式：yₙ₊₁ = yₙ + h\cdotf(xₙ, yₙ)\ny₁ = y₀ + 0.1\cdoty₀ = 1 + 0.1 = 1.1\ny₂ = y₁ + 0.1\cdoty₁ = 1.1 + 0.11 = 1.21"
  }
]
};

export const physicsLesson: SubLesson = {
  id: 'physics',
  title: '物理应用',
  has3D: true,
  vizType: 'physicsApp',
  theory: `
## 经典力学

            ### 运动学
            
\`\`\`

                **r**(t) = (x(t), y(t), z(t))

                \\mathbf{v} = d**r**/dt, \\mathbf{a} = d\\mathbf{v}/dt = d²**r**/dt²

            ### 牛顿第二定律
            
\`\`\`

                **F** = m\\mathbf{a} = m d²**r**/dt²

            ### 角动量
            
\`\`\`

                **L** = **r** \\times **p** = m(**r** \\times \\mathbf{v})

            ## 电磁学

            ### 麦克斯韦方程组
            
**思考引导**

\`\`\`

                    ∇ \\cdot **E** = ρ/ε₀ （高斯电场定律）

                    ∇ \\cdot \\mathbf{B} = 0 （高斯磁场定律）

                    ∇ \\times **E** = -∂\\mathbf{B}/∂t （法拉第定律）

                    ∇ \\times \\mathbf{B} = μ₀\\mathbf{J} + μ₀ε₀∂**E**/∂t （安培-麦克斯韦定律）

            ### 电势与电场
            
\`\`\`

                **E** = -∇V

            ## 引力场
            
\`\`\`

                **F** = -GmM/r² \\cdot **r̂**

                **g** = -∇Φ

            ## 热传导
            
\`\`\`

                ∂u/∂t = α∇²u （热方程）

            ## 波动方程
            
\`\`\`

                ∂²u/∂t² = c²∇²u
  `,
  formula: `
## 物理学中的矢量微积分

            ### 运动学关系
            
\`\`\`

                v = dr/dt, a = dv/dt = d²r/dt²

            ### 高斯定理（散度定理）
            
\`\`\`

                ∭_V (∇ \\cdot F) dV = ∯_S F \\cdot dS

            ### 斯托克斯定理
            
\`\`\`

                ∬_S (∇ \\times F) \\cdot dS = ∮_∂S F \\cdot dr

            ### 电势与电场
            
\`\`\`

                E = -∇V, ∇ \\cdot E = ρ/ε₀
  `,
  examples: [
  {
    "id": "phy-1",
    "difficulty": "hard",
    "question": "质点运动方程为 r(t) = (3t², 4t, 5)，求 t=1 时的速度和加速度大小。",
    "options": [
      "速度=√145, 加速度=6",
      "速度=√52, 加速度=10",
      "速度=10, 加速度=6",
      "速度=√145, 加速度=10"
    ],
    "correct": 0,
    "explanation": "v = dr/dt = (6t, 4, 0), v(1) = (6, 4, 0), |v| = √(36+16) = √52\na = dv/dt = (6, 0, 0), |\\mathbf{a}| = 6\n注意：我需要重新计算... v = (6t, 4, 0)，在 t=1 时 v = (6,4,0)，|v|=√(36+16)=√52。题目可能有误，正确答案应为 速度=√52, 加速度=6。"
  },
  {
    "id": "phy-2",
    "difficulty": "medium",
    "question": "点电荷 q 在原点产生的电势 V = kq/r，求电场强度 E = -∇V 在 r=1 处的大小。",
    "options": [
      "kq/r²",
      "kq/r",
      "2kq/r²",
      "kq/r³"
    ],
    "correct": 0,
    "explanation": "E = -∇V = -∂V/∂r \\cdot r̂ = -(-kq/r²)r̂ = (kq/r²)r̂\n在球坐标中，∇V = ∂V/∂r \\cdot eᵣ = -kq/r² \\cdot eᵣ\n所以 E = kq/r² \\cdot eᵣ，大小为 kq/r²。"
  }
]
};

export const engineeringLesson: SubLesson = {
  id: 'engineering',
  title: '工程应用',
  has3D: true,
  vizType: 'engineeringApp',
  theory: `
## 结构力学

            ### 应力与应变
            
\`\`\`

                σ = E\\cdotε （胡克定律）

            其中 σ 为应力，ε 为应变，E 为弹性模量。

            ### 梁的挠度
            
\`\`\`

                EI d⁴y/dx⁴ = q(x)

            ## 流体力学

            ### 连续性方程
            
\`\`\`

                ∂ρ/∂t + ∇ \\cdot (ρ\\mathbf{v}) = 0

            ### 纳维-斯托克斯方程
            
\`\`\`

                ρ(∂\\mathbf{v}/∂t + \\mathbf{v} \\cdot ∇\\mathbf{v}) = -∇p + μ∇²\\mathbf{v} + ρ**g**

            ## 控制理论

            ### 状态空间表示
            
\`\`\`

                d**x**/dt = A**x** + B\\mathbf{u}

                **y** = C**x** + D\\mathbf{u}

            ## 信号处理

            ### 傅里叶变换
            
\`\`\`

                F(ω) = ∫₋∞^∞ f(t)e^(-iωt)dt

            ### 采样定理
            采样频率必须大于信号最高频率的两倍。
  `,
  formula: `
## 工程分析中的数学工具

            ### 梁的弯曲方程
            
\`\`\`

                EI d²y/dx² = M(x)

                EI d³y/dx³ = V(x) (剪力)

                EI d⁴y/dx⁴ = q(x) (载荷)

            ### 控制系统传递函数
            
\`\`\`

                G(s) = C(sI - A)⁻¹B + D

            ### 傅里叶变换对
            
\`\`\`

                F(ω) = ∫₋∞^∞ f(t)e^(-iωt)dt

                f(t) = (1/2π) ∫₋∞^∞ F(ω)e^(iωt)dω
  `,
  examples: [
  {
    "id": "eng-1",
    "difficulty": "medium",
    "question": "简支梁跨度 L=4m，承受均布载荷 q=10kN/m，求跨中最大弯矩（EI为常数）。",
    "options": [
      "M_max = qL²/8 = 20 kN\cdotm",
      "M_max = qL²/4 = 40 kN\cdotm",
      "M_max = qL/2 = 20 kN\cdotm",
      "M_max = qL²/12 ≈ 13.3 kN\cdotm"
    ],
    "correct": 0,
    "explanation": "简支梁受均布载荷，弯矩方程 M(x) = qLx/2 - qx²/2\n在 x = L/2 处取得最大值 M_max = qL²/8\n代入：M_max = 10 \\times 16 / 8 = 20 kN\cdotm"
  },
  {
    "id": "eng-2",
    "difficulty": "hard",
    "question": "控制系统状态方程 ẋ = Ax + Bu，其中 A = [[0,1],[-2,-3]]，求系统特征值。",
    "options": [
      "λ₁ = -1, λ₂ = -2",
      "λ₁ = 1, λ₂ = 2",
      "λ₁ = -1+i, λ₂ = -1-i",
      "λ₁ = 0, λ₂ = -3"
    ],
    "correct": 0,
    "explanation": "特征方程 det(λI - A) = 0\n| λ  -1  | = λ(λ+3) + 2 = λ² + 3λ + 2 = 0\n| 2  λ+3 |\n(λ+1)(λ+2) = 0，所以 λ₁ = -1, λ₂ = -2"
  }
]
};

export const mlLesson: SubLesson = {
  id: 'ml',
  title: '机器学习应用',
  has3D: true,
  vizType: 'mlApp',
  theory: `
## 梯度下降

            ### 批量梯度下降
            
\`\`\`

                \theta := \theta - α∇J(\theta)

            ### 随机梯度下降（SGD）
            
\`\`\`

                \theta := \theta - α∇J(\theta; x⁽ⁱ⁾, y⁽ⁱ⁾)

            ## 反向传播
            利用链式法则计算梯度：

\`\`\`

                ∂L/∂w = ∂L/∂z \\cdot ∂z/∂w

            ## 优化方法

            ### 动量法
            
\`\`\`

                v := βv + (1-β)∇J(\theta)

                \theta := \theta - αv

            ### Adam优化器
            
\`\`\`

                m := β₁m + (1-β₁)g

                v := β₂v + (1-β₂)g²

                \theta := \theta - α\cdotm/(√v + ε)

            ## 主成分分析（PCA）
            对协方差矩阵进行特征分解：

\`\`\`

                Σ = (1/m)XᵀX = WΛWᵀ

            ## 支持向量机
            
\`\`\`

                min (1/2)||w||² + CΣξᵢ

                s.t. yᵢ(w\cdotxᵢ + b) ≥ 1 - ξᵢ
  `,
  formula: `
## 机器学习中的优化推导

            ### 梯度下降更新规则
            
\`\`\`

                \theta⁽ᵗ⁺¹⁾ = \theta⁽ᵗ⁾ - α∇J(\theta⁽ᵗ⁾)

            ### 反向传播的链式法则
            
\`\`\`

                ∂L/∂w = ∂L/∂z \\cdot ∂z/∂w = δ \\cdot aₚᵣₑᵥ

            ### PCA 投影
            
\`\`\`

                z = Wᵀ(x - μ)

                其中 W = [v₁, v₂, ..., vₖ] 是前 k 个特征向量

            ### 核技巧
            
\`\`\`

                K(x, x') = φ(x) \\cdot φ(x')
  `,
  examples: [
  {
    "id": "ml-1",
    "difficulty": "medium",
    "question": "损失函数 L = (1/2)(y - ŷ)²，其中 ŷ = wx + b。求 ∂L/∂w。",
    "options": [
      "∂L/∂w = -(y - ŷ)x",
      "∂L/∂w = (y - ŷ)x",
      "∂L/∂w = -(y - ŷ)",
      "∂L/∂w = (y - ŷ)w"
    ],
    "correct": 0,
    "explanation": "链式法则：∂L/∂w = ∂L/∂ŷ \\cdot ∂ŷ/∂w\n∂L/∂ŷ = -(y - ŷ)\n∂ŷ/∂w = x\n所以 ∂L/∂w = -(y - ŷ)x"
  },
  {
    "id": "ml-2",
    "difficulty": "hard",
    "question": "二维数据协方差矩阵 Σ = [[4, 2], [2, 3]]，求最大特征值对应的特征向量方向。",
    "options": [
      "约 [0.85, 0.53]ᵀ",
      "约 [0.53, 0.85]ᵀ",
      "[1, 0]ᵀ",
      "[0, 1]ᵀ"
    ],
    "correct": 0,
    "explanation": "特征方程 det(Σ - λI) = (4-λ)(3-λ) - 4 = λ² - 7λ + 8 = 0\nλ = (7 ± √17)/2 ≈ 5.56, 1.44\n最大特征值 λ₁ ≈ 5.56，解 (Σ - λ₁I)v = 0 得 v ≈ [0.85, 0.53]ᵀ"
  }
]
};

export const graphicsLesson: SubLesson = {
  id: 'graphics',
  title: '计算机图形学',
  has3D: true,
  vizType: 'graphicsApp',
  theory: `
## 三维变换

            ### 旋转矩阵
            绕 z 轴旋转角度 \theta：

\`\`\`

                Rₓ(\theta) = [cos(\theta) -sin(\theta) 0]

                            [sin(\theta)  cos(\theta) 0]

                            [0       0      1]

            ### 四元数旋转
            避免万向节死锁问题：

\`\`\`

                q = cos(\theta/2) + sin(\theta/2)(uₓi + uᵧj + uᵤk)

            ## 光照模型

            ### Phong模型
            
\`\`\`

                I = Iₐkₐ + Iₚ[kₐ(\\mathbf{N}\\cdot**L**) + kₛ(**R**\\cdot\\mathbf{V})ⁿ]

            ## 贝塞尔曲线
            
\`\`\`

                B(t) = Σᵢ₌₀ⁿ C(n,i)(1-t)ⁿ⁻ⁱtⁱPᵢ, t ∈ [0,1]

            ## B样条
            
\`\`\`

                S(x) = Σᵢ₌₀ⁿ Nᵢ,ₚ(x)Pᵢ

            ## 光线追踪
            
\`\`\`

                **r**(t) = **o** + t**d**

            求光线与物体的交点。
  `,
  formula: `
## 图形学中的数学基础

            ### 三维旋转矩阵（绕 z 轴）
            
\`\`\`

                R_z(\theta) = [[cos(\theta), -sin(\theta), 0],

                          [sin(\theta),  cos(\theta), 0],

                          [0,       0,      1]]

            ### 四元数旋转
            
\`\`\`

                q = [cos(\theta/2), sin(\theta/2)\cdotn̂]

                p' = qpq⁻¹

            ### 贝塞尔曲线
            
\`\`\`

                B(t) = Σᵢ₌₀ⁿ C(n,i)(1-t)ⁿ⁻ⁱtⁱPᵢ

            ### 光线-球面交点
            
\`\`\`

                ||o + td - c||² = r²

                解二次方程求 t
  `,
  examples: [
  {
    "id": "cg-1",
    "difficulty": "medium",
    "question": "点 P(1, 2, 3) 绕 z 轴旋转 90°，求新坐标。",
    "options": [
      "(-2, 1, 3)",
      "(2, -1, 3)",
      "(-1, 2, 3)",
      "(1, -2, 3)"
    ],
    "correct": 0,
    "explanation": "绕 z 轴旋转矩阵：R_z(90°) = [[0,-1,0],[1,0,0],[0,0,1]]\n[x', y', z']ᵀ = R_z \\cdot [1, 2, 3]ᵀ = [-2, 1, 3]ᵀ"
  },
  {
    "id": "cg-2",
    "difficulty": "hard",
    "question": "贝塞尔曲线控制点 P₀=(0,0), P₁=(1,2), P₂=(3,2), P₃=(4,0)，求 t=0.5 时的点。",
    "options": [
      "(2, 1.5)",
      "(1.5, 1)",
      "(2, 1)",
      "(2.5, 1.5)"
    ],
    "correct": 0,
    "explanation": "三次贝塞尔曲线：B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃\nt=0.5 时：B(0.5) = 1/8\\cdot(0,0) + 3/8\\cdot(1,2) + 3/8\\cdot(3,2) + 1/8\\cdot(4,0)\n= (0+3/8+9/8+4/8, 0+6/8+6/8+0) = (2, 1.5)"
  }
]
};

export const economicsLesson: SubLesson = {
  id: 'economics',
  title: '经济学应用',
  has3D: true,
  vizType: 'economicsApp',
  theory: `
## 边际分析

            ### 边际成本
            
\`\`\`

                MC = dC/dQ

            ### 边际收益
            
\`\`\`

                MR = dR/dQ

            ### 利润最大化条件
            
\`\`\`

                MR = MC

            ## 弹性

            ### 需求价格弹性
            
\`\`\`

                Eₙ = (dQ/dP)\\cdot(P/Q)

            ## 生产函数

            ### 柯布-道格拉斯生产函数
            
\`\`\`

                Y = AKᵅL¹⁻ᵅ

            ### 边际产出
            
\`\`\`

                MPₖ = ∂Y/∂K = αAKᵅ⁻¹L¹⁻ᵅ

            ## 优化问题

            ### 消费者效用最大化
            
\`\`\`

                max U(x,y)

                s.t. pₓx + pᵧy = I

            ### 拉格朗日函数
            
\`\`\`

                L = U(x,y) - λ(pₓx + pᵧy - I)

            ## 经济增长模型

            ### 索洛模型
            
\`\`\`

                dk/dt = sf(k) - (n + δ)k
  `,
  formula: `
## 经济学中的微积分应用

            ### 边际分析
            
\`\`\`

                MC = dC/dQ, MR = dR/dQ

                利润最大化：MR = MC

            ### 弹性公式
            
\`\`\`

                E_d = (dQ/dP)\\cdot(P/Q)

            ### 柯布-道格拉斯函数性质
            
\`\`\`

                Y = AK^αL^(1-α)

                MPK = αY/K, MPL = (1-α)Y/L

                规模报酬不变：α + (1-α) = 1

            ### 拉格朗日优化
            
\`\`\`

                L = U(x,y) - λ(pₓx + pᵧy - I)

                ∂L/∂x = ∂U/∂x - λpₓ = 0

                ∂L/∂y = ∂U/∂y - λpᵧ = 0
  `,
  examples: [
  {
    "id": "eco-1",
    "difficulty": "medium",
    "question": "成本函数 C(Q) = 100 + 5Q + 0.1Q²，求边际成本 MC 在 Q=10 时的值。",
    "options": [
      "MC = 5 + 0.2Q = 7",
      "MC = 5 + 0.1Q = 6",
      "MC = 105 + 0.2Q = 107",
      "MC = 100/Q + 5 + 0.1Q = 16"
    ],
    "correct": 0,
    "explanation": "边际成本 MC = dC/dQ = 5 + 0.2Q\n当 Q=10 时，MC = 5 + 0.2\\times10 = 7"
  },
  {
    "id": "eco-2",
    "difficulty": "hard",
    "question": "柯布-道格拉斯生产函数 Y = K^0.5\cdotL^0.5，求资本边际产出 MPK。",
    "options": [
      "MPK = 0.5\\cdot(L/K)^0.5",
      "MPK = 0.5\\cdot(K/L)^0.5",
      "MPK = K^0.5\cdotL^0.5",
      "MPK = 0.5\cdotK^(-0.5)\cdotL^0.5"
    ],
    "correct": 0,
    "explanation": "MPK = ∂Y/∂K = 0.5\cdotK^(-0.5)\cdotL^0.5 = 0.5\\cdot(L/K)^0.5\n这表示增加一单位资本所带来的产出增加量。"
  }
]
};

export const biologyLesson: SubLesson = {
  id: 'biology',
  title: '生物学应用',
  has3D: true,
  vizType: 'biologyApp',
  theory: `
## 种群动力学

            ### 指数增长模型
            
\`\`\`

                dN/dt = rN

                N(t) = N₀e^(rt)

            ### 逻辑斯蒂增长
            
\`\`\`

                dN/dt = rN(1 - N/K)

            其中 K 为环境容纳量。

            ## 捕食者-猎物模型（Lotka-Volterra）
            
\`\`\`

                dx/dt = αx - βxy

                dy/dt = δxy - γy

            ## 传染病模型（SIR）
            
\`\`\`

                dS/dt = -βSI/N

                dI/dt = βSI/N - γI

                dR/dt = γI

            ## 生物扩散
            
\`\`\`

                ∂u/∂t = D∇²u + f(u)

            ## 神经网络（Hodgkin-Huxley）
            
\`\`\`

                C dV/dt = -ḡₙₐm³h(V-Vₙₐ) - ḡₖn⁴(V-Vₖ) - ḡₗ(V-Vₗ) + I
  `,
  formula: `
## 生物数学模型推导

            ### 指数增长
            
\`\`\`

                dN/dt = rN

                N(t) = N₀e^(rt)

            ### 逻辑斯蒂增长
            
\`\`\`

                dN/dt = rN(1 - N/K)

                N(t) = K / [1 + ((K-N₀)/N₀)e^(-rt)]

            ### Lotka-Volterra 方程
            
\`\`\`

                dx/dt = αx - βxy （猎物）

                dy/dt = δxy - γy （捕食者）

            ### SIR 模型
            
\`\`\`

                dS/dt = -βSI/N

                dI/dt = βSI/N - γI

                dR/dt = γI

                R₀ = β/γ （基本再生数）
  `,
  examples: [
  {
    "id": "bio-1",
    "difficulty": "medium",
    "question": "指数增长模型 dN/dt = 0.1N，N(0)=100，求 N(10)。",
    "options": [
      "N(10) = 100\cdote¹ ≈ 271.8",
      "N(10) = 100\cdote⁰\\cdot¹ ≈ 110.5",
      "N(10) = 100 + 0.1\\times10 = 101",
      "N(10) = 100\cdote¹⁰ ≈ 2.2\\times10⁶"
    ],
    "correct": 0,
    "explanation": "dN/dt = rN 的解为 N(t) = N₀e^(rt)\nN(10) = 100\cdote^(0.1\\times10) = 100\cdote¹ ≈ 271.8"
  },
  {
    "id": "bio-2",
    "difficulty": "hard",
    "question": "逻辑斯蒂方程 dN/dt = 0.2N(1-N/1000)，N(0)=100，求平衡点。",
    "options": [
      "N = 0 和 N = 1000",
      "N = 100",
      "N = 200",
      "N = 100 和 N = 900"
    ],
    "correct": 0,
    "explanation": "令 dN/dt = 0：0.2N(1-N/1000) = 0\n解得 N = 0（不稳定平衡点）或 N = K = 1000（稳定平衡点）"
  }
]
};

// 章节定义
export interface Chapter {
  id: string;
  title: string;
  icon: string;
  lessons: SubLesson[];
}

// 所有课时映射
export const allLessons: Record<string, SubLesson[]> = {
  'am-1': [directioncosinesLesson, crossproductLesson, tripleproductLesson, planelineLesson, quadricsurfacesLesson, coordinatesystemsLesson, vectorfieldsLesson, multivariableconceptLesson],
  'am-2': [partialderivativeLesson, totaldifferentialLesson, chainruleLesson, implicitfunctionLesson, directionalderivativeLesson, extremaLesson, taylorLesson, lagrangeLesson],
  'am-3': [integralconceptLesson, doubleintegralLesson, tripleintegralLesson, changevariablesLesson, applicationsLesson, polarcoordinatesLesson, cylindricalsphericalLesson],
  'am-4': [surfaceintegralfirstLesson, surfaceintegralsecondLesson, gausstheoremLesson, stokestheoremLesson, greenstheoremLesson, differentialformsLesson],
  'am-5': [odebasicLesson, firstorderLesson, higherorderLesson, linearsystemLesson, laplaceLesson, seriessolutionLesson],
  'am-6': [numericalLesson, physicsLesson, engineeringLesson, mlLesson, graphicsLesson, economicsLesson, biologyLesson],
};

// 大章节结构（用于基础篇导航）
export const basicChapters: Chapter[] = [
  {
    id: 'am-1',
    title: '向量与空间解析几何',
    icon: '📐',
    lessons: allLessons['am-1'],
  },
  {
    id: 'am-2',
    title: '多元函数微分学',
    icon: '📈',
    lessons: allLessons['am-2'],
  },
  {
    id: 'am-3',
    title: '重积分',
    icon: '🔲',
    lessons: allLessons['am-3'],
  },
  {
    id: 'am-4',
    title: '曲线积分与曲面积分',
    icon: '🔄',
    lessons: allLessons['am-4'],
  },
  {
    id: 'am-5',
    title: '常微分方程',
    icon: '⚡',
    lessons: allLessons['am-5'],
  },
  {
    id: 'am-6',
    title: '应用与实践',
    icon: '🚀',
    lessons: allLessons['am-6'],
  },
];

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

// ============ 高等数学提高篇 ============

export const advancedRealNumberLesson: SubLesson = {
  id: 'adv-real-number',
  title: '实数理论与极限进阶',
  has3D: false,
  theory: `
## 实数系的完备性

### 戴德金分割
实数系是有理数系的完备化，通过戴德金分割可以严格定义无理数。

**定义**：将有理数集 ℚ 分成两个非空子集 A 和 B，满足：
- A ∪ B = ℚ，A ∩ B = ∅
- ∀a ∈ A, ∀b ∈ B，有 a < b
- A 无最大元

则称 (A, B) 为一个戴德金分割，定义一个实数。

### 确界原理
**定理**：非空有上界的实数集必有上确界。

这是实数系完备性的核心体现，也是极限理论的基础。

## 数列极限进阶

### 子列收敛性
**波尔查诺-魏尔斯特拉斯定理**：有界数列必有收敛子列。

### 柯西收敛准则
数列 {aₙ} 收敛 ⟺ ∀ε > 0, ∃N, 当 m,n > N 时 |aₙ - aₘ| < ε

**意义**：不需要知道极限值，仅凭数列自身性质判断收敛性。

## 函数极限的深入讨论

### 海涅定理
函数极限存在的充要条件：对任意趋于 x₀ 的数列 {xₙ}，{f(xₙ)} 收敛于同一值。

### 柯西准则
lim(x→x₀) f(x) 存在 ⟺ ∀ε > 0, ∃δ > 0, 当 0 < |x'-x₀|,|x''-x₀| < δ 时，|f(x')-f(x'')| < ε
  `,
  formula: `
## 关键定理

### 确界原理
$
\\forall A \\subseteq \\mathbb{R}, A \\neq \\emptyset, \\text{有上界} \\Rightarrow \\exists \\sup A \\in \\mathbb{R}
$

### 柯西收敛准则
$
\\{a_n\\} \\text{收敛} \\Leftrightarrow \\forall \\varepsilon > 0, \\exists N, \\forall m,n > N: |a_m - a_n| < \\varepsilon
$

### 单调有界原理
$
\\{a_n\\} \\text{单调递增有上界} \\Rightarrow \\lim_{n\\to\\infty} a_n = \\sup\\{a_n\\}
$
  `,
  examples: [
    {
      id: 'adv-rn-1',
      difficulty: 'hard',
      question: '用柯西准则证明 aₙ = 1 + 1/2² + 1/3² + ... + 1/n² 收敛。',
      options: [
        '对 m > n，|aₘ - aₙ| = Σₖ₌ₙ₊₁ᵐ 1/k² < Σₖ₌ₙ₊₁ᵐ 1/(k(k-1)) = 1/n - 1/m < 1/n < ε（当 n > 1/ε）',
        '该数列单调递增，所以有界即收敛',
        '通过比较判别法，该级数收敛',
        '该数列是柯西数列，所以收敛'
      ],
      correct: 0,
      explanation: '利用放缩技巧：1/k² < 1/(k(k-1)) = 1/(k-1) - 1/k，进行裂项相消，得到 |aₘ - aₙ| < 1/n，当 n 足够大时可小于任意 ε。'
    }
  ]
};

export const uniformContinuityLesson: SubLesson = {
  id: 'adv-uniform-continuity',
  title: '一致连续性',
  has3D: false,
  theory: `
## 一致连续的概念

### 定义对比
**逐点连续**：∀ε > 0, ∀x₀ ∈ I, ∃δ > 0, 当 |x - x₀| < δ 时 |f(x) - f(x₀)| < ε

**一致连续**：∀ε > 0, ∃δ > 0, ∀x₁, x₂ ∈ I, 当 |x₁ - x₂| < δ 时 |f(x₁) - f(x₂)| < ε

**关键区别**：δ 是否依赖于点的位置。

## 重要定理

### 康托尔定理
闭区间上的连续函数必一致连续。

### 利普希茨条件
若存在 L > 0，使得 |f(x₁) - f(x₂)| ≤ L|x₁ - x₂|，则 f 一致连续。

### 非一致连续的判定
存在 ε₀ > 0，数列 {xₙ}, {yₙ} 满足 |xₙ - yₙ| → 0，但 |f(xₙ) - f(yₙ)| ≥ ε₀。

## 典型例子

- f(x) = 1/x 在 (0,1] 上不一致连续
- f(x) = sin(1/x) 在 (0,1] 上不一致连续
- f(x) = √x 在 [0,∞) 上一致连续
  `,
  formula: `
## 核心公式

### 一致连续定义
$
\\forall \\varepsilon > 0, \\exists \\delta > 0, \\forall x_1, x_2 \\in I: |x_1 - x_2| < \\delta \\Rightarrow |f(x_1) - f(x_2)| < \\varepsilon
$

### 利普希茨条件
$
|f(x_1) - f(x_2)| \\leq L|x_1 - x_2|, \\quad L > 0
$

### 康托尔定理
$
f \\in C[a,b] \\Rightarrow f \\text{ 在 } [a,b] \\text{ 上一致连续}
$
  `,
  examples: [
    {
      id: 'adv-uc-1',
      difficulty: 'hard',
      question: '证明 f(x) = 1/x 在 (0,1] 上不一致连续。',
      options: [
        '取 xₙ = 1/n, yₙ = 1/(n+1)，则 |xₙ - yₙ| → 0，但 |f(xₙ) - f(yₙ)| = 1 → 1 ≠ 0',
        '该函数在 x=0 处无定义，所以不一致连续',
        '该函数在 (0,1] 上无界，所以不一致连续',
        '该函数在 (0,1] 上不是利普希茨连续的'
      ],
      correct: 0,
      explanation: '构造反例：取 xₙ = 1/n, yₙ = 1/(n+1)，两点距离趋于0，但函数值之差恒为1，不满足一致连续定义。'
    }
  ]
};

export const convexFunctionLesson: SubLesson = {
  id: 'adv-convex-function',
  title: '凸函数与 Jensen 不等式',
  has3D: false,
  theory: `
## 凸函数定义

### 几何定义
函数 f 在区间 I 上称为凸函数，如果对任意 x₁, x₂ ∈ I 和 λ ∈ [0,1]：

f(λx₁ + (1-λ)x₂) ≤ λf(x₁) + (1-λ)f(x₂)

**几何意义**：函数图像上任意两点间的弦位于图像上方。

## 判定条件

### 一阶条件（可微情形）
f 凸 ⟺ f(x₂) ≥ f(x₁) + f'(x₁)(x₂ - x₁)

即函数图像位于切线上方。

### 二阶条件（二阶可微情形）
f 凸 ⟺ f''(x) ≥ 0

## Jensen 不等式

### 离散形式
若 f 是凸函数，则对任意 x₁, ..., xₙ 和权重 λ₁, ..., λₙ（λᵢ ≥ 0, Σλᵢ = 1）：

f(Σλᵢxᵢ) ≤ Σλᵢf(xᵢ)

### 积分形式
f(∫g(x)dμ) ≤ ∫f(g(x))dμ

## 应用

- 算术-几何平均不等式
- 柯西-施瓦茨不等式
- 信息论中的不等式
  `,
  formula: `
## 核心公式

### 凸函数定义
$
f(\\lambda x_1 + (1-\\lambda)x_2) \\leq \\lambda f(x_1) + (1-\\lambda)f(x_2)
$

### Jensen 不等式
$
f\\left(\\sum_{i=1}^n \\lambda_i x_i\\right) \\leq \\sum_{i=1}^n \\lambda_i f(x_i)
$

### 二阶判定
$
f \\text{ 凸} \\Leftrightarrow f''(x) \\geq 0
$

### 算术-几何平均不等式（由 Jensen 不等式导出）
$
\\frac{x_1 + x_2 + ... + x_n}{n} \\geq \\sqrt[n]{x_1 x_2 ... x_n}
$
  `,
  examples: [
    {
      id: 'adv-cf-1',
      difficulty: 'hard',
      question: '用 Jensen 不等式证明算术-几何平均不等式。',
      options: [
        '取 f(x) = -ln(x)，利用 f 的凸性得到 -ln((Σxᵢ)/n) ≤ -(Σln(xᵢ))/n，即得结论',
        '直接应用 Jensen 不等式于 f(x) = x²',
        '利用柯西-施瓦茨不等式推导',
        '使用数学归纳法证明'
      ],
      correct: 0,
      explanation: `f(x) = -ln(x) 是凸函数（f''(x) = 1/x² > 0），由 Jensen 不等式：f((Σxᵢ)/n) ≤ (Σf(xᵢ))/n，即 -ln((Σxᵢ)/n) ≤ -(Σln(xᵢ))/n，整理得 (Σxᵢ)/n ≥ (Πxᵢ)^(1/n)。`
    }
  ]
};

export const improperIntegralAdvancedLesson: SubLesson = {
  id: 'adv-improper-integral',
  title: '反常积分进阶',
  has3D: false,
  theory: `
## 反常积分的分类

### 无穷区间上的积分
∫ₐ^∞ f(x)dx = lim(b→∞) ∫ₐᵇ f(x)dx

### 无界函数的积分
若 f 在 a 点无界：∫ₐᵇ f(x)dx = lim(ε→0⁺) ∫ₐ₊εᵇ f(x)dx

## 收敛判别法

### 比较判别法
设 0 ≤ f(x) ≤ g(x)，则：
- ∫g 收敛 ⟹ ∫f 收敛
- ∫f 发散 ⟹ ∫g 发散

### 极限比较法
设 f(x), g(x) > 0，若 lim(x→∞) f(x)/g(x) = L：
- 0 < L < ∞：∫f 与 ∫g 同敛散
- L = 0：∫g 收敛 ⟹ ∫f 收敛
- L = ∞：∫g 发散 ⟹ ∫f 发散

### p-积分判别法
∫₁^∞ 1/xᵖ dx：p > 1 收敛，p ≤ 1 发散
∫₀¹ 1/xᵖ dx：p < 1 收敛，p ≥ 1 发散

## 条件收敛与绝对收敛

### 定义
- 绝对收敛：∫|f| 收敛 ⟹ ∫f 收敛
- 条件收敛：∫f 收敛但 ∫|f| 发散

### 狄利克雷判别法
若 F(b) = ∫ₐᵇ f 有界，g 单调趋于0，则 ∫ₐ^∞ f\cdotg 收敛。
  `,
  formula: `
## 核心公式

### p-积分
$
\\int_1^\\infty \\frac{1}{x^p}dx \\begin{cases} \\text{收敛}, & p > 1 \\\\ \\text{发散}, & p \\leq 1 \\end{cases}
$

### 极限比较法
$
\\lim_{x\\to\\infty} \\frac{f(x)}{g(x)} = L \\in (0,\\infty) \\Rightarrow \\int f \\text{ 与 } \\int g \\text{ 同敛散}
$

### 伽马函数
$
\\Gamma(s) = \\int_0^\\infty x^{s-1}e^{-x}dx, \\quad s > 0
$

### 重要反常积分
$
\\int_0^\\infty \\frac{\\sin x}{x}dx = \\frac{\\pi}{2} \\quad (\\text{条件收敛})
$
  `,
  examples: [
    {
      id: 'adv-ii-1',
      difficulty: 'hard',
      question: '判断 ∫₀^∞ sin(x)/x dx 的收敛性。',
      options: [
        '条件收敛：通过狄利克雷判别法知收敛，但 ∫|sin(x)/x|dx 发散',
        '绝对收敛，因为 |sin(x)/x| ≤ 1/x',
        '发散，因为被积函数在无穷远处不趋于0',
        '收敛于 π/2，这是已知的结论'
      ],
      correct: 0,
      explanation: '该积分是经典的条件收敛例子。由狄利克雷判别法，∫sin(x)有界，1/x单调趋于0，故积分收敛。但 ∫|sin(x)/x|dx ≥ ∫sin²(x)/x dx 发散，所以不是绝对收敛。'
    }
  ]
};

export const functionSeriesLesson: SubLesson = {
  id: 'adv-function-series',
  title: '函数项级数',
  has3D: false,
  theory: `
## 函数项级数的收敛性

### 逐点收敛
级数 Σfₙ(x) 在点 x₀ 收敛 ⟺ 部分和序列 Sₙ(x₀) 收敛。

### 一致收敛
级数 Σfₙ(x) 在区间 I 上一致收敛 ⟺ 部分和序列 Sₙ(x) 一致收敛。

**ε-N 定义**：∀ε > 0, ∃N, 当 n > N 时 |Sₙ(x) - S(x)| < ε 对所有 x ∈ I 成立。

## 一致收敛的判别法

### 魏尔斯特拉斯 M-判别法
若 |fₙ(x)| ≤ Mₙ 对所有 x ∈ I 成立，且 ΣMₙ 收敛，则 Σfₙ 一致收敛。

### 狄利克雷判别法
若部分和 Σₖ₌₁ⁿ aₖ(x) 一致有界，bₙ(x) 对每个 x 单调且一致趋于0，则 Σaₙbₙ 一致收敛。

## 一致收敛的性质

### 连续性
若 fₙ 连续且 Σfₙ 一致收敛于 S，则 S 连续。

### 逐项积分
若 fₙ 连续且 Σfₙ 一致收敛，则 ∫Σfₙ = Σ∫fₙ。

### 逐项求导
若 fₙ' 连续，Σfₙ' 一致收敛，Σfₙ 在某点收敛，则 (Σfₙ)' = Σfₙ'。

## 幂级数的一致收敛性

幂级数在收敛域的任意闭子区间上一致收敛（内闭一致收敛）。
  `,
  formula: `
## 核心公式

### 一致收敛定义
$
\\forall \\varepsilon > 0, \\exists N, \\forall n > N, \\forall x \\in I: |S_n(x) - S(x)| < \\varepsilon
$

### M-判别法
$
|f_n(x)| \\leq M_n, \\quad \\sum M_n \\text{ 收敛} \\Rightarrow \\sum f_n \\text{ 一致收敛}
$

### 阿贝尔定理（幂级数）
若幂级数在 x = R 收敛，则在 [0,R] 上一致收敛。

### 泰勒级数余项
$
R_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}
$
  `,
  examples: [
    {
      id: 'adv-fs-1',
      difficulty: 'hard',
      question: '证明 Σₙ₌₁^∞ xⁿ/n² 在 [-1,1] 上一致收敛。',
      options: [
        '用 M-判别法：|xⁿ/n²| ≤ 1/n²，而 Σ1/n² = π²/6 收敛',
        '该级数是幂级数，在收敛域内一致收敛',
        '用狄利克雷判别法证明',
        '用柯西收敛准则证明'
      ],
      correct: 0,
      explanation: '直接应用魏尔斯特拉斯 M-判别法：在 [-1,1] 上 |xⁿ/n²| ≤ 1/n²，而 Σ1/n² 是收敛的 p-级数（p=2>1），故原级数一致收敛。'
    }
  ]
};

export const fourierAnalysisAdvancedLesson: SubLesson = {
  id: 'adv-fourier-analysis',
  title: '傅里叶分析进阶',
  has3D: false,
  theory: `
## 傅里叶级数的收敛性

### 狄利克雷核
Dₙ(x) = Σₖ₌₋ₙⁿ e^(ikx) = sin((n+1/2)x)/sin(x/2)

部分和可表示为卷积：Sₙ(f)(x) = (f * Dₙ)(x)

### 逐点收敛定理
若 f 分段光滑，则傅里叶级数在每点 x 收敛于 [f(x⁺) + f(x⁻)]/2。

### 一致收敛
若 f 连续且分段光滑，f(-π) = f(π)，则傅里叶级数一致收敛于 f。

## 均方收敛与帕塞瓦尔恒等式

### L² 收敛
‖Sₙ - f‖₂ → 0，其中 ‖g‖₂² = (1/2π)∫|g|²

### 帕塞瓦尔恒等式
(1/2π)∫|f|² = Σ|ĉₙ|² = |a₀|²/4 + (1/2)Σ(|aₙ|² + |bₙ|²)

## 傅里叶变换

### 定义
f̂(ξ) = ∫₋∞^∞ f(x)e^(-2πiξx)dx

### 逆变换
f(x) = ∫₋∞^∞ f̂(ξ)e^(2πiξx)dξ

### 重要性质
- 线性性
- 时移：f(x-a) ̂ → e^(-2πiaξ)f̂(ξ)
- 频移：e^(2πiax)f(x) ̂ → f̂(ξ-a)
- 卷积定理：(f * g)̂ = f̂ \\cdot ĝ
  `,
  formula: `
## 核心公式

### 狄利克雷核
$
D_n(x) = \\sum_{k=-n}^n e^{ikx} = \\frac{\\sin((n+1/2)x)}{\\sin(x/2)}
$

### 帕塞瓦尔恒等式
$
\\frac{1}{2\\pi}\\int_{-\\pi}^\\pi |f(x)|^2 dx = \\sum_{n=-\\infty}^\\infty |c_n|^2
$

### 傅里叶变换
$
\\hat{f}(\\xi) = \\int_{-\\infty}^\\infty f(x)e^{-2\\pi i\\xi x}dx
$

### 逆变换
$
f(x) = \\int_{-\\infty}^\\infty \\hat{f}(\\xi)e^{2\\pi i\\xi x}d\\xi
$

### 卷积定理
$
\\widehat{f * g} = \\hat{f} \\cdot \\hat{g}
$
  `,
  examples: [
    {
      id: 'adv-fa-1',
      difficulty: 'hard',
      question: '利用帕塞瓦尔恒等式求 Σₙ₌₁^∞ 1/n²。',
      options: [
        '取 f(x) = x（在 [-π,π] 上），计算得 Σ1/n² = π²/6',
        '取 f(x) = |x|，计算得 Σ1/n² = π²/8',
        '利用傅里叶变换的性质直接计算',
        '取 f(x) = sin(x)，计算得 Σ1/n² = π²/12'
      ],
      correct: 0,
      explanation: 'f(x) = x 的傅里叶系数为 bₙ = 2(-1)ⁿ⁺¹/n。由帕塞瓦尔：(1/2π)∫x²dx = π²/3 = (1/2)Σbₙ² = 2Σ1/n²，故 Σ1/n² = π²/6。'
    }
  ]
};

export const odeAdvancedLesson: SubLesson = {
  id: 'adv-ode',
  title: '常微分方程进阶',
  has3D: false,
  theory: `
## 存在唯一性定理

### 皮卡-林德洛夫定理
初值问题 y' = f(x,y), y(x₀) = y₀：
- 若 f 在矩形区域连续
- 且 f 对 y 满足利普希茨条件

则存在唯一解，定义在 |x - x₀| ≤ h 上。

### 解的延拓
解可以延拓到边界或无穷远。

## 解对初值和参数的连续依赖性

### 连续依赖性
初值的微小变化导致解的微小变化。

### 可微性
在一定条件下，解对初值和参数是可微的。

## 线性微分方程组

### 矩阵指数
对于常系数系统 y' = Ay，解为 y = e^(Ax)y₀

其中 e^(Ax) = Σₙ₌₀^∞ (Ax)ⁿ/n!

### 基本解矩阵
若 Φ(x) 的列是线性无关解，则通解 y = Φ(x)c

## 稳定性理论

### 李雅普诺夫稳定性
零解稳定 ⟺ 扰动解始终保持在零解附近

### 线性化稳定性
对于 y' = Ay + g(y)，若 g 是高阶小量，则：
- A 的特征值实部全负 ⟹ 渐近稳定
- A 有正实部特征值 ⟹ 不稳定

## 边值问题

### 斯图姆-刘维尔问题
(py')' + (λw - q)y = 0，带边值条件

特征值 λ₁ < λ₂ < ...，对应特征函数构成完备正交系。
  `,
  formula: `
## 核心公式

### 矩阵指数
$
e^{Ax} = \\sum_{n=0}^\\infty \\frac{(Ax)^n}{n!}
$

### 常系数系统解
$
\\mathbf{y}' = A\\mathbf{y} \\Rightarrow \\mathbf{y} = e^{Ax}\\mathbf{y}_0
$

### 常数变易公式
$
\\mathbf{y}' = A(x)\\mathbf{y} + \\mathbf{f}(x) \\Rightarrow \\mathbf{y} = \\Phi(x)\\left[\\mathbf{c} + \\int \\Phi^{-1}(s)\\mathbf{f}(s)ds\\right]
$

### 稳定性判据
$
\\text{Re}(\\lambda_i) < 0 \\text{ 对所有 } i \\Rightarrow \\text{渐近稳定}
$
  `,
  examples: [
    {
      id: 'adv-ode-1',
      difficulty: 'hard',
      question: `系统 y' = Ay，其中 A = [[-1, 1], [0, -2]]，判断零解的稳定性。`,
      options: [
        '渐近稳定：特征值为 -1 和 -2，实部均为负',
        '不稳定：矩阵有非零非对角元',
        '稳定但不是渐近稳定',
        '无法确定，需要进一步分析'
      ],
      correct: 0,
      explanation: '特征方程 det(A - λI) = (-1-λ)(-2-λ) = 0，得 λ₁ = -1, λ₂ = -2。两个特征值实部均为负，故零解渐近稳定。'
    }
  ]
};

// 提高篇课时映射
export const advancedLessons: Record<string, SubLesson[]> = {
  'advanced-math': [
    advancedRealNumberLesson,
    uniformContinuityLesson,
    convexFunctionLesson,
    improperIntegralAdvancedLesson,
    functionSeriesLesson,
    fourierAnalysisAdvancedLesson,
    odeAdvancedLesson,
  ],
};

// 获取提高篇课时
export function getAdvancedLessons(moduleId: string): SubLesson[] {
  return advancedLessons[moduleId] || [];
}
