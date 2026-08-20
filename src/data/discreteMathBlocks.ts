// 离散数学讲义（来源：DiscreteMath-main 开源讲义，罗森《离散数学及其应用》读书笔记）
// 生成文件，请勿手改；原始 md 位于 D:/学习/欧拉之路/DiscreteMath-main
import type { Chapter } from './advancedMathBlocks';

export const discreteMathChapters: Chapter[] = [
  {
    id: "dm-ch1",
    title: "第1章 基础：逻辑和证明",
    description: "命题逻辑、谓词与量词、推理规则与证明方法",
    icon: "🧠",
    lessons: [
      {
        id: "dm-ch1-lesson-1",
        title: "归谬证明",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch1-lesson-1-0",
            type: "text",
            content: "# 归谬证明\n\n为了要证明一个结论为假，首先先假设其为真，然后使用该假设进行推论，直到得到一个错误的结论，则证明假设为假，类似：\n$$\np\\ \\rightarrow\\ q\n$$\n当 q 为假时，p也为假，结论才为真。\n\n例子：\n$$\n\\sqrt{2}\\ 为无理数\n$$\n证明过程：\n$$\n首先假设 \\sqrt{2}为有理数，则 \\\\\n\\exists p \\exists q \\in {N}^{+}\\ 且\\ gcd(p,q)=1,使得 \\sqrt{2}=\\frac{p}{q}，两边平方\\\\\n2=\\frac{{p}^{2}}{{q}^{2}}\\\\\n{p}^{2}=2{q}^{2}\\\\\n则 p\\ 含有因素2，即 p可以写成 p=2k的形式，带入上面的式子中：\\\\\n4{k}^{2}=2{q}^{2}，约掉一个2之后，\\\\\n2{k}^{2}={q}^{2}，同理，q中也有一个因素2，则\\ gcd(p,q)=2，这跟上面的假设矛盾，所以结论为假，即开始的假设为假。\n$$\n这里可能有疑问，证明过程中的因素2哪来的？这里其实有个很别扭的地方，就是我知道p当中不可能有2的因素，但是换个角度，假如是真的有理数，则会好理解很多：\n$$\np=8,q=2,则 \\frac{8}{2}=4,\\ \\frac{{8}^{2}}{{2}^{2}}={4}^{2}\\\\\n{8}^{2}=16 \\cdot\\ {2}^{2} \\\\\n那么我们会很容易理解 8= \\frac{1}{2} \\cdot\\ 16\n$$\n但是在上面中，因为根号2不是有理数，所以我主观上就感觉这一块证明很别扭。\n\n"
          }
        ]
      },
      {
        id: "dm-ch1-1-2",
        title: "第1章 基础：逻辑和证明 2",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch1-1-2-0",
            type: "text",
            content: "# 1.5 嵌套量词\n\n即量词作用域的叠加。如\n$$\n\\forall x \\exists y\\ (x+y=0)\n$$\n即对于所有x，都存在一个y，使得x+y=0。\n\n再来对于我们熟悉的加法交换律，可以采用下面的形式来表示：\n$$\n\\forall x \\forall y\\ (x+y=y+x)\n$$\n\n#### 注意事项：量词的顺序\n\n$$\n式子1\\ \\forall x \\forall y\\ (x+y=y+x) \\\\\n式子2\\ \\forall y \\forall x\\ (x+y=y+x)\n$$\n\n在上面的式子1和式子2中，前面量词的交换是不会产生影响的，两个命题都为真。但是下面这种就不行了：\n$$\n式子1\\ \\forall x \\exists y (x+y=0) \\\\\n式子2\\ \\exists y \\forall x (x+y=0)\n$$\n\n式子1是真命题，对于所有x，都存在一个y，使得x+y=0。\n\n但是式子2的含义则是，存在一个y，使得所有x能满足y+x=0，就我目前的知识水平来说，感觉这种数不存在。\n\n也有一种常见表现形式：\n$$\nP(x,y)代表x+y=0，\\forall x \\exists y P(x,y)\n$$\n\n# 1.6 推理规则\n\n$$\n\\frac{\np \\rightarrow q \\\\\np\n}{\n\\therefore q\n}\n$$\n\n在推理过程中，需要保证前提都为真，在前提为真的情况下，结论必定为真。\n\n------------------\n\n#### 假言推理\n\n$$\n\\frac{\np\\\\\np \\rightarrow q\n}{\n\\therefore q\n}\n$$\n\n#### 取拒式\n\n$$\n\\frac{\n\\neg q \\\\\np \\rightarrow q\n}{\n\\therefore \\neg p\n}\n$$\n\n#### 假言三段论\n\n$$\n\\frac{\np \\rightarrow q \\\\\nq \\rightarrow r\n}{\n\\therefore p \\rightarrow r\n}\n$$\n\n#### 析取三段论\n\n$$\n\\frac{\np \\vee q \\\\\n\\neg p\n}{\n\\therefore q\n}\n$$\n\n#### 附加论\n\n$$\n\\frac{p}{\\therefore p \\vee q}\n$$\n\n#### 化简率\n\n$$\n\\frac{p \\wedge q}{\\therefore p}\n$$\n\n#### 合取率\n\n$$\n\\frac{p\\\\q}{\\therefore p \\wedge q}\n$$\n\n#### 消解率\n\n$$\n\\frac{\np \\vee q \\\\\n\\neg p \\vee r\n}{\n\\therefore q \\vee r\n}\n$$\n\n### 量化命题的推理规则\n\n#### 全称实例\n\n$$\n\\frac{\n\\forall x P(x)\n}{\n\\therefore P({x}_{0})\n}\n$$\n\n#### 全称引入\n\n$$\n\\frac{\nP(c)，c为任意值\n}{\n\\therefore \\forall x P(x)\n}\n$$\n\n#### 存在实例\n\n$$\n\\frac{\n\\exists x P(x)\n}{\n\\therefore p(c)，c为某一特定值\n}\n$$\n\n#### 存在引入\n\n$$\n\\frac{\nP(c)，对于某个值c\n}{\n\\exists x P(x)\n}\n$$\n\n# 1.7 证明导论\n\n#### 直接证明\n\n$$\n\\frac{\np \\\\\nq\n}{\n\\therefore p \\rightarrow q\n}\n$$\n\n例子：\n$$\np：n是奇数时 \\\\\nq: {n}^{2} 也是是奇数\n$$\n只需要证明在p为真的情况下，q也肯定为真，就能证明上面的命题为真。\n\n#### 间接证明\n\n$$\np \\rightarrow q \\equiv\n\\neg q \\rightarrow \\neg p \n$$\n\n这里补充一下上面的内容的真值表：\n\n| p    | q    | 逆q  | 逆p  | p蕴含q | 逆q蕴含逆p |\n| ---- | ---- | ---- | ---- | ------ | ---------- |\n| 0    | 0    | 1    | 1    | 1      | 1          |\n| 0    | 1    | 0    | 1    | 1      | 1          |\n| 1    | 0    | 1    | 0    | 0      | 0          |\n| 1    | 1    | 0    | 0    | 1      | 1          |\n\n$$\n\\frac{\n\\neg q\\\\\n\\neg p \\\\\n\\neg q \\rightarrow \\neg p\n}{\n\\therefore p \\rightarrow q\n}\n$$\n\n\n\n例子：\n$$\np：3*n+2 是奇数 \\\\\nq：n是奇数\n$$\n换个思路：\n$$\n\\neg q：n不是奇数 \\\\\n\\neg p：3*n+2 不是奇数\n$$\n证明：\n$$\nk \\in \\textbf{N} \\\\\n3*n+2 = 2*k \\\\\nn+2*n = 2*(k-1) \\\\\n2*n 不是奇数，2*(k-1)也不是奇数，所以n肯定不是奇数 \\\\\n$$\n\n#### 归谬证明\n\n$$\n\\frac{\n\\neg p \\rightarrow (r \\wedge \\neg r)\n}{\n\\therefore p \n}\n$$\n\n\n\n这个我也没搞懂。\n\n# 1.8 证明的方法和策略\n\n#### 穷举证明\n\n例子：\n$$\nn \\in {N}_{+}，n <=4 时，{(n+1)}^{3}>={3}^{n}\n$$\n不用管，直接拿n=1，2，3，4往里代就行了。\n\n#### 分情形证明\n\n例子：\n$$\nn \\in \\textbf{N},\\ {n}^{2}>=n\n$$\n证明：\n$$\n\\begin{cases}\nn=0&,0=0 \\\\\nn>0&,n>=1 \\\\\nn<0&,{n}^{2}>0\n\\end{cases}\n$$\n\n#### 存在性证明\n\n#### 唯一性证明\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch1-1",
        title: "第1章 基础：逻辑和证明",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch1-1-0",
            type: "text",
            content: "# 简介\n\n我为什么要写这个呢？因为我信奉一点，纸质材料肯定会丢失的，所以我在尽量将内容转化成电子文档。至于为社么不选择OneNote，有道云笔记之类的，就是想以博客更新的方式催促自己可以坚持下去，过个1年，2年来看自己当初的付出，那是真的会很爽的，特别是希望自己到时候能感受到自己现在的努力或者犯傻。\n\n再来是下面的内容来自哪里呢？来自《离散数学及其应用》。\n\n接着是下面的公式是怎么写的呢？LaTex。\n\n最后就是下面的内容类似我的读书笔记之类的，让我以后需要的时候可以拿来翻翻，所以类似总结，说明很少。\n\n# 1.1 命题逻辑\n\n$$\n\\wedge 合取\n\\\\\n\\vee 析取\n$$\n\n$$\np \\oplus q\\ 真值表\n$$\n\n| p    | q    | 异或 |\n| ---- | ---- | ---- |\n| T    | T    | F    |\n| T    | F    | T    |\n| F    | T    | T    |\n| F    | F    | F    |\n\n$$\np \\longrightarrow q\\ 真值表 / 蕴含\n$$\n\n| p    | q    | 条件语句 |\n| ---- | ---- | -------- |\n| T    | T    | T        |\n| T    | F    | F        |\n| F    | T    | T        |\n| F    | F    | T        |\n\n可以结合下面的例子来理解：\n\n- p：张生如果高中\n- q：张生娶崔莺莺\n\n问，在什么情况下张生食言了？\n\n| 情况 | p            | q              | 条件语句                         |\n| ------------| ------------ | -------------- | -------------------------------- |\n| 1 | 张生高中     | 娶崔莺莺       | 张生没有食言                     |\n| 2 | 张生高中     | 没有娶崔莺莺   | 张生食言了                       |\n| 3 | 张生没有高中 | 娶崔莺莺       | 张生没有食言，他娶了崔莺莺       |\n| 4 | 张生没有高中 | 也没有娶崔莺莺 | 张生本质上没有食言，他的确没高中 |\n\n其中可能有人会在3和4之间纠结，因为觉得3也应该算张生食言了，但是和情况2比较，你觉得哪个更像张生食言了？\n\n### 逻辑运算优先级\n\n可以这么理解，逆类似负数的符号，优先级肯定是最高的。\n\n接下来的就是合取优先级高于析取。\n\n最后就是蕴含。\n\n# 1.3 命题等价式\n#### 衡等律\n\n$$\np\\wedge \\textbf{T} \\equiv p \\\\ p \\vee \\textbf{F} \\equiv p\n$$\n\n\n\n#### 支配率\n\n$$\np \\vee \\textbf{T} \\equiv \\textbf{T} \\\\\np \\wedge \\textbf{F} \\equiv \\textbf{F}\n$$\n\n#### 幂等律\n\n$$\np \\wedge p \\equiv p \\\\\np \\vee p \\equiv p\n$$\n\n#### 双重否定率\n\n$$\n\\neg ( \\neg P ) \\equiv p\n$$\n\n#### 交换律\n\n$$\n p \\vee q \\equiv q \\vee p \\\\\n p \\wedge q \\equiv q \\wedge p\n$$\n\n#### 结合律\n\n$$\n( p \\wedge q ) \\wedge r \\equiv p \\wedge ( q \\wedge r ) \\\\\n( p \\vee q ) \\vee r \\equiv p \\vee ( q \\vee r )\n$$\n\n#### 分配率\n\n$$\n(p \\vee r) \\wedge (q \\vee r) \\equiv ( p \\wedge q ) \\vee r   \\\\ \n(p \\wedge r) \\vee (q \\wedge r) \\equiv  ( p \\vee q ) \\wedge r \n$$\n\n#### 德 摩根率\n\n$$\n\\neg ( p \\wedge q ) \\equiv (\\neg p) \\vee (\\neg q) \\\\\n\\neg ( p \\vee q ) \\equiv (\\neg p) \\wedge (\\neg q)\n$$\n\n#### 吸收率\n\n$$\np \\vee (p \\wedge q) \\equiv p \\\\\np \\wedge (p \\vee q) \\equiv p\n$$\n\n#### 否定率\n\n$$\n p \\vee \\neg p \\equiv \\textbf{T} \\\\\n p \\wedge \\neg p \\equiv \\textbf{F}\n$$\n\n# 1.4 量词和谓词\n\n#### 量词\n\n$$\n\\forall x\\ \\textbf{P}(x)\n$$\n\n**全称量词**：对于所有`x`，`P(x)`都为真。但是如果存在一个`x`，使得`P(x)`为假，上面的命题就是假的。\n$$\n\\exists x \\textbf{P}(x)\n$$\n**存在量词**：至少存在一个`x`，使得`P(x)`为真。当对于每一个`x`，`P(x)`为真时，上面的命题就是假的。\n$$\n\\exists ! \\\\\n{\\exists}_{1} \n$$\n上面的代表唯一性量词，代表`x`仅有一个值能使`P(x)`为真。\n\n#### 优先级注意事项\n\n$$\n\\forall x \\textbf{P}(x) \\vee \\textbf{Q}(x) \\equiv (\\forall x \\textbf{P}(x))\\ \\vee\\ (\\textbf{Q}(x)) \\\\\n而不是\\\\\n\\forall x (\\textbf{P}(x)\\ \\vee\\ \\textbf{Q}(x)))\n$$\n\n还有一种常见的表现形式：\n$$\n\\forall x < 0\\ ({x}^{2}>0)\n$$\n代表的含义就是对于所有的`x<0`，`x`的平方大于0。\n\n#### 量词的否定，即量词的德 摩根率\n\n$$\n\\neg \\forall x \\textbf{P}(x)\\ \\equiv \\exists x\\ \\neg\\textbf{P}(x)\n$$\n\n上面的含义就是对于所有x，P(x)为真的逆就是存在x，使得p(x)为假。\n\n同理。\n$$\n\\neg \\exists x \\textbf{P}(x) \\equiv \\forall x \\neg\\textbf{P(x)}\n$$\n存在x，使得p(x)为真的逆就是没有x，使得p(x)为真，即对于所有x，p(x)为假。\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch2",
    title: "第2章 集合、函数、序列、求和与矩阵",
    description: "集合运算、函数、序列与求和、矩阵运算",
    icon: "🔢",
    lessons: [
      {
        id: "dm-ch2-2",
        title: "第2章 集合、函数、序列、求和与矩阵",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch2-2-0",
            type: "text",
            content: "# 2.1 集合\n\n#### 子集\n\n$$\nx \\in {N}_{+} \\\\\nx \\subseteq {N}\\\\\nx是\\textbf{N}的子集\n$$\n\n#### 空集\n\n$$\n\\begin{eqnarray*}\nS 是任意集合  \\\\\n\\emptyset \\subseteq S \\tag{2.1.1} \\\\\nS \\subseteq S \\tag{2.1.2}\n\\end{eqnarray*}\n$$\n\n#### 基数：集合中元素的个数\n\n$$\n\\left\\vert S \\right\\vert\\ 代表集合的基数\n$$\n\n例子：\n$$\nS 代表小于10的正整数奇数，则\\ \\left\\vert S \\right\\vert = 5。\n$$\n\n#### 幂集：集合S所有子集的集合\n\n例子:\n$$\n{0,1,2}的幂集是\\\\\n\\mathcal{P}(\\{0,1,2\\})=\\{\\\\\n\t\\emptyset,\\\\\n\t\\{0\\},\\{1\\},\\{2\\},\\\\\n\t\\{0,1\\},\\{0,2\\},\\{1,2\\},\\\\\n\t\\{1,2,3\\}\\\\\n\\}\n$$\n\n\n#### 笛卡尔积\n\n直接来一个例子会好理解很多：\n$$\n集合A=\\{a,b\\}\\\\\n集合B=\\{0,1,2\\}\\\\\nA和B的笛卡尔积就是：\\\\\nA \\times B = \\{\\\\\n\\{a,0\\},\\{a,1\\},\\{a,2\\}\\\\\n\\{b,0\\},\\{b,1\\},\\{b,2\\}\\\\\n\\}\n$$\n两个集合的笛卡尔积也可以采用下面的公式表示：\n$$\nA \\times B = \\{(a,b)\\mid a \\in A \\wedge\\ b \\in B\\}\n$$\n\n#### 量词和集合\n\n例子：\n$$\n\\forall x \\in \\textbf{R}\\ ({x}^{2}>=0) \\\\\n\\exists x \\in \\textbf{Z}\\ ({x}^{2}=1)\n$$\n真值集和量词\n$$\n\\{\\ x \\in D | P(x)\\ \\}\\ 代表的含义是，对于集合D中的任何一个元素x，P(x)都为真。\n$$\n\n# 2.2 集合运算\n\n集合中的一些概念。\n\n#### 并集\n\n$$\nA \\cup B\n$$\n\n#### 交集\n\n$$\nA \\cap B\n$$\n\n#### 差集\n\n$$\nx \\in (A - B)，该集合代表该元素属于集合A,但是不属于集合B\n$$\n\n#### 补集\n\n$$\nU表示全集，\\bar{A}代表A的补集，即 U-A\n$$\n\n集合的一些衡等式。\n\n#### 恒等律\n\n$$\nA \\cap U = A \\\\\nA \\cup \\emptyset = A\n$$\n\n#### 支配率\n\n$$\nA \\cup U = U \\\\\nA \\cap \\emptyset = \\emptyset\n$$\n\n#### 幂等律\n\n$$\nA \\cap A = A \\\\\nA \\cup A = A\n$$\n\n#### 补律\n\n$$\n\\overline{\\bar{A}}=A\n$$\n\n#### 交换律\n\n$$\nA \\cap B = B \\cap A \\\\\nA \\cup B = B \\cup A\n$$\n\n#### 结合律\n\n$$\nA \\cup (B \\cup C) = (A \\cup B) \\cup C \\\\\nA \\cap (B \\cap C) = (A \\cap B) \\cap C\n$$\n\n#### 分配率\n\n$$\n\\begin{eqnarray*}\nA \\cup (B \\cap C)=(A \\cup B) \\cap (A \\cup C) \\tag{1}\\\\\nA \\cap (B \\cup C)=(A \\cap B) \\cup (A \\cap C) \\tag{2}\n\\end{eqnarray*}\n$$\n\nA：一杯有芋圆的奶茶\n\nB：一杯有珍珠的奶茶\n\nC：一杯有波霸的奶茶\n\n式子1:\n\n左边：一杯一定有芋圆，但是肯定没有珍珠和波霸的奶茶\n\n右边：一杯一定有芋圆和珍珠的奶茶，一杯一定有芋圆和波霸的奶茶，这两杯奶茶的交集：一定有芋圆，但是肯定没有珍珠和波霸\n\n式子2:\n\n左边：一杯奶茶里肯定没有芋圆，珍珠和波霸\n\n右边：一杯肯定没有芋圆和珍珠的奶茶，再混上一杯肯定没有芋圆和波霸的奶茶，即一杯肯定没有芋圆和珍珠，以及波霸的奶茶\n\n#### 德 摩根率\n\n$$\n\\begin{eqnarray*}\n\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B} \\tag{3} \\\\\n\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B} \\tag{4}\n\\end{eqnarray*}\n$$\n\n式子3：\n\n左边：一杯可能有芋圆或者珍珠的奶茶\n\n右边：一杯没有芋圆的奶茶再混入一杯没有珍珠的奶茶\n\n式子4:\n\n左边：一杯肯定没有芋圆和珍珠的奶茶\n\n右边：一杯肯定没有芋圆的奶茶，和一杯肯定没有珍珠的奶茶的交集，那就肯定没有芋圆和珍珠的奶茶\n\n#### 吸收率\n\n$$\n\\begin{eqnarray*}\nA \\cup (A \\cap B) = A \\tag{5} \\\\\nA \\cap (A \\cup B) = A \\tag{6}\n\\end{eqnarray*}\n$$\n\n#### 互补率\n\n$$\nA \\cup \\bar{A} = U \\\\\nA \\cap \\bar{A} = \\emptyset\n$$\n\n#### 一组集合的交集和并集\n\n$$\n{A}_{0} \\cup {A}_{1} \\cup {A}_{2} \\cup {A}_{3} \\cup \\cdots {A}_{n} = \n\\begin{gathered}\nn \\\\\n\\bigcup \\\\\ni=0\n\\end{gathered}\n{A}_{i}\n$$\n\n$$\n{A}_{0} \\cap {A}_{1} \\cap {A}_{2} \\cap {A}_{3} \\cap \\cdots {A}_{n} = \n\\begin{gathered}\nn \\\\\n\\bigcap \\\\\ni=0\n\\end{gathered}\n{A}_{i}\n$$\n\n#### 多重集合\n\n采用下面的形式记录一个元素在集合中出现的次数：\n$$\n\\{{m}_{0}\\bullet{a}_{0},{m}_{1}\\bullet{a}_{1},{m}_{2}\\bullet{a}_{2},\\dots\\}\n$$\n\n# 2.3 函数\n\n不按照书上的严格定义，简单点来说函数就是一个集合到另一个集合的一种转换关系。但是一定要A中的元素仅能对应到B中的一个元素。\n$$\nf:A \\rightarrow B \\\\\nA 是 f 的定义域 \\\\\nB 是 f 的陪域 \\\\\n如果 f(a)=b \\\\\na 是 b 的原像 \\\\\nb 是 a 的像\n$$\n\n-----------\n\n$$\n如果 {f}_{1}和{f}_{2}是A到R的函数，那么：\\\\\n\\forall x \\in A\\\\\n{f}_{1}(x)+{f}_{2}(x)=({f}_{1}+{f}_{2})(x) \\\\\n{f}_{1}(x){f}_{2}(x)=({f}_{1}{f}_{2})(x)\n$$\n\n#### 一对一映射\n\n即A中的元素和B中的元素通过f是一一对应的。\n\n#### 映上函数 / 满射\n\n$$\n\\forall y \\exists x (f(y)=x)\n$$\n\n即对于集合B中的任何一个元素，都存在一个A中的元素与之对应。\n\n注意事项：\n\n- A 中的元素不用都对应到B中的元素\n- A中的元素可以多个元素对应到B中的一个元素\n- 一对一不一定是映上函数，因为可能有B中的元素没有对应到。\n\n#### 双射函数\n\n即改函数即是一对一函数，又是映上函数。\n\n#### 反函数\n\n如果f是一个双射函数，则其存在反函数。\n$$\nf(a)=b \\\\\n{f}^{-1}(b)=a\n$$\n\n#### 函数的合成\n\n$$\ng是集合A到集合B的函数，f是集合B到集合C的函数，函数f和g的合成记做 f \\circ g，即\\\\\n\\forall a \\in A，(g \\circ f)(a)=f(g(a))\n$$\n\n#### 上，下取整函数\n\n$$\n\\textbf{Z}代表整数，\\\\\n\\lceil x \\rceil\\ 代表\\ a \\in \\textbf{Z}, a>=x \\\\\n\\lfloor x \\rfloor\\ 代表\\ a \\in \\textbf{Z},a<=x\n$$\n\n# 2.4 序列和求和\n\n#### 序列求和\n\n$$\n\\sum^{j=m}_{n} {a}_{j}\n$$\n\n#### 几何序列求和\n\n$$\n\\sum^{n}_{j=0} a{r}^{j}=\n\\begin{cases}\n\\frac{\na{r}^{n+1}-a\n}{\nr-1\n}& r \\neq 1 \\\\\n(n+1)a& r=1\n\\end{cases}\n$$\n\n# 2.5 集合的基数\n\n$$\n如果一个无限集S是可数的，就使用阿里夫零来代表其基数：{\\aleph}_{0}，写作 |S|={\\aleph}_{0}\n$$\n\n什么叫做无限集S是可数的呢？就是可以把集合中的元素排列成序列。（具体内容没搞懂。。。。。。）\n\n# 2.6 矩阵\n\n$$\nm \\times n 代表的是一个 m 行，n列的矩阵 \\\\\nA=[{a}_{ij}]\\ 代表的是矩阵中第i行第j列的元素。\n$$\n\n#### 矩阵求和\n\n$$\nA + B = [{a}_{ij}+{b}_{ij}]\n$$\n\n例子：\n$$\n\\begin{vmatrix}\n1&2&3 \\\\\n4&5&6\n\\end{vmatrix}\n+\n\\begin{vmatrix}\n1&2&3 \\\\\n4&5&6\n\\end{vmatrix}\n=\n\\begin{vmatrix}\n2&4&6 \\\\\n8&10&12\n\\end{vmatrix}\n$$\n\n#### 矩阵乘法\n\n例子：\n\n$$\n\\begin{vmatrix}\n1&0&4\\\\\n2&1&1\\\\\n3&1&0\\\\\n0&2&2\n\\end{vmatrix}\n\\begin{vmatrix}\n2&4\\\\\n1&1\\\\\n3&0\\\\\n\\end{vmatrix}\n=\n\\begin{vmatrix}\n1*2+0*1+4*3 & 1*4+0*1+4*0 \\\\\n2*2+1*1+1*3 & 2*4+1*1+1*0 \\\\\n3*2+1*1+0*3 & 3*4+1*1+0*0 \\\\\n0*2+2*1+2*3 & 0*4+2*1+2*0 \\\\\n\\end{vmatrix}\n=\n\\begin{vmatrix}\n14&4\\\\\n8&9\\\\\n7&13\\\\\n8&2\n\\end{vmatrix}\n$$\n\n#### 克罗克内积\n\n$$\n{I}_{n}=[{\\delta}_{ij}]，如果 i=j，{\\delta}_{ij}=1，如果 i \\neq j，{\\delta}_{ij}=0 \\\\\n\\\\\n\\begin{vmatrix}\n1&0&0& \\cdots & 0\\\\\n0&1&0& \\cdots & 0\\\\\n0&0&1& \\cdots & 0\\\\\n\\vdots&\\vdots&\\vdots&\\vdots&\\vdots\\\\\n0&0&0&0&1\n\\end{vmatrix}\n\\\\\nA 是一个 m \\times n 的矩阵，则 A \\times {I}_{m} = A\n$$\n\n#### 转置\n\n$$\n矩阵 A 的转置记录为{A}^{T}，即交换行和列。\\\\\n\\begin{vmatrix}\n14&4\\\\\n8&9\\\\\n7&13\\\\\n8&2\n\\end{vmatrix}\n经过转置后\n\\begin{vmatrix}\n14&8&7&8\\\\\n4&9&13&2\n\\end{vmatrix}\n$$\n\n#### 对称矩阵：即经过转置后与原矩阵相同的矩阵\n\n如下面这个矩阵就是个对称矩阵\n$$\n\\begin{vmatrix}\n1&1&0\\\\\n1&0&1\\\\\n0&1&0\n\\end{vmatrix}\n$$\n\n#### 矩阵进行“并”和“交”计算\n\n$$\nA=\n\\begin{vmatrix}\n1&0&1\\\\\n0&1&0\n\\end{vmatrix},\nB=\n\\begin{vmatrix}\n0&1&0\\\\\n1&1&0\n\\end{vmatrix}\n$$\n\n并：\n$$\nA \\vee B =\\ \n\\begin{vmatrix}\n1 \\vee 0 & 0 \\vee 1 & 1 \\vee 0 \\\\\n0 \\vee 1 & 1 \\vee 1 & 0 \\vee 0\n\\end{vmatrix}\n=\n\\begin{vmatrix}\n1&1&1\\\\\n1&1&0\n\\end{vmatrix}\n$$\n交：\n\n$$\nA \\wedge B =\\ \n\\begin{vmatrix}\n1 \\wedge 0 & 0 \\wedge 1 & 1 \\wedge 0 \\\\\n0 \\wedge 1 & 1 \\wedge 1 & 0 \\wedge 0\n\\end{vmatrix}\n=\n\\begin{vmatrix}\n0&0&0\\\\\n0&1&0\n\\end{vmatrix}\n$$\n\n#### 布尔积\n\n$$\nA 是一个 m \\times k的集合，B是一个 k \\times n 的集合，A \\odot b 代表 A 和 B的布尔积。\n$$\n\n例子：\n$$\nA=\n\\begin{vmatrix}\n1&0\\\\\n0&1\\\\\n1&0\n\\end{vmatrix}，\nB=\n\\begin{vmatrix}\n1&1&0\\\\\n0&1&1\n\\end{vmatrix}\n\\\\\nA \\odot B=\n\\begin{vmatrix}\n(1 \\wedge 1) \\vee (0 \\wedge 0) & (1 \\wedge 1) \\vee (0 \\wedge 1) & (1 \\wedge 0) \\vee (0 \\wedge 1)\\\\\n(0 \\wedge 1) \\vee (1 \\wedge 0) & (0 \\wedge 1) \\vee (1 \\wedge 1) & (0 \\wedge 0) \\vee (1 \\wedge 1)\\\\\n(1 \\wedge 1) \\vee (0 \\wedge 0) & (1 \\wedge 1) \\vee (0 \\wedge 1) & (1 \\wedge 0) \\vee (0 \\wedge 1)\n\\end{vmatrix}\n=\n\\begin{vmatrix}\n1&1&0\\\\\n0&1&1\\\\\n1&1&0\n\\end{vmatrix}\n$$\n\n#### 布尔幂：即集合A的r次布尔积\n\n$$\n{A}^{[r]}=\\underbrace{A \\odot A \\odot A \\cdots A}_{r个A}\n$$\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch3",
    title: "第3章 算法",
    description: "算法的增长阶、复杂度分析与常见算法",
    icon: "⚙️",
    lessons: [
      {
        id: "dm-ch3-3",
        title: "第3章 算法",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch3-3-0",
            type: "text",
            content: "# 3.2 函数的增长\n\n[参考B站视频](https://www.bilibili.com/video/BV14j411f7DJ?t=670)\n\n大O表示法定义：\n$$\n当 x > k 时，|f(x)|<=C|g(x)|，C|g(x)｜就记做\\ O(g(x))\n$$\n这个其实很简单，分为2个部分取考虑：\n\n1. `f(x)`是什么，即代码会执行多少次。\n\n例1：\n\n```php\n// $n=100;\nfor($i=1;$i<=$n;$i++){\n  print \"当前i的值是：\".$i.PHP_EOL;\n}\n```\n\n问，上面这个函数执行多少次？答：`1+3*n`。`$i=1`是1，`$i<=$n`，`$i++`，`print print \"当前i的值是：\".$i.PHP_EOL;`各会执行n次，所以总次数为`1+3*n`次，即`f(x)=1+3*n`。\n\n然后考虑，当n趋紧于无限大的时候，+1和`*3`对n的值影响到不大，所以大O表示法就可以写成\n$$\nf(x)=1+3x=O(x) \\\\\n或者用更加习惯的n来替代x \\\\\nO(n)\n$$\n例2:\n\n```php\nfor($i=1;$i<=$n;$i++){\n  for($j=1;$j<=$n;$j++){\n    print \"当前i和j的值为:({$i},{$j})\".PHP_EOL;\n  }\n}\n```\n\n例2中，函数执行了多少次？`n*(3*n+1)+2*n+1`，计算后得到结果：\n$$\n3{n}^{2}+3n+1\n$$\n然后我们设想，n的平方的增加速度会比3n快很多，当n趋近于无限大的时候，上面的函数起主要作用的就是n的平方。\n$$\nf(x)=3{n}^{2}+3n+1=O({n}^{2})\n$$\n上面这两个例子可以总结成下面的这个定理：\n$$\nf(x)={a}_{n}{x}^{n}+{a}_{n-1}{x}^{n-1}+{a}_{n-2}{x}^{n-2} \\cdots + {a}_{1}{x}^{1}+ {a}_{0}{x}^{0} \\\\\n{a}_{n} \\in Q，\\\\\nf(x)=Q({x}^{n})\n$$\n证明过程：\n$$\nx>=1时\\\\\n|f(x)|=|{a}_{n}{x}^{n}+{a}_{n-1}{x}^{n-1}+{a}_{n-2}{x}^{n-2} \\cdots + {a}_{1}{x}^{1}+ {a}_{0}{x}^{0}| \\\\\n<=|{a}_{n}|{x}^{n}+|{a}_{n-1}|{x}^{n-1}+|{a}_{n-2}|{x}^{n-2} \\cdots + |{a}_{1}|{x}^{1}+ |{a}_{0}|{x}^{0} \\\\\n= {x}^{n}({a}_{n}+{a}_{n-1} \\times \\frac{1}{x} +{a}_{n-2} \\times \\frac{1}{{x}^{2}} \\cdots +{a}_{1} \\times \\frac{1}{{x}^{n-1}} +{a}_{n} \\times \\frac{1}{{x}^{n}}) \\\\\n<= {x}^{n}({a}_{n}+{a}_{n-1}+{a}_{n-2} \\cdots {a}_{1}+{a}_{0}) \\\\\n即 |f(x)|<=C|g(x)|，g(x)={x}^{n}，即 f(x)=O({x}^{n})\n$$\n至于这里为什么要x>1，是因为执行步骤肯定是存在的，如果没有执行步骤，那么讨论算法复杂度就没有意义了。\n\n#### 函数组合的增长\n\n相加：\n$$\n如果，{f}_{1}=O({g}_{1}(x)),{f}_{2}=O({g}_{2}(x)),\\\\则({f}_{1}+{f}_{2})(x)=O(g(x))，g(x)=max({g}_{1}(x),{g}_{2}(x))\n$$\n相乘：\n$$\n如果，{f}_{1}=O({g}_{1}(x)),{f}_{2}=O({g}_{2}(x)),\\\\则({f}_{1}{f}_{2})(x)=O(g(x))，g(x)=({g}_{1}(x){g}_{2}(x))\n$$\n\n#### 函数执行的下限：大欧米伽表示法\n\n$$\n当 x > k 时，|f(x)|>=C|g(x)|，C|g(x)｜就记做\\ \\Omega(g(x))\n$$\n\n上面是考虑x趋于无限大，这里则不是，具体根据定义来推倒吧，或者可以说是算法的一般情况。\n\n#### 当函数的大O表示法和大欧米伽相同时：大西塔\n\n$$\nf(x)=O(g(x))，f(x)=\\Omega(g(x))，则 f(x)= \\Theta (g(x))\n$$\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch4",
    title: "第4章 数论和密码学",
    description: "整除、同余、模运算、RSA 等密码学基础",
    icon: "🔐",
    lessons: [
      {
        id: "dm-ch4-4-4",
        title: "4.4 求解同余方程",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch4-4-4-0",
            type: "text",
            content: "# 4.4 求解同余方程\n\n#### 线性同余方程\n\n$$\nax \\equiv b\\ (mod\\ m)，其中，m \\in {N}^{+}，a,b \\in N，x为变量，这样的方程称为线性同余方程\n$$\n\n首先，这是个方程，所以x是变量，剩下的就是在确定a,b,m的值之后，确定x的可选值有哪些。解题思路是这样的：\n$$\ngcd(a,m)=1，且 a,m \\in N，则必然存在一个数：\\overline{a},称为a模m的逆，能够使得 a \\cdot \\overline{a} \\equiv 1 (mod\\ m)。\n$$\n这里先举一个现实的例子：\n$$\n假设 a=3,m=7，则 -2 \\cdot 3 \\equiv 1 (mod\\ 7)\n$$\n在上面的基础之上，再来看下面的推论，让我们先假定这个逆一定存在（接下来会证明这个值一定存在）。这个值如何帮助我们解决最开始的问题呢？\n$$\n\\because ax \\equiv b\\ (mod\\ m) \\\\\na \\cdot \\overline{a} \\cdot x \\equiv b \\cdot \\overline{a}\\ (mod\\ m) \\\\\na \\cdot \\overline{a} \\cdot x\\ mod\\ m = ((a \\cdot \\overline{a}\\ mod\\ m) \\times (x\\ mod\\ m))\\ mod\\ m \\\\\na \\cdot \\overline{a} \\equiv 1\\ (mod\\ m) \\\\\nx\\ mod\\ m = b \\cdot \\overline{a} \\mod m \\\\\n\\therefore x \\equiv b \\cdot \\overline{a}(\\mod m)\n$$\n这样就能获得了x的表达式。\n\n那么问题就来了：\n\n1. a模m的逆一定存在吗？\n2. 如果存在，如何计算呢？\n\n先是证明这个值一定存在。\n$$\n\\because gcd(a,m)=1\\\\\n\\therefore \\exists s,t，as+tm=1 \\\\\n\\therefore (as+tm) \\equiv 1 (mod\\ m) \\\\\n(as+tm)(mod\\ m)=((as\\ mod\\ m)+(tm\\ mod\\ m))\\ mod\\ m \\\\\n\\because tm\\ mod\\ m=0 \\\\\n\\therefore (as)\\equiv 1 (mod\\ m)，这里s就是作为a的逆存在，因为s一定存在，所以 \\overline{a} 一定存在\n$$\n接着就是这个值如何求，其实就是求[贝祖系数](https://blog.csdn.net/YQXLLWY/article/details/111502648)\n\n比如这里的\n$$\n线性同余方程：3x \\equiv 4\\ (\\mod 7) 的解是什么？\n$$\n解题过程：\n$$\n\\because 5 \\cdot 3 - 2 \\cdot 7=1 \\\\\n\\therefore x \\equiv 5 \\cdot 4 (\\mod 7) \\equiv 6 (\\mod 7) \n$$\n当然，答案不止一个，因为\n$$\n-8 \\equiv 6(\\mod 7)，所以上面也可以写成 x \\equiv -8 (\\mod 7)\n$$\n\n#### 中国剩余定理：多个同余方程组\n\n上面介绍了一个线性方程组的解，但是如果有多个线性方程组的解需要整合时，该怎么处理呢？\n\n比如：\n$$\nx \\equiv 2(\\mod 3)\\\\\nx \\equiv 3(\\mod 5)\\\\\nx \\equiv 2(\\mod 7)\n$$\n问，这个时候如何求解？\n\n暂时先不管上面的具体问题，我们把上面的方程组类比成下面的形式：\n$$\nx \\equiv {a}_{1}(\\mod {m}_{1}) \\\\\nx \\equiv {a}_{2}(\\mod {m}_{2}) \\\\\n\\vdots \\\\\nx \\equiv {a}_{n}(\\mod {m}_{n}) \\\\\n且 gcd({m}_{i},{m}_{j})=1\n$$\n解：\n$$\n令 {M}_{k}=\\frac{\n{m}_{1} \\times {m}_{1} \\cdots {m}_{n}\n}{\n{m}_{k}\n}，令{y}_{k}为\\ {y}_{k} \\equiv {M}_{k} (\\mod {m}_{k})，即 {y}_{k}为 {M}_{k}模{m}_{k}的逆\n\\\\\n则 x = {a}_{1}{M}_{1}{y}_{1}+{a}_{2}{M}_{2}{y}_{2} \\cdots {a}_{n}{M}_{n}{y}_{n}\n$$\n首先说明为什么上面的这种解法有效：\n$$\n\\because \n（{a}_{1}{M}_{1}{y}_{1}+{a}_{2}{M}_{2}{y}_{2} \\cdots {a}_{n}{M}_{n}{y}_{n}）\\ mod\\ {m}_{j}=\n(({a}_{1}{M}_{1}{y}_{1} \\mod {m}_{j})+({a}_{2}{M}_{2}{y}_{2} \\mod {m}_{j}) \\cdots ({a}_{n}{M}_{n}{y}_{n} \\mod {m}_{j}))(mod\\ {m}_{j}) \\\\\n当 n \\neq j时，{M}_{n} \\equiv 0 (\\mod {m}_{j})，因为{M}_{n}中有{m}_{j}，所以上面可以化简为 \\\\\n{a}_{j}{M}_{j}{y}_{j} \\mod {m}_{j} \\\\\n同时，(({a}_{j} \\mod {m}_{j})({M}_{j}{y}_{j} \\mod {m}_{j}))(mod\\ {m}_{j}) 可以化简为 \\\\\n{a}_{j} \\mod {m}_{j} \\\\\n\\therefore x={a}_{j} \\mod {m}_{j}\n$$\n然后上面可以得到一个x的值，但是我们看上面，我们可以得出，其实x可以写成\n$$\n令M=lcm({m}_{1},{m}_{2},{m}_{3} \\cdots {m}_{n})，d=x mod M，则 \\\\\nx=d\\ (mod\\ M)\n$$\n\n\n[lcm，最小公倍数，定义见这里](https://blog.csdn.net/YQXLLWY/article/details/111502648)\n\n具体例子见书上248页的例5.\n\n#### 大整数的计算机算术\n\n这一章简单来说就是如何通过减少值来加快计算速度，比如让你计算1+3的速度总是快过10000+30000。说具体的计算方法前，书上的原话\n\n“\n$$\nm={m}_{1} \\times {m}_{2} \\cdots {m}_{n}，且 gcd({m}_{i},{m}_{j})=1，\\\\\n则一个0<=a<=m的整数是否可以唯一表示成 (a\\mod {m}_{1},a\\mod {m}_{2},a\\mod {m}_{3}, \\cdots a\\mod {m}_{n})\n$$\n”\n\n这样表示肯定没有问题的，因为在上面的中国剩余定理中我们证明了这样的数字是肯定存在的，至于在0~m之间是否唯一的问题了，在上面的最后我们也证明了这样的x的值是唯一的。\n\n或者换个角度思考这个问题。\n\n![](https://tva1.sinaimg.cn/large/0081Kckwgy1gm2iutvnv2j30gj0733ym.jpg)\n\n这样的数字差一点都不行：\n\n![](https://tva1.sinaimg.cn/large/0081Kckwgy1gm2iyaqgyjj30i005ht8o.jpg)\n\n\n例子：\n\n> 将 123684和413456的加法转换成100内的加减\n\n$$\n\\because 这里选择100以内的4个数 99，98，97，95 \\\\\n123684 \\mod 99=33 ,123684 \\mod 98=8,123684 \\mod 97=9,123684 \\mod 95=89，所以将 123684 改写成 (33,98,97,95) \\\\\n同理 413456 改写成 (32,92,42,16)\n$$\n\n然后12368+413456可以归纳为\n$$\n((33+32)\\mod 99,(98+92)\\mod 98,(97+42)\\mod 97,(95+16)\\mod 95) \\\\\n即\\\\\n(65,2,51,10)\n$$\n上面计算的原理见[这里的同余种的公式](https://blog.csdn.net/YQXLLWY/article/details/111425872)\n\n然后如果要原始的值，需要计算\n$$\nx \\equiv 65 (mod\\ 99) \\\\\nx \\equiv 2 (mod\\ 98) \\\\\nx \\equiv 51 (mod\\ 97) \\\\\nx \\equiv 10 (mod\\ 95) \n$$\n这样的方式，可以加快计算速度，只有需要原来的值时，才需要进行100之外的计算。\n\n#### 费马小定理\n\n“\n$$\n如果p为素数，且a \\in N，a不能被p整除，则\\\\\n{a}^{p-1} \\equiv 1 (mod\\ p)，并且 \\\\\na^p \\equiv a (mod\\ p)\n$$\n”\n\n证明：\n\n[二项式展示公式](https://baike.baidu.com/item/%E4%BA%8C%E9%A1%B9%E5%B1%95%E5%BC%80%E5%BC%8F/7078006?fr=aladdin)\n$$\na^p=(1+(a-1))^p= \\\\\n\\sum^{p}_{k=0} {C}^{k}_{p} {1}^{(p-k)} {(a-1)}^{k},{C}^{k}_{p}=\\frac{p!}{(p-k)!k!}=\\frac{p \\cdot (p-1) \\cdots (p-k+1)}{k!} \\\\\n其中因为 {C}^{k}_{p} \\in N，所以 k!|(p \\cdot (p-1) \\cdots (p-k+1))，同时因为0<k<p，所以 gcd(k!,p)=1，即\\\\\nk!|(p-1)\\cdots (p-k+1)，即\\\\\np|{C}^{k}_{p}，然后我们将上面二项式展开公式进行 mod 2的处理，化简为:\\\\\na^p \\mod p =(\\sum^{p}_{k=0} {C}^{k}_{p} {1}^{(p-k)}) \\mod p  \\\\\na^p \\mod p \\equiv 1+(a-1))^p (mod\\ m) \\\\\n上面我们将 a^p 拆分成 (1+(a-1))^p，那么是不是同样可以拆分成 \\\\\n(2+(a-2))^p\\\\\n(3+(a-3))^p\\\\\n\\vdots\n(a+(a-a))^p\\\\\n最终递归得出 \\\\\na^p \\equiv a (mod\\ p)\n$$\n[参考B站视频](https://www.bilibili.com/video/BV14A411h7oD?from=search&seid=15592507917156169277)\n\n"
          }
        ]
      },
      {
        id: "dm-ch4-4-4-2",
        title: "4.4 求解同余方程2",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch4-4-4-2-0",
            type: "text",
            content: "#### 伪素数\n\n简单来说就是，以前的中国人认为\n$$\n如果n为奇数，且满足下面的公式时 {2}^{n-1} \\equiv 1 (mod\\ n)，n即为素数。\n$$\n但是这个结论是错误的，而能推翻上面的数，就称为伪素数。比如\n$$\n{2}^{341-1} \\equiv 1 (mod\\ 341) \\\\\n但是 341=11 \\cdot 31，其并不是素数\n$$\n\n#### 卡米切尔数\n\n$$\n首先是一个正整数n，然后是所有与n互质的数b，都满足\\\\\n{b}^{n-1} \\equiv 1 (mod\\ n) \\\\\n则这样的n就称为卡米切尔数\n$$\n\n#### 原根和离散对数\n\n原根\n$$\n设定两个数，x和y，x,y \\in Z，x为素数，如果对于从0开始，到x-1中的每一个正整数，假设为k，都有 \\\\\n{x}^{k} mod\\ y={k}_{0}，其中所有{k}_{0}的值正好满足 1到y-1时，则称x是y的原根\n$$\n例如x为2，y是11：\n$$\n2^1 \\mod 11=2 \\\\\n2^2 \\mod 11=4 \\\\\n2^3 \\mod 11=8 \\\\\n2^4 \\mod 11=5 \\\\\n2^5 \\mod 11=10 \\\\\n2^6 \\mod 11=9 \\\\\n2^7 \\mod 11=7 \\\\\n2^8 \\mod 11=3 \\\\\n2^9 \\mod 11=6 \\\\\n{2}^{10} \\mod 11=1 \\\\\n满足 1 到 10，所以2是11的原根\n$$\n离散对数\n$$\n在上面原根的基础上，假设 a 是介于0到y-1之间的一个整数，则存在一个整数e，使得 \\\\\n{x}^{e} \\mod y =a，此时，我们称e为以x为底，a模y的离散对数，写作 \\\\\n{log}_{x} a =e\n$$\n注意：在上面的表示法中，没有展示y的值。"
          }
        ]
      },
      {
        id: "dm-ch4-4-6",
        title: "4.6 密码学",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch4-4-6-0",
            type: "text",
            content: "# RSA加密 操作过程和原理\n\n#### 欧拉定理\n\n这里只是讲解欧拉定理，证明我暂时还没有那个能力。\n$$\n两个数a和n互质，则对于所有小于n，大于0的整数中，与n互质的数，其都满足以下定理：\\\\\n{a}^{\\varphi(n)} \\equiv 1\\ (mod\\ n)，其中 \\varphi(n)就代表上面说到的数组成的集合，也叫做欧拉函数\n$$\n欧拉定理与[费马小定理](https://blog.csdn.net/YQXLLWY/article/details/112094536)\n$$\n其中费马小定理对于 \\varphi(n) 中的值要求更高，要求其与a互质，所以费马定理中的值，是欧拉定理的一个子集。\n$$\n\n\n#### 原理\n\n$$\n令p和q是两个质数，n=p \\times q，k=(p-1) \\times (q-1) \\\\\n再寻找一个数e，使得 gcd(e,k)=1，并且需要寻找e对于模k的逆d，\\\\\n则公钥为 e 和 n，\\\\\n私钥为 d\n$$\n\n假设要传输的数据为t，并且假设解密时已知公钥e和n。\n$$\n密文为\\ {t}^{e}，解密过程为 \\\\\n({t}^{e})^d={t}^{ed} \\\\\n因为 ed \\equiv 1 (mod\\ k)，则 ed=r \\times k+1，其中 r \\in N。\\\\\n即 {t}^{ed} \\mod n ={t}^{rk+1} \\mod n= (({t}^{rk} \\mod n) \\cdot (t \\mod n)) \\mod n \\\\\n因为 {t}^{k} \\mod n={t}^{(p-1)(q-1)} \\mod (pq)，且只要(p-1) \\neq q，(q-1) \\neq p，则(p-1)(q-1)与(pq)互质，根据欧拉定理\\\\\n{t}^{(p-1)(q-1)} \\equiv 1\\ (mod\\ pq) \\\\\n所以将上面的 {t}^{rk} \\mod n=(t^k \\cdot t^k \\cdot t^k \\cdots t^k) \\mod n= \\\\\n((t^k \\mod n)(t^k \\mod n) \\cdots (t^k \\mod n)) \\mod n = 1 \\\\\n所以 {t}^{ed} \\mod n =t \\mod n\n$$\n[参考B站视频](https://www.bilibili.com/video/BV1cW411y7vd)\n\n"
          }
        ]
      },
      {
        id: "dm-ch4-4",
        title: "第4章 数论和密码学",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch4-4-0",
            type: "text",
            content: "# 4.1 整除性和模算术\n\n$$\na | b，代表b能被a整除 \n$$\n\n一些很简单的定理：\n$$\n如果a|b，a|c，则 a|(b+c)\\\\\n如果a|b，则当 c \\in Z，a|bc \\\\\n如果a|b，b|c，则a|c\n$$\n\n#### 模算术\n\n$$\n如果 a=dq+r，则 q=a\\ \\textbf{div}\\ b，r=a\\ \\textbf{mod}\\ b\n$$\n\n#### 同余\n\n$$\na \\equiv b (mod\\ m) 代表 \\\\\na\\ mod\\ m\\ = b\\ mod\\ m\n$$\n\n代表a和b，对于m的余数相同。\n$$\n如果 a \\equiv b (mod\\ m)，则存在 k \\in Z，使得 b=k \\times a+m\n$$\n同余对于加法和乘法来说：\n$$\n如果：a \\equiv b(mod\\ m),c \\equiv d(mod\\ m) \\\\\n则：a+c \\equiv b+d (mod\\ m)，a \\times c \\equiv b \\times d (mod m)\n$$\n加法的同余很好理解：\n$$\nb=a+{k}_{b}m,c=d+{k}_{c}m，\\\\\n则 b+c=a+d+({k}_{b}+{k}_{c})m\n$$\n乘法理解起来麻烦一点：\n$$\nbc=(a+{k}_{b}m) \\times (d+{k}_{c}m) = ac + m(a{k}_{c}+c{k}_{b}+{k}_{b}{k}_{c}m)\n$$\n这里千万别把a和c当作变量来理解，而是要想，它的最终结果就是一个数字，而只要是数字，后面的组合就是一个常数。\n\n下面就是一个推论：\n$$\n(a+b)\\ \\textbf{mod}\\ m= ((a\\ \\textbf{mod}\\ m) + (b\\ \\textbf{mod}\\ m)) \\textbf{mod}\\ m \\\\\n(ab)\\ \\textbf{mod}\\ m= ((a\\ \\textbf{mod}\\ m) \\times (b\\ \\textbf{mod}\\ m)) \\textbf{mod}\\ m\n$$\n证明：\n$$\na \\equiv (a\\ mod\\ m) (mod\\ m),a关于m的余数，肯定同余于其自身，例如 5\\ mod\\ 2=1，1\\ mod\\ 2=1，则 5 \\equiv 1 (mod 2) \\\\\n同理 b \\equiv (b\\ mod\\ m)，根据上面的加法同余定理可以知道：\\\\\na+b \\equiv (a\\ mod\\ m)(b\\ mod\\ m)(mod\\ m)，\\\\\nab \\equiv (a\\ mod\\ m)(b\\ mod\\ m)(mod\\ m)\n$$\n\n#### 模m算术简写形式\n\n$$\na+b\\ (\\textbf{mod}\\ m)=a {+}_{m}\\ b \\\\\nab\\ (\\textbf{mod}\\ m)= a {\\bullet}_{m}\\ b\n$$\n\n一些很容易理解的性质：\n\n结合律：\n$$\n(a {+}_{m}\\ b){+}_{m}\\ c = a {+}_{m}\\ (b{+}_{m}\\ c) \\\\\n(a {\\bullet}_{m}\\ b) {\\bullet}_{m}\\ c = a {\\bullet}_{m} (b\\ {\\bullet}_{m} c)\n$$\n交换律：\n$$\na {+}_{m} b\\ = b {+}_{m}\\ a \\\\\na {\\bullet}_{m}\\ b\\ = b {\\bullet}_{m}\\ a\n$$\n分配率：\n$$\na {\\bullet}_{m}\\ (b {+}_{m} c)= (a {\\bullet}_{m} b) {+}_{m} (a {\\bullet}_{m} c) \\\\\n(a {+}_{m} b) {\\bullet}_{m} c = (a {\\bullet}_{m}\\ c) {+}_{m} (b {\\bullet}_{m}\\ c)\n$$\n\n# 4.3 素数和最大公约数\n\n> 算术基本定理：每个大于1的整数都可以唯一地写为两个或多个素数的乘积。\n\n合数，就是大于1，但是又不是素数的整数。\n$$\n如果n是一个合数，那么n必有一个素数因子小于等于 \\sqrt{n}\n$$\n\n#### 埃拉托斯特尼筛法\n\n比如想要知道100以内有哪些数字是素数，就从最小的素数开始，凡是能被该素数整除的，均不是素数，比如从素数2开始，4，6，8，10等，直到100为止，再来是从3开始，6，9，12等，再来是从5开始，10，15，20等，直到所有7为止。至于为什么是7，因为根据上面我们可知，100肯定有一个素数小于等于10，则该值可能为2，3，5，7中的任何一个，然后在恰面的步骤中，我们除外了所有以这些为素数因子的合数，剩下的自然就是100以内的素数了。\n\n#### 梅森素数\n\n就是形如下面的素数：\n$$\n{2}^{p}-1，且 p 为素数\n$$\n与其配套的还有一个卢卡斯-莱默尔测试(Lucas-Lehmer)的测试方法，可以判定形如上面的数是否为素数。\n\n#### 最大公约数\n\n$$\nd|a，且\\ d|b，此时最大的 d 的值就是最大公约数，记为\\ gcd(a,b)\n$$\n\n所以两个素数的最大公约数就是1。\n\n#### 最小公倍数\n\n$$\na|c，且\\ b|c，此时最小的c的值就是最小公约数，记为 lcm(a,b)\n$$\n\n据说可以根据上面两个定义得出下面这个结论，但是我不知道怎么证明：\n\n$$\na,b \\in {N}^{+}，则 \\\\\nab=gcd(a,b) \\cdot lcm(a,b)\n$$\n\n#### 欧几里得算法：最大公约数算法\n\n$$\n如果\\ a=bq+r,a,b,q,r \\in N，则\\ gcd(a,b)=gcd(b,r)\n$$\n\n证明：\n$$\n假设 d|a，d|b,则 d|r，因为 d|bq，d|a-bq，所以\\ gcd(a,b)=gcd(b,r)\n$$\n然后在上面的基础上，不断求两个数的公约数为止，直到无法再把数据修改成上面的形式为止，比如求`gcd(287,91)`\n\n```mathematica\n287=91*3+14\n91=14*6+7\n14=7*2 // 没有余数了\n```\n\n即`gcd(287,91)=7`\n\n欧几里得算法与上面求模运算之间的关系如下：\n\n```php\nfunction gcd(int $a,int $b){\n  \t// % 在 php 中代表求模运算，即上面的 mod\n    $nextB=$a % $b;\n    if (!$nextB){\n        return $b;\n    }\n    return gcd($b,$nextB);\n}\n\nprint gcd(287,91);\n```\n\n#### 贝祖定理\n\n$$\na,b \\in {N}^{+},s,t \\in N,则\\ \\exists s \\exists t\\ gcd(a,b)=sa+tb\n$$\n\n这个的证明其实就是上面欧几里得算法的逆步骤：\n$$\n假设 d|a，d|b，且 gcd(a,b)=d,则\\ a=db+r，\\\\\n下面开始拆分：\\\\\nb={k}_{0}r+{n}_{0} \\\\\nr={k}_{1}{r}_{1}+{n}_{1} \\\\\n{r}_{1}={k}_{2}{r}_{2}+{n}_{2} \\\\\n\\cdots \\\\\n{r}_{n}={k}_{n}{r}_{n+1} \\\\\n将上面的结果逆序带回去，为了便于理解，下面采用真实数据来展示\n$$\n首先用欧几里得算法来求`gcd(252,198)`\n\n```mathematica\n252=1*198+54\n198=3*54+36\n54=1*36+18\n36=18*2\n```\n\n逆着来\n\n```mathematica\n18=54-1*36\n// 36=198-3*54\n18=54-1*(198-3*54)\n// 54=(252-1*198)\n18=(252-1*198)-1*(198-3*(252-1*198))=4*252-5*198\n```\n\n这里需要时候到后面的强归纳定理才能证明，这里我仅仅是想说能理解什么是贝斯定理。\n\n这里还有一个定理：\n$$\nm \\in {N}^{+}，a,b,c,d \\in N，如果 ac \\equiv bc (mod\\ m)，且 gcd(c,m)=1，则\\ a \\equiv b(mod\\ m)\n$$\n这里为了证明上面的内容，需要先证明下面这个，因为下面经常要称呼到，就称为：\n$$\na,b,c \\in {N}^{+},且\\ gcd(a,b)=1，且\\ a|bc，则 a|c \\tag{引理2}\n$$\n证明：\n$$\n因为\\ gcd(a,b)=1，所以 \\exists s\\exists t\\ sa+tb=1，\\\\\n两边都 \\times c \\\\\nsac+tbc=c，因为\\ a|bc，所以a|tbc，且a|sac，所以 a|(sac+tbc)，所以 a|c\n$$\n根据上面的证明，将最开始的证明写成下面的形式：\n$$\n因为 ac \\equiv bc\\ (mod\\ m)，则 m|(ac-bc)，则 m|(a-b)c \\\\\n根据上面的引理2，m|(a-b)，\\\\\n则 a \\equiv b\\ (mod\\ m)\n$$\n这里可能有人会奇怪，为什么\n$$\nac \\equiv bc\\ (mod\\ m)，则 m|(ac-bc)\n$$\n想想同余是什么意思？\n$$\nac={k}_{0}m+d \\\\\nbc={k}_{1}m+d \\\\\nac-bd=({k}_{0}-{k}_{1})m \\\\\n则自然\\\\\nm|(ac-bd)\n$$\n那么反过来成立吗？\n$$\n如果 m|(a-b)，则 a \\equiv b\\ (mod\\ m)\n$$\n试想一下模算术的定理：\n$$\na=b+{k}_{0}m \\\\\nb=a-{k}_{0}m \n$$\n\n# 4.4 求解同余方程\n\n#### 线性同余方程\n\n$$\nax \\equiv b\\ (mod\\ m)，其中，m \\in {N}^{+}，a,b \\in N，x为变量，这样的方程称为线性同余方程\n$$\n\n首先，这是个方程，所以x是变量，剩下的就是在确定a,b,m的值之后，确定x的可选值有哪些。解体思路是这样的：\n\n\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch5",
    title: "第5章 归纳与递归",
    description: "数学归纳法、强归纳法、递归定义与递归算法",
    icon: "🔁",
    lessons: [
      {
        id: "dm-ch5-5-1",
        title: "5.1 数学归纳法",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch5-5-1-0",
            type: "text",
            content: "# 5.1 数学归纳法\n\n> **数学归纳法原理：**为证明对所有的正整数n，p(n)为真，需要完成两个步骤：\n>\n> 基础步骤：P(1) 为真\n>\n> 归纳步骤：假设p(k)为真时，证明p(k+1)为真\n\n## 实操\n\n$$\n使用数学归纳法证明：\\\\\nP(n)=1+2+3 \\cdots n=\\frac{n(1+n)}{2}\n$$\n\n证明：\n$$\n基础步骤：n=1时，\\frac{1\\cdot(1+1)}{2}=1 \\\\\n归纳步骤：假设对于n=k时成立P(k)=\\frac{k(k+1)}{2}，对于P(k+1)=1+2+3 \\cdots k+(k+1)\\\\\n因为 1+(k+1)=2+k=3+(k-1)=\\cdots，所以当k为偶数时，p(k+1)=(k+1+1)*(\\frac{k}{2})+(\\frac{k}{2}+1)\\\\\n=\\frac{(k+1)(k+1+2)}{2}\\\\\n当k为奇数时，p(k+1)=(k+1+1)\\frac{k+1}{2}=\\frac{(k+1)(k+1+2)}{2}\\\\\n所以当p(k)为真时，P(k+1)也为真。\n$$\n\n"
          }
        ]
      },
      {
        id: "dm-ch5-5-2",
        title: "5.2 强归纳法和良序性",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch5-5-2-0",
            type: "text",
            content: "# 5.2 强归纳法和良序性\n\n## 强归纳法\n\n> 强归纳法：要证明对所有整数n而言，P(n)为真，需要完成如下两个步骤：\n>\n> 基础步骤：证明P(1)为真。\n>\n> 归纳步骤：假设对于不超过k的j而言，P(j)为真，那么P(k+1)也为真。\n\n#### 实操\n\n采用强归纳法证明如果n是大于1的整数，则n可以写作素数之积。\n$$\n基础步骤：当n=2时，命题成立，2=1 \\times 2 \\\\\n归纳步骤：假设对于大于1，小于k的整数，都可以写作素数之积。那么如果k+1是素数，很简单，k+1=1 \\times (k+1)，\\\\\n如果k+1是合数，则k+1可以写成两个小于k+1的正整数a和b的积（合数定义），则根据假设，a和b可以写成两个素数之积，\\\\\n即k+1可以写作素数之积。\n$$\n\n## 良序性公理\n\n> 任意一个非空的非负整数集合都有最小元素。\n\n"
          }
        ]
      },
      {
        id: "dm-ch5-5-3",
        title: "5.3 递归定义与结构归纳法",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch5-5-3-0",
            type: "text",
            content: "# 5.3 递归定义与结构归纳法\n\n## 递归实操：树\n\n树就是这样的东西\n\n![](https://tva1.sinaimg.cn/large/0081Kckwgy1gmajj67pkqj30kg0asaat.jpg)\n\n#### 递归定义树\n\n注意！是定义树，而不是创建树，如下面的图中所定义的：\n\n![](https://tva1.sinaimg.cn/large/0081Kckwgy1gmajt5ervtj30c609c3yy.jpg)\n\n如何采用递归找出其中所有的树？\n\n基础步骤：定义树根，在这里定义为t0\n\n递归步骤：\n\n#### 结构归纳法\n\n> - 基础步骤：证明对于递归定义的基础步骤所规定的属于该集合的所有元素来说，结果成立。\n> - 递归步骤：证明如果对于定义的递归步骤中用来构造新元素的每个元素来说命题为真，则对于这些新元素来说结果成立。\n\n"
          }
        ]
      },
      {
        id: "dm-ch5-5-4",
        title: "5.4 递归算法",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch5-5-4-0",
            type: "text",
            content: "# 5.4 递归算法\n\n> 若一个算法通过把问题归约到带更小输入的相同问题的实例来解决原来的问题，则这个算法称为递归的。\n\n简单来所就是，将输入减小，比如下面这个阶乘的例子，求`n!`的值：\n\n```php\nfunction factorial($n){\n    if ($n==1){\n        return 1;\n    }\n    return $n*factorial($n-1);\n}\n```\n\n在上面的函数中，同一个函数，输入不断减小。\n\n## 实操：归并排序\n\n先说什么是归并排序，就是先将数组拆分成更小的数组，然后真对这些小数组进行排序，排序后组合成已经排好序的数组。\n\n示意图\n\n![](https://tva1.sinaimg.cn/large/0081Kckwgy1gmampk8pa4j30rw0l3q4n.jpg)\n\n源代码\n\n```php\n<?php\nfunction mergeSort($line){\n    if (count($line)<=1){\n        return $line;\n    }\n    $middle=ceil(count($line)/2);\n    return sortFunction(\n        mergeSort(array_slice($line,0,$middle)),\n        mergeSort(array_slice($line,$middle))\n    );\n}\n\nfunction sortFunction($array1,$array2){\n    // todo 这里重点不是排序函数，所以就不在这里费心思了\n    $newArray=array_merge($array1,$array2);\n    sort($newArray);\n    return $newArray;\n}\n\n$line=[8,2,4,6,9,7,10,1,5,3];\n\nprint_r(mergeSort($line));\n```\n\n输出结果\n\n![](https://tva1.sinaimg.cn/large/0081Kckwgy1gmam5slzzej305707qq2v.jpg)\n\n"
          }
        ]
      },
      {
        id: "dm-ch5-5-5",
        title: "5.5 程序正确性",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch5-5-5-0",
            type: "text",
            content: "# 5.5 程序正确性\n\n#### 推理规则\n\n$$\n\\frac{\np\\{{S}_{1}\\}q\\\\\nq\\{{S}_{2}\\}r\n}{\n\\therefore p\\{{S}_{1};{S}_{2}\\}r\n}\n$$\n\n首先，是程序S被分割成了S1和S2，然后S1对于初始断言p和终结断言q而言是正确的，同时S2对于初始断言q和终结断言r是正确的，所以程序S对于初始断言p和终结断言r是正确的。\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch6",
    title: "第6章 计数",
    description: "计数原理、鸽巢原理、排列组合与二项式系数",
    icon: "🧮",
    lessons: [
      {
        id: "dm-ch6-6-1",
        title: "6.1 计数的基础",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch6-6-1-0",
            type: "text",
            content: "# 6.1 计数的基础\n\n#### 乘法法则\n\n> 假定一个过程可以被分解成前后两个任务，如果完成第一个任务有k种方法，在第一个任务之后的第二个任务有r种方法，那么完成这个任务的过程有k*r种方法。\n\n```php\n$amount=[];\nfor ($k=1;$k<=100;$k++){\n    for ($r=1;$r<=100;$r++){\n        // 乘法法则\n        $amount[]=$k*$r;\n    }\n}\nprint_r($amount);\n```\n\n#### 求和法则\n\n> 假定一个过程可以被分解成两个独立的任务，如果完成第一个任务有k种方法，第二个任务有r种方法，那么完成这个任务的过程有k+r种方法。\n\n```php\n// 加法法则\n$amount=[];\nfor ($k=1;$k<=100;$k++){\n    $amount[]=$k;\n}\nfor ($r=1;$r<=100;$r++){\n    $amount[]=$r;\n}\nprint_r($amount);\n```\n\n#### 减法法则（两个集合的容斥原理）\n\n> 如果一个任务或者可以通过k种方法执行，或者可以通过r种另一类方法执行，则这个任务的方法数就是k+r后再减去两者的共同方法。\n\n```php\n// 减法法则\n$amount=[];\nfor ($k=1;$k<=100;$k++){\n    $amount[$k]=1;\n}\nfor ($r=50;$r<=150;$r++){\n    $amount[$r]=1;\n}\nprint_r($amount);\n```\n\n#### 除法法则\n\n> 如果一个任务能由一个可以用n种方式完成的过程实现，而对于每种完成任务的方式w，在n种方法中恰好有d种与之对应，则完成这个任务的方法数为 n/d。\n\n```php\n// 除法法则\n$amount=[];\n$d=10;\n$result=0;\nfor ($n=1;$n<=100;$n++){\n    if ($n % $d==0){\n        $amount[$n]=$result;\n        $result++;\n        continue;\n    }\n    $amount[$n]=$result;\n}\n\nprint_r($amount);\n```\n\n#### 树图\n\n其实这个很简单，就是以前说的把所有情况列出来。\n\n比如，3位数的byte数能有多少种组合？\n\n![](https://tva1.sinaimg.cn/large/0081Kckwgy1gmbzkucor8j30m809ijrv.jpg)\n\n根据上面的图，从左到右可以得到值有：\n\n- 000\n- 001\n- 010\n- 011\n- 100\n- 101\n- 110\n- 111\n\n共计8种组合方式。"
          }
        ]
      },
      {
        id: "dm-ch6-6-2",
        title: "6.2 鸽巢原理",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch6-6-2-0",
            type: "text",
            content: "# 6.2 鸽巢原理\n\n> 鸽巢原理：如果k+1个或更多的物品放入k个盒子，那么至少有一个盒子包含了2个或更多的物体。\n\n鸽巢原理也叫做狄利克雷抽屉原理。\n\n这个很简单，比如现场有366人，那么至少有2个人的生日是同一天。\n\n> 推论1：一个从有k+1甚至更多的元素的集合到k个元素的集合的函数f不是一对一函数。\n\n[一对一函数的定义见这里](https://blog.csdn.net/YQXLLWY/article/details/111305452)\n\n> 广义鸽巢原理：如果N个物体放入k个盒子，那么至少有一个盒子包含了至少N/k个物体。\n\n这个是在鸽巢原理的基础上，考虑了倍数的情况，还是上面的那个生日的例子，假设现在现场有365*2个人，那么至少有多少人的生日是相同的？2个。（我对闰年，非闰年不是很想算，所以懂意思就行。）在这个基础之上，3倍的时候呢？4倍的时候呢？最极端的情况就是每365个人，他们的生日都不是同一天，那么有N/k组，就有多少人的生日是一样的。\n\n#### 拉姆齐理论\n\n> 每个由n^2+1个不同实数构成的序列都包含一个长为n+1的严格递增或严格递减子序列。\n\n"
          }
        ]
      },
      {
        id: "dm-ch6-6-3",
        title: "6.3 排列与组合",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch6-6-3-0",
            type: "text",
            content: "# 6.3 排列与组合\n\n#### 排列\n\n> 具有n个不同元素的集合的r排列数是\n>\n> P(n,r)=n*(n-1)(n-2) ...... (n-r+1)\n\n先解释一下这里的r的含义啊。就是要排列多少长度。比如P(10,3)就是10个元素排3个长度，那排列数自然是`10*9*8`，理解很简单，第一个位子有10个可选值，第二个有9个可选值，因为第一个位置已经使用掉了一个元素，同理，第三个位子有8个可选值。\n\n下面这个推论你直接从数学公式推导的角度也可以看懂：\n$$\nP(n,r)=\\frac{n!}{(n-r)!}\n$$\n\n#### 组合\n\n“\n\n$$\n设n是正整数，r是满足 0<=r<=n 的整数，n元素的集合r组合数等于 \\\\\nC(n,r)=\\frac{n!}{r!(n-r)!}\n$$\n”\n\nr的含义和上面一样，选择的元素的个数。\n\n排列和组合之间有什么区别呢？**顺序！！！**组合不讲究顺序，`{A,B,C}`和`{B,A,C}`在排列中是两个值，但是在组合中，是一个值。\n\n那么上面那个公式怎么推倒出来呢？\n$$\nC(n,r)=\\frac{P(n,r)}{P(r,r)}=\\frac{n!/(n-r)!}{r!/(r-r)!}\\\\\n上下同时乘以 (n-r)!\\\\\nC(n,r)=\\frac{n!}{r!(n-r)!}\n$$\n啥意思呢？这个理解起来比较绕。我们上面说了，组合是没有顺序的，但是如果不同的排列，落在另一个排列里，那就是组合。\n\n比如r个元素的排列之后，再在其中放入不同元素，是不是就是组合了？所以先确定能放入数据的排列总数：P(n,r)，接下来就是能放入的位置的排列：P(r,r)，两者相除，就是组合的总数了。\n\n下面是一个推论，把值代入到上面的公式中就能得到结果。\n$$\nC(n,r)=C(n,n-r)\n$$\n\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch6-6-4",
        title: "6.4 二项式系数和恒等式",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch6-6-4-0",
            type: "text",
            content: "# 6.4 二项式系数和恒等式\n\n$$\nC(n,r) 可以记做\\ \\binom{n}{r}，因为常出现在二项式展开式中作为系数，所以也叫做二项式系数。 \n$$\n\n#### 二项式定理\n\n$$\n(x+y)^n=\\sum^{n}_{j=0} \\binom{n}{j} {x}^{n-j}{y}^{j}=\\binom{n}{0} {x}^{n} + \\binom{n}{1} {x}^{n-1}y+ \\cdots + \\binom{n}{1} x{y}^{n-1} + \\binom{n}{n}{y}^{n}\n$$\n\n证明：\n$$\n基础步骤：当n=1时，上述结论正确。\\\\\n归纳步骤：假设当n时，结论成立。\\\\ \n现在对于 {(x+y)}^{n+1}={(x+y)}^{n} \\cdot (x+y)={(x+y)}^{n} \\cdot x+{(x+y)}^{n} \\cdot y\\\\\n=\\sum^{n}_{j=0} \\binom{n}{j} {x}^{n+1-j}{y}^{j}+\\sum^{n}_{j=0} \\binom{n}{j} {x}^{n-j}{y}^{j+1}\\\\\n=\\sum^{n}_{j=0} \\binom{n}{j} {x}^{n+1-j}{y}^{j}+\\sum^{n}_{j=0} \\binom{n}{j} {x}^{n-j}{y}^{j+1}\\\\\n\\\\\n这里可以将其拆开来看一下\\\\\n\\sum^{n}_{j=0} \\binom{n}{j} {x}^{n+1-j}{y}^{j}=\\binom{n}{0}{x}^{n+1}+\\binom{n}{1} {x}^{n}y+\\binom{n}{2} {x}^{n-1}{y}^{2} \\cdots +\\binom{n}{n-1} x{y}^{n-1}+\\binom{n}{n} x{y}^{n}\\\\\n\\sum^{n}_{j=0} \\binom{n}{j} {x}^{n-j}{y}^{j+1}=\\binom{n}{0} {x}^{n}y+\\binom{n}{1} {x}^{n-1}{y}^{2} \\cdots +\\binom{n}{n-1} x{y}^{n}+ \\binom{n}{n} {y}^{n+1}\n$$\n在这里插入一个公式：帕斯卡恒等式子（[B站参考视频](https://www.bilibili.com/video/BV1TQ4y1P7Up?from=search&seid=9619760902590891781)），基本形式和证明如下：\n$$\nC(m,k)+C(m,k-1)=C(m+1,k)\\\\\n证明：\\\\\n\\frac{m!}{(m-k)!k!}+\\frac{m!}{(m-k+1)!k!}=\\frac{m!(m-k+1)}{(m-k+1)!k!}+\\frac{m!k}{(m-k+1)!k!}\\\\\n= \\frac{m!(m-k+1+k)}{(m-k+1)!k!}=\\frac{(m+1)!}{(m+1-k)!k!}=C(m+1,k)\n$$\n\n\n接着上面的断掉的地方开始写\n$$\n{(x+y)}^{n+1}=\\binom{n}{0}{x}^{n+1}+\\sum^{n}_{j=0}[\\binom{n}{j}+\\binom{n}{j+1}]{x}^{n-j}{y}^{j}+\\binom{n}{0}{y}^{n+1}\\\\\n={x}^{n+1}+\\sum^{n}_{j=0}\\binom{n+1}{j+1}{x}^{n-j}{y}^{j}+{y}^{n+1}\\\\\n=\\binom{n+1}{0}{x}^{n+1}{y}^{0}+\\sum^{n+1}_{j=1}\\binom{n+1}{j+1}{x}^{n-j}{y}^{j}+\\binom{n+1}{n+1}{x}^{0}{y}^{n+1}\\\\\n=\\sum^{n+1}_{j=0}\\binom{n+1}{j} {x}^{n+1-j}{y}^{j}\n$$\n推论1：\n$$\n\\sum^{n}_{j=0} \\binom{n}{j}=2^n \\\\\n证明：\\\\\n\\sum^{n}_{j=0} \\binom{n}{j}({1}^{n-j}+1^j)=(1+1)^n=2^n\n$$\n推论2:\n$$\n\\sum^{n}_{j=0} \\binom{n}{j} {(-1)}^{j}=0\\\\\n证明：\\\\\n(1+(-1))^n=0=\\sum^{n}_{j=0} \\binom{n}{j}({{1}^{n-j}(-1)}^{j})=\\sum^{n}_{j=0} \\binom{n}{j} {(-1)}^{j}\n$$\n推论3:\n$$\n\\sum^{n}_{j=0} \\binom{n}{j} {2}^{j}=3^n\\\\\n证明：\\\\\n(1+2)^n=3^n              =\\sum^{n}_{j=0} \\binom{n}{j} {2}^{j}\n$$\n\n#### 范德蒙德恒等式\n\n$$\n\\binom{m+n}{r}=\\sum^{r}_{k=0} \\binom{m}{r-k} \\binom{n}{k}\n$$\n\n书上给的证明我觉得很好，但是我还是更加相信数学推导，可是这块公式我推了半天没推成功，所以暂时搁置一下，说一下书上解释。\n\n> 如果你要从两个集合中取总数为r的组合，那么你可以选择：\n>\n> - 从第一个集合取0个，第二个集合取r个，那么就是 C(m,0)C(n,r)\n>\n> - 从第一个集合取1个，第二个集合取r-1个，那么就是 C(m,1)C(n,r-1)\n> - 从第一个集合取2个，第二个集合取r-2个，那么就是 C(m,2)C(n,r-2)\n>\n> 同理\n>\n> - 从第一个集合取r个，第二个集合取0个，那么就是 C(m,r)C(n,0)\n\n将上面的公式总结起来就是上面的公式。\n\n推论4：\n$$\n当 m=n 时\\\\\n\\binom{2n}{r}=\\sum^{r}_{k=0} {\\binom{n}{k}}^{2}\n$$\n推论5:\n$$\n\\binom{n+1}{r+1} = \\sum^{n}_{j=r} \\binom{j}{r}\n$$\n太累了，明天再想吧。"
          }
        ]
      },
      {
        id: "dm-ch6-6-5",
        title: "6.5 排列与组合的推广",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch6-6-5-0",
            type: "text",
            content: "# 6.5 排列与组合的推广\n\n#### 有重复的排列\n\n> 当具有n个元素的集合允许重复的r位排列时，排列数是 n^r\n\n比如以5个字母为总数的英语单词数量最多是：5^26\n\n#### 有重复的组合\n\n> 当具有n个元素的集合允许重复的r位组合时，组合总数是 C(n+r-1,r)=C(n+r-1,n-1)\n\n这个怎么理解呢，当我们允许选择重复值时，其实就是在其中允许加入空值，这样的空值最多允许加入`(r-1)`位，因为全部的空值在之前的选项中有，如下图所示：\n\n\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmij0pfb3vj30mi0eddg3.jpg)\n\n#### 部分重复的排列\n\n简单来说就是不是所有值都可以重复，比如`Apple`这个单词有多少种排列方式，你就不能简单的用5^5来计算了，因为其中有重复项。\n\n> 设类型1的相同物体有n1个，类型2的相同物体有n2个。。。。。。类型k的相同物体有nk个，那么n个物体的不同排列数是\n\n$$\n\\frac{n!}{(n_1)!(n_2)! \\cdots (n_k)!}\n$$\n\n证明：\n$$\n对类型1的物体，其有 C(n,n_1)种组合，\\\\\n对类型2的物体，其有 C(n-n_1,n_2)种组合，\\\\\n\\vdots \\\\\n对类型k的物体，其有 C(n-n_1-n_2-n_3 \\cdots -{n}_{n_k-1},n_k)种组合 \\\\\n所以总共的排列总数是\\\\\nC(n,n_1) \\cdot C(n-n_1,n_2) \\cdots C(n-n_1-n_2-n_3 \\cdots -{n}_{n_k-1},n_k) \\\\\n= \\frac{n!}{(n-n_1)!{n}_{1}!} \\cdot \\frac{(n-n_1)!}{(n-n_1-n_2)!{n}_{2}!} \\cdots \\\\\n= \\frac{n!}{(n_1)!(n_2)! \\cdots (n_k)!}\n$$\n\n## 变形\n\n#### 可辨别的物体与可辨别的盒子\n\n例如，把52张牌，分给4个人，每个人5张牌，问有多少种方式。这个问题和上面部分重复的排列是一样的。只是有一点，那就是最后需要剩下32张牌，即最后一个类型的值是32.\n\n“\n$$\n把n个不同的物体分配到k个不同的盒子使得n_i个物体放入盒子i的方式数等于\\\\\n\\frac{n!}{(n_1)!(n_2)! \\cdots (n_k)!}\n$$\n”\n\n#### 不可辨别的物体与可辨别的盒子\n\n这个啥意思呢？比如将相同的10个小球放入编号1-8的桶中，共有多少种放法，是不是就是上面的有重复的组合，所以结论就是：\n$$\nC(10+8-1,8)\n$$\n\n#### 可辨别的物体与不可辨别的盒子\n\n这个比较麻烦，那就是将10个不同的小球，放到4个相同的桶中，共有多少种放法。\n\n这个等到《第八章：高级计数》的时候再去介绍。\n\n#### 不可辨别的物体和不可辨别的盒子\n\n这个就是将10个相同的小球，放到4个相同的桶中，共有多少种放法。\n\n这个换一种问法就是10可以拆分成多少种4个数的加法，暂时好像只有列举法：\n\n- 10=10+0+0+0\n- 10=1+9+0+0\n- 10=1+8+1+0\n- ......\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch7",
    title: "第7章 离散概率",
    description: "离散概率、贝叶斯定理、期望与方差",
    icon: "🎲",
    lessons: [
      {
        id: "dm-ch7-7-1",
        title: "7.1 离散概率引论",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch7-7-1-0",
            type: "text",
            content: "# 7.1 离散概率引论\n\n$$\n事件E是结果具有相等可能性的有限样本空间S的子集，则事件E的概率是：\\\\\np(E)=\\frac{|E|}{|S|}\n$$\n\n------------------------\n\n$$\n事件E是样本空间S的一个事件。事件 \\overline{E}=S-E（事件E的补事件）的概率是：\\\\\n\\overline{E}=S-E\n$$\n\n------------------------\n\n$$\n事件E_1和E_2是样本空间的事件，那么\\\\\nP(E_1 \\cup E_2)=P(E_1)+P(E_2)-P(E_1 \\cap E_2)\n$$\n\n"
          }
        ]
      },
      {
        id: "dm-ch7-7-2",
        title: "7.2 概率论",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch7-7-2-0",
            type: "text",
            content: "# 7.2 概率论\n\n“\n$$\n假设S是n个元素的集合，均匀分布赋给S中的每个元素的概率是 \\frac{1}{n}\n$$\n\n------------\n\n$$\n事件E的概率是在E中结果的概率之和，即\\\\\np(E)=\\sum_{s \\in E}p(s)\n$$\n\n”\n\n-----------\n\n\"\n$$\n如果E_1，E_2 \\cdots E_n 是样本空间S中两两不交事件的序列，那么\\\\\np(\\bigcup_{i} E_i )=\\sum_{i} p(E_i)\n$$\n\"\n\n注意这里是各个事件都是不相交的，且在同一个样本空间中，如果相交，则需要[参考这里的公式](https://blog.csdn.net/YQXLLWY/article/details/112594361)\n\n---------------\n\n“\n$$\n设E和F是具有p(F)>0的事件，给定F的条件下E的条件概率记做p(E|F)，定义为\\\\\np(E|F)=\\frac{p(E \\cap F)}{p(F)}\n$$\n”\n\n这里举书上的一个例子来说比较好：\n\n假设4位0，1组成的字符串，当第一个位0的情况下，结果中出现2个连续的0的概率有多少？\n$$\nF：第一位为0 \\\\\nE：结果中出现2个连续的0\\\\\nE \\cap F=\\{0000,0001,0010,0011\\}\\\\\nF：\\{0000,0001,0010,0011,0100,0101,0110,0111\\}\\\\\n样本总个数为 2^4=16，所以\\\\\np(E \\cap F)=\\frac{4}{16} \\\\\np(F)=\\frac{8}{16}\\\\\n所以 p(E|F)=\\frac{4}{8}=\\frac{1}{2}\n$$\n有没有觉得其实就是在F的样本集中找E的样本集？\n\n----------------\n\n“\n$$\n事件E和F是独立的，当且仅当 p(E \\cap F)=p(E) \\cdot p(F)\n$$\n”\n\n注意这里和上面的不同之处在于上面是在同一个样本集中考虑的，而这里则是在两个样本集中考虑的。\n\n--------------\n\n### 伯努利试验与二项分布\n\n$$\n在n次独立的伯努利试验中有k次成功的概率在成功概率为p，失败概率为q=1-p时，概率为\\\\\nb(k;n,p)=C(n,k){p}^{k}{q}^{n-k}\n$$\n\n先介绍啥叫伯努利试验，就是结果只有2种的试验，2种试验结果的概率不一定要一致。再来就是上面的那个公式叫做**二项分布**。\n\n这里借用书上的一个例子说明一下：\n\n投掷一次硬币，出现人头和画的概率各是1/2，问出现4次人头的概率是多少？\n$$\n首先，在总数为n的伯努利试验中，进行k次概率为p的试验，其每次的概率为\\\\\n{p}^{k}{q}^{n-k}\\\\\n在上面的例子中就是 {(\\frac{1}{2})}^{4} \\cdot {(\\frac{1}{2})}^{3}\\\\\n其结果总数为 C(7,4)=\\frac{7!}{3!4!}=35\\\\\n所以概率是 C(7,4) \\cdot {(\\frac{1}{2})}^{4} \\cdot {(\\frac{1}{2})}^{3}=\\frac{35}{128}\n$$\n"
          }
        ]
      },
      {
        id: "dm-ch7-7-3",
        title: "7.3 贝叶斯定理",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch7-7-3-0",
            type: "text",
            content: "# 7.3 贝叶斯定理\n\n$$\n在之前我们知道：p(E|F)=\\frac{P(E \\cap F)}{p(F)}\\\\\n但是如果我们知道：p(E|F)，p(E|\\overline{F})，p(F)，那么我们就可以知道p(F|E)\n$$\n\n证明：\n$$\n因为：\\\\\np(E|F)=\\frac{p(E \\cap F)}{p(F)}\\\\\np(E|\\overline{F})=\\frac{p(E \\cap \\overline{F})}{p(\\overline{F})}\\\\\np(E)=p(E|F)\\cdot p(F)+p(E|\\overline{F}) \\cdot p(\\overline{F}) \\\\\n所以：\\\\\np(F|E)=\\frac{p(F|E)}{p(E)}\\\\\n=\\frac{p(F \\cap E)}{p(E|F)\\cdot p(F)+p(E|\\overline{F}) \\cdot p(\\overline{F})}\\\\\n=\\frac{p(E \\cap F)}{p(E|F)\\cdot p(F)+p(E|\\overline{F}) \\cdot p(\\overline{F})}\\\\\n=\\frac{p(E|F) \\cdot p(F)}{p(E|F)\\cdot p(F)+p(E|\\overline{F}) \\cdot p(\\overline{F})}\n$$\n举个例子就是：\n\n- E：得癌症死亡\n- F：确诊癌症\n- p(E|F)：确诊癌症后死亡\n- p(E|-F)：没有确诊癌症却得癌症后死亡\n- p(F|E)：在确定癌症死亡律后，当自己确诊癌症时，自己有多少概率死亡\n\n[p(E|F)得定义见这里](https://blog.csdn.net/YQXLLWY/article/details/112596797)\n\n在之前说过，p(E|F)其实像是在p(F)中找p(E n F)的数量。在上面的：p(F|E)，其实也可以理解，在得癌症死亡的人数中，多少人是确诊的。那么p(E|F)和p(F|E)是相等的吗？\n\n不是，因为基数不同，p(E|F)是以确诊人数为基数，其中的死亡人数。p(F|E)，则是以死亡人数为基数，其中确诊的人数。\n\n最后就是上面的这个公式：\n$$\np(E)=p(E|F)\\cdot p(F)+p(E|\\overline{F}) \\cdot p(\\overline{F})\\\\\n=p(E \\cap F)+p(E \\cap \\overline{F})\n$$\n这个可以这么理解：得癌症死亡的人=被确诊癌症并且得癌症死亡的人+没有确诊癌症但是得癌症死亡的人\n\n同时还有一个问题，那就是：\n$$\n1-p(E|F)=p(\\overline{E}|F)\n$$\n\n### 拓展的贝叶斯定理\n\n上面只有2种情况：\n$$\nF 和 \\overline{F}\n$$\n但是如果有多种情况呢？比如F1，F2，F3，F4等。\n$$\np(E)=p(E|F_1)\\cdot p(F_1)+p(E|F_2)\\cdot p(F_2)+p(E|F_3)\\cdot p(F_3) \\cdots p(E|F_n)\\cdot p(F_n) \\\\\n且\\\\\n\\bigcup^{n}_{i=1} F_i=S \\\\\n那么\\\\\np(F_j | E)=\\frac{p(E|F_j) \\cdot p(F_j)}{\\sum^{n}_{i} (p(E|F_i)\\cdot p(F_i))}\n$$\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch7-7-4",
        title: "7.4 期望值和方差",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch7-7-4-0",
            type: "text",
            content: "# 7.4 期望值和方差\n\n## 期望值\n\n$$\nE(X)=\\sum_{s \\in S}p(s)X(s)\n$$\n\n例如一个点数从1到6的骰子，其投掷一次的期望值是\n$$\nE(X)=1 \\cdot \\frac{1}{6}+2 \\cdot \\frac{1}{6}+3 \\cdot \\frac{1}{6}+4 \\cdot \\frac{1}{6}+5 \\cdot \\frac{1}{6}+6 \\cdot \\frac{1}{6}\n$$\n不用神话期望值，其本质就是对应的值乘以概率的和，所有的值要布满样本空间。\n\n-----------\n\n#### 随机变量与期望值\n\n随机变量这个词比较迷惑性，可能是英译中的时候搞出来的，所以这里可以将其理解为函数。\n\n将原本的样本空间中的字集经过函数处理后所得到的值，比如掷两个骰子，两个骰子的和。原本的样本空间和其所对应的函数处理结果如下所示，函数使用X表示：\n\n```mathematica\nX((1,1))=2\nX((1,2))=X((2,1))=3\nX((1,3))=X((3,1))=X((2,2))=4\nX((1,4))=X((4,1))=X((2,3))=X((3,2))=5\nX((1,5))=X((5,1))=X((2,4))=X((4,2))=X((3,3))=6\nX((1,6))=X((6,1))=X((2,5))=X((5,2))=X((3,4))=X((4,3))=7\nX((2,6))=X((6,2))=X((3,5))=X((5,3))=X((4,4))=8\nX((3,6))=X((6,3))=X((4,5))=X((5,4))=9\nX((4,6))=X((6,4))=X((5,5))=10\nX((5,6))=X((6,5))=11\nX((6,6))=12\n```\n\n其中原本的样本空间`(1,1),(1,2),(2,1)`经过函数处理后，构成了X的样本空间`X(S)`。\n$$\n(r,p(X=r))，代表r \\in X(S)，p(X=r)代表X=r的概率。\n$$\n\n在上面的基础上，问投出的值的概率各是多少？\n\n```mathematica\np(X=2)=p(X=12)=1/36\np(X=3)=p(X=11)=2/36\np(X=4)=p(X=10)=3/36\np(X=5)=p(X=9)=4/36\np(X=6)=p(x=8)=5/36\np(X=7)=6/36\n```\n\n这里的`p(X=2)`代表上面两个骰子的和为2的情况，看到只有1种，`X((1,1))`，`p(X=12)`同理，`X((6,6))`。\n\n**随机变量其实本质就是在之前所有样本空间的基础上，使用函数，修改p(X=r)时，r的值。**\n\n投出的值的期望值的计算就按照期望值的定义走就行了：\n$$\nE(X)=2 \\cdot \\frac{1}{36}+3 \\cdot \\frac{2}{36}+ 4 \\cdot \\frac{3}{36}+ 5 \\cdot \\frac{4}{36}+6 \\cdot \\frac{5}{36}+7 \\cdot \\frac{6}{36}\\\\\n+12 \\cdot \\frac{1}{36}+11 \\cdot \\frac{2}{36}+ 10 \\cdot \\frac{3}{36}+ 9 \\cdot \\frac{4}{36}+8 \\cdot \\frac{5}{36} \\\\\n=7\n$$\n\n#### 期望值的线性性质\n\n在确定结果的情况下，可不可以试试单独计算两个骰子的期望值，然后相加呢？\n$$\nE(X_1)=1 \\cdot \\frac{1}{6}+2 \\cdot \\frac{1}{6}+3 \\cdot \\frac{1}{6}+4 \\cdot \\frac{1}{6}+5 \\cdot \\frac{1}{6}+6 \\cdot \\frac{1}{6}=\\frac{7}{2}\\\\\nE(X_2)=1 \\cdot \\frac{1}{6}+2 \\cdot \\frac{1}{6}+3 \\cdot \\frac{1}{6}+4 \\cdot \\frac{1}{6}+5 \\cdot \\frac{1}{6}+6 \\cdot \\frac{1}{6}=\\frac{7}{2}\\\\\nE(X_1)+E(X_2)=\\frac{7}{2}+\\frac{7}{2}=7\n$$\n结果竟然一致，书上是通过[数学归纳法](https://blog.csdn.net/YQXLLWY/article/details/112106627)证明的，但是我在这里就写一下结论\n\n$$\n如果 X_i 是 S 上的随机变量，n是正整数，并且 a,b \\in N，\\\\\nE(X_1+X_2+X_3 \\cdots X_n)=E(X_1)+E(X_2)+E(X_3) \\cdots E(X_n)\\\\\nE(a \\cdot X+b)=a \\cdot E(X)+b\n$$\n\n----------\n\n> n次试验的伯努利试验的期望值是 np，其中p是每次试验的中“成功”的概率\n\n[伯努利试验就是试验结果只有2种的事件](https://blog.csdn.net/YQXLLWY/article/details/112596797)\n\n在开始证明前，先证明一个推论：\n$$\nC(n,k) \\cdot k=nC(n-1,k-1)\\\\\n证明：\\\\\nC(n,k) \\cdot k=\\frac{n!}{(n-k)!k!} \\cdot k= \\frac{n \\cdot (n-1!)}{((n-1)-(k-1))!(k-1)!k} \\cdot k= n \\frac{(n-1)!}{((n-1)-(k-1))!(k-1)!}=n C(n-1,k-1)\n$$\n\n\n[C(n,k)就是总数为n的k个样本的组合总数](https://blog.csdn.net/YQXLLWY/article/details/112427740)\n\n证明：\n$$\nE(X)=\\sum^{n}_{k=1}k \\cdot p(k)\\\\\n=\\sum^{n}_{k=1} k \\cdot C(n,k) p^k {q}^{(n-k)} \\\\\n=\\sum^{n}_{k=1} n \\cdot c(n-1,k-1) p^k {q}^{(n-k)}\\\\\n=np \\sum^{n}_{k=1} c(n-1,k-1) {p}^{k-1} {q}^{n-k} \\\\\n令 j=k-1 \\\\\n=np \\sum^{n}_{k=1} c(n-1,k-1) {p}^{k-1} {q}^{n-k} \\\\\n=np \\sum^{n-1}_{j=0} c(n-1,j) {p}^{j} {q}^{n-(j+1)} \\\\\n=np \\sum^{n-1}_{j=0} c(n-1,j) {p}^{j} {q}^{n-1-j} \\\\\n=np {(p+q)}^{n-1}=np\n$$\n其中倒数第二步是因为[二项式定理](https://blog.csdn.net/YQXLLWY/article/details/112417453)\n\n在算法的角度看，**期望值其实就是平均算法复杂度**。但是我看了很久，没有弄懂，所以暂时不深究了。\n\n#### 几何分布\n\n这个证明很鬼扯，但是结论却很简单，所以直接上结论：\n$$\n如果对于k=1,2,3,4 \\cdots n,p(X=k)={(1-p)}^{(k-1)} \\cdot p，那么随机变量X具有带参数p的几何分布。\n$$\n比如投掷骰子，问第n次出现6的概率是多少时：\n\n```mathematica\np(X=1)=1/6\np(X=2)=5/6 * 1/6\np(X=3)=5/6 * 5/6 * 1/6\n......\np(X=n)=(1-1/6)^(n-1) * 1/6\n```\n\n那么期望值就是：\n$$\nE(X)=\\sum^{n}_{j=1} j \\cdot {(1-p)}^{(n-1)} \\cdot p\n$$\n当n趋近于无穷大时，上面的公式可以采用微积分的知识（我忘了）推导为：\n$$\nE(X)=\\frac{1}{p}\n$$\n\n#### 独立随机变量\n\n$$\n随机变量X和Y在样本空间S上是独立的，则 \\\\\np(X=r_1 \\cap Y=r_2)=p(X=r_1) \\cdot p(Y=r_2)\n$$\n\n这个很简单，抛开随机变量的定义，就是两个相互独立的事情，其一起发生的概率是各自发生概率的乘积。\n\n在上面的基础上，再加上期望值的概念：\n$$\n随机变量X和Y在样本空间S上是独立的，则 \\\\\nE(XY)=E(X)\\cdot E(Y)\n$$\n这里书上的证明我感觉是有问题的，也可能是我脑子糊涂了，暂时先记下来，需要的时候再用吧。\n\n## 方差\n\n$$\n方差使用 V(X)，或者 \\sigma(X) 表示：\\\\\nV(X)=\\sum_{s \\in S} (X(s)-E(X))^2 \\cdot p(s)\n$$\n\n在下面说明方差的真实意义之前，先推导一个下面的公式：\n$$\nV(X)=E(X^2)-E(X)^2\n$$\n证明：\n$$\nV(X)=\\sum_{s \\in S} (X(s)-E(X))^2 \\cdot p(s)\\\\\n=\\sum_{s \\in S} (X(s)^2 - 2X(s)E(X)+E(X)^2) \\cdot p(s)\\\\\n=\\sum_{s \\in S} X(s)^2 \\cdot p(s)-\\sum_{s \\in S} 2X(s)E(X)p(s)+\\sum_{s \\in S} E(X)^2p(s)\\\\\n=E(X^2)-2E(X) \\sum_{s \\in S} X(s)p(s)+E(X)^2\\\\\n=E(X^2)-2E(X)E(X)+E(X)^2\n=E(X^2)-E(X)\n$$\n其中一些点的说明：\n$$\nE(X)是固定值，所以可以单独抽离出来。\\\\\n并且 \\sum_{s \\in S}p(s)=1。\\\\\n$$\n再来证明下面的值：\n$$\n如果 E(X)=\\mu，则 V(X)=E((X-\\mu)^2)\n$$\n\n证明：\n$$\nE((X-\\mu)^2)=E(X^2-2X \\mu+{\\mu}^{2})\\\\\n=E(X^2)-E(2X\\mu)+E({\\mu}^{2})\\\\\n=E(X^2)-2\\mu E(X)+{\\mu}^{2}\\\\\n=E(X^2)-2\\mu \\cdot \\mu+ \\mu \\cdot \\mu\\\\\n=E(X^2)-{\\mu}^2\\\\\n=E(X^2)-(E(X))^2\n=V(X)\n$$\n\n#### 比安梅公式\n\n$$\n对于在样本空间中互相独立的随机变量 X_1,X_2,X_3 \\cdots X_n，\\\\\nV(X_1+X_2+X_3 \\cdots X_n)=V(X_1)+V(X_2)+V(X_3) \\cdots V(X_n)\n$$\n\n证明：\n$$\nV(X+Y)=E((X+Y)^2)-(E(X+Y))^2=E(X^2+2XY+Y^2)-(E(X)+E(Y))^2\\\\\n=E(X^2)+2E(XY)+E(Y^2)-(E(X))^2-2E(X)E(Y)-(E(Y))^2\\\\\n=E(X^2)+2E(X)E(Y)+E(Y^2)-(E(X))^2-2E(X)E(Y)-(E(Y))^2\\\\\n=E(X^2)-(E(X))^2+E(Y^2)-(E(Y))^2\\\\\n=V(X)+V(Y)\n$$\n更多的参数只需要在上面的基础之上进行证明下去。\n\n#### 切比雪夫不等式\n\n$$\nr \\in N^+，那么 \\\\\np(|X(s)-E(X)|>=r) <= \\frac{V(X)}{r^2}\n$$\n\n上面的定义啥意思呢？简单来说就是对于样本空间中的值，其值与期望值差的绝对值大于r的概率，小于方差除以r的平方。\n\n证明：\n$$\n设事件 A = \\{s\\in S | |X(s)-E(X)|>=r\\}\\\\\nV(X)=\\sum_{s \\in S}(X(s)-E(X))^2 \\cdot p(s)\\\\\n=\\sum_{s \\in A}(X(s)-E(X))^2 \\cdot p(s)+\\sum_{s \\notin A}(X(s)-E(X))^2 \\cdot p(s)\\\\\n首先看 \\sum_{s \\in A}(X(s)-E(X))^2 \\cdot p(s) 的部分，因为是集合A的元素，所以 (X(s)-E(X))>r，所以 \\sum_{s \\in A}(X(s)-E(X))^2 \\cdot p(s) > \\sum_{s \\in A} r^2 p(s)。\\\\\n\\sum_{s \\notin A}(X(s)-E(X))^2 \\cdot p(s) 肯定大于0，所以\\\\\nV(X)>=\\sum_{s \\in A} r^2 p(s)，即\\\\\np(A)<=\\frac{V(X)}{r^2}\n$$\n"
          }
        ]
      },
      {
        id: "dm-ch7-lesson-5",
        title: "有趣的概率问题",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch7-lesson-5-0",
            type: "text",
            content: "# 有趣的概率问题\n\n## 蒙地厅大厦的3门难题\n\n> 有3扇门，其中只有1扇门后面有奖金，主持人知道是哪一扇门。\n>\n> 游戏开始时，你需要首先选择一扇，然后主持人会打开一扇没有奖金的门，这个时候你有第二次选择的权利，你是否会选择更换你的选择？\n\n---------------------\n\n在说这道题之前，在漫改电视剧《欺诈游戏》中有个很有意思的扑克游戏：[感兴趣可以到B站看](https://www.bilibili.com/video/BV1mt411176C)\n\n> 在一个不可见的袋子里有2张牌，其中1张两面花色都一致，称为暗牌，另一张背面与暗牌的花色一致，正面是天使的画像，称为亮牌。\n>\n> 游戏开始时，你从中抽出一张来，这个时候双方开始下注，胜者可以获取所有赌注。\n>\n> 下注结束后，如果翻过来是亮牌，你胜利，如果是暗牌，则是对方胜利。但是如果翻出来时就确定了牌的种类，则本局作废。\n\n问，这游戏你和对方获胜的概率一致吗？\n\n答案不是，因为如果你只看你能抽到的牌，那么自然是50%，但是如果按照摆到桌子上的结果来看的话，那么就有4种情况：\n\n- 亮牌的正面：平局\n- 亮牌的背面：胜利\n- 暗牌的正面：失败\n- 暗牌的背面：失败\n\n但是你注意看，当你抽中**亮牌的正面**时，就知道了这张牌，本局作废，所以你的对手的胜率是你的2倍。\n\n-----------------\n\n同样的道理，在上面的概率题中，你也不能只看最终的成功概率为1/3。这是我摘自知乎中的一个回答，我觉得是最容易理解的：\n\n> 有三扇门，其中一扇车门，两扇羊门。嘉宾a选定一扇门，剩下的两扇门都是嘉宾b的。那么你要当嘉宾a还是嘉宾b？\n\n我觉得很多人都会选择嘉宾b，因为无论怎么看嘉宾a的风险都更高，毕竟2/3的概率会选择羊门。\n\n## 生日问题\n\n> 如果要求房间中至少2个人有相同生日的概率大于1/2，那么所需的最少是多少人？\n\n首先假设一年总天数是366天的固定值。\n$$\n其中随便2个人生日不是同一天的概率是 \\frac{365}{366} \\\\\n其中随便3个人生日不是同一年的概率是 \\frac{365}{366} \\cdot \\frac{364}{366} \\\\\n\\vdots \\\\\n其中随便n个人生日不是同一天的概率是 P_n=\\frac{365}{366} \\cdot \\frac{364}{366} \\cdots \\frac{366-(n-1)}{366}\\\\\n则其中随便n个人生体是同一天的概率是 1-P_n > 0.5 \\\\\n$$\n其中书上说可以通过微积分的知识来算，或者可以手算，所以我在这里就公布一下答案：n=23\n\n### 拉姆赛数：R(m,n)\n\n啥是拉姆塞数呢？举个例子就是，假设R(m,n)=x，即在 x 个点中，m个点是互相连接的，**或者**n个点是不互相连接的，能实现这个前提的最小的x的值，就是R(m,n)。\n\n比如R(3,3)=6。\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmph2wm9z7j30kt0il0te.jpg)\n\n其中分别展示了在0根线，1根线，2根线，3根线的情况下，上面的结论都是成立的。\n\n或者另一个更加常见的说法是：\n\n> 在一个6人的派对上，至少有3人是朋友，或者3人不互相认识。\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch8",
    title: "第8章 递推关系",
    description: "递推关系建模与求解、分治算法、容斥原理",
    icon: "♾️",
    lessons: [
      {
        id: "dm-ch8-8-2-2",
        title: "8.2 求解线性递推关系2",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch8-8-2-2-0",
            type: "text",
            content: "### 求解常系数线性非齐次递推关系\n\n[基础定义和前提内容](https://blog.csdn.net/YQXLLWY/article/details/113057829)\n\n如果一个递推关系是非齐次的，形如：\n$$\na_n=c_1 \\cdot {a}_{n-1}+c_2 \\cdot {a}_{n-2}+c_1 \\cdot {a}_{n-3} \\cdots c_k \\cdot {a}_{n-k}+F(n) \\\\\n且 F(n)只依赖于n，F(n) \\neq 0\n$$\n其中`a_n`中齐次部分叫做：**相伴的齐次递推关系**\n\n对于这种递推关系，其解有两部分组成：\n$$\n{a}^{(h)}_{n}是相伴的齐次递推关系的一个解。\\\\\n{a}^{(p)}_{n}是常系数线性非齐次递推关系的一个特解。\\\\\n其解的形式为：\\\\\n({a}^{(h)}_{n}+{a}^{(p)}_{n})\n$$\n啥意思呢？\n$$\n简单来说就是首先要找到递推关系的一个特解：{a}^{(p)}_{n}，啥叫特解呢？就是在这个解下，递推关系成立。因为解可能不止一个，所以叫做特解。\\\\\n然后就是去找相伴的齐次递推关系的解，两者一组合，就是原本递推关系的解了。\n$$\n先看一个例子，然后再说明上面的定理为什么是对的。例子：\n$$\n求：a_n=3 \\cdot {a}_{n-1}+2n,a_1=3的解\n$$\n解题过程：\n$$\n这里的 F(n)=2n，于是我们就假设特解的形式为：F(n)=c\\cdot n+d，其中c,d \\in R。\\\\\n于是：a_n=cn+d=3\\cdot (c(n-1)+d)+2n \\\\\n展开化解后：(2+2c)n+(2d-3c)=0。\\\\\n为了使 F(n)=c\\cdot n+d 成为递推关系的特解，即真对所有的n都成立。\\\\\n必须：2+2c=0\\ \\cap\\ 2d-3c=0。于是我们求的：{a}^{(p)}_{n}=-n-\\frac{3}{2}\\\\\n下面再来求解相伴的齐次递推关系的解。根据 a_n=3 \\cdot {a}_{n-1}可知，其解应该为 {a}^{(h)}_{n}=k \\cdot 3^n\\\\\n于是我们套用上面的公式：\\\\\na_n={a}^{(p)}_{n}+{a}^{(h)}_{n}=-n-\\frac{3}{2}+k\\cdot 3^n \\\\\na_1=3=-1-\\frac{3}{2}+k\\cdot 3^1 \\\\\n求得：k=\\frac{11}{6} \\\\\n于是a_n=-n-\\frac{3}{2}+ \\frac{11}{6} \\cdot 3^n\n$$\n在借用了这个例子理解了上面各个部分的含义之后，接下来证明为什么上面的解的形式是有效的：\n$$\n因为 {a}^{(p)}_{n} 是递推关系的一个解，所以：\\\\\n{a}^{(p)}_{n}=c_1 {a}^{(p)}_{n-1}+c_2 {a}^{(p)}_{n-2} \\cdots c_k {a}^{(p)}_{n-k}+F(n)\\\\\n同时，设 b_n 为递推关系的另一个解，所以：\\\\\nb_n=c_1 {b}_{n-1}+c_2 {b}_{n-2} \\cdots c_k {b}_{n-k}+F(n)\\\\\n所以 \\\\\nb_n-{a}^{(p)}_{n}=c_1 ({b}_{n-1}-{a}^{(p)}_{n-1})+c_2 ({b}_{n-2}-{a}^{(p)}_{n-2}) \\cdots ({b}_{n-k}-{a}^{(p)}_{n-k}) \\\\\n可以看到结果是一个常系数线性齐次递推关系，定义其为{a}^{(h)}_{n}\\\\\n所以 b_n={a}^{(p)}_{n}+{a}^{(h)}_{n}\n$$\n\n----------------\n\n下面就是对于一种特殊情况的`F(n)`的通用解：\n$$\nF(n)=(b_t n^t + {b}_{n-1} {n}^{t-1} \\cdots b_1 n+b_0)\\cdot s^n，其中 b_1,b_2 \\cdots b_0,s \\in R 时,\\\\\n当 s 不是相伴齐次递推关系的根时，特解形式为：\\\\\n(p_t n^t + {p}_{n-1} {n}^{t-1} \\cdots p_1 n+p_0)\\cdot s^n \\\\\n当 s 时相伴齐次递推关系的根，且其重数为m时，特解形式为：\\\\\nn^m \\cdot (p_t n^t + {p}_{n-1} {n}^{t-1} \\cdots p_1 n+p_0)\\cdot s^n\n$$\n例子：\n$$\na_n=6 {a}_{n-1}-9 {a}_{n-2}+F(n)的特解，在F(n)=3^n,F(n)=n 3^n,F(n)=n^2 2^n,F(n)=(n^2+1) 3^n时，分别为多少？\n$$\n解决过程：\n$$\n相伴的齐次递推关系为：a_n=6 {a}_{n-1}-9 {a}_{n-2}，其特征方程为 r^2-6n+9=(r-3)^2=0，其特征根为一个2重根3。\\\\\n所以当 F(n)=3^n时，特解形式为 n^2 p_0 3^n \\\\\n当 F(n)=n3^n时，特解形式为 n^2 (p_1n+p_0) 3^n \\\\\n当 F(n)=n^2 2^n时，特解形式为 (p_2 n^2+p_1n+p_0) 2^n\\\\\n当 F(n)=(n^2+1) 3^n时，特解形式为 n^2 (p_2 n^2+p_1n+p_0) 3^n\n$$\n"
          }
        ]
      },
      {
        id: "dm-ch8-8-1",
        title: "8.1 递推关系的应用",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch8-8-1-0",
            type: "text",
            content: "# 8.1 递推关系的应用\n\n#### 兔子和斐波那契数列\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmqzteyquhj30bb0cimxo.jpg)\n\n简单来说就是一个僵尸，初始等级为1，每过一个月提升1级，升级到2级之后就可以感染下一个人，将其变成1个1级的僵尸。（我不喜欢兔子的那个例子，因为我总是在纠结一个公兔和多个母兔子的问题）。\n\n然后用递归来计算上面的问题就是：\n\n```php\nfunction getNumber($month){\n    if($month==1){\n        return [1=>1,2=>0];\n    }\n    $lastMonth=getNumber($month-1);\n    return [1=>$lastMonth[2],2=>($lastMonth[2]+$lastMonth[1])];\n}\n\n$result=getNumber(6);\n\nprint_r($result);\n/**\nArray\n(\n    [1] => 3\n    [2] => 5\n)\n**/\n```\n\n#### 汉诺塔\n\n这个资料很多了，我是参考了[B站的这个视频](https://www.bilibili.com/video/BV1qs411R7i3)。\n\n这里仅仅计算完成汉诺塔需要多少步，并不涉及其中的具体步骤：\n\n```php\n<?php\n\nclass Town{\n    public function totoalStepsNumber($dishNumber){\n        if($dishNumber==1){\n            return 1;\n        }\n        return 1+2*$this->totoalStepsNumber($dishNumber-1);\n    }\n}\n\n$town=new Town();\nprint $town->totoalStepsNumber(4);\n```\n\n这里的思路很简单，就像宋丹丹和赵本山的那个小品一样，把大象关进冰箱需要几步，3步：打开冰箱门，把大象放进冰箱，关上冰箱门。\n\n这里是同样的意义，无论中间的具体操作是什么，移动第i个汉诺塔的盘子，都需要先将前面`i-1`个盘子移动到另一个盘子上，然后移动这第i个汉诺塔盘子，然后再将前面第`i-1`个盘子移动到这个盘子上。\n\n#### 不包含连续两个0的字符串\n\n故名思义，就是在长度为n的字符串中，所有不包含连续两个0的字符串总量有多少？\n\n这里我看错书上的意思，结果写成了获取所有的可能值的代码，但是结合这个看，可以更好理解总量的部分：\n\n```php\n<?php\n\nfunction withoutDoubleZero($length){\n    if($length==2){\n        return ['01','11','10'];\n    }\n    $lastword=withoutDoubleZero($length-1);\n    $returnData=[];\n    foreach($lastword as $word){\n        if(substr($word,-1,1)=='0'){\n            $returnData[]=$word.\"1\";\n        }else{\n            $returnData[]=$word.\"0\";\n            $returnData[]=$word.\"1\";\n        }\n    }\n    return $returnData;\n}\n\nprint_r(withoutDoubleZero(5));\n```\n\n或者我换成下面的图可以更容易理解：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmr363worvj30dp07vjrs.jpg)\n\n在0的后面只能跟1，在1的后面可以随便跟0和1，都不会违反出现连续两个0的的情况。跟最开始的斐波那契数列的情况是一样的。\n\n## 动态规划\n\n[参考B站视频](https://www.bilibili.com/video/BV18x411V7fm?from=search&seid=2709205009921234000)\n\n那个参考视频讲的真的很好，如果可以，建议直接去看视频。\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmtcogqsczj30jb09njrp.jpg)\n\n这里首先定义一下**相容**的概念：讲座i的开始时间大于等于讲座k的结束时间，那么就可以说这两个讲座是相容的，在上面的例子中，讲座1和讲座2是不相容的，讲座3和讲座1是相容的。\n\n再来就是`p(j)`的定义，其表示为对于讲座`j`来说接近的相容讲座，比如对于讲座7来说，讲座1，2，3，4都相容，但是讲座3最接近，所以`p(7)=4`。\n\n- p(1)=0\n- p(2)=0\n- p(3)=1\n- p(4)=0\n- p(5)=0\n- p(6)=2\n- p(7)=4\n\n接下来加入每场讲座能参与的人员数：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmtctlk79ij30it09774p.jpg)\n\n接下来加入一个函数：`opt(n)`，它代表按照时间往前排序时，安排第n场讲座的最优解。\n\n现在从讲座7开始考虑，对于讲座7有2种选择，安不安排讲座7：\n\n- 安排讲座7：总人数为`opt(4)+10`\n\n- 不安排讲座7时：总人数为`opt(6)`\n\n这里解释两个值，为什么安排讲座时，总人数是`opt(4)+10`，`opt(4)`是因为如果一定要安排讲座7，则不可能安排讲座5，6，因为5，6和7不兼容，所以只能是和7兼容的最大值，即`opt(p(7))`，再加上讲座7所能容纳的参与人数10。\n\n再来就是不安排讲座7时，那么就先假设总人数最优解为`opt(6)`，这里不用纠结为什么是`opt(6)`，因为`opt(6)`也不一定是我们的最终结果，这里只是将其作为一个中间值而已。\n\n按照上面的思路，我们继续考虑，不安排讲座7时，`opt(6)`的值，这个时候又有2个选择，是否安排讲座6:\n\n- 安排讲座6：总人数为`opt(2)+20`\n- 不安排讲座6：总人数为`opt(5)`\n\n将上面的结果制作成树状图就是下面的形式：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gmtdn4nrjgj30sw0h0ta9.jpg)\n\n从最上面开始看起，如果`opt(7)`可以延生出两条线，`opt(4)+10`和`opt(6)`，分表代表安排讲座7和不安排讲座7，接下来针对`opt(4)`，也有两种选择，安排讲座4和不安排讲座4，安排讲座4则能增加30人，不安排讲座4，则计算`opt(3)`。以此类推直到`opt(1)`，如果安排讲座1，则人数为10人，不安排讲座1，则0人，所以我们可以知道`opt(1)=10`，然后往上走到`opt(2)`，如果安排讲座2，则人数为20人，否则人数为`opt(1)=10`人，所以`opt(2)=20`，以此类推直到回到最上面的`opt(4)+10=40`。\n\n接下来在`opt(6)`那一侧，因为之前就计算过`opt(2),opt(4)`的值，所以不会再去计算一次，按照左侧的计算逻辑，得出最优解为只安排讲座5，人数为100人。\n\n```php\n<?php\n\n$p=[\n    1=>0,\n    2=>0,\n    3=>1,\n    4=>0,\n    5=>0,\n    6=>2,\n    7=>4\n];\n\n$sites=[\n    1=>10,\n    2=>20,\n    3=>20,\n    4=>30,\n    5=>100,\n    6=>20,\n    7=>10\n];\n$cache=[];\n\nfunction opt($n){\n    global $sites,$p,$cache;\n    if(isset($cache[$n])){\n        return $cache[$n];\n    }\n    if($n<=0){\n        return 0;\n    }\n    $cache[$n]=max(opt($n-1),opt($p[$n])+$sites[$n]);\n    return $cache[$n];\n}\n\nprint opt(7);\nprint PHP_EOL;\nprint_r($cache);\n```\n\n输出结果：\n\n```bash\n100\nArray\n(\n    [1] => 10\n    [2] => 20\n    [3] => 30\n    [4] => 30\n    [5] => 100\n    [6] => 100\n    [7] => 100\n)\n```\n\n"
          }
        ]
      },
      {
        id: "dm-ch8-8-2",
        title: "8.2 求解线性递推关系",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch8-8-2-0",
            type: "text",
            content: "# 8.2 求解线性递推关系\n\n### 常系数的k阶线性齐次递推关系\n\n“\n$$\n一个常系数的k阶线性齐次递推关系是形如：\\\\\na_n=c_1 \\cdot {a}_{n-1}+c_2 \\cdot {a}_{n-2}+c_3 \\cdot {a}_{n-3}+\\cdots c_k \\cdot {a}_{n-k}\\\\\n的递推关系，其中 c_1,c_2,c_3 \\cdots c_k 是实数，且 c_k \\neq 0\n$$\n”\n\n乍一看很迷的一个定义，一个一个拆解其中的定义：\n\n- 常系数：`c1,c2,c3......ck`都是常数，且在其中没有n的变量之类的\n- k阶：`a_n`的值由前面的`k`项来决定\n- 线性：`a_n`的值是由前面几项的倍数之和\n- 齐次：其中各项都是`a_j`的倍数\n\n举几个例子：\n$$\np_n=(1.11){p}_{n-1}：1阶齐次线性递推关系\\\\\nf_n={f}_{n-1}+{f}_{n-2}:2阶齐次线性递推关系\\\\\na_n=a_5：5阶齐次线性递推关系\\\\\na_n={a}_{n-1}+{a}_{n-2}^{2}：非线性\\\\\nH_n=2\\cdot {H}_{n-1}+1：非齐次\\\\\nB_n=n \\cdot {B}_{n-1}：非常系数\n$$\n\n---------------\n\n#### 求解常系数线性齐次递推关系\n\n简单点来说就是将上面的常系数线性齐次递推关系转换成`n`和`a_n`的函数。\n\n首先是第一种形式的递推关系的解：\n$$\n递归关系的形式如下：a_n=c_1 \\cdot {a}_{n-1}+c_2 \\cdot {a}_{n-2}，其中 c_1,c_2 \\in R \\\\\n再来要求：r^2 - c_1 \\cdot r -c_2=0，有两个不相等的解 r_1，r_2。\\\\\n那么 a_n= k_1 \\cdot {r}_{1}^{n}+k_2 \\cdot {r}_{2}^{n}\\ 就是上面递推关系的解\\\\\nk_1,k_2 \\in R，一般情况下可以根据已知条件推算出来\n$$\n例子：求解\n$$\na_n= {a}_{n-1} + 2 \\cdot {a}_{n-2} 的解，其中 a_0=2,a_1=7\n$$\n解答过程：\n$$\n套用上面的公式可知：c_1=1,c_2=2，所以 \\\\\nr^2 - c_1 \\cdot r -c_2 = r^2-r-2=0 \\\\\n解有2个：r_1=2,r_2=-1 \\\\\n所以解为：a_n=k_1 \\cdot {r}_{1}^{n}+k_2 \\cdot {r}_{2}^{n}=k_1 \\cdot 2^n +(-1)^n \\\\\n因为\\\\\na_0=2=k_1 \\cdot 2^0 +(-1)^0 \\\\\na_1=7=k_1 \\cdot 2^1 +(-1)^1 \\\\\n所以解出：k_1=3，k_2=-1 \\\\\n所以：a_n=3 \\cdot 2^n + (-1) \\cdot (-1) ^ n=3 \\cdot 2^n - (-1)^n\n$$\n看完例子之后，来证明这样做的原理：\n$$\n假设：\\\\\nr_1^2-c_1 \\cdot r_1-c_2=0\\\\\nr_2^2-c_1 \\cdot r_2-c_2=0\\\\\nr_1 \\neq r_2 \\\\\na_n=k_1 {r}_{1}^n+k_2 {r}_{2}^{n} \\\\\n那么：\\\\\na_n=k_1 {r}_{1}^{n-2} \\cdot{r}_{1}^{2} +k_2 {r}_{2}^{n-2} \\cdot {r}_{2}^{2}\\\\\n=k_1 {r}_{1}^{n-2}(c_1 \\cdot r_1+c_2)+k_2 {r}_{2}^{n-2} (c_1 \\cdot r_2+c_2) \\\\\n=k_1 {r}_{1}^{n-1} c_1+ k_1 {r}_{1}^{n-2} c_2 + k_2 {r}_{2}^{n-1} c_1+k_2 {r}_{2}^{n-2} c_2 \\\\\n=(k_1 {r}_{1}^{n-1}+k_2 {r}_{2}^{n-1}) \\cdot c_1+(k_1 {r}_{1}^{n-2}+k_2 {r}_{2}^{n-2}) \\cdot c_2\\\\\n={a}_{n-1} \\cdot c_1+{a}_{n-2} \\cdot c_2\\\\\n所以在假设成立的条件下：\\\\\na_n=k_1 {r}_{1}^n+k_2 {r}_{2}^{n}是递推关系 a_n={a}_{n-1} \\cdot c_1+{a}_{n-2} \\cdot c_2的解\n$$\n下面还需要证明一个东西：k1和k2一定存在吗？\n$$\n假设这两个值一定存在，则：\\\\\na_0=k_1 \\cdot {r}_{1}^{0}+k_2 \\cdot {r}_{2}^{0}=k_1+k_2 \\\\\na_1=k_1 \\cdot {r}_{1}^{1}+k_2 \\cdot {r}_{2}^{1}=k_1 \\cdot r_1 +k_2 \\cdot r_2\\\\\n用解二元一次方程组的方式来解，可以得出：\\\\\nk_1=\\frac{a_1-a_0 \\cdot r_2}{r_1-r_2}\\\\\nk_2=a_0-k_1=\\frac{a_0 \\cdot r_1-a_1}{r_1-r_2}\\\\\n因为 r_1 \\neq r_2，所以上面的方程一定有解\n$$\n\n-----------\n\n在上面的证明过程中，我们有一个要求是\n$$\nr^2-c_1 \\cdot r -c_2 =0 有两个解，如果其只有一个相同的解，那么就是这里考虑的内容了。\n$$\n还是模仿上面的定义：\n$$\n递推关系如下：a_n=c_1 \\cdot {a}_{n-1}+c_2 \\cdot {a}_{n-2} \\\\\n再来要求：r^2-c_1 \\cdot r-c_2=0，只有一个解 r_0\\\\\n那么：a_n=k_1 {r}_{0}^n+k_2 \\cdot n \\cdot {r}_{0}^n \\\\\n就是递推关系的解\n$$\n这个的证明我推导的时候总是有一个值消不掉，可能是我推导有问题，所以暂时没有证明。\n\n------------\n\n在上面只有2阶的情况下，如果是多阶的情况下：\n$$\n如果 r_n 是对于方程：\\\\\nr^k-c_1 \\cdot {r}^{k-1} + c_2 \\cdot {r}^{k-2} \\cdots + c_k =0 的k个不同的解，则\\\\\na_n=k_1 {r}_{1}^{n}+k_2 {r}_{2}^{n}+k_3 {r}_{3}^{n} \\cdots k_n {r}_{k}^{n} 是 \\\\\na_n=c_1 {a}_{n-1}+ c_2 {a}_{n-2}+ \\cdots c_k {a}_{n-k}的递推关系的解\n$$\n\n同时，这里的r与k组成的方程叫做**特征方程**，方程的解，也就是`r_n`的值叫做**特征根**。\n\n例子：\n$$\n假设 a_0=2,a_1=5,a_2=15，a_n=6 \\cdot {a}_{n-1}-11 \\cdot {a}_{n-2}+6 \\cdot {a}_{n-3} \\\\\n求递推关系的解：\\\\\n首先 c_1=6,c_2=-11,c_3=6,k=3，所以 \\\\\nr^3-6 \\cdot r^2 +11 \\cdot r-6=0\\\\\n得出：r_1=1,r_2=2,r_3=3 \\\\\n同时因为：\\\\\na_0=2=k_1 \\cdot 1^0 + k_2 \\cdot 2^0 + k_3 \\cdot 3^0 \\\\\na_1=5=k_1 \\cdot 1^1 + k_2 \\cdot 2^1 + k_3 \\cdot 3^1 \\\\\na_2=15=k_1 \\cdot 1^2 + k_2 \\cdot 2^2 + k_3 \\cdot 3^2 \\\\\n所以：k_1=1,k_2=-1,k_3=2 \\\\\n所以：a_n=1 \\cdot 1^n +(-1) \\cdot 2^n + 2 \\cdot 3^n =1-2^n+2\\cdot 3^n\n$$\n\n-----------\n\n上面是k个不同的解，如果其中有相同的解时：\n$$\n假设特征方程为：\\\\\nr^k-c_1 \\cdot {r}^{k-1} + c_2 \\cdot {r}^{k-2} \\cdots + c_k =0，\\\\\n特征根中的重数（相同的值的个数）分别为 m_1,m_2,m_3 \\cdots m_t \\\\\n那么对于方程：\\\\\na_n=c_1 {a}_{n-1}+ c_2 {a}_{n-2}+ \\cdots c_k {a}_{n-k}的解为：\\\\\na_n=({k}_{1.0}+{k}_{1,1} \\cdot n+ {k}_{1,2} \\cdot n^2 + {k}_{1,3} \\cdot n^3 \\cdots {k}_{1,m_1-1} \\cdot {n}^{m_1-1}) {r}_{1}^{n} \\\\\n+({k}_{2.0}+{k}_{2,1} \\cdot n+ {k}_{2,2} \\cdot n^2 + {k}_{2,3} \\cdot n^3 \\cdots {k}_{2,m_2-1} \\cdot {n}^{m_2-1}) {r}_{2}^{n} \\\\\n\\vdots \\\\\n+({k}_{t.0}+{k}_{t,1} \\cdot n+ {k}_{t,2} \\cdot n^2 + {k}_{t,3} \\cdot n^3 \\cdots {k}_{t,m_t-1} \\cdot {n}^{m_t-1}) {r}_{t}^{n}\n$$\n\n例子：\n$$\n已知：a_0=1,a_1=-2,a_2=-1,a_n=-3 \\cdot {a}_{n-1}-3 \\cdot {a}_{n-2} - {a}_{n-3}，求这个递推关系的解。\\\\\n解答过程：\\\\\nk为3，所以特征方程为 r^3+3 \\cdot r^2 + 3 \\cdot r^2+1=0 \\\\\n特征根为 r_0=-1，为重根。\\\\\n所以 a_n=({k}_{1,0}+{k}_{1,1}\\cdot n+{k}_{1,2} \\cdot n^2) \\cdot (-1)^n\\\\\n同时：\\\\\na_0=1=({k}_{1,0}+{k}_{1,1}\\cdot 0+{k}_{1,2} \\cdot 0^2) \\cdot (-1)^0 \\\\\na_1=-2=({k}_{1,0}+{k}_{1,1}\\cdot 1+{k}_{1,2} \\cdot 1^2) \\cdot (-1)^1 \\\\\na_3=-3=({k}_{1,0}+{k}_{1,1}\\cdot 2+{k}_{1,2} \\cdot 2^2) \\cdot (-1)^2 \\\\\n所以：\\\\\n{k}_{1,0}=1 \\\\\n{k}_{1,1}=3\\\\\n{k}_{1,2}=-2 \\\\\n所以：a_n=(1+3n-2 \\cdot n^2) \\cdot (-1)^n\n$$\n"
          }
        ]
      },
      {
        id: "dm-ch8-8-3",
        title: "8.3 分治算法和递推关系",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch8-8-3-0",
            type: "text",
            content: "# 8.3 分治算法和递推关系\n\n基础内容：\n$$\n假设 f(n)为求解问题的规模的总步数，g(n)表示每一步中额外的步骤。\\\\\n假设递推关系中，每次都将问题拆分为d个更小的问题，那么\\\\\nf(n)=f(\\frac{n}{d})+g(n)\n$$\n例如[归并排序](https://blog.csdn.net/YQXLLWY/article/details/112141283)\n\n其总数就可以表示为`f(n)=2f(n/2)+n`\n\n在上面的基础之上：\n\n### g(n)为固定长度\n\n“\n$$\n设f是满足递推关系：\\\\\nf(n)=af(\\frac{n}{b})+c \\\\\n的增函数，即g(n)为固定长度，其中 a,c \\in R， b \\in N，那么 \\\\\nf(n) 是\n\\begin{cases}\nO({n}^{\\log_{b} a}) & a>1 \\\\\nO(\\log_b n) & a=1\n\\end{cases} \n\\\\\n如果 n=b^k,a \\neq 1,f(n)=C_1 {n}^{\\log_b a}+C_2\\\\\nC_1=f(1)+\\frac{c}{a-1}，C_2=\\frac{-c}{a-1}\n$$\n”\n\n[大O表示法见这里](https://blog.csdn.net/YQXLLWY/article/details/111416340)\n\n先来证明大O表示法所对应的值来源：\n$$\nf(n)=af(\\frac{n}{b})+g(n)\\\\\n=a(af(\\frac{n}{b^2})+g(\\frac{n}{b}))+g(n)\\\\\n=a^3 f(\\frac{n}{b^3})+a^2 g(\\frac{n}{b^2})+ag(\\frac{n}{b})+g(n)\\\\\n\\vdots \\\\\n=a^k f(\\frac{n}{b^k})+\\sum^{k-1}_{j=0}a^j g(\\frac{n}{b^j})\\\\\n因为 \\frac{n}{b^k}=1，所以 \\\\\nf(n)=a^k f(1)+\\sum^{k-1}_{j=0}a^j g(\\frac{n}{b^j})\n$$\n在上面的基础之上，再进行接下来的内容：\n$$\n令 n=b^k，同时假设 g(n)=c。\\\\\n于是上面的式子就可以替换成：\\\\\nf(n)=a^k f(1)+c\\sum_{j=0}^{k-1} a^j\\\\\n当 a=1时，f(n)=f(1)+ck=f(1)+c \\log_b n，所以 O(\\log_b n)\\\\\n当 a>1时，f(n)=a^k f(1)+c \\cdot \\frac{a^k-a}{a-1}\\\\\n=a^k f(1)+ c \\frac{a^k}{a-1}-c\\frac{a}{a-1} \\\\\n=a^k (f(1)+c \\frac{1}{a-1})-c\\frac{a}{a-1} \\\\\n令 C_1=f(1)+c \\frac{1}{a-1}，且 C_1 肯定是实数\\\\\n同理令 C_2=c\\frac{a}{a-1}，且 C_2 \\in R，所以 \\\\\nf(n)=a^k \\cdot C_1-C_2，所以 O({n}^{\\log_{b} a})\n$$\n[几何序列求和的公式见这里](https://blog.csdn.net/YQXLLWY/article/details/111305452)\n\n这里再说明一下上面的`a>1`时，大O值的由来：\n$$\na^k={a}^{\\log_b n}={n}^{\\log_b a}，这里采用的是对数函数的互换性质。\n$$\n附录：对数函数互换性质证明\n$$\n先证明一个性质：k \\cdot \\log_b M=\\log_b M^k。\\\\\n证明：令 a=\\log_b M^k，所以 b^a={M}^{k}，即 b={M}^{\\frac{k}{a}}，\\\\\n所以 \\log_{b} M=\\frac{k}{a}，即 a \\log_{b} M=k\n$$\n在上面那条性质的基础之上，再来证明下面这个：\n$$\n{M}^{\\log_{a} N}={N}^{\\log_{a} M}，称为互换的形式。\\\\\n证明：\\\\ 令 a^k=N，所以 {N}^{\\log_{a} M}={a}^{k \\log_{a} M}= M^k={M}^{\\log_a N}\n$$\n\n### g(n)长度与n有关\n\n在上面我们假定了`g(n)`的长度为固定值，下面开始讨论如果`g(n)`的长度与`n`有关。\n\n“\n$$\n设f是满足递推关系：\\\\\nf(n)=a f(\\frac{n}{b})+c n^d\\\\\n其中 a,b,c,d \\in R\\\\\nf(n)是\n\\begin{cases}\nO(n^d) & a<b^d\\\\\nO(n^d \\log_b n) & a=b^d\\\\\nO({n}^{\\log_b a}) & a>b^d\n\\end{cases}\n$$\n”\n\n这个的证明我能力不足，解不开。\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch8-8-5",
        title: "8.5 容斥",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch8-8-5-0",
            type: "text",
            content: "# 8.5 容斥\n\n当只有3个集合时，容斥原理的计算公式就是：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gn1inxsk7vj30c80ac3z0.jpg)\n$$\nA \\cup B \\cup C=|A|+|B|+|C|-|A \\cap B|-|A \\cap B|-|B \\cap C|+|A \\cap B \\cap C|\n$$\n这个很容易理解，但是在上面的基础之上进行扩充呢？假设集合的个数为n时，如何表示所有集合的值呢？\n$$\n|A_1 \\cup A_2 \\cup A_3 \\cdots A_n|=\\sum_{1<=t<=n} |A_t|-\\sum_{1<=i<j<=n} |A_i \\cap A_j|+\\sum_{1<=i<j<k<=n} |A_i \\cap A_j \\cap A_k|\\\\ \\cdots +{(-1)}^{n+1} |A_1 \\cap A_2 \\cap A_3 \\cdots \\cap A_n|\n$$\n这个公式的证明书上有，但是我看不懂，所以就先把结论写在这里。\n\n"
          }
        ]
      },
      {
        id: "dm-ch8-8-6",
        title: "8.6 容斥原理的应用",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch8-8-6-0",
            type: "text",
            content: "# 8.6 容斥原理的应用\n\n先说一种写法：\n$$\n首先 P_i 代表一个性质，N(P_i)代表集合中具有该性质的一个元素。\\\\\n|A_1 \\cap A_2 \\cap A_3 \\cdots A_i |=N(P_1 P_2 P_3 \\cdots P_i) 代表同时具有集合A_1,A_2,A_3 \\cdots A_i形式的元素，\\\\\n或者说N(P_i)是这些集合的交集中的一个元素\\\\\nN(P_1\\prime P_2 \\prime P_3 \\prime \\cdots P_i \\prime)=N-|A_1 \\cup A_2 \\cup A_3 \\cdots A_i|\\\\\nN代表总数，或者说全集。N(P_1\\prime P_2 \\prime P_3 \\prime \\cdots P_i \\prime)代表不具有A_1,A_2\\cdots A_i集合任何性质的元素，按照之前的容斥原理\\\\\nN(P_1\\prime P_2 \\prime P_3 \\prime \\cdots P_i \\prime)=N-\\sum_{1 \\leq i \\leq n}N(P_i)+\\sum_{1 \\leq i<j \\leq n}N(P_iP_j)-\\sum_{1 \\leq i < j < k \\leq n}N(P_iP_jP_k)+\\cdots +(-1)^n N(P_1P_2P_3 \\cdots P_n)\n$$\n[上面的公式来自容斥原理](https://blog.csdn.net/YQXLLWY/article/details/113206294)\n\n例子：\n$$\nx_1+x_2+x_3=11,x_1,x_2,x_3 \\geq 0。\\\\\n问，当x_1 \\leq 3,x_2 \\leq 4,x_3 \\leq 6，解有多少？\n$$\n解：\n$$\n总数有 C(13,2)=78\n$$\n[C(m,n)的写法来自组合](https://blog.csdn.net/YQXLLWY/article/details/112342301)。这里的总数怎么理解呢？看下图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3su5f00gj30jz05ft8k.jpg)\n\n第一张图中，其中绿色的代表x的值，白色的代表我们可以切割的地点。因为x都是大于等于0的，但是至少有1个x不为0，才能使总数为11，所以左侧有两个连续的插入点，代表x1,x2都为0的情况。\n\n在上面的基础之上，第二个代表了x1=0,x2=6,x3=5。所以所有的总数为C(13,2)=78.\n\n接下来就是：\n$$\n令\\\\\nP_1=x_1 > 3\\\\\nP_2=x_2 > 4\\\\\nP_3=x_3 > 6\\\\\nN(P_1)=x_1 >3 \\equiv x_1 \\geq 4=C(9,2)\\\\\nN(P_2)=C(8,2) \\\\\nN(P_3)=C(6,2)\n$$\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3t44ibccj30jx052t8k.jpg)\n\n这里解释一下`N(P1)`的情况，为了保证其中一个值一定大于等于4，所以我们就从原先的队列中剔除4个，等到排列结束后，将其加还给x1，这样就可以保证x1一定大于等于4了。\n\n比如上面的第二张图，乍一看结果是x1=0,x2=6,x3=1，但是x1还需要加上预分配给它的4个，于是结果就是x1=4,x2=6,x3=1。\n\n其他的P2,P3也是一样的思路。\n\n接下来就是\n$$\nN(P_1P_2)=C(4,2)\\\\\nN(P_1P_3)=1，这个很容易理解，如果x_1>3,x_3>6，那么只有1种组合，x_1=4,x_2=0,x_3=7\\\\\nN(P_2P_3)=0，这个同理，这种情况下根本没有解\n$$\n下面说一下N(P1P2)的值的来源：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gn3tobr7l9j30jk04ymx0.jpg)\n\n首先，因为确定x1,x2都大于0，所以开头的那两个白格子消失。\n\n接下来就是去除掉预留个x1和x2的总共7个格子。所以按照第二张图中所展示的，x1=1,x2=3,x3=0，加上预留值之后：x1=4,x2=7,x3=0。\n\n最后就是一个最容易理解的\n$$\nN(P_1P_2P_3)=0\n$$\n因为不可能存在这样的组合。\n\n在求的上面的值之后，下面才是开始求我们一开始提出的问题：\n$$\nN(P_1 \\prime P_2 \\prime P_3 \\prime)=N-N(P_1)-N(P_2)-N(P_3)+N(P_1P_2)+N(P_1P_3)+N(P_2P_3)-N(P_1P_2P_3)=6\n$$\n\n### 埃拉托斯特尼筛法原理\n\n[埃拉托斯特尼筛法 详细内容见这里](https://blog.csdn.net/YQXLLWY/article/details/111502648)\n\n没讲容斥原理之前，这个内容很容易理解，现在就是用容斥的原理说明一下。\n$$\n设N是不超过100的数的总数：N=99\\\\\n下面需要求不超过100的素数，根据上面超链接中的定理可知，所有数都可以写作一个或者多个素数的乘积。\\\\\n所以令\\\\\nP_1=(n \\mod 2 =0)\\\\\nP_2=(n \\mod 3 =0)\\\\\nP_3=(n \\mod 5 =0)\\\\\nP_4=(n \\mod 7 =0)\\\\\n所以\\\\\nN(P_1 \\prime P_2 \\prime P_3 \\prime P_4 \\prime)=N-N(P_1)-N(P_2)-N(P_3)-N(P_4)+N(P_1P_2)+N(P_1P_3)+N(P_2P_3)-N(P_1P_2P_3)+4\n$$\n最后加4是因为2，3，4，7这4个数本身也是素数，在上面的计算中会被忽略掉。\n\n#### 映上函数个数\n\n[映上函数定义：简单来说就是集合B中的每个元素都有一个对应的集合A的元素](https://blog.csdn.net/YQXLLWY/article/details/111305452)\n\n想要理解这玩意，需要在完全理解映上函数的基础之上。\n\n**这个我感觉书上的例子有问题，所以下面的计算方式和书上不一样**\n\n例子：6元素集合到3元素集合，有多少映上函数？\n$$\nN=3^6，这个总数代表一定有\\\\\n令3元素集合为(b_1,b_2,b_3)\\\\\nP_1=(3集合中b_1元素没有映上函数) \\\\\nP_2=(3集合中b_2元素没有映上函数) \\\\\nP_3=(3集合中b_3元素没有映上函数) \\\\\nN(P_1 \\prime P_2 \\prime P_3 \\prime)=N-N(P_1)-N(P_2)-N(P_3)+N(P_1P_2)+N(P_1P_3)+N(P_2P_3)-N(P_1P_2P_3)\\\\\n=3^6-2^6-2^6-2^6+1+1+1-0=540\n$$\n这里解释一下上面的值的来源：\n$$\nN(P_1) 代表 b_1 没有映射函数，所以6元素集合都对应到剩下的2个元素上，比如下面的图片中展示的。\n$$\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gn4xg0909hj308z0eidg0.jpg)\n\n这样的情况下，总共能使用的组合数为`2^6`。\n$$\n然后再说明 N(P_1P_2)，那么情况只有1种，6元素都对应到b_3上去。\\\\\n至于 N(P_1P_2P_3) 则是0，因为我们最开始设置总数 3^6 的时候就是6元素一定要有对应的值。\n$$\n\n----------\n\n在上面的基础之上，考虑一个问题，真的需要拆分出`b1,b2,b3`吗？其实`b1,b2,b3`的选择可以使用组合的方式来考虑吧，比如将上面的计算函数写成下面的形式：\n$$\n3^6-C(3,1)N(P_i)+C(3,2)N(P_iP_j)-C(3,3)N(P_iP_jP_k)\\\\\nN(P_i)代表b_i元素没有映上函数，这样的元素有 C(3,1)种\\\\\nN(P_iP_j)代表b_i,b_j元素没有映上函数，这样的元素有C(3,2)种\n$$\n上面是3个元素，如果拓展一下，m元素集合到n元素集合时，`m>=n`，映上函数的数量为：\n$$\nn^m-C(n,1)(n-1)^m+C(n,2)(n-2)^m- \\cdots +(-1)^n C(n,n-1)\\cdot 1^m\n$$\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch9",
    title: "第9章 关系",
    description: "关系及其性质、关系的表示与闭包、等价关系与偏序",
    icon: "🔗",
    lessons: [
      {
        id: "dm-ch9-9-1",
        title: "9.1 关系及其性质",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch9-9-1-0",
            type: "text",
            content: "# 9.1 关系及其性质\n\n## 关系的定义\n\n> 设A和B是集合，一个从A到B的二元关系是AXB的子集。\n\n啥意思呢？就是数据库中的外键的意思，比如下面：\n\n![image-20210131140545175](https://tva1.sinaimg.cn/large/008eGmZEgy1gn6uepz99nj30de07baa4.jpg)\n\n解释一下，就是课程a，有学生1和2选择了，课程b有学生1和3选择了。可以采用下面的形式表示：\n\n| R    | a    | b    |\n| ---- | ---- | ---- |\n| 1    | X    | X    |\n| 2    | X    |      |\n| 3    |      | X    |\n\n然后上面的关系可以采用\n$$\n(a,1) \\in R表示来自集合1的a和来自集合2的1有关系，也可以表示成 a R 1，称为 a与b有关系R。\\\\\n如果没有关系可以采用在R上加一个斜线来表示。比如：\n$$\n![image-20210131141058621](https://tva1.sinaimg.cn/large/008eGmZEgy1gn6uk5ygzoj304802eglf.jpg)\n\n但是这种符号markdown的latex打不出来，所以接下来我不怎么会常用，会用a与1没有关系R来表示。\n\n上面都是考虑两个集合，也可以只考虑一个集合的，即该集合与自身的关系：\n\n> 集合A上的关系是从A到A的关系。\n\n## 关系的性质\n\n下面的性质都是考虑集合A上的关系。统一定义集合A为：`{1,2,3,4}`\n\n#### 自反\n\n$$\n\\forall a \\in A((a,a) \\in R)，则定义在集合A上的关系R称为自反的。\n$$\n\n[量词的定义见这里](https://blog.csdn.net/YQXLLWY/article/details/111086941)\n\n- 关系`R1={(1,2),(2,1),(1,1)}`不是自反的，因为没有`(2,2),(3,3),(4,4)`\n- 关系`R2={(1,2),(2,1),(1,1),(2,2),(3,3),(4,4)}`是自反的，因为关系中包含了`(1,1),(2,2),(3,3),(4,4)`\n\n#### 对称\n\n$$\n\\forall a \\forall b \\in A (aRb\\rightarrow bRa)\n$$\n\n就是对于任意集合中的元素a,b，只要a和b有关系R，则b和a也有关系R。\n\n比如下图：\n\n![image-20210131150729056](https://tva1.sinaimg.cn/large/008eGmZEgy1gn6w6y2ghoj309008st8p.jpg)\n\n上面图中有颜色的表示有关系。行代表关系中的第一个元素，列代表关系中的第二个元素。\n\n只考虑绿色区域，就是对称的关系：`(1,1),(2,2),(3,3),(4,4),(1,2),(2,1),(3,2),(2,3),(4,2),(2,4)`\n\n但是加上绿色区域加上红色区域，就不是对称关系了，因为只有`(3,1)`，没有`(1,3)`。\n\n或者仅考虑上面逻辑唯一为假的情况：\n$$\naRb为真，bRa为假，时，上面的命题为假。即(a,b) \\in R，但是(b,a) \\notin R。\n$$\n避免这一情况，上面的命题即为真。\n\n#### 非对称\n\n$$\n\\forall a \\forall b \\in R(aRb \\rightarrow \\neg bRa)\n$$\n\n同样考虑上面唯一为假的情况：\n$$\naRb为真，bRa也为真，即(a,b) \\in R，(b,a) \\in R\n$$\n避免上述情况，即为非对称。\n\n![image-20210131145758583](https://tva1.sinaimg.cn/large/008eGmZEgy1gn6vx1porxj309108ot8p.jpg)\n\n在上面的图中，还是仅看绿色，就是非对称的，但是红色就不是非对称的，因为`(3,1),(1,3),(2,2)`都是关系R中。\n\n#### 反对称\n\n$$\n\\forall a \\forall b \\in R(aRb \\and bRa \\rightarrow a=b)\n$$\n\n老思路，考虑上面的命题唯一为假的情况：\n$$\n(a,b) \\in R,(b,a) \\in R，但是a \\neq b\n$$\n避免上述情况，即为反对称。\n\n![image-20210131150516646](https://tva1.sinaimg.cn/large/008eGmZEgy1gn6w4o4jowj308o08it8p.jpg)\n\n在上面的图中，还是仅看绿色，就是反对称的，但是红色就不是反对称的。\n\n---------\n\n#### 传递\n\n$$\n\\forall a \\forall b \\forall c \\in A((a,b) \\in R \\and (b,a) \\in R \\rightarrow (a,c) \\in R )\\\\\n那么定义在集合A上的关系R是传递的。\n$$\n\n比如下面的图\n\n![image-20210131152727675](https://tva1.sinaimg.cn/large/008eGmZEgy1gn6wrrojnqj308t08xdfu.jpg)\n\n只考虑绿色部分：`(1,2),(2,3),(1,3)`，这就是传递性，但是加上红色部分就没有传递性了，因为`(4,1),(1,3)` ，但是`(4,3)`没有在关系R中。\n\n#### 关系的组合\n\n$$\n设R是集合A到集合B的关系，S是集合B到集合C的关系，R和S的合成是由有序对(a,c)的集合构成的元素，其中\\\\\na \\in A,c \\in C，并且存在一个b \\in B，使得 (a,b) \\in R \\and (b,c)\\in S。\\\\\n使用 R \\circ S代表R与S的合成。\n$$\n\n\n\n比如下面的关系：\n\n![image-20210131161411580](https://tva1.sinaimg.cn/large/008eGmZEgy1gn6y4edgtgj30dw0fp3z6.jpg)\n$$\nR \\circ S=\\{(1,0),(1,1),(2,1),(2,2),(3,0)\\}\n$$\n\n$$\n设R是集合A上的关系。R的n次幂R^n递归的定义为：\\\\\nR^1=R,{R}^{n+1}={R}^{n} \\circ R\n$$\n\n在上面的基础上：\n$$\n如果集合A上的R是传递的，当且仅当对 n=1,2,3 \\cdots n，有 R^n \\subseteq R\n$$\n这个简单来说就是如果集合A上的R是传递的，那么R的n次幂，一直都是R的子集合。\n\n证明采用[强归纳法](https://blog.csdn.net/YQXLLWY/article/details/112106627)：\n$$\n基础步骤：R^2=R \\circ R时，肯定成立，假设 (a,b)\\in R,(b,c)\\in R，因为在集合A上R是传递的，所以(a,c) \\in R\\\\\n归纳步骤：假设 R^n 时，命题是成立的。当 {R}^{n+1}时，{R}^{n+1}=R^n \\circ R，令 (a,b) \\in R^n，(b,c)\\in R，因为 R^n \\subseteq R，所以 (a,b) \\in R \\\\\n因为 (a,b) \\in R,(b,c) \\in R，在集合A上关系R是传递的，所以 (a,c) \\in R，所以 {R}^{n+1} \\subseteq R\n$$\n\n"
          }
        ]
      },
      {
        id: "dm-ch9-9-3",
        title: "9.3 关系的表示",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch9-9-3-0",
            type: "text",
            content: "# 9.3 关系的表示\n\n这一章统一都是二元关系。\n\n## 矩阵表示\n\n这个很简单，就是假设在集合A`(1,2,3)`和集合B`(a,b,c)`上的R为`{(1,a),(2,b),(3,c)}`，则采用矩阵表示为：\n$$\n\\left[\n\\begin{matrix}\n1 & 0 & 0\\\\\n0 & 1 & 0\\\\\n0 & 0 & 1\n\\end{matrix} \n\\right]\n$$\n\n## 用图表示\n\n![image-20210131170030245](https://tva1.sinaimg.cn/large/008eGmZEgy1gn6zgj2saaj306h09jt8p.jpg)\n\n这里列举一下集合A的关系：`(2,1),(3,2),(1,3),(3,3)`\n\n"
          }
        ]
      },
      {
        id: "dm-ch9-9-4",
        title: "9.4 关系的闭包",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch9-9-4-0",
            type: "text",
            content: "# 9.4 关系的闭包\n\n先扩充两个概念：逆关系和补关系。\n$$\n假设从集合A到集合B的关系为R，即(a,b) \\in R \\\\\n逆关系：{R}^{-1}：如果 (a,b) \\in R，则(b,a) \\in R \\\\\n补关系：\\overline{R}：(a,b) \\notin R\n$$\n再来是一个特殊关系的定义——对角关系：\n$$\n对于集合A而言，\\Delta 表示对交关系，即 \\Delta =\\{(a,a)|a \\in A\\}\n$$\n\n## 闭包\n\n就是[关系的性质：自反，对称，反对称](https://blog.csdn.net/YQXLLWY/article/details/113480886)，如果集合中关系不满足某一性质时，我们通过将一些不缺失的形式关系补上，就能使新的关系满足该性质，满足该性质的关系就叫做**闭包**。根据满足的性质，又叫做自反闭包，对称闭包，反对称闭包。\n\n比如：\n$$\n对于集合A=(1,2,3)中的关系：R=\\{(1,2),(2,3)\\}的传递闭包是什么？\\\\\n答：R \\cup \\{(1,3)\\}\n$$\n\n\n再比如：\n$$\n假设集合A为整数集，关系为 \\\\\nR=\\{(a,b)|a<b \\}，\\\\\n求该关系的自反闭包是什么？\\\\\n答：自反闭包为 R \\cup \\Delta\n$$\n再来就是：\n$$\n假设集合A为整数集，关系为：\\\\\nR=\\{ (a,b)|a>b \\}，\\\\\n求该关系的对称闭包：\\\\\n答：R \\cup {R}^{-1}\n$$\n\n## 有向图中的路径\n\n先介绍**图**中常见的几个概念：路径，边，回路/圈。\n\n![image-20210131202001402](https://tva1.sinaimg.cn/large/008eGmZEgy1gn7585441oj30dc06ndfx.jpg)\n\n在上面的图片中，边有：`(a,b),(b,c),(b,e),(c,d),(d,a)，(d,b)`\n\n还有由边组成的路径：长度为1的路径`a,b`，长度为2的路径`a,b,c`，长度为3的路径`a,b,c,d`。\n\n同时还有长度为4的回路，或者也可以叫做圈：`a,b,c,d,a`。\n\n然后将上面的概念套用到集合和关系中。\n$$\n设R是集合A上的关系。从a到b存在一条长为n的路径，当且仅当(a,b) \\in R\n$$\n这个就是将上面图中的有向图中的路径对应到关系中。再来就是传递性。\n$$\n设R是集合A上的关系。连通性关系R^*由形如(a,b)的有序对构成，使得在关系R中，\\\\\n从顶点a到b之间存在一条长度至少为1的路径。\\\\\n说人话就是：\\\\\n\\forall a \\forall b \\forall c \\in A ((a,b) \\in R \\cap (b,c) \\in R \\rightarrow (a,c)\\in R)\n$$\n然后上面的定义就是传递性的定义嘛，所以：\n$$\n关系R的传递闭包等于连通性关系 R^*\n$$\n[关系的幂的概念见这里](https://blog.csdn.net/YQXLLWY/article/details/113480886)\n\n### 传递闭包与关系的幂\n\n$$\n设M_R是定义在n个元素集合上的关系R的0-1矩阵。那么传递闭包R^*的0-1矩阵是\\\\\n{M}_{R^*}=M_R \\vee {(M_R)}^{[2]} \\vee {(M_R)}^{[3]} \\cdots {(M_R)}^{[n]}\n$$\n\n上面求矩阵的[布尔幂的方法见这里](https://blog.csdn.net/YQXLLWY/article/details/111305452)。这个公式的证明我不会。\n\n例子：\n$$\nM_R=\\left[ \n\\begin{matrix}\n1 & 0 & 1\\\\\n0 & 1 & 0\\\\\n1 & 1 & 0\n\\end{matrix}\n\\right]\\\\\n同时计算\\\\\n{(M_R)}^{[2]}=\\left[\n\\begin{matrix}\n1 & 1 & 1\\\\ \n0 & 1 & 0\\\\\n1 & 1 & 1\n\\end{matrix}\n\\right]\n\\\\\n{(M_R)}^{[3]}=\\left[\n\\begin{matrix}\n1 & 1 & 1\\\\ \n0 & 1 & 0\\\\\n1 & 1 & 1\n\\end{matrix}\n\\right]\n\\\\\n根据公式\\\\\n{M}_{R^*}=M_R \\vee {(M_R)}^{[1]} \\vee {(M_R)}^{[2]} \\vee {(M_R)}^{[3]}=\\left[\n\\begin{matrix}\n1 & 1 & 1\\\\ \n0 & 1 & 0\\\\\n1 & 1 & 1\n\\end{matrix}\n\\right]\n$$\n[如果不想手动算，这里有php的代码](https://blog.csdn.net/YQXLLWY/article/details/113486416)\n\n这里检查一下，上面的计算结果是否是传递闭包。\n$$\n{M}_{R^*}=\\{(1,1),(2,1),(3,1),(2,2),(1,3),(2,3),(3,3)\\}\n$$\n\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch9-9-5",
        title: "9.5 等价关系",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch9-9-5-0",
            type: "text",
            content: "# 9.5 等价关系\n\n### 等价关系\n\n定义：\n\n> 定义在集合A上的关系如果是自反，对称和传递的，则该关系称为等价关系。\n\n[自反，对称和传递的定义见这里](https://blog.csdn.net/YQXLLWY/article/details/113480886)\n\n### 元素等价\n\n> 如果集合A中两个关系是被等价关系关联的，则称它们是等价的，记做 a ~ b\n\n### 等价类\n\n$$\n在一个集合A中，所有a的等价元素组成的子集合叫做a的等价类，记做 \\left[ a\\right]_R，有时候也可以把\\\\\n下标R去掉，写作[a]\n$$\n\n例如，对于正整数集合，R为`a=-b或者a=b`。7的等价类就是`[7]={7,-7}`\n\n-------------\n\n### 等价关系划分集合\n\n$$\n假设集合A中的关系R是等价的，a和b具有以下形式：\\\\\n\\begin{array}{ll}\n1 & a R b\\\\\n2 & [a]=[b]\\\\\n3 & [a] \\cap [b] \\neq \\emptyset\n\\end{array}\\\\\n中的任何一个时，都可以证明另外两个。\n$$\n\n这个证明我自己想的，没有抄书上。\n$$\n假设 a,b \\in A，且 (a,b) \\in R，因为R是等价关系，所以(b,a) \\in R，同理，(a,a) \\in R,(b,b)\\in R。\\\\\n所以 [a]=[b],\n[a] \\cap [b] \\neq \\emptyset\n$$\n简单来说就是如果一个集合存在等价关系，则我们可以使用该等价关系来划分集合。同时，如果集合可以划分成几部分，我们也可以找到一个等价关系来使其中的各部分符合该关系。\n\n"
          }
        ]
      },
      {
        id: "dm-ch9-9-6",
        title: "9.6 偏序",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch9-9-6-0",
            type: "text",
            content: "# 9.6 偏序\n\n参照[关系的等价](https://blog.csdn.net/YQXLLWY/article/details/113704921)有当集合中的一个关系具有自反，反对称和传递时，就称为该关系为偏序。\n\n所有集合S中该偏序中元素组成的集合叫做偏序集，记做`(S,R)`。\n\n在开始举具体的例子前，可以结合等价来理解，等价类的中的元素和集合中的其他所有元素，加上其自身与其自身的关系其实就是偏序。\n\n比如在整数集合上，关系`>=`就是偏序关系。所以我们可以表示为`(S,>=)`。\n$$\n像上面这种关系能举的例子很多，所以我们统一使用 (S,\\preccurlyeq)来表示偏序。\\\\\n\\preccurlyeq 表示该关系具有偏序的性质。\n$$\n\n### 可比\n\n$$\n这个很容易理解，如果集合中的两个元素满足指定的关系，并且该关系是偏序时，就说这两个元素是可比的，\\\\\n否则就说这两个元素是不可比的。\\\\\na \\preccurlyeq b，表示这两个元素是可比的。当然，b \\preccurlyeq a 也是一样的含义。\n$$\n\n### 全序集 / 线序集 / 链\n\n在上面可比的情况下，如果一个集合S中所有元素都是可比的，则称该集合S是全序集，线性集，链。该关系R称为全序或线序。\n\n比如在整数集合上，关系`<=`是全序集。\n\n但是在整数集合上，关系：整除，则不是全序集，因为一些整数不满足整除的关系。\n\n### 良序集\n\n这个就是能在全序集中找到一个最小元素。\n\n比如在正整数集合上，关系`<=`就是良序集，拥有最小元素0。\n\n但是在整数集合上，关系`<=`就不是良序集，因为算上负整数，就没有最小值。\n\n### 良序归纳原理\n\n$$\n设S是一个良序集，如果对所有 y \\in S，对于集合内的其他元素x，满足x \\prec y时，P(y)为真，那么对所有 x \\in S，P(x)为真。\n$$\n\n这个与其说证明，不如说是如何去理解这句话，这个很简单。按照上面说的偏序的概念，集合内的一个元素，除了与其等价的元素和自身之外，与其他元素都是偏序的关系。\n\n所以上面这个定义其实就是，如果对于集合中的任意一个元素，命题都成立，那么对于集合中，所有元素这个命题都成立。\n\n### 字典顺序\n\n这个很简单，先说什么是字典排序，说简单点就是对比第一个元素，如果第一个元素一样，就比较下一个元素。\n\n可以结合下面的代码来理解：\n\n```php\n<?php\n\nfunction dictionarySort($data1,$data2,$index=0){\n\t// 防止传递进空数组时，下面的递归陷入死循环\n\tif(!isset($data1[$index]) && !isset($data2[$index])){\n\t\treturn 0;\n\t}\n\t!isset($data1[$index]) && $data1[$index]=0;\n\t!isset($data2[$index]) && $data2[$index]=0;\n\tif($data1[$index]==$data2[$index]){\n\t\t// 字典排序的含义：如果当前元素一致，就比较下一个元素\n\t\treturn dictionarySort($data1,$data2,$index+1);\n\t}\n\t// 如果能在当前元素就比较出大小，则比较结束\n\treturn ($data1[$index]>$data2[$index])?1:2;\n}\n\n$data1=[1,2,3];\n$data2=[1,2,1];\n\nprint dictionarySort($data1,$data2);\n```\n\n"
          }
        ]
      },
      {
        id: "dm-ch9-lesson-6",
        title: "哈赛图",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch9-lesson-6-0",
            type: "text",
            content: "# 哈赛图\n\n先说啥叫哈赛图，就是简化了一些东西的图，而因为一个叫做哈赛的人很喜欢用这种图，所以叫做哈赛图。\n\n哈赛图制作过程。\n\n 假设集合A为：`{1,2,3,4}`，关系为`a<=b`，所以一般的图为：`(4,4),(4,3),(4,2),(4,2)......`\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne5nofcapj30b80d13z3.jpg)\n\n但是因为关系是自反的，所以我们可以把类似`(4,4),(3,3),(2,2),(1,1)`的线去掉：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne5rvmjzxj30b40chmxj.jpg)\n\n接下来因为关系是传递的，所以我们把类似`(4,3),(4,2),(4,1),(3,2),(3,1),(2,1)`之类的线去掉：\n\n![image-20210206215925950](/Users/yangqingxian/Library/Application%20Support/typora-user-images/image-20210206215925950.png)\n\n最后我们再把箭头去掉，得到的就是哈赛图了：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne5vq6oqnj30400blq2s.jpg)\n\n这个哈赛图很简单，换个复杂一点的哈赛图：\n\n集合A=`(1,2,3,4,6,8,12)`\n\n关系R：`{(a,b)|b能被a整除}`\n\n原本的图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne6bwk117j30fm0dvwfe.jpg)\n\n化简后的图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne6cp75myj30ak0a53ym.jpg)\n\n## 极大元与极小元\n\n这个很简单，极小元就是该偏序集中不大于任何一个其他元素，比如上面的1，极大元则是该偏序集中不存在比该元素大的元素，比如上面的第二个例子中的12和8。\n\n比如下面这2个哈赛图：\n\n哈赛图1\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne6mpe0quj30ag05ka9z.jpg)\n\n的极小元是a，没有极大元，如果有疑问，那么请问你，b,c,d哪个比较大？如果其中一个比另外两个大的话，那么它们3个元素之间就应该有一条线。\n\n哈赛图2\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne6pqln8zj309r089glm.jpg)\n\n这个哈赛图中既没有极大元，也没有极小元。\n\n### 上界和下界\n\n这个也很好理解，就是在一个偏序集中，如果存在一个元素，假设为a，其小于该偏序集中某些元素组成的子子集A，那么该元素就称为集合A的下界，上界是类似的道理。\n\n比如上面的哈赛图1，在`a`就是子集合`(c,e)`的上界。或者哈赛图2中，元素`a`就是子集合`(b,c,d)`的下界。\n\n根据上面的定义，我们知道了对于一个偏序集合中的子集合来说，上界和下界的值不一定是固定的，比如下面这个哈赛图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne7lerpdbj309i0gy74j.jpg)\n\n对于子集合`(b,d)`来说，f可以作为其上界，g也可以作为其上界，而这些上界中的最小值，叫做**最小上界**，同理，下界也很多，比如h和i，那么其中最大的值，叫做**最大上界**。\n\n### 格\n\n这个定义就很厉害了：\n\n“如果一个偏序集中，除了极大元和极小元，任何两个元素都有最小上界和最小下界，就称这个偏序集为格。”\n\n(这里我修改了书上的定义，书上没有剔除极大元和极小元，但是如果不剔除，那么当定义中的任意两个元素包含极大元或极小元时，格就肯定不存在了)\n\n啥意思呢？就是我们知道，一个格子，就是一个菱形，需要有4个点，任意两个元素就是中间的两个点，最小上界，最大下界分别就是菱形上面的点和下面的点。\n\n比如下面这个哈赛图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne7x0usk4j30ar0d0mxa.jpg)\n\n就是格，我们不考虑极大元和极小元，其中任何两个元素的组合，我们都可以找到最大下界和最小上界。\n\n但是对于下面这种哈赛图，就没有格了。\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gne816ke8xj30a10dqaac.jpg)\n\n因为元素c和元素d没有最小上界。\n\n"
          }
        ]
      },
      {
        id: "dm-ch9-lesson-7",
        title: "沃舍尔算法",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch9-lesson-7-0",
            type: "text",
            content: "# 沃舍尔算法\n\n沃舍尔算法的本质很简单，既然是传递闭包，那么对于像`(3,1),(1,2)`这样的关系，一定有一个`(3,2)`的关系，所以我们要做的就是把这些关系补气就行。\n\n[参考油管视频](https://www.youtube.com/watch?v=fQ8wKewQtDs)\n\n代码：\n\n```php\n<?php\n\n// 沃舍尔算法\nfunction WasherAlgorithm($map){\n    $count=count($map);\n    for($n=0;$n<$count;$n++){\n        addNode($map,$n);\n    }   \n    return $map; \n}\n\n// 辅助函数\nfunction addNode(&$map,$n){\n    $returnColumnNumber=$returnLineNumber=[];\n    foreach($map as $lineNumber=>$line){\n        foreach($line as $columnNumber=>$data){\n            if($lineNumber==$n && $data){\n                $returnColumnNumber[]=$columnNumber;\n            }\n            if($columnNumber==$n && $data){\n                $returnLineNumber[]=$lineNumber;\n            }\n        }\n    }\n    foreach($returnLineNumber as $lineNumber){\n        foreach($returnColumnNumber as $columnNumber){\n            $map[$lineNumber][$columnNumber]=1;\n        }\n    }\n}\n\n$map=[\n    0=>[1,0,1],\n    1=>[0,1,0],\n    2=>[1,1,0]\n];\n\n$newMap=WasherAlgorithm($map);\n\nprint_r($newMap);\n\n```\n\n上面特意使用这个矩阵，是因为和[之前采用关系的幂来求传递闭包](https://blog.csdn.net/YQXLLWY/article/details/113487097)时采用相同的数据，好验证结果，结果发现两者结果是一样的。\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch10",
    title: "第10章 图",
    description: "图与图模型、连通性、欧拉与哈密顿通路、最短通路、平面图与图着色",
    icon: "🕸️",
    lessons: [
      {
        id: "dm-ch10-10-1",
        title: "10.1 图和图模型",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-10-1-0",
            type: "text",
            content: "# 10 图的基础知识\n\n### 无向图和有向图\n\n> 图G=(V,E)由顶点（或结点）的非空集V和边集E构成，每条边有1个或2个顶点与它相连，这样的顶点称为边的端点。即边连接它的端点。\n\n\n\n> 有向图G=(V,E)由一个非空顶点集V和一个有向边（或弧）集E组成。每条有向边与一个顶点有序对相关联。\n>\n> 我们称有序对(u,v)相关联的有向边开始于u，称为起点，结束于v，称为终点。\n>\n> 环的起点和终点是一样的。\n\n### 图的术语\n\n#### 领接 / 相邻\n\n就是一条边连接两个顶点，相互之间领接。\n$$\n假设一个顶点：u，所有和u相邻的顶点组成的集合记做N(u)，称为u的邻居。\\\\\n再来将上面的一个顶点，扩充成一个集合：A，则该集合中所有顶点的邻居就是\\\\\nN(A)=\\bigcup_{u \\in A}N(u)\n$$\n\n#### 度\n\n就是一个顶点`u`相连接的边的数量，记做`deg(u)`。\n$$\n在有向图中，{deg}^{-}(u)是以u为终点的边的数量。\\\\\n{deg}^{+}(u)是以u为起点的边的数量。\\\\\n所以\\\\\n\\sum_{u \\in V} {deg}^{-}(u)=\\sum_{v \\in V} {deg}^{+}(v)=|E|\n$$\n[|E|代表集合的基数，即集合的大小](https://blog.csdn.net/YQXLLWY/article/details/111305452)\n\n最后的那个公式很容易理解吧，所有顶点作为终点时，必要有对应的顶点作为起点，所以两者的总和是一样的。\n\n### 握手定理\n\n$$\n设G=(V,E)，有m条边，那么 \\\\\n\\sum_{u \\in V} deg(u)=2m\n$$\n\n这个很容易理解吧，假设顶点a和b相邻，之间存在一条边，那么在计算`deg(a)`的时候这条边被计算一个，计算`deg(b)`的时候，这条边又被算了一次。\n\n---------\n\n下面介绍一些特殊的图：\n\n#### 完全图\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnh9w5zr1xj309z0aoq3b.jpg)\n$$\n完全图记做 K_n，即每个顶点都与集合中的其他顶点相邻。n代表了顶点数量。n>=1。\n$$\n\n\n#### 圈图\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnh9wi6728j308y0alt8r.jpg)\n$$\n圈图记做 C_n，即每个顶点只与自己邻近的顶点相邻。n>=3\n$$\n\n\n#### 轮图\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnh9x79415j308v0ajdg0.jpg)\n$$\n轮图记做 W_n，即在圈图的基础上，增加一个顶点与其他顶点都连接。n>=3。\n$$\n\n#### n立方题图\n\n这个很有意思，首先就是每个顶点都有一个二进制编码，然后相邻的顶点就是只有1个二进制编码的位置不同，比如下面这些：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnhaagedx8j30g209sjro.jpg)\n\n## 二分图\n\n简单点来说就是将顶点分为两个子集合，这两个集合中的顶点都不与自己集合中的顶点相连。比如下面的绿色点集合和红色的点集合。\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnhaz1lo6kj30cg0860t0.jpg)\n\n我个人感觉，如果类比[关系中的传递性质](https://blog.csdn.net/YQXLLWY/article/details/113480886)来说的话，那就是如果该图具有传递性质，那么就不是二分图了。\n\n#### 完全二分图\n\n就是在一个集合中，每个顶点都与另一个集合中的顶点相邻。\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnhb4lbaq4j30bd06m3yx.jpg)\n\n### 子图\n\n就是在原来图的基础上，删除了一些顶点和对应的边，或者删除了边与对应的顶点后的图，称作子图。\n\n"
          }
        ]
      },
      {
        id: "dm-ch10-10-4",
        title: "10.4 连通性",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-10-4-0",
            type: "text",
            content: "# 10.4 连通性：基础概念介绍\n\n下面的所有的图都是无向图。\n\n## 通路\n\n就是很简单的，比如下面的图中：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnhe9luqcxj309m07it8m.jpg)\n\n从点a到点c，`(a,b,c)`是通路，`(a,d,c)`也是，但是`(a,c)`不是，因为没有这条边。\n\n回路，圈等就是起点和终点的顶点相同，且通路长度不为0。\n\n## 连通性\n\n> 如果图中的每个顶点之间都有通路，那该图就称为连通的。\n\n说人话就是能没有孤立的点，可以通过通路，从一个点走到任何另一个点。\n\n## 割点 / 关节点 & 割边 / 桥\n\n就是在连通性的图上，如果少了该顶点，或者少了该边，就组成了两个连通性的图，那么少了点这个顶点，就叫做割点，或者关节点，边就叫做割边，或者桥。\n\n比如下面的这张图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnhetlrgcwj30lm07vwep.jpg)\n\n我们一个顶点一个顶点的看：\n\n| 顶点 | 是否是割点 |\n| ---- | ---------- |\n| a    | 不是       |\n| b    | 不是       |\n| c    | 是         |\n| d    | 是         |\n| e    | 不是       |\n| f    | 不是       |\n| g    | 是         |\n| h    | 不是       |\n\n再来一条边一条边的看：\n\n| 边   | 是否是割边 |\n| ---- | ---------- |\n| a,d  | 是         |\n| d,c  | 不是       |\n| b,d  | 不是       |\n| b,c  | 不是       |\n| c,g  | 是         |\n| e,g  | 不是       |\n| g,f  | 不是       |\n| g,h  | 不是       |\n| f,h  | 不是       |\n| e,f  | 不是       |\n\n不是所有的图都是可分割的，比如[完全图](https://blog.csdn.net/YQXLLWY/article/details/113771353)就是不可割图。\n\n## 点割集 / 分割集\n\n割点组成的集合，就叫做点割集，或者分割集。\n\n## 连通度\n\n注意，这里开始就不考虑点割集的概念了，即下面的点都不叫割点了。但是对于点割集来说，连通度也是有意义的，只是是固定值1。\n\n上面我们都是说删除一个点，使得原本的图变成更多的连通图，但是一些图只删除一个点并不能使其变成更多的连通图，比如可能需要删除2个，3个顶点。比如下面的这张图：\n\n![XpFbiGVBLh8H6do](https://i.loli.net/2021/02/11/XpFbiGVBLh8H6do.png)\n\n仅仅删除任何一个点，都不足以产生更多的连通图。至少需要删除2个点才可以，比如`(b,e)`，`(b,d)`，`(e,c)`等。\n\n所以这里我们增加一个概念：连通度。含义就是至少要删除这些数量的点，才可以使原本的图产生更多的连通图。\n$$\n我们使用 \\kappa (G)=2来表示一个图的连通度。G代表对应的图。\\\\\n所以，对于连通图 K_n 来说，\\kappa(K_n)=n-1。\\\\\n同时，对于不连通的图来说，\\kappa(G)=0。\n$$\n[k_n代表n个顶点的完全图](https://blog.csdn.net/YQXLLWY/article/details/113771353)，至于连通图的公式由来，假设我们要使完全图中的一个点不连通，只有删除除了它之外的其他所有点才可以。\n\n---------------\n\n这里做一下汇总：\n\n![w2PLVMzSiQcY49F](https://i.loli.net/2021/02/11/w2PLVMzSiQcY49F.png)\n$$\n如果一个图的 \\kappa (G)>=k，则称图为 k连通的，或 k顶点连通的。\n$$\n对于3个顶点的完全图，我们可以称呼它为双连通图（因为它是2连通的）。\n\n------------\n\n上面只考虑了顶点，对应的边也有类似的定义。\n\n## 边隔集 & 边连通度\n\n$$\n边连通度记为 \\lambda (G)=k。\\\\\n对于完全图 K_n, \\lambda(K_n)=n-1，因为我们需要删除与我们选定的点所有连接的边，才可以使该图不连通。\n$$\n\n"
          }
        ]
      },
      {
        id: "dm-ch10-10-4",
        title: "10.4 连通性：结论",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-10-4-0",
            type: "text",
            content: "# 10.4 连通性：结论\n\n[以下的名词及其解释都来自这里](https://blog.csdn.net/YQXLLWY/article/details/113790328)\n$$\n\\kappa(G) \\leq \\lambda(G) \\\\\n这个很容易理解，分情况来考虑：\\\\\n对于不连通的图：\\kappa(G)=\\lambda(G)=0\\\\\n对于有割点集的图：\\kappa(G)=\\lambda(G)=1\\\\\n对于没有割点集的连通图：\\\\\n我们从分割后的完全连通图考虑，被删除的边，假设为y，其终点可能指向y个点，\\\\\n换句话说，删除这y个点，也可以实现创建更多完全连通图的效果。\\\\\n但是这y条边一定指向y个顶点吗？不一定，其中可以有2条边指向同一个顶点。\\\\\n所以：\\\\\n\\kappa(G) \\leq \\lambda(G)\n$$\n比如下面的这张图：\n\n![jDc6GAmYFJdqly9](https://i.loli.net/2021/02/11/jDc6GAmYFJdqly9.png)\n\n------------\n\n$$\n如果 G=(V,E)，且 G 不是完全图，|V| \\geq 3，那么\\\\\n\\kappa(G) \\leq  \\min_{v \\in G} \\ deg(v)\\\\\n\\lambda(G) \\leq \\min_{v \\in G} \\ deg(v)\n$$\n\n[deg的含义见这里，即一个顶点连接的边的数量](https://blog.csdn.net/YQXLLWY/article/details/113771353)\n\n这个从反面考虑就很简单了：\n$$\n考虑到 \\lambda 的定义，就知道 \\lambda (G) \\geq \\min_{v \\in G} \\ deg(v) 的情况是不可能的。\\\\\n所以 \\lambda (G) \\leq \\min_{v \\in G} \\ deg(v) \\\\\n同时 \\kappa(G) \\leq \\lambda(G)，所以同时 \\kappa (G) \\leq \\min_{v \\in G} \\ deg(v)\n$$\n\n-------------\n\n# 有向图\n\n之前一直在说明无向图，这里讨论一下有向图。\n\n### 连通\n\n这个概念在有向图中就是加上了方向的属性。有向图的连通分为**强连通**和**弱连通**。\n\n先说强连通，就是如果方向走，可以从一个顶点走到任何一个顶点。\n\n![G6QN9FrntKaR5qe](https://i.loli.net/2021/02/12/G6QN9FrntKaR5qe.png)\n\n比如这张图，可以从任何一个顶点都其他任何一个顶点。\n\n而下面这张图则不是强连通，因为没有办法从a到b。\n\n![9l2dSx7q3t8OXeh](https://i.loli.net/2021/02/12/9l2dSx7q3t8OXeh.png)\n\n而弱连通就是将方向去掉，用无向图的标准考虑连通性。比如上面这张图，就是弱连接的，当然，如果一张图是强连接的，那么它肯定也是弱连通的。\n\n从一个强连接图中拆分出部分的子图，并且该部分子图如果也是强连接的，那么该部分就称为**强连通分支**，或者**强分支**。\n\n# 同构\n\n[同构的定义](https://blog.csdn.net/YQXLLWY/article/details/113772152)\n\n“\n\n> 长度为k的简单回路的存在性是一个图同构的不变量，其中k是大于2的正整数。\n\n”\n\n先解释啥叫**简单**，就是从一个顶点到另一个顶点只有一条边，没有重复边。\n\n再来就是上面那句话啥意思呢？就是如果两个图重构，则其回路的长度一定是一致的。加上如果两个图是重构的，顶点的数量，边的数量也一定是相同的，这些条件加在一起就是判断两个图是否重构的一个判定标准。\n\n比如下面的这两张图：\n\n![gjZWQtJ1mSP2v3R](https://i.loli.net/2021/02/12/gjZWQtJ1mSP2v3R.png)\n\n其都具有5个顶点，6条边，并且右边的图具有长度为4和3的简单回路，左边的也具有长度为3和4的简单回路，所以两个图同构，这里将左边的图加工一下，看的更清楚。\n\n![OTgjYqF4nJV1yws](https://i.loli.net/2021/02/12/OTgjYqF4nJV1yws.png)\n\n但是下面的两张图就不是同构的：\n\n![48pkgX2Lir9Qj7q](https://i.loli.net/2021/02/12/48pkgX2Lir9Qj7q.png)\n\n虽然顶点和边的数量一致，但是左边的具有长度为3和4的简单回路，而右边的则是只有长度为4的简单回路。我当时第一眼看的时候以为两张图是同构的，但是我在这里画一下结果，防止我以后又会这么想：\n\n![LuNx7gt1lykofYW](https://i.loli.net/2021/02/12/LuNx7gt1lykofYW.png)\n\n"
          }
        ]
      },
      {
        id: "dm-ch10-10-5",
        title: "10.5 欧拉通路与哈密顿通路",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-10-5-0",
            type: "text",
            content: "# 10.5 欧拉通路与哈密顿通路\n\n## 欧拉通路和欧拉回路\n\n> 图G中的欧拉回路是包含G的每一条边的简单回路。\n>\n> 图G中的欧拉通路是包含G的每一条边的简单通路。\n\n啥意思呢？先解释简单，即两个顶点之间不能拥有2条边。再来就是需要包含图中的每条边，最后就是回路需要开点和终点一致。\n\n比如下面的这张图：\n\n![u3dlcDBijGsz95T](https://i.loli.net/2021/02/13/u3dlcDBijGsz95T.png)\n\n欧拉回路：\n\n1. a-b\n2. b-c\n3. c-e\n4. e-d\n5. d-c\n6. c-a\n\n欧拉通路可以直接拿欧拉回路来当例子说明。\n\n再比如下面这张图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnlzfwyp37j30d309p74c.jpg)\n\n欧拉回路：不存在。\n\n欧拉通路：\n\n1. a-c\n2. c-d\n3. d-e\n4. e-b\n5. b-d\n6. d-a\n7. a-b\n\n到这里就可以理解欧拉通路和欧拉回路的定义了。\n\n----------\n\n上面是直接写出对应的欧拉回路，以此证明该图欧拉回路的存在，下面就是说明欧拉回路存在的必要条件：\n\n> 含有至少2个顶点的连通多重图具有欧拉回路当且仅当它的每个顶点的度都为偶数。\n\n或者表示成下面的形式：\n$$\n\\forall v \\in V (deg(v) \\mod 2==0)\n$$\n说人话就是每个顶点的边的数量都是偶数。\n\n[证明过程可以看这个油管的视频](https://www.youtube.com/watch?v=vjpzmnVuHjw&t=812s)\n\n这里简单说明一下，首先先从任何一个点开始，按照这个点的边开始前进到下一个点，因为每个点都是偶数边，所以肯定能满足一进一出，因为该图具有连通性，所以肯定可以回到起点。比如下面这张图，以a为起点：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnmvziadcwj30e90fw0t9.jpg)\n\n然后我们可以看到，其中一些边是没有走到的，然后我们就以图中没有被包含进去的边为顶点，继续走上面的步骤，这里以c为例子：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnmw09m1yhj30dk0g874s.jpg)\n\n然后继续上面的步骤，依次以f和e为例子，构建回路：\n\n![image-20210214111307748](https://tva1.sinaimg.cn/large/008eGmZEgy1gnmw3fgl66j30d80fpjrw.jpg)\n\n我知道这玩意更加像是构建回路的过程，而不像是证明的过程，但是如果上面的步骤一定能完成，那么即证明了如果满足上面的条件，则欧拉回路肯定存在。\n\n最终上面这张图的欧拉回路为：\n\n- a-c\n- c-d\n- d-b\n- b-c\n- c-f\n- f-d\n- d-e\n- e-g\n- g-f\n- f-e\n- e-b\n- b-a\n\n--------------\n\n欧拉通路的存在则是：\n\n> 连通多重图具有欧拉通路但无欧拉回路当且仅当它恰有2个度为奇数的顶点。\n\n说人话就是如果一个图中，只有2个顶点的边的是奇数，则其就只有欧拉通路，但是没有欧拉回路。\n\n这个证明还是看上面的那个油管视频。简单来说就是比起欧拉回路少一条边就可以了，正是因为少了这一条边，所以就产生了两个顶点的边为奇数的情况。\n\n## 哈密顿通路与哈密顿回路\n\n这里对比一下，可以更好理解啥叫哈密顿通路和回路：\n\n| 对比项目 | 欧拉回路 / 欧拉通路                | 哈密顿回路 / 哈密顿通路             |\n| -------- | ---------------------------------- | ----------------------------------- |\n| 每个点   | 可以经过多次，而且不需要都经过     | 每个顶点只能经过1次，而且都需要经过 |\n| 每条边   | 每条边只能经过一次，而且都需要经过 | 可以经过多次，而且不需要都经过      |\n\n简单来说就是将欧拉回路中的点和边的要求互换。\n\n比如下面的这幅图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnmyxhr29gj307008vjri.jpg)\n\n就具有哈密顿回路：a-b-c-e-d-a\n\n自然也有哈密顿通路。\n\n但是下面这幅图，就只能哈密顿通路，但是没有哈密顿回路了：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnmz15ogbgj306s08b3yj.jpg)\n\n----------\n\n哈密顿通路好像暂时没有充要条件，但是哈密顿通路存在的充分条件有了：\n\n### 狄拉克定理\n\n> 如果图G是有n个顶点的简单图，其中n>=3，并且G中每个顶点的度都至少为n/2，则G有哈密顿回路。\n\n[顶点度的定义见这里，其实就是每个顶点的边的数量](https://blog.csdn.net/YQXLLWY/article/details/113771353)\n\n充分条件就是：如果A成立，B就肯定成立，则A是B的充分条件。同时，B不一定都具有A的性质。对应到上面就是，并不是所有的哈密顿回路都具有狄拉克定理中的性质。\n\n### 欧拉定理\n\n> 如果G是有n个顶点的简单图，其中n>=3，并且对于G中每一对不相邻的顶点u和v来说，都有 deg(u)+deg(v)>=n，则G有哈密顿回路。\n\n[证明可以看这个油管视频，但是我觉得我没看懂](https://www.youtube.com/watch?v=HE3b6Eow4lk&list=PLBPbUxsZM4SbFoinAoJXoNAAiGRuPLm4J&index=102)\n\n这里我试着说明一下：\n$$\n如果是完全图的话，其肯定具有哈密顿回路。\\\\\n所以借由完全图来说明。\\\\\nn个顶点的完全图，其边的总数为 \\frac{(n-1)n}{2}\\\\\n去掉两个点之后，少掉的边数量为 n-1+n-1-1=2n-3\\\\\n则剩余的边的数量为：\\frac{(n-1)n}{2}-(2n-3)=\\frac{n^2-5b+6}{2}=\\frac{(n-2)(n-3)}{2} \\geq 0\\\\\n假设 deg(u)+deg(v) < n，即 2n-3 < n，即n<3，则结合上面的结论 n<2，即 n=1。但是我们考虑的肯定不是 n=1的情况，所以\\\\\ndeg(u)+deg(v) \\geq n\n$$\n我自己都觉得这证明很鬼扯。。。。。。\n\n然后你就可以用欧拉定理来推导出狄拉克定理。更鬼扯了。\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch10-10-6",
        title: "10.6 最短通路问题",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-10-6-0",
            type: "text",
            content: "# 10.6 最短通路问题：BFS 和 DFS\n\n[参考的一个油管视频，中文的，讲解的很好](https://www.youtube.com/watch?v=oLtvUWpAnTQ&list=PLAnjpYDY-l8IacYv_2lIZxNrQmkY3paSN&index=2)\n\nBFS：广度优先搜索算法\n\nDFS：迪克斯特拉算法\n\n## BFS\n\n这里先介绍广度优先算法，它能处理没有加权的最短路径。具体步骤很简单，举个例子就行了，比如下面这张图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnn1womqknj30io0ab0t6.jpg)\n\n你人在上海，你需要去广州，那么如何获取最短路径呢？首先你先确定从上海出发，能够到达的城市有哪些，接下来，再依次考虑这些城市能到达的下一个城市，其中最快能确定到达广州的，就是你的路线图。具体步骤如下：\n\n1. 考量的城市：上海\n2. 考量的城市：南京，深圳\n3. 考量的城市：北京，武汉，广州\n\n这里已经命中了广州，所以最短路径为：上海-深圳-广州。\n\n再来是具体的代码：\n\n```php\n<?php\n/**\n * 初始地图\n */\n$map=[\n    '上海'=>['南京','深圳'],\n    '南京'=>['上海','北京','武汉'],\n    '深圳'=>['上海','广州'],\n    '武汉'=>['南京','北京','广州'],\n    '北京'=>['南京','武汉','广州'],\n    '广州'=>['深圳','武汉','北京']\n];\n\nfunction BFS($map,$finalCity,$nextCities,&$passedCities){\n    $nextTurnCity=[];\n    /**\n     * 遍历这一轮需要检验的城市\n     */\n    foreach($nextCities as $thisCity){\n        foreach($map[$thisCity] as $nextCity){\n            $passedCities[$nextCity]=$thisCity;\n            if($nextCity==$finalCity){\n                showResult($passedCities,$finalCity);\n                return true;\n            }\n            /**\n             * 防止出现 上海 - 南京，南京 - 上海 这样的死循环\n             */\n            $nextTurnCity[]=$nextCity;\n        }\n    }\n    // 开始递归\n    BFS($map,$finalCity,$nextTurnCity,$passedCities);\n}\n\n// 展示输出结果\nfunction showResult($map,$startCity,&$checkedCity=[]){\n    if(isset($checkedCity[$startCity])){\n        return false;\n    }\n    print $startCity.DIRECTORY_SEPARATOR;\n    $checkedCity[$startCity]=1;\n    showResult($map,$map[$startCity],$checkedCity);\n}\n\n$result=[];\nBFS($map,'广州',['上海'],$result);\n// 输出结果为：\n// 广州/深圳/上海/%\n```\n\n## DFS\n\nDFS就是在上面的图上，每条边加上权重。\n\n具体步骤可以[参考这个B站视频](https://www.bilibili.com/video/BV1mt411i7DX?from=search&seid=7147247003165627301)\n\n然后我这边简单说明一下，像下面这张图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnn6v5t1p8j30e907wwew.jpg)\n\n然后开始维护下面这张表：\n\n| 点   | 最短距离 | 前一个点 |\n| ---- | -------- | -------- |\n| A    | 无穷大   | 无       |\n| B    | 无穷大   | 无       |\n| C    | 无穷大   | 无       |\n| D    | 无穷大   | 无       |\n| E    | 无穷大   | 无       |\n\n然后从起点A开始：\n\n| 点   | 最短距离                          | 前一个点 |\n| ---- | --------------------------------- | -------- |\n| A    | 0（因为自身到自身不需要任何距离） | 无       |\n| B    | 无穷大                            | 无       |\n| C    | 无穷大                            | 无       |\n| D    | 无穷大                            | 无       |\n| E    | 无穷大                            | 无       |\n\n然后开始考虑A所能到达的边，即B和D，注意，**这里是递归的开始**：\n\n| 点        | 最短距离 | 前一个点 |\n| --------- | -------- | -------- |\n| A：已处理 | 0        | 无       |\n| B         | 6        | A        |\n| C         | 无穷大   | 无       |\n| D         | 1        | A        |\n| E         | 无穷大   | 无       |\n\n然后我们比较B和D中比较小的那个点开始当作下一个点，这里选择的是D，考虑D的边连通的顶点，即B和E，A因为已经递归过了，所以不在考虑的范畴之内：\n\n| 点        | 最短距离                                                    | 前一个点 |\n| --------- | ----------------------------------------------------------- | -------- |\n| A：已处理 | 0                                                           | 无       |\n| B         | 3（因为从C到B的值比起B原先的值小，所以更新B的值和前一个点） | D        |\n| C         | 无穷大                                                      | 无       |\n| D：已处理 | 1                                                           | A        |\n| E         | 2                                                           | D        |\n\n然后重复上面的步骤，选择E作为考虑的顶点，考虑B和C：\n\n| 点        | 最短距离                                                | 前一个点 |\n| --------- | ------------------------------------------------------- | -------- |\n| A：已处理 | 0                                                       | 无       |\n| B         | 3（如果从E走到B，值是4，比原先的值大，所以不更新B的值） | D        |\n| C         | 7                                                       | E        |\n| D：已处理 | 1                                                       | A        |\n| E：已处理 | 2                                                       | D        |\n\n接下来就是考虑顶点B，以及与其邻接的C，因为A，D，E都已经处理过了，所以不再考虑了：\n\n| 点        | 最短距离                                                | 前一个点 |\n| --------- | ------------------------------------------------------- | -------- |\n| A：已处理 | 0                                                       | 无       |\n| B：已处理 | 3                                                       | D        |\n| C         | 7（如果从B走到C，则值为8，比原先的大，所以不更新C的值） | E        |\n| D：已处理 | 1                                                       | A        |\n| E：已处理 | 2                                                       | D        |\n\n这样到最后我们就已经处理到了最后的终点，C，递归结束。从A到C的最短距离即是：\n\n- C - E - D - A\n\n对应的代码为：\n\n```php\n<?php\n/**\n * 因为要存储的数据有点多，所以采用了类的形式来存储\n */\nclass Node{\n    public $label='';\n    public $value=null;\n    public $isChecked=false;\n    public $previousNodeLabel='';\n    public function __construct($label)\n    {\n        $this->label=$label;\n    }\n}\n/**\n * $nodes 就是模拟前面讲解时采用的表\n * $map 对应的图\n * $thisNode 递归时采用的点\n * $resultNodeLabel 终点\n */\nfunction DFS(&$nodes,$map,&$thisNode,$resultNodeLabel){\n    $nextTurnLabel='';\n    $minValue=null;\n    foreach($map[$thisNode->label] as $nextLabel=>$value){\n        $node=$nodes[$nextLabel];\n        if($node->isChecked){\n            continue;\n        }\n        if(is_null($node->value) || ($thisNode->value+$value)<$node->value){\n            $node->value=$thisNode->value+$value;\n            $node->previousNodeLabel=$thisNode->label;\n            if(is_null($minValue) || $node->value<$minValue){\n                $minValue=$node->value;\n                $nextTurnLabel=$node->label;\n            }\n        }\n    }\n    $thisNode->isChecked=true;\n    if($thisNode->label==$resultNodeLabel){\n        return true;\n    }\n    if($nextTurnLabel){\n        DFS($nodes,$map,$nodes[$nextTurnLabel],$resultNodeLabel);\n    }\n}\n\nfunction showResult($nodes,$label){\n    if(!$label){\n        return false;\n    }\n    print $label.DIRECTORY_SEPARATOR;\n    $preNode=$nodes[$label];\n    showResult($nodes,$preNode->previousNodeLabel);\n}\n\n$map=[\n    'A'=>['D'=>1,'B'=>6],\n    'D'=>['A'=>1,'B'=>2,'E'=>1],\n    'B'=>['A'=>6,'D'=>2,'E'=>2,'C'=>5],\n    'E'=>['D'=>1,'B'=>2,'C'=>5],\n    'C'=>['B'=>5,'E'=>5]\n];\n\n$startNode=new Node('A');\n$resultLable='C';\n// 可以试试看不走到最后一步，走到中间过程\n// $resultLable='E';\n$nodes=[\n    'A'=>$startNode,\n    'B'=>new Node('B'),\n    'C'=>new Node('C'),\n    'D'=>new Node('D'),\n    'E'=>new Node('E')\n];\n\nDFS($nodes,$map,$startNode,$resultLable);\n\nshowResult($nodes,$resultLable);\n```\n\n"
          }
        ]
      },
      {
        id: "dm-ch10-10-7",
        title: "10.7 平面图",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-10-7-0",
            type: "text",
            content: "# 10.7 平面图\n\n> 若可以在平面中画出一个图而边没有任何交叉（其中边的交叉时表示边的直线或弧线在它们的公共端点以外的地方相交），则这个图是平面图。这种画法称为这个图的平面表示。\n\n简单来说就是将原来的图采用平面图的形式表示，并且其中的边不交叉。比如下面这张图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnnbopkkhvj308f06xa9z.jpg)\n\n采用平面图表示后如下所示：\n\n![image-20210214201359307](https://tva1.sinaimg.cn/large/008eGmZEgy1gnnbq7ltz0j309g07hwef.jpg)\n\n## 欧拉公式\n\n> 设G是带e条边和u个顶点的连通平面简单图。设r是G的平面图表示中的面数，则r=e-u+2。\n\n比如上面的例子中：\n\n- e=12\n- u=8\n- r=6\n\n这里解释一下r=6的由来：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gno7sdtlcuj30fy08hq3c.jpg)\n\n证明就算了，直接拿过来用吧。\n\n推论1：\n\n> 若G是e条边和u个顶点的连通平面简单图，其中u>=3，则e<=3u-6\n\n[度的概念见这里，以及之后要用到的握手定理](https://blog.csdn.net/YQXLLWY/article/details/113771353)。\n\n证明：\n$$\n根据握手定理：2e=\\sum_{u \\in U}deg(u) \\\\\n因为至少3条边组成一个面，所以 \\sum_{u \\in U}deg(u) \\geq 3r，即 2e \\geq 3r\\\\\n再套用到欧拉公式中，用e和u替换r，最终结果为\\\\\ne \\leq 3u-6\n$$\n推论2:\n\n> 若G是连通平面简单图，则G中有度数不超过5的顶点。\n\n证明：\n$$\n假设G中没有度数不超过5的顶点，即每个顶点的最小度数为6。\\\\\n根据握手定理：2e=\\sum_{u \\in U}deg(u)，所以 2e \\geq 6u，即 e \\geq 3u，结合推论1，就可以知道这是不可能的。\\\\\n所以原命题为真。\n$$\n推论3:\n\n> 若连通平面简单图有e条边和u个顶点，u>=3，并且每个顶点的度至少为4，那么 e<=2u-4\n\n证明很简单，还是老套路，用握手定理确定边与顶点的关系，然后用欧拉公式替换其中的r参数。\n\n书上说可以用这个来判断一个图是否为平面图。比如`k3.3`所代表的完全二分图：\n\n![image-20210215192623271](https://tva1.sinaimg.cn/large/008eGmZEgy1gnofyzpwq7j308o0850sw.jpg)\n\n本来用欧拉公式就可以了，但是奈何面数太难数了，而且之所以不用推论1，是因为在推论1下它是成立的，所以用推论3。\n\n-------\n\n## 康拉图斯基定理\n\n不用管他书上的一堆名词解释，简单来说就是如果一个图中包含`K5`和`K3.3`的话，那么它就不是平面图。\n\n比如下面这张图中就包含了`K3.3`：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnogjh1nqwj30j10h40tn.jpg)\n\n其中藏的`k3.3`就是如下所示：\n\n![image-20210215194651272](https://tva1.sinaimg.cn/large/008eGmZEgy1gnogk8xcofj30dp0d2wf7.jpg)\n\n所以它不是平面图。\n\n"
          }
        ]
      },
      {
        id: "dm-ch10-10-8",
        title: "10.8 图着色",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-10-8-0",
            type: "text",
            content: "# 10.8 图着色\n\n> 简单图的着色是对该图的每个顶点都指定一种颜色，使得没有两个相邻的顶点颜色相同。\n\n这个很简答吧，如下图所示：\n\n![image-20210215200149017](https://tva1.sinaimg.cn/large/008eGmZEgy1gnogztonpnj30jh0f7dgr.jpg)\n$$\n图的着色数是着色这个图所需要的最少颜色数。图G的着色数记做 \\chi(G)。\n$$\n\n## 四色定理\n\n> 平面图的着色数不超过4。\n\n这个证明我自己想的，应该没有问题：\n\n对于一个原本的图形，我在每个面上加上一个点，如下图所示：\n\n![image-20210215202606756](https://tva1.sinaimg.cn/large/008eGmZEgy1gnohp3hmicj30a1079jrq.jpg)\n\n这样等于将它的平面图都变成了1个1个的小三角形，如下所示：\n\n![image-20210215202711170](https://tva1.sinaimg.cn/large/008eGmZEgy1gnohq7gzqxj30ej0bojs9.jpg)\n\n这样考虑着色的时候，只需要考虑一个又一个三角形组成的图了，而这种情况下，只需要3到4种颜色就可以涂完所有的点了：\n\n如下图所示：\n\n![image-20210215202932963](https://tva1.sinaimg.cn/large/008eGmZEgy1gnohsnzsx0j30dz0br0tm.jpg)\n\n而且对于任何平面的物体，你都可以在上面加一个点，然后构建成上面的形式，至于是3种还是4种，具体看你对应的面是奇数还是偶数了，看下图：\n\n![image-20210215203527078](https://tva1.sinaimg.cn/large/008eGmZEgy1gnohysylibj30hk091q3i.jpg)\n\n到另一个面时，只是上面过程的重复。\n\n"
          }
        ]
      },
      {
        id: "dm-ch10-lesson-8",
        title: "图的同构",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-lesson-8-0",
            type: "text",
            content: "# 图的同构\n\n先解释啥叫同构：\n\n“\n$$\n设两个图G_1=(V_1,E_1)和G_2(V_2,G_2)。\\\\\na,b \\in V_1,c,d \\in V_2，若存在一个一对一和满射函数：f，\\\\\n使得f(a)=c，f(b)=d，并且a和b相邻时，c与d也相邻。\n$$\n”\n\n如果那个函数存在，则我们叫`G1`和`G2`同构的，对应的函数叫做同构。\n\n比如下面两张图：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnhcmsen37j30mm0aeq38.jpg)\n\n对应的f函数如下所示：\n$$\nf(a)=e \\\\\nf(b)=f \\\\\nf(d)=g \\\\\nf(h)=d\n$$\n因为这样的函数存在，所以可以说`G1`和`G2`是同构的。或者换成下面的图片会更好理解：\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnhcqlrswmj3083093748.jpg)\n\n这里只是介绍同构的概念，具体判定同构的算法就没有了。\n\n"
          }
        ]
      },
      {
        id: "dm-ch10-lesson-9",
        title: "顶点之间的通路数量",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch10-lesson-9-0",
            type: "text",
            content: "# 顶点之间的通路数量\n\n这个证明我暂时先搁置一下，先说结论，一个图中，长度为k的回路（不是简单回路）的数量，等于该图所代表的矩阵的k次乘积后所对应位置的值。\n\n比如下面的这张图：\n\n![DrBXw23K5IpqUsH](https://i.loli.net/2021/02/13/DrBXw23K5IpqUsH.png)\n\n对应的矩阵为：a,b,c,d\n$$\n\\left[\n\\begin{matrix}\n0 & 1 & 1 & 0 \\\\\n1 & 0 & 0 & 1 \\\\\n1 & 0 & 0 & 1 \\\\\n0 & 1 & 1 & 0\n\\end{matrix}\n\\right]\n$$\n即：\n\n![SFJ8zRTvM9UQkHm](https://i.loli.net/2021/02/13/SFJ8zRTvM9UQkHm.png)\n\n然后矩阵乘以其自身8次后，结果为：\n$$\n\\left[\n\\begin{matrix}\n8 & 0 & 0 & 8 \\\\\n0 & 8 & 8 & 0 \\\\\n0 & 8 & 8 & 0 \\\\\n8 & 0 & 0 & 8\n\\end{matrix}\n\\right]\n$$\n然后假设求a-d之间的回路数量，即为8：\n\n![ATqsZ5BDbatzO2y](https://i.loli.net/2021/02/13/ATqsZ5BDbatzO2y.png)\n\n具体的值为：\n\n- a,b,a,b,d\n- a,b,a,c,d\n- a,b,d,b,d\n- a,b,d,c,d\n- a,c,a,b,d\n- a,c,a,c,d\n- a,c,d,b,d\n- a,c,d,c,d\n\n[矩阵乘积的代码和原理可以见这里](https://blog.csdn.net/YQXLLWY/article/details/113797993)\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch11",
    title: "第11章 树",
    description: "树的定义与性质、前缀码、树的遍历、生成树与最小生成树",
    icon: "🌳",
    lessons: [
      {
        id: "dm-ch11-11-1",
        title: "11.1 树的概述：基础定义",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch11-11-1-0",
            type: "text",
            content: "# 11.1 树的概述：基础定义\n\n> 树是没有简单回路的连通无向图。\n>\n> 一个无向图是树当且仅当它的每队顶点之间存在唯一简单通路。\n\n[回路的定义见这里](https://blog.csdn.net/YQXLLWY/article/details/113790328)\n\n然后由多个树组成的图就是森林。树采用T表示。\n\n## 有跟树\n\n上面说树是没有方向的，但是如果我们在一个树中指定一个顶点为根，然后从这个根指向其他顶点作为方向时，就形成了有根树，即有向图。\n\n> 有跟树是指定一个顶点作为根并且每条边的方向都离开根的树。\n\n![image-20210215211232937](https://tva1.sinaimg.cn/large/008eGmZEgy1gnoj1ff81jj30jt08tt8w.jpg)\n\n比如上面的图所示。\n\n再来拿下面这张图说明以下这些概念：\n\n![image-20210215214014051](https://tva1.sinaimg.cn/large/008eGmZEgy1gnoju7weyoj30ed0ag3ys.jpg)\n\n父母：即该点在根的方向的上一个点，比如c的父母是b。\n\n孩子：即该点在根的方向的下几个点，比如g的孩子有h,i,j\n\n兄弟：即该点的父母的除该点之外的点，比如h的兄弟有i和j\n\n祖先们：从该点开始直到根为止经过的点，比如e的祖先有c,b,a\n\n后代们：与祖先相对，从该点开始的所有点，比如b的后台有c,d,e\n\n树叶：如果该点没有孩子，则该点称为树叶，比如d,e,f,k,i,l,m\n\n内点：有孩子的点都可以称为内点，可以说树内除了树叶就是内点，比如a,b,g,c,h,j\n\n子树：以某个点作为新的根，构建的更小的树，比如以g为根，构建的子树为\n\n![image-20210215214935115](https://tva1.sinaimg.cn/large/008eGmZEgy1gnok3y3i8qj309v07h3yi.jpg)\n\n> 若有根树中每个内点的孩子数都小于m，则称该树为m叉树，若该树每个内点都恰好有m个孩子，则称它为满m叉树。\n>\n> 当m=2时，就是二叉树。\n\n### 有序根树\n\n就是规定了一个顶点的孩子的从左往右的顺序，比如下图所示：\n\n![image-20210215220527457](https://tva1.sinaimg.cn/large/008eGmZEgy1gnokkgwcpvj30e009w74m.jpg)\n\n在孩子中，左边的点都比右边的点小。\n\n在二叉树中，左边的点叫做左子，右边的点叫做右子。以左子为根的子树叫做左子树，右子为根的子树叫做右子树。\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch11-11-1",
        title: "11.1 树的概述：树的性质",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch11-11-1-0",
            type: "text",
            content: "# 11.1 树的概述：树的性质\n\n> 带有n个顶点的树含有n-1条边\n\n这个很容易理解，每2个顶点之间有1条边嘛。\n\n-------\n\n> 带有i个内点的满m叉树含有n=mi+1个顶点\n\n[内点就是该顶点有孩子](https://blog.csdn.net/YQXLLWY/article/details/113820054)\n\n这个证明很简单，因为是满m叉树，且有i个内点，所以边的总数为mi，然后结合上面的定理：n-1=mi，即n=mi+1。\n\n------------\n\n$$\n一个满m叉树若有：\\\\\n\\begin{cases}\nn个顶点，则有 i=\\frac{n-1}{m}个内点和l=\\frac{(m-1)\\cdot n+1}{m} 个树叶 \\\\\ni个内点，则有 n=mi+1个顶点和 l=(m-1)i+1个树叶\\\\\nl个树叶，则有 n=\\frac{ml-1}{m-1} 个顶点和 i=\\frac{l-1}{m-1} 个内点\n\\end{cases}\n$$\n\n前面两个结论就是套用上面的公式，就是第三个有点绕，这里解释一下：\n$$\n\\begin{cases}\nn=mi+1\\\\\nn=l+i\n\\end{cases}\n\\\\\n借用上面的公式得出：i=\\frac{l-1}{m-1}\\\\\n再来求n，根据n=l+i=l+\\frac{l-1}{m-1}=\\frac{ml-1}{m-1}\n$$\n\n### 平衡的m叉树\n\n这个书上的定义很奇怪啊：\n\n> 在每个顶点的子树读包含大约相同长度的通路。\n\n层的概念：\n\n> 在有根树中顶点u的层是从根到这个顶点的唯一通路的长度。\n\n然后就是有根树的高度：\n\n> 有根树的层高度就是顶点层数的最大值。\n\n然后就是：\n$$\n在高度为h的m叉树中至多有 m^k 个树叶。\\\\\n即假设树叶数为l，则高度 h \\geq \\left\\lceil \\log_{m} l \\right\\rceil\n$$\n这个很好理解啊，最大值就是满m叉树嘛。\n\n"
          }
        ]
      },
      {
        id: "dm-ch11-11-2",
        title: "11.2 树的应用：前缀码",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch11-11-2-0",
            type: "text",
            content: "# 11.2 树的应用\n\n## 前缀码\n\n这玩意很有意思啊，假设我们用固定长度的5个byte位来表示26个英文字母，比如：\n\n- 00000：a\n- 00001：t\n\n这样当我们想传递单词`at`的时候，就可以传输01的电信号`00000001`。但是接下来，试想有没有可能采用下面的形式来表示数据呢？\n\n![image-20210216155752786](https://tva1.sinaimg.cn/large/008eGmZEgy1gnpfkazr28j30au0ck0sw.jpg)\n\n即：\n\n- e的编码为：0\n- a的编码为：10\n- t的编码为：110\n- s的编码为：111\n\n这样当我们想传输`teas`的时候，就可以传输\n\n| t    | e    | a    | s    |\n| ---- | ---- | ---- | ---- |\n| 110  | 0    | 10   | 111  |\n\n即传输`110010111`。\n\n这样带来的挑战是什么？就是我们没有办法按照固定长度来分割接收到的二进制数据，但是我们可以比照上面的那个二叉树，直到到达某一个树叶为止。\n\n比如将上面的过程逆着来：\n\n![image-20210216160817672](https://tva1.sinaimg.cn/large/008eGmZEgy1gnpfv6a4vcj30ke0cojrx.jpg)\n\n![image-20210216160835010](https://tva1.sinaimg.cn/large/008eGmZEgy1gnpfvfk2llj30lz0cogm7.jpg)\n\n然后像上面这种非固定长度的编码就是前缀码。\n\n## 哈夫曼编码\n\n[参考B站视频](https://www.bilibili.com/video/BV1hK4y1k7Wr?from=search&seid=6506515302025619400)\n\n上面是我们随意指定了编码的方式，现在我们需要先构建一颗树，然后再套用到上面的方式中。比如下面这句话：\n\n> To be,or not to be:that is the question\n\n然后我们统计各个字符号出现的频率：\n\n- T : 0.03\n- o : 0.13\n-   空格: 0.18\n- b : 0.05\n- e : 0.1\n- , : 0.03\n- r : 0.03\n- n : 0.05\n- t : 0.15\n- : : 0.03\n- h : 0.05\n- a : 0.03\n- i : 0.05\n- s : 0.05\n- q : 0.03\n- u : 0.03\n\n然后我们从中挑选最小的两个值，如果有很多最小的值也没关系，随便挑两个：\n\n![image-20210216165705825](https://tva1.sinaimg.cn/large/008eGmZEgy1gnph9x01fjj309b04h3yg.jpg)\n\n然后这里我们就可以把上面的`T`和`,(逗号)`去除掉了，加上一个新的频率值：0.06，然后再来挑2个最小值：\n\n![image-20210216172740782](https://tva1.sinaimg.cn/large/008eGmZEgy1gnpi5r4esuj30cw09ejrk.jpg)\n\n然后继续上面的步骤，直到完成下面这幅图：\n\n![image-20210216172555706](https://tva1.sinaimg.cn/large/008eGmZEgy1gnpi3yhhlnj315a0k2dhv.jpg)\n\n因为图片太大了，我估计缩小会糊，所以放一下[原图的地址](https://tva1.sinaimg.cn/large/008eGmZEgy1gnpi3yhhlnj315a0k2dhv.jpg)\n\n这里说一下构建的方法，依次选择上面列表中最小的点，然后组建成新的顶点，就这样。构建好哈夫曼树之后，就可以套用到上面的二叉树编码中去了。\n\n![image-20210216173536125](https://tva1.sinaimg.cn/large/008eGmZEgy1gnpidzyk5jj311v0iytas.jpg)\n\n[同样放一下原图地址](https://tva1.sinaimg.cn/large/008eGmZEgy1gnpidzyk5jj311v0iytas.jpg)\n\n这样就可以得到例如`T`的编码就是：`00000`，`,`的编码就是`00001`。\n\n这样的好处就是频率比较高的字符，比如`t`，它的编码就比较短`010`。\n\n另外这里总数是1.02，而不是1是因为上面的数据是我用代码算出来的，精度上有点偏差。\n\n### 哈夫曼树具体代码\n\n这段代码真的是写死我了：\n\n```php\n<?php\n\n/**\n * Class Leaf\n * 记录下各种数据结构的类\n */\nclass Leaf{\n    public $value;\n    public $label;\n    // 用来构建哈夫曼树\n    public $leftLeaf;\n    public $rightLeaf;\n    // 用来保存最终的编码值\n    public $code;\n    /**\n     * 模拟链表操作，跟树操作无关\n     * @var $nextLeaf Leaf\n     */\n    public $nextLeaf;\n    public function __construct($value='',$label='')\n    {\n        $this->value=$value;\n        $this->label=$label;\n    }\n}\n\n/**\n * 将字符串转化成上面的类\n * @param $string\n * @return Leaf\n */\nfunction prepareLeaves($string){\n    $length=strlen($string);\n    $result=[];\n    for ($i=0;$i<$length;$i++){\n        $data=$string[$i];\n        !isset($result[$data]) && $result[$data]=0;\n        $result[$data]++;\n    }\n    $prepare=false;\n    $leaf=new Leaf();\n    foreach ($result as $word=>$count){\n        $value=round($count/$length,2);\n        if (!$prepare){\n            $prepare=true;\n            $leaf->value=$value;\n            $leaf->label=$word;\n            continue;\n        }\n        $newLeaf=new Leaf($value,$word);\n        $leaf=sortLeaf($leaf,$newLeaf);\n    }\n    return $leaf;\n}\n\n/**\n * 构建哈夫曼树\n * @param $leaf Leaf\n */\nfunction createHuffmanTree($leaf){\n    if (!$leaf->nextLeaf->nextLeaf){\n        $indexLeaf=new Leaf($leaf->value+$leaf->nextLeaf->value);\n        $indexLeaf->leftLeaf=$leaf;\n        $indexLeaf->rightLeaf=$leaf->nextLeaf;\n        return $indexLeaf;\n    }\n    $newLeaf=new Leaf($leaf->value+$leaf->nextLeaf->value);\n    $newLeaf->leftLeaf=$leaf;\n    $newLeaf->rightLeaf=$leaf->nextLeaf;\n    // 插入新的顶点并排序，保证最前面的2个一定是值最小的2个顶点\n    $leaf=sortLeaf($leaf->nextLeaf->nextLeaf,$newLeaf);\n    // 递归，并且之前用过的2个顶点不再继续使用\n    return createHuffmanTree($leaf);\n}\n\n/**\n * 根据哈夫曼树在其中加上编码值\n * @param $leaf Leaf\n * @param string $preCode\n * @return bool\n */\nfunction getWordCode($leaf,$preCode=''){\n    if (!$leaf){\n        return false;\n    }\n    if ($leaf->leftLeaf){\n        $leaf->leftLeaf->code=$preCode.\"0\";\n        getWordCode($leaf->leftLeaf,$leaf->leftLeaf->code);\n    }\n    if ($leaf->rightLeaf){\n        $leaf->rightLeaf->code=$preCode.\"1\";\n        getWordCode($leaf->rightLeaf,$leaf->rightLeaf->code);\n    }\n}\n\n/**\n * 读取最终的编码值，保存在 result 数组中\n * @param $leaf Leaf\n * @param $result array\n * @return array\n */\nfunction storeResult($leaf,&$result){\n    if (!$leaf){\n        return $result;\n    }\n    if ($leaf->label){\n        $result[$leaf->label]=$leaf->code;\n    }\n    storeResult($leaf->leftLeaf,$result);\n    storeResult($leaf->rightLeaf,$result);\n}\n\n/**\n * 按照从小到大排序叶子节点\n * @param $leaf Leaf\n * @param $newLeaf Leaf\n * @return Leaf\n */\nfunction sortLeaf($leaf,$newLeaf):Leaf{\n    if ($leaf->value>$newLeaf->value){\n        $newLeaf->nextLeaf=$leaf;\n        return $newLeaf;\n    }\n    $thisLeaf=$leaf->nextLeaf;\n    $lastLeaf=$leaf;\n    if (!$thisLeaf){\n        $leaf->nextLeaf=$newLeaf;\n        return $leaf;\n    }\n    while ($thisLeaf->nextLeaf && $thisLeaf->value<$newLeaf->value){\n        $lastLeaf=$thisLeaf;\n        $thisLeaf=$thisLeaf->nextLeaf;\n    }\n    $lastLeaf->nextLeaf=$newLeaf;\n    $newLeaf->nextLeaf=$thisLeaf;\n    return $leaf;\n}\n```\n\n上面是具体的操作代码，下面是调用：\n\n```php\n<?php\n$string='To be,or not to be:that is the question';\n$indexLeaf=prepareLeaves($string);\n$indexLeaf=createHuffmanTree($indexLeaf);\ngetWordCode($indexLeaf);\n$storeResult=[];\nstoreResult($indexLeaf,$storeResult);\nprint_r($storeResult);\n```\n\n最终输出的结果：\n\n```bash\nArray\n(\n    [o] => 0\n    [ ] => 100\n    [n] => 10100\n    [b] => 10101\n    [i] => 10110\n    [h] => 10111\n    [e] => 1100\n    [:] => 110100\n    [r] => 110101\n    [q] => 110110\n    [a] => 110111\n    [T] => 111000\n    [u] => 111001\n    [,] => 111010\n    [s] => 111011\n    [t] => 1111\n)\n```\n\n这里有个很有意思的地方，那就是`o`的编码是最短的，这个问题的答案我在代码中暂时没有找到原因，所以先搁置吧。"
          }
        ]
      },
      {
        id: "dm-ch11-11-3",
        title: "11.3 树的遍历",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch11-11-3-0",
            type: "text",
            content: "# 11.3 树的遍历\n\n## 通用地址信息\n\n这玩意很简单，就是可以采用下面的形式标记树中每个点的位置：\n\n![image-20210217165153703](https://tva1.sinaimg.cn/large/008eGmZEgy1gnqmqtqze4j30gc0cfaah.jpg)\n\n就是类似上面这样的图一样。\n\n## 前序遍历，后续遍历，后序遍历\n\n[参考B站视频](https://www.bilibili.com/video/BV1vv411t7mW?from=search&seid=13423928426148882137)\n\n![](https://tva1.sinaimg.cn/large/008eGmZEgy1gnql5g87ovj30eq097tb7.jpg)\n\n## 中缀，前缀和后缀记法\n\n首先就是用二叉树来表示所需要进行的计算，比如式子：`(x+y)*2+(x-4)/3`可以用二叉树来表示：\n\n![image-20210217162419208](https://tva1.sinaimg.cn/large/008eGmZEgy1gnqly69ph2j30kt0a5jro.jpg)\n\n### 中缀记法\n\n然后我们只需要对其进行中序遍历，就可以获得原来的式子了，但是为了跟原来的式子一致，我们还需要括号。\n\n然后用这种方式获得的式子就是中缀记法。\n\n### 前缀记法 / 波兰记法\n\n在上面我们对上面的树采用中序遍历，这里改成前序遍历。这样得到的式子就是前缀记法。\n\n根据这个式子进行计算时，我们必须要从**右到左**，如果遇到一个代表计算符号的字符，就计算该字符接下来的两个字符。比如当遇到`/-x43`时，从右到左，遇到`-`时，就计算`x-4`。\n\n### 后缀记法 / 逆波兰记法\n\n模仿上面的前缀记法，就是采用前序遍历。\n\n然后根据这个式子计算时，采用从**左到右**，如果遇到一个代表计算符号的字符，就采用该符号计算该字符的前2个字符，比如遇到`xy+2+*`时，从左到右，当遇到`+`时，就计算`x+y`。\n\n\n\n\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch11-11-3",
        title: "11.3 树的遍历：相关代码",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch11-11-3-0",
            type: "text",
            content: "# 11.3 树的遍历：LDR，LRD，VLR 相关代码\n\n[基础定义介绍见这里](https://blog.csdn.net/YQXLLWY/article/details/113820054#comments_15041160)\n\n- VLR：前序遍历\n- LDR：中序遍历\n- LRD：后序遍历\n\n```php\n<?php\n\nclass Leaf{\n    public $leftLeaf;\n    public $rightLeaf;\n    public $label;\n    public function __construct($label)\n    {\n        $this->label=$label;\n    }\n}\n\n/**\n * 前序遍历\n * @param $leaf Leaf\n * @param string $result\n * @return bool\n */\nfunction VLR($leaf,&$result){\n    if (!$leaf){\n        return false;\n    }\n    $result.=$leaf->label;\n    VLR($leaf->leftLeaf,$result);\n    VLR($leaf->rightLeaf,$result);\n}\n\n/**\n * 中序遍历\n * @param $leaf Leaf\n * @param $result string\n * @return bool\n */\nfunction LDR($leaf,&$result){\n    if (!$leaf){\n        return false;\n    }\n    if ($leaf->leftLeaf){\n        LDR($leaf->leftLeaf,$result);\n    }\n    $result.=$leaf->label;\n    LDR($leaf->rightLeaf,$result);\n}\n\n/**\n * 后续遍历\n * @param $leaf Leaf\n * @param $result string\n * @return bool\n */\nfunction LRD($leaf,&$result){\n    if (!$leaf){\n        return false;\n    }\n    LRD($leaf->leftLeaf,$result);\n    LRD($leaf->rightLeaf,$result);\n    $result.=$leaf->label;\n    return false;\n}\n\n// 相关记法部分\n\n/**\n * 解析前缀记法\n * @param $string\n * @return mixed\n */\nfunction ParseStringVLR($string){\n    global $supportOperation;\n    $stringIndex=strlen($string);\n    $string=str_split($string);\n    while ($stringIndex>0){\n        $stringIndex--;\n        if (in_array($string[$stringIndex],$supportOperation)){\n            $string[$stringIndex]=calculate($string[$stringIndex],$string[$stringIndex+1],$string[$stringIndex+2]);\n            unset($string[$stringIndex+1]);\n            unset($string[$stringIndex+2]);\n            $string=array_values($string);\n            $stringIndex=count($string);\n        }\n    }\n    return $string[0];\n}\n\n/**\n * 解析后缀记法\n * @param $string\n * @return mixed\n */\nfunction ParseStringLRD($string){\n    global $supportOperation;\n    $length=strlen($string)-1;\n    $string=str_split($string);\n    $stringIndex=-1;\n    while ($stringIndex<$length){\n        $stringIndex++;\n        if (in_array($string[$stringIndex],$supportOperation)){\n            $string[$stringIndex]=calculate($string[$stringIndex],$string[$stringIndex-2],$string[$stringIndex-1]);\n            unset($string[$stringIndex-1]);\n            unset($string[$stringIndex-2]);\n            $string=array_values($string);\n            $length=count($string)-1;\n            $stringIndex=0;\n        }\n    }\n    return $string[0];\n}\n\n/**\n * 解析中缀记法\n * @param $string\n * @return mixed\n */\nfunction ParseStringLDR($string){\n    global $supportOperation;\n    $length=strlen($string)-1;\n    $string=str_split($string);\n    $stringIndex=-1;\n    while ($stringIndex<$length){\n        $stringIndex++;\n        if (in_array($string[$stringIndex],$supportOperation)){\n            $string[$stringIndex]=calculate($string[$stringIndex],$string[$stringIndex-1],$string[$stringIndex+1]);\n            unset($string[$stringIndex-1]);\n            unset($string[$stringIndex+1]);\n            $string=array_values($string);\n            $length=count($string)-1;\n            $stringIndex=0;\n        }\n    }\n    return $string[0];\n}\n\n$supportOperation=['+','-','*','/'];\nfunction calculate($operation,$data1,$data2){\n    $result=0;\n    switch ($operation){\n        case \"+\":\n            $result=$data1+$data2;\n            break;\n        case \"-\":\n            $result=$data1-$data2;\n            break;\n        case \"*\":\n            $result=$data1*$data2;\n            break;\n        case \"/\":\n            if ($data2!=0){\n                $result=round($data1/$data2,2);\n            }\n            break;\n        default:\n            $result=0;\n    }\n    return $result;\n}\n```\n\n然后这里是对应的调用代码：\n\n```php\n<?php\n\nrequire_once __DIR__.DIRECTORY_SEPARATOR.\"树的遍历.php\";\n\nfunction createLeaf($x,$y){\n    $indexLeaf=new Leaf('+');\n    $indexLeaf->leftLeaf=new Leaf('*');\n    $indexLeaf->rightLeaf=new Leaf('+');\n    $indexLeaf->leftLeaf->leftLeaf=new Leaf('+');\n    $indexLeaf->leftLeaf->leftLeaf->leftLeaf=new Leaf($x);\n    $indexLeaf->leftLeaf->leftLeaf->rightLeaf=new Leaf($y);\n    $indexLeaf->leftLeaf->rightLeaf=new Leaf(2);\n    $indexLeaf->rightLeaf->leftLeaf=new Leaf('-');\n    $indexLeaf->rightLeaf->rightLeaf=new Leaf(3);\n    $indexLeaf->rightLeaf->leftLeaf->leftLeaf=new Leaf($x);\n    $indexLeaf->rightLeaf->leftLeaf->rightLeaf=new Leaf(4);\n    return $indexLeaf;\n}\n\n$x=2;\n$y=4;\n$result=13;\n\n$indexLeaf=createLeaf($x,$y);\n$string='';\nVLR($indexLeaf,$string);\nprint $string.PHP_EOL;\nprint ParseStringVLR($string).PHP_EOL;\n$string='';\nLRD($indexLeaf,$string);\nprint $string.PHP_EOL;\nprint ParseStringLRD($string).PHP_EOL;\n$string='';\nLDR($indexLeaf,$string);\nprint $string.PHP_EOL;\nprint ParseStringLDR($string);\n```\n\n对应的树图如下所示：\n\n![image-20210217205047500](https://tva1.sinaimg.cn/large/008eGmZEgy1gnqtne5mamj30q80cb3yz.jpg)\n\n其中`x=2`，`y=4`。"
          }
        ]
      },
      {
        id: "dm-ch11-11-4-n",
        title: "11.4 树的应用：n皇后问题",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch11-11-4-n-0",
            type: "text",
            content: "# 11.4 树的应用：n皇后问题\n\n抛开西洋棋的规则，简单点就是，如果你在下面的图中放入一个棋子，则灰色部分都不能用了：\n\n![image-20210218151415032](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrpjkg3tsj307306j3ye.jpg)\n\n即左右，对角线的空格都不能使用了，在这种情况下，问在`n*n`的格子中如何放置最多这样的黑色格子。\n\n这里以`4*4`的格子为例：\n\n![image-20210218151608512](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrplj0thxj30sm06rjrb.jpg)\n\n展示了一种摆法。\n\n在这里要用到[深度优先搜索，也叫做回溯的算法来找](https://blog.csdn.net/YQXLLWY/article/details/113845073)。\n\n首先说一下找的核心原理，就是从第1行开始找，找到一个合适的位置，比如`(0,0)`（数组下标是从0开始的）。\n\n![image-20210218152151393](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrprh3c1zj309k08djrb.jpg)\n\n再来从第二列开始找合适的位置，结合上面的图我们就可以找到第二行合适的位置为`(2,1)`：\n\n![image-20210218152316250](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrpsxute2j308r085dfr.jpg)\n\n但是在添加了`(2,1)`作为新的点之后：\n\n![image-20210218152412801](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrptxf1mtj308z080dfr.jpg)\n\n导致下一行没有可以使用的位置了，所以我就就**回溯**到上一行，使用下一个可以使用的点：\n\n![image-20210218152645608](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrpwkgvafj308207q3yf.jpg)\n\n这样再回到第3行，就还有一个位置可以使用。\n\n![image-20210218152952240](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrpztda4ej308907u0sn.jpg)\n\n到这里就完成了使用回溯算法来实现n皇后问题了。\n\n对应的代码：\n\n```php\n<?php\n\n/**\n * n皇后问题的核心代码\n * @param $queens array 存储每次递归后的结果\n * @param $mapLength int n的大小\n * @param int $rowIndex 本地递归的行数\n * @param int $offset 回溯时使用，用来跳过前一次设置的值\n * @return false\n */\nfunction setQueen(&$queens,$mapLength,$rowIndex=0,$offset=0){\n    // 设置递归停止条件\n    if ($rowIndex<0 || $rowIndex>=$mapLength){\n        return false;\n    }\n    // 获取下一个皇后的下标\n    $columnIndex=getAvaliableNode($queens,$mapLength,$offset);\n    // 递归到最后一行时，发现没有结果就停止，防止陷入死循环\n    if (($rowIndex+1)==$mapLength && is_bool($columnIndex)){\n        return false;\n    }\n    // 正常获取到皇后的位置，则继续下一次递归\n    if (!is_bool($columnIndex)){\n        $queens[$rowIndex]=$columnIndex;\n        setQueen($queens,$mapLength,$rowIndex+1);\n    }else{\n        // 没有获取到正确的皇后位置，回溯 & 重新开始获取值\n        array_pop($queens);\n        setQueen($queens,$mapLength,$rowIndex-1,$offset+1);\n    }\n}\n\n/**\n * 计算下一个可以使用的空格下标\n * @param $queens array 已设定的点\n * @param $mapLength int n的值\n * @param int $offset 回溯时，跳过之前采用的点\n * @return false|int\n */\nfunction getAvaliableNode($queens,$mapLength,$offset=0){\n    $nextRow=count($queens);\n    $unavaliableColumnNumber=[];\n    foreach ($queens as $rowNumber=>$columnNumber){\n        // 计算该列不能使用\n        $unavaliableColumnNumber[$columnNumber]=1;\n        // 对角线不能使用\n        $unavaliableColumnNumber[$columnNumber+($nextRow-$rowNumber)]=1;\n        $unavaliableColumnNumber[$columnNumber-($nextRow-$rowNumber)]=1;\n    }\n    for ($i=0;$i<$mapLength;$i++){\n        if (!isset($unavaliableColumnNumber[$i])){\n            $offset--;\n            if ($offset<0){\n                return $i;\n            }\n        }\n    }\n    return false;\n}\n\n$queens=[];\nsetQueen($queens,5);\nprint_r($queens);\n```\n\n"
          }
        ]
      },
      {
        id: "dm-ch11-11-4",
        title: "11.4 生成树",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch11-11-4-0",
            type: "text",
            content: "# 11.4 生成树\n\n[图的基础知识](https://blog.csdn.net/YQXLLWY/article/details/113771353)\n\n> 设G是简单图。G的生成树是包含G的每个顶点的G的子图。\n\n比如对于下面的左图，右图就是其生成树中的一种：\n\n![image-20210218093527971](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrfr0ujx8j30nz07c74k.jpg)\n\n所以也可以说：\n\n> 简单图是连通的，当且仅当它有生成树。\n\n这个概念可以类比到[哈赛图](https://blog.csdn.net/YQXLLWY/article/details/113732542)，或者关系中的[传递性质](https://blog.csdn.net/YQXLLWY/article/details/113480886)。\n\n## 深度优先搜索 / 回溯：DFS\n\n之前还有一个[广度优先搜索](https://blog.csdn.net/YQXLLWY/article/details/113809623)的内容，用来找最短路径的。\n\n这里深度优先搜索则是在一个简单图中构建生成树的方法。\n\n![image-20210218101921334](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrh0over2j30jp08egls.jpg)\n\n比如上面这张图，假设以f作为根节点，然后开始构建。\n\n首先就是顺着边走，走过的点不能重复走。\n\n就可以得到下面的图片：\n\n![image-20210218102234922](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrh41tidaj30nz0gigm7.jpg)\n\n然后从树叶的父母开始，将其作为根节点，重复上面的步骤：\n\n![image-20210218103148655](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrhdph8yfj30jf0h5t9e.jpg)\n\n然后继续重复上面的步骤，就可以完成该简单图的生成树了。\n\n![image-20210218103453517](https://tva1.sinaimg.cn/large/008eGmZEgy1gnrhguzbtsj30e508fwep.jpg)\n\n## 宽度有限搜索 / 广度有限搜索：BFS\n\n[这个之前介绍过，可以看这里](https://blog.csdn.net/YQXLLWY/article/details/113809623)\n\n"
          }
        ]
      },
      {
        id: "dm-ch11-11-5",
        title: "11.5 最小生成树",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch11-11-5-0",
            type: "text",
            content: "# 11.5 最小生成树\n\n[生成树的基础概念见这里](https://blog.csdn.net/YQXLLWY/article/details/113842918)\n\n> 连通加权图里的最小生成树是具有边的权之和最小的生成树。\n\n简单来说就是，首先这个图中每条边都有权重，而该图的生成树有很多种生成树，其中各个边权重加在一起最小的就是最小生成树。\n\n## 普林算法\n\n[参考油管视频](https://www.youtube.com/watch?v=k7sYAs9J24w)\n\n比如下面这张图。\n\n![image-20210218215506401](https://tva1.sinaimg.cn/large/008eGmZEgy1gns14pjr5oj30dg0demxp.jpg)\n\n随便选择一个点，比如选`g`，从`g`的边中选择一条权重最小的边。\n\n![image-20210218215751870](https://tva1.sinaimg.cn/large/008eGmZEgy1gns17herjij30cv0cb0t9.jpg)\n\n就是`g-d`，所以现在就从`{g,d}`的所有边中选择一个权重最低的，就是`d-e`。\n\n![image-20210218215846954](https://tva1.sinaimg.cn/large/008eGmZEgy1gns18g227jj30eu0cljry.jpg)\n\n接着重复上面的过程，应该是`g-e`，但是这样就会构成回路了，不符合生成树的定义，所以不能选，抛开这条之后就是`e-f`。重复上面的过程，就构成了最小生成树：\n\n![image-20210218220349783](https://tva1.sinaimg.cn/large/008eGmZEgy1gns1dp5kgdj30cw0cr3z5.jpg)\n\n这里撇清一个概念，就是[迪克斯特拉算法](https://blog.csdn.net/YQXLLWY/article/details/113809623)，迪克斯特拉算法虽然是求加权图中两个点之间的权重最小值，但是不用包含每一个点，所以在这里不能拿来用。\n\n## 克鲁斯卡尔算法\n\n[参考B站视频](https://www.bilibili.com/video/BV1Mf4y117bZ?from=search&seid=413211035918326469)\n\n这个就更加简单了，首先还是下面这张图：\n\n![image-20210218222359278](https://tva1.sinaimg.cn/large/008eGmZEgy1gns1ynvjbbj30c50d4mxo.jpg)\n\n然后从中找出权值最小的一条边：`g-d`。\n\n![image-20210218222448622](https://tva1.sinaimg.cn/large/008eGmZEgy1gns1zir4zgj30cw0czgm5.jpg)\n\n然后再找剩下的权值最小的边：`e-d`。\n\n![image-20210218222548010](https://tva1.sinaimg.cn/large/008eGmZEgy1gns20js0rsj30dq0cxaan.jpg)\n\n\n\n继续寻找，从左到右就是过程，直到构建成下面这样：\n\n![image-20210218222957851](https://tva1.sinaimg.cn/large/008eGmZEgy1gns24vs9ttj30ux0a73zo.jpg)\n\n这个时候权重最小的边就是`g-e`，但是如果这条边也选上的话，就会构成回路，所以不能选择。遵照这样的规则，最终成果就是：\n\n![image-20210218223120430](https://tva1.sinaimg.cn/large/008eGmZEgy1gns26ba8fwj309i09et90.jpg)\n\n最终结果和上面是一样的。"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch12",
    title: "第12章 布尔代数",
    description: "布尔函数及其表示、电路的极小化",
    icon: "🔘",
    lessons: [
      {
        id: "dm-ch12-12-1",
        title: "12.1 布尔函数",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch12-12-1-0",
            type: "text",
            content: "# 12.1 布尔函数\n\n这个基本和[逻辑部分](https://blog.csdn.net/YQXLLWY/article/details/111086941)是类似的：\n$$\n补：\\overline{1}=0,\\overline{0}=1，就是逻辑关系中的 \\neg \\\\\n+，OR：1+1=1，1+0=1，0+0=0，就是逻辑中的 \\wedge\\\\\n\\bullet，AND：1 \\bullet 1=1，1 \\bullet 0=0，0 \\bullet 0=0，就是逻辑中的 \\vee\n$$\n\n## 对偶性\n\n$$\n就是将 \\cdot 替换成 +，将 + 替换成 \\cdot，0替换成1，1替换成0。\\\\\n比如原式子：x \\cdot (y+0)，其对偶式就是 x+(y\\cdot 1)，化简成 x+y。\n假设原布尔函数为 F，则其对偶函数表示为 F^d。\n$$\n\n这里对其做一下真值表：\n\n| x    | y    | x(y+0) | x+y  |\n| ---- | ---- | ------ | ---- |\n| 0    | 0    | 0      | 0    |\n| 0    | 1    | 0      | 1    |\n| 1    | 0    | 0      | 1    |\n| 1    | 1    | 1      | 1    |\n\n然后就是为了证明一个定理：\n$$\n假设两个布尔函数 F=G，则 F^d = G^d\n$$\n要证明这个定理，需要先证明下面这个定理：\n$$\n设F是一个含有变元 x_1，x_2，x_3 \\cdots x_n 的布尔表达式。\\overline{ F(\\overline{x_1},\\overline{x_2} \\cdots \\overline{x_n}) } = F^d (x_1,x_2,x_3 \\cdots x_n)\n$$\n这个证明很简单：\n$$\n无论式子多复杂，都可以拆解成下面的几种形式：\\\\\n\\begin{cases}\nx+1\\\\\nx+0\\\\\nx\\cdot 1\\\\\nx \\cdot 0\\\\\nx \\cdot y \\\\\nx+y\\\\\n\\end{cases}\n\\\\\n然后就是这几个公式都是成立的：\\\\\n\\begin{cases}\n\\overline{ \\overline{x}+1 } &=0 &= x \\cdot 0 \\\\\n\\overline{ \\overline{x}+0 } &=x &=x \\cdot 1 \\\\\n\\overline{ \\overline{x} \\cdot 1 } &=x &=x+0\\\\\n\\overline{ \\overline{x} \\cdot 0 } &=1 &=x+1\\\\\n\\overline{ \\overline{x} \\cdot \\overline{y} } &= x+y \\\\\n\\overline{ \\overline{x} + \\overline{y} } &= x \\cdot y\n\\end{cases}\n$$\n最后两个式子用真值表来验证：\n\n| x    | y    | 第5个式子左侧 | 第5个式子右侧 | 第6个式子左侧 | 第6个式子右侧 |\n| ---- | ---- | ------------- | ------------- | ------------- | ------------- |\n| 0    | 0    | 0             | 0             | 0             | 0             |\n| 0    | 1    | 1             | 1             | 0             | 0             |\n| 1    | 0    | 1             | 1             | 0             | 0             |\n| 1    | 1    | 1             | 1             | 1             | 1             |\n\n所以上面第二个结论是正确的。\n$$\n因为 \\overline{ F(\\overline{x_1},\\overline{x_2} \\cdots \\overline{x_n}) } = F^d (x_1,x_2,x_3 \\cdots x_n)，\\\\\n所以 F(x_1,x_2,x_3 \\cdots x_n)=\\overline{ F^d (\\overline{ x_1 },\\overline{ x_2 },\\overline{ x_3 } \\cdots \\overline{ x_n }) }\\\\\n所以 F=G，则 F^d = G^d\n$$\n\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch12-12-2",
        title: "12.2 布尔函数的表示",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch12-12-2-0",
            type: "text",
            content: "# 12.2 布尔函数的表示\n\n## 极小项\n\n这个不用管那么多，其实就是所有变元做布尔积。比如3个布尔元x,y,z：\n\n| x    | y    | z    | xyz  |\n| ---- | ---- | ---- | ---- |\n| 0    | 0    | 0    | 0    |\n| 0    | 0    | 1    | 0    |\n| 0    | 1    | 0    | 0    |\n| 0    | 1    | 1    | 0    |\n| 1    | 0    | 0    | 0    |\n| 1    | 0    | 1    | 0    |\n| 1    | 1    | 0    | 0    |\n| 1    | 1    | 1    | 1    |\n\n可以看到这种情况下，只有所有变元都是1，最终结果才为1，其他情况下都是0。\n\n## 构建布尔函数\n\n在之前都是如果知道布尔函数，可以通过定理来化简布尔函数，但是如果只知道真值表，如何构建布尔函数呢？\n\n比如下面的真值表：\n\n| x    | y    | z    | F    |\n| ---- | ---- | ---- | ---- |\n| 1    | 1    | 1    | 0    |\n| 1    | 1    | 0    | 0    |\n| 1    | 0    | 1    | 1    |\n| 1    | 0    | 0    | 0    |\n| 0    | 1    | 1    | 0    |\n| 0    | 1    | 0    | 0    |\n| 0    | 0    | 1    | 0    |\n| 0    | 0    | 0    | 0    |\n\n如何构建这个真值表的布尔函数呢？\n\n这里就可以用上面的极小项来实现了，因为我们看到结果中只有一个值为1，其他情况下都是0。所以我们可以得出式子为：\n$$\nF(x,y,z)=x \\overline{y} z，这里为什么是 \\overline{y} 呢？因为当时其值为0，所以需要处理一下。\n$$\n上面是有1个1，其他都是0，如果有2个1时：\n\n| x    | y    | z    | G    |\n| ---- | ---- | ---- | ---- |\n| 1    | 1    | 1    | 0    |\n| 1    | 1    | 0    | 0    |\n| 1    | 0    | 1    | 1    |\n| 1    | 0    | 0    | 0    |\n| 0    | 1    | 1    | 0    |\n| 0    | 1    | 0    | 1    |\n| 0    | 0    | 1    | 0    |\n| 0    | 0    | 0    | 0    |\n\n我们就可以表示成2个极小项的和：\n$$\nG(x,y,z)=x \\overline{y}z+ \\overline{x}y \\overline{z}\n$$\n这样我们就可以根据真值表来构建布尔函数了。\n\n---------\n\n这样除了可以用来构建布尔函数，也可以用来化简布尔函数：\n$$\nF(x,y,z)=(x+y) \\overline{z}\n$$\n如果是之前，就需要按照公式一步步拆下去，现在可以首先计算出真值表为：\n\n| x    | y    | z    | F    |\n| ---- | ---- | ---- | ---- |\n| 1    | 1    | 1    | 0    |\n| 1    | 1    | 0    | 1    |\n| 1    | 0    | 1    | 0    |\n| 1    | 0    | 0    | 1    |\n| 0    | 1    | 1    | 0    |\n| 0    | 1    | 0    | 1    |\n| 0    | 0    | 1    | 0    |\n| 0    | 0    | 0    | 0    |\n\n套用上面的公式，我们可以直接得出：\n$$\nF(x,y,z)=xy \\overline{z}+ x\\overline{y} \\overline{z}+\\overline{x}y\\overline{z}\n$$\n跟直接套公式得出的结论是一致的。\n\n## 函数的完备性\n\n上面我们得出，只需要使用`+,.,-`就可以构建出所有的布尔函数，但是根据下面的公式（德.摩根率）：\n$$\n\\begin{cases}\nx+y &=\\overline{ \\overline{x}\\overline{y} } \\\\\nxy &=\\overline{ \\overline{x}+\\overline{y} }\n\\end{cases}\n$$\n所以我们只需要`+,-`或者`.,-`就可以构建所有的布尔函数了，这就是函数的完备性。\n\n那么可以更小一点吗？也可以，我们定义一个运算符号：`|`，其真值表如下：\n\n| x    | y    | \\|   |\n| ---- | ---- | ---- |\n| 0    | 0    | 1    |\n| 0    | 1    | 1    |\n| 1    | 0    | 1    |\n| 1    | 1    | 0    |\n\n$$\n这样的情况下：\\\\\n\\begin{cases}\n\\overline{x} &=x|x \\\\\nxy &= (x|y)|(x|y)\n\\end{cases}\n$$\n\n第二个式子可以用真值表来验证：\n\n| x    | y    | xy   | (x\\|y)\\|(x\\|y) |\n| ---- | ---- | ---- | -------------- |\n| 0    | 0    | 1    | 1              |\n| 0    | 1    | 1    | 1              |\n| 1    | 0    | 1    | 1              |\n| 1    | 1    | 0    | 0              |\n\n`|`也可以表示为`NAND`，就是*not and*，就是在布尔积的基础上取其补值。\n\n类似的还有一个`NOR`，就是`not or`，就是在布尔和的基础上取其补值。\n$$\n表示为 \\downarrow\n$$\n真值表为：\n\n| x    | y    | NOR  |\n| ---- | ---- | ---- |\n| 0    | 0    | 1    |\n| 0    | 1    | 0    |\n| 1    | 0    | 0    |\n| 1    | 1    | 0    |\n\n同时因为：\n$$\n\\begin{cases}\n\\overline{x} &=x \\downarrow x \\\\\nx+y &= (x \\downarrow y) \\downarrow (x \\downarrow y)\n\\end{cases}\n$$\n所以可以说NAND和NOR也具有函数完备性。"
          }
        ]
      },
      {
        id: "dm-ch12-12-4",
        title: "12.4 电路的极小化",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch12-12-4-0",
            type: "text",
            content: "# 12.4 电路的极小化\n\n在之前[构建布尔函数](https://blog.csdn.net/YQXLLWY/article/details/114341750)部分，我们知道根据真值表我们可以写出所有的布尔函数，但是问题是这些布尔函数在电路实现上并不一定是最优价，比如：\n$$\nF(x,y,z)=(x+y)\\overline{z}=xy\\overline{z}+x\\overline{y}\\overline{z}+\\overline{x}y\\overline{z}\n$$\n在拆开来之前，就只需要一个`+`，一个`-`，一个`.`，三个门就可以解决，结果拆开来之后，需要的操作数量多了很多，但是传统情况下，我们又是根据真值表来构建布尔函数的，现在的问题就是，在构建完布尔函数之后，如何简化其式子，实现减少操作步骤的过程，说人话就是如何根据上面拆开的式子去获得没有拆开前的式子。\n\n## 卡诺图\n\n这个就是其中一个工具。\n\n[参考视频](https://www.youtube.com/watch?v=gIjn3rK62RY&t=613s)\n\n这里先开始最简单的，2个元素的卡诺图，假设真值表如下所示：\n\n| A    | B    | F    |\n| ---- | ---- | ---- |\n| 0    | 0    | 1    |\n| 0    | 1    | 0    |\n| 1    | 0    | 1    |\n| 1    | 1    | 1    |\n\n然后根据之前的知识，我们可以写出F的布尔函数为：\n$$\nF(A,B)=\\overline{A}\\overline{B}+A\\overline{B}+AB\n$$\n然后我们要化简上面的式子，就先构建下面这样的表格，把真值表中，为1的部分标进去：\n$$\n这里为了便于表示，就把 \\overline{A}=a，\\overline{B}=b\n$$\n\n|      | B    | b    |\n| ---- | ---- | ---- |\n| A    | 1    | 1    |\n| a    |      | 1    |\n\n然后我们就可以开始玩开心消消乐了：\n\n![image-20210306185036160](https://tva1.sinaimg.cn/large/008eGmZEgy1goadpkg2j3j30wc03rdfr.jpg)\n\n首先看红色部分，A和a都在其中，所以我们删除了`Ab`和`ab`，最终留下了`b`，然后再看绿色部分，我们删除了`AB`和`Ab`，最终留下了A，所以最终结果为：\n$$\nF(A,B)=\\overline{A}\\overline{B}+A\\overline{B}+AB=\\overline{B}+A，\\\\\n下面为了验证，称F2(A,B)=\\overline{B}+A\n$$\n这里我们用真值表验证一下：\n\n| A    | B    | F2   |\n| ---- | ---- | ---- |\n| 0    | 0    | 1    |\n| 0    | 1    | 0    |\n| 1    | 0    | 1    |\n| 1    | 1    | 1    |\n\n结果和上面是一致的。PS，我不知道怎么证明卡诺图是有效的。\n\n上面是最简单的卡诺图，下面来点复杂的：\n\n![image-20210306190931852](https://tva1.sinaimg.cn/large/008eGmZEgy1goae99hux2j309u08lzka.jpg)\n\n这里为了看的方便，然后开始开心消消乐：\n\n![image-20210306233533775](https://tva1.sinaimg.cn/large/008eGmZEgy1goaly41e9pj30p508igly.jpg)\n\n首先看第一张图，我们消除了`AB`和`aB`，所以剩下了`B`。\n\n再来看第二张图，我们消除了`Cd`和`cd`，所以剩下了`d`，和上面剩下的`B`组成就是`Bc`。\n\n再来看第三张图，我们消除了`cD`和`cd`，所以剩下了`c`，和上面剩下的`B`组成的就是`Bc`。\n$$\n所以最终的式子为：\\\\\nF2(A,B,C,D)=B \\overline{C}+B\\overline{D}\n$$\n为了验证最终的结果，我们先还原原先的真值表：\n\n| A    | B    | C    | D    | F    |\n| ---- | ---- | ---- | ---- | ---- |\n| 1    | 1    | 1    | 0    | 1    |\n| 0    | 1    | 1    | 0    | 1    |\n| 1    | 1    | 0    | 1    | 1    |\n| 0    | 1    | 0    | 1    | 1    |\n| 1    | 1    | 0    | 0    | 1    |\n| 0    | 1    | 0    | 0    | 1    |\n\n然后就是我们推出来的式子的真值表，这里因为数据太多了，所以直接采用代码算了，代码贴在最下面：\n\n```bash\nArray\n(\n    [0,0,0,0] => 0\n    [1,0,0,0] => 0\n    [0,1,0,0] => 1 // \n    [1,1,0,0] => 1 //\n    [0,0,1,0] => 0\n    [1,0,1,0] => 0\n    [0,1,1,0] => 1 //\n    [1,1,1,0] => 1 //\n    [0,0,0,1] => 0\n    [1,0,0,1] => 0\n    [0,1,0,1] => 1 //\n    [1,1,0,1] => 1 //\n    [0,0,1,1] => 0\n    [1,0,1,1] => 0\n    [0,1,1,1] => 0\n    [1,1,1,1] => 0\n)\n```\n\n对比数据后发现结果是一致的。\n\n### 计算采用的代码\n\n```php\n<?php\n\nfunction createDefaultArray($count){\n    $indexes=range('A','Z');\n    $indexes=array_slice($indexes,0,$count);\n    $returnData=[];\n    $count=pow(2,$count);\n    for ($line=0;$line<$count;$line++){\n        $returnData[$line]=[];\n        $int=decbin($line);\n        $int=strrev($int);\n        foreach ($indexes as $key=>$index){\n            $returnData[$line][$index]=$int[$key] ?? 0;\n        }\n    }\n    return $returnData;\n}\n\nfunction F($map){\n    $returnData=[];\n    foreach ($map as $setting){\n        $result=$setting['B']*(1-$setting['C'])+$setting['B']*(1-$setting['D']);\n        $result<0 && $result=0;\n        $result>1 && $result=1;\n        $returnData[implode(\",\",$setting)]=$result;\n    }\n    return $returnData;\n}\n\nprint_r(F(createDefaultArray(4)));\n```\n\n## 奎因-莫可拉基斯方法\n\n直接上例子吧：\n$$\nF(A,B,C)=ABC+A\\overline{B}C+\\overline{A}BC+\\overline{A}\\overline{B}C+\\overline{A}\\overline{B}\\overline{C}\n$$\n先将式子拆分成下面的形式：\n\n|编号| 式子，就是上面的式子 | 比特串 |\n| ---- | ------ | ---- |\n|1| ABC  | 111    |\n|2| AbC  | 101    |\n|3| aBC  | 011 |\n|4| abC | 001 |\n|5| abc | 000 |\n\n然后如果是A，就是1，如果是a，就是0。B，C也是一样。\n\n然后就是可以开始合并了，合并规则就是**两个比特串中只有1位不同**。\n\n比如在这里，编号为1的`111`和编号2的`101`，就只有中间1位不同，所以可以合并。\n\n然后就是编号为1的`111`和编号3的`011`，又只有第1位不同，所以可以合并。同理，编号2和4，编号3和编号4，编号4和编号5都可以合并。\n\n**合并后消掉的那一位，用-(减号)来表示**。\n\n| 编号 | 数据来源 | 合并后的式子所代表的比特串 |\n| ---- | -------- | -------------------------- |\n| a    | 编号1和2 | 1-1                        |\n| b    | 编号1和3 | -11                        |\n| c    | 编号2和4 | -01                        |\n| d    | 编号3和4 | 0-1                        |\n| e    | 编号4和5 | 00-                        |\n\n然后就是重复上面的步骤，这一步可以看到编号b和编号c可以合并，合并后结果位`--1`。然后`--1`可以和编号a的`1-1`合并，最终结果还是`--1`，接下来还可以和编号d合并，结果位`--1`，所以最终结果只剩下2个：`--1`和`00-`，所以最终的式子就是：\n$$\nF(A,B,C)=C+\\overline{A}\\overline{B}，即\\\\\nF(A,B,C)=ABC+A\\overline{B}C+\\overline{A}BC+\\overline{A}\\overline{B}C+\\overline{A}\\overline{B}\\overline{C}=C+\\overline{A}\\overline{B}\n$$\n然后用上面的代码改造一下验证结果是成立的。\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch13",
    title: "第13章 语言和文法",
    description: "语言、文法与有限状态机",
    icon: "💬",
    lessons: [
      {
        id: "dm-ch13-13-1",
        title: "13.1 语言和文法",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch13-13-1-0",
            type: "text",
            content: "# 13.1 语言和文法\n\n这里刚开始名词有点多，一定要先理解这些名词才能往下看。\n\n我们逐步拆分下面的定义啊：\n\n1. 句子\n2. 名词短语+动词短语\n3. 冠词+形容词+名词+动词+副词 / 冠词+形容词+名词=名词短语，动词+副词=动词短语\n4. the + 形容词+名词+动词+副词 / the 是冠词的其中一种\n5. the + beautiful +名词+动词+副词\n6. the + beautiful+lady+speak+loudly.\n\n然后我们知道，仅仅以英文来说，是由24个英文字母+符号组成的，我们先定义一个概念：`V`，其包含所有组成语言的元素，所谓的句子，就是V中某些元素组成的子集合。\n\n然后我们来看上面的第4句，其中the是否可以替换呢？不可以，因为the已经占了冠词的位置，那么`形容词`可以替换吗？可以，替换成一个真正的形容词，比如下面的`beautiful`就是替换后的结果。对于句子中能替换的元素，我们称为**非终结符**，记做`N`，不可以替换的，称为**终结符**，记做`T`。\n\n然后如果有多个句子，我们如何标记一个句子的开头和结尾呢？为什么是开头而不是标记结尾呢？因为结尾符号太多了呀：感叹号，句号，问号，冒号等，所以标记一个句子的开头反而简单嘛，一个句子的开头符号我们记为`S`。\n\n然后就是产生式：`P`，啥叫产生式呢？就是在上面中，我们说`the`可以替换掉`冠词`，就是一种替换规则，我们定义了\n$$\nthe \\rightarrow 冠词\n$$\n再来就是定义派生的概念了，就是逐渐的用产生式来产生新的句子，比如我们从上面1派生出了2，再由2派生出了3等。\n\n估计概念有点多，直接来一个例子：\n$$\n设 G=\\{V,T,S,P\\},V=\\{a,b,A,B,S\\},T=\\{a,b\\},P=\\{S \\rightarrow ABa,A \\rightarrow BB,B \\rightarrow ab,AB \\rightarrow b \\} \\\\\n根据上面的定义，我们可以由字符串 AB \\rightarrow BBB，因为 A \\rightarrow BB。同理，AB \\rightarrow b。\\\\\n所有这些由S开始派生的，最终派生的由终结符构成的集合（即不可再派生）记做：L(G)\n$$\n比如上面的例子中：\n\n![image-20210308221516058](https://tva1.sinaimg.cn/large/008eGmZEgy1gocuv4xp7fj30eu03awei.jpg)\n\n然后我们就可以知道：`L(G)={abababa,ba}`。\n\n下面的就更加玄乎了，但是我打算这样来讲：\n\n### 1型文法 / 上下文有关文法\n\n![image-20210308230020727](https://tva1.sinaimg.cn/large/008eGmZEgy1gocw644tezj30pz089gmg.jpg)\n\n这种就是在上下文环境中，非终结符进行派生，也可以说非终结符被终结符包围。\n\n### 2型文法 / 上下文无关文法\n\n![image-20210308230244080](https://tva1.sinaimg.cn/large/008eGmZEgy1gocw8po0oej30r00bn3zu.jpg)\n\n这种不需要管上下文，就是将非终结符进行派生，且派生后的字符串无法再派生。\n\n### 3型文法 / 正则文法\n\n![image-20210308231016897](https://tva1.sinaimg.cn/large/008eGmZEgy1gocwgggpo4j30qz0blwfr.jpg)\n\n这个就是非终结符进行派生，派生后的结果中，还有非终结符，可以继续进行派生。\n\n### 0型文法\n\n没有任何限制，不过这个暂时也不用管。\n\n---\n\n然后在上面的文法中，如果派生之后的字符串长度小于大于等于派生前的长度，则称该文法为**非缔约的**，或者是**单调的**。\n\n## 派生树\n\n[树的基础知识见这里](https://blog.csdn.net/YQXLLWY/article/details/113820054)\n\n所谓派生树其实很简单，就是树的内点都是非终结符，树叶都是终结符：\n\n![image-20210308232128208](https://tva1.sinaimg.cn/large/008eGmZEgy1gocws3cuqbj30bi09djro.jpg)\n\n比如一开始举的例子。\n\n\n\n\n\n\n\n"
          }
        ]
      },
      {
        id: "dm-ch13-13-2",
        title: "13.2 带输出的有限状态机",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch13-13-2-0",
            type: "text",
            content: "# 13.2 带输出的有限状态机\n\n"
          }
        ]
      }
    ]
  },
  {
    id: "dm-ch14",
    title: "补充专题",
    description: "LaTeX 笔记与专题讨论",
    icon: "📌",
    lessons: [
      {
        id: "dm-ch14-latex-2",
        title: "常用LaTex 2",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch14-latex-2-0",
            type: "text",
            content: "\\in\n$$\n\\in\n$$\n\\subseteq\n$$\n\\subseteq\n$$\n\\emptyset\n$$\n\\emptyset\n$$\n\\left\\vert 值 \\right\\vert：基数\n$$\n\\left\\vert 值 \\right\\vert\n$$\n\\mathcal{P}(X)：幂集\n$$\n\\mathcal{P}(X)\n$$\n\\cup：并集\n$$\n\\cup\n$$\n\n\n\\cap：交集\n$$\n\\cap\n$$\n\\mid：竖线\n$$\n\\mid\n$$\n\\overline{差集} \n$$\n\\overline{差集}\n$$\n\\dots 底层位置的三个点\n$$\n\\dots\n$$\n\n\n\\cdots 中间位置的三个点\n$$\n\\cdots\n$$\n\\cdot 一个点\n$$\n\\cdot\n$$\n\\vdots\n$$\n\\vdots\n$$\n\\bullet 一个大点\n$$\n\\bullet\n$$\n\\circ 空心的圆点\n$$\n\\circ\n$$\n\n\n多列\n\n```\n\\begin{gathered}\nn \\\\\n\\bigcup \\\\\ni=0\n\\end{gathered}\n{A}_{i}\n```\n\n$$\n\\begin{gathered}\nn \\\\\n\\bigcup \\\\\ni=0\n\\end{gathered}\n{A}_{i}\n$$\n\n\\sum^{上标}_{小标}\n$$\n\\sum^{上标}_{下标}\n$$\n{\\aleph}_{0} 阿里夫零\n$$\n{\\aleph}_{0}\n$$\n矩阵\n\n```\n\\begin{vmatrix}\n1&2&3\\\\\n4&5&6\\\\ \n7&8&9\n\\end{vmatrix} \n```\n\n$$\n\\begin{vmatrix}1&2&3\\\\ 4&5&6\\\\ 7&8&9\\end{vmatrix} \n$$\n\n\\delta 克罗内克积\n$$\n\\delta\n$$\n\n下总结 \\underbrace{上面的内容}_{下面的内容}\n$$\n\\underbrace{上面的内容}_{下面的内容}\n$$\n\n\\Omaga：欧米伽\n$$\n\\Omega\n$$\n\\Theta：西塔\n$$\n\\Theta\n$$\n"
          }
        ]
      },
      {
        id: "dm-ch14-latex",
        title: "常用LaTex",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch14-latex-0",
            type: "text",
            content: "\\wedge\n$$\n\\wedge\n$$\n\\vee\n$$\n\\vee\n$$\n\\neg\n$$\n\\neg\n$$\n\\equiv\n$$\n\\equiv\n$$\n\\Leftrightarrow\n$$\n\\Leftrightarrow\n$$\n\\forall\n$$\n\\forall\n$$\n\\exists\n$$\n\\exists\n$$\n\n\\rightarow\n$$\n\\rightarrow\n$$\n\n\\oplus\n$$\n\\oplus\n$$\n\\textbf{T}\n$$\n\\textbf{T}\n$$\n{内容}_{下标}\n$$\n{内容}_{下标}\n$$\n{内容}^{上标}\n$$\n{内容}^{上标}\n$$\n\\therefore\n$$\n\\therefore\n$$\n\\frac{上面}{下面}\n$$\n\\frac{上面}{下面}\n$$\n\\tag{打tag}\n$$\n\\tag{打tag}\n$$\n多行公式设置对齐方式\n\n```latex\n\\begin{eqnarray*}\nx^n+y^n &=& z^n \\tag{1.4} \\\\\nx+y &=& z \\tag{1.5}\n\\end{eqnarray*}\n```\n\n$$\n\\begin{eqnarray*}\nx^n+y^n &=& z^n \\tag{1.4} \\\\\nx+y &=& z \\tag{1.5}\n\\end{eqnarray*}\n$$\n\n列举\n\n```la\n\\begin{cases}\n\\end{cases}\n```\n\n$$\n\\begin{cases}\n\\end{cases}\n$$\n\n"
          }
        ]
      },
      {
        id: "dm-ch14-latex3",
        title: "常用LaTex3",
        has3D: false,
        blocks: [
          {
            id: "block-dm-ch14-latex3-0",
            type: "text",
            content: "\\sqrt{开根号}\n$$\n\\sqrt{开根号}\n$$\n\n\\binom{上面}{下面} \n$$\n\\binom{上面}{下面} \n$$\n"
          }
        ]
      }
    ]
  }
];
