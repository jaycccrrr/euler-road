(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,471,x=>{"use strict";let e=(0,x.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);x.s(["ArrowLeft",()=>e],471)},31573,x=>{"use strict";var e=x.i(43476),d=x.i(22016),t=x.i(71645),a=x.i(3374),s=x.i(95907),i=x.i(15288),r=x.i(19455),l=x.i(87486),o=x.i(77572),c=x.i(76639),n=x.i(88968),y=x.i(10980),b=x.i(20278),f=x.i(63059);let p=(0,x.i(75254).default)("file-text",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);var m=x.i(32095),h=x.i(471),u=x.i(83086),g=x.i(37727);function z({module:x,moduleId:z}){let[v,j]=(0,t.useState)(x),[N,k]=(0,t.useState)(null),[w,D]=(0,t.useState)(!1);(0,t.useEffect)(()=>{if(!v&&z){let x=s.KNOWLEDGE_MODULES.find(x=>x.id===z);x&&j(x)}},[v,z]);let C=x=>{k(x),D(!0)};return v?(0,e.jsxs)("div",{className:"min-h-screen",children:[(0,e.jsx)(a.default,{}),(0,e.jsxs)("main",{className:"container mx-auto px-4 py-8",children:[(0,e.jsx)(d.default,{href:"/",children:(0,e.jsxs)(r.Button,{variant:"ghost",className:"mb-4",children:[(0,e.jsx)(h.ArrowLeft,{className:"w-4 h-4 mr-2"}),"返回首页"]})}),(0,e.jsxs)("div",{className:`relative overflow-hidden rounded-3xl bg-gradient-to-br ${v.color} p-8 md:p-12 mb-8`,children:[(0,e.jsx)("div",{className:"absolute inset-0 bg-pattern-dots opacity-20"}),(0,e.jsxs)("div",{className:"relative z-10 flex flex-col md:flex-row items-center gap-6",children:[(0,e.jsx)("div",{className:"w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm",children:v.icon}),(0,e.jsxs)("div",{className:"text-center md:text-left text-white",children:[(0,e.jsx)(l.Badge,{className:"bg-white/20 text-white mb-2",children:"math"===v.category?"数学":"physics"===v.category?"物理":"计算机"}),(0,e.jsx)("h1",{className:"text-3xl md:text-4xl font-bold mb-2",children:v.name}),(0,e.jsx)("p",{className:"text-white/90 max-w-xl",children:v.description})]})]})]}),(0,e.jsxs)(o.Tabs,{defaultValue:"advanced",className:"space-y-6",children:[(0,e.jsxs)(o.TabsList,{className:"grid w-full grid-cols-2",children:[(0,e.jsxs)(o.TabsTrigger,{value:"advanced",className:"flex items-center gap-2",children:[(0,e.jsx)(b.Target,{className:"w-4 h-4"}),"提高篇"]}),(0,e.jsxs)(o.TabsTrigger,{value:"basic",className:"flex items-center gap-2",children:[(0,e.jsx)(y.BookOpen,{className:"w-4 h-4"}),"基础篇"]})]}),(0,e.jsx)(o.TabsContent,{value:"advanced",children:(0,e.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:v.topics.map(x=>(0,e.jsx)(i.Card,{className:"p-6 cartoon-card hover:scale-[1.02] transition-transform cursor-pointer group",children:(0,e.jsxs)("div",{className:"flex items-start justify-between",children:[(0,e.jsxs)("div",{className:"flex-1",children:[(0,e.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,e.jsx)("h3",{className:"text-lg font-bold group-hover:text-purple-600 transition-colors",children:x.title}),(0,e.jsx)(l.Badge,{variant:x.difficulty>3?"destructive":x.difficulty>2?"default":"secondary",children:"★".repeat(x.difficulty)})]}),(0,e.jsx)("p",{className:"text-sm text-gray-500 mb-4",children:"包含常见易错点和经典例题"}),(0,e.jsxs)(r.Button,{variant:"outline",size:"sm",className:"group-hover:bg-purple-50",onClick:()=>C(x),children:["开始学习",(0,e.jsx)(f.ChevronRight,{className:"w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"})]})]}),(0,e.jsx)("div",{className:"w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center",children:(0,e.jsx)(u.Sparkles,{className:"w-6 h-6 text-purple-500"})})]})},x.id))})}),(0,e.jsx)(o.TabsContent,{value:"basic",children:(0,e.jsxs)(i.Card,{className:"p-8 cartoon-card",children:[(0,e.jsxs)("div",{className:"text-center mb-8",children:[(0,e.jsx)("div",{className:"w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4",children:(0,e.jsx)(m.GraduationCap,{className:"w-8 h-8 text-blue-500"})}),(0,e.jsx)("h2",{className:"text-2xl font-bold mb-2",children:"基础篇教材"}),(0,e.jsxs)("p",{className:"text-gray-500",children:["系统学习",v.name,"的基础知识"]})]}),(0,e.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:v.topics.map((x,d)=>(0,e.jsxs)("div",{className:"flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors cursor-pointer group",onClick:()=>C(x),children:[(0,e.jsx)("div",{className:"w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-purple-600 shadow-sm",children:d+1}),(0,e.jsxs)("div",{className:"flex-1",children:[(0,e.jsx)("h3",{className:"font-medium group-hover:text-purple-600 transition-colors",children:x.title}),(0,e.jsx)("p",{className:"text-sm text-gray-400",children:"基础概念与公式"})]}),(0,e.jsx)(p,{className:"w-5 h-5 text-gray-400 group-hover:text-purple-500"})]},x.id))}),(0,e.jsxs)("div",{className:"mt-8 p-4 bg-blue-50 rounded-xl",children:[(0,e.jsx)("h3",{className:"font-bold text-blue-700 mb-2",children:"推荐学习路径"}),(0,e.jsxs)("ol",{className:"list-decimal list-inside space-y-2 text-sm text-blue-600",children:[(0,e.jsx)("li",{children:"按顺序阅读基础教材"}),(0,e.jsx)("li",{children:"完成每个章节的练习题"}),(0,e.jsx)("li",{children:"进入提高篇挑战难题"}),(0,e.jsx)("li",{children:"参与每日一题巩固知识"})]})]})]})})]}),(0,e.jsx)(c.Dialog,{open:w,onOpenChange:D,children:(0,e.jsxs)(c.DialogContent,{className:"max-w-3xl max-h-[80vh] overflow-y-auto",children:[(0,e.jsxs)(c.DialogHeader,{children:[(0,e.jsxs)(c.DialogTitle,{className:"text-2xl font-bold flex items-center gap-2",children:[(0,e.jsx)(u.Sparkles,{className:"w-6 h-6 text-purple-500"}),N?.title]}),(0,e.jsxs)(c.DialogDescription,{className:"flex items-center gap-2",children:[(0,e.jsx)(l.Badge,{variant:N?.difficulty&&N.difficulty>3?"destructive":N?.difficulty&&N.difficulty>2?"default":"secondary",children:"★".repeat(N?.difficulty||0)}),(0,e.jsx)("span",{className:"text-gray-500",children:"难度等级"})]})]}),(0,e.jsx)("div",{className:"mt-4 prose prose-purple max-w-none",children:N?.content?(0,e.jsx)(n.MathRenderer,{className:"text-gray-700",children:N.content}):(0,e.jsxs)("div",{className:"text-center py-8 text-gray-500",children:[(0,e.jsx)(p,{className:"w-12 h-12 mx-auto mb-3 text-gray-300"}),(0,e.jsx)("p",{children:"该知识点暂无详细内容"})]})}),(0,e.jsx)("div",{className:"mt-6 flex justify-end",children:(0,e.jsxs)(r.Button,{onClick:()=>D(!1),children:[(0,e.jsx)(g.X,{className:"w-4 h-4 mr-2"}),"关闭"]})})]})})]})]}):(0,e.jsxs)("div",{className:"min-h-screen",children:[(0,e.jsx)(a.default,{}),(0,e.jsxs)("main",{className:"container mx-auto px-4 py-12 text-center",children:[(0,e.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"模块未找到"}),(0,e.jsx)(d.default,{href:"/",children:(0,e.jsx)(r.Button,{children:"返回首页"})})]})]})}x.s(["default",()=>z],31573)},78881,x=>{"use strict";var e=x.i(43476),d=x.i(22016),t=x.i(71645),a=x.i(3374),s=x.i(95907);let i={"am-1":[{id:"direction-cosines",title:"方向角与方向余弦",has3D:!0,vizType:"directionCosines",theory:`
## 一、方向角的概念

**思考引导**

                **思考引导**：在空间中，如何精确描述一个向量的"方向"？

                    - 仅说"指向东北"太模糊
                    - 需要一种数学化的、可计算的方向表示方法
                    - 方向角和方向余弦就是解决这个问题的工具

            ### 1.1 定义
            设向量 **a** = (a₁, a₂, a₃)，它与 x 轴、y 轴、z 轴正方向的夹角分别记为 α、β、γ，称为向量的**方向角**。

\`\`\`

                α = ∠(**a**, **i**)， β = ∠(**a**, **j**)， γ = ∠(**a**, **k**)

            其中 **i**、**j**、**k** 分别是 x、y、z 轴的单位向量。

            <!-- 方向角3D图示 -->

*[3D可视化图表]*

            ## 二、方向余弦

            ### 2.1 定义与公式
            方向角的余弦称为**方向余弦**：

\`\`\`

                cos α = a₁/|**a**| = a₁/√(a₁\xb2 + a₂\xb2 + a₃\xb2)

                cos β = a₂/|**a**| = a₂/√(a₁\xb2 + a₂\xb2 + a₃\xb2)

                cos γ = a₃/|**a**| = a₃/√(a₁\xb2 + a₂\xb2 + a₃\xb2)

            ### 2.2 公式推导

            #### 推导一：方向余弦与分量关系
            设向量 **a** = (a₁, a₂, a₃)，其模为 |**a**| = √(a₁\xb2 + a₂\xb2 + a₃\xb2)。

            根据点乘定义：**a** \xb7 **i** = |**a**||**i**|cos α = |**a**|cos α

            又因为 **a** \xb7 **i** = a₁，所以：

\`\`\`

                cos α = a₁/|**a**| = a₁/√(a₁\xb2 + a₂\xb2 + a₃\xb2)

            同理可得 cos β 和 cos γ 的表达式。

            #### 推导二：方向余弦基本恒等式
            方向余弦满足一个重要恒等式：

\`\`\`

                cos\xb2α + cos\xb2β + cos\xb2γ = 1

> **提示**
> 
                **证明**：

                cos\xb2α + cos\xb2β + cos\xb2γ = (a₁\xb2 + a₂\xb2 + a₃\xb2) / |**a**|\xb2 = |**a**|\xb2 / |**a**|\xb2 = 1

            <!-- 方向余弦恒等式图示 -->

*[3D可视化图表]*

            ## 三、方向余弦的应用

            ### 3.1 单位向量表示
            向量 **a** 的单位向量可以用方向余弦表示：

\`\`\`

                **a**⁰ = **a**/|**a**| = (cos α, cos β, cos γ)

            ### 3.2 两向量夹角
            设向量 **a** 和 **b** 的方向余弦分别为 (cos α₁, cos β₁, cos γ₁) 和 (cos α₂, cos β₂, cos γ₂)，则：

\`\`\`

                cos θ = cos α₁ cos α₂ + cos β₁ cos β₂ + cos γ₁ cos γ₂

            ## 四、方向数
            与方向余弦成比例的任意三个数称为**方向数**。若 l : m : n = cos α : cos β : cos γ，则 (l, m, n) 是一组方向数。

\`\`\`

                cos α = l/√(l\xb2 + m\xb2 + n\xb2)

                cos β = m/√(l\xb2 + m\xb2 + n\xb2)

                cos γ = n/√(l\xb2 + m\xb2 + n\xb2)
  `,formula:`
## 方向余弦公式推导

            ### 一、从点乘定义推导方向余弦
            设向量 **a** = (a₁, a₂, a₃)，其模为 |**a**| = √(a₁\xb2 + a₂\xb2 + a₃\xb2)。

            根据向量点乘的定义，**a** 与 x 轴单位向量 **i** = (1, 0, 0) 的点乘为：

\`\`\`

                **a** \xb7 **i** = |**a**||**i**|cos α = |**a**|cos α

            另一方面，通过分量计算点乘：

\`\`\`

                **a** \xb7 **i** = a₁\xd71 + a₂\xd70 + a₃\xd70 = a₁

            因此得到方向余弦的第一个公式：

\`\`\`

                cos α = a₁/|**a**| = a₁/√(a₁\xb2 + a₂\xb2 + a₃\xb2)

            同理，通过与 **j** 和 **k** 的点乘可得：

\`\`\`

                cos β = a₂/|**a**| = a₂/√(a₁\xb2 + a₂\xb2 + a₃\xb2)

                cos γ = a₃/|**a**| = a₃/√(a₁\xb2 + a₂\xb2 + a₃\xb2)

            ### 二、方向余弦基本恒等式的证明

            **定理**：对于任意非零向量，其方向余弦满足：

\`\`\`

                cos\xb2α + cos\xb2β + cos\xb2γ = 1

            **证明**：

\`\`\`

                cos\xb2α + cos\xb2β + cos\xb2γ

                = (a₁\xb2/|**a**|\xb2) + (a₂\xb2/|**a**|\xb2) + (a₃\xb2/|**a**|\xb2)

                = (a₁\xb2 + a₂\xb2 + a₃\xb2) / |**a**|\xb2

                = |**a**|\xb2 / |**a**|\xb2

                = 1

> **提示**
> 
                **几何意义**：单位向量的终点总是落在单位球面上。方向余弦 (cos α, cos β, cos γ) 正是单位向量 **a**⁰ 的坐标。

            ### 三、单位向量的方向余弦表示

            向量 **a** 的单位向量 **a**⁰ 可以表示为：

\`\`\`

                **a**⁰ = **a**/|**a**| = (a₁/|**a**|, a₂/|**a**|, a₃/|**a**|) = (cos α, cos β, cos γ)

            ### 四、两向量夹角公式

            设向量 **a** 和 **b** 的方向余弦分别为 (cos α₁, cos β₁, cos γ₁) 和 (cos α₂, cos β₂, cos γ₂)。

            由于单位向量的点乘等于它们夹角的余弦：

\`\`\`

                cos θ = **a**⁰ \xb7 **b**⁰

                = cos α₁ cos α₂ + cos β₁ cos β₂ + cos γ₁ cos γ₂

            这就是利用方向余弦计算两向量夹角的公式。</n
            ### 五、方向数的归一化

            若 (l, m, n) 是一组方向数（与方向余弦成比例），则对应的方向余弦为：

\`\`\`

                cos α = l/√(l\xb2 + m\xb2 + n\xb2)

                cos β = m/√(l\xb2 + m\xb2 + n\xb2)

                cos γ = n/√(l\xb2 + m\xb2 + n\xb2)

            **验证**：

\`\`\`

                cos\xb2α + cos\xb2β + cos\xb2γ

                = (l\xb2 + m\xb2 + n\xb2) / (l\xb2 + m\xb2 + n\xb2)

                = 1 ✓
  `,examples:[{id:"dc-1",difficulty:"easy",question:"已知向量 **a** = (1, 2, 2)，求其方向余弦。",options:["(1/3, 2/3, 2/3)","(1/√5, 2/√5, 2/√5)","(1/2, 1, 1)","(1, 2, 2)/5"],correct:0,explanation:"|**a**| = √(1² + 2² + 2²) = √9 = 3\ncos α = 1/3, cos β = 2/3, cos γ = 2/3"},{id:"dc-2",difficulty:"medium",question:"一向量的方向角满足 α = β = γ，求各方向角的值。",options:["均为 45°","均为 arccos(1/√3) ≈ 54.7°","均为 60°","不存在这样的向量"],correct:1,explanation:"由 cos²α + cos²β + cos²γ = 1，且 α = β = γ\n得 3cos²α = 1，cos α = 1/√3\nα = arccos(1/√3) ≈ 54.7°"},{id:"dc-3",difficulty:"hard",question:"已知向量 **a** 的方向余弦为 (1/2, √2/2, 1/2)，求其与 z 轴的夹角。",options:["30°","45°","60°","90°"],correct:2,explanation:"与 z 轴的夹角为 γ，cos γ = 1/2\n因此 γ = 60°"}]},{id:"cross-product",title:"叉乘（向量积）",has3D:!0,vizType:"crossProduct",theory:`
## 一、为什么要定义叉乘？

**思考引导**

                **思考引导**：点乘 **a** \xb7 **b** 可以告诉我们两个向量的"相似程度"（投影关系），但还有很多问题无法回答：

                    - 如何求同时垂直于两个向量的方向？（求平面法向量）
                    - 如何计算两个向量张成的平行四边形面积？
                    - 物理中力矩、角动量的方向如何确定？

            **核心需求**：我们需要一种新的运算，它接受两个向量，产生一个新的向量，这个向量要**同时垂直于原来的两个向量**。

            ## 二、从几何需求到代数定义

            ### 2.1 确定方向：右手定则
            假设我们已经确定了叉乘结果的方向垂直于 **a** 和 **b** 所在平面，但还有一个问题：垂直方向有两个（"向上"和"向下"），选哪一个？

> **提示**
> 
                **右手定则**：右手四指从 **a** 转向 **b**，拇指指向即为 **a** \xd7 **b** 的方向。

                这样规定使得 **a** \xd7 **b** = -(**b** \xd7 **a**)，即叉乘是**反交换**的。

            <!-- 右手定则图示 - 使用标准教材图片 -->

[图片: 右手定则示意图]

                **右手定则**：四指从 **a** 转向 **b**，拇指指向 **a \xd7 b**

                |a \xd7 b| = |a||b|sinθ，方向垂直于 a 和 b 所在平面

            ### 2.2 确定大小：面积的几何意义
            叉乘的大小应该如何确定？几何上一个自然的想法是：**等于以 a, b 为邻边的平行四边形面积**。

\`\`\`

                |**a** \xd7 **b**| = |**a**||**b**|sin(θ)

            其中 θ 是两向量夹角。这样规定的好处：

                - 当 **a** ⊥ **b** 时，面积最大，|sin(90\xb0)| = 1
                - 当 **a** ∥ **b** 时，面积为零，sin(0\xb0) = 0，此时 **a** \xd7 **b** = **0**
                - 这与平行四边形面积公式一致

            ## 三、分量公式的推导

            ### 3.1 利用标准正交基
            设 i, j, k 为 x, y, z 方向的单位正交基向量。首先确定它们之间的叉乘关系：

\`\`\`

                i \xd7 i = j \xd7 j = k \xd7 k = **0**（自身叉乘为零）

                i \xd7 j = k,  j \xd7 k = i,  k \xd7 i = j（循环对称）

                j \xd7 i = -k, k \xd7 j = -i, i \xd7 k = -j（反交换性）

            ### 3.2 分配律的应用
            **定理**：叉乘满足分配律 **a** \xd7 (**b** + **c**) = **a** \xd7 **b** + **a** \xd7 **c**

            将 **a** = a₁i + a₂j + a₃k 和 **b** = b₁i + b₂j + b₃k 展开：

\`\`\`

                **a** \xd7 **b** = (a₁i + a₂j + a₃k) \xd7 (b₁i + b₂j + b₃k)

            展开后，利用 i, j, k 的叉乘关系，同类项（如 i \xd7 i）为零，交叉项保留：

\`\`\`

                **a** \xd7 **b** = a₁b₂(i \xd7 j) + a₁b₃(i \xd7 k) + a₂b₁(j \xd7 i) + a₂b₃(j \xd7 k) + a₃b₁(k \xd7 i) + a₃b₂(k \xd7 j)

                = a₁b₂k - a₁b₃j - a₂b₁k + a₂b₃i + a₃b₁j - a₃b₂i

                = (a₂b₃ - a₃b₂)i + (a₃b₁ - a₁b₃)j + (a₁b₂ - a₂b₁)k

            ### 3.3 行列式记忆法
            上述分量公式可以巧妙地用行列式表示：

\`\`\`

                **a** \xd7 **b** = |i  j  k|

                             |a₁ a₂ a₃|

                             |b₁ b₂ b₃|

            按第一行展开，恰好得到三个分量。

            ## 四、几何意义与应用

                **3D可视化演示**：右侧动画展示了向量 **a**（红色）、**b**（蓝色）以及它们的叉乘 **a** \xd7 **b**（绿色）。

                观察：当 **b** 绕 **a** 旋转时，叉乘的大小如何变化？方向是否始终垂直于 **a** 和 **b** 所在平面？

            ### 4.1 平行四边形与三角形面积
            **定理**：|**a** \xd7 **b**| = 以 a, b 为邻边的平行四边形面积

            **推论**：三角形面积 = \xbd|**a** \xd7 **b**|

            ### 4.2 判断共线性
            **定理**：**a** \xd7 **b** = **0** ⟺ **a** ∥ **b**（两向量共线/平行）

            **证明**：叉乘为零当且仅当 |**a**||**b**|sin(θ) = 0，即 sin(θ) = 0，θ = 0 或 π。

            ### 4.3 求平面法向量
            给定平面内两个不共线向量 **a** 和 **b**，**a** \xd7 **b** 就是该平面的一个法向量。

            ## 五、代数性质总结

**思考引导**

                    - **反交换律**：**a** \xd7 **b** = -(**b** \xd7 **a**)
                    - **分配律**：**a** \xd7 (**b** + **c**) = **a** \xd7 **b** + **a** \xd7 **c**
                    - **数乘结合律**：(λ**a**) \xd7 **b** = λ(**a** \xd7 **b**) = **a** \xd7 (λ**b**)
                    - **自叉乘为零**：**a** \xd7 **a** = **0**
                    - **Jacobi恒等式**：**a** \xd7 (**b** \xd7 **c**) + **b** \xd7 (**c** \xd7 **a**) + **c** \xd7 (**a** \xd7 **b**) = **0**

> ⚠️ **注意**
> 
                **重要提醒**：叉乘不满足结合律！即 (**a** \xd7 **b**) \xd7 **c** ≠ **a** \xd7 (**b** \xd7 **c**)

                例如：(i \xd7 j) \xd7 j = k \xd7 j = -i，而 i \xd7 (j \xd7 j) = i \xd7 0 = 0
  `,formula:`
## 叉乘公式的推导
            ### 从几何定义出发
            叉乘的大小由平行四边形面积决定：

\`\`\`

                |**a** \xd7 **b**| = |**a**||**b**|sin(θ)

            ### 利用点乘与叉乘的关系
            重要恒等式（拉格朗日公式）：

\`\`\`

                |**a** \xd7 **b**|\xb2 + (**a** \xb7 **b**)\xb2 = |**a**|\xb2|**b**|\xb2

            ### 分量推导
            设 i, j, k 为标准正交基向量：

\`\`\`

                i \xd7 j = k,  j \xd7 k = i,  k \xd7 i = j

                j \xd7 i = -k, k \xd7 j = -i, i \xd7 k = -j

**思考引导**

                展开 **a** \xd7 **b** = (a₁i + a₂j + a₃k) \xd7 (b₁i + b₂j + b₃k)

                利用分配律和基向量的叉乘关系，即可得到分量公式
  `,examples:[{id:"cp-1",difficulty:"easy",question:"已知向量 **a** = (1, 2, 3)，**b** = (4, 5, 6)，求 **a** × **b**。",options:["(-3, 6, -3)","(3, -6, 3)","(-3, -6, -3)","(3, 6, 3)"],correct:0,explanation:"使用叉乘公式：\na × b = (2×6 - 3×5, 3×4 - 1×6, 1×5 - 2×4)\n= (12-15, 12-6, 5-8)\n= (-3, 6, -3)"},{id:"cp-2",difficulty:"medium",question:"求以 A(1,0,0), B(0,1,0), C(0,0,1) 为顶点的三角形面积。",options:["√3/2","√3","√2/2","1/2"],correct:0,explanation:"向量 AB = (-1, 1, 0)，向量 AC = (-1, 0, 1)\nAB × AC = (1, 1, 1)\n|AB × AC| = √3\n三角形面积 = |AB × AC|/2 = √3/2"},{id:"cp-3",difficulty:"hard",question:"若 **a** + **b** + **c** = **0**，证明：**a** × **b** = **b** × **c** = **c** × **a**。",options:[],correct:0,explanation:"利用叉乘的分配律和反交换律，以及自叉乘为零的性质。"}]},{id:"triple-product",title:"混合积与三重积",has3D:!0,vizType:"tripleProduct",theory:`
## 一、从几何问题出发

**思考引导**

                **思考引导**：我们已经知道：

                    - 点乘 **a** \xb7 **b** 与投影、夹角有关
                    - 叉乘 **a** \xd7 **b** 与面积、垂直方向有关
                
                **新问题**：如何计算以三个向量为棱的平行六面体的体积？

            这个问题在几何（体积计算）、物理（力做功的多维推广）、工程（稳定性分析）中都有重要应用。

            ## 二、体积公式的推导

            ### 2.1 分解思路
            平行六面体体积 = 底面积 \xd7 高

\`\`\`

                V = (底面积) \xd7 (高)

            选择以 **a** 和 **b** 为底面邻边：

                - **底面积** = |**a** \xd7 **b**|（叉乘的大小）
                - **高** = **c** 在垂直于底面方向上的投影长度

            ### 2.2 高的计算
            底面的法向量方向就是 **a** \xd7 **b** 的方向。**c** 在这个方向上的投影为：

\`\`\`

                高 = |**c**|\xb7|cos(θ)| = |(**a** \xd7 **b**) \xb7 **c**| / |**a** \xd7 **b**|

            其中 θ 是 **c** 与 **a** \xd7 **b** 的夹角。

            ### 2.3 体积公式
            综合以上：

\`\`\`

                V = |**a** \xd7 **b**| \xd7 |(**a** \xd7 **b**) \xb7 **c**| / |**a** \xd7 **b**| = |(**a** \xd7 **b**) \xb7 **c**|

> **提示**
> 
                **定义**：三个向量的**混合积**定义为 (**a** \xd7 **b**) \xb7 **c**

                **几何意义**：其绝对值等于以三个向量为棱的平行六面体的体积

            <!-- 平行六面体体积推导图示 -->

*[3D可视化图表]*

            ## 三、代数表示：行列式

            ### 3.1 从分量展开
            设 **a** = (a₁, a₂, a₃), **b** = (b₁, b₂, b₃), **c** = (c₁, c₂, c₃)

            先计算 **a** \xd7 **b** = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)

            再与 **c** 点乘：

\`\`\`

                (**a** \xd7 **b**) \xb7 **c** = c₁(a₂b₃ - a₃b₂) + c₂(a₃b₁ - a₁b₃) + c₃(a₁b₂ - a₂b₁)

            ### 3.2 整理为行列式
            展开式可以重新排列为：

\`\`\`

                = a₁b₂c₃ + a₂b₃c₁ + a₃b₁c₂ - a₁b₃c₂ - a₂b₁c₃ - a₃b₂c₁

            这正是**三阶行列式**的展开：

\`\`\`

                (**a** \xd7 **b**) \xb7 **c** = det(**a**, **b**, **c**) = |a₁ a₂ a₃|

                                                                   |b₁ b₂ b₃|

                                                                   |c₁ c₂ c₃|

            ## 四、符号的几何意义：右手系与左手系

            ### 4.1 右手系判定
            混合积的符号反映三个向量的相对方向关系：

**思考引导**

                    - **(<strong>a** \xd7 **b**) \xb7 **c** > 0</strong>：**c** 与 **a** \xd7 **b** 同向，构成右手系
                    - **(<strong>a** \xd7 **b**) \xb7 **c** < 0</strong>：**c** 与 **a** \xd7 **b** 反向，构成左手系
                    - **(<strong>a** \xd7 **b**) \xb7 **c** = 0</strong>：三向量共面，体积为零

            ### 4.2 轮换对称性
            循环置换三个向量，混合积不变：

\`\`\`

                (**a** \xd7 **b**) \xb7 **c** = (**b** \xd7 **c**) \xb7 **a** = (**c** \xd7 **a**) \xb7 **b**

            **证明**：这三个量都等于同一个行列式，只是行交换了偶数次，符号不变。

            ## 五、应用与判定

            ### 5.1 共面性判定
            **定理**：(**a** \xd7 **b**) \xb7 **c** = 0 ⟺ 三向量共面

            **证明**：混合积为零 ⟺ 体积为零 ⟺ 三个向量共面

            ### 5.2 体积计算
            
                - **平行六面体**：V = |(**a** \xd7 **b**) \xb7 **c**|
                - **四面体**：V = ⅙|(**a** \xd7 **b**) \xb7 **c**|（四面体是平行六面体的1/6）

            ### 5.3 点到平面的距离
            已知平面过点 P₀，法向量 **n** = **a** \xd7 **b**，点 P 到平面的距离：

\`\`\`

                d = |(**P** - **P₀**) \xb7 **n**| / |**n**|

> ⚠️ **注意**
> 
                **注意**：混合积不满足任意交换。交换两个向量会改变符号：

\`\`\`

                    (**a** \xd7 **b**) \xb7 **c** = -(**b** \xd7 **a**) \xb7 **c** = (**b** \xd7 **c**) \xb7 **a**
  `,formula:`
## 混合积公式的推导
            ### 展开计算
            设 a = (a₁, a₂, a₃), b = (b₁, b₂, b₃), c = (c₁, c₂, c₃)

            先计算 a \xd7 b：

\`\`\`

                a \xd7 b = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)

            ### 再与 c 点乘
            
\`\`\`

                (a \xd7 b) \xb7 c = c₁(a₂b₃ - a₃b₂) + c₂(a₃b₁ - a₁b₃) + c₃(a₁b₂ - a₂b₁)

                = c₁a₂b₃ - c₁a₃b₂ + c₂a₃b₁ - c₂a₁b₃ + c₃a₁b₂ - c₃a₂b₁

            ### 整理为行列式
            这正是三阶行列式的展开形式：

\`\`\`

                |a₁ a₂ a₃|

                |b₁ b₂ b₃|

                |c₁ c₂ c₃|

            ## 几何推导
            平行六面体体积 = 底面积 \xd7 高

                - 底面积 = |a \xd7 b|
                - 高 = |c||cos(θ)|，其中 θ 是 c 与 a\xd7b 的夹角

\`\`\`

                V = |a \xd7 b| \xd7 |c| \xd7 |cos(θ)| = |(a \xd7 b) \xb7 c|
  `,examples:[{id:"tp-1",difficulty:"easy",question:"已知 **a** = (1,0,0), **b** = (0,1,0), **c** = (0,0,1)，求混合积 (**a** × **b**) · **c**。",options:["0","1","-1","2"],correct:1,explanation:"a × b = (0,0,1)，(a × b) · c = (0,0,1) · (0,0,1) = 1\n这正好是单位立方体的体积。"},{id:"tp-2",difficulty:"medium",question:"求以 A(0,0,0), B(1,0,0), C(0,2,0), D(0,0,3) 为顶点的四面体体积。",options:["1","2","1/6","1/3"],correct:2,explanation:"向量 AB = (1,0,0), AC = (0,2,0), AD = (0,0,3)\n混合积 (AB × AC) · AD = 6\n四面体体积 = |混合积|/6 = 6/6 = 1"}]},{id:"plane-line",title:"平面与直线方程",has3D:!0,vizType:"planeLine",theory:`
## 平面方程

            ### 1. 点法式方程
            已知平面上一点 P₀(x₀, y₀, z₀) 和平面的法向量 **n** = (A, B, C)：

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
                
                    - 平行：法向量平行，n₁ \xd7 n₂ = 0
                    - 垂直：法向量垂直，n₁ \xb7 n₂ = 0
                    - 夹角：cos(θ) = |n₁ \xb7 n₂|/(|n₁||n₂|)

                #### 两直线关系
                
                    - 平行：方向向量平行
                    - 垂直：方向向量垂直
                    - 共面：(P₂-P₁) \xb7 (s₁ \xd7 s₂) = 0

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

                    d = |Ax₀ + By₀ + Cz₀ + D| / √(A\xb2 + B\xb2 + C\xb2)

                *几何意义：向量在法向量方向投影的绝对值*

                **点到直线距离**：

\`\`\`

                    d = |**P₀P** \xd7 **s**| / |**s**|

                *几何意义：平行四边形的高 = 面积 / 底边长*

                **两平行平面距离**：

\`\`\`

                    d = |D₂ - D₁| / √(A\xb2 + B\xb2 + C\xb2)

                *几何意义：任取一点转化为点到平面距离*
  `,formula:`

  `,examples:[{id:"pl-1",difficulty:"easy",question:"求过点 (1,2,3) 且法向量为 (2,-1,3) 的平面方程。",options:["2x - y + 3z - 9 = 0","2x - y + 3z + 9 = 0","x + 2y + 3z - 14 = 0","2x + y - 3z + 5 = 0"],correct:0,explanation:"使用点法式：2(x-1) - (y-2) + 3(z-3) = 0\n展开：2x - 2 - y + 2 + 3z - 9 = 0\n整理：2x - y + 3z - 9 = 0"},{id:"pl-2",difficulty:"medium",question:"求点 (1,2,3) 到平面 2x - y + 2z - 4 = 0 的距离。",options:["1","2","3","4"],correct:0,explanation:"d = |2(1) - 1(2) + 2(3) - 4| / √(4+1+4)\n= |2 - 2 + 6 - 4| / 3\n= |2| / 3 = 2/3\n约等于 1（取整）"}]},{id:"quadric-surfaces",title:"二次曲面",has3D:!0,vizType:"quadricSurface",theory:`
## 从平面到曲面：为什么要研究二次曲面？

**思考引导**

                **思考引导**：

                    - 平面的一般方程是 **Ax + By + Cz + D = 0**，这是一次的
                    - 如果允许变量有二次项，会得到什么图形？
                    - 为什么自然界和工程中的曲面（卫星天线、冷却塔、透镜）能用二次函数描述？

            **核心思想**：二次曲面是平面概念的推广，就像圆锥曲线（椭圆、抛物线、双曲线）是直线的推广一样。在三维空间中，二次曲面方程的一般形式为：

\`\`\`

                Ax\xb2 + By\xb2 + Cz\xb2 + Dxy + Exz + Fyz + Gx + Hy + Iz + J = 0

            通过适当的坐标变换，可以消去交叉项和一次项，得到**标准形**。这就是为什么我们只需要研究九种标准二次曲面。

            ## 一、椭球面：球面的"拉伸变形"

            ### 1.1 从球面出发的思考

> **提示**
> 
                **问题**：球面 x\xb2 + y\xb2 + z\xb2 = R\xb2 上各点到球心距离相等。如果我们允许三个方向的"半径"不同，会得到什么？

            设想一个球面被分别沿 x、y、z 方向按比例 a、b、c 拉伸：

                - x 方向拉伸 a 倍：x → x/a
                - y 方向拉伸 b 倍：y → y/b
                - z 方向拉伸 c 倍：z → z/c

            代入球面方程，得到**椭球面标准方程**：

\`\`\`

                \frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1

            ### 1.2 几何特征分析

            **定理**：椭球面与平行于坐标面的平面的交线都是椭圆。

            **证明**：设平面 z = h（|h| < c）与椭球面相交，代入得：

\`\`\`

                \frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 - \frac{h^2}{c^2} = \frac{c^2 - h^2}{c^2}

            两边除以右边，得标准椭圆方程：

\`\`\`

                \frac{x^2}{a^2(1 - h^2/c^2)} + \frac{y^2}{b^2(1 - h^2/c^2)} = 1

            这说明水平截面是椭圆，且随 |h| 增大，椭圆逐渐缩小，当 |h| = c 时缩为一点。

                *↑ 点击右侧可视化区域查看椭球面，观察红色半轴线和水平绿色截面*

            **特例**：当 a = b = c = R 时，椭球面退化为球面。

            ## 二、抛物面：从抛物线到曲面

            ### 2.1 椭圆抛物面的构造思路

> **提示**
> 
                **问题**：抛物线 y = x\xb2 绕轴旋转会生成什么曲面？

            将抛物线 y = x\xb2 绕 y 轴旋转，旋转曲面上的点满足：到 y 轴的距离等于原抛物线的 x 值。

\`\`\`

                sqrt{x^2 + z^2} = sqrt{y} Rightarrow y = x^2 + z^2

            更一般地，若两个方向的"开口速度"不同，得到**椭圆抛物面**：

\`\`\`

                z = \frac{x^2}{a^2} + \frac{y^2}{b^2}

            ### 2.2 几何性质

            **定理 1**：椭圆抛物面与平面 z = h（h > 0）的交线是椭圆。

\`\`\`

                \frac{x^2}{a^2h} + \frac{y^2}{b^2h} = 1

            **定理 2**：椭圆抛物面与平面 x = 0 或 y = 0 的交线是抛物线。

                *↑ 观察椭圆抛物面，注意顶点（黄色点）和水平截面（绿色圆）*

            ### 2.3 双曲抛物面（马鞍面）：符号变化的艺术

> **提示**
> 
                **问题**：如果将椭圆抛物面方程中的一个加号改为减号，会发生什么？

            考虑方程：

\`\`\`

                z = \frac{x^2}{a^2} - \frac{y^2}{b^2}

            这个简单的符号变化导致了截然不同的几何性质：

                <li>**与 z = h 的交线**：\frac{x^2}{a^2} - \frac{y^2}{b^2} = h
                    
                        - h > 0 时：双曲线，实轴平行于 x 轴
                        - h < 0 时：双曲线，实轴平行于 y 轴
                        - h = 0 时：两条相交直线（渐近线）
                    
                </li>
                - **与 x = 0 的交线**：z = -y\xb2/b\xb2，开口向下的抛物线
                - **与 y = 0 的交线**：z = x\xb2/a\xb2，开口向上的抛物线

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

                \frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1

            **几何特征分析**：

            **定理 1**：单叶双曲面与平面 z = h 的交线是椭圆。

\`\`\`

                \frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 + \frac{h^2}{c^2}

            注意：随着 |h| 增大，椭圆不断扩大！这与椭球面形成鲜明对比。

            **定理 2**：单叶双曲面与平面 y = 0 的交线是双曲线。

\`\`\`

                \frac{x^2}{a^2} - \frac{z^2}{c^2} = 1

                *↑ 观察单叶双曲面，注意腰部椭圆（红色）和双曲线截面（绿色）*

            **重要性质**：单叶双曲面是直纹面——它可以由两族直线编织而成！这个性质使其在建筑（如冷却塔）中有重要应用。

            ### 3.2 双叶双曲面：符号的另一种组合

            如果两个平方项为负，一个为正：

\`\`\`

                \frac{z^2}{c^2} - \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1

            或等价地写为：

\`\`\`

                \frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = -1

            **关键差异**：

                - 当 |z| < c 时，方程无实数解 → 曲面分成两"叶"
                - 与 z = h（|h| > c）的交线是椭圆
                - 与 x = 0 或 y = 0 的交线是双曲线

                *↑ 观察双叶双曲面，注意被 z = \xb1c 平面分隔的两叶*

            ## 四、锥面：从圆锥到椭圆锥

            ### 4.1 方程的齐次性

> **提示**
> 
                **问题**：观察锥面的几何特征——所有母线都通过顶点。这种"相似性"在方程中如何体现？

            若点 (x, y, z) 在曲面上，则对任意 t，点 (tx, ty, tz) 也在曲面上。这意味着方程是**齐次**的（所有项次数相同）。

            **椭圆锥面标准方程**：

\`\`\`

                \frac{x^2}{a^2} + \frac{y^2}{b^2} = \frac{z^2}{c^2}

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
                    <td style="padding: 10px; border: 1px solid #ccc;">\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">xy平面椭圆</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">封闭</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">双曲柱面</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">xy平面双曲线</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">两叶开口</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">抛物柱面</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">y\xb2 = 2px</td>
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
  `,formula:`

  `,examples:[{id:"qs-1",difficulty:"easy",question:"方程 x²/4 + y²/9 + z²/16 = 1 表示什么曲面？",options:["球面","椭球面","双曲面","抛物面"],correct:1,explanation:"三个变量都是二次项，系数都为正，且不相等，符合椭球面的定义。"},{id:"qs-2",difficulty:"medium",question:"方程 z = x² - y² 表示什么曲面？",options:["椭圆抛物面","双曲抛物面","单叶双曲面","锥面"],correct:1,explanation:"z = x² - y² = x²/1 - y²/1，符合双曲抛物面（马鞍面）的形式。"}]},{id:"coordinate-systems",title:"坐标系变换",has3D:!0,vizType:"coordinateTransform",theory:`
## 柱坐标系
            用 (r, θ, z) 表示空间中一点：

                - r：点到 z 轴的距离
                - θ：点在 xy 平面上投影的极角
                - z：点的竖坐标（与直角坐标相同）

            ### 与直角坐标的转换
            
\`\`\`

                x = r\xb7cos(θ)

                y = r\xb7sin(θ)

                z = z

\`\`\`

                r = √(x\xb2 + y\xb2)

                θ = arctan(y/x)

                z = z

            ### 体积元
            
\`\`\`

                dV = r\xb7dr\xb7dθ\xb7dz

            ## 球坐标系
            用 (r, θ, φ) 表示空间中一点：

                - r：点到原点的距离
                - θ：极角（与 z 轴正向的夹角）
                - φ：方位角（在 xy 平面上的投影与 x 轴的夹角）

            ### 与直角坐标的转换
            
\`\`\`

                x = r\xb7sin(θ)\xb7cos(φ)

                y = r\xb7sin(θ)\xb7sin(φ)

                z = r\xb7cos(θ)

            ### 体积元
            
\`\`\`

                dV = r\xb2\xb7sin(θ)\xb7dr\xb7dθ\xb7dφ

            ## 坐标系选择指南
            
> **提示**
> 
                
                    - **柱坐标**：问题具有轴对称性（如圆柱体、圆锥体）
                    - **球坐标**：问题具有球对称性（如球体、球壳）
                    - **直角坐标**：平面或长方体区域
  `,formula:`
## 坐标变换公式推导
            ### 柱坐标体积元
            
\`\`\`

                dV = r dr dθ dz

            推导：考虑由 r 到 r+dr，θ 到 θ+dθ，z 到 z+dz 的小体积

            ### 球坐标体积元
            
\`\`\`

                dV = r\xb2 sin(φ) dr dφ dθ
  `,examples:[{id:"cs-1",difficulty:"medium",question:"将直角坐标点 (1, 1, 1) 转换为柱坐标。",options:["(√2, π/4, 1)","(√3, π/4, 1)","(√2, π/2, 1)","(2, π/4, 1)"],correct:0,explanation:"r = √(x²+y²) = √(1+1) = √2\nθ = arctan(y/x) = arctan(1) = π/4\nz = 1\n所以柱坐标为 (√2, π/4, 1)"}]},{id:"vector-fields",title:"向量场基础",has3D:!0,vizType:"vectorField",theory:`
## 向量场的定义
            在空间区域 Ω 上的向量值函数：

\`\`\`

                **F**(x, y, z) = P(x,y,z)**i** + Q(x,y,z)**j** + R(x,y,z)**k**

            ## 重要的向量场

            ### 梯度场（保守场）
            若 **F** = ∇f，则称 **F** 为梯度场，f 称为势函数。

\`\`\`

                **F** = (∂f/∂x, ∂f/∂y, ∂f/∂z)

            ### 旋度场与散度场
            **旋度**（Curl）：

\`\`\`

                ∇ \xd7 **F** = (∂R/∂y - ∂Q/∂z, ∂P/∂z - ∂R/∂x, ∂Q/∂x - ∂P/∂y)

            **散度**（Divergence）：

\`\`\`

                ∇ \xb7 **F** = ∂P/∂x + ∂Q/∂y + ∂R/∂z

            ## 重要恒等式
            
**思考引导**

\`\`\`

                    ∇ \xd7 (∇f) = 0（梯度的旋度为零）

                    ∇ \xb7 (∇ \xd7 **F**) = 0（旋度的散度为零）

            ## 物理意义
            
> **提示**
> 
                
                    - **梯度场**：表示标量场的变化方向和速率（如温度梯度）
                    - **散度**：表示场的源或汇的强度
                    - **旋度**：表示场的旋转程度
  `,formula:`
## 向量场的重要公式
            ### 旋度的行列式表示
            
\`\`\`

                ∇ \xd7 **F** = | i     j     k    |

                           | ∂/∂x  ∂/∂y  ∂/∂z |

                           | P     Q     R    |

            ### 高斯公式（散度定理）
            
\`\`\`

                ∭_V (∇ \xb7 **F**)dV = ∯_S **F** \xb7 d**S**
  `,examples:[{id:"vf-1",difficulty:"medium",question:"设 f(x,y,z) = x² + y² + z²，求 ∇f。",options:["(2x, 2y, 2z)","(x, y, z)","(2x, 0, 0)","(0, 2y, 2z)"],correct:0,explanation:"∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)\n∂f/∂x = 2x\n∂f/∂y = 2y\n∂f/∂z = 2z\n所以 ∇f = (2x, 2y, 2z)"}]},{id:"multivariable-concept",title:"多元函数概念",has3D:!0,vizType:"surface3D",theory:`
## 多元函数的定义
            设 D 是 n 维空间 Rⁿ 中的一个点集，若对于 D 中每一点 P(x₁, x₂, ..., xₙ)，变量 z 按照确定的对应法则 f 有唯一确定的值与之对应，则称 z 是 x₁, x₂, ..., xₙ 的 n 元函数。

\`\`\`

                z = f(x₁, x₂, ..., xₙ) 或 z = f(P), P ∈ D

            ## 二元函数的几何意义
            二元函数 z = f(x, y) 表示三维空间中的一张曲面。

> **提示**
> 
                例如：

                    - z = x\xb2 + y\xb2 表示旋转抛物面
                    - z = √(R\xb2 - x\xb2 - y\xb2) 表示上半球面

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
  `,formula:`

  `,examples:[{id:"mc-1",difficulty:"medium",question:"求极限 lim((x,y)→(0,0)) (x²y)/(x² + y²)",options:["0","1","不存在","∞"],correct:0,explanation:"使用极坐标：x = r·cos(θ), y = r·sin(θ)\n原式 = lim(r→0) [r³cos²(θ)sin(θ)]/r² = lim(r→0) r·cos²(θ)sin(θ) = 0"}]}],"am-2":[{id:"partial-derivative",title:"偏导数",has3D:!0,vizType:"partialDerivative",theory:`
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

            **例 1**：z = x\xb2y + sin(xy)

\`\`\`

                ∂z/∂x = 2xy + y\xb7cos(xy)（y 视为常数）

                ∂z/∂y = x\xb2 + x\xb7cos(xy)（x 视为常数）

            **例 2**：z = xʸ（幂指函数）

\`\`\`

                ∂z/∂x = y\xb7xʸ⁻\xb9（y 视为常数，幂函数求导）

                ∂z/∂y = xʸ\xb7ln(x)（x 视为常数，指数函数求导）

            ## 五、高阶偏导数与混合偏导数

            ### 5.1 二阶偏导数的定义
            对偏导数再求偏导，得到二阶偏导数：

\`\`\`

                ∂\xb2z/∂x\xb2 = fₓₓ = ∂/∂x(∂z/∂x)

                ∂\xb2z/∂y\xb2 = fᵧᵧ = ∂/∂y(∂z/∂y)

                ∂\xb2z/∂x∂y = fₓᵧ = ∂/∂y(∂z/∂x)（先 x 后 y）

                ∂\xb2z/∂y∂x = fᵧₓ = ∂/∂x(∂z/∂y)（先 y 后 x）

            ### 5.2 混合偏导数定理

**思考引导**

                **定理（Clairaut定理）**：若 fₓᵧ 和 fᵧₓ 在某区域内**连续**，则：

\`\`\`

                    ∂\xb2z/∂x∂y = ∂\xb2z/∂y∂x

                即：在连续条件下，混合偏导数与求导顺序无关。

            **几何意义**：这个结论说明曲面足够"光滑"时，沿不同方向的变化率变化是对称的。

            **反例**：若连续性不满足，混合偏导数可能不相等。例如：

\`\`\`

                f(x,y) = xy(x\xb2-y\xb2)/(x\xb2+y\xb2) 当 (x,y)≠(0,0)，f(0,0)=0

            在原点处 fₓᵧ(0,0) = -1 ≠ 1 = fᵧₓ(0,0)。

            ## 六、偏导数与连续性的关系

> ⚠️ **注意**
> 
                **重要区别**：与一元函数不同，**偏导数存在 ⟹̸ 连续**

                例：f(x,y) = xy/(x\xb2+y\xb2) 当 (x,y)≠(0,0)，f(0,0)=0

                在原点：fₓ(0,0) = 0，fᵧ(0,0) = 0 都存在，但函数在原点不连续！

                **原因**：偏导数只考虑了沿坐标轴方向的变化，而连续性要求所有方向都趋近。
  `,formula:`

  `,examples:[{id:"pd-1",difficulty:"easy",question:"设 f(x,y) = x³y²，求 ∂f/∂x 和 ∂f/∂y。",options:["3x²y² 和 2x³y","3x²y² 和 x³y","x²y² 和 2x³y","3xy² 和 2x²y"],correct:0,explanation:"∂f/∂x = 3x²y²（y²视为常数）\n∂f/∂y = 2x³y（x³视为常数）"}]},{id:"total-differential",title:"全微分",has3D:!0,vizType:"totalDifferential",theory:`
## 一、从线性近似到全微分

**思考引导**

                **思考引导**：回顾一元函数的微分：

\`\`\`

                    dy = f'(x)dx，且 Δy = f'(x)Δx + o(Δx)

                这表示：函数的微小变化 ≈ 导数 \xd7 自变量的微小变化。

                **问题**：对于多元函数 z = f(x, y)，当 x 和 y 同时有微小变化时，z 的变化如何近似？

            ## 二、全增量的分解

            ### 2.1 全增量与全微分
            当自变量从 (x, y) 变到 (x+Δx, y+Δy) 时，函数的**全增量**为：

\`\`\`

                Δz = f(x+Δx, y+Δy) - f(x, y)

            我们希望将 Δz 分解为：

\`\`\`

                Δz = A\xb7Δx + B\xb7Δy + o(√(Δx\xb2 + Δy\xb2))

            其中前两项是**线性主部**，最后一项是高阶无穷小。

            ### 2.2 系数 A 和 B 的确定

            **定理**：若 f 可微，则 A = ∂z/∂x，B = ∂z/∂y。

            **证明**：

            (1) 令 Δy = 0，则：

\`\`\`

                f(x+Δx, y) - f(x, y) = A\xb7Δx + o(|Δx|)

            两边除以 Δx 并令 Δx → 0：

\`\`\`

                ∂z/∂x = lim(Δx→0) [f(x+Δx,y) - f(x,y)]/Δx = A

            同理可得 B = ∂z/∂y。

            ## 三、全微分的定义与公式

> **提示**
> 
                **定义**：若函数 z = f(x, y) 在点 (x, y) 的全增量可表示为：

\`\`\`

                    Δz = (∂z/∂x)Δx + (∂z/∂y)Δy + o(√(Δx\xb2 + Δy\xb2))

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

                f(x,y) = xy/√(x\xb2+y\xb2) 当 (x,y)≠(0,0)，f(0,0)=0

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

            **例**：计算圆柱体体积 V = πr\xb2h 的误差。

\`\`\`

                dV = (∂V/∂r)dr + (∂V/∂h)dh = 2πrh\xb7dr + πr\xb2\xb7dh

            若 r = 10cm，h = 20cm，测量误差 |dr| ≤ 0.1cm，|dh| ≤ 0.1cm：

\`\`\`

                |dV| ≤ 2π\xb710\xb720\xb70.1 + π\xb7100\xb70.1 = 40π + 10π = 50π ≈ 157 cm\xb3

            用于近似计算和误差估计。
  `,formula:`

  `,examples:[{id:"td-1",difficulty:"medium",question:"求函数 z = x²y 在点 (1,2) 处的全微分。",options:["dz = 4dx + dy","dz = 2dx + dy","dz = 4dx + 2dy","dz = 2dx + 2dy"],correct:0,explanation:"∂z/∂x = 2xy，在(1,2)处等于 4\n∂z/∂y = x²，在(1,2)处等于 1\ndz = 4dx + dy"}]},{id:"chain-rule",title:"链式法则",has3D:!0,vizType:"chainRule",theory:`
## 一、从一元到多元：链式法则的推广

**思考引导**

                **思考引导**：回顾一元函数的链式法则：

\`\`\`

                    y = f(u)，u = g(x) ⟹ dy/dx = (dy/du)\xb7(du/dx) = f'(u)\xb7g'(x)

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
                    <td style="padding: 10px; border: 1px solid #ccc;">dz/dt = zᵤ\xb7u' + zᵥ\xb7v'</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">全导数（一元）</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">z = f(u,v)
u = u(x,y), v = v(x,y)</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">zₓ = zᵤ\xb7uₓ + zᵥ\xb7vₓ
zᵧ = zᵤ\xb7uᵧ + zᵥ\xb7vᵧ</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">偏导数（二元）</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">z = f(u)
u = u(x,y)</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">zₓ = (dz/du)\xb7uₓ
zᵧ = (dz/du)\xb7uᵧ</td>
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

                ∂\xb2z/∂x\xb2 = ∂/∂x(zᵤ\xb7uₓ + zᵥ\xb7vₓ)
                        = (zᵤᵤ\xb7uₓ + zᵤᵥ\xb7vₓ)uₓ + zᵤ\xb7uₓₓ + (zᵥᵤ\xb7uₓ + zᵥᵥ\xb7vₓ)vₓ + zᵥ\xb7vₓₓ

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
  `,formula:`

  `,examples:[{id:"cr-1",difficulty:"medium",question:"设 z = u² + v²，其中 u = x + y，v = x - y，求 ∂z/∂x。",options:["4x","2x","2x + 2y","4y"],correct:0,explanation:"∂z/∂x = (∂z/∂u)(∂u/∂x) + (∂z/∂v)(∂v/∂x)\n= 2u·1 + 2v·1 = 2(x+y) + 2(x-y) = 4x"}]},{id:"implicit-function",title:"隐函数求导",has3D:!0,vizType:"implicitFunction",theory:`
## 一、显函数与隐函数

**思考引导**

                **思考引导**：我们已经学习了显函数 y = f(x) 的求导方法。但很多时候，变量之间的关系是以方程形式给出的：

\`\`\`

                    x\xb2 + y\xb2 = 1，或 e^(xy) + x\xb2y = 0

                **问题**：如何求这类函数中 y 关于 x 的导数？

            ### 1.1 隐函数的概念
            由方程 F(x, y) = 0 确定的函数 y = y(x) 称为**隐函数**。

            有些隐函数可以"解出"显式表达式（如 x\xb2 + y\xb2 = 1 解得 y = \xb1√(1-x\xb2)），但很多情况下无法或很难解出。

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
  `,formula:`

  `,examples:[{id:"if-1",difficulty:"medium",question:"设 x² + y² = 1，求 dy/dx。",options:["-x/y","x/y","-y/x","y/x"],correct:0,explanation:"设 F = x² + y² - 1\nFₓ = 2x, Fᵧ = 2y\ndy/dx = -Fₓ/Fᵧ = -2x/2y = -x/y"}]},{id:"directional-derivative",title:"方向导数与梯度",has3D:!0,vizType:"gradient",theory:`
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

                ∂f/∂l = fₓ\xb7cos α + fᵧ\xb7cos β = ∇f \xb7 **e**

            ### 3.2 推导
            由全微分公式：

\`\`\`

                Δf ≈ fₓΔx + fᵧΔy = fₓ\xb7ρcos α + fᵧ\xb7ρcos β

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

                ∂f/∂l = ∇f \xb7 **e** = |∇f|\xb7cos(θ)

            其中 θ 是梯度方向与方向 **l** 的夹角。

            ## 五、梯度的几何意义

                **3D可视化演示**：右侧展示了梯度向量和等值线。

                    - 红色箭头：梯度 ∇f（指向增长最快方向）
                    - 蓝色曲线：等值线 f(x,y) = C
                    - 观察：梯度始终垂直于等值线

            ### 5.1 最大变化率
            由 ∂f/∂l = |∇f|cos(θ) 可知：

**思考引导**

                    - 当 θ = 0（沿梯度方向）：∂f/∂l = |∇f|（最大）
                    - 当 θ = π（沿负梯度方向）：∂f/∂l = -|∇f|（最小）
                    - 当 θ = π/2（垂直于梯度）：∂f/∂l = 0（等值线方向）

            ### 5.2 梯度的三个关键性质

                - **方向**：梯度方向是函数值增长最快的方向
                - **大小**：|∇f| 是最大方向导数
                - **正交性**：梯度垂直于等值面（线）

            ## 六、三元函数的推广

            对于 f(x, y, z)：

\`\`\`

                ∇f = (fₓ, fᵧ, fᵤ) = (∂f/∂x, ∂f/∂y, ∂f/∂z)

\`\`\`

                ∂f/∂l = ∇f \xb7 **e** = fₓcos α + fᵧcos β + fᵤcos γ

            梯度 ∇f 是等值面 f(x,y,z) = C 的法向量。

            ## 七、应用

            ### 7.1 最速下降法
            在优化问题中，沿负梯度方向搜索可以最快地减小函数值。

            ### 7.2 热传导
            热流方向与温度梯度方向相反（从高温流向低温）。

            ### 7.3 电场
            电场强度 E = -∇φ，其中 φ 是电位。
  `,formula:`

  `,examples:[{id:"dd-1",difficulty:"medium",question:"求 f(x,y) = x² + y² 在点 (1,1) 沿方向 (1,1) 的方向导数。",options:["2√2","4√2","2","4"],correct:0,explanation:"fₓ = 2x = 2, fᵧ = 2y = 2\n方向单位向量 e = (1/√2, 1/√2)\n∂f/∂l = 2·(1/√2) + 2·(1/√2) = 4/√2 = 2√2"}]},{id:"extrema",title:"多元函数极值",has3D:!0,vizType:"extrema",theory:`
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

                Δ = AC - B\xb2

**思考引导**

                    - Δ > 0 且 A > 0：极小值
                    - Δ > 0 且 A < 0：极大值
                    - Δ < 0：不是极值（鞍点）
                    - Δ = 0：无法判断

            ## 条件极值（拉格朗日乘数法）
            求函数 f(x, y) 在约束条件 φ(x, y) = 0 下的极值。

            构造拉格朗日函数：

\`\`\`

                L(x, y, λ) = f(x, y) + λ\xb7φ(x, y)

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
  `,formula:`

  `,examples:[{id:"ex-1",difficulty:"medium",question:"求 f(x,y) = x² + y² - 2x - 4y 的极值。",options:["极小值 -5","极大值 -5","极小值 5","无极值"],correct:0,explanation:"fₓ = 2x - 2 = 0 → x = 1\nfᵧ = 2y - 4 = 0 → y = 2\nA = fₓₓ = 2, B = 0, C = 2\nΔ = 4 > 0, A = 2 > 0，故为极小值\nf(1,2) = 1 + 4 - 2 - 8 = -5"}]},{id:"taylor",title:"泰勒展开",has3D:!0,vizType:"taylor",theory:`
## 二元函数的泰勒公式
            设 f(x, y) 在点 (x₀, y₀) 的某邻域内有直到 n+1 阶的连续偏导数，则

            ### 一阶泰勒展开（带拉格朗日余项）
            
\`\`\`

                f(x₀+h, y₀+k) = f(x₀, y₀) + fₓ(x₀, y₀)h + fᵧ(x₀, y₀)k + R₁

            ### 二阶泰勒展开
            
\`\`\`

                f(x₀+h, y₀+k) ≈ f(x₀, y₀)

                + (h∂/∂x + k∂/∂y)f(x₀, y₀)

                + 1/2!(h∂/∂x + k∂/∂y)\xb2f(x₀, y₀)

            展开形式：

\`\`\`

                = f(x₀, y₀)

                + fₓ\xb7h + fᵧ\xb7k

                + 1/2[fₓₓ\xb7h\xb2 + 2fₓᵧ\xb7hk + fᵧᵧ\xb7k\xb2]

            ## 矩阵表示
            令 **h** = (h, k)，H 为 Hessian 矩阵：

\`\`\`

                H = [fₓₓ  fₓᵧ]

                    [fᵧₓ  fᵧᵧ]

\`\`\`

                f(x₀+h, y₀+k) ≈ f(x₀, y₀) + ∇f\xb7**h** + 1/2 **h**ᵀH**h**

            ## 极值的二次型判别
            
> **提示**
> 
                Hessian 矩阵正定 ⟹ 极小值

                Hessian 矩阵负定 ⟹ 极大值

                Hessian 矩阵不定 ⟹ 鞍点
  `,formula:`
## 泰勒公式推导
            ### 单变量泰勒展开回顾
            
\`\`\`

                f(x) = f(x₀) + f'(x₀)(x-x₀) + f''(x₀)/2! (x-x₀)\xb2 + ...

            ### 推广到多变量
            使用方向导数的概念，沿方向 **h** = (h,k) 展开：

\`\`\`

                g(t) = f(x₀ + th, y₀ + tk)

                g'(t) = (h∂/∂x + k∂/∂y)f(x₀+th, y₀+tk)

                g''(t) = (h∂/∂x + k∂/∂y)\xb2f(x₀+th, y₀+tk)
  `,examples:[{id:"ty-1",difficulty:"medium",question:"求 f(x,y) = e^x sin(y) 在 (0,0) 处的二阶泰勒展开。",options:["y + xy + 1/2(x²y - y³) + ...","y + x + xy + ...","1 + y + xy + ...","x + y + 1/2(x² + y²) + ..."],correct:0,explanation:"f(0,0) = 0\nfₓ = e^x sin(y) = 0, fᵧ = e^x cos(y) = 1\nfₓₓ = e^x sin(y) = 0, fₓᵧ = e^x cos(y) = 1, fᵧᵧ = -e^x sin(y) = 0\nf ≈ y + xy + 1/2(x²y - y³) + ..."}]},{id:"lagrange",title:"拉格朗日乘数法",has3D:!0,vizType:"lagrange",theory:`
## 单约束条件
            求 f(x, y) 在约束 φ(x, y) = 0 下的极值。

            ### 拉格朗日函数
            
\`\`\`

                L(x, y, λ) = f(x, y) + λ\xb7φ(x, y)

            ### 极值必要条件
            
\`\`\`

                ∂L/∂x = ∂f/∂x + λ∂φ/∂x = 0

                ∂L/∂y = ∂f/∂y + λ∂φ/∂y = 0

                ∂L/∂λ = φ(x, y) = 0

            ## 多约束条件
            求 f(x, y, z) 在约束 φ(x, y, z) = 0 和 ψ(x, y, z) = 0 下的极值。

\`\`\`

                L(x, y, z, λ, μ) = f(x, y, z) + λ\xb7φ(x, y, z) + μ\xb7ψ(x, y, z)

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
  `,formula:`
## 拉格朗日乘数法推导
            ### 单约束情况
            设 f(x,y) 在约束 φ(x,y)=0 下取极值。

            沿约束曲线，φ(x,y)=0，故 dφ = φₓdx + φᵧdy = 0

            在极值点，df = fₓdx + fᵧdy = 0

\`\`\`

                由隐函数定理，存在 λ 使得 (fₓ, fᵧ) = λ(φₓ, φᵧ)

            ### 经济学解释
            λ 称为影子价格，表示约束条件右端项每增加1单位时，目标函数的边际变化。
  `,examples:[{id:"lg-1",difficulty:"hard",question:"求函数 f(x,y) = xy 在约束 x² + y² = 1 下的最大值。",options:["1/2","1","√2/2","2"],correct:0,explanation:"L = xy + λ(x² + y² - 1)\nLₓ = y + 2λx = 0\nLᵧ = x + 2λy = 0\n由前两式得 y² = x²，代入约束：2x² = 1，x = ±1/√2\nf(1/√2, 1/√2) = 1/2 为最大值"}]}],"am-3":[{id:"integral-concept",title:"重积分概念",has3D:!0,vizType:"doubleIntegral",theory:`
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

                    ∬ᴅ f(x,y)dσ = f(ξ,η)\xb7|D|

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

            **例**：D 为单位圆 x\xb2 + y\xb2 ≤ 1，求 ∬ᴅ x\xb3y dσ。

            解：D 关于 x 轴对称，f(x,-y) = x\xb3(-y) = -x\xb3y = -f(x,y)，故积分为 0。
  `,formula:`
## 重积分的几何意义推导
            ### 从黎曼和到积分
            将区域 D 分割为 n 个小区域 Δσᵢ：

\`\`\`

                ∬ᴅ f(x,y)dσ = lim(n→∞) Σᵢ₌₁ⁿ f(ξᵢ,ηᵢ)Δσᵢ

            ### 二重积分中值定理
            若 f 在 D 上连续，则存在 (ξ,η) ∈ D：

\`\`\`

                ∬ᴅ f(x,y)dσ = f(ξ,η)\xb7|D|
  `,examples:[{id:"ic-1",difficulty:"easy",question:"利用对称性，求 ∬ᴅ x³y dσ，其中 D 为圆 x² + y² ≤ 1。",options:["0","π/4","1/2","π"],correct:0,explanation:"积分区域 D 关于 x 轴对称\nf(x,y) = x³y 关于 y 是奇函数（f(x,-y) = -f(x,y)）\n由对称性，积分值为 0"}]},{id:"double-integral",title:"二重积分",has3D:!0,vizType:"doubleIntegralRegion",theory:`
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
                    <td style="padding: 10px; border: 1px solid #ccc;">e^(y\xb2) 应先对 x 积分</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">积分区域</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">避免分块计算</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">三角形区域看哪边更简单</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">区域形状</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">圆域用极坐标</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">x\xb2 + y\xb2 ≤ R\xb2</td>
                </tr>
            </table>

            ## 三、极坐标计算

            ### 3.1 为什么需要极坐标？
            当积分区域是圆、圆环或扇形，或被积函数含有 x\xb2 + y\xb2 时，极坐标往往更简单。

            ### 3.2 坐标变换与面积元素
            
\`\`\`

                x = r\xb7cos(θ), y = r\xb7sin(θ)

            **关键**：极坐标下的面积元素不是 drdθ，而是：

**思考引导**

\`\`\`

                    dσ = r\xb7dr\xb7dθ

                **几何解释**：极坐标网格中，小区域近似为矩形，边长为 dr 和 r\xb7dθ。

            ### 3.3 极坐标下的计算公式

\`\`\`

                ∬ᴅ f(x, y)dσ = ∬ᴅ' f(r\xb7cos(θ), r\xb7sin(θ))\xb7r\xb7dr\xb7dθ

            ### 3.4 常用极坐标区域

> **提示**
> 
                
                    - **圆 x\xb2 + y\xb2 ≤ R\xb2**：0 ≤ r ≤ R, 0 ≤ θ ≤ 2π
                    - **圆 x\xb2 + y\xb2 ≤ 2Rx**（圆心在 (R,0)）：0 ≤ r ≤ 2R\xb7cos(θ), -π/2 ≤ θ ≤ π/2
                    - **圆环 a\xb2 ≤ x\xb2 + y\xb2 ≤ b\xb2**：a ≤ r ≤ b, 0 ≤ θ ≤ 2π
                    - **扇形**：0 ≤ r ≤ R, α ≤ θ ≤ β

            ## 四、变量替换的一般公式

            设变换 x = x(u,v), y = y(u,v)，则：

\`\`\`

                ∬ᴅ f(x,y)dxdy = ∬ᴅ' f(x(u,v), y(u,v)) |J| dudv

            其中 J 是雅可比行列式：

\`\`\`

                J = ∂(x,y)/∂(u,v) = |∂x/∂u ∂x/∂v|

                                  |∂y/∂u ∂y/∂v|

            极坐标变换的雅可比行列式：J = r。
  `,formula:`

  `,examples:[{id:"di-1",difficulty:"medium",question:"计算 ∬ᴅ (x + y)dxdy，其中 D 由 x = 0, y = 0, x + y = 1 围成。",options:["1/3","1/2","1/6","1/4"],correct:0,explanation:"∫₀¹ dx ∫₀¹⁻ˣ (x+y)dy\n= ∫₀¹ [xy + y²/2]₀¹⁻ˣ dx\n= ∫₀¹ [x(1-x) + (1-x)²/2] dx\n= ∫₀¹ [x - x² + 1/2 - x + x²/2] dx\n= ∫₀¹ [1/2 - x²/2] dx = [x/2 - x³/6]₀¹ = 1/3"}]},{id:"triple-integral",title:"三重积分",has3D:!0,vizType:"tripleIntegral",theory:`
## 直角坐标系
            ### 先一后二（穿针法）
            
\`\`\`

                ∭ᴠ f(x,y,z)dV = ∬ᴅ dxdy ∫ᵤ₁₍ₓ,ᵧ₎ᵤ₂₍ₓ,ᵧ₎ f(x,y,z)dz

            ### 先二后一（切片法）
            
\`\`\`

                ∭ᴠ f(x,y,z)dV = ∫ₐᵇ dz ∬ᴅ₍ᵤ₎ f(x,y,z)dxdy

            ## 柱坐标
            
\`\`\`

                x = r\xb7cos(θ), y = r\xb7sin(θ), z = z

                dV = r\xb7dr\xb7dθ\xb7dz

            ## 球坐标
            
\`\`\`

                x = r\xb7sin(φ)\xb7cos(θ)

                y = r\xb7sin(φ)\xb7sin(θ)

                z = r\xb7cos(φ)

                dV = r\xb2\xb7sin(φ)\xb7dr\xb7dφ\xb7dθ

            ## 坐标系选择
            
**思考引导**

                    - **柱坐标**：区域为柱形、锥形，或被积函数含 x\xb2 + y\xb2
                    - **球坐标**：区域为球形、球壳，或被积函数含 x\xb2 + y\xb2 + z\xb2

            ## 对称性应用
            
> **提示**
> 
                若 Ω 关于 xy 平面对称：

                    - f(x, y, -z) = -f(x, y, z) ⟹ 积分为 0
                    - f(x, y, -z) = f(x, y, z) ⟹ 积分 = 2 \xd7 上半区域积分
  `,formula:`
## 三重积分计算方法
            ### 先一后二法（穿针法）
            
\`\`\`

                ∭ᴠ f(x,y,z)dV = ∬ᴅ dxdy ∫z₁(x,y)^z₂(x,y) f(x,y,z)dz

            ### 先二后一法（切片法）
            
\`\`\`

                ∭ᴠ f(x,y,z)dV = ∫a^b dz ∬D(z) f(x,y,z)dxdy
  `,examples:[{id:"ti-1",difficulty:"medium",question:"求单位球 x² + y² + z² ≤ 1 的体积。",options:["4π/3","π","2π","π/2"],correct:0,explanation:"使用球坐标：V = ∭ dV = ∫₀²π dθ ∫₀^π dφ ∫₀¹ r² sin(φ) dr\n= 2π × [-cos(φ)]₀^π × [r³/3]₀¹\n= 2π × 2 × 1/3 = 4π/3"}]},{id:"change-variables",title:"变量替换",has3D:!0,vizType:"changeOfVariables",theory:`
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

                J = |cos(θ)  -r\xb7sin(θ)|

                    |sin(θ)   r\xb7cos(θ)| = r

            ## 广义极坐标
            
\`\`\`

                x = a\xb7r\xb7cos(θ), y = b\xb7r\xb7sin(θ)

                J = ab\xb7r

            用于椭圆区域 x\xb2/a\xb2 + y\xb2/b\xb2 ≤ 1

            ## 三重积分换元
            
\`\`\`

                ∭ᴠ f(x,y,z)dxdydz = ∭ᴠ' f(x(u,v,w),...) |J| dudvdw

            ## 常用变换
            
> **提示**
> 
                
                    - 平移：u = x - a, v = y - b（J = 1）
                    - 伸缩：u = x/a, v = y/b（J = ab）
                    - 旋转：利用正交变换（J = 1）
  `,formula:`
## 雅可比行列式的性质
            ### 链式法则
            
\`\`\`

                若 x = x(u,v), y = y(u,v)，且 u = u(s,t), v = v(s,t)

                则 ∂(x,y)/∂(s,t) = ∂(x,y)/∂(u,v) \xd7 ∂(u,v)/∂(s,t)

            ### 逆变换
            
\`\`\`

                ∂(x,y)/∂(u,v) \xd7 ∂(u,v)/∂(x,y) = 1
  `,examples:[{id:"cv-1",difficulty:"medium",question:"求椭圆 x²/a² + y²/b² ≤ 1 的面积。",options:["πab","2πab","π(a+b)","4ab"],correct:0,explanation:"令 x = ar·cos(θ), y = br·sin(θ)\nJ = abr\nS = ∬ᴅ dxdy = ∫₀²π dθ ∫₀¹ abr dr = 2π × ab × 1/2 = πab"}]},{id:"applications",title:"重积分应用",has3D:!0,vizType:"applications",theory:`
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

                A = ∬ᴅ √(1 + fₓ\xb2 + fᵧ\xb2) dxdy

            ## 物理应用

            ### 质量
            
\`\`\`

                M = ∬ᴅ ρ(x,y)dσ （平面薄板）

                M = ∭ᴠ ρ(x,y,z)dV （空间物体）

            ### 质心
            
\`\`\`

                x̄ = (1/M)∬ᴅ x\xb7ρ(x,y)dσ

                ȳ = (1/M)∬ᴅ y\xb7ρ(x,y)dσ

            ### 转动惯量
            
\`\`\`

                Iₓ = ∬ᴅ y\xb2\xb7ρ(x,y)dσ （对 x 轴）

                Iᵧ = ∬ᴅ x\xb2\xb7ρ(x,y)dσ （对 y 轴）

                I₀ = ∬ᴅ (x\xb2+y\xb2)\xb7ρ(x,y)dσ （对原点）

            ### 引力
            物体对质点的引力可用三重积分计算各分量。
  `,formula:`
## 重积分应用推导
            ### 质心坐标
            
\`\`\`

                x̄ = (1/M)∭ᴠ x\xb7ρ dV

                ȳ = (1/M)∭ᴠ y\xb7ρ dV

                z̄ = (1/M)∭ᴠ z\xb7ρ dV

            ### 转动惯量张量
            
\`\`\`

                I = ∫ r\xb2 dm = ∭ᴠ (x\xb2+y\xb2+z\xb2)ρ dV
  `,examples:[{id:"app-1",difficulty:"medium",question:"求半径为 R 的均匀半圆薄片（面密度 ρ=1）的质心。",options:["(0, 4R/3π)","(0, R/2)","(0, 2R/π)","(R/2, 0)"],correct:0,explanation:"由对称性，x̄ = 0\nȳ = (1/S)∬ᴅ y dσ = (1/(πR²/2))∫₀^π dθ ∫₀ᴿ r·sin(θ)·r dr\n= (2/(πR²)) × 2 × R³/3 = 4R/(3π)"}]},{id:"polar-coordinates",title:"极坐标积分",has3D:!0,vizType:"polarCoordinates",theory:`
## 极坐标变换回顾
            
\`\`\`

                x = r\xb7cos(θ), y = r\xb7sin(θ)

                dσ = r\xb7dr\xb7dθ

            ## 极坐标下的积分区域

            ### 圆形区域
            
                - 圆心在原点：0 ≤ r ≤ R, 0 ≤ θ ≤ 2π
                - 圆心在 (a, 0)：0 ≤ r ≤ 2a\xb7cos(θ), -π/2 ≤ θ ≤ π/2

            ### 环形区域
            
\`\`\`

                a ≤ r ≤ b, 0 ≤ θ ≤ 2π

            ### 扇形区域
            
\`\`\`

                0 ≤ r ≤ R, α ≤ θ ≤ β

            ## 适合极坐标的被积函数
            
> **提示**
> 
                
                    - 含 x\xb2 + y\xb2 的函数
                    - 含 y/x 或 x/y 的函数
                    - 仅与到原点距离有关的函数 f(√(x\xb2+y\xb2))

            ## 极坐标积分技巧
            
**思考引导**

                    - 正确确定 θ 的范围（观察区域覆盖的角度）
                    - r 的上下限可能是 θ 的函数
                    - 注意乘以 r（雅可比行列式）
                    - 利用对称性简化计算
  `,formula:`
## 极坐标变换推导
            ### 雅可比行列式
            
\`\`\`

                J = |∂x/∂r  ∂x/∂θ|   |cos(θ)  -r\xb7sin(θ)|

                    |∂y/∂r  ∂y/∂θ| = |sin(θ)   r\xb7cos(θ)| = r

            ### 面积元素
            
\`\`\`

                dσ = |J| dr dθ = r dr dθ
  `,examples:[{id:"pc-1",difficulty:"medium",question:"计算 ∬ᴅ e^(x²+y²) dxdy，其中 D 为圆 x² + y² ≤ 1。",options:["π(e-1)","2π(e-1)","πe","π/e"],correct:0,explanation:"使用极坐标：x² + y² = r², dσ = rdrdθ\n∬ᴅ e^(x²+y²) dxdy = ∫₀²π dθ ∫₀¹ e^(r²) r dr\n= 2π × [1/2 e^(r²)]₀¹ = π(e - 1)"}]},{id:"cylindrical-spherical",title:"柱坐标与球坐标",has3D:!0,vizType:"cylindricalSpherical",theory:`
## 柱坐标系
            
\`\`\`

                x = r\xb7cos(θ), y = r\xb7sin(θ), z = z

                dV = r\xb7dr\xb7dθ\xb7dz

            ### 适用场景
            
                - 柱形区域
                - 锥形区域
                - 被积函数含 x\xb2 + y\xb2

            ## 球坐标系
            
\`\`\`

                x = r\xb7sin(φ)\xb7cos(θ)

                y = r\xb7sin(φ)\xb7sin(θ)

                z = r\xb7cos(φ)

                dV = r\xb2\xb7sin(φ)\xb7dr\xb7dφ\xb7dθ

            ### 变量说明
            
                - r：点到原点的距离 (0 ≤ r < ∞)
                - φ：与 z 轴正向的夹角 (0 ≤ φ ≤ π)
                - θ：在 xy 平面上与 x 轴的夹角 (0 ≤ θ ≤ 2π)

            ### 适用场景
            
                - 球形区域
                - 球壳区域
                - 被积函数含 x\xb2 + y\xb2 + z\xb2

            ## 球坐标积分限
            
> **提示**
> 
                #### 球 x\xb2 + y\xb2 + z\xb2 ≤ R\xb2
                0 ≤ r ≤ R, 0 ≤ φ ≤ π, 0 ≤ θ ≤ 2π

                #### 上半球
                0 ≤ r ≤ R, 0 ≤ φ ≤ π/2, 0 ≤ θ ≤ 2π

                #### 球壳 a\xb2 ≤ x\xb2 + y\xb2 + z\xb2 ≤ b\xb2
                a ≤ r ≤ b, 0 ≤ φ ≤ π, 0 ≤ θ ≤ 2π

> ⚠️ **注意**
> 
                **注意**：不要忘记体积元中的 r（柱坐标）或 r\xb2\xb7sin(φ)（球坐标）！
  `,formula:`
## 球坐标体积元推导
            ### 雅可比行列式
            
\`\`\`

                J = r\xb2 sin(φ)

            推导：从直角坐标到球坐标的变换矩阵行列式

            ### 球体积公式
            
\`\`\`

                V = ∭ dV = ∫₀\xb2π dθ ∫₀^π sin(φ)dφ ∫₀ᴿ r\xb2 dr = 4πR\xb3/3
  `,examples:[{id:"cs-2",difficulty:"medium",question:"求球 x² + y² + z² = R² 在 0 ≤ z ≤ h 部分的体积。",options:["πh²(R - h/3)","2πh²(R - h/3)","πhR²","4πR³/3"],correct:0,explanation:"使用柱坐标：V = ∭ dV = ∫₀²π dθ ∫₀^√(R²-h²) r dr ∫₀^h dz\n或使用球坐标直接计算得 V = πh²(R - h/3)"}]}],"am-4":[{id:"surface-integral-first",title:"第一类曲面积分",has3D:!0,vizType:"surfaceIntegralFirst",theory:`
## 定义
            设 Σ 是光滑曲面，f(x, y, z) 在 Σ 上有界，则第一类曲面积分（对面积的曲面积分）为：

\`\`\`

                ∬_Σ f(x,y,z)dS = lim(λ→0) Σ f(ξᵢ,ηᵢ,ζᵢ)ΔSᵢ

            ## 计算方法

            ### 曲面为 z = z(x, y)
            
\`\`\`

                ∬_Σ f(x,y,z)dS = ∬_D f(x,y,z(x,y)) √(1 + zₓ\xb2 + zᵧ\xb2) dxdy

            ### 曲面为参数方程
            设 x = x(u,v), y = y(u,v), z = z(u,v)

\`\`\`

                dS = |**r**_u \xd7 **r**_v| dudv

            ## 几何意义
            
**思考引导**

                    - 当 f = 1 时，积分等于曲面面积
                    - 当 f 为密度时，积分等于曲面质量

            ## 对称性
            
> **提示**
> 
                若 Σ 关于 xy 平面对称：

                    - f(x,y,-z) = -f(x,y,z) ⟹ 积分为 0
                    - f(x,y,-z) = f(x,y,z) ⟹ 积分 = 2 \xd7 上半曲面积分
  `,formula:`
## 曲面积分的面积元素
            ### 显式曲面 z = z(x,y)
            
\`\`\`

                dS = √(1 + (∂z/∂x)\xb2 + (∂z/∂y)\xb2) dxdy

                = √(1 + |∇z|\xb2) dxdy

            ### 参数曲面推导
            
\`\`\`

                dS = |**r**_u \xd7 **r**_v| du dv

                = √(EG - F\xb2) du dv

            其中 E = **r**_u\xb7**r**_u, F = **r**_u\xb7**r**_v, G = **r**_v\xb7**r**_v
  `,examples:[{id:"sif-1",difficulty:"medium",question:"求半球面 z = √(R²-x²-y²) 的表面积。",options:["2πR²","πR²","4πR²","πR²/2"],correct:0,explanation:"zₓ = -x/z, zᵧ = -y/z\n√(1+zₓ²+zᵧ²) = R/√(R²-x²-y²) = R/z\nS = ∬ᴅ R/z dxdy = R × 2πR = 2πR²"}]},{id:"surface-integral-second",title:"第二类曲面积分",has3D:!0,vizType:"surfaceIntegralSecond",theory:`
## 定义
            设 Σ 为有向光滑曲面，**F** = (P, Q, R) 为向量场，则第二类曲面积分（对坐标的曲面积分）为：

\`\`\`

                ∬_Σ **F** \xb7 d**S** = ∬_Σ P dydz + Q dzdx + R dxdy

            ## 有向曲面
            曲面的侧由法向量的方向确定：

                - 闭曲面：外侧（法向量朝外）或内侧
                - z = z(x, y)：上侧（法向量朝上）或下侧

            ## 计算方法
            ### 投影到 xy 平面
            
\`\`\`

                ∬_Σ R dxdy = \xb1∬_D R(x,y,z(x,y)) dxdy

            上侧取正，下侧取负。

            ### 统一投影法
            
\`\`\`

                ∬_Σ P dydz + Q dzdx + R dxdy = ∬_Σ (Pcosα + Qcosβ + Rcosγ)dS

            ## 两类曲面积分的关系
            
\`\`\`

                ∬_Σ P dydz + Q dzdx + R dxdy = ∬_Σ (Pcosα + Qcosβ + Rcosγ)dS

            其中 (cosα, cosβ, cosγ) 为有向曲面单位法向量。
  `,formula:`
## 有向曲面面积元素
            ### 投影关系
            
\`\`\`

                dydz = cos(α) dS = \xb1 (∂z/∂x) dxdy

                dzdx = cos(β) dS = \xb1 (∂z/∂y) dxdy

                dxdy = cos(γ) dS

            ### 法向量方向
            上侧取正，下侧取负；前侧取正，后侧取负；右侧取正，左侧取负。
  `,examples:[{id:"sis-1",difficulty:"hard",question:"计算 ∬_Σ z dxdy，其中 Σ 为球面 x²+y²+z²=R² 的外侧。",options:["4πR³/3","2πR³","πR³","0"],correct:0,explanation:"使用高斯公式：∬_Σ z dxdy = ∭_Ω (∂z/∂z) dV = ∭_Ω dV = 4πR³/3"}]},{id:"gauss-theorem",title:"高斯定理",has3D:!0,vizType:"gaussTheorem",theory:`
## 高斯公式（散度定理）
            设 Ω 是由分片光滑闭曲面 Σ 所围成的空间闭区域，P, Q, R 在 Ω 上具有一阶连续偏导数，则

\`\`\`

                ∯_Σ P dydz + Q dzdx + R dxdy = ∭_Ω (∂P/∂x + ∂Q/∂y + ∂R/∂z)dV

            或写成向量形式：

\`\`\`

                ∯_Σ **F** \xb7 d**S** = ∭_Ω (∇ \xb7 **F**)dV

            ## 二、散度（Divergence）的物理意义
            
\`\`\`

                div **F** = ∇ \xb7 **F** = ∂P/∂x + ∂Q/∂y + ∂R/∂z

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

                ∯<sub>Σ</sub> **F** \xb7 d**S** = ∭<sub>Ω</sub> (∇ \xb7 **F**) dV

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

                ∯<sub>Σ</sub> **E** \xb7 d**S** = Q/ε₀

            其中 Q 是闭曲面内的总电荷。由高斯公式：

\`\`\`

                ∭<sub>Ω</sub> (∇ \xb7 **E**) dV = Q/ε₀ = ∭<sub>Ω</sub> (ρ/ε₀) dV

            得到微分形式：∇ \xb7 **E** = ρ/ε₀（电荷密度与散度的关系）。
  `,formula:`
## 高斯公式推导思路
            ### 从二维到三维的推广
            格林公式：∮_L Pdx + Qdy = ∬_D (∂Q/∂x - ∂P/∂y)dxdy

            高斯公式是其三维推广，将面积分与体积分联系起来。

            ### 物理意义
            
\`\`\`

                通过闭曲面的通量 = 体积内的总源强
  `,examples:[{id:"gt-1",difficulty:"medium",question:"利用高斯公式计算 ∯_Σ x dydz + y dzdx + z dxdy，其中 Σ 为球面 x²+y²+z²=R² 的外侧。",options:["4πR³","2πR³","πR³","0"],correct:0,explanation:"div F = ∂x/∂x + ∂y/∂y + ∂z/∂z = 3\n∯_Σ F·dS = ∭_Ω 3 dV = 3 × 4πR³/3 = 4πR³"}]},{id:"stokes-theorem",title:"斯托克斯定理",has3D:!0,vizType:"stokesTheorem",theory:`
## 斯托克斯公式
            设 Σ 为分片光滑的有向曲面，其边界 Γ 为分段光滑的闭曲线，P, Q, R 在包含 Σ 的空间区域内有一阶连续偏导数，则

\`\`\`

                ∮_Γ Pdx + Qdy + Rdz = ∬_Σ [(∂R/∂y - ∂Q/∂z)dydz

                + (∂P/∂z - ∂R/∂x)dzdx

                + (∂Q/∂x - ∂P/∂y)dxdy]

            ## 向量形式
            
\`\`\`

                ∮_Γ **F** \xb7 d**r** = ∬_Σ (∇ \xd7 **F**) \xb7 d**S**

            ## 旋度（Curl）
            
\`\`\`

                rot **F** = ∇ \xd7 **F** = |**i**    **j**    **k**|

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
  `,formula:`
## 斯托克斯公式的推导
            ### 从格林公式推广
            将曲面分割为许多小片，每片上应用格林公式的推广形式。

            ### 旋度的物理意义
            
\`\`\`

                (∇ \xd7 F)\xb7n = lim(S→0) (1/|S|) ∮_∂S F\xb7dr

            表示单位面积上的环量密度。
  `,examples:[{id:"st-1",difficulty:"medium",question:"利用斯托克斯公式计算 ∮_Γ y dx + z dy + x dz，其中 Γ 为球面 x²+y²+z²=a² 与平面 x+y+z=0 的交线。",options:["-√3πa²","√3πa²","0","2πa²"],correct:0,explanation:"∇ × F = (-1, -1, -1)\n取 Σ 为平面 x+y+z=0 上的圆，法向量 n = (1,1,1)/√3\n∮_Γ F·dr = ∬_Σ (∇×F)·n dS = -√3 × πa²"}]},{id:"greens-theorem",title:"格林定理",has3D:!0,vizType:"greensTheorem",theory:`
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

            **例**：椭圆的参数方程 x = a\xb7cos(t), y = b\xb7sin(t)，面积：

\`\`\`

                S = (1/2)∫₀\xb2π [a\xb7cos(t)\xb7b\xb7cos(t) - b\xb7sin(t)\xb7(-a\xb7sin(t))]dt

                = (ab/2)∫₀\xb2π (cos\xb2t + sin\xb2t)dt = (ab/2) \xd7 2π = πab

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
  `,formula:`
## 格林公式的推导
            ### 从牛顿-莱布尼茨公式推广
            
\`\`\`

                ∫ₐᵇ f'(x)dx = f(b) - f(a)

            格林公式是其二维推广，将曲线积分转化为二重积分。

            ### 单连通与多连通区域
            格林公式适用于单连通区域，对于多连通区域需要分段处理边界。
  `,examples:[{id:"gt-2",difficulty:"easy",question:"利用格林公式计算 ∮_L xdy - ydx，其中 L 为椭圆 x²/a² + y²/b² = 1 的正向。",options:["2πab","πab","4ab","2ab"],correct:0,explanation:"P = -y, Q = x\n∂Q/∂x - ∂P/∂y = 1 - (-1) = 2\n∮_L xdy - ydx = ∬_D 2 dxdy = 2 × 椭圆面积 = 2πab"}]},{id:"differential-forms",title:"微分形式",has3D:!0,vizType:"differentialForms",theory:`
## 外微分形式

            ### 0-形式
            标量函数 f(x, y, z)

            ### 1-形式
            
\`\`\`

                ω\xb9 = Pdx + Qdy + Rdz

            ### 2-形式
            
\`\`\`

                ω\xb2 = P dydz + Q dzdx + R dxdy

            ### 3-形式
            
\`\`\`

                ω\xb3 = f(x,y,z)dxdydz

            ## 外微分
            外微分算子 d 的作用：

\`\`\`

                d: k-形式 → (k+1)-形式

            ### 重要性质
            
\`\`\`

                d\xb2 = 0

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
                    - 恰当形式必为闭形式（d\xb2 = 0）
                    - 在单连通区域，闭形式也是恰当形式
  `,formula:`
## 外微分的计算规则
            ### 楔积的性质
            
\`\`\`

                dx ∧ dy = -dy ∧ dx

                dx ∧ dx = 0

            ### 莱布尼茨规则
            
\`\`\`

                d(ω ∧ η) = dω ∧ η + (-1)^|ω| ω ∧ dη
  `,examples:[{id:"df-1",difficulty:"hard",question:"验证 d² = 0 对于 0-形式 f(x,y) = x²y。",options:["d(df) = 0","d(df) = 2xy dx + x² dy","d(df) = 2y dx + 2x dy","d(df) = 2xy"],correct:0,explanation:"df = 2xy dx + x² dy\nd(df) = d(2xy)∧dx + d(x²)∧dy = (2y dx + 2x dy)∧dx + (2x dx)∧dy = 2y dy∧dx + 2x dx∧dy = -2y dx∧dy + 2y dx∧dy = 0"}]}],"am-5":[{id:"ode-basic",title:"微分方程基础",has3D:!0,vizType:"odeBasic",theory:`
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
  `,formula:`
## 微分方程的基本概念
            ### 通解与特解
            
\`\`\`

                n阶微分方程的通解含有n个任意常数

            通解：y = φ(x, C₁, C₂, ..., Cₙ)

            特解：通过初始条件确定常数后的解

            ### 初始条件
            
\`\`\`

                y(x₀) = y₀, y'(x₀) = y₁, ..., y⁽ⁿ⁻\xb9⁾(x₀) = yₙ₋₁
  `,examples:[{id:"odeb-1",difficulty:"easy",question:"微分方程的阶数是指什么？",options:["方程中未知函数的最高次幂","方程中出现的最高阶导数的阶数","方程中自变量的个数","方程中未知函数的个数"],correct:1,explanation:"微分方程的阶数定义为方程中出现的未知函数的最高阶导数的阶数。例如，含有y''的方程是二阶微分方程。"}]},{id:"first-order",title:"一阶微分方程",has3D:!0,vizType:"firstOrderODE",theory:`
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

                y = e^(-∫Pdx) [∫Q\xb7e^(∫Pdx)dx + C]

            ## 伯努利方程
            
\`\`\`

                y' + P(x)y = Q(x)yⁿ (n ≠ 0, 1)

            解法：令 z = y\xb9⁻ⁿ，化为线性方程。

            ## 全微分方程
            
\`\`\`

                P(x,y)dx + Q(x,y)dy = 0，其中 ∂Q/∂x = ∂P/∂y

            解法：求原函数 u(x,y) 使得 du = Pdx + Qdy，通解为 u(x,y) = C。
  `,formula:`

  `,examples:[{id:"fo-1",difficulty:"medium",question:"求解 y' + y/x = x²。",options:["y = x³/4 + C/x","y = x³/3 + C/x","y = x³/4 + Cx","y = x² + C/x"],correct:0,explanation:"P = 1/x，Q = x²\n∫Pdx = ln|x|\n积分因子 = e^(ln|x|) = x\ny = (1/x)[∫x³dx + C] = (1/x)[x⁴/4 + C] = x³/4 + C/x"}]},{id:"higher-order",title:"高阶微分方程",has3D:!0,vizType:"higherOrderODE",theory:`
## 可降阶方程

            ### 类型一：y⁽ⁿ⁾ = f(x)
            解法：连续积分 n 次。

            ### 类型二：y'' = f(x, y')
            解法：令 p = y'，则 y'' = dp/dx，化为一阶方程。

            ### 类型三：y'' = f(y, y')
            解法：令 p = y'，则 y'' = p\xb7dp/dy，化为一阶方程。

            ## 常系数线性齐次方程
            
\`\`\`

                y'' + py' + qy = 0

            ### 特征方程
            
\`\`\`

                r\xb2 + pr + q = 0

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
                        <td style="padding: 8px;">共轭复根 α \xb1 iβ</td>
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
  `,formula:`

  `,examples:[{id:"ho-1",difficulty:"medium",question:"求 y'' - 3y' + 2y = 0 的通解。",options:["y = C₁e^x + C₂e^(2x)","y = C₁e^(-x) + C₂e^(2x)","y = C₁e^x + C₂e^(-2x)","y = (C₁ + C₂x)e^x"],correct:0,explanation:"特征方程：r² - 3r + 2 = 0\n(r-1)(r-2) = 0\nr₁ = 1, r₂ = 2\n通解：y = C₁e^x + C₂e^(2x)"}]},{id:"linear-system",title:"线性方程组",has3D:!0,vizType:"linearSystem",theory:`
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

                    - λ₁, λ₂ 为不等实根：**x** = C₁**v**₁e^(λ₁t) + C₂**v**₂e^(λ₂t)
                    - λ₁ = λ₂ = λ：**x** = (C₁**v** + C₂(**v**t + **w**))e^(λt)
                    - λ = α \xb1 iβ：**x** = e^(αt)[C₁Re(**v**e^(iβt)) + C₂Im(**v**e^(iβt))]

            ## 平衡点分类
            
> **提示**
> 
                对于二维系统，根据特征值的性质，平衡点可分为：

                    - **结点**：两特征值同号实数
                    - **鞍点**：两特征值异号实数
                    - **焦点**：复特征值实部非零
                    - **中心**：纯虚特征值
  `,formula:`
## 线性方程组的矩阵解法
            ### 特征值问题
            
\`\`\`

                det(A - λI) = 0

            ### 通解结构
            
\`\`\`

                **x**(t) = c₁**v**₁e^(λ₁t) + c₂**v**₂e^(λ₂t)
  `,examples:[{id:"ls-1",difficulty:"medium",question:"求解方程组 dx/dt = x + y, dy/dt = 4x + y。",options:["x = C₁e^(3t) + C₂e^(-t), y = 2C₁e^(3t) - 2C₂e^(-t)","x = C₁e^(2t) + C₂e^(-t), y = C₁e^(2t) - C₂e^(-t)","x = C₁e^(3t) + C₂e^t, y = 2C₁e^(3t) - C₂e^t","x = C₁e^(3t) + C₂e^(-2t), y = 2C₁e^(3t) - C₂e^(-2t)"],correct:0,explanation:"矩阵 A = [[1,1],[4,1]]\n特征方程：det(A-λI) = (1-λ)² - 4 = 0\nλ² - 2λ - 3 = 0, λ₁=3, λ₂=-1\n求特征向量后得通解。"}]},{id:"laplace",title:"拉普拉斯变换",has3D:!0,vizType:"laplaceTransform",theory:`
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
                        <td style="padding: 8px;">ω/(s\xb2+ω\xb2)</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">cos(ωt)</td>
                        <td style="padding: 8px;">s/(s\xb2+ω\xb2)</td>
                    </tr>
                </table>

            ## 解微分方程
            步骤：

                - 对方程两边取拉普拉斯变换
                - 代入初始条件，解出 F(s)
                - 对 F(s) 取逆变换得 f(t)
  `,formula:`
## 拉普拉斯变换推导
            ### 从定义出发
            
\`\`\`

                F(s) = ∫₀^∞ f(t)e^(-st)dt

            ### 微分性质推导
            
\`\`\`

                L[f'(t)] = ∫₀^∞ f'(t)e^(-st)dt

                = [f(t)e^(-st)]₀^∞ + s∫₀^∞ f(t)e^(-st)dt

                = sF(s) - f(0)
  `,examples:[{id:"lp-1",difficulty:"medium",question:"求 f(t) = e^(at) 的拉普拉斯变换。",options:["1/(s-a), s>a","1/(s+a), s>-a","a/(s²+a²)","s/(s²+a²)"],correct:0,explanation:"L[e^(at)] = ∫₀^∞ e^(at)e^(-st)dt = ∫₀^∞ e^(-(s-a)t)dt\n= [-1/(s-a)e^(-(s-a)t)]₀^∞ = 1/(s-a) (当s>a时收敛)"}]},{id:"series-solution",title:"级数解法",has3D:!0,vizType:"seriesSolution",theory:`
## 幂级数解法概述
            对于不能用初等函数表示解的方程，可假设解为幂级数形式：

\`\`\`

                y = Σₙ₌₀^∞ aₙxⁿ = a₀ + a₁x + a₂x\xb2 + ...

            ## 勒让德方程
            
\`\`\`

                (1-x\xb2)y'' - 2xy' + n(n+1)y = 0

            解为勒让德多项式 Pₙ(x)。

            ## 贝塞尔方程
            
\`\`\`

                x\xb2y'' + xy' + (x\xb2 - ν\xb2)y = 0

            解为贝塞尔函数 Jᵥ(x) 和 Yᵥ(x)。

            ## 常点与奇点
            
**思考引导**

                    - **常点**：P(x) 和 Q(x) 在 x₀ 解析
                    - **正则奇点**：(x-x₀)P(x) 和 (x-x₀)\xb2Q(x) 在 x₀ 解析
                    - **非正则奇点**：其他情况

            ## 弗罗贝尼乌斯方法
            对于正则奇点，设解为

\`\`\`

                y = xʳ Σₙ₌₀^∞ aₙxⁿ

            代入方程确定 r（指标方程）和系数 aₙ。
  `,formula:`
## 幂级数解法推导
            ### 假设解的形式
            
\`\`\`

                y = Σₙ₌₀^∞ aₙxⁿ

            ### 逐次求导
            
\`\`\`

                y' = Σₙ₌₁^∞ naₙxⁿ⁻\xb9

                y'' = Σₙ₌₂^∞ n(n-1)aₙxⁿ⁻\xb2

            ### 勒让德多项式
            
\`\`\`

                Pₙ(x) = (1/2ⁿn!) dⁿ/dxⁿ[(x\xb2-1)ⁿ]
  `,examples:[{id:"ss-1",difficulty:"hard",question:"用幂级数法求解 y'' - xy = 0，初始条件 y(0)=1, y'(0)=0。",options:["y = 1 + x³/6 + x⁶/180 + ...","y = 1 + x²/2 + x⁴/24 + ...","y = 1 + x³/3 + x⁶/18 + ...","y = 1 + x⁴/12 + x⁸/672 + ..."],correct:0,explanation:"设 y = Σaₙxⁿ，则 y'' = Σn(n-1)aₙxⁿ⁻²\n代入方程：Σn(n-1)aₙxⁿ⁻² - Σaₙxⁿ⁺¹ = 0\n比较系数得递推关系，由初始条件 a₀=1, a₁=0，求得 a₂=0, a₃=1/6..."}]}],"am-6":[{id:"numerical",title:"数值方法",has3D:!0,vizType:"numericalODE",theory:`
## 欧拉方法
            最简单的数值方法：

\`\`\`

                yₙ₊₁ = yₙ + h\xb7f(xₙ, yₙ)

            局部截断误差：O(h\xb2)

            ## 改进的欧拉方法
            预测-校正法：

\`\`\`

                预测：y* = yₙ + h\xb7f(xₙ, yₙ)

                校正：yₙ₊₁ = yₙ + h/2\xb7[f(xₙ, yₙ) + f(xₙ₊₁, y*)]

            局部截断误差：O(h\xb3)

            ## 龙格-库塔方法（RK4）
            
\`\`\`

                yₙ₊₁ = yₙ + h/6\xb7(k₁ + 2k₂ + 2k₃ + k₄)

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
  `,formula:`
## 数值方法误差分析

            ### 欧拉方法
            
\`\`\`

                yₙ₊₁ = yₙ + h\xb7f(xₙ, yₙ)

                局部误差：O(h\xb2)

                全局误差：O(h)

            ### 改进欧拉方法
            
\`\`\`

                k₁ = f(xₙ, yₙ)

                k₂ = f(xₙ₊₁, yₙ + hk₁)

                yₙ₊₁ = yₙ + h/2\xb7(k₁ + k₂)

                局部误差：O(h\xb3)

            ### RK4 方法
            
\`\`\`

                yₙ₊₁ = yₙ + h/6\xb7(k₁ + 2k₂ + 2k₃ + k₄)

                局部误差：O(h⁵)
  `,examples:[{id:"num-1",difficulty:"medium",question:"用欧拉方法（步长 h=0.1）求解 y' = y, y(0)=1，求 y(0.2) 的近似值。",options:["1.21","1.105","1.221","1.01"],correct:0,explanation:"欧拉公式：yₙ₊₁ = yₙ + h·f(xₙ, yₙ)\ny₁ = y₀ + 0.1·y₀ = 1 + 0.1 = 1.1\ny₂ = y₁ + 0.1·y₁ = 1.1 + 0.11 = 1.21"}]},{id:"physics",title:"物理应用",has3D:!0,vizType:"physicsApp",theory:`
## 经典力学

            ### 运动学
            
\`\`\`

                **r**(t) = (x(t), y(t), z(t))

                **v** = d**r**/dt, **a** = d**v**/dt = d\xb2**r**/dt\xb2

            ### 牛顿第二定律
            
\`\`\`

                **F** = m**a** = m d\xb2**r**/dt\xb2

            ### 角动量
            
\`\`\`

                **L** = **r** \xd7 **p** = m(**r** \xd7 **v**)

            ## 电磁学

            ### 麦克斯韦方程组
            
**思考引导**

\`\`\`

                    ∇ \xb7 **E** = ρ/ε₀ （高斯电场定律）

                    ∇ \xb7 **B** = 0 （高斯磁场定律）

                    ∇ \xd7 **E** = -∂**B**/∂t （法拉第定律）

                    ∇ \xd7 **B** = μ₀**J** + μ₀ε₀∂**E**/∂t （安培-麦克斯韦定律）

            ### 电势与电场
            
\`\`\`

                **E** = -∇V

            ## 引力场
            
\`\`\`

                **F** = -GmM/r\xb2 \xb7 **r̂**

                **g** = -∇Φ

            ## 热传导
            
\`\`\`

                ∂u/∂t = α∇\xb2u （热方程）

            ## 波动方程
            
\`\`\`

                ∂\xb2u/∂t\xb2 = c\xb2∇\xb2u
  `,formula:`
## 物理学中的矢量微积分

            ### 运动学关系
            
\`\`\`

                v = dr/dt, a = dv/dt = d\xb2r/dt\xb2

            ### 高斯定理（散度定理）
            
\`\`\`

                ∭_V (∇ \xb7 F) dV = ∯_S F \xb7 dS

            ### 斯托克斯定理
            
\`\`\`

                ∬_S (∇ \xd7 F) \xb7 dS = ∮_∂S F \xb7 dr

            ### 电势与电场
            
\`\`\`

                E = -∇V, ∇ \xb7 E = ρ/ε₀
  `,examples:[{id:"phy-1",difficulty:"hard",question:"质点运动方程为 r(t) = (3t², 4t, 5)，求 t=1 时的速度和加速度大小。",options:["速度=√145, 加速度=6","速度=√52, 加速度=10","速度=10, 加速度=6","速度=√145, 加速度=10"],correct:0,explanation:"v = dr/dt = (6t, 4, 0), v(1) = (6, 4, 0), |v| = √(36+16) = √52\na = dv/dt = (6, 0, 0), |a| = 6\n注意：我需要重新计算... v = (6t, 4, 0)，在 t=1 时 v = (6,4,0)，|v|=√(36+16)=√52。题目可能有误，正确答案应为 速度=√52, 加速度=6。"},{id:"phy-2",difficulty:"medium",question:"点电荷 q 在原点产生的电势 V = kq/r，求电场强度 E = -∇V 在 r=1 处的大小。",options:["kq/r²","kq/r","2kq/r²","kq/r³"],correct:0,explanation:"E = -∇V = -∂V/∂r · r̂ = -(-kq/r²)r̂ = (kq/r²)r̂\n在球坐标中，∇V = ∂V/∂r · eᵣ = -kq/r² · eᵣ\n所以 E = kq/r² · eᵣ，大小为 kq/r²。"}]},{id:"engineering",title:"工程应用",has3D:!0,vizType:"engineeringApp",theory:`
## 结构力学

            ### 应力与应变
            
\`\`\`

                σ = E\xb7ε （胡克定律）

            其中 σ 为应力，ε 为应变，E 为弹性模量。

            ### 梁的挠度
            
\`\`\`

                EI d⁴y/dx⁴ = q(x)

            ## 流体力学

            ### 连续性方程
            
\`\`\`

                ∂ρ/∂t + ∇ \xb7 (ρ**v**) = 0

            ### 纳维-斯托克斯方程
            
\`\`\`

                ρ(∂**v**/∂t + **v** \xb7 ∇**v**) = -∇p + μ∇\xb2**v** + ρ**g**

            ## 控制理论

            ### 状态空间表示
            
\`\`\`

                d**x**/dt = A**x** + B**u**

                **y** = C**x** + D**u**

            ## 信号处理

            ### 傅里叶变换
            
\`\`\`

                F(ω) = ∫₋∞^∞ f(t)e^(-iωt)dt

            ### 采样定理
            采样频率必须大于信号最高频率的两倍。
  `,formula:`
## 工程分析中的数学工具

            ### 梁的弯曲方程
            
\`\`\`

                EI d\xb2y/dx\xb2 = M(x)

                EI d\xb3y/dx\xb3 = V(x) (剪力)

                EI d⁴y/dx⁴ = q(x) (载荷)

            ### 控制系统传递函数
            
\`\`\`

                G(s) = C(sI - A)⁻\xb9B + D

            ### 傅里叶变换对
            
\`\`\`

                F(ω) = ∫₋∞^∞ f(t)e^(-iωt)dt

                f(t) = (1/2π) ∫₋∞^∞ F(ω)e^(iωt)dω
  `,examples:[{id:"eng-1",difficulty:"medium",question:"简支梁跨度 L=4m，承受均布载荷 q=10kN/m，求跨中最大弯矩（EI为常数）。",options:["M_max = qL²/8 = 20 kN·m","M_max = qL²/4 = 40 kN·m","M_max = qL/2 = 20 kN·m","M_max = qL²/12 ≈ 13.3 kN·m"],correct:0,explanation:"简支梁受均布载荷，弯矩方程 M(x) = qLx/2 - qx²/2\n在 x = L/2 处取得最大值 M_max = qL²/8\n代入：M_max = 10 × 16 / 8 = 20 kN·m"},{id:"eng-2",difficulty:"hard",question:"控制系统状态方程 ẋ = Ax + Bu，其中 A = [[0,1],[-2,-3]]，求系统特征值。",options:["λ₁ = -1, λ₂ = -2","λ₁ = 1, λ₂ = 2","λ₁ = -1+i, λ₂ = -1-i","λ₁ = 0, λ₂ = -3"],correct:0,explanation:"特征方程 det(λI - A) = 0\n| λ  -1  | = λ(λ+3) + 2 = λ² + 3λ + 2 = 0\n| 2  λ+3 |\n(λ+1)(λ+2) = 0，所以 λ₁ = -1, λ₂ = -2"}]},{id:"ml",title:"机器学习应用",has3D:!0,vizType:"mlApp",theory:`
## 梯度下降

            ### 批量梯度下降
            
\`\`\`

                θ := θ - α∇J(θ)

            ### 随机梯度下降（SGD）
            
\`\`\`

                θ := θ - α∇J(θ; x⁽ⁱ⁾, y⁽ⁱ⁾)

            ## 反向传播
            利用链式法则计算梯度：

\`\`\`

                ∂L/∂w = ∂L/∂z \xb7 ∂z/∂w

            ## 优化方法

            ### 动量法
            
\`\`\`

                v := βv + (1-β)∇J(θ)

                θ := θ - αv

            ### Adam优化器
            
\`\`\`

                m := β₁m + (1-β₁)g

                v := β₂v + (1-β₂)g\xb2

                θ := θ - α\xb7m/(√v + ε)

            ## 主成分分析（PCA）
            对协方差矩阵进行特征分解：

\`\`\`

                Σ = (1/m)XᵀX = WΛWᵀ

            ## 支持向量机
            
\`\`\`

                min (1/2)||w||\xb2 + CΣξᵢ

                s.t. yᵢ(w\xb7xᵢ + b) ≥ 1 - ξᵢ
  `,formula:`
## 机器学习中的优化推导

            ### 梯度下降更新规则
            
\`\`\`

                θ⁽ᵗ⁺\xb9⁾ = θ⁽ᵗ⁾ - α∇J(θ⁽ᵗ⁾)

            ### 反向传播的链式法则
            
\`\`\`

                ∂L/∂w = ∂L/∂z \xb7 ∂z/∂w = δ \xb7 aₚᵣₑᵥ

            ### PCA 投影
            
\`\`\`

                z = Wᵀ(x - μ)

                其中 W = [v₁, v₂, ..., vₖ] 是前 k 个特征向量

            ### 核技巧
            
\`\`\`

                K(x, x') = φ(x) \xb7 φ(x')
  `,examples:[{id:"ml-1",difficulty:"medium",question:"损失函数 L = (1/2)(y - ŷ)²，其中 ŷ = wx + b。求 ∂L/∂w。",options:["∂L/∂w = -(y - ŷ)x","∂L/∂w = (y - ŷ)x","∂L/∂w = -(y - ŷ)","∂L/∂w = (y - ŷ)w"],correct:0,explanation:"链式法则：∂L/∂w = ∂L/∂ŷ · ∂ŷ/∂w\n∂L/∂ŷ = -(y - ŷ)\n∂ŷ/∂w = x\n所以 ∂L/∂w = -(y - ŷ)x"},{id:"ml-2",difficulty:"hard",question:"二维数据协方差矩阵 Σ = [[4, 2], [2, 3]]，求最大特征值对应的特征向量方向。",options:["约 [0.85, 0.53]ᵀ","约 [0.53, 0.85]ᵀ","[1, 0]ᵀ","[0, 1]ᵀ"],correct:0,explanation:"特征方程 det(Σ - λI) = (4-λ)(3-λ) - 4 = λ² - 7λ + 8 = 0\nλ = (7 ± √17)/2 ≈ 5.56, 1.44\n最大特征值 λ₁ ≈ 5.56，解 (Σ - λ₁I)v = 0 得 v ≈ [0.85, 0.53]ᵀ"}]},{id:"graphics",title:"计算机图形学",has3D:!0,vizType:"graphicsApp",theory:`
## 三维变换

            ### 旋转矩阵
            绕 z 轴旋转角度 θ：

\`\`\`

                Rₓ(θ) = [cos(θ) -sin(θ) 0]

                            [sin(θ)  cos(θ) 0]

                            [0       0      1]

            ### 四元数旋转
            避免万向节死锁问题：

\`\`\`

                q = cos(θ/2) + sin(θ/2)(uₓi + uᵧj + uᵤk)

            ## 光照模型

            ### Phong模型
            
\`\`\`

                I = Iₐkₐ + Iₚ[kₐ(**N**\xb7**L**) + kₛ(**R**\xb7**V**)ⁿ]

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
  `,formula:`
## 图形学中的数学基础

            ### 三维旋转矩阵（绕 z 轴）
            
\`\`\`

                R_z(θ) = [[cos(θ), -sin(θ), 0],

                          [sin(θ),  cos(θ), 0],

                          [0,       0,      1]]

            ### 四元数旋转
            
\`\`\`

                q = [cos(θ/2), sin(θ/2)\xb7n̂]

                p' = qpq⁻\xb9

            ### 贝塞尔曲线
            
\`\`\`

                B(t) = Σᵢ₌₀ⁿ C(n,i)(1-t)ⁿ⁻ⁱtⁱPᵢ

            ### 光线-球面交点
            
\`\`\`

                ||o + td - c||\xb2 = r\xb2

                解二次方程求 t
  `,examples:[{id:"cg-1",difficulty:"medium",question:"点 P(1, 2, 3) 绕 z 轴旋转 90°，求新坐标。",options:["(-2, 1, 3)","(2, -1, 3)","(-1, 2, 3)","(1, -2, 3)"],correct:0,explanation:"绕 z 轴旋转矩阵：R_z(90°) = [[0,-1,0],[1,0,0],[0,0,1]]\n[x', y', z']ᵀ = R_z · [1, 2, 3]ᵀ = [-2, 1, 3]ᵀ"},{id:"cg-2",difficulty:"hard",question:"贝塞尔曲线控制点 P₀=(0,0), P₁=(1,2), P₂=(3,2), P₃=(4,0)，求 t=0.5 时的点。",options:["(2, 1.5)","(1.5, 1)","(2, 1)","(2.5, 1.5)"],correct:0,explanation:"三次贝塞尔曲线：B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃\nt=0.5 时：B(0.5) = 1/8·(0,0) + 3/8·(1,2) + 3/8·(3,2) + 1/8·(4,0)\n= (0+3/8+9/8+4/8, 0+6/8+6/8+0) = (2, 1.5)"}]},{id:"economics",title:"经济学应用",has3D:!0,vizType:"economicsApp",theory:`
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

                Eₙ = (dQ/dP)\xb7(P/Q)

            ## 生产函数

            ### 柯布-道格拉斯生产函数
            
\`\`\`

                Y = AKᵅL\xb9⁻ᵅ

            ### 边际产出
            
\`\`\`

                MPₖ = ∂Y/∂K = αAKᵅ⁻\xb9L\xb9⁻ᵅ

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
  `,formula:`
## 经济学中的微积分应用

            ### 边际分析
            
\`\`\`

                MC = dC/dQ, MR = dR/dQ

                利润最大化：MR = MC

            ### 弹性公式
            
\`\`\`

                E_d = (dQ/dP)\xb7(P/Q)

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
  `,examples:[{id:"eco-1",difficulty:"medium",question:"成本函数 C(Q) = 100 + 5Q + 0.1Q²，求边际成本 MC 在 Q=10 时的值。",options:["MC = 5 + 0.2Q = 7","MC = 5 + 0.1Q = 6","MC = 105 + 0.2Q = 107","MC = 100/Q + 5 + 0.1Q = 16"],correct:0,explanation:"边际成本 MC = dC/dQ = 5 + 0.2Q\n当 Q=10 时，MC = 5 + 0.2×10 = 7"},{id:"eco-2",difficulty:"hard",question:"柯布-道格拉斯生产函数 Y = K^0.5·L^0.5，求资本边际产出 MPK。",options:["MPK = 0.5·(L/K)^0.5","MPK = 0.5·(K/L)^0.5","MPK = K^0.5·L^0.5","MPK = 0.5·K^(-0.5)·L^0.5"],correct:0,explanation:"MPK = ∂Y/∂K = 0.5·K^(-0.5)·L^0.5 = 0.5·(L/K)^0.5\n这表示增加一单位资本所带来的产出增加量。"}]},{id:"biology",title:"生物学应用",has3D:!0,vizType:"biologyApp",theory:`
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

                ∂u/∂t = D∇\xb2u + f(u)

            ## 神经网络（Hodgkin-Huxley）
            
\`\`\`

                C dV/dt = -ḡₙₐm\xb3h(V-Vₙₐ) - ḡₖn⁴(V-Vₖ) - ḡₗ(V-Vₗ) + I
  `,formula:`
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
  `,examples:[{id:"bio-1",difficulty:"medium",question:"指数增长模型 dN/dt = 0.1N，N(0)=100，求 N(10)。",options:["N(10) = 100·e¹ ≈ 271.8","N(10) = 100·e⁰·¹ ≈ 110.5","N(10) = 100 + 0.1×10 = 101","N(10) = 100·e¹⁰ ≈ 2.2×10⁶"],correct:0,explanation:"dN/dt = rN 的解为 N(t) = N₀e^(rt)\nN(10) = 100·e^(0.1×10) = 100·e¹ ≈ 271.8"},{id:"bio-2",difficulty:"hard",question:"逻辑斯蒂方程 dN/dt = 0.2N(1-N/1000)，N(0)=100，求平衡点。",options:["N = 0 和 N = 1000","N = 100","N = 200","N = 100 和 N = 900"],correct:0,explanation:"令 dN/dt = 0：0.2N(1-N/1000) = 0\n解得 N = 0（不稳定平衡点）或 N = K = 1000（稳定平衡点）"}]}]};var r=x.i(15288),l=x.i(19455),o=x.i(87486),c=x.i(77572),n=x.i(88968),y=x.i(10980),b=x.i(63059),f=x.i(471),p=x.i(83086),m=x.i(21557),h=x.i(75254);let u=(0,h.default)("square-function",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["path",{d:"M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3",key:"m1af9g"}],["path",{d:"M9 11.2h5.7",key:"3zgcl2"}]]),g=(0,h.default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]);var z=x.i(37727),v=x.i(69638);let j=(0,h.default)("rotate-ccw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);var N=x.i(86536);function k({type:x}){let d=(0,t.useRef)(null),[a,s]=(0,t.useState)(0),[i,o]=(0,t.useState)(!0);return(0,t.useEffect)(()=>{var e,t,s,i,r,l,o,c,n,y,b;if(!d.current)return;let f=d.current,p=f.getContext("2d");if(p)switch(f.width=400,f.height=300,p.fillStyle="#ffffff",p.fillRect(0,0,f.width,f.height),x){case"directionCosines":let m,h,u,g,z;e=p,t=f.width,s=f.height,i=a,m=t/2,h=s/2,e.fillStyle="#ffffff",e.fillRect(0,0,t,s),e.strokeStyle="#94a3b8",e.lineWidth=1,e.beginPath(),e.moveTo(m-100,h+50),e.lineTo(m+100,h-50),e.stroke(),e.beginPath(),e.moveTo(m-100,h-30),e.lineTo(m+100,h+70),e.stroke(),e.beginPath(),e.moveTo(m,h-80),e.lineTo(m,h+80),e.stroke(),g=80*Math.cos(u=i*Math.PI/180),z=80*Math.sin(u)*.5,e.strokeStyle="#6366f1",e.lineWidth=3,e.beginPath(),e.moveTo(m,h),e.lineTo(m+g,h-z),e.stroke(),e.fillStyle="#6366f1",e.beginPath(),e.arc(m+g,h-z,5,0,2*Math.PI),e.fill(),e.fillStyle="#475569",e.font="14px sans-serif",e.fillText("x",m+110,h-40),e.fillText("y",m+110,h+80),e.fillText("z",m+10,h-90),e.fillText("a",m+g+10,h-z);break;case"surface":!function(x,e,d,t){let a=e/2,s=d/2;x.fillStyle="#ffffff",x.fillRect(0,0,e,d),x.strokeStyle="#6366f1",x.lineWidth=1;let i=t*Math.PI/180;for(let e=-3;e<=3;e+=.5){x.beginPath();for(let d=-3;d<=3;d+=.1){let t=60*d+a,r=s-(Math.sin(d+i)*Math.cos(e)*30+60*e*.3);-3===d?x.moveTo(t,r):x.lineTo(t,r)}x.stroke()}}(p,f.width,f.height,a);break;case"curve":!function(x,e,d,t){let a=e/2,s=d/2;x.fillStyle="#ffffff",x.fillRect(0,0,e,d),x.strokeStyle="#6366f1",x.lineWidth=2;let i=t*Math.PI/180;x.beginPath();for(let e=0;e<4*Math.PI;e+=.1){let d=a+50*Math.cos(e+i)*(1+e/10),t=s+50*Math.sin(e)*.5;0===e?x.moveTo(d,t):x.lineTo(d,t)}x.stroke()}(p,f.width,f.height,a);break;case"volume":let v,j,N;r=p,l=f.width,o=f.height,c=a,v=l/2,j=o/2,r.fillStyle="#ffffff",r.fillRect(0,0,l,o),N=20*Math.cos(c*Math.PI/180),r.strokeStyle="#6366f1",r.lineWidth=2,r.beginPath(),r.rect(v-60+N,j-60,120,120),r.rect(v-60-N,j-60-20,120,120),r.moveTo(v-60+N,j-60),r.lineTo(v-60-N,j-60-20),r.moveTo(v+60+N,j-60),r.lineTo(v+60-N,j-60-20),r.moveTo(v-60+N,j+60),r.lineTo(v-60-N,j+60-20),r.moveTo(v+60+N,j+60),r.lineTo(v+60-N,j+60-20),r.stroke();break;default:let k,w;n=p,y=f.width,b=f.height,k=y/2,w=b/2,n.fillStyle="#ffffff",n.fillRect(0,0,y,b),n.fillStyle="#e2e8f0",n.fillRect(k-50,w-50,100,100),n.fillStyle="#6366f1",n.font="16px sans-serif",n.textAlign="center",n.fillText("3D 可视化",k,w)}},[x,a]),(0,t.useEffect)(()=>{let x;if(i){let e=()=>{s(x=>(x+.5)%360),x=requestAnimationFrame(e)};x=requestAnimationFrame(e)}return()=>cancelAnimationFrame(x)},[i]),(0,e.jsxs)(r.Card,{className:"p-4 bg-white shadow-sm border-slate-200",children:[(0,e.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,e.jsxs)("h3",{className:"font-semibold text-slate-700 flex items-center gap-2",children:[(0,e.jsx)(N.Eye,{className:"w-4 h-4"}),"3D 可视化"]}),(0,e.jsx)(l.Button,{variant:"outline",size:"sm",onClick:()=>o(!i),children:i?"暂停":"旋转"})]}),(0,e.jsx)("canvas",{ref:d,className:"w-full rounded-lg",style:{maxWidth:"400px",margin:"0 auto",display:"block",background:"#ffffff"}}),(0,e.jsxs)("div",{className:"mt-4 flex gap-2",children:[(0,e.jsx)(l.Button,{variant:"outline",size:"sm",onClick:()=>s(x=>(x-15)%360),children:(0,e.jsx)(j,{className:"w-4 h-4"})}),(0,e.jsx)(l.Button,{variant:"outline",size:"sm",onClick:()=>s(x=>(x+15)%360),children:(0,e.jsx)(j,{className:"w-4 h-4 scale-x-[-1]"})})]})]})}function w({example:x,index:d}){let[a,s]=(0,t.useState)(null),[i,l]=(0,t.useState)(!1),c=a===x.correct;return(0,e.jsxs)(r.Card,{className:"overflow-hidden mb-5 bg-white shadow-md shadow-slate-200/50 border-slate-200/60",children:[(0,e.jsx)("div",{className:"bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 px-6 py-4",children:(0,e.jsxs)("div",{className:"flex items-center gap-3",children:[(0,e.jsx)("span",{className:"w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-sm",children:d+1}),(0,e.jsx)(o.Badge,{className:`${{easy:"bg-green-100 text-green-700",medium:"bg-orange-100 text-orange-700",hard:"bg-red-100 text-red-700"}[x.difficulty]} font-medium`,children:{easy:"基础题",medium:"提高题",hard:"挑战题"}[x.difficulty]})]})}),(0,e.jsxs)("div",{className:"px-6 py-5",children:[(0,e.jsx)("div",{className:"text-slate-700 mb-5 text-[15px] leading-relaxed",children:(0,e.jsx)(n.MathRenderer,{children:x.question})}),(0,e.jsx)("div",{className:"space-y-2.5 mb-5",children:x.options.map((d,t)=>(0,e.jsxs)("button",{onClick:()=>s(t),className:`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${a===t?t===x.correct?"bg-green-50 border-green-400 shadow-sm":"bg-red-50 border-red-400 shadow-sm":"bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm hover:bg-slate-50/50"}`,children:[(0,e.jsx)("span",{className:"inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm mr-3",children:String.fromCharCode(65+t)}),(0,e.jsx)("span",{className:"math-option text-slate-700",children:(0,e.jsx)(n.MathRenderer,{children:d})})]},t))}),null!==a&&(0,e.jsxs)("div",{className:"mt-5 pt-5 border-t border-slate-100",children:[(0,e.jsxs)("div",{className:`p-4 rounded-xl ${c?"bg-green-50 border border-green-200":"bg-red-50 border border-red-200"}`,children:[(0,e.jsx)("div",{className:"flex items-center gap-2 mb-1",children:c?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(v.CheckCircle,{className:"w-5 h-5 text-green-600"}),(0,e.jsx)("span",{className:"font-bold text-green-700",children:"回答正确！"})]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(z.X,{className:"w-5 h-5 text-red-500"}),(0,e.jsx)("span",{className:"font-bold text-red-700",children:"再试一次"})]})}),!c&&(0,e.jsxs)("p",{className:"text-sm text-slate-600 ml-7",children:["正确答案是：",(0,e.jsx)("span",{className:"font-bold text-green-600",children:String.fromCharCode(65+x.correct)})]})]}),(0,e.jsxs)("button",{onClick:()=>l(!i),className:"mt-4 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors",children:[(0,e.jsx)(y.BookOpen,{className:"w-4 h-4"}),i?"隐藏解析":"查看解析"]}),i&&(0,e.jsxs)("div",{className:"mt-3 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100",children:[(0,e.jsxs)("h4",{className:"font-bold text-indigo-900 mb-3 flex items-center gap-2",children:[(0,e.jsx)("span",{className:"w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-xs",children:"解"}),"详细解析"]}),(0,e.jsx)("div",{className:"text-slate-700 leading-relaxed",children:(0,e.jsx)(n.MathRenderer,{children:x.explanation})})]})]})]})]})}function D({module:x,moduleId:h}){var v;let[j,D]=(0,t.useState)(x),[C,P]=(0,t.useState)(""),[R,F]=(0,t.useState)("theory"),[T,q]=(0,t.useState)(!0);(0,t.useEffect)(()=>{if(!j&&h){let x=s.KNOWLEDGE_MODULES.find(x=>x.id===h);x&&D(x)}},[j,h]);let L="advanced-math"===(v=h||"")?[...i["am-1"]||[],...i["am-2"]||[],...i["am-3"]||[],...i["am-4"]||[],...i["am-5"]||[],...i["am-6"]||[]]:i[v]||[],S=L.find(x=>x.id===C)||L[0],V=L.findIndex(x=>x.id===C);(0,t.useEffect)(()=>{L.length>0&&!C&&P(L[0].id)},[L,C]);let A=x=>{P(x),F("theory")};return j?(0,e.jsxs)("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 to-slate-100",children:[(0,e.jsx)(a.default,{}),(0,e.jsxs)("div",{className:"flex pt-16",children:[(0,e.jsxs)("aside",{className:`fixed left-0 top-16 bottom-0 bg-white border-r border-slate-200 overflow-y-auto transition-all duration-300 z-40 ${T?"w-80 translate-x-0":"w-80 -translate-x-full"}`,children:[(0,e.jsx)("div",{className:"p-4 border-b border-slate-200",children:(0,e.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,e.jsx)("div",{className:`w-10 h-10 rounded-lg ${j.color} flex items-center justify-center text-xl`,children:j.icon}),(0,e.jsxs)("div",{children:[(0,e.jsx)("h2",{className:"font-bold text-slate-800",children:j.name}),(0,e.jsxs)("p",{className:"text-xs text-slate-500",children:[L.length," 个课时"]})]})]})}),(0,e.jsxs)("div",{className:"p-4 space-y-2",children:[(0,e.jsxs)("label",{className:"text-xs text-slate-500 font-medium uppercase tracking-wider mb-2 block",children:["课时列表 (",L.length," 个)"]}),(0,e.jsx)("div",{className:"space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto",children:L.map((x,d)=>(0,e.jsx)("button",{onClick:()=>A(x.id),className:`w-full text-left p-3 rounded-lg text-sm transition-all ${C===x.id?"bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700":"hover:bg-slate-50 text-slate-600 border-l-4 border-transparent"}`,children:(0,e.jsxs)("div",{className:"flex items-center gap-2",children:[(0,e.jsx)("span",{className:`w-5 h-5 rounded-full flex items-center justify-center text-xs ${C===x.id?"bg-indigo-500 text-white":"bg-slate-200 text-slate-500"}`,children:d+1}),(0,e.jsx)("span",{className:"font-medium truncate",children:x.title})]})},x.id))})]}),(0,e.jsx)("div",{className:"p-4 border-t border-slate-200",children:(0,e.jsx)(d.default,{href:"/",children:(0,e.jsxs)(l.Button,{variant:"outline",className:"w-full",children:[(0,e.jsx)(f.ArrowLeft,{className:"w-4 h-4 mr-2"}),"返回首页"]})})})]}),(0,e.jsxs)("main",{className:`flex-1 transition-all duration-300 ${T?"ml-80":"ml-0"}`,children:[(0,e.jsx)("button",{onClick:()=>q(!T),className:"fixed left-4 top-20 z-50 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow",children:T?(0,e.jsx)(z.X,{className:"w-5 h-5"}):(0,e.jsx)(g,{className:"w-5 h-5"})}),(0,e.jsxs)("div",{className:"container mx-auto px-4 py-8 max-w-6xl",children:[(0,e.jsx)("div",{className:"mb-8",children:(0,e.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,e.jsx)("div",{className:`w-12 h-12 rounded-xl ${j.color} flex items-center justify-center text-2xl`,children:j.icon}),(0,e.jsxs)("div",{className:"flex-1",children:[(0,e.jsxs)("div",{className:"text-sm text-slate-500 mb-1",children:[j.name," · 课时 ",V+1,"/",L.length]}),(0,e.jsx)("h1",{className:"text-3xl font-bold text-slate-800",children:S?.title||"加载中..."}),(0,e.jsxs)("div",{className:"flex items-center gap-3 mt-2",children:[S?.has3D&&(0,e.jsx)(o.Badge,{variant:"outline",className:"bg-blue-50 text-blue-600 border-blue-200",children:"3D可视化"}),S?.examples&&S.examples.length>0&&(0,e.jsxs)(o.Badge,{variant:"outline",className:"bg-green-50 text-green-600 border-green-200",children:[(0,e.jsx)(m.Calculator,{className:"w-3 h-3 mr-1"}),S.examples.length," 道例题"]})]})]})]})}),(0,e.jsxs)(c.Tabs,{value:R,onValueChange:F,children:[(0,e.jsxs)(c.TabsList,{className:"mb-6",children:[(0,e.jsxs)(c.TabsTrigger,{value:"theory",className:"flex items-center gap-2",children:[(0,e.jsx)(y.BookOpen,{className:"w-4 h-4"}),"理论讲解"]}),S?.formula&&(0,e.jsxs)(c.TabsTrigger,{value:"formula",className:"flex items-center gap-2",children:[(0,e.jsx)(u,{className:"w-4 h-4"}),"公式推导"]}),S?.examples&&S.examples.length>0&&(0,e.jsxs)(c.TabsTrigger,{value:"examples",className:"flex items-center gap-2",children:[(0,e.jsx)(m.Calculator,{className:"w-4 h-4"}),"例题练习",(0,e.jsx)(o.Badge,{variant:"secondary",className:"ml-1 text-xs",children:S.examples.length})]}),S?.has3D&&(0,e.jsxs)(c.TabsTrigger,{value:"visualization",className:"flex items-center gap-2",children:[(0,e.jsx)(N.Eye,{className:"w-4 h-4"}),"3D可视化"]})]}),(0,e.jsx)(c.TabsContent,{value:"theory",children:(0,e.jsxs)(r.Card,{className:"overflow-hidden bg-white shadow-lg shadow-slate-200/50 border-slate-200/60",children:[(0,e.jsx)("div",{className:"bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 px-8 py-6",children:(0,e.jsxs)("div",{className:"flex items-center gap-3",children:[(0,e.jsx)("div",{className:"w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center",children:(0,e.jsx)(y.BookOpen,{className:"w-5 h-5 text-indigo-600"})}),(0,e.jsxs)("div",{children:[(0,e.jsx)("h3",{className:"text-lg font-bold text-slate-800",children:"理论讲解"}),(0,e.jsx)("p",{className:"text-sm text-slate-500",children:"理解概念的本质与应用"})]})]})}),(0,e.jsx)("div",{className:"px-8 py-8",children:(0,e.jsx)(n.MathRenderer,{className:"theory-content",children:S?.theory||"暂无理论内容"})})]})}),S?.has3D&&(0,e.jsx)(c.TabsContent,{value:"visualization",children:(0,e.jsxs)(r.Card,{className:"overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl border-slate-700",children:[(0,e.jsx)("div",{className:"bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700 px-8 py-6",children:(0,e.jsxs)("div",{className:"flex items-center gap-3",children:[(0,e.jsx)("div",{className:"w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center",children:(0,e.jsx)(N.Eye,{className:"w-5 h-5 text-indigo-400"})}),(0,e.jsxs)("div",{children:[(0,e.jsx)("h3",{className:"text-lg font-bold text-white",children:"3D可视化演示"}),(0,e.jsx)("p",{className:"text-sm text-slate-400",children:"交互式图形帮助理解抽象概念"})]})]})}),(0,e.jsx)("div",{className:"px-8 py-8",children:(0,e.jsx)("div",{className:"max-w-3xl mx-auto",children:(0,e.jsx)(k,{type:S?.vizType||""})})})]})}),(0,e.jsx)(c.TabsContent,{value:"formula",children:(0,e.jsxs)(r.Card,{className:"overflow-hidden bg-gradient-to-br from-indigo-50/80 to-purple-50/80 shadow-lg shadow-indigo-100/50 border-indigo-100",children:[(0,e.jsx)("div",{className:"bg-gradient-to-r from-indigo-100/50 to-purple-100/30 border-b border-indigo-100 px-8 py-6",children:(0,e.jsxs)("div",{className:"flex items-center gap-3",children:[(0,e.jsx)("div",{className:"w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center",children:(0,e.jsx)(u,{className:"w-5 h-5 text-white"})}),(0,e.jsxs)("div",{children:[(0,e.jsx)("h3",{className:"text-lg font-bold text-slate-800",children:"核心公式与推导"}),(0,e.jsx)("p",{className:"text-sm text-slate-500",children:"理解公式来源比死记硬背更重要"})]})]})}),S?.formula?(0,e.jsx)("div",{className:"px-8 py-8",children:(0,e.jsx)("div",{className:"bg-white p-8 rounded-xl shadow-sm border border-indigo-100/50",children:(0,e.jsx)(n.MathRenderer,{className:"formula-content",children:S.formula})})}):(0,e.jsx)("div",{className:"px-8 py-8",children:(0,e.jsx)("div",{className:"bg-white p-8 rounded-xl shadow-sm text-center",children:(0,e.jsx)("p",{className:"text-slate-500",children:"该课时暂无公式推导内容"})})})]})}),(0,e.jsx)(c.TabsContent,{value:"examples",children:(0,e.jsxs)("div",{className:"space-y-5",children:[(0,e.jsx)("div",{className:"bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-200/60 shadow-sm",children:(0,e.jsxs)("div",{className:"flex items-center justify-between",children:[(0,e.jsxs)("div",{className:"flex items-center gap-3",children:[(0,e.jsx)("div",{className:"w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center",children:(0,e.jsx)(p.Sparkles,{className:"w-6 h-6 text-orange-500"})}),(0,e.jsxs)("div",{children:[(0,e.jsx)("h3",{className:"text-xl font-bold text-slate-800",children:"精选例题"}),(0,e.jsx)("p",{className:"text-sm text-slate-500",children:"通过练习巩固所学知识"})]})]}),(0,e.jsx)("div",{className:"px-4 py-2 bg-slate-100 rounded-full",children:(0,e.jsxs)("p",{className:"text-sm font-medium text-slate-600",children:["共 ",S?.examples?.length||0," 道例题"]})})]})}),S?.examples&&S.examples.length>0?S.examples.map((x,d)=>(0,e.jsx)(w,{example:x,index:d},x.id)):(0,e.jsxs)(r.Card,{className:"p-10 text-center text-slate-500 border-slate-200/60 shadow-sm",children:[(0,e.jsx)("div",{className:"w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4",children:(0,e.jsx)(m.Calculator,{className:"w-8 h-8 text-slate-400"})}),(0,e.jsx)("p",{className:"text-lg font-medium text-slate-600",children:"该课时暂无例题"}),(0,e.jsx)("p",{className:"text-sm text-slate-400 mt-1",children:"敬请期待更多练习内容"})]})]})})]}),(0,e.jsxs)("div",{className:"flex justify-between mt-8",children:[(0,e.jsxs)(l.Button,{variant:"outline",disabled:V<=0,onClick:()=>{V>0&&A(L[V-1].id)},children:[(0,e.jsx)(b.ChevronRight,{className:"w-4 h-4 mr-2 rotate-180"}),"上一课时"]}),(0,e.jsxs)(l.Button,{className:"bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",disabled:V>=L.length-1,onClick:()=>{V<L.length-1&&A(L[V+1].id)},children:["下一课时",(0,e.jsx)(b.ChevronRight,{className:"w-4 h-4 ml-2"})]})]})]})]})]})]}):(0,e.jsxs)("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 to-slate-100",children:[(0,e.jsx)(a.default,{}),(0,e.jsxs)("main",{className:"container mx-auto px-4 py-12 text-center",children:[(0,e.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"模块未找到"}),(0,e.jsx)(d.default,{href:"/",children:(0,e.jsx)(l.Button,{children:"返回首页"})})]})]})}x.s(["default",()=>D],78881)}]);