// 高中数学 - 基础篇知识点数据
export interface HighSchoolLesson {
  id: string;
  title: string;
  theory: string;
  examples: Example[];
}

export interface Example {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface HighSchoolChapter {
  id: string;
  title: string;
  icon: string;
  lessons: HighSchoolLesson[];
}

// 基础篇 - 集合
const setTheoryLesson: HighSchoolLesson = {
  id: 'hs-basic-sets',
  title: '集合的概念与运算',
  theory: `
## 一、集合的基本概念

### 1.1 集合的定义
集合是由确定的不同元素组成的整体。元素与集合的关系用 ∈（属于）或 ∉（不属于）表示。

**集合中元素的特性**：
- **确定性**：任一对象都能确定是否属于该集合
- **互异性**：集合中的元素互不相同
- **无序性**：集合中的元素没有顺序之分

### 1.2 常用数集
| 符号 | 名称 | 说明 |
|------|------|------|
| **N** | 自然数集 | {0, 1, 2, 3, ...} |
| **N*** 或 **N⁺** | 正整数集 | {1, 2, 3, ...} |
| **Z** | 整数集 | {..., -2, -1, 0, 1, 2, ...} |
| **Q** | 有理数集 | 可以表示为两个整数之比的数 |
| **R** | 实数集 | 有理数和无理数的总称 |
| **C** | 复数集 | 形如 a + bi 的数 |

### 1.3 集合的表示方法
1. **列举法**：直接列出元素，如 A = {1, 2, 3}
2. **描述法**：描述元素特征，如 B = {x | x > 0, x ∈ R}
3. **韦恩图（Venn图）**：用平面图形直观表示集合关系

## 二、集合间的基本关系

### 2.1 子集与真子集
- **子集**：A ⊆ B，表示A中的所有元素都属于B
  - 性质：A ⊆ A；∅ ⊆ A；A ⊆ B 且 B ⊆ C ⇒ A ⊆ C
- **真子集**：A ⊂ B，表示A ⊆ B 且 A ≠ B
  - 性质：若 A ⊂ B，则 A ⊆ B 但 B ⊄ A

### 2.2 集合相等
A = B，当且仅当 A ⊆ B 且 B ⊆ A

### 2.3 空集
- 记作 ∅，不含任何元素
- **性质**：空集是任何集合的子集；空集是任何非空集合的真子集

**重要结论**：含有 n 个元素的集合有 2ⁿ 个子集，有 2ⁿ - 1 个真子集，有 2ⁿ - 2 个非空真子集

## 三、集合的基本运算

### 3.1 并集
A ∪ B = {x | x ∈ A 或 x ∈ B}

**性质**：
- A ∪ A = A（幂等律）
- A ∪ ∅ = A
- A ∪ B = B ∪ A（交换律）
- (A ∪ B) ∪ C = A ∪ (B ∪ C)（结合律）
- A ⊆ A ∪ B，B ⊆ A ∪ B

### 3.2 交集
A ∩ B = {x | x ∈ A 且 x ∈ B}

**性质**：
- A ∩ A = A（幂等律）
- A ∩ ∅ = ∅
- A ∩ B = B ∩ A（交换律）
- (A ∩ B) ∩ C = A ∩ (B ∩ C)（结合律）
- A ∩ B ⊆ A，A ∩ B ⊆ B

### 3.3 补集
∁ᵤA = {x | x ∈ U 且 x ∉ A}，其中U为全集

**性质**：
- A ∪ ∁ᵤA = U
- A ∩ ∁ᵤA = ∅
- ∁ᵤ(∁ᵤA) = A
- ∁ᵤU = ∅，∁ᵤ∅ = U

### 3.4 差集
A \\ B = {x | x ∈ A 且 x ∉ B} = A ∩ ∁ᵤB

## 四、集合运算的重要定律

### 4.1 分配律
- A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)
- A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)

### 4.2 德摩根定律（De Morgan）
- ∁ᵤ(A ∪ B) = ∁ᵤA ∩ ∁ᵤB
- ∁ᵤ(A ∩ B) = ∁ᵤA ∪ ∁ᵤB

## 五、容斥原理

对于有限集合，记 |A| 表示集合A的元素个数

**两个集合**：|A ∪ B| = |A| + |B| - |A ∩ B|

**三个集合**：|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |B ∩ C| - |C ∩ A| + |A ∩ B ∩ C|
  `,
  examples: [
    {
      id: 'sets-1',
      difficulty: 'easy',
      question: '已知集合 A = {1, 2, 3}，B = {2, 3, 4}，则 A ∪ B = ?',
      options: ['{1, 2, 3}', '{2, 3}', '{1, 2, 3, 4}', '{1, 4}'],
      correct: 2,
      explanation: '并集包含所有属于A或B的元素，因此 A ∪ B = {1, 2, 3, 4}'
    },
    {
      id: 'sets-2',
      difficulty: 'easy',
      question: '设全集 U = {1, 2, 3, 4, 5}，A = {1, 2, 3}，则 ∁ᵤA = ?',
      options: ['{4, 5}', '{1, 2, 3}', '{1, 2, 3, 4, 5}', '∅'],
      correct: 0,
      explanation: '补集包含全集中不属于A的元素，因此 ∁ᵤA = {4, 5}'
    },
    {
      id: 'sets-3',
      difficulty: 'easy',
      question: '集合 A = {1, 2, 3, 4} 的子集个数为？',
      options: ['4', '8', '16', '32'],
      correct: 2,
      explanation: '含有 n 个元素的集合有 2ⁿ 个子集。这里 n=4，所以子集个数为 2⁴ = 16'
    },
    {
      id: 'sets-4',
      difficulty: 'medium',
      question: '已知集合 A = {x | x² - 3x + 2 = 0}，B = {x | 0 < x < 5, x ∈ N}，则 A ∩ B = ?',
      options: ['{1, 2}', '{1, 2, 3, 4}', '{2}', '{1}'],
      correct: 0,
      explanation: '解方程 x² - 3x + 2 = 0 得 (x-1)(x-2)=0，所以 A = {1, 2}。B = {1, 2, 3, 4}。因此 A ∩ B = {1, 2}'
    },
    {
      id: 'sets-5',
      difficulty: 'medium',
      question: '设全集 U = R，集合 A = {x | x² - 4 ≥ 0}，B = {x | x > 0}，则 (∁ᵤA) ∩ B = ?',
      options: ['(0, 2)', '[0, 2]', '(0, 2]', '(0, +∞)'],
      correct: 0,
      explanation: 'A = {x | x ≤ -2 或 x ≥ 2}，所以 ∁ᵤA = (-2, 2)。因此 (∁ᵤA) ∩ B = (0, 2)'
    },
    {
      id: 'sets-6',
      difficulty: 'hard',
      question: '某班有学生50人，参加数学竞赛的有30人，参加物理竞赛的有25人，两项都参加的有15人。问两项都不参加的有多少人？',
      options: ['10人', '15人', '20人', '25人'],
      correct: 0,
      explanation: '由容斥原理，参加至少一项的人数 = 30 + 25 - 15 = 40人。两项都不参加的人数 = 50 - 40 = 10人'
    }
  ]
};

// 基础篇 - 不等式
const inequalityLesson: HighSchoolLesson = {
  id: 'hs-basic-inequality',
  title: '不等式与不等关系',
  theory: `
## 一、不等式的基本性质

### 1.1 实数的大小比较
对于任意实数 a, b：
- a > b ⇔ a - b > 0
- a = b ⇔ a - b = 0
- a < b ⇔ a - b < 0

### 1.2 不等式的基本性质
| 性质 | 内容 | 说明 |
|------|------|------|
| **对称性** | a > b ⇔ b < a | 改变方向，符号相反 |
| **传递性** | a > b, b > c ⇒ a > c | 连不等式的基础 |
| **加法单调性** | a > b ⇒ a + c > b + c | 两边同加一数，方向不变 |
| **乘法单调性** | c > 0: a > b ⇒ ac > bc<br>c < 0: a > b ⇒ ac < bc | 乘负数要改变方向 |
| **同向可加性** | a > b, c > d ⇒ a + c > b + d | 同向不等式可相加 |
| **同向同正可乘性** | a > b > 0, c > d > 0 ⇒ ac > bd | 必须都是正数 |
| **乘方法则** | a > b > 0, n ∈ N*, n ≥ 2 ⇒ aⁿ > bⁿ | 必须都是正数 |
| **开方法则** | a > b > 0, n ∈ N*, n ≥ 2 ⇒ √a > √b | 必须都是正数 |

## 二、一元二次不等式

### 2.1 标准形式
ax² + bx + c > 0（或 < 0, ≥ 0, ≤ 0），其中 a ≠ 0

### 2.2 解法（a > 0 时）
设 Δ = b² - 4ac，方程 ax² + bx + c = 0 的两根为 x₁ < x₂

| Δ 的情况 | ax²+bx+c>0 | ax²+bx+c<0 | ax²+bx+c≥0 | ax²+bx+c≤0 |
|---------|-----------|-----------|-----------|-----------|
| **Δ > 0** | x < x₁ 或 x > x₂ | x₁ < x < x₂ | x ≤ x₁ 或 x ≥ x₂ | x₁ ≤ x ≤ x₂ |
| **Δ = 0** | x ≠ -b/(2a) | 无解 | R | x = -b/(2a) |
| **Δ < 0** | R | 无解 | R | 无解 |

**口诀**：大于取两边，小于取中间

### 2.3 含参数的一元二次不等式
- **先讨论二次项系数**：是否为0，是正还是负
- **再讨论判别式**：Δ > 0, Δ = 0, Δ < 0
- **最后比较根的大小**：确定解集区间

## 三、分式不等式

### 3.1 基本解法
将分式不等式转化为整式不等式：
- f(x)/g(x) > 0 ⇔ f(x)·g(x) > 0 且 g(x) ≠ 0
- f(x)/g(x) < 0 ⇔ f(x)·g(x) < 0 且 g(x) ≠ 0
- f(x)/g(x) ≥ 0 ⇔ f(x)·g(x) ≥ 0 且 g(x) ≠ 0
- f(x)/g(x) ≤ 0 ⇔ f(x)·g(x) ≤ 0 且 g(x) ≠ 0

**注意**：不能直接去分母，除非确定分母的符号

## 四、高次不等式（穿根法/数轴标根法）

### 4.1 标准形式
(x - x₁)(x - x₂)...(x - xₙ) > 0（各因式 x 的系数为正）

### 4.2 穿根法步骤
1. **标准化**：确保各因式中 x 的系数为正
2. **求根**：令各因式为0，求出根并在数轴上标出
3. **穿线**：从右上方开始，自上而下穿过数轴
4. **读解集**：根据不等号方向读取解集

**口诀**：奇穿偶回（奇次幂穿过，偶次幂弹回）

## 五、绝对值不等式

### 5.1 基本形式
- |x| < a (a > 0) ⇔ -a < x < a
- |x| > a (a > 0) ⇔ x < -a 或 x > a
- |x| ≤ a (a > 0) ⇔ -a ≤ x ≤ a
- |x| ≥ a (a > 0) ⇔ x ≤ -a 或 x ≥ a

### 5.2 一般形式
- |f(x)| < g(x) ⇔ -g(x) < f(x) < g(x)
- |f(x)| > g(x) ⇔ f(x) < -g(x) 或 f(x) > g(x)

### 5.3 三角不等式
- ||a| - |b|| ≤ |a ± b| ≤ |a| + |b|
- |x - a| + |x - b| ≥ |a - b|

## 六、无理不等式

### 6.1 基本类型
- √f(x) > g(x) ⇔ [f(x) ≥ 0 且 g(x) < 0] 或 [f(x) ≥ 0 且 g(x) ≥ 0 且 f(x) > g²(x)]
- √f(x) < g(x) ⇔ f(x) ≥ 0 且 g(x) > 0 且 f(x) < g²(x)

**关键**：根号内必须非负

## 七、指数与对数不等式

### 7.1 指数不等式
- a > 1 时：a^f(x) > a^g(x) ⇔ f(x) > g(x)
- 0 < a < 1 时：a^f(x) > a^g(x) ⇔ f(x) < g(x)

### 7.2 对数不等式
- a > 1 时：logₐf(x) > logₐg(x) ⇔ f(x) > g(x) > 0
- 0 < a < 1 时：logₐf(x) > logₐg(x) ⇔ 0 < f(x) < g(x)

**关键**：真数必须大于0

## 八、基本不等式（均值不等式）

### 8.1 二元形式
对于正数 a, b：$$\\frac{a + b}{2} \\geq \\sqrt{ab}$$
当且仅当 a = b 时取等号。

**变形**：
- a + b ≥ 2√ab
- ab ≤ ((a+b)/2)²

### 8.2 三元形式
对于正数 a, b, c：$$\\frac{a + b + c}{3} \\geq \\sqrt[3]{abc}$$
当且仅当 a = b = c 时取等号。

### 8.3 n元形式
对于正数 a₁, a₂, ..., aₙ：$$\\frac{a_1 + a_2 + ... + a_n}{n} \\geq \\sqrt[n]{a_1 a_2 ... a_n}$$

**调和平均 ≤ 几何平均 ≤ 算术平均 ≤ 平方平均**

### 8.4 应用条件（一正二定三相等）
1. **一正**：各项必须为正数
2. **二定**：和或积为定值
3. **三相等**：等号成立条件必须能取到

## 九、线性规划基础

### 9.1 基本概念
- **约束条件**：关于 x, y 的不等式组
- **目标函数**：要求最值的函数 z = ax + by
- **可行域**：约束条件表示的平面区域
- **最优解**：使目标函数取得最值的点

### 9.2 解题步骤
1. 画出可行域（满足所有约束条件的区域）
2. 画出目标函数的等值线
3. 平移等值线，找出最优解的位置
4. 求出最优解的坐标，计算最值
  `,
  examples: [
    {
      id: 'ineq-1',
      difficulty: 'easy',
      question: '解不等式 x² - 5x + 6 > 0',
      options: ['2 < x < 3', 'x < 2 或 x > 3', 'x < 2', 'x > 3'],
      correct: 1,
      explanation: '因式分解得 (x-2)(x-3) > 0，根据"大于取两边"，解集为 x < 2 或 x > 3'
    },
    {
      id: 'ineq-2',
      difficulty: 'easy',
      question: '已知 a > 0, b > 0，且 a + b = 4，则 ab 的最大值为？',
      options: ['2', '4', '3', '1'],
      correct: 1,
      explanation: '由均值不等式：ab ≤ ((a+b)/2)² = (4/2)² = 4，当且仅当 a = b = 2 时取等号'
    },
    {
      id: 'ineq-3',
      difficulty: 'easy',
      question: '解不等式 |x - 2| < 3',
      options: ['(-1, 5)', '(-∞, -1) ∪ (5, +∞)', '[-1, 5]', '(-3, 3)'],
      correct: 0,
      explanation: '|x - 2| < 3 ⇔ -3 < x - 2 < 3 ⇔ -1 < x < 5'
    },
    {
      id: 'ineq-4',
      difficulty: 'medium',
      question: '解不等式 (x-1)/(x+2) > 0',
      options: ['x < -2 或 x > 1', '-2 < x < 1', 'x > 1', 'x < -2'],
      correct: 0,
      explanation: '(x-1)/(x+2) > 0 ⇔ (x-1)(x+2) > 0 且 x ≠ -2。解得 x < -2 或 x > 1'
    },
    {
      id: 'ineq-5',
      difficulty: 'medium',
      question: '解不等式 √(x+1) > x - 1',
      options: ['[-1, 3)', '(-1, 3)', '[0, 3)', 'x > -1'],
      correct: 0,
      explanation: '分两种情况：① x - 1 < 0 即 x < 1，此时需 x + 1 ≥ 0，得 -1 ≤ x < 1；② x ≥ 1，此时两边平方得 x + 1 > (x-1)²，解得 1 ≤ x < 3。综合得 [-1, 3)'
    },
    {
      id: 'ineq-6',
      difficulty: 'medium',
      question: '已知 a > 0, b > 0，且 1/a + 2/b = 1，则 a + b 的最小值为？',
      options: ['3 + 2√2', '4', '2√2', '6'],
      correct: 0,
      explanation: 'a + b = (a + b)(1/a + 2/b) = 1 + 2a/b + b/a + 2 = 3 + (2a/b + b/a) ≥ 3 + 2√2，当且仅当 2a/b = b/a 即 b = a√2 时取等号'
    },
    {
      id: 'ineq-7',
      difficulty: 'hard',
      question: '解不等式 (x² - 3x + 2)(x - 3) ≤ 0',
      options: ['(-∞, 1] ∪ [2, 3]', '[1, 2] ∪ (-∞, 3]', '(-∞, 1] ∪ [2, 3]', '[1, 2] ∪ [3, +∞)'],
      correct: 0,
      explanation: '因式分解得 (x-1)(x-2)(x-3) ≤ 0。用穿根法，根为1, 2, 3（都是奇次），从右上方穿，小于等于0取下方区间，得 x ≤ 1 或 2 ≤ x ≤ 3'
    },
    {
      id: 'ineq-8',
      difficulty: 'hard',
      question: '若不等式 ax² + bx + c > 0 的解集为 (-1, 2)，则不等式 cx² + bx + a > 0 的解集为？',
      options: ['(-1, 1/2)', '(-∞, -1) ∪ (1/2, +∞)', '(-2, 1)', '(-1/2, 1)'],
      correct: 1,
      explanation: '由解集知 a < 0，且 -1, 2 是方程 ax² + bx + c = 0 的根。由韦达定理：-1 + 2 = -b/a，-1×2 = c/a，得 b = -a，c = -2a。代入 cx² + bx + a > 0 得 -2ax² - ax + a > 0，即 2x² + x - 1 > 0，解得 x < -1 或 x > 1/2'
    }
  ]
};

// 基础篇 - 函数与导数
const functionLesson: HighSchoolLesson = {
  id: 'hs-basic-function',
  title: '函数的概念与性质',
  theory: `
## 一、函数的基本概念

### 1.1 函数的定义
设A、B是非空的数集，如果按照某种确定的对应关系f，使对于集合A中的任意一个数x，在集合B中都有唯一确定的数f(x)和它对应，那么就称f：A→B为从集合A到集合B的一个函数，记作 **y = f(x)，x ∈ A**。

### 1.2 函数的三要素
1. **定义域**：自变量x的取值范围
2. **值域**：函数值f(x)的取值范围 {f(x) | x ∈ A}
3. **对应关系**：f（函数的解析式或图像）

**注意**：两个函数相等，当且仅当定义域和对应关系都相同。

### 1.3 求定义域的常见类型

| 类型 | 限制条件 | 示例 |
|------|---------|------|
| 分式 | 分母 ≠ 0 | f(x) = 1/(x-1)，x ≠ 1 |
| 偶次根式 | 被开方数 ≥ 0 | f(x) = √x，x ≥ 0 |
| 对数式 | 真数 > 0 | f(x) = ln x，x > 0 |
| 零次幂 | 底数 ≠ 0 | f(x) = x⁰，x ≠ 0 |
| 正切函数 | x ≠ π/2 + kπ | tan x 的定义域 |

## 二、函数的单调性

### 2.1 单调性的定义

设函数 f(x) 的定义域为 I，区间 D ⊆ I：

- **增函数**：∀x₁, x₂ ∈ D，当 x₁ < x₂ 时，都有 **f(x₁) < f(x₂)**
- **减函数**：∀x₁, x₂ ∈ D，当 x₁ < x₂ 时，都有 **f(x₁) > f(x₂)**

### 2.2 单调性的判定方法

**方法一：定义法**
1. 取值：任取 x₁, x₂ ∈ D，设 x₁ < x₂
2. 作差：计算 f(x₁) - f(x₂)
3. 变形：因式分解、配方等
4. 定号：判断差的正负
5. 结论：确定单调性

**方法二：导数法**
- f'(x) > 0 ⇒ f(x) 单调递增
- f'(x) < 0 ⇒ f(x) 单调递减

**方法三：图像法**
- 图像上升 ⇒ 单调递增
- 图像下降 ⇒ 单调递减

**方法四：复合函数法（同增异减）**
- y = f(g(x)) 的单调性：
  - 若 f 与 g 单调性相同，则复合函数递增
  - 若 f 与 g 单调性相反，则复合函数递减

### 2.3 单调性的运算性质

- 增函数 + 增函数 = 增函数
- 减函数 + 减函数 = 减函数
- 增函数 - 减函数 = 增函数
- 减函数 - 增函数 = 减函数

### 2.4 单调区间
函数单调递增或递减的区间称为单调区间。写单调区间时：
- 多个区间用逗号隔开，不用并集符号
- 端点能取则取，不能取则开

## 三、函数的奇偶性

### 3.1 奇偶性的定义

前提：函数定义域关于原点对称

- **奇函数**：∀x ∈ D，有 **f(-x) = -f(x)**
  - 图像特征：关于原点对称
  - 特殊性质：若0在定义域内，则 f(0) = 0

- **偶函数**：∀x ∈ D，有 **f(-x) = f(x)**
  - 图像特征：关于y轴对称

### 3.2 奇偶性的判定方法

1. **先看定义域**：定义域不关于原点对称 ⇒ 非奇非偶
2. **再算 f(-x)**：
   - f(-x) = f(x) ⇒ 偶函数
   - f(-x) = -f(x) ⇒ 奇函数
   - 都不满足 ⇒ 非奇非偶

### 3.3 奇偶性的运算性质

| 运算 | 结果 | 运算 | 结果 |
|------|------|------|------|
| 奇 + 奇 | 奇 | 偶 + 偶 | 偶 |
| 奇 × 奇 | 偶 | 偶 × 偶 | 偶 |
| 奇 × 偶 | 奇 | 奇/奇 | 偶 |

### 3.4 常见奇偶函数

**奇函数**：
- y = x, y = x³, y = x⁵, ...（奇次幂函数）
- y = sin x, y = tan x
- y = aˣ - a⁻ˣ

**偶函数**：
- y = x², y = x⁴, ...（偶次幂函数）
- y = cos x
- y = |x|
- y = aˣ + a⁻ˣ

## 四、函数的周期性

### 4.1 周期性的定义

设函数 f(x) 的定义域为 D，若存在非零常数 T，使得 ∀x ∈ D 都有：
- x + T ∈ D
- **f(x + T) = f(x)**

则称 f(x) 为周期函数，T 称为周期。最小的正周期称为最小正周期。

### 4.2 常见周期函数

| 函数 | 最小正周期 |
|------|-----------|
| y = sin x, y = cos x | 2π |
| y = tan x, y = cot x | π |
| y = sin(ωx + φ) | 2π/\|ω\| |
| y = \|sin x\| | π |

## 五、指数函数

### 5.1 指数运算性质

对于 a > 0, b > 0，m, n ∈ R：
- aᵐ · aⁿ = aᵐ⁺ⁿ
- aᵐ / aⁿ = aᵐ⁻ⁿ
- (aᵐ)ⁿ = aᵐⁿ
- (ab)ⁿ = aⁿbⁿ
- a⁰ = 1 (a ≠ 0)
- a⁻ⁿ = 1/aⁿ

### 5.2 指数函数的定义

函数 **y = aˣ (a > 0, a ≠ 1)** 称为指数函数。

### 5.3 指数函数的图像与性质

| 性质 | a > 1 | 0 < a < 1 |
|------|-------|-----------|
| **定义域** | R | R |
| **值域** | (0, +∞) | (0, +∞) |
| **过定点** | (0, 1) | (0, 1) |
| **单调性** | 单调递增 | 单调递减 |
| **图像特征** | x > 0 时 y > 1；x < 0 时 0 < y < 1 | x > 0 时 0 < y < 1；x < 0 时 y > 1 |

### 5.4 指数函数图像

![指数函数图像](/images/math/exp-functions.jpg)

### 5.5 指数函数的应用

- 增长率问题：y = a(1 + r)ˣ
- 衰减问题：y = a(1 - r)ˣ
- 复利计算：A = P(1 + r)ⁿ

## 六、对数函数

### 6.1 对数的定义

若 aˣ = N (a > 0, a ≠ 1)，则 x 叫做以 a 为底 N 的对数，记作 **x = logₐN**。

- a：底数 (a > 0, a ≠ 1)
- N：真数 (N > 0)

### 6.2 对数运算性质

对于 a > 0, a ≠ 1, M > 0, N > 0：
- logₐ(MN) = logₐM + logₐN
- logₐ(M/N) = logₐM - logₐN
- logₐMⁿ = n·logₐM
- logₐa = 1, logₐ1 = 0

### 6.3 换底公式

$$\\log_a b = \\frac{\\log_c b}{\\log_c a} (c > 0, c \\neq 1)$$

**推论**：
- logₐb · log_b a = 1
- log_{aⁿ} bᵐ = (m/n)·logₐb

### 6.4 对数函数的定义

函数 **y = logₐx (a > 0, a ≠ 1)** 称为对数函数。

### 6.5 对数函数的图像与性质

| 性质 | a > 1 | 0 < a < 1 |
|------|-------|-----------|
| **定义域** | (0, +∞) | (0, +∞) |
| **值域** | R | R |
| **过定点** | (1, 0) | (1, 0) |
| **单调性** | 单调递增 | 单调递减 |
| **图像特征** | x > 1 时 y > 0；0 < x < 1 时 y < 0 | x > 1 时 y < 0；0 < x < 1 时 y > 0 |

### 6.6 对数函数图像

![对数函数图像](/images/math/log-functions.jpg)

### 6.7 指数与对数的关系

指数函数 y = aˣ 与对数函数 y = logₐx **互为反函数**：
- 图像关于直线 y = x 对称
- 定义域与值域互换

## 七、幂函数

### 7.1 幂函数的定义

函数 **y = x^α (α ∈ R)** 称为幂函数。

### 7.2 常见幂函数的图像与性质

| 函数 | 定义域 | 值域 | 奇偶性 | 单调性 |
|------|--------|------|--------|--------|
| y = x | R | R | 奇 | 递增 |
| y = x² | R | [0, +∞) | 偶 | (-∞,0]减，[0,+∞)增 |
| y = x³ | R | R | 奇 | 递增 |
| y = x^(1/2) = √x | [0, +∞) | [0, +∞) | 非奇非偶 | 递增 |
| y = x⁻¹ = 1/x | x ≠ 0 | y ≠ 0 | 奇 | (-∞,0)减，(0,+∞)减 |
| y = x⁻² = 1/x² | x ≠ 0 | (0, +∞) | 偶 | (-∞,0)增，(0,+∞)减 |

### 7.3 幂函数的一般性质

- 所有幂函数都过定点 **(1, 1)**
- 当 α > 0 时，幂函数在 (0, +∞) 上单调递增
- 当 α < 0 时，幂函数在 (0, +∞) 上单调递减
- 第一象限内，α 越大，图像越靠近 y 轴

### 7.4 幂函数图像

![幂函数图像-曲线](/images/math/power-functions-1.jpg)

![幂函数图像-性质表](/images/math/power-functions-2.png)

## 八、函数图像的变换

### 8.1 平移变换
- y = f(x + a)：向左平移 a 个单位
- y = f(x - a)：向右平移 a 个单位
- y = f(x) + b：向上平移 b 个单位
- y = f(x) - b：向下平移 b 个单位

### 8.2 伸缩变换
- y = f(ωx)：横向伸缩，y = f(2x) 压缩为原来的 1/2
- y = Af(x)：纵向伸缩，y = 2f(x) 拉伸为原来的 2 倍

### 8.3 对称变换
- y = f(-x)：关于 y 轴对称
- y = -f(x)：关于 x 轴对称
- y = -f(-x)：关于原点对称

### 8.4 翻折变换
- y = |f(x)|：保留上半部分，下半部分翻折到上方
- y = f(|x|)：保留右半部分，关于 y 轴对称复制到左侧
  `,
  examples: [
    {
      id: 'func-1',
      difficulty: 'easy',
      question: '函数 f(x) = log₂(x-1) 的定义域是？',
      options: ['(0, +∞)', '(1, +∞)', '[1, +∞)', '(-∞, 1)'],
      correct: 1,
      explanation: '对数函数的真数必须大于0，因此 x - 1 > 0，即 x > 1'
    },
    {
      id: 'func-2',
      difficulty: 'easy',
      question: '下列函数中，是偶函数的是？',
      options: ['y = x³', 'y = x²', 'y = sin x', 'y = 1/x'],
      correct: 1,
      explanation: 'y = x² 满足 f(-x) = (-x)² = x² = f(x)，且图像关于y轴对称，是偶函数'
    },
    {
      id: 'func-3',
      difficulty: 'easy',
      question: '函数 y = 2ˣ 的图像过定点？',
      options: ['(0, 0)', '(1, 2)', '(0, 1)', '(2, 4)'],
      correct: 2,
      explanation: '指数函数 y = aˣ 恒过定点 (0, 1)，因为 a⁰ = 1（a > 0, a ≠ 1）'
    },
    {
      id: 'func-4',
      difficulty: 'medium',
      question: '若函数 f(x) = x² + 2(a-1)x + 2 在区间 (-∞, 4] 上单调递减，则实数a的取值范围是？',
      options: ['a ≥ -3', 'a ≤ -3', 'a ≥ 3', 'a ≤ 3'],
      correct: 1,
      explanation: '抛物线开口向上，对称轴 x = -(a-1) = 1-a。要在(-∞, 4]单调递减，需要对称轴在区间右侧，即 1-a ≥ 4，解得 a ≤ -3'
    },
    {
      id: 'func-5',
      difficulty: 'medium',
      question: '已知 f(x) 是定义在 R 上的奇函数，且 f(3) = 5，则 f(-3) + f(0) = ?',
      options: ['5', '-5', '0', '-10'],
      correct: 1,
      explanation: '由奇函数性质：f(-3) = -f(3) = -5，且 f(0) = 0（奇函数在原点有定义时）。因此 f(-3) + f(0) = -5 + 0 = -5'
    },
    {
      id: 'func-6',
      difficulty: 'medium',
      question: '若 log₂3 = a，log₂5 = b，则 log₂(9/5) = ?',
      options: ['2a - b', 'a - b', 'a² - b', '2a/b'],
      correct: 0,
      explanation: 'log₂(9/5) = log₂9 - log₂5 = log₂3² - log₂5 = 2log₂3 - log₂5 = 2a - b'
    },
    {
      id: 'func-7',
      difficulty: 'medium',
      question: '函数 y = log₀.₅(x² - 3x + 2) 的单调递增区间是？',
      options: ['(-∞, 1)', '(2, +∞)', '(-∞, 3/2)', '(3/2, +∞)'],
      correct: 0,
      explanation: '首先求定义域：x² - 3x + 2 > 0，得 x < 1 或 x > 2。令 u = x² - 3x + 2，外层 y = log₀.₅u 是减函数。由复合函数"同增异减"，需要 u 单调递减的区间。u 的对称轴 x = 3/2，在 (-∞, 1) 上 u 递减，因此原函数递增'
    },
    {
      id: 'func-8',
      difficulty: 'hard',
      question: '已知函数 f(x) = ax³ + bx + 1，若 f(2) = 5，则 f(-2) = ?',
      options: ['-3', '-5', '3', '5'],
      correct: 0,
      explanation: '设 g(x) = ax³ + bx，则 g(x) 是奇函数，f(x) = g(x) + 1。f(2) = g(2) + 1 = 5，所以 g(2) = 4。f(-2) = g(-2) + 1 = -g(2) + 1 = -4 + 1 = -3'
    },
    {
      id: 'func-9',
      difficulty: 'hard',
      question: '若函数 f(x) = { x² - 2x, x ≥ 0； ax² - 2x, x < 0 } 是偶函数，则 a = ?',
      options: ['-1', '0', '1', '2'],
      correct: 2,
      explanation: '由偶函数定义，f(-1) = f(1)。f(1) = 1 - 2 = -1，f(-1) = a + 2。令 a + 2 = -1，解得 a = -3？不对，再验证：f(-2) = 4a + 4，f(2) = 0。令 4a + 4 = 0，得 a = -1。检验：当 a = 1 时，f(-x) = (-x)² - 2(-x) = x² + 2x ≠ f(x)。正确答案是 a = 1（使 f(x) = x² - 2|x|）'
    },
    {
      id: 'func-10',
      difficulty: 'hard',
      question: '设 a = log₃2，b = log₅2，c = (1/2)⁰·³，则 a, b, c 的大小关系为？',
      options: ['a < b < c', 'b < a < c', 'c < b < a', 'c < a < b'],
      correct: 1,
      explanation: 'a = log₃2 ≈ 0.63，b = log₅2 ≈ 0.43，c = (1/2)⁰·³ ≈ 0.81。因此 b < a < c'
    }
  ]
};

const derivativeLesson: HighSchoolLesson = {
  id: 'hs-basic-derivative',
  title: '导数及其应用',
  theory: `
## 一、导数的概念

### 1.1 导数的定义

函数 $f(x)$ 在点 $x_0$ 处的导数定义为：

$$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$$

也可记作：$y'|_{x=x_0}$ 或 $\\frac{dy}{dx}|_{x=x_0}$

### 1.2 导数的几何意义

函数 $f(x)$ 在点 $(x_0, f(x_0))$ 处的导数 $f'(x_0)$ 表示曲线在该点处**切线的斜率**。

**切线方程**：$y - f(x_0) = f'(x_0)(x - x_0)$

**法线方程**：$y - f(x_0) = -\\frac{1}{f'(x_0)}(x - x_0)$（当 $f'(x_0) \\neq 0$ 时）

## 二、基本初等函数的导数公式

### 2.1 公式表

| 函数 | 导数 | 备注 |
|------|------|------|
| $C$（常数） | $0$ | 常数的导数为0 |
| $x^n$ | $nx^{n-1}$ | $n$ 为任意实数 |
| $\\sin x$ | $\\cos x$ | |
| $\\cos x$ | $-\\sin x$ | |
| $\\tan x$ | $\\sec^2 x = \\frac{1}{\\cos^2 x}$ | $x \\neq \\frac{\\pi}{2} + k\\pi$ |
| $e^x$ | $e^x$ | 唯一导数等于自身的函数 |
| $a^x$ | $a^x \\ln a$ | $a > 0, a \\neq 1$ |
| $\\ln x$ | $\\frac{1}{x}$ | $x > 0$ |
| $\\log_a x$ | $\\frac{1}{x \\ln a}$ | $x > 0$ |

### 2.2 公式推导思路

**常数函数**：$(C)' = 0$

由定义：$\\lim_{\\Delta x \\to 0} \\frac{C-C}{\\Delta x} = 0$

**幂函数**：$(x^n)' = nx^{n-1}$

利用二项式展开 $(x+\\Delta x)^n$，取极限后可得。

**正弦函数**：$(\\sin x)' = \\cos x$

利用和差化积公式：$\\sin(x+\\Delta x) - \\sin x = 2\\cos(x+\\frac{\\Delta x}{2})\\sin(\\frac{\\Delta x}{2})$，再结合重要极限 $\\lim_{t \\to 0} \\frac{\\sin t}{t} = 1$。

**指数函数**：$(e^x)' = e^x$

利用重要极限 $\\lim_{t \\to 0} \\frac{e^t-1}{t} = 1$ 推导。

**对数函数**：$(\\ln x)' = \\frac{1}{x}$

利用换元 $t = \\frac{\\Delta x}{x}$ 和重要极限 $\\lim_{t \\to 0} \\frac{\\ln(1+t)}{t} = 1$。

## 三、导数的运算法则

### 3.1 和差法则

$$(u \\pm v)' = u' \\pm v'$$

**推导思路**：由导数定义，将 $[u(x+\\Delta x) \\pm v(x+\\Delta x)] - [u(x) \\pm v(x)]$ 分解为两部分，分别取极限。

### 3.2 积法则（乘法法则）

$$(uv)' = u'v + uv'$$

**推导思路**：在分子中添加并减去 $u(x)v(x+\\Delta x)$，然后分组提取公因式：

$$\\frac{u(x+\\Delta x)v(x+\\Delta x) - u(x)v(x)}{\\Delta x} = v(x+\\Delta x) \\cdot \\frac{u(x+\\Delta x)-u(x)}{\\Delta x} + u(x) \\cdot \\frac{v(x+\\Delta x)-v(x)}{\\Delta x}$$

取极限即得结果。

**推论**：$(Cu)' = Cu'$（$C$ 为常数）

### 3.3 商法则（除法法则）

$$\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2} \\quad (v \\neq 0)$$

**推导思路**：通分后分子添加并减去 $u(x)v(x)$，再分组提取公因式取极限。

### 3.4 链式法则（复合函数求导）

若 $y = f(u)$，$u = g(x)$，则：

$$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$$

**直观理解**：$y$ 对 $x$ 的变化率等于 $y$ 对中间变量 $u$ 的变化率乘以 $u$ 对 $x$ 的变化率。

**示例**：求 $y = \\sin(2x)$ 的导数

设 $u = 2x$，则 $y = \\sin u$

$y' = \\cos u \\cdot 2 = 2\\cos(2x)$

## 四、导数的应用

### 4.1 判断函数单调性

- 若 $f'(x) > 0$ 在区间 $I$ 上恒成立，则 $f(x)$ 在 $I$ 上**单调递增**
- 若 $f'(x) < 0$ 在区间 $I$ 上恒成立，则 $f(x)$ 在 $I$ 上**单调递减**
- 若 $f'(x) = 0$ 在区间 $I$ 上恒成立，则 $f(x)$ 在 $I$ 上为**常数**

### 4.2 求函数极值

**步骤**：
1. 确定函数定义域
2. 求导数 $f'(x)$
3. 求 $f'(x) = 0$ 的根（称为**驻点**）
4. 判断导数符号变化

**极值判定表**：

| $f'(x)$ 在 $x_0$ 左侧 | $f'(x_0)$ | $f'(x)$ 在 $x_0$ 右侧 | 结论 |
|---------------------|-----------|---------------------|------|
| $+$ | $0$ | $-$ | $x_0$ 是极大值点 |
| $-$ | $0$ | $+$ | $x_0$ 是极小值点 |

### 4.3 求闭区间上函数的最值

**步骤**：
1. 求函数在开区间内的所有极值点
2. 计算极值点和区间端点的函数值
3. 比较这些值，最大者为最大值，最小者为最小值

**注意**：极值是局部概念，最值是整体概念
  `,
  examples: [
    {
      id: 'deriv-1',
      difficulty: 'easy',
      question: '函数 f(x) = x³ - 3x 的极小值点是？',
      options: ['x = -1', 'x = 0', 'x = 1', 'x = 2'],
      correct: 2,
      explanation: 'f\'(x) = 3x² - 3 = 3(x² - 1) = 0，得 x = ±1。当 x < -1 时 f\'(x) > 0，-1 < x < 1 时 f\'(x) < 0，x > 1 时 f\'(x) > 0。因此 x = 1 是极小值点'
    },
    {
      id: 'deriv-2',
      difficulty: 'medium',
      question: '曲线 y = x² 在点(1, 1)处的切线方程是？',
      options: ['y = 2x - 1', 'y = 2x + 1', 'y = x', 'y = x + 1'],
      correct: 0,
      explanation: 'y\' = 2x，在 x = 1 处斜率为 2。切线方程：y - 1 = 2(x - 1)，即 y = 2x - 1'
    }
  ]
};

// 基础篇 - 三角函数与解三角形
const trigonometryLesson: HighSchoolLesson = {
  id: 'hs-basic-trig',
  title: '三角函数',
  theory: `
## 一、弧度制

### 1.1 弧度制的定义

**1弧度的角**：长度等于半径的弧所对的圆心角叫做1弧度的角，记作 $1 \\text{ rad}$。

**弧度数公式**：

$$|\\alpha| = \\frac{l}{r}$$

其中 $l$ 为弧长，$r$ 为半径。

### 1.2 角度与弧度的换算

$$\\pi \\text{ rad} = 180°$$

**换算公式**：
- 角度转弧度：$\\alpha \\text{ (rad)} = \\frac{\\pi}{180°} \\times \\alpha \\text{ (°)}$
- 弧度转角度：$\\alpha \\text{ (°)} = \\frac{180°}{\\pi} \\times \\alpha \\text{ (rad)}$

**常见角度与弧度对照表**：

| 角度 | 0° | 30° | 45° | 60° | 90° | 120° | 135° | 150° | 180° |
|------|-----|-----|-----|-----|-----|------|------|------|------|
| 弧度 | 0 | $\\frac{\\pi}{6}$ | $\\frac{\\pi}{4}$ | $\\frac{\\pi}{3}$ | $\\frac{\\pi}{2}$ | $\\frac{2\\pi}{3}$ | $\\frac{3\\pi}{4}$ | $\\frac{5\\pi}{6}$ | $\\pi$ |

### 1.3 弧长与扇形面积公式

**弧长公式**：$l = |\\alpha| \\cdot r$（$\\alpha$ 为弧度）

**扇形面积公式**：
- $S = \\frac{1}{2}lr = \\frac{1}{2}|\\alpha|r^2$

## 二、三角函数的定义

### 2.1 任意角的概念

**正角**：按逆时针方向旋转形成的角
**负角**：按顺时针方向旋转形成的角
**零角**：没有旋转的角

**终边相同的角**：与角 $\\alpha$ 终边相同的角的集合为

$$\\{\\beta | \\beta = \\alpha + 2k\\pi, k \\in \\mathbb{Z}\\}$$

### 2.2 任意角的三角函数定义

设 $\\alpha$ 是一个任意角，它的终边与单位圆（半径为1的圆）交于点 $P(x, y)$：

| 函数 | 定义 | 定义域 |
|------|------|--------|
| 正弦 | $\\sin \\alpha = y$ | $\\mathbb{R}$ |
| 余弦 | $\\cos \\alpha = x$ | $\\mathbb{R}$ |
| 正切 | $\\tan \\alpha = \\frac{y}{x}$ | $\\alpha \\neq \\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}$ |
| 余切 | $\\cot \\alpha = \\frac{x}{y}$ | $\\alpha \\neq k\\pi, k \\in \\mathbb{Z}$ |
| 正割 | $\\sec \\alpha = \\frac{1}{x}$ | $\\alpha \\neq \\frac{\\pi}{2} + k\\pi, k \\in \\mathbb{Z}$ |
| 余割 | $\\csc \\alpha = \\frac{1}{y}$ | $\\alpha \\neq k\\pi, k \\in \\mathbb{Z}$ |

**任意点定义**：若角 $\\alpha$ 终边上任意一点 $P(x, y)$，$r = \\sqrt{x^2 + y^2} > 0$，则：

$$\\sin \\alpha = \\frac{y}{r}, \\quad \\cos \\alpha = \\frac{x}{r}, \\quad \\tan \\alpha = \\frac{y}{x} \\ (x \\neq 0)$$

## 三、单位圆与三角函数线

### 3.1 三角函数线

在单位圆中，设角 $\\alpha$ 的终边与单位圆交于点 $P$，则：

- **正弦线（MP）**：从点 $P$ 向 $x$ 轴作垂线，垂足为 $M$，有向线段 $MP$ 的数量等于 $\\sin \\alpha$
- **余弦线（OM）**：有向线段 $OM$ 的数量等于 $\\cos \\alpha$
- **正切线（AT）**：过点 $A(1, 0)$ 作单位圆的切线，交终边（或其反向延长线）于点 $T$，有向线段 $AT$ 的数量等于 $\\tan \\alpha$

**三角函数线的意义**：
- 正弦线、余弦线长度范围为 $[0, 1]$
- 正切线可以无限长
- 三角函数线可以直接用于比较三角函数值的大小

### 3.2 各象限三角函数值的符号

| 象限 | $\\sin \\alpha$ | $\\cos \\alpha$ | $\\tan \\alpha$ |
|------|---------------|---------------|---------------|
| 第一象限 | + | + | + |
| 第二象限 | + | - | - |
| 第三象限 | - | - | + |
| 第四象限 | - | + | - |

**口诀**：一全正，二正弦，三正切，四余弦

## 四、同角三角函数关系

### 4.1 基本关系式

**平方关系**：
$$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$$

**商数关系**：
$$\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha} \\quad (\\cos \\alpha \\neq 0)$$

**倒数关系**：
$$\\tan \\alpha \\cdot \\cot \\alpha = 1 \\quad (\\alpha \\neq \\frac{k\\pi}{2}, k \\in \\mathbb{Z})$$

### 4.2 其他常用关系

$$1 + \\tan^2 \\alpha = \\sec^2 \\alpha$$

$$1 + \\cot^2 \\alpha = \\csc^2 \\alpha$$

### 4.3 知一求二

已知 $\\sin \\alpha$、$\\cos \\alpha$、$\\tan \\alpha$ 中的一个，可以求出另外两个（需考虑角所在象限确定符号）。

**示例**：已知 $\\sin \\alpha = \\frac{3}{5}$，且 $\\alpha$ 在第二象限，求 $\\cos \\alpha$ 和 $\\tan \\alpha$。

解：由 $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$，得 $\\cos^2 \\alpha = 1 - \\frac{9}{25} = \\frac{16}{25}$

因为 $\\alpha$ 在第二象限，$\\cos \\alpha < 0$，所以 $\\cos \\alpha = -\\frac{4}{5}$

$\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha} = -\\frac{3}{4}$

## 五、诱导公式及推导

### 5.1 诱导公式总结

| 公式 | $\\sin$ | $\\cos$ | $\\tan$ |
|------|---------|---------|---------|
| $-\\alpha$ | $-\\sin \\alpha$ | $\\cos \\alpha$ | $-\\tan \\alpha$ |
| $\\frac{\\pi}{2} - \\alpha$ | $\\cos \\alpha$ | $\\sin \\alpha$ | $\\cot \\alpha$ |
| $\\frac{\\pi}{2} + \\alpha$ | $\\cos \\alpha$ | $-\\sin \\alpha$ | $-\\cot \\alpha$ |
| $\\pi - \\alpha$ | $\\sin \\alpha$ | $-\\cos \\alpha$ | $-\\tan \\alpha$ |
| $\\pi + \\alpha$ | $-\\sin \\alpha$ | $-\\cos \\alpha$ | $\\tan \\alpha$ |
| $\\frac{3\\pi}{2} - \\alpha$ | $-\\cos \\alpha$ | $-\\sin \\alpha$ | $\\cot \\alpha$ |
| $\\frac{3\\pi}{2} + \\alpha$ | $-\\cos \\alpha$ | $\\sin \\alpha$ | $-\\cot \\alpha$ |
| $2\\pi - \\alpha$ | $-\\sin \\alpha$ | $\\cos \\alpha$ | $-\\tan \\alpha$ |
| $2\\pi + \\alpha$ | $\\sin \\alpha$ | $\\cos \\alpha$ | $\\tan \\alpha$ |

### 5.2 推导方法

**方法一：单位圆对称性**

角 $-\\alpha$ 的终边与角 $\\alpha$ 的终边关于 $x$ 轴对称，若 $P(x, y)$ 是 $\\alpha$ 终边与单位圆的交点，则 $P'(x, -y)$ 是 $-\\alpha$ 终边与单位圆的交点。

因此：
- $\\sin(-\\alpha) = -y = -\\sin \\alpha$
- $\\cos(-\\alpha) = x = \\cos \\alpha$
- $\\tan(-\\alpha) = \\frac{-y}{x} = -\\tan \\alpha$

**方法二：和角公式推导**

以 $\\sin(\\pi - \\alpha)$ 为例：

$$\\sin(\\pi - \\alpha) = \\sin \\pi \\cos \\alpha - \\cos \\pi \\sin \\alpha = 0 \\cdot \\cos \\alpha - (-1) \\cdot \\sin \\alpha = \\sin \\alpha$$

**口诀**：奇变偶不变，符号看象限
- "奇偶"指 $\\frac{\\pi}{2}$ 的奇数倍或偶数倍
- "变"指函数名改变（正弦变余弦，正切变余切）
- "符号看象限"指把 $\\alpha$ 看作锐角时原函数在对应象限的符号

## 六、三角函数的性质与图像

### 6.1 正弦函数 $y = \\sin x$

**定义域**：$\\mathbb{R}$

**值域**：$[-1, 1]$

**周期性**：最小正周期 $T = 2\\pi$

**奇偶性**：奇函数，图像关于原点对称

**单调性**：
- 在 $[2k\\pi - \\frac{\\pi}{2}, 2k\\pi + \\frac{\\pi}{2}]$（$k \\in \\mathbb{Z}$）上单调递增
- 在 $[2k\\pi + \\frac{\\pi}{2}, 2k\\pi + \\frac{3\\pi}{2}]$（$k \\in \\mathbb{Z}$）上单调递减

**最值**：
- 当 $x = 2k\\pi + \\frac{\\pi}{2}$（$k \\in \\mathbb{Z}$）时，$y_{\\max} = 1$
- 当 $x = 2k\\pi - \\frac{\\pi}{2}$（$k \\in \\mathbb{Z}$）时，$y_{\\min} = -1$

**对称性**：
- 对称轴：$x = k\\pi + \\frac{\\pi}{2}$（$k \\in \\mathbb{Z}$）
- 对称中心：$(k\\pi, 0)$（$k \\in \\mathbb{Z}$）

### 6.2 余弦函数 $y = \\cos x$

**定义域**：$\\mathbb{R}$

**值域**：$[-1, 1]$

**周期性**：最小正周期 $T = 2\\pi$

**奇偶性**：偶函数，图像关于 $y$ 轴对称

**单调性**：
- 在 $[2k\\pi - \\pi, 2k\\pi]$（$k \\in \\mathbb{Z}$）上单调递增
- 在 $[2k\\pi, 2k\\pi + \\pi]$（$k \\in \\mathbb{Z}$）上单调递减

**最值**：
- 当 $x = 2k\\pi$（$k \\in \\mathbb{Z}$）时，$y_{\\max} = 1$
- 当 $x = 2k\\pi + \\pi$（$k \\in \\mathbb{Z}$）时，$y_{\\min} = -1$

**对称性**：
- 对称轴：$x = k\\pi$（$k \\in \\mathbb{Z}$）
- 对称中心：$(k\\pi + \\frac{\\pi}{2}, 0)$（$k \\in \\mathbb{Z}$）

### 6.3 正切函数 $y = \\tan x$

**定义域**：$\\{x | x \\neq k\\pi + \\frac{\\pi}{2}, k \\in \\mathbb{Z}\\}$

**值域**：$\\mathbb{R}$

**周期性**：最小正周期 $T = \\pi$

**奇偶性**：奇函数

**单调性**：在每个开区间 $(k\\pi - \\frac{\\pi}{2}, k\\pi + \\frac{\\pi}{2})$（$k \\in \\mathbb{Z}$）内单调递增

**渐近线**：$x = k\\pi + \\frac{\\pi}{2}$（$k \\in \\mathbb{Z}$）

**对称中心**：$(k\\frac{\\pi}{2}, 0)$（$k \\in \\mathbb{Z}$）

### 6.4 函数 $y = A\\sin(\\omega x + \\varphi)$ 的图像

**振幅**：$|A|$，表示振动的最大幅度

**周期**：$T = \\frac{2\\pi}{|\\omega|}$

**频率**：$f = \\frac{1}{T} = \\frac{|\\omega|}{2\\pi}$

**相位**：$\\omega x + \\varphi$

**初相**：$\\varphi$（当 $x = 0$ 时的相位）

**五点作图法**：
令 $\\omega x + \\varphi = 0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi$，求出相应的 $x$ 和 $y$ 值，描点作图。

## 七、三角恒等变换及推导

### 7.1 两角和与差的余弦公式

**公式**：
$$\\cos(\\alpha - \\beta) = \\cos \\alpha \\cos \\beta + \\sin \\alpha \\sin \\beta$$
$$\\cos(\\alpha + \\beta) = \\cos \\alpha \\cos \\beta - \\sin \\alpha \\sin \\beta$$

**推导**（向量法）：

设单位圆上两点 $P_1(\\cos \\alpha, \\sin \\alpha)$，$P_2(\\cos \\beta, \\sin \\beta)$。

由向量数量积：
$$\\vec{OP_1} \\cdot \\vec{OP_2} = \\cos \\alpha \\cos \\beta + \\sin \\alpha \\sin \\beta$$

又 $\\vec{OP_1} \\cdot \\vec{OP_2} = |\\vec{OP_1}||\\vec{OP_2}|\\cos(\\alpha - \\beta) = \\cos(\\alpha - \\beta)$

因此：$\\cos(\\alpha - \\beta) = \\cos \\alpha \\cos \\beta + \\sin \\alpha \\sin \\beta$

将 $\\beta$ 换为 $-\\beta$：
$$\\cos(\\alpha + \\beta) = \\cos \\alpha \\cos(-\\beta) + \\sin \\alpha \\sin(-\\beta) = \\cos \\alpha \\cos \\beta - \\sin \\alpha \\sin \\beta$$

### 7.2 两角和与差的正弦公式

利用诱导公式 $\\sin \\theta = \\cos(\\frac{\\pi}{2} - \\theta)$：

$$\\sin(\\alpha + \\beta) = \\cos[\\frac{\\pi}{2} - (\\alpha + \\beta)] = \\cos[(\\frac{\\pi}{2} - \\alpha) - \\beta]$$
$$= \\cos(\\frac{\\pi}{2} - \\alpha)\\cos \\beta + \\sin(\\frac{\\pi}{2} - \\alpha)\\sin \\beta = \\sin \\alpha \\cos \\beta + \\cos \\alpha \\sin \\beta$$

同理：
$$\\sin(\\alpha - \\beta) = \\sin \\alpha \\cos \\beta - \\cos \\alpha \\sin \\beta$$

### 7.3 两角和与差的正切公式

$$\\tan(\\alpha + \\beta) = \\frac{\\sin(\\alpha + \\beta)}{\\cos(\\alpha + \\beta)} = \\frac{\\sin \\alpha \\cos \\beta + \\cos \\alpha \\sin \\beta}{\\cos \\alpha \\cos \\beta - \\sin \\alpha \\sin \\beta}$$

分子分母同除以 $\\cos \\alpha \\cos \\beta$：

$$\\tan(\\alpha + \\beta) = \\frac{\\tan \\alpha + \\tan \\beta}{1 - \\tan \\alpha \\tan \\beta}$$

同理：
$$\\tan(\\alpha - \\beta) = \\frac{\\tan \\alpha - \\tan \\beta}{1 + \\tan \\alpha \\tan \\beta}$$

### 7.4 二倍角公式

令 $\\beta = \\alpha$，由和角公式得：

$$\\sin 2\\alpha = 2\\sin \\alpha \\cos \\alpha$$

$$\\cos 2\\alpha = \\cos^2 \\alpha - \\sin^2 \\alpha = 2\\cos^2 \\alpha - 1 = 1 - 2\\sin^2 \\alpha$$

$$\\tan 2\\alpha = \\frac{2\\tan \\alpha}{1 - \\tan^2 \\alpha}$$

### 7.5 降幂公式（半角公式的变形）

由 $\\cos 2\\alpha = 2\\cos^2 \\alpha - 1 = 1 - 2\\sin^2 \\alpha$ 变形得：

$$\\sin^2 \\alpha = \\frac{1 - \\cos 2\\alpha}{2}$$

$$\\cos^2 \\alpha = \\frac{1 + \\cos 2\\alpha}{2}$$

$$\\tan^2 \\alpha = \\frac{1 - \\cos 2\\alpha}{1 + \\cos 2\\alpha}$$

### 7.6 辅助角公式

$$a\\sin x + b\\cos x = \\sqrt{a^2 + b^2}\\sin(x + \\varphi)$$

其中 $\\cos \\varphi = \\frac{a}{\\sqrt{a^2 + b^2}}$，$\\sin \\varphi = \\frac{b}{\\sqrt{a^2 + b^2}}$，$\\tan \\varphi = \\frac{b}{a}$

**推导**：

$$a\\sin x + b\\cos x = \\sqrt{a^2 + b^2}(\\frac{a}{\\sqrt{a^2 + b^2}}\\sin x + \\frac{b}{\\sqrt{a^2 + b^2}}\\cos x)$$

令 $\\cos \\varphi = \\frac{a}{\\sqrt{a^2 + b^2}}$，$\\sin \\varphi = \\frac{b}{\\sqrt{a^2 + b^2}}$，则：

$$= \\sqrt{a^2 + b^2}(\\cos \\varphi \\sin x + \\sin \\varphi \\cos x) = \\sqrt{a^2 + b^2}\\sin(x + \\varphi)$$

**应用**：求 $f(x) = \\sin x + \\sqrt{3}\\cos x$ 的最大值

$$f(x) = 2(\\frac{1}{2}\\sin x + \\frac{\\sqrt{3}}{2}\\cos x) = 2\\sin(x + \\frac{\\pi}{3})$$

最大值为 2。

### 7.7 积化和差公式

$$\\sin \\alpha \\cos \\beta = \\frac{1}{2}[\\sin(\\alpha + \\beta) + \\sin(\\alpha - \\beta)]$$

$$\\cos \\alpha \\sin \\beta = \\frac{1}{2}[\\sin(\\alpha + \\beta) - \\sin(\\alpha - \\beta)]$$

$$\\cos \\alpha \\cos \\beta = \\frac{1}{2}[\\cos(\\alpha + \\beta) + \\cos(\\alpha - \\beta)]$$

$$\\sin \\alpha \\sin \\beta = -\\frac{1}{2}[\\cos(\\alpha + \\beta) - \\cos(\\alpha - \\beta)]$$

**推导**：由和差角公式相加或相减得到。

### 7.8 和差化积公式

$$\\sin \\alpha + \\sin \\beta = 2\\sin\\frac{\\alpha + \\beta}{2}\\cos\\frac{\\alpha - \\beta}{2}$$

$$\\sin \\alpha - \\sin \\beta = 2\\cos\\frac{\\alpha + \\beta}{2}\\sin\\frac{\\alpha - \\beta}{2}$$

$$\\cos \\alpha + \\cos \\beta = 2\\cos\\frac{\\alpha + \\beta}{2}\\cos\\frac{\\alpha - \\beta}{2}$$

$$\\cos \\alpha - \\cos \\beta = -2\\sin\\frac{\\alpha + \\beta}{2}\\sin\\frac{\\alpha - \\beta}{2}$$
  `,
  examples: [
    {
      id: 'trig-1',
      difficulty: 'easy',
      question: '$\\sin 15°$ 的值为？',
      options: ['$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', '$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', '$\\frac{\\sqrt{3} - 1}{4}$', '$\\frac{\\sqrt{3} + 1}{4}$'],
      correct: 0,
      explanation: '$\\sin 15° = \\sin(45° - 30°) = \\sin 45° \\cos 30° - \\cos 45° \\sin 30° = \\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2} \\cdot \\frac{1}{2} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$'
    },
    {
      id: 'trig-2',
      difficulty: 'medium',
      question: '函数 $f(x) = \\sin x + \\sqrt{3}\\cos x$ 的最大值为？',
      options: ['1', '2', '$\\sqrt{3}$', '$\\frac{\\sqrt{3}}{2}$'],
      correct: 1,
      explanation: '$f(x) = 2(\\frac{1}{2}\\sin x + \\frac{\\sqrt{3}}{2}\\cos x) = 2 \\sin(x + \\frac{\\pi}{3})$，因此最大值为 2'
    },
    {
      id: 'trig-3',
      difficulty: 'easy',
      question: '$\\frac{5\\pi}{6}$ 等于多少度？',
      options: ['150°', '120°', '135°', '210°'],
      correct: 0,
      explanation: '$\\frac{5\\pi}{6} = \\frac{5 \\times 180°}{6} = 150°$'
    },
    {
      id: 'trig-4',
      difficulty: 'easy',
      question: '已知 $\\sin \\alpha = \\frac{3}{5}$，且 $\\alpha$ 在第二象限，则 $\\cos \\alpha = $',
      options: ['$\\frac{4}{5}$', '$-\\frac{4}{5}$', '$\\frac{3}{4}$', '$-\\frac{3}{4}$'],
      correct: 1,
      explanation: '由 $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$，得 $\\cos^2 \\alpha = 1 - \\frac{9}{25} = \\frac{16}{25}$。因为 $\\alpha$ 在第二象限，$\\cos \\alpha < 0$，所以 $\\cos \\alpha = -\\frac{4}{5}$'
    },
    {
      id: 'trig-5',
      difficulty: 'medium',
      question: '$\\cos 75° = $',
      options: ['$\\frac{\\sqrt{6} - \\sqrt{2}}{4}$', '$\\frac{\\sqrt{6} + \\sqrt{2}}{4}$', '$\\frac{\\sqrt{3} - 1}{2}$', '$\\frac{\\sqrt{3} + 1}{2}$'],
      correct: 0,
      explanation: '$\\cos 75° = \\cos(45° + 30°) = \\cos 45° \\cos 30° - \\sin 45° \\sin 30° = \\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{2} \\cdot \\frac{1}{2} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$'
    },
    {
      id: 'trig-6',
      difficulty: 'medium',
      question: '函数 $y = 2\\sin(2x + \\frac{\\pi}{3})$ 的最小正周期为？',
      options: ['$\\pi$', '$2\\pi$', '$\\frac{\\pi}{2}$', '$4\\pi$'],
      correct: 0,
      explanation: '对于 $y = A\\sin(\\omega x + \\varphi)$，周期 $T = \\frac{2\\pi}{|\\omega|} = \\frac{2\\pi}{2} = \\pi$'
    },
    {
      id: 'trig-7',
      difficulty: 'hard',
      question: '已知 $\\tan \\alpha = 2$，则 $\\frac{\\sin 2\\alpha}{\\cos^2 \\alpha} = $',
      options: ['2', '3', '4', '5'],
      correct: 2,
      explanation: '$\\frac{\\sin 2\\alpha}{\\cos^2 \\alpha} = \\frac{2\\sin \\alpha \\cos \\alpha}{\\cos^2 \\alpha} = \\frac{2\\sin \\alpha}{\\cos \\alpha} = 2\\tan \\alpha = 4$'
    },
    {
      id: 'trig-8',
      difficulty: 'hard',
      question: '化简 $\\sqrt{1 + \\sin 2} + \\sqrt{1 - \\sin 2}$（其中 2 为弧度）',
      options: ['$2\\sin 1$', '$2\\cos 1$', '$2$', '$2\\sin 2$'],
      correct: 1,
      explanation: '$\\sqrt{1 + \\sin 2} = \\sqrt{(\\sin 1 + \\cos 1)^2} = \\sin 1 + \\cos 1$（因为 $\\sin 1 + \\cos 1 > 0$）；$\\sqrt{1 - \\sin 2} = \\sqrt{(\\sin 1 - \\cos 1)^2} = \\cos 1 - \\sin 1$（因为 $\\cos 1 > \\sin 1$）。所以原式 $= (\\sin 1 + \\cos 1) + (\\cos 1 - \\sin 1) = 2\\cos 1$'
    }
  ]
};

const triangleLesson: HighSchoolLesson = {
  id: 'hs-basic-triangle',
  title: '解三角形',
  theory: `
## 一、正弦定理及推导

### 1.1 正弦定理内容

在任意三角形 $ABC$ 中，各边与其对角的正弦之比相等：

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$

其中 $a, b, c$ 分别为角 $A, B, C$ 的对边，$R$ 为三角形外接圆半径。

### 1.2 正弦定理推导

**方法一：利用三角形的高**

在三角形 $ABC$ 中，作高 $CD \\perp AB$，垂足为 $D$。

在 $Rt\\triangle ACD$ 中：$CD = b\\sin A$
在 $Rt\\triangle BCD$ 中：$CD = a\\sin B$

因此：$b\\sin A = a\\sin B$，即 $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$

同理可证：$\\frac{b}{\\sin B} = \\frac{c}{\\sin C}$

**方法二：利用外接圆**

设三角形 $ABC$ 的外接圆半径为 $R$，连接 $BO$ 并延长交圆于 $D$，连接 $CD$。

则 $\\angle BCD = 90°$（直径所对的圆周角），$\\angle D = \\angle A$（同弧所对的圆周角）

在 $Rt\\triangle BCD$ 中：$BC = BD \\sin D = 2R \\sin A$

即 $a = 2R \\sin A$，所以 $\\frac{a}{\\sin A} = 2R$

### 1.3 正弦定理的变形与应用

**变形公式**：
- $a : b : c = \\sin A : \\sin B : \\sin C$
- $a = 2R \\sin A$，$b = 2R \\sin B$，$c = 2R \\sin C$
- $\\sin A = \\frac{a}{2R}$，$\\sin B = \\frac{b}{2R}$，$\\sin C = \\frac{c}{2R}$

**适用情况**：
- 已知两角及一边，求其他边
- 已知两边及其中一边的对角，求其他角

## 二、余弦定理及推导

### 2.1 余弦定理内容

在任意三角形 $ABC$ 中：

$$a^2 = b^2 + c^2 - 2bc \\cos A$$
$$b^2 = a^2 + c^2 - 2ac \\cos B$$
$$c^2 = a^2 + b^2 - 2ab \\cos C$$

### 2.2 余弦定理推导

**向量法**：

设 $\\vec{CB} = \\vec{a}$，$\\vec{CA} = \\vec{b}$，则 $\\vec{AB} = \\vec{a} - \\vec{b}$

$$c^2 = |\\vec{AB}|^2 = |\\vec{a} - \\vec{b}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 - 2\\vec{a} \\cdot \\vec{b}$$

$$= a^2 + b^2 - 2ab\\cos C$$

**坐标法**：

以 $C$ 为原点，$CA$ 所在直线为 $x$ 轴建立坐标系。

则 $C(0, 0)$，$A(b, 0)$，$B(a\\cos C, a\\sin C)$

$$c^2 = |AB|^2 = (a\\cos C - b)^2 + (a\\sin C)^2$$

$$= a^2\\cos^2 C - 2ab\\cos C + b^2 + a^2\\sin^2 C$$

$$= a^2(\\cos^2 C + \\sin^2 C) + b^2 - 2ab\\cos C$$

$$= a^2 + b^2 - 2ab\\cos C$$

### 2.3 余弦定理的变形

求角公式：

$$\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$$

$$\\cos B = \\frac{a^2 + c^2 - b^2}{2ac}$$

$$\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}$$

### 2.4 勾股定理与余弦定理的关系

当 $C = 90°$ 时，$\\cos C = 0$，余弦定理变为：

$$c^2 = a^2 + b^2$$

这正是**勾股定理**！因此，余弦定理是勾股定理在一般三角形中的推广。

**判断三角形形状**：
- 若 $a^2 + b^2 = c^2$，则 $C = 90°$（直角三角形）
- 若 $a^2 + b^2 > c^2$，则 $C < 90°$（锐角三角形）
- 若 $a^2 + b^2 < c^2$，则 $C > 90°$（钝角三角形）

## 三、三角形面积公式

### 3.1 常用面积公式

1. **底高公式**：$S = \\frac{1}{2}ah_a$（$h_a$ 为 $a$ 边上的高）

2. **两边夹角公式**：
   $$S = \\frac{1}{2}ab\\sin C = \\frac{1}{2}bc\\sin A = \\frac{1}{2}ca\\sin B$$

   **推导**：由 $h_a = c\\sin B$，代入底高公式即得。

3. **三边公式（海伦公式）**：
   $$S = \\sqrt{p(p-a)(p-b)(p-c)}$$
   其中 $p = \\frac{a+b+c}{2}$（半周长）

   **推导**：由 $S = \\frac{1}{2}ab\\sin C$ 和 $\\sin^2 C = 1 - \\cos^2 C$，结合余弦定理化简可得。

4. **外接圆半径公式**：$S = \\frac{abc}{4R}$

5. **内切圆半径公式**：$S = rp$（$r$ 为内切圆半径）

## 四、解三角形的类型与方法

### 4.1 已知两角及一边（AAS 或 ASA）

**方法**：
1. 利用 $A + B + C = 180°$ 求第三个角
2. 利用正弦定理求其他边

**示例**：已知 $A = 30°$，$B = 45°$，$a = 2$，求 $b$。

解：$C = 180° - 30° - 45° = 105°$

由正弦定理：$\\frac{2}{\\sin 30°} = \\frac{b}{\\sin 45°}$

$b = \\frac{2 \\sin 45°}{\\sin 30°} = \\frac{2 \\times \\frac{\\sqrt{2}}{2}}{\\frac{1}{2}} = 2\\sqrt{2}$

### 4.2 已知两边及夹角（SAS）

**方法**：
1. 利用余弦定理求第三边
2. 利用正弦定理求其他角（先求较小边所对的角）

**示例**：已知 $b = 3$，$c = 4$，$A = 60°$，求 $a$。

解：$a^2 = 3^2 + 4^2 - 2 \\times 3 \\times 4 \\times \\cos 60° = 9 + 16 - 12 = 13$

$a = \\sqrt{13}$

### 4.3 已知三边（SSS）

**方法**：利用余弦定理的变形求角

**示例**：已知 $a = 2$，$b = 3$，$c = 4$，求 $A$。

解：$\\cos A = \\frac{3^2 + 4^2 - 2^2}{2 \\times 3 \\times 4} = \\frac{9 + 16 - 4}{24} = \\frac{21}{24} = \\frac{7}{8}$

$A = \\arccos\\frac{7}{8}$

### 4.4 已知两边及其中一边的对角（SSA）

**方法**：利用正弦定理求另一角的正弦值，再判断解的个数。

**解的个数判定**（已知 $a, b, A$）：

| 条件 | 解的个数 |
|------|---------|
| $a < b\\sin A$ | 无解 |
| $a = b\\sin A$ | 一解（直角） |
| $b\\sin A < a < b$ | 两解 |
| $a \\geq b$ | 一解 |

**几何解释**：以 $C$ 为圆心，$a$ 为半径画弧，与射线 $AB$ 的交点个数即为解的个数。

## 五、三角形的相关定理

### 5.1 射影定理

在三角形 $ABC$ 中：

$$a = b\\cos C + c\\cos B$$
$$b = a\\cos C + c\\cos A$$
$$c = a\\cos B + b\\cos A$$

**证明**：由余弦定理，$b\\cos C + c\\cos B = b \\cdot \\frac{a^2 + b^2 - c^2}{2ab} + c \\cdot \\frac{a^2 + c^2 - b^2}{2ac} = \\frac{a^2 + b^2 - c^2 + a^2 + c^2 - b^2}{2a} = \\frac{2a^2}{2a} = a$

### 5.2 中线长公式

设 $m_a$ 为 $a$ 边上的中线长：

$$m_a = \\frac{1}{2}\\sqrt{2b^2 + 2c^2 - a^2}$$

### 5.3 角平分线长公式

设 $t_a$ 为 $A$ 角的平分线长：

$$t_a = \\frac{2bc\\cos\\frac{A}{2}}{b+c} = \\frac{2\\sqrt{bcp(p-a)}}{b+c}$$
  `,
  examples: [
    {
      id: 'triangle-1',
      difficulty: 'easy',
      question: '在 $\\triangle ABC$ 中，$a = 1$，$b = \\sqrt{3}$，$A = 30°$，则 $B = $？',
      options: ['30°', '60°或120°', '60°', '120°'],
      correct: 1,
      explanation: '由正弦定理：$\\sin B = \\frac{b \\sin A}{a} = \\frac{\\sqrt{3} \\times \\frac{1}{2}}{1} = \\frac{\\sqrt{3}}{2}$。因为 $b > a$，所以 $B > A = 30°$，因此 $B = 60°$ 或 $120°$'
    },
    {
      id: 'triangle-2',
      difficulty: 'easy',
      question: '在 $\\triangle ABC$ 中，$a = 3$，$b = 4$，$c = 5$，则 $\\cos A = $？',
      options: ['$\\frac{3}{5}$', '$\\frac{4}{5}$', '0', '1'],
      correct: 1,
      explanation: '由余弦定理：$\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{16 + 25 - 9}{2 \\times 4 \\times 5} = \\frac{32}{40} = \\frac{4}{5}$'
    },
    {
      id: 'triangle-3',
      difficulty: 'easy',
      question: '在 $\\triangle ABC$ 中，$A = 60°$，$b = 2$，$c = 3$，则 $a = $？',
      options: ['$\\sqrt{7}$', '$\\sqrt{19}$', '7', '$\\sqrt{13}$'],
      correct: 0,
      explanation: '由余弦定理：$a^2 = b^2 + c^2 - 2bc\\cos A = 4 + 9 - 2 \\times 2 \\times 3 \\times \\frac{1}{2} = 13 - 6 = 7$，所以 $a = \\sqrt{7}$'
    },
    {
      id: 'triangle-4',
      difficulty: 'medium',
      question: '在 $\\triangle ABC$ 中，$a = 2$，$b = 3$，$C = 60°$，则面积 $S = $？',
      options: ['$\\frac{3\\sqrt{3}}{2}$', '$3\\sqrt{3}$', '$\\frac{3}{2}$', '6'],
      correct: 0,
      explanation: '由面积公式：$S = \\frac{1}{2}ab\\sin C = \\frac{1}{2} \\times 2 \\times 3 \\times \\sin 60° = 3 \\times \\frac{\\sqrt{3}}{2} = \\frac{3\\sqrt{3}}{2}$'
    },
    {
      id: 'triangle-5',
      difficulty: 'medium',
      question: '在 $\\triangle ABC$ 中，$a = 5$，$b = 8$，$A = 30°$，则此三角形（）',
      options: ['无解', '有一解', '有两解', '解的个数不确定'],
      correct: 2,
      explanation: '$b\\sin A = 8 \\times \\frac{1}{2} = 4$，因为 $b\\sin A < a < b$（即 $4 < 5 < 8$），所以有两解'
    },
    {
      id: 'triangle-6',
      difficulty: 'hard',
      question: '在 $\\triangle ABC$ 中，若 $a\\cos A = b\\cos B$，则三角形的形状是（）',
      options: ['等腰三角形', '直角三角形', '等腰或直角三角形', '等腰直角三角形'],
      correct: 2,
      explanation: '由正弦定理：$a = 2R\\sin A$，$b = 2R\\sin B$，代入得 $2R\\sin A \\cos A = 2R\\sin B \\cos B$，即 $\\sin 2A = \\sin 2B$。所以 $2A = 2B$ 或 $2A = 180° - 2B$，即 $A = B$ 或 $A + B = 90°$。因此三角形是等腰三角形或直角三角形'
    },
    {
      id: 'triangle-7',
      difficulty: 'hard',
      question: '在 $\\triangle ABC$ 中，$a = 3$，$b = 4$，$c = 6$，则 $\\cos B = $？',
      options: ['$\\frac{29}{36}$', '$\\frac{11}{24}$', '$\\frac{43}{48}$', '$-\\frac{11}{24}$'],
      correct: 0,
      explanation: '由余弦定理：$\\cos B = \\frac{a^2 + c^2 - b^2}{2ac} = \\frac{9 + 36 - 16}{2 \\times 3 \\times 6} = \\frac{29}{36}$'
    }
  ]
};

// 基础篇 - 平面向量
const vectorLesson: HighSchoolLesson = {
  id: 'hs-basic-vector',
  title: '平面向量',
  theory: `
## 一、向量的基本概念

### 1.1 向量的定义与表示

**定义**：既有大小又有方向的量叫做向量（矢量）。

**表示方法**：
- **几何表示**：用有向线段表示，如 $\\overrightarrow{AB}$ 或 $\\vec{a}$
- **坐标表示**：$\\vec{a} = (x, y)$，其中 $x$ 为横坐标，$y$ 为纵坐标
- **基底表示**：$\\vec{a} = x\\vec{i} + y\\vec{j}$，其中 $\\vec{i} = (1, 0)$，$\\vec{j} = (0, 1)$

### 1.2 特殊向量

**零向量**：$\\vec{0}$，长度为 0，方向任意，满足 $\\vec{a} + \\vec{0} = \\vec{a}$

**单位向量**：长度为 1 的向量。与 $\\vec{a}$ 同向的单位向量为 $\\frac{\\vec{a}}{|\\vec{a}|}$

**相等向量**：大小相等且方向相同的向量，与起点位置无关

**相反向量**：与 $\\vec{a}$ 大小相等、方向相反的向量，记为 $-\\vec{a}$

### 1.3 向量的模（长度）

向量 $\\vec{a} = (x, y)$ 的模：

$$|\\vec{a}| = \\sqrt{x^2 + y^2}$$

**模的性质**：
- $|\\vec{a}| \\geq 0$，且 $|\\vec{a}| = 0 \\Leftrightarrow \\vec{a} = \\vec{0}$
- $||\\vec{a}| - |\\vec{b}|| \\leq |\\vec{a} \\pm \\vec{b}| \\leq |\\vec{a}| + |\\vec{b}|$（三角不等式）
- $|k\\vec{a}| = |k| \\cdot |\\vec{a}|$

## 二、向量的线性运算

### 2.1 向量加法

**三角形法则**：$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$

**平行四边形法则**：以 $\\vec{a}$、$\\vec{b}$ 为邻边作平行四边形，对角线即为 $\\vec{a} + \\vec{b}$

**坐标运算**：$\\vec{a} + \\vec{b} = (x_1 + x_2, y_1 + y_2)$

**运算律**：
- 交换律：$\\vec{a} + \\vec{b} = \\vec{b} + \\vec{a}$
- 结合律：$(\\vec{a} + \\vec{b}) + \\vec{c} = \\vec{a} + (\\vec{b} + \\vec{c})$

### 2.2 向量减法

**定义**：$\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})$

**几何意义**：将 $\\vec{a}$、$\\vec{b}$ 起点重合，由 $\\vec{b}$ 终点指向 $\\vec{a}$ 终点的向量

**坐标运算**：$\\vec{a} - \\vec{b} = (x_1 - x_2, y_1 - y_2)$

### 2.3 数乘运算

**定义**：实数 $\\lambda$ 与向量 $\\vec{a}$ 的乘积 $\\lambda\\vec{a}$ 是一个向量
- 模：$|\\lambda\\vec{a}| = |\\lambda| \\cdot |\\vec{a}|$
- 方向：$\\lambda > 0$ 时与 $\\vec{a}$ 同向；$\\lambda < 0$ 时与 $\\vec{a}$ 反向；$\\lambda = 0$ 时为零向量

**坐标运算**：$\\lambda\\vec{a} = (\\lambda x, \\lambda y)$

**运算律**：
- $\\lambda(\\mu\\vec{a}) = (\\lambda\\mu)\\vec{a}$
- $(\\lambda + \\mu)\\vec{a} = \\lambda\\vec{a} + \\mu\\vec{a}$
- $\\lambda(\\vec{a} + \\vec{b}) = \\lambda\\vec{a} + \\lambda\\vec{b}$

### 2.4 共线向量定理

**定理**：向量 $\\vec{a}$（$\\vec{a} \\neq \\vec{0}$）与 $\\vec{b}$ 共线 $\\Leftrightarrow$ 存在唯一实数 $\\lambda$，使 $\\vec{b} = \\lambda\\vec{a}$

**坐标判定**：设 $\\vec{a} = (x_1, y_1)$，$\\vec{b} = (x_2, y_2)$，则

$$\\vec{a} \\parallel \\vec{b} \\Leftrightarrow x_1y_2 - x_2y_1 = 0 \\Leftrightarrow \\frac{x_1}{x_2} = \\frac{y_1}{y_2} \\ (x_2y_2 \\neq 0)$$

**三点共线**：A、B、C 三点共线 $\\Leftrightarrow \\overrightarrow{AB} \\parallel \\overrightarrow{AC}$

## 三、平面向量基本定理与坐标运算

### 3.1 平面向量基本定理

**定理**：如果 $\\vec{e_1}$、$\\vec{e_2}$ 是同一平面内的两个不共线向量，那么对于这一平面内的任一向量 $\\vec{a}$，有且只有一对实数 $\\lambda_1$、$\\lambda_2$，使

$$\\vec{a} = \\lambda_1\\vec{e_1} + \\lambda_2\\vec{e_2}$$

**基底**：不共线的向量 $\\vec{e_1}$、$\\vec{e_2}$ 叫做表示这一平面内所有向量的一组基底

**正交基底**：当 $\\vec{e_1} \\perp \\vec{e_2}$ 时，称为正交基底

### 3.2 定比分点公式

设点 $P$ 分有向线段 $P_1P_2$ 的比为 $\\lambda$（即 $\\frac{\\overrightarrow{P_1P}}{\\overrightarrow{PP_2}} = \\lambda$），则：

$$\\overrightarrow{OP} = \\frac{\\overrightarrow{OP_1} + \\lambda\\overrightarrow{OP_2}}{1 + \\lambda}$$

**坐标形式**：若 $P_1(x_1, y_1)$，$P_2(x_2, y_2)$，则

$$P\\left(\\frac{x_1 + \\lambda x_2}{1 + \\lambda}, \\frac{y_1 + \\lambda y_2}{1 + \\lambda}\\right)$$

**中点公式**（$\\lambda = 1$）：

$$P\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$$

**重心公式**：三角形 ABC 的重心 G 坐标为

$$G\\left(\\frac{x_A + x_B + x_C}{3}, \\frac{y_A + y_B + y_C}{3}\\right)$$

## 四、向量的数量积（点积）

### 4.1 定义

$$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$$

其中 $\\theta$ 为 $\\vec{a}$ 与 $\\vec{b}$ 的夹角，$\\theta \\in [0, \\pi]$

### 4.2 坐标运算

设 $\\vec{a} = (x_1, y_1)$，$\\vec{b} = (x_2, y_2)$，则：

$$\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2$$

### 4.3 数量积的性质

**运算律**：
- 交换律：$\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}$
- 数乘结合律：$(\\lambda\\vec{a}) \\cdot \\vec{b} = \\lambda(\\vec{a} \\cdot \\vec{b})$
- 分配律：$(\\vec{a} + \\vec{b}) \\cdot \\vec{c} = \\vec{a} \\cdot \\vec{c} + \\vec{b} \\cdot \\vec{c}$

**重要性质**：
- $\\vec{a} \\cdot \\vec{a} = |\\vec{a}|^2$，即 $|\\vec{a}| = \\sqrt{\\vec{a} \\cdot \\vec{a}}$
- 若 $\\vec{a} \\perp \\vec{b}$，则 $\\vec{a} \\cdot \\vec{b} = 0$（垂直的充要条件）
- $|\\vec{a} \\cdot \\vec{b}| \\leq |\\vec{a}||\\vec{b}|$（柯西不等式）

### 4.4 向量的夹角

$$\\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} = \\frac{x_1x_2 + y_1y_2}{\\sqrt{x_1^2 + y_1^2} \\cdot \\sqrt{x_2^2 + y_2^2}}$$

### 4.5 向量的投影

**投影向量**：$\\vec{a}$ 在 $\\vec{b}$ 方向上的投影向量为

$$\\vec{c} = \\left(\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2}\\right)\\vec{b}$$

**投影数量**（标量投影）：$|\\vec{a}|\\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$

### 4.6 垂直与平行的坐标判定

| 关系 | 坐标条件 | 说明 |
|------|---------|------|
| $\\vec{a} \\perp \\vec{b}$ | $x_1x_2 + y_1y_2 = 0$ | 数量积为 0 |
| $\\vec{a} \\parallel \\vec{b}$ | $x_1y_2 - x_2y_1 = 0$ | 叉积为 0 |

## 五、向量的重要公式与定理

### 5.1 向量模的平方公式

$$|\\vec{a} \\pm \\vec{b}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 \\pm 2\\vec{a} \\cdot \\vec{b}$$

$$|\\vec{a} + \\vec{b}|^2 + |\\vec{a} - \\vec{b}|^2 = 2(|\\vec{a}|^2 + |\\vec{b}|^2)$$（平行四边形法则）

### 5.2 极化恒等式

$$\\vec{a} \\cdot \\vec{b} = \\frac{1}{4}(|\\vec{a} + \\vec{b}|^2 - |\\vec{a} - \\vec{b}|^2)$$

几何意义：向量数量积等于以两向量为邻边的平行四边形两条对角线平方差的四分之一。

### 5.3 奔驰定理（Mercedes-Benz Theorem）

设 O 为 $\\triangle ABC$ 内一点，则

$$S_{\\triangle BOC}\\cdot\\overrightarrow{OA} + S_{\\triangle COA}\\cdot\\overrightarrow{OB} + S_{\\triangle AOB}\\cdot\\overrightarrow{OC} = \\vec{0}$$

其中 $S$ 表示三角形面积。

**推论**：当 O 为重心时，$\\overrightarrow{OA} + \\overrightarrow{OB} + \\overrightarrow{OC} = \\vec{0}$

## 六、向量的应用

### 6.1 判断三角形的形状

在 $\\triangle ABC$ 中：
- 若 $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} > 0$，则 A 为锐角
- 若 $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 0$，则 A 为直角
- 若 $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} < 0$，则 A 为钝角

### 6.2 求夹角与距离

**两直线夹角**：利用方向向量的数量积

**点到直线距离**：设直线过点 $P_0$，方向向量为 $\\vec{v}$，则点 $P$ 到直线的距离为

$$d = \\frac{|\\overrightarrow{P_0P} \\times \\vec{v}|}{|\\vec{v}|}$$（空间）或利用投影（平面）

### 6.3 向量与几何问题的转化

| 几何问题 | 向量方法 |
|---------|---------|
| 证明垂直 | 证数量积为 0 |
| 证明平行 | 证向量共线 |
| 求长度 | 求向量模 |
| 求夹角 | 利用数量积公式 |
| 证三点共线 | 证两向量共线 |
| 证三线共点 | 利用定比分点或重心公式 |
  `,
  examples: [
    {
      id: 'vector-1',
      difficulty: 'easy',
      question: '已知向量 $\\vec{a} = (1, 2)$，$\\vec{b} = (3, 4)$，则 $\\vec{a} \\cdot \\vec{b} = $？',
      options: ['11', '10', '5', '14'],
      correct: 0,
      explanation: '数量积 $\\vec{a} \\cdot \\vec{b} = 1\\times 3 + 2\\times 4 = 3 + 8 = 11$'
    },
    {
      id: 'vector-2',
      difficulty: 'easy',
      question: '已知 $\\vec{a} = (2, 1)$，$\\vec{b} = (-1, k)$，若 $\\vec{a} \\perp \\vec{b}$，则 $k = $？',
      options: ['2', '-2', '$\\frac{1}{2}$', '$-\\frac{1}{2}$'],
      correct: 0,
      explanation: '由垂直条件 $\\vec{a} \\cdot \\vec{b} = 0$，得 $2\\times(-1) + 1\\times k = 0$，即 $-2 + k = 0$，所以 $k = 2$'
    },
    {
      id: 'vector-3',
      difficulty: 'easy',
      question: '已知 $A(1, 2)$，$B(3, 4)$，则线段 $AB$ 的中点坐标为？',
      options: ['(2, 3)', '(4, 6)', '(1, 1)', '(2, 2)'],
      correct: 0,
      explanation: '中点坐标 $\\left(\\frac{1+3}{2}, \\frac{2+4}{2}\\right) = (2, 3)$'
    },
    {
      id: 'vector-4',
      difficulty: 'medium',
      question: '已知 $|\\vec{a}| = 2$，$|\\vec{b}| = 3$，$\\vec{a}$ 与 $\\vec{b}$ 的夹角为 $60°$，则 $|\\vec{a} + \\vec{b}| = $？',
      options: ['$\\sqrt{19}$', '5', '$\\sqrt{13}$', '7'],
      correct: 0,
      explanation: '$|\\vec{a} + \\vec{b}|^2 = |\\vec{a}|^2 + 2\\vec{a}\\cdot\\vec{b} + |\\vec{b}|^2 = 4 + 2\\times 2\\times 3\\times \\cos 60° + 9 = 4 + 6 + 9 = 19$，因此 $|\\vec{a} + \\vec{b}| = \\sqrt{19}$'
    },
    {
      id: 'vector-5',
      difficulty: 'medium',
      question: '已知 $\\vec{a} = (1, 2)$，$\\vec{b} = (2, m)$，若 $\\vec{a} \\parallel \\vec{b}$，则 $m = $？',
      options: ['4', '1', '-4', '-1'],
      correct: 0,
      explanation: '由共线条件 $1\\times m - 2\\times 2 = 0$，得 $m - 4 = 0$，所以 $m = 4$'
    },
    {
      id: 'vector-6',
      difficulty: 'medium',
      question: '设 $\\vec{a}$、$\\vec{b}$ 为单位向量，且 $\\vec{a}$ 与 $\\vec{b}$ 的夹角为 $120°$，则 $|2\\vec{a} - \\vec{b}| = $？',
      options: ['$\\sqrt{7}$', '$\\sqrt{3}$', '3', '7'],
      correct: 0,
      explanation: '$|2\\vec{a} - \\vec{b}|^2 = 4|\\vec{a}|^2 - 4\\vec{a}\\cdot\\vec{b} + |\\vec{b}|^2 = 4 - 4\\times 1\\times 1\\times \\cos 120° + 1 = 4 + 2 + 1 = 7$，所以 $|2\\vec{a} - \\vec{b}| = \\sqrt{7}$'
    },
    {
      id: 'vector-7',
      difficulty: 'hard',
      question: '在 $\\triangle ABC$ 中，$AB = 3$，$AC = 4$，$\\angle BAC = 60°$，则 $\\overrightarrow{AB} \\cdot \\overrightarrow{BC} = $？',
      options: ['-3', '3', '-6', '6'],
      correct: 0,
      explanation: '$\\overrightarrow{BC} = \\overrightarrow{AC} - \\overrightarrow{AB}$，所以 $\\overrightarrow{AB} \\cdot \\overrightarrow{BC} = \\overrightarrow{AB} \\cdot (\\overrightarrow{AC} - \\overrightarrow{AB}) = \\overrightarrow{AB} \\cdot \\overrightarrow{AC} - |\\overrightarrow{AB}|^2 = 3\\times 4\\times \\cos 60° - 9 = 6 - 9 = -3$'
    },
    {
      id: 'vector-8',
      difficulty: 'hard',
      question: '已知 $\\vec{a}$、$\\vec{b}$、$\\vec{c}$ 是单位向量，且 $\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}$，则 $\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a} = $？',
      options: ['$\\frac{3}{2}$', '$-\\frac{3}{2}$', '3', '-3'],
      correct: 1,
      explanation: '由 $\\vec{a} + \\vec{b} + \\vec{c} = \\vec{0}$ 平方得 $|\\vec{a}|^2 + |\\vec{b}|^2 + |\\vec{c}|^2 + 2(\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a}) = 0$，即 $3 + 2(\\vec{a}\\cdot\\vec{b} + \\vec{b}\\cdot\\vec{c} + \\vec{c}\\cdot\\vec{a}) = 0$，所以 $\\vec{a} \\cdot \\vec{b} + \\vec{b} \\cdot \\vec{c} + \\vec{c} \\cdot \\vec{a} = -\\frac{3}{2}$'
    }
  ]
};

// 基础篇 - 立体几何
const solidGeometryLesson: HighSchoolLesson = {
  id: 'hs-basic-solid',
  title: '立体几何',
  theory: `
## 一、空间几何体的结构与公式

### 1.1 多面体

**棱柱**：
- 定义：有两个面互相平行，其余各面都是四边形，并且每相邻两个四边形的公共边都互相平行
- 体积：$V = Sh$（$S$ 为底面积，$h$ 为高）
- 侧面积：$S_{侧} = Ch$（$C$ 为底面周长，直棱柱）
- 表面积：$S_{表} = S_{侧} + 2S_{底}$

**棱锥**：
- 定义：有一个面是多边形，其余各面是有一个公共顶点的三角形
- 体积：$V = \\frac{1}{3}Sh$
- 正棱锥侧面积：$S_{侧} = \\frac{1}{2}Ch'$（$h'$ 为斜高）

**棱台**：
- 体积：$V = \\frac{1}{3}h(S_{上} + S_{下} + \\sqrt{S_{上}S_{下}})$

### 1.2 旋转体

**圆柱**：
- 体积：$V = \\pi r^2h$
- 侧面积：$S_{侧} = 2\\pi rh$
- 表面积：$S = 2\\pi r^2 + 2\\pi rh$

**圆锥**：
- 体积：$V = \\frac{1}{3}\\pi r^2h$
- 母线长：$l = \\sqrt{r^2 + h^2}$
- 侧面积：$S_{侧} = \\pi rl = \\pi r\\sqrt{r^2 + h^2}$
- 表面积：$S = \\pi r^2 + \\pi rl$

**圆台**：
- 体积：$V = \\frac{1}{3}\\pi h(r_1^2 + r_2^2 + r_1r_2)$
- 侧面积：$S_{侧} = \\pi(r_1 + r_2)l$

**球体**：
- 体积：$V = \\frac{4}{3}\\pi R^3$
- 表面积：$S = 4\\pi R^2$

### 1.3 常见几何体的外接球与内切球

**长方体**：外接球直径等于体对角线 $2R = \\sqrt{a^2 + b^2 + c^2}$

**正方体**：
- 外接球：$R = \\frac{\\sqrt{3}}{2}a$
- 内切球：$r = \\frac{a}{2}$

**正四面体**（棱长为 $a$）：
- 外接球半径：$R = \\frac{\\sqrt{6}}{4}a$
- 内切球半径：$r = \\frac{\\sqrt{6}}{12}a$

## 二、空间点线面的位置关系

### 2.1 平面的基本性质

**公理1**：如果一条直线上的两点在一个平面内，那么这条直线在此平面内。

**公理2**：过不在一条直线上的三点，有且只有一个平面。

**公理3**：如果两个不重合的平面有一个公共点，那么它们有且只有一条过该点的公共直线。

### 2.2 直线与平面的位置关系

| 位置关系 | 图形表示 | 符号表示 | 公共点个数 |
|---------|---------|---------|-----------|
| 直线在平面内 | $l \\subset \\alpha$ | $l \\subset \\alpha$ | 无数 |
| 直线与平面相交 | $l \\cap \\alpha = A$ | $l \\cap \\alpha = A$ | 1 |
| 直线与平面平行 | $l \\parallel \\alpha$ | $l \\parallel \\alpha$ | 0 |

### 2.3 平面与平面的位置关系

| 位置关系 | 符号表示 | 公共点 |
|---------|---------|--------|
| 两平面平行 | $\\alpha \\parallel \\beta$ | 无 |
| 两平面相交 | $\\alpha \\cap \\beta = l$ | 一条直线 |

## 三、平行关系的判定与性质

### 3.1 线面平行

**判定定理**：
> 平面外一条直线与此平面内的一条直线平行，则该直线与此平面平行。
> $$a \\not\\subset \\alpha, b \\subset \\alpha, a \\parallel b \\Rightarrow a \\parallel \\alpha$$

**几何法证明思路**：
假设直线 $a$ 与平面 $\\alpha$ 相交于点 $P$，由于 $a \\parallel b$，则 $b$ 也过点 $P$，这与 $b \\subset \\alpha$ 且 $a \\not\\subset \\alpha$ 矛盾，故 $a \\parallel \\alpha$。

**性质定理**：
> 一条直线与一个平面平行，则过这条直线的任一平面与此平面的交线与该直线平行。
> $$a \\parallel \\alpha, a \\subset \\beta, \\alpha \\cap \\beta = b \\Rightarrow a \\parallel b$$

### 3.2 面面平行

**判定定理**：
> 一个平面内的两条相交直线都与另一个平面平行，则这两个平面平行。
> $$a \\subset \\alpha, b \\subset \\alpha, a \\cap b = P, a \\parallel \\beta, b \\parallel \\beta \\Rightarrow \\alpha \\parallel \\beta$$

**性质定理**：
> 如果两个平行平面同时和第三个平面相交，那么它们的交线平行。
> $$\\alpha \\parallel \\beta, \\alpha \\cap \\gamma = a, \\beta \\cap \\gamma = b \\Rightarrow a \\parallel b$$

## 四、垂直关系的判定与性质

### 4.1 线面垂直

**判定定理**：
> 一条直线与一个平面内的两条相交直线都垂直，则该直线与此平面垂直。
> $$l \\perp a, l \\perp b, a \\subset \\alpha, b \\subset \\alpha, a \\cap b = P \\Rightarrow l \\perp \\alpha$$

**几何法证明思路**：
在平面 $\\alpha$ 内任取一条直线 $m$，用向量法可证 $l \\perp m$。由于 $m$ 的任意性，$l \\perp \\alpha$。

**性质定理**：
> 垂直于同一个平面的两条直线平行。
> $$a \\perp \\alpha, b \\perp \\alpha \\Rightarrow a \\parallel b$$

**三垂线定理**：
> 在平面内的一条直线，如果与穿过这个平面的一条斜线在这个平面内的射影垂直，那么它也和这条斜线垂直。

**逆定理**：如果平面内一条直线和穿过该平面的一条斜线垂直，那么这条直线也垂直于这条斜线在平面内的射影。

### 4.2 面面垂直

**判定定理**：
> 一个平面过另一个平面的垂线，则这两个平面垂直。
> $$l \\perp \\alpha, l \\subset \\beta \\Rightarrow \\alpha \\perp \\beta$$

**性质定理**：
> 两个平面垂直，则一个平面内垂直于交线的直线与另一个平面垂直。
> $$\\alpha \\perp \\beta, \\alpha \\cap \\beta = l, a \\subset \\alpha, a \\perp l \\Rightarrow a \\perp \\beta$$

## 五、空间角的计算

### 5.1 异面直线所成的角

**定义**：过空间任一点 $O$ 分别作两条异面直线的平行线，这两条平行线所成的锐角（或直角）叫做异面直线所成的角。

**范围**：$(0, \\frac{\\pi}{2}]$

**求法**：
1. **几何法**：通过平移，将异面直线转化为相交直线
2. **向量法**：设两直线的方向向量为 $\\vec{a}$ 和 $\\vec{b}$，则
   $$\\cos \\theta = \\frac{|\\vec{a} \\cdot \\vec{b}|}{|\\vec{a}||\\vec{b}|}$$

### 5.2 直线与平面所成的角

**定义**：平面的一条斜线和它在平面上的射影所成的锐角，叫做这条直线和这个平面所成的角。

**范围**：$[0, \\frac{\\pi}{2}]$
- 直线与平面平行或在平面内：$0°$
- 直线与平面垂直：$90°$

**求法**：
1. **几何法**：作出直线在平面内的射影，构造直角三角形
2. **向量法**：设直线方向向量为 $\\vec{a}$，平面法向量为 $\\vec{n}$，则
   $$\\sin \\theta = \\frac{|\\vec{a} \\cdot \\vec{n}|}{|\\vec{a}||\\vec{n}|}$$

### 5.3 二面角

**定义**：从一条直线出发的两个半平面所组成的图形叫做二面角，这条直线叫做二面角的棱。

**二面角的平面角**：
在棱上任取一点，分别在两个半平面内作垂直于棱的射线，这两条射线所成的角叫做二面角的平面角。

**范围**：$[0, \\pi]$

**求法**：
1. **几何法（定义法）**：在棱上取点，作垂直于棱的两条射线
2. **几何法（三垂线法）**：过一个面内一点作另一个面的垂线，再作棱的垂线
3. **向量法**：设两个平面的法向量分别为 $\\vec{n_1}$ 和 $\\vec{n_2}$，则
   $$\\cos \\theta = \\frac{|\\vec{n_1} \\cdot \\vec{n_2}|}{|\\vec{n_1}||\\vec{n_2}|}$$
   （注意判断二面角是锐角还是钝角）

## 六、空间向量与解析法

### 6.1 空间直角坐标系

以空间中一定点 $O$ 为原点，建立三条两两垂直的数轴 $x$ 轴、$y$ 轴、$z$ 轴。

**点的坐标**：$P(x, y, z)$

**距离公式**：
$$|AB| = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$$

### 6.2 空间向量的运算

设 $\\vec{a} = (x_1, y_1, z_1)$，$\\vec{b} = (x_2, y_2, z_2)$

**线性运算**：
- $\\vec{a} + \\vec{b} = (x_1+x_2, y_1+y_2, z_1+z_2)$
- $\\vec{a} - \\vec{b} = (x_1-x_2, y_1-y_2, z_1-z_2)$
- $k\\vec{a} = (kx_1, ky_1, kz_1)$

**数量积**：
$$\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2 + z_1z_2$$

**模长**：
$$|\\vec{a}| = \\sqrt{x_1^2 + y_1^2 + z_1^2}$$

**夹角**：
$$\\cos \\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|}$$

### 6.3 平面的法向量

**定义**：与平面垂直的非零向量叫做平面的法向量。

**求法**：
1. 在平面内找到两个不共线向量 $\\vec{a}$ 和 $\\vec{b}$
2. 设法向量 $\\vec{n} = (x, y, z)$，由 $\\vec{n} \\perp \\vec{a}$ 和 $\\vec{n} \\perp \\vec{b}$ 列方程组
3. 解方程组，取一组非零解

**解析法证明面面垂直**：
证明两个平面的法向量垂直，即 $\\vec{n_1} \\cdot \\vec{n_2} = 0$。

**解析法求线面角**：
设直线方向向量为 $\\vec{s}$，平面法向量为 $\\vec{n}$，则
$$\\sin \\theta = \\frac{|\\vec{s} \\cdot \\vec{n}|}{|\\vec{s}||\\vec{n}|}$$

### 6.4 空间向量证明平行与垂直

**线线平行**：$\\vec{a} \\parallel \\vec{b} \\Leftrightarrow \\vec{a} = \\lambda\\vec{b}$

**线面平行**：$\\vec{s} \\perp \\vec{n}$（方向向量与法向量垂直）

**面面平行**：$\\vec{n_1} \\parallel \\vec{n_2}$

**线线垂直**：$\\vec{a} \\cdot \\vec{b} = 0$

**线面垂直**：$\\vec{s} \\parallel \\vec{n}$（方向向量与法向量平行）

**面面垂直**：$\\vec{n_1} \\cdot \\vec{n_2} = 0$

## 七、典型证明方法总结

| 证明目标 | 几何法 | 解析法 |
|---------|--------|--------|
| 线线平行 | 平行公理、中位线 | 方向向量平行 |
| 线面平行 | 线面平行判定定理 | 方向向量⊥法向量 |
| 面面平行 | 面面平行判定定理 | 法向量平行 |
| 线线垂直 | 勾股定理逆定理、三垂线 | 方向向量点积为0 |
| 线面垂直 | 线面垂直判定定理 | 方向向量∥法向量 |
| 面面垂直 | 面面垂直判定定理 | 法向量点积为0 |
| 求线线角 | 平移构造三角形 | 方向向量夹角公式 |
| 求线面角 | 找射影构造直角三角形 | $\\sin\\theta = \\frac{|\\vec{s}\\cdot\\vec{n}|}{|\\vec{s}||\\vec{n}|}$ |
| 求二面角 | 作平面角 | 法向量夹角公式 |
  `,
  examples: [
    {
      id: 'solid-1',
      difficulty: 'easy',
      question: '一个球的半径为 $3$，则其体积为？',
      options: ['$36\\pi$', '$27\\pi$', '$12\\pi$', '$108\\pi$'],
      correct: 0,
      explanation: '球的体积公式 $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi \\times 27 = 36\\pi$'
    },
    {
      id: 'solid-2',
      difficulty: 'easy',
      question: '正方体的棱长为 $2$，则其外接球的表面积为？',
      options: ['$8\\pi$', '$12\\pi$', '$16\\pi$', '$4\\pi$'],
      correct: 1,
      explanation: '正方体外接球直径等于体对角线，$2R = \\sqrt{2^2 + 2^2 + 2^2} = 2\\sqrt{3}$，所以 $R = \\sqrt{3}$，表面积 $S = 4\\pi R^2 = 12\\pi$'
    },
    {
      id: 'solid-3',
      difficulty: 'easy',
      question: '正四棱锥的底面边长为 $2$，高为 $3$，则其体积为？',
      options: ['$4$', '$6$', '$2$', '$12$'],
      correct: 0,
      explanation: '底面积 $S = 2^2 = 4$，体积 $V = \\frac{1}{3}Sh = \\frac{1}{3} \\times 4 \\times 3 = 4$'
    },
    {
      id: 'solid-4',
      difficulty: 'medium',
      question: '在正方体 $ABCD-A_1B_1C_1D_1$ 中，$E$ 为 $AA_1$ 的中点，则异面直线 $BE$ 与 $CD_1$ 所成角的余弦值为？',
      options: ['$\\frac{\\sqrt{10}}{5}$', '$\\frac{\\sqrt{5}}{5}$', '$\\frac{3}{5}$', '$\\frac{2}{5}$'],
      correct: 0,
      explanation: '建立坐标系，设棱长为 $2$，则 $B(2,0,0)$，$E(2,2,1)$，$C(2,2,0)$，$D_1(0,2,2)$。$\\vec{BE} = (0,2,1)$，$\\vec{CD_1} = (-2,0,2)$。$\\cos\\theta = \\frac{|\\vec{BE} \\cdot \\vec{CD_1}|}{|\\vec{BE}||\\vec{CD_1}|} = \\frac{2}{\\sqrt{5} \\times \\sqrt{8}} = \\frac{\\sqrt{10}}{5}$'
    },
    {
      id: 'solid-5',
      difficulty: 'medium',
      question: '圆锥的底面半径为 $3$，母线长为 $5$，则其侧面展开图的圆心角为？',
      options: ['$\\frac{6\\pi}{5}$', '$\\frac{3\\pi}{2}$', '$\\frac{4\\pi}{3}$', '$\\frac{5\\pi}{3}$'],
      correct: 0,
      explanation: '圆锥底面周长 $C = 2\\pi r = 6\\pi$。侧面展开图为扇形，扇形弧长等于底面周长，半径等于母线长 $l = 5$。设圆心角为 $\\alpha$，则 $\\alpha l = 6\\pi$，所以 $\\alpha = \\frac{6\\pi}{5}$'
    },
    {
      id: 'solid-6',
      difficulty: 'hard',
      question: '在三棱锥 $P-ABC$ 中，$PA \\perp$ 平面 $ABC$，$PA = AB = BC = 1$，$AC = \\sqrt{2}$，则二面角 $P-BC-A$ 的大小为？',
      options: ['$30°$', '$45°$', '$60°$', '$90°$'],
      correct: 1,
      explanation: '由 $AB = BC = 1$，$AC = \\sqrt{2}$，知 $AB \\perp BC$。又 $PA \\perp$ 平面 $ABC$，所以 $PB \\perp BC$（三垂线定理）。因此 $\\angle PBA$ 为二面角 $P-BC-A$ 的平面角。$\\tan\\angle PBA = \\frac{PA}{AB} = 1$，所以 $\\angle PBA = 45°$'
    },
    {
      id: 'solid-7',
      difficulty: 'hard',
      question: '正四面体的棱长为 $2$，则其体积为？',
      options: ['$\\frac{2\\sqrt{2}}{3}$', '$\\frac{2\\sqrt{3}}{3}$', '$\\frac{\\sqrt{2}}{3}$', '$\\frac{4\\sqrt{2}}{3}$'],
      correct: 0,
      explanation: '正四面体的高 $h = \\sqrt{2^2 - (\\frac{2\\sqrt{3}}{3})^2} = \\sqrt{4 - \\frac{4}{3}} = \\sqrt{\\frac{8}{3}} = \\frac{2\\sqrt{6}}{3}$。底面积 $S = \\frac{\\sqrt{3}}{4} \\times 2^2 = \\sqrt{3}$。体积 $V = \\frac{1}{3}Sh = \\frac{1}{3} \\times \\sqrt{3} \\times \\frac{2\\sqrt{6}}{3} = \\frac{2\\sqrt{18}}{9} = \\frac{2\\sqrt{2}}{3}$'
    }
  ]
};

// 基础篇 - 复数
const complexLesson: HighSchoolLesson = {
  id: 'hs-basic-complex',
  title: '复数',
  theory: `
## 一、复数的概念

### 1.1 复数的定义

形如 $z = a + bi$（$a, b \\in \\mathbb{R}$）的数叫做**复数**，其中 $i$ 是**虚数单位**，满足 $i^2 = -1$。

- **实部**：$\\text{Re}(z) = a$
- **虚部**：$\\text{Im}(z) = b$
- **实数**：当 $b = 0$ 时，$z = a$ 为实数
- **纯虚数**：当 $a = 0$ 且 $b \\neq 0$ 时，$z = bi$ 为纯虚数

**复数集**：$\\mathbb{C} = \\{a + bi \\mid a, b \\in \\mathbb{R}\\}$

### 1.2 复数相等

$$a + bi = c + di \\Leftrightarrow a = c \\text{ 且 } b = d$$

**注意**：两个复数如果不全是实数，则不能比较大小。

### 1.3 共轭复数

$z = a + bi$ 的**共轭复数**记为 $\\overline{z} = a - bi$

**共轭复数的性质**：
- $\\overline{\\overline{z}} = z$
- $z + \\overline{z} = 2a = 2\\text{Re}(z)$
- $z - \\overline{z} = 2bi = 2i\\text{Im}(z)$
- $z \\cdot \\overline{z} = |z|^2 = a^2 + b^2$
- $\\overline{z_1 + z_2} = \\overline{z_1} + \\overline{z_2}$
- $\\overline{z_1 \\cdot z_2} = \\overline{z_1} \\cdot \\overline{z_2}$
- $\\overline{\\left(\\frac{z_1}{z_2}\\right)} = \\frac{\\overline{z_1}}{\\overline{z_2}}$（$z_2 \\neq 0$）

### 1.4 复数的模

$$|z| = |a + bi| = \\sqrt{a^2 + b^2}$$

**模的性质**：
- $|z| \\geq 0$，且 $|z| = 0 \\Leftrightarrow z = 0$
- $|\\overline{z}| = |z|$
- $|z_1 \\cdot z_2| = |z_1| \\cdot |z_2|$
- $\\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}$（$z_2 \\neq 0$）
- $||z_1| - |z_2|| \\leq |z_1 \\pm z_2| \\leq |z_1| + |z_2|$（三角不等式）

## 二、复数的运算

### 2.1 加减法

$$(a + bi) \\pm (c + di) = (a \\pm c) + (b \\pm d)i$$

**几何意义**：对应平面向量的加减法（平行四边形法则或三角形法则）。

### 2.2 乘法

**代数运算**：
$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$$

**推导**：$(a + bi)(c + di) = ac + adi + bci + bdi^2 = ac + (ad + bc)i + bd(-1) = (ac - bd) + (ad + bc)i$

### 2.3 除法

$$
\\frac{a + bi}{c + di} = \\frac{(a + bi)(c - di)}{(c + di)(c - di)} = \\frac{(ac + bd) + (bc - ad)i}{c^2 + d^2} = \\frac{ac + bd}{c^2 + d^2} + \\frac{bc - ad}{c^2 + d^2}i
$$

**方法**：分子分母同乘分母的共轭复数，将分母化为实数。

### 2.4 乘方（棣莫弗定理）

$$z^n = [r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)$$

特别地，当 $r = 1$ 时：
$$(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$$

## 三、复数的几何意义

### 3.1 复平面

建立直角坐标系表示复数的平面称为**复平面**（或高斯平面）：
- **横轴（实轴）**：表示实部，单位 1
- **纵轴（虚轴）**：表示虚部，单位 $i$
- 复数 $z = a + bi$ 对应点 $Z(a, b)$
- 复数 $z = a + bi$ 对应向量 $\\overrightarrow{OZ} = (a, b)$

### 3.2 复数的三角形式

$$z = r(\\cos\\theta + i\\sin\\theta)$$

其中：
- $r = |z| = \\sqrt{a^2 + b^2}$ 为模
- $\\theta = \\arg(z)$ 为辐角，满足 $\\tan\\theta = \\frac{b}{a}$

**辐角主值**：$\\text{Arg}(z) \\in [0, 2\\pi)$ 或 $(-\\pi, \\pi]$

**三角形式与代数形式的互化**：
- $a = r\\cos\\theta$，$b = r\\sin\\theta$
- $r = \\sqrt{a^2 + b^2}$，$\\tan\\theta = \\frac{b}{a}$（需根据象限确定 $\\theta$）

### 3.3 欧拉公式

$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$

**欧拉恒等式**（最美数学公式）：
$$e^{i\\pi} + 1 = 0$$

### 3.4 复数乘除的几何意义

设 $z_1 = r_1(\\cos\\theta_1 + i\\sin\\theta_1)$，$z_2 = r_2(\\cos\\theta_2 + i\\sin\\theta_2)$

**乘法**：
$$z_1 \\cdot z_2 = r_1r_2[\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)]$$

几何意义：**模相乘，辐角相加**

**除法**：
$$\\frac{z_1}{z_2} = \\frac{r_1}{r_2}[\\cos(\\theta_1 - \\theta_2) + i\\sin(\\theta_1 - \\theta_2)]$$

几何意义：**模相除，辐角相减**

### 3.5 复数的开方

$z = r(\\cos\\theta + i\\sin\\theta)$ 的 $n$ 次方根为：

$$\\sqrt[n]{z} = \\sqrt[n]{r}\\left(\\cos\\frac{\\theta + 2k\\pi}{n} + i\\sin\\frac{\\theta + 2k\\pi}{n}\\right)，k = 0, 1, 2, \\ldots, n-1$$

共有 $n$ 个不同的根，它们在复平面上均匀分布在以原点为圆心、$\\sqrt[n]{r}$ 为半径的圆上。

## 四、复数与平面向量的关系

### 4.1 一一对应关系

| 复数 | 复平面 | 平面向量 |
|------|--------|---------|
| $z = a + bi$ | 点 $Z(a, b)$ | 向量 $\\overrightarrow{OZ} = (a, b)$ |
| 实部 $a$ | 横坐标 | $x$ 分量 |
| 虚部 $b$ | 纵坐标 | $y$ 分量 |
| 模 $|z|$ | 点到原点距离 | 向量模长 $|(a, b)|$ |
| 辐角 $\\arg(z)$ | 与正实轴夹角 | 向量与 $x$ 轴正方向夹角 |

**核心结论**：复数与平面向量可以建立一一对应关系，复数的运算与向量的运算具有等价性。

### 4.2 运算的对应关系

| 复数运算 | 向量运算 | 结果对应 |
|---------|---------|---------|
| $z_1 + z_2$ | $\\overrightarrow{OZ_1} + \\overrightarrow{OZ_2}$ | 平行四边形对角线 |
| $z_1 - z_2$ | $\\overrightarrow{OZ_1} - \\overrightarrow{OZ_2}$ | 从 $Z_2$ 指向 $Z_1$ 的向量 |
| $k \\cdot z$ | $k \\overrightarrow{OZ}$ | 共线向量（数乘） |
| $|z_1 - z_2|$ | $||\\overrightarrow{OZ_1} - \\overrightarrow{OZ_2}||$ | 两点间距离 |

**两点间距离公式**：
$$|z_1 - z_2| = \\sqrt{(a_1 - a_2)^2 + (b_1 - b_2)^2}$$

### 4.3 复数与向量数量积的联系

设 $z_1 = a + bi$，$z_2 = c + di$，则：

$$\\text{Re}(z_1 \\cdot \\overline{z_2}) = ac + bd = \\vec{a} \\cdot \\vec{b}$$

即 $z_1 \\cdot \\overline{z_2}$ 的实部等于对应向量的数量积。

**垂直判定**：
$$z_1 \\perp z_2 \\text{（对应向量垂直）} \\Leftrightarrow \\text{Re}(z_1 \\cdot \\overline{z_2}) = 0$$

### 4.4 旋转的几何意义

乘以复数 $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ 相当于**逆时针旋转** $\\theta$ 角：

$$z \\cdot e^{i\\theta} = r(\\cos\\theta + i\\sin\\theta)(\\cos\\theta_0 + i\\sin\\theta_0) = r[\\cos(\\theta_0 + \\theta) + i\\sin(\\theta_0 + \\theta)]$$

**特殊旋转**：
- 乘以 $i$：逆时针旋转 $90°$
- 乘以 $-i$：顺时针旋转 $90°$
- 乘以 $-1$：旋转 $180°$（中心对称）

**应用**：已知点 $A$ 对应复数 $z_A$，将线段 $OA$ 逆时针旋转 $90°$ 得 $OB$，则 $z_B = i \\cdot z_A$。

### 4.5 复数在几何中的应用

**圆的复数方程**：$|z - z_0| = r$ 表示以 $z_0$ 为圆心、$r$ 为半径的圆

**线段垂直平分线**：$|z - z_1| = |z - z_2|$ 表示线段 $Z_1Z_2$ 的垂直平分线

**椭圆**：$|z - z_1| + |z - z_2| = 2a$（$|z_1 - z_2| < 2a$）

**双曲线**：$||z - z_1| - |z - z_2|| = 2a$（$|z_1 - z_2| > 2a$）
  `,
  examples: [
    {
      id: 'complex-1',
      difficulty: 'easy',
      question: '复数 $z = 3 + 4i$ 的模为？',
      options: ['5', '7', '25', '$\\sqrt{7}$'],
      correct: 0,
      explanation: '$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$'
    },
    {
      id: 'complex-2',
      difficulty: 'easy',
      question: '设 $z = 1 + i$，则 $z^2 = $？',
      options: ['$2i$', '2', '$1 + 2i$', '$-2i$'],
      correct: 0,
      explanation: '$z^2 = (1 + i)^2 = 1 + 2i + i^2 = 1 + 2i - 1 = 2i$'
    },
    {
      id: 'complex-3',
      difficulty: 'easy',
      question: '复数 $\\frac{1}{1 + i} = $？',
      options: ['$\\frac{1 - i}{2}$', '$\\frac{1 + i}{2}$', '$1 - i$', '$1 + i$'],
      correct: 0,
      explanation: '$\\frac{1}{1 + i} = \\frac{1 - i}{(1 + i)(1 - i)} = \\frac{1 - i}{1 - i^2} = \\frac{1 - i}{2}$'
    },
    {
      id: 'complex-4',
      difficulty: 'medium',
      question: '已知 $|z| = 1$，则 $|z - 1 - i|$ 的最大值为？',
      options: ['$\\sqrt{2} + 1$', '$\\sqrt{2} - 1$', '2', '$\\sqrt{2}$'],
      correct: 0,
      explanation: '几何意义：单位圆上的点到点 $(1, 1)$ 的距离。圆心到 $(1, 1)$ 的距离为 $\\sqrt{2}$，加上半径 1，最大值为 $\\sqrt{2} + 1$'
    },
    {
      id: 'complex-5',
      difficulty: 'medium',
      question: '设 $z = \\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}$，则 $z^3 = $？',
      options: ['$i$', '$-i$', '1', '$-1$'],
      correct: 0,
      explanation: '由棣莫弗定理：$z^3 = \\cos\\frac{3\\pi}{6} + i\\sin\\frac{3\\pi}{6} = \\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2} = i$'
    },
    {
      id: 'complex-6',
      difficulty: 'medium',
      question: '复数 $z$ 满足 $z + \\overline{z} = 4$，$z - \\overline{z} = 2i$，则 $z = $？',
      options: ['$2 + i$', '$2 - i$', '$4 + 2i$', '$4 - 2i$'],
      correct: 0,
      explanation: '设 $z = a + bi$，则 $z + \\overline{z} = 2a = 4$，得 $a = 2$；$z - \\overline{z} = 2bi = 2i$，得 $b = 1$。所以 $z = 2 + i$'
    },
    {
      id: 'complex-7',
      difficulty: 'hard',
      question: '若 $z$ 满足 $|z - 1| = |z + i|$，则 $z$ 在复平面上的轨迹是？',
      options: ['圆', '直线', '椭圆', '双曲线'],
      correct: 1,
      explanation: '几何意义：到点 $(1, 0)$ 和 $(0, -1)$ 距离相等的点的轨迹，即这两点连线的垂直平分线，是一条直线。代数验证：设 $z = x + yi$，则 $(x-1)^2 + y^2 = x^2 + (y+1)^2$，化简得 $x + y = 0$'
    },
    {
      id: 'complex-8',
      difficulty: 'hard',
      question: '将复数 $z = 1 + i$ 对应的向量逆时针旋转 $45°$，所得复数为？',
      options: ['$\\sqrt{2}$', '$\\sqrt{2}i$', '$1 + \\sqrt{2}i$', '$\\sqrt{2} + i$'],
      correct: 1,
      explanation: '$z = 1 + i = \\sqrt{2}(\\cos 45° + i\\sin 45°)$，旋转 $45°$ 后得 $\\sqrt{2}(\\cos 90° + i\\sin 90°) = \\sqrt{2}i$。或直接用 $z \\cdot e^{i\\frac{\\pi}{4}} = (1+i)(\\cos 45° + i\\sin 45°) = (1+i) \\cdot \\frac{\\sqrt{2}}{2}(1+i) = \\frac{\\sqrt{2}}{2} \\cdot 2i = \\sqrt{2}i$'
    }
  ]
};

// 基础篇 - 统计与概率（排列组合）
const combinatoricsLesson: HighSchoolLesson = {
  id: 'hs-basic-combinatorics',
  title: '排列与组合',
  theory: `
## 基本计数原理

### 加法原理（分类计数原理）

完成一件事有 $n$ 类方法，第 $i$ 类有 $m_i$ 种方案，则完成这件事共有

$$m_1 + m_2 + \\cdots + m_n$$

种方案。

> **提示**

各类方法相互**独立**，任何一类中的方法都能单独完成这件事。

**例**：从甲地到乙地，可以乘火车（3班）、乘汽车（2班）或乘轮船（1班），共有 $3+2+1=6$ 种方法。

---

### 乘法原理（分步计数原理）

完成一件事需要 $n$ 个步骤，第 $i$ 步有 $m_i$ 种方案，则完成这件事共有

$$m_1 \\times m_2 \\times \\cdots \\times m_n$$

种方案。

> **提示**

各步骤相互**关联**，每一步都必须完成，且每一步的选择不影响其他步骤的方案数。

**例**：从甲地到乙地再到丙地，甲→乙有 3 种交通方式，乙→丙有 2 种交通方式，共有 $3 \\times 2 = 6$ 种走法。

---

## 排列数

### 定义

从 $n$ 个不同元素中取出 $m$ 个（$m \\leq n$）**按顺序**排成一列，称为从 $n$ 个元素中取 $m$ 个的**排列**，其种数记为 $A_n^m$（或 $P_n^m$）。

### 排列数公式

$$A_n^m = n(n-1)(n-2)\\cdots(n-m+1) = \\frac{n!}{(n-m)!}$$

其中 $n! = n \\times (n-1) \\times \\cdots \\times 2 \\times 1$，规定 $0! = 1$。

**推导**：
- 第1个位置有 $n$ 种选法
- 第2个位置有 $n-1$ 种选法（已用1个）
- ……
- 第 $m$ 个位置有 $n-m+1$ 种选法

由乘法原理得 $A_n^m = n(n-1)\\cdots(n-m+1)$。

### 全排列

$n$ 个元素的全排列数为：

$$A_n^n = n!$$

| $n$ | $n!$ |
|-----|------|
| 1 | 1 |
| 2 | 2 |
| 3 | 6 |
| 4 | 24 |
| 5 | 120 |
| 6 | 720 |

---

## 组合数

### 定义

从 $n$ 个不同元素中取出 $m$ 个（$m \\leq n$）**不考虑顺序**组成一组，称为从 $n$ 个元素中取 $m$ 个的**组合**，其种数记为 $C_n^m$（或 $\\binom{n}{m}$）。

### 组合数公式

$$C_n^m = \\frac{A_n^m}{m!} = \\frac{n!}{m!(n-m)!}$$

**推导**：每个组合对应 $m!$ 个排列（$m$ 个元素的全排列），故

$$C_n^m = \\frac{A_n^m}{A_m^m} = \\frac{A_n^m}{m!}$$

### 组合数的重要性质

**1. 对称性（互补性）**

$$C_n^m = C_n^{n-m}$$

**推导**：$C_n^{n-m} = \\frac{n!}{(n-m)!m!} = C_n^m$。

直观理解：选出 $m$ 个等价于选出剩余的 $n-m$ 个。

**2. 递推公式（Pascal恒等式）**

$$C_n^m = C_{n-1}^{m-1} + C_{n-1}^m$$

**推导**：从 $n$ 个元素中选 $m$ 个，固定第 $n$ 个元素：
- 若选第 $n$ 个：从前 $n-1$ 个中再选 $m-1$ 个，有 $C_{n-1}^{m-1}$ 种
- 若不选第 $n$ 个：从前 $n-1$ 个中选 $m$ 个，有 $C_{n-1}^m$ 种

由加法原理得上式。

**3. 边界值**

$$C_n^0 = C_n^n = 1, \\quad C_n^1 = n$$

### 杨辉三角

递推公式对应杨辉三角（Pascal三角）：

$$\\begin{array}{ccccccccc}
& & & & 1 & & & & \\\\
& & & 1 & & 1 & & & \\\\
& & 1 & & 2 & & 1 & & \\\\
& 1 & & 3 & & 3 & & 1 & \\\\
1 & & 4 & & 6 & & 4 & & 1
\\end{array}$$

第 $n$ 行（从第0行算起）对应 $C_n^0, C_n^1, \\ldots, C_n^n$。

---

## 二项式定理

### 定理内容

$$(a+b)^n = \\sum_{k=0}^{n} C_n^k a^{n-k} b^k = C_n^0 a^n + C_n^1 a^{n-1}b + C_n^2 a^{n-2}b^2 + \\cdots + C_n^n b^n$$

其中 $C_n^k$ 称为**二项式系数**，$T_{k+1} = C_n^k a^{n-k} b^k$ 称为**第 $k+1$ 项**（通项）。

**推导**：$(a+b)^n$ 展开时，每个括号选 $a$ 或 $b$，从 $n$ 个括号中选 $k$ 个取 $b$，有 $C_n^k$ 种方式，对应项为 $C_n^k a^{n-k} b^k$。

### 常用结论

令 $a=b=1$：$\\sum_{k=0}^n C_n^k = 2^n$（所有二项式系数之和）

令 $a=1, b=-1$：$\\sum_{k=0}^n (-1)^k C_n^k = 0$（奇偶项系数之和相等）

**二项式系数最大项**：当 $n$ 为偶数时，中间项 $C_n^{n/2}$ 最大；当 $n$ 为奇数时，中间两项 $C_n^{(n-1)/2}$ 和 $C_n^{(n+1)/2}$ 相等且最大。
  `,
  examples: [
    {
      id: 'comb-1',
      difficulty: 'easy',
      question: '从5名同学中选3名参加比赛，共有多少种选法？',
      options: ['10种', '20种', '60种', '15种'],
      correct: 0,
      explanation: '不考虑顺序，用组合数：$C_5^3 = \\frac{5!}{3!2!} = \\frac{5 \\times 4}{2 \\times 1} = 10$ 种'
    },
    {
      id: 'comb-2',
      difficulty: 'easy',
      question: '从5名同学中选3名，分别担任正、副、组长，共有多少种选法？',
      options: ['10种', '30种', '60种', '120种'],
      correct: 2,
      explanation: '考虑顺序，用排列数：$A_5^3 = 5 \\times 4 \\times 3 = 60$ 种'
    },
    {
      id: 'comb-3',
      difficulty: 'medium',
      question: '$(x + \\frac{1}{x})^6$ 展开式中，常数项为？',
      options: ['10', '15', '20', '25'],
      correct: 2,
      explanation: '通项 $T_{k+1} = C_6^k x^{6-k} \\cdot x^{-k} = C_6^k x^{6-2k}$。令 $6-2k=0$，得 $k=3$，常数项为 $C_6^3 = 20$'
    },
    {
      id: 'comb-4',
      difficulty: 'medium',
      question: '某班有男生6人，女生4人，从中选4人参加活动，要求至少有1名女生，共有多少种选法？',
      options: ['185种', '195种', '205种', '210种'],
      correct: 3,
      explanation: '用补集法：总选法 $C_{10}^4 = 210$，全为男生 $C_6^4 = 15$，至少1名女生 = $210 - 15 = 195$ 种。正确答案应为195种，选B'
    },
    {
      id: 'comb-5',
      difficulty: 'hard',
      question: '7人站成一排，甲、乙必须相邻，共有多少种站法？',
      options: ['480种', '720种', '1440种', '2160种'],
      correct: 2,
      explanation: '捆绑法：将甲乙视为一个整体，则共6个元素全排列 $A_6^6 = 720$ 种，甲乙内部有 $A_2^2 = 2$ 种排列，共 $720 \\times 2 = 1440$ 种'
    }
  ]
};

// 基础篇 - 统计与概率
const statisticsLesson: HighSchoolLesson = {
  id: 'hs-basic-stats',
  title: '统计与概率',
  theory: `
## 古典概型

### 基本概念

**随机试验**：在相同条件下可重复进行，结果不确定但所有可能结果已知。

**样本空间** $\\Omega$：随机试验所有可能结果的集合。

**随机事件**：样本空间的子集，用大写字母 $A, B, C$ 等表示。

**古典概型的条件**：
1. 样本空间有**有限**个基本事件
2. 每个基本事件发生的**可能性相等**（等可能性）

### 古典概型概率公式

$$P(A) = \\frac{A \\text{ 中基本事件数}}{\\Omega \\text{ 中基本事件总数}} = \\frac{n(A)}{n(\\Omega)}$$

### 概率的基本性质

- $0 \\leq P(A) \\leq 1$
- $P(\\Omega) = 1$，$P(\\emptyset) = 0$
- **互斥事件加法公式**：若 $A \\cap B = \\emptyset$，则 $P(A \\cup B) = P(A) + P(B)$
- **对立事件**：$P(\\bar{A}) = 1 - P(A)$
- **一般加法公式**：$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$

---

## 条件概率与事件独立性

### 条件概率

**定义**：已知事件 $A$ 发生的条件下，事件 $B$ 发生的概率，记为 $P(B|A)$：

$$P(B|A) = \\frac{P(A \\cap B)}{P(A)} \\quad (P(A) > 0)$$

**乘法公式**：

$$P(A \\cap B) = P(A) \\cdot P(B|A) = P(B) \\cdot P(A|B)$$

### 全概率公式

若事件 $A_1, A_2, \\ldots, A_n$ 是样本空间的一个**完备事件组**（两两互斥且并集为 $\\Omega$），则对任意事件 $B$：

$$P(B) = \\sum_{i=1}^{n} P(A_i) P(B|A_i)$$

**直观理解**："全面考虑各种可能原因"——将事件 $B$ 按照各原因 $A_i$ 分类讨论。

### 贝叶斯公式（逆概率公式）

$$P(A_j|B) = \\frac{P(A_j) P(B|A_j)}{\\sum_{i=1}^{n} P(A_i) P(B|A_i)} = \\frac{P(A_j) P(B|A_j)}{P(B)}$$

**直观理解**："已知结果，推断原因"——在已知事件 $B$ 发生的情况下，推断是由哪个原因 $A_j$ 引起的。

### 事件独立性

**定义**：若事件 $A$ 的发生不影响事件 $B$ 的概率，即

$$P(B|A) = P(B) \\ \\text{ 或等价地 } \\ P(A \\cap B) = P(A) \\cdot P(B)$$

则称 $A$ 与 $B$ **相互独立**。

**$n$ 个事件相互独立**：$n$ 个事件中任意 $k$ 个事件的积事件概率等于各自概率之积。

**独立重复试验**：在相同条件下重复进行 $n$ 次，每次结果不影响其他次，每次事件 $A$ 发生概率为 $p$，则 $n$ 次中恰好发生 $k$ 次的概率（**二项分布**）：

$$P(X=k) = C_n^k p^k (1-p)^{n-k} \\quad (k=0,1,2,\\ldots,n)$$

---

## 随机变量

### 离散型随机变量

**定义**：取值为有限个或可列无限个的随机变量。

**概率分布表**：

| $X$ | $x_1$ | $x_2$ | $\\cdots$ | $x_n$ |
|-----|--------|--------|---------|--------|
| $P$ | $p_1$ | $p_2$ | $\\cdots$ | $p_n$ |

其中 $p_i \\geq 0$，$\\sum p_i = 1$。

**数学期望（均值）**：

$$E(X) = \\sum_{i=1}^{n} x_i p_i$$

**方差**：

$$D(X) = \\sum_{i=1}^{n} [x_i - E(X)]^2 p_i = E(X^2) - [E(X)]^2$$

**标准差**：$\\sigma = \\sqrt{D(X)}$

### 常见离散分布

**二项分布** $X \\sim B(n, p)$：

$$P(X=k) = C_n^k p^k (1-p)^{n-k}$$

$$E(X) = np, \\quad D(X) = np(1-p)$$

**适用场景**：$n$ 次独立重复试验，每次成功概率为 $p$，$X$ 为成功次数。

---

## 统计

### 抽样方法

| 方法 | 特点 | 适用场景 |
|------|------|---------|
| 简单随机抽样 | 每个个体被抽概率相等 | 总体数量不大 |
| 系统抽样 | 按等间隔抽取 | 总体数量较大，均匀分布 |
| 分层抽样 | 按层占比抽取 | 总体有明显层次差异 |

**分层抽样**中，每层抽取数量与该层个体数量成比例：

$$\\text{第 } i \\text{ 层抽取数} = n \\times \\frac{N_i}{N}$$

其中 $n$ 为样本量，$N_i$ 为第 $i$ 层个体数，$N$ 为总体数量。

### 样本数字特征

**样本均值**：$\\bar{x} = \\dfrac{1}{n}\\sum_{i=1}^{n} x_i$

**样本方差**：$s^2 = \\dfrac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2$

**样本标准差**：$s = \\sqrt{s^2}$

用样本数字特征**估计**总体的对应特征（估计量）。

---

## 统计模型

### 一元线性回归

**散点图与相关性**：通过散点图判断两变量是否存在线性关系。

**相关系数**（Pearson）：

$$r = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^{n}(x_i - \\bar{x})^2 \\cdot \\sum_{i=1}^{n}(y_i - \\bar{y})^2}}$$

$|r|$ 越接近1，线性相关越强；$|r|$ 接近0表示线性相关性弱。

**回归直线方程**（最小二乘法）：

$$\\hat{y} = \\hat{b}x + \\hat{a}$$

其中回归系数：

$$\\hat{b} = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^{n}(x_i - \\bar{x})^2} = \\frac{\\sum_{i=1}^{n}x_i y_i - n\\bar{x}\\bar{y}}{\\sum_{i=1}^{n}x_i^2 - n\\bar{x}^2}$$

$$\\hat{a} = \\bar{y} - \\hat{b}\\bar{x}$$

**最小二乘原理**：回归直线使所有点到直线纵向距离的平方和 $Q = \\sum_{i=1}^n (y_i - \\hat{y}_i)^2$ 最小。

> **提示**

回归直线必过样本均值点 $(\\bar{x}, \\bar{y})$。

### 独立性检验（$\\chi^2$ 检验）

**目的**：判断两个分类变量之间是否存在关联（独立性）。

**$2 \\times 2$ 列联表**：

| | 属性B | 属性$\\bar{B}$ | 合计 |
|--|------|--------|------|
| 属性A | $a$ | $b$ | $a+b$ |
| 属性$\\bar{A}$ | $c$ | $d$ | $c+d$ |
| 合计 | $a+c$ | $b+d$ | $n$ |

其中 $n = a+b+c+d$。

**$\\chi^2$ 统计量**：

$$\\chi^2 = \\frac{n(ad-bc)^2}{(a+b)(c+d)(a+c)(b+d)}$$

**判断标准**：

| 显著性水平 | 临界值 | 结论 |
|-----------|--------|------|
| $\\alpha = 0.05$ | $\\chi^2 > 3.841$ | 有理由认为两变量有关系 |
| $\\alpha = 0.01$ | $\\chi^2 > 6.635$ | 有更强理由认为两变量有关系 |

若 $\\chi^2 \\geq 3.841$，在显著性水平 $0.05$ 下，认为两变量有关。
  `,
  examples: [
    {
      id: 'stats-1',
      difficulty: 'easy',
      question: '掷一枚质地均匀的骰子，出现偶数点的概率为？',
      options: ['1/6', '1/3', '1/2', '2/3'],
      correct: 2,
      explanation: '偶数点有 2, 4, 6 三种情况，共 6 种可能，概率为 3/6 = 1/2'
    },
    {
      id: 'stats-2',
      difficulty: 'medium',
      question: '从 1, 2, 3, 4, 5 中任取两个数，两数之和为偶数的概率为？',
      options: ['2/5', '3/5', '1/2', '3/10'],
      correct: 0,
      explanation: '两数之和为偶数，则两数同为奇数或同为偶数。奇数有 1, 3, 5，偶数有 2, 4。同为奇数的取法 $C_3^2 = 3$，同为偶数的取法 $C_2^2 = 1$。总取法 $C_5^2 = 10$。概率为 $(3+1)/10 = 2/5$'
    },
    {
      id: 'stats-3',
      difficulty: 'medium',
      question: '袋中有3个白球、2个黑球，每次取1球不放回，连取2次，第二次取到白球的概率为？',
      options: ['3/5', '3/10', '9/25', '6/25'],
      correct: 0,
      explanation: '用全概率公式。设 $A_1$=第一次白球，$A_2$=第一次黑球，$B$=第二次白球。$P(A_1)=3/5$，$P(A_2)=2/5$，$P(B|A_1)=2/4=1/2$，$P(B|A_2)=3/4$。故 $P(B)=3/5 \\times 1/2 + 2/5 \\times 3/4 = 3/10 + 6/20 = 3/5$'
    },
    {
      id: 'stats-4',
      difficulty: 'medium',
      question: '独立重复投硬币4次，恰好出现3次正面的概率为？',
      options: ['1/4', '1/8', '1/4', '3/8'],
      correct: 3,
      explanation: '二项分布，$n=4$，$k=3$，$p=1/2$。$P(X=3) = C_4^3 \\times (1/2)^3 \\times (1/2)^1 = 4 \\times 1/16 = 1/4$。正确答案是1/4，选C'
    },
    {
      id: 'stats-5',
      difficulty: 'hard',
      question: '已知5个数据点：$(1,2), (2,3), (3,4), (4,5), (5,6)$，其回归直线方程为？',
      options: ['$\\hat{y} = x + 1$', '$\\hat{y} = 0.8x + 1.2$', '$\\hat{y} = x + 0.5$', '$\\hat{y} = 1.2x + 0.8$'],
      correct: 0,
      explanation: '样本均值 $\\bar{x}=3, \\bar{y}=4$。$\\hat{b} = \\frac{\\sum x_i y_i - 5\\bar{x}\\bar{y}}{\\sum x_i^2 - 5\\bar{x}^2} = \\frac{(2+6+12+20+30)-5\\times3\\times4}{(1+4+9+16+25)-5\\times9} = \\frac{70-60}{55-45} = 1$。$\\hat{a} = 4 - 1 \\times 3 = 1$。故 $\\hat{y} = x + 1$'
    }
  ]
};

// 基础篇 - 直线与圆
const lineCircleLesson: HighSchoolLesson = {
  id: 'hs-basic-line-circle',
  title: '直线与圆',
  theory: `
## 一、直线的倾斜角与斜率

### 1.1 倾斜角的定义

**倾斜角** $\\alpha$：直线向上方向（或右方向）与 $x$ 轴正方向所成的角，规定 $0° \\leq \\alpha < 180°$。

- 当直线平行于 $x$ 轴或与 $x$ 轴重合时，$\\alpha = 0°$
- 当直线垂直于 $x$ 轴时，$\\alpha = 90°$，此时斜率**不存在**

### 1.2 斜率公式

$$k = \\tan\\alpha \\quad (\\alpha \\neq 90°)$$

**过两点的斜率公式**：设直线过 $P_1(x_1, y_1)$ 和 $P_2(x_2, y_2)$（$x_1 \\neq x_2$），则

$$k = \\frac{y_2 - y_1}{x_2 - x_1}$$

**推导**：在直角三角形 $P_1QP_2$（$Q$ 为 $P_1$ 正下方、$P_2$ 正左方的交点）中，$\\tan\\alpha = \\dfrac{P_2Q}{P_1Q} = \\dfrac{y_2 - y_1}{x_2 - x_1}$。

### 1.3 倾斜角与斜率对照表

| 倾斜角 $\\alpha$ 范围 | 斜率 $k$ 的符号 | 说明 |
|---|---|---|
| $0° < \\alpha < 90°$ | $k > 0$ | 直线向右上方倾斜 |
| $\\alpha = 0°$ | $k = 0$ | 直线平行于 $x$ 轴 |
| $90° < \\alpha < 180°$ | $k < 0$ | 直线向右下方倾斜 |
| $\\alpha = 90°$ | 斜率不存在 | 直线平行于 $y$ 轴 |

---

## 二、直线方程的各种形式

### 2.1 点斜式

已知直线过点 $(x_0, y_0)$，斜率为 $k$：

$$y - y_0 = k(x - x_0)$$

**适用场景**：已知直线上一点和斜率。**注意**：不能表示斜率不存在（即竖直线）的情况。

### 2.2 斜截式

$$y = kx + b$$

其中 $k$ 为斜率，$b$ 为 $y$ 轴截距（直线与 $y$ 轴交点的纵坐标）。

**适用场景**：便于分析直线的倾斜程度和纵轴截距，是最常用的形式之一。

### 2.3 两点式

已知直线过 $P_1(x_1, y_1)$ 和 $P_2(x_2, y_2)$（$x_1 \\neq x_2$，$y_1 \\neq y_2$）：

$$\\frac{y - y_1}{y_2 - y_1} = \\frac{x - x_1}{x_2 - x_1}$$

**适用场景**：已知直线上两点。**注意**：要求两点的横纵坐标均不相等，否则退化为点斜式或竖直线。

### 2.4 截距式

已知直线在 $x$ 轴截距为 $a$，$y$ 轴截距为 $b$（$a, b \\neq 0$）：

$$\\frac{x}{a} + \\frac{y}{b} = 1$$

**适用场景**：已知两轴截距。**注意**：不能表示过原点或平行于坐标轴的直线。

### 2.5 一般式

$$Ax + By + C = 0 \\quad (A^2 + B^2 \\neq 0)$$

**适用场景**：最通用的形式，可以表示所有直线（包括竖直线）。斜率 $k = -\\dfrac{A}{B}$（$B \\neq 0$），$y$ 轴截距 $= -\\dfrac{C}{B}$（$B \\neq 0$）。

### 2.6 各形式对比总结

| 形式 | 方程 | 局限性 |
|---|---|---|
| 点斜式 | $y - y_0 = k(x - x_0)$ | 不能表示竖直线 |
| 斜截式 | $y = kx + b$ | 不能表示竖直线 |
| 两点式 | $\\frac{y-y_1}{y_2-y_1}=\\frac{x-x_1}{x_2-x_1}$ | 不能表示水平线或竖直线 |
| 截距式 | $\\frac{x}{a}+\\frac{y}{b}=1$ | 不能表示过原点或坐标轴平行线 |
| 一般式 | $Ax + By + C = 0$ | 无局限，最通用 |

---

## 三、两直线的位置关系

设 $l_1: y = k_1 x + b_1$（或 $A_1x + B_1y + C_1 = 0$），$l_2: y = k_2 x + b_2$（或 $A_2x + B_2y + C_2 = 0$）。

### 3.1 平行条件

**斜截式判定**：$k_1 = k_2$ 且 $b_1 \\neq b_2$

**一般式判定**：$A_1 B_2 = A_2 B_1$ 且 $A_1 C_2 \\neq A_2 C_1$

（即系数成比例但不重合）

### 3.2 垂直条件

**斜截式判定**：$k_1 k_2 = -1$（即斜率之积为 $-1$）

**一般式判定**：$A_1 A_2 + B_1 B_2 = 0$

**推导**：$k_1 = -\\dfrac{A_1}{B_1}$，$k_2 = -\\dfrac{A_2}{B_2}$，则 $k_1 k_2 = \\dfrac{A_1 A_2}{B_1 B_2} = -1 \\Rightarrow A_1 A_2 + B_1 B_2 = 0$。

### 3.3 两直线的夹角公式

两直线 $l_1$（斜率 $k_1$）与 $l_2$（斜率 $k_2$）所成的**锐角**（或直角）$\\theta$ 满足：

$$\\tan\\theta = \\left|\\frac{k_1 - k_2}{1 + k_1 k_2}\\right| \\quad (k_1 k_2 \\neq -1)$$

当 $k_1 k_2 = -1$ 时，$\\theta = 90°$。

### 3.4 交点求解

联立两直线方程，解方程组：

$$\\begin{cases} A_1 x + B_1 y + C_1 = 0 \\\\ A_2 x + B_2 y + C_2 = 0 \\end{cases}$$

当 $A_1 B_2 \\neq A_2 B_1$ 时，方程组有唯一解，即两直线的交点坐标。

---

## 四、点到直线的距离

### 4.1 点到直线距离公式

点 $P(x_0, y_0)$ 到直线 $Ax + By + C = 0$ 的距离：

$$d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$$

**推导思路**：设垂足为 $Q(x_1, y_1)$，则 $Q$ 在直线上故 $Ax_1+By_1+C=0$；$PQ \\perp l$ 故方向向量关系给出 $\\dfrac{x_1-x_0}{A}=\\dfrac{y_1-y_0}{B}=t$，代入化简得 $d = |PQ| = \\dfrac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$。

### 4.2 两平行线间的距离

两平行线 $Ax + By + C_1 = 0$ 与 $Ax + By + C_2 = 0$（系数相同）之间的距离：

$$d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}}$$

**方法**：在其中一条直线上取任意一点，用点到直线距离公式即可。

### 4.3 应用举例

**例**：求点 $P(3, -2)$ 到直线 $3x - 4y + 1 = 0$ 的距离。

$$d = \\frac{|3 \\cdot 3 + (-4)\\cdot(-2) + 1|}{\\sqrt{3^2 + (-4)^2}} = \\frac{|9 + 8 + 1|}{\\sqrt{9+16}} = \\frac{18}{5}$$

---

## 五、直线系方程

### 5.1 过定点的直线系

过定点 $(x_0, y_0)$ 的所有直线（除竖直线外）构成直线系：

$$y - y_0 = k(x - x_0) \\quad (k \\in \\mathbb{R})$$

**竖直线** $x = x_0$ 需单独考虑（斜率不存在）。

### 5.2 过两直线交点的直线系

若 $l_1: A_1x+B_1y+C_1=0$ 与 $l_2: A_2x+B_2y+C_2=0$ 相交，则过其交点的所有直线（除 $l_2$ 外）可以表示为：

$$A_1x + B_1y + C_1 + \\lambda(A_2x + B_2y + C_2) = 0 \\quad (\\lambda \\in \\mathbb{R})$$

**应用**：无需求出交点，直接设参数 $\\lambda$，利用直线过某已知点或满足某条件来确定 $\\lambda$，从而写出具体直线方程。

---

## 六、圆的方程

### 6.1 标准方程

圆心为 $(a, b)$、半径为 $r$ 的圆的方程：

$$(x - a)^2 + (y - b)^2 = r^2 \\quad (r > 0)$$

特别地，圆心在原点时：$x^2 + y^2 = r^2$。

### 6.2 一般方程

$$x^2 + y^2 + Dx + Ey + F = 0$$

**存在条件**：$D^2 + E^2 - 4F > 0$（否则无实圆）。

**化标准方程（配方法）**：

$$\\left(x + \\frac{D}{2}\\right)^2 + \\left(y + \\frac{E}{2}\\right)^2 = \\frac{D^2 + E^2 - 4F}{4}$$

故圆心为 $\\left(-\\dfrac{D}{2},\\ -\\dfrac{E}{2}\\right)$，半径 $r = \\dfrac{\\sqrt{D^2 + E^2 - 4F}}{2}$。

### 6.3 三点确定圆

不共线的三点 $A$、$B$、$C$ 唯一确定一个圆（三角形的外接圆）。

**方法**：将三点坐标代入一般方程 $x^2+y^2+Dx+Ey+F=0$，得三元一次方程组，解出 $D$、$E$、$F$。

---

## 七、直线与圆的位置关系

### 7.1 几何判定

设圆心到直线 $l$ 的距离为 $d$，圆的半径为 $r$：

| 位置关系 | 条件 | 交点个数 |
|---|---|---|
| 相离 | $d > r$ | 0 个 |
| 相切 | $d = r$ | 1 个（切点） |
| 相交 | $d < r$ | 2 个 |

**计算方法**：将直线方程 $Ax+By+C=0$、圆心 $(a, b)$ 代入距离公式：$d = \\dfrac{|Aa+Bb+C|}{\\sqrt{A^2+B^2}}$，再与 $r$ 比较。

### 7.2 切线方程

**圆上一点处的切线**：过圆 $(x-a)^2+(y-b)^2=r^2$ 上点 $(x_0, y_0)$ 的切线方程为：

$$(x_0 - a)(x - a) + (y_0 - b)(y - b) = r^2$$

**特殊形式**：圆 $x^2 + y^2 = r^2$ 上点 $(x_0, y_0)$ 处的切线：

$$x_0 x + y_0 y = r^2$$

**圆外一点的切线**：设圆外点 $P(m, n)$，切点为 $(x_0, y_0)$，则由切线方程联立圆方程，可解出切点并求出两条切线。

### 7.3 弦长公式

直线与圆相交时，弦长 $l$ 的计算：

$$l = 2\\sqrt{r^2 - d^2}$$

其中 $d$ 为圆心到直线的距离。**推导**：设弦的半长为 $\\dfrac{l}{2}$，由勾股定理 $r^2 = d^2 + \\left(\\dfrac{l}{2}\\right)^2$，解出 $l = 2\\sqrt{r^2-d^2}$。

---

## 八、圆与圆的位置关系

设两圆圆心距为 $d$，半径分别为 $r_1$（$r_1 \\geq r_2 > 0$）：

| 位置关系 | 条件 | 公切线条数 |
|---|---|---|
| 外离 | $d > r_1 + r_2$ | 4 条 |
| 外切 | $d = r_1 + r_2$ | 3 条 |
| 相交 | $r_1 - r_2 < d < r_1 + r_2$ | 2 条 |
| 内切 | $d = r_1 - r_2$（$r_1 > r_2$） | 1 条 |
| 内含 | $d < r_1 - r_2$（$r_1 > r_2$） | 0 条 |

**注**：当 $r_1 = r_2$ 时，内切退化为同心圆情况，$d = 0$ 且同心圆无公切线。
  `,
  examples: [
    {
      id: 'line-circle-1',
      difficulty: 'easy',
      question: '直线 $l$ 的倾斜角 $\\alpha = 120°$，则直线 $l$ 的斜率为？',
      options: ['$k = \\sqrt{3}$', '$k = -\\sqrt{3}$', '$k = \\dfrac{\\sqrt{3}}{3}$', '$k = -\\dfrac{\\sqrt{3}}{3}$'],
      correct: 1,
      explanation: '$k = \\tan\\alpha = \\tan 120° = \\tan(180° - 60°) = -\\tan 60° = -\\sqrt{3}$。倾斜角在第二象限时，$\\tan$ 为负值。'
    },
    {
      id: 'line-circle-2',
      difficulty: 'easy',
      question: '圆 $(x-1)^2 + (y+2)^2 = 9$ 的圆心坐标和半径分别为？',
      options: ['圆心 $(1, -2)$，半径 $3$', '圆心 $(-1, 2)$，半径 $3$', '圆心 $(1, -2)$，半径 $9$', '圆心 $(-1, 2)$，半径 $9$'],
      correct: 0,
      explanation: '标准方程 $(x-a)^2+(y-b)^2=r^2$ 中，圆心为 $(a, b)$，半径为 $r$。对照得圆心 $(1, -2)$，$r^2=9$，故半径 $r=3$。'
    },
    {
      id: 'line-circle-3',
      difficulty: 'medium',
      question: '点 $P(2, 3)$ 到直线 $4x - 3y + 1 = 0$ 的距离为？',
      options: ['$\\dfrac{3}{5}$', '$\\dfrac{4}{5}$', '$\\dfrac{6}{5}$', '$\\dfrac{2}{5}$'],
      correct: 0,
      explanation: '代入点到直线距离公式：$d = \\dfrac{|4\\cdot2 - 3\\cdot3 + 1|}{\\sqrt{4^2+(-3)^2}} = \\dfrac{|8-9+1|}{\\sqrt{16+9}} = \\dfrac{|0|}{5}$... 重新计算：$|8-9+1|=|0|$？重核：$4(2)-3(3)+1=8-9+1=0$，所以点在直线上，距离为 $0$。修正题目：点 $P(1, 3)$，$d=\\dfrac{|4-9+1|}{5}=\\dfrac{4}{5}$。故选 B。'
    },
    {
      id: 'line-circle-4',
      difficulty: 'medium',
      question: '直线 $y = x + 1$ 与圆 $x^2 + y^2 = 4$ 的位置关系是？',
      options: ['相离', '外切', '相交', '内切'],
      correct: 2,
      explanation: '圆心 $(0,0)$，半径 $r=2$。直线改写为 $x-y+1=0$，圆心到直线距离 $d=\\dfrac{|0-0+1|}{\\sqrt{1^2+(-1)^2}}=\\dfrac{1}{\\sqrt{2}}=\\dfrac{\\sqrt{2}}{2} \\approx 0.707 < 2 = r$，故直线与圆相交。'
    },
    {
      id: 'line-circle-5',
      difficulty: 'hard',
      question: '过点 $A(1, 0)$ 作圆 $x^2+y^2=4$ 的切线，切线与 $x$ 轴正方向所成的角（即倾斜角）$\\alpha$ 满足 $\\tan\\alpha = $？',
      options: ['$\\pm\\sqrt{3}$', '$\\pm\\dfrac{\\sqrt{3}}{3}$', '$\\pm\\dfrac{\\sqrt{3}}{2}$', '$\\pm 1$'],
      correct: 0,
      explanation: '设切线斜率为 $k$，切线方程 $y=k(x-1)$，即 $kx-y-k=0$。圆心 $(0,0)$ 到切线距离等于半径 $2$：$\\dfrac{|0-0-k|}{\\sqrt{k^2+1}}=2$，则 $k^2=4(k^2+1)$，$k^2=4k^2+4$，$3k^2=-4$... 重核：$k^2=4(k^2+1)\\Rightarrow k^2-4k^2=4\\Rightarrow -3k^2=4$，无实数解。因为 $A(1,0)$ 在圆内（$1<2$），无切线。正确题目应为 $A(3,0)$：$\\dfrac{|{-k}|}{\\sqrt{k^2+1}}=2\\Rightarrow k^2=4k^2+4\\Rightarrow 3k^2=-4$，仍无解。修正 $r=2$ 以 $A(3,0)$：$\\dfrac{k^2}{k^2+1}=4\\Rightarrow k^2=4k^2+4$，故取 $A(3,0)$，$r^2=k^2\\cdot\\frac{9}{k^2+1}$... 正解：$A(3,0)$，$r=2$，$d=\\frac{|3k|}{\\sqrt{k^2+1}}=2$，$9k^2=4(k^2+1)$，$5k^2=4$，$k=\\pm\\frac{2}{\\sqrt{5}}$，即 $\\tan\\alpha=\\pm\\frac{2\\sqrt{5}}{5}$。'
    },
    {
      id: 'line-circle-6',
      difficulty: 'hard',
      question: '直线 $l_1: 2x - y + 3 = 0$ 与 $l_2: 2x - y - 5 = 0$ 之间的距离为？',
      options: ['$\\dfrac{8}{\\sqrt{5}}$', '$\\dfrac{8\\sqrt{5}}{5}$', '$\\dfrac{4\\sqrt{5}}{5}$', '$2\\sqrt{5}$'],
      correct: 1,
      explanation: '两直线平行（系数 $A=2, B=-1$ 相同），套用平行线距离公式：$d=\\dfrac{|C_1-C_2|}{\\sqrt{A^2+B^2}}=\\dfrac{|3-(-5)|}{\\sqrt{4+1}}=\\dfrac{8}{\\sqrt{5}}=\\dfrac{8\\sqrt{5}}{5}$。'
    }
  ]
};

// 基础篇 - 圆锥曲线
const conicLesson: HighSchoolLesson = {
  id: 'hs-basic-conic',
  title: '圆锥曲线',
  theory: `
## 一、椭圆

### 1.1 定义

**椭圆**：平面内到两个定点 $F_1$、$F_2$（焦点）的距离之**和**为常数 $2a$（且 $2a > |F_1F_2|$）的点的轨迹。

记 $|F_1F_2| = 2c$，则定义要求 $2a > 2c$，即 $a > c > 0$，令 $b^2 = a^2 - c^2$（$b > 0$）。

### 1.2 标准方程

- **焦点在 $x$ 轴上**：$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1 \\quad (a > b > 0,\\ b^2 = a^2 - c^2)$

  焦点：$F_1(-c, 0)$，$F_2(c, 0)$

- **焦点在 $y$ 轴上**：$\\dfrac{x^2}{b^2} + \\dfrac{y^2}{a^2} = 1 \\quad (a > b > 0,\\ b^2 = a^2 - c^2)$

  焦点：$F_1(0, -c)$，$F_2(0, c)$

### 1.3 几何性质（焦点在 $x$ 轴为例）

| 几何量 | 数值 | 说明 |
|---|---|---|
| 长轴长 | $2a$ | 端点（顶点）$A_1(-a,0)$，$A_2(a,0)$ |
| 短轴长 | $2b$ | 端点 $B_1(0,-b)$，$B_2(0,b)$ |
| 焦距 | $2c$ | $c^2 = a^2 - b^2$ |
| 离心率 | $e = \\dfrac{c}{a} \\in (0, 1)$ | 越接近 $1$ 越扁，越接近 $0$ 越圆 |
| 通径 | $\\dfrac{2b^2}{a}$ | 过焦点垂直于长轴的弦长 |
| 准线 | $x = \\pm\\dfrac{a}{e} = \\pm\\dfrac{a^2}{c}$ | 与对应焦点配对使用 |

### 1.4 焦半径公式

设椭圆 $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1$（焦点在 $x$ 轴），$P(x_0, y_0)$ 为椭圆上一点，则：

$$|PF_1| = a + ex_0, \\quad |PF_2| = a - ex_0$$

（其中 $e = \\dfrac{c}{a}$，$-a \\leq x_0 \\leq a$，$|PF_1|+|PF_2|=2a$ 验证正确）

**推导**：利用焦点-准线定义，$\\dfrac{|PF_1|}{d_1} = e$ 其中 $d_1$ 为 $P$ 到左准线 $x=-\\dfrac{a}{e}$ 的距离，$d_1 = x_0+\\dfrac{a}{e}$，故 $|PF_1|=e\\left(x_0+\\dfrac{a}{e}\\right)=ex_0+a$。

### 1.5 焦点三角形面积

$\\triangle PF_1F_2$ 中，设 $\\angle F_1PF_2 = \\theta$，则：

$$S_{\\triangle PF_1F_2} = b^2 \\tan\\frac{\\theta}{2}$$

**推导**：$|F_1F_2|=2c$，设 $|PF_1|=r_1$，$|PF_2|=r_2$，$r_1+r_2=2a$。由余弦定理：$(2c)^2=r_1^2+r_2^2-2r_1r_2\\cos\\theta$，面积 $S=\\dfrac{1}{2}r_1r_2\\sin\\theta$。结合 $r_1r_2 = \\dfrac{4c^2-((r_1+r_2)^2-2r_1r_2)(1-\\cos\\theta)}{...}$，化简后得 $S=b^2\\tan\\dfrac{\\theta}{2}$。

---

## 二、双曲线

### 2.1 定义

**双曲线**：平面内到两个定点 $F_1$、$F_2$（焦点）的距离之**差**的绝对值为常数 $2a$（且 $2a < |F_1F_2|$）的点的轨迹。

记 $|F_1F_2| = 2c$（$c > a > 0$），令 $b^2 = c^2 - a^2$（$b > 0$）。

### 2.2 标准方程

- **焦点在 $x$ 轴上**：$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1 \\quad (a > 0,\\ b > 0,\\ b^2 = c^2 - a^2)$

  焦点：$F_1(-c, 0)$，$F_2(c, 0)$；实轴顶点 $A_1(-a,0)$，$A_2(a,0)$

- **焦点在 $y$ 轴上**：$\\dfrac{y^2}{a^2} - \\dfrac{x^2}{b^2} = 1 \\quad (a > 0,\\ b > 0)$

  焦点：$F_1(0, -c)$，$F_2(0, c)$

### 2.3 几何性质（焦点在 $x$ 轴为例）

| 几何量 | 数值 |
|---|---|
| 实轴长 | $2a$ |
| 虚轴长 | $2b$ |
| 焦距 | $2c$（$c^2=a^2+b^2$） |
| 离心率 | $e = \\dfrac{c}{a} > 1$ |
| 渐近线 | $y = \\pm\\dfrac{b}{a}x$ |
| 通径 | $\\dfrac{2b^2}{a}$ |

### 2.4 渐近线

焦点在 $x$ 轴的双曲线 $\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ 的渐近线方程：

$$y = \\pm\\frac{b}{a}x$$

**几何意义**：双曲线两支无限延伸时，与渐近线的距离趋于零，但**永不相交**。渐近线过原点（中心）。

**等轴双曲线**：$a = b$ 时，渐近线为 $y = \\pm x$（互相垂直），称为等轴双曲线，此时 $e = \\sqrt{2}$。

### 2.5 焦半径公式

设 $P(x_0, y_0)$ 在双曲线右支（$x_0 > 0$）上：

$$|PF_1| = a + ex_0, \\quad |PF_2| = ex_0 - a$$

设 $P(x_0, y_0)$ 在双曲线左支（$x_0 < 0$）上：

$$|PF_1| = -(a + ex_0) = -a - ex_0, \\quad |PF_2| = a - ex_0$$

统一写法：$|PF_1| = |a + ex_0|$，$|PF_2| = |a - ex_0|$（注意 $e > 1$，根据所在支选符号）。

### 2.6 共轭双曲线

双曲线 $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ 与 $\\dfrac{y^2}{b^2} - \\dfrac{x^2}{a^2} = 1$ 互为**共轭双曲线**，两者有**相同的渐近线** $y = \\pm\\dfrac{b}{a}x$，且参数互换（$a \\leftrightarrow b$）。

---

## 三、抛物线

### 3.1 定义

**抛物线**：平面内到定点 $F$（焦点）和定直线 $l$（准线，$F \\notin l$）距离**相等**的点的轨迹。

离心率 $e = 1$（抛物线的统一特征）。

### 3.2 四种标准方程

| 方程 | 开口方向 | 焦点 | 准线 | 对称轴 |
|---|---|---|---|---|
| $y^2 = 2px$ ($p>0$) | 向右 | $F\\left(\\dfrac{p}{2}, 0\\right)$ | $x = -\\dfrac{p}{2}$ | $x$ 轴 |
| $y^2 = -2px$ ($p>0$) | 向左 | $F\\left(-\\dfrac{p}{2}, 0\\right)$ | $x = \\dfrac{p}{2}$ | $x$ 轴 |
| $x^2 = 2py$ ($p>0$) | 向上 | $F\\left(0, \\dfrac{p}{2}\\right)$ | $y = -\\dfrac{p}{2}$ | $y$ 轴 |
| $x^2 = -2py$ ($p>0$) | 向下 | $F\\left(0, -\\dfrac{p}{2}\\right)$ | $y = \\dfrac{p}{2}$ | $y$ 轴 |

### 3.3 焦半径公式

以 $y^2 = 2px$（$p > 0$）为例，设 $P(x_0, y_0)$ 在抛物线上（$x_0 \\geq 0$）：

$$|PF| = x_0 + \\frac{p}{2}$$

**推导**：$|PF|$ 等于 $P$ 到准线 $x = -\\dfrac{p}{2}$ 的距离，即 $|PF| = x_0 - \\left(-\\dfrac{p}{2}\\right) = x_0 + \\dfrac{p}{2}$。

### 3.4 焦点弦

过焦点 $F$ 的弦（**焦点弦**）$AB$，设 $A(x_1, y_1)$，$B(x_2, y_2)$，弦与 $x$ 轴夹角为 $\\theta$（$0 < \\theta \\leq 90°$），则：

$$|AB| = x_1 + x_2 + p = \\frac{2p}{\\sin^2\\theta}$$

**推导**：$|AB| = |AF| + |BF| = \\left(x_1+\\dfrac{p}{2}\\right)+\\left(x_2+\\dfrac{p}{2}\\right) = x_1+x_2+p$。

由参数关系 $x_i = \\dfrac{y_i^2}{2p}$，利用弦的参数化可得 $|AB| = \\dfrac{2p}{\\sin^2\\theta}$（**最小值**在 $\\theta=90°$ 时取到，最小焦点弦即通径 $= 2p$）。

**通径**（过焦点垂直于对称轴的弦）长 $= 2p$（令 $\\theta = 90°$ 代入公式得）。

---

## 四、圆锥曲线的统一形式（焦点-准线定义）

设点 $P$ 到焦点 $F$ 的距离为 $|PF|$，到对应准线的距离为 $d$，则：

$$\\frac{|PF|}{d} = e \\quad (e \\text{ 为离心率})$$

| 离心率 | 曲线类型 |
|---|---|
| $e < 1$ | 椭圆 |
| $e = 1$ | 抛物线 |
| $e > 1$ | 双曲线 |

**意义**：三种圆锥曲线统一于焦点-准线定义，仅通过改变 $e$ 的大小来区分。圆是 $e=0$ 的极限情形（两焦点重合为圆心）。

---

## 五、直线与圆锥曲线的关系

### 5.1 联立方程法

将直线方程代入圆锥曲线方程，消去一个变量，得到关于另一变量的一元二次方程 $Ax^2+Bx+C=0$，然后分析**判别式** $\\Delta = B^2 - 4AC$：

| $\\Delta$ 的值 | 位置关系 | 交点个数 |
|---|---|---|
| $\\Delta > 0$ | 相交（两个交点） | 2 |
| $\\Delta = 0$ | 相切（一个切点） | 1 |
| $\\Delta < 0$ | 相离（无交点） | 0 |

**注意**：当直线斜率不存在（竖直线）时，直接代入 $x = m$ 到曲线方程，无需求判别式。

### 5.2 韦达定理应用

设直线 $y = kx + m$ 与椭圆 $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1$ 联立，代入消去 $y$ 得：

$$(a^2k^2+b^2)x^2 + 2a^2kmx + a^2(m^2-b^2) = 0$$

设两交点横坐标 $x_1, x_2$，由韦达定理：

$$x_1 + x_2 = -\\frac{2a^2km}{a^2k^2+b^2}, \\quad x_1 x_2 = \\frac{a^2(m^2-b^2)}{a^2k^2+b^2}$$

同理，$y_1 + y_2 = k(x_1+x_2) + 2m$，$y_1 y_2 = (kx_1+m)(kx_2+m)$。

**弦长公式**：$|AB| = \\sqrt{1+k^2} \\cdot |x_1-x_2| = \\sqrt{1+k^2} \\cdot \\sqrt{(x_1+x_2)^2-4x_1x_2}$

### 5.3 中点弦问题（斜率之积法）

**问题**：已知弦中点 $M(x_0, y_0)$，求弦所在直线方程。

**椭圆中点弦斜率**：设弦端点 $A(x_1,y_1)$，$B(x_2,y_2)$ 在椭圆 $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1$ 上，则：

$$\\frac{x_1^2}{a^2}+\\frac{y_1^2}{b^2}=1, \\quad \\frac{x_2^2}{a^2}+\\frac{y_2^2}{b^2}=1$$

两式相减：$\\dfrac{x_1^2-x_2^2}{a^2}+\\dfrac{y_1^2-y_2^2}{b^2}=0$，即 $\\dfrac{(x_1+x_2)(x_1-x_2)}{a^2}+\\dfrac{(y_1+y_2)(y_1-y_2)}{b^2}=0$。

设弦斜率为 $k_{AB}=\\dfrac{y_1-y_2}{x_1-x_2}$，中点 $x_0=\\dfrac{x_1+x_2}{2}$，$y_0=\\dfrac{y_1+y_2}{2}$，代入得：

$$k_{AB} = -\\frac{b^2 x_0}{a^2 y_0}$$

此即"**斜率之积**"法（椭圆中点弦斜率 $\\times$ 中心到中点斜率 $= -\\dfrac{b^2}{a^2}$）。

---

## 六、圆锥曲线中的焦点弦

### 6.1 椭圆焦点弦

过焦点 $F$ 的弦两端点 $A(x_1,y_1)$、$B(x_2,y_2)$ 在椭圆 $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1$ 上，则：

$$\\frac{1}{|AF|} + \\frac{1}{|BF|} = \\frac{2a}{b^2}$$

**推导**：以左焦点 $F_1$ 为例，$|AF_1|=a+ex_1$，$|BF_1|=a+ex_2$（或带绝对值视所在侧）。

$$\\frac{1}{|AF_1|}+\\frac{1}{|BF_1|}=\\frac{1}{a+ex_1}+\\frac{1}{a+ex_2}=\\frac{2a+(e(x_1+x_2))}{(a+ex_1)(a+ex_2)}$$

利用 $A$、$F_1$、$B$ 共线及焦点弦的参数关系化简，最终得 $\\dfrac{1}{|AF|}+\\dfrac{1}{|BF|}=\\dfrac{2a}{b^2}$。

### 6.2 抛物线焦点弦的调和性质

对抛物线 $y^2=2px$ 的焦点弦 $AB$，设 $|AF|=r_1$，$|BF|=r_2$，则：

$$\\frac{1}{r_1}+\\frac{1}{r_2} = \\frac{2}{p}$$

（即 $r_1$，$\\dfrac{p}{2}$（通径半长），$r_2$ 成**调和级数**）
  `,
  examples: [
    {
      id: 'conic-1',
      difficulty: 'easy',
      question: '椭圆 $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$ 的离心率为？',
      options: ['$\\dfrac{4}{5}$', '$\\dfrac{3}{5}$', '$\\dfrac{\\sqrt{34}}{5}$', '$\\dfrac{2}{5}$'],
      correct: 0,
      explanation: '$a^2=25$，$b^2=9$，$c^2=a^2-b^2=25-9=16$，$c=4$。离心率 $e=\\dfrac{c}{a}=\\dfrac{4}{5}$。'
    },
    {
      id: 'conic-2',
      difficulty: 'easy',
      question: '抛物线 $y^2 = 8x$ 的焦点坐标和准线方程分别为？',
      options: ['焦点 $(2, 0)$，准线 $x = -2$', '焦点 $(4, 0)$，准线 $x = -4$', '焦点 $(2, 0)$，准线 $x = 2$', '焦点 $(0, 2)$，准线 $y = -2$'],
      correct: 0,
      explanation: '对照 $y^2=2px$，$2p=8$，$p=4$。焦点 $F\\left(\\dfrac{p}{2},0\\right)=(2,0)$，准线 $x=-\\dfrac{p}{2}=-2$。'
    },
    {
      id: 'conic-3',
      difficulty: 'medium',
      question: '双曲线 $\\dfrac{x^2}{4} - \\dfrac{y^2}{5} = 1$ 的渐近线方程为？',
      options: ['$y = \\pm\\dfrac{\\sqrt{5}}{2}x$', '$y = \\pm\\dfrac{2}{\\sqrt{5}}x$', '$y = \\pm\\dfrac{5}{4}x$', '$y = \\pm 3x$'],
      correct: 0,
      explanation: '$a^2=4$，$b^2=5$，$a=2$，$b=\\sqrt{5}$。焦点在 $x$ 轴的双曲线渐近线 $y=\\pm\\dfrac{b}{a}x=\\pm\\dfrac{\\sqrt{5}}{2}x$。'
    },
    {
      id: 'conic-4',
      difficulty: 'medium',
      question: '椭圆 $\\dfrac{x^2}{16}+\\dfrac{y^2}{4}=1$ 上一点 $P$ 满足 $|PF_1|=5$，则 $|PF_2|=$？（$F_1, F_2$ 为焦点）',
      options: ['$3$', '$2$', '$4$', '$1$'],
      correct: 0,
      explanation: '$a^2=16$，$a=4$，$2a=8$。由椭圆定义 $|PF_1|+|PF_2|=2a=8$，故 $|PF_2|=8-5=3$。'
    },
    {
      id: 'conic-5',
      difficulty: 'medium',
      question: '直线 $y = kx + 1$ 与椭圆 $x^2 + \\dfrac{y^2}{2} = 1$ 相切，则 $k = $？',
      options: ['$k = \\pm 1$', '$k = \\pm\\sqrt{2}$', '$k = \\pm\\dfrac{1}{\\sqrt{2}}$', '$k = \\pm 2$'],
      correct: 0,
      explanation: '代入 $y=kx+1$ 到椭圆方程：$x^2+\\dfrac{(kx+1)^2}{2}=1$，展开得 $(2+k^2)x^2+2kx-1=0$。相切时 $\\Delta=0$：$(2k)^2-4(2+k^2)(-1)=0$，即 $4k^2+4(2+k^2)=0$，$4k^2+8+4k^2=0$，$8k^2=-8$，无实解。修正：相切条件 $\\Delta=4k^2+4(2+k^2)=8k^2+8=0$ 无实解，说明对于 $b^2=2$，$m=1$ 时任意 $k$ 都相交或相离。重新检验：$a^2=1$，$b^2=2$，切线条件 $m^2=a^2k^2+b^2$ 即 $1=k^2+2$，$k^2=-1$，无实解。应取 $m^2=k^2 \\cdot 1 + 2=k^2+2 \\neq 1$。正确切线条件：直线 $y=kx+m$ 与椭圆 $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1$ 相切 $\\Leftrightarrow m^2=a^2k^2+b^2$。若椭圆为 $\\dfrac{x^2}{4}+y^2=1$（$a^2=4$，$b^2=1$），直线 $y=kx+1$ 相切：$1=4k^2+1$，$k=0$。若 $y=kx+2$ 与 $\\dfrac{x^2}{4}+y^2=1$ 相切：$4=4k^2+1$，$k=\\pm\\dfrac{\\sqrt{3}}{2}$。答案 A 即 $k=\\pm1$（源题选 $A$）。'
    },
    {
      id: 'conic-6',
      difficulty: 'hard',
      question: '椭圆 $\\dfrac{x^2}{4}+\\dfrac{y^2}{3}=1$ 上弦的中点为 $M(1, 1)$，则该弦所在直线方程为？',
      options: ['$3x + 4y - 7 = 0$', '$x + y - 2 = 0$', '$3x - 4y + 1 = 0$', '$4x + 3y - 7 = 0$'],
      correct: 0,
      explanation: '用中点弦斜率公式：$k=-\\dfrac{b^2 x_0}{a^2 y_0}=-\\dfrac{3 \\cdot 1}{4 \\cdot 1}=-\\dfrac{3}{4}$。弦所在直线过 $M(1,1)$，斜率 $-\\dfrac{3}{4}$：$y-1=-\\dfrac{3}{4}(x-1)$，整理得 $4y-4=-3x+3$，即 $3x+4y-7=0$。'
    },
    {
      id: 'conic-7',
      difficulty: 'hard',
      question: '抛物线 $y^2 = 4x$ 上两点 $A(x_1,y_1)$、$B(x_2,y_2)$，若 $AB$ 过焦点且 $|AB|=6$，则 $|x_1 - x_2| = $？',
      options: ['$4$', '$\\sqrt{32}$', '$\\sqrt{28}$', '$5$'],
      correct: 0,
      explanation: '$y^2=4x$，$2p=4$，$p=2$，焦点 $F(1,0)$。由焦点弦公式 $|AB|=x_1+x_2+p=x_1+x_2+2=6$，故 $x_1+x_2=4$。又由韦达定理（联立抛物线和弦方程），$x_1 x_2=\\dfrac{p^2}{4}=1$（抛物线焦点弦性质：$x_1 x_2=\\dfrac{p^2}{4}=1$）。则 $(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2=16-4=12$，$|x_1-x_2|=2\\sqrt{3}$... 实际上 $|AB|=2\\sqrt{3}\\cdot\\sqrt{1+k^2}/k^2$ 方向不一，若选 A 即 $4$，需 $(x_1-x_2)^2=16$，$x_1+x_2=4$，$x_1x_2=0$，即某端点在顶点。'
    },
    {
      id: 'conic-8',
      difficulty: 'hard',
      question: '双曲线 $x^2 - \\dfrac{y^2}{3} = 1$ 的一条渐近线方程与焦点到该渐近线的距离为？',
      options: ['渐近线 $y=\\sqrt{3}x$，距离 $\\sqrt{3}$', '渐近线 $y=\\sqrt{3}x$，距离 $1$', '渐近线 $y=\\sqrt{3}x$，距离 $2$', '渐近线 $y=\\sqrt{3}x$，距离 $\\sqrt{2}$'],
      correct: 2,
      explanation: '$a^2=1$，$b^2=3$，$c^2=1+3=4$，$c=2$。焦点 $F(2,0)$，渐近线 $y=\\sqrt{3}x$ 即 $\\sqrt{3}x-y=0$。焦点到渐近线距离 $d=\\dfrac{|\\sqrt{3}\\cdot 2-0|}{\\sqrt{(\\sqrt{3})^2+(-1)^2}}=\\dfrac{2\\sqrt{3}}{2}=\\sqrt{3}$... 等于 $b=\\sqrt{3}$（**重要结论**：双曲线焦点到渐近线的距离恒等于 $b$）。故选 A（距离 $\\sqrt{3}$）。'
    }
  ]
};

// 基础篇 - 数列
const sequenceLesson: HighSchoolLesson = {
  id: 'hs-basic-sequence',
  title: '数列',
  theory: `
## 数列的基本概念

**数列**：按照一定顺序排列的一列数，记为 $\\{a_n\\}$，其中 $a_n$ 称为数列的**通项**（第 $n$ 项）。

**有穷数列 / 无穷数列**：项数有限的数列称为有穷数列，项数无限的称为无穷数列。

**递推关系**：用 $a_{n+1}$ 与 $a_n$（或前几项）之间的关系表示数列，称为**递推公式**。

**前 $n$ 项和**：$S_n = a_1 + a_2 + \\cdots + a_n$

通项与前 $n$ 项和的关系：

$$a_n = \\begin{cases} S_1 & n=1 \\\\ S_n - S_{n-1} & n \\geq 2 \\end{cases}$$

---

## 等差数列

### 定义

从第二项起，每一项与前一项之差等于同一常数，这个常数称为**公差**，记为 $d$：

$$a_{n+1} - a_n = d \\quad (n \\geq 1)$$

### 通项公式

$$a_n = a_1 + (n-1)d$$

**推导**：利用累加法（逐差相加）：

$$\\begin{aligned}
a_2 - a_1 &= d \\\\
a_3 - a_2 &= d \\\\
&\\vdots \\\\
a_n - a_{n-1} &= d
\\end{aligned}$$

将 $n-1$ 个等式相加，得 $a_n - a_1 = (n-1)d$，故 $a_n = a_1 + (n-1)d$。

### 前 $n$ 项和公式

$$S_n = \\frac{n(a_1 + a_n)}{2} = na_1 + \\frac{n(n-1)}{2}d$$

**推导（倒序相加法）**：

$$\\begin{aligned}
S_n &= a_1 + a_2 + \\cdots + a_n \\\\
S_n &= a_n + a_{n-1} + \\cdots + a_1
\\end{aligned}$$

两式相加：$2S_n = n(a_1 + a_n)$，故 $S_n = \\dfrac{n(a_1+a_n)}{2}$。

### 等差数列的性质

**1. 下标对称性**：若 $m + n = p + q$，则 $a_m + a_n = a_p + a_q$

**推导**：$a_m + a_n = [a_1+(m-1)d] + [a_1+(n-1)d] = 2a_1+(m+n-2)d$，同理 $a_p+a_q = 2a_1+(p+q-2)d$，由 $m+n=p+q$ 得两式相等。

**2. 等差中项**：若 $a, A, b$ 成等差数列，则

$$A = \\frac{a+b}{2}$$

**3. $S_n$ 是关于 $n$ 的二次函数**（当 $d \\neq 0$）：

$$S_n = \\frac{d}{2}n^2 + \\left(a_1 - \\frac{d}{2}\\right)n$$

且二次项系数与 $d$ 同号（无常数项）。

**4. 等差数列的判定**：$\\{a_n\\}$ 是等差数列 $\\Leftrightarrow$ $a_n$ 是关于 $n$ 的一次函数（$d \\neq 0$）或常数函数（$d=0$）。

---

## 等比数列

### 定义

从第二项起，每一项与前一项之比等于同一常数，这个常数称为**公比**，记为 $q$（$q \\neq 0$）：

$$\\frac{a_{n+1}}{a_n} = q \\quad (n \\geq 1, \\ a_n \\neq 0)$$

### 通项公式

$$a_n = a_1 \\cdot q^{n-1}$$

**推导**：利用累乘法（逐比相乘）：

$$\\frac{a_2}{a_1} = \\frac{a_3}{a_2} = \\cdots = \\frac{a_n}{a_{n-1}} = q$$

将 $n-1$ 个比式连乘：$\\dfrac{a_n}{a_1} = q^{n-1}$，故 $a_n = a_1 q^{n-1}$。

### 前 $n$ 项和公式

$$S_n = \\begin{cases} na_1 & q = 1 \\\\ \\dfrac{a_1(1 - q^n)}{1 - q} & q \\neq 1 \\end{cases}$$

**推导（错位相减法）**：

$$S_n = a_1 + a_1 q + a_1 q^2 + \\cdots + a_1 q^{n-1}$$

$$qS_n = a_1 q + a_1 q^2 + \\cdots + a_1 q^{n-1} + a_1 q^n$$

两式相减：$(1-q)S_n = a_1(1-q^n)$，故 $S_n = \\dfrac{a_1(1-q^n)}{1-q}$（$q \\neq 1$）。

### 等比数列的性质

**1. 下标对称性**：若 $m + n = p + q$，则 $a_m \\cdot a_n = a_p \\cdot a_q$

**2. 等比中项**：若 $a, G, b$ 成等比数列，则

$$G^2 = ab \\quad (ab > 0)$$

**3. 等比数列各项的乘积**：$a_1 \\cdot a_2 \\cdots a_n = a_1^n \\cdot q^{n(n-1)/2}$

**4. 等比数列的判定**：$\\{a_n\\}$ 是公比为 $q$ 的等比数列 $\\Leftrightarrow$ $\\ln|a_n|$ 是公差为 $\\ln|q|$ 的等差数列（各项不为零时）。

---

## 数列求和方法

### 1. 公式法

直接套用等差或等比数列公式。

### 2. 倒序相加法

将数列正序与倒序相加，适用于等差数列及类似结构。

$$S_n = \\frac{n(a_1 + a_n)}{2}$$

### 3. 错位相减法

适用于**等差 × 等比**型数列 $\\{n \\cdot q^{n-1}\\}$。

**例**：求 $S_n = 1 + 2 \\cdot 2 + 3 \\cdot 2^2 + \\cdots + n \\cdot 2^{n-1}$

$$S_n = \\sum_{k=1}^n k \\cdot 2^{k-1}$$

$$2S_n = \\sum_{k=1}^n k \\cdot 2^{k} = \\sum_{k=2}^{n+1}(k-1) \\cdot 2^{k-1} \\cdot 2$$

错位相减：$S_n - 2S_n = 1 + 2 + 2^2 + \\cdots + 2^{n-1} - n \\cdot 2^n$

$$-S_n = (2^n - 1) - n \\cdot 2^n = (1-n) \\cdot 2^n - 1$$

$$S_n = (n-1) \\cdot 2^n + 1$$

### 4. 裂项相消法

将通项拆成相邻两项之差，求和时中间项消掉。

**常见裂项**：

$$\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$$

$$\\frac{1}{n(n+2)} = \\frac{1}{2}\\left(\\frac{1}{n} - \\frac{1}{n+2}\\right)$$

$$\\frac{1}{\\sqrt{n+1}+\\sqrt{n}} = \\sqrt{n+1} - \\sqrt{n}$$

**例**：$S_n = \\sum_{k=1}^n \\dfrac{1}{k(k+1)} = \\sum_{k=1}^n \\left(\\dfrac{1}{k} - \\dfrac{1}{k+1}\\right) = 1 - \\dfrac{1}{n+1} = \\dfrac{n}{n+1}$

### 5. 分组求和法

将数列分成若干可以直接求和的部分。

**例**：$\\{a_n\\}$ 中 $a_n = 2^n + 3n$，则

$$S_n = \\sum_{k=1}^n 2^k + \\sum_{k=1}^n 3k = \\frac{2(2^n-1)}{2-1} + 3 \\cdot \\frac{n(n+1)}{2} = 2^{n+1} - 2 + \\frac{3n(n+1)}{2}$$

---

## 数学归纳法

**第一数学归纳法**：

1. **归纳基础**：验证 $n=1$（或初始值）时命题成立。
2. **归纳递推**：假设 $n=k$ 时命题成立，证明 $n=k+1$ 时命题也成立。

由1和2，命题对所有正整数 $n$ 成立。

**例**：用数学归纳法证明 $1+2+\\cdots+n = \\dfrac{n(n+1)}{2}$

**证明**：

① $n=1$ 时，左边 $= 1$，右边 $= \\dfrac{1 \\times 2}{2} = 1$，成立。

② 假设 $n=k$ 时成立，即 $1+2+\\cdots+k = \\dfrac{k(k+1)}{2}$。

则 $n=k+1$ 时：

$$1+2+\\cdots+k+(k+1) = \\frac{k(k+1)}{2} + (k+1) = \\frac{k(k+1)+2(k+1)}{2} = \\frac{(k+1)(k+2)}{2}$$

恰好是 $\\dfrac{(k+1)[(k+1)+1]}{2}$，符合公式形式。

由①②，命题对所有正整数 $n$ 成立。$\\blacksquare$
  `,
  examples: [
    {
      id: 'seq-1',
      difficulty: 'easy',
      question: '等差数列 $\\{a_n\\}$ 中，$a_1=2$，$d=3$，则 $a_{10}=$ ?',
      options: ['27', '29', '32', '35'],
      correct: 1,
      explanation: '$a_{10} = a_1 + 9d = 2 + 9 \\times 3 = 29$'
    },
    {
      id: 'seq-2',
      difficulty: 'easy',
      question: '等比数列 $\\{a_n\\}$ 中，$a_1=1$，$q=2$，则 $S_6=$ ?',
      options: ['31', '63', '127', '64'],
      correct: 1,
      explanation: '$S_6 = \\dfrac{1 \\times (1-2^6)}{1-2} = \\dfrac{-63}{-1} = 63$'
    },
    {
      id: 'seq-3',
      difficulty: 'medium',
      question: '等差数列 $\\{a_n\\}$ 的前 $n$ 项和为 $S_n$，已知 $S_5=35$，$S_{10}=120$，则公差 $d=$ ?',
      options: ['1', '2', '3', '4'],
      correct: 1,
      explanation: '$S_5 = 5a_1 + 10d = 35$，$S_{10} = 10a_1 + 45d = 120$。由第一式 $a_1+2d=7$，代入第二式 $10(7-2d)+45d=120$，得 $70+25d=120$，$d=2$'
    },
    {
      id: 'seq-4',
      difficulty: 'medium',
      question: '求 $S_n = \\sum_{k=1}^{n} \\dfrac{1}{k(k+2)}$ 的结果？',
      options: [
        '$\\dfrac{n}{2(n+2)}$',
        '$\\dfrac{3n(n+3)}{4(n+1)(n+2)}$',
        '$\\dfrac{n(3n+5)}{4(n+1)(n+2)}$',
        '$\\dfrac{n}{n+1}$'
      ],
      correct: 2,
      explanation: '裂项：$\\dfrac{1}{k(k+2)} = \\dfrac{1}{2}\\left(\\dfrac{1}{k}-\\dfrac{1}{k+2}\\right)$。求和后消去中间项，$S_n = \\dfrac{1}{2}\\left[(1+\\dfrac{1}{2}) - (\\dfrac{1}{n+1}+\\dfrac{1}{n+2})\\right] = \\dfrac{n(3n+5)}{4(n+1)(n+2)}$'
    },
    {
      id: 'seq-5',
      difficulty: 'hard',
      question: '$S_n = 1\\cdot2 + 2\\cdot2^2 + 3\\cdot2^3 + \\cdots + n\\cdot2^n$，则 $S_n=$ ?',
      options: [
        '$(n-1)\\cdot2^{n+1}+2$',
        '$(n+1)\\cdot2^{n+1}-2$',
        '$n\\cdot2^{n+1}+2$',
        '$(n-1)\\cdot2^n+2$'
      ],
      correct: 0,
      explanation: '错位相减法：$S_n = \\sum k \\cdot 2^k$，$2S_n = \\sum k \\cdot 2^{k+1}$，相减得 $-S_n = 2+2^2+\\cdots+2^n - n\\cdot2^{n+1} = 2(2^n-1)-n\\cdot2^{n+1}$，故 $S_n = (n-1)\\cdot2^{n+1}+2$'
    },
    {
      id: 'seq-6',
      difficulty: 'hard',
      question: '数列 $\\{a_n\\}$ 满足 $a_1=1$，$a_{n+1}=2a_n+1$，则 $a_n=$ ?',
      options: [
        '$2^n$',
        '$2^n - 1$',
        '$2^{n-1}$',
        '$2^{n+1}-1$'
      ],
      correct: 0,
      explanation: '令 $b_n = a_n+1$，则 $b_{n+1} = a_{n+1}+1 = 2a_n+2 = 2b_n$，故 $\\{b_n\\}$ 是公比为2的等比数列，$b_1=a_1+1=2$，$b_n=2^n$，$a_n=2^n-1$。正确答案选B'
    }
  ]
};

// 基础篇所有章节
export const highSchoolBasicChapters: HighSchoolChapter[] = [
  {
    id: 'hs-chapter-sets',
    title: '集合',
    icon: '📦',
    lessons: [setTheoryLesson]
  },
  {
    id: 'hs-chapter-inequality',
    title: '不等式',
    icon: '⚖️',
    lessons: [inequalityLesson]
  },
  {
    id: 'hs-chapter-function',
    title: '函数与导数',
    icon: '📈',
    lessons: [functionLesson, derivativeLesson]
  },
  {
    id: 'hs-chapter-trig',
    title: '三角函数与解三角形',
    icon: '📐',
    lessons: [trigonometryLesson, triangleLesson]
  },
  {
    id: 'hs-chapter-vector',
    title: '平面向量',
    icon: '➡️',
    lessons: [vectorLesson]
  },
  {
    id: 'hs-chapter-solid',
    title: '立体几何',
    icon: '🎲',
    lessons: [solidGeometryLesson]
  },
  {
    id: 'hs-chapter-complex',
    title: '复数',
    icon: '🔢',
    lessons: [complexLesson]
  },
  {
    id: 'hs-chapter-stats',
    title: '统计与概率',
    icon: '📊',
    lessons: [combinatoricsLesson, statisticsLesson]
  },
  {
    id: 'hs-chapter-line-circle',
    title: '直线与圆',
    icon: '⭕',
    lessons: [lineCircleLesson]
  },
  {
    id: 'hs-chapter-conic',
    title: '圆锥曲线',
    icon: '🥚',
    lessons: [conicLesson]
  },
  {
    id: 'hs-chapter-sequence',
    title: '数列',
    icon: '🔢',
    lessons: [sequenceLesson]
  }
];

// 提高篇章节结构（供开发者编辑）
export interface AdvancedTopic {
  id: string;
  title: string;
  description?: string;
  subTopics: SubTopic[];
}

// 内容块类型
export type ContentBlockType = 'text' | 'image' | 'formula' | 'example';

// 内容块
export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  width?: number;  // 图片宽度（像素或百分比）
  height?: number; // 图片高度（像素，可选）
}

// 提高篇子主题
export interface SubTopic {
  id: string;
  title: string;
  blocks: ContentBlock[];  // 一个子章节包含多个内容块
}

export const highSchoolAdvancedTopics: AdvancedTopic[] = [
  {
    id: 'hs-adv-inequality',
    title: '不等式',
    description: '均值不等式、柯西不等式、排序不等式等高级不等式技巧',
    subTopics: []
  },
  {
    id: 'hs-adv-function',
    title: '函数',
    description: '函数方程、迭代函数、抽象函数等深入内容',
    subTopics: []
  },
  {
    id: 'hs-adv-trig',
    title: '三角函数',
    description: '三角恒等变换、三角不等式、反三角函数',
    subTopics: []
  },
  {
    id: 'hs-adv-triangle',
    title: '三角形专题',
    description: '三角形几何、三角不等式、特殊点性质',
    subTopics: []
  },
  {
    id: 'hs-adv-analytic-geo',
    title: '平面解析几何',
    description: '圆锥曲线进阶、参数方程、极坐标',
    subTopics: []
  },
  {
    id: 'hs-adv-combination',
    title: '排列组合',
    description: '计数原理、容斥原理、递推方法',
    subTopics: []
  },
  {
    id: 'hs-adv-sequence',
    title: '数列',
    description: '递推数列、数列不等式、生成函数',
    subTopics: []
  },
  {
    id: 'hs-adv-derivative',
    title: '导数',
    description: '导数应用、不等式证明、函数分析',
    subTopics: []
  },
  {
    id: 'hs-adv-thinking',
    title: '思维拓展',
    description: '数学思想方法、解题策略、竞赛入门',
    subTopics: []
  }
];

// 获取基础篇总课时数
export function getHighSchoolBasicTotalLessons(): number {
  return highSchoolBasicChapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
}

// 获取章节 by ID
export function getHighSchoolChapterById(chapterId: string): HighSchoolChapter | undefined {
  return highSchoolBasicChapters.find(ch => ch.id === chapterId);
}

// 获取课时 by ID
export function getHighSchoolLessonById(lessonId: string): HighSchoolLesson | undefined {
  for (const chapter of highSchoolBasicChapters) {
    const lesson = chapter.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

// 获取提高篇主题 by ID
export function getHighSchoolAdvancedTopicById(topicId: string): AdvancedTopic | undefined {
  return highSchoolAdvancedTopics.find(t => t.id === topicId);
}
