// 高中数学提高篇 - 静态正式内容
// 此文件存储已编辑完成的知识点内容，上线后不可编辑

import { ContentBlock } from './highschoolMath';

// 子章节/课时
export interface StaticSubTopic {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

// 知识点分类
export interface StaticTopic {
  id: string;
  title: string;
  description: string;
  icon?: string;
  subTopics: StaticSubTopic[];
}

// 精编题库题目
export interface StaticQuestion {
  id: string;
  blocks: ContentBlock[];
  options?: string[];
  correctOption?: number;
  correctOptions?: number[];
  choiceType?: 'single' | 'multiple';
  hintBlocks?: ContentBlock[];
  solutionBlocks?: ContentBlock[];
}

// 精编题库章节
export interface StaticQuestionBankChapter {
  id: string;
  title: string;
  icon: string;
  questions: StaticQuestion[];
}

// 提高篇知识点数据
export const staticAdvancedTopics: StaticTopic[] = [
  {
    "id": "hs-adv-inequality",
    "title": "不等式",
    "description": "均值不等式、柯西不等式、排序不等式等高级不等式技巧",
    "icon": "≠",
    "subTopics": [
      {
        "id": "sub-1773721709870",
        "title": "均值不等式",
        "blocks": [
          {
            "id": "block-1773721793863",
            "type": "text",
            "content": "## 基本不等式链$$\\frac{2}{\\frac{1}{a}+\\frac{1}{b}} \\leq \\sqrt{ab} \\leq \\frac{a+b}{2} \\leq \\sqrt{\\frac{a^2+b^2}{2}}$$\n### 拓展形式\n\n**设 $n$ 是正整数且 $x_1, x_2, \\dots, x_n$ 是正实数，**\n\n**则：$H_n \\le G_n \\le A_n \\le Q_n$，当且仅当$x_1 = x_2 = \\dots = x_n$ 时取到等号。**\n\n**其中，**\n\n### $H_n = \\frac{n}{\\frac{1}{x_1} + \\frac{1}{x_2} + \\dots + \\frac{1}{x_n}}$ 为调和平均值(harmonic mean)，\n\n### $G_n = \\sqrt[n]{x_1 x_2 \\dots x_n}$ 为几何平均值(geometric mean)，\n\n### $A_n = \\frac{x_1 + x_2 + \\dots + x_n}{n}$ 为算数平均值(arithmetic mean)，\n\n### $Q_n = \\sqrt{\\frac{x_1^2 + x_2^2 + \\dots + x_n^2}{n}}$ 为平方平均值(quadratic mean)。\n\n### 基本形式\n**型Ⅰ：和与积**\n$a+b$与$ab$，$a^2+b^2$与$ab$\n\n**型Ⅱ：$a^2+b^2$与$a+b$**\n利用完全平方 $\\to$ 型Ⅰ\n\n**型Ⅲ：分式与整式的互求**\n\n### eg1：$\\forall x,y \\in \\mathbb{R}^+$ \n### (1) $\\frac{2}{x} + \\frac{1}{y} = 5$，求 $(xy)_{\\min}$\n### (2) $x + 4y = xy - 5$，求 $(xy)_{\\min}$ (3) $x + 4y = xy - 5$，求 $(x+y)_{\\min}$\n\n**解(1)**\n$$\\frac{2}{x} + \\frac{1}{y} \\geq 2\\sqrt{\\frac{2}{xy}},\\ xy \\geq \\frac{8}{25}$$\n\n**解(2)**\n$$x + 4y \\geq 4\\sqrt{xy}$$\n$$xy - 5 \\geq 4\\sqrt{xy}$$\n设 $\\sqrt{xy} = t > 0$\n$$t^2 - 4t - 5 \\geq 0$$\n$$t \\geq 5$$\n$$xy \\geq 25$$\n\n**解(3)（<span class=\"text-red-600\">通法：代入消元</span>）**\n$$x = \\frac{4y + 5}{y - 1} > 0,\\ y > 1$$\n$$x + y = \\frac{4y + 5}{y - 1} + y = y - 1 + \\frac{9}{y - 1} + 5 \\geq 11$$\n当且仅当 $y=4$ 时，等号成立\n\n\n### eg2：$x,y \\in \\mathbb{R}^+$ \n### (1) $x + y = 3$，求 $(\\sqrt{x} + \\sqrt{y})_{\\max}$ \n### (2) $4x^2 + 9y^2 - 6 = 9xy$，求 $(2x + 3y)_{\\max}$\n\n**解(1)**\n$$(\\sqrt{x} + \\sqrt{y})^2 = x + y + 2\\sqrt{xy} = 3 + \\sqrt{xy} \\leq 6$$\n$$(\\sqrt{x} + \\sqrt{y})_{\\max} = \\sqrt{6}$$\n\n**解(2)**\n$$(2x + 3y)^2 = 4x^2 + 9y^2 + 12xy = 21xy + 6$$\n$\\because 4x^2 + 9y^2 \\geq 12xy$\n$\\therefore (2x + 3y)^2 \\leq 48$\n$$9xy + 6 \\geq 12xy \\implies xy \\leq 2$$\n$$(2x + 3y)_{\\max} = 4\\sqrt{3}$$\n\n\n### eg4：$x,y \\in \\mathbb{R}^+$\n### (1) $2x + 3y = 2$，求 $\\left(\\frac{1}{x} + \\frac{1}{y}\\right)_{\\min}$\n### (2) $x > -\\frac{1}{3},\\ y > -2,\\ 2x + 3y = 2$，求 $\\left(\\frac{1}{3x+1} + \\frac{2}{y+2}\\right)_{\\min}$\n### (3) $2x + 3y = 2xy$，求 $(x+y)_{\\min}$\n### (4) $2x + 3y = 2xy - 1$，求 $(x+y)_{\\min}$\n### (5) $2x + 3y = 2xy - 1$，求 $(xy)_{\\min}$\n### (6) $2x + 3y = 2xy - 1$，求 $(4x^2 + 9y^2)_{\\min}$\n\n**解(1)（Ⅲ）**\n\n**解(2)**\n设 $\\begin{cases} 3x+1 = m \\\\ y+2 = n \\end{cases} \\implies \\begin{cases} x = \\frac{m-1}{3} \\\\ y = n-2 \\end{cases}$\n$$\\frac{2}{3}(m-1) + 3(n-2) = 2$$\n$$2m + 9n = 26$$\n$$(2m + 9n)\\left(\\frac{1}{m} + \\frac{2}{n}\\right) = 20 + \\frac{9n}{m} + \\frac{4m}{n} \\geq 32$$\n$$\\therefore \\left(\\frac{1}{m} + \\frac{2}{n}\\right)_{\\min} = \\frac{16}{13}$$\n\n**解(3)（取倒）**\n\n**解(4)（代入消元）**\n\n**解(5)（Ⅰ）**\n\n**解(6)（Ⅱ）**\n\n\n\n### eg5：$a,b \\in \\mathbb{R},\\ a+b=4$，则 $\\frac{1}{a^2+1} + \\frac{1}{b^2+1}$ 的最大值\n$$\\frac{1}{a^2+1} + \\frac{1}{b^2+1} = \\frac{a^2+b^2+2}{a^2b^2 + a^2 + b^2 + 1} = \\frac{16 - 2ab + 2}{17 - 2ab + (ab)^2} \\quad (\\text{法Ⅱ})$$\n$$= \\frac{18 - 2t}{t^2 - 2t + 17} \\quad (t=ab)$$\n\n\n\n### eg6：设 $a+b=2,\\ b>0$，当 $a=$____ 时，$\\frac{1}{2|a|} + \\frac{|a|}{b}$ 取得最小值\n$a<0$：\n$$\\frac{1}{2|a|} + \\frac{|a|}{b} = \\frac{a+b}{4|a|} + \\frac{|a|}{b} = \\frac{a}{4|a|} + \\frac{b}{4|a|} + \\frac{|a|}{b}$$\n$$\\geq -\\frac{1}{4} + 2\\sqrt{\\frac{1}{4}} = -\\frac{1}{4} + 1 = \\frac{3}{4}$$\n当且仅当 $-2a = b$ 时等号成立，$a=-2$\n\n\n\n### eg7：正实数 $x,y,z$ 满足 $x^2 - 3xy + 4y^2 - z = 0$，则当 $\\frac{xy}{z}$ 取得最大值时，$\\frac{2}{x} + \\frac{1}{y} - \\frac{2}{z}$ 的最大值为____\n$$z = x^2 - 3xy + 4y^2$$\n$$\\frac{xy}{z} = \\frac{xy}{x^2 - 3xy + 4y^2} = \\frac{1}{\\frac{x}{y} + \\frac{4y}{x} - 3} \\leq \\frac{1}{2\\sqrt{\\frac{x}{y} \\cdot \\frac{4y}{x}} - 3} = 1$$\n此时 $x=2y$\n$\\therefore z = 2y^2$\n$$\\therefore \\frac{2}{x} + \\frac{1}{y} - \\frac{2}{z} = \\frac{2}{y} - \\frac{1}{y^2} \\leq 1$$\n此时 $y=1$，满足题意\n\n\n\n### eg8：$a,b>0,\\ a+b=5$，求 $\\sqrt{a+1} + \\sqrt{b+3}$ 的最大值\n<span class=\"text-red-600\">当 $a,b>0$ 时，有 $\\frac{a+b}{2} \\leq \\sqrt{\\frac{a^2+b^2}{2}}$</span>\n$$\\sqrt{a+1} + \\sqrt{b+3} \\leq \\sqrt{2[(a+1)+(b+3)]} = \\sqrt{2 \\times 9} = 3\\sqrt{2}$$\n\n\n\n### eg9：$x,y,z \\in \\mathbb{R}^+,\\ x+y+z=1$，求 $\\frac{1}{x} + \\frac{4}{y} + \\frac{9}{z}$ 的最小值（Ⅲ）\n$$\\frac{1}{x} + \\frac{4}{y} + \\frac{9}{z} = \\left(\\frac{1}{x} + \\frac{4}{y} + \\frac{9}{z}\\right)(x+y+z)$$\n$$= 14 + \\left(\\frac{y}{x} + \\frac{4x}{y}\\right) + \\left(\\frac{z}{x} + \\frac{9x}{z}\\right) + \\left(\\frac{4z}{y} + \\frac{9y}{z}\\right)$$\n$$\\geq 36$$\n取等时 $x=\\frac{1}{6},\\ y=\\frac{1}{3},\\ z=\\frac{1}{2}$\n\n\n\n### eg10：正实数 $m,n,\\ m+2n + \\frac{1}{2m} + \\frac{1}{n} = \\frac{9}{2}$，求 $m+2n$ 的最小值（Ⅱ）\n$$\\frac{9}{2} - (m+2n) = \\frac{1}{2m} + \\frac{1}{n}$$\n$$\\frac{9}{2}(m+2n) - (m+2n)^2 = \\left(\\frac{1}{2m} + \\frac{1}{n}\\right)(m+2n) = \\frac{5}{2} + \\frac{n}{m} + \\frac{m}{n} \\geq \\frac{9}{2}$$\n令 $t = m+2n$\n$$\\frac{9}{2}t - t^2 \\geq \\frac{9}{2}$$\n$$\\frac{3}{2} \\leq t \\leq 3$$\n## **核心：构造有最值的关于所求的函数**\n\n\n\n**Ⅳ. 比例配凑**\n### eg1：$x + 2y + \\sqrt{xy} = 2$，求 $(x+3y)_{\\min}$\n$$2 = x + 2y + \\sqrt{xy} = x + 2y + \\sqrt{kx \\cdot \\frac{y}{k}} \\leq \\frac{k+2}{2}x + \\frac{1+4k}{2k}y$$\n令 $\\frac{k+2}{2} = \\frac{1}{3} \\implies k = \\frac{1}{3}$\n$$\\therefore \\frac{7}{6}x + \\frac{21}{6}y \\geq 2 \\implies x+3y \\geq \\frac{12}{7}$$\n\n### eg2：$a^2 + b^2 + c^2 = 10$，求 $(ab + bc + 2ac)_{\\max}$\n$a,b,c$ 地位完全等价，所以各取 $\\frac{1}{2}b^2$ 配凑\n$$10 = a^2 + b^2 + c^2 \\geq \\frac{1}{2}b^2 + xa^2 + (1-x)a^2 + yc^2 + (1-y)c^2 + \\frac{1}{2}b^2$$\n$$\\geq \\sqrt{2x}ab + \\sqrt{2y}bc + 2\\sqrt{(1-x)(1-y)}ac$$\n令 $\\sqrt{2x} = \\sqrt{2y} = \\sqrt{(1-x)(1-y)}$\n$$x = y = 2 - \\sqrt{3}$$\n$$\\therefore 10 = a^2 + b^2 + c^2 \\geq (\\sqrt{3}-1)(ab + bc + 2ac)$$\n$$ab + bc + 2ac \\leq 5\\sqrt{3} + 5$$\n## **核心：配凑后使用均值后能于原式其它项合并成所求**\n\n\n# 二、柯西不等式\n#### $$(a^2 + b^2)(c^2 + d^2) \\geq (ac + bd)^2$$\n#### 当且仅当 $\\frac{a}{c} = \\frac{b}{d}$ 取等\n拓展形式：设 $n \\ge 2$ 是正整数且\n$x_1, x_2, \\dots, x_n, y_1, y_2, \\dots, y_n \\in \\mathbb{R}$，则有：\n\n$$\\left( \\sum_{i=1}^{n} x_i^2 \\right) \\left( \\sum_{i=1}^{n} y_i^2 \\right) \\ge \\left( \\sum_{i=1}^{n} x_i y_i \\right)^2$$\n\n当且仅当 $\\frac{x_1}{y_1} = \\frac{x_2}{y_2} = \\dots = \\frac{x_n}{y_n}$ 时取到等号.\n\n### eg1：$x,y,z>0,\\ x+2y+2z=6$，求 $(x^2+y^2+z^2)_{\\min}$\n$$(x^2 + y^2 + z^2)(1^2 + 2^2 + 2^2) \\geq (x + 2y + 2z)^2$$\n$$x^2 + y^2 + z^2 \\geq 4$$\n\n### eg2：$x+y=1$，求 $(2x^2 + 3y^2)_{\\min}$\n$$2x^2 + 3y^2 = \\frac{6}{5}\\left[(\\sqrt{5}x)^2 + (\\sqrt{\\frac{5}{3}} \\cdot \\sqrt{3}y)^2\\right] \\cdot \\left[\\left(\\frac{1}{\\sqrt{5}}\\right)^2 + \\left(\\sqrt{\\frac{3}{5}}\\right)^2\\right] \\geq \\frac{6}{5}(x+y)^2 = \\frac{6}{5}$$\n## **核心：二次式 ≥ 一次式**\n\n\n\n# 三、权方和不等式（赫尔德不等式）\n#### $$\\frac{x_1^2}{y_1} + \\frac{x_2^2}{y_2} \\geq \\frac{(x_1 + x_2)^2}{y_1 + y_2}$$\n#### 当且仅当 $\\frac{x_1}{y_1} = \\frac{x_2}{y_2}$ 取等\n拓展形式：赫尔德(Hölder)不等式  若 $a_i, b_i \\in \\mathbb{R}_+$\n$(i=1,2,\\cdots,n), p>0, p \\neq 1, \\frac{1}{p} + \\frac{1}{q} = 1$, 则\n\n$$\\sum_{i=1}^{n} a_i b_i \\le \\left( \\sum_{i=1}^{n} a_i^p \\right)^{\\frac{1}{p}} \\left( \\sum_{i=1}^{n} b_i^q \\right)^{\\frac{1}{q}} \\ (p>1); \\ \\ ①$$\n\n$$\\sum_{i=1}^{n} a_i b_i \\ge \\left( \\sum_{i=1}^{n} a_i^p \\right)^{\\frac{1}{p}} \\left( \\sum_{i=1}^{n} b_i^q \\right)^{\\frac{1}{q}} \\ (0<p<1). \\ \\ ②$$\n\n当且仅当 $\\frac{a_1^p}{b_1^q} = \\frac{a_2^p}{b_2^q} = \\cdots = \\frac{a_n^p}{b_n^q}$ 时, 以上两式\n等号成立.\n\n### eg1：$9x^2 + 4y^2 + 6xy = 1$，求 $(9x + 6y)_{\\max}$\n$$1 = (3x + y)^2 + 3y^2 = \\frac{(3x + y)^2}{1} + \\frac{y^2}{\\frac{1}{3}} \\geq \\frac{(3x + 2y)^2}{\\frac{4}{3}}$$\n$$3x + 2y \\leq \\frac{2\\sqrt{3}}{3}$$\n\n### eg2：$a,b>0,\\ a+b=3$，求 $\\left(\\frac{a^5 + b^5}{ab}\\right)_{\\min}$\n$$\\frac{a^5 + b^5}{ab} = \\frac{a^4}{b} + \\frac{b^4}{a} \\geq \\frac{(a^2 + b^2)^2}{a + b} \\geq \\frac{\\left(\\frac{(a+b)^2}{2}\\right)^2}{a + b} = \\frac{27}{4}$$\n\n\n\n# 四、三角换元与辅助角\n### eg1（二元齐次型）\n$4x^2y^2 + x^2 + 9xy + 4y^2 = 1$，求 $\\left(\\sqrt{2}(x+2y) + 2xy\\right)_{\\max}$\n$$(x + 2y)^2 + (2xy)^2 = 32$$\n令 $x + 2y = 4\\sqrt{2}\\cos\\alpha$，$2xy = 4\\sqrt{2}\\sin\\alpha$\n\n### eg2（双根号型）（注：可用权方和）\n求 $y = 3\\sqrt{x-1} + \\sqrt{8-2x}$ 最大值\n$x \\in (1,4)$，则 $0 \\leq \\frac{\\sqrt{x-1}}{\\sqrt{3}} \\leq 1$\n令 $\\sin\\alpha = \\frac{\\sqrt{x-1}}{\\sqrt{3}}$\n$$x = 3\\sin^2\\alpha + 1,\\ \\alpha \\in \\left(0,\\frac{\\pi}{2}\\right)$$\n$$y = 3\\sqrt{3}\\sin\\alpha + \\sqrt{6}\\cos\\alpha \\leq \\sqrt{33}$$\n\n### eg3（辅助角）\n$\\sin x + \\cos y + \\sin(x+y) = 2$，求 $(\\sin x)_{\\min}$\n$$\\sin x + \\cos y + \\sin x \\cos y + \\cos x \\sin y = 2$$\n把 $\\sin y,\\ \\cos y$ 当作主元\n$$2 - \\sin x = (\\sin x + 1)\\cos y + (\\cos x)\\sin y \\leq \\sqrt{(1+\\sin x)^2 + \\cos^2 x} \\quad (\\text{消}y)$$\n又 $\\sin^2 x + \\cos^2 x = 1$\n得 $(2 - \\sin x)^2 \\leq 2 + 2\\sin x$\n\n\n# 五、判别式法（有限制）\n### eg1：$a^2 + b^2 = 1$，求 $(a+2b)_{\\max}$\n令 $a + 2b = t \\implies a = t - 2b$\n$$5b^2 - 4tb + t^2 - 1 = 0$$\n$\\Delta \\geq 0 \\implies t \\leq \\sqrt{5}$\n$$(a+2b)_{\\max} = \\sqrt{5}$$\n\n### eg2：$a^2 + b^2 - ab = 1$，求 $(a^2 + ab)$ 范围\n$$\\frac{a^2 + b^2 - ab}{a^2 + ab} = \\frac{1}{t}$$\n令 $\\frac{b}{a} = m$\n$$\\frac{1 + m^2 - m}{1 + m} = \\frac{1}{t}$$\n## **核心：通过换元转化为二次方程**"
          }
        ]
      }
    ]
  },
  {
    "id": "hs-adv-function",
    "title": "函数",
    "description": "函数性质、图像变换、三次函数等综合内容",
    "icon": "f(x)",
    "subTopics": [
      {
        "id": "sub-1773724529582",
        "title": "函数",
        "blocks": [
          {
            "id": "block-1773724530252",
            "type": "text",
            "content": "# 函数\n## 一、图像变换\n注：<span class=\"text-red-600\">只针对 $x$！</span>\n- $y = \\lg|ax+b|$，对称轴：$x = -\\frac{b}{a} \\implies y = f(|ax+b|)$\n- $y = \\lg(|a|x|+b|)$，偶函数 $\\implies y = f(a|x|+b)$\n\n\n\n## 二、求定义域\n$f[g(x)]$ 与 $f[h(x)]$ 关系：$g(x)$ 与 $h(x)$ 值域相同\n\n\n## 三、求解析式\n1.  代入法\n2.  换元法\n3.  待定系数法\n4.  赋值法\n\n\n## 四、求值域\n1.  图像法\n2.  换元法\n3.  利用单调性/性质\n4.  导数法\n\n\n## 五、单调性判定\n1.  **定义法** —— 用于<span class=\"text-red-600\">证明抽象函数</span>\n\n- **eg**：定义在 $[-2024,2024]$ 的 $f(x)$ 满足 $\\forall x_1,x_2 \\in [-2024,2024]$，$f(x_1+x_2) = f(x_1)+f(x_2)-2024$，且当 $x>0$ 时，$f(x)>2024$，判断单调性。\n\n- 解：$\\forall x_1,x_2 \\in [-2024,2024]$，$\\Delta x = x_2 - x_1 > 0$\n    $\\therefore \\Delta y = f(x_2) - f(x_1) = f(x_2 - x_1) - 2024 > 0$\n    $\\therefore f(x)$ 在 $[-2024,2024]$ 上递增\n\n2.  图像法\n\n3.  性质法\n\n4.  换元法（同增异减）\n\n5.  导数法\n\n\n## 六、奇偶性\n### (一) 判定：定义法\n注：<span class=\"text-red-600\">先求定义域！！</span>\n\n### (二) 性质\n| $f(x)$ | $g(x)$ | $f(x) \\pm g(x)$ | $f(x) \\cdot g(x)$ 或 $f(x)/g(x)$ | $f[g(x)]$ |\n\n\n\n|    奇      | 奇      | 奇          | 偶                        | 奇         |\n\n|    偶      | 偶      | 偶              | 偶                                 | 偶         |\n\n| 奇      | 偶      |  ❌     | 奇                                 | 偶         |\n\n| 偶      | 奇      | ❌     | 奇                                 | 偶         |\n\n### (三) 应用\n1.  求参数\n\n2.  求解析式\n\n3.  解不等式\n\n- (1) $f(x)$ 偶，且在 $(0,+\\infty)$ 上递增：\n      $f(a) > f(b) \\iff \\begin{cases} |a| > |b| \\\\ a \\in D \\\\ b \\in D \\end{cases}$\n\n      $f(x)$ 关于 $x=m$ 对称，且在 $(m,+\\infty)$ 上递增：\n      $f(a) > f(b) \\iff \\begin{cases} |a-m| > |b-m| \\\\ a \\in D \\\\ b \\in D \\end{cases}$\n\n- (2) $f(x)$ 奇\n      ① 在 $D$ 上递增：$f(a) > f(b) \\iff \\begin{cases} a > b \\\\ a \\in D \\\\ b \\in D \\end{cases}$\n\n      ② 不在 $D$ 上递增（结合图像分析）\n\n$f(x)$ 关于 $(m,n)$ 对称：$f(a)+f(b) > 2n \\iff \\begin{cases} a+b > 2m \\\\ a \\in D \\\\ b \\in D \\end{cases}$\n\n\n## 七、对称性和周期性\n### (一) 定义：$f(X) = f(Y)$\n- 若 $X-Y = C$（常数），则 $f(x)$ 有周期性\n- 若 $X+Y = C$（常数），则 $f(x)$ 有对称性\n\n1.  $f(x+a) = f(x+b) \\implies T = |a-b|$\n\n2.  $f(x+a) + f(x+b) = C \\implies T = 2|a-b|$\n\n3.  $f(x+a) \\cdot f(x+b) = C \\implies T = 2|a-b|$\n\n4.  $f(x+a) = f(b-x) \\implies f(x)$ 关于 $x = \\frac{a+b}{2}$ 对称\n\n5.  $f(x+a) + f(b-x) = C \\implies$ 关于 $\\left(\\frac{a+b}{2},\\frac{C}{2}\\right)$ 对称\n\n### (二) $f[g(x)]$\n1.  $f(ax+b)$ 偶 $\\implies f(x)$ 关于 $x = b$ 对称\n\n    $f(ax+b)$ 关于 $x=m$ 对称 $\\implies f(x)$ 关于 $x = am+b$ 对称\n\n2.  $f(ax+b)$ 奇 $\\implies f(x)$ 关于 $(b,0)$ 对称\n\n    $f(ax+b)$ 关于 $(m,n)$ 对称 $\\implies f(x)$ 关于 $(am+b,n)$ 对称\n\n    注：$f(x)$ 奇 $\\implies f(ax+b) = -f(-ax-b)$\n\n3.  $f(ax+b)$ 周期为 $T \\implies f(x)$ 周期为 $|aT|$\n\n### (三) 对称性与周期性结合\n1.  $f(x)$ 关于 $x=a,\\ x=b$ 对称 $\\implies T = 2|b-a|$\n    证明：$f(2a-x) = f(2b-x)$\n\n2.  $f(x)$ 关于 $(a,0),\\ (b,0)$ 对称 $\\implies T = 2|b-a|$\n\n3.  $f(x)$ 关于 $x=a,\\ (b,0)$ 对称 $\\implies T = 4|b-a|$\n\n4.  $f(x)$ 周期为 $T$，关于 $(b,0)$ 对称\n    (1) $f(x) = f(x+T) \\implies f(x)$ 关于 $\\left(b+\\frac{T}{2},0\\right)$ 对称\n    (2) $f(x) = -f\\left(x+\\frac{T}{2}\\right) \\implies f(x)$ 关于 $x = b+\\frac{T}{4}$ 对称\n\n5.  $f(x)$ 周期为 $T$，关于 $x=a$ 对称\n    (1) $f(x) = f(x+T) \\implies f(x)$ 关于 $x = a+\\frac{T}{2}$ 对称\n    (2) $f(x) = -f\\left(x+\\frac{T}{2}\\right) \\implies f(x)$ 关于 $\\left(a+\\frac{T}{4},0\\right)$ 对称\n\n### (四) 导函数\n- $f(x)$ 偶 $\\iff f'(x)$ 奇\n- $f(x)$ 关于 $x=a$ 对称 $\\implies f'(x)$ 关于 $(a,0)$ 对称\n- $f(x)$ 关于 $(a,b)$ 对称 $\\implies f'(x)$ 关于 $x=a$ 对称\n\n\n## 八、特殊函数性质\n$y = \\frac{1}{a^x + b}$，对称中心：$\\left(\\log_a|b|,\\ \\frac{1}{2b}\\right)$"
          }
        ]
      },
      {
        "id": "sub-1773734864428",
        "title": "三次函数",
        "blocks": [
          {
            "id": "block-1773734865546",
            "type": "text",
            "content": "# 三次函数\n\n## 1. 推导对称中心\n设三次函数：\n$$f(x) = ax^3 + bx^2 + cx + d$$\n设对称中心为 $(m,n)$，则满足：\n$$f(m+x) + f(m-x) = 2n$$\n代入展开：\n$$a(m+x)^3 + b(m+x)^2 + c(m+x) + d + a(m-x)^3 + b(m-x)^2 + c(m-x) + d = 2n$$\n整理得：\n$$(6am + 2b)x^2 + 2am^3 + 2bm^2 + 2cm + 2d = 2n$$\n令 $x^2$ 项系数为 $0$：\n$$6am + 2b = 0 \\implies \\boldsymbol{m = -\\frac{b}{3a}}$$\n\n\n## 2. 对称中心与极值点关系\n设对称中心横坐标为 $x_0$，两极值点为 $x_1, x_2$，则：\n$$\\frac{f(x_1) - f(x_2)}{x_1 - x_2} = \\frac{2}{3}f'(x_0) = -\\frac{a}{2}(x_1 - x_2)^2$$\n\n## 3. 与横截交点的斜率性质\n与横轴交点为 $P_1, P_2, P_3$，$P$ 是 $f(x)$ 上异于零点的一点，$f(x)$ 在 $P$ 处切线斜率为 $k_0$。\n记 $k_{PP_1}=k_1,\\ k_{PP_2}=k_2,\\ k_{PP_3}=k_3$，则：\n$$k_0 = k_1 + k_2 + k_3$$\n\n**推论**：若 $P$ 为平面内任一点 $(m,n)$，则：\n$$k_1 + k_2 + k_3 = \\frac{n f'(m)}{f(m)}$$\n\n**证明**：\n设 $f(x) = a(x-x_1)(x-x_2)(x-x_3)$，则\n$$k_i = \\frac{n}{m - x_i} = \\frac{n}{f(m)} \\cdot \\frac{f(m)}{m - x_i} = \\frac{n}{f(m)} \\cdot a(m-x_2)(m-x_3)$$\n又\n$$f'(x) = a\\left[(x-x_1)(x-x_2) + (x-x_2)(x-x_3) + (x-x_1)(x-x_3)\\right]$$\n\n\n## 4. 三点处切线斜率性质\n设三点处切线斜率为 $k_1, k_2, k_3$，则：\n① $\\frac{1}{k_1} + \\frac{1}{k_2} + \\frac{1}{k_3} = 0$\n② $\\frac{x_1}{k_1} + \\frac{x_2}{k_2} + \\frac{x_3}{k_3} = 0$\n\n对称中心处切线斜率为 $k_0$，则：\n$$k_1 + k_2 + k_3 = -3k_0$$\n\n\n## 5. 切线与割线的横坐标关系\n$f(x)$ 上一点 $P(x_0,y_0)$，过 $P$ 作 $f(x)$ 的切线于 $P_2(x_2,y_2)$；过 $P_1$ 作 $f(x)$ 的割线，交 $f(x)$ 于 $P_1(x_1,y_1), P_3(x_3,y_3)$，则：\n$$x_1 + x_3 = 2x_2$$\n\n**证明**：\n$$y_0 - y_2 = (3ax_2^2 + 2bx_2 + c)(x_0 - x_2)$$\n$$a(x_0^3 - x_2^3) + b(x_0^2 - x_2^2) + c(x_0 - x_2) = (3ax_2^2 + 2bx_2 + c)(x_0 - x_2)$$\n化简得：\n$$2ax_2^2 + bx_2 = a(x_0^2 + x_0x_2) + bx_0 \\implies x_0 + 2x_2 = -\\frac{b}{a}$$\n\n联立 $\\begin{cases} y = kx + m \\\\ y = ax^3 + bx^2 + cx + d \\end{cases}$，得：\n$$ax^3 + bx^2 + (c - k)x + d - m = 0$$\n由三次韦达定理得 $x_1 + x_3 + x_0 = -\\frac{b}{a}$，故：\n$$x_1 + x_3 = 2x_2$$\n\n\n## 三次韦达定理\n设 $f(x) = a(x-x_1)(x-x_2)(x-x_3) = ax^3 + bx^2 + cx + d$，则：\n## $$\n\\begin{cases}\nx_1 + x_2 + x_3 = -\\frac{b}{a} \\\\\nx_1x_2 + x_1x_3 + x_2x_3 = \\frac{c}{a} \\\\\nx_1x_2x_3 = -\\frac{d}{a}\n\\end{cases}\n$$"
          }
        ]
      }
    ]
  },
  {
    "id": "hs-adv-triangle",
    "title": "三角形专题",
    "description": "三角形五心、面积公式、向量性质等综合内容",
    "icon": "△",
    "subTopics": [
      {
        "id": "sub-1773737320143",
        "title": "三角形专题",
        "blocks": [
          {
            "id": "block-1773737321108",
            "type": "text",
            "content": "# 三角形专题\n\n## 1. 面积公式\n1) $S = \\frac{1}{2}ah$\n\n2) $S = \\frac{1}{2}ac\\sin B = \\frac{1}{2}bc\\sin A = \\frac{1}{2}ab\\sin C$\n\n3) $S = hl$（$l$ 为高所在边中位线）\n\n4) $S = \\sqrt{p(p-a)(p-b)(p-c)}$（海伦公式），其中 $p = \\frac{a+b+c}{2}$\n\n5) 秦九韶公式：$S = \\sqrt{\\frac{1}{4}\\left[c^2a^2 - \\left(\\frac{c^2+a^2-b^2}{2}\\right)^2\\right]}$\n\n6) $S = \\frac{abc}{4R}$，其中 $R$ 为外接圆半径\n\n7) $S = rp$，其中 $r$ 是内切圆半径，$p$ 是半周长\n\n8) 在平面直角坐标系内，$A(a,b)\\ B(c,d)\\ C(e,f)$ 构成三角形面积：\n   $S = \\pm\\frac{1}{2}\\begin{vmatrix}a&b&1\\\\c&d&1\\\\e&f&1\\end{vmatrix}$\n\n9) 正三角形：$S = \\frac{\\sqrt{3}}{4}a^2$\n\n10) $S = Rr(\\sin A + \\sin B + \\sin C)$，其中 $R$ 为外接圆半径，$r$ 为内切圆半径\n\n11) $S = r^2\\cot\\frac{A}{2}\\cot\\frac{B}{2}\\cot\\frac{C}{2}$\n\n12) $S = \\frac{1}{2}\\sqrt{(|\\vec{a}||\\vec{b}|)^2 - (\\vec{a}\\cdot\\vec{b})^2}$\n\n\n## 2. 性质（冷门）\n1) 三条中线平方和 $= \\frac{3}{4}$ 三边长平方和\n\n2) 斜三角形：$\\tan A\\tan B\\tan C = \\tan A + \\tan B + \\tan C$\n\n3) $\\left(\\tan\\frac{A}{2} + \\tan\\frac{B}{2}\\right)\\left(\\tan\\frac{A}{2} + \\tan\\frac{C}{2}\\right) = \\sec^2\\frac{A}{2}$\n\n\n## 3. 五心\n\n### 1) 重心\n\n<img src=\"/images/高中数学精编题库/解析几何/69baac2a6e878.webp\" alt=\"图片\" width=\"250\" class=\"rounded-lg my-4\" />\n\n\n① $AG:GD = 2:1$\n\n② $S_{\\triangle ABG} = S_{\\triangle BCG} = S_{\\triangle ACG}$\n\n③ $AG^2 + BG^2 + CG^2$ 最小\n\n④ $G\\left(\\frac{x_A+x_B+x_C}{3},\\ \\frac{y_A+y_B+y_C}{3}\\right)$\n\n⑤ 三角形内到三边距离最大\n\n⑥ $P$ 为三角形内任意一点：\n   $3PG^2 = (AP^2 + BP^2 + CP^2) - \\frac{1}{3}(AB^2 + BC^2 + CA^2)$\n\n⑦ 过 $G$ 直线交 $AB,AC$ 所在直线于 $P,Q$，则 $\\frac{AB}{AP} + \\frac{AC}{AQ} = 3$\n\n⑧ 从 $\\triangle ABC$ 三个顶点分别向以其对边为直径的圆作切线，所得 6 个切点为 $P_i$，则 $P_i$ 均在以 $G$ 为圆心，$r = \\frac{1}{18}(AB^2 + BC^2 + CA^2)$ 的圆周上\n\n⑨ $P$ 为三角形所在平面上任一点：\n   $PA^2 + PB^2 + PC^2 = GA^2 + GB^2 + GC^2 + 3PG^2$\n\n### 2) 垂心\n\n<img src=\"/images/高中数学精编题库/解析几何/69baac29dd643.webp\" alt=\"图片\" width=\"250\" class=\"rounded-lg my-4\" />\n\n\n① 锐角 $\\triangle$ 垂心在 $\\triangle$ 内，直角 $\\triangle$ 垂心在直角顶点上，钝角 $\\triangle$ 垂心在 $\\triangle$ 外\n\n② 三角形的垂心是它垂足三角形的内心；\n   三角形的内心是它旁心三角形的重心\n\n③ $H$ 关于三边对称点，均在 $\\triangle ABC$ 外接圆上\n\n④ 六组四点共圆，三组（每组四个）相似直角三角形，且 $AH\\cdot HD = BH\\cdot HE = CH\\cdot HF$\n\n⑤ $H,A,B,C$ 四点中任一点是其余三点为顶点的三角形的垂心，并称这样的四点为——垂心组\n\n⑥ $\\triangle ABC,\\triangle ABH,\\triangle BCH,\\triangle ACH$ 的外接圆是等圆\n\n⑦ 斜三角形中，过 $H$ 直线交 $AB,AC$ 所在直线于 $P,Q$，则\n   $\\frac{AB}{AP}\\cdot\\tan B + \\frac{AC}{AQ}\\cdot\\tan C = \\tan A + \\tan B + \\tan C$\n\n⑧ 设 $O,H$ 分别为 $\\triangle ABC$ 外心和垂心，\n   $\\angle BAO = \\angle HAC,\\ \\angle ABH = \\angle OBC,\\ \\angle BCO = \\angle HCA$\n\n⑨ 锐角 $\\triangle$：$AH + BH + CH = 2(R + r)$\n\n⑩ 锐角 $\\triangle$ 的内接三角形中，垂足三角形周长最短\n\n⑪ 西姆松定理（西姆松线）：从一点向三角形三边所引垂线的垂足共线的充要条件是该点落在三角形外接圆上\n\n⑫ 锐角 $\\triangle$ 内有一点 $P$，$P$ 为垂心 $\\iff PB\\cdot PC\\cdot BC + PB\\cdot PA\\cdot AB + PA\\cdot PC\\cdot AC = AB\\cdot BC\\cdot CA$\n\n⑬ 斜 $\\triangle$，$H_1,H_2,H_3$ 分别为 $\\triangle AEF,\\triangle BDF,\\triangle CDE$ 的垂心，则 $\\triangle DEF \\cong \\triangle H_1H_2H_3$\n\n⑭ $H$ 的垂足三角形的三边，分别平行于原三角形外接圆在各顶点的切线\n\n⑮ 三角形任一顶点到垂心的距离 $=$ 外心到对边距离的 2 倍（垂心伴随外接圆，必有 $\\parallel$）\n    推论（垂心弦径定理）：$\\frac{AH}{\\cos A} = \\frac{BH}{\\cos B} = \\frac{CH}{\\cos C} = 2R$\n\n- 向量\n  ① 设 $\\overrightarrow{OH} = \\vec{h},\\ \\overrightarrow{OA} = \\vec{a},\\ \\overrightarrow{OB} = \\vec{b},\\ \\overrightarrow{OC} = \\vec{c}$，\n     则 $\\vec{h} = \\frac{\\tan A\\vec{a} + \\tan B\\vec{b} + \\tan C\\vec{c}}{\\tan A + \\tan B + \\tan C}$\n\n  ② 设三顶点坐标 $(x_1,y_1),(x_2,y_2),(x_3,y_3)$，则垂心坐标：\n     $x = \\frac{\\Delta X}{2\\Delta},\\ y = \\frac{\\Delta Y}{2\\Delta}$\n\n     其中 $\\Delta = \\begin{vmatrix}x_2-x_1&x_3-x_2\\\\y_2-y_1&y_3-y_2\\end{vmatrix}$\n\n$\\Delta X = \\begin{vmatrix}(x_1+x_2)(x_2-x_1)+(y_1+y_2)(y_2-y_1)&y_2-y_1\\\\(x_1+x_3)(x_3-x_1)+(y_2+y_3)(y_3-y_2)&y_3-y_2\\end{vmatrix}$\n\n\n         $\\Delta Y = \\begin{vmatrix}x_3-x_2&(y_2+y_3)(y_3-y_2)\\\\x_2-x_1&(y_3+y_1)(y_3-y_1)+(x_2-x_1)(x_1-x_3)\\end{vmatrix}$\n\n\n  ③ $\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OB}\\cdot\\overrightarrow{OC} = \\overrightarrow{OC}\\cdot\\overrightarrow{OA}$，$O$ 为垂心\n\n\n### 3) 内心\n\n<img src=\"/images/高中数学精编题库/解析几何/69baac2a585e6.webp\" alt=\"图片\" width=\"250\" class=\"rounded-lg my-4\" />\n\n\n- 性质\n  三角形内切圆 $\\odot I(r),\\ p = \\frac{a+b+c}{2}$\n\n  ① $ID = IE = IF = r$\n\n  ② $\\angle BIC = 90^\\circ + \\frac{\\angle BAC}{2}$\n\n  ③ $Rt\\triangle ABC$ 中，$\\angle A = 90^\\circ$，则 $S_{\\triangle ABC} = BD\\cdot CD$\n\n  ④ $\\overrightarrow{OI} = \\frac{a\\overrightarrow{OA} + b\\overrightarrow{OB} + c\\overrightarrow{OC}}{a+b+c}$\n\n  ⑤ $I\\left(\\frac{ax_1+bx_2+cx_3}{a+b+c},\\ \\frac{ay_1+by_2+cy_3}{a+b+c}\\right)$，其中 $A(x_1,y_1),B(x_2,y_2),C(x_3,y_3)$\n\n  ⑥ 外心与内心距离为 $d$：$d^2 = R^2 - 2Rr$（欧拉定理）\n\n  ⑦ $r = \\frac{2S}{a+b+c}$\n\n  ⑧ 双曲线上任一支上一点与两焦点组成三角形，内心在实轴上的射影为对应支的顶点\n\n  ⑨ $AE = AF = \\frac{b+c-a}{2},\\ BD = BF = \\frac{a+c-b}{2},\\ CD = CE = \\frac{a+b-c}{2}$\n\n  ⑩ $r = \\frac{(b+c-a)\\tan\\frac{A}{2}}{2}$\n\n  ⑪ 三角形内角平分线定理：$\\angle A,\\angle B,\\angle C$ 的内角平分线分别交 $BC,AC,AB$ 于 $A',B',C'$，则\n      $\\frac{BA'}{CA'} = \\frac{BA}{CA},\\ \\frac{AB'}{CB'} = \\frac{AB}{CB},\\ \\frac{AC'}{BC'} = \\frac{AC}{BC}$\n\n\n### 4) 外心\n$\\triangle ABC$ 外接圆 $\\odot G(R)$\n\n① 锐 $\\triangle$ $G$ 在 $\\triangle$ 内，$Rt\\triangle$ $G$ 在斜边中点，钝 $\\triangle$ $G$ 在 $\\triangle$ 外，正 $\\triangle$ $G=I$\n\n② $\\angle BGC = 2\\angle A$\n\n③ $\\angle GAC + \\angle B = 90^\\circ$\n\n④ $\\overrightarrow{PG} = \\frac{(\\tan B+\\tan C)\\overrightarrow{PA} + (\\tan A+\\tan C)\\overrightarrow{PB} + (\\tan A+\\tan B)\\overrightarrow{PC}}{2(\\tan A + \\tan B + \\tan C)}$\n   $= \\frac{\\cos A}{2\\sin B\\sin C}\\overrightarrow{PA} + \\frac{\\cos B}{2\\sin C\\sin A}\\overrightarrow{PB} + \\frac{\\cos C}{2\\sin A\\sin B}\\overrightarrow{PC}$\n\n⑤ 三边垂直平分线交点\n\n⑥ $AG = BG = CG$\n\n⑦ $(\\overrightarrow{GA} + \\overrightarrow{GB})\\cdot\\overrightarrow{AB} = (\\overrightarrow{GB} + \\overrightarrow{GC})\\cdot\\overrightarrow{BC} = (\\overrightarrow{GC} + \\overrightarrow{GA})\\cdot\\overrightarrow{AC} = 0$\n\n⑧ $R = \\frac{a}{2\\sin A} = \\frac{b}{2\\sin B} = \\frac{c}{2\\sin C} = \\frac{abc}{4S_{\\triangle ABC}}$\n\n\n### 5) 旁心\n① 一内角平分线（所在直线）和其他两角外角平分线交点，每一个旁心到三边距离相等\n\n② 三角形三个旁心与内心构成一垂心组；\n   三角形一顶点与垂心是高的垂足三角形的旁心与内心\n\n③ $\\angle BI_AC = 90^\\circ - \\frac{1}{2}\\angle A,\\ \\angle BI_DC = \\angle BI_CC = \\frac{1}{2}\\angle A$\n\n④ $r_A = \\frac{2S_a}{-a+b+c} = 4R\\sin\\frac{A}{2}\\cdot\\cos\\frac{B}{2}\\cdot\\cos\\frac{C}{2} = r\\cdot\\cot\\frac{B}{2}\\cdot\\cot\\frac{C}{2}$\n   $r_B = \\frac{2S_a}{-b+a+c} = 4R\\sin\\frac{B}{2}\\cdot\\cos\\frac{A}{2}\\cdot\\cos\\frac{C}{2} = r\\cdot\\cot\\frac{A}{2}\\cdot\\cot\\frac{C}{2}$\n   $r_C = \\frac{2S_a}{-c+a+b} = 4R\\sin\\frac{C}{2}\\cdot\\cos\\frac{A}{2}\\cdot\\cos\\frac{B}{2} = r\\cdot\\cot\\frac{A}{2}\\cdot\\cot\\frac{B}{2}$\n\n⑤ $S_\\triangle = (p-a)r_A = (p-b)r_B = (p-c)r_C = \\frac{r_A r_B r_C}{\\sqrt{r_A r_B + r_B r_C + r_C r_A}}$\n   $\\frac{\\sqrt{3}r_A r_B r_C}{r_A + r_B + r_C} \\leq S \\leq \\frac{\\sqrt{3}}{3}(r_A r_B r_C)^{\\frac{1}{3}}$\n\n⑥ $I_B I_C = a\\cdot\\csc\\frac{A}{2},\\ I_A I_C = b\\cdot\\csc\\frac{B}{2},\\ I_A I_B = c\\cdot\\csc\\frac{C}{2}$\n   $II_A = a\\cdot\\sec\\frac{A}{2},\\ II_B = b\\cdot\\sec\\frac{B}{2},\\ II_C = c\\cdot\\sec\\frac{C}{2}$\n\n⑦ 设 $\\odot I_A,\\odot I_B,\\odot I_C$ 分别切 $\\triangle ABC$ 的边 $BC,CA,AB$ 于 $P,Q,R$，\n   $\\odot I$ 分别切 $BC,CA,AB$ 于 $K,S,T$，则\n   $BP = AQ = CK = p-c,\\ PC = AR = BK = p-b,\\ BR = CQ = AT = p-a$\n\n⑧ 设 $AI_A$ 连线交 $\\triangle ABC$ 外接圆于 $D$，则 $DI_A = DB = DC$\n\n⑨ $\\angle I_B I_A I_C = \\frac{1}{2}(\\angle B + \\angle C)$\n   $\\angle I_A I_B I_C = \\frac{1}{2}(\\angle A + \\angle C)$\n   $\\angle I_A I_C I_B = \\frac{1}{2}(\\angle B + \\angle A)$\n\n⑩ 一旁心与三角形三顶点连线所成 3 个三角形面积之比等于 $\\triangle$ 三边长之比，\n    三旁心与三角形一边端点连线所成三角形面积之比等于三旁切圆半径之比\n\n⑪ 过 $I_A$ 直线交 $AB,AC$ 所在直线于 $P,Q$，则\n    $\\frac{AB}{AP}\\cdot\\sin\\angle B + \\frac{AC}{AQ}\\cdot\\sin C = -\\sin A + \\sin B + \\sin C$\n\n⑫ $\\odot I$ 分别切 $BC,CA,AB$ 于 $D,E,F$，直线 $AI$ 交 $\\odot I$ 于 $P,Q$，则 $P,Q$ 分别为 $\\triangle AEF$ 的内心与旁心\n\n\n## 4. 五心向量形式充要条件\n\n### 1) 重心\n1) $\\overrightarrow{OA} + \\overrightarrow{OB} + \\overrightarrow{OC} = \\vec{0}$\n\n2) $S_{\\triangle OAB} = S_{\\triangle OAC} = S_{\\triangle OBC} = \\frac{1}{3}S_{\\triangle ABC}$\n\n3) 若 $\\overrightarrow{OP} = \\overrightarrow{OA} + \\lambda(\\overrightarrow{AB} + \\overrightarrow{AC})$，$P$ 轨迹过 $\\triangle ABC$ 重心\n\n4) 若 $\\overrightarrow{OP} = \\overrightarrow{OA} + \\lambda\\left(\\overrightarrow{AB} + \\frac{1}{2}\\overrightarrow{BC}\\right)$，$P$ 轨迹过 $\\triangle ABC$ 重心\n\n5) 若 $\\overrightarrow{OP} = \\overrightarrow{OA} + \\lambda\\left(\\frac{\\overrightarrow{AB}}{|\\overrightarrow{AB}|\\sin B} + \\frac{\\overrightarrow{AC}}{|\\overrightarrow{AC}|\\sin C}\\right)$，$P$ 轨迹过 $\\triangle ABC$ 重心\n\n\n### 2) 垂心\n① $\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OB}\\cdot\\overrightarrow{OC} = \\overrightarrow{OC}\\cdot\\overrightarrow{OA}$\n\n② $|\\overrightarrow{OA}|^2 + |\\overrightarrow{BC}|^2 = |\\overrightarrow{OB}|^2 + |\\overrightarrow{AC}|^2 = |\\overrightarrow{OC}|^2 + |\\overrightarrow{AB}|^2$\n\n③ 若 $\\overrightarrow{OP} = \\overrightarrow{OA} + \\lambda\\left(\\frac{\\overrightarrow{AB}}{|\\overrightarrow{AB}|\\cos B} + \\frac{\\overrightarrow{AC}}{|\\overrightarrow{AC}|\\cos C}\\right)$，$P$ 轨迹过 $\\triangle ABC$ 垂心\n\n\n### 3) 内心\n1) 若 $\\overrightarrow{OP} = \\overrightarrow{OA} + \\lambda\\left(\\frac{\\overrightarrow{AB}}{|\\overrightarrow{AB}|} + \\frac{\\overrightarrow{AC}}{|\\overrightarrow{AC}|}\\right)$，$P$ 轨迹过 $\\triangle ABC$ 内心\n\n2) 若 $\\overrightarrow{OP} = \\overrightarrow{OA} + \\lambda\\left(\\frac{\\overrightarrow{AB}}{\\sin C} + \\frac{\\overrightarrow{AC}}{\\sin B}\\right)$，$P$ 轨迹过 $\\triangle ABC$ 内心\n\n3) $a\\cdot\\overrightarrow{OA} + b\\cdot\\overrightarrow{OB} + c\\cdot\\overrightarrow{OC} = 0$\n\n\n### 4) 外心\n1) $|\\overrightarrow{OA}| = |\\overrightarrow{OB}| = |\\overrightarrow{OC}|$\n\n2) $(\\overrightarrow{OA} + \\overrightarrow{OB})\\cdot\\overrightarrow{AB} = (\\overrightarrow{OB} + \\overrightarrow{OC})\\cdot\\overrightarrow{BC} = (\\overrightarrow{OC} + \\overrightarrow{OA})\\cdot\\overrightarrow{CA} = 0$\n\n3) 若 $\\overrightarrow{OP} = \\frac{\\overrightarrow{OB} + \\overrightarrow{OC}}{2} + \\lambda\\left(\\frac{\\overrightarrow{AB}}{|\\overrightarrow{AB}|\\cos B} + \\frac{\\overrightarrow{AC}}{|\\overrightarrow{AC}|\\cos C}\\right)$，$P$ 轨迹过 $\\triangle ABC$ 外心\n\n4) $D,E,F$ 分别为边 $AB,AC,BC$ 中点\n\n\n### 5) 旁心\n1) 若 $\\overrightarrow{OP} = \\overrightarrow{OA} + \\lambda\\left(\\frac{\\overrightarrow{AB}}{|\\overrightarrow{AB}|} - \\frac{\\overrightarrow{AC}}{|\\overrightarrow{AC}|}\\right)$，$P$ 轨迹过 $\\triangle ABC$ 旁心\n\n\n## 5. 向量点积\n① $\\overrightarrow{AO}\\cdot\\overrightarrow{AB} = \\frac{1}{2}AB^2$\n   $\\overrightarrow{AG}\\cdot\\overrightarrow{AC} = \\frac{1}{2}AC^2$\n   $\\overrightarrow{AG}\\cdot\\overrightarrow{BC} = \\frac{1}{2}BC^2$\n\n② $\\overrightarrow{AO}\\cdot\\overrightarrow{AP} = \\frac{1}{4}(AB^2 + AC^2)$\n   $\\overrightarrow{BO}\\cdot\\overrightarrow{BE} = \\frac{1}{4}(BA^2 + BC^2)$\n   $\\overrightarrow{CO}\\cdot\\overrightarrow{CF} = \\frac{1}{4}(CA^2 + CB^2)$\n\n③ $\\overrightarrow{AB}\\cdot\\overrightarrow{BC} = \\frac{1}{2}(AC^2 - AB^2)$\n   $\\overrightarrow{BO}\\cdot\\overrightarrow{AC} = \\frac{1}{2}(BC^2 - BA^2)$\n   $\\overrightarrow{CO}\\cdot\\overrightarrow{AB} = \\frac{1}{2}(CB^2 - CA^2)$\n\n\n## 6. 面积比\n1) 重心：$S_{\\triangle OBC}:S_{\\triangle OAC}:S_{\\triangle OAB} = 1:1:1$\n\n2) 内心：$S_{\\triangle OBC}:S_{\\triangle OAC}:S_{\\triangle OAB} = a:b:c$<span class=\"text-red-600\">（证：底×高）</span>\n\n3) 外心：$S_{\\triangle OBC}:S_{\\triangle OAC}:S_{\\triangle OAB} = \\sin 2A:\\sin 2B:\\sin 2C$<span class=\"text-red-600\">（证：S=2Rsin2A）</span>\n\n4) 垂心：$S_{\\triangle OBC}:S_{\\triangle OAC}:S_{\\triangle OAB} = \\tan A:\\tan B:\\tan C$<span class=\"text-red-600\">（证：$\\frac{S_A}{S_B}=\\frac{BE}{AE}=\\frac{a\\cos{B}}{b\\cos{A}})$</span>\n\n<img src=\"/images/高中数学精编题库/解析几何/69baaeda8d087.webp\" alt=\"图片\" width=\"250\" class=\"rounded-lg my-4\" />\n\n\n\n## 7. 心之间关系\n1) 外心与重心：$\\overrightarrow{OG} = \\frac{1}{3}(\\overrightarrow{OA} + \\overrightarrow{OB} + \\overrightarrow{OC})$\n\n2) 外心与垂心：$\\overrightarrow{OH} = \\overrightarrow{OA} + \\overrightarrow{OB} + \\overrightarrow{OC} = \\frac{1}{2}(\\overrightarrow{AH} + \\overrightarrow{BH} + \\overrightarrow{CH})$\n\n3) 外心、重心与垂心：$\\overrightarrow{OG} = \\frac{1}{2}\\overrightarrow{GH}$"
          }
        ]
      }
    ]
  },
  {
    "id": "hs-adv-analytic-geo",
    "title": "解析几何",
    "description": "圆锥曲线、直线与圆、参数方程等解析几何内容",
    "icon": "⌬",
    "subTopics": [
      {
        "id": "sub-1773738176248",
        "title": "点与直线",
        "blocks": [
          {
            "id": "block-1773738176919",
            "type": "text",
            "content": "# § 基本问题\n\n## 1. 两点距离\n- $|AB| = \\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$\n- $|OP| = \\sqrt{x^2+y^2}$\n\n## 2. 定比分点 分点坐标\n$\\left(\\frac{x_1+\\lambda x_2}{1+\\lambda},\\ \\frac{y_1+\\lambda y_2}{1+\\lambda}\\right) \\ (\\lambda \\neq -1)$\n\n中点坐标：$\\left(\\frac{x_1+x_2}{2},\\ \\frac{y_1+y_2}{2}\\right)$\n\n重心 $G(x,y)$ 坐标：\n$\\left(\\frac{x_1+x_2+x_3}{3},\\ \\frac{y_1+y_2+y_3}{3}\\right)$\n\n质心 $M$ 坐标：\n$\\left(\\frac{\\sum m_A x_A}{\\sum m_A},\\ \\frac{\\sum m_A y_A}{\\sum m_A}\\right)$\n\n重心 $N$ 坐标：\n$\\left(\\frac{m_B x_B + m_C x_C}{m_B + m_C},\\ \\frac{m_B y_B + m_C y_C}{m_B + m_C}\\right)$\n\n$\\frac{AF}{FB} = \\frac{m}{l},\\ \\frac{AE}{EC} = \\frac{n}{l}$，则 $BE$、$CF$ 交点为\n$\\left(\\frac{l x_A + m x_B + n x_C}{l+m+n},\\ \\frac{l y_A + m y_B + n y_C}{l+m+n}\\right)$\n\n\n## 3. 三角形面积\n$S_{\\triangle ABC} = \\frac{1}{2}\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix}$\n\n三点共线条件：\n$\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix} = 0$\n\n多边形面积\n$S = \\frac{1}{2}\\left(\\begin{vmatrix}x_1&y_1\\\\x_2&y_2\\end{vmatrix} + \\begin{vmatrix}x_2&y_2\\\\x_3&y_3\\end{vmatrix} + \\dots + \\begin{vmatrix}x_n&y_n\\\\x_1&y_1\\end{vmatrix}\\right)$\n\n# § 直线的方程\n## 1.斜率 \n$k = \\frac{y_2-y_1}{x_2-x_1}\\ (x_1 \\neq x_2)$\n\n## 2. 方程形式\n1) 点斜式：$y-y_0 = k(x-x_0)$\n\n2) 斜截式：$y = kx + b$\n\n3) 两点式：$\\frac{y-y_1}{x-x_1} = \\frac{y_2-y_1}{x_2-x_1}\\ (x_1 \\neq x_2)$\n   或 $x = x_1\\ (x_1 = x_2$ 时)\n\n4) 截距式：$\\frac{x}{a} + \\frac{y}{b} = 1$，$a,b$ 分别为直线在 $x$ 轴、$y$ 轴上的截距\n\n5) 一般式：$Ax + By + C = 0\\ (A,B$ 不同时为零)\n\n6) 法式\n   ① $x\\cos\\theta + y\\sin\\theta - p = 0$\n\n   ② $\\frac{Ax + By + C}{\\pm\\sqrt{A^2+B^2}} = 0$\n\n   (i) $C \\neq 0$ 时，取和 $C$ 异号的；\n\n   (ii) $C = 0, B \\neq 0$ 时，取和 $B$ 同号的；\n\n   (iii) $C = 0, B = 0$ 时，取和 $A$ 同号的。\n\n# § 点与直线\n## 1. 距离\n1) 离差：$\\delta = x_1\\cos\\theta + y_1\\sin\\theta - p$\n   $= \\frac{Ax_1 + By_1 + C}{\\pm\\sqrt{A^2+B^2}}$\n\n2) 距离：$d = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2+B^2}} = \\frac{|kx - y - (kx_0-y_0)|}{\\sqrt{1+k^2}}$\n\n## 2. 夹角\n1) 夹角公式：$\\tan\\theta = \\frac{k_2-k_1}{1+k_2k_1}$\n\n2) 平行：$k_1 = k_2$ 即 $\\frac{A_1}{B_1} = \\frac{A_2}{B_2}$\n\n3) 垂直：$k_2 = -\\frac{1}{k_1}$ 即 $A_1A_2 + B_1B_2 = 0$\n\n# § 对称问题\n## 1. 点关于点\n点 $(x_1,y_1)$ 关于点 $(x_0,y_0)$ 对称点坐标为\n$(2x_0-x_1,\\ 2y_0-y_1)$\n\n## 2. 点关于直线\n点 $(x_1,y_1)$ 关于直线 $Ax+By+C=0$ 对称点坐标为\n$\\left(\\frac{(B^2-A^2)x_1-2AB y_1-2AC}{A^2+B^2},\\ \\frac{(A^2-B^2)y_1-2AB x_1-2BC}{A^2+B^2}\\right)$\n\n## 3. 直线关于点\n直线 $Ax+By+C=0$ 关于点 $(x_0,y_0)$ 对称直线的方程为\n$Ax + By - 2Ax_0 - 2By_0 - C = 0$\n\n# § 直线系\n## 1. 直线系\n1) 中心直线系\n$A_1x+B_1y+C_1 + \\lambda(A_2x+B_2x+C_2) = 0$\n\n2) 平行直线系\n$Ax + By + C' = 0$\n\n## 2. 三直线共点的条件\n1) 两直线交点\n$\\left(\\frac{B_1C_2-B_2C_1}{A_1B_2-A_2B_1},\\ \\frac{C_1A_2-C_2A_1}{A_1B_2-A_2B_1}\\right)$\n\n条件\n$\\begin{vmatrix}A_1&B_1&C_1\\\\A_2&B_2&C_2\\\\A_3&B_3&C_3\\end{vmatrix} = 0$"
          }
        ]
      },
      {
        "id": "sub-1773738658791",
        "title": "圆",
        "blocks": [
          {
            "id": "block-1773738660113",
            "type": "text",
            "content": "# § 圆\n\n## 1. 圆的方程\n1) 圆的标准方程：$(x-a)^2 + (y-b)^2 = R^2$\n\n2) 圆的一般方程：$x^2 + y^2 + Dx + Ey + F = 0$\n- 特点：\n     (i) $x$ 和 $y$ 的二次方程\n\n     (ii) 两平方项的系数相同\n\n     (iii) 乘积项 $xy$ 的系数为零\n\n- 配方：$\\left(x+\\frac{D}{2}\\right)^2 + \\left(y+\\frac{E}{2}\\right)^2 = \\frac{D^2+E^2-4F}{4}$\n     (1) $D^2+E^2-4F > 0$，方程表示圆心为 $\\left(-\\frac{D}{2}, -\\frac{E}{2}\\right)$，半径为 $\\frac{1}{2}\\sqrt{D^2+E^2-4F}$ 的圆\n\n     (2) $D^2+E^2-4F = 0$，方程表示一点 $\\left(-\\frac{D}{2}, -\\frac{E}{2}\\right)$\n\n     (3) $D^2+E^2-4F < 0$，方程表示一个虚圆\n\n3) 直径式：$(x-x_1)(x-x_2) + (y-y_1)(y-y_2) = 0$\n\n## 2. 圆与直线的关系\n\n### (1) 与相切有关\nⅠ. 长度（设点心距 $d$，半径 $r$）\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa42892d41.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n① 切线长 $PM = \\sqrt{d^2 - r^2}$\n\n② 弦长 $MN = 2r\\sqrt{1-\\frac{r^2}{d^2}}$\n\n③ $S_{PMCN} = r\\sqrt{d^2 - r^2}$\n\n④ $\\cos\\angle MPN = 1 - \\frac{2r^2}{d^2}$\n\n⑤ $\\overrightarrow{PM} \\cdot \\overrightarrow{PN} = d^2 + \\frac{2r^4}{d^2} - 3r^2$\n\nⅡ. 方程与坐标\n\n① 已知点 $P(x_0,y_0)$，过 $P$ 直线切于 $\\odot$，求直线方程.\n\n    $\\begin{cases} y-y_0 = k(x-x_0) \\\\ d = r \\end{cases}$ 或 $\\begin{cases} x = x_0 \\\\ d = r \\end{cases}$\n\n② $l_{CM}, l_{CN} \\Rightarrow$ 先求切线 $\\Rightarrow k$、过点 $C$\n\n   $l_{CP} \\Rightarrow$ 过点 $P$、点 $C$\n\n③ $l_{MN}$：联立 $\\begin{cases} \\odot C \\quad ① \\\\ (x-x_P)(x-x_C)+(y-y_P)(y-y_C)=0 \\quad ② \\end{cases}$\n\n   $①-②$ 得 $l_{MN}$\n\n④ $M,N$ 坐标 $\\Rightarrow$ 联立\n\n⑤ 过圆上一点 $(x_0,y_0)$ 的切线方程：\n   $(x_0-a)(x-a) + (y_0-b)(y-b) = r^2$\n   （若圆为 $x^2+y^2=r^2$，则为 $x_0x + y_0y = r^2$）\n\n⑥ 点 $(x_0,y_0)$ 的切点弦所在直线方程：\n   $(x_0-a)(x-a) + (y_0-b)(y-b) = r^2$\n\n⑦切线方程为 $y-y_0 = k(x-x_0)$，圆的方程为 $(x-a)^2 + (y-b)^2 = R^2$\n\n   则：$k = \\frac{(a-x_0)(b-y_0) \\pm R\\sqrt{(a-x_0)^2+(b-y_0)^2-R^2}}{(a-x_0)^2-R^2}$\n\n### (2) 圆的第二定义 —— 阿氏圆\n设 $A(x_1,y_1),\\ B(x_2,y_2)$，$\\frac{|PA|}{|PB|} = k > 0$\n即 $\\sqrt{\\frac{(x-x_1)^2+(y-y_1)^2}{(x-x_2)^2+(y-y_2)^2}} = k$\n\n则 $P$ 点轨迹方程为：\n$x^2 + y^2 + \\frac{2(k^2x_2 - x_1)}{1-k^2}x + \\frac{2(k^2y_2 - y_1)}{1-k^2}y + \\frac{x_1^2 - k^2x_2^2 + y_1^2 - k^2y_2^2}{1-k^2} = 0$\n\n半径 $R = \\frac{k}{\\left|1-k^2\\right|}\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}$\n\n\n### (3) 与相交有关\n① 半径 $r$，线心距 $d_0$，圆上点到直线距离 $d$：\n\n   | 条件 | 交点个数 |\n\n   | $d_0 > r+d$ | $0$ |\n\n   | $d_0 = r+d$ | $1$ |\n\n   | $r-d < d_0 < r+d$ | $2$ |\n\n   | $d_0 = r-d$ | $3$ |\n\n   | $d_0 < r-d$ | $4$ |\n\n② 过 $\\odot C$ 内一点 $P$ 与 $\\odot C$ 交于 $A,B$ 两点：\n\n   (i) 弦 $|AB|_{\\max} = 2r$\n      弦 $|AB|_{\\min}$ 时，$AB \\perp CP$\n\n   (ii) $S_{\\triangle ACB\\max} = \\begin{cases} \\frac{L^2}{2}, & \\angle ACB_{\\min} \\leq 90^\\circ \\\\ \\frac{1}{2}r^2\\sin\\theta_{\\max}, & \\angle ACB_{\\min} > 90^\\circ \\end{cases}$\n\n\n### (4) 最值问题 —— 几何法\n已知圆的方程，求下列式子的范围：\n\n① $(x-a)^2 + (y-b)^2 \\Rightarrow$ 圆上一点到点 $(a,b)$ 距离的平方\n\n② $\\frac{y-b}{x-a} \\Rightarrow$ 圆上一点与点 $(a,b)$ 连线的斜率\n\n③ $Ax+By \\Rightarrow$ 设 $Ax+By = m$，该式表示过圆上一点的平行直线系，当直线与圆相切时（$d=r$），$m$ 有最值\n\n④ $|Ax+By+C| \\Rightarrow$ 表示圆上一点到直线 $Ax+By+C=0$ 距离的 $\\sqrt{A^2+B^2}$ 倍\n\n\n## 3. 圆与圆的位置关系\n(1) 两圆圆心距 $d$，半径分别为 $r_1,r_2$：\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa42892d41.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n- 外离：$d > r_1 + r_2$\n- 外切：$d = r_1 + r_2$\n- 相交：$|r_1 - r_2| < d < r_1 + r_2$\n- 内切：$d = |r_1 - r_2|$\n- 内含：$d < |r_1 - r_2|$\n\n(2) 求公切线方程：\n\n   ① 设直线方程\n\n   ② 利用直线到两圆心距离等于两圆半径"
          }
        ]
      },
      {
        "id": "sub-1773740426523",
        "title": "椭圆",
        "blocks": [
          {
            "id": "block-1773740427463",
            "type": "text",
            "content": "# 椭圆\n\n## 1. 定义与方程\n(1) 定义\n\n① 到两定点距离和为定值：$|PF_1| + |PF_2| = 2a$\n\n② 到定点距离与到定直线距离之比为定值：$\\frac{|PF_1|}{|x+\\frac{a}{c}|} = e = \\frac{|PF_2|}{|x-\\frac{a}{c}|}$\n\n③ 与两端点斜率之积为定值：$k_{PA} \\cdot k_{PB} = -\\frac{b^2}{a^2}$\n\n(2) 方程\n\n① 标准方程：$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\ (a>b>0)$\n\n② 一般方程：$mx^2 + ny^2 = 1\\ (m>0, n>0, m\\neq n)$\n\n③ 参数方程：$\\begin{cases} x = a\\cos\\theta \\\\ y = b\\sin\\theta \\end{cases}$\n\n④ 极坐标方程：$\\rho = \\frac{a(1-e^2)}{1-e\\cos\\theta}$\n\n## 2. 基本性质\n(1) 对称性：关于 $x$ 轴、$y$ 轴成轴对称，关于原点成中心对称\n\n(2) 顶点坐标：$A_1(-a,0)\\ A_2(a,0)\\ B_1(0,b)\\ B_2(0,-b)$\n\n   焦点坐标：$F_1(-c,0)\\ F_2(c,0)$\n\n(3) 范围：$x \\in [-a,a],\\ y \\in [-b,b]$\n\n(4) 离心率：\n$e = \\frac{c}{a} = \\sqrt{1-\\frac{b^2}{a^2}} = \\frac{|F_1F_2|}{|PF_1|+|PF_2|} = \\frac{\\sin\\angle F_1PF_2}{\\sin\\angle PF_1F_2 + \\sin\\angle PF_2F_1} \\in (0,1)$\n\n若椭圆上存在一点 $P$，使 $|PF_1| = \\lambda |PF_2|\\ (\\lambda>0, \\lambda\\neq 1)$，\n则 $e \\in \\left(\\frac{|\\lambda-1|}{\\lambda+1}, 1\\right)$\n\n(5) 通径：最短的焦点弦，$\\frac{2b^2}{a}$\n\n(6)焦点三角形\n\na. 边\n\n① $|PF_1| + |PF_2| = 2a$\n\n② 焦半径\n\n$P$ 为椭圆上一点.\n\n$|PF_1、_2| = a \\pm ex = a \\pm c\\cos\\theta = a \\pm \\sqrt{a^2 - \\frac{2b^2}{1+\\cos\\angle F_1PF_2}} \\in [a-c, a+c]$\n\n直线 $l$ 交椭圆于 $A,B$ 两点，$\\alpha$ 为倾斜角：\n\n$|AF_1| = \\frac{b^2}{a-c\\cos\\alpha},\\ |BF_1| = \\frac{b^2}{a+c\\cos\\alpha}$\n\n③ 焦点弦\n\n直线过焦点段椭圆于 $A,B$ 两点：\n\n$|AB| = \\begin{cases} \\frac{2ab^2}{a^2-c^2\\cos^2\\alpha} & (\\text{焦点在}x\\text{轴}) \\\\ \\frac{2ab^2}{a^2-c^2\\sin^2\\alpha} & (\\text{焦点在}y\\text{轴}) \\end{cases} \\in \\left[\\frac{2b^2}{a}, 2a\\right]$,\n\n$\\frac{1}{|AF_1|} + \\frac{1}{|BF_1|} = \\frac{2a}{b^2}$\n\n④ $|PF_1| \\cdot |PF_2| = a^2 - e^2x^2 = a^2 - c^2\\cos^2\\theta = \\frac{2b^2}{1+\\cos\\angle F_1PF_2} \\in [b^2, a^2]$\n\n⑤ $\\triangle F_1PF_2$ 周长 $= 2a+2c$\n\n$PF_1$ 与椭圆交于点 $Q$，$\\triangle PQF_2$ 周长 $= 4a$\n\n⑥ $|PO| = \\sqrt{x^2+y^2} = \\sqrt{a^2\\cos^2\\theta+b^2\\sin^2\\theta} = \\sqrt{a^2 - \\frac{c^2\\sin^2\\frac{\\angle F_1PF_2}{2}}{2}}\\in [b,a]$\n\n⑦ $\\triangle F_1PF_2$ 内切圆半径 $r = \\frac{c\\|y|}{a+c} = (a-c)\\tan\\frac{\\angle F_1PF_2}{2} \\in \\left(0, \\frac{bc}{a+c}\\right]$\n\n内心 $I$ 过 $x$ 轴于 $M$，$\\frac{|PF_1|}{|F_1|M} = \\frac{PF_2}{F_2M} = \\frac{PI}{IM} = \\frac{1}{e}$\n\n切点 $D,E$：$PD = PE = {a-c}$\n\n⑧ $\\angle F_1PF_2$ 的外接圆半径 $R = \\frac{c}{\\sin\\angle F_1PF_2} = \\frac{1}{2}\\left(\\frac{b^2}{|y|}+\\frac{|y|}{b^2}\\right) \\in \\left(0, \\frac{a^2}{2b}\\right]$\n\n$Rr= \\frac{a-c}{2\\cos^2\\angle F_1PF_2} = \\frac{c}{2(a+c)}\\left(b^2+\\frac{y^2}{b^2}\\right) \\in \\left(0, \\frac{|a^2c|}{2|a+c|}\\right]$\n\n### b. 角\n① $\\tan\\angle POX = \\frac{y}{x} = \\frac{b}{a}\\sqrt{\\frac{1}{x^2/a^2}-1} = \\frac{b}{a}\\tan\\theta$\n\n② $\\cos\\angle F_1PF_2 = \\frac{2b^2}{|PF_1||PF_2|}-1 = \\frac{2b^2}{a^2-e^2x^2}-1 \\in \\left[\\frac{2b^2}{a^2}-1, 1\\right] = [1-2e^2,1] $\n\n③ $\\tan\\angle A_1PA_2 = \\frac{2a}{(1-\\frac{a^2}{b^2})y} \\in (-\\infty, \\frac{2ab}{b^2-a^2}]$\n\n④ $\\cos\\angle PF_1F_2 / \\cos\\angle PF_2F_1 = \\frac{c\\pm x}{a\\pm ex}\\ (x=0 \\to \\pm a)$\n\n⑤ $\\tan\\angle PA_1B_1/ \\tan\\angle PA_2B_1= \\frac{y}{a\\pm x}$\n\n### c. 面积\n$S_{\\triangle F_1PF_2} = b^2\\tan\\frac{\\angle F_1PF_2}{2} = c|y_1| = \\frac{1}{2}|PF_1||PF_2|\\sin\\angle F_1PF_2 \\in (0, bc]\\ (x=0)$\n\n### d. 坐标与向量\n① $\\overrightarrow{PF_1} = [-x-c, -y]= [-a\\cos\\theta-c, -b\\sin\\theta],$\n $\\overrightarrow{PF_2} = [-x+c, -y]= [-a\\cos\\theta+c, -b\\sin\\theta]$\n\n② $\\overrightarrow{PF_1} \\cdot \\overrightarrow{PF_2} = e^2x^2+b^2-c^2 = c^2(\\cos^2\\theta-1)+b^2 = \\frac{2b^2}{1+\\cos\\frac{1}{\\angle F_1PF_2}}= (1-\\frac{1}{a^2})x^2+2b^2-a^2 \\in [b^2-c^2, b^2] $\n\n③ 焦点弦另一端点：$y_Q = y_0 \\frac{a-c\\cos\\angle PF_1F_2}{a+c\\cos\\angle PF_1F_2}$\n\n## 3. 位置关系\n(1) 与线位置关系\n\n$\\Delta < 0$，0 个交点\n\n$\\Delta = 0$，1 个交点\n\n$\\Delta > 0$，2 个交点\n\n(2) 切线及切点弦方程：$\\frac{x_0x}{a^2} + \\frac{y_0y}{b^2} = 1$\n\n(3) 中点弦公式及其推广\n\n① $AB$ 为椭圆不平行于对称轴的弦，$M$ 为 $AB$ 中点\n\n$k_{OM} \\cdot k_{AB} = -\\frac{b^2}{a^2}$\n\n② 曲线第三定义：过原点直线交椭圆于 $A,B$ 两点，$P$ 为椭圆上异于 $A,B$ 任一点\n\n$k_{PA} \\cdot k_{PB} = -\\frac{b^2}{a^2}$\n\n③ 相切公式\n\n以 $P(x_0,y_0)$ 为切点的切线斜率 $k = -\\frac{b^2}{a^2} \\cdot \\frac{x_0}{y_0}$\n\n(4) 蒙日圆\n\n过椭圆上两点 $A,B$ 作切线，如果切线垂直交于 $P$，则 $P$ 的轨迹方程\n\n$x^2 + y^2 = a^2 + b^2$"
          }
        ]
      },
      {
        "id": "sub-1773752440126",
        "title": "双曲线",
        "blocks": [
          {
            "id": "block-1773752440951",
            "type": "text",
            "content": "# 双曲线\n\n## 1. 定义与方程\n(1) 定义\n\n① 到两定点距离差的绝对值为定值\n\n$||PF_1| - |PF_2|| = 2a$\n\n$0 < 2a < 2c$，双曲线\n\n$2a = 2c$，两射线\n\n$2a > 2c$，不存在\n\n$a = 0$，$F_1F_2$ 中垂线\n\n② 到定点距离与到定直线距离比为定值：$\\frac{|PF_1|}{|x+\\frac{a}{c}|} = e = \\frac{|PF_2|}{|x-\\frac{a}{c}|}$\n\n③ 与两点连线斜率之积为定值：$k_{PA} \\cdot k_{PB} = \\frac{b^2}{a^2}$\n\n(2) 方程\n\n① 标准方程：$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\ (a>0, b>0)$\n\n② 一般形式：$mx^2 + ny^2 = 1\\ (mn<0)$\n\n③ 参数方程：$\\begin{cases} x = \\sec\\theta \\\\ y = \\tan\\theta \\end{cases}$\n\n④ 极坐标方程：$\\rho = \\frac{b^2}{a - e\\cos\\theta}$\n\n## 2. 基本性质\n(1) 对称性：关于 $x$ 轴、$y$ 轴成轴对称，关于原点成中心对称\n\n(2) 顶点坐标：$A_1(-a,0)\\ A_2(a,0)$\n\n   焦点坐标：$F_1(-c,0)\\ F_2(c,0)$\n\n(3) 范围：$x \\in (-\\infty,-a] \\cup [a,+\\infty),\\ y \\in R$\n\n(4) 离心率：\n$e = \\frac{c}{a} = \\sqrt{1+\\frac{b^2}{a^2}} = \\frac{|F_1F_2|}{||PF_1|-|PF_2||} = \\frac{\\sin\\angle F_1PF_2}{|\\sin\\angle PF_1F_2 - \\sin\\angle PF_2F_1|} \\in (1,+\\infty)$\n\n若双曲线上存在一点 $P$ 使得 $|PF_1| = \\lambda |PF_2|\\ (\\lambda>0, \\lambda\\neq 1)$，\n则 $e \\in \\left(1, \\frac{|\\lambda+1|}{|\\lambda-1|}\\right]$\n\n(5) 通径：$\\frac{2b^2}{a}$\n\n(6) 准线：$x = \\pm\\frac{a^2}{c}$\n\n(7) 渐近线：$y = \\pm\\frac{b}{a}x$\n\n   同渐近线双曲线系：$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = \\lambda\\ (\\lambda \\neq 0)$\n\n(8) 等轴双曲线：$x^2 - y^2 = \\lambda\\ (\\lambda \\neq 0)$\n   $e = \\sqrt{2}$\n\n   渐近线：$y = \\pm x$\n\n(9) 长度\n\n① $||PF_1| - |PF_2|| = 2a$\n\n② 焦半径\n\n$|PF_1| = ex \\pm a,\\ |PF_2| = \\mp a - ex$\n\n$|AF_1| = \\frac{b^2}{a - c}$\n\n③ 焦点弦\n\n$|AB| = \\frac{2ab^2}{|a^2 - c^2\\cos^2\\theta|} \\in \\left[\\frac{2b^2}{a}, +\\infty\\right)$\n\n$AB$ 同支时，$\\frac{1}{|AF_1|} + \\frac{1}{|BF_1|} = \\frac{2a}{b^2}$\n\n$AB$ 异支时，$\\left|\\frac{1}{|AF_1|} - \\frac{1}{|BF_1|}\\right| = \\frac{2a}{b^2}$\n④ $|PF_1||PF_2| = e^2x^2 - a^2 = \\frac{2b^2}{1+\\cos\\angle F_1PF_2} \\in [b^2, +\\infty)$\n\n⑤ $PF_2$ 与双曲线交于另一点 $Q$，$|PQ| = m$，\n   $\\triangle PQF_2$ 周长为 $4a + 2m$\n\n⑥ $|PO| = \\sqrt{x^2+y^2} = \\sqrt{e^2x^2 - b^2} = \\sqrt{\\frac{c^2}{a^2}y^2 + a^2}$ \n\n⑦ $\\triangle F_1PF_2$ 内切圆半径 $r = \\frac{c-a}{\\tan\\frac{\\angle F_1PF_2}{2}}$\n   内心 $I$，$PI$ 交 $x$ 轴于 $M$，$\\frac{|PI|}{|IM|}  = \\frac{a}{x_m}$\n\n   圆心横坐标同为 $a$，在第四象限时焦点三角形内切圆半径 $r_2,r_1r_2 = (c-a)^2$\n\n   $I(\\pm a, r)$\n\n$\\angle IF_1F_2 = \\frac{\\pi}{2}$\n\n   过 $F_1$ 作垂线 $PM \\perp A$，$OA = a$\n\n(10) 角度\n\n① $\\cos\\angle F_1PF_2 = \\frac{a^2 - b^2}{e^2x^2 - a^2} + 1$\n\n## 3. 位置关系\n(1) 与线位置关系\n\n$\\Delta < 0, a \\neq 0$，相离\n\n$\\Delta = 0, a \\neq 0$，相切\n\n$\\begin{cases} a = 0，相交于1点（与渐近线平行） \\\\ \\Delta > 0, a \\neq 0, x_1+x_2 > 0, x_1x_2 > 0，与右支交于2点 \\\\ \\Delta > 0, a \\neq 0, x_1+x_2 < 0, x_1x_2 > 0，与左支交于2点 \\\\ \\Delta > 0, a \\neq 0, x_1x_2 < 0，与两支相交 \\end{cases}$\n\n(2) 点差法\n\n① $k_{OM} \\cdot k_{AB} = \\frac{b^2}{a^2}$，$M$ 为 $AB$ 中点\n\n② $k_{PA} \\cdot k_{PB} = \\frac{b^2}{a^2}$（曲线第三定义）\n\n③ $k_{OM} \\cdot k_{\\ell} = \\frac{b^2}{a^2}$，$\\ell$ 为 $M$ 点切线\n\n(3) 切线及切点弦方程：$\\frac{x_0x}{a^2} - \\frac{y_0y}{b^2} = 1\\ (a>0, b>0)$"
          }
        ]
      },
      {
        "id": "sub-1773752738217",
        "title": "抛物线",
        "blocks": [
          {
            "id": "block-1773752858697",
            "type": "text",
            "content": "# 抛物线\n\n## 1. 定义与方程\n(1) 定义：到定点距离与到定直线距离相等\n$|PA| = |PF|$\n- $F$ 在 $l$ 外，抛物线（其中 $PA \\perp l$，$A$ 为垂足）\n- $F$ 在 $l$ 上，直线\n\n(2) 标准方程：$y^2 = 2px\\ (p>0)$\n\n(3) 参数方程：\n$\\begin{cases}x = \\frac{1}{2}pt^2 \\\\y = pt\\end{cases}$\n\n(4) 极坐标方程：$\\rho = \\frac{p}{1-\\cos\\theta}$\n\n\n## 2. 基本性质\n(1) 对称性：$x$ 轴\n\n(2) 顶点：$(0,0)$，焦点坐标：$\\left(\\frac{p}{2},0\\right)$\n\n(3) 范围：$x \\in [0,+\\infty),\\ y \\in \\mathbb{R}$\n\n(4) 离心率：$e = 1$\n\n(5) 准线：$x = -\\frac{p}{2}$\n\n(6) 通径：$2p$\n\n(7) 特殊点 $\\left(\\frac{p}{2},0\\right)$：焦半径及焦点弦\n\n① 焦半径：\n\n- $|AF| = x_1 + \\frac{p}{2} = \\frac{p}{1-\\cos\\theta}$\n\n- $|BF| = x_2 + \\frac{p}{2} = \\frac{p}{1+\\cos\\theta}$\n\n- $\\frac{1}{|AF|} + \\frac{1}{|BF|} = \\frac{2}{p}$\n\n② 焦点弦：\n\n$|AB| = x_1 + x_2 + p = \\frac{2p}{\\sin^2\\theta} = 2p\\left(1+\\frac{1}{k^2}\\right)$\n\n③ $x_1x_2 = \\frac{p^2}{4},\\ y_1y_2 = -p^2,\\ \\overrightarrow{OA} \\cdot \\overrightarrow{OB} = -\\frac{3}{4}p^2$\n\n④ $S_{\\triangle AOB} = \\frac{p^2}{2\\sin\\theta}$\n\n⑤ $A, O, B_1$ 三点共线\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa42956aab.webp\" alt=\"图片\" width=\"450\" class=\"rounded-lg my-4\" />\n\n\n\n⑥\n(i) 以 $AB$ 为直径的圆与准线相切，切点为 $M(证：x_1+x_2+p=2(\\frac{x_1+x_2}{2}+\\frac{p}{2})$)\n\n(ii) 以 $A_1B_1$ 为直径的圆与 $AB$ 相切，切点为 $F$\n\n(iii) $M_1A, M_1B$ 与抛物线相切\n\n(iv) 以 $AF$ 为直径的圆与 $y$ 轴相切，切点为 $OP$ 中点\n\n(v) 以 $OP$ 为直径的圆与 $AF$ 相切\n\n⑦\n(i) $AM_1 \\perp BM_1$\n\n(ii) $A_1F \\perp B_1F$\n\n(iii) $M_1F \\perp AB$\n\n⑧ $\\angle ANF = \\angle BNF$\n\n(8) 特殊点 $(p,0)$\n\n设 $Q(x_0,0)$，$d$ 为 $Q$ 与抛物线上一点的距离\n\n$d_{\\min} =\\begin{cases}|OQ| = |x_0|, & x_0 \\leq p \\\\|PQ| = \\sqrt{p(2x_0-p)}, & x_0 > p\\end{cases}$，\n$P\\left(x_0-p, \\pm\\sqrt{2p(x_0-p)}\\right)$\n\n$d = \\sqrt{x^2 - 2(x_0-p)x + x_0^2}$\n\n(9) 特殊点 $(2p,0)$\n\n过 $(2p,0)$ 直线交抛物线于 $A,B$ 两点，则 $\\angle AOB = 90^\\circ$\n\n\n## 3. 位置关系\n(1) 切线及切点弦方程：$y_0y = p(x_0 + x)$\n\n(2) 中点弦公式\n\n① $y_M \\cdot k_{AB} = p$\n\n② 曲线第三定义：$y_M \\cdot k_\\ell = p$\n\n(3) $A,B$ 为切点弦两切点，$A(x_1,y_1), B(x_2,y_2)$，两切线交点 $P(x_0,y_0)$\n\n- $k_{AB} = \\frac{2p}{y_1+y_2} = \\frac{y_1-y_2}{x_1-x_2}$\n\n- $k_{QA} = \\frac{p}{y_1} = \\frac{y_1-y_0}{x_1-x_0}$\n\n- $k_{QB} = \\frac{p}{y_2} = \\frac{y_2-y_0}{x_2-x_0}$\n\n同构思想可得：\n\n① $y_1+y_2 = 2y_0,\\ y_1y_2 = 2px_0$\n\n② $AB$：$y_0y = p(x_0 + x)$"
          }
        ]
      },
      {
        "id": "sub-1773753541786",
        "title": "圆锥曲线统一性",
        "blocks": [
          {
            "id": "block-1773753543272",
            "type": "text",
            "content": "# 圆锥曲线统一性\n\n## 一、统一定义与方程\n一个定点（焦点）与一条定直线（准线）的距离之比为常数 $e$（离心率）的动点的轨迹.\n$\\frac{r}{d} = e$\n- 当 $0<e<1$ 时，曲线是椭圆\n- 当 $e=1$ 时，曲线是抛物线\n- 当 $e>1$ 时，曲线是双曲线\n\n## 二、一般二次方程\n1. 缺 $xy$ 项的二元二次方程\n\n$Ax^2 + Cy^2 + Dx + Ey + F = 0\\ (A,C$ 不同时为零$)$\n\n(1) 当 $AC \\neq 0$ 时，化简为：\n\n$Ax'^2 + Cy'^2 + F' = 0$\n\n其中 $x' = x + \\frac{D}{2A},\\ y' = y + \\frac{E}{2C},\\ F' = F - \\frac{D^2}{4A} - \\frac{E^2}{4C}$\n\n① $AC$ 同号 — 椭圆型方程\n$\\begin{cases} \\text{A、C符号与}F'\\text{相反：椭圆} \\\\ F' = 0：\\text{一个点} \\\\ \\text{A、C符号与}F'\\text{相同：没有轨迹} \\end{cases}$\n\n② $AC$ 异号 — 双曲线型方程\n$\\begin{cases} F' \\neq 0：\\text{双曲线} \\\\ F' = 0：\\text{两条相交直线} \\end{cases}$\n\n(2) $A$ 或 $C$ 等于零 — 抛物线型方程\n$\\begin{cases} E \\neq 0：\\text{抛物线} \\\\ E = 0：\\text{两条平行直线；两重合直线或没有轨迹} \\end{cases}$\n\n\n2. 一般二元二次方程\n\n(1) 坐标轴的旋转\n\n$\\begin{cases} x = x'\\cos\\theta - y'\\sin\\theta \\\\ y = x'\\sin\\theta + y'\\cos\\theta \\end{cases}$\n或\n$\\begin{cases} x' = x\\cos\\theta + y\\sin\\theta \\\\ y' = -x\\sin\\theta + y\\cos\\theta \\end{cases}$\n\n(2) 利用转轴消去 $xy$ 项\n\n$Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0\\ (B \\neq 0)$\n\n步骤：\n① 如果 $A=C$，取 $\\theta = \\frac{\\pi}{4}$\n\n如果 $A \\neq C$，取 $\\theta = \\frac{1}{2}\\text{arccot}\\frac{A-C}{B}$\n\n如果 $\\theta$ 不是特殊角，可由 $\\cot2\\theta = \\frac{A-C}{B}\\ (0<\\theta<\\frac{\\pi}{2})$\n\n和三角公式\n$\\cos2\\theta = \\frac{\\cot2\\theta}{\\sqrt{1+\\cot^22\\theta}}$\n$\\sin\\theta = \\sqrt{\\frac{1-\\cos2\\theta}{2}},\\ \\cos\\theta = \\sqrt{\\frac{1+\\cos2\\theta}{2}}$\n确定。\n\n② 将①中确定的 $\\theta$ 代入转轴公式。\n\n③ 将②中结果代入原方程，化简。\n\n(3) 一般二次方程的讨论\n\n$Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$\n\n经坐标轴旋转 $\\theta$ 后，可化成\n\n$A'x'^2 + B'x'y' + C'y'^2 + D'x' + E'y' + F = 0$\n\n其中\n\n$A' = A\\cos^2\\theta + B\\sin\\theta\\cos\\theta + C\\sin^2\\theta$\n\n$B' = -(A-C)\\sin2\\theta + B\\cos2\\theta$\n\n$C' = A\\sin^2\\theta - B\\sin\\theta\\cos\\theta + C\\cos^2\\theta$\n\n$B^2-4AC < 0$：椭圆型\n\n$B^2-4AC = 0$：抛物线型\n\n$B^2-4AC > 0$：双曲线型\n\n\n## 三、切线及切点弦\n曲线 $M: Ax^2 + By^2 + Cx + Dy + E = 0$\n\n直线 $\\ell: Ax_0x + By_0y + C\\frac{x_0+x}{2} + D\\frac{y_0+y}{2} + E = 0$\n\n- $P(x_0,y_0)$ 在曲线上，$\\ell$ 为 $M$ 的切线方程；\n- $P(x_0,y_0)$ 在曲线外，$\\ell$ 为 $M$ 的切点弦方程。\n经过曲线上一点P(x_0,y_0)的切线方程\n\n椭圆：$\\frac{x_0x}{a^2} + \\frac{y_0y}{b^2} = 1$\n\n双曲线：$\\frac{x_0x}{a^2} - \\frac{y_0y}{b^2} = 1$\n\n抛物线：$y_0y = p(x + x_0)$\n\n曲线在点 $P(x_0,y_0)$ 处的法线方程\n\n椭圆：$y - y_0 = \\frac{a^2y_0}{b^2x_0}(x - x_0)$\n\n双曲线：$y - y_0 = -\\frac{a^2y_0}{b^2x_0}(x - x_0)$\n\n抛物线：$y - y_0 = -\\frac{y_0}{p}(x - x_0)$\n\n斜率为 $m$ 且与曲线相切的切线方程\n\n椭圆：$y = mx \\pm \\sqrt{a^2m^2 + b^2}$\n\n双曲线：$y = mx \\pm \\sqrt{a^2m^2 - b^2}\\ (|m| \\geq \\frac{b}{a})$\n\n抛物线：$y = mx + \\frac{p}{2m}\\ (m \\neq 0)$\n"
          }
        ]
      },
      {
        "id": "sub-1773753954857",
        "title": "极点极线与射影几何",
        "blocks": [
          {
            "id": "block-1773753956725",
            "type": "text",
            "content": "\n\n### 1. 调和点列\n(1) 定义：对于线段 $AB$ 的内分点 $C$ 和外分点 $D$ 满足 $\\frac{AC}{CB} = \\frac{AD}{DB}$，则称 $(A,B;C,D)$ 是调和点列。\n\n(2) 基本性质：设 $M$ 为 $AB$ 中点\n\n① $\\frac{1}{AC} + \\frac{1}{AD} = \\frac{2}{AB}$\n\n② $AB \\cdot CD = 2AD \\cdot BC = 2AC \\cdot DB$\n\n③ $CA \\cdot CB = CM \\cdot CD$；类似地，$DA \\cdot DB = DM \\cdot DC$\n\n④ $MA^2 = MB^2 = MC \\cdot MD$（几何意义：$M$ 对两圆等幂）\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa5c00acfb.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n(3) 调和线束：若直线上四点 $A,B,C,D$ 满足 $(A,B;C,D)$ 为一组调和点列，\n直线外有一点 $P$，作直线 $PA,PB,PC,PD$，则称 $(PA,PB;PC,PD)$ 为一组调和线束。\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa7076eb40.webp\" alt=\"图片\" width=\"500\" class=\"rounded-lg my-4\" />\n\n\n\n性质：① $\\sin\\theta_{12}\\sin\\theta_{34} = \\sin\\theta_{23}\\sin\\theta_{14}$（$\\theta_{ij}$为$l_i$ 与 $l_j$ 夹角）\n\n推论：\n① 若 $l_2$ 斜率不存在，则 $k_1 + k_3 = 2k_4$\n\n② 若 $l_2$斜率为0 ，则 $\\frac{1}{k_1} + \\frac{1}{k_3} = \\frac{2}{k_4}$\n\n③ $\\begin{cases} (A,B;C,D)\\text{为调和点列} \\\\ PC \\perp PD \\\\ \\text{PC平分}\\angle APB \\\\ \\text{PD平分}\\angle APB\\text{的外角} \\end{cases}$\n\n④ 若直线 $l \\parallel PD$ 交直线 $PA,PB,PC$ 于点 $E,F,G$，则 $F$ 为 $EG$ 中点。\n\n模型：\n\n① 内切圆 \n\n$\\triangle ABC$ 的内切圆与三边分别切于 $D,E,F$，且 $EF$ 与 $BC$ 延长线交于 $G$，则 $B,D,C,G$为调和点列\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa5c117ed5.webp\" alt=\"图片\" width=\"200\" class=\"rounded-lg my-4\" />\n\n\n\n②极线\n\nPA、PB为圆的两条切线，过 $P$的割线交圆于 $C、D$，交AB于F，则 $P,C,F,D$ 为调和点列\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa5c0f28e1.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n③完全四边形\n\n在完全四边形ABCDMN中，(C,E,A,M)(D,F,B,M)(N,E,P,F)均为调和点列，$MN$ 为 $P$ 点的极线。\n\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa5c13ca6b.webp\" alt=\"图片\" width=\"400\" class=\"rounded-lg my-4\" />\n\n\n④角平分线\n\n同性质②\n### 2. 极点极线\n(1) 一般定义：不在二次曲线上的一点 $P$ 作直线 $l$ 交二次曲线于 $M,N$ 两点，在 $l$ 上有且仅有一点 $Q$，使得 $P,Q;M,N$ 构成一调和点列。当 $l$ 绕 $P$ 旋转时，$Q$ 的轨迹是一条直线 $p$，这条直线 $p$ 叫做 $P$ 关于二次曲线的极线，而 $P$ 叫做 $p$ 关于该曲线的极点。\n\n以椭圆为例，设 $P$ 在椭圆外。\n\n因为|MQ||NP|=|MP||NQ|\n\n所以设$\\frac{|MP|}{|NP|}=\\frac{|MQ|}{|NQ|}=\\lambda>0$\n\n设 $M(x_1,y_1),\\ N(x_2,y_2)$，则 $P\\left(\\frac{\\lambda x_2-x_1}{\\lambda-1},\\ \\frac{\\lambda y_2-y_1}{\\lambda-1}\\right),\\ Q\\left(\\frac{\\lambda x_2+x_1}{\\lambda+1},\\ \\frac{\\lambda y_2+y_1}{\\lambda+1}\\right)$\n\n经计算易知 $\\frac{x_0x_1}{a^2} + \\frac{y_0y_1}{b^2} = 1$\n\n所以当 $f$ 绕 $P$ 旋转时，$Q$ 的轨迹是 $\\frac{x_0x}{a^2} + \\frac{y_0y}{b^2} = 1$\n\n可知 $|MA||NP| = |MP||NQ|$ 与直线 $\\frac{x_0x}{a^2} + \\frac{y_0y}{b^2} = 1$ 互为等价关系。\n\n(2) 代数定义：对于不在二次曲线 $C: Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$ 上的一点 $P(x_0,y_0)$，则 $P$ 关于 $C$ 的极线方程为\n$Ax_0x + B（x_0y + xy_0）+ Cy_0y + D\\frac{x+x_0}{2} + E\\frac{y+y_0}{2} + F = 0$\n\n(3) 配极原则：对于同一条二次曲线 $C$，如果点 $P$ 的极线经过点 $Q$，那么点 $Q$ 的极线经过点 $P$。\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa4296b727.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa429d5365.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa5c118f94.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n\n### 3. 蝴蝶定理与坎迪定理\n(1) $AB$ 是圆的一条弦，过 $AB$ 中点 $C$ 引圆的另外两条弦 $DE$ 与 $FG$。$DG,FE$ 分别与 $AB$ 交于 $H,I$，则 $|HC| = |CI|$。\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa7070116b.webp\" alt=\"图片\" width=\"350\" class=\"rounded-lg my-4\" />\n\n\n\n(2) 直线 $l$ 交圆于 $A,B$ 两点，$C$ 为直线上一点，过 $C$ 引两条直线分别与圆相交于 $D,F$ 和 $E,G$，$DG$ 和 $EF$ 分别与 $l$ 相交于 $H,I$，则\n$\\frac{1}{|CA|} - \\frac{1}{|CH|} = \\frac{1}{|CB|} - \\frac{1}{|CI|}$\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa707a1687.webp\" alt=\"图片\" width=\"350\" class=\"rounded-lg my-4\" />\n\n\n\n### 4. 对合\n定义1（二次曲线上的对合）\n\n二次曲线 $\\Gamma$ 上的对合映射 $f: \\Gamma \\to \\Gamma, A \\mapsto A'$，存在 $P$，使得对任意 $A \\in \\Gamma$ 和 $A' = f(A)$ 有 $P \\in AA'$。$P$ 称为 $f$ 的对合中心；$P$ 关于 $\\Gamma$ 的极线称为 $f$ 的对合轴。\n\n易知 $f[f(A)] = A$。\n\n定理1：设 $f$ 是二次曲线上的对合，其对合轴为 $\\ell$，$A,B \\in \\Gamma$ 且 $A' = f(A),\\ B' = f(B)$，则 $AB \\cap A'B' \\in \\ell$。\n\n过椭圆 $\\Gamma$ 外一点 $P$ 引 $\\Gamma$ 的两条切线，切点分别为 $A$ 和 $B$，若以 $P$ 为对合中心的 $\\Gamma$ 上的对合为 $f$，发现 $f(A)=A,\\ f(B)=B$。有如下定义：\n\n定义2（对合的不动点）\n设 $f$ 是二次曲线 $\\Gamma$ 上的对合，$I \\in \\Gamma$，若 $f(I)=I$，则称 $I$ 为 $f$ 的不动点。\n\n定义3：有两个不动点的对合称为双曲型对合，没有不动点的对合称为椭圆型对合。\n\n定理2：设 $f$ 是二次曲线 $\\Gamma$ 上的双曲型对合，其中心为 $P$，不动点为 $A_1,B$，则 $A,B$ 确定的直线为 $P$ 关于 $\\Gamma$ 的极线，同时也是 $f$ 的对合轴。\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa706d952a.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n### 5. 二次调和点列\n关于圆锥曲线 $\\Gamma$，若 $l_1$ 过 $l_2$ 的极点，则 $l_2$ 过 $l_1$ 的极点，我们称 $l_1$ 和 $l_2$ 关于 $\\Gamma$ 调和共轭。\n\n定义4（二次调和点列）\n设 $l_1$ 和 $l_2$ 关于圆锥曲线 $\\Gamma$ 对称，$l_1$ 与 $\\Gamma$ 相交于 $A,B$ 两点，$l_2$ 与 $\\Gamma$ 相交于 $C,D$ 两点，则称 $(A,C;B,D)$ 为 $\\Gamma$ 上的调和点列。\n\n定理3：设 $(A,C;B,D)$ 为二次曲线 $\\Gamma$ 上的一组调和点列，$P$ 为二次曲线上任意一点，则 $(PA,PC;PB,PD)$ 为一簇调和线束。\n\n二次调和点列的生成：\n定理4：$f$ 为二次曲线 $\\Gamma$ 上的双曲型对合，其中心为 $P$，$G$ 和 $H$ 为 $f$ 的不动点。$A \\in \\Gamma,\\ f(A)=A'$，则 $(G,A;A',H)$ 为二次曲线上的一组调和点列。\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa70783c87.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n"
          }
        ]
      },
      {
        "id": "sub-1773755604394",
        "title": "齐次化",
        "blocks": [
          {
            "id": "block-1773755606969",
            "type": "text",
            "content": "## 齐次化\n A, B 是二次曲线上两点, $P(x_0, y_0)$ 在二次曲线上\n\n1. 若 $k_{PA} + k_{PB} = k_0,\\ k_0 \\neq 0$, 则直线 $AB$ 过定点\n\n   若 $k_{PA} + k_{PB} = k_0,\\ k_0 = 0$, 则直线 $AB$ 的斜率为定值\n\nⅡ. 若 $k_{PA} \\cdot k_{PB} = k_0$, 则直线 $AB$ 过定点或斜率为定值\n\n### 1. 椭圆\n设 $AB: m(x - x_0) + n(y - y_0) = 1$\n\n椭圆方程变形为\n$$\\frac{(x - x_0 + x_0)^2}{a^2} + \\frac{(y - y_0 + y_0)^2}{b^2} = 1$$\n即\n$$\\frac{(x - x_0)^2 + 2x_0(x - x_0)}{a^2} + \\frac{(y - y_0)^2 + 2y_0(y - y_0)}{b^2} = 0$$\n齐次化可得\n$$\\frac{(x - x_0)^2 + 2x_0(x - x_0)[m(x - x_0) + n(y - y_0)]}{a^2} + \\frac{(y - y_0)^2 + 2y_0(y - y_0)[m(x - x_0) + n(y - y_0)]}{b^2} = 0$$\n也即\n$$\\frac{1 + 2n y_0}{b^2}(y - y_0)^2 + \\left(\\frac{2x_0 n}{a^2} + \\frac{2y_0 m}{b^2}\\right)(x - x_0)(y - y_0) + \\frac{1 + 2m x_0}{a^2}(x - x_0)^2 = 0$$\n$$\\implies \\frac{1 + 2n y_0}{b^2}\\left(\\frac{y - y_0}{x - x_0}\\right)^2 + \\left(\\frac{2x_0 n}{a^2} + \\frac{2y_0 m}{b^2}\\right)\\frac{y - y_0}{x - x_0} + \\frac{1 + 2m x_0}{a^2} = 0$$\n\n$\\therefore k_{PA}, k_{PB}$ 为方程\n$$\\frac{1 + 2n y_0}{b^2}k^2 + \\left(\\frac{2x_0 n}{a^2} + \\frac{2y_0 m}{b^2}\\right)k + \\frac{1 + 2m x_0}{a^2} = 0$$\n的两根\n\n(1) 若 $k_{PA} + k_{PB} = k_0$ 为定值, 则\n$$\\frac{2x_0 n}{a^2} + \\frac{2y_0 m}{b^2} = -\\frac{1 + 2n y_0}{b^2} \\cdot k_0$$\n即\n$$m\\left(-\\frac{2y_0}{k_0}\\right) + n\\left(-\\frac{2b^2 x_0}{a^2 k_0} - 2y_0\\right) = 1$$\n$\\therefore$ 定点为 $\\left(x_0 - \\frac{2y_0}{k_0},\\ -y_0 - \\frac{2b^2 x_0}{a^2 k_0}\\right)$\n\n特别地, $k_0 = 0$ 时, $\\frac{2x_0 n}{a^2} + \\frac{2y_0 m}{b^2} = 0$, $k_{AB} = -\\frac{b^2 x_0}{a^2 y_0}$ 为定值\n\n(2) 若 $k_{PA} \\cdot k_{PB} = k_0$ 为定值, 则\n$$\\frac{1 + 2m x_0}{a^2} = \\frac{1 + 2n y_0}{b^2} \\cdot k_0$$\n即\n$$m \\cdot \\frac{2b^2 x_0}{a^2 k_0 - b^2} + n \\cdot \\frac{-2a^2 k_0 y_0}{a^2 k_0 - b^2} = 1$$\n$\\therefore$ 定点为 $\\left(\\frac{a^2 k_0 + b^2}{a^2 k_0 - b^2} x_0,\\ \\frac{-a^2 k_0 - b^2}{a^2 k_0 - b^2} y_0\\right)$\n\n特别地, $k_0 = \\frac{b^2}{a^2}$ 时, $m x_0 = n y_0$, $k_{AB} = -\\frac{y_0}{x_0}$ 为定值\n\n\n### 2. 双曲线\n设 $AB: m(x - x_0) + n(y - y_0) = 1$\n\n双曲线方程变形为\n$$\\frac{(x - x_0 + x_0)^2}{a^2} - \\frac{(y - y_0 + y_0)^2}{b^2} = 1$$\n即\n$$\\frac{(x - x_0)^2 + 2x_0(x - x_0)}{a^2} - \\frac{(y - y_0)^2 + 2y_0(y - y_0)}{b^2} = 0$$\n齐次化可得\n$$\\frac{(x - x_0)^2 + 2x_0(x - x_0)[m(x - x_0) + n(y - y_0)]}{a^2} - \\frac{(y - y_0)^2 + 2y_0(y - y_0)[m(x - x_0) + n(y - y_0)]}{b^2} = 0$$\n也即\n$$-\\frac{1 + 2n y_0}{b^2}(y - y_0)^2 + \\left(\\frac{2n x_0}{a^2} - \\frac{2m y_0}{b^2}\\right)(x - x_0)(y - y_0) + \\frac{1 + 2m x_0}{a^2}(x - x_0)^2 = 0$$\n$$\\implies -\\frac{1 + 2n y_0}{b^2}\\left(\\frac{y - y_0}{x - x_0}\\right)^2 + \\left(\\frac{2n x_0}{a^2} - \\frac{2m y_0}{b^2}\\right)\\frac{y - y_0}{x - x_0} + \\frac{1 + 2m x_0}{a^2} = 0$$\n\n$\\therefore k_{PA}, k_{PB}$ 为方程\n$$-\\frac{1 + 2n y_0}{b^2}k^2 + \\left(\\frac{2n x_0}{a^2} - \\frac{2m y_0}{b^2}\\right)k + \\frac{1 + 2m x_0}{a^2} = 0$$\n的两根\n\n(1) 若 $k_{PA} + k_{PB} = k_0$, 则\n$$\\frac{2n x_0}{a^2} - \\frac{2m y_0}{b^2} = \\frac{1 + 2n y_0}{b^2} \\cdot k_0$$\n即\n$$m\\left(-\\frac{2y_0}{k_0}\\right) + n\\left(\\frac{2x_0 b^2}{a^2 k_0} - 2y_0\\right) = 1$$\n$\\therefore$ 定点为 $\\left(x_0 - \\frac{2y_0}{k_0},\\ \\frac{2x_0 b^2}{a^2 k_0} - y_0\\right)$\n\n特别地, $k_0 = 0$ 时, $\\frac{2n x_0}{a^2} - \\frac{2m y_0}{b^2} = 0$, $k_{AB} = -\\frac{b^2 x_0}{a^2 y_0}$ 为定值\n\n(2) 若 $k_{PA} \\cdot k_{PB} = k_0$, 则\n$$\\frac{1 + 2m x_0}{a^2} = \\frac{1 + 2n y_0}{b^2}(-k_0)$$\n即\n$$m\\left(\\frac{-2b^2 x_0}{a^2 k_0 + b^2}\\right) + n\\left(\\frac{-2a^2 k_0 y_0}{a^2 k_0 + b^2}\\right) = 1$$\n$\\therefore$ 定点为 $\\left(\\frac{a^2 k_0 - b^2}{a^2 k_0 + b^2} x_0,\\ \\frac{b^2 - a^2 k_0}{b^2 + a^2 k_0} y_0\\right)$\n\n特别地, $k_0 = -\\frac{b^2}{a^2}$ 时, $m x_0 = n y_0$, $k_{AB} = -\\frac{y_0}{x_0}$ 为定值\n\n\n### 3. 抛物线\n设 $AB: m(x - x_0) + n(y - y_0) = 1$\n\n抛物线方程变形为 $(y - y_0 + y_0)^2 = 2p(x - x_0 + x_0)$\n即\n$$(y - y_0)^2 + 2y_0(y - y_0) = 2p(x - x_0)$$\n齐次化可得\n$$(y - y_0)^2 + 2y_0(y - y_0)[m(x - x_0) + n(y - y_0)] = 2p(x - x_0)[m(x - x_0) + n(y - y_0)]$$\n也即\n$$(1 + 2n y_0)(y - y_0)^2 + (2m y_0 - 2p n)(x - x_0)(y - y_0) - 2p m(x - x_0)^2 = 0$$\n$$\\implies (1 + 2n y_0)\\left(\\frac{y - y_0}{x - x_0}\\right)^2 + (2m y_0 - 2p n)\\frac{y - y_0}{x - x_0} - 2p m = 0$$\n\n$\\therefore k_{PA}, k_{PB}$ 为方程\n$$(1 + 2n y_0)k^2 + (2m y_0 - 2p n)k - 2p m = 0$$\n的两根\n\n(1) 若 $k_{PA} + k_{PB} = k_0$ 为定值, 则\n$$2m y_0 - 2p n = -(1 + 2n y_0) \\cdot k_0$$\n即\n$$p m\\left(-\\frac{2y_0}{k_0}\\right) + n\\left(\\frac{2p}{k_0} - 2y_0\\right) = 1$$\n$\\therefore$ 定点 $\\left(x_0 - \\frac{2y_0}{k_0},\\ \\frac{2p}{k_0} - y_0\\right)$\n\n特别地, $k_0 = 0$ 时, $2m y_0 - 2p n = 0$, $\\therefore k_{AB} = -\\frac{p}{y_0}$ 为定值\n\n(2) 若 $k_{PA} \\cdot k_{PB} = k_0$ 为定值, 则\n$$-2p m = (1 + 2n y_0)k_0$$\n即\n$$m\\left(-\\frac{2p}{k_0}\\right) + n(-2y_0) = 1$$\n$\\therefore$ 定点 $(x_0 - \\frac{2p}{k_0},\\ -y_0)$\n\n特别地, $k_0 = 0$ 时, $m = 0$, $\\therefore k_{AB} = 0$ 为定值\n\n\n### 4. 统一性质\n过圆锥曲线上一定点 $P$ 作圆锥曲线的两条弦 $PA, PB$. 如果 $PA, PB$ 斜率分别为 $k_1, k_2$, 且满足 $\\lambda(k_1 + k_2) + \\mu k_1 k_2$ 为定值, 则直线 $AB$ 过定点 (或斜率为定值)."
          }
        ]
      },
      {
        "id": "sub-1773755834730",
        "title": "点差法",
        "blocks": [
          {
            "id": "block-1773755835981",
            "type": "text",
            "content": "## 点差法\n### 原理：<span class=\"text-red-600\">点在二次曲线上</span>\n对二次曲线上两点 $A(x_1,y_1), B(x_2,y_2)$，以椭圆为例：\n$$\n\\begin{cases}\n\\frac{x_1^2}{a^2} + \\frac{y_1^2}{b^2} = 1 \\quad ① \\\\\n\\frac{x_2^2}{a^2} + \\frac{y_2^2}{b^2} = 1 \\quad ②\n\\end{cases}\n$$\n① - ② 得\n$$\n\\frac{y_1 - y_2}{x_1 - x_2} \\cdot \\frac{y_1 + y_2}{x_1 + x_2} = -\\frac{b^2}{a^2}\n$$\n\n\n\n#### (一) 斜率双用\n以椭圆为例，对曲线上两点则斜率有恒等变换：\n$$\n\\frac{y - y_0}{x - x_0} = \\frac{x + x_0}{-\\frac{a^2}{b^2}(y + y_0)} \\quad (\\text{基本条件})\n$$\n再根据题中关于斜率的关系联立之，具体应用如下：\n\n#### 1. 斜率之积或之和为定值 ⇒ 过定点\n**例1：** 已知椭圆上一定点 $P(x_0,y_0)$，$A,B$ 在椭圆上，$k_{AP} \\cdot k_{BP} = \\lambda$，求证：直线 $AB$ 过定点。\n\n设 $A(x_1,y_1), B(x_2,y_2)$，\n$$\nk_{AP} \\cdot k_{BP} = \\frac{y_1 - y_0}{x_1 - x_0} \\cdot \\frac{y_2 - y_0}{x_2 - x_0} = \\frac{y_1 - y_0}{x_1 - x_0} \\cdot \\frac{x_2 + x_0}{-\\frac{a^2}{b^2}(y_2 + y_0)} = \\lambda\n$$\n整理得\n$$\nx_2 y_1 + x_0 y_1 - y_0 x_2 + \\lambda \\frac{a^2}{b^2}(x_1 y_2 + y_0 x_1 - x_0 y_2 - x_0 y_0) = 0 \\quad ①\n$$\n同理得\n$$\nx_1 y_2 + x_0 y_2 - y_0 x_1 + \\lambda \\frac{a^2}{b^2}(x_2 y_1 + y_0 x_2 - x_0 y_1 - x_0 y_0) = 0 \\quad ②\n$$\n① - ② 得\n$$\nt(x_1 y_2 - x_2 y_1) + y_0(x_1 - x_2) + x_0(y_1 - y_2) = 0\n$$\n其中 $t = \\frac{\\lambda \\frac{a^2}{b^2} - 1}{\\lambda \\frac{a^2}{b^2} + 1}$\n\n直线 $AB$：\n$$\ny = \\frac{y_1 - y_2}{x_1 - x_2}(x - x_1) + y_1 = \\frac{y_1 - y_2}{x_1 - x_2} x + \\frac{x_1 y_2 - x_2 y_1}{x_1 - x_2}\n= \\frac{y_1 - y_2}{x_1 - x_2}\\left(x - \\frac{x_0}{t}\\right) - \\frac{y_0}{t}\n$$\n$\\therefore$ 恒过定点 $\\left(\\frac{x_0}{t},\\ -\\frac{y_0}{t}\\right)$\n\n**例2：** 椭圆 $C: \\frac{x^2}{4} + \\frac{y^2}{3} = 1$，$E\\left(1,\\frac{3}{2}\\right)$，$k_{PE} + k_{QE} = 0$，其中 $P,Q$ 在椭圆上，求证直线 $PQ$ 斜率为定值。\n\n证：$E$ 在 $C$ 上，设 $P(x_1,y_1), Q(x_2,y_2)$，\n$$\n\\frac{y_1 - \\frac{3}{2}}{x_1 - 1} + \\frac{y_2 - \\frac{3}{2}}{x_2 - 1} = 0\n$$\n代入椭圆点差变换 $\\frac{y - \\frac{3}{2}}{x - 1} = -\\frac{x + 1}{-\\frac{4}{3}\\left(y + \\frac{3}{2}\\right)}$，整理得\n$$\n\\frac{4}{3} y_1 y_2 + 2 y_1 - 2 y_2 - 2 - x_1 x_2 + x_2 - x_1 = 0 \\quad ①\n$$\n同理\n$$\n\\frac{4}{3} y_1 y_2 + 2 y_2 - 2 y_1 - 2 - x_1 x_2 + x_1 - x_2 = 0 \\quad ②\n$$\n① - ② 得 $4(y_1 - y_2) + 2(x_2 - x_1) = 0$，$\\therefore k = \\frac{1}{2}$\n\n---\n\n#### 2. 两直线中点连线过定点\n**例3：** 双曲线 $C: \\frac{x^2}{3} - \\frac{y^2}{2} = 1$，$F_1$ 为左焦点，过 $F_1$ 分别作两条斜率存在且互相垂直的直线 $l_1,l_2$，$l_1$ 与双曲线左支交于 $A,B$ 两点，$l_2$ 与双曲线左右两支分别交于 $E,F$ 两点，$AB,EF$ 中点分别为 $M,N$，求证 $MN$ 恒过定点。\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa811c6d28.webp\" alt=\"图片\" width=\"400\" class=\"rounded-lg my-4\" />\n\n\n\n设 $A(m_1,n_1), B(m_2,n_2), M(x_1,y_1), N(x_2,y_2)$，\n$$\n\\begin{cases}\n\\frac{m_1^2}{3} - \\frac{n_1^2}{2} = 1 \\\\\n\\frac{m_2^2}{3} - \\frac{n_2^2}{2} = 1\n\\end{cases}\n$$\n两式相减得\n$$\n\\frac{n_1 - n_2}{m_1 - m_2} \\cdot \\frac{n_1 + n_2}{m_1 + m_2} = \\frac{2}{3}\n$$\n即\n$$\n\\frac{y_1}{x_1 + \\sqrt{5}} \\cdot \\frac{y_1}{x_1} = \\frac{2}{3}\n$$\n同理\n$$\n\\frac{y_2}{x_2 + \\sqrt{5}} \\cdot \\frac{y_2}{x_2} = \\frac{2}{3}\n$$\n$\\because k_{l_1} \\cdot k_{l_2} = -1$，$\\therefore \\frac{y_1}{x_1 + \\sqrt{5}} \\cdot \\frac{y_2}{x_2 + \\sqrt{5}} = -1$，即\n$$\n2x_1 y_2 + 3x_2 y_1 + 3\\sqrt{5} y_1 = 0\n$$\n同理\n$$\n2x_2 y_1 + 3x_1 y_2 + 3\\sqrt{5} y_2 = 0\n$$\n两式相减得到\n$$\nx_1 y_2 - x_2 y_1 = 3\\sqrt{5}(y_1 - y_2)\n$$\n直线 $MN$：\n$$\ny = \\frac{y_1 - y_2}{x_1 - x_2}(x - x_1) + y_1 = \\frac{y_1 - y_2}{x_1 - x_2} x + \\frac{x_1 y_2 - x_2 y_1}{x_1 - x_2}\n= \\frac{y_1 - y_2}{x_1 - x_2}(x + 3\\sqrt{5})\n$$\n$\\therefore$ 过定点 $(-3\\sqrt{5},0)$\n\n\n#### (二) 轴点差与非轴点差（合比）\n适用条件：① 三点共线 ② 点在二次曲线上 ③ 斜率等量关系\n\n**例4：** 椭圆 $\\frac{x^2}{4} + \\frac{y^2}{3} = 1$，求 $k_{AP} + k_{BP} = 0$ 的 $P$ 点\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa8116faa5.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n设 $A(x_1,y_1), B(x_2,y_2)$\n$$\n\\frac{y_1}{y_2} = \\frac{x_1 - 4}{x_2 - 4}\n$$\n$$\n\\frac{y_1^2}{y_2^2} = \\frac{x_1^2 - 4}{x_2^2 - 4} = \\frac{x_1^2 - 2x_1 + 1}{x_2^2 - 2x_2 + 1} = \\frac{4(x_1^2 - 2x_1 + 1) - 3(x_1^2 - 4)}{4(x_2^2 - 2x_2 + 1) - 3(x_2^2 - 4)} = \\left(\\frac{x_1 - 4}{x_2 - 4}\\right)^2\n$$\n$\\frac{y_1}{y_2} \\cdot \\frac{x_1 - 4}{x_2 - 4} < 0 \\implies \\frac{y_1}{y_2} = \\frac{4 - x_1}{x_2 - 4}$，即\n$$\n\\frac{y_1}{x_1 - 4} + \\frac{y_2}{x_2 - 4} = 0\n$$\n$\\therefore P(4,0)$\n\n#### 对比韦达：\n\n$设 AB: x = my + 1$\n\n联立 $x = my + 1$ 与 $3x^2 + 4y^2 - 12 = 0$：\n$$\n(3m^2 + 4)y^2 + 6my - 9 = 0 \\implies y_1 + y_2 = \\frac{-6m}{3m^2 + 4},\\ y_1 y_2 = \\frac{-9}{3m^2 + 4}\n$$\n由 $\\frac{y_1}{x_1 - x_P} + \\frac{y_2}{x_2 - x_P} = 0$，即\n$$\n\\frac{y_1}{m y_1 + 1 - x_P} + \\frac{y_2}{m y_2 + 1 - x_P} = 0\n$$\n$$\n2m y_1 y_2 + (1 - x_P)(y_1 + y_2) = 0\n$$\n$$\n-18m - 6m(1 - x_P) = 0 \\implies x_P = 4\n$$\n$\\therefore P(4,0)$\n\n\n**例5：** 椭圆 $\\frac{x^2}{4} + y^2 = 1$，证明：$CD$ 过定点。\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa81211801.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n设 $A(x_1,y_1), B(x_2,y_2), D(x_3,y_3), C(x_4,y_4)$，\n$$\n\\frac{y_1}{y_2} = \\frac{x_1 + 1}{x_2 - 1} \\quad ①\n$$\n$$\n\\frac{y_1}{y_4} = \\frac{x_1 + 1}{x_4 + 1} = \\frac{x_1 + 4}{-x_4 + 4} = \\frac{5(x_1 + 1) - 2(x_1 + 4)}{5(x_4 + 1) + 2(x_4 + 4)} = \\frac{3x_1 - 3}{7x_4 + 13} \\quad ②\n$$\n$$\n\\frac{y_2}{y_3} = \\frac{x_2 + 1}{x_3 + 1} = \\frac{x_2 + 4}{-x_3 + 4} = \\frac{5(x_2 + 1) - 2(x_2 + 4)}{5(x_3 + 1) + 2(x_3 + 4)} = \\frac{3x_2 - 3}{7x_3 + 13} \\quad ③\n$$\n① × ② / ③：$\\frac{y_3}{y_4} = \\frac{x_3 + \\frac{13}{7}}{x_4 + \\frac{13}{7}}$\n\n例3 补充：$k_{OM} \\cdot k_{MF_1} = \\frac{2}{3},\\ k_{ON} \\cdot k_{NF_1} = \\frac{2}{3},\\ k_{MF_1} \\cdot k_{NF_1} = -1$，$\\implies k_{ON} = \\frac{2}{3}k_{MF_1},\\ k_{ON} = \\frac{2}{3}k_{NF_1}$，\n设 $M(x_1,y_1), N(x_2,y_2)$，\n$$\n\\frac{y_1}{y_2} = \\frac{-2x_1}{3x_2 + \\sqrt{5}} = \\frac{3(x_1 + \\sqrt{5})}{-2x_2} = \\frac{x_1 + 3\\sqrt{5}}{x_2 + 3\\sqrt{5}}\n$$\n\n**非轴点差：**\n$$\n\\frac{y_1 - y_0}{y_2 - y_0} = \\frac{x_1 - x_0}{x_2 - x_0}\n$$\n利用比例性质有\n$$\n\\frac{y_1 - y_0}{y_2 - y_0} = \\frac{x_1 - x_0}{x_2 - x_0} = \\frac{-x_0(y_1 - y_0) + y_0(x_1 - x_0)}{-x_0(y_2 - y_0) + y_0(x_2 - x_0)} = \\frac{y_0 x_1 - x_0 y_1}{y_0 x_2 - x_0 y_2}\n$$\n再次利用比例性质有\n$$\n\\frac{(y_1 - y_0)^2}{(y_2 - y_0)^2} = \\frac{\\frac{(x_1 - x_0)^2}{a^2} + \\frac{(y_1 - y_0)^2}{b^2} - \\frac{(y_0 x_1 - x_0 y_1)^2}{(ab)^2}}{\\frac{(x_2 - x_0)^2}{a^2} + \\frac{(y_2 - y_0)^2}{b^2} - \\frac{(y_0 x_2 - x_0 y_2)^2}{(ab)^2}} = \\frac{\\left(\\frac{x_0 x_1}{a^2} + \\frac{y_0 y_1}{b^2} - 1\\right)^2}{\\left(\\frac{x_0 x_2}{a^2} + \\frac{y_0 y_2}{b^2} - 1\\right)^2}\n$$\n其中分母分子均展开并代入 $y_i^2 = \\left(1 - \\frac{x_i^2}{a^2}\\right)b^2,\\ (i=1,2)$，可证最后一个等式成立：\n$$\n\\frac{y_1 - y_0}{y_2 - y_0} = -\\frac{\\frac{x_0 x_1}{a^2} + \\frac{y_0 y_1}{b^2} - 1}{\\frac{x_0 x_2}{a^2} + \\frac{y_0 y_2}{b^2} - 1}\n$$\n\n\n\n### 1. 内接四点形\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa8123a3a6.webp\" alt=\"图片\" width=\"400\" class=\"rounded-lg my-4\" />\n\n\n当轴上一个点（如 $B$）为已知定点，由轴点差总有\n$$\n\\frac{y_1}{y_2} = \\frac{x_1 - x_B}{x_2 - x_B} = \\frac{x_1 - \\frac{a^2}{x_B}}{\\frac{a^2}{x_B} - x_2}\n$$\n原理：调和共轭点\n\n过程：$\\because$ 点在曲线上，\n$$\n\\therefore \\frac{y_1^2}{y_2^2} = \\frac{x_1^2 - a^2}{x_2^2 - a^2} = \\frac{x_1^2 - 2x_B x_1 + x_B^2}{x_2^2 - 2x_B x_2 + x_B^2} =(  )= \\left(\\frac{x_1 - \\frac{a^2}{x_B}}{x_2 - \\frac{a^2}{x_B}}\\right)^2\n$$\n其中 $()$ 内按一次项系数配。\n\n(1)\n$$\n\\frac{y_1}{y_2} = \\frac{x_1 - x_B}{x_2 - x_B} = \\frac{x_1 - \\frac{a^2}{x_B}}{\\frac{a^2}{x_B} - x_2} = \\frac{m(x_1 - x_B) + \\left(x_1 - \\frac{a^2}{x_B}\\right)}{m(x_2 - x_B) + \\left(\\frac{a^2}{x_B} - x_2\\right)} = t \\frac{x_1 - x_A}{x_2 - x_A}\n$$\n显然 $(C,F),(D,E)$ 都是过 $B$ 符合 $(X_i,Y_i),(X_j,Y_j)$ 的点组，即\n$$\n\\frac{y_C}{y_F} = t \\frac{x_C - x_A}{x_F - x_A},\\quad \\frac{y_D}{y_E} = t \\frac{x_D - x_A}{x_E - x_A}\n$$\n当 $CD$ 过的 $A$ 为定点，那么 $m,t$ 的值将确定，$x_G$ 也将确定，故\n$$\n\\frac{y_C}{y_D} = \\frac{x_C - x_A}{x_D - x_A} \\implies \\frac{y_E}{y_F} = \\frac{x_E - x_G}{x_F - x_G}\n$$\n代表 $EF$ 过轴上一定点 $G$。\n\n(2) 给定 $B$ 后可求 $H,I$ 在定直线（即极线 $x = \\frac{a^2}{x_B}$）上。\n\n① 有两点在轴端点，\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa811e09e6.webp\" alt=\"图片\" width=\"350\" class=\"rounded-lg my-4\" />\n\n可证 $k_{CA} \\cdot |AF| = k_{DE} \\cdot |EF|$\n\n② 四个点同运动\n设 $C(x_1,y_1), D(x_2,y_2), F(x_3,y_3), E(x_4,y_4)$，记 $x_i' = x_i - \\frac{a^2}{x_B}$，那么\n$$\n\\frac{y_2}{y_4} = \\frac{x_2 - x_B}{x_4 - x_B} = \\frac{x_2' + \\frac{a^2}{x_B} - x_B}{x_4' + \\frac{a^2}{x_B} - x_B} = \\frac{x_2'}{-x_4'} \\quad (\\text{轴点差})\n$$\n$$\n\\frac{y_3}{y_1} = \\frac{x_3 - x_B}{x_4 - x_B} = \\frac{x_3' + \\frac{a^2}{x_B} - x_B}{x_1' + \\frac{a^2}{x_B} - x_B} = \\frac{-x_3'}{x_1'}\n$$\n两式相比有\n$$\n\\frac{y_2 x_1'}{-y_4 x_3'} = \\frac{y_3 x_2'}{-y_1 x_4'} = \\frac{x_1'(x_2' + \\frac{a^2}{x_B} - x_B)}{-x_3'(x_4' + \\frac{a^2}{x_B} - x_B)} = \\frac{x_2'(x_1' + \\frac{a^2}{x_B} - x_B)}{-x_4'(x_3' + \\frac{a^2}{x_B} - x_B)} = \\frac{y_2 x_1' - y_1 x_2'}{y_3 x_4' - y_4 x_3'} = \\frac{x_1' - x_2'}{x_4' - x_3'}\n$$\n$$\nt = \\frac{y_2 x_1' - y_1 x_2'}{x_1' - x_2'} = \\frac{y_4 x_3' - y_3 x_4'}{x_3' - x_4'}\n$$\n$\\because CD: y = \\frac{y_2 - y_1}{x_2 - x_1}(x - x_1) + y_1 = \\frac{y_2 - y_1}{x_2 - x_1}(x' - x_1') + y_1 = \\frac{y_2 - y_1}{x_2 - x_1} x' + \\frac{x_1' y_2 - x_2' y_1}{x_2' - x_1'}$\n同理 $EF: y = \\frac{y_4 - y_3}{x_4 - x_3} x' + \\frac{x_3' y_4 - x_4' y_3}{x_3' - x_4'}$\n\n令 $x' = 0$，即 $x = \\frac{a^2}{x_B}$ 时两直线纵坐标相同，即这一点为两直线交点。\n$\\therefore$ 两直线交点在定直线 $x = \\frac{a^2}{x_B}$ 上。\n\n### (三) 定比点差法\n适用条件：定点、成比例\n\n主体：在椭圆上两点 $(x_1,y_1), (x_2,y_2)$\n$$\n\\begin{cases}\n\\frac{x_1^2}{a^2} + \\frac{y_1^2}{b^2} = 1 \\quad ① \\\\\n\\frac{x_2^2}{a^2} + \\frac{y_2^2}{b^2} = 1 \\quad ②\n\\end{cases}\n$$\n① $-\\lambda^2$② 得\n$$\n\\frac{x_1^2 - \\lambda^2 x_2^2}{a^2} + \\frac{y_1^2 - \\lambda^2 y_2^2}{b^2} = 1 - \\lambda^2\n$$\n$$\n\\frac{(x_1 + \\lambda x_2)(x_1 - \\lambda x_2)}{a^2} + \\frac{(y_1 + \\lambda y_2)(y_1 - \\lambda y_2)}{b^2} = 1 - \\lambda^2\n$$\n\n**例6**：椭圆 $\\frac{x^2}{3} + y^2 = 1$，$\\overrightarrow{FA} = 5\\overrightarrow{BF}$，求 $A$ 坐标。\n\n设 $A(x_1,y_1), B(x_2,y_2)$，则\n$$\nx_1 + 5x_2 = 6\\sqrt{2} \\quad ①\n$$\n$$\ny_1 + 5y_2 = 0 \\quad ②\n$$\n$$\n\\begin{cases}\n\\frac{x_1^2}{3} + y_1^2 = 1 \\quad ③ \\\\\n\\frac{x_2^2}{3} + y_2^2 = 1 \\quad ④\n\\end{cases}\n$$\n③ $-25$④ 得\n$$\n\\frac{(x_1 + 5x_2)(x_1 - 5x_2)}{3} + (y_1 + 5y_2)(y_1 - 5y_2) = -24\n$$\n代入①②得\n$$\nx_1 - 5x_2 = -6\\sqrt{2}\n$$\n又由① 解得\n$$\nx_1 = 0,\\ y = \\pm 1\n$$\n\n\n**例7**：\n椭圆 $\\frac{x^2}{3} + \\frac{y^2}{2} = 1$，\n$$\n\\overrightarrow{PF_1} = \\lambda_1 \\overrightarrow{F_1A},\\ \\overrightarrow{PF_2} = \\lambda_2 \\overrightarrow{F_2B}\n$$\n求证：$\\lambda_1 + \\lambda_2$ 为定值。\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa976f2057.webp\" alt=\"图片\" width=\"300\" class=\"rounded-lg my-4\" />\n\n\n\n$$\n\\begin{cases}\nx_0 + \\lambda_1 x_1 = -1 - \\lambda_1 \\quad ① \\\\\ny_0 + \\lambda_1 y_1 = 0 \\quad ②\n\\end{cases}\n$$\n$$\n\\begin{cases}\n\\frac{x_0^2}{3} + \\frac{y_0^2}{2} = 1 \\quad ③ \\\\\n\\frac{x_1^2}{3} + \\frac{y_1^2}{2} = 1 \\quad ④\n\\end{cases}\n$$\n③ $-\\lambda_1^2$④：\n$$\n\\frac{(x_0 + \\lambda_1 x_1)(x_0 - \\lambda_1 x_1)}{3} + \\frac{(y_0 + \\lambda_1 y_1)(y_0 - \\lambda_1 y_1)}{2} = 1 - \\lambda_1^2\n$$\n$$\n\\lambda_1 x_1 - x_0 = 3 - 3\\lambda_1^2 \\quad ⑤\n$$\n代入① 得\n$$\nx_0 = \\lambda_1 - 2\n$$\n同理\n$$\n\\begin{cases}\nx_0 + \\lambda_2 x_2 = 1 + \\lambda_2 \\\\\ny_0 + \\lambda_2 y_2 = 0\n\\end{cases}\n$$\n进而\n$$\n\\lambda_2 x_2 - x_0 = 3\\lambda_2 - 3\n$$\n$$\nx_0 = 2 - \\lambda_2\n$$\n$$\n\\therefore \\lambda_1 + \\lambda_2 = 4\n$$\n\n**结论**：\n焦弦常数\n$$\n\\lambda_1 + \\lambda_2 = \\frac{2(a^2 + c^2)}{a^2 - c^2}\n$$\n将 $F$ 换为 $x$ 轴上任一点 $(\\pm m,0)$，\n$$\n\\lambda_1 + \\lambda_2 = \\frac{2(a^2 + m^2)}{a^2 - m^2}\n$$"
          }
        ]
      },
      {
        "id": "sub-1773758157425",
        "title": "非对称韦达",
        "blocks": [
          {
            "id": "block-1773758185219",
            "type": "text",
            "content": "### 非对称韦达\n1. $\\frac{x_1}{x_2}$\n$$\n\\frac{x_1}{x_2} + \\frac{x_2}{x_1} = \\frac{x_1^2 + x_2^2}{x_1 x_2} = \\frac{(x_1 + x_2)^2}{x_1 x_2} - 2\n$$\n\n2. $x_1 + \\lambda x_2 = m,\\ \\lambda \\in R \\text{ 且 } \\lambda \\neq 1$\n\n构造\n$$\nx_1 + n = -\\lambda(x_2 + n) \\implies (-\\lambda - 1)n = m\n$$\n再利用\n$$\n\\frac{x_1 + n}{x_2 + n} + \\frac{x_2 + n}{x_1 + n} = -\\lambda - \\frac{1}{\\lambda}\n$$\n\n3. $\\frac{m y_1 y_2 + y_1}{m y_1 y_2 + y_2}$\n利用 $y_1 + y_2 = \\lambda m y_1 y_2$\n"
          }
        ]
      },
      {
        "id": "sub-1773758332182",
        "title": "点乘法",
        "blocks": [
          {
            "id": "block-1773758332666",
            "type": "text",
            "content": "### 点乘法\n$$\n\\begin{cases}\n\\frac{x_1^2}{a^2} + \\frac{y_1^2}{b^2} = 1 \\quad ① \\\\\n\\frac{x_2^2}{a^2} + \\frac{y_2^2}{b^2} = 1 \\quad ②\n\\end{cases}\n$$\n① $\\times$ ②：\n$$\n\\left(\\frac{x_1 x_2}{a^2}\\right)^2 + \\left(\\frac{y_1 y_2}{b^2}\\right)^2 + \\frac{x_1^2 y_2^2 + x_2^2 y_1^2}{a^2 b^2} = 1\n$$\n$$\n\\left(\\frac{x_1 x_2}{a^2}\\right)^2 + 2\\frac{x_1 x_2 y_1 y_2}{ab} + \\left(\\frac{y_1 y_2}{b^2}\\right)^2 + \\frac{x_1^2 y_2^2 + x_2^2 y_1^2}{a^2 b^2} - \\frac{2x_1 x_2 y_1 y_2}{ab} = 1\n$$\n$$\n\\left(\\frac{x_1 x_2}{a^2} + \\frac{y_1 y_2}{b^2}\\right)^2 + \\left(\\frac{x_1 y_2 - x_2 y_1}{ab}\\right)^2 = 1\n$$\n\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa977130ee.webp\" alt=\"图片\" width=\"400\" class=\"rounded-lg my-4\" />\n\n\nM为 $AB$ 中点，四边形 $AOBP$ 为平行四边形。\n求证：$S_{AOBP}$ 为定值\n\n即证 $|x_1 y_2 - x_2 y_1|$为定值\n\n即证 $\\frac{x_1 x_2}{a^2} + \\frac{y_1 y_2}{b^2}$ 为定值\n\n$P$ 在椭圆上：\n$$\n\\frac{(x_1 + x_2)^2}{a^2} + \\frac{(y_1 + y_2)^2}{b^2} = 1\n$$\n又\n$$\n\\frac{x_1^2}{a^2} + \\frac{y_1^2}{b^2} = 1,\\quad \\frac{x_2^2}{a^2} + \\frac{y_2^2}{b^2} = 1\n$$\n$$\n\\implies \\frac{x_1 x_2}{a^2} + \\frac{y_1 y_2}{b^2} = -\\frac{1}{2}\n$$\n$$\n\\implies S_{\\square AOBP} = \\frac{3}{2}ab\n$$\n\n\n<img src=\"/images/高中数学精编题库/解析几何/69baa9772751f.webp\" alt=\"图片\" width=\"400\" class=\"rounded-lg my-4\" />\n\n\n$\\triangle ABC$ 重心为 $O$，求证 $S_{\\triangle ABC}$ 为定值。\n\n$$\nS_{\\triangle AOC} = 3 S_{\\triangle AOB} = \\frac{3}{2} |x_1 y_2 - x_2 y_1|\n$$\n$C$ 在椭圆上，易证。"
          }
        ]
      }
    ]
  },
  {
    "id": "hs-adv-sequence",
    "title": "数列",
    "description": "等差等比数列、递推数列、数列求和等",
    "icon": "∑",
    "subTopics": [
      {
        "id": "sub-1773758873076",
        "title": "数列基础",
        "blocks": [
          {
            "id": "block-1773758873897",
            "type": "text",
            "content": "## 一、数列\n(一) 基本概念\n\n(二) 分类\n\n(三) 递推\n\n(四) 前n项和\n$$\na_n =\n\\begin{cases}\nS_n - S_{n-1}, & n \\ge 2 \\\\\nS_1, & n = 1\n\\end{cases}\n$$\n适用于：\n① 已知 $S_n = f(n)$，求 $a_n = g(n)$\n\n② 已知 $f(S_n, a_n) = 0 \\implies a_n$ 递推 或 $S_n$ 递推\n\n判断数列增减性：\n- 图象法\n- $a_{n+1} - a_n$\n\n## 二、等差数列\n(一) 定义（判定1）\n$a_{n+1} - a_n = d$（常数）\n\n (二) 通项公式 $a_n = a_1 + (n-1)d$\n\n① 方法：累加法 $\\implies$ 斜率 $d$\n\n② $a_n = f(n) = kn + b$\n\n③ $a_n = kn + b \\implies \\{a_n\\}$ 是等差数列（判定2）\n\n④ 升级版：$a_n = a_m + (n-m)d$\n\n(三) 等差中项\n$2a_n = a_{n-1} + a_{n+1}$（判定3）\n\n(四) 性质\n若 $s + t = p + q$，则 $a_s + a_t = a_p + a_q$（$d \\neq 0$）\n\n(五) 前n项和 $S_n = \\frac{(a_1 + a_n)n}{2}$\n\n① 方法：倒序相加法\n\n② 常与性质连用\n\n③ $S_n = na_1 + \\frac{n(n-1)}{2}d$\n\n④ $S_n = \\frac{d}{2}n^2 + \\left(a_1 - \\frac{d}{2}\\right)n = f(n) = An^2 + Bn$，$\\left\\{\\frac{S_n}{n}\\right\\}$ 是等差数列，公差为 $\\frac{d}{2}$\n\n⑤ $S_n = An^2 + Bn \\implies \\{a_n\\}$ 是等差数列（判定4）；\n\n若 $S_n = An^2 + Bn + C \\implies \\{a_n\\}$ 从第2项开始为等差数列\n\n⑥ 若 $\\{a_n\\}, \\{b_n\\}$ 为等差数列，前n项和分别为 $S_n, T_n$，则 $\\frac{a_n}{b_n} = \\frac{S_{2n-1}}{T_{2n-1}}$\n\n(六) $S_n$ 性质\n\n$S_k, S_{2k}-S_k, S_{3k}-S_{2k} \\dots$ 成等差，公差为 $k^2d$\n\n(七) $S_n$ 最值\n\n- $S_n$ 法\n- $a_n$ 法：在 $a_n$ 正负分界处取得\n\n(八) 判定\n\n1. 定义法：$a_{n+1} - a_n =$ 常数\n\n2. 等差中项法：$2a_n = a_{n-1} + a_{n+1}$\n\n3. 通项公式法：$a_n = kn + b$\n\n4. 前n项和法：$S_n = An^2 + Bn$\n\n（1、2大题可用）\n\n(九) 奇偶项和\n\n共 $(2n+1)$ 项：\n\n$$\n\\begin{align*}\nS_{\\text{奇}} &= a_1 + a_3 + \\dots + a_{2n-1} + a_{2n+1} = a_{n+1} \\cdot (n+1) \\\\\nS_{\\text{偶}} &= a_2 + a_4 + \\dots + a_{2n} = a_{n+1} \\cdot n \\\\\n\\frac{S_{\\text{奇}}}{S_{\\text{偶}}} &= \\frac{n+1}{n},\\quad S_{\\text{奇}} - S_{\\text{偶}} = a_{n+1}\n\\end{align*}\n$$\n\n共 $2n$ 项：\n$$\n\\begin{align*}\nS_{\\text{奇}} &= a_1 + \\dots + a_{2n-1} = \\frac{(a_1 + a_{2n-1}) \\cdot 2n}{2} = a_n \\cdot n \\\\\nS_{\\text{偶}} &= a_2 + \\dots + a_{2n} = a_{n+1} \\cdot n \\\\\n\\frac{S_{\\text{奇}}}{S_{\\text{偶}}} &= \\frac{a_n}{a_{n+1}},\\quad S_{\\text{奇}} - S_{\\text{偶}} = n(a_n - a_{n+1}) = -nd\n\\end{align*}\n$$\n\n\n## 三、等比数列 \n(一) 定义\n\n$\\frac{a_{n+1}}{a_n} = q$\n\n① $\\forall n \\in \\mathbb{N}^*, a_n \\neq 0$ 且 $q \\neq 0$\n\n② $q > 0 \\implies \\{a_n\\}$ 同号：\n- $q > 1$：递增（$a_1 > 0$）或递减（$a_1 < 0$）\n- $0 < q < 1$：递减（$a_1 > 0$）或递增（$a_1 < 0$）\n\n  $q < 0 \\implies \\{a_n\\}$ 摆动，奇数项符号相同，偶数项符号相同\n\n(二) 通项公式 $a_n = a_1 \\cdot q^{n-1}$\n\n① 方法：累乘法\n\n② $a_n = f(n) = k \\cdot q^n$（$k \\neq 0, q \\neq 0$）\n\n③ 反之 $\\Longleftrightarrow$\n\n(三) 等比中项\n\n若 $X, G, Y$ 是等比数列，则称 $G$ 是 $X$ 与 $Y$ 的等比中项，$G^2 = XY$（$G, X, Y \\neq 0$)\n\n(四) 性质\n\n若 $s + t = p + q$，则 $a_s \\cdot a_t = a_p \\cdot a_q$\n\n(五) 前n项和 $S_n$\n\n当 $q \\neq 1$ 时，$S_n = \\frac{a_1(1 - q^n)}{1 - q}$\n\n当 $q = 1$ 时，$S_n = na_1$\n\n① 方法：错位相减法\n\n②\n\n③ $q \\neq 1$ 时，$S_n = f(n) = \\frac{a_1}{1 - q} - \\frac{a_1}{1 - q} q^n = kq^n - k$\n\n④ 反之，当 $n \\ge 2$ 时，$a_n = S_n - S_{n-1} = k(q-1)q^{n-1}$；\n\n当 $n=1$ 时，$a_1 = S_1 = kq - k$ 符合上式。\n\n综上，$a_n = k(q-1) \\cdot q^{n-1}$（$k \\neq 0, q \\neq 1, q \\neq 0$）\n\n$S_n = k \\cdot q^n + A \\implies \\{a_n\\}$ 从第2项起为等比数列\n\n(六) $S_n$ 性质\n\n$S_k, S_{2k}-S_k, S_{3k}-S_{2k} \\dots$ 成等比（$q \\neq -1$，$k$ 为偶数），公比为 $q^k$\n\n(七) 判定\n\n1. 定义法：$\\frac{a_{n+1}}{a_n} = q$（或 $a_{n+1} = q a_n, a_1 \\neq 0$）\n\n2. 等比中项法：$a_n^2 = a_{n+1} \\cdot a_{n-1}$ 且 $a_n \\neq 0$\n\n3. $a_n$ 法：$a_n = k q^n$（$a_n \\neq 0$）\n\n4. $S_n$ 法：$S_n = k \\cdot q^n - k$（$a_n \\neq 0$）\n\n(1,2大题可用)"
          }
        ]
      },
      {
        "id": "sub-1773759608851",
        "title": "求Sn",
        "blocks": [
          {
            "id": "block-1773759610199",
            "type": "text",
            "content": "## 求 $S_n$\n\n#### (一) $\\{DC\\}$ 或 $\\{DB\\} \\to$ 公式法\n#### (二) $\\{DC \\pm DB\\} \\to$ 分组求和法\n#### (三) $\\{DC \\times DB\\} \\to$ 错位相减法\n求 $\\{(An+B) \\cdot q^n\\}$ 的前 $n$ 项和：\n$$\n\\begin{align*}\nS_n &= (A+B)q^1 + (2A+B)q^2 + \\dots + (An+B)q^n \\quad ① \\\\\nqS_n &= (A+B)q^2 + (2A+B)q^3 + \\dots + (An+B)q^{n+1} \\quad ②\n\\end{align*}\n$$\n① $-$ ② 得：\n$$\n\\begin{align*}\n(1-q)S_n &= (A+B)q + A \\cdot \\frac{q^2(1-q^{n-1})}{1-q} - (An+B)q^{n+1} \\\\\n&= \\left(-An - B + \\frac{A}{q-1}\\right)q^{n+1} + (A+B)q + \\frac{Aq^2}{1-q} \\\\\nS_n &= \\frac{[(An+B)(q-1)-A] \\cdot q^{n+1} + (A+B)q - Bq^2}{1-q}\n\\end{align*}\n$$\n\n\n#### (四) $\\{a_{n+1}-a_n\\} \\to$ 裂项相消法\n$$\nS_n = (a_2-a_1) + (a_3-a_2) + (a_4-a_3) + \\dots + (a_{n+1}-a_n) = a_{n+1} - a_1\n$$\n裂项公式：$b_n = a_{n+1} - a_n$\n\n1. $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$\n\n2. $\\frac{1}{n(n+2)} = \\frac{1}{2}\\left(\\frac{1}{n} - \\frac{1}{n+2}\\right)$\n\n3. $\\frac{1}{(2n-1)(2n+1)} = \\frac{1}{2}\\left(\\frac{1}{2n-1} - \\frac{1}{2n+1}\\right)$\n\n4. $\\frac{1}{n(n+1)(n+2)} = \\frac{1}{2}\\left(\\frac{1}{n(n+1)} - \\frac{1}{(n+1)(n+2)}\\right)$\n\n5. $\\frac{2^{n-1}(n-1)}{n(n+1)} = -\\frac{1}{2}\\left(\\frac{2^n}{n} - \\frac{2^{n+1}}{n+1}\\right)$\n\n6. $\\frac{3^n(4n-1)}{n(n+2)} = \\frac{1}{2}\\left(\\frac{3^{n+2}}{n+2} - \\frac{3^n}{n}\\right)$\n\n7. $\\frac{1}{\\sqrt{n}+\\sqrt{n+1}} = \\sqrt{n+1} - \\sqrt{n},\\quad S_n = \\sqrt{n+1} - 1$\n\n\n#### (五) 并项求和法\n1. $a_n + a_{n+1} = kn + b$\n$$\nS_n =\n\\begin{cases}\n(kt+b)\\cdot \\frac{n}{2} + k\\cdot \\frac{n}{2}\\cdot\\left(\\frac{n}{2}-1\\right), & n\\text{ 为偶数} \\\\\n(2kt+b)\\cdot \\frac{n-1}{2} + k\\cdot \\frac{n-1}{2}\\cdot \\frac{n-3}{2}, & n\\text{ 为奇数}\n\\end{cases}\n$$\n\n2. $a_n + a_{n+1} = k \\cdot q^n$\n$$\nS_n =\n\\begin{cases}\n\\frac{kq(1-q^n)}{1-q^2}, & n\\text{ 为偶数} \\\\\n\\frac{kq^2(1-q^{n-1})}{1-q^2} + kq, & n\\text{ 为奇数}\n\\end{cases}\n$$\n\n3. $(-1)^n(kn+b)$\n$$\nS_n =\n\\begin{cases}\n\\frac{nk}{2}, & n\\text{ 为偶数} \\\\\n-\\frac{(n+1)k}{2} - b, & n\\text{ 为奇数}\n\\end{cases}\n$$\n\n4. $(-1)^n(kn+b)^2$\n设 $b_n = kn+b$，则\n$$\n\\begin{align*}\nS_n &= -b_1^2 + b_2^2 - b_3^2 + b_4^2 - \\dots \\\\\n&= (b_1+b_2)(b_2-b_1) + (b_3+b_4)(b_4-b_3) + \\dots \\\\\n&= k \\cdot (b_1+b_2+\\dots)\n\\end{align*}\n$$\n$$\nS_n =\n\\begin{cases}\nk \\cdot \\frac{(k+b)(kn+b)}{2} \\cdot n, & n\\text{ 为偶数} \\\\\nk \\cdot \\frac{(2k+b)(kn+b)}{2} \\cdot (n-1) - (k+b)^2, & n\\text{ 为奇数}\n\\end{cases}\n$$\n\n5. $(-1)^n \\cdot (a_n + a_{n+1})^2$\n$$\nS_n = a_{n+1} - a_1\n$$\n\n\n#### (六) 倒序相加法\n将 $S_n$ 与倒序后的 $S_n$ 相加，利用对称性求和。\n\n#### (七) $\\{DC \\times C_n^n\\} \\to$ 组合数求和\n$a_n = (ki+b) \\cdot C_n^i,\\ i \\in \\mathbb{N}$\n$$\n\\begin{align*}\nS_n &= (kt+b)C_n^1 + (2kt+b)C_n^2 + \\dots + (nkt+b)C_n^n \\\\\n&= bC_n^0 + (kt+b)C_n^1 + \\dots + (nkt+b)C_n^n - b\n\\end{align*}\n$$\n- 当 $n$ 为奇数时：\n$$\n\\begin{align*}\nS_n &= (nk+2b)\\sum_{i=0}^{\\frac{n-1}{2}} C_n^i - b \\\\\n&= \\left(\\frac{nk}{2}+b\\right)2^n - b\n\\end{align*}\n$$\n- 当 $n$ 为偶数时：\n$$\n\\begin{align*}\nS_n &= (nk+2b)\\sum_{i=0}^{\\frac{n}{2}-1} C_n^i + \\left(\\frac{nk}{2}+b\\right)C_n^{\\frac{n}{2}} - b \\\\\n&= \\left(\\frac{nk}{2}+b\\right)2^n - b\n\\end{align*}\n$$\n综上：$S_n = \\left(\\frac{nk}{2}+b\\right)2^n - b$\n\n\n#### (八) $\\sum_{k=m}^n C_k^m$（$n \\ge m$）\n$$\n\\begin{align*}\nS_n &= C_m^m + C_{m+1}^m + \\dots + C_n^m \\\\\n&= C_{m+1}^{m+1} + C_{m+1}^m + C_{m+2}^m + \\dots + C_n^m \\\\\n&= C_{m+2}^{m+1} + C_{m+2}^m + \\dots + C_n^m \\\\\n&= C_{n+1}^{m+1}\n\\end{align*}\n$$\n\n\n\n#### (九) $k C_n^k \\cdot q^k$\n由二项式定理：\n$$\n(1+q)^n = C_n^0 + C_n^1 q + C_n^2 q^2 + \\dots + C_n^n q^n\n$$\n两边对 $q$ 求导：\n$$\nn(1+q)^{n-1} = C_n^1 + 2C_n^2 q + \\dots + nC_n^n q^{n-1}\n$$\n两边乘 $q$：\n$$\nnq(1+q)^{n-1} = C_n^1 q + 2C_n^2 q^2 + \\dots + nC_n^n q^n\n$$\n\n### 拓展一：$a_n = (kn+m) \\cdot q^n$ 求 $S_n$（$k,m,q \\in \\mathbb{R}$）\n\n#### ① 累加\n1) $a_{n+1} = (kn+m+k)q^{n+1} = q a_n + k \\cdot q^{n+1}$\n2) $a_{n+1} - q a_n = k \\cdot q^{n+1}$\n3) 累加得：\n$$\na_{n+1} - a_1 = (kn+k+m)q^{n+1} - (k+m)q = S_n + \\frac{(k+m)q(q^n-1)}{q-1}\n$$\n\n#### ② 裂项\n设 $(kn+b)q^n = [\\alpha(n+1)+\\beta]q^{n+1} - (\\alpha n+\\beta)q^n$\n$$\nq(\\alpha(n+1)+\\beta) - (\\alpha n+\\beta) = kn + b\n$$\n$$\n\\begin{cases}\n(q-1)\\alpha = k \\\\\nq\\alpha + (q-1)\\beta = b\n\\end{cases}\n$$\n注：累加、累乘、裂项都是常用的求和方法，只要<span class=\"text-red-600\">能构造出且 $f(n)$ 会求和</span>即可使用。\n\n例：\n- $a_{n+1} = k a_n + b \\implies \\frac{a_{n+1}}{k^{n+1}} = \\frac{a_n}{k^n} + \\frac{b}{k^{n+1}}$\n- $a_{n+1} = n a_n + b \\implies \\frac{a_{n+1}}{n!} = \\frac{a_n}{(n-1)!} + \\frac{b}{n!}$\n- 累乘取 $\\ln$\n\n### 拓展二：求和专题：构造 $a_n = b_{n+1} - b_n$\n\n#### (一) $a_n = (kn+m)q^n$\n构造 $b_n = (an+b)q^n + C$\n令 $b_{n+1} - b_n = [a(n+1)+b]q^{n+1} - (an+b)q^n = [(q-1)an + qa + (q-1)b]q^n = a_n = (kn+m)q^n$\n$$\n\\begin{cases}\n(q-1)a = k \\\\\nqa + (q-1)b = m\n\\end{cases}\n$$\n解得：\n$$\n\\begin{cases}\na = \\frac{k}{q-1} \\\\\nb = \\frac{m - \\frac{kq}{q-1}}{q-1} = \\frac{(m-k)q - m}{(q-1)^2}\n\\end{cases}\n$$\n则 $S_n = a_1 + a_2 + \\dots + a_n = (b_{n+1}-b_1) = (an+a+b)q^{n+1} - (a+b)q$\n\n#### (二) $a_n = kn^2$\n构造 $b_n = an^3 + bn^2 + cn$\n令 $b_{n+1}-b_n = a[(n+1)^3-n^3] + b[(n+1)^2-n^2] + c = a(3n^2+3n+1) + b(2n+1) + c = (3a)n^2 + (3a+2b)n + a+b+c = kn^2$\n$$\n\\begin{cases}\n3a = k \\\\\n3a+2b = 0 \\\\\na+b+c = 0\n\\end{cases}\n$$\n解得：\n$$\n\\begin{cases}\na = \\frac{k}{3} \\\\\nb = -\\frac{k}{2} \\\\\nc = \\frac{k}{6}\n\\end{cases}\n$$\n$$\nb_n = \\frac{k}{3}n^3 - \\frac{k}{2}n^2 + \\frac{k}{6}n\n$$\n$$\nS_n = \\frac{k}{3}(n+1)^3 - \\frac{k}{2}(n+1)^2 + \\frac{k}{6}(n+1)\n$$"
          }
        ]
      },
      {
        "id": "sub-1773760410386",
        "title": "求an",
        "blocks": [
          {
            "id": "block-1773760412445",
            "type": "text",
            "content": "## 求 $a_n$\n\n#### (一) 猜想、周期性\n#### (二) 公式法\n1. 等差数列：$a_n = a_1 + (n-1)d$\n\n2. 等比数列：$a_n = a_1 q^{n-1}$\n\n3. 前 $n$ 项和型：\n$$\na_n =\n\\begin{cases}\nS_n - S_{n-1}, & n \\ge 2 \\\\\nS_1, & n = 1\n\\end{cases}\n$$\n\n#### (三) 由递推求通项\n\n#### 1. 累加法\n形式：$a_{n+1} - a_n = f(n)$\n\n设 $\\{f(n)\\}$ 的前 $n-1$ 项和为 $S_{n-1}$，则\n$$\na_n - a_1 = S_{n-1}\n$$\n\n#### 2. 累乘法\n形式：$\\frac{a_{n+1}}{a_n} = f(n)$\n\n设 $\\{f(n)\\}$ 的前 $n-1$ 项积为 $T_{n-1}$，则\n$$\n\\frac{a_n}{a_1} = T_{n-1}\n$$\n\n#### 3. $a_{n+1} = r a_n + f(n)$ —— 构造法\n\n(1) ① **$f(n)$ 为常数型**：$a_{n+1} = r a_n + p$\n\n构造：$a_{n+1} + k = r(a_n + k)$，解得 $k = \\frac{p}{r-1}$\n$$\na_n = (a_1 + k) r^{n-1} - k\n$$\n\n② **$f(n)$ 为一次型**：$a_{n+1} = r a_n + An + B$\n\n构造：$a_{n+1} + k(n+1) + b = r(a_n + kn + b)$，解出 $k,b$\n\n③ **$f(n)$ 为指数型**：$a_{n+1} = r(a_n + p^n)$\n- 当 $r \\neq p$：构造 $a_{n+1} + k p^{n+1} = r(a_n + k p^n)$，解出 $k$\n- 当 $r = p$：即 $a_{n+1} = r a_n + r^n$，同除 $r^n$：\n$$\n\\frac{a_{n+1}}{r^{n+1}} = \\frac{a_n}{r^n} + 1\n$$\n\n(2) \n$$\n\\frac{a_{n+1}}{r^n} = \\frac{a_n}{r^{n-1}} + \\frac{f(n)}{r^n}\n$$\n令 $b_n = \\frac{a_n}{r^{n-1}}$，则 $b_{n+1} - b_n = g(n)$，用累加法求解。\n\n\n\n#### 4. 取倒法\n形式：$a_{n+1} = \\frac{c a_n}{a a_n + b}$\n取倒数：\n$$\n\\frac{1}{a_{n+1}} = \\frac{b}{c} \\cdot \\frac{1}{a_n} + \\frac{a}{c}\n$$\n转化为构造法求解。\n\n\n#### 5. 连续三项递推\n形式：$a_{n+1} = A a_n + B a_{n-1}\\ (A^2 + 4B > 0)$\n\n构造：$a_{n+1} + x a_n = y(a_n + x a_{n-1})$，解出 $x,y$。\n\n\n### (四) 分式递推 $a_{n+1} = \\frac{a a_n + b}{c a_n + d}$ —— 特征方程法\n特征方程：$c x^2 + (d - a)x - b = 0$\n\n1. **重根**：$x_1 = x_2 = m = \\frac{a - d}{2c}$\n递推式两边减 $m$ 再取倒：\n$$\n\\frac{1}{a_{n+1} - m} = \\frac{1}{a_n - m} + \\frac{2c}{a + d}\n$$\n$\\left\\{\\frac{1}{a_n - m}\\right\\}$ 是等差数列。\n\n2. **不等根**：$x_1 \\neq x_2$\n递推式分别减 $x_1, x_2$ 再相除：\n$$\n\\frac{a_{n+1} - x_1}{a_{n+1} - x_2} = \\frac{a - x_1 c}{a - x_2 c} \\cdot \\frac{a_n - x_1}{a_n - x_2}\n$$\n$\\left\\{\\frac{a_n - x_1}{a_n - x_2}\\right\\}$ 是等比数列。\n特别地，当 $a = -d$ 时，$\\left\\{\\frac{a_n - x_1}{a_n - x_2}\\right\\}$ 是周期为 $2$ 的周期数列。\n\n3. **无实根**：数列具有周期性。\n"
          }
        ]
      },
      {
        "id": "sub-1773760901386",
        "title": "公共项问题",
        "blocks": [
          {
            "id": "block-1773760902320",
            "type": "text",
            "content": "## 公共项问题\n#### 通法\n$$\n设 f(n) = g(m)\n$$\n$$\n n = h(m)\n$$\n$$\n令 h(m) \\in \\mathbb{N}^*\n$$\n$$\n得 m = a_n\n$$\n$$\n则 F(n) = g(a_n)，其中 F(n) 为 f(n) 和 g(n) 公共项构成的数列。\n$$\n\n\n#### n 与 $h(m)$ 为线性关系时的处理方法（余数问题）\n\n**例：** 正整数 $k$ 满足 $17k = 160x + 1$，$x \\in \\mathbb{N}$，求数列 $\\{k\\}$。\n\n$k=9x+\\frac{1}{17}(7x+1)$\n\n\n令 $y = \\frac{1}{17}(7x+1)$，则 $17y = 7x+1$，$x = 2y + \\frac{1}{7}(3y-1)$\n\n令 $z = \\frac{1}{7}(3y-1)$，则 $7z = 3y-1$，$y = 2z + \\frac{1}{3}(z+1)$\n\n令 $z = 3n-1$，则 $y = 7n-2$，$x = 17n-5$，$k = 160n-47$\n\n此方法名为**辗转相除法**"
          }
        ]
      },
      {
        "id": "sub-1773761264000",
        "title": "数列不等式证明",
        "blocks": [
          {
            "id": "block-1773761265083",
            "type": "text",
            "content": "## 数列不等式证明\n\n#### 1：放缩为等比数列\n$$\n\\frac{1}{3^1 - 2^1} + \\frac{1}{3^2 - 2^2} + \\dots + \\frac{1}{3^n - 2^n} < \\frac{3}{2}\n$$\n$$\n\\frac{1}{3^n - 2^n} \\le \\left(\\frac{1}{3}\\right)^{n-1}\n$$\n$$\n\\sum_{k=1}^n \\frac{1}{3^k - 2^k} \\le \\frac{3}{2} - \\frac{3}{2}\\left(\\frac{1}{3}\\right)^n < \\frac{3}{2}\n$$\n构造原理：等比求和 $\\frac{a_1(1 - q^n)}{1 - q} = \\frac{a_1}{1 - q} - \\frac{a_1 q^n}{1 - q} < \\frac{a_1}{1 - q}$\n\n构造等比数列:首项为左边首项，$\\frac{a_1}{1 - q} = $ 右边的数。\n\n\n#### 2：裂项\n已知 $a_n = 4n^2 + 4n$，求证：\n$$\n\\frac{1}{a_1 - 1} + \\frac{1}{a_2 - 1} + \\dots + \\frac{1}{a_n - 1} < \\frac{2}{7}\n$$\n放缩：\n$$\n\\frac{1}{4n^2 + 4n - 3} < \\frac{1}{4n^2 + 4n - 3} = \\frac{1}{(2n-1)(2n+3)} = \\frac{1}{4}\\left(\\frac{1}{2n-1} - \\frac{1}{2n+3}\\right)\n$$\n求和：\n$$\n\\text{左边} < \\frac{1}{4}\\left(1 + \\frac{1}{3} - \\frac{1}{2n+1} - \\frac{1}{2n+3}\\right) < \\frac{1}{4} \\cdot \\frac{4}{3} = \\frac{1}{3}\n$$\n（放大了少放几项）\n\n\n#### 3. \n欲证：$a_1 + a_2 + \\dots + a_n < f(n)$\n即证：\n- $n \\ge 2$ 时，$a_n < f(n) - f(n-1)$\n- $n = 1$ 时，$a_1 < f(1)$\n\n欲证：$a_1 \\cdot a_2 \\cdot \\dots \\cdot a_n < f(n)$\n即证：\n- $n \\ge 2$ 时，$a_n < \\frac{f(n)}{f(n-1)}$\n- $n = 1$ 时，$a_1 < f(1)$\n\n\n### 常用放缩公式\n1. $\\frac{1}{n^2} < \\frac{1}{n^2 - n} = \\frac{1}{n-1} - \\frac{1}{n}$\n\n2. $\\frac{1}{n^2} < \\frac{1}{n^2 - 1} = \\frac{1}{2}\\left(\\frac{1}{n-1} - \\frac{1}{n+1}\\right)$\n\n3. $\\frac{1}{n^2} < \\frac{1}{n^2 - \\frac{1}{4}} = 2\\left(\\frac{1}{2n-1} - \\frac{1}{2n+1}\\right)$\n\n4. $\\frac{1}{(2n+1)^2} < \\frac{1}{4n^2 + 4n} = \\frac{1}{4}\\left(\\frac{1}{n} - \\frac{1}{n+1}\\right)$\n\n5. $\\frac{1}{n^3} < \\frac{1}{n(n+1)(n-1)} = \\frac{1}{2}\\left[\\frac{1}{n(n-1)} - \\frac{1}{n(n+1)}\\right]$\n\n6. $\\frac{2^n}{(2^n - 1)^2} = \\frac{2^n}{(2^n - 1)(2^n - 1)} < \\frac{2^n}{(2^n - 1)(2^n - 2)} = \\frac{1}{2^n - 2} - \\frac{1}{2^n - 1}$\n\n7. $\\frac{1}{\\sqrt{n}} = \\frac{2}{2\\sqrt{n}} < \\frac{2}{\\sqrt{n} + \\sqrt{n-1}} = 2(\\sqrt{n} - \\sqrt{n-1})$\n\n8. $\\frac{1}{\\sqrt{n}} = \\frac{2}{2\\sqrt{n}} > \\frac{2}{\\sqrt{n} + \\sqrt{n+1}} = 2(\\sqrt{n+1} - \\sqrt{n})$\n\n9. $\\frac{1}{n\\sqrt{n}} = \\frac{2}{\\sqrt{n}\\cdot \\sqrt{n}(\\sqrt{n}+\\sqrt{n})} < \\frac{2}{\\sqrt{n}\\sqrt{n-1}(\\sqrt{n} + \\sqrt{n-1})} = 2\\left(\\frac{1}{\\sqrt{n-1}} - \\frac{1}{\\sqrt{n}}\\right)$\n\n10.$\\frac{1}{2^n - 1} = \\frac{2^{n+1} -1}{(2^n - 1)(2^{n+1} - 1)} < \\frac{2^{n+1}}{(2^{n+1} - 1)(2^{n+1} - 1)} = \\frac{2}{2^n - 1} - \\frac{2}{2^{n+1} - 1}$"
          }
        ]
      },
      {
        "id": "sub-1773762025263",
        "title": "非线性递推",
        "blocks": [
          {
            "id": "block-1773762123495",
            "type": "text",
            "content": "## 非线性递推\n#### 1. 三角换元\n\n- $\\sqrt{1-x^2} \\implies x = \\cos\\theta$\n- $\\sqrt{1+x^2} \\implies x = \\tan\\theta$\n- $\\sqrt{x^2-1} \\implies x = \\frac{1}{\\cos\\theta}$\n\n#### 例1： $a_1=1$，$a_{n+1} = \\sqrt{S_n^2 + S_n + 1}$，求 $a_n$。\n\n$$\n去根号\n\\begin{cases}\n平方\\\\ \n换元\\\\\n让根号里为平方\n\\end{cases}\n$$\n$$\na_{n+1} = \\sqrt{\\left(S_n + \\frac{1}{2}\\right)^2 + \\left(\\frac{\\sqrt{3}}{2}\\right)^2}\n$$\n令 $S_n + \\frac{1}{2} = \\frac{\\sqrt{3}}{2}\\tan\\alpha_n$，$\\alpha_n \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$\n$$\n\\frac{\\sqrt{3}}{2}\\tan\\alpha_{n+1} - \\frac{\\sqrt{3}}{2}\\tan\\alpha_n = \\frac{\\sqrt{3}}{2} \\cdot \\frac{1}{\\cos\\alpha_n}\n$$\n$$\n\\tan\\alpha_{n+1} = \\tan\\alpha_n + \\frac{1}{\\cos\\alpha_n} = \\frac{1+\\sin\\alpha_n}{\\cos\\alpha_n} = \\frac{1-\\cos\\left(\\alpha_n+\\frac{\\pi}{2}\\right)}{\\sin\\left(\\alpha_n+\\frac{\\pi}{2}\\right)} = \\tan\\left(\\frac{\\alpha_n}{2} + \\frac{\\pi}{4}\\right)\n$$\n$$\n\\therefore \\alpha_{n+1} = \\frac{\\alpha_n}{2} + \\frac{\\pi}{4} \\implies \\alpha_n \\implies S_n \\implies a_n\n$$\n\n\n#### 例2: $a_{n+1} = \\frac{a_n^2}{4(a_n-1)}$，$a_1>1$，求 $a_n$。\n\n利用 $\\sin2\\alpha = 2\\sin\\alpha\\cos\\alpha$，得\n$$\n\\sin^2 2\\alpha = 4\\sin^2\\alpha(1-\\sin^2\\alpha)\n$$\n母题：$b_{n+1} = 4b_n(1-b_n)$\n$$\n\\therefore b_n = \\sin^2\\left(\\theta_1 \\cdot 2^{n-1}\\right),\\ \\theta_1 \\text{ 由 } b_1 \\text{ 决定}\n$$\n$$\n\\frac{1}{a_{n+1}} = 4 \\cdot \\frac{1}{a_n}\\left(1 - \\frac{1}{a_n}\\right) \\implies a_n = \\sin^{-2}\\left(\\theta_1 \\cdot 2^{n-1}\\right)\n$$\n\n\n#### 例3:$a_{n+1} = \\frac{a_n^2 + 2a_n - 1}{-a_n^2 + 2a_n + 1}$\n$$\n\\tan\\left(2\\alpha - \\frac{\\pi}{4}\\right) = \\frac{\\tan2\\alpha - 1}{1+\\tan2\\alpha} = \\frac{2\\tan\\alpha + \\tan^2\\alpha - 1}{1 - \\tan^2\\alpha + 2\\tan\\alpha}\n$$\n$$\n\\therefore a_{n+1} = \\frac{a_n^2 + 2a_n - 1}{-a_n^2 + 2a_n + 1} \\implies a_n = \\tan\\alpha_n\n$$\n$$\na_{n+1} = \\tan\\alpha_{n+1} = \\tan\\left(2\\alpha_n - \\frac{\\pi}{4}\\right) \\implies \\alpha_{n+1} = 2\\alpha_n - \\frac{\\pi}{4}\n$$\n\n\n#### 例4: $a_{n+1} = \\frac{1+a_n}{1-a_n}$，$a_1=2$\n$$\n\\tan\\left(X_n + \\frac{\\pi}{4}\\right) = \\frac{1+\\tan X_n}{1-\\tan X_n} \\implies \\tan X_{n+1} = \\tan\\left(X_n + \\frac{\\pi}{4}\\right)\n$$\n$$\nX_{n+1} = X_n + \\frac{\\pi}{4} \\implies \\{X_n\\} \\text{ 为等差，} X_1 = \\arctan2 ,d=\\frac{\\pi}{4}\n$$\n$$\na_n = \\tan\\left(\\theta_1 + \\frac{(n-1)\\pi}{4}\\right),\\ \\tan\\theta_1 = 2\n$$\n\n\n#### 例5:已知$|a_n| = \\sqrt{\\frac{1 - a_{n+2}}{4a_{n+1}}}$，$|a_1| \\le 1$，$|a_2| \\le 1$，求证 $|a_n|=1$\n$$\n\\implies \\frac{a_{n+2}}{2a_{n+1}} = 1 - 2a_n^2\n$$\n$$\n\\implies a_{n+2} = 2a_{n+1}(1-2a_n^2)\n$$\n利用 $\\sin4\\alpha = 2\\sin2\\alpha(1-2\\sin^2\\alpha)$，得\n$$\n\\therefore a_{n+2} = \\sin4\\alpha_n,\\ a_{n+1} = \\sin2\\alpha_n,\\ a_n = \\sin\\alpha_n\n$$\n\n\n\n### 2. 取对\n#### 例：$a_{n+1} = a_n^2 - 2$，$a_1 = \\frac{5}{2}$\n\n令 $a_n = b_n + \\frac{1}{b_n}$，$b_1 = 2$\n$$\nb_{n+1} + \\frac{1}{b_{n+1}} = b_n^2 + \\frac{1}{b_n^2}\n$$\n设 $f(x) = x + \\frac{1}{x}\\ (x>1)$，则 $f(b_{n+1}) = f(b_n^2)$\n$$\n\\therefore b_{n+1} = b_n^2\n$$\n$$\n\\log_2 b_{n+1} = 2\\log_2 b_n,\\ \\log_2 b_1 = 1\n$$\n$$\n\\therefore \\log_2 b_n = 2^{n-1} \\implies b_n = 2^{2^{n-1}}\n$$\n$$\na_n = 2^{2^{n-1}} + 2^{-2^{n-1}}\n$$\n"
          }
        ]
      },
      {
        "id": "sub-1773762769890",
        "title": "斐波那契数列",
        "blocks": [
          {
            "id": "block-1773762770909",
            "type": "text",
            "content": "## 斐波那契数列\n1. 奇项和：$a_1 + a_3 + a_5 + \\dots + a_{2n-1} = a_{2n}$\n\n2. 偶项和：$a_2 + a_4 + \\dots + a_{2n} = a_{2n+1} - 1$\n\n3. 前 $n$ 项和：$a_1 + a_2 + \\dots + a_n = a_{n+2} - a_2 = a_{n+2} - 1$\n\n4. 平方和：$a_1^2 + a_2^2 + \\dots + a_n^2 = a_n a_{n+1}$\n\n  $a_n^2 = a_n \\cdot a_n = a_n(a_{n+1} - a_{n-1}) = a_n a_{n+1} - a_n a_{n-1}\\ (n \\ge 2)$\n\n5. $a_{n+2} + a_{n-2} = 3a_n$\n\n6. $\\lim_{n \\to +\\infty} \\frac{a_n}{a_{n+1}} = \\frac{\\sqrt{5}-1}{2}$\n"
          }
        ]
      },
      {
        "id": "sub-1773762921354",
        "title": "凹数列",
        "blocks": [
          {
            "id": "block-1773762922313",
            "type": "text",
            "content": "## 凹数列处理方法\n $\\frac{a_{\\ell+2} - a_{\\ell+1}}{a_{\\ell+1} - a_\\ell} \\ge 1 \\implies a_{\\ell+2} - a_{\\ell+1} \\ge a_{\\ell+1} - a_\\ell,\\ \\ell \\in \\{1,2,\\dots,n-2\\}$\n\n对 $1 \\le i < j < k \\le n$：\n$$\n\\frac{a_k - a_j}{k-j} = \\frac{(a_k - a_{k-1}) + (a_{k-1} - a_{k-2}) + \\dots + (a_{j+1} - a_j)}{k-j} \\ge \\frac{(k-j)(a_{j+1} - a_j)}{k-j} = a_{j+1} - a_j\n$$\n$$\n\\frac{a_j - a_i}{j-i} = \\frac{(a_j - a_{j-1}) + (a_{j-1} - a_{j-2}) + \\dots + (a_{i+1} - a_i)}{j-i} \\le \\frac{(j-i)(a_{j+1} - a_j)}{j-i} = a_{j+1} - a_j\n$$\n$$\n\\because a_{j+1} - a_j \\ge a_j - a_{j-1}\n$$\n$$\n\\therefore \\frac{a_k - a_j}{k-j} \\ge \\frac{a_j - a_i}{j-i}\n$$"
          }
        ]
      }
    ]
  },
  {
    "id": "hs-adv-thinking",
    "title": "数学思想",
    "description": "函数与方程、数形结合、分类讨论等数学思想方法",
    "icon": "💡",
    "subTopics": [
      {
        "id": "sub-1773794630923",
        "title": "代数变形转化",
        "blocks": [
          {
            "id": "block-1773794631425",
            "type": "text",
            "content": "### 代数变形转化\n#### eg1. $x,y>0,\\ x+y=9.$ 求$\\left(\\frac{4}{x}+\\frac{1}{y}\\right)_{\\min}$\n\n#### $x,y>0,\\ \\sqrt{9x^2+1}+\\sqrt{9y^2+1}=9xy.$ 求$(4x^2+y^2)_{\\min}.$\n\n<span class=\"text-red-600\">设$3x=\\frac{1}{\\cos\\alpha},\\ 3y=\\frac{1}{\\cos\\beta}$</span>\n\n得$\\sin(\\alpha+\\beta)=1 \\Rightarrow \\alpha+\\beta=\\frac{\\pi}{2}$\n\n$4x^2+y^2=\\frac{1}{9}\\left(\\frac{4}{\\cos^2\\alpha}+\\frac{1}{\\cos^2\\beta}\\right)=\\frac{1}{9}\\left(\\frac{4}{\\cos^2\\alpha}+\\frac{1}{\\sin^2\\alpha}\\right)$\n\n又$\\sin^2\\alpha+\\cos^2\\alpha=1$\n\n\n#### eg2. (18全国一) $f(x)=2\\sin x+\\sin2x.$ 求$f_{\\min}.$\n\n$=2\\sin x(1+\\cos x).$ 奇$\\Rightarrow f_{\\min}=-f_{\\max}\\Rightarrow \\sin x>0$ ，$\\cos x>0\\Rightarrow$单位圆\n\n<img src=\"/images/2026/03/18/_20260318100224_280_2373dda0344d56204.th.jpg\" alt=\"图片\" width=\"200\" class=\"rounded-lg my-4\" />\n\n\n\n\n#### (20全二). $f(x)=\\sin^2x\\sin2x.$ 求$f_{\\max}$\n\n$=\\frac{1}{2}(1-\\cos2x)\\sin2x.$ ($\\cos2x<0$)\n\n<img src=\"/images/高中数学精编题库/解析几何/69ba94c689c4a.webp\" alt=\"图片\" width=\"200\" class=\"rounded-lg my-4\" />\n\n\n\n\n#### $m,n>0,$ 求$\\left(\\frac{4m}{m^2+n^2+1}+\\frac{2n}{n^2+1}\\right)_{\\max}.$\n\n<span class=\"text-red-600\">以$m$为主元</span>：$\\frac{4}{m+\\frac{n^2+1}{m}}+\\frac{2n}{n^2+1}\\le \\frac{4}{2\\sqrt{n^2+1}}+\\frac{2n}{n^2+1}=\\frac{2(n+\\sqrt{n^2+1})}{n^2+1}$\n\n<span class=\"text-red-600\">设$n=\\tan\\theta.$</span> $=\\frac{2\\left(\\tan\\theta+\\frac{1}{\\cos\\theta}\\right)}{\\frac{1}{\\cos^2\\theta}}=\\sin2\\theta+2\\cos\\theta$\n\n\n#### eg3. 定理：$A+B+C=\\pi,$ 有\n#### ① $\\cos A+\\cos B+\\cos C\\le \\frac{3}{2}$\n\n#### ② $\\tan A+\\tan B+\\tan C=\\tan A\\tan B\\tan C$\n\n#### $a,b,c>0,\\ ab+ac+bc=1.$\n\n#### 求$\\frac{a}{\\sqrt{1+a^2}}+\\frac{b}{\\sqrt{1+b^2}}+\\frac{c}{\\sqrt{1+c^2}}\\ \\max.$\n\n②$\\Rightarrow \\frac{1}{\\tan A\\tan B}+\\frac{1}{\\tan A\\tan C}+\\frac{1}{\\tan B\\tan C}=1$\n\n令$a=\\frac{1}{\\tan A},$ 所求式$\\Leftrightarrow \\cos A+\\cos B+\\cos C$\n\n由①知最大值为$\\frac{3}{2}.$\n\n\n#### eg4.方差与期望的关系？\n$$\n\\begin{align*}\nS^2&=\\frac{\\sum_{i=1}^n(x_i-\\overline{x})^2}{n}\\\\\n&=\\frac{\\sum_{i=1}^n x_i^2}{n}-2\\overline{x}\\frac{\\sum_{i=1}^n x_i}{n}+\\frac{\\sum_{i=1}^n \\overline{x}^2}{n}\\\\\n&=E(X^2)-2\\overline{x}\\cdot\\overline{x}+\\overline{x}^2\\\\\n&=E(X^2)-[E(X)]^2.\n\\end{align*}\n$$\n\n\n\n#### eg5. 三变量$X,Y,Z.$ $X,Y$样本相关系数为$\\frac{12}{13},\\ Y,Z$样本相关系数为$\\frac{4}{5},$ 则$X,Z$样本相关系数最大值为$\\underline{\\ \\ \\ \\ \\ }.$\n\n$r=\\frac{\\sum_{i=1}^n(x_i-\\overline{x})(y_i-\\overline{y})}{\\sqrt{\\sum_{i=1}^n(x_i-\\overline{x})^2\\sum_{i=1}^n(y_i-\\overline{y})^2}}.$ <span class=\"text-red-600\">可视为$n$维向量间夹角</span>."
          }
        ]
      },
      {
        "id": "sub-1773795118981",
        "title": "图形转化",
        "blocks": [
          {
            "id": "block-1773795120120",
            "type": "text",
            "content": "### 图形转化\n### eg1.\n#### (17北京) $P(1,1),\\ G(0,\\frac{1}{2}).\\ y^2=x,\\ l\\perp X$轴.过$G$直线交抛物线于$M,N$两点. 求证：$A$是$BM$中点.\n\n![图片](/images/2026/03/18/_20260318100219_275_2.md.jpg)\n\n\n\n即证：$2y_A=y_m+y_B$\n\n即证：$2\\frac{y_A}{x_A}=\\frac{y_m}{x_m}+\\frac{y_B}{x_B}$\n\n$2=k_{OM}+k_{ON}$,\n\n$\\frac{y_1-\\frac{1}{2}}{x_1}=\\frac{y_2-\\frac{1}{2}}{x_2}\\Leftrightarrow \\frac{y_1-\\frac{1}{2}}{y_1^2}=\\frac{y_2-\\frac{1}{2}}{y_2^2}\\Leftrightarrow \\frac{1}{y_1}+\\frac{1}{y_2}=2$,\n\n$k_{OM}+k_{ON}=\\frac{y_1}{x_1}+\\frac{y_2}{x_2}=\\frac{1}{y_1}+\\frac{1}{y_2}=2.$\n\n\n\n#### (22全乙) $\\frac{x^2}{3}+\\frac{y^2}{4}=1.$ 过$P(1,-2)$直线交椭圆于$M,N.$ 过$M$且平行于$X$轴直线交线段$AB$于$T,\\ \\overrightarrow{MT}=\\overrightarrow{TH}.\\ A(0,-2),\\ B(\\frac{3}{2},1).$\n\n#### 证明：$HN$过定点.\n\n\n![图片](/images/2026/03/18/_20260318100220_276_2.md.jpg)\n\n### eg2.\n#### $y^2=4x,\\ AB\\perp CD.$ 求$S_{ABCD}\\ \\min.$\n\n![图片](/images/2026/03/18/_20260318100221_277_2.md.jpg)\n\n\n\n$S=\\frac{1}{2}|AB||CD|=\\frac{1}{2}\\sqrt{1+m^2}\\cdot\\sqrt{1+\\frac{1}{m^2}}|y_1-y_2||y_3-y_4|$,\n\n$\\begin{cases}x=my+1\\\\y^2=4x\\end{cases}\\Rightarrow y^2-4my-4=0$,\n\n$|y_1-y_2|=4\\sqrt{m^2+1}$,\n\n$\\therefore S=8(1+m^2)\\left(1+\\frac{1}{m^2}\\right)=8\\left(2+m^2+\\frac{1}{m^2}\\right)\\ge 32.$\n\n\n#### (24九省联考).\n\n![图片](/images/高中数学精编题库/解析几何/69ba8b212992d.webp)\n\n\n\n作$AD$中点$H.$\n\n则$HN\\parallel GE,\\ HM\\parallel GB$\n\n$\\therefore S_{\\triangle HNG}=S_{\\triangle HNA}$，\n\n$S_{\\triangle HMG}=S_{\\triangle HMD}$，\n\n$\\therefore S_{\\triangle AMG}=S_{\\triangle DMN}=\\frac{1}{4}S_{ADBE}$"
          }
        ]
      },
      {
        "id": "sub-1773795474482",
        "title": "注意转化等价",
        "blocks": [
          {
            "id": "block-1773795475425",
            "type": "text",
            "content": "### 注意转化等价\n#### eg1. 二次方程两根都大于3.\n\n$\\Leftrightarrow\\begin{cases}\\Delta\\ge0\\\\x_1+x_2>6\\\\x_1x_2>9\\end{cases}?$<span class=\"text-red-600\">×</span>\n\n$\\Leftrightarrow \\begin{cases}x_1>3\\\\x_2>3\\end{cases}\\Leftrightarrow \\begin{cases}x_1-3>0\\\\x_2-3>0\\end{cases}\\Leftrightarrow \\begin{cases}\\Delta\\ge0\\\\(x_1-3)+(x_2-3)>0\\\\(x_1-3)(x_2-3)>0.\\end{cases}$  ✔\n\n<span class=\"text-red-600\">注意转化时等价关系!</span>\n\n\n#### eg2. $f(x)=\\sqrt{2}\\sin(\\omega x-\\frac{\\pi}{4}),\\omega>\\frac{1}{4},$ $f(x)$在$(2\\pi,3\\pi)$内无最值点.\n\n<span class=\"text-red-600\">×</span>$\\Rightarrow$$\\frac{T}{2}\\ge\\pi\\Leftrightarrow \\omega\\le1.\\ \\therefore \\frac{1}{4}<\\omega\\le1.$\n\n✔：$\\omega x-\\frac{\\pi}{4}=\\frac{\\pi}{2}+k\\pi$,\n\n$x=\\frac{\\frac{3\\pi}{4}+k\\pi}{\\omega}$.\n\n$\\Leftrightarrow \\begin{cases}\\frac{\\frac{3\\pi}{4}+k\\pi}{\\omega}\\le2\\pi\\\\\\frac{\\frac{3\\pi}{4}+(k+1)\\pi}{\\omega}\\ge3\\pi\\end{cases}$\n\n\n#### eg3. $\\sqrt{x^2+12}=x-6$\n\n$x^2+12=x^2-12x+36$，\n\n$x=2$\n\n\n\n<span class=\"text-red-600\">经检验，$x=2$是原方程的增根$\\Rightarrow （a=b\\Rightarrow a^2=b^2$ 不等价！）</span>\n\n<span class=\"text-red-600\">故舍去.$\\therefore$原方程无解</span>\n\n$\\begin{cases}y=\\sqrt{x^2+12}\\\\y=x-6\\end{cases}$\n\n<img src=\"/images/高中数学精编题库/解析几何/69ba8b21009b7.webp\" alt=\"图片\" width=\"450\" class=\"rounded-lg my-4\" />\n\n\n\n"
          }
        ]
      }
    ]
  }
];

// 精编题库数据
export const staticQuestionBankChapters: StaticQuestionBankChapter[] = [
  {
    "id": "functions",
    "title": "函数",
    "icon": "f(x)",
    "questions": [
      {
        "id": "qb-1774938228376",
        "blocks": [
          {
            "id": "block-1774938228376",
            "type": "text",
            "content": "已知函数 $f(x)=\\begin{cases}xe^x, & x \\leq 0 \\\\ x\\ln x, & 0 < x < 10 \\\\ -x+11, & x \\geq 10\\end{cases}$，若 $g(x)=f^2(x)-mf(x)-2m^2$ 有 6 个不同的零点分别为 $x_1,x_2,x_3,x_4,x_5,x_6$，且 $x_1<x_2<x_3<x_4<x_5<x_6, f(x_1)=f(x_2)=f(x_3)$，则下列说法正确的是（）"
          }
        ],
        "options": [
          " $x \\leq 0$ 时，$-\\frac{1}{e}\\leq f(x)\\leq 0$",
          " $x_1+x_2$ 的取值范围为 $(2, \\frac{101}{10})$",
          "当 $m<0$ 时，$f(x_1)+f(x_2)+3f(x_3x_4x_5)+f(x_6)$ 的取值范围为 $(-\\frac{1}{e}, 0)$",
          "当 $m>0$ 时，$f(x_1)+f(x_2)+3f(x_3x_4x_5)+f(x_6)$ 的取值范围为 $(0, \\frac{2}{3e})$"
        ],
        "correctOptions": [
          0,
          2
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1774970015530",
            "type": "text",
            "content": "$y_1y_2=\\frac{-2m^2}{3}<0$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775012170144",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc88d31c321.webp",
            "width": 900
          }
        ]
      },
      {
        "id": "qb-1774947285358",
        "blocks": [
          {
            "id": "block-1774947285358",
            "type": "text",
            "content": "已知函数 $f(x)=\\begin{cases}2e^{2x}-e^x, & x < a \\\\ x, & x \\geq a\\end{cases}$，$g(x)=f[f(x)]$记.函数 $f(x)$ 和 $g(x)$ 的零点个数分别为 $M, N$，则下列说法正确的是"
          }
        ],
        "options": [
          "若 $M=1$，则 $N \\leq 1$",
          "若 $M=1$，则 $N \\geq 1$",
          "若 $M=2$，则 $N=2$",
          "若 $M=2$，则 $N=3$"
        ],
        "correctOptions": [
          0,
          2
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1775014102864",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc90710c671.webp",
            "width": 400,
            "height": 300
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775012381964",
            "type": "text",
            "content": "令$f(x)=0$，可得$x=0$，或$x=a$且$a\\leq0$，再分类讨论，即可求出答案。\n\n解：令$f(x)=0$，可得$x=0$，或$x=a$且$a\\leq0$，\n当$a<0$时，$f(x)$有一个零点，\n当$a=0$时，$f(x)$有两个零点，\n$\\because g(x)=f[f(x)]$，\n$\\therefore f(x)=0$，或$f(x)=a$且$a\\leq0$，\n$\\because M=1$，\n$\\therefore a<0$，\n$\\therefore f(x)$有一个零点，\n当$f(x)=0$时，$x=0$，\n当$f(x)=a$，此时无解，\n故$N=1$，\n故A正确，B错误，\n$\\because M=2$，\n$\\therefore a=0$，\n$\\therefore f(x)$有两个零点，分别为$x=0$，$x=a$，\n当$f(x)=0$时，$x=0$，或$x=a$，\n当$f(x)=a$时，此时无解，\n故$N=2$，\n故C正确，D错误，\n故选：$AC$."
          }
        ]
      },
      {
        "id": "qb-1774947811677",
        "blocks": [
          {
            "id": "block-1774947811677",
            "type": "text",
            "content": "已知函数 $f(x)=\\begin{cases}x^2+2, & x \\leq 0 \\\\ |log_2 x|, & x > 0\\end{cases}$，记函数 $g(x)=f[f(x)]-f(x)-2$ 的 $n$ 个零点为 $x_i(i=1,2,\\dots,n)$，则 $x_1x_2\\cdots x_n=$"
          }
        ],
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775014198699",
            "type": "text",
            "content": "令$f(x)=t\\ge0$，$h(t)=f(t)-t-2$，\n当$t=0$时，$h(0)=f(0)-0-2=0$，此时\n$h(t)$有唯一的零点$t_1=0$.\n\n当$t>0$时，$h(t)=|\\log_2t|-t-2=$\n$\\begin{cases}-\\log_2t-t-2, & 0<t\\le1, \\\\\\log_2t-t-2, & t>1,\\end{cases}$\n\n当$0<t\\le1$时，$h(t)=-\\log_2t-t-2$单调递\n减，且$h\\left(\\dfrac{1}{8}\\right)=\\dfrac{7}{8}>0$，$h\\left(\\dfrac{1}{4}\\right)=-\\dfrac{1}{4}<0$，\n所以存在$t_2\\in\\left(\\dfrac{1}{8},\\dfrac{1}{4}\\right)$，使得$h(t_2)=0$；\n\n当$t>1$时，$h(t)=\\log_2t-t-2$，则$h'(t)=$\n$\\dfrac{1}{t\\ln2}-1$，\n令$h'(t)>0$，得$1<t<\\log_2\\mathrm{e}$，令$h'(t)<0$，得\n$t>\\log_2\\mathrm{e}$，\n所以$h(t)$在$(1,\\log_2\\mathrm{e})$上单调递增，在\n$(\\log_2\\mathrm{e},+\\infty)$上单调递减，\n又$1<\\log_2\\mathrm{e}<2$，所以$h(t)\\le h(\\log_2\\mathrm{e})=$\n$\\log_2(\\log_2\\mathrm{e})-\\log_2\\mathrm{e}-2<0$，所以$h(t)$在\n$(1,+\\infty)$上无零点.\n\n所以$h(t)=f(t)-t-2$在其定义域$[0,$\n$+\\infty)$上有两个零点，分别为$t_1=0$，$t_2\\in$\n$\\left(\\dfrac{1}{8},\\dfrac{1}{4}\\right)$.\n\n当$f(x)=t_1=0$时，因为$x^2+2\\ge2$，所以由\n$f(x)=0$，得$|\\log_2x|=0(x>0)$，解得$x=1$；\n\n当$f(x)=t_2$时，由$t_2\\in\\left(\\dfrac{1}{8},\\dfrac{1}{4}\\right)$，得\n$|\\log_2x|=t_2(x>0)$，解得$x=2^{-t_2}$或$x=2^{t_2}$，\n所以函数$g(x)=f(f(x))-f(x)-2$共有$3$\n个零点，分别为$x_1=1$，$x_2=2^{-t_2}$，$x_3=2^{t_2}$，\n所以$x_1x_2x_3=1$.故选A."
          }
        ]
      },
      {
        "id": "qb-1774948097025",
        "blocks": [
          {
            "id": "block-1774948097025",
            "type": "text",
            "content": "已知函数$f(x),g(x)$的定义域均为$\\mathbb{R}$，$f(x-1)$为偶函数，$g(x)$为奇函数，$g(x)=f(1-x)+2$，$g(7)=2$，则$f(2025)+g(2025)=$"
          }
        ],
        "options": [
          "-4",
          "0",
          "2",
          "2025"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775013878761",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc88d396352.webp",
            "width": 900,
            "height": 300
          }
        ],
        "solutionBlocks": []
      },
      {
        "id": "qb-1774948098251",
        "blocks": [
          {
            "id": "block-1774948098251",
            "type": "text",
            "content": "已知实数$m,n$满足$m+\\ln m=4$，$n\\ln n +n=e^3$，则$mn$的值为（）"
          }
        ],
        "options": [
          "$e^2$ ",
          "$e^3$",
          "$e^4$",
          "$e^5$"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775014362860",
            "type": "text",
            "content": "同构.$me^m=e^4$\n\n$n(\\ln n+1)=me^{m-1}=e^{m-1} (\\ln e^{m-1} +1)$\n\n$n=e^{m-1}$\n\n$mn=e^3$.B"
          }
        ],
        "solutionBlocks": []
      },
      {
        "id": "qb-1774948098408",
        "blocks": [
          {
            "id": "block-1774948098408",
            "type": "text",
            "content": "已知定义在$\\mathbb{R}$上的函数$f(x)$满足$f(x)+f(-x)=x^2$，$\\forall x_1,x_2\\in[0,+\\infty)$均有$\\frac{f(x_1)-f(x_2)}{x_1-x_2}>\\frac{x_1+x_2}{2}(x_1\\neq x_2)$，则不等式$f(x)-f(1-x)>x-\\frac{1}{2}$的解集为."
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1775014586893",
            "type": "text",
            "content": "由题意得$f(x)-\\frac{x^2}{2}在(0,+\\infty)增，且是奇函数，则其在\\R上增$\n\n所求可化为<span class=\"text-red-600\">$f(x)-\\frac{x^2}{2}>f(1-x)-\\frac{(1-x)^2}{2}$</span>\n\n$x>1-x$\n\n$x>\\frac{1}{2}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775017436371",
            "type": "text",
            "content": "$(\\frac{1}{2},+\\infty)$"
          }
        ]
      },
      {
        "id": "qb-1774948098574",
        "blocks": [
          {
            "id": "block-1774948098574",
            "type": "text",
            "content": "已知函数$f(x)=ax^3+bx^2+cx+d$存在两个极值点$x_1,x_2(x_1<x_2)$，且$f(x_1)=-x_1,f(x_2)=x_2$。设$f(x)$的零点个数为$m$，方程$3a[f(x)]^2+2bf(x)+c=0$的实根个数为$n$，则"
          }
        ],
        "options": [
          "当$a>0$时，$n=3$",
          "当$a<0$时，$m+2=n$",
          "$mn$一定能被$3$整除",
          "$m+n$的取值集合为$\\{4,5,6,7\\}$"
        ],
        "correctOptions": [
          0,
          1
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1775015075152",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc88d39d662.webp",
            "width": 900,
            "height": 300
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775017582742",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc9e07ede79.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774948098842",
        "blocks": [
          {
            "id": "block-1774948098842",
            "type": "text",
            "content": "已知函数$f(x)=|x-1|+|x-a|+\\ln x(a>0)$，则"
          }
        ],
        "options": [
          "当$a=1$时，$f(x)$在$(0,1)$上的最大值为$1-\\ln2$",
          "$f(x)$在$(1,+\\infty)$单调递增",
          "当$x\\geq a$时，$f(x)>0$",
          "当且仅当$a\\in(\\ln2,1)$时，曲线$y=f(x)$与$x$轴有$3$个交点"
        ],
        "correctOptions": [
          0,
          1,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1775015371647",
            "type": "text",
            "content": "$0<a\\le1$时，\n$f(x)=\\begin{cases} 1+a-2x+\\ln x & (0,a]，f '=-2+\\frac{1}{x},\\frac{1}{2}处取极值.\\\\ 1-a+\\ln x & (a,1] \\\\ 2x-1-a+\\ln x & (1,+\\infty) \\end{cases}$\n\n\n\n$\\begin{cases} a>\\frac{1}{2} \\\\ f(\\frac{1}{2})>0 \\\\ f(a)<0 \\end{cases}$\n$\\Rightarrow a\\in(\\ln2,1).$\n\n$a>1$时，\n$f(x)=\\begin{cases} 1+a-2x+\\ln x & (0,1] \\\\ a-1+\\ln x & (1,a] \\\\ 2x-1-a+\\ln x & (a,+\\infty) \\end{cases}$\n\n舍."
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775015693855",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc969b4d097.webp",
            "width": 500
          },
          {
            "id": "sol-1775015697875",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc969bd4e23.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774948099058",
        "blocks": [
          {
            "id": "block-1774948099058",
            "type": "text",
            "content": "已知函数$f(x)=\\ln x-1-\\frac{2}{x-1}$，定义域为$D$，则下列结论正确的是"
          }
        ],
        "options": [
          "若$a,b\\in D$且$a<b$，则$f(a)<f(b)$",
          "已知$a,b\\in D$且$a\\neq b$，则“$ab=1$”是“$f(a)+f(b)=0$”的充分条件",
          " 方程$f(f(x))=0$有$4$个不同的实数解",
          "若$a\\in(1,2)$，则$f(a-1)>f(a)$"
        ],
        "correctOptions": [
          1,
          2,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1775017648989",
            "type": "text",
            "content": "\nD.\n$f(a-1) > f(a) \\Rightarrow \\ln(a-1) - \\frac{2}{a-2} > \\ln a - \\frac{2}{a-1}$\n$\\Rightarrow \\ln \\frac{a}{a-1} + \\frac{2}{(a-1)(a-2)} < 0$\n\n$< \\frac{a}{a-1} - 1 + \\frac{2}{(a-1)(a-2)}$\n$= \\frac{(a-1+2a)}{(a-1)(a-2)} < 0$\n\n$QED.$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775017792503",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc9ee06b79b.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774948491263",
        "blocks": [
          {
            "id": "block-1774948491263",
            "type": "text",
            "content": "已知定义在$\\mathbb{R}$上的奇函数$f(x)$满足$f(x+e)=f(x-e)$，当$x\\in(0,e)$时，$f(x)=\\ln x$，则$f(x)$在区间$(-e,2e)$上的所有零点之和为"
          }
        ],
        "options": [
          "$3e-1$",
          "$2e$",
          "$2e-1$",
          "$0$"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775015109116",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc9439308bb.webp",
            "width": 500
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775018036073",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc9fd6a14d1.webp",
            "width": 700
          }
        ]
      },
      {
        "id": "qb-1774948491479",
        "blocks": [
          {
            "id": "block-1774948491479",
            "type": "text",
            "content": "若$f(x)=\\log_4|\\frac{1}{1-x}-a|-b$是奇函数，则$a^b=$"
          }
        ],
        "options": [
          "$\\frac{1}{2}$  ",
          "$\\frac{\\sqrt{2}}{2}$ ",
          "$\\sqrt{2}$",
          "$2$"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775018065968",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc9fd5ed025.webp",
            "width": 600
          },
          {
            "id": "sol-1775018071772",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc9fd6e020c.webp",
            "width": 600
          }
        ]
      },
      {
        "id": "qb-1774948491668",
        "blocks": [
          {
            "id": "block-1774948491668",
            "type": "text",
            "content": "已知函数$f(x)=\\frac{2x-3}{x-2}-e^x$，$g(x)=\\frac{2x-3}{x-2}-\\ln x$的零点分别为$x_1,x_2$，且$x_1>2,x_2>2$，则$x_1-\\frac{1}{x_2-2}=$____；若$a<x_2-x_1$恒成立，则整数$a$的最大值为____。\n（参考数据：$\\ln2\\approx0.7,\\ln3\\approx1.1,\\ln7\\approx1.95,\\ln17\\approx2.8$）"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775017961721",
            "type": "text",
            "content": "解答：\n$ 2$ $ 6$\n\n----------\n\n解析：\n【思路讲解】\n本题需要分两步求解：首先通过函数方程变形找到$x_1$与$x_2$之间的关系，再结合参考数据估算$x_2-x_1$的范围确定整数最大值。\n\n【题目详解】\n建立$x_1$与$x_2$的关联关系\n将函数$f(x)=0$和$g(x)=0$变形为统一形式：\n对于$f(x_1)=0$，有$2+\\frac{1}{x_1-2}=e^{x_1}$\n对于$g(x_2)=0$，有$2+\\frac{1}{x_2-2}=\\ln x_2$\n通过联立方程发现$x_2=e^{x_1}$的对应关系，从而建立$x_1$与$x_2$的函数关系。\n由$f(x_1)=0$得：$e^{x_1}=2+\\frac{1}{x_1-2}$\n由$g(x_2)=0$得：$\\ln x_2=2+\\frac{1}{x_2-2}$\n代入$x_2=e^{x_1}$验证，发现满足方程关系\n\n求解第一空的代数关系\n利用$x_2=e^{x_1}$的关系式，将$\\frac{1}{x_2-2}$转换为$x_1$的表达式：\n$\\frac{1}{x_2-2}=\\frac{1}{e^{x_1}-2}$\n结合$f(x_1)=0$的结果$e^{x_1}-2=\\frac{1}{x_1-2}$进行化简\n$x_1-\\frac{1}{x_2-2}=x_1-\\frac{1}{e^{x_1}-2}=x_1-(x_1-2)=2$\n\n估算$x_2-x_1$的范围\n通过试值法估算$x_1$的范围：\n当$x_1=2.15$时，$e^{x_1}\\approx8.58$，对应$x_2=8.58$\n当$x_1=2.16$时，$e^{x_1}\\approx8.68$，对应$x_2=8.68$\n结合导数分析确认$e^x-x$在$x \\gt 2$时单调递增\n$x_2-x_1=e^{x_1}-x_1\\approx8.58-2.15=6.43$\n\n确定整数最大值\n根据估算结果$6.43 \\lt x_2-x_1 \\lt 6.52$，满足$a \\lt 6.43$的最大整数为6\n\n【答案】\n第一个空：$2$\n第二个空：$6$\n\n"
          }
        ]
      },
      {
        "id": "qb-1774948492032",
        "blocks": [
          {
            "id": "block-1774948492032",
            "type": "text",
            "content": "已知$T=4$为函数$f(x)$的一个周期，且$f(x)=\\begin{cases}\\sqrt{7-7x^2},&x\\in(-1,1]\\\\1-|x-2|,&x\\in(1,3]\\end{cases}$，则方程$3f(x)=x$的解的个数为（）"
          }
        ],
        "options": [
          "3",
          "5",
          "6",
          "7"
        ],
        "correctOption": 2,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775015143742",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc9438991f5.webp",
            "width": 600
          },
          {
            "id": "hint-1775015147558",
            "type": "text",
            "content": "$\\frac{x}{3}=\\sqrt{7-7(x-8)^2}$\n\n$\\frac{64}{63}x^2-16x+63=0$\n\n$\\Delta=0$"
          }
        ],
        "solutionBlocks": []
      },
      {
        "id": "qb-1774948492206",
        "blocks": [
          {
            "id": "block-1774948492206",
            "type": "text",
            "content": "【2025沈阳期末】\n若曲线$y=\\ln2x$在点$P(x_1,y_1)$处的切线与曲线$y=e^{2x}$相切于点$Q(x_2,y_2)$，则$\\frac{1}{2x_1-1}+x_2=$____。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1775015265743",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cc94382f188.webp",
            "width": 600
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775018490790",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cca190e5dd1.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774948492462",
        "blocks": [
          {
            "id": "block-1774948492462",
            "type": "text",
            "content": "已知$\\alpha,\\beta(\\alpha\\neq\\beta)$是函数$f(x)=x^3+ax^2+bx+1(a,b\\in\\mathbb{R})$两个不同的零点，且$\\alpha\\cdot\\beta=1$，$x_1,x_2$是函数$f(x)$两个极值点，则"
          }
        ],
        "options": [
          "$a=b$",
          "$a>3$或$a<-2$",
          "$a^2+(b-2)^2$的值可能为$11$",
          "使得$f(x_1)+f(x_2)=\\frac{4}{3}$的$a$的值有且只有$1$个"
        ],
        "correctOptions": [
          0,
          2,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775019572124",
            "type": "text",
            "content": "### 解题过程\n\n已知$\\alpha,\\beta(\\alpha\\neq\\beta)$是函数$f(x)=x^3+ax^2+bx+1$的两个不同零点，且$\\alpha\\cdot\\beta=1$，设第三个根为$\\gamma$。\n\n由三次函数韦达定理：\n$$\n\\begin{align*}\n\\alpha+\\beta+\\gamma&=-a\\\\\n\\alpha\\beta+\\alpha\\gamma+\\beta\\gamma&=b\\\\\n\\alpha\\beta\\gamma&=-1\n\\end{align*}\n$$\n\n因为$\\alpha\\beta=1$，代入$\\alpha\\beta\\gamma=-1$得$\\gamma=-1$，再代入前两式：\n$$\n\\begin{align*}\n\\alpha+\\beta-1&=-a \\implies a=1-(\\alpha+\\beta)\\\\\n1+\\gamma(\\alpha+\\beta)&=b \\implies b=1-(\\alpha+\\beta)\n\\end{align*}\n$$\n故$a=b$，**选项A正确**✅\n\n---\n\n### 选项B分析\n$f'(x)=3x^2+2ax+b$，因$a=b$，则$f'(x)=3x^2+2ax+a$。\n极值点存在的条件是判别式$\\Delta>0$：\n$$\n\\Delta=(2a)^2-4\\cdot3\\cdot a=4a^2-12a>0\n$$\n化简得：\n$$\n4a(a-3)>0\n$$\n解得$a<0$或$a>3$，与选项B的$a>3$或$a<-2$不符，**选项B错误**❌\n\n---\n\n### 选项C分析\n因$a=b$，则$a^2+(b-2)^2=a^2+(a-2)^2$，展开得：\n$$\na^2+(a-2)^2=2a^2-4a+4\n$$\n令其等于11：\n$$\n2a^22-4a+4=11 \\implies 2a^2-4a-7=0\n$$\n解得：\n$$\na=\\frac{4\\pm\\sqrt{16+56}}{4}=\\frac{2\\pm3\\sqrt{2}}{2}\n$$\n其中$a=\\frac{2-3\\sqrt{2}}{2}<0$，满足$a<0$或$a>3$，**选项C正确**✅\n\n---\n\n### 选项D分析\n由韦达定理，$x_1+x_2=-\\frac{2a}{3}$，$x_1x_2=\\frac{a}{3}$，且$a=b$，则：\n$$\nf(x_1)+f(x_2)=x_1^3+x_2^3+a(x_1^2+x_2^2)+a(x_1+x_2)+2\n$$\n利用立方和与平方和公式化简：\n$$\nx_1^3+x_2^3=(x_1+x_2)(x_1^2-x_1x_2+x_2^2)=(x_1+x_2)\\left[(x_1+x_2)^2-3x_1x_2\\right]\n$$\n$$\nx_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2\n$$\n代入得：\n$$\nf(x_1)+f(x_2)=\\frac{4a^3}{27}-\\frac{2a^2}{3}+2\n$$\n令$f(x_1)+f(x_2)=\\frac{4}{3}$：\n$$\n\\frac{4a^3}{27}-\\frac{2a^2}{3}+2=\\frac{4}{3}\n$$\n化简得：\n$$\n2a^3-9a^2+9=0 \\implies (a-3)(2a^2-3a-3)=0\n$$\n解得$a=3$（舍去，不满足$\\Delta>0$）或$a=\\frac{3\\pm\\sqrt{33}}{4}$。\n其中$a=\\frac{3-\\sqrt{33}}{4}<0$满足条件，$a=\\frac{3+\\sqrt{33}}{4}\\approx2.186$不满足，故仅有1个有效解，**选项D正确**✅\n\n---\n\n最终答案：**ACD**"
          }
        ]
      },
      {
        "id": "qb-1774948494073",
        "blocks": [
          {
            "id": "block-1774948494073",
            "type": "text",
            "content": " 【2025·安徽江淮十校4月联考】已知$x,y\\in\\mathbb{R}$，且$9^x+(x-2)\\cdot3^x=1$，$9^{y-1}+y\\cdot3^y=9$，则$x+y=$（）"
          }
        ],
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775018748848",
            "type": "text",
            "content": "同除以$3^x$：$3^x+(x-2)-3^{-x}=0$\n\n同除以$3^y$：$3^{y-2}+y- 3^{2-y}=0$\n\n<span class=\"text-red-600\">$3^{2-y}-3^{y-2}+(2-y)-2=0$</span>\n\n同构"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775018536423",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cca1910c5eb.webp",
            "width": 600
          }
        ]
      },
      {
        "id": "qb-1774948494269",
        "blocks": [
          {
            "id": "block-1774948494269",
            "type": "text",
            "content": "【2025·南昌模拟】已知正实数$x,y$满足$\\frac{x}{2}+2y-2=\\ln x+\\ln y$，则$y^x=$（）"
          }
        ],
        "options": [
          "$2$  ",
          "$\\sqrt{2}$",
          "$\\frac{1}{4}$ ",
          "$\\frac{\\sqrt{2}}{2}$"
        ],
        "correctOption": 2,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775018634317",
            "type": "image",
            "content": "/images/高中数学精编题库/函数/69cca1911e132.webp",
            "width": 500
          }
        ]
      }
    ]
  },
  {
    "id": "inequality",
    "title": "不等式",
    "icon": "≠",
    "questions": [
      {
        "id": "qb-1774937920358",
        "blocks": [
          {
            "id": "block-1774937920358",
            "type": "text",
            "content": "若实数 $x,y$ 满足 $x^2-4xy+y^2=6$，则（）"
          }
        ],
        "options": [
          "$|x-y|\\geq2$",
          "$|x-y|\\leq12$",
          "$x^2+y^2\\geq 2$",
          "$x^2+y^2\\leq 12$"
        ],
        "correctOptions": [
          0,
          2
        ],
        "choiceType": "multiple",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775020954938",
            "type": "text",
            "content": "### 解题过程\n\n已知实数$x,y$满足：\n$$\nx^2 - 4xy + y^2 = 6\n$$\n\n---\n\n#### 分析选项A、B：$|x-y|$的范围\n先计算$(x-y)^2$：\n$$\n(x-y)^2 = x^2 - 2xy + y^2\n$$\n由已知条件变形得：\n$$\nx^2 + y^2 = 6 + 4xy\n$$\n代入$(x-y)^2$：\n$$\n(x-y)^2 = (6 + 4xy) - 2xy = 6 + 2xy\n$$\n\n利用基本不等式$x^2 + y^2 \\ge 2|xy|$，代入$x^2 + y^2 = 6 + 4xy$：\n- 当$xy \\ge 0$时，$6 + 4xy \\ge 2xy \\implies xy \\ge -3$；\n- 当$xy < 0$时，$6 + 4xy \\ge -2xy \\implies xy \\ge -1$。\n\n综合得$xy \\ge -1$，代入$(x-y)^2$：\n$$\n(x-y)^2 \\ge 6 + 2(-1) = 4\n$$\n因此$|x-y| \\ge 2$，**选项A正确，B错误**。\n\n---\n\n#### 分析选项C、D：$x^2+y^2$的范围\n由$x^2 + y^2 = 6 + 4xy$，结合$x^2 + y^2 \\ge -2xy$（由$(x+y)^2 \\ge 0$推导）：\n$$\n6 + 4xy \\ge -2xy \\implies xy \\ge -1\n$$\n\n使用三角换元：令$x = r\\cos\\theta$，$y = r\\sin\\theta$，代入原式：\n$$\nr^2(\\cos^2\\theta - 4\\cos\\theta\\sin\\theta + \\sin^2\\theta) = 6\n$$\n化简得：\n$$\nr^2(1 - 2\\sin2\\theta) = 6 \\implies r^2 = \\frac{6}{1 - 2\\sin2\\theta}\n$$\n\n因为$\\sin2\\theta \\in [-1,1]$，所以$1 - 2\\sin2\\theta \\in (0,3]$，于是：\n$$\nr^2 \\ge \\frac{6}{3} = 2\n$$\n即$x^2 + y^2 \\ge 2$，**选项C正确**。\n\n当$1 - 2\\sin2\\theta \\to 0^+$时，$r^2 \\to +\\infty$，故$x^2 + y^2$无上界，**选项D错误**。\n\n---\n\n✅ **正确选项：A、C**"
          }
        ]
      },
      {
        "id": "qb-1774949105888",
        "blocks": [
          {
            "id": "block-1774949105888",
            "type": "text",
            "content": "已知 $x>0, y>0$，$x+3y=x^2y^2$，则 $\\frac{3}{x}+\\frac{2}{y}$ 的最小值为（）"
          }
        ],
        "options": [
          "$2\\sqrt{2}$",
          "$\\sqrt{13}$",
          "$2\\sqrt{6}$",
          "$2\\sqrt{3}$"
        ],
        "correctOption": 3,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775020547767",
            "type": "image",
            "content": "/images/高中数学精编题库/不等式/69cca79bc9f0f.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949342066",
        "blocks": [
          {
            "id": "block-1774949342066",
            "type": "text",
            "content": "若函数 $f(x)=(e^{x+a}-e)(x-2b)\\geq 0$ 恒成立，且 $ab>0$，则下列结论中正确的有"
          }
        ],
        "options": [
          "$a^2+b^2$ 的最小值为 $\\frac{\\sqrt{5}}{5}$",
          "$\\log_a b$ 的最大值为 $-3$",
          "$\\frac{2}{a+1}+\\frac{4}{b}$ 的最小值为 $9$",
          "$(\\sqrt{3})^a + 3^b$ 的最小值为 $2\\sqrt[4]{3}$"
        ],
        "correctOptions": [
          1,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1775020071990",
            "type": "text",
            "content": "\n\n$a+2b=1$，$(a+1+2b)\\left(\\dfrac{1}{a+1}+\\dfrac{2}{b}\\right)\\geqslant 5+2\\sqrt{4}=9$\n\n<span class=\"text-red-600\">$ab>0\\Rightarrow a\\cdot\\dfrac{1-a}{2}>0\\Rightarrow a\\in(0,1)$</span>\n\n<span class=\"text-red-600\">取等条件</span>：$(a+1)^2=b^2=\\left(\\dfrac{1-a}{2}\\right)^2$，$a+1=\\dfrac{1-a}{2}$，$a=-\\dfrac{1}{3}$（舍去）\n\n"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775020022702",
            "type": "text",
            "content": "\n函数$f(x)=(e^{x+a}-e)(x-2b)\\geq0$恒成立，需满足：\n零点重合：$e^{x+a}-e=0$的解为$x=1-a$，$x-2b=0$的解为$x=2b$，故$1-a=2b$，即$a+2b=1$。\n符号一致性：当$a,b>0$时，$e^{x+a}-e$和$x-2b$在$x\\geq2b$时同号，满足非负性。\n\n选项分析\nA. $a^2 + b^2$的最小值为$\\dfrac{\\sqrt{5}}{5}$\n\n代入法：由$a=1-2b$，得$a^2 + b^2 = (1-2b)^2 + b^2 = 5b^2 -4b +1$。\n\n求导求极值：导数为$10b -4$，令导数为零得$b=\\dfrac{2}{5}$，对应$a=\\dfrac{1}{5}$。\n\n最小值计算：$a^2 + b^2 = \\left(\\dfrac{1}{5}\\right)^2 + \\left(\\dfrac{2}{5}\\right)^2 = \\dfrac{1}{5}$，即最小值为$\\dfrac{1}{5}$，而非$\\dfrac{\\sqrt{5}}{5}$。错误。\n\nB. $\\log_2(ab)$的最大值为$-3$\n\n代入法：由$a=1-2b$，得$ab = b(1-2b) = -2b^2 + b$。\n\n二次函数极值：当$b=\\dfrac{1}{4}$时，$ab$取得最大值$\\dfrac{1}{8}$。\n\n对数计算：$\\log_2\\left(\\dfrac{1}{8}\\right) = -3$。正确。\n\nC. $\\dfrac{2}{a+1} + \\dfrac{4}{b}$的最小值为$9$\n\n代入法：由$a=1-2b$，得$\\dfrac{2}{2-2b} + \\dfrac{4}{b} = \\dfrac{1}{1-b} + \\dfrac{4}{b}$。\n\n导数分析：求导后无解于$0 错误。\n\nD. $(\\sqrt{3})^a + 3^b$的最小值为$2\\sqrt[4]{3}$\n\n变量代换：令$t=3^b$，则表达式为$\\sqrt{3} \\cdot 3^{-b} + 3^b = \\dfrac{\\sqrt{3}}{t} + t$。\n\n导数求极值：导数为$-\\dfrac{\\sqrt{3}}{t^2} + 1$，令导数为零得$t=3^{1/4}$，最小值为$2 \\cdot 3^{1/4}$。正确。\n"
          }
        ]
      },
      {
        "id": "qb-1774949346273",
        "blocks": [
          {
            "id": "block-1774949346273",
            "type": "text",
            "content": "【2025·辽宁沈阳二模】已知 $x^2+9y^2=12$，$x>0, y>0$，则 $\\frac{x+2}{y+1}-3x$ 的最小值为（）"
          }
        ],
        "options": [
          "-6",
          "-2",
          "1",
          "-1"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775020357288",
            "type": "text",
            "content": "$\\dfrac{y+2}{y+1}-3x = \\dfrac{x+2-3xy-3x}{y+1} = \\dfrac{2-x(2+3y)}{y+1} $<span class=\"text-red-600\">$（往x^2+9y^2上靠）\\ge \\dfrac{2-\\dfrac{x^2+(3y+2)^2}{2}}{y+1} $</span>$= \\dfrac{2-\\dfrac{x^2+9y^2+12y+4}{2}}{y+1}$\n\n$= \\dfrac{-6(y+1)}{y+1} = -6$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775020903181",
            "type": "image",
            "content": "/images/高中数学精编题库/不等式/69ccaaef14adf.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949346415",
        "blocks": [
          {
            "id": "block-1774949346415",
            "type": "text",
            "content": "若 $x^2+xy+y^2=3$，且 $2x+y>0$，则 $\\frac{6-y^2}{2x+y}$ 的最小值是（）"
          }
        ],
        "options": [
          " $\\frac{2\\sqrt{6}}{3}$",
          "$\\frac{3\\sqrt{6}}{2}$",
          "$2\\sqrt{6}$",
          "$6\\sqrt{6}$"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775020665813",
            "type": "text",
            "content": "法一：$x = \\dfrac{\\sqrt{12-3y^2}-y}{2}$\n\n$\\dfrac{6-y^2}{2x+y} = \\dfrac{6-y^2}{\\sqrt{3}\\sqrt{4-y^2}}$\n\n法二：方程表示椭圆\n\n令$x = \\dfrac{\\sqrt{2}}{2}(x'+y')$\n\n$y = \\dfrac{\\sqrt{2}}{2}(x'-y')$\n\n$\\dfrac{y'^2}{6} + \\dfrac{x'^2}{2} = 1$\n\n所求$= \\dfrac{\\sqrt{2}\\left(6-\\dfrac{(x'-y')^2}{2}\\right)}{3x'+y'}$\n\n$\\begin{cases} x' = \\sqrt{6}\\cos\\theta \\\\ y' = \\sqrt{2}\\sin\\theta \\end{cases}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775020673263",
            "type": "text",
            "content": "### 解题步骤\n\n已知 $x^2+xy+y^2=3$ 且 $2x+y>0$，求 $\\frac{6-y^2}{2x+y}$ 的最小值。\n\n---\n\n#### 步骤1：变形已知条件\n$$\nx^2+xy+y^2=3\n$$\n两边同乘4：\n$$\n4x^2+4xy+4y^2=12\n$$\n配方得：\n$$\n(2x+y)^2 + 3y^2 = 12\n$$\n令 $t=2x+y$（$t>0$），则：\n$$\nt = \\sqrt{12-3y^2}\n$$\n\n---\n\n#### 步骤2：化简目标表达式\n目标式为：\n$$\n\\frac{6-y^2}{2x+y} = \\frac{6-y^2}{t}\n$$\n代入 $t=\\sqrt{12-3y^2}$：\n$$\n\\frac{6-y^2}{\\sqrt{12-3y^2}} = \\frac{6-y^2}{\\sqrt{3}\\cdot\\sqrt{4-y^2}}\n$$\n\n---\n\n#### 步骤3：换元法求最小值\n令 $u=\\sqrt{4-y^2}$（$u>0$），则 $y^2=4-u^2$，代入得：\n$$\n\\frac{6-(4-u^2)}{\\sqrt{3}u} = \\frac{2+u^2}{\\sqrt{3}u} = \\frac{1}{\\sqrt{3}}\\left(u+\\frac{2}{u}\\right)\n$$\n\n根据均值不等式：\n$$\nu+\\frac{2}{u} \\ge 2\\sqrt{u\\cdot\\frac{2}{u}} = 2\\sqrt{2}\n$$\n当且仅当 $u=\\frac{2}{u}$ 即 $u=\\sqrt{2}$ 时取等号。\n\n因此：\n$$\n\\frac{1}{\\sqrt{3}}\\left(u+\\frac{2}{u}\\right) \\ge \\frac{1}{\\sqrt{3}} \\cdot 2\\sqrt{2} = \\frac{2\\sqrt{6}}{3}\n$$\n\n---\n\n#### 步骤4：验证取等条件\n当 $u=\\sqrt{2}$ 时：\n$$\n\\sqrt{4-y^2}=\\sqrt{2} \\implies y^2=2 \\implies y=\\pm\\sqrt{2}\n$$\n- 若 $y=\\sqrt{2}$，则 $t=\\sqrt{6}$，$x=\\frac{\\sqrt{6}-\\sqrt{2}}{2}$，满足 $2x+y>0$。\n- 若 $y=-\\sqrt{2}$，则 $t=\\sqrt{6}$，$x=\\frac{\\sqrt{6}+\\sqrt{2}}{2}$，也满足 $2x+y>0$。\n\n---\n\n**答案：$\\boldsymbol{\\frac{2\\sqrt{6}}{3}}$（选项A）**"
          }
        ]
      }
    ]
  },
  {
    "id": "trigonometry",
    "title": "三角函数",
    "icon": "∠",
    "questions": [
      {
        "id": "qb-1774949723967",
        "blocks": [
          {
            "id": "block-1774949723967",
            "type": "text",
            "content": "在锐角$\\triangle ABC$中，角$A,B,C$的对边分别为$a,b,c$，$\\triangle ABC$的面积为$S$，满足$2S=a^2-(b-c)^2$，若$a^2+b^2=2tS$，则$t$的最小值为______"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775021843939",
            "type": "text",
            "content": "解答：\n答：$t$的最小值为$\\boxed{\\dfrac{5\\sqrt{2} - 3}{2}}$。\n\n----------\n\n解析：\n本题考查三角形面积公式、余弦定理及函数最值的求解。解题核心在于将已知条件转化为关于边长和角度的关系式，再通过代数变形和不等式求解最小值。关键在于：\n利用面积公式和余弦定理，将条件$2S = a^2 - (b - c)^2$转化为关于角$A$的三角函数方程，求出$\\cos A$的值；\n引入变量替换，将$a^2 + b^2 = 2tS$中的变量统一为关于$b$和$c$的表达式；\n应用均值不等式或导数法，求出$t$的最小值。\n\n步骤1：处理条件$2S = a^2 - (b - c)^2$\n\n展开并整理条件：\n$2S = a^2 - (b^2 - 2bc + c^2) = a^2 - b^2 - c^2 + 2bc$\n\n根据余弦定理$a^2 = b^2 + c^2 - 2bc \\cos A$，代入上式：\n\n$2S = (b^2 + c^2 - 2bc \\cos A) - b^2 - c^2 + 2bc = 2bc(1 - \\cos A)$\n\n结合面积公式$S = \\frac{1}{2} bc \\sin A$，联立得：\n\n$\\sin A = 2(1 - \\cos A)$\n\n解得$\\cos A = \\frac{3}{5}$，$\\sin A = \\frac{4}{5}$。\n\n步骤2：处理条件$a^2 + b^2 = 2tS$\n\n将$S = \\frac{2}{5} bc$代入条件：\n\n$a^2 + b^2 = \\frac{4t}{5} bc$\n\n利用余弦定理$a^2 = b^2 + c^2 - \\frac{6}{5} bc$，代入上式：\n\n$2b^2 + c^2 - \\frac{6}{5} bc = \\frac{4t}{5} bc$\n\n整理得：\n$t = \\frac{10b^2 + 5c^2 - 6bc}{4bc}$\n\n步骤3：求$t$的最小值\n\n设$k = \\frac{c}{b}$，则$t = \\frac{5k^2 - 6k + 10}{4k}$。对$k$求导并解得极值点$k = \\sqrt{2}$，代入得：\n\n$t_{\\text{最小}} = \\frac{5\\sqrt{2} - 3}{2}$\n"
          }
        ]
      },
      {
        "id": "qb-1774949745784",
        "blocks": [
          {
            "id": "block-1774949745784",
            "type": "text",
            "content": "$\\sin(\\alpha-20^\\circ)=\\frac{\\sin20^\\circ}{\\tan20^\\circ-\\sqrt{3}}$，则$\\cos(2\\alpha+140^\\circ)=$____"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775021976985",
            "type": "text",
            "content": "切化弦：\n$\\sin(\\alpha-20^\\circ)=\\frac{\\sin20^\\circ}{\\frac{\\sin20^\\circ}{\\cos20^\\circ}-\\sqrt{3}}=\\frac{\\frac{1}{2}\\sin40^\\circ}{\\sin20^\\circ-\\sqrt{3}\\cos20^\\circ}=\\frac{\\frac{1}{2}\\sin40^\\circ}{2\\sin(-40^\\circ)}=-\\frac{1}{4}$\n\n$\\cos(2\\alpha+140^\\circ)=-\\cos(2\\alpha-40^\\circ)=2\\sin^2(\\alpha-20^\\circ)-1=-\\frac{7}{8}$\n"
          }
        ]
      },
      {
        "id": "qb-1774949746052",
        "blocks": [
          {
            "id": "block-1774949746052",
            "type": "text",
            "content": "在$\\triangle ABC$中，角$A,B,C$的对边分别为$a,b,c$，且$c-2b\\sin C=0$，$B\\in(0,\\frac{\\pi}{2})$，$b=1$，$a=\\sqrt{3}$，则$\\triangle ABC$的面积为______"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775021990122",
            "type": "text",
            "content": "解答：\n解：因为$c-2b\\sin C=0$，即$\\sin C=2\\sin B\\sin C$，\n因为$\\sin C \\gt 0$，\n所以$\\sin B=\\frac{1}{2}$，\n因为$B\\in (0$，$\\frac{\\pi }{2})$，\n所以$B=\\frac{\\pi }{6}$，\n因为$a=\\sqrt{3}$，\n由正弦定理得，$\\frac{\\sqrt{3}}{sinA}=\\frac{1}{sin30°}$，\n所以$\\sin A=\\frac{\\sqrt{3}}{2}$，\n所以$A=\\frac{\\pi }{3}$或$A=\\frac{2\\pi }{3}$，\n当$A=\\frac{\\pi }{3}$时，$B=\\frac{\\pi }{6}$，$C=\\frac{\\pi }{2}$，此时$\\triangle ABC$的面积$S=\\frac{1}{2}ab=\\frac{1}{2}\\times 1\\times \\sqrt{3}=\\frac{\\sqrt{3}}{2}$；\n当$A=\\frac{2\\pi }{3}$时，$B=\\frac{\\pi }{6}$，$C=\\frac{\\pi }{6}$，$b=c=1$，此时$\\triangle ABC$的面积$S=\\frac{1}{2}bcsinA=\\frac{1}{2}\\times 1\\times 1\\times \\frac{\\sqrt{3}}{2}=\\frac{\\sqrt{3}}{4}$.\n故答案为：$\\frac{\\sqrt{3}}{2}$或$\\frac{\\sqrt{3}}{4}$.\n\n----------\n\n解析：\n由已知结合正弦定理进行化简可求$B$，然后求出$A$，结合三角形的面积公式即可求解.\n"
          }
        ]
      },
      {
        "id": "qb-1774949746151",
        "blocks": [
          {
            "id": "block-1774949746151",
            "type": "text",
            "content": "已知$\\triangle ABC$的内角$A,B,C$所对的边分别为$a,b,c$，下列说法中正确的是（）"
          }
        ],
        "options": [
          " 若$a\\cos A=b\\cos B$，则$\\triangle ABC$一定是等腰三角形",
          "若$\\cos(A-B)\\cdot\\cos(B-C)=1$，则$\\triangle ABC$一定是等边三角形",
          "若$a\\cos C+c\\cos A=c$，则$\\triangle ABC$一定是等腰三角形",
          "若$\\cos(2B+C)+\\cos C>0$，则$\\triangle ABC$一定是钝角三角形"
        ],
        "correctOptions": [
          1,
          2,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1775022037054",
            "type": "text",
            "content": "A：$\\sin2A=\\sin2B$，$A+B=\\frac{\\pi}{2}$或$A=B$。\n\nB：$\\cos(A-B)\\cos(B-C)=1\\Leftrightarrow\\begin{cases}\\cos(A-B)=1\\\\\\cos(B-C)=1\\end{cases}\\Leftrightarrow\\begin{cases}A-B=0\\\\B-C=0\\end{cases}$，$A=B=C$\n\nC：$\\sin B=\\sin C$，$B=C$\n\nD：$\\cos(2B+C)>\\cos C$\n\n$0<2B+C<\\pi$或$2B+2C>\\pi\\Rightarrow C<\\frac{\\pi}{2}$则$B>\\frac{\\pi}{2}$,\n$C>\\frac{\\pi}{2}$则$B<\\frac{\\pi}{2}$\n\nBCD"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775022219208",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/69ccafdfeae6e.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949746341",
        "blocks": [
          {
            "id": "block-1774949746341",
            "type": "text",
            "content": "在$\\triangle ABC$中，设角$A,B,C$所对的边分别是$a,b,c$，且满足$\\sqrt{3}b\\sin C+b\\cos C=a+c$.\n\n(1) 求角$B$\n\n(2) 若$b=\\sqrt{3}$，求$\\triangle ABC$面积的最大值；\n\n(3)求$\\frac{ac-ab-bc}{b^2}$的取值范围.\n"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1775029075481",
            "type": "text",
            "content": "$\\dfrac{ac - ab - bc}{b^2} = \\dfrac{ac}{b^2} - \\dfrac{a + c}{b}$\n\n法一：化成角\n\n$= \\dfrac{t^2 - 3t - 1}{3}$\n\n$t = \\dfrac{2}{\\sqrt{3}}\\left[\\sin A + \\sin\\left(A + \\dfrac{\\pi}{3}\\right)\\right]$\n\n$= 2\\sin\\left(A + \\dfrac{\\pi}{6}\\right) \\quad A \\in \\left(0, \\dfrac{2\\pi}{3}\\right)$\n\n法二：<span class=\"text-red-600\">$a^2 + c^2 - b^2 = 2ac\\cos B = ac$</span>\n\n\n<span class=\"text-red-600\">$\\dfrac{a^2 + c^2}{b^2} - 1 = \\dfrac{ac}{b^2}$</span>\n\n<span class=\"text-red-600\">$\\dfrac{(a + c)^2 - 2ac}{b^2} - 1 = \\dfrac{ac}{b^2}$</span>\n\n<span class=\"text-red-600\">$\\dfrac{ac}{b^2} = \\dfrac{\\left(\\dfrac{a + c}{b}\\right)^2 - 1}{3}$</span>\n"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775028113056",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949746341-1.jpg",
            "width": 500
          },
          {
            "id": "sol-1775028119013",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949746341-2.jpg",
            "width": 600
          }
        ]
      },
      {
        "id": "qb-1774949746428",
        "blocks": [
          {
            "id": "block-1774949746428",
            "type": "text",
            "content": "$\\triangle ABC$中，$\\angle BAC=60^\\circ$，$\\angle BAC$的平分线与$BC$交于$D$，$AD=1$，$BC=\\sqrt{6}$，则$\\triangle ABC$的面积为______\n"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775028188202",
            "type": "text",
            "content": "设$AB = a$，$AC = b$，根据题意：\n角平分线长度公式：\n$AD = \\dfrac{2ab \\cos(30^\\circ)}{a + b} = 1 \\implies \\dfrac{2ab \\cdot \\dfrac{\\sqrt{3}}{2}}{a + b} = 1 \\implies ab\\sqrt{3} = a + b \\quad (1)$\n\n余弦定理：\n$BC^2 = a^2 + b^2 - 2ab \\cos 60^\\circ \\implies (\\sqrt{6})^2 = a^2 + b^2 - ab \\implies a^2 + b^2 - ab = 6 \\quad (2)$\n\n联立方程：\n设$a + b = s$，$ab = p$，则方程(1)变为$s = p\\sqrt{3}$。\n\n方程(2)变形为$s^2 - 3p = 6$。\n\n代入$s = p\\sqrt{3}$得：\n$(p\\sqrt{3})^2 - 3p = 6 \\implies 3p^2 - 3p - 6 = 0 \\implies p^2 - p - 2 = 0$\n解得$p = 2$（舍去负根），即$ab = 2$。\n\n计算面积：\n$S_{\\triangle ABC} = \\dfrac{1}{2}ab \\sin 60^\\circ = \\dfrac{1}{2} \\cdot 2 \\cdot \\dfrac{\\sqrt{3}}{2} = \\dfrac{\\sqrt{3}}{2}$"
          }
        ]
      },
      {
        "id": "qb-1774949746727",
        "blocks": [
          {
            "id": "block-1774949746727",
            "type": "text",
            "content": "在圆$O$的内接四边形$ABCD$中，$AB=2$，$BC=6$，$CD=DA=4$，则（）"
          }
        ],
        "options": [
          "$BD=2\\sqrt{7}$",
          "四边形$ABCD$的面积为$8\\sqrt{3}$",
          "$\\overrightarrow{AO}\\cdot\\overrightarrow{BD}=12$",
          "$\\overrightarrow{AC}\\cdot\\overrightarrow{BD}=16$"
        ],
        "correctOptions": [
          0,
          1
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1775028474728",
            "type": "text",
            "content": "C.<span class=\"text-red-600\">$\\overrightarrow{AO}\\cdot \\overrightarrow{AB}=\\frac{1}{2}AB^2$</span>\n\n<span class=\"text-red-600\">$\\overrightarrow{AO}\\cdot \\overrightarrow{AD}=\\frac{1}{2}AD^2$</span>\n\n$\\overrightarrow{AO}\\cdot \\overrightarrow{BD}=\\frac{1}{2}(AD^2-AB^2)=6$\n\nD.$\\overrightarrow{AC}\\cdot \\overrightarrow{BD}=(\\overrightarrow{AD}+\\overrightarrow{DC})\\cdot\\overrightarrow{BD}$"
          },
          {
            "id": "hint-1775029378667",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/69cccbd17a5a7.webp",
            "width": 200
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775028282569",
            "type": "text",
            "content": "解答：\nAB\n\n----------\n\n解析：\n本题考查圆内接四边形的性质、余弦定理、三角形面积公式以及向量的数量积运算。\n利用圆内接四边形对角互补，结合余弦定理求出$BD$的长度，进而求出四边形$ABCD$的面积，再根据向量的运算法则计算$\\overrightarrow{AO}\\cdot \\overrightarrow{BD}$与$\\overrightarrow{AC}\\cdot \\overrightarrow{BD}$。\n1.求$BD$的长度\n\n因为四边形$ABCD$是圆$O$的内接四边形，所以$\\angle A + \\angle C = \\pi$，即$\\cos A = -\\cos C$。\n\n在$\\triangle ABD$中，根据余弦定理$BD^{2}=AB^{2}+AD^{2}-2AB\\cdot AD\\cos A$，将$AB = 2$，$AD = 4$代入可得$BD^{2}=2^{2}+4^{2}-2\\times 2\\times 4\\cos A = 20 - 16\\cos A$。\n\n在$\\triangle BCD$中，根据余弦定理$BD^{2}=CB^{2}+CD^{2}-2CB\\cdot CD\\cos C$，将$CB = 6$，$CD = 4$代入可得$BD^{2}=6^{2}+4^{2}-2\\times 6\\times 4\\cos C = 52 - 48\\cos C$。\n\n由于$\\cos A = -\\cos C$，所以$20 - 16\\cos A = 52 + 48\\cos A$，移项可得$64\\cos A = -32$，解得$\\cos A = -\\frac{1}{2}$。\n\n因为$A\\in(0,\\pi)$，所以$A = \\frac{2\\pi}{3}$。\n\n将$\\cos A = -\\frac{1}{2}$代入$BD^{2}=20 - 16\\cos A$，可得$BD^{2}=20 - 16\\times(-\\frac{1}{2}) = 28$，则$BD = 2\\sqrt{7}$，故A选项正确。\n\n2.求四边形$ABCD$的面积\n\n四边形$ABCD$的面积$S = S_{\\triangle ABD} + S_{\\triangle BCD}$。\n\n根据三角形面积公式$S = \\frac{1}{2}ab\\sin C$，可得$S_{\\triangle ABD}=\\frac{1}{2}AB\\cdot AD\\sin A=\\frac{1}{2}\\times 2\\times 4\\times\\sin\\frac{2\\pi}{3}=4\\times\\frac{\\sqrt{3}}{2}=2\\sqrt{3}$。\n\n因为$\\cos A = -\\frac{1}{2}$，$A + \\angle C = \\pi$，所以$\\cos C = \\frac{1}{2}$，又$C\\in(0,\\pi)$，则$C = \\frac{\\pi}{3}$，那么$S_{\\triangle BCD}=\\frac{1}{2}CB\\cdot CD\\sin C=\\frac{1}{2}\\times 6\\times 4\\times\\sin\\frac{\\pi}{3}=12\\times\\frac{\\sqrt{3}}{2}=6\\sqrt{3}$。\n\n所以$S = S_{\\triangle ABD} + S_{\\triangle BCD}=2\\sqrt{3} + 6\\sqrt{3}=8\\sqrt{3}$，故B选项正确。\n\n3.求$\\overrightarrow{AO}\\cdot \\overrightarrow{BD}$的值\n\n取$BD$的中点$M$，则$\\overrightarrow{AO}=\\overrightarrow{AM}+\\overrightarrow{MO}$，所以$\\overrightarrow{AO}\\cdot \\overrightarrow{BD}=(\\overrightarrow{AM}+\\overrightarrow{MO})\\cdot \\overrightarrow{BD}=\\overrightarrow{AM}\\cdot \\overrightarrow{BD}+\\overrightarrow{MO}\\cdot \\overrightarrow{BD}$。\n\n因为$M$是$BD$的中点，所以$\\overrightarrow{MO}\\cdot \\overrightarrow{BD}=0$，则$\\overrightarrow{AO}\\cdot \\overrightarrow{BD}=\\overrightarrow{AM}\\cdot \\overrightarrow{BD}$。\n\n在$\\triangle ABD$中，$\\cos\\angle ABD=\\frac{AB^{2}+BD^{2}-AD^{2}}{2\\cdot AB\\cdot BD}=\\frac{2^{2}+(2\\sqrt{7})^{2}-4^{2}}{2\\times 2\\times 2\\sqrt{7}}=\\frac{2\\sqrt{7}}{7}$。\n$\\overrightarrow{AM}\\cdot \\overrightarrow{BD}=\\frac{1}{2}(\\overrightarrow{AB}+\\overrightarrow{AD})\\cdot (\\overrightarrow{AD}-\\overrightarrow{AB})=\\frac{1}{2}(\\overrightarrow{AD}^{2}-\\overrightarrow{AB}^{2})=\\frac{1}{2}(4^{2}-2^{2}) = 6$，故C选项错误。\n\n4.求$\\overrightarrow{AC}\\cdot \\overrightarrow{BD}$的值\n\n$\\overrightarrow{AC}\\cdot \\overrightarrow{BD}=(\\overrightarrow{AB}+\\overrightarrow{BC})\\cdot (\\overrightarrow{AD}-\\overrightarrow{AB})=\\overrightarrow{AB}\\cdot \\overrightarrow{AD}-\\overrightarrow{AB}^{2}+\\overrightarrow{BC}\\cdot \\overrightarrow{AD}-\\overrightarrow{BC}\\cdot \\overrightarrow{AB}$。\n\n$\\overrightarrow{AB}\\cdot \\overrightarrow{AD}=\\vert\\overrightarrow{AB}\\vert\\vert\\overrightarrow{AD}\\vert\\cos A = 2\\times 4\\times(-\\frac{1}{2}) = -4$，$\\overrightarrow{AB}^{2}=2^{2}=4$。\n\n在$\\triangle BCD$中，$\\cos\\angle CBD=\\frac{CB^{2}+BD^{2}-CD^{2}}{2\\cdot CB\\cdot BD}=\\frac{6^{2}+(2\\sqrt{7})^{2}-4^{2}}{2\\times 6\\times 2\\sqrt{7}}=\\frac{2\\sqrt{7}}{7}$，$\\overrightarrow{BC}\\cdot \\overrightarrow{AD}=\\vert\\overrightarrow{BC}\\vert\\vert\\overrightarrow{AD}\\vert\\cos(\\pi - \\angle CBD)=6\\times 4\\times(-\\frac{2\\sqrt{7}}{7})=-\\frac{48\\sqrt{7}}{7}$，$\\overrightarrow{BC}\\cdot \\overrightarrow{AB}=\\vert\\overrightarrow{BC}\\vert\\vert\\overrightarrow{AB}\\vert\\cos(\\pi - \\angle ABC)=6\\times 2\\times(-\\frac{2\\sqrt{7}}{7})=-\\frac{24\\sqrt{7}}{7}$。\n\n则$\\overrightarrow{AC}\\cdot \\overrightarrow{BD}=-4 - 4-\\frac{48\\sqrt{7}}{7}+\\frac{24\\sqrt{7}}{7}=-8-\\frac{24\\sqrt{7}}{7}\\neq16$，故D选项错误。\n\n综上，答案是AB选项。\n"
          }
        , { "id": "sol-qb-1774949746727-x1", "type": "image", "content": "/images/高中数学精编题库/三角函数/qb-1774949746727-1.jpg" }]
      },
      {
        "id": "qb-1774949746938",
        "blocks": [
          {
            "id": "block-1774949746938",
            "type": "text",
            "content": "已知函数$f(x)=\\cos3x-\\cos2x$，$x\\in(0,\\pi)$，若$f(x)$有两个零点$x_1,x_2(x_1<x_2)$，则$\\cos x_1\\cos x_2$的值为（）"
          }
        ],
        "options": [
          "$\\frac{1}{4}$",
          "$-\\frac{1}{4}$",
          "$\\frac{1}{2}$",
          "$-\\frac{1}{2}$"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775029302730",
            "type": "text",
            "content": "<span class=\"text-red-600\">和差化积 $\\cos(\\alpha+\\beta) - \\cos(\\alpha-\\beta) = -2\\sin\\alpha\\sin\\beta$</span>\n\n$\\cos X - \\cos Y = -2\\sin\\dfrac{X+Y}{2}\\sin\\dfrac{X-Y}{2}$\n\n$\\therefore \\cos 3x - \\cos 2x = -2\\sin\\dfrac{5x}{2}\\sin\\dfrac{x}{2} = 0$\n\n$x = \\dfrac{2}{5}\\pi / \\dfrac{4}{5}\\pi$\n\n$\\cos\\dfrac{2\\pi}{5} \\cdot \\cos\\dfrac{4\\pi}{5} = $<span class=\"text-red-600\">$\\dfrac{\\sin\\dfrac{2\\pi}{5}\\cos\\dfrac{2\\pi}{5}\\cos\\dfrac{4\\pi}{5}}{\\sin\\dfrac{2\\pi}{5}} $</span>$= \\dfrac{\\sin\\dfrac{8\\pi}{5}}{4\\sin\\dfrac{2\\pi}{5}} = -\\dfrac{1}{4}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775028137144",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949746938-1.jpg",
            "width": 500
          },
          {
            "id": "sol-1775028143005",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949746938-2.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949747023",
        "blocks": [
          {
            "id": "block-1774949747023",
            "type": "text",
            "content": "$f(x)=\\cos(\\omega x+\\varphi)(\\omega>0,-\\frac{\\pi}{2}<\\varphi<0)$，$|f(-\\frac{\\pi}{6})|=1$，$|f(\\frac{\\pi}{6})|=0$,$f(x)$在$(\\frac{\\pi}{6},\\frac{5\\pi}{24})$上单调，则$\\omega$的最大值为"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774950185206",
            "type": "text",
            "content": "$\\frac{5\\pi}{24}-\\frac{\\pi}{6}\\geq\\frac{T}{4}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1774950174455",
            "type": "text",
            "content": "解：函数 $f(x) = \\cos(\\omega x + \\varphi) (\\omega > 0, -\\dfrac{\\pi}{2} < \\varphi < 0)$，\n$|f(-\\dfrac{\\pi}{6})| = 1$，$f(\\dfrac{\\pi}{6}) = 0$，\n\n由题意知 $\\dfrac{\\pi}{6} - (-\\dfrac{\\pi}{6}) = (2k + 1) \\times \\dfrac{T}{4} (k \\in Z)$，\n则 $T = \\dfrac{4\\pi}{3(2k+1)}$，\n\n因为 $T = \\dfrac{2\\pi}{|\\omega|}$，\n所以 $\\omega = \\dfrac{3(2k+1)}{2}$，\n\n又因为 $f(x)$ 在区间 $(\\dfrac{\\pi}{6}, \\dfrac{5\\pi}{24})$ 上单调，\n所以 $\\dfrac{5\\pi}{24} - \\dfrac{\\pi}{6} \\le \\dfrac{T}{4}$，解得 $0 < \\omega \\le 12$，\n\n则 $\\omega$ 的最大值为 $\\dfrac{21}{2}$。\n\n故答案为：$\\dfrac{21}{2}$。"
          }
        , { "id": "sol-qb-1774949747023-x1", "type": "image", "content": "/images/高中数学精编题库/三角函数/qb-1774949747023-1.jpg" }]
      },
      {
        "id": "qb-1774949747132",
        "blocks": [
          {
            "id": "block-1774949747132",
            "type": "text",
            "content": "已知集合$M=\\{\\theta_1,\\theta_2,\\dots,\\theta_n\\},n\\in\\mathbf{N}^*$，设函数\n$f_n(x)=\\sin^2(x-\\theta_1)+\\sin^2(x-\\theta_2)+\\dots+\\sin^2(x-\\theta_n)$\n\n(1) 当$M=\\{0,\\frac{\\pi}{2}\\}$和$\\{\\frac{\\pi}{4},\\frac{\\pi}{2}\\}$时，分别判断函数$f_2(x)$是否是常数函数，并说明理由；\n\n(2) 已知$M\\subseteq\\{\\theta|\\theta=\\frac{k\\pi}{12},k\\in\\mathbf{N},k\\leq12\\}$，求函数$f_3(x)$是常数函数的概率；\n\n(3) 写出函数$f_n(x)(n\\geq2)$是常数函数的一个充分条件，并说明理由。"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775029489825",
            "type": "text",
            "content": "解答：\n解：(1)证明：当$M=\\{0$，$\\frac{\\pi }{2}\\}$时，$f_{2}(x)=\\sin ^{2}x+\\sin ^{2}(x-\\frac{\\pi }{2})=\\sin ^{2}x+\\cos ^{2}x=1$，此时$f_{2}(x)$是常数函数；\n\n(2)设$M=\\{\\theta _{1}$，$\\theta _{2}$，$\\theta _{3}\\}$，\n\n不妨令$\\theta _{1} \\gt \\theta _{2} \\gt \\theta _{3}$，则$f_{3}(x)=\\sin ^{2}(x-\\theta _{1})+\\sin ^{2}(x-\\theta _{2})+\\sin ^{2}(x-\\theta _{3})$\n\n$=\\frac{3}{2}-\\frac{1}{2}[\\cos (2x-2\\theta _{1})+\\cos (2x-2\\theta _{2})+\\cos (2x-2\\theta _{3})]$\n\n$=\\frac{3}{2}-\\frac{1}{2}[(\\cos 2\\theta _{1}+\\cos 2\\theta _{2}+\\cos 2\\theta _{3})\\cos 2x+(\\sin 2\\theta _{1}+\\sin 2\\theta _{2}+\\sin 2\\theta _{3})\\sin 2x]$.\n\n若函数$f_{3}(x)$是常数函数，则$\\left\\{\\begin{array}{l}cos2{\\theta }_{1}+cos2{\\theta }_{2}+cos2{\\theta }_{3}=0，\\\\ sin2{\\theta }_{1}+sin2{\\theta }_{2}+sin2{\\theta }_{3}=0，\\end{array}\\right.$\n\n则${(cos{2\\theta }_{1}+cos{2\\theta }_{2})}^{2}+{(sin{2\\theta }_{1}+sin{2\\theta }_{2})}^{2}=1$，\n\n得$2+2\\cos (2\\theta _{1}-2\\theta _{2})=1$，所以$\\cos (2\\theta _{1}-2\\theta _{2})=-\\frac{1}{2}$，\n\n得$2\\theta _{1}-2\\theta _{2}=\\frac{2\\pi }{3}+2k_{1}\\pi $或$\\frac{4\\pi }{3}+2k_{1}\\pi $，$k_{1}\\in N$，\n\n所以$\\theta _{1}-\\theta _{2}=\\frac{\\pi }{3}+k_{1}\\pi $或$\\frac{2\\pi }{3}+k_{1}\\pi $，$k_{1}\\in N$，\n\n同理$\\theta _{1}-\\theta _{3}=\\frac{\\pi }{3}+k_{2}\\pi $或$\\frac{2\\pi }{3}+k_{2}\\pi $，$k_{2}\\in N$，\n\n$\\theta _{2}-\\theta _{3}=\\frac{\\pi }{3}+k_{3}\\pi $或$\\frac{2\\pi }{3}+k_{3}\\pi $，$k_{3}\\in N$，\n\n则$\\left\\{\\begin{array}{l}\\theta _1-\\theta _2=\\frac{\\pi }{3}+k_1\\pi ，k_1\\in N，\\\\ \\theta _1-\\theta _3=\\frac{2\\pi }{3}+k_2\\pi ，k_2\\in N，\\end{array}\\right.$\n\n①满足①的集合$M$有$\\{0$，$\\frac{\\pi }{3}$，$\\frac{2\\pi }{3}\\}$，$\\{\\frac{\\pi }{3}$，$\\frac{2\\pi }{3}$，$\\pi \\}$，共$2$个.\n\n(3)不妨令$\\theta _{1} \\gt \\theta _{2} \\gt \\cdots\\ \\ \\gt \\theta _{n}$，\n\n因为$f_2(x)=sin^2(x-\\theta _1)+sin^2(x-\\theta _2)$$=1-\\frac{1}{2}[cos(2x-2\\theta _1)+cos(2x-2\\theta _2)]$\n\n$=1-\\frac{1}{2}[(cos2{\\theta }_{1}+cos2{\\theta }_{2})cos2x+(sin2{\\theta }_{1}+sin2{\\theta }_{2})sin2x]$，\n\n若函数$f_{2}(x)$是常数函数，则$\\left\\{\\begin{array}{l}cos2\\theta _1+cos2\\theta _2=0，\\\\ sin2\\theta _1+sin2\\theta _2=0，\\end{array}\\right.$得$2+2\\cos (2\\theta _{1}-2\\theta _{2})=0$，\n\n所以$\\cos (2\\theta _{1}-2\\theta _{2})=-1$，得$2\\theta _{1}-2\\theta _{2}=\\pi +2k\\pi $，$k\\in N$，\n\n所以$\\theta _{1}-\\theta _{2}=\\frac{\\pi }{2}+k\\pi $，$k\\in N$，\n\n①当$n$为偶数时，$f_{n}(x)$可以拆分成$\\frac{n}{2}$组两项$[\\sin ^{2}(x-\\theta _{i-1})+\\sin ^{2}(x-\\theta _{i})](i=2k$，$k\\in \\{1$，$2$，$\\ldots $，$\\frac{n}{2}\\})$的和，每一组为定值时，$f_{n}(x)$也为定值，\n\n所以函数$f_{n}(x)$是常数函数的一个充分条件可以是$M=\\{\\theta _{i}|\\theta _{i}=\\frac{(i-1)\\pi }{2}$，$1\\leqslant i\\leqslant n$，$i\\in N^{*}\\}$.\n\n②当$n$为奇数时，$f_{n}(x)$可以拆分成$1$组三项$[\\sin ^{2}(x-\\theta _{1})+\\sin ^{2}(x-\\theta _{2})+\\sin ^{2}(x-\\theta _{3})]$的和与$\\frac{n-3}{2}$组两项$[\\sin ^{2}(x-\\theta _{i})+\\sin ^{2}(x-\\theta _{i+1})](i=2k$，\n\n$k\\in \\{2$，$\\ldots $，$\\frac{n-1}{2}\\})$的和，每一组为定值时，$f_{n}(x)$也为定值，\n\n所以当$n$为奇数时，函数$f_{n}(x)$是常数函数的一个充分条件可以是$M=\\{{\\theta }_{i}|{\\theta }_{i}=\\left\\{\\begin{array}{l}\\frac{(i-1)\\pi }{3}，1\\leqslant i\\leqslant 3，i\\in {N}^{*}\\\\ \\frac{2\\pi }{3}+\\frac{(i-3)\\pi }{2}，4\\leqslant i\\leqslant n，i\\in {N}^{*}\\end{array}\\right.$.\n\n----------\n\n解析：\n(1)$M=\\{0$，$\\frac{\\pi }{2}\\}$时，$f_{2}(x)=\\sin ^{2}x+\\sin ^{2}(x-\\frac{\\pi }{2})=1$，得出$f_{2}(x)$是常数函数；\n\n(2)设$M=\\{\\theta _{1}$，$\\theta _{2}$，$\\theta _{3}\\}$，不妨令$\\theta _{1} \\gt \\theta _{2} \\gt \\theta _{3}$，得出$f\\left(x\\right)$的解析式，由函数$f_{3}(x)$是常数函数，得出满足$M$的集合.\n\n(3)不妨令$\\theta _{1} \\gt \\theta _{2} \\gt \\cdots\\ \\ \\gt \\theta _{n}$，由函数$f_{2}(x)$是常数函数，得$\\theta _{1}-\\theta _{2}$的解析式，由此$f_{n}(x)$是常数函数的一个充分条件.\n"
          }
        , { "id": "sol-qb-1774949747132-x1", "type": "image", "content": "/images/高中数学精编题库/三角函数/qb-1774949747132-1.jpg" }, { "id": "sol-qb-1774949747132-x2", "type": "image", "content": "/images/高中数学精编题库/三角函数/qb-1774949747132-2.jpg" }, { "id": "sol-qb-1774949747132-x3", "type": "image", "content": "/images/高中数学精编题库/三角函数/qb-1774949747132-3.jpg" }]
      },
      {
        "id": "qb-1774949747231",
        "blocks": [
          {
            "id": "block-1774949747231",
            "type": "text",
            "content": "托勒密定理：圆的内接凸四边形中，两条对角线长的乘积等于两组对边长的乘积之和。已知凸四边形$ABCD$是圆$O$的内接四边形，且$AC=\\sqrt{3}BD$，$\\angle ADC=2\\angle BAD$。若$AB\\cdot CD+BC\\cdot AD=4\\sqrt{3}$，则\n(1) 圆$O$的半径是______；\n(2) 四边形$ABCD$面积的取值范围是______"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775049701243",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949747231-1.jpg",
            "width": 500
          },
          {
            "id": "sol-1775049718703",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949747231-2.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949747334",
        "blocks": [
          {
            "id": "block-1774949747334",
            "type": "text",
            "content": "已知函数$f(x)=2\\sin(2x+\\frac{\\pi}{3})$，则"
          }
        ],
        "options": [
          "$f(x)$在区间$[1,3]$上单调递减",
          "$f(x)$的图象的一条对称轴为直线$x=\\frac{7\\pi}{12}$",
          "线段$y=2(x\\in[0,4])$与$f(x)$的图象围成的图形面积为$\\pi$",
          "$f(x)$在区间$[0,6\\pi]$上的零点之和为$37\\pi$"
        ],
        "correctOptions": [
          1,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1775049815007",
            "type": "text",
            "content": "D.$2x+\\frac{\\pi}{3}=k\\pi,x=-\\frac{\\pi}{6}+\\frac{k\\pi}{2}$\n\n$x_1=\\frac{\\pi}{3},x_{12}=\\frac{35\\pi}{6}$\n\n$\\Sigma x=\\frac{12(\\frac{\\pi}{3}+\\frac{35}{6}\\pi)}{2}=37\\pi$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775049773776",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949747334-1.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949747427",
        "blocks": [
          {
            "id": "block-1774949747427",
            "type": "text",
            "content": "在$\\triangle ABC$中，内角$A,B,C$所对的边分别为$a,b,c$，若$2\\sqrt{3}\\sin A\\sin B\\sin C=3\\sin^2B+3\\sin^2C-\\sin^2A$，则$\\frac{b}{a}=$（）"
          }
        ],
        "options": [
          "$\\frac{1}{2}$",
          "$\\frac{\\sqrt{3}}{3}$",
          "$\\frac{\\sqrt{2}}{2}$",
          "$2$"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775050040335",
            "type": "text",
            "content": "$2\\sqrt{3}bc\\sin A = 3b^2+3c^2-a^2 = 2bc\\cos A + 2(b^2+c^2)$\n\n$2bc\\sin\\left(A-\\frac{\\pi}{6}\\right) = b^2+c^2 $<span class=\"text-red-600\">$\\ge 2bc$\n</span>\n\n$\\sin\\left(A-\\frac{\\pi}{6}\\right) \\ge 1 $<span class=\"text-red-600\">$\\quad A = \\frac{2\\pi}{3}$</span>"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775049762806",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/69cd1b7ea3915.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949747709",
        "blocks": [
          {
            "id": "block-1774949747709",
            "type": "text",
            "content": "【2025·武汉二调】如图，$\\triangle AOD$与$\\triangle BOC$存在对顶角$\\angle AOD=\\angle BOC=\\frac{\\pi}{4}$，$AC=2$，$BD=2\\sqrt{2}$，且$BC=AD$。\n(1) 证明：$O$为$BD$中点；\n\n(2) 若$\\sqrt{5}\\sin2A+\\cos B=\\sqrt{5}$，求$OC$的长。\n"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1775050544289",
            "type": "text",
            "content": "(1) 设 $OC=x$，$OB=y$\n\n$x^2+y^2-\\sqrt{2}xy = (2-x)^2+(2\\sqrt{2}-y)^2-\\sqrt{2}(2-x)(2\\sqrt{2}-y)$\n\n$y=\\sqrt{2}$\n\n(2) $\\frac{OB}{\\sin C} = \\frac{BC}{\\sin \\angle BOC} = \\frac{AD}{\\sin \\angle AOD} = \\frac{OD}{\\sin A}$\n\n$\\therefore \\sin A = \\sin C$，即 $A=C$ 或 $A+C=\\pi$\n\n当 $A=C$ 时，$\\triangle BOC \\cong \\triangle AOD$，$A=\\frac{\\pi}{4}$.\n$\\sqrt{5}\\sin 2A + \\cos B = \\sqrt{5} \\Rightarrow \\cos B = 0$,显然不成立.\n\n$\\therefore A = \\pi-C = B+\\frac{\\pi}{4}$\n\n$\\sqrt{5}\\cos 2B + \\cos B = \\sqrt{5} \\Rightarrow \\cos B = \\frac{2}{\\sqrt{5}}$ 或 $-\\frac{\\sqrt{5}}{2}$ (舍)。\n"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775050520805",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/69cd1e0f2ff0b.webp",
            "width": 400
          },
          {
            "id": "sol-1775050525307",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/69cd1e1088ff5.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949748015",
        "blocks": [
          {
            "id": "block-1774949748015",
            "type": "text",
            "content": "锐角$\\triangle ABC$的内角$A,B,C$的对边分别为$a,b,c$，已知$ab(a^2+b^2-c^2)=4\\overrightarrow{AC}\\cdot\\overrightarrow{BC}$。\n\n(1) 求$ab$；\n\n(2) 若$\\sin^2A+\\sin^2B+\\sin^2C=2+\\cos A\\cos B$，求$\\triangle ABC$的面积。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1775050884838",
            "type": "text",
            "content": "$\\sin^2A+\\sin^2B+\\sin^2(A+B) = 2+\\cos A\\cos B$\n\n$-\\cos^2A-\\cos^2B+\\sin^2A \\cos^2B+\\cos^2A \\sin^2B+2\\sin A \\cos A \\sin B \\cos B = \\cos A \\cos B$\n\n$\\cos^2A(\\sin^2B-1)+\\cos^2B(\\sin^2A-1)+2\\sin A \\cos A \\sin B \\cos B = \\cos A \\cos B$\n\n$-2\\cos^2A \\cos^2B+2\\sin A \\cos A \\sin B \\cos B = \\cos A \\cos B$\n\n$\\cos C = \\frac{1}{2}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775050746309",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/69cd1e10245cd.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949748413",
        "blocks": [
          {
            "id": "block-1774949748413",
            "type": "text",
            "content": "在等边三角形$ABC$中，$D、E、F$分别在边$AB、BC、AC$上，且$DE=\\sqrt{3},DF=2,\\angle DEF=90^\\circ$，则三角形$ABC$面积的最大值是（）"
          }
        ],
        "options": [
          "$\\frac{7\\sqrt{3}}{3}$",
          "$2\\sqrt{3}$",
          "$7\\sqrt{3}$",
          "$6\\sqrt{3}$"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775052489044",
            "type": "text",
            "content": "$a = \\dfrac{2}{\\sqrt{3}} \\sin\\left( \\dfrac{2\\pi}{3} - \\theta \\right) + 2 \\sin\\left( \\dfrac{\\pi}{6} + \\theta \\right)$"
          },
          {
            "id": "hint-1775052494764",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/69cd2621c4829.webp",
            "width": 300
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775051188161",
            "type": "text",
            "content": "解答：\nA\n\n----------\n\n解析：\n本题考查等边三角形的性质、余弦定理以及三角形面积公式。\n解题的关键在于利用余弦定理建立边之间的关系，再结合三角形面积公式求解。\n设等边三角形$ABC$的边长为$a$，$\\angle BDE=\\alpha$，通过在$\\triangle BDE$和$\\triangle ADF$中分别利用余弦定理表示出$BD$和$AD$，进而得到$a$关于$\\alpha$的表达式，最后根据三角函数的性质求出$a$的最大值，从而求出$\\triangle ABC$面积的最大值。\n\n1.在$\\triangle BDE$中利用余弦定理表示$BD$\n\n设等边三角形$ABC$的边长为$a$，$\\angle BDE=\\alpha$。\n\n在$\\triangle BDE$中，$\\angle B = 60^{\\circ}$，$DE = \\sqrt{3}$，\n\n根据余弦定理$BE^{2}=BD^{2}+DE^{2}-2BD\\cdot DE\\cos\\alpha$，即$BE^{2}=BD^{2}+3 - 2\\sqrt{3}BD\\cos\\alpha$。\n\n又因为$\\angle BED = 180^{\\circ}-60^{\\circ}-\\alpha = 120^{\\circ}-\\alpha$，\n\n再根据正弦定理$\\frac{BD}{\\sin(120^{\\circ}-\\alpha)}=\\frac{DE}{\\sin60^{\\circ}}$，\n\n可得$BD=\\frac{\\sqrt{3}\\sin(120^{\\circ}-\\alpha)}{\\sin60^{\\circ}} = 2\\sin(120^{\\circ}-\\alpha)$。\n\n2.在$\\triangle ADF$中利用余弦定理表示$AD$\n\n因为$\\angle EDF = 90^{\\circ}$，所以$\\angle ADF = 90^{\\circ}-\\alpha$。\n\n在$\\triangle ADF$中，$\\angle A = 60^{\\circ}$，$DF = 2$，\n\n根据余弦定理$AF^{2}=AD^{2}+DF^{2}-2AD\\cdot DF\\cos(90^{\\circ}-\\alpha)$，即$AF^{2}=AD^{2}+4 - 4AD\\sin\\alpha$。\n\n又因为$\\angle AFD = 180^{\\circ}-60^{\\circ}-(90^{\\circ}-\\alpha)=30^{\\circ}+\\alpha$，\n\n再根据正弦定理$\\frac{AD}{\\sin(30^{\\circ}+\\alpha)}=\\frac{DF}{\\sin60^{\\circ}}$，\n\n可得$AD=\\frac{2\\sin(30^{\\circ}+\\alpha)}{\\sin60^{\\circ}}=\\frac{4\\sqrt{3}}{3}\\sin(30^{\\circ}+\\alpha)$。\n\n3.求出$a$关于$\\alpha$的表达式\n\n因为$a = BD + AD$，所以$a = 2\\sin(120^{\\circ}-\\alpha)+\\frac{4\\sqrt{3}}{3}\\sin(30^{\\circ}+\\alpha)$。\n\n根据两角和与差的正弦公式$\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B$展开可得：\n\n$$\n\\begin{align*}\na &= 2\\left(\\sin120^\\circ\\cos\\alpha - \\cos120^\\circ\\sin\\alpha\\right) + \\frac{4\\sqrt{3}}{3}\\left(\\sin30^\\circ\\cos\\alpha + \\cos30^\\circ\\sin\\alpha\\right) \\\\\n&= 2\\left(\\frac{\\sqrt{3}}{2}\\cos\\alpha + \\frac{1}{2}\\sin\\alpha\\right) + \\frac{4\\sqrt{3}}{3}\\left(\\frac{1}{2}\\cos\\alpha + \\frac{\\sqrt{3}}{2}\\sin\\alpha\\right) \\\\\n&= \\sqrt{3}\\cos\\alpha + \\sin\\alpha + \\frac{2\\sqrt{3}}{3}\\cos\\alpha + 2\\sin\\alpha \\\\\n&= \\left(\\sqrt{3} + \\frac{2\\sqrt{3}}{3}\\right)\\cos\\alpha + (1 + 2)\\sin\\alpha \\\\\n&= \\frac{5\\sqrt{3}}{3}\\cos\\alpha + 3\\sin\\alpha\n\\end{align*}\n$$\n\n再根据辅助角公式$a\\sin\\theta+b\\cos\\theta=\\sqrt{a^{2}+b^{2}}\\sin(\\theta+\\varphi)$（其中$\\tan\\varphi=\\frac{b}{a}$），\n\n可得$a=\\sqrt{(\\frac{5\\sqrt{3}}{3})^{2}+3^{2}}\\sin(\\alpha+\\varphi)=\\frac{2\\sqrt{21}}{3}\\sin(\\alpha+\\varphi)$，\n\n其中$\\tan\\varphi=\\frac{5\\sqrt{3}}{9}$。\n\n4.求出$a$的最大值\n\n因为正弦函数的值域为$[-1,1]$，所以当$\\sin(\\alpha+\\varphi)=1$时，$a$取得最大值$\\frac{2\\sqrt{21}}{3}$。\n\n5.求出$\\triangle ABC$面积的最大值\n\n根据等边三角形面积公式$S = \\frac{\\sqrt{3}}{4}a^{2}$，\n\n可得$\\triangle ABC$面积的最大值为：$S_{max}=\\frac{\\sqrt{3}}{4}\\times(\\frac{2\\sqrt{21}}{3})^{2}=\\frac{\\sqrt{3}}{4}\\times\\frac{28}{3}=\\frac{7\\sqrt{3}}{3}$。\n\n综上，答案是A选项。"
          }
        ]
      },
      {
        "id": "qb-1774949748522",
        "blocks": [
          {
            "id": "block-1774949748522",
            "type": "text",
            "content": "在$\\triangle ABC$中，角$A,B,C$所对的边分别为$a,b,c$，且外接圆半径为$R=5$，则$\\frac{abc}{a^2+b^2+2c^2}$的最大值为______\n"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1775052896309",
            "type": "text",
            "content": "$S = \\dfrac{abc}{4R}$\n\n原式$=\\dfrac{20S}{a^2+b^2+2c^2} = \\dfrac{10ab\\sin C}{a^2+b^2+2c^2} = \\dfrac{10\\sin C}{\\dfrac{a}{b}+\\dfrac{b}{a}+\\dfrac{2c^2}{ab}} = \\dfrac{10\\sin C}{\\dfrac{\\sin A}{\\sin B}+\\dfrac{\\sin B}{\\sin A}+\\dfrac{2\\sin^2 C}{\\sin A\\sin B}}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775052878323",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949748522-1.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949748606",
        "blocks": [
          {
            "id": "block-1774949748606",
            "type": "text",
            "content": "【2025·杭州二中模拟】已知$\\triangle ABC$面积为$1$，边$AC,AB$上的中线为$BD,CE$，且$BD=\\frac{4}{3}CE$，则边$AC$的最小值为"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775052999532",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/qb-1774949748606-1.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949748714",
        "blocks": [
          {
            "id": "block-1774949748714",
            "type": "text",
            "content": "在$\\triangle ABC$中，$\\triangle ABC$的面积为$2$，且$BC=2AB$，则$AC$的最小值为______\n"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1775053028709",
            "type": "text",
            "content": "$a = 2c$\n\n$\\dfrac{1}{2}ac\\sin B = c^2\\sin B = 2$\n\n$b^2 = a^2+c^2-2ac\\cos B = c^2(5-4\\cos B)$\n\n联立得$\\frac{2(5-4\\cos B)}{\\sin B}$\n"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775053015895",
            "type": "image",
            "content": "/images/高中数学精编题库/三角函数/69cd27c2cff6c.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774949748822",
        "blocks": [
          {
            "id": "block-1774949748822",
            "type": "text",
            "content": "已知函数$f(x)=2\\sin(\\omega x-\\frac{\\pi}{3})(\\omega>0)$在区间$(\\frac{\\pi}{3},\\pi)$上有且仅有一个零点，当$\\omega$最大时，$f(x)$的图象的一条对称轴方程为"
          }
        ],
        "options": [
          "$x=\\frac{17}{12}\\pi$",
          "$x=\\frac{17}{14}\\pi$",
          "$x=\\frac{23}{10}\\pi$",
          "$x=\\frac{23}{18}\\pi$"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775053340917",
            "type": "text",
            "content": "$\\dfrac{2\\pi}{3} < \\dfrac{2\\pi}{\\omega} $<span class=\"text-red-600\">$\\quad \\times$</span>\n\n<span class=\"text-red-600\">$\\left( \\dfrac{\\pi}{3}\\omega - \\dfrac{\\pi}{3},\\ \\pi\\omega - \\dfrac{\\pi}{3} \\right) \\in [k\\pi,\\ \\pi+k\\pi]$</span>$ \\implies \\omega \\in \\left[1,\\ \\dfrac{7}{3}\\right]$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775053125447",
            "type": "text",
            "content": "解答：\nB\n\n----------\n\n解析：\n本题考查正弦函数的零点和对称轴。\n先根据正弦函数的零点公式求出函数$f(x)$的零点表达式，再结合已知区间确定$\\omega$的取值范围，进而得到$\\omega$的最大值，最后根据正弦函数对称轴公式求出$f(x)$的对称轴方程。\n\n1.求函数$f(x)$的零点\n\n令$f(x)=2\\sin(\\omega x - \\frac{\\pi}{3}) = 0$，\n\n根据正弦函数的性质可知$\\sin\\alpha = 0$时，$\\alpha = k\\pi$，$k\\in Z$，\n\n则有$\\omega x - \\frac{\\pi}{3} = k\\pi$，$k\\in Z$\n\n解上述方程可得$x = \\frac{k\\pi + \\frac{\\pi}{3}}{\\omega}=\\frac{(3k + 1)\\pi}{3\\omega}$，$k\\in Z$\n\n2.确定$\\omega$的取值范围\n\n已知函数$f(x)$在区间$(\\frac{\\pi}{3},\\pi)$上有且仅有一个零点，则存在$k\\in Z$，使得$\\frac{\\pi}{3} \\lt \\frac{(3k + 1)\\pi}{3\\omega} \\lt \\pi$\n\n先对不等式$\\frac{\\pi}{3} \\lt \\frac{(3k + 1)\\pi}{3\\omega}$进行化简：两边同时乘以$3\\omega$，得到$\\omega\\pi \\lt (3k + 1)\\pi$，\n\n两边再同时除以$\\pi$，可得$\\omega \\lt 3k + 1$\n\n再对不等式$\\frac{(3k + 1)\\pi}{3\\omega} \\lt \\pi$进行化简：两边同时乘以$3\\omega$，得到$(3k + 1)\\pi \\lt 3\\omega\\pi$，\n\n两边再同时除以$3\\pi$，可得$\\omega \\gt k + \\frac{1}{3}$\n\n当$k = 0$时，$\\frac{1}{3} \\lt \\omega \\lt 1$；\n\n当$k = 1$时，$\\frac{4}{3} \\lt \\omega \\lt 4$；\n\n当$k = 2$时，$\\frac{7}{3} \\lt \\omega \\lt 7$；$\\cdots$\n因为$\\omega\\gt0$，要使$\\omega$最大，则$k$要尽可能大，同时要满足在区间$(\\frac{\\pi}{3},\\pi)$上有且仅有一个零点\n\n当$k = 2$时，$\\frac{7}{3} \\lt \\omega \\lt 7$，此时$\\omega$可以取到较大的值\n\n当$k = 3$时，$\\frac{10}{3} \\lt \\omega \\lt 10$，若$\\omega$取较大值，可能会出现两个零点，所以$\\omega$最大时，$k = 2$，此时$\\omega$的最大值为$\\frac{7}{3}$\n\n3.求$f(x)$的对称轴方程\n\n对于正弦函数$y = \\sin x$，其对称轴方程为$x = k\\pi + \\frac{\\pi}{2}$，$k\\in Z$\n\n对于函数$f(x)=2\\sin(\\omega x - \\frac{\\pi}{3})$，令$\\omega x - \\frac{\\pi}{3} = k\\pi + \\frac{\\pi}{2}$，$k\\in Z$，\n\n将$\\omega = \\frac{7}{3}$代入可得：$\\frac{7}{3}x - \\frac{\\pi}{3} = k\\pi + \\frac{\\pi}{2}$\n\n移项可得$\\frac{7}{3}x = k\\pi + \\frac{\\pi}{2} + \\frac{\\pi}{3}=k\\pi + \\frac{5\\pi}{6}$\n\n两边同时乘以$\\frac{3}{7}$，解得$x = \\frac{3k\\pi}{7} + \\frac{5\\pi}{14}$，$k\\in Z$\n\n4.逐一分析选项\n\n当$k = 3$时，$x = \\frac{3\\times3\\pi}{7} + \\frac{5\\pi}{14}=\\frac{9\\pi}{7} + \\frac{5\\pi}{14}=\\frac{18\\pi + 5\\pi}{14}=\\frac{23\\pi}{14}$，无此选项\n\n当$k = 2$时，$x = \\frac{3\\times2\\pi}{7} + \\frac{5\\pi}{14}=\\frac{6\\pi}{7} + \\frac{5\\pi}{14}=\\frac{12\\pi + 5\\pi}{14}=\\frac{17\\pi}{14}$，选项B正确\n\n综上，答案是B选项。\n"
          }
        ]
      }
    ]
  },
  {
    "id": "derivative",
    "title": "导数",
    "icon": "∂",
    "questions": [
      {
        "id": "qb-1774960276381",
        "blocks": [
          {
            "id": "block-1774960276381",
            "type": "text",
            "content": "已知函数$f(x)=\\frac{1-\\ln x}{x^2}$的定义域为$(0,\\sqrt{e^3}]$，若对任意$x_1,x_2\\in(0,\\sqrt{e^3}]$，$\\left|\\frac{f(x_1)-f(x_2)}{x_1^2x_2^2}\\right|> \\frac{m(x_1+x_2)}{x_1^2x_2^2}$恒成立，则实数$m$的取值范围为（  ）"
          }
        ],
        "options": [
          "$(-\\infty,0]$",
          "$(-\\infty,1]$",
          "$(-\\infty,\\frac{7}{4e^3}]$ ",
          "$(-\\infty,-1]$"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": []
      },
      {
        "id": "qb-1774960808895",
        "blocks": [
          {
            "id": "block-1774960808895",
            "type": "text",
            "content": "已知函数$f(x)$及其导函数$f'(x)$的定义域为$\\mathbb{R}$，$f(1)=-1$，且$f'(x)<3f(x)+6$，则不等式$f(2\\ln x)>\\frac{x^6}{e^3}-2$的解集为______\n"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775054290141",
            "type": "text",
            "content": "$(0,e^{\\frac{1}{2}})$"
          }
        ]
      },
      {
        "id": "qb-1774960809190",
        "blocks": [
          {
            "id": "block-1774960809190",
            "type": "text",
            "content": "已知函数$f(x)=\\begin{cases}e-\\ln x, & x>0 \\\\ e+\\frac{e}{x}, & x<0\\end{cases}$，若$f(x)=a$存在两个不相等的实数根$x_1,x_2$，则$|x_1-x_2|$的最小值为（  ）"
          }
        ],
        "options": [
          "$e$  ",
          "$2e$ ",
          "$2e+1$  ",
          "$\\frac{5}{2}e$"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775053794461",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd2b44cc491.webp",
            "width": 500
          },
          {
            "id": "sol-1775053806973",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd2b4583dde.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774960809313",
        "blocks": [
          {
            "id": "block-1774960809313",
            "type": "text",
            "content": "已知$f(x)=me^{mx}-\\ln x(m\\geq0)$，若$f(x)$有两个零点，则实数$m$的取值范围为（  ）"
          }
        ],
        "options": [
          "$(0,\\frac{1}{e})$ ",
          "$(0,\\frac{1}{e^2})$  ",
          "$(\\frac{1}{e},+\\infty)$",
          "$[\\frac{1}{e^2},+\\infty)$"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775053849716",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd2b44a12ef.webp",
            "width": 500
          },
          {
            "id": "sol-1775053856955",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd2b45a3cbd.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774960809410",
        "blocks": [
          {
            "id": "block-1774960809410",
            "type": "text",
            "content": "$\\forall x\\in(1,+\\infty)$，$\\frac{k}{2}(e^{kx}+1)-(x+\\frac{1}{x})\\ln x\\geq0$恒成立，$k$的范围______"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774960950010",
            "type": "text",
            "content": "同乘$x$：$\\frac{kx}{2}(e^{kx}+1)\\geq(x^2+1)\\ln x$\n\n同乘$2$：$kx(e^{kx}+1)\\geq(x^2+1)\\ln x^2=\\ln x^2(e^{\\ln x^2}+1)$\n\n$\\varphi(t)=t(e^t+1)$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775054132317",
            "type": "text",
            "content": "$k\\geq \\frac{2}{e}$"
          }
        ]
      },
      {
        "id": "qb-1774960809602",
        "blocks": [
          {
            "id": "block-1774960809602",
            "type": "text",
            "content": "已知函数$f(x)=e^{x-1}-x\\ln x$\n\n(1) 求曲线$y=f(x)$在点$(1,f(1))$处的切线方程；\n\n(2) 证明：$f(x)>0$。\n"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774961124570",
            "type": "text",
            "content": "(2)$f'(x)=e^{x-1}-\\ln x-1$，易证其$>0$\n\n$\\therefore f(x)$在$(0,+\\infty)$$\\uparrow$\n\n<span class=\"text-red-600\">$x\\in(0,1)$时，$e^{x-1}>e^{-1}>0$，$x\\ln x<0$，</span>\n<span class=\"text-red-600\">$\\therefore f(x)>0$</span>\n\n$x\\in[1,+\\infty)$时，$f(x)\\geq f(1)=1>0$\n\n综上，$f(x)>0$。"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055060078",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd3068cc62c.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774960809778",
        "blocks": [
          {
            "id": "block-1774960809778",
            "type": "text",
            "content": "【2025·安徽江南十校联考】已知函数$f(x)=1-a\\sin x-\\cos 2x,a\\in\\mathbb{R}$。\n\n(1) 若$a=2$，求$f(x)$在$(0,\\pi)$上的极大值；\n\n(2) 若函数$g(x)=f(x)-f(\\frac{\\pi}{2}+x)$，讨论函数$g(x)$在$[0,\\pi]$上零点的个数。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774961203553",
            "type": "text",
            "content": "\n$g(x)=-a(\\sin x-\\cos x)-2\\cos 2x=$<span class=\"text-red-600\">$a(\\cos x-\\sin x)-2(\\cos^2x-\\sin^2x)$ </span>\n\n$=(2\\sqrt{2}\\sin(x+\\frac{\\pi}{4})-a)\\sqrt{2}\\sin(x-\\frac{\\pi}{4})$\n\n$2\\sqrt{2}\\sin(x+\\frac{\\pi}{4})\\in[-2,2\\sqrt{2}]$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055086935",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd306a8de9d.webp",
            "width": 500
          },
          {
            "id": "sol-1775055093102",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd3068a89ed.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774960809903",
        "blocks": [
          {
            "id": "block-1774960809903",
            "type": "text",
            "content": "【2025·沈阳一模】若正实数$x,y$满足$\\frac{1}{x}+\\frac{1}{y}=1$，设$z=\\frac{1}{2}(x^2+y^2)-20(\\ln x+\\ln y)$，则$z$的最小值为______"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774961485050",
            "type": "text",
            "content": "$x^2+y^2=(x^2+y^2)(\\frac{1}{x}+\\frac{1}{y})^2=2+\\frac{2(x^2+y^2)}{xy}$\n\n$x^2+y^2=\\frac{2}{1-\\frac{2}{xy}}$\n\n<span class=\"text-red-600\">全换成$xy$</span>：$z=\\frac{1}{1-\\frac{2}{xy}}-20\\ln xy$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055122113",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd306a53d59.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774960810091",
        "blocks": [
          {
            "id": "block-1774960810091",
            "type": "text",
            "content": "已知函数$f(x)=-\\frac{1}{2}x^2+ax-2\\ln x(a\\in\\mathbb{R})$。\n\n(1) 若$a=3$，求$f(x)$的极值；\n\n(2) 若函数$f(x)$有两个极值点$x_1,x_2(x_1<x_2)$，求$a$的取值范围；\n\n(3) 在(2)的条件下，求证：$2f(x_1)+f(x_2)>9-3\\ln 2$。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774961547731",
            "type": "text",
            "content": "$f'(x)=\\frac{-x^2+ax-2}{x}$，$a>2\\sqrt{2}$\n\n<span class=\"text-red-600\">$x_1+x_2=a$，$x_1x_2=2$</span>\n\n$2f(x_1)+f(x_2)=-\\frac{1}{2}(2x_1^2+x_2^2)+a(2x_1+x_2)-2\\ln x_1^2x_2$\n\n$=-\\frac{1}{2}(2x_1^2+x_2^2)+(x_1+x_2)(2x_1+x_2)-2\\ln x_1^2x_2$\n\n$=x_1^2+\\frac{1}{2}x_2^2+6-2\\ln 2x_1$\n\n$=x_1^2+\\frac{2}{x_1^2}+6-\\ln 4x_1^2$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055136287",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd306a65f5f.webp",
            "width": 500
          },
          {
            "id": "sol-1775055276158",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd30f2a4d9b.webp",
            "width": 500
          },
          {
            "id": "sol-1775055284951",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd30f16dba3.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774960810192",
        "blocks": [
          {
            "id": "block-1774960810192",
            "type": "text",
            "content": "【2025·长沙模拟】已知函数$f(x)=ae^x-\\sin x-a$\n\n(1) 当$a=3$时，求曲线$y=f(x)$在点$(0,f(0))$处的切线方程\n\n(2) 当$a>0$时，函数$f(x)$在区间$(0,\\frac{\\pi}{2})$上有唯一的极值点$x_1$\n\n① 求实数$a$的取值范围；\n\n② 求证：$f(x)$在区间$(0,\\pi)$上有唯一的零点$x_0$，且$x_0<2x_1$."
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774961647536",
            "type": "text",
            "content": "$f'(x)=ae^x-\\cos x\\uparrow$\n\n$f'(0)=a-1$，$f'(\\frac{\\pi}{2})=ae^{\\frac{\\pi}{2}}$\n\n$a\\in(0,1)$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055307547",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd30f0302ed.webp",
            "width": 400
          },
          {
            "id": "sol-1775055316809",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd30f2cf63a.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774960810282",
        "blocks": [
          {
            "id": "block-1774960810282",
            "type": "text",
            "content": "已知函数$f(x)=e^x\\ln(1+x),(x\\in[0,+\\infty))$\n\n(1) 设$g(x)=f'(x)$，讨论函数$g(x)$的单调性；\n\n(2) 证明：对任意的$s,t\\in(0,+\\infty)$，有$f(s+t)-f(s)>f(t)$"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774961719206",
            "type": "text",
            "content": "$f'(x)>0$，$f''(x)>0$\n\n<span class=\"text-red-600\">令$h(x)=f(x+t)-f(x)-f(t)$，$x>0,t>0$</span>\n\n<span class=\"text-red-600\">$h'(x)=f'(x+t)-f'(x)>0$</span>\n\n<span class=\"text-red-600\">$\\therefore h(x)>h(0)=0$</span>"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055330043",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd30f071ad8.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774960810400",
        "blocks": [
          {
            "id": "block-1774960810400",
            "type": "text",
            "content": "[2020-2021 高二 起点质量检测-22]\n\n已知函数$g(x)=x\\ln x$\n\n(1) 求曲线$y=g(x)$在点$(e,g(e))$处的切线方程；\n\n(2) 设$f(x)=\\frac{x^2+1}{g(x)}$，证明$f(x)$恰有两个极值点$x_1$和$x_2$，并求$f(x_1)+f(x_2)$的值"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774961791417",
            "type": "text",
            "content": "$f(x)=\\frac{x^2+1}{x\\ln x}$\n\n$f'(x)=\\frac{(x^2-1)\\ln x-(x^2+1)}{(x\\ln x)^2}$\n\n$h(x)=(x^2-1)\\ln x-(x^2+1)$，$(0,x_0)\\downarrow(x_0,+\\infty)\\uparrow$；$\\ln x_0=\\frac{x_0^2+1}{2x_0^2}$\n\n$h'(x)=2x\\ln x-x-\\frac{1}{x}\\uparrow$\n\n$h''(x)=2\\ln x+1+\\frac{1}{x^2}$，$(0,1)\\downarrow(1,+\\infty)\\uparrow$，$h''(x)>0$\n\n$h'''(x)=\\frac{2}{x}-\\frac{2}{x^3}=\\frac{2(x^2-1)}{x^3}$\n\n$h(x)_{\\min}=h(x_0)=(x_0^2-1)\\ln x_0-(x_0^2+1)=-\\frac{(1+x_0^2)^2}{2x_0^2}<0$\n\n$\\therefore$ 恰有2个极值点$x_1,x_2$，且均满足$\\ln x=\\frac{x^2+1}{x^2-1}$\n\n<span class=\"text-red-600\">注意到$\\ln(\\frac{1}{x})=\\frac{(\\frac{1}{x})^2+1}{(\\frac{1}{x})^2-1}$</span>\n\n<span class=\"text-red-600\">$\\therefore x_1=\\frac{1}{x_2}$</span>\n\n$f(x)=x-\\frac{1}{x}$\n\n$f(x_1)+f(x_2)=0$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055476154",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd31faab2e8.webp",
            "width": 450
          },
          {
            "id": "sol-1775055493086",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd31fa74c9a.webp",
            "width": 450
          }
        ]
      },
      {
        "id": "qb-1774960810481",
        "blocks": [
          {
            "id": "block-1774960810481",
            "type": "text",
            "content": " [2022 二月调研考试-22]\n\n已知函数$f(x)=a|\\ln x|+x+\\frac{1}{x},g(x)=e^x+e^{-x}-a|\\ln(ax)|-\\frac{1}{ax}$，其中$a>0$\n\n(1) 当$a=1$时，求$\\frac{f'(\\frac{1}{e})}{f'(e)}$的值；\n\n(2) 讨论$g(x)$的零点个数"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1774962167697",
            "type": "text",
            "content": "$g(x)=0$，$e^x+e^{-x}=a|\\ln(ax)|+\\frac{1}{ax}$\n\n<span class=\"text-red-600\">$ax$</span>$+e^x+e^{-x}=a|\\ln(ax)|+$<span class=\"text-red-600\">$ax$</span>$+\\frac{1}{ax}$\n\n<span class=\"text-red-600\">$a|\\ln e^x|+e^x+e^{-x}=a|\\ln(ax)|+ax+\\frac{1}{ax}$\n</span>\n\n<span class=\"text-red-600\">$\\therefore f(e^x)=f(ax)$</span>\n\n$x\\in(0,1)$时，$f'(x)=-\\frac{a}{x}+1-\\frac{1}{x^2}=-\\frac{a}{x}-\\frac{1-x^2}{x^2}<0$\n\n$x>1$时，$f'(x)=\\frac{a}{x}+1-\\frac{1}{x^2}=\\frac{a}{x}+\\frac{x^2-1}{x^2}>0$\n\n$\\therefore f(x)$在$(0,1)\\downarrow(1,+\\infty)\\uparrow$\n\n<span class=\"text-red-600\">$f(x)=f(\\frac{1}{x})$</span>\n\n$\\therefore e^x=ax$ 或$e^x=\\frac{1}{ax}$\n\n令$s(x)=\\frac{e^x}{x},x>0$，\n\n$a>e$，2个零点\n\n$a=e$，1个零点\n\n$0<a<e$，无零点\n\n$t(x)=xe^x,x>0$，\n\n1个零点\n\n综上，$a>e$，3个零点；\n\n$a=e$，2个零点；\n\n$0<a<e$，1个零点"
          }
        ]
      },
      {
        "id": "qb-1774960811045",
        "blocks": [
          {
            "id": "block-1774960811045",
            "type": "text",
            "content": "[2022 五月模拟训练(一)-22]\n\n已知函数$f(x)=x(1-a\\ln x)+1(a\\in\\mathbb{R})$\n\n(1) 讨论$f(x)$的单调性；\n\n(2) 若关于$t$的方程$\\ln t-(m-1)t+1=0$有两个不相等的实根$t_1,t_2$，\n\n求证：$\\frac{1}{t_1}-\\frac{1}{t_2}<e+\\frac{1}{e}+2-2m$."
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774963289975",
            "type": "text",
            "content": "$\\ln t-(m-1)t+1=0$<span class=\"text-red-600\">$\\Leftrightarrow \\frac{1}{t}(1-\\ln\\frac{1}{t})+1=m$\n</span>\n\n<span class=\"text-red-600\">即当$a=1$时$f(\\frac{1}{t})=m$</span>\n\n令$\\frac{1}{t}=x$\n\n原问题即：当$a=1$时，$f(x)=m$有两不等实根$x_1,x_2$，\n\n求证$|x_1-x_2|<e+\\frac{1}{e}+2-2m$\n\n$f(x)=x-x\\ln x+1$在$(0,1)\\uparrow,(1,+\\infty)\\downarrow$\n\n不妨设$0<x_1<1<x_2$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055521470",
            "type": "text",
            "content": "### (1)\n已知$f(x) = x(1 - a\\ln x) + 1$，其定义域为$(0,+\\infty)$，对$f(x)$求导：\n\n根据乘法求导法则$(uv)' = u'v + uv'$，其中$u = x$，$v = 1 - a\\ln x$，可得\n$f'(x) = (x)'(1 - a\\ln x) + x(1 - a\\ln x)'$。\n\n因为$(x)' = 1$，$(1 - a\\ln x)' = -\\dfrac{a}{x}$，所以\n$f'(x) = 1 - a\\ln x + x \\cdot \\left(-\\dfrac{a}{x}\\right) = 1 - a\\ln x - a = -a\\ln x + 1 - a$。\n\n当$a = 0$时，$f'(x) = 1 > 0$，所以$f(x)$在$(0,+\\infty)$上单调递增。\n\n当$a > 0$时，令$f'(x) = 0$，即$-a\\ln x + 1 - a = 0$，\n移项可得$a\\ln x = 1 - a$，则$\\ln x = \\dfrac{1-a}{a}$，解得$x = e^{\\frac{1-a}{a}}$。\n\n当$x \\in \\left(0,e^{\\frac{1-a}{a}}\\right)$时，$\\ln x < \\dfrac{1-a}{a}$，$f'(x) > 0$，$f(x)$单调递增；\n当$x \\in \\left(e^{\\frac{1-a}{a}},+\\infty\\right)$时，$\\ln x > \\dfrac{1-a}{a}$，$f'(x) < 0$，$f(x)$单调递减。\n\n当$a < 0$时，令$f'(x) = 0$，即$-a\\ln x + 1 - a = 0$，\n移项可得$a\\ln x = 1 - a$，则$\\ln x = \\dfrac{1-a}{a}$，解得$x = e^{\\frac{1-a}{a}}$。\n\n当$x \\in \\left(0,e^{\\frac{1-a}{a}}\\right)$时，$\\ln x < \\dfrac{1-a}{a}$，$f'(x) < 0$，$f(x)$单调递减；\n当$x \\in \\left(e^{\\frac{1-a}{a}},+\\infty\\right)$时，$\\ln x > \\dfrac{1-a}{a}$，$f'(x) > 0$，$f(x)$单调递增。\n\n综上，当$a = 0$时，$f(x)$在$(0,+\\infty)$上单调递增；\n当$a > 0$时，$f(x)$在$\\left(0,e^{\\frac{1-a}{a}}\\right)$上单调递增，在$\\left(e^{\\frac{1-a}{a}},+\\infty\\right)$上单调递减；\n当$a < 0$时，$f(x)$在$\\left(0,e^{\\frac{1-a}{a}}\\right)$上单调递减，在$\\left(e^{\\frac{1-a}{a}},+\\infty\\right)$上单调递增。\n\n---\n\n### (2)\n已知$\\ln t - (m - 1)t + 1 = 0$，变形可得\n$\\dfrac{1}{t}\\left(1 - (m - 1)\\ln \\dfrac{1}{t}\\right) + 1 = 0$，令$x = \\dfrac{1}{t}$，则方程可化为$x\\left(1 - (m - 1)\\ln x\\right) + 1 = 0$，即\n$f(x) = x\\left(1 - (m - 1)\\ln x\\right) + 1 = 0$。\n\n由(1)可知，当$a = m - 1$时，$f(x)$在$\\left(0,e^{\\frac{2-m}{m-1}}\\right)$上单调递增，在$\\left(e^{\\frac{2-m}{m-1}},+\\infty\\right)$上单调递减，且\n$f(1) = 2 > 0$，\n$f\\left(e^{\\frac{1}{m-1}}\\right) = e^{\\frac{1}{m-1}}\\left(1 - (m - 1)\\ln e^{\\frac{1}{m-1}}\\right) + 1 = 1 > 0$，\n$f\\left(e^{\\frac{2}{m-1}}\\right) = e^{\\frac{2}{m-1}}\\left(1 - (m - 1)\\ln e^{\\frac{2}{m-1}}\\right) + 1 = 1 - e^{\\frac{2}{m-1}} < 0$。\n\n所以存在$x_1 \\in \\left(1,e^{\\frac{1}{m-1}}\\right)$，$x_2 \\in \\left(e^{\\frac{1}{m-1}},e^{\\frac{2}{m-1}}\\right)$，使得\n$f(x_1) = f(x_2) = 0$，即$\\dfrac{1}{t_1} = x_1$，$\\dfrac{1}{t_2} = x_2$。\n\n要证$\\left|\\dfrac{1}{t_1} - \\dfrac{1}{t_2}\\right| < e + \\dfrac{1}{e} + 2 - 2m$，即证\n$|x_1 - x_2| < e + \\dfrac{1}{e} + 2 - 2m$。\n\n由(1)可知，当$a = 1$时，$f(x) = x(1 - \\ln x) + 1$在$(0,1)$上单调递增，在$(1,+\\infty)$上单调递减，且\n$f\\left(\\dfrac{1}{e}\\right) = \\dfrac{1}{e}\\left(1 - \\ln \\dfrac{1}{e}\\right) + 1 = \\dfrac{2}{e} + 1 > 0$，\n$f(e) = e(1 - \\ln e) + 1 = 1 > 0$，$f(1) = 2 > 0$。\n\n设\n$g(x) = f(x) - \\left(-x - \\dfrac{1}{e}\\right) = x(1 - \\ln x) + 1 + x + \\dfrac{1}{e} = 2x - x\\ln x + 1 + \\dfrac{1}{e}$，$x \\in (0,1)$，\n对$g(x)$求导得\n$g'(x) = 2 - (\\ln x + 1) = 1 - \\ln x$。\n\n当$x \\in (0,1)$时，$\\ln x < 0$，所以\n$g'(x) = 1 - \\ln x > 0$，$g(x)$在$(0,1)$上单调递增，则\n$g(x) < g(1) = 2 \\times 1 - 1 \\times \\ln 1 + 1 + \\dfrac{1}{e} = 3 + \\dfrac{1}{e} > 0$，\n即$f(x) > -x - \\dfrac{1}{e}$在$(0,1)$上恒成立。\n\n设$y = 0$与直线$x + y + \\dfrac{1}{e} = 0$的交点横坐标为$x_1'$，\n则$-x_1' - \\dfrac{1}{e} = f(x_1) > -x_1 - \\dfrac{1}{e}$，即$x_1' < x_1$。\n\n设$y = 0$与直线$y = x - e$的交点横坐标为$x_2'$，同理可证$x_2 < x_2'$。\n\n因为$x_1' = -\\dfrac{1}{e}$，$x_2' = e$，所以\n$|x_1 - x_2| = x_2 - x_1 < x_2' - x_1' = e - \\left(-\\dfrac{1}{e}\\right) = e + \\dfrac{1}{e}$。\n\n又因为$2 - 2m > 0$，所以\n$|x_1 - x_2| < e + \\dfrac{1}{e} + 2 - 2m$，即\n$\\left|\\dfrac{1}{t_1} - \\dfrac{1}{t_2}\\right| < e + \\dfrac{1}{e} + 2 - 2m$。\n\n综上，$\\left|\\dfrac{1}{t_1} - \\dfrac{1}{t_2}\\right| < e + \\dfrac{1}{e} + 2 - 2m$得证。"
          }
        ]
      },
      {
        "id": "qb-1774960811371",
        "blocks": [
          {
            "id": "block-1774960811371",
            "type": "text",
            "content": "已知函数$f(x)=\\frac{e^x-a}{x}$，其中$e$为自然对数的底数\n\n(1) 当$a=1$时，求$f(x)$的单调区间；\n\n(2) 若当$a=2$时，关于$x$的方程：$f(x)=k$有两个不同的根：$x_1,x_2$且$x_1<x_2$\n\n(i) 求$k$的范围；\n\n(ii) 当$|x_1-x_2|$最小时，求$k$的值."
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774964032301",
            "type": "text",
            "content": "$k>0$，$f(x)$在$(-\\infty,0),(0,+\\infty)$$\\uparrow$\n\n$e^{x_1}-2=kx_1$\n\n$e^{x_2}-2=kx_2$\n\n两式作差：$e^{x_2}-e^{x_1}=k(x_2-x_1)$\n\n<span class=\"text-red-600\">$e^{x_1}(e^{x_2-x_1}-1)$</span>$=k(x_2-x_1)$\n\n设$t=x_2-x_1>0$\n\n又由$k=\\frac{e^{x_1}-2}{x_1}$\n\n得 <span class=\"text-red-600\">$\\frac{e^t-1}{t}=\\frac{e^{x_1}-2}{x_1e^{x_1}}$</span>\n\n$\\uparrow$ ，$t_{\\min}$时<span class=\"text-red-600\">等价于右侧$\\min$</span>"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055575151",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd31fab1fcd.webp",
            "width": 450
          },
          {
            "id": "sol-1775055583455",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd31fa95815.webp",
            "width": 450
          }
        ]
      },
      {
        "id": "qb-1774964140406",
        "blocks": [
          {
            "id": "block-1774964140406",
            "type": "text",
            "content": "【2025·安徽江淮十校联考】已知$a\\in\\mathbb{R}$，关于$x$的不等式$\\frac{e^x}{x^3}-3a\\ln x\\geq x+1$对任意$x\\in(1,+\\infty)$恒成立，则$a$的取值范围是______"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774964163143",
            "type": "text",
            "content": "$\\frac{e^x}{x^3}=$<span class=\"text-red-600\">$e^{x-3\\ln x}$</span>$\\geq x+3a\\ln x+1$\n\n又$e^x\\geq x+1$\n\n$\\therefore a\\leq -1$ 恒成立"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775055607351",
            "type": "image",
            "content": "/images/高中数学精编题库/导数/69cd31fa7c74a.webp",
            "width": 500
          }
        ]
      }
    ]
  },
  {
    "id": "complex",
    "title": "复数",
    "icon": "i",
    "questions": [
      {
        "id": "qb-1774964232719",
        "blocks": [
          {
            "id": "block-1774964232719",
            "type": "text",
            "content": "已知复数$z,w$均不为$0$，则（）"
          }
        ],
        "options": [
          "$z^2=|z|^2$",
          "$\\frac{z}{\\overline{z}}=\\frac{z^2}{|z|^2}$",
          "$\\overline{z-w}=\\overline{z}-\\overline{w}$",
          "$\\left|\\frac{z}{w}\\right|=\\frac{|z|}{|w|}$"
        ],
        "correctOptions": [
          1,
          2,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775055925305",
            "type": "image",
            "content": "/images/高中数学精编题库/复数/69cd33c391910.webp",
            "width": 500
          }
        ]
      }
    ]
  },
  {
    "id": "solid-geometry",
    "title": "立体几何",
    "icon": "◻",
    "questions": [
      {
        "id": "qb-1774964291381",
        "blocks": [
          {
            "id": "block-1774964291381",
            "type": "text",
            "content": "中国古建筑闻名于世，源远流长。如图①所示的五脊殿是中国传统建筑中的一种屋顶形式，该屋顶的结构示意图是如图②所示的五面体$EFB CDA$，在图②中，四边形$ABCD$为矩形，$EF\\parallel AB$，$AB=3EF=3$，$AD=2$，$\\triangle ADE$与$\\triangle BCF$是全等的等边三角形，则（）"
          },
          {
            "id": "block-1775055939346",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd33c1d015c.webp",
            "width": 400
          }
        ],
        "options": [
          "五面体$EFB CDA$的体积为$\\frac{7\\sqrt{2}}{3}$",
          "五面体$EFB CDA$的表面积为$6+10\\sqrt{3}$",
          "$AE$与平面$ABCD$所成角为$45^\\circ$",
          "当五面体$EFB CDA$的各顶点都在球$O$的球面上时，球$O$的表面积为$\\frac{27\\pi}{2}$"
        ],
        "correctOptions": [
          0,
          2,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775055934382",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd33c35cb8f.webp",
            "width": 500
          },
          {
            "id": "sol-1775055951570",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd33c384761.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774964348977",
        "blocks": [
          {
            "id": "block-1774964348977",
            "type": "text",
            "content": "【2024·广东佛山质检】已知平面$\\alpha\\cap$平面$\\beta=l$，$A,B\\in\\alpha$且$A,B\\notin l$，$C,D\\in\\beta$且$C,D\\notin l$，$E,F\\in l$，且$AE\\perp l$，$BF\\perp l$，下列说法正确的有（）"
          }
        ],
        "options": [
          "若$AC\\perp\\beta$，则$CE\\perp l$",
          "若$AB\\parallel CD$，则几何体$ACE-BDF$是柱体",
          "若$CE\\perp l$，$DF\\perp l$，则几何体$ACE-BDF$是台体",
          "若$\\alpha\\perp\\beta$，且$AC=AD$，则直线$AC$，$AD$与所成角的大小相等"
        ],
        "correctOptions": [
          0,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775055968840",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd33c3aafc7.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774964349341",
        "blocks": [
          {
            "id": "block-1774964349341",
            "type": "text",
            "content": "如图，圆台的轴截面为$ABCD$，其中$AB=3CD=12\\sqrt{3}$，$AD=8$，$M$为圆弧$\\overset{\\frown}{AB}$的中点，$\\overrightarrow{DE}=2\\overrightarrow{EA}$，则（）"
          },
          {
            "id": "block-1775056075440",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd3421af35b.webp",
            "width": 400
          }
        ],
        "options": [
          "圆台的体积为$208\\pi$",
          "圆台母线所在直线与平面$ABCD$所成角的最大值为$\\frac{\\pi}{3}$",
          " 过任意两条母线作圆台的截面，截面面积的最大值为$32\\sqrt{3}$",
          " 过$C,E,M$三点的平面与圆台下底面的交线长为$\\frac{36\\sqrt{3}}{5}$"
        ],
        "correctOptions": [
          0,
          1,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775056086942",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd3423e90f9.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774964349636",
        "blocks": [
          {
            "id": "block-1774964349636",
            "type": "text",
            "content": "已知三棱锥$P$-$ABC$的三个侧面的面积分别为$5,5,6$，底面积为$8$，且每个侧面与底面形成的二面角大小相等，则三棱锥$P$-$ABC$的体积为（）"
          }
        ],
        "options": [
          "$4$ ",
          "$4\\sqrt{2}$",
          "$6$ ",
          "$4\\sqrt{3}$"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775056102326",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd3423a99eb.webp",
            "width": 600
          },
          {
            "id": "sol-1775056112779",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd342340a61.webp",
            "width": 600
          }
        ]
      },
      {
        "id": "qb-1774964349855",
        "blocks": [
          {
            "id": "block-1774964349855",
            "type": "text",
            "content": "两个有共同底面的正三棱锥$P$-$ABC$与$Q$-$ABC$，它们的各顶点均在半径为$1$的球面上，若二面角$P$-$AB$-$Q$的大小为$120^\\circ$，则$\\triangle ABC$的边长为______"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774964552916",
            "type": "text",
            "content": "$(\\sqrt{3}x)^2+x^2+d^2=1$\n\n<span class=\"text-red-600\">$\\tan(\\alpha+\\beta)=\\tan 120^\\circ$</span>\n\n<span class=\"text-red-600\">$\\tan\\alpha=\\frac{1-d}{x}$，$\\tan\\beta=\\frac{1+d}{x}$</span>"
          },
          {
            "id": "hint-1775056686272",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd36c9a6005.webp",
            "width": 250
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775056122555",
            "type": "image",
            "content": "/images/高中数学精编题库/立体几何/69cd34238ec1f.webp",
            "width": 500
          }
        ]
      }
    ]
  },
  {
    "id": "combinatorics",
    "title": "排列组合",
    "icon": "C",
    "questions": [
      {
        "id": "qb-1774964663246",
        "blocks": [
          {
            "id": "block-1774964663246",
            "type": "text",
            "content": "甲、乙、丙等八个人围成一圈，要求甲、乙、丙两两不相邻，则不同的排列方法有（）"
          }
        ],
        "options": [
          "$720$种  ",
          "$1440$种 ",
          "$2880$种 ",
          "$4320$种"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1774964710572",
            "type": "text",
            "content": "圆排列：$\\frac{A_5^5}{5}\\cdot A_5^3 \\rightarrow 5$个空放3个人"
          }
        ],
        "solutionBlocks": []
      },
      {
        "id": "qb-1774964663545",
        "blocks": [
          {
            "id": "block-1774964663545",
            "type": "text",
            "content": "安排甲、乙、丙、丁、戊5名大学生去延安、宝鸡、汉中三个城市进行社会实践，每个城市至少安排一人，每人只去一个城市，则不同的安排方式共有______种；其中学生甲被单独安排去延安的概率是______"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775056852810",
            "type": "image",
            "content": "/images/高中数学精编题库/排列组合/69cd376c21a2f.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774964663863",
        "blocks": [
          {
            "id": "block-1774964663863",
            "type": "text",
            "content": "现有质量分别为$1,2,3,4,5,7$千克的六件货物，将它们随机打包装入三个不同的箱子，每个箱子装入两件货物，每件货物只能装入一个箱子。则第一、二个箱子的总质量均不小于第三个箱子的总质量的概率是______。"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775056865396",
            "type": "image",
            "content": "/images/高中数学精编题库/排列组合/69cd376c82f3b.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774964664152",
        "blocks": [
          {
            "id": "block-1774964664152",
            "type": "text",
            "content": "一种疾病需要通过血液检测来确定是否患病，检测结果呈阴性即为没患病，呈阳性即为患病。已知7只小白鼠中有1只患有这种疾病，先任取4只，将它们的血液采样混在一起检测。若结果呈阳性，则表明患病小白鼠为这4只中的1只，然后再逐个检测，直到确定患病小白鼠为止；若结果呈阴性，则在另外3只中逐个检测，直到能确定患病小白鼠为止。则（）"
          }
        ],
        "options": [
          "最多需要检测4次可确定患病小白鼠",
          "第2次检测后就可确定患病小白鼠的概率为$\\frac{2}{7}$",
          "第3次检测后就可确定患病小白鼠的概率为$\\frac{2}{7}$",
          "检测次数的期望为3"
        ],
        "correctOptions": [
          0,
          1,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1774964835487",
            "type": "text",
            "content": "B. $\\frac{C_6^4}{C_7^4}\\times\\frac{1}{3}+\\frac{C_6^3}{C_7^4}\\times\\frac{1}{4}$\n\nC. $\\frac{C_6^4}{C_7^4}\\times\\frac{2}{3}+\\frac{C_6^3}{C_7^4}\\times\\frac{3}{4}\\times\\frac{1}{3}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775056884102",
            "type": "image",
            "content": "/images/高中数学精编题库/排列组合/69cd376c428ae.webp",
            "width": 500
          },
          {
            "id": "sol-1775056888231",
            "type": "image",
            "content": "/images/高中数学精编题库/排列组合/69cd376bafc11.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774964664411",
        "blocks": [
          {
            "id": "block-1774964664411",
            "type": "text",
            "content": "口袋里有5个乒乓球，其中3个是白色，2个黄色。从中每次取出一个乒乓球，不放回，取完为止，则在第二次是黄球的条件下，第四次也是黄球的概率是（）"
          }
        ],
        "options": [
          "$\\frac{1}{4}$ ",
          "$\\frac{2}{5}$",
          "$\\frac{3}{10}$ ",
          "$\\frac{7}{20}$"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1775056918190",
            "type": "image",
            "content": "/images/高中数学精编题库/排列组合/69cd376cf020a.webp",
            "width": 500
          }
        ],
        "solutionBlocks": []
      }
    ]
  },
  {
    "id": "sequence",
    "title": "数列",
    "icon": "∑",
    "questions": [
      {
        "id": "qb-1774964963572",
        "blocks": [
          {
            "id": "block-1774964963572",
            "type": "text",
            "content": "已知数列$\\{a_n\\}$满足$\\frac{a_n+a_{n+1}}{2}=n+1$，则“数列$\\{a_n\\}$是等差数列”的充要条件可以是（）"
          }
        ],
        "options": [
          "$a_2=1$ ",
          "$a_2=\\frac{5}{2}$",
          "$a_2=2$ ",
          "$a_2=3$"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775057169804",
            "type": "image",
            "content": "/images/高中数学精编题库/数列/69cd3898e5d92.webp",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774964963869",
        "blocks": [
          {
            "id": "block-1774964963869",
            "type": "text",
            "content": "【2024·湖北八市联考】设等比数列$\\{a_n\\}$的前$n$项和为$S_n$。若$3S_2>S_6>0$，则公比$q$的取值范围为______。\n"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775057188153",
            "type": "image",
            "content": "/images/高中数学精编题库/数列/69cd3897f21c4.webp",
            "width": 450
          }
        ]
      },
      {
        "id": "qb-1774964964170",
        "blocks": [
          {
            "id": "block-1774964964170",
            "type": "text",
            "content": "【2024·辽宁三模】已知数列$\\{a_n\\}$中各项均为正数，且$a_{n+1}^2-a_{n+1}=a_n(n=1,2,3,\\dots)$，给出下列四个结论：\n\n① 对任意的$n\\in\\mathbb{N}^*$，都有$a_n>1$\n\n② 数列$\\{a_n\\}$可能为常数列\n\n③ 若$0<a_1<2$，则当$n\\geq 2$时，$a_1<a_n<2$\n\n④ 若$a_1>2$，则数列$\\{a_n\\}$为递减数列\n\n其中正确结论有（）"
          }
        ],
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correctOption": 2,
        "choiceType": "single",
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775057202408",
            "type": "image",
            "content": "/images/高中数学精编题库/数列/69cd3898aa709.webp",
            "width": 450
          }
        ]
      },
      {
        "id": "qb-1774964964494",
        "blocks": [
          {
            "id": "block-1774964964494",
            "type": "text",
            "content": "已知等差数列$\\{a_n\\}$，$S_n$是数列$\\{a_n\\}$的前$n$项和，满足$S_2=4$，$S_4=16$。数列$\\{b_n\\}$各项都是正数，且满足$b_1=a_1$，$b_3=a_3-1$，$b_nb_{n+2}=b_{n+1}^2(n\\in\\mathbb{N}^*)$。\n\n(1) 求数列$\\{a_n\\}$和$\\{b_n\\}$的通项公式；\n\n(2) 记$c_n=\\begin{cases}(6n-7)b_n, & n\\text{为奇数} \\\\ a_n, & n\\text{为偶数}\\end{cases}$，数列$\\{c_n\\}$的前$2n$项和为$T_{2n}$；\n\n(3) 在$a_k$和$a_{k+1}$（$k\\in\\mathbb{N}^*$）中插入$k$个相同的数$(-1)^{k+1}\\cdot k$，构成一个新数列$\\{d_n\\}$：$a_1,1,a_2,-2,a_3,3,3,a_4,\\dots$，求$\\{d_n\\}$的前2025项和。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774965131020",
            "type": "text",
            "content": "$a_n=2n-1$\n\n$b_n=2^{n-1}$\n\n(2) $c_n=\\begin{cases}\\frac{(6n-7)2^{n-1}}{(2n-1)(2n+3)}=\\frac{2^{n+1}}{2n+3}-\\frac{2^{n-1}}{2n-1}\\\\ 2n-1\\end{cases}$\n\n$T_{2n}=\\frac{2^{2n}}{4n+1}-1+\\frac{3+4n-1}{2}\\cdot n$\n\n(3) $\\frac{(2+n)(n-1)}{2}$，$\\frac{(2+63)(63-1)}{2}=2015$\n\n$d_n$: $a_1  , 1(e_1)  , a_2 ,( -2   ,-2 )(e_2)  ,a_3   ,3  , 3   ,3\\cdots a_{63}   ,63\\cdots 63(63个）  , a_{64},   -64\\cdots-64(9个）$\n\n\n$\\sum e_n=1-2^2+3^2-4^2+\\dots-62^2+63^2$\n\n$=1+2+3+4+\\dots+62+63=$\n\n$\\sum d_n=S_{64}+\\sum e_n-9\\times 64$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775057220615",
            "type": "image",
            "content": "/images/高中数学精编题库/数列/69cd38995c214.webp",
            "width": 600
          },
          {
            "id": "sol-1775057226250",
            "type": "image",
            "content": "/images/高中数学精编题库/数列/69cd3899b6c78.webp",
            "width": 600
          },
          {
            "id": "sol-1775057256886",
            "type": "image",
            "content": "/images/高中数学精编题库/数列/69cd39049dc78.webp",
            "width": 600
          }
        ]
      },
      {
        "id": "qb-1774964964743",
        "blocks": [
          {
            "id": "block-1774964964743",
            "type": "text",
            "content": "设$S_n$为数列$\\{a_n\\}$的前$n$项和，若$a_n+a_{n+1}=2n+1$，且存在$k\\in\\mathbb{N}^*$，$S_k=S_{k+1}=210$，则$a_1$的取值集合为（）"
          }
        ],
        "options": [
          "{-20,21}",
          "{-20,20}",
          "{-29,11}",
          "{-20,19}"
        ],
        "correctOption": 0,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1774965893895",
            "type": "text",
            "content": "$a_{2n-1}=a_1+2(n-1)$\n\n$a_{2n}=a_2+2(n-1)$\n\n$k\\text{奇}$：$S_{k+1}=a_1+a_2+\\dots+a_k+a_{k+1}=\\frac{3+2k+1}{2}\\cdot\\frac{k+1}{2}=210$，$k=19$\n\n$a_{k+1}=a_2+2(\\frac{k+1}{2}-1)=0$，\n\n$a_2=-18$，$a_1=21$\n\n$k\\text{偶}$：$S_k=a_1+a_2+\\dots+a_{k-1}+a_k=\\frac{3+2k-1}{2}\\cdot\\frac{k}{2}=210$，$k=20$\n\n$a_{k+1}=a_1+2(\\frac{k+2}{2}-1)=0$，$a_1=-20$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775057266723",
            "type": "image",
            "content": "/images/高中数学精编题库/数列/69cd390461aab.webp",
            "width": 500
          }
        ]
      }
    ]
  },
  {
    "id": "analytic-geometry",
    "title": "解析几何",
    "icon": "⌬",
    "questions": [
      {
        "id": "qb-1774965999957",
        "blocks": [
          {
            "id": "block-1774965999957",
            "type": "text",
            "content": "设$m\\in\\mathbb{R}$，在平面直角坐标系$xOy$中，已知$\\vec{a}=(x+1,\\frac{1}{4}y)$，$\\vec{b}=(x-1,y)$，$\\vec{a}\\perp\\vec{b}$，动点的轨迹为$E$，轨迹$E$上且非坐标轴上的点$A$，$B$关于原点$O$对称，$AH\\perp y$轴于点$H$，$\\overrightarrow{AH}=2\\overrightarrow{HD}$，直线$BD$交轨迹$E$于$C$.\n\n(Ⅰ) 求轨迹$E$的方程；\n\n(Ⅱ) 求证：$AB\\perp AC$；\n\n(Ⅲ) 求$\\triangle ABC$面积的最大值."
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774966357991",
            "type": "text",
            "content": "(Ⅰ) $\\frac{y^2}{4}+x^2=1$\n\n(Ⅱ) $\\frac{2y_1}{\\frac{x_1}{2}}=\\frac{y_1+y_2}{x_1+x_2}$\n\n$k_{AC}\\cdot k_{AB}=\\frac{y_1-y_2}{x_1-x_2}\\cdot\\frac{y_1}{x_1}=\\frac{y_1-y_2}{x_1-x_2}\\cdot\\frac{y_1+y_2}{4(x_1+x_1)}=-1$"
          },
          {
            "id": "hint-1775058438512",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/63430c124e19583c7814d632701dde54.jpg",
            "width": 400
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775057669808",
            "type": "text",
            "content": "解答：\n解：（Ⅰ）因为$\\overrightarrow {a}=(x+1$，$\\frac{1}{4}y)$，$\\overrightarrow {b}=\\left(x-1,y\\right)$，$\\overrightarrow {a}\\bot \\overrightarrow {b}$，\n\n所以$(x+1，\\frac{1}{4}y)(x-1，y)=0$，\n\n整理得$\\frac{y^2}{4}+x^2=1$，\n\n则轨迹$E$的方程为$\\frac{y^2}{4}+x^2=1$；\n\n（Ⅱ）证明：易知$A$，$B$两点关于原点对称，\n\n不妨设$A(x_{1}$，$y_{1})$，$C(x_{2}$，$y_{2})$，\n\n可得$B(-x_{1}$，$-y_{1})$，\n\n此时$\\left\\{\\begin{array}{l}{\\frac{{y}_{1}^{2}}{4}+{x}_{1}^{2}=1}\\\\{\\frac{{y}_{2}^{2}}{4}+{x}_{2}^{2}=1}\\end{array}\\right.$，\n\n两式作差得$\\frac{y_2^2-y_1^2}{4}+(x_2^2-x_1^2)=0$，\n\n即$\\frac{y_2-y_1}{x_2-x_1}\\cdot \\frac{y_2-(-y_1)}{x_2-(-x_1)}=-4$，\n\n因为$k_{AC}=\\frac{y_2-y_1}{x_2-x_1}$，$k_{BC}=\\frac{y_2-(-y_1)}{x_2-(-x_1)}$，\n\n所以$k_{AC}\\cdot k_{BC}=-4$，\n\n则$k_{AC}=-\\frac{4}{k_{BC}}$，\n\n因为$\\overrightarrow {AH}=2\\overrightarrow {HD}$，\n\n所以$D(-\\frac{x_1}{2}，y_1)$，$k_{BC}=\\frac{y_1-(-y_1)}{-\\frac{x_1}{2}-(-x_1)}=\\frac{4y_1}{x_1}$，\n\n所以$k_{AC}=-\\frac{x_1}{y_1}$，\n\n因为$k_{AB}=\\frac{y_1}{x_1}$，\n\n所以$AB\\bot AC$；\n\n（Ⅲ）易知直线$AC$的方程为$x=-\\frac{y_1}{x_1}(y-y_1)+x_1=-\\frac{y_1x}{x_1}+\\frac{x_1^2+y_1^2}{x_1}$，\n\n联立$\\left\\{\\begin{array}{l}{x=-\\frac{{y}_{1}x}{{x}_{1}}+\\frac{{x}_{1}^{2}+{y}_{1}^{2}}{{x}_{1}}}\\\\{\\frac{{y}^{2}}{4}+{x}^{2}=1}\\end{array}\\right.$，消去$x$并整理得\n\n$(4y_1^2+x_1^2)y^2-8y_1(x_1^2+y_1^2)y+4(x_1^2+y_1^2)^2-4x_1^2=0$，\n\n由韦达定理得$y_1+y_2=\\frac{8y_1(x_1^2+y_1^2)}{4y_1^2+x_1^2}$，\n\n此时$S_{\\triangle ABC}=\\frac{1}{2}|AD|\\cdot |{y}_{2}-(-{y}_{1})|=\\frac{1}{2}\\cdot \\frac{3|{y}_{1}|}{2}\\cdot |{y}_{1}+{y}_{2}|=\\frac{6{x}_{1}{y}_{1}({x}_{1}^{2}+{y}_{1}^{2})}{4{y}_{1}^{2}+{x}_{1}^{2}}$，\n\n因为$\\frac{y_1^2}{4}+x_1^2=1$，\n\n所以$S_{\\triangle ABC}=\\frac{24{x}_{1}{y}_{1}({x}_{1}^{2}+{y}_{1}^{2})}{(4{x}_{1}^{2}+{y}_{1}^{2})({x}_{1}^{2}+4{y}_{1}^{2})}=\\frac{24(\\frac{{x}_{1}}{{y}_{1}}+\\frac{{y}_{1}}{{x}_{1}})}{\\frac{4{x}_{1}^{2}}{{y}_{1}^{2}}+\\frac{{4y}_{1}^{2}}{{x}_{1}^{2}}+17}$，\n\n不妨令$\\frac{y_1}{x_1}+\\frac{x_1}{y_1}=t$，\n\n此时$t\\geqslant 2$，\n当且仅当$x_{1}=y_{1}$时，等号成立，\n\n所以$S_{\\triangle ABC}=\\frac{24t}{4{t}^{2}+9}=\\frac{24}{4t+\\frac{9}{t}}$，\n\n因为函数$y=4t+\\frac{9}{t}$在$\\left[2,+\\infty \\right)$上单调递增，\n\n所以当$t=2$时，函数$y=4t+\\frac{9}{t}$取得最小值，最小值为$\\frac{25}{2}$，\n\n故$\\triangle ABC$面积的最大值$S=24\\times \\frac{2}{25}=\\frac{48}{25}$.\n\n----------\n\n解析：\n（Ⅰ）由题意，根据向量的坐标运算进行求解即可；\n（Ⅱ）设出$A$，$B$，$C$三点的坐标，推出$k_{AC}=-\\frac{4}{k_{BC}}$，结合$\\overrightarrow {AH}=2\\overrightarrow {HD}$，可得$k_{AC}=-\\frac{x_1}{y_1}$，再进行求证即可；\n（Ⅲ）设出直线$AC$的方程，将直线方程与轨迹方程联立，结合韦达定理、三角形面积公式以及函数单调性再进行求解即可."
          }
        ]
      },
      {
        "id": "qb-1774966000211",
        "blocks": [
          {
            "id": "block-1774966000211",
            "type": "text",
            "content": "已知$F$为抛物线$E:y^2=4x$的焦点，过点$F$的直线与抛物线$E$相交于$A(x_1,y_1),B(x_2,y_2)$（$x_1<x_2$）两点。\n\n(1) 证明：$x_1x_2$是常数。\n\n(2) 过点$F$作直线$AB$的垂线$l$，与抛物线$E$的准线相交于点$P$，与抛物线$E$相交于$C,D$两点（点$C$的横坐标小于点$D$的横坐标）。\n\n① 求$\\overrightarrow{PA}\\cdot\\overrightarrow{PB}$的值。\n\n② $|FA||FC|+|FB||FD|$是否存在最小值？若存在，请求出这个最小值；若不存在，请说明"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774966442670",
            "type": "text",
            "content": "$y_1y_2=y_3y_4=-4$\n\n$(x_1+1)(x_3+1)+(x_2+1)(x_4+1)$\n\n$=(\\frac{y_1^2}{4}+1)(\\frac{y_3^2}{4}+1)+(\\frac{y_2^2}{4}+1)(\\frac{y_4^2}{4}+1)$\n\n$=\\frac{y_1^2y_3^2}{16}+\\frac{16}{y_1^2y_3^2}+\\frac{y_1^2}{4}+\\frac{y_3^2}{4}+\\frac{4}{y_1^2}+\\frac{4}{y_3^2}+2$\n\n$CF\\perp AF\\Rightarrow(x_3-1)(x_1-1)+y_3y_1=0\\Rightarrow\\frac{y_1^2y_3^2}{4}=\\frac{y_1^2y_3^2}{16}+y_1y_3+1$\n\n$\\therefore=\\frac{y_1^2y_3^2}{8}+\\frac{32}{y_1^2y_3^2}+y_1y_3+\\frac{16}{y_1y_3}+4$\n\n$=\\frac{1}{8}(y_1y_3+\\frac{16}{y_1y_3})^2+y_1y_3+\\frac{16}{y_1y_3}$\n\n$y_1y_3+\\frac{16}{y_1y_3}\\leq-24$，$S_{\\min}=48$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775057785364",
            "type": "text",
            "content": "解答：\n（1）证明：已知抛物线$E:y^{2}=4x$，其焦点$F(1,0)$。\n\n设直线$AB$的方程为$x = my + 1$（$m\\in R$），$A(x_{1},y_{1})$，$B(x_{2},y_{2})$。\n\n将直线方程代入抛物线方程$y^{2}=4x$，可得:$y^{2}=4(my + 1),y^{2}-4my - 4=0$\n\n由韦达定理可知，在一元二次方程$ax^{2}+bx + c = 0$（$a\\neq0$）中，两根$x_1$，$x_2$有$x_1x_2 = \\frac{c}{a}$。\n\n对于方程$y^{2}-4my - 4 = 0$，$a = 1$，$c = -4$，所以$y_1y_2 = -4$。\n\n又因为$y_1^{2}=4x_1$，$y_2^{2}=4x_2$，则$x_1x_2 = \\frac{y_1^{2}y_2^{2}}{16}=\\frac{(-4)^{2}}{16}=1$，即${x}_{1}{x}_{2}$是常数$1$。\n\n（2）①由题意可知，直线$l$的方程为$y = -m(x - 1)$。抛物线$E$的准线方程为$x = -1$，\n\n联立$\\begin{cases}x = -1 \\\\ y = -m(x - 1)\\end{cases}$，可得$y = 2m$，所以$P(-1,2m)$。\n\n已知$A(x_{1},y_{1})$，$B(x_{2},y_{2})$，$P(-1,2m)$，则$\\overrightarrow{PA}=(x_{1}+1,y_{1}-2m)$，$\\overrightarrow{PB}=(x_{2}+1,y_{2}-2m)$。\n\n根据向量数量积的坐标运算公式$\\overrightarrow{a}\\cdot \\overrightarrow{b}=a_xb_x + a_yb_y$，可得：\n\n$$\n\\begin{align*}\\overrightarrow{PA}\\cdot \\overrightarrow{PB}&=(x_{1}+1)(x_{2}+1)+(y_{1}-2m)(y_{2}-2m)\\\\&=x_{1}x_{2}+x_{1}+x_{2}+1+y_{1}y_{2}-2m(y_{1}+y_{2})+4m^{2}\\\\&=1 + x_{1}+x_{2}+1 - 4 - 2m\\cdot 4m + 4m^{2}\\\\&=x_{1}+x_{2}-2 - 8m^{2}+4m^{2}\\\\&=x_{1}+x_{2}-2 - 4m^{2}\\end{align*}\n$$\n\n由$y^{2}-4my - 4 = 0$，\n\n\n根据韦达定理$y_1 + y_2 = 4m$，则$x_{1}+x_{2}=m(y_{1}+y_{2})+2 = 4m^{2}+2$。\n\n所以$\\overrightarrow{PA}\\cdot \\overrightarrow{PB}=4m^{2}+2 - 2 - 4m^{2}=0$。\n\n②由抛物线的定义可知，抛物线上的点到焦点的距离等于到准线的距离。\n\n所以$|FA| = x_{1}+1$，$|FB| = x_{2}+1$，$|FC| = x_{3}+1$，$|FD| = x_{4}+1$。\n\n则$|FA|\\cdot |FC|+|FB|\\cdot |FD|=(x_{1}+1)(x_{3}+1)+(x_{2}+1)(x_{4}+1)$。\n\n展开可得：\n\n$$\n\\begin{align*}&(x_{1}+1)(x_{3}+1)+(x_{2}+1)(x_{4}+1)\\\\=&x_{1}x_{3}+x_{1}+x_{3}+1+x_{2}x_{4}+x_{2}+x_{4}+1\\\\=&x_{1}x_{3}+x_{2}x_{4}+x_{1}+x_{2}+x_{3}+x_{4}+2\\end{align*}\n$$\n\n设直线$CD$的方程为$x = ny + 1$（$n\\in R$），\n\n联立$\\begin{cases}x = ny + 1\\\\y^{2}=4x\\end{cases}$，\n\n可得$y^{2}-4ny - 4 = 0$，则$y_{3}y_{4} = -4$，$x_{3}x_{4} = 1$。\n\n所以$|FA|\\cdot |FC|+|FB|\\cdot |FD|=1 + 1 + x_{1}+x_{2}+x_{3}+x_{4}+2 = x_{1}+x_{2}+x_{3}+x_{4}+4$。\n\n由$y^{2}-4my - 4 = 0$可得$x_{1}+x_{2}=4m^{2}+2$，由$y^{2}-4ny - 4 = 0$可得$x_{3}+x_{4}=4n^{2}+2$。\n\n则$|FA|\\cdot |FC|+|FB|\\cdot |FD|=4m^{2}+2 + 4n^{2}+2 + 4 = 4(m^{2}+n^{2})+8$。\n\n因为$m^{2}+n^{2}\\geqslant0$，当且仅当$m = n = 0$时取等号，所以$|FA|\\cdot |FC|+|FB|\\cdot |FD|\\geqslant8$，即$|FA|\\cdot |FC|+|FB|\\cdot |FD|$存在最小值$8$。\n\n----------\n"
          }
        ]
      },
      {
        "id": "qb-1774966000469",
        "blocks": [
          {
            "id": "block-1774966000469",
            "type": "text",
            "content": "已知双曲线$C:x^2-\\frac{y^2}{3}=1$的左、右焦点分别为$F_1,F_2$，过$F_2$的直线$l$与双曲线$C$的右支交于$A,B$两点。$\\triangle AF_1F_2$的内心为$I_1$，$\\triangle BF_1F_2$的内心为$I_2$，则下列说法正确的有"
          }
        ],
        "options": [
          "双曲线的离心率为$2$",
          "直线$AB$的斜率的取值范围为$(-\\infty,-\\sqrt{3})\\cup(\\sqrt{3},+\\infty)$",
          "$|I_1I_2|$的取值范围为$[2,\\frac{4\\sqrt{3}}{3}]$",
          "$\\tan\\frac{\\angle AF_2F_1}{2}=3\\tan\\frac{\\angle BF_1F_2}{2}$"
        ],
        "correctOptions": [
          1,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1774966595254",
            "type": "text",
            "content": "D.$\\frac{\\tan\\frac{\\angle AF_2F_1}{2}}{\\tan\\frac{\\angle AF_1F_2}{2}}=\\frac{\\tan\\angle I_1F_2F_1}{\\tan\\angle I_1F_1F_2}=\\frac{a+c}{c-a}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775058479681",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/ccadb1f2256b39d90df25984e1760ede.jpg",
            "width": 450
          },
          {
            "id": "sol-1775058508267",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/16430cebebd16d38027204ad2ab8c4eb.jpg",
            "width": 450
          }
        ]
      },
      {
        "id": "qb-1774966000726",
        "blocks": [
          {
            "id": "block-1774966000726",
            "type": "text",
            "content": "已知动点$G(x,y)$满足关系式$\\sqrt{x^2+(y-\\sqrt{2})^2}-\\sqrt{x^2+(y+\\sqrt{2})^2}=2$\n\n(1) 求动点$G$的轨迹方程；\n\n(2) 设动点$G$的轨迹为曲线$C_1$，抛物线$C_2:x^2=4y$的焦点为$F$，过$C_1$上一点$P$作$C_2$的两条切线，切点分别为$A,B$，弦$AB$的中点为$M$，平行于$AB$的直线$l$与$C_2$相切于点$Q$。\n\n① 证明：$P,Q,M$三点共线；\n\n② 当直线$l$与$C_1$有两个交点时，求$|QF|$的取值范围。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774966950834",
            "type": "text",
            "content": "(1) 设$F_1(0,\\sqrt{2}),F_2(0,-\\sqrt{2})$，\n\n$|PF_1|-|PF_2|=2<2\\sqrt{2}$\n\n$\\therefore G$的轨迹是双曲线的一支，\n\n$a=1,b=1,c=\\sqrt{2}$\n\n$C_1:x^2-y^2=1$ <span class=\"text-red-600\">$ (y<0)$</span>\n\n(2) ① $k_{Q}=\\frac{x_Q}{2}=k_{AB}=\\frac{x_1+x_2}{4}=\\frac{x_M}{2}$\n\n$AB:x_0x=2(y+y_0)$\n\n$y-\\frac{y_1+y_2}{2}=\\frac{x_1+x_2}{4}(x-\\frac{x_1+x_2}{2})$\n\n得$x_0=\\frac{x_1+x_2}{2}=x_M$\n\n② $l:x_Qx=2(y_Q+y)$\n\n$\\begin{cases}x=\\frac{2}{x_Q}y+\\frac{x_Q}{2}\\\\x^2-y^2=1 \\end{cases}$\n\n$\\begin{cases}\\Delta>0 \\\\ |\\frac{x_Q}{2}|<1\\end{cases}$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775058535548",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/30e43db6b7cdf4c79940d60106b0d17f.jpg"
          },
          {
            "id": "sol-1775058544134",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/c4b17cf33ffa5a95cbffd017aca3c4d7.jpg"
          }
        ]
      },
      {
        "id": "qb-1774966000975",
        "blocks": [
          {
            "id": "block-1774966000975",
            "type": "text",
            "content": "【2025·广东二模】已知以下事实：反比例函数$y=\\frac{k}{x}(k\\neq0)$的图象是双曲线，两条坐标轴是其两条渐近线。\n\n(1) ① 直接写出函数$y=\\frac{1}{2x}$的图象$C_0$的实轴长；\n② 将曲线$C_0$绕原点顺时针旋转$\\frac{\\pi}{4}$，得到曲线$C$，直接写出曲线$C$的方程。\n\n(2) 已知点$A$是曲线$C$的左顶点。圆$E:(x-1)^2+(y-1)^2=r^2(r>0)$与直线$l:x=1$交于$P,Q$两点，直线$AP,AQ$分别与曲线$C$交于$M,N$两点。试问：点$A$到直线$MN$的距离是否存在最大值？若存在，求出此最大值以及此时$r$的值；若不存在，请说明理由。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774967559379",
            "type": "text",
            "content": "(2) $C:x^2-y^2=1$\n\n$y_P+y_Q=2\\Rightarrow\\frac{y_1}{x_1+1}+\\frac{y_2}{x_2+1}=1$\n\n斜率双用$\\rightarrow$过定点"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775059362172",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/065b803b86d0a32a1391ee561a9fb867.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774966001207",
        "blocks": [
          {
            "id": "block-1774966001207",
            "type": "text",
            "content": "已知椭圆$C:\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1(a>b>0)$的左、右顶点分别为$A,B$，左焦点为$F(-\\sqrt{3},0)$，点$(0,1)$在椭圆上。\n\n(1) 求椭圆$C$的方程；\n\n(2) 设直线$l$与$C$交于不同于$B$的$M,N$两点，且$BM\\perp BN$，证明：直线$l$恒过定点；\n\n(3) 在(2)的条件下，求$|BM|\\cdot|BN|$的最大值。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774967625785",
            "type": "text",
            "content": "$BM\\perp BN$\n\n$|BM||BN|=\\frac{S}{2}=\\frac{1}{2}$底×$|y_1-y_2|$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775059384329",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/02b41e3d5a621cfbd2412c864ae30a19.jpg",
            "width": 500
          },
          {
            "id": "sol-1775059390074",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/8e3cc11ed6a40967f011537a426a4f35.jpg",
            "width": 500
          },
          {
            "id": "sol-1775059408404",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/428b1c8e7a41b494adbbef5454823b9f.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774966001365",
        "blocks": [
          {
            "id": "block-1774966001365",
            "type": "text",
            "content": "已知直线$l:y=kx+b$与圆$O:x^2+y^2=1$相切。\n\n(1) 求$k^2-b^2$的值。\n\n(2) 已知椭圆$E:\\frac{x^2}{4}+\\frac{y^2}{3}=1$在点$P(x_0,y_0)$处的切线方程为$\\frac{x_0x}{4}+\\frac{y_0y}{3}=1$，若直线$l$与椭圆$E$相交于$A,B$两点，分别过$A,B$作椭圆$E$的切线，两条切线相交于点$Q$，求点$Q$的轨迹方程。\n\n(3) 是否存在这样的二次曲线$F:\\lambda x^2+\\mu y^2=1$，当直线$l$与曲线$F$有两个交点$M,N$时，总有$OM\\perp ON$？若存在，求出$\\lambda+\\mu$的值；若不存在，请说明理由。"
          },
          {
            "id": "block-1775059428515",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/9e5a03955932501fac523e45b377ce0f.jpg",
            "width": 400
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774967822125",
            "type": "text",
            "content": "(1) $\\frac{|b|}{\\sqrt{1+k^2}}=1\\Rightarrow k^2-b^2=-1$\n\n(2) $\\begin{cases}\\frac{x_1x_Q}{4}+\\frac{y_1y_Q}{3}=1 \\\\ \\frac{x_2x_Q}{4}+\\frac{y_2y_Q}{3}=1\\end{cases}$\n\n<span class=\"text-red-600\">则$A,B$都在直线$\\frac{x_Qx}{4}+\\frac{y_Qy}{3}=1$上，</span>\n\n<span class=\"text-red-600\">即$AB$的方程：$\\frac{x_Qx}{4}+\\frac{y_Qy}{3}=1$</span>\n\n$\\frac{1}{\\sqrt{(\\frac{x_Q}{4})^2+(\\frac{y_Q}{3})^2}}=1\\Rightarrow\\frac{x_Q^2}{16}+\\frac{y_Q^2}{9}=1$\n\n(3) 联立. $\\lambda+\\mu=1$\n"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775059421621",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/b1e9a91c001f57575c4b6274d6b97616.jpg",
            "width": 400
          },
          {
            "id": "sol-1775059480449",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/3ecd59bb63e267e5f50498fa98d0bac4.jpg",
            "width": 500
          },
          {
            "id": "sol-1775059489562",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/44576cdd1ccbc7b744753936ffa7c38a.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774966001500",
        "blocks": [
          {
            "id": "block-1774966001500",
            "type": "text",
            "content": "已知抛物线$D$的焦点在$x$轴的正半轴上，其顶点是椭圆$\\frac{x^2}{4}+\\frac{y^2}{3}=1$的中心，其焦点到其准线的距离等于该椭圆的长半轴长。\n\n(1) 求抛物线$D$的准线方程；\n\n(2) 过点$P(4,0)$的动直线$l$交抛物线$D$于$A,B$两点，且点$A$在第一象限，$Q(-4,0)$。\n\n① 求$\\triangle AQB$的面积$S$的最小值。\n\n② 是否存在垂直于$x$轴的定直线$m$被以$AP$为直径的圆所截得的线段长为定值？如存在，求出$m$的方程；如果不存在，说明理由。"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774968047443",
            "type": "text",
            "content": "$y^2=4x$\n\n$r=\\frac{\\sqrt{(x_1-9)^2+y_1^2}}{2},d=2+\\frac{x_1}{2}-m$\n\n$r^2-d^2$以$x_1$为变量"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775059513546",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/0244c9ea2ce4708c8e5e437e45bba65b.jpg",
            "width": 500
          },
          {
            "id": "sol-1775059522879",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/333beb63811a095032c5cdac83566866.jpg",
            "width": 500
          },
          {
            "id": "sol-1775059570065",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/a0cf7ff98b4782a78768ef819579a1af.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774966001914",
        "blocks": [
          {
            "id": "block-1774966001914",
            "type": "text",
            "content": "已知$A(0,1),F(0,-2)$分别是双曲线$C:\\frac{y^2}{a^2}-\\frac{x^2}{b^2}=1(a>0,b>0)$的上顶点、下焦点.\n\n(1) 求$C$的标准方程.\n\n(2) 过$F$的直线与$C$的上、下支分别交于$B,D$两点（$B$异于$A$），直线$x=t$平分线段$BD$，与$C$的下支交于点$E$.\n\n① 证明：直线$AE$与直线$BD$的交点在一条定直线上；\n\n② 过$B,D,E$三点的圆是否经过定点，请说明理由."
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1775059590996",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/45993972585500a888ab5ca46208e908.jpg",
            "width": 450
          },
          {
            "id": "sol-1775059598990",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/c79a7599fda21f7ae796cb435bc9cb78.jpg",
            "width": 450
          }
        ]
      },
      {
        "id": "qb-1774966001992",
        "blocks": [
          {
            "id": "block-1774966001992",
            "type": "text",
            "content": "设椭圆$E:\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1(a>b>0)$的左右焦点为$F_1,F_2$，右顶点为$A$，已知点$P$在椭圆$E$上，若$\\angle F_1PF_2=90^\\circ,\\angle PAF_2=45^\\circ$，则椭圆$E$的离心率为（ ）"
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774968266010",
            "type": "text",
            "content": "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$\n\n$x+y=a$\n\n$cy=b^2$\n"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775059709948",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/62abca8422f53d2ceae6e71e289d5756.jpg",
            "width": 500
          },
          {
            "id": "sol-1775059719042",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/56e5bbd975dfae2354788b431643f2b1.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774966002287",
        "blocks": [
          {
            "id": "block-1774966002287",
            "type": "text",
            "content": "法国数学家加斯帕尔·蒙日发现：椭圆的任意两条相互垂直的切线的交点都在同一个圆上，该圆的圆心是椭圆的中心，半径等于椭圆半长轴长与半短轴长的平方和的算术平方根，这个圆叫蒙日圆。已知椭圆$C:\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1(a>b>0)$的蒙日圆方程为$x^2+y^2=4$，且椭圆的离心率为$\\frac{\\sqrt{6}}{3}$.\n\n(1) 求椭圆$C$的方程；\n\n(2) 过点$M$作椭圆$C$的两条切线，两切线斜率之积为$\\frac{1}{2}$，求$M$的轨迹方程$\\Gamma$.\n"
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1774968318919",
            "type": "text",
            "content": "法一：设切线方程：$y-y_0=k(x-x_0)$\n\n联立$\\frac{x^2}{3}+y^2=1$\n\n得$(\\frac{1}{3}+k^2)x^2-2k(kx_0-y_0)x+(kx_0-y_0)^2-1=0$\n\n$\\Delta=0\\Leftrightarrow(3-x_0^2)k^2+2x_0y_0k+1-y_0^2=0$\n\n<span class=\"text-red-600\">$k_1,k_2$为方程两根</span>\n\n<span class=\"text-red-600\">$\\frac{1-y_0^2}{3-x_0^2}=\\frac{1}{2}$\n</span>\n\n<span class=\"text-red-600\">$x_0^2-2y_0^2=1$\n</span>\n\n法二：$AB:\\frac{x_0x}{3}+y_0y=1$\n\n$\\begin{cases}\\frac{x_0x}{3}+y_0y=1 ①\\\\ \\frac{x^2}{3}+y^2=1②\\end{cases}$ \n\n②$-$① 得$(\\frac{x^2}{9}-\\frac{1}{9})x^2+\\frac{2x_0y_0}{3}xy+(y_0^2-1)y^2=0$\n\n$(y_0^2-1)(\\frac{y}{x})^2+\\frac{2x_0y_0}{3}\\cdot\\frac{y}{x}+\\frac{x_0^2-3}{9}=0$\n\n$k_1k_2=\\frac{1}{2}\\Leftrightarrow\\frac{x_1}{3y_1}(\\frac{x_2}{3y_2})=\\frac{1}{2}$\n\n$\\Leftrightarrow\\frac{y_1y_2}{x_1x_2}=\\frac{2}{9}$\n\n<span class=\"text-red-600\">$\\frac{y_1}{x_1},\\frac{y_2}{x_2}$为二次方程两根\n</span>\n\n<span class=\"text-red-600\">$\\frac{\\frac{x_0^2-3}{9}}{y_0^2-1}=\\frac{2}{9}$\n</span>\n\n<span class=\"text-red-600\">$x_0^2-2y_0^2=1$</span>\n"
          },
          {
            "id": "sol-1775059810533",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/62080b1575d3f35d32e6791728b7cdeb.jpg",
            "width": 450
          },
          {
            "id": "sol-1775059822991",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/d5416e6a671e80b44df08b8ba306d63e.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774966002484",
        "blocks": [
          {
            "id": "block-1774966002484",
            "type": "text",
            "content": "【2024·武汉模拟】已知平面上一半径小于$4$的动圆$C$与定圆$M:(x+\\sqrt{3})^2+y^2=16$相内切，且过定点$N(\\sqrt{3},0)$.\n\n(1) 求动圆圆心$C$的轨迹方程；\n\n(2) 设直线$l:y=x+t$与(1)中轨迹交于不同的两点$A,B$，点$O$为坐标原点.\n\n① 求$|AB|$的最大值.\n\n② 当直线$l$不过原点$O$时，记$\\triangle AOB$外接圆的圆心为$E$，则平面上是否存在两定点$P,Q$，使得$||EP|-|EQ||$为定值，若存在，求出定点坐标和定值；若不存在，请说明理由."
          }
        ],
        "hintBlocks": [],
        "solutionBlocks": [
          {
            "id": "sol-1774969067854",
            "type": "text",
            "content": "$\\frac{x^2}{4}+y^2=1$\n\n<span class=\"text-red-600\">设$\\odot E:x^2+y^2-Dx-Ey=0$</span>\n\n$\\begin{cases}x^2+y^2-Dx-Ey=0 \\\\ \\frac{x^2}{4}+y^2=1\\end{cases}$\n\n$2x^2-(D+E-2t)x-Et+t^2=0$\n\n$x_1+x_2=\\frac{D+E}{2}-t,x_1x_2=\\frac{t^2-Et}{2}$ ①\n$\\begin{cases}y=x+t \\\\ \\frac{x^2}{4}+y^2=1\\end{cases}$\n\n$\\frac{5}{4}x^2+2tx+t^2-1=0$\n\n$x_1+x_2=-\\frac{8}{5}t,x_1x_2=\\frac{4(t^2-1)}{5}$ ②\n\n由①②得$D=-\\frac{3t}{5}-\\frac{8}{5t},E=-\\frac{3t}{5}+\\frac{8}{5t}$\n\n$E(x,y)=（\\frac{D}{2},\\frac{E}{2})=(-\\frac{3t}{10}-\\frac{4}{5t},-\\frac{3t}{10}+\\frac{4}{5t})$\n\n$x^2-y^2=(x+y)(x-y)=\\frac{24}{25}$\n\n$\\therefore E$在双曲线$x^2-y^2=\\frac{24}{25}$上\n\n$||EP|-|EQ||=\\frac{4\\sqrt{6}}{5}$"
          },
          {
            "id": "sol-1775060097052",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/858fdb7cf2f2961f137df0f8a84a8d95.jpg"
          },
          {
            "id": "sol-1775060143523",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/a5710b01b5931755dbc2b6a2e1b71ee3.jpg"
          },
          {
            "id": "sol-1775060187814",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/a5057987f8c95dbd8223beb03d57ed13.jpg"
          }
        ]
      },
      {
        "id": "qb-1774966002606",
        "blocks": [
          {
            "id": "block-1774966002606",
            "type": "text",
            "content": "【2025·江苏南京二模】如图，椭圆$\\Gamma_1:\\frac{x^2}{m}+\\frac{y^2}{n}=1(m>n>0)$，$\\Gamma_2:\\frac{x^2}{n}+\\frac{y^2}{m}=1$，已知$\\Gamma_1$右顶点为$H(2,0)$，且它们的交点分别为$P_1(1,1),P_2(-1,1),P_3(-1,-1),P_4(1,-1)$\n\n(1) 求$\\Gamma_1$与$\\Gamma_2$的标准方程；\n\n(2) 过点$P_1$作直线$MN$，交$\\Gamma_1$于点$M$，交$\\Gamma_2$于点$N$，设直线$P_1M$的斜率为$k_1$，直线$P_1N$的斜率为$k_2$，求$\\frac{k_2}{k_1}$；（上述各点均不重合）\n\n(3) 点$Q_1$是$\\Gamma_1$上的动点，直线$Q_1P_1$交$\\Gamma_2$于点$Q_2$，直线$Q_2P_3$交$\\Gamma_1$于点$Q_3$，直线$Q_3P_3$交$\\Gamma_2$于点$Q_4$，直线$Q_4P_4$与直线$Q_1P$交于点$N$，求点$G$坐标，使直线$NG$与直线$NH$的斜率之积为定值。（上述各点均不重合）"
          },
          {
            "id": "block-1775060044960",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/b56bd79b8d9d5861b0103e269ddaf057.jpg",
            "width": 800
          }
        ],
        "hintBlocks": [
          {
            "id": "hint-1774969340945",
            "type": "text",
            "content": "(1) $\\Gamma_1:\\frac{x^2}{4}+\\frac{3y^2}{4}=1,\\Gamma_2:\\frac{3x^2}{4}+\\frac{y^2}{4}=1$\n\n(2) $\\frac{y_1-1}{x_1-1}=\\frac{y_2-1}{x_2-1}=\\frac{1}{3}\\frac{x_2+1}{y_2+1}=\\frac{3(x_2+1)}{y_2+1}$\n\n$\\frac{k_2}{k_1}=\\frac{\\frac{y_2+1}{x_2+1}}{\\frac{y_1+1}{x_1+1}}=9$"
          }
        ],
        "solutionBlocks": [
          {
            "id": "sol-1775060207536",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/316856aec2717442a046eb116cbd1d13.jpg",
            "width": 400
          },
          {
            "id": "sol-1775060217226",
            "type": "image",
            "content": "/images/高中数学精编题库/解析几何/22bea5c51bcab1563a2f88c4b3aeba20.jpg",
            "width": 500
          }
        ]
      },
      {
        "id": "qb-1774966002695",
        "blocks": [
          {
            "id": "block-1774966002695",
            "type": "text",
            "content": "已知双曲线$C:\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1(b>a>0)$的中心为$O$，右焦点为$F$，点$M,N$分别在$C$的左、右支上，且$|\\overrightarrow{OM}+\\overrightarrow{ON}|=|\\overrightarrow{OM}-\\overrightarrow{ON}|$，若$|MN|\\cdot|OF|<|OM|\\cdot|ON|$，则$C$的离心率的取值范围为（ ）"
          }
        ],
        "options": [
          "$(1,\\frac{1+\\sqrt{5}}{2})$",
          "$(\\sqrt{2},\\frac{1+\\sqrt{5}}{2})$",
          "$(\\sqrt{2},2)$",
          " $(\\frac{1+\\sqrt{5}}{2},+\\infty)$"
        ],
        "correctOption": 1,
        "choiceType": "single",
        "hintBlocks": [
          {
            "id": "hint-1774969467645",
            "type": "text",
            "content": "$c<d$\n\n$\\begin{cases}b^2x^2-a^2y^2=a^2b^2 \\\\ mx+ny=ab\\end{cases}$\n\n$b^2x^2-a^2y^2=m^2x^2+n^2y^2+2mnxy$\n\n$(b^2+a^2)(\\frac{y}{x})^2+2mn\\frac{y}{x}+m^2-b^2=0$\n\n$\\frac{m^2-b^2}{n^2+a^2}=-1,m^2+n^2=b^2-a^2$\n\n$d=\\frac{|ab|}{\\sqrt{m^2+n^2}}=\\frac{ab}{\\sqrt{b^2-a^2}}$\n"
          }
        ],
        "solutionBlocks": []
      },
      {
        "id": "qb-1774966002799",
        "blocks": [
          {
            "id": "block-1774966002799",
            "type": "text",
            "content": "已知曲线$C:(x-y)^2+\\lambda(y-1)^2=5,\\lambda\\in\\mathbb{R}$，则下列选项正确的是（ ）"
          }
        ],
        "options": [
          "$\\exists\\lambda\\in\\mathbb{R}$，使得曲线$C$为圆",
          "$\\forall\\lambda\\in\\mathbb{R}$，曲线$C$都关于点$(1,1)$中心对称",
          "当$\\lambda=1$时，$x\\in[1-\\sqrt{10},1+\\sqrt{10}]$",
          "当$\\lambda=-1$时，直线$y=\\frac{x+1}{2}$是曲线$C$的一条渐近线"
        ],
        "correctOptions": [
          1,
          2,
          3
        ],
        "choiceType": "multiple",
        "hintBlocks": [
          {
            "id": "hint-1774969540748",
            "type": "text",
            "content": "B. <span class=\"text-red-600\">令$x=2-x,y=2-y$</span>，方程不变\n\nC. <span class=\"text-red-600\">$y=1+\\sqrt{5}\\sin\\theta$</span>\n\n<span class=\"text-red-600\">$x=1+\\sqrt{5}\\sin\\theta+\\sqrt{5}\\cos\\theta$</span>$\\in[1-\\sqrt{10},1+\\sqrt{10}]$\n\nD. <span class=\"text-red-600\">令等号右边为0</span>，得$y=\\frac{x+1}{2}$或$x=1$，即两条渐近线"
          }
        ],
        "solutionBlocks": []
      }
    ]
  }
];

// 加载本地存储的数据（开发时使用，上线前将数据导出到此文件）
export function loadStaticContent(): { topics: StaticTopic[]; questionBank: StaticQuestionBankChapter[] } {
  // 默认返回空数据结构
  return {
    topics: staticAdvancedTopics,
    questionBank: staticQuestionBankChapters
  };
}
