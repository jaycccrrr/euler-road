// 高等数学详细内容 - ContentBlock 格式
// 生成时间: 2026/4/2 20:19:39

import { ContentBlock } from './highschoolMath';

export interface Example {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface AdvancedSubLesson {
  id: string;
  title: string;
  has3D: boolean;
  vizType?: string;
  blocks: ContentBlock[];
  examples?: Example[];
}

export const directioncosinesLesson: AdvancedSubLesson = {
  id: 'direction-cosines',
  title: '方向角与方向余弦',
  has3D: true,
  vizType: 'directionCosines',
  blocks: [
  {
    "id": "block-direction-cosines-0",
    "type": "text",
    "content": "## 一、方向角的概念\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：在空间中，如何精确描述一个向量的\"方向\"？\r\n\r\n                    - 仅说\"指向东北\"太模糊\r\n                    - 需要一种数学化的、可计算的方向表示方法\r\n                    - 方向角和方向余弦就是解决这个问题的工具\r\n\r\n            ### 1.1 定义\r\n            设向量 $\\mathbf{a} = (a_1, a_2, a_3)$，它与 x 轴、y 轴、z 轴正方向的夹角分别记为 $\\alpha$、$\\beta$、$\\gamma$，称为向量的**方向角**。\r\n\r\n\r\n\r\n                $$\\alpha = \\angle(\\mathbf{a},\\ \\mathbf{i}),\\ \\beta = \\angle(\\mathbf{a},\\ \\mathbf{j}),\\ \\gamma = \\angle(\\mathbf{a},\\ \\mathbf{k})$$\r\n\r\n            其中 $\\mathbf{i}$、$\\mathbf{j}$、$\\mathbf{k}$ 分别是 x、y、z 轴的单位向量。"
  },
  {
    "id": "block-direction-cosines-1",
    "type": "image",
    "content": "/images/3d-viz-direction-cosines.png",
    "width": 600
  },
  {
    "id": "block-direction-cosines-2",
    "type": "image",
    "content": "/images/3d-viz-direction-cosines.png",
    "width": 600
  },
  {
    "id": "block-direction-cosines-3",
    "type": "text",
    "content": "## 二、方向余弦\r\n\r\n            ### 2.1 定义与公式\r\n            方向角的余弦称为**方向余弦**：\r\n\r\n\r\n\r\n                $$\\cos\\alpha = \\frac{a_1}{|\\mathbf{a}|} = \\frac{a_1}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}$$\r\n\r\n                $$\\cos\\beta = \\frac{a_2}{|\\mathbf{a}|} = \\frac{a_2}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}$$\r\n\r\n                $$\\cos\\gamma = \\frac{a_3}{|\\mathbf{a}|} = \\frac{a_3}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}$$\r\n\r\n            ### 2.2 公式推导\r\n\r\n            #### 推导一：方向余弦与分量关系\r\n            设向量 $\\mathbf{a} = (a_1, a_2, a_3)$，其模为 $|\\mathbf{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$。\r\n\r\n            根据点乘定义：$\\mathbf{a} \\cdot \\mathbf{i} = |\\mathbf{a}||\\mathbf{i}|\\cos\\alpha = |\\mathbf{a}|\\cos\\alpha$\r\n\r\n            又因为 $\\mathbf{a} \\cdot \\mathbf{i} = a_1$，所以：\r\n\r\n\r\n\r\n                $$\\cos\\alpha = \\frac{a_1}{|\\mathbf{a}|} = \\frac{a_1}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}$$\r\n\r\n            同理可得 $\\cos\\beta$ 和 $\\cos\\gamma$ 的表达式。\r\n\r\n            #### 推导二：方向余弦基本恒等式\r\n            方向余弦满足一个重要恒等式：\r\n\r\n\r\n\r\n                $$\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$$\r\n\r\n> **提示**\r\n> \r\n                **证明**：\r\n\r\n                $$\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = \\frac{a_1^2 + a_2^2 + a_3^2}{|\\mathbf{a}|^2} = \\frac{|\\mathbf{a}|^2}{|\\mathbf{a}|^2} = 1$$"
  },
  {
    "id": "block-direction-cosines-4",
    "type": "image",
    "content": "/images/3d-viz-direction-cosines.png",
    "width": 600
  },
  {
    "id": "block-direction-cosines-5",
    "type": "text",
    "content": "## 三、方向余弦的应用\r\n\r\n            ### 3.1 单位向量表示\r\n            向量 $\\mathbf{a}$ 的单位向量可以用方向余弦表示：\r\n\r\n\r\n\r\n                $$\\mathbf{a}^0 = \\frac{\\mathbf{a}}{|\\mathbf{a}|} = (\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$$\r\n\r\n            ### 3.2 两向量夹角\r\n            设向量 $\\mathbf{a}$ 和 $\\mathbf{b}$ 的方向余弦分别为 $(\\cos\\alpha_1, \\cos\\beta_1, \\cos\\gamma_1)$ 和 $(\\cos\\alpha_2, \\cos\\beta_2, \\cos\\gamma_2)$，则：\r\n\r\n\r\n\r\n                $$\\cos\\theta = \\cos\\alpha_1\\cos\\alpha_2 + \\cos\\beta_1\\cos\\beta_2 + \\cos\\gamma_1\\cos\\gamma_2$$\r\n\r\n            ## 四、方向数\r\n            与方向余弦成比例的任意三个数称为**方向数**。若 $l : m : n = \\cos\\alpha : \\cos\\beta : \\cos\\gamma$，则 $(l, m, n)$ 是一组方向数。\r\n\r\n\r\n\r\n                $$\\cos\\alpha = \\frac{l}{\\sqrt{l^2 + m^2 + n^2}}$$\r\n\r\n                $$\\cos\\beta = \\frac{m}{\\sqrt{l^2 + m^2 + n^2}}$$\r\n\r\n                $$\\cos\\gamma = \\frac{n}{\\sqrt{l^2 + m^2 + n^2}}$$"
  },
  {
    "id": "block-direction-cosines-6",
    "type": "text",
    "content": "## 方向余弦公式推导\r\n\r\n            ### 一、从点乘定义推导方向余弦\r\n            设向量 $\\mathbf{a} = (a_1, a_2, a_3)$，其模为 $|\\mathbf{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$。\r\n\r\n            根据向量点乘的定义，$\\mathbf{a}$ 与 x 轴单位向量 $\\mathbf{i} = (1, 0, 0)$ 的点乘为：\r\n\r\n\r\n\r\n                $$\\mathbf{a} \\cdot \\mathbf{i} = |\\mathbf{a}||\\mathbf{i}|\\cos\\alpha = |\\mathbf{a}|\\cos\\alpha$$\r\n\r\n            另一方面，通过分量计算点乘：\r\n\r\n\r\n\r\n                $$\\mathbf{a} \\cdot \\mathbf{i} = a_1 \\times 1 + a_2 \\times 0 + a_3 \\times 0 = a_1$$\r\n\r\n            因此得到方向余弦的第一个公式：\r\n\r\n\r\n\r\n                $$\\cos\\alpha = \\frac{a_1}{|\\mathbf{a}|} = \\frac{a_1}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}$$\r\n\r\n            同理，通过与 $\\mathbf{j}$ 和 $\\mathbf{k}$ 的点乘可得：\r\n\r\n\r\n\r\n                $$\\cos\\beta = \\frac{a_2}{|\\mathbf{a}|} = \\frac{a_2}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}$$\r\n\r\n                $$\\cos\\gamma = \\frac{a_3}{|\\mathbf{a}|} = \\frac{a_3}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}$$\r\n\r\n            ### 二、方向余弦基本恒等式的证明\r\n\r\n            **定理**：对于任意非零向量，其方向余弦满足：\r\n\r\n\r\n\r\n                $$\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$$\r\n\r\n            **证明**：\r\n\r\n\r\n\r\n                $$\\begin{aligned} \\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma &= \\frac{a_1^2}{|\\mathbf{a}|^2} + \\frac{a_2^2}{|\\mathbf{a}|^2} + \\frac{a_3^2}{|\\mathbf{a}|^2} \\\\ &= \\frac{a_1^2 + a_2^2 + a_3^2}{|\\mathbf{a}|^2} \\\\ &= \\frac{|\\mathbf{a}|^2}{|\\mathbf{a}|^2} \\\\ &= 1 \\end{aligned}$$\r\n\r\n> **提示**\r\n> \r\n                **几何意义**：单位向量的终点总是落在单位球面上。方向余弦 $(\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$ 正是单位向量 $\\mathbf{a}^0$ 的坐标。\r\n\r\n            ### 三、单位向量的方向余弦表示\r\n\r\n            向量 $\\mathbf{a}$ 的单位向量 $\\mathbf{a}^0$ 可以表示为：\r\n\r\n\r\n\r\n                $$\\mathbf{a}^0 = \\frac{\\mathbf{a}}{|\\mathbf{a}|} = \\left(\\frac{a_1}{|\\mathbf{a}|}, \\frac{a_2}{|\\mathbf{a}|}, \\frac{a_3}{|\\mathbf{a}|}\\right) = (\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$$\r\n\r\n            ### 四、两向量夹角公式\r\n\r\n            设向量 $\\mathbf{a}$ 和 $\\mathbf{b}$ 的方向余弦分别为 $(\\cos\\alpha_1, \\cos\\beta_1, \\cos\\gamma_1)$ 和 $(\\cos\\alpha_2, \\cos\\beta_2, \\cos\\gamma_2)$。\r\n\r\n            由于单位向量的点乘等于它们夹角的余弦：\r\n\r\n\r\n\r\n                $$\\begin{aligned} \\cos\\theta &= \\mathbf{a}^0 \\cdot \\mathbf{b}^0 \\\\ &= \\cos\\alpha_1\\cos\\alpha_2 + \\cos\\beta_1\\cos\\beta_2 + \\cos\\gamma_1\\cos\\gamma_2 \\end{aligned}$$\r\n\r\n            这就是利用方向余弦计算两向量夹角的公式。</n\r\n            ### 五、方向数的归一化\r\n\r\n            若 (l, m, n) 是一组方向数（与方向余弦成比例），则对应的方向余弦为：\r\n\r\n\r\n\r\n                $$\\cos\\alpha = \\frac{l}{\\sqrt{l^2 + m^2 + n^2}}$$\r\n\r\n                $$\\cos\\beta = \\frac{m}{\\sqrt{l^2 + m^2 + n^2}}$$\r\n\r\n                $$\\cos\\gamma = \\frac{n}{\\sqrt{l^2 + m^2 + n^2}}$$\r\n\r\n            **验证**：\r\n\r\n\r\n\r\n                $$\\begin{aligned} \\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma &= \\frac{l^2 + m^2 + n^2}{l^2 + m^2 + n^2} \\\\ &= 1\\ \\checkmark \\end{aligned}$$"
  }
],
};

export const crossproductLesson: AdvancedSubLesson = {
  id: 'cross-product',
  title: '叉乘（向量积）',
  has3D: true,
  vizType: 'crossProduct',
  blocks: [
  {
    "id": "block-cross-product-0",
    "type": "text",
    "content": "## 一、为什么要定义叉乘？\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：点乘 $\\mathbf{a}$ $\\cdot$ $\\mathbf{b}$ 可以告诉我们两个向量的\"相似程度\"（投影关系），但还有很多问题无法回答：\r\n\r\n                    - 如何求同时垂直于两个向量的方向？（求平面法向量）\r\n                    - 如何计算两个向量张成的平行四边形面积？\r\n                    - 物理中力矩、角动量的方向如何确定？\r\n\r\n            **核心需求**：我们需要一种新的运算，它接受两个向量，产生一个新的向量，这个向量要**同时垂直于原来的两个向量**。\r\n\r\n            ## 二、从几何需求到代数定义\r\n\r\n            ### 2.1 确定方向：右手定则\r\n            假设我们已经确定了叉乘结果的方向垂直于 $\\mathbf{a}$ 和 $\\mathbf{b}$ 所在平面，但还有一个问题：垂直方向有两个（\"向上\"和\"向下\"），选哪一个？\r\n\r\n> **提示**\r\n> \r\n                **右手定则**：右手四指从 $\\mathbf{a}$ 转向 $\\mathbf{b}$，拇指指向即为 $\\mathbf{a} \\times \\mathbf{b}$ 的方向。\r\n\r\n                这样规定使得 $\\mathbf{a} \\times \\mathbf{b} = -(\\mathbf{b} \\times \\mathbf{a})$，即叉乘是**反交换**的。"
  },
  {
    "id": "block-cross-product-1",
    "type": "text",
    "content": "[图片: 右手定则示意图]\r\n\r\n                **右手定则**：四指从 $\\mathbf{a}$ 转向 $\\mathbf{b}$，拇指指向 $\\mathbf{a} \\times \\mathbf{b}$\r\n\r\n                $|\\mathbf{a} \\times \\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta$，方向垂直于 $\\mathbf{a}$ 和 $\\mathbf{b}$ 所在平面\r\n\r\n            ### 2.2 确定大小：面积的几何意义\r\n            叉乘的大小应该如何确定？几何上一个自然的想法是：**等于以 a, b 为邻边的平行四边形面积**。\r\n\r\n\r\n\r\n                $$|\\mathbf{a} \\times \\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta$$\r\n\r\n            其中 $\\theta$ 是两向量夹角。这样规定的好处：\r\n\r\n                - 当 $\\mathbf{a} \\perp \\mathbf{b}$ 时，面积最大，$|\\sin 90^\\circ| = 1$\r\n                - 当 $\\mathbf{a} \\parallel \\mathbf{b}$ 时，面积为零，$\\sin 0^\\circ = 0$，此时 $\\mathbf{a} \\times \\mathbf{b} = \\mathbf{0}$\r\n                - 这与平行四边形面积公式一致\r\n\r\n            ## 三、分量公式的推导\r\n\r\n            ### 3.1 利用标准正交基\r\n            设 i, j, k 为 x, y, z 方向的单位正交基向量。首先确定它们之间的叉乘关系：\r\n\r\n\r\n\r\n                $$\\mathbf{i} \\times \\mathbf{i} = \\mathbf{j} \\times \\mathbf{j} = \\mathbf{k} \\times \\mathbf{k} = \\mathbf{0}$$（自身叉乘为零）\r\n\r\n                $$\\mathbf{i} \\times \\mathbf{j} = \\mathbf{k},\\quad \\mathbf{j} \\times \\mathbf{k} = \\mathbf{i},\\quad \\mathbf{k} \\times \\mathbf{i} = \\mathbf{j}$$（循环对称）\r\n\r\n                $$\\mathbf{j} \\times \\mathbf{i} = -\\mathbf{k},\\quad \\mathbf{k} \\times \\mathbf{j} = -\\mathbf{i},\\quad \\mathbf{i} \\times \\mathbf{k} = -\\mathbf{j}$$（反交换性）\r\n\r\n            ### 3.2 分配律的应用\r\n            **定理**：叉乘满足分配律 $\\mathbf{a} \\times (\\mathbf{b} + \\mathbf{c}) = \\mathbf{a} \\times \\mathbf{b} + \\mathbf{a} \\times \\mathbf{c}$\r\n\r\n            将 $\\mathbf{a} = a_1\\mathbf{i} + a_2\\mathbf{j} + a_3\\mathbf{k}$ 和 $\\mathbf{b} = b_1\\mathbf{i} + b_2\\mathbf{j} + b_3\\mathbf{k}$ 展开：\r\n\r\n\r\n\r\n                $$\\mathbf{a} \\times \\mathbf{b} = (a_1\\mathbf{i} + a_2\\mathbf{j} + a_3\\mathbf{k}) \\times (b_1\\mathbf{i} + b_2\\mathbf{j} + b_3\\mathbf{k})$$\r\n\r\n            展开后，利用 $\\mathbf{i}, \\mathbf{j}, \\mathbf{k}$ 的叉乘关系，同类项（如 $\\mathbf{i} \\times \\mathbf{i}$）为零，交叉项保留：\r\n\r\n\r\n\r\n                $$\\begin{aligned} \\mathbf{a} \\times \\mathbf{b} &= a_1b_2(\\mathbf{i} \\times \\mathbf{j}) + a_1b_3(\\mathbf{i} \\times \\mathbf{k}) + a_2b_1(\\mathbf{j} \\times \\mathbf{i}) + a_2b_3(\\mathbf{j} \\times \\mathbf{k}) + a_3b_1(\\mathbf{k} \\times \\mathbf{i}) + a_3b_2(\\mathbf{k} \\times \\mathbf{j}) \\\\ &= a_1b_2\\mathbf{k} - a_1b_3\\mathbf{j} - a_2b_1\\mathbf{k} + a_2b_3\\mathbf{i} + a_3b_1\\mathbf{j} - a_3b_2\\mathbf{i} \\\\ &= (a_2b_3 - a_3b_2)\\mathbf{i} + (a_3b_1 - a_1b_3)\\mathbf{j} + (a_1b_2 - a_2b_1)\\mathbf{k} \\end{aligned}$$\r\n\r\n            ### 3.3 行列式记忆法\r\n            上述分量公式可以巧妙地用行列式表示：\r\n\r\n\r\n\r\n                $$\\mathbf{a} \\times \\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}$$\r\n\r\n            按第一行展开，恰好得到三个分量。\r\n\r\n            ## 四、几何意义与应用\r\n\r\n                **3D可视化演示**：右侧动画展示了向量 $\\mathbf{a}$（红色）、$\\mathbf{b}$（蓝色）以及它们的叉乘 $\\mathbf{a} \\times \\mathbf{b}$（绿色）。\r\n\r\n                观察：当 $\\mathbf{b}$ 绕 $\\mathbf{a}$ 旋转时，叉乘的大小如何变化？方向是否始终垂直于 $\\mathbf{a}$ 和 $\\mathbf{b}$ 所在平面？\r\n\r\n            ### 4.1 平行四边形与三角形面积\r\n            **定理**：$|\\mathbf{a} \\times \\mathbf{b}|$ = 以 $\\mathbf{a}, \\mathbf{b}$ 为邻边的平行四边形面积\r\n\r\n            **推论**：三角形面积 $= \\frac{1}{2}|\\mathbf{a} \\times \\mathbf{b}|$\r\n\r\n            ### 4.2 判断共线性\r\n            **定理**：$\\mathbf{a} \\times \\mathbf{b} = \\mathbf{0} \\iff \\mathbf{a} \\parallel \\mathbf{b}$（两向量共线/平行）\r\n\r\n            **证明**：叉乘为零当且仅当 $|\\mathbf{a}||\\mathbf{b}|\\sin\\theta = 0$，即 $\\sin\\theta = 0$，$\\theta = 0$ 或 $\\pi$。\r\n\r\n            ### 4.3 求平面法向量\r\n            给定平面内两个不共线向量 $\\mathbf{a}$ 和 $\\mathbf{b}$，$\\mathbf{a} \\times \\mathbf{b}$ 就是该平面的一个法向量。\r\n\r\n            ## 五、代数性质总结\r\n\r\n**思考引导**\r\n\r\n                    - **反交换律**：$\\mathbf{a} \\times \\mathbf{b} = -(\\mathbf{b} \\times \\mathbf{a})$\r\n                    - **分配律**：$\\mathbf{a} \\times (\\mathbf{b} + \\mathbf{c}) = \\mathbf{a} \\times \\mathbf{b} + \\mathbf{a} \\times \\mathbf{c}$\r\n                    - **数乘结合律**：$(\\lambda\\mathbf{a}) \\times \\mathbf{b} = \\lambda(\\mathbf{a} \\times \\mathbf{b}) = \\mathbf{a} \\times (\\lambda\\mathbf{b})$\r\n                    - **自叉乘为零**：$\\mathbf{a} \\times \\mathbf{a} = \\mathbf{0}$\r\n                    - **Jacobi恒等式**：$\\mathbf{a} \\times (\\mathbf{b} \\times \\mathbf{c}) + \\mathbf{b} \\times (\\mathbf{c} \\times \\mathbf{a}) + \\mathbf{c} \\times (\\mathbf{a} \\times \\mathbf{b}) = \\mathbf{0}$\r\n\r\n> ⚠️ **注意**\r\n> \r\n                **重要提醒**：叉乘不满足结合律！即 $(\\mathbf{a} \\times \\mathbf{b}) \\times \\mathbf{c} \\neq \\mathbf{a} \\times (\\mathbf{b} \\times \\mathbf{c})$\r\n\r\n                例如：$(\\mathbf{i} \\times \\mathbf{j}) \\times \\mathbf{j} = \\mathbf{k} \\times \\mathbf{j} = -\\mathbf{i}$，而 $\\mathbf{i} \\times (\\mathbf{j} \\times \\mathbf{j}) = \\mathbf{i} \\times \\mathbf{0} = \\mathbf{0}$"
  },
  {
    "id": "block-cross-product-2",
    "type": "text",
    "content": "## 叉乘公式的推导\r\n            ### 从几何定义出发\r\n            叉乘的大小由平行四边形面积决定：\r\n\r\n\r\n\r\n                $$|\\mathbf{a} \\times \\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta$$\r\n\r\n            ### 利用点乘与叉乘的关系\r\n            重要恒等式（拉格朗日公式）：\r\n\r\n\r\n\r\n                $$|\\mathbf{a} \\times \\mathbf{b}|^2 + (\\mathbf{a} \\cdot \\mathbf{b})^2 = |\\mathbf{a}|^2|\\mathbf{b}|^2$$\r\n\r\n            ### 分量推导\r\n            设 i, j, k 为标准正交基向量：\r\n\r\n\r\n\r\n                $$\\mathbf{i} \\times \\mathbf{j} = \\mathbf{k},\\quad \\mathbf{j} \\times \\mathbf{k} = \\mathbf{i},\\quad \\mathbf{k} \\times \\mathbf{i} = \\mathbf{j}$$\r\n\r\n                $$\\mathbf{j} \\times \\mathbf{i} = -\\mathbf{k},\\quad \\mathbf{k} \\times \\mathbf{j} = -\\mathbf{i},\\quad \\mathbf{i} \\times \\mathbf{k} = -\\mathbf{j}$$\r\n\r\n**思考引导**\r\n\r\n                展开 $$\\mathbf{a} \\times \\mathbf{b} = (a_1\\mathbf{i} + a_2\\mathbf{j} + a_3\\mathbf{k}) \\times (b_1\\mathbf{i} + b_2\\mathbf{j} + b_3\\mathbf{k})$$\r\n\r\n                利用分配律和基向量的叉乘关系，即可得到分量公式"
  }
],
};

export const tripleproductLesson: AdvancedSubLesson = {
  id: 'triple-product',
  title: '混合积与三重积',
  has3D: true,
  vizType: 'tripleProduct',
  blocks: [
  {
    "id": "block-triple-product-0",
    "type": "text",
    "content": "## 一、从几何问题出发\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：我们已经知道：\r\n\r\n                    - 点乘 $\\mathbf{a} \\cdot \\mathbf{b}$ 与投影、夹角有关\r\n                    - 叉乘 $\\mathbf{a} \\times \\mathbf{b}$ 与面积、垂直方向有关\r\n                \r\n                **新问题**：如何计算以三个向量为棱的平行六面体的体积？\r\n\r\n            这个问题在几何（体积计算）、物理（力做功的多维推广）、工程（稳定性分析）中都有重要应用。\r\n\r\n            ## 二、体积公式的推导\r\n\r\n            ### 2.1 分解思路\r\n            平行六面体体积 = 底面积 $\\times$ 高\r\n\r\n\r\n\r\n                V = (底面积) $\\times$ (高)\r\n\r\n            选择以 $\\mathbf{a}$ 和 $\\mathbf{b}$ 为底面邻边：\r\n\r\n                - **底面积** = $|\\mathbf{a} \\times \\mathbf{b}|$（叉乘的大小）\r\n                - **高** = $\\mathbf{c}$ 在垂直于底面方向上的投影长度\r\n\r\n            ### 2.2 高的计算\r\n            底面的法向量方向就是 $\\mathbf{a} \\times \\mathbf{b}$ 的方向。$\\mathbf{c}$ 在这个方向上的投影为：\r\n\r\n\r\n\r\n                $$\\text{高} = |\\mathbf{c}|\\,|\\cos\\theta| = \\frac{|(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|}{|\\mathbf{a} \\times \\mathbf{b}|}$$\r\n\r\n            其中 $\\theta$ 是 $\\mathbf{c}$ 与 $\\mathbf{a}$ $\\times$ $\\mathbf{b}$ 的夹角。\r\n\r\n            ### 2.3 体积公式\r\n            综合以上：\r\n\r\n\r\n\r\n                $$V = |\\mathbf{a} \\times \\mathbf{b}| \\times \\frac{|(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|}{|\\mathbf{a} \\times \\mathbf{b}|} = |(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|$$\r\n\r\n> **提示**\r\n> \r\n                **定义**：三个向量的**混合积**定义为 $(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}$\r\n\r\n                **几何意义**：其绝对值等于以三个向量为棱的平行六面体的体积"
  },
  {
    "id": "block-triple-product-1",
    "type": "image",
    "content": "/images/3d-viz-triple-product.png",
    "width": 600
  },
  {
    "id": "block-triple-product-2",
    "type": "text",
    "content": "## 三、代数表示：行列式\r\n\r\n            ### 3.1 从分量展开\r\n            设 $\\mathbf{a} = (a_1, a_2, a_3)$，$\\mathbf{b} = (b_1, b_2, b_3)$，$\\mathbf{c} = (c_1, c_2, c_3)$\r\n\r\n            先计算 $\\mathbf{a} \\times \\mathbf{b} = (a_2b_3 - a_3b_2,\\ a_3b_1 - a_1b_3,\\ a_1b_2 - a_2b_1)$\r\n\r\n            再与 $\\mathbf{c}$ 点乘：\r\n\r\n\r\n\r\n                $$(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = c_1(a_2b_3 - a_3b_2) + c_2(a_3b_1 - a_1b_3) + c_3(a_1b_2 - a_2b_1)$$\r\n\r\n            ### 3.2 整理为行列式\r\n            展开式可以重新排列为：\r\n\r\n\r\n\r\n                $$= a_1b_2c_3 + a_2b_3c_1 + a_3b_1c_2 - a_1b_3c_2 - a_2b_1c_3 - a_3b_2c_1$$\r\n\r\n            这正是**三阶行列式**的展开：\r\n\r\n\r\n\r\n                $$(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = \\det(\\mathbf{a}, \\mathbf{b}, \\mathbf{c}) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}$$\r\n\r\n            ## 四、符号的几何意义：右手系与左手系\r\n\r\n            ### 4.1 右手系判定\r\n            混合积的符号反映三个向量的相对方向关系：\r\n\r\n**思考引导**\r\n\r\n                    - **$(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} > 0$**：$\\mathbf{c}$ 与 $\\mathbf{a} \\times \\mathbf{b}$ 同向，构成右手系\r\n                    - **$(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} < 0$**：$\\mathbf{c}$ 与 $\\mathbf{a} \\times \\mathbf{b}$ 反向，构成左手系\r\n                    - **$(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = 0$**：三向量共面，体积为零\r\n\r\n            ### 4.2 轮换对称性\r\n            循环置换三个向量，混合积不变：\r\n\r\n\r\n\r\n                $$(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = (\\mathbf{b} \\times \\mathbf{c}) \\cdot \\mathbf{a} = (\\mathbf{c} \\times \\mathbf{a}) \\cdot \\mathbf{b}$$\r\n\r\n            **证明**：这三个量都等于同一个行列式，只是行交换了偶数次，符号不变。\r\n\r\n            ## 五、应用与判定\r\n\r\n            ### 5.1 共面性判定\r\n            **定理**：$(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = 0 \\iff$ 三向量共面\r\n\r\n            **证明**：混合积为零 $\\iff$ 体积为零 $\\iff$ 三个向量共面\r\n\r\n            ### 5.2 体积计算\r\n            \r\n                - **平行六面体**：$V = |(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|$\r\n                - **四面体**：$V = \\frac{1}{6}|(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|$（四面体是平行六面体的 1/6）\r\n\r\n            ### 5.3 点到平面的距离\r\n            已知平面过点 $P_0$，法向量 $\\mathbf{n} = \\mathbf{a} \\times \\mathbf{b}$，点 $P$ 到平面的距离：\r\n\r\n\r\n\r\n                $$d = \\frac{|(\\mathbf{P} - \\mathbf{P}_0) \\cdot \\mathbf{n}|}{|\\mathbf{n}|}$$\r\n\r\n> ⚠️ **注意**\r\n> \r\n                **注意**：混合积不满足任意交换。交换两个向量会改变符号：\r\n\r\n\r\n\r\n                    $$(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} = -(\\mathbf{b} \\times \\mathbf{a}) \\cdot \\mathbf{c} = (\\mathbf{b} \\times \\mathbf{c}) \\cdot \\mathbf{a}$$"
  },
  {
    "id": "block-triple-product-3",
    "type": "text",
    "content": "## 混合积公式的推导\r\n            ### 展开计算\r\n            设 $\\mathbf{a} = (a_1, a_2, a_3)$，$\\mathbf{b} = (b_1, b_2, b_3)$，$\\mathbf{c} = (c_1, c_2, c_3)$\r\n\r\n            先计算 $\\mathbf{a} \\times \\mathbf{b}$：\r\n\r\n\r    $\\mathbf{a} \\times \\mathbf{b} = (a_2b_3 - a_3b_2,\\ a_3b_1 - a_1b_3,\\ a_1b_2 - a_2b_1)$\r\n\r\n            ### 再与 c 点乘\r\n            \r\n\r\n\r\n                $$\\begin{aligned} (\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c} &= c_1(a_2b_3 - a_3b_2) + c_2(a_3b_1 - a_1b_3) + c_3(a_1b_2 - a_2b_1) \\\\ &= c_1a_2b_3 - c_1a_3b_2 + c_2a_3b_1 - c_2a_1b_3 + c_3a_1b_2 - c_3a_2b_1 \\end{aligned}$$\r\n\r\n            ### 整理为行列式\r\n            这正是三阶行列式的展开形式：\r\n\r\n\r\n\r\n                $$\\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}$$\r\n\r\n            ## 几何推导\r\n            平行六面体体积 = 底面积 $\\times$ 高\r\n\r\n                - 底面积 $= |\\mathbf{a} \\times \\mathbf{b}|$\r\n                - 高 $= |\\mathbf{c}|\\,|\\cos\\theta|$，其中 $\\theta$ 是 $\\mathbf{c}$ 与 $\\mathbf{a} \\times \\mathbf{b}$ 的夹角\r\n\r\n\r\n\r\n                $$V = |\\mathbf{a} \\times \\mathbf{b}| \\times |\\mathbf{c}| \\times |\\cos\\theta| = |(\\mathbf{a} \\times \\mathbf{b}) \\cdot \\mathbf{c}|$$"
  }
],
};

export const planelineLesson: AdvancedSubLesson = {
  id: 'plane-line',
  title: '平面与直线方程',
  has3D: true,
  vizType: 'planeLine',
  blocks: [
  {
    "id": "block-plane-line-0",
    "type": "text",
    "content": "## 平面方程\r\n\r\n            ### 1. 点法式方程\r\n            已知平面上一点 $P_0(x_0, y_0, z_0)$ 和平面的法向量 $\\mathbf{n} = (A, B, C)$：\r\n\r\n\r\n\r\n                $$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$\r\n\r\n            ### 2. 一般式方程\r\n            \r\n\r\n\r\n$$Ax + By + Cz + D = 0$$\r\n\r\n            其中 (A, B, C) 是法向量。\r\n\r\n            ### 3. 截距式方程\r\n            \r\n\r\n\r\n$$\\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 1$$\r\n\r\n            a, b, c 分别是平面在 x, y, z 轴上的截距。\r\n\r\n            ## 直线方程\r\n\r\n            ### 1. 参数式方程\r\n            过点 $P_0(x_0, y_0, z_0)$，方向向量 $\\mathbf{s} = (m, n, p)$：\r\n\r\n\r\n\r\n                $$\\begin{cases} x = x_0 + mt \\\\ y = y_0 + nt \\\\ z = z_0 + pt \\end{cases}$$\r\n\r\n            ### 2. 对称式方程（标准式）\r\n            \r\n\r\n\r\n                $$\\frac{x - x_0}{m} = \\frac{y - y_0}{n} = \\frac{z - z_0}{p}$$\r\n\r\n            ### 3. 一般式方程（两平面交线）\r\n            \r\n\r\n\r\n                $$\\begin{cases} A_1x + B_1y + C_1z + D_1 = 0 \\\\ A_2x + B_2y + C_2z + D_2 = 0 \\end{cases}$$\r\n\r\n            ## 位置关系"
  },
  {
    "id": "block-plane-line-1",
    "type": "image",
    "content": "/images/3d-viz-plane-line.png",
    "width": 600
  },
  {
    "id": "block-plane-line-2",
    "type": "text",
    "content": "**思考引导**\r\n\r\n                #### 两平面关系\r\n                \r\n                    - 平行：法向量平行，$\\mathbf{n}_1 \\times \\mathbf{n}_2 = \\mathbf{0}$\r\n                    - 垂直：法向量垂直，$\\mathbf{n}_1 \\cdot \\mathbf{n}_2 = 0$\r\n                    - 夹角：$\\cos\\theta = \\frac{|\\mathbf{n}_1 \\cdot \\mathbf{n}_2|}{|\\mathbf{n}_1||\\mathbf{n}_2|}$\r\n\r\n                #### 两直线关系\r\n                \r\n                    - 平行：方向向量平行\r\n                    - 垂直：方向向量垂直\r\n                    - 共面：$(\\mathbf{P}_2 - \\mathbf{P}_1) \\cdot (\\mathbf{s}_1 \\times \\mathbf{s}_2) = 0$\r\n\r\n                #### 直线与平面关系\r\n                \r\n                    - 平行：方向向量垂直于法向量\r\n                    - 垂直：方向向量平行于法向量\r\n\r\n            ## 距离公式"
  },
  {
    "id": "block-plane-line-3",
    "type": "image",
    "content": "/images/3d-viz-plane-line.png",
    "width": 600
  },
  {
    "id": "block-plane-line-4",
    "type": "image",
    "content": "/images/3d-viz-plane-line.png",
    "width": 600
  },
  {
    "id": "block-plane-line-5",
    "type": "text",
    "content": "> **提示**\r\n> \r\n                **点到平面距离**：\r\n\r\n\r\n\r\n                    $$d = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$\r\n\r\n                *几何意义：向量在法向量方向投影的绝对值*\r\n\r\n                **点到直线距离**：\r\n\r\n\r\n\r\n                    $$d = \\frac{|\\vec{P_0P} \\times \\mathbf{s}|}{|\\mathbf{s}|}$$\r\n\r\n                *几何意义：平行四边形的高 = 面积 / 底边长*\r\n\r\n                **两平行平面距离**：\r\n\r\n\r\n\r\n                    $$d = \\frac{|D_2 - D_1|}{\\sqrt{A^2 + B^2 + C^2}}$$\r\n\r\n                *几何意义：任取一点转化为点到平面距离*"
  }
],
};

export const quadricsurfacesLesson: AdvancedSubLesson = {
  id: 'quadric-surfaces',
  title: '二次曲面',
  has3D: true,
  vizType: 'quadricSurface',
  blocks: [
  {
    "id": "block-quadric-surfaces-0",
    "type": "text",
    "content": "## 从平面到曲面：为什么要研究二次曲面？\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：\r\n\r\n                    - 平面的一般方程是 **Ax + By + Cz + D = 0**，这是一次的\r\n                    - 如果允许变量有二次项，会得到什么图形？\r\n                    - 为什么自然界和工程中的曲面（卫星天线、冷却塔、透镜）能用二次函数描述？\r\n\r\n            **核心思想**：二次曲面是平面概念的推广，就像圆锥曲线（椭圆、抛物线、双曲线）是直线的推广一样。在三维空间中，二次曲面方程的一般形式为：\r\n\r\n\r\n\r\n                $$Ax^2 + By^2 + Cz^2 + Dxy + Exz + Fyz + Gx + Hy + Iz + J = 0$$\r\n\r\n            通过适当的坐标变换，可以消去交叉项和一次项，得到**标准形**。这就是为什么我们只需要研究九种标准二次曲面。\r\n\r\n            ## 一、椭球面：球面的\"拉伸变形\"\r\n\r\n            ### 1.1 从球面出发的思考\r\n\r\n> **提示**\r\n> \r\n                **问题**：球面 $x^2 + y^2 + z^2 = R^2$ 上各点到球心距离相等。如果我们允许三个方向的\"半径\"不同，会得到什么？\r\n\r\n            设想一个球面被分别沿 x、y、z 方向按比例 a、b、c 拉伸：\r\n\r\n                - x 方向拉伸 $a$ 倍：$x \\to x/a$\r\n                - y 方向拉伸 $b$ 倍：$y \\to y/b$\r\n                - z 方向拉伸 $c$ 倍：$z \\to z/c$\r\n\r\n            代入球面方程，得到**椭球面标准方程**：\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} = 1$$\r\n\r\n            ### 1.2 几何特征分析\r\n\r\n            **定理**：椭球面与平行于坐标面的平面的交线都是椭圆。\r\n\r\n            **证明**：设平面 z = h（|h| < c）与椭球面相交，代入得：\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 - \\frac{h^2}{c^2} = \\frac{c^2 - h^2}{c^2}$$\r\n\r\n            两边除以右边，得标准椭圆方程：\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2(1 - h^2/c^2)} + \\frac{y^2}{b^2(1 - h^2/c^2)} = 1$$\r\n\r\n            这说明水平截面是椭圆，且随 |h| 增大，椭圆逐渐缩小，当 |h| = c 时缩为一点。\r\n\r\n                *↑ 点击右侧可视化区域查看椭球面，观察红色半轴线和水平绿色截面*\r\n\r\n            **特例**：当 a = b = c = R 时，椭球面退化为球面。\r\n\r\n            ## 二、抛物面：从抛物线到曲面\r\n\r\n            ### 2.1 椭圆抛物面的构造思路\r\n\r\n> **提示**\r\n> \r\n                **问题**：抛物线 $y = x^2$ 绕轴旋转会生成什么曲面？\r\n\r\n            将抛物线 $y = x^2$ 绕 y 轴旋转，旋转曲面上的点满足：到 y 轴的距离等于原抛物线的 x 值。\r\n\r\n\r\n\r\n                $$\\sqrt{x^2 + z^2} = \\sqrt{y} \\Rightarrow y = x^2 + z^2$$\r\n\r\n            更一般地，若两个方向的\"开口速度\"不同，得到**椭圆抛物面**：\r\n\r\n\r\n\r\n                $$z = \\frac{x^2}{a^2} + \\frac{y^2}{b^2}$$\r\n\r\n            ### 2.2 几何性质\r\n\r\n            **定理 1**：椭圆抛物面与平面 z = h（h > 0）的交线是椭圆。\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2h} + \\frac{y^2}{b^2h} = 1$$\r\n\r\n            **定理 2**：椭圆抛物面与平面 x = 0 或 y = 0 的交线是抛物线。\r\n\r\n                *↑ 观察椭圆抛物面，注意顶点（黄色点）和水平截面（绿色圆）*\r\n\r\n            ### 2.3 双曲抛物面（马鞍面）：符号变化的艺术\r\n\r\n> **提示**\r\n> \r\n                **问题**：如果将椭圆抛物面方程中的一个加号改为减号，会发生什么？\r\n\r\n            考虑方程：\r\n\r\n\r\n\r\n                $$z = \\frac{x^2}{a^2} - \\frac{y^2}{b^2}$$\r\n\r\n            这个简单的符号变化导致了截然不同的几何性质：\r\n\r\n                <li>**与 $z = h$ 的交线**：$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = h$\r\n                    \r\n                        - h > 0 时：双曲线，实轴平行于 x 轴\r\n                        - h < 0 时：双曲线，实轴平行于 y 轴\r\n                        - h = 0 时：两条相交直线（渐近线）\r\n                    \r\n                </li>\r\n                - **与 $x = 0$ 的交线**：$z = -\\frac{y^2}{b^2}$，开口向下的抛物线\r\n                - **与 $y = 0$ 的交线**：$z = \\frac{x^2}{a^2}$，开口向上的抛物线\r\n\r\n            **关键发现**：双曲抛物面可以看作由一簇抛物线沿另一抛物线平行移动而成。\r\n\r\n                *↑ 观察马鞍面，注意鞍点（黄色）和两个方向的抛物线（红色）*\r\n\r\n            ## 三、双曲面：从椭圆到双曲线\r\n\r\n            ### 3.1 单叶双曲面的形成\r\n\r\n> **提示**\r\n> \r\n                **问题**：椭球面的方程右边是 1。如果右边变成 -1，还有实数解吗？\r\n\r\n                **进一步**：如果让方程中一个平方项的系数为负呢？\r\n\r\n            考虑方程：\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} - \\frac{z^2}{c^2} = 1$$\r\n\r\n            **几何特征分析**：\r\n\r\n            **定理 1**：单叶双曲面与平面 z = h 的交线是椭圆。\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 + \\frac{h^2}{c^2}$$\r\n\r\n            注意：随着 |h| 增大，椭圆不断扩大！这与椭球面形成鲜明对比。\r\n\r\n            **定理 2**：单叶双曲面与平面 y = 0 的交线是双曲线。\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2} - \\frac{z^2}{c^2} = 1$$\r\n\r\n                *↑ 观察单叶双曲面，注意腰部椭圆（红色）和双曲线截面（绿色）*\r\n\r\n            **重要性质**：单叶双曲面是直纹面——它可以由两族直线编织而成！这个性质使其在建筑（如冷却塔）中有重要应用。\r\n\r\n            ### 3.2 双叶双曲面：符号的另一种组合\r\n\r\n            如果两个平方项为负，一个为正：\r\n\r\n\r\n\r\n                $$\\frac{z^2}{c^2} - \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$\r\n\r\n            或等价地写为：\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} - \\frac{z^2}{c^2} = -1$$\r\n\r\n            **关键差异**：\r\n\r\n                - 当 $|z| < c$ 时，方程无实数解，曲面分成两\"叶\"\r\n                - 与 $z = h$（$|h| > c$）的交线是椭圆\r\n                - 与 $x = 0$ 或 $y = 0$ 的交线是双曲线\r\n\r\n                *↑ 观察双叶双曲面，注意被 $z = \\pm c$ 平面分隔的两叶*\r\n\r\n            ## 四、锥面：从圆锥到椭圆锥\r\n\r\n            ### 4.1 方程的齐次性\r\n\r\n> **提示**\r\n> \r\n                **问题**：观察锥面的几何特征——所有母线都通过顶点。这种\"相似性\"在方程中如何体现？\r\n\r\n            若点 (x, y, z) 在曲面上，则对任意 t，点 (tx, ty, tz) 也在曲面上。这意味着方程是**齐次**的（所有项次数相同）。\r\n\r\n            **椭圆锥面标准方程**：\r\n\r\n\r\n\r\n                $$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = \\frac{z^2}{c^2}$$\r\n\r\n            **定理**：锥面与平面 $z = h$（$h \\neq 0$）的交线是椭圆，与平面 $x = 0$ 或 $y = 0$ 的交线是两条相交直线。\r\n\r\n                *↑ 观察椭圆锥面，注意顶点（黄色）和母线（红色）*\r\n\r\n            **与双曲面的关系**：锥面是单叶双曲面和双叶双曲面的\"渐近锥面\"——当双曲面的常数项趋于0时，曲面趋近于锥面。\r\n\r\n            ## 五、柱面：直线的轨迹\r\n\r\n            ### 5.1 柱面的定义与构造\r\n\r\n> **提示**\r\n> \r\n                **问题**：平面曲线（如圆、椭圆、双曲线）如何扩展成三维曲面？\r\n\r\n            **定义**：柱面是由平行于定直线（母线方向）的直线沿定曲线（准线）移动所形成的曲面。\r\n\r\n            若准线在 xy 平面，母线平行于 z 轴，则方程中不含 z。\r\n\r\n            ### 5.2 三种基本柱面\r\n\r\n            <table class=\"formula-table\" style=\"width:100%; border-collapse: collapse; margin: 15px 0;\">\r\n                <tr style=\"background: #f0f0f0;\">\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">类型</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">方程</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">准线</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">特征</th>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">椭圆柱面</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">xy平面椭圆</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">封闭</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">双曲柱面</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">xy平面双曲线</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">两叶开口</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">抛物柱面</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$y^2 = 2px$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">xy平面抛物线</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">单叶开口</td>\r\n                </tr>\r\n            </table>\r\n\r\n                *↑ 椭圆柱面，观察上下底面（绿色椭圆）和母线（红色）*\r\n\r\n            ## 六、二次曲面的系统分类\r\n\r\n            ### 6.1 从标准形看本质\r\n\r\n            所有二次曲面的标准形都可以通过以下要素识别：\r\n\r\n**思考引导**\r\n\r\n                    - **变量个数**：三个变量 $\\to$ 真正三维；两个变量 $\\to$ 柱面\r\n                    <li>**平方项符号**：\r\n                        \r\n                            - 三正 $\\to$ 椭球面\r\n                            - 两正一负 $\\to$ 单叶双曲面\r\n                            - 一正两负 $\\to$ 双叶双曲面\r\n                            - 含零次项（一次项）$\\to$ 抛物面\r\n                        \r\n                    </li>\r\n                    <li>**等号右边**：\r\n                        \r\n                            - $1 \\to$ 标准形（椭球/双曲面）\r\n                            - $0 \\to$ 锥面或柱面\r\n                            - 线性函数 $\\to$ 抛物面\r\n                        \r\n                    </li>\r\n\r\n            ### 6.2 知识结构图\r\n\r\n二次曲面\r\n├── 椭球型（三正项，=1）\r\n│   └── 椭球面（含球面特例）\r\n├── 双曲型（两正一负或一正两负）\r\n│   ├── 单叶双曲面（=1）\r\n│   ├── 双叶双曲面（=-1）\r\n│   └── 渐近锥面（=0）\r\n├── 抛物型（含一次项）\r\n│   ├── 椭圆抛物面\r\n│   └── 双曲抛物面（马鞍面）\r\n└── 柱面型（缺一个变量）\r\n    ├── 椭圆柱面\r\n    ├── 双曲柱面\r\n    └── 抛物柱面\r\n\r\n> ⚠️ **注意**\r\n> \r\n                **学习建议**：不要死记公式，而是理解：\r\n\r\n                    - 每种曲面是如何从更简单的图形（球、抛物线、双曲线）推广而来\r\n                    - 方程中的符号如何影响几何形状\r\n                    - 截面形状与方程的关系\r\n                \r\n                使用右侧的可视化工具，逐一观察每种曲面的特征截面，建立直观认识。"
  }
],
};

export const coordinatesystemsLesson: AdvancedSubLesson = {
  id: 'coordinate-systems',
  title: '坐标系变换',
  has3D: true,
  vizType: 'coordinateTransform',
  blocks: [
  {
    "id": "block-coordinate-systems-0",
    "type": "text",
    "content": "## 柱坐标系\r\n            用 (r, $\\theta$, z) 表示空间中一点：\r\n\r\n                - r：点到 z 轴的距离\r\n                - $\\theta$：点在 xy 平面上投影的极角\r\n                - z：点的竖坐标（与直角坐标相同）\r\n\r\n            ### 与直角坐标的转换\r\n            \r\n\r\n\r\n                $$x = r\\cos\\theta,\\quad y = r\\sin\\theta,\\quad z = z$$\r\n\r\n\r\n\r\n                $$r = \\sqrt{x^2 + y^2},\\quad \\theta = \\arctan\\frac{y}{x},\\quad z = z$$\r\n\r\n            ### 体积元\r\n            \r\n\r\n\r\n                $$dV = r\\, dr\\, d\\theta\\, dz$$\r\n\r\n            ## 球坐标系\r\n            用 $(r, \\theta, \\varphi)$ 表示空间中一点：\r\n\r\n                - r：点到原点的距离\r\n                - $\\theta$：极角（与 z 轴正向的夹角）\r\n                - $\\varphi$：方位角（在 xy 平面上的投影与 x 轴的夹角）\r\n\r\n            ### 与直角坐标的转换\r\n            \r\n\r\n\r\n                $$x = r\\sin\\theta\\cos\\varphi,\\quad y = r\\sin\\theta\\sin\\varphi,\\quad z = r\\cos\\theta$$\r\n\r\n            ### 体积元\r\n            \r\n\r\n\r\n                $$dV = r^2\\sin\\theta\\, dr\\, d\\theta\\, d\\varphi$$\r\n\r\n            ## 坐标系选择指南\r\n            \r\n> **提示**\r\n> \r\n                \r\n                    - **柱坐标**：问题具有轴对称性（如圆柱体、圆锥体）\r\n                    - **球坐标**：问题具有球对称性（如球体、球壳）\r\n                    - **直角坐标**：平面或长方体区域"
  },
  {
    "id": "block-coordinate-systems-1",
    "type": "text",
    "content": "## 坐标变换公式推导\r\n            ### 柱坐标体积元\r\n            \r\n\r\n\r\n                $$dV = r\\, dr\\, d\\theta\\, dz$$\r\n\r\n            推导：考虑由 $r$ 到 $r + dr$，$\\theta$ 到 $\\theta + d\\theta$，$z$ 到 $z + dz$ 的小体积\r\n\r\n            ### 球坐标体积元\r\n            \r\n\r\n\r\n                $$dV = r^2 \\sin\\varphi\\, dr\\, d\\varphi\\, d\\theta$$"
  }
],
};

export const vectorfieldsLesson: AdvancedSubLesson = {
  id: 'vector-fields',
  title: '向量场基础',
  has3D: true,
  vizType: 'vectorField',
  blocks: [
  {
    "id": "block-vector-fields-0",
    "type": "text",
    "content": "## 向量场的定义\r\n            在空间区域 $\\Omega$ 上的向量值函数：\r\n\r\n\r\n\r\n                $$\\mathbf{F}(x, y, z) = P(x,y,z)\\mathbf{i} + Q(x,y,z)\\mathbf{j} + R(x,y,z)\\mathbf{k}$$\r\n\r\n            ## 重要的向量场\r\n\r\n            ### 梯度场（保守场）\r\n            若 $\\mathbf{F} = \\nabla f$，则称 $\\mathbf{F}$ 为梯度场，$f$ 称为势函数。\r\n\r\n\r\n\r\n                $$\\mathbf{F} = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z}\\right)$$\r\n\r\n            ### 旋度场与散度场\r\n            **旋度**（Curl）：\r\n\r\n\r\n\r\n                $$\\nabla \\times \\mathbf{F} = \\left(\\frac{\\partial R}{\\partial y} - \\frac{\\partial Q}{\\partial z},\\ \\frac{\\partial P}{\\partial z} - \\frac{\\partial R}{\\partial x},\\ \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right)$$\r\n\r\n            **散度**（Divergence）：\r\n\r\n\r\n\r\n                $$\\nabla \\cdot \\mathbf{F} = \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z}$$\r\n\r\n            ## 重要恒等式\r\n            \r\n**思考引导**\r\n\r\n\r\n\r\n                    $$\\nabla \\times (\\nabla f) = \\mathbf{0}$$（梯度的旋度为零）\r\n\r\n                    $$\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0$$（旋度的散度为零）\r\n\r\n            ## 物理意义\r\n            \r\n> **提示**\r\n> \r\n                \r\n                    - **梯度场**：表示标量场的变化方向和速率（如温度梯度）\r\n                    - **散度**：表示场的源或汇的强度\r\n                    - **旋度**：表示场的旋转程度"
  },
  {
    "id": "block-vector-fields-1",
    "type": "text",
    "content": "## 向量场的重要公式\r\n            ### 旋度的行列式表示\r\n            \r\n\r\n\r\n                $$\\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ P & Q & R \\end{vmatrix}$$\r\n\r\n            ### 高斯公式（散度定理）\r\n            \r\n\r\n\r\n                $$\\iiint_V (\\nabla \\cdot \\mathbf{F})\\, dV = \\oiint_S \\mathbf{F} \\cdot d\\mathbf{S}$$"
  }
],
};

export const multivariableconceptLesson: AdvancedSubLesson = {
  id: 'multivariable-concept',
  title: '多元函数概念',
  has3D: true,
  vizType: 'surface3D',
  blocks: [
  {
    "id": "block-multivariable-concept-0",
    "type": "text",
    "content": "## 多元函数的定义\r\n            设 $D$ 是 $n$ 维空间 $\\mathbb{R}^n$ 中的一个点集，若对于 $D$ 中每一点 $P(x_1, x_2, \\ldots, x_n)$，变量 $z$ 按照确定的对应法则 $f$ 有唯一确定的值与之对应，则称 $z$ 是 $x_1, x_2, \\ldots, x_n$ 的 $n$ 元函数。\r\n\r\n\r\n\r\n                $$z = f(x_1, x_2, \\ldots, x_n) \\text{ 或 } z = f(P),\\ P \\in D$$\r\n\r\n            ## 二元函数的几何意义\r\n            二元函数 z = f(x, y) 表示三维空间中的一张曲面。\r\n\r\n> **提示**\r\n> \r\n                例如：\r\n\r\n                    - $z = x^2 + y^2$ 表示旋转抛物面\r\n                    - $z = \\sqrt{R^2 - x^2 - y^2}$ 表示上半球面\r\n\r\n            ## 多元函数的极限\r\n            设函数 $f(P)$ 在点 $P_0$ 的某去心邻域内有定义，若存在常数 $A$，使得对于任意 $\\varepsilon > 0$，存在 $\\delta > 0$，当 $0 < |PP_0| < \\delta$ 时，有 $|f(P) - A| < \\varepsilon$。\r\n\r\n\r\n\r\n                $$\\lim_{P \\to P_0} f(P) = A$$\r\n\r\n> ⚠️ **注意**\r\n> \r\n                **重要**：多元函数极限要求点 $P$ 以任意方式趋于 $P_0$ 时，$f(P)$ 都趋于同一值。\r\n\r\n            ## 多元函数的连续性\r\n            若 $\\lim_{P \\to P_0} f(P) = f(P_0)$，则称 $f$ 在 $P_0$ 处连续。\r\n\r\n            ## 有界闭区域上连续函数的性质\r\n            \r\n**思考引导**\r\n\r\n                    - **最值定理**：在有界闭区域上连续的函数必取得最大值和最小值\r\n                    - **介值定理**：连续函数可以取到最大值和最小值之间的一切值"
  }
],
};

export const partialderivativeLesson: AdvancedSubLesson = {
  id: 'partial-derivative',
  title: '偏导数',
  has3D: true,
  vizType: 'partialDerivative',
  blocks: [
  {
    "id": "block-partial-derivative-0",
    "type": "text",
    "content": "## 一、从一元到多元：变化率概念的推广\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：回顾一元函数 $y = f(x)$，导数 $\\frac{dy}{dx}$ 表示：\r\n\r\n                    - 函数在某点的变化率\r\n                    - 切线的斜率\r\n                    - 因变量对自变量的敏感度\r\n                \r\n                **新问题**：对于二元函数 z = f(x, y)，当 x 和 y 都可以变化时，如何描述\"变化率\"？\r\n\r\n            ## 二、偏导数的引入：固定其他变量\r\n\r\n            ### 2.1 基本思想\r\n            当我们讨论多元函数的\"变化率\"时，一个自然的想法是：**一次只让一个变量变化，其他变量保持不变**。\r\n\r\n> **提示**\r\n> \r\n                **物理类比**：考虑理想气体的状态方程 PV = nRT：\r\n\r\n                    - 等容过程（V固定）：温度对压强的影响\r\n                    - 等压过程（P固定）：温度对体积的影响\r\n\r\n            ### 2.2 数学定义\r\n            设函数 $z = f(x, y)$ 在点 $(x_0, y_0)$ 的某邻域内有定义：\r\n\r\n            **对 x 的偏导数**：固定 $y = y_0$，让 $x$ 变化：\r\n\r\n\r\n\r\n                $$f_x(x_0, y_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x, y_0) - f(x_0, y_0)}{\\Delta x} = \\left.\\frac{\\partial z}{\\partial x}\\right|_{(x_0, y_0)}$$\r\n\r\n            **对 y 的偏导数**：固定 $x = x_0$，让 $y$ 变化：\r\n\r\n\r\n\r\n                $$f_y(x_0, y_0) = \\lim_{\\Delta y \\to 0} \\frac{f(x_0, y_0 + \\Delta y) - f(x_0, y_0)}{\\Delta y} = \\left.\\frac{\\partial z}{\\partial y}\\right|_{(x_0, y_0)}$$\r\n\r\n            ## 三、几何意义：切平面的基石\r\n\r\n            ### 3.1 截面曲线的切线\r\n            曲面 $z = f(x, y)$ 与平面 $y = y_0$ 的交线是一条平面曲线：\r\n\r\n\r\n\r\n                $$z = f(x, y_0)$$（这是关于 $x$ 的一元函数）\r\n\r\n            偏导数 $f_x(x_0, y_0)$ 就是这条曲线在点 $(x_0, y_0, f(x_0, y_0))$ 处切线对 $x$ 轴的斜率。\r\n\r\n                **3D可视化演示**：右侧动画展示了曲面 z = f(x,y)、切平面以及偏导数的几何意义。\r\n\r\n                观察：\r\n\r\n                    - 红色平面 $y = y_0$ 与曲面的交线\r\n                    - 绿色箭头表示 $\\frac{\\partial f}{\\partial x}$ 方向的变化率\r\n                    - 切平面由两个偏导数方向的张成\r\n\r\n            ### 3.2 为什么需要两个偏导数？\r\n            曲面上某点的切线有无穷多条（各个方向都有）。但所有这些切线都在由两个特殊切线张成的**切平面**上：\r\n\r\n                - $x$ 方向的切线（斜率为 $f_x$）确定了一条方向\r\n                <li>$y$ 方向的切线（斜率为 $f_y$）确定了另一条方向</li>\r\n                - 这两个不共线的方向张成整个切平面\r\n\r\n            ## 四、计算方法：\"求导时其他变量视为常数\"\r\n\r\n            ### 4.1 基本法则\r\n            求 $\\frac{\\partial f}{\\partial x}$ 时，将 $y$ 视为常数，对 $x$ 求导；求 $\\frac{\\partial f}{\\partial y}$ 时，将 $x$ 视为常数，对 $y$ 求导。\r\n\r\n            **例 1**：$z = x^2y + \\sin(xy)$\r\n\r\n\r\n\r\n                $$\\frac{\\partial z}{\\partial x} = 2xy + y\\cos(xy)$$（$y$ 视为常数）\r\n\r\n                $$\\frac{\\partial z}{\\partial y} = x^2 + x\\cos(xy)$$（$x$ 视为常数）\r\n\r\n            **例 2**：$z = x^y$（幂指函数）\r\n\r\n\r\n\r\n                $$\\frac{\\partial z}{\\partial x} = y \\cdot x^{y-1}$$（$y$ 视为常数，幂函数求导）\r\n\r\n                $$\\frac{\\partial z}{\\partial y} = x^y \\cdot \\ln x$$（$x$ 视为常数，指数函数求导）\r\n\r\n            ## 五、高阶偏导数与混合偏导数\r\n\r\n            ### 5.1 二阶偏导数的定义\r\n            对偏导数再求偏导，得到二阶偏导数：\r\n\r\n\r\n\r\n                $$\\frac{\\partial^2 z}{\\partial x^2} = f_{xx} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial z}{\\partial x}\\right)$$\r\n\r\n                $$\\frac{\\partial^2 z}{\\partial y^2} = f_{yy} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial z}{\\partial y}\\right)$$\r\n\r\n                $$\\frac{\\partial^2 z}{\\partial x \\partial y} = f_{xy} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial z}{\\partial x}\\right)$$（先 $x$ 后 $y$）\r\n\r\n                $$\\frac{\\partial^2 z}{\\partial y \\partial x} = f_{yx} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial z}{\\partial y}\\right)$$（先 $y$ 后 $x$）\r\n\r\n            ### 5.2 混合偏导数定理\r\n\r\n**思考引导**\r\n\r\n                **定理（Clairaut定理）**：若 $f_{xy}$ 和 $f_{yx}$ 在某区域内**连续**，则：\r\n\r\n\r\n\r\n                    $$\\frac{\\partial^2 z}{\\partial x \\partial y} = \\frac{\\partial^2 z}{\\partial y \\partial x}$$\r\n\r\n                即：在连续条件下，混合偏导数与求导顺序无关。\r\n\r\n            **几何意义**：这个结论说明曲面足够\"光滑\"时，沿不同方向的变化率变化是对称的。\r\n\r\n            **反例**：若连续性不满足，混合偏导数可能不相等。例如：\r\n\r\n\r\n\r\n                $$f(x,y) = \\frac{xy(x^2 - y^2)}{x^2 + y^2} \\text{ 当 } (x,y) \\neq (0,0)，\\ f(0,0) = 0$$\r\n\r\n            在原点处 $f_{xy}(0,0) = -1 \\neq 1 = f_{yx}(0,0)$。\r\n\r\n            ## 六、偏导数与连续性的关系\r\n\r\n> ⚠️ **注意**\r\n> \r\n                **重要区别**：与一元函数不同，**偏导数存在 $\\not\\Rightarrow$ 连续**\r\n\r\n                例：$f(x,y) = \\frac{xy}{x^2 + y^2}$ 当 $(x,y) \\neq (0,0)$，$f(0,0) = 0$\r\n\r\n                在原点：$f_x(0,0) = 0$，$f_y(0,0) = 0$ 都存在，但函数在原点不连续！\r\n\r\n                **原因**：偏导数只考虑了沿坐标轴方向的变化，而连续性要求所有方向都趋近。"
  }
],
};

export const totaldifferentialLesson: AdvancedSubLesson = {
  id: 'total-differential',
  title: '全微分',
  has3D: true,
  vizType: 'totalDifferential',
  blocks: [
  {
    "id": "block-total-differential-0",
    "type": "text",
    "content": "## 一、从线性近似到全微分\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：回顾一元函数的微分：\r\n\r\n\r\n\r\n                    $$dy = f'(x)\\, dx，\\quad \\Delta y = f'(x)\\Delta x + o(\\Delta x)$$\r\n\r\n                这表示：函数的微小变化 $\\approx$ 导数 $\\times$ 自变量的微小变化。\r\n\r\n                **问题**：对于多元函数 z = f(x, y)，当 x 和 y 同时有微小变化时，z 的变化如何近似？\r\n\r\n            ## 二、全增量的分解\r\n\r\n            ### 2.1 全增量与全微分\r\n            当自变量从 $(x, y)$ 变到 $(x + \\Delta x, y + \\Delta y)$ 时，函数的**全增量**为：\r\n\r\n\r\n\r\n                $$\\Delta z = f(x + \\Delta x, y + \\Delta y) - f(x, y)$$\r\n\r\n            我们希望将 $\\Delta z$ 分解为：\r\n\r\n\r\n\r\n                $$\\Delta z = A \\cdot \\Delta x + B \\cdot \\Delta y + o\\left(\\sqrt{\\Delta x^2 + \\Delta y^2}\\right)$$\r\n\r\n            其中前两项是**线性主部**，最后一项是高阶无穷小。\r\n\r\n            ### 2.2 系数 A 和 B 的确定\r\n\r\n            **定理**：若 $f$ 可微，则 $A = \\frac{\\partial z}{\\partial x}$，$B = \\frac{\\partial z}{\\partial y}$。\r\n\r\n            **证明**：\r\n\r\n            (1) 令 $\\Delta y = 0$，则：\r\n\r\n\r\n\r\n                $$f(x + \\Delta x, y) - f(x, y) = A \\cdot \\Delta x + o(|\\Delta x|)$$\r\n\r\n            两边除以 $\\Delta x$ 并令 $\\Delta x \\to 0$：\r\n\r\n\r\n\r\n                $$\\frac{\\partial z}{\\partial x} = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x, y) - f(x, y)}{\\Delta x} = A$$\r\n\r\n            同理可得 $B = \\frac{\\partial z}{\\partial y}$。\r\n\r\n            ## 三、全微分的定义与公式\r\n\r\n> **提示**\r\n> \r\n                **定义**：若函数 z = f(x, y) 在点 (x, y) 的全增量可表示为：\r\n\r\n\r\n\r\n                    $$\\Delta z = \\frac{\\partial z}{\\partial x}\\Delta x + \\frac{\\partial z}{\\partial y}\\Delta y + o\\left(\\sqrt{\\Delta x^2 + \\Delta y^2}\\right)$$\r\n\r\n                则称 f 在 (x, y) **可微**，并称线性主部为**全微分**：\r\n\r\n\r\n\r\n                    $$dz = \\frac{\\partial z}{\\partial x}dx + \\frac{\\partial z}{\\partial y}dy$$\r\n\r\n                **3D可视化演示**：右侧展示了全微分的几何意义。\r\n\r\n                    - 红色点 $P_0$：基准点\r\n                    - 绿色点 P：变化后的点\r\n                    - 蓝色虚线：实际变化 $\\Delta z$\r\n                    - 黄色虚线：全微分 $dz$（线性近似）\r\n                \r\n                观察：当 $(dx, dy)$ 越小时，$dz$ 与 $\\Delta z$ 的差异越小。\r\n\r\n            ## 四、可微的条件\r\n\r\n            ### 4.1 必要条件与充分条件\r\n\r\n**思考引导**\r\n\r\n                    - **必要条件**：可微 $\\Rightarrow$ 偏导数存在\r\n                    - **充分条件**：偏导数连续 $\\Rightarrow$ 可微\r\n\r\n            **注意**：偏导数存在 $\\not\\Rightarrow$ 可微。例：\r\n\r\n\r\n\r\n                $$f(x,y) = \\frac{xy}{\\sqrt{x^2 + y^2}} \\text{ 当 } (x,y) \\neq (0,0)，\\ f(0,0) = 0$$\r\n\r\n            在原点偏导数存在，但不可微。\r\n\r\n            ### 4.2 概念的层次关系\r\n\r\n            对于多元函数，概念的强弱关系为：\r\n\r\n\r\n\r\n                $$\\text{偏导数连续} \\Rightarrow \\text{可微} \\Rightarrow \\{\\text{偏导数存在，连续}\\}$$\r\n\r\n            注意：偏导数存在与连续之间没有蕴含关系！\r\n\r\n            ## 五、全微分的应用：近似计算\r\n\r\n            ### 5.1 近似公式\r\n            当 $|Delta x|$ 和 $|Delta y|$ 都很小时：\r\n\r\n\r\n\r\n                $$f(x + \\Delta x, y + \\Delta y) \\approx f(x, y) + f_x(x,y)\\Delta x + f_y(x,y)\\Delta y$$\r\n\r\n            ### 5.2 误差估计\r\n            利用全微分可以估计函数的绝对误差和相对误差：\r\n\r\n\r\n\r\n                $$|\\Delta z| \\approx |dz| = |f_x||\\Delta x| + |f_y||\\Delta y|$$\r\n\r\n            **例**：计算圆柱体体积 $V = \\pi r^2 h$ 的误差。\r\n\r\n\r\n\r\n                $$dV = \\frac{\\partial V}{\\partial r}dr + \\frac{\\partial V}{\\partial h}dh = 2\\pi r h\\, dr + \\pi r^2\\, dh$$\r\n\r\n            若 $r = 10\\,\\text{cm}$，$h = 20\\,\\text{cm}$，测量误差 $|dr| \\leq 0.1\\,\\text{cm}$，$|dh| \\leq 0.1\\,\\text{cm}$：\r\n\r\n\r\n\r\n                $$|dV| \\leq 2\\pi \\cdot 10 \\cdot 20 \\cdot 0.1 + \\pi \\cdot 100 \\cdot 0.1 = 40\\pi + 10\\pi = 50\\pi \\approx 157\\ \\text{cm}^3$$\r\n\r\n            用于近似计算和误差估计。"
  }
],
};

export const chainruleLesson: AdvancedSubLesson = {
  id: 'chain-rule',
  title: '链式法则',
  has3D: true,
  vizType: 'chainRule',
  blocks: [
  {
    "id": "block-chain-rule-0",
    "type": "text",
    "content": "## 一、从一元到多元：链式法则的推广\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：回顾一元函数的链式法则：\r\n\r\n\r\n\r\n                    $$y = f(u)，\\ u = g(x) \\Rightarrow \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} = f'(u) \\cdot g'(x)$$\r\n\r\n                这是\"变化率的传递\"。**问题**：对于多元复合函数，这个法则如何推广？\r\n\r\n            ## 二、多元复合的直观理解\r\n\r\n            ### 2.1 问题的复杂性\r\n            设 z = f(u, v)，其中 u = u(x, y)，v = v(x, y)。\r\n\r\n> **提示**\r\n> \r\n                **结构分析**：\r\n\r\n                    - $z$ 通过两条路径依赖于 $x$：$z \\to u \\to x$ 和 $z \\to v \\to x$\r\n                    - 每条路径都贡献了一个\"变化率传递\"\r\n                    - 总的变化率应该是各路径贡献之和\r\n\r\n            ### 2.2 链式法则的推导\r\n            **定理**：在上述复合关系下：\r\n\r\n\r\n\r\n                $$\\frac{\\partial z}{\\partial x} = \\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial x} + \\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial x}$$\r\n\r\n            **证明思路**：\r\n\r\n            当 x 变化 $Delta x$（y 固定）时：\r\n\r\n                - $u$ 的变化引起 $z$ 的变化：$\\Delta z_1 \\approx \\frac{\\partial z}{\\partial u}\\frac{\\partial u}{\\partial x}\\Delta x$\r\n                - $v$ 的变化引起 $z$ 的变化：$\\Delta z_2 \\approx \\frac{\\partial z}{\\partial v}\\frac{\\partial v}{\\partial x}\\Delta x$\r\n                - 总变化：$\\Delta z \\approx \\Delta z_1 + \\Delta z_2$\r\n\r\n            两边除以 $\\Delta x$ 并取极限即得公式。\r\n\r\n            ## 三、链式法则的一般形式\r\n\r\n            ### 3.1 不同复合结构的公式\r\n\r\n            <table class=\"formula-table\" style=\"width:100%; border-collapse: collapse; margin: 15px 0;\">\r\n                <tr style=\"background: #f0f0f0;\">\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">复合结构</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">链式法则</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">说明</th>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">z = f(u,v)\r\nu = u(t), v = v(t)</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$\\frac{dz}{dt} = z_u \\cdot u' + z_v \\cdot v'$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">全导数（一元）</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">z = f(u,v)\r\nu = u(x,y), v = v(x,y)</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$z_x = z_u \\cdot u_x + z_v \\cdot v_x$\r\n$z_y = z_u \\cdot u_y + z_v \\cdot v_y$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">偏导数（二元）</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">z = f(u)\r\nu = u(x,y)</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$z_x = \\frac{dz}{du} \\cdot u_x$\r\n$z_y = \\frac{dz}{du} \\cdot u_y$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">单中间变量</td>\r\n                </tr>\r\n            </table>\r\n\r\n                **3D可视化演示**：右侧展示了复合函数的依赖关系。\r\n\r\n                观察：中间变量 u, v 如何作为\"桥梁\"将 z 与 x, y 连接起来。\r\n\r\n            ## 四、全微分形式不变性\r\n\r\n            ### 4.1 核心定理\r\n            **定理**：无论 u, v 是自变量还是中间变量，全微分形式不变：\r\n\r\n\r\n\r\n                $$dz = \\frac{\\partial z}{\\partial u}du + \\frac{\\partial z}{\\partial v}dv$$\r\n\r\n            **意义**：这个性质使得我们在计算全微分时，不需要关心变量的身份，统一按微分法则处理即可。\r\n\r\n            ### 4.2 应用：隐函数求导\r\n            利用全微分形式不变性，可以方便地求隐函数的导数。\r\n\r\n            **例**：设 F(x,y,z) = 0，求全微分：\r\n\r\n\r\n\r\n                $$F_x\\, dx + F_y\\, dy + F_z\\, dz = 0$$\r\n\r\n            解出 $dz = -\\frac{F_x}{F_z}dx - \\frac{F_y}{F_z}dy$，即得偏导数。\r\n\r\n            ## 五、高阶偏导数的链式法则\r\n\r\n            ### 5.1 复杂性来源\r\n            求二阶偏导数时，$\\frac{\\partial z}{\\partial u}$ 和 $\\frac{\\partial z}{\\partial v}$ 通常仍是 $u, v$ 的函数，而 $u, v$ 又是 $x, y$ 的函数，因此：\r\n\r\n\r\n\r\n                $$\\begin{aligned} \\frac{\\partial^2 z}{\\partial x^2} &= \\frac{\\partial}{\\partial x}\\left(z_u \\cdot u_x + z_v \\cdot v_x\\right) \\\\ &= (z_{uu} \\cdot u_x + z_{uv} \\cdot v_x)u_x + z_u \\cdot u_{xx} + (z_{vu} \\cdot u_x + z_{vv} \\cdot v_x)v_x + z_v \\cdot v_{xx} \\end{aligned}$$\r\n\r\n> ⚠️ **注意**\r\n> \r\n                **注意**：不要漏掉任何一项！建议使用树状图辅助分析依赖关系。\r\n\r\n            ### 5.2 计算技巧\r\n            \r\n                - 画变量依赖图，明确各变量的关系\r\n                - 逐层应用链式法则\r\n                - 注意区分 $\\frac{\\partial z}{\\partial x}$（把 $y$ 固定）和 $\\frac{dz}{dx}$（若 $x$ 是中间变量）\r\n\r\n            ## 六、与一元函数链式法则的联系\r\n\r\n            多元链式法则本质上是一元链式法则的推广：\r\n\r\n\r\n\r\n                $$\\frac{dz}{dx} = \\sum_i \\frac{\\partial z}{\\partial u_i}\\frac{du_i}{dx}$$（对所有路径求和）\r\n\r\n            这可以看作\"变化率的叠加原理\"——当 z 通过多条路径影响 x 时，总的变化率是各路径变化率的代数和。"
  }
],
};

export const implicitfunctionLesson: AdvancedSubLesson = {
  id: 'implicit-function',
  title: '隐函数求导',
  has3D: true,
  vizType: 'implicitFunction',
  blocks: [
  {
    "id": "block-implicit-function-0",
    "type": "text",
    "content": "## 一、显函数与隐函数\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：我们已经学习了显函数 y = f(x) 的求导方法。但很多时候，变量之间的关系是以方程形式给出的：\r\n\r\n\r\n\r\n                    $$x^2 + y^2 = 1，\\ \\text{或}\\ e^{xy} + x^2y = 0$$\r\n\r\n                **问题**：如何求这类函数中 y 关于 x 的导数？\r\n\r\n            ### 1.1 隐函数的概念\r\n            由方程 F(x, y) = 0 确定的函数 y = y(x) 称为**隐函数**。\r\n\r\n            有些隐函数可以\"解出\"显式表达式（如 $x^2 + y^2 = 1$ 解得 $y = \\pm\\sqrt{1 - x^2}$），但很多情况下无法或很难解出。\r\n\r\n            ## 二、隐函数存在定理\r\n\r\n            ### 2.1 存在性与可导性\r\n            \r\n> **提示**\r\n> \r\n                **定理（隐函数存在定理）**：设 $F(x, y)$ 在点 $(x_0, y_0)$ 的某邻域内：\r\n\r\n                    - 具有连续偏导数 $F_x$ 和 $F_y$\r\n                    - $F(x_0, y_0) = 0$（点在曲线上）\r\n                    - $F_y(x_0, y_0) \\neq 0$\r\n                \r\n                则方程 $F(x, y) = 0$ 在 $x_0$ 的某邻域内唯一确定一个连续可导的函数 $y = f(x)$，且 $y_0 = f(x_0)$。\r\n\r\n            ### 2.2 为什么需要 $F_y \\neq 0$？\r\n            这保证了在该点附近，y 可以表示为 x 的函数（曲线不垂直）。\r\n\r\n            ## 三、隐函数求导公式\r\n\r\n            ### 3.1 推导过程\r\n            设 y = y(x) 由 F(x, y) = 0 确定。两边对 x 求全导数：\r\n\r\n\r\n\r\n                $$\\frac{dF}{dx} = \\frac{\\partial F}{\\partial x} + \\frac{\\partial F}{\\partial y}\\frac{dy}{dx} = 0$$\r\n\r\n            解得：\r\n\r\n\r\n\r\n                $$\\frac{dy}{dx} = -\\frac{\\partial F/\\partial x}{\\partial F/\\partial y} = -\\frac{F_x}{F_y}$$\r\n\r\n            ### 3.2 二元隐函数\r\n            对于 F(x, y, z) = 0 确定的 z = z(x, y)：\r\n\r\n\r\n\r\n                $$\\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z}$$\r\n\r\n                $$\\frac{\\partial z}{\\partial y} = -\\frac{F_y}{F_z}$$\r\n\r\n            ## 四、几何意义\r\n\r\n                **3D可视化演示**：右侧展示了隐函数曲线（等高线）和梯度向量。\r\n\r\n                    - 等高线：F(x,y) = C\r\n                    - 梯度 $\\nabla F$ 垂直于等高线\r\n                    - 切线方向与梯度垂直\r\n\r\n            ### 4.1 切线与法线\r\n            曲线 $F(x, y) = 0$ 在点 $(x_0, y_0)$ 处：\r\n\r\n                - **切线斜率**：$k = -\\frac{F_x}{F_y}$\r\n                - **法线方向**：$(F_x, F_y)$，即梯度方向\r\n\r\n            ## 五、全微分法\r\n\r\n            ### 5.1 方法原理\r\n            对方程 F(x, y) = 0 两边求全微分：\r\n\r\n\r\n\r\n                $$dF = F_x\\, dx + F_y\\, dy = 0$$\r\n\r\n            解出 $dy = -\\frac{F_x}{F_y}dx$，即得导数。\r\n\r\n            ### 5.2 优势\r\n            全微分法不需要区分自变量和因变量，适用于复杂情况。\r\n\r\n            ## 六、方程组的情形\r\n\r\n            对于方程组 {F(x, y, u, v) = 0, G(x, y, u, v) = 0}，确定 u = u(x,y), v = v(x,y)：\r\n\r\n\r\n\r\n                $$J = \\frac{\\partial(F,G)}{\\partial(u,v)} = \\begin{vmatrix} F_u & F_v \\\\ G_u & G_v \\end{vmatrix}$$\r\n\r\n            当 $J \\neq 0$ 时，由克莱姆法则可解得 $\\frac{\\partial u}{\\partial x}, \\frac{\\partial u}{\\partial y}, \\frac{\\partial v}{\\partial x}, \\frac{\\partial v}{\\partial y}$。"
  }
],
};

export const directionalderivativeLesson: AdvancedSubLesson = {
  id: 'directional-derivative',
  title: '方向导数与梯度',
  has3D: true,
  vizType: 'gradient',
  blocks: [
  {
    "id": "block-directional-derivative-0",
    "type": "text",
    "content": "## 一、从偏导数到方向导数\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：偏导数描述了函数沿坐标轴方向的变化率。但在实际问题中，变化可能发生在任意方向：\r\n\r\n                    - 山坡上沿任意方向的坡度（最速下降法）\r\n                    - 温度场中沿任意方向的变化率\r\n                    - 电位场中电荷受力的方向\r\n                \r\n                **问题**：如何定义和计算函数沿任意方向的变化率？\r\n\r\n            ## 二、方向导数的定义\r\n\r\n            ### 2.1 数学定义\r\n            设函数 z = f(x, y) 在点 P(x, y) 的某邻域内有定义，**l** 为从 P 出发的射线，方向向量为 $\\mathbf{e} = (\\cos\\alpha, \\cos\\beta)$（单位向量），则方向导数为：\r\n\r\n\r\n\r\n                $$\\frac{\\partial f}{\\partial l} = \\lim_{\\rho \\to 0^+} \\frac{f(x + \\rho\\cos\\alpha,\\ y + \\rho\\cos\\beta) - f(x, y)}{\\rho}$$\r\n\r\n            ### 2.2 与偏导数的关系\r\n            当 $\\mathbf{e} = (1, 0)$ 时，$\\frac{\\partial f}{\\partial l} = \\frac{\\partial f}{\\partial x}$（沿 $x$ 轴方向）\r\n\r\n            当 $\\mathbf{e} = (0, 1)$ 时，$\\frac{\\partial f}{\\partial l} = \\frac{\\partial f}{\\partial y}$（沿 $y$ 轴方向）\r\n\r\n            因此，方向导数是偏导数的推广。\r\n\r\n            ## 三、方向导数的计算\r\n\r\n            ### 3.1 计算公式\r\n            **定理**：若 f 可微，则\r\n\r\n\r\n\r\n                $$\\frac{\\partial f}{\\partial l} = f_x\\cos\\alpha + f_y\\cos\\beta = \\nabla f \\cdot \\mathbf{e}$$\r\n\r\n            ### 3.2 推导\r\n            由全微分公式：\r\n\r\n\r\n\r\n                $$\\Delta f \\approx f_x\\Delta x + f_y\\Delta y = f_x \\cdot \\rho\\cos\\alpha + f_y \\cdot \\rho\\cos\\beta$$\r\n\r\n            因此：\r\n\r\n\r\n\r\n                $$\\frac{\\partial f}{\\partial l} = \\lim_{\\rho \\to 0} \\frac{\\Delta f}{\\rho} = f_x\\cos\\alpha + f_y\\cos\\beta$$\r\n\r\n            ## 四、梯度的定义与性质\r\n\r\n            ### 4.1 梯度的定义\r\n            从方向导数公式 $\\frac{\\partial f}{\\partial l} = f_x\\cos\\alpha + f_y\\cos\\beta$ 可以看出，这恰好是向量 $(f_x, f_y)$ 与单位方向向量的点积。\r\n\r\n> **提示**\r\n> \r\n                **定义**：函数 f 的**梯度**（gradient）定义为：\r\n\r\n\r\n\r\n                    $$\\nabla f = (f_x, f_y) = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right)$$\r\n\r\n                （$\\nabla$ 读作 \"nabla\" 或 \"del\"）\r\n\r\n            ### 4.2 方向导数与梯度的关系\r\n\r\n\r\n\r\n                $$\\frac{\\partial f}{\\partial l} = \\nabla f \\cdot \\mathbf{e} = |\\nabla f|\\cos\\theta$$\r\n\r\n            其中 $\\theta$ 是梯度方向与方向 **l** 的夹角。\r\n\r\n            ## 五、梯度的几何意义\r\n\r\n                **3D可视化演示**：右侧展示了梯度向量和等值线。\r\n\r\n                    - 红色箭头：梯度 $\\nabla f$（指向增长最快方向）\r\n                    - 蓝色曲线：等值线 f(x,y) = C\r\n                    - 观察：梯度始终垂直于等值线\r\n\r\n            ### 5.1 最大变化率\r\n            由 $\\frac{\\partial f}{\\partial l} = |\\nabla f|\\cos\\theta$ 可知：\r\n\r\n**思考引导**\r\n\r\n                    - 当 $\\theta = 0$（沿梯度方向）：$\\frac{\\partial f}{\\partial l} = |\\nabla f|$（最大）\r\n                    - 当 $\\theta = \\pi$（沿负梯度方向）：$\\frac{\\partial f}{\\partial l} = -|\\nabla f|$（最小）\r\n                    - 当 $\\theta = \\frac{\\pi}{2}$（垂直于梯度）：$\\frac{\\partial f}{\\partial l} = 0$（等值线方向）\r\n\r\n            ### 5.2 梯度的三个关键性质\r\n\r\n                - **方向**：梯度方向是函数值增长最快的方向\r\n                - **大小**：$|\\nabla f|$ 是最大方向导数\r\n                - **正交性**：梯度垂直于等值面（线）\r\n\r\n            ## 六、三元函数的推广\r\n\r\n            对于 f(x, y, z)：\r\n\r\n\r\n\r\n                $$\\nabla f = (f_x, f_y, f_z) = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z}\\right)$$\r\n\r\n\r\n\r\n                $$\\frac{\\partial f}{\\partial l} = \\nabla f \\cdot \\mathbf{e} = f_x\\cos\\alpha + f_y\\cos\\beta + f_z\\cos\\gamma$$\r\n\r\n            梯度 $\\nabla f$ 是等值面 $f(x,y,z) = C$ 的法向量。\r\n\r\n            ## 七、应用\r\n\r\n            ### 7.1 最速下降法\r\n            在优化问题中，沿负梯度方向搜索可以最快地减小函数值。\r\n\r\n            ### 7.2 热传导\r\n            热流方向与温度梯度方向相反（从高温流向低温）。\r\n\r\n            ### 7.3 电场\r\n            电场强度 $\\mathbf{E} = -\\nabla\\varphi$，其中 $\\varphi$ 是电位。"
  }
],
};

export const extremaLesson: AdvancedSubLesson = {
  id: 'extrema',
  title: '多元函数极值',
  has3D: true,
  vizType: 'extrema',
  blocks: [
  {
    "id": "block-extrema-0",
    "type": "text",
    "content": "## 极值的定义\r\n            设函数 $z = f(x, y)$ 在点 $(x_0, y_0)$ 的某邻域内有定义，若对该邻域内任意点 $(x, y) \\neq (x_0, y_0)$，有\r\n\r\n\r\n\r\n                $$f(x, y) < f(x_0, y_0) \\text{（极大值）}$$\r\n\r\n                $$f(x, y) > f(x_0, y_0) \\text{（极小值）}$$\r\n\r\n            ## 极值的必要条件\r\n            若 $f$ 在 $(x_0, y_0)$ 处可偏导且取极值，则\r\n\r\n\r\n\r\n                $$f_x(x_0, y_0) = 0,\\quad f_y(x_0, y_0) = 0$$\r\n\r\n            满足上述条件的点称为**驻点**。\r\n\r\n            ## 极值的充分条件\r\n            设 $f$ 在 $(x_0, y_0)$ 的某邻域内有连续二阶偏导数，且 $(x_0, y_0)$ 是驻点。记\r\n\r\n\r\n\r\n                $$A = f_{xx}(x_0, y_0),\\ B = f_{xy}(x_0, y_0),\\ C = f_{yy}(x_0, y_0)$$\r\n\r\n                $$\\Delta = AC - B^2$$\r\n\r\n**思考引导**\r\n\r\n                    - $\\Delta > 0$ 且 $A > 0$：极小值\r\n                    - $\\Delta > 0$ 且 $A < 0$：极大值\r\n                    - $\\Delta < 0$：不是极值（鞍点）\r\n                    - $\\Delta = 0$：无法判断\r\n\r\n            ## 条件极值（拉格朗日乘数法）\r\n            求函数 $f(x, y)$ 在约束条件 $\\varphi(x, y) = 0$ 下的极值。\r\n\r\n            构造拉格朗日函数：\r\n\r\n\r\n\r\n                $$L(x, y, \\lambda) = f(x, y) + \\lambda \\cdot \\varphi(x, y)$$\r\n\r\n            解方程组：\r\n\r\n\r\n\r\n                $$\\begin{cases} L_x = f_x + \\lambda\\varphi_x = 0 \\\\ L_y = f_y + \\lambda\\varphi_y = 0 \\\\ L_\\lambda = \\varphi = 0 \\end{cases}$$\r\n\r\n            ## 最大值与最小值\r\n            \r\n> **提示**\r\n> \r\n                在有界闭区域 D 上求最值的步骤：\r\n\r\n                    - 求 D 内部所有驻点的函数值\r\n                    - 求边界上的最值\r\n                    - 比较上述值，最大者为最大值，最小者为最小值"
  }
],
};

export const taylorLesson: AdvancedSubLesson = {
  id: 'taylor',
  title: '泰勒展开',
  has3D: true,
  vizType: 'taylor',
  blocks: [
  {
    "id": "block-taylor-0",
    "type": "text",
    "content": "## 二元函数的泰勒公式\r\n            设 $f(x, y)$ 在点 $(x_0, y_0)$ 的某邻域内有直到 $n+1$ 阶的连续偏导数，则\r\n\r\n            ### 一阶泰勒展开（带拉格朗日余项）\r\n            \r\n\r\n\r\n                $$f(x_0 + h,\\ y_0 + k) = f(x_0, y_0) + f_x(x_0, y_0)h + f_y(x_0, y_0)k + R_1$$\r\n\r\n            ### 二阶泰勒展开\r\n            \r\n\r\n\r\n                $$\\begin{aligned} f(x_0 + h,\\ y_0 + k) \\approx &\\ f(x_0, y_0) \\\\ &+ \\left(h\\frac{\\partial}{\\partial x} + k\\frac{\\partial}{\\partial y}\\right)f(x_0, y_0) \\\\ &+ \\frac{1}{2!}\\left(h\\frac{\\partial}{\\partial x} + k\\frac{\\partial}{\\partial y}\\right)^2 f(x_0, y_0) \\end{aligned}$$\r\n\r\n            展开形式：\r\n\r\n\r\n\r\n                $$\\begin{aligned} =&\\ f(x_0, y_0) \\\\ &+ f_x \\cdot h + f_y \\cdot k \\\\ &+ \\frac{1}{2}\\left[f_{xx} \\cdot h^2 + 2f_{xy} \\cdot hk + f_{yy} \\cdot k^2\\right] \\end{aligned}$$\r\n\r\n            ## 矩阵表示\r\n            令 $\\mathbf{h} = (h, k)$，$H$ 为 Hessian 矩阵：\r\n\r\n\r\n\r\n                $$H = \\begin{bmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{bmatrix}$$\r\n\r\n\r\n\r\n                $$f(x_0 + h,\\ y_0 + k) \\approx f(x_0, y_0) + \\nabla f \\cdot \\mathbf{h} + \\frac{1}{2}\\mathbf{h}^T H \\mathbf{h}$$\r\n\r\n            ## 极值的二次型判别\r\n            \r\n> **提示**\r\n> \r\n                Hessian 矩阵正定 $\\Rightarrow$ 极小值\r\n\r\n                Hessian 矩阵负定 $\\Rightarrow$ 极大值\r\n\r\n                Hessian 矩阵不定 $\\Rightarrow$ 鞍点"
  },
  {
    "id": "block-taylor-1",
    "type": "text",
    "content": "## 泰勒公式推导\r\n            ### 单变量泰勒展开回顾\r\n            \r\n\r\n\r\n                $$f(x) = f(x_0) + f'(x_0)(x - x_0) + \\frac{f''(x_0)}{2!}(x - x_0)^2 + \\cdots$$\r\n\r\n            ### 推广到多变量\r\n            使用方向导数的概念，沿方向 $\\mathbf{h} = (h, k)$ 展开：\r\n\r\n\r\n\r\n                $$\\begin{aligned} g(t) &= f(x_0 + th,\\ y_0 + tk) \\\\ g'(t) &= \\left(h\\frac{\\partial}{\\partial x} + k\\frac{\\partial}{\\partial y}\\right)f(x_0 + th,\\ y_0 + tk) \\\\ g''(t) &= \\left(h\\frac{\\partial}{\\partial x} + k\\frac{\\partial}{\\partial y}\\right)^2 f(x_0 + th,\\ y_0 + tk) \\end{aligned}$$"
  }
],
};

export const lagrangeLesson: AdvancedSubLesson = {
  id: 'lagrange',
  title: '拉格朗日乘数法',
  has3D: true,
  vizType: 'lagrange',
  blocks: [
  {
    "id": "block-lagrange-0",
    "type": "text",
    "content": "## 单约束条件\r\n            求 $f(x, y)$ 在约束 $\\varphi(x, y) = 0$ 下的极值。\r\n\r\n            ### 拉格朗日函数\r\n            \r\n\r\n\r\n                $$L(x, y, \\lambda) = f(x, y) + \\lambda \\cdot \\varphi(x, y)$$\r\n\r\n            ### 极值必要条件\r\n            \r\n\r\n\r\n                $$\\begin{cases} \\frac{\\partial L}{\\partial x} = \\frac{\\partial f}{\\partial x} + \\lambda\\frac{\\partial \\varphi}{\\partial x} = 0 \\\\ \\frac{\\partial L}{\\partial y} = \\frac{\\partial f}{\\partial y} + \\lambda\\frac{\\partial \\varphi}{\\partial y} = 0 \\\\ \\frac{\\partial L}{\\partial \\lambda} = \\varphi(x, y) = 0 \\end{cases}$$\r\n\r\n            ## 多约束条件\r\n            求 $f(x, y, z)$ 在约束 $\\varphi(x, y, z) = 0$ 和 $\\psi(x, y, z) = 0$ 下的极值。\r\n\r\n\r\n\r\n                $$L(x, y, z, \\lambda, \\mu) = f(x, y, z) + \\lambda \\cdot \\varphi(x, y, z) + \\mu \\cdot \\psi(x, y, z)$$\r\n\r\n            ## 几何解释\r\n            \r\n**思考引导**\r\n\r\n                在最优解处，目标函数的梯度与约束条件的梯度共线：\r\n\r\n\r\n\r\n                    $$\\nabla f = -\\lambda \\nabla \\varphi$$\r\n\r\n                即：目标函数的等值线与约束曲线相切。\r\n\r\n            ## 应用步骤\r\n            \r\n> **提示**\r\n> \r\n                \r\n                    - 构造拉格朗日函数\r\n                    - 对各变量求偏导并令其为零\r\n                    - 解方程组得到驻点\r\n                    - 根据实际问题判断极值类型"
  },
  {
    "id": "block-lagrange-1",
    "type": "text",
    "content": "## 拉格朗日乘数法推导\r\n            ### 单约束情况\r\n            设 $f(x,y)$ 在约束 $\\varphi(x,y) = 0$ 下取极值。\r\n\r\n            沿约束曲线 $\\varphi(x,y) = 0$，故 $d\\varphi = \\varphi_x\\, dx + \\varphi_y\\, dy = 0$\r\n\r\n            在极值点，$df = f_x\\, dx + f_y\\, dy = 0$\r\n\r\n\r\n\r\n                $$\\text{由隐函数定理，存在 } \\lambda \\text{ 使得 } (f_x, f_y) = \\lambda(\\varphi_x, \\varphi_y)$$\r\n\r\n            ### 经济学解释\r\n            $\\lambda$ 称为影子价格，表示约束条件右端项每增加 1 单位时，目标函数的边际变化。"
  }
],
};

export const integralconceptLesson: AdvancedSubLesson = {
  id: 'integral-concept',
  title: '重积分概念',
  has3D: true,
  vizType: 'doubleIntegral',
  blocks: [
  {
    "id": "block-integral-concept-0",
    "type": "text",
    "content": "## 一、从定积分到重积分\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：回顾一元函数的定积分：\r\n\r\n\r\n\r\n                    $$\\int_a^b f(x)\\, dx = \\lim_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i)\\Delta x_i$$\r\n\r\n                它表示曲边梯形的面积。\r\n\r\n                **问题**：如何计算曲面 $z = f(x,y)$ 下方的体积？如何计算平面薄板的质量？\r\n\r\n            ## 二、二重积分的定义\r\n\r\n            ### 2.1 问题建模\r\n            考虑曲顶柱体：底面是 xy 平面上的区域 D，顶面是曲面 $z = f(x,y)$（$f(x,y) \\geq 0$）。\r\n\r\n            **四步法**（与定积分类似）：\r\n\r\n                - **分割**：将 $D$ 分成 $n$ 个小区域 $\\Delta\\sigma_i$\r\n                - **近似**：每个小区域上方的小曲顶柱体体积 $\\approx f(\\xi_i, \\eta_i)\\Delta\\sigma_i$\r\n                - **求和**：$V \\approx \\sum_{i=1}^{n} f(\\xi_i, \\eta_i)\\Delta\\sigma_i$\r\n                - **取极限**：令最大直径 $\\lambda \\to 0$\r\n\r\n            ### 2.2 数学定义\r\n            \r\n> **提示**\r\n> \r\n                **定义**：设 $f(x, y)$ 在有界闭区域 $D$ 上有界，若极限\r\n\r\n\r\n\r\n                    $$\\iint_D f(x, y)\\, d\\sigma = \\lim_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i)\\Delta\\sigma_i$$\r\n\r\n                存在且与分割方式、取点方式无关，则称此极限为 $f$ 在 $D$ 上的**二重积分**。\r\n\r\n            ### 2.3 几何与物理意义\r\n\r\n            <table class=\"formula-table\" style=\"width:100%; border-collapse: collapse; margin: 15px 0;\">\r\n                <tr style=\"background: #f0f0f0;\">\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">被积函数</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">几何意义</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">物理意义</th>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$f(x,y) = 1$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">区域 D 的面积</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">—</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$f(x,y) \\geq 0$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">曲顶柱体的体积</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">质量（f 为面密度）</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$f(x,y)$ 有正有负</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">体积的代数和</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">—</td>\r\n                </tr>\r\n            </table>\r\n\r\n            ## 三、三重积分\r\n\r\n\r\n\r\n                $$\\iiint_V f(x, y, z)\\, dV = \\lim_{\\lambda \\to 0} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i, \\zeta_i)\\Delta V_i$$\r\n\r\n            物理意义：空间物体的质量（$f$ 为体密度）。\r\n\r\n            ## 四、基本性质\r\n\r\n            ### 4.1 线性性质\r\n            \r\n\r\n\r\n                $$\\iint_D (\\alpha f + \\beta g)\\, d\\sigma = \\alpha \\iint_D f\\, d\\sigma + \\beta \\iint_D g\\, d\\sigma$$\r\n\r\n            ### 4.2 区域可加性\r\n            若 $D = D_1 \\cup D_2$ 且 $D_1, D_2$ 无重叠内部，则：\r\n\r\n\r\n\r\n                $$\\iint_D f\\, d\\sigma = \\iint_{D_1} f\\, d\\sigma + \\iint_{D_2} f\\, d\\sigma$$\r\n\r\n            ### 4.3 积分中值定理\r\n            \r\n**思考引导**\r\n\r\n                **定理**：若 $f$ 在 $D$ 上连续，则存在 $(\\xi, \\eta) \\in D$，使得：\r\n\r\n\r\n\r\n                    $$\\iint_D f(x,y)\\, d\\sigma = f(\\xi, \\eta) \\cdot |D|$$\r\n\r\n                其中 $|D|$ 是区域 $D$ 的面积。\r\n\r\n            **几何解释**：存在一个高度为 $f(\\xi, \\eta)$ 的平顶柱体，其体积恰好等于曲顶柱体的体积。\r\n\r\n            ## 五、对称性的应用\r\n\r\n                **3D可视化演示**：右侧展示了曲顶柱体的体积计算。\r\n\r\n            ### 5.1 对称性简化计算\r\n\r\n> **提示**\r\n> \r\n                若 D 关于 x 轴对称：\r\n\r\n                    - $f(x, -y) = -f(x, y)$（关于 $y$ 为奇函数）$\\Rightarrow \\iint_D f\\, d\\sigma = 0$\r\n                    - $f(x, -y) = f(x, y)$（关于 $y$ 为偶函数）$\\Rightarrow \\iint_D f\\, d\\sigma = 2\\iint_{D_+} f\\, d\\sigma$\r\n                \r\n                其中 $D_+$ 是 $D$ 在上半平面的部分。\r\n\r\n            **例**：$D$ 为单位圆 $x^2 + y^2 \\leq 1$，求 $\\iint_D x^3y\\, d\\sigma$。\r\n\r\n            解：$D$ 关于 $x$ 轴对称，$f(x,-y) = x^3(-y) = -x^3y = -f(x,y)$，故积分为 0。"
  },
  {
    "id": "block-integral-concept-1",
    "type": "text",
    "content": "## 重积分的几何意义推导\r\n            ### 从黎曼和到积分\r\n            将区域 $D$ 分割为 $n$ 个小区域 $\\Delta\\sigma_i$：\r\n\r\n\r\n\r\n                $$\\iint_D f(x,y)\\, d\\sigma = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(\\xi_i, \\eta_i)\\Delta\\sigma_i$$\r\n\r\n            ### 二重积分中值定理\r\n            若 $f$ 在 $D$ 上连续，则存在 $(\\xi, \\eta) \\in D$：\r\n\r\n\r\n\r\n                $$\\iint_D f(x,y)\\, d\\sigma = f(\\xi, \\eta) \\cdot |D|$$"
  }
],
};

export const doubleintegralLesson: AdvancedSubLesson = {
  id: 'double-integral',
  title: '二重积分',
  has3D: true,
  vizType: 'doubleIntegralRegion',
  blocks: [
  {
    "id": "block-double-integral-0",
    "type": "text",
    "content": "## 一、化二重积分为累次积分\r\n\r\n**思考引导**\r\n\r\n                **核心思想**：二重积分的计算关键是将其转化为两次定积分（累次积分）。\r\n\r\n                几何直观：曲顶柱体的体积可以通过\"切片法\"求得——\r\n\r\n                    - 先沿一个方向积分，得到截面面积函数\r\n                    - 再沿垂直方向积分，累加所有截面\r\n\r\n            ## 二、直角坐标系计算\r\n\r\n            ### 2.1 X-型区域\r\n            区域 D 可以表示为：\r\n\r\n\r\n\r\n                $$D:\\ a \\leq x \\leq b,\\ \\varphi_1(x) \\leq y \\leq \\varphi_2(x)$$\r\n\r\n            即：用垂直于 x 轴的直线与区域边界至多交于两点。\r\n\r\n> **提示**\r\n> \r\n                **计算公式**：\r\n\r\n\r\n\r\n                    $$\\iint_D f(x, y)\\, d\\sigma = \\int_a^b \\left[\\int_{\\varphi_1(x)}^{\\varphi_2(x)} f(x, y)\\, dy\\right] dx$$\r\n\r\n                计算步骤：先对 $y$ 积分（$x$ 视为常数），再对 $x$ 积分。\r\n\r\n            ### 2.2 Y-型区域\r\n            区域 D 可以表示为：\r\n\r\n\r\n\r\n                $$D:\\ c \\leq y \\leq d,\\ \\psi_1(y) \\leq x \\leq \\psi_2(y)$$\r\n\r\n\r\n\r\n                $$\\iint_D f(x, y)\\, d\\sigma = \\int_c^d \\left[\\int_{\\psi_1(y)}^{\\psi_2(y)} f(x, y)\\, dx\\right] dy$$\r\n\r\n            ### 2.3 积分次序选择策略\r\n\r\n            <table class=\"formula-table\" style=\"width:100%; border-collapse: collapse; margin: 15px 0;\">\r\n                <tr style=\"background: #f0f0f0;\">\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">考虑因素</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">选择原则</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">示例</th>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">被积函数</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">先积容易积分的变量</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$e^{y^2}$ 应先对 $x$ 积分</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">积分区域</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">避免分块计算</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">三角形区域看哪边更简单</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">区域形状</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">圆域用极坐标</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$x^2 + y^2 \\leq R^2$</td>\r\n                </tr>\r\n            </table>\r\n\r\n            ## 三、极坐标计算\r\n\r\n            ### 3.1 为什么需要极坐标？\r\n            当积分区域是圆、圆环或扇形，或被积函数含有 $x^2 + y^2$ 时，极坐标往往更简单。\r\n\r\n            ### 3.2 坐标变换与面积元素\r\n            \r\n\r\n\r\n                $$x = r\\cos\\theta,\\ y = r\\sin\\theta$$\r\n\r\n            **关键**：极坐标下的面积元素不是 $dr\\, d\\theta$，而是：\r\n\r\n**思考引导**\r\n\r\n\r\n\r\n                    $$d\\sigma = r\\, dr\\, d\\theta$$\r\n\r\n                **几何解释**：极坐标网格中，小区域近似为矩形，边长为 $dr$ 和 $r\\, d\\theta$。\r\n\r\n            ### 3.3 极坐标下的计算公式\r\n\r\n\r\n\r\n                $$\\iint_D f(x, y)\\, d\\sigma = \\iint_{D'} f(r\\cos\\theta, r\\sin\\theta) \\cdot r\\, dr\\, d\\theta$$\r\n\r\n            ### 3.4 常用极坐标区域\r\n\r\n> **提示**\r\n> \r\n                \r\n                    - **圆 $x^2 + y^2 \\leq R^2$**：$0 \\leq r \\leq R$，$0 \\leq \\theta \\leq 2\\pi$\r\n                    - **圆 $x^2 + y^2 \\leq 2Rx$**（圆心在 $(R, 0)$）：$0 \\leq r \\leq 2R\\cos\\theta$，$-\\frac{\\pi}{2} \\leq \\theta \\leq \\frac{\\pi}{2}$\r\n                    - **圆环 $a^2 \\leq x^2 + y^2 \\leq b^2$**：$a \\leq r \\leq b$，$0 \\leq \\theta \\leq 2\\pi$\r\n                    - **扇形**：$0 \\leq r \\leq R$，$\\alpha \\leq \\theta \\leq \\beta$\r\n\r\n            ## 四、变量替换的一般公式\r\n\r\n            设变换 $x = x(u,v)$，$y = y(u,v)$，则：\r\n\r\n\r\n\r\n                $$\\iint_D f(x,y)\\, dxdy = \\iint_{D'} f(x(u,v), y(u,v))\\, |J|\\, dudv$$\r\n\r\n            其中 $J$ 是雅可比行列式：\r\n\r\n\r\n\r\n                $$J = \\frac{\\partial(x,y)}{\\partial(u,v)} = \\begin{vmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{vmatrix}$$\r\n\r\n            极坐标变换的雅可比行列式：$J = r$。"
  }
],
};

export const tripleintegralLesson: AdvancedSubLesson = {
  id: 'triple-integral',
  title: '三重积分',
  has3D: true,
  vizType: 'tripleIntegral',
  blocks: [
  {
    "id": "block-triple-integral-0",
    "type": "text",
    "content": "## 直角坐标系\r\n            ### 先一后二（穿针法）\r\n            \r\n\r\n\r\n                $$\\iiint_V f(x,y,z)\\, dV = \\iint_D dxdy \\int_{u_1(x,y)}^{u_2(x,y)} f(x,y,z)\\, dz$$\r\n\r\n            ### 先二后一（切片法）\r\n            \r\n\r\n\r\n                $$\\iiint_V f(x,y,z)\\, dV = \\int_a^b dz \\iint_{D_z} f(x,y,z)\\, dxdy$$\r\n\r\n            ## 柱坐标\r\n            \r\n\r\n\r\n                $$x = r\\cos\\theta,\\ y = r\\sin\\theta,\\ z = z$$\r\n\r\n                $$dV = r\\, dr\\, d\\theta\\, dz$$\r\n\r\n            ## 球坐标\r\n            \r\n\r\n\r\n                $$x = r\\sin\\varphi\\cos\\theta,\\quad y = r\\sin\\varphi\\sin\\theta,\\quad z = r\\cos\\varphi$$\r\n\r\n                $$dV = r^2\\sin\\varphi\\, dr\\, d\\varphi\\, d\\theta$$\r\n\r\n            ## 坐标系选择\r\n            \r\n**思考引导**\r\n\r\n                    - **柱坐标**：区域为柱形、锥形，或被积函数含 $x^2 + y^2$\r\n                    - **球坐标**：区域为球形、球壳，或被积函数含 $x^2 + y^2 + z^2$\r\n\r\n            ## 对称性应用\r\n            \r\n> **提示**\r\n> \r\n                若 $\\Omega$ 关于 $xy$ 平面对称：\r\n\r\n                    - $f(x, y, -z) = -f(x, y, z) \\Rightarrow$ 积分为 0\r\n                    - $f(x, y, -z) = f(x, y, z) \\Rightarrow$ 积分 $= 2 \\times$ 上半区域积分"
  },
  {
    "id": "block-triple-integral-1",
    "type": "text",
    "content": "## 三重积分计算方法\r\n            ### 先一后二法（穿针法）\r\n            \r\n\r\n\r\n                $$\\iiint_V f(x,y,z)\\, dV = \\iint_D dxdy \\int_{z_1(x,y)}^{z_2(x,y)} f(x,y,z)\\, dz$$\r\n\r\n            ### 先二后一法（切片法）\r\n            \r\n\r\n\r\n                $$\\iiint_V f(x,y,z)\\, dV = \\int_a^b dz \\iint_{D(z)} f(x,y,z)\\, dxdy$$"
  }
],
};

export const changevariablesLesson: AdvancedSubLesson = {
  id: 'change-variables',
  title: '变量替换',
  has3D: true,
  vizType: 'changeOfVariables',
  blocks: [
  {
    "id": "block-change-variables-0",
    "type": "text",
    "content": "## 一般换元公式\r\n            设变换 $x = x(u,v)$，$y = y(u,v)$ 将 $uv$ 平面区域 $D'$ 变为 $xy$ 平面区域 $D$，则\r\n\r\n\r\n\r\n                $$\\iint_D f(x,y)\\, dxdy = \\iint_{D'} f(x(u,v), y(u,v))\\, |J|\\, dudv$$\r\n\r\n            其中 $J$ 为雅可比行列式：\r\n\r\n\r\n\r\n                $$J = \\frac{\\partial(x,y)}{\\partial(u,v)} = \\begin{vmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{vmatrix}$$\r\n\r\n            ## 极坐标变换\r\n            \r\n\r\n\r\n                $$J = \\begin{vmatrix} \\cos\\theta & -r\\sin\\theta \\\\ \\sin\\theta & r\\cos\\theta \\end{vmatrix} = r$$\r\n\r\n            ## 广义极坐标\r\n            \r\n\r\n\r\n                $$x = ar\\cos\\theta,\\ y = br\\sin\\theta$$\r\n\r\n                $$J = abr$$\r\n\r\n            用于椭圆区域 $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} \\leq 1$\r\n\r\n            ## 三重积分换元\r\n            \r\n\r\n\r\n                $$\\iiint_V f(x,y,z)\\, dxdydz = \\iiint_{V'} f(x(u,v,w), \\ldots)\\, |J|\\, dudvdw$$\r\n\r\n            ## 常用变换\r\n            \r\n> **提示**\r\n> \r\n                \r\n                    - 平移：$u = x - a$，$v = y - b$（$J = 1$）\r\n                    - 伸缩：$u = x/a$，$v = y/b$（$J = ab$）\r\n                    - 旋转：利用正交变换（$J = 1$）"
  },
  {
    "id": "block-change-variables-1",
    "type": "text",
    "content": "## 雅可比行列式的性质\r\n            ### 链式法则\r\n            \r\n\r\n\r\n                $$\\text{若 } x = x(u,v),\\ y = y(u,v)，\\text{且 } u = u(s,t),\\ v = v(s,t)$$\r\n\r\n                $$\\text{则 } \\frac{\\partial(x,y)}{\\partial(s,t)} = \\frac{\\partial(x,y)}{\\partial(u,v)} \\times \\frac{\\partial(u,v)}{\\partial(s,t)}$$\r\n\r\n            ### 逆变换\r\n            \r\n\r\n\r\n                $$\\frac{\\partial(x,y)}{\\partial(u,v)} \\times \\frac{\\partial(u,v)}{\\partial(x,y)} = 1$$"
  }
],
};

export const applicationsLesson: AdvancedSubLesson = {
  id: 'applications',
  title: '重积分应用',
  has3D: true,
  vizType: 'applications',
  blocks: [
  {
    "id": "block-applications-0",
    "type": "text",
    "content": "## 几何应用\r\n\r\n            ### 平面区域面积\r\n            \r\n\r\n\r\n                $$S = \\iint_D dxdy$$\r\n\r\n            ### 空间立体体积\r\n            \r\n\r\n\r\n                $$V = \\iiint_V dV = \\iint_D [z_2(x,y) - z_1(x,y)]\\, dxdy$$\r\n\r\n            ### 曲面面积\r\n            曲面 $z = f(x, y)$ 在区域 $D$ 上的面积：\r\n\r\n\r\n\r\n                $$A = \\iint_D \\sqrt{1 + f_x^2 + f_y^2}\\, dxdy$$\r\n\r\n            ## 物理应用\r\n\r\n            ### 质量\r\n            \r\n\r\n\r\n                $$M = \\iint_D \\rho(x,y)\\, d\\sigma \\text{（平面薄板）}$$\r\n\r\n                $$M = \\iiint_V \\rho(x,y,z)\\, dV \\text{（空间物体）}$$\r\n\r\n            ### 质心\r\n            \r\n\r\n\r\n                $$\\bar{x} = \\frac{1}{M}\\iint_D x \\cdot \\rho(x,y)\\, d\\sigma$$\r\n\r\n                $$\\bar{y} = \\frac{1}{M}\\iint_D y \\cdot \\rho(x,y)\\, d\\sigma$$\r\n\r\n            ### 转动惯量\r\n            \r\n\r\n\r\n                $$I_x = \\iint_D y^2 \\cdot \\rho(x,y)\\, d\\sigma \\text{（对 $x$ 轴）}$$\r\n\r\n                $$I_y = \\iint_D x^2 \\cdot \\rho(x,y)\\, d\\sigma \\text{（对 $y$ 轴）}$$\r\n\r\n                $$I_0 = \\iint_D (x^2 + y^2) \\cdot \\rho(x,y)\\, d\\sigma \\text{（对原点）}$$\r\n\r\n            ### 引力\r\n            物体对质点的引力可用三重积分计算各分量。"
  },
  {
    "id": "block-applications-1",
    "type": "text",
    "content": "## 重积分应用推导\r\n            ### 质心坐标\r\n            \r\n\r\n\r\n                $$\\bar{x} = \\frac{1}{M}\\iiint_V x \\cdot \\rho\\, dV$$\r\n\r\n                $$\\bar{y} = \\frac{1}{M}\\iiint_V y \\cdot \\rho\\, dV$$\r\n\r\n                $$\\bar{z} = \\frac{1}{M}\\iiint_V z \\cdot \\rho\\, dV$$\r\n\r\n            ### 转动惯量张量\r\n            \r\n\r\n\r\n                $$I = \\int r^2\\, dm = \\iiint_V (x^2 + y^2 + z^2)\\rho\\, dV$$"
  }
],
};

export const polarcoordinatesLesson: AdvancedSubLesson = {
  id: 'polar-coordinates',
  title: '极坐标积分',
  has3D: true,
  vizType: 'polarCoordinates',
  blocks: [
  {
    "id": "block-polar-coordinates-0",
    "type": "text",
    "content": "## 极坐标变换回顾\r\n            \r\n\r\n\r\n                $x = r\\cos\\theta,\\ y = r\\sin\\theta$\r\n\r\n                $d\\sigma = r\\, dr\\, d\\theta$\r\n\r\n            ## 极坐标下的积分区域\r\n\r\n            ### 圆形区域\r\n            \r\n                - 圆心在原点：$0 \\le r \\le R,\\ 0 \\le \\theta \\le 2\\pi$\r\n                - 圆心在 $(a, 0)$：$0 \\le r \\le 2a\\cos\\theta,\\ -\\pi/2 \\le \\theta \\le \\pi/2$\r\n\r\n            ### 环形区域\r\n            \r\n\r\n\r\n                $a \\le r \\le b,\\ 0 \\le \\theta \\le 2\\pi$\r\n\r\n            ### 扇形区域\r\n            \r\n\r\n\r\n                $0 \\le r \\le R,\\ \\alpha \\le \\theta \\le \\beta$\r\n\r\n            ## 适合极坐标的被积函数\r\n            \r\n> **提示**\r\n> \r\n                \r\n                    - 含 $x^2 + y^2$ 的函数\r\n                    - 含 $y/x$ 或 $x/y$ 的函数\r\n                    - 仅与到原点距离有关的函数 $f(\\sqrt{x^2+y^2})$\r\n\r\n            ## 极坐标积分技巧\r\n            \r\n**思考引导**\r\n\r\n                    - 正确确定 $\\theta$ 的范围（观察区域覆盖的角度）\r\n                    - r 的上下限可能是 $\\theta$ 的函数\r\n                    - 注意乘以 r（雅可比行列式）\r\n                    - 利用对称性简化计算"
  },
  {
    "id": "block-polar-coordinates-1",
    "type": "text",
    "content": "## 极坐标变换推导\r\n            ### 雅可比行列式\r\n            \r\n\r\n\r\n                $$J = \\begin{vmatrix} \\dfrac{\\partial x}{\\partial r} & \\dfrac{\\partial x}{\\partial \\theta} \\\\ \\dfrac{\\partial y}{\\partial r} & \\dfrac{\\partial y}{\\partial \\theta} \\end{vmatrix} = \\begin{vmatrix} \\cos\\theta & -r\\sin\\theta \\\\ \\sin\\theta & r\\cos\\theta \\end{vmatrix} = r$$\r\n\r\n            ### 面积元素\r\n            \r\n\r\n\r\n                $$d\\sigma = |J|\\, dr\\, d\\theta = r\\, dr\\, d\\theta$$"
  }
],
};

export const cylindricalsphericalLesson: AdvancedSubLesson = {
  id: 'cylindrical-spherical',
  title: '柱坐标与球坐标',
  has3D: true,
  vizType: 'cylindricalSpherical',
  blocks: [
  {
    "id": "block-cylindrical-spherical-0",
    "type": "text",
    "content": "## 柱坐标系\r\n            \r\n\r\n\r\n                $$x = r\\cos\\theta,\\ y = r\\sin\\theta,\\ z = z$$\r\n\r\n                $$dV = r\\, dr\\, d\\theta\\, dz$$\r\n\r\n            ### 适用场景\r\n            \r\n                - 柱形区域\r\n                - 锥形区域\r\n                - 被积函数含 $x^2 + y^2$\r\n\r\n            ## 球坐标系\r\n            \r\n\r\n\r\n                $$x = r\\sin\\varphi\\cos\\theta,\\quad y = r\\sin\\varphi\\sin\\theta,\\quad z = r\\cos\\varphi$$\r\n\r\n                $$dV = r^2\\sin\\varphi\\, dr\\, d\\varphi\\, d\\theta$$\r\n\r\n            ### 变量说明\r\n            \r\n                - $r$：点到原点的距离 ($0 \\le r < \\infty$)\r\n                - $\\varphi$：与 $z$ 轴正向的夹角 ($0 \\le \\varphi \\le \\pi$)\r\n                - $\\theta$：在 $xy$ 平面上与 $x$ 轴的夹角 ($0 \\le \\theta \\le 2\\pi$)\r\n\r\n            ### 适用场景\r\n            \r\n                - 球形区域\r\n                - 球壳区域\r\n                - 被积函数含 $x^2 + y^2 + z^2$\r\n\r\n            ## 球坐标积分限\r\n            \r\n> **提示**\r\n> \r\n                #### 球 $x^2 + y^2 + z^2 \\le R^2$\r\n                $0 \\le r \\le R,\\ 0 \\le \\varphi \\le \\pi,\\ 0 \\le \\theta \\le 2\\pi$\r\n\r\n                #### 上半球\r\n                $0 \\le r \\le R,\\ 0 \\le \\varphi \\le \\pi/2,\\ 0 \\le \\theta \\le 2\\pi$\r\n\r\n                #### 球壳 $a^2 \\le x^2 + y^2 + z^2 \\le b^2$\r\n                $a \\le r \\le b,\\ 0 \\le \\varphi \\le \\pi,\\ 0 \\le \\theta \\le 2\\pi$\r\n\r\n> ⚠️ **注意**\r\n> \r\n                **注意**：不要忘记体积元中的 $r$（柱坐标）或 $r^2\\sin\\varphi$（球坐标）！"
  },
  {
    "id": "block-cylindrical-spherical-1",
    "type": "text",
    "content": "## 球坐标体积元推导\r\n            ### 雅可比行列式\r\n            \r\n\r\n\r\n                $$J = r^2 \\sin\\varphi$$\r\n\r\n            推导：从直角坐标到球坐标的变换矩阵行列式\r\n\r\n            ### 球体积公式\r\n            \r\n\r\n\r\n                $$V = \\iiint dV = \\int_0^{2\\pi} d\\theta \\int_0^{\\pi} \\sin\\varphi\\, d\\varphi \\int_0^{R} r^2\\, dr = \\frac{4\\pi R^3}{3}$$"
  }
],
};

export const surfaceintegralfirstLesson: AdvancedSubLesson = {
  id: 'surface-integral-first',
  title: '第一类曲面积分',
  has3D: true,
  vizType: 'surfaceIntegralFirst',
  blocks: [
  {
    "id": "block-surface-integral-first-0",
    "type": "text",
    "content": "## 定义\r\n            设 $\\Sigma$ 是光滑曲面，$f(x, y, z)$ 在 $\\Sigma$ 上有界，则第一类曲面积分（对面积的曲面积分）为：\r\n\r\n\r\n\r\n                $$\\iint_{\\Sigma} f(x,y,z)\\, dS = \\lim_{\\lambda \\to 0} \\sum f(\\xi_i, \\eta_i, \\zeta_i)\\, \\Delta S_i$$\r\n\r\n            ## 计算方法\r\n\r\n            ### 曲面为 $z = z(x, y)$\r\n            \r\n\r\n\r\n                $$\\iint_{\\Sigma} f(x,y,z)\\, dS = \\iint_D f(x,y,z(x,y)) \\sqrt{1 + z_x^2 + z_y^2}\\, dxdy$$\r\n\r\n            ### 曲面为参数方程\r\n            设 $x = x(u,v),\\ y = y(u,v),\\ z = z(u,v)$\r\n\r\n\r\n\r\n                $$dS = |\\mathbf{r}_u \\times \\mathbf{r}_v|\\, dudv$$\r\n\r\n            ## 几何意义\r\n            \r\n**思考引导**\r\n\r\n                    - 当 $f = 1$ 时，积分等于曲面面积\r\n                    - 当 $f$ 为密度时，积分等于曲面质量\r\n\r\n            ## 对称性\r\n            \r\n> **提示**\r\n> \r\n                若 $\\Sigma$ 关于 $xy$ 平面对称：\r\n\r\n                    - $f(x,y,-z) = -f(x,y,z) \\Rightarrow$ 积分为 0\r\n                    - $f(x,y,-z) = f(x,y,z) \\Rightarrow$ 积分 = $2 \\times$ 上半曲面积分"
  },
  {
    "id": "block-surface-integral-first-1",
    "type": "text",
    "content": "## 曲面积分的面积元素\r\n            ### 显式曲面 $z = z(x,y)$\r\n            \r\n\r\n\r\n                $$dS = \\sqrt{1 + \\left(\\frac{\\partial z}{\\partial x}\\right)^2 + \\left(\\frac{\\partial z}{\\partial y}\\right)^2}\\, dxdy = \\sqrt{1 + |\\nabla z|^2}\\, dxdy$$\r\n\r\n            ### 参数曲面推导\r\n            \r\n\r\n\r\n                $$dS = |\\mathbf{r}_u \\times \\mathbf{r}_v|\\, du\\, dv = \\sqrt{EG - F^2}\\, du\\, dv$$\r\n\r\n            其中 $E = \\mathbf{r}_u \\cdot \\mathbf{r}_u,\\ F = \\mathbf{r}_u \\cdot \\mathbf{r}_v,\\ G = \\mathbf{r}_v \\cdot \\mathbf{r}_v$"
  }
],
};

export const surfaceintegralsecondLesson: AdvancedSubLesson = {
  id: 'surface-integral-second',
  title: '第二类曲面积分',
  has3D: true,
  vizType: 'surfaceIntegralSecond',
  blocks: [
  {
    "id": "block-surface-integral-second-0",
    "type": "text",
    "content": "## 定义\r\n            设 $\\Sigma$ 为有向光滑曲面，$\\mathbf{F} = (P, Q, R)$ 为向量场，则第二类曲面积分（对坐标的曲面积分）为：\r\n\r\n\r\n\r\n                $$\\iint_{\\Sigma} \\mathbf{F} \\cdot d\\mathbf{S} = \\iint_{\\Sigma} P\\, dydz + Q\\, dzdx + R\\, dxdy$$\r\n\r\n            ## 有向曲面\r\n            曲面的侧由法向量的方向确定：\r\n\r\n                - 闭曲面：外侧（法向量朝外）或内侧\r\n                - $z = z(x, y)$：上侧（法向量朝上）或下侧\r\n\r\n            ## 计算方法\r\n            ### 投影到 xy 平面\r\n            \r\n\r\n\r\n                $$\\iint_{\\Sigma} R\\, dxdy = \\pm \\iint_D R(x,y,z(x,y))\\, dxdy$$\r\n\r\n            上侧取正，下侧取负。\r\n\r\n            ### 统一投影法\r\n            \r\n\r\n\r\n                $$\\iint_{\\Sigma} P\\, dydz + Q\\, dzdx + R\\, dxdy = \\iint_{\\Sigma} (P\\cos\\alpha + Q\\cos\\beta + R\\cos\\gamma)\\, dS$$\r\n\r\n            ## 两类曲面积分的关系\r\n            \r\n\r\n\r\n                $$\\iint_{\\Sigma} P\\, dydz + Q\\, dzdx + R\\, dxdy = \\iint_{\\Sigma} (P\\cos\\alpha + Q\\cos\\beta + R\\cos\\gamma)\\, dS$$\r\n\r\n            其中 $(\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$ 为有向曲面单位法向量。"
  },
  {
    "id": "block-surface-integral-second-1",
    "type": "text",
    "content": "## 有向曲面面积元素\r\n            ### 投影关系\r\n            \r\n\r\n\r\n                $$dydz = \\cos\\alpha\\, dS = \\pm \\frac{\\partial z}{\\partial x}\\, dxdy$$\r\n\r\n                $$dzdx = \\cos\\beta\\, dS = \\pm \\frac{\\partial z}{\\partial y}\\, dxdy$$\r\n\r\n                $$dxdy = \\cos\\gamma\\, dS$$\r\n\r\n            ### 法向量方向\r\n            上侧取正，下侧取负；前侧取正，后侧取负；右侧取正，左侧取负。"
  }
],
};

export const gausstheoremLesson: AdvancedSubLesson = {
  id: 'gauss-theorem',
  title: '高斯定理',
  has3D: true,
  vizType: 'gaussTheorem',
  blocks: [
  {
    "id": "block-gauss-theorem-0",
    "type": "text",
    "content": "## 高斯公式（散度定理）\r\n            设 $\\Omega$ 是由分片光滑闭曲面 $\\Sigma$ 所围成的空间闭区域，$P, Q, R$ 在 $\\Omega$ 上具有一阶连续偏导数，则\r\n\r\n\r\n\r\n                $$\\oiint_{\\Sigma} P\\, dydz + Q\\, dzdx + R\\, dxdy = \\iiint_{\\Omega} \\left(\\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z}\\right) dV$$\r\n\r\n            或写成向量形式：\r\n\r\n\r\n\r\n                $$\\oiint_{\\Sigma} \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_{\\Omega} (\\nabla \\cdot \\mathbf{F})\\, dV$$\r\n\r\n            ## 二、散度（Divergence）的物理意义\r\n            \r\n\r\n\r\n                $$\\operatorname{div} \\mathbf{F} = \\nabla \\cdot \\mathbf{F} = \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z}$$\r\n\r\n**思考引导**\r\n\r\n                **物理意义**：散度表示单位体积内场的\"源\"的强度，即流体从该点流出的速率。\r\n\r\n                    - $\\operatorname{div} \\mathbf{F} > 0$：该点有\"源\"（流体流出，如喷泉）\r\n                    - $\\operatorname{div} \\mathbf{F} < 0$：该点有\"汇\"（流体流入，如排水口）\r\n                    - $\\operatorname{div} \\mathbf{F} = 0$：无源场（solenoidal，流体不可压缩）\r\n\r\n                **3D可视化演示**：右侧展示了向量场通过闭曲面的通量。\r\n\r\n                    - 红色箭头：向量场 $\\mathbf{F}$\r\n                    - 黄色闭曲面：边界 $\\Sigma$\r\n                    - 观察：穿出曲面的通量与内部散度的关系\r\n\r\n            ## 三、高斯公式的本质\r\n\r\n            高斯公式将**闭曲面上的通量**与**体积内的源强**联系起来：\r\n\r\n\r\n\r\n                $$\\oiint_{\\Sigma} \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_{\\Omega} (\\nabla \\cdot \\mathbf{F})\\, dV$$\r\n\r\n            这与格林公式是一脉相承的——都是\"内部微分 = 边界积分\"的体现。\r\n\r\n            ## 四、应用条件与技巧\r\n\r\n            ### 4.1 应用条件\r\n            \r\n> **提示**\r\n> \r\n                \r\n                    - $\\Sigma$ 必须是**闭曲面**\r\n                    - 取**外侧**（若为内侧则加负号）\r\n                    - $P, Q, R$ 在 $\\Omega$ 内有**连续偏导数**\r\n\r\n            ### 4.2 常用技巧\r\n            \r\n                - **补面法**：对非闭曲面补面后用高斯公式，再减去补面的积分\r\n                - **挖洞法**：处理奇点（如原点处的 1/r 型奇性），用小球挖去奇点后求极限\r\n\r\n            ## 五、应用实例：电场的高斯定律\r\n\r\n            在静电学中，电场 $\\mathbf{E}$ 满足：\r\n\r\n\r\n\r\n                $$\\oiint_{\\Sigma} \\mathbf{E} \\cdot d\\mathbf{S} = \\frac{Q}{\\varepsilon_0}$$\r\n\r\n            其中 $Q$ 是闭曲面内的总电荷。由高斯公式：\r\n\r\n\r\n\r\n                $$\\iiint_{\\Omega} (\\nabla \\cdot \\mathbf{E})\\, dV = \\frac{Q}{\\varepsilon_0} = \\iiint_{\\Omega} \\frac{\\rho}{\\varepsilon_0}\\, dV$$\r\n\r\n            得到微分形式：$\\nabla \\cdot \\mathbf{E} = \\dfrac{\\rho}{\\varepsilon_0}$（电荷密度与散度的关系）。"
  },
  {
    "id": "block-gauss-theorem-1",
    "type": "text",
    "content": "## 高斯公式推导思路\r\n            ### 从二维到三维的推广\r\n            格林公式：$\\oint_L P\\, dx + Q\\, dy = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dxdy$\r\n\r\n            高斯公式是其三维推广，将面积分与体积分联系起来。\r\n\r\n            ### 物理意义\r\n            \r\n\r\n\r\n                通过闭曲面的通量 = 体积内的总源强"
  }
],
};

export const stokestheoremLesson: AdvancedSubLesson = {
  id: 'stokes-theorem',
  title: '斯托克斯定理',
  has3D: true,
  vizType: 'stokesTheorem',
  blocks: [
  {
    "id": "block-stokes-theorem-0",
    "type": "text",
    "content": "## 斯托克斯公式\r\n            设 $\\Sigma$ 为分片光滑的有向曲面，其边界 $\\Gamma$ 为分段光滑的闭曲线，$P, Q, R$ 在包含 $\\Sigma$ 的空间区域内有一阶连续偏导数，则\r\n\r\n\r\n\r\n                $$\\oint_{\\Gamma} P\\, dx + Q\\, dy + R\\, dz = \\iint_{\\Sigma} \\left(\\frac{\\partial R}{\\partial y} - \\frac{\\partial Q}{\\partial z}\\right) dydz + \\left(\\frac{\\partial P}{\\partial z} - \\frac{\\partial R}{\\partial x}\\right) dzdx + \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dxdy$$\r\n\r\n            ## 向量形式\r\n            \r\n\r\n\r\n                $$\\oint_{\\Gamma} \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_{\\Sigma} (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}$$\r\n\r\n            ## 旋度（Curl）\r\n            \r\n\r\n\r\n                $$\\operatorname{rot} \\mathbf{F} = \\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \\dfrac{\\partial}{\\partial x} & \\dfrac{\\partial}{\\partial y} & \\dfrac{\\partial}{\\partial z} \\\\ P & Q & R \\end{vmatrix}$$\r\n\r\n**思考引导**\r\n\r\n                **物理意义**：旋度表示场的旋转程度。\r\n\r\n                    - $\\operatorname{rot} \\mathbf{F} = \\mathbf{0}$：无旋场（保守场）\r\n                    - 无旋场 $\\Leftrightarrow$ 曲线积分与路径无关\r\n\r\n            ## 方向关系\r\n            $\\Gamma$ 的方向与 $\\Sigma$ 的侧符合**右手定则**：右手四指沿 $\\Gamma$ 方向，大拇指指向 $\\Sigma$ 的法向量方向。\r\n\r\n            ## 格林公式是特例\r\n            当 $\\Sigma$ 是 $xy$ 平面上的区域时，斯托克斯公式退化为格林公式。"
  },
  {
    "id": "block-stokes-theorem-1",
    "type": "text",
    "content": "## 斯托克斯公式的推导\r\n            ### 从格林公式推广\r\n            将曲面分割为许多小片，每片上应用格林公式的推广形式。\r\n\r\n            ### 旋度的物理意义\r\n            \r\n\r\n\r\n                $$(\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} = \\lim_{S \\to 0} \\frac{1}{|S|} \\oint_{\\partial S} \\mathbf{F} \\cdot d\\mathbf{r}$$\r\n\r\n            表示单位面积上的环量密度。"
  }
],
};

export const greenstheoremLesson: AdvancedSubLesson = {
  id: 'greens-theorem',
  title: '格林定理',
  has3D: true,
  vizType: 'greensTheorem',
  blocks: [
  {
    "id": "block-greens-theorem-0",
    "type": "text",
    "content": "## 一、从牛顿-莱布尼茨公式到格林公式\r\n\r\n**思考引导**\r\n\r\n                **思考引导**：回顾一元函数的微积分基本定理：\r\n\r\n\r\n\r\n                    $\\int_a^b f'(x)\\, dx = f(b) - f(a)$\r\n\r\n                它将区间内部的\"变化率累积\"与边界上的\"函数值差\"联系起来。\r\n\r\n                **问题**：对于平面区域，是否存在类似的联系——将区域内部的积分与边界上的积分联系起来？\r\n\r\n            ## 二、格林公式的发现\r\n\r\n            ### 2.1 物理直观\r\n            考虑流体在平面区域 $D$ 内的流动。设流速场为 $\\mathbf{F} = (P, Q)$：\r\n\r\n                - 沿边界 $L$ 的环量：$\\oint_L P\\, dx + Q\\, dy$\r\n                - 区域内部每点的\"涡旋强度\"：$\\dfrac{\\partial Q}{\\partial x} - \\dfrac{\\partial P}{\\partial y}$\r\n\r\n            **直观结论**：沿边界的环量应该等于内部所有涡旋的累积。\r\n\r\n            ### 2.2 格林公式\r\n\r\n> **提示**\r\n> \r\n                **格林公式**：设 $D$ 是由分段光滑闭曲线 $L$ 围成的平面区域，$P, Q$ 在 $D$ 上有一阶连续偏导数，则\r\n\r\n\r\n\r\n                    $$\\oint_L P\\, dx + Q\\, dy = \\iint_D \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dxdy$$\r\n\r\n                其中 $L$ 取**正向**（逆时针方向，区域始终在左侧）。\r\n\r\n                **3D可视化演示**：右侧展示了格林公式的几何意义。\r\n                \r\n                    - 蓝色区域：积分区域 $D$\r\n                    - 红色边界：闭曲线 $L$\r\n                    - 向量场在边界的环量与内部旋度的关系\r\n\r\n            ## 三、格林公式的应用\r\n\r\n            ### 3.1 计算平面区域面积\r\n            取 $P = -y/2,\\ Q = x/2$，则 $\\dfrac{\\partial Q}{\\partial x} - \\dfrac{\\partial P}{\\partial y} = \\dfrac{1}{2} + \\dfrac{1}{2} = 1$。\r\n\r\n\r\n\r\n                $$S = \\iint_D dxdy = \\frac{1}{2} \\oint_L x\\, dy - y\\, dx = \\oint_L x\\, dy = -\\oint_L y\\, dx$$\r\n\r\n            **例**：椭圆的参数方程 $x = a\\cos t,\\ y = b\\sin t$，面积：\r\n\r\n\r\n\r\n                $$S = \\frac{1}{2} \\int_0^{2\\pi} \\left[a\\cos t \\cdot b\\cos t - b\\sin t \\cdot (-a\\sin t)\\right] dt = \\frac{ab}{2} \\int_0^{2\\pi} (\\cos^2 t + \\sin^2 t)\\, dt = \\frac{ab}{2} \\cdot 2\\pi = \\pi ab$$\r\n\r\n            ### 3.2 曲线积分与路径无关\r\n\r\n**思考引导**\r\n\r\n                **定理**：在单连通区域内，以下条件等价：\r\n\r\n                    - $\\oint_L P\\, dx + Q\\, dy = 0$ 对任意闭曲线 $L$\r\n                    - 曲线积分 $\\int P\\, dx + Q\\, dy$ 与路径无关\r\n                    - 存在 $u(x,y)$（原函数）使得 $du = P\\, dx + Q\\, dy$\r\n                    - **$\\dfrac{\\partial Q}{\\partial x} = \\dfrac{\\partial P}{\\partial y}$**（恰当条件）\r\n\r\n            **证明概要**：(1)$\\Leftrightarrow$(2) 显然；(2)$\\Rightarrow$(3) 定义 $u(x,y) = \\int_{(x_0,y_0)}^{(x,y)} P\\, dx + Q\\, dy$，由路径无关性保证良定义；(3)$\\Rightarrow$(4) 由混合偏导数相等；(4)$\\Rightarrow$(1) 由格林公式。\r\n\r\n            ### 3.3 原函数的求法\r\n            若 $\\dfrac{\\partial Q}{\\partial x} = \\dfrac{\\partial P}{\\partial y}$，则原函数：\r\n\r\n\r\n\r\n                $$u(x,y) = \\int_{x_0}^{x} P(t, y_0)\\, dt + \\int_{y_0}^{y} Q(x, s)\\, ds$$\r\n\r\n            ## 四、格林公式的本质\r\n\r\n            格林公式是微积分基本定理在高维空间的推广：\r\n\r\n            <table class=\"formula-table\" style=\"width:100%; border-collapse: collapse; margin: 15px 0;\">\r\n                <tr style=\"background: #f0f0f0;\">\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">维度</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">区域</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">边界</th>\r\n                    <th style=\"padding: 10px; border: 1px solid #ccc;\">公式</th>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">一维</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">区间 $[a,b]$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">点 $\\{a, b\\}$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">$\\int_a^b f'\\, dx = f(b) - f(a)$</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">二维</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">平面区域 $D$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">曲线 $L$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">格林公式</td>\r\n                </tr>\r\n                <tr>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">三维</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">空间区域 $\\Omega$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">曲面 $\\Sigma$</td>\r\n                    <td style=\"padding: 10px; border: 1px solid #ccc;\">高斯公式</td>\r\n                </tr>\r\n            </table>\r\n\r\n            这些公式都体现了\"内部微分与边界积分\"的关系，是**斯托克斯定理**的特例。"
  },
  {
    "id": "block-greens-theorem-1",
    "type": "text",
    "content": "## 格林公式的推导\r\n            ### 从牛顿-莱布尼茨公式推广\r\n            \r\n\r\n\r\n                $\\int_a^b f'(x)\\, dx = f(b) - f(a)$\r\n\r\n            格林公式是其二维推广，将曲线积分转化为二重积分。\r\n\r\n            ### 单连通与多连通区域\r\n            格林公式适用于单连通区域，对于多连通区域需要分段处理边界。"
  }
],
};

export const differentialformsLesson: AdvancedSubLesson = {
  id: 'differential-forms',
  title: '微分形式',
  has3D: true,
  vizType: 'differentialForms',
  blocks: [
  {
    "id": "block-differential-forms-0",
    "type": "text",
    "content": "## 外微分形式\r\n\r\n            ### 0-形式\r\n            标量函数 $f(x, y, z)$\r\n\r\n            ### 1-形式\r\n            \r\n\r\n\r\n                $$\\omega^1 = P\\, dx + Q\\, dy + R\\, dz$$\r\n\r\n            ### 2-形式\r\n            \r\n\r\n\r\n                $$\\omega^2 = P\\, dydz + Q\\, dzdx + R\\, dxdy$$\r\n\r\n            ### 3-形式\r\n            \r\n\r\n\r\n                $$\\omega^3 = f(x,y,z)\\, dxdydz$$\r\n\r\n            ## 外微分\r\n            外微分算子 $d$ 的作用：\r\n\r\n\r\n\r\n                $d$：$k$-形式 $\\to$ $(k+1)$-形式\r\n\r\n            ### 重要性质\r\n            \r\n\r\n\r\n                $$d^2 = 0$$\r\n\r\n            即对任意微分形式 $\\omega$，有 $d(d\\omega) = 0$。\r\n\r\n            ## 统一积分定理\r\n            \r\n**思考引导**\r\n\r\n                所有积分公式可统一为：\r\n\r\n\r\n\r\n                    $$\\int_{\\Omega} d\\omega = \\int_{\\partial\\Omega} \\omega$$\r\n\r\n                其中 $\\partial\\Omega$ 表示 $\\Omega$ 的边界。\r\n\r\n                    - 牛顿-莱布尼茨公式：$\\Omega = [a,b]$，$\\omega = F$\r\n                    - 格林公式：$\\Omega = D$，$\\omega = P\\, dx + Q\\, dy$\r\n                    - 斯托克斯公式：$\\Omega = \\Sigma$，$\\omega = P\\, dx + Q\\, dy + R\\, dz$\r\n                    - 高斯公式：$\\Omega = V$，$\\omega = P\\, dydz + Q\\, dzdx + R\\, dxdy$\r\n\r\n            ## 闭形式与恰当形式\r\n            \r\n> **提示**\r\n> \r\n                \r\n                    - **闭形式**：$d\\omega = 0$\r\n                    - **恰当形式**：存在 $\\eta$ 使得 $\\omega = d\\eta$\r\n                    - 恰当形式必为闭形式（$d^2 = 0$）\r\n                    - 在单连通区域，闭形式也是恰当形式"
  },
  {
    "id": "block-differential-forms-1",
    "type": "text",
    "content": "## 外微分的计算规则\r\n            ### 楔积的性质\r\n            \r\n\r\n\r\n                $$dx \\wedge dy = -dy \\wedge dx,\\qquad dx \\wedge dx = 0$$\r\n\r\n            ### 莱布尼茨规则\r\n            \r\n\r\n\r\n                $$d(\\omega \\wedge \\eta) = d\\omega \\wedge \\eta + (-1)^{|\\omega|}\\, \\omega \\wedge d\\eta$$"
  }
],
};

export const odebasicLesson: AdvancedSubLesson = {
  id: 'ode-basic',
  title: '微分方程基础',
  has3D: true,
  vizType: 'odeBasic',
  blocks: [
  {
    "id": "block-ode-basic-0",
    "type": "text",
    "content": "## 微分方程的定义\r\n            含有未知函数及其导数的方程称为微分方程。\r\n\r\n            ## 分类\r\n            \r\n**思考引导**\r\n\r\n                #### 按自变量个数\r\n                \r\n                    - **常微分方程（ODE）**：未知函数是一元函数\r\n                    - **偏微分方程（PDE）**：未知函数是多元函数\r\n\r\n                #### 按方程阶数\r\n                \r\n                    - 方程中出现的最高阶导数的阶数\r\n\r\n                #### 按线性性质\r\n                \r\n                    - **线性方程**：未知函数及其各阶导数都是一次的\r\n                    - **非线性方程**：否则\r\n\r\n            ## 解的概念\r\n            \r\n                - **通解**：含有任意常数，且常数个数等于方程阶数\r\n                - **特解**：不含任意常数的解\r\n                - **初始条件**：确定特解的条件\r\n\r\n            ## 一阶方程的几何意义\r\n            方程 y' = f(x, y) 给出了点 (x, y) 处解曲线的切线斜率。\r\n\r\n> **提示**\r\n> \r\n                **方向场**：在每点画出斜率为 f(x, y) 的小线段。"
  },
  {
    "id": "block-ode-basic-1",
    "type": "text",
    "content": "## 微分方程的基本概念\r\n            ### 通解与特解\r\n            \r\n\r\n\r\n                $n$ 阶微分方程的通解含有 $n$ 个任意常数\r\n\r\n            通解：$y = \\varphi(x, C_1, C_2, \\ldots, C_n)$\r\n\r\n            特解：通过初始条件确定常数后的解\r\n\r\n            ### 初始条件\r\n            \r\n\r\n\r\n                $$y(x_0) = y_0,\\ y'(x_0) = y_1,\\ \\ldots,\\ y^{(n-1)}(x_0) = y_{n-1}$$"
  }
],
};

export const firstorderLesson: AdvancedSubLesson = {
  id: 'first-order',
  title: '一阶微分方程',
  has3D: true,
  vizType: 'firstOrderODE',
  blocks: [
  {
    "id": "block-first-order-0",
    "type": "text",
    "content": "## 可分离变量方程\r\n            \r\n\r\n\r\n                $$\\frac{dy}{dx} = f(x)g(y)$$\r\n\r\n            解法：分离变量后积分\r\n\r\n\r\n\r\n                $$\\int \\frac{dy}{g(y)} = \\int f(x)\\, dx$$\r\n\r\n            ## 齐次方程\r\n            \r\n\r\n\r\n                $$\\frac{dy}{dx} = F\\left(\\frac{y}{x}\\right)$$\r\n\r\n            解法：令 $u = \\dfrac{y}{x}$，化为可分离变量方程。\r\n\r\n            ## 一阶线性方程\r\n            \r\n\r\n\r\n                $$y' + P(x)y = Q(x)$$\r\n            ### 解法：常数变易法\r\n            \r\n\r\n\r\n                $$y = e^{-\\int P\\, dx} \\left[\\int Q \\cdot e^{\\int P\\, dx} dx + C\\right]$$\r\n\r\n            ## 伯努利方程\r\n            \r\n\r\n\r\n                $$y' + P(x)y = Q(x)y^n \\quad (n \\ne 0, 1)$$\r\n\r\n            解法：令 $z = y^{1-n}$，化为线性方程。\r\n\r\n            ## 全微分方程\r\n            \r\n\r\n\r\n                $$P(x,y)\\, dx + Q(x,y)\\, dy = 0$$，其中 $\\dfrac{\\partial Q}{\\partial x} = \\dfrac{\\partial P}{\\partial y}$\r\n\r\n            解法：求原函数 $u(x,y)$ 使得 $du = P\\, dx + Q\\, dy$，通解为 $u(x,y) = C$。"
  }
],
};

export const higherorderLesson: AdvancedSubLesson = {
  id: 'higher-order',
  title: '高阶微分方程',
  has3D: true,
  vizType: 'higherOrderODE',
  blocks: [
  {
    "id": "block-higher-order-0",
    "type": "text",
    "content": "## 可降阶方程\r\n\r\n            ### 类型一：$y^{(n)} = f(x)$\r\n            解法：连续积分 $n$ 次。\r\n\r\n            ### 类型二：$y'' = f(x, y')$\r\n            解法：令 $p = y'$，则 $y'' = \\dfrac{dp}{dx}$，化为一阶方程。\r\n\r\n            ### 类型三：$y'' = f(y, y')$\r\n            解法：令 $p = y'$，则 $y'' = p\\dfrac{dp}{dy}$，化为一阶方程。\r\n\r\n            ## 常系数线性齐次方程\r\n            \r\n\r\n\r\n                $$y'' + py' + qy = 0$$\r\n\r\n            ### 特征方程\r\n            \r\n\r\n\r\n                $$r^2 + pr + q = 0$$\r\n\r\n            ### 通解形式\r\n            \r\n**思考引导**\r\n\r\n                <table style=\"width:100%; border-collapse: collapse;\">\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">特征根情况</td>\r\n                        <td style=\"padding: 8px;\">通解</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">两个不等实根 $r_1, r_2$</td>\r\n                        <td style=\"padding: 8px;\">$y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">相等实根 $r$</td>\r\n                        <td style=\"padding: 8px;\">$y = (C_1 + C_2 x)e^{rx}$</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td style=\"padding: 8px;\">共轭复根 $\\alpha \\pm i\\beta$</td>\r\n                        <td style=\"padding: 8px;\">$y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$</td>\r\n                    </tr>\r\n                </table>\r\n\r\n            ## 常系数线性非齐次方程\r\n            \r\n\r\n\r\n                $$y'' + py' + qy = f(x)$$\r\n\r\n            通解 = 齐次通解 + 特解\r\n\r\n            ### 特解求法：待定系数法\r\n            \r\n> **提示**\r\n> \r\n                <table style=\"width:100%; border-collapse: collapse;\">\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">f(x) 形式</td>\r\n                        <td style=\"padding: 8px;\">特解形式</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">$P_n(x)e^{\\alpha x}$</td>\r\n                        <td style=\"padding: 8px;\">$x^k Q_n(x)e^{\\alpha x}$</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">$e^{\\alpha x}(A\\cos\\beta x + B\\sin\\beta x)$</td>\r\n                        <td style=\"padding: 8px;\">$x^k e^{\\alpha x}(C\\cos\\beta x + D\\sin\\beta x)$</td>\r\n                    </tr>\r\n                </table>\r\n                其中 $k$ 是 $\\alpha$（或 $\\alpha+i\\beta$）作为特征根的重数。"
  }
],
};

export const linearsystemLesson: AdvancedSubLesson = {
  id: 'linear-system',
  title: '线性方程组',
  has3D: true,
  vizType: 'linearSystem',
  blocks: [
  {
    "id": "block-linear-system-0",
    "type": "text",
    "content": "## 常系数线性方程组\r\n            \r\n\r\n\r\n                $$\\frac{d\\mathbf{x}}{dt} = A\\mathbf{x}$$\r\n\r\n            其中 $A$ 是常数矩阵，$\\mathbf{x} = (x_1, x_2, \\ldots, x_n)^T$。\r\n\r\n            ## 解法：特征值法\r\n            \r\n                - 求 $A$ 的特征值：$\\det(A - \\lambda I) = 0$\r\n                - 对每个特征值求特征向量\r\n                - 构造基本解组\r\n\r\n            ## 二维系统示例\r\n            设 $\\lambda_1, \\lambda_2$ 是 $A$ 的特征值：\r\n\r\n**思考引导**\r\n\r\n                    - $\\lambda_1, \\lambda_2$ 为不等实根：$\\mathbf{x} = C_1 \\mathbf{v}_1 e^{\\lambda_1 t} + C_2 \\mathbf{v}_2 e^{\\lambda_2 t}$\r\n                    - $\\lambda_1 = \\lambda_2 = \\lambda$：$\\mathbf{x} = \\left(C_1 \\mathbf{v} + C_2(\\mathbf{v}t + \\mathbf{w})\\right) e^{\\lambda t}$\r\n                    - $\\lambda = \\alpha \\pm i\\beta$：$\\mathbf{x} = e^{\\alpha t}\\left[C_1 \\operatorname{Re}(\\mathbf{v} e^{i\\beta t}) + C_2 \\operatorname{Im}(\\mathbf{v} e^{i\\beta t})\\right]$\r\n\r\n            ## 平衡点分类\r\n            \r\n> **提示**\r\n> \r\n                对于二维系统，根据特征值的性质，平衡点可分为：\r\n\r\n                    - **结点**：两特征值同号实数\r\n                    - **鞍点**：两特征值异号实数\r\n                    - **焦点**：复特征值实部非零\r\n                    - **中心**：纯虚特征值"
  },
  {
    "id": "block-linear-system-1",
    "type": "text",
    "content": "## 线性方程组的矩阵解法\r\n            ### 特征值问题\r\n            \r\n\r\n\r\n                $$\\det(A - \\lambda I) = 0$$\r\n\r\n            ### 通解结构\r\n            \r\n\r\n\r\n                $$\\mathbf{x}(t) = c_1 \\mathbf{v}_1 e^{\\lambda_1 t} + c_2 \\mathbf{v}_2 e^{\\lambda_2 t}$$"
  }
],
};

export const laplaceLesson: AdvancedSubLesson = {
  id: 'laplace',
  title: '拉普拉斯变换',
  has3D: true,
  vizType: 'laplaceTransform',
  blocks: [
  {
    "id": "block-laplace-0",
    "type": "text",
    "content": "## 拉普拉斯变换的定义\r\n            \r\n\r\n\r\n                $$F(s) = \\mathcal{L}[f(t)] = \\int_0^{\\infty} f(t) e^{-st}\\, dt$$\r\n\r\n            ## 基本性质\r\n            \r\n**思考引导**\r\n\r\n                <table style=\"width:100%; border-collapse: collapse;\">\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">性质</td>\r\n                        <td style=\"padding: 8px;\">公式</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">线性</td>\r\n                        <td style=\"padding: 8px;\">$\\mathcal{L}[af + bg] = a\\mathcal{L}[f] + b\\mathcal{L}[g]$</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">时移</td>\r\n                        <td style=\"padding: 8px;\">$\\mathcal{L}[f(t-a)u(t-a)] = e^{-as}F(s)$</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">频移</td>\r\n                        <td style=\"padding: 8px;\">$\\mathcal{L}[e^{at}f(t)] = F(s-a)$</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">微分</td>\r\n                        <td style=\"padding: 8px;\">$\\mathcal{L}[f'(t)] = sF(s) - f(0)$</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td style=\"padding: 8px;\">积分</td>\r\n                        <td style=\"padding: 8px;\">$\\mathcal{L}\\left[\\int_0^t f(\\tau)\\, d\\tau\\right] = \\dfrac{F(s)}{s}$</td>\r\n                    </tr>\r\n                </table>\r\n\r\n            ## 常用变换对\r\n            \r\n> **提示**\r\n> \r\n                <table style=\"width:100%; border-collapse: collapse;\">\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">f(t)</td>\r\n                        <td style=\"padding: 8px;\">F(s)</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">1</td>\r\n                        <td style=\"padding: 8px;\">1/s</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">$t^n$</td>\r\n                        <td style=\"padding: 8px;\">$\\dfrac{n!}{s^{n+1}}$</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">$e^{at}$\r\n                        <td style=\"padding: 8px;\">$\\dfrac{1}{s-a}$</td>\r\n                    </tr>\r\n                    <tr style=\"border-bottom: 1px solid var(--border-color);\">\r\n                        <td style=\"padding: 8px;\">$\\sin\\omega t$</td>\r\n                        <td style=\"padding: 8px;\">$\\dfrac{\\omega}{s^2+\\omega^2}$</td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td style=\"padding: 8px;\">$\\cos\\omega t$</td>\r\n                        <td style=\"padding: 8px;\">$\\dfrac{s}{s^2+\\omega^2}$</td>\r\n                    </tr>\r\n                </table>\r\n\r\n            ## 解微分方程\r\n            步骤：\r\n\r\n                - 对方程两边取拉普拉斯变换\r\n                - 代入初始条件，解出 $F(s)$\r\n                - 对 $F(s)$ 取逆变换得 $f(t)$"
  },
  {
    "id": "block-laplace-1",
    "type": "text",
    "content": "## 拉普拉斯变换推导\r\n            ### 从定义出发\r\n            \r\n\r\n\r\n                $$F(s) = \\int_0^{\\infty} f(t) e^{-st}\\, dt$$\r\n\r\n            ### 微分性质推导\r\n            \r\n\r\n\r\n                $$\\mathcal{L}[f'(t)] = \\int_0^{\\infty} f'(t) e^{-st}\\, dt = \\left[f(t) e^{-st}\\right]_0^{\\infty} + s\\int_0^{\\infty} f(t) e^{-st}\\, dt = sF(s) - f(0)$$"
  }
],
};

export const seriessolutionLesson: AdvancedSubLesson = {
  id: 'series-solution',
  title: '级数解法',
  has3D: true,
  vizType: 'seriesSolution',
  blocks: [
  {
    "id": "block-series-solution-0",
    "type": "text",
    "content": "## 幂级数解法概述\r\n            对于不能用初等函数表示解的方程，可假设解为幂级数形式：\r\n\r\n\r\n\r\n                $$y = \\sum_{n=0}^{\\infty} a_n x^n = a_0 + a_1 x + a_2 x^2 + \\cdots$$\r\n\r\n            ## 勒让德方程\r\n            \r\n\r\n\r\n                $$(1-x^2)y'' - 2xy' + n(n+1)y = 0$$\r\n\r\n            解为勒让德多项式 $P_n(x)$。\r\n\r\n            ## 贝塞尔方程\r\n            \r\n\r\n\r\n                $$x^2 y'' + xy' + (x^2 - \\nu^2)y = 0$$\r\n\r\n            解为贝塞尔函数 $J_\\nu(x)$ 和 $Y_\\nu(x)$。\r\n\r\n            ## 常点与奇点\r\n            \r\n**思考引导**\r\n\r\n                    - **常点**：$P(x)$ 和 $Q(x)$ 在 $x_0$ 解析\r\n                    - **正则奇点**：$(x-x_0)P(x)$ 和 $(x-x_0)^2 Q(x)$ 在 $x_0$ 解析\r\n                    - **非正则奇点**：其他情况\r\n\r\n            ## 弗罗贝尼乌斯方法\r\n            对于正则奇点，设解为\r\n\r\n\r\n\r\n                $$y = x^r \\sum_{n=0}^{\\infty} a_n x^n$$\r\n\r\n            代入方程确定 $r$（指标方程）和系数 $a_n$。"
  },
  {
    "id": "block-series-solution-1",
    "type": "text",
    "content": "## 幂级数解法推导\r\n            ### 假设解的形式\r\n            \r\n\r\n\r\n                $$y = \\sum_{n=0}^{\\infty} a_n x^n$$\r\n\r\n            ### 逐次求导\r\n            \r\n\r\n\r\n                $$y' = \\sum_{n=1}^{\\infty} n a_n x^{n-1},\\qquad y'' = \\sum_{n=2}^{\\infty} n(n-1) a_n x^{n-2}$$\r\n\r\n            ### 勒让德多项式\r\n            \r\n\r\n\r\n                $$P_n(x) = \\frac{1}{2^n n!} \\frac{d^n}{dx^n}\\left[(x^2-1)^n\\right]$$"
  }
],
};

export const numericalLesson: AdvancedSubLesson = {
  id: 'numerical',
  title: '数值方法',
  has3D: true,
  vizType: 'numericalODE',
  blocks: [
  {
    "id": "block-numerical-0",
    "type": "text",
    "content": "## 欧拉方法\r\n            最简单的数值方法：\r\n\r\n\r\n\r\n                $$y_{n+1} = y_n + h \\cdot f(x_n, y_n)$$\r\n\r\n            局部截断误差：$O(h^2)$\r\n\r\n            ## 改进的欧拉方法\r\n            预测-校正法：\r\n\r\n\r\n\r\n                预测：$y^* = y_n + h \\cdot f(x_n, y_n)$\r\n\r\n                校正：$y_{n+1} = y_n + \\dfrac{h}{2}\\left[f(x_n, y_n) + f(x_{n+1}, y^*)\\right]$\r\n\r\n            局部截断误差：$O(h^3)$\r\n\r\n            ## 龙格-库塔方法（RK4）\r\n            \r\n\r\n\r\n                $$y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$\r\n\r\n            其中：\r\n\r\n\r\n\r\n                $$k_1 = f(x_n, y_n)$$\r\n\r\n                $$k_2 = f\\left(x_n + \\frac{h}{2}, y_n + \\frac{h k_1}{2}\\right)$$\r\n\r\n                $$k_3 = f\\left(x_n + \\frac{h}{2}, y_n + \\frac{h k_2}{2}\\right)$$\r\n\r\n                $$k_4 = f(x_n + h, y_n + h k_3)$$\r\n\r\n            局部截断误差：$O(h^5)$\r\n\r\n            ## 步长选择\r\n            \r\n> **提示**\r\n> \r\n                \r\n                    - 步长越小，精度越高，但计算量越大\r\n                    - 变步长方法：根据误差估计调整步长\r\n\r\n            ## 稳定性\r\n            对于刚性方程，需要绝对稳定的算法，如隐式方法。"
  },
  {
    "id": "block-numerical-1",
    "type": "text",
    "content": "## 数值方法误差分析\r\n\r\n            ### 欧拉方法\r\n            \r\n\r\n\r\n                $$y_{n+1} = y_n + h \\cdot f(x_n, y_n)$$\r\n\r\n                局部误差：$O(h^2)$\r\n\r\n                全局误差：$O(h)$\r\n\r\n            ### 改进欧拉方法\r\n            \r\n\r\n\r\n                $$k_1 = f(x_n, y_n),\\qquad k_2 = f(x_{n+1}, y_n + h k_1)$$\r\n\r\n                $$y_{n+1} = y_n + \\frac{h}{2}(k_1 + k_2)$$\r\n\r\n                局部误差：$O(h^3)$\r\n\r\n            ### RK4 方法\r\n            \r\n\r\n\r\n                $$y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$\r\n\r\n                局部误差：$O(h^5)$"
  }
],
};

export const physicsLesson: AdvancedSubLesson = {
  id: 'physics',
  title: '物理应用',
  has3D: true,
  vizType: 'physicsApp',
  blocks: [
  {
    "id": "block-physics-0",
    "type": "text",
    "content": "## 经典力学\r\n\r\n            ### 运动学\r\n            \r\n\r\n\r\n                $$\\mathbf{r}(t) = (x(t), y(t), z(t))$$\r\n\r\n                $$\\mathbf{v} = \\frac{d\\mathbf{r}}{dt},\\quad \\mathbf{a} = \\frac{d\\mathbf{v}}{dt} = \\frac{d^2\\mathbf{r}}{dt^2}$$\r\n\r\n            ### 牛顿第二定律\r\n            \r\n\r\n\r\n                $$\\mathbf{F} = m\\mathbf{a} = m\\frac{d^2\\mathbf{r}}{dt^2}$$\r\n\r\n            ### 角动量\r\n            \r\n\r\n\r\n                $$\\mathbf{L} = \\mathbf{r} \\times \\mathbf{p} = m(\\mathbf{r} \\times \\mathbf{v})$$\r\n\r\n            ## 电磁学\r\n\r\n            ### 麦克斯韦方程组\r\n            \r\n**思考引导**\r\n\r\n\r\n\r\n                    $\\nabla \\cdot \\mathbf{E} = \\dfrac{\\rho}{\\varepsilon_0}$ （高斯电场定律）\r\n\r\n                    $\\nabla \\cdot \\mathbf{B} = 0$ （高斯磁场定律）\r\n\r\n                    $\\nabla \\times \\mathbf{E} = -\\dfrac{\\partial \\mathbf{B}}{\\partial t}$ （法拉第定律）\r\n\r\n                    $\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\dfrac{\\partial \\mathbf{E}}{\\partial t}$ （安培-麦克斯韦定律）\r\n\r\n            ### 电势与电场\r\n            \r\n\r\n\r\n                $$\\mathbf{E} = -\\nabla V$$\r\n\r\n            ## 引力场\r\n            \r\n\r\n\r\n                $$\\mathbf{F} = -\\frac{GmM}{r^2}\\, \\hat{\\mathbf{r}}$$\r\n\r\n                $$\\mathbf{g} = -\\nabla \\Phi$$\r\n\r\n            ## 热传导\r\n            \r\n\r\n\r\n                $$\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u$$ （热方程）\r\n\r\n            ## 波动方程\r\n            \r\n\r\n\r\n                $$\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u$$"
  },
  {
    "id": "block-physics-1",
    "type": "text",
    "content": "## 物理学中的矢量微积分\r\n\r\n            ### 运动学关系\r\n            \r\n\r\n\r\n                $$v = \\frac{dr}{dt},\\quad a = \\frac{dv}{dt} = \\frac{d^2 r}{dt^2}$$\r\n\r\n            ### 高斯定理（散度定理）\r\n            \r\n\r\n\r\n                $$\\iiint_V (\\nabla \\cdot \\mathbf{F})\\, dV = \\oiint_S \\mathbf{F} \\cdot d\\mathbf{S}$$\r\n\r\n            ### 斯托克斯定理\r\n            \r\n\r\n\r\n                $$\\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S} = \\oint_{\\partial S} \\mathbf{F} \\cdot d\\mathbf{r}$$\r\n\r\n            ### 电势与电场\r\n            \r\n\r\n\r\n                $$\\mathbf{E} = -\\nabla V,\\qquad \\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}$$"
  }
],
};

export const engineeringLesson: AdvancedSubLesson = {
  id: 'engineering',
  title: '工程应用',
  has3D: true,
  vizType: 'engineeringApp',
  blocks: [
  {
    "id": "block-engineering-0",
    "type": "text",
    "content": "## 结构力学\r\n\r\n            ### 应力与应变\r\n            \r\n\r\n\r\n                $$\\sigma = E\\varepsilon$$ （胡克定律）\r\n\r\n            其中 $\\sigma$ 为应力，$\\varepsilon$ 为应变，$E$ 为弹性模量。\r\n\r\n            ### 梁的挠度\r\n            \r\n\r\n\r\n                $$EI\\, \\frac{d^4 y}{dx^4} = q(x)$$\r\n\r\n            ## 流体力学\r\n\r\n            ### 连续性方程\r\n            \r\n\r\n\r\n                $$\\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot (\\rho \\mathbf{v}) = 0$$\r\n\r\n            ### 纳维-斯托克斯方程\r\n            \r\n\r\n\r\n                $$\\rho\\left(\\frac{\\partial \\mathbf{v}}{\\partial t} + \\mathbf{v} \\cdot \\nabla \\mathbf{v}\\right) = -\\nabla p + \\mu \\nabla^2 \\mathbf{v} + \\rho \\mathbf{g}$$\r\n\r\n            ## 控制理论\r\n\r\n            ### 状态空间表示\r\n            \r\n\r\n\r\n                $$\\frac{d\\mathbf{x}}{dt} = A\\mathbf{x} + B\\mathbf{u}$$\r\n\r\n                $$\\mathbf{y} = C\\mathbf{x} + D\\mathbf{u}$$\r\n\r\n            ## 信号处理\r\n\r\n            ### 傅里叶变换\r\n            \r\n\r\n\r\n                $$F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t}\\, dt$$\r\n\r\n            ### 采样定理\r\n            采样频率必须大于信号最高频率的两倍。"
  },
  {
    "id": "block-engineering-1",
    "type": "text",
    "content": "## 工程分析中的数学工具\r\n\r\n            ### 梁的弯曲方程\r\n            \r\n\r\n\r\n                $$EI\\, \\frac{d^2 y}{dx^2} = M(x)$$\r\n\r\n                $$EI\\, \\frac{d^3 y}{dx^3} = V(x)$$（剪力）\r\n\r\n                $$EI\\, \\frac{d^4 y}{dx^4} = q(x)$$（载荷）\r\n\r\n            ### 控制系统传递函数\r\n            \r\n\r\n\r\n                $$G(s) = C(sI - A)^{-1}B + D$$\r\n\r\n            ### 傅里叶变换对\r\n            \r\n\r\n\r\n                $$F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t}\\, dt$$\r\n\r\n                $$f(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} F(\\omega) e^{i\\omega t}\\, d\\omega$$"
  }
],
};

export const mlLesson: AdvancedSubLesson = {
  id: 'ml',
  title: '机器学习应用',
  has3D: true,
  vizType: 'mlApp',
  blocks: [
  {
    "id": "block-ml-0",
    "type": "text",
    "content": "## 梯度下降\r\n\r\n            ### 批量梯度下降\r\n            \r\n\r\n\r\n                $$\\theta := \\theta - \\alpha \\nabla J(\\theta)$$\r\n\r\n            ### 随机梯度下降（SGD）\r\n            \r\n\r\n\r\n                $$\\theta := \\theta - \\alpha \\nabla J(\\theta; x^{(i)}, y^{(i)})$$\r\n\r\n            ## 反向传播\r\n            利用链式法则计算梯度：\r\n\r\n\r\n\r\n                $$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}$$\r\n\r\n            ## 优化方法\r\n\r\n            ### 动量法\r\n            \r\n\r\n\r\n                $$v := \\beta v + (1-\\beta)\\nabla J(\\theta)$$\r\n\r\n                $$\\theta := \\theta - \\alpha v$$\r\n\r\n            ### Adam优化器\r\n            \r\n\r\n\r\n                $$m := \\beta_1 m + (1-\\beta_1)g$$\r\n\r\n                $$v := \\beta_2 v + (1-\\beta_2)g^2$$\r\n\r\n                $$\\theta := \\theta - \\frac{\\alpha m}{\\sqrt{v} + \\varepsilon}$$\r\n\r\n            ## 主成分分析（PCA）\r\n            对协方差矩阵进行特征分解：\r\n\r\n\r\n\r\n                $$\\Sigma = \\frac{1}{m} X^T X = W\\Lambda W^T$$\r\n\r\n            ## 支持向量机\r\n            \r\n\r\n\r\n                $$\\min \\frac{1}{2}\\|w\\|^2 + C\\sum \\xi_i$$\r\n\r\n                $$\\text{s.t.}\\ y_i(w \\cdot x_i + b) \\ge 1 - \\xi_i$$"
  },
  {
    "id": "block-ml-1",
    "type": "text",
    "content": "## 机器学习中的优化推导\r\n\r\n            ### 梯度下降更新规则\r\n            \r\n\r\n\r\n                $$\\theta^{(t+1)} = \\theta^{(t)} - \\alpha \\nabla J(\\theta^{(t)})$$\r\n\r\n            ### 反向传播的链式法则\r\n            \r\n\r\n\r\n                $$\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w} = \\delta \\cdot a_{prev}$$\r\n\r\n            ### PCA 投影\r\n            \r\n\r\n\r\n                $$z = W^T(x - \\mu)$$\r\n\r\n                其中 $W = [v_1, v_2, \\ldots, v_k]$ 是前 $k$ 个特征向量\r\n\r\n            ### 核技巧\r\n            \r\n\r\n\r\n                $$K(x, x') = \\varphi(x) \\cdot \\varphi(x')$$"
  }
],
};

export const graphicsLesson: AdvancedSubLesson = {
  id: 'graphics',
  title: '计算机图形学',
  has3D: true,
  vizType: 'graphicsApp',
  blocks: [
  {
    "id": "block-graphics-0",
    "type": "text",
    "content": "## 三维变换\r\n\r\n            ### 旋转矩阵\r\n            绕 z 轴旋转角度 $\\theta$：\r\n\r\n\r\n\r\n                $$R_z(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$$\r\n\r\n            ### 四元数旋转\r\n            避免万向节死锁问题：\r\n\r\n\r\n\r\n                $$q = \\cos\\frac{\\theta}{2} + \\sin\\frac{\\theta}{2}\\,(u_x i + u_y j + u_z k)$$\r\n\r\n            ## 光照模型\r\n\r\n            ### Phong模型\r\n            \r\n\r\n\r\n                $$I = I_a k_a + I_p\\left[k_d(\\mathbf{N} \\cdot \\mathbf{L}) + k_s(\\mathbf{R} \\cdot \\mathbf{V})^n\\right]$$\r\n\r\n            ## 贝塞尔曲线\r\n            \r\n\r\n\r\n                $$B(t) = \\sum_{i=0}^{n} \\binom{n}{i}(1-t)^{n-i} t^i P_i,\\quad t \\in [0,1]$$\r\n\r\n            ## B样条\r\n            \r\n\r\n\r\n                $$S(x) = \\sum_{i=0}^{n} N_{i,p}(x) P_i$$\r\n\r\n            ## 光线追踪\r\n            \r\n\r\n\r\n                $$\\mathbf{r}(t) = \\mathbf{o} + t\\mathbf{d}$$\r\n\r\n            求光线与物体的交点。"
  },
  {
    "id": "block-graphics-1",
    "type": "text",
    "content": "## 图形学中的数学基础\r\n\r\n            ### 三维旋转矩阵（绕 z 轴）\r\n            \r\n\r\n\r\n                $$R_z(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 \\\\ \\sin\\theta & \\cos\\theta & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$$\r\n\r\n            ### 四元数旋转\r\n            \r\n\r\n\r\n                $$q = \\left[\\cos\\frac{\\theta}{2},\\ \\sin\\frac{\\theta}{2}\\, \\hat{\\mathbf{n}}\\right]$$\r\n\r\n                $$p' = qpq^{-1}$$\r\n\r\n            ### 贝塞尔曲线\r\n            \r\n\r\n\r\n                $$B(t) = \\sum_{i=0}^{n} \\binom{n}{i}(1-t)^{n-i} t^i P_i$$\r\n\r\n            ### 光线-球面交点\r\n            \r\n\r\n\r\n                $$\\|o + td - c\\|^2 = r^2$$\r\n\r\n                解二次方程求 $t$"
  }
],
};

export const economicsLesson: AdvancedSubLesson = {
  id: 'economics',
  title: '经济学应用',
  has3D: true,
  vizType: 'economicsApp',
  blocks: [
  {
    "id": "block-economics-0",
    "type": "text",
    "content": "## 边际分析\r\n\r\n            ### 边际成本\r\n            \r\n\r\n\r\n                $$MC = \\frac{dC}{dQ}$$\r\n\r\n            ### 边际收益\r\n            \r\n\r\n\r\n                $$MR = \\frac{dR}{dQ}$$\r\n\r\n            ### 利润最大化条件\r\n            \r\n\r\n\r\n                $$MR = MC$$\r\n\r\n            ## 弹性\r\n\r\n            ### 需求价格弹性\r\n            \r\n\r\n\r\n                $$E_d = \\frac{dQ}{dP} \\cdot \\frac{P}{Q}$$\r\n\r\n            ## 生产函数\r\n\r\n            ### 柯布-道格拉斯生产函数\r\n            \r\n\r\n\r\n                $$Y = AK^{\\alpha}L^{1-\\alpha}$$\r\n\r\n            ### 边际产出\r\n            \r\n\r\n\r\n                $$MP_K = \\frac{\\partial Y}{\\partial K} = \\alpha A K^{\\alpha-1} L^{1-\\alpha}$$\r\n\r\n            ## 优化问题\r\n\r\n            ### 消费者效用最大化\r\n            \r\n\r\n\r\n                $$\\max U(x,y)$$\r\n\r\n                $$\\text{s.t.}\\ p_x x + p_y y = I$$\r\n\r\n            ### 拉格朗日函数\r\n            \r\n\r\n\r\n                $$\\mathcal{L} = U(x,y) - \\lambda(p_x x + p_y y - I)$$\r\n\r\n            ## 经济增长模型\r\n\r\n            ### 索洛模型\r\n            \r\n\r\n\r\n                $$\\frac{dk}{dt} = sf(k) - (n + \\delta)k$$"
  },
  {
    "id": "block-economics-1",
    "type": "text",
    "content": "## 经济学中的微积分应用\r\n\r\n            ### 边际分析\r\n            \r\n\r\n\r\n                $$MC = \\frac{dC}{dQ},\\quad MR = \\frac{dR}{dQ}$$\r\n\r\n                利润最大化：$MR = MC$\r\n\r\n            ### 弹性公式\r\n            \r\n\r\n\r\n                $$E_d = \\frac{dQ}{dP} \\cdot \\frac{P}{Q}$$\r\n\r\n            ### 柯布-道格拉斯函数性质\r\n            \r\n\r\n\r\n                $$Y = AK^{\\alpha}L^{1-\\alpha}$$\r\n\r\n                $$MP_K = \\frac{\\alpha Y}{K},\\quad MP_L = \\frac{(1-\\alpha)Y}{L}$$\r\n\r\n                规模报酬不变：$\\alpha + (1-\\alpha) = 1$\r\n\r\n            ### 拉格朗日优化\r\n            \r\n\r\n\r\n                $$\\mathcal{L} = U(x,y) - \\lambda(p_x x + p_y y - I)$$\r\n\r\n                $$\\frac{\\partial \\mathcal{L}}{\\partial x} = \\frac{\\partial U}{\\partial x} - \\lambda p_x = 0$$\r\n\r\n                $$\\frac{\\partial \\mathcal{L}}{\\partial y} = \\frac{\\partial U}{\\partial y} - \\lambda p_y = 0$$"
  }
],
};

export const biologyLesson: AdvancedSubLesson = {
  id: 'biology',
  title: '生物学应用',
  has3D: true,
  vizType: 'biologyApp',
  blocks: [
  {
    "id": "block-biology-0",
    "type": "text",
    "content": "## 种群动力学\r\n\r\n            ### 指数增长模型\r\n            \r\n\r\n\r\n                $$\\frac{dN}{dt} = rN$$\r\n\r\n                $$N(t) = N_0 e^{rt}$$\r\n\r\n            ### 逻辑斯蒂增长\r\n            \r\n\r\n\r\n                $$\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)$$\r\n\r\n            其中 $K$ 为环境容纳量。\r\n\r\n            ## 捕食者-猎物模型（Lotka-Volterra）\r\n            \r\n\r\n\r\n                $$\\frac{dx}{dt} = \\alpha x - \\beta xy$$\r\n\r\n                $$\\frac{dy}{dt} = \\delta xy - \\gamma y$$\r\n\r\n            ## 传染病模型（SIR）\r\n            \r\n\r\n\r\n                $$\\frac{dS}{dt} = -\\frac{\\beta SI}{N}$$\r\n\r\n                $$\\frac{dI}{dt} = \\frac{\\beta SI}{N} - \\gamma I$$\r\n\r\n                $$\\frac{dR}{dt} = \\gamma I$$\r\n\r\n            ## 生物扩散\r\n            \r\n\r\n\r\n                $$\\frac{\\partial u}{\\partial t} = D\\nabla^2 u + f(u)$$\r\n\r\n            ## 神经网络（Hodgkin-Huxley）\r\n            \r\n\r\n\r\n                $$C\\frac{dV}{dt} = -\\bar{g}_{Na} m^3 h(V - V_{Na}) - \\bar{g}_K n^4(V - V_K) - \\bar{g}_L(V - V_L) + I$$"
  },
  {
    "id": "block-biology-1",
    "type": "text",
    "content": "## 生物数学模型推导\r\n\r\n            ### 指数增长\r\n            \r\n\r\n\r\n                $$\\frac{dN}{dt} = rN$$\r\n\r\n                $$N(t) = N_0 e^{rt}$$\r\n\r\n            ### 逻辑斯蒂增长\r\n            \r\n\r\n\r\n                $$\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)$$\r\n\r\n                $$N(t) = \\frac{K}{1 + \\dfrac{K - N_0}{N_0} e^{-rt}}$$\r\n\r\n            ### Lotka-Volterra 方程\r\n            \r\n\r\n\r\n                $$\\frac{dx}{dt} = \\alpha x - \\beta xy$$ （猎物）\r\n\r\n                $$\\frac{dy}{dt} = \\delta xy - \\gamma y$$ （捕食者）\r\n\r\n            ### SIR 模型\r\n            \r\n\r\n\r\n                $$\\frac{dS}{dt} = -\\frac{\\beta SI}{N}$$\r\n\r\n                $$\\frac{dI}{dt} = \\frac{\\beta SI}{N} - \\gamma I$$\r\n\r\n                $$\\frac{dR}{dt} = \\gamma I$$\r\n\r\n                $$R_0 = \\frac{\\beta}{\\gamma}$$ （基本再生数）"
  }
],
};

export const advrealnumberLesson: AdvancedSubLesson = {
  id: 'adv-real-number',
  title: '实数理论与极限进阶',
  has3D: false,
  blocks: [
  {
    "id": "block-adv-real-number-0",
    "type": "text",
    "content": "## 实数系的完备性\r\n\r\n### 戴德金分割\r\n实数系是有理数系的完备化，通过戴德金分割可以严格定义无理数。\r\n\r\n**定义**：将有理数集 $\\mathbb{Q}$ 分成两个非空子集 $A$ 和 $B$，满足：\r\n- $A \\cup B = \\mathbb{Q}$，$A \\cap B = \\varnothing$\r\n- $\\forall a \\in A,\\ \\forall b \\in B$，有 $a < b$\r\n- $A$ 无最大元\r\n\r\n则称 $(A, B)$ 为一个戴德金分割，定义一个实数。\r\n\r\n### 确界原理\r\n**定理**：非空有上界的实数集必有上确界。\r\n\r\n这是实数系完备性的核心体现，也是极限理论的基础。\r\n\r\n## 数列极限进阶\r\n\r\n### 子列收敛性\r\n**波尔查诺-魏尔斯特拉斯定理**：有界数列必有收敛子列。\r\n\r\n### 柯西收敛准则\r\n数列 $\\{a_n\\}$ 收敛 $\\Leftrightarrow$ $\\forall \\varepsilon > 0,\\ \\exists N$，当 $m, n > N$ 时 $|a_n - a_m| < \\varepsilon$\r\n\r\n**意义**：不需要知道极限值，仅凭数列自身性质判断收敛性。\r\n\r\n## 函数极限的深入讨论\r\n\r\n### 海涅定理\r\n函数极限存在的充要条件：对任意趋于 $x_0$ 的数列 $\\{x_n\\}$，$\\{f(x_n)\\}$ 收敛于同一值。\r\n\r\n### 柯西准则\r\n$\\lim_{x \\to x_0} f(x)$ 存在 $\\Leftrightarrow$ $\\forall \\varepsilon > 0,\\ \\exists \\delta > 0$，当 $0 < |x' - x_0|, |x'' - x_0| < \\delta$ 时，$|f(x') - f(x'')| < \\varepsilon$"
  },
  {
    "id": "block-adv-real-number-1",
    "type": "text",
    "content": "## 关键定理\r\n\r\n### 确界原理\r\n$$\\forall A \\subseteq \\mathbb{R},\\ A \\neq \\varnothing,\\ A \\text{ 有上界} \\Rightarrow \\exists \\sup A \\in \\mathbb{R}$$\r\n\r\n### 柯西收敛准则\r\n$$\\{a_n\\} \\text{ 收敛} \\Leftrightarrow \\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall m, n > N:\\ |a_m - a_n| < \\varepsilon$$\r\n\r\n### 单调有界原理\r\n$$\\{a_n\\} \\text{ 单调递增有上界} \\Rightarrow \\lim_{n \\to \\infty} a_n = \\sup \\{a_n\\}$$"
  }
],
};

export const advuniformcontinuityLesson: AdvancedSubLesson = {
  id: 'adv-uniform-continuity',
  title: '一致连续性',
  has3D: false,
  blocks: [
  {
    "id": "block-adv-uniform-continuity-0",
    "type": "text",
    "content": "## 一致连续的概念\r\n\r\n### 定义对比\r\n**逐点连续**：$\\forall \\varepsilon > 0,\\ \\forall x_0 \\in I,\\ \\exists \\delta > 0$，当 $|x - x_0| < \\delta$ 时 $|f(x) - f(x_0)| < \\varepsilon$\r\n\r\n**一致连续**：$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0,\\ \\forall x_1, x_2 \\in I$，当 $|x_1 - x_2| < \\delta$ 时 $|f(x_1) - f(x_2)| < \\varepsilon$\r\n\r\n**关键区别**：$\\delta$ 是否依赖于点的位置。\r\n\r\n## 重要定理\r\n\r\n### 康托尔定理\r\n闭区间上的连续函数必一致连续。\r\n\r\n### 利普希茨条件\r\n若存在 $L > 0$，使得 $|f(x_1) - f(x_2)| \\leq L|x_1 - x_2|$，则 $f$ 一致连续。\r\n\r\n### 非一致连续的判定\r\n存在 $\\varepsilon_0 > 0$，数列 $\\{x_n\\}, \\{y_n\\}$ 满足 $|x_n - y_n| \\to 0$，但 $|f(x_n) - f(y_n)| \\geq \\varepsilon_0$。\r\n\r\n## 典型例子\r\n\r\n- $f(x) = \\dfrac{1}{x}$ 在 $(0, 1]$ 上不一致连续\r\n- $f(x) = \\sin\\dfrac{1}{x}$ 在 $(0, 1]$ 上不一致连续\r\n- $f(x) = \\sqrt{x}$ 在 $[0, \\infty)$ 上一致连续"
  },
  {
    "id": "block-adv-uniform-continuity-1",
    "type": "text",
    "content": "## 核心公式\r\n\r\n### 一致连续定义\r\n$$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0,\\ \\forall x_1, x_2 \\in I:\\ |x_1 - x_2| < \\delta \\Rightarrow |f(x_1) - f(x_2)| < \\varepsilon$$\r\n\r\n### 利普希茨条件\r\n$$|f(x_1) - f(x_2)| \\leq L|x_1 - x_2|, \\quad L > 0$$\r\n\r\n### 康托尔定理\r\n$$f \\in C[a,b] \\Rightarrow f \\text{ 在 } [a,b] \\text{ 上一致连续}$$"
  }
],
};

export const advconvexfunctionLesson: AdvancedSubLesson = {
  id: 'adv-convex-function',
  title: '凸函数与 Jensen 不等式',
  has3D: false,
  blocks: [
  {
    "id": "block-adv-convex-function-0",
    "type": "text",
    "content": "## 凸函数定义\r\n\r\n### 几何定义\r\n函数 $f$ 在区间 $I$ 上称为凸函数，如果对任意 $x_1, x_2 \\in I$ 和 $\\lambda \\in [0, 1]$：\r\n\r\n$$f(\\lambda x_1 + (1-\\lambda)x_2) \\leq \\lambda f(x_1) + (1-\\lambda)f(x_2)$$\r\n\r\n**几何意义**：函数图像上任意两点间的弦位于图像上方。\r\n\r\n## 判定条件\r\n\r\n### 一阶条件（可微情形）\r\n$f$ 凸 $\\Leftrightarrow f(x_2) \\geq f(x_1) + f'(x_1)(x_2 - x_1)$\r\n\r\n即函数图像位于切线上方。\r\n\r\n### 二阶条件（二阶可微情形）\r\n$f$ 凸 $\\Leftrightarrow f''(x) \\geq 0$\r\n\r\n## Jensen 不等式\r\n\r\n### 离散形式\r\n若 $f$ 是凸函数，则对任意 $x_1, \\dots, x_n$ 和权重 $\\lambda_1, \\dots, \\lambda_n$（$\\lambda_i \\geq 0$，$\\sum \\lambda_i = 1$）：\r\n\r\n$$f\\left(\\sum \\lambda_i x_i\\right) \\leq \\sum \\lambda_i f(x_i)$$\r\n\r\n### 积分形式\r\n$$f\\left(\\int g(x)\\, d\\mu\\right) \\leq \\int f(g(x))\\, d\\mu$$\r\n\r\n## 应用\r\n\r\n- 算术-几何平均不等式\r\n- 柯西-施瓦茨不等式\r\n- 信息论中的不等式"
  },
  {
    "id": "block-adv-convex-function-1",
    "type": "text",
    "content": "## 核心公式\r\n\r\n### 凸函数定义\r\n$$f(\\lambda x_1 + (1-\\lambda)x_2) \\leq \\lambda f(x_1) + (1-\\lambda)f(x_2)$$\r\n\r\n### Jensen 不等式\r\n$$f\\left(\\sum_{i=1}^{n} \\lambda_i x_i\\right) \\leq \\sum_{i=1}^{n} \\lambda_i f(x_i)$$\r\n\r\n### 二阶判定\r\n$$f \\text{ 凸} \\Leftrightarrow f''(x) \\geq 0$$\r\n\r\n### 算术-几何平均不等式（由 Jensen 不等式导出）\r\n$$\\frac{x_1 + x_2 + \\cdots + x_n}{n} \\geq \\sqrt[n]{x_1 x_2 \\cdots x_n}$$"
  }
],
};

export const advimproperintegralLesson: AdvancedSubLesson = {
  id: 'adv-improper-integral',
  title: '反常积分进阶',
  has3D: false,
  blocks: [
  {
    "id": "block-adv-improper-integral-0",
    "type": "text",
    "content": "## 反常积分的分类\r\n\r\n### 无穷区间上的积分\r\n$$\\int_a^{\\infty} f(x)\\, dx = \\lim_{b \\to \\infty} \\int_a^{b} f(x)\\, dx$$\r\n\r\n### 无界函数的积分\r\n若 $f$ 在 $a$ 点无界：$\\displaystyle\\int_a^{b} f(x)\\, dx = \\lim_{\\varepsilon \\to 0^{+}} \\int_{a+\\varepsilon}^{b} f(x)\\, dx$\r\n\r\n## 收敛判别法\r\n\r\n### 比较判别法\r\n设 $0 \\leq f(x) \\leq g(x)$，则：\r\n- $\\int g$ 收敛 $\\Rightarrow \\int f$ 收敛\r\n- $\\int f$ 发散 $\\Rightarrow \\int g$ 发散\r\n\r\n### 极限比较法\r\n设 $f(x), g(x) > 0$，若 $\\lim_{x \\to \\infty} \\dfrac{f(x)}{g(x)} = L$：\r\n- $0 < L < \\infty$：$\\int f$ 与 $\\int g$ 同敛散\r\n- $L = 0$：$\\int g$ 收敛 $\\Rightarrow \\int f$ 收敛\r\n- $L = \\infty$：$\\int g$ 发散 $\\Rightarrow \\int f$ 发散\r\n\r\n### p-积分判别法\r\n$\\displaystyle\\int_1^{\\infty} \\frac{1}{x^p}\\, dx$：$p > 1$ 收敛，$p \\leq 1$ 发散\r\n\r\n$\\displaystyle\\int_0^{1} \\frac{1}{x^p}\\, dx$：$p < 1$ 收敛，$p \\geq 1$ 发散\r\n\r\n## 条件收敛与绝对收敛\r\n\r\n### 定义\r\n- 绝对收敛：$\\int |f|$ 收敛 $\\Rightarrow \\int f$ 收敛\r\n- 条件收敛：$\\int f$ 收敛但 $\\int |f|$ 发散\r\n\r\n### 狄利克雷判别法\r\n若 $F(b) = \\displaystyle\\int_a^{b} f$ 有界，$g$ 单调趋于 $0$，则 $\\displaystyle\\int_a^{\\infty} f \\cdot g$ 收敛。"
  },
  {
    "id": "block-adv-improper-integral-1",
    "type": "text",
    "content": "## 核心公式\r\n\r\n### p-积分\r\n$$\\int_1^{\\infty} \\frac{1}{x^p}\\, dx = \\begin{cases} \\text{收敛}, & p > 1 \\\\ \\text{发散}, & p \\leq 1 \\end{cases}$$\r\n\r\n### 极限比较法\r\n$$\\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = L \\in (0, \\infty) \\Rightarrow \\int f \\text{ 与 } \\int g \\text{ 同敛散}$$\r\n\r\n### 伽马函数\r\n$$\\Gamma(s) = \\int_0^{\\infty} x^{s-1} e^{-x}\\, dx, \\quad s > 0$$\r\n\r\n### 重要反常积分\r\n$$\\int_0^{\\infty} \\frac{\\sin x}{x}\\, dx = \\frac{\\pi}{2} \\quad (\\text{条件收敛})$$"
  }
],
};

export const advfunctionseriesLesson: AdvancedSubLesson = {
  id: 'adv-function-series',
  title: '函数项级数',
  has3D: false,
  blocks: [
  {
    "id": "block-adv-function-series-0",
    "type": "text",
    "content": "## 函数项级数的收敛性\r\n\r\n### 逐点收敛\r\n级数 $\\sum f_n(x)$ 在点 $x_0$ 收敛 $\\Leftrightarrow$ 部分和序列 $S_n(x_0)$ 收敛。\r\n\r\n### 一致收敛\r\n级数 $\\sum f_n(x)$ 在区间 $I$ 上一致收敛 $\\Leftrightarrow$ 部分和序列 $S_n(x)$ 一致收敛。\r\n\r\n**$\\varepsilon$-$N$ 定义**：$\\forall \\varepsilon > 0,\\ \\exists N$，当 $n > N$ 时 $|S_n(x) - S(x)| < \\varepsilon$ 对所有 $x \\in I$ 成立。\r\n\r\n## 一致收敛的判别法\r\n\r\n### 魏尔斯特拉斯 M-判别法\r\n若 $|f_n(x)| \\leq M_n$ 对所有 $x \\in I$ 成立，且 $\\sum M_n$ 收敛，则 $\\sum f_n$ 一致收敛。\r\n\r\n### 狄利克雷判别法\r\n若部分和 $\\sum_{k=1}^{n} a_k(x)$ 一致有界，$b_n(x)$ 对每个 $x$ 单调且一致趋于 $0$，则 $\\sum a_n b_n$ 一致收敛。\r\n\r\n## 一致收敛的性质\r\n\r\n### 连续性\r\n若 $f_n$ 连续且 $\\sum f_n$ 一致收敛于 $S$，则 $S$ 连续。\r\n\r\n### 逐项积分\r\n若 $f_n$ 连续且 $\\sum f_n$ 一致收敛，则 $\\int \\sum f_n = \\sum \\int f_n$。\r\n\r\n### 逐项求导\r\n若 $f_n'$ 连续，$\\sum f_n'$ 一致收敛，$\\sum f_n$ 在某点收敛，则 $\\left(\\sum f_n\\right)' = \\sum f_n'$。\r\n\r\n## 幂级数的一致收敛性\r\n\r\n幂级数在收敛域的任意闭子区间上一致收敛（内闭一致收敛）。"
  },
  {
    "id": "block-adv-function-series-1",
    "type": "text",
    "content": "## 核心公式\r\n\r\n### 一致收敛定义\r\n$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n > N,\\ \\forall x \\in I:\\ |S_n(x) - S(x)| < \\varepsilon$$\r\n\r\n### M-判别法\r\n$$|f_n(x)| \\leq M_n, \\quad \\sum M_n \\text{ 收敛} \\Rightarrow \\sum f_n \\text{ 一致收敛}$$\r\n\r\n### 阿贝尔定理（幂级数）\r\n若幂级数在 $x = R$ 收敛，则在 $[0, R]$ 上一致收敛。\r\n\r\n### 泰勒级数余项\r\n$$R_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}$$"
  }
],
};

export const advfourieranalysisLesson: AdvancedSubLesson = {
  id: 'adv-fourier-analysis',
  title: '傅里叶分析进阶',
  has3D: false,
  blocks: [
  {
    "id": "block-adv-fourier-analysis-0",
    "type": "text",
    "content": "## 傅里叶级数的收敛性\r\n\r\n### 狄利克雷核\r\n$$D_n(x) = \\sum_{k=-n}^{n} e^{ikx} = \\frac{\\sin((n+\\tfrac{1}{2})x)}{\\sin(x/2)}$$\r\n\r\n部分和可表示为卷积：$S_n(f)(x) = (f * D_n)(x)$\r\n\r\n### 逐点收敛定理\r\n若 $f$ 分段光滑，则傅里叶级数在每点 $x$ 收敛于 $\\dfrac{f(x^{+}) + f(x^{-})}{2}$。\r\n\r\n### 一致收敛\r\n若 $f$ 连续且分段光滑，$f(-\\pi) = f(\\pi)$，则傅里叶级数一致收敛于 $f$。\r\n\r\n## 均方收敛与帕塞瓦尔恒等式\r\n\r\n### $L^2$ 收敛\r\n$\\|S_n - f\\|_2 \\to 0$，其中 $\\|g\\|_2^2 = \\dfrac{1}{2\\pi}\\displaystyle\\int |g|^2$\r\n\r\n### 帕塞瓦尔恒等式\r\n$$\\frac{1}{2\\pi} \\int |f|^2 = \\sum |\\hat{c}_n|^2 = \\frac{|a_0|^2}{4} + \\frac{1}{2} \\sum (|a_n|^2 + |b_n|^2)$$\r\n\r\n## 傅里叶变换\r\n\r\n### 定义\r\n$$\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i \\xi x}\\, dx$$\r\n\r\n### 逆变换\r\n$$f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi) e^{2\\pi i \\xi x}\\, d\\xi$$\r\n\r\n### 重要性质\r\n- 线性性\r\n- 时移：$\\widehat{f(x-a)} = e^{-2\\pi i a \\xi} \\hat{f}(\\xi)$\r\n- 频移：$\\widehat{e^{2\\pi i a x} f(x)} = \\hat{f}(\\xi - a)$\r\n- 卷积定理：$\\widehat{f * g} = \\hat{f} \\cdot \\hat{g}$"
  },
  {
    "id": "block-adv-fourier-analysis-1",
    "type": "text",
    "content": "## 核心公式\r\n\r\n### 狄利克雷核\r\n$$D_n(x) = \\sum_{k=-n}^{n} e^{ikx} = \\frac{\\sin((n+\\tfrac{1}{2})x)}{\\sin(x/2)}$$\r\n\r\n### 帕塞瓦尔恒等式\r\n$$\\frac{1}{2\\pi} \\int_{-\\pi}^{\\pi} |f(x)|^2\\, dx = \\sum_{n=-\\infty}^{\\infty} |c_n|^2$$\r\n\r\n### 傅里叶变换\r\n$$\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i \\xi x}\\, dx$$\r\n\r\n### 逆变换\r\n$$f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi) e^{2\\pi i \\xi x}\\, d\\xi$$\r\n\r\n### 卷积定理\r\n$$\\widehat{f * g} = \\hat{f} \\cdot \\hat{g}$$"
  }
],
};

export const advodeLesson: AdvancedSubLesson = {
  id: 'adv-ode',
  title: '常微分方程进阶',
  has3D: false,
  blocks: [
  {
    "id": "block-adv-ode-0",
    "type": "text",
    "content": "## 存在唯一性定理\r\n\r\n### 皮卡-林德洛夫定理\r\n初值问题 $y' = f(x, y)$，$y(x_0) = y_0$：\r\n- 若 $f$ 在矩形区域连续\r\n- 且 $f$ 对 $y$ 满足利普希茨条件\r\n\r\n则存在唯一解，定义在 $|x - x_0| \\leq h$ 上。\r\n\r\n### 解的延拓\r\n解可以延拓到边界或无穷远。\r\n\r\n## 解对初值和参数的连续依赖性\r\n\r\n### 连续依赖性\r\n初值的微小变化导致解的微小变化。\r\n\r\n### 可微性\r\n在一定条件下，解对初值和参数是可微的。\r\n\r\n## 线性微分方程组\r\n\r\n### 矩阵指数\r\n对于常系数系统 $\\mathbf{y}' = A\\mathbf{y}$，解为 $\\mathbf{y} = e^{Ax} \\mathbf{y}_0$\r\n\r\n其中 $e^{Ax} = \\displaystyle\\sum_{n=0}^{\\infty} \\frac{(Ax)^n}{n!}$\r\n\r\n### 基本解矩阵\r\n若 $\\Phi(x)$ 的列是线性无关解，则通解 $\\mathbf{y} = \\Phi(x) \\mathbf{c}$\r\n\r\n## 稳定性理论\r\n\r\n### 李雅普诺夫稳定性\r\n零解稳定 $\\Leftrightarrow$ 扰动解始终保持在零解附近\r\n\r\n### 线性化稳定性\r\n对于 $\\mathbf{y}' = A\\mathbf{y} + \\mathbf{g}(\\mathbf{y})$，若 $\\mathbf{g}$ 是高阶小量，则：\r\n- $A$ 的特征值实部全负 $\\Rightarrow$ 渐近稳定\r\n- $A$ 有正实部特征值 $\\Rightarrow$ 不稳定\r\n\r\n## 边值问题\r\n\r\n### 斯图姆-刘维尔问题\r\n$(py')' + (\\lambda w - q)y = 0$，带边值条件\r\n\r\n特征值 $\\lambda_1 < \\lambda_2 < \\cdots$，对应特征函数构成完备正交系。"
  },
  {
    "id": "block-adv-ode-1",
    "type": "text",
    "content": "## 核心公式\r\n\r\n### 矩阵指数\r\n$$e^{Ax} = \\sum_{n=0}^{\\infty} \\frac{(Ax)^n}{n!}$$\r\n\r\n### 常系数系统解\r\n$$\\mathbf{y}' = A\\mathbf{y} \\Rightarrow \\mathbf{y} = e^{Ax} \\mathbf{y}_0$$\r\n\r\n### 常数变易公式\r\n$$\\mathbf{y}' = A(x)\\mathbf{y} + \\mathbf{f}(x) \\Rightarrow \\mathbf{y} = \\Phi(x)\\left[\\mathbf{c} + \\int \\Phi^{-1}(s) \\mathbf{f}(s)\\, ds\\right]$$\r\n\r\n### 稳定性判据\r\n$$\\operatorname{Re}(\\lambda_i) < 0 \\text{ 对所有 } i \\Rightarrow \\text{渐近稳定}$$"
  }
],
};

export const allLessons: Record<string, AdvancedSubLesson[]> = {
  'am-1': [directioncosinesLesson, crossproductLesson, tripleproductLesson, planelineLesson, quadricsurfacesLesson, coordinatesystemsLesson, vectorfieldsLesson, multivariableconceptLesson],
  'am-2': [partialderivativeLesson, totaldifferentialLesson, chainruleLesson, implicitfunctionLesson, directionalderivativeLesson, extremaLesson, taylorLesson, lagrangeLesson],
  'am-3': [integralconceptLesson, doubleintegralLesson, tripleintegralLesson, changevariablesLesson, applicationsLesson, polarcoordinatesLesson, cylindricalsphericalLesson],
  'am-4': [surfaceintegralfirstLesson, surfaceintegralsecondLesson, gausstheoremLesson, stokestheoremLesson, greenstheoremLesson, differentialformsLesson],
  'am-5': [odebasicLesson, firstorderLesson, higherorderLesson, linearsystemLesson, laplaceLesson, seriessolutionLesson],
  'am-6': [numericalLesson, physicsLesson, engineeringLesson, mlLesson, graphicsLesson, economicsLesson, biologyLesson],
};

// 章节定义
export interface Chapter {
  id: string;
  title: string;
  description?: string;
  icon: string;
  lessons: AdvancedSubLesson[];
}

// 基础篇章节
export const basicChapters: Chapter[] = [
  {
    id: 'am-1',
    title: '向量与空间解析几何',
    icon: '📐',
    lessons: allLessons['am-1'] || [],
  },
  {
    id: 'am-2',
    title: '多元函数微分学',
    icon: '📈',
    lessons: allLessons['am-2'] || [],
  },
  {
    id: 'am-3',
    title: '重积分',
    icon: '🔲',
    lessons: allLessons['am-3'] || [],
  },
  {
    id: 'am-4',
    title: '曲线积分与曲面积分',
    icon: '🔄',
    lessons: allLessons['am-4'] || [],
  },
  {
    id: 'am-5',
    title: '常微分方程',
    icon: '⚡',
    lessons: allLessons['am-5'] || [],
  },
  {
    id: 'am-6',
    title: '应用与实践',
    icon: '🚀',
    lessons: allLessons['am-6'] || [],
  },
];

// 获取课时内容
export function getLessonContent(moduleId: string, lessonId: string): AdvancedSubLesson | undefined {
  const lessons = allLessons[moduleId];
  if (!lessons) return undefined;
  return lessons.find(l => l.id === lessonId);
}

// 获取模块下所有课时
export function getModuleLessons(moduleId: string): AdvancedSubLesson[] {
  return allLessons[moduleId] || [];
}
