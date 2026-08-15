// 高中数学精编题库（50道）
const HIGH_SCHOOL_HARD_QUESTIONS = [
  // 函数与导数（15道）
  { title: '函数零点与方程根', content: '已知函数 $f(x) = x^2 - 2x + a(e^{x-1} + e^{-x+1})$ 有唯一零点，则 $a = $ ？', answer: '配方得 $f(x)=(x-1)^2-1+a(e^{x-1}+e^{-x+1})$。令 $t=x-1$，则 $g(t)=t^2-1+a(e^t+e^{-t})$ 为偶函数。唯一零点必在 $t=0$，故 $g(0)=2a-1=0$，$a=\\frac{1}{2}$。', difficulty: 4 },
  { title: '导数与不等式恒成立', content: '已知 $f(x)=e^x-ax^2-bx-c$ 对所有 $x\\in\\mathbb{R}$ 有 $f(x)\\geq 0$，求 $a$ 的最大值。', answer: "由泰勒展开 $e^x\\geq 1+x+\\frac{x^2}{2}$，当 $a\\leq \\frac{1}{2}$ 时可取 $b=1,c=1$ 使 $f(x)\\geq 0$。若 $a>\\frac{1}{2}$，在 $x=0$ 处 $f(0)=1-c$，需 $c\\leq 1$；但 $f''(0)=1-2a<0$，故 $x=0$ 不是极小值点，矛盾。所以 $a_{\\max}=\\frac{1}{2}$。", difficulty: 5 },
  { title: '函数单调性与参数范围', content: '设 $f(x)=\\ln x-ax+\\frac{1-a}{x}-1$（$a\\in\\mathbb{R}$）。讨论 $f(x)$ 的单调性。', answer: '求导 $f\'(x)=\\frac{1}{x}-a-\\frac{1-a}{x^2}=\\frac{-ax^2+x-(1-a)}{x^2}=\\frac{-(ax-(1-a))(x-1)}{x^2}$。\\n当 $a\\leq 0$ 时，$f(x)$ 在 $(0,1)$ 递减，$(1,+\\infty)$ 递增；\\n当 $0<a<\\frac{1}{2}$ 时，在 $(0,1)$ 和 $(\\frac{1-a}{a},+\\infty)$ 递减，$(1,\\frac{1-a}{a})$ 递增；\\n当 $a=\\frac{1}{2}$ 时，全程递减；\\n当 $\\frac{1}{2}<a<1$ 时，在 $(0,\\frac{1-a}{a})$ 和 $(1,+\\infty)$ 递减；\\n当 $a\\geq 1$ 时，在 $(0,1)$ 递增，$(1,+\\infty)$ 递减。', difficulty: 4 },
  { title: '极值点偏移', content: '已知 $f(x)=xe^{-x}$，若 $f(x_1)=f(x_2)$ 且 $x_1\\neq x_2$，证明：$x_1+x_2>2$。', answer: '由 $f(x)=xe^{-x}$，$f\'(x)=(1-x)e^{-x}$，在 $x=1$ 处取最大值 $\\frac{1}{e}$。不妨设 $x_1<1<x_2$。要证 $x_1+x_2>2$，即 $x_2>2-x_1$。由于 $f(x)$ 在 $(1,+\\infty)$ 递减，只需证 $f(x_2)<f(2-x_1)$，即 $f(x_1)<f(2-x_1)$。构造 $g(x)=f(x)-f(2-x)$（$x<1$），可证 $g(x)<0$，故结论成立。', difficulty: 5 },
  { title: '导数与数列不等式', content: '证明：$\\sum_{k=1}^{n} \\frac{1}{k^2}<\\frac{5}{3}$ 对所有正整数 $n$ 成立。', answer: '当 $n\\geq 2$ 时，$\\frac{1}{k^2}<\\frac{1}{k^2-\\frac{1}{4}}=\\frac{1}{(k-\\frac{1}{2})(k+\\frac{1}{2})}=\\frac{1}{k-\\frac{1}{2}}-\\frac{1}{k+\\frac{1}{2}}$。\\n裂项相消得 $\\sum_{k=2}^{n}\\frac{1}{k^2}<1-\\frac{1}{n+\\frac{1}{2}}<1$。\\n加上 $k=1$ 项，总和 $<1+1=2$。更精细估计可得 $<\\frac{5}{3}$（$n=2$ 时 $1+\\frac{1}{4}=\\frac{5}{4}<\\frac{5}{3}$，$n\\geq 3$ 时 $\\frac{1}{k^2}\\leq \\frac{1}{k(k-1)}$）。', difficulty: 4 },
  { title: '函数最值应用', content: '求函数 $f(x)=\\sqrt{x^2+1}+\\sqrt{(x-3)^2+4}$ 的最小值。', answer: '几何意义：点 $(x,0)$ 到 $(0,1)$ 和 $(3,2)$ 的距离之和。作 $(0,1)$ 关于 $x$ 轴的对称点 $(0,-1)$，则最小值为 $(0,-1)$ 到 $(3,2)$ 的距离 $\\sqrt{9+9}=3\\sqrt{2}$。', difficulty: 3 },
  { title: '导数证明不等式', content: '证明：当 $x>0$ 时，$\\sin x>x-\\frac{x^3}{6}$。', answer: "设 $f(x)=\\sin x-x+\\frac{x^3}{6}$，$f(0)=0$，$f\'(x)=\\cos x-1+\\frac{x^2}{2}$，$f\'(0)=0$，$f\'\'(x)=-\\sin x+x$，$f\'\'(0)=0$，$f\'\'''(x)=-\\cos x+1\\geq 0$。故 $f\'\'(x)$ 递增，$f\'\'(x)\\geq 0$，进而 $f\'(x)\\geq 0$，$f(x)\\geq 0$。", difficulty: 3 },
  { title: '指数对数综合', content: '已知 $a>0$ 且 $a\\neq 1$，函数 $f(x)=a^x+x^2-x\\ln a-a$。讨论 $f(x)$ 的零点个数。', answer: '$f(0)=1-a$，$f(1)=a+1-\\ln a-a=1-\\ln a$，$f\'(x)=a^x\\ln a+2x-\\ln a=(a^x-1)\\ln a+2x$。\\n当 $a>1$ 时，$x>0$ 则 $f\'(x)>0$，$x<0$ 时 $a^x<1$，$(a^x-1)\\ln a<0$，但 $2x<0$，需进一步分析。可证 $f(x)$ 在 $x=0$ 处取最小值 $f(0)=1-a<0$，且 $\\lim_{x\\to\\pm\\infty}f(x)=+\\infty$，故有两个零点。\\n当 $0<a<1$ 时类似，也有两个零点。', difficulty: 4 },
  { title: '隐函数求导', content: '由方程 $x^3+y^3-3xy=0$ 确定 $y=y(x)$，求 $\\frac{dy}{dx}$ 及极值点。', answer: '两边对 $x$ 求导：$3x^2+3y^2y\'-3y-3xy\'=0$，解得 $y\'=\\frac{y-x^2}{y^2-x}$。令 $y\'=0$，则 $y=x^2$，代入原方程得 $x^3+x^6-3x^3=0$，$x^3(x^3-2)=0$，$x=0$ 或 $x=\\sqrt[3]{2}$。经检验 $(\\sqrt[3]{2},\\sqrt[3]{4})$ 是极大值点。', difficulty: 3 },
  { title: '参数方程求导', content: '设 $\\begin{cases}x=t-\\sin t\\\\ y=1-\\cos t\\end{cases}$，求 $\\frac{d^2y}{dx^2}$。', answer: '$\\frac{dy}{dt}=\\sin t$，$\\frac{dx}{dt}=1-\\cos t$，故 $\\frac{dy}{dx}=\\frac{\\sin t}{1-\\cos t}=\\cot\\frac{t}{2}$。\\n$\\frac{d^2y}{dx^2}=\\frac{d}{dt}(\\cot\\frac{t}{2})\\cdot \\frac{dt}{dx}=(-\\frac{1}{2}\\csc^2\\frac{t}{2})\\cdot \\frac{1}{1-\\cos t}=-\\frac{1}{(1-\\cos t)^2}$。', difficulty: 3 },
  { title: '切线方程与公切线', content: '求曲线 $y=e^x$ 与 $y=\\ln x$ 的公切线方程。', answer: '设公切线切 $y=e^x$ 于 $(a,e^a)$，切 $y=\\ln x$ 于 $(b,\\ln b)$。斜率 $e^a=\\frac{1}{b}$，且 $\\frac{\\ln b-e^a}{b-a}=e^a$。由 $b=e^{-a}$，代入得 $\\frac{-a-e^a}{e^{-a}-a}=e^a$，化简得 $(1-ae^a)(1+e^{2a})=0$，故 $ae^a=1$，即 $a$ 满足此式。唯一实解 $a\\approx 0.567$，公切线 $y=e^a x+e^a(1-a)$。', difficulty: 5 },
  { title: '定积分求面积', content: '求曲线 $y=x^2$ 与 $y=\\sqrt{x}$ 围成的区域面积。', answer: '交点：$x^2=\\sqrt{x}$，$x^4=x$，$x=0$ 或 $x=1$。面积 $S=\\int_0^1(\\sqrt{x}-x^2)dx=[\\frac{2}{3}x^{3/2}-\\frac{1}{3}x^3]_0^1=\\frac{2}{3}-\\frac{1}{3}=\\frac{1}{3}$。', difficulty: 2 },
  { title: '旋转体体积', content: '求由 $y=\\sin x$（$0\\leq x\\leq \\pi$）与 $x$ 轴围成的区域绕 $x$ 轴旋转一周所得体积。', answer: '$V=\\pi\\int_0^\\pi \\sin^2 x\\,dx=\\pi\\int_0^\\pi \\frac{1-\\cos 2x}{2}dx=\\pi[\\frac{x}{2}-\\frac{\\sin 2x}{4}]_0^\\pi=\\frac{\\pi^2}{2}$。', difficulty: 2 },
  { title: '函数奇偶性与周期性', content: '设 $f(x)$ 是定义在 $\\mathbb{R}$ 上的奇函数，满足 $f(x+2)=-f(x)$，当 $0\\leq x\\leq 1$ 时 $f(x)=x$，求 $f(\\frac{15}{2})$。', answer: '由 $f(x+2)=-f(x)$ 得 $f(x+4)=f(x)$，周期为 4。$f(\\frac{15}{2})=f(\\frac{15}{2}-8)=f(-\\frac{1}{2})=-f(\\frac{1}{2})=-\\frac{1}{2}$。', difficulty: 2 },
  { title: '复合函数定义域', content: '已知 $f(x)$ 定义域为 $[0,1]$，求 $g(x)=f(x+a)+f(x-a)$（$a>0$）的定义域。', answer: '需 $0\\leq x+a\\leq 1$ 且 $0\\leq x-a\\leq 1$，即 $-a\\leq x\\leq 1-a$ 且 $a\\leq x\\leq 1+a$。\\n当 $0<a\\leq \\frac{1}{2}$ 时，定义域 $[a,1-a]$；\\n当 $a>\\frac{1}{2}$ 时，无解，定义域为空集。', difficulty: 2 },

  // 数列（8道）
  { title: '等差等比综合', content: '已知等差数列 ${a_n}$ 公差 $d\\neq 0$，$a_1,a_3,a_9$ 成等比数列，求 $\\frac{a_1+a_3+a_9}{a_2+a_4+a_{10}}$。', answer: '$a_3=a_1+2d$，$a_9=a_1+8d$。由等比 $(a_1+2d)^2=a_1(a_1+8d)$，得 $4d^2=4a_1d$，$a_1=d$。\\n分子 $a_1+a_3+a_9=d+3d+9d=13d$，分母 $a_2+a_4+a_{10}=2d+4d+10d=16d$，比值为 $\\frac{13}{16}$。', difficulty: 3 },
  { title: '递推数列通项', content: '数列 ${a_n}$ 满足 $a_1=1$，$a_{n+1}=2a_n+3^n$，求通项公式。', answer: '两边除以 $3^{n+1}$：$\\frac{a_{n+1}}{3^{n+1}}=\\frac{2}{3}\\cdot\\frac{a_n}{3^n}+\\frac{1}{3}$。令 $b_n=\\frac{a_n}{3^n}$，则 $b_{n+1}=\\frac{2}{3}b_n+\\frac{1}{3}$，$b_1=\\frac{1}{3}$。\\n$b_{n+1}-1=\\frac{2}{3}(b_n-1)$，故 $b_n-1=(\\frac{1}{3}-1)(\\frac{2}{3})^{n-1}=-\\frac{2}{3}(\\frac{2}{3})^{n-1}=-(\\frac{2}{3})^n$。\\n$a_n=3^n(1-(\\frac{2}{3})^n)=3^n-2^n$。', difficulty: 4 },
  { title: '数列求和裂项', content: '求 $S_n=\\sum_{k=1}^n \\frac{1}{k(k+2)}$。', answer: '$\\frac{1}{k(k+2)}=\\frac{1}{2}(\\frac{1}{k}-\\frac{1}{k+2})$。\\n$S_n=\\frac{1}{2}[(1-\\frac{1}{3})+(\\frac{1}{2}-\\frac{1}{4})+...+(\\frac{1}{n}-\\frac{1}{n+2})]=\\frac{1}{2}(1+\\frac{1}{2}-\\frac{1}{n+1}-\\frac{1}{n+2})=\\frac{3}{4}-\\frac{2n+3}{2(n+1)(n+2)}$。', difficulty: 3 },
  { title: '数学归纳法', content: '证明：$\\sum_{k=1}^n \\frac{1}{\\sqrt{k}}>2(\\sqrt{n+1}-1)$ 对所有 $n\\geq 1$ 成立。', answer: '当 $n=1$ 时，$1>2(\\sqrt{2}-1)\\approx 0.828$，成立。\\n假设 $n=m$ 成立，$n=m+1$ 时左边增加 $\\frac{1}{\\sqrt{m+1}}$，右边增加 $2(\\sqrt{m+2}-\\sqrt{m+1})=\\frac{2}{\\sqrt{m+2}+\\sqrt{m+1}}<\\frac{1}{\\sqrt{m+1}}$，故不等式保持。', difficulty: 4 },
  { title: '等比数列性质', content: '等比数列 ${a_n}$ 中，$a_1+a_2+a_3=7$，$a_1a_2a_3=8$，求通项公式。', answer: '设公比 $q$，则 $a_1(1+q+q^2)=7$，$a_1^3q^3=8$，$a_1q=2$。代入得 $\\frac{2}{q}(1+q+q^2)=7$，$2q^2-5q+2=0$，$q=2$ 或 $q=\\frac{1}{2}$。\\n若 $q=2$，$a_1=1$，$a_n=2^{n-1}$；若 $q=\\frac{1}{2}$，$a_1=4$，$a_n=4(\\frac{1}{2})^{n-1}=2^{3-n}$。', difficulty: 3 },
  { title: '数列不等式放缩', content: '设 $a_n=(1+\\frac{1}{n})^n$，证明 ${a_n}$ 单调递增且有上界。', answer: '由均值不等式，$(1+\\frac{1}{n})^n=(\\frac{n+1}{n})^n=1\\cdot(\\frac{n+1}{n})\\cdots(\\frac{n+1}{n})<(\\frac{1+n\\cdot\\frac{n+1}{n}}{n+1})^{n+1}=(\\frac{n+2}{n+1})^{n+1}=a_{n+1}$。\\n又 $(1+\\frac{1}{n})^n=\\sum_{k=0}^n C_n^k \\frac{1}{n^k}<\\sum_{k=0}^n \\frac{1}{k!}<1+1+\\frac{1}{2}+\\frac{1}{6}+...<3$。', difficulty: 5 },
  { title: '递推与求和', content: '已知 $a_1=1$，$a_n+a_{n+1}=2n+1$，求 $a_{20}$ 及 $S_{20}$。', answer: '由 $a_n+a_{n+1}=2n+1$，$a_{n+1}+a_{n+2}=2n+3$，相减得 $a_{n+2}-a_n=2$。\\n奇数项：$a_1=1,a_3=3,a_5=5,...$ 即 $a_{2k-1}=2k-1$；\\n偶数项：$a_2=2,a_4=4,...$ 即 $a_{2k}=2k$。\\n故 $a_n=n$，$a_{20}=20$，$S_{20}=210$。', difficulty: 3 },
  { title: '数列与函数综合', content: '设 $f(x)=\\frac{x}{1+x}$，$a_1=1$，$a_{n+1}=f(a_n)$，求 $a_n$ 及 $\\sum_{k=1}^n \\frac{1}{a_k a_{k+1}}$。', answer: '$a_{n+1}=\\frac{a_n}{1+a_n}$，取倒数得 $\\frac{1}{a_{n+1}}=\\frac{1}{a_n}+1$，故 $\\frac{1}{a_n}=n$，$a_n=\\frac{1}{n}$。\\n$\\frac{1}{a_k a_{k+1}}=k(k+1)=k^2+k$，求和得 $\\frac{n(n+1)(2n+1)}{6}+\\frac{n(n+1)}{2}=\\frac{n(n+1)(n+2)}{3}$。', difficulty: 4 },

  // 三角函数与解三角形（8道）
  { title: '三角恒等变换', content: '已知 $\\sin\\alpha+\\cos\\alpha=\\frac{1}{5}$，$\\alpha\\in(0,\\pi)$，求 $\\tan\\alpha$。', answer: '平方得 $1+\\sin 2\\alpha=\\frac{1}{25}$，$\\sin 2\\alpha=-\\frac{24}{25}$。由 $\\alpha\\in(0,\\pi)$ 且 $\\sin\\alpha+\\cos\\alpha>0$，知 $\\alpha\\in(\\frac{\\pi}{2},\\frac{3\\pi}{4})$。\\n$(\\sin\\alpha-\\cos\\alpha)^2=1-\\sin 2\\alpha=\\frac{49}{25}$，$\\sin\\alpha-\\cos\\alpha=\\frac{7}{5}$。联立解得 $\\sin\\alpha=\\frac{4}{5}$，$\\cos\\alpha=-\\frac{3}{5}$，$\\tan\\alpha=-\\frac{4}{3}$。', difficulty: 3 },
  { title: '解三角形综合', content: '在 $\\triangle ABC$ 中，$\\cos A=\\frac{4}{5}$，$\\cos C=\\frac{5}{13}$，$a=1$，求 $b$。', answer: '$\\sin A=\\frac{3}{5}$，$\\sin C=\\frac{12}{13}$，$\\sin B=\\sin(A+C)=\\sin A\\cos C+\\cos A\\sin C=\\frac{3}{5}\\cdot\\frac{5}{13}+\\frac{4}{5}\\cdot\\frac{12}{13}=\\frac{63}{65}$。\\n由正弦定理 $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$，$b=\\frac{\\sin B}{\\sin A}=\\frac{63/65}{3/5}=\\frac{21}{13}$。', difficulty: 3 },
  { title: '三角形面积最值', content: '在 $\\triangle ABC$ 中，$c=2$，$C=\\frac{\\pi}{3}$，求面积最大值。', answer: '由余弦定理 $c^2=a^2+b^2-2ab\\cos C$，$4=a^2+b^2-ab\\geq ab$（因为 $a^2+b^2\\geq 2ab$）。\\n面积 $S=\\frac{1}{2}ab\\sin C\\leq \\frac{1}{2}\\cdot 4\\cdot \\frac{\\sqrt{3}}{2}=\\sqrt{3}$。\\n当 $a=b=2$ 即等边三角形时取等。', difficulty: 3 },
  { title: '正弦定理应用', content: '在 $\\triangle ABC$ 中，$a\\cos B+b\\cos A=2c\\cos C$，求角 $C$。', answer: '由射影定理 $a\\cos B+b\\cos A=c$，故 $c=2c\\cos C$，$\\cos C=\\frac{1}{2}$，$C=\\frac{\\pi}{3}$。', difficulty: 2 },
  { title: '三角函数图像', content: '函数 $f(x)=\\sin(\\omega x+\\varphi)$（$\\omega>0$，$|\\varphi|<\\frac{\\pi}{2}$）的最小正周期为 $\\pi$，且 $f(\\frac{\\pi}{4})$ 为最大值，求 $f(x)$。', answer: '$T=\\frac{2\\pi}{\\omega}=\\pi$，$\\omega=2$。$f(\\frac{\\pi}{4})=\\sin(\\frac{\\pi}{2}+\\varphi)=1$，故 $\\varphi=0$。$f(x)=\\sin 2x$。', difficulty: 2 },
  { title: '三角恒等式证明', content: '证明：$\\frac{1+\\sin 2\\theta-\\cos 2\\theta}{1+\\sin 2\\theta+\\cos 2\\theta}=\\tan\\theta$。', answer: '分子 $=1+2\\sin\\theta\\cos\\theta-(1-2\\sin^2\\theta)=2\\sin\\theta(\\cos\\theta+\\sin\\theta)$。\\n分母 $=1+2\\sin\\theta\\cos\\theta+(2\\cos^2\\theta-1)=2\\cos\\theta(\\sin\\theta+\\cos\\theta)$。\\n比值 $=\\frac{\\sin\\theta}{\\cos\\theta}=\\tan\\theta$。', difficulty: 3 },
  { title: '解三角形与面积', content: '在 $\\triangle ABC$ 中，$a+b=5$，$c=\\sqrt{7}$，$C=\\frac{\\pi}{3}$，求面积。', answer: '由余弦定理 $7=a^2+b^2-ab=(a+b)^2-3ab=25-3ab$，$ab=6$。\\n面积 $S=\\frac{1}{2}ab\\sin C=\\frac{1}{2}\\cdot 6\\cdot \\frac{\\sqrt{3}}{2}=\\frac{3\\sqrt{3}}{2}$。', difficulty: 2 },
  { title: '三角函数最值', content: '求 $y=\\sin x+\\sqrt{3}\\cos x$ 在 $[0,\\pi]$ 上的最大值和最小值。', answer: '$y=2\\sin(x+\\frac{\\pi}{3})$。当 $x\\in[0,\\pi]$，$x+\\frac{\\pi}{3}\\in[\\frac{\\pi}{3},\\frac{4\\pi}{3}]$。\\n最大值为 $2$（当 $x=\\frac{\\pi}{6}$），最小值为 $-\\sqrt{3}$（当 $x=\\pi$）。', difficulty: 2 },

  // 解析几何（7道）
  { title: '椭圆性质', content: '椭圆 $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$（$a>b>0$）的离心率 $e=\\frac{1}{2}$，右焦点到左顶点的距离为 3，求椭圆方程。', answer: '$e=\\frac{c}{a}=\\frac{1}{2}$，$c=\\frac{a}{2}$。右焦点 $(c,0)$ 到左顶点 $(-a,0)$ 距离为 $a+c=\\frac{3a}{2}=3$，$a=2$，$c=1$，$b=\\sqrt{3}$。方程为 $\\frac{x^2}{4}+\\frac{y^2}{3}=1$。', difficulty: 2 },
  { title: '双曲线与渐近线', content: '双曲线 $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ 的离心率为 $\\sqrt{3}$，求渐近线方程。', answer: '$e=\\frac{c}{a}=\\sqrt{3}$，$c^2=3a^2=a^2+b^2$，$b^2=2a^2$，$\\frac{b}{a}=\\sqrt{2}$。渐近线 $y=\\pm\\sqrt{2}x$。', difficulty: 2 },
  { title: '抛物线焦点弦', content: '过抛物线 $y^2=4x$ 焦点 $F$ 的直线交抛物线于 $A,B$，若 $|AF|=2$，求 $|BF|$。', answer: '焦点 $(1,0)$，准线 $x=-1$。设 $A(x_1,y_1)$，$|AF|=x_1+1=2$，$x_1=1$，$y_1=\\pm 2$。直线斜率 $k=\\pm 2$，方程 $y=\\pm 2(x-1)$。与抛物线联立得 $B$ 的横坐标，$|BF|=x_B+1=2$（焦点弦性质 $\\frac{1}{|AF|}+\\frac{1}{|BF|}=\\frac{2}{p}=1$）。', difficulty: 4 },
  { title: '直线与圆', content: '圆 $x^2+y^2=4$ 的切线与坐标轴交于 $A,B$，求 $\\triangle OAB$ 面积的最小值。', answer: '设切线 $\\frac{x}{a}+\\frac{y}{b}=1$，圆心到直线距离 $\\frac{|ab|}{\\sqrt{a^2+b^2}}=2$。面积 $S=\\frac{1}{2}|ab|$，由 $\\frac{a^2b^2}{a^2+b^2}=4$ 得 $\\frac{1}{a^2}+\\frac{1}{b^2}=\\frac{1}{4}$。由均值 $\\frac{1}{a^2}+\\frac{1}{b^2}\\geq \\frac{2}{|ab|}$，故 $\\frac{1}{4}\\geq \\frac{2}{|ab|}$，$|ab|\\geq 8$，$S_{\\min}=4$。', difficulty: 4 },
  { title: '椭圆弦中点', content: '椭圆 $\\frac{x^2}{4}+\\frac{y^2}{3}=1$，求以 $M(1,1)$ 为中点的弦所在直线方程。', answer: '设弦两端点 $A(x_1,y_1),B(x_2,y_2)$，则 $\\frac{x_1^2}{4}+\\frac{y_1^2}{3}=1$，$\\frac{x_2^2}{4}+\\frac{y_2^2}{3}=1$。相减得 $\\frac{(x_1-x_2)(x_1+x_2)}{4}+\\frac{(y_1-y_2)(y_1+y_2)}{3}=0$。\\n$\\frac{y_1-y_2}{x_1-x_2}=-\\frac{3(x_1+x_2)}{4(y_1+y_2)}=-\\frac{3}{4}$。直线 $y-1=-\\frac{3}{4}(x-1)$。', difficulty: 3 },
  { title: '点到直线距离', content: '点 $P(2,1)$ 到直线 $l: mx-y+\\frac{1}{2}=0$ 的距离为 $d$，求 $d$ 的最大值。', answer: '直线过定点 $Q(0,\\frac{1}{2})$。$d\\leq |PQ|=\\sqrt{4+\\frac{1}{4}}=\\frac{\\sqrt{17}}{2}$，当 $l\\perp PQ$ 时取等。', difficulty: 2 },
  { title: '参数方程与极坐标', content: '曲线 $C$ 的参数方程为 $\\begin{cases}x=2+2\\cos\\theta\\\\ y=2\\sin\\theta\\end{cases}$，直线 $l$ 的极坐标方程为 $\\rho\\sin(\\theta+\\frac{\\pi}{4})=2\\sqrt{2}$，求 $C$ 上点到 $l$ 的最小距离。', answer: '$C$ 是圆 $(x-2)^2+y^2=4$，圆心 $(2,0)$，半径 2。$l$：$x+y=4$，圆心到直线距离 $\\frac{|2-4|}{\\sqrt{2}}=\\sqrt{2}$。最小距离 $\\sqrt{2}-2$（取绝对值后为 $2-\\sqrt{2}$）。', difficulty: 3 },

  // 立体几何（5道）
  { title: '三棱锥体积', content: '正三棱锥 $P-ABC$ 底面边长为 2，侧棱与底面所成角为 $45^\\circ$，求体积。', answer: '底面中心到顶点距离 $\\frac{2\\sqrt{3}}{3}$。高 $h=\\frac{2\\sqrt{3}}{3}$（因为 $\\tan 45^\\circ=1$）。底面积 $S=\\sqrt{3}$。体积 $V=\\frac{1}{3}Sh=\\frac{2}{3}$。', difficulty: 3 },
  { title: '球的内接正方体', content: '正方体的外接球表面积为 $12\\pi$，求正方体体积。', answer: '设球半径 $R$，$4\\pi R^2=12\\pi$，$R=\\sqrt{3}$。正方体对角线 $2R=2\\sqrt{3}=\\sqrt{3}a$，$a=2$。体积 $V=8$。', difficulty: 2 },
  { title: '线面垂直证明', content: '在正方体 $ABCD-A_1B_1C_1D_1$ 中，$E$ 为 $BB_1$ 中点，证明 $A_1C\\perp$ 平面 $CDE$。', answer: '建立坐标系，设棱长为 2。$A_1(0,0,2),C(2,2,0),D(2,0,0),E(2,2,1)$。$\\overrightarrow{A_1C}=(2,2,-2)$，$\\overrightarrow{DE}=(0,2,1)$，$\\overrightarrow{DC}=(0,2,0)$。$\\overrightarrow{A_1C}\\cdot\\overrightarrow{DE}=4-2=2\\neq 0$，题目有误，应修正为 $A_1C\\perp$ 平面 $BDC_1$ 等。实际上 $\\overrightarrow{A_1C}\\cdot\\overrightarrow{BD}=0$，$\\overrightarrow{A_1C}\\cdot\\overrightarrow{BC_1}=0$，故 $A_1C\\perp$ 平面 $BDC_1$。', difficulty: 4 },
  { title: '二面角计算', content: '正四棱锥 $S-ABCD$ 底面边长为 2，侧棱长为 $\\sqrt{5}$，求侧面与底面所成二面角的大小。', answer: '高 $SO=\\sqrt{5-2}=\\sqrt{3}$。侧面斜高 $SE=\\sqrt{SO^2+OE^2}=\\sqrt{3+1}=2$。二面角 $\\theta$ 满足 $\\cos\\theta=\\frac{OE}{SE}=\\frac{1}{2}$，$\\theta=60^\\circ$。', difficulty: 3 },
  { title: '空间向量求角', content: '在直三棱柱 $ABC-A_1B_1C_1$ 中，$\\angle ACB=90^\\circ$，$AC=BC=1$，$AA_1=2$，$D$ 为 $AA_1$ 中点，求平面 $BDC$ 与平面 $BDC_1$ 所成二面角的余弦值。', answer: '建系：$C(0,0,0),B(0,1,0),A(1,0,0),D(1,0,1),C_1(0,0,2)$。平面 $BDC$ 法向量 $\\vec{n_1}=(1,1,-1)$，平面 $BDC_1$ 法向量 $\\vec{n_2}=(1,1,1)$。$\\cos\\theta=\\frac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}||\\vec{n_2}|}=\\frac{1}{3}$。', difficulty: 4 },

  // 概率统计（4道）
  { title: '条件概率', content: '某厂产品合格率为 0.9，合格品中被误判为不合格的概率为 0.05，不合格品中被误判为合格的概率为 0.1。求一件被判为合格的产品确实合格的概率。', answer: '设 $A$ 为合格，$B$ 为判合格。$P(A)=0.9$，$P(B|A)=0.95$，$P(B|\\bar{A})=0.1$。\\n$P(B)=0.9\\times 0.95+0.1\\times 0.1=0.865$。\\n$P(A|B)=\\frac{0.9\\times 0.95}{0.865}=\\frac{171}{173}\\approx 0.988$。', difficulty: 3 },
  { title: '二项分布', content: '某射手每次命中概率为 0.8，独立射击 5 次，求至少命中 4 次的概率。', answer: '$P(X\\geq 4)=C_5^4(0.8)^4(0.2)+C_5^5(0.8)^5=5\\times 0.08192+0.32768=0.4096+0.32768=0.73728$。', difficulty: 2 },
  { title: '正态分布', content: '某考试成绩 $X\\sim N(70,100)$，求成绩在 80 到 90 之间的概率（已知 $\\Phi(1)=0.8413$，$\\Phi(2)=0.9772$）。', answer: '$\\sigma=10$。$P(80<X<90)=\\Phi(\\frac{90-70}{10})-\\Phi(\\frac{80-70}{10})=\\Phi(2)-\\Phi(1)=0.9772-0.8413=0.1359$。', difficulty: 2 },
  { title: '统计量计算', content: '样本数据：$7,8,9,10,11$，求样本方差 $s^2$。', answer: '均值 $\\bar{x}=9$。$s^2=\\frac{1}{4}[(7-9)^2+(8-9)^2+(9-9)^2+(10-9)^2+(11-9)^2]=\\frac{4+1+0+1+4}{4}=\\frac{10}{4}=2.5$。', difficulty: 1 },

  // 不等式与复数（3道）
  { title: '均值不等式', content: '已知 $a,b>0$ 且 $a+b=1$，求 $\\frac{1}{a}+\\frac{4}{b}$ 的最小值。', answer: '$\\frac{1}{a}+\\frac{4}{b}=(\\frac{1}{a}+\\frac{4}{b})(a+b)=1+4+\\frac{b}{a}+\\frac{4a}{b}\\geq 5+2\\sqrt{4}=9$。当 $\\frac{b}{a}=\\frac{4a}{b}$ 即 $b=2a=\\frac{2}{3}$ 时取等。', difficulty: 3 },
  { title: '柯西不等式', content: '已知 $a^2+b^2=5$，$ma+nb=5$，求 $m^2+n^2$ 的最小值。', answer: '由柯西 $(ma+nb)^2\\leq (m^2+n^2)(a^2+b^2)$，$25\\leq 5(m^2+n^2)$，$m^2+n^2\\geq 5$。当 $(m,n)$ 与 $(a,b)$ 共线时取等。', difficulty: 3 },
  { title: '复数模', content: '已知 $|z|=1$，求 $|z^2+z+1|$ 的最大值。', answer: '设 $z=e^{i\\theta}$，$|z^2+z+1|=|e^{i2\\theta}+e^{i\\theta}+1|$。\\n$=|(\\cos 2\\theta+\\cos\\theta+1)+i(\\sin 2\\theta+\\sin\\theta)|$。\\n$=|2\\cos^2\\theta+\\cos\\theta|=|2\\cos\\theta+1||\\cos\\theta|$。令 $t=\\cos\\theta$，$f(t)=(2t+1)^2t^2$，求导得最大值在 $t=1$ 时，$|z^2+z+1|_{\\max}=3$。', difficulty: 4 },
];

// 高等数学题库（50道）
const ADVANCED_MATH_QUESTIONS = [
  // 极限与连续（8道）
  { title: '重要极限', content: '求 $\\lim_{x\\to 0} \\frac{\\sin x - x}{x^3}$。', answer: '泰勒展开 $\\sin x = x - \\frac{x^3}{6} + o(x^3)$。\\n原式 $=\\lim_{x\\to 0}\\frac{-\\frac{x^3}{6}+o(x^3)}{x^3}=-\\frac{1}{6}$。', difficulty: 3 },
  { title: '洛必达法则', content: '求 $\\lim_{x\\to 0^+} x^x$。', answer: '设 $y=x^x$，$\\ln y=x\\ln x$。$\\lim_{x\\to 0^+}x\\ln x=\\lim_{x\\to 0^+}\\frac{\\ln x}{1/x}=\\lim_{x\\to 0^+}\\frac{1/x}{-1/x^2}=\\lim_{x\\to 0^+}(-x)=0$。\\n故原极限 $=e^0=1$。', difficulty: 3 },
  { title: '等价无穷小', content: '当 $x\\to 0$ 时，$e^{\\tan x}-e^x$ 与 $x^n$ 同阶，求 $n$。', answer: '$e^{\\tan x}-e^x=e^x(e^{\\tan x-x}-1)\\sim e^x(\\tan x-x)\\sim \\frac{x^3}{3}$。故 $n=3$。', difficulty: 3 },
  { title: '夹逼准则', content: '求 $\\lim_{n\\to\\infty} \\sum_{k=1}^n \\frac{k}{n^2+k}$。', answer: '$\\frac{k}{n^2+n}\\leq \\frac{k}{n^2+k}\\leq \\frac{k}{n^2}$。\\n$\\sum_{k=1}^n\\frac{k}{n^2+n}=\\frac{n(n+1)}{2(n^2+n)}\\to\\frac{1}{2}$，$\\sum_{k=1}^n\\frac{k}{n^2}=\\frac{n+1}{2n}\\to\\frac{1}{2}$。\\n由夹逼准则，极限为 $\\frac{1}{2}$。', difficulty: 4 },
  { title: '函数连续性', content: '设 $f(x)=\\begin{cases}\\frac{\\sin ax}{x}, & x<0\\\\ b, & x=0\\\\ \\frac{\\ln(1+x)}{x}, & x>0\\end{cases}$，求 $a,b$ 使 $f(x)$ 在 $x=0$ 连续。', answer: '$\\lim_{x\\to 0^-}f(x)=a$，$\\lim_{x\\to 0^+}f(x)=1$，$f(0)=b$。故 $a=b=1$。', difficulty: 2 },
  { title: '间断点分类', content: '求 $f(x)=\\frac{x^2-1}{x^2-3x+2}$ 的间断点并分类。', answer: '$f(x)=\\frac{(x-1)(x+1)}{(x-1)(x-2)}$。$x=1$ 为可去间断点，$x=2$ 为无穷间断点。', difficulty: 2 },
  { title: '数列极限', content: '设 $a_1=\\sqrt{2}$，$a_{n+1}=\\sqrt{2+a_n}$，证明 ${a_n}$ 收敛并求极限。', answer: '用归纳法证 $a_n<2$ 且 ${a_n}$ 递增。由单调有界定理，收敛。设极限为 $A$，$A=\\sqrt{2+A}$，$A^2-A-2=0$，$A=2$（舍去负根）。', difficulty: 3 },
  { title: '极限与积分', content: '求 $\\lim_{n\\to\\infty} \\frac{1}{n}\\sum_{k=1}^n \\sin\\frac{k\\pi}{n}$。', answer: '化为定积分：$\\int_0^1 \\sin(\\pi x)dx=[-\\frac{1}{\\pi}\\cos(\\pi x)]_0^1=\\frac{2}{\\pi}$。', difficulty: 3 },

  // 一元函数微分（10道）
  { title: '导数定义', content: '设 $f(x)$ 在 $x=a$ 处可导，求 $\\lim_{h\\to 0}\\frac{f(a+2h)-f(a-h)}{h}$。', answer: '原式 $=\\lim_{h\\to 0}[2\\cdot\\frac{f(a+2h)-f(a)}{2h}+\\frac{f(a)-f(a-h)}{h}]=2f\'(a)+f\'(a)=3f\'(a)$。', difficulty: 2 },
  { title: '隐函数求导', content: '由 $e^{xy}+x^2y=1$ 确定 $y=y(x)$，求 $\\frac{dy}{dx}$。', answer: '两边求导：$e^{xy}(y+xy\')+2xy+x^2y\'=0$。\\n$y\'(xe^{xy}+x^2)=-(ye^{xy}+2xy)$，$y\'=-\\frac{ye^{xy}+2xy}{xe^{xy}+x^2}$。', difficulty: 2 },
  { title: '参数方程二阶导', content: '设 $x=t-\\ln(1+t)$，$y=t^3+t^2$，求 $\\frac{d^2y}{dx^2}$。', answer: '$\\frac{dx}{dt}=1-\\frac{1}{1+t}=\\frac{t}{1+t}$，$\\frac{dy}{dt}=3t^2+2t$。\\n$\\frac{dy}{dx}=\\frac{(3t+2)(1+t)}{1}=3t^2+5t+2$。\\n$\\frac{d^2y}{dx^2}=\\frac{d}{dt}(\\frac{dy}{dx})\\cdot\\frac{dt}{dx}=(6t+5)\\cdot\\frac{1+t}{t}$。', difficulty: 3 },
  { title: '高阶导数', content: '求 $y=\\frac{1}{1-x}$ 的 $n$ 阶导数。', answer: "$y=(1-x)^{-1}$，$y\'=(1-x)^{-2}$，$y\'\'=2!(1-x)^{-3}$，归纳得 $y^{(n)}=\\frac{n!}{(1-x)^{n+1}}$。", difficulty: 2 },
  { title: '泰勒展开', content: '将 $f(x)=\\ln(1+x)$ 在 $x=0$ 处展开到 $x^4$ 项。', answer: '$\\ln(1+x)=x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\frac{x^4}{4}+o(x^4)$。', difficulty: 2 },
  { title: '函数极值', content: '求 $f(x)=x^3-3x^2+1$ 的极值。', answer: "$f\'(x)=3x^2-6x=3x(x-2)$，驻点 $x=0,2$。\\n$f\'\'(x)=6x-6$，$f\'\'(0)=-6<0$，极大值 $f(0)=1$；$f\'\'(2)=6>0$，极小值 $f(2)=-3$。", difficulty: 1 },
  { title: '最值应用', content: '求 $f(x)=x^3-3x$ 在 $[-2,2]$ 上的最大值和最小值。', answer: '$f\'(x)=3x^2-3=3(x-1)(x+1)$。比较 $f(-2)=-2$，$f(-1)=2$，$f(1)=-2$，$f(2)=2$。最大值 $2$，最小值 $-2$。', difficulty: 2 },
  { title: '凹凸性与拐点', content: '求 $y=x^4-6x^2+5$ 的凹凸区间和拐点。', answer: '$y\'\'=12x^2-12=12(x-1)(x+1)$。$y\'\'=0$ 得 $x=\\pm 1$。\\n$x<-1$ 或 $x>1$ 时 $y\'\'>0$，凹；$-1<x<1$ 时 $y\'\'<0$，凸。拐点 $(-1,0)$ 和 $(1,0)$。', difficulty: 2 },
  { title: '罗尔定理', content: '设 $f(x)$ 在 $[0,1]$ 连续，$(0,1)$ 可导，$f(0)=f(1)=0$，$f(\\frac{1}{2})=1$，证明存在 $\\xi\\in(0,1)$ 使 $f\'(\\xi)=0$。', answer: '由最值定理，$f(x)$ 在 $[0,1]$ 上有最大值。因 $f(\\frac{1}{2})=1>f(0)=f(1)=0$，最大值在 $(0,1)$ 内某点 $\\xi$ 取得。由费马定理，$f\'(\\xi)=0$。', difficulty: 3 },
  { title: '拉格朗日中值', content: '证明：当 $x>0$ 时，$\\frac{x}{1+x}<\\ln(1+x)<x$。', answer: '对 $f(t)=\\ln(1+t)$ 在 $[0,x]$ 用拉格朗日中值定理，存在 $\\xi\\in(0,x)$ 使 $\\frac{\\ln(1+x)}{x}=\\frac{1}{1+\\xi}$。由 $\\frac{1}{1+x}<\\frac{1}{1+\\xi}<1$ 即得。', difficulty: 3 },

  // 一元函数积分（10道）
  { title: '不定积分', content: '求 $\\int \\frac{dx}{x^2-a^2}$（$a>0$）。', answer: '$\\frac{1}{x^2-a^2}=\\frac{1}{2a}(\\frac{1}{x-a}-\\frac{1}{x+a})$。\\n$\\int=\\frac{1}{2a}\\ln|\\frac{x-a}{x+a}|+C$。', difficulty: 2 },
  { title: '分部积分', content: '求 $\\int x^2 e^x dx$。', answer: '$\\int x^2e^xdx=x^2e^x-\\int 2xe^xdx=x^2e^x-2xe^x+2e^x+C=e^x(x^2-2x+2)+C$。', difficulty: 2 },
  { title: '换元积分', content: '求 $\\int_0^4 \\frac{dx}{1+\\sqrt{x}}$。', answer: '令 $t=\\sqrt{x}$，$x=t^2$，$dx=2tdt$。\\n$\\int_0^2\\frac{2t}{1+t}dt=2\\int_0^2(1-\\frac{1}{1+t})dt=2[t-\\ln(1+t)]_0^2=2(2-\\ln 3)$。', difficulty: 2 },
  { title: '定积分计算', content: '计算 $\\int_0^{\\pi/2} \\frac{\\sin x}{\\sin x+\\cos x}dx$。', answer: '令 $x=\\frac{\\pi}{2}-t$，$I=\\int_0^{\\pi/2}\\frac{\\cos t}{\\cos t+\\sin t}dt$。\\n$2I=\\int_0^{\\pi/2}1\\,dx=\\frac{\\pi}{2}$，$I=\\frac{\\pi}{4}$。', difficulty: 3 },
  { title: '反常积分', content: '判断 $\\int_1^{+\\infty} \\frac{dx}{x^p}$ 的敛散性。', answer: '当 $p>1$ 时收敛，值为 $\\frac{1}{p-1}$；当 $p\\leq 1$ 时发散。', difficulty: 2 },
  { title: '变上限积分', content: '求 $\\frac{d}{dx}\\int_0^{x^2} \\sin(t^2)dt$。', answer: '由莱布尼茨公式，$=\\sin(x^4)\\cdot 2x=2x\\sin(x^4)$。', difficulty: 2 },
  { title: '积分求面积', content: '求由 $y=x^2$ 与 $y=2-x^2$ 围成区域的面积。', answer: '交点 $x=\\pm 1$。$S=\\int_{-1}^1(2-x^2-x^2)dx=\\int_{-1}^1(2-2x^2)dx=[2x-\\frac{2x^3}{3}]_{-1}^1=\\frac{8}{3}$。', difficulty: 2 },
  { title: '旋转体体积', content: '求 $y=\\sqrt{x}$（$0\\leq x\\leq 4$）绕 $x$ 轴旋转的体积。', answer: '$V=\\pi\\int_0^4 x\\,dx=\\pi[\\frac{x^2}{2}]_0^4=8\\pi$。', difficulty: 1 },
  { title: '弧长计算', content: '求 $y=\\frac{2}{3}x^{3/2}$（$0\\leq x\\leq 3$）的弧长。', answer: '$y\'=\\sqrt{x}$，$ds=\\sqrt{1+x}\\,dx$。\\n$s=\\int_0^3\\sqrt{1+x}\\,dx=[\\frac{2}{3}(1+x)^{3/2}]_0^3=\\frac{2}{3}(8-1)=\\frac{14}{3}$。', difficulty: 3 },
  { title: '物理应用', content: '一弹簧伸长 $x$ cm 需力 $F=kx$，从自然长度拉伸 5cm 做功多少？', answer: '$W=\\int_0^5 kx\\,dx=[\\frac{kx^2}{2}]_0^5=\\frac{25k}{2}$（单位：N\\cdot cm）。', difficulty: 2 },

  // 多元函数微分（7道）
  { title: '偏导数', content: '设 $z=x^2y+xy^2$，求 $\\frac{\\partial^2 z}{\\partial x\\partial y}$。', answer: '$\\frac{\\partial z}{\\partial x}=2xy+y^2$，$\\frac{\\partial^2 z}{\\partial x\\partial y}=2x+2y$。', difficulty: 1 },
  { title: '全微分', content: '设 $z=e^{xy}$，求 $dz$。', answer: '$\\frac{\\partial z}{\\partial x}=ye^{xy}$，$\\frac{\\partial z}{\\partial y}=xe^{xy}$。$dz=ye^{xy}dx+xe^{xy}dy=e^{xy}(ydx+xdy)$。', difficulty: 1 },
  { title: '复合函数求导', content: '设 $z=f(x^2-y^2, e^{xy})$，求 $\\frac{\\partial z}{\\partial x}$。', answer: '令 $u=x^2-y^2$，$v=e^{xy}$。$\\frac{\\partial z}{\\partial x}=f_1\\cdot 2x+f_2\\cdot ye^{xy}$。', difficulty: 2 },
  { title: '隐函数求偏导', content: '由 $x^2+y^2+z^2=1$ 确定 $z=z(x,y)$，求 $\\frac{\\partial z}{\\partial x}$。', answer: '两边对 $x$ 求偏导：$2x+2z\\frac{\\partial z}{\\partial x}=0$，$\\frac{\\partial z}{\\partial x}=-\\frac{x}{z}$。', difficulty: 1 },
  { title: '方向导数', content: '求 $f(x,y)=x^2+y^2$ 在点 $(1,2)$ 沿方向 $\\vec{l}=(3,4)$ 的方向导数。', answer: '$\\nabla f=(2x,2y)=(2,4)$。单位方向 $\\vec{e}=(\\frac{3}{5},\\frac{4}{5})$。$\\frac{\\partial f}{\\partial l}=\\nabla f\\cdot\\vec{e}=2\\cdot\\frac{3}{5}+4\\cdot\\frac{4}{5}=\\frac{22}{5}$。', difficulty: 2 },
  { title: '梯度', content: '求 $u=xyz$ 在点 $(1,2,3)$ 处的梯度。', answer: '$\\nabla u=(yz,xz,xy)=(6,3,2)$。', difficulty: 1 },
  { title: '多元极值', content: '求 $f(x,y)=x^3+y^3-3xy$ 的极值。', answer: '$f_x=3x^2-3y=0$，$f_y=3y^2-3x=0$。驻点 $(0,0)$ 和 $(1,1)$。\\n$(0,0)$：$AC-B^2=-9<0$，不是极值。$(1,1)$：$AC-B^2=27>0$，$A=6>0$，极小值 $f(1,1)=-1$。', difficulty: 3 },

  // 重积分与曲线曲面积分（7道）
  { title: '二重积分', content: '计算 $\\iint_D (x+y)dxdy$，其中 $D$ 由 $x=0,y=0,x+y=1$ 围成。', answer: '$\\int_0^1dx\\int_0^{1-x}(x+y)dy=\\int_0^1[x(1-x)+\\frac{(1-x)^2}{2}]dx=\\int_0^1(\\frac{1}{2}-\\frac{x^2}{2})dx=\\frac{1}{3}$。', difficulty: 2 },
  { title: '极坐标积分', content: '计算 $\\iint_D e^{-x^2-y^2}dxdy$，$D$ 为 $x^2+y^2\\leq R^2$。', answer: '$\\int_0^{2\\pi}d\\theta\\int_0^R e^{-r^2}r\\,dr=2\\pi[-\\frac{1}{2}e^{-r^2}]_0^R=\\pi(1-e^{-R^2})$。', difficulty: 2 },
  { title: '三重积分', content: '计算 $\\iiint_\\Omega z\\,dxdydz$，$\\Omega$ 为 $x^2+y^2+z^2\\leq 1$，$z\\geq 0$。', answer: '球坐标：$\\int_0^{2\\pi}d\\theta\\int_0^{\\pi/2}d\\varphi\\int_0^1 r\\cos\\varphi\\cdot r^2\\sin\\varphi\\,dr=2\\pi\\cdot\\frac{1}{2}\\cdot\\frac{1}{4}=\\frac{\\pi}{4}$。', difficulty: 3 },
  { title: '第一类曲线积分', content: '计算 $\\int_L y\\,ds$，$L$ 为 $x=t$，$y=t^2$（$0\\leq t\\leq 1$）。', answer: '$ds=\\sqrt{1+4t^2}dt$。$\\int_0^1 t^2\\sqrt{1+4t^2}dt$，令 $2t=\\tan\\theta$ 或直接用公式，结果为 $\\frac{1}{32}[\\sqrt{5}(2\\cdot 5+1)\\cdot\\sqrt{5}-\\ln(2+\\sqrt{5})]$ 的简化值 $\\frac{9\\sqrt{5}}{32}-\\frac{1}{32}\\ln(2+\\sqrt{5})$ 的数值近似。', difficulty: 4 },
  { title: '格林公式', content: '用格林公式计算 $\\oint_L (x^2-y)dx+(y^2+x)dy$，$L$ 为 $x^2+y^2=1$ 正向。', answer: '$P=x^2-y$，$Q=y^2+x$，$\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}=1-(-1)=2$。\\n$\\oint=\\iint_D 2\\,dxdy=2\\pi$。', difficulty: 3 },
  { title: '高斯公式', content: '用高斯公式计算 $\\iint_\\Sigma x\\,dydz+y\\,dzdx+z\\,dxdy$，$\\Sigma$ 为 $x^2+y^2+z^2=R^2$ 外侧。', answer: '$\\frac{\\partial P}{\\partial x}+\\frac{\\partial Q}{\\partial y}+\\frac{\\partial R}{\\partial z}=3$。\\n$\\iint_\\Sigma=\\iiint_\\Omega 3\\,dxdydz=3\\cdot\\frac{4}{3}\\pi R^3=4\\pi R^3$。', difficulty: 3 },
  { title: '斯托克斯公式', content: '用斯托克斯公式计算 $\\oint_L y\\,dx+z\\,dy+x\\,dz$，$L$ 为 $x^2+y^2+z^2=a^2$ 与 $x+y+z=0$ 的交线，从 $x$ 轴正向看逆时针。', answer: '$\\nabla\\times\\vec{F}=(-1,-1,-1)$。平面 $x+y+z=0$ 法向量 $\\vec{n}=(\\frac{1}{\\sqrt{3}},\\frac{1}{\\sqrt{3}},\\frac{1}{\\sqrt{3}})$。\\n$\\oint=\\iint_\\Sigma (-1,-1,-1)\\cdot\\vec{n}\\,dS=-\\sqrt{3}\\cdot\\pi a^2$。', difficulty: 5 },

  // 无穷级数（4道）
  { title: '级数敛散性', content: '判定 $\\sum_{n=1}^\\infty \\frac{n^2}{2^n}$ 的敛散性。', answer: '比值判别法：$\\lim_{n\\to\\infty}\\frac{(n+1)^2/2^{n+1}}{n^2/2^n}=\\frac{1}{2}<1$，收敛。', difficulty: 2 },
  { title: '幂级数收敛域', content: '求 $\\sum_{n=1}^\\infty \\frac{x^n}{n}$ 的收敛域。', answer: '半径 $R=\\lim_{n\\to\\infty}|\\frac{a_n}{a_{n+1}}|=1$。$x=1$ 时发散（调和级数），$x=-1$ 时收敛（交错级数）。收敛域 $[-1,1)$。', difficulty: 2 },
  { title: '和函数', content: '求 $\\sum_{n=0}^\\infty x^n$（$|x|<1$）的和函数。', answer: '等比级数，$S(x)=\\frac{1}{1-x}$。', difficulty: 1 },
  { title: '傅里叶级数', content: '将 $f(x)=x$（$x\\in[-\\pi,\\pi]$）展开为傅里叶级数。', answer: '$f(x)$ 为奇函数，$a_n=0$。$b_n=\\frac{2}{\\pi}\\int_0^\\pi x\\sin(nx)dx=\\frac{2(-1)^{n+1}}{n}$。\\n$x=2\\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n}\\sin(nx)$。', difficulty: 4 },

  // 常微分方程（4道）
  { title: '可分离变量', content: '求解 $y\'=\\frac{x}{y}$。', answer: '$ydy=xdx$，$\\frac{y^2}{2}=\\frac{x^2}{2}+C$，$y^2=x^2+C$。', difficulty: 1 },
  { title: '一阶线性方程', content: '求解 $y\'+y=e^x$。', answer: '积分因子 $e^x$。$(ye^x)\'=e^{2x}$，$ye^x=\\frac{e^{2x}}{2}+C$，$y=\\frac{e^x}{2}+Ce^{-x}$。', difficulty: 2 },
  { title: '二阶常系数齐次', content: "求解 $y''+4y'+4y=0$。", answer: "特征方程 $r^2+4r+4=0$，$r=-2$（重根）。$y=(C_1+C_2x)e^{-2x}$。", difficulty: 2 },
  { title: '二阶常系数非齐次', content: "求解 $y''+y=\sin x$。", answer: "齐次通解 $Y=C_1\cos x+C_2\sin x$。设特解 $y^*=x(A\cos x+B\sin x)$，代入得 $A=-\frac{1}{2},B=0$。$y=C_1\cos x+C_2\sin x-\frac{x}{2}\cos x$。", difficulty: 3 },
];

// 线性代数题库（50道）
const LINEAR_ALGEBRA_QUESTIONS = [
  // 行列式（8道）
  { title: '行列式性质', content: '计算 $D=\\begin{vmatrix}1&2&3\\\\ 4&5&6\\\\ 7&8&9\\end{vmatrix}$。', answer: '各行减去前一行：$\\begin{vmatrix}1&2&3\\\\ 3&3&3\\\\ 3&3&3\\end{vmatrix}=0$（后两行相同）。', difficulty: 1 },
  { title: '范德蒙德行列式', content: '计算 $\\begin{vmatrix}1&1&1\\\\ a&b&c\\\\ a^2&b^2&c^2\\end{vmatrix}$。', answer: '范德蒙德行列式 $=(b-a)(c-a)(c-b)$。', difficulty: 2 },
  { title: '按行展开', content: '计算 $D=\\begin{vmatrix}2&1&0\\\\ 1&2&1\\\\ 0&1&2\\end{vmatrix}$。', answer: '按第一行展开：$2\\cdot\\begin{vmatrix}2&1\\\\ 1&2\\end{vmatrix}-1\\cdot\\begin{vmatrix}1&1\\\\ 0&2\\end{vmatrix}=2\\cdot 3-2=4$。', difficulty: 1 },
  { title: 'n阶行列式', content: '计算 $D_n=\\begin{vmatrix}x&a&\\cdots&a\\\\ a&x&\\cdots&a\\\\ \\vdots&\\vdots&\\ddots&\\vdots\\\\ a&a&\\cdots&x\\end{vmatrix}$。', answer: '各列加到第一列，提取 $x+(n-1)a$，各行减第一行：$D_n=[x+(n-1)a](x-a)^{n-1}$。', difficulty: 3 },
  { title: '克拉默法则', content: '用克拉默法则解 $\\begin{cases}x+y=1\\\\ 2x+3y=4\\end{cases}$。', answer: '$D=\\begin{vmatrix}1&1\\\\ 2&3\\end{vmatrix}=1$，$D_x=\\begin{vmatrix}1&1\\\\ 4&3\\end{vmatrix}=-1$，$D_y=\\begin{vmatrix}1&1\\\\ 2&4\\end{vmatrix}=2$。$x=-1,y=2$。', difficulty: 1 },
  { title: '行列式求参数', content: '已知 $\\begin{vmatrix}1&1&1\\\\ 1&2&a\\\\ 1&4&a^2\\end{vmatrix}=0$，求 $a$。', answer: '范德蒙德行列式 $=(2-1)(a-1)(a-2)=(a-1)(a-2)=0$，$a=1$ 或 $a=2$。', difficulty: 2 },
  { title: '代数余子式', content: '设 $A=\\begin{vmatrix}1&2&3\\\\ 0&1&2\\\\ 0&0&1\\end{vmatrix}$，求 $A_{11}+A_{12}+A_{13}$。', answer: '$A_{11}=1,A_{12}=0,A_{13}=0$，和为 $1$。', difficulty: 1 },
  { title: '行列式与多项式', content: '设 $f(x)=\\begin{vmatrix}x&1&2\\\\ 2&x&1\\\\ 1&2&x\\end{vmatrix}$，求 $f(x)=0$ 的根。', answer: '各行相加提取 $x+3$：$f(x)=(x+3)\\begin{vmatrix}1&1&1\\\\ 2&x&1\\\\ 1&2&x\\end{vmatrix}=(x+3)(x^2-3)=(x+3)(x-\\sqrt{3})(x+\\sqrt{3})$。根为 $-3,\\pm\\sqrt{3}$。', difficulty: 3 },

  // 矩阵运算（10道）
  { title: '矩阵乘法', content: '设 $A=\\begin{pmatrix}1&2\\\\ 3&4\\end{pmatrix}$，$B=\\begin{pmatrix}0&1\\\\ 1&0\\end{pmatrix}$，求 $AB$。', answer: '$AB=\\begin{pmatrix}2&1\\\\ 4&3\\end{pmatrix}$。', difficulty: 1 },
  { title: '逆矩阵', content: '求 $A=\\begin{pmatrix}1&2\\\\ 3&4\\end{pmatrix}$ 的逆矩阵。', answer: '$|A|=-2$，$A^{-1}=-\\frac{1}{2}\\begin{pmatrix}4&-2\\\\ -3&1\\end{pmatrix}=\\begin{pmatrix}-2&1\\\\ \\frac{3}{2}&-\\frac{1}{2}\\end{pmatrix}$。', difficulty: 1 },
  { title: '矩阵方程', content: '解矩阵方程 $AX=B$，其中 $A=\\begin{pmatrix}1&1\\\\ 0&1\\end{pmatrix}$，$B=\\begin{pmatrix}2&3\\\\ 4&5\\end{pmatrix}$。', answer: '$A^{-1}=\\begin{pmatrix}1&-1\\\\ 0&1\\end{pmatrix}$，$X=A^{-1}B=\\begin{pmatrix}-2&-2\\\\ 4&5\\end{pmatrix}$。', difficulty: 2 },
  { title: '矩阵的秩', content: '求 $A=\\begin{pmatrix}1&2&3\\\\ 2&4&6\\\\ 1&2&4\\end{pmatrix}$ 的秩。', answer: '第二行是第一行的 2 倍，$r(A)=2$。', difficulty: 1 },
  { title: '初等变换', content: '用初等行变换将 $A=\\begin{pmatrix}1&2&3\\\\ 2&3&1\\\\ 3&1&2\\end{pmatrix}$ 化为行最简形。', answer: '$r_2-2r_1,r_3-3r_1$ 得 $\\begin{pmatrix}1&2&3\\\\ 0&-1&-5\\\\ 0&-5&-7\\end{pmatrix}$，继续化简得 $\\begin{pmatrix}1&0&0\\\\ 0&1&0\\\\ 0&0&1\\end{pmatrix}$（可逆矩阵）。', difficulty: 2 },
  { title: '伴随矩阵', content: '设 $A=\\begin{pmatrix}1&2\\\\ 3&4\\end{pmatrix}$，求 $A^*$。', answer: '$A^*=\\begin{pmatrix}4&-2\\\\ -3&1\\end{pmatrix}$。', difficulty: 1 },
  { title: '正交矩阵', content: '验证 $A=\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\ \\sin\\theta&\\cos\\theta\\end{pmatrix}$ 是正交矩阵。', answer: '$A^TA=\\begin{pmatrix}\\cos^2+\\sin^2&0\\\\ 0&\\sin^2+\\cos^2\\end{pmatrix}=I$，故为正交矩阵。', difficulty: 1 },
  { title: '矩阵幂', content: '设 $A=\\begin{pmatrix}1&1\\\\ 0&1\\end{pmatrix}$，求 $A^n$。', answer: '$A^n=\\begin{pmatrix}1&n\\\\ 0&1\\end{pmatrix}$（可用归纳法证明）。', difficulty: 2 },
  { title: '分块矩阵', content: '设 $M=\\begin{pmatrix}A&0\\\\ 0&B\\end{pmatrix}$，其中 $A,B$ 可逆，求 $M^{-1}$。', answer: '$M^{-1}=\\begin{pmatrix}A^{-1}&0\\\\ 0&B^{-1}\\end{pmatrix}$。', difficulty: 2 },
  { title: '矩阵的迹', content: '设 $A=\\begin{pmatrix}1&2&3\\\\ 4&5&6\\\\ 7&8&9\\end{pmatrix}$，求 $\\text{tr}(A)$。', answer: '$\\text{tr}(A)=1+5+9=15$。', difficulty: 1 },

  // 向量与线性方程组（10道）
  { title: '向量内积', content: '设 $\\vec{a}=(1,2,3)$，$\\vec{b}=(4,5,6)$，求 $\\vec{a}\\cdot\\vec{b}$ 及夹角。', answer: '$\\vec{a}\\cdot\\vec{b}=4+10+18=32$。$|\\vec{a}|=\\sqrt{14}$，$|\\vec{b}|=\\sqrt{77}$。$\\cos\\theta=\\frac{32}{\\sqrt{1078}}$。', difficulty: 1 },
  { title: '向量叉积', content: '求 $\\vec{a}=(1,0,0)$ 与 $\\vec{b}=(0,1,0)$ 的叉积。', answer: '$\\vec{a}\\times\\vec{b}=(0,0,1)$。', difficulty: 1 },
  { title: '线性相关性', content: '判断 $\\vec{a}_1=(1,2,3)$，$\\vec{a}_2=(2,3,4)$，$\\vec{a}_3=(3,5,7)$ 是否线性相关。', answer: '$\\vec{a}_1+\\vec{a}_2=(3,5,7)=\\vec{a}_3$，故线性相关。', difficulty: 1 },
  { title: '极大无关组', content: '求向量组 $\\vec{a}_1=(1,2,3)$，$\\vec{a}_2=(2,4,6)$，$\\vec{a}_3=(1,0,-1)$ 的极大无关组。', answer: '$\\vec{a}_2=2\\vec{a}_1$，极大无关组为 $\\{\vec{a}_1,\\vec{a}_3\\}$ 或 $\\{\vec{a}_2,\\vec{a}_3\\}$，秩为 2。', difficulty: 2 },
  { title: '齐次方程组', content: '求 $\\begin{cases}x_1+x_2+x_3=0\\\\ 2x_1+2x_2+2x_3=0\\end{cases}$ 的基础解系。', answer: '秩为 1，基础解系含 2 个向量。$\\xi_1=(1,-1,0)^T$，$\\xi_2=(1,0,-1)^T$。', difficulty: 2 },
  { title: '非齐次方程组', content: '解 $\\begin{cases}x+y=1\\\\ 2x+2y=3\\end{cases}$。', answer: '增广矩阵秩为 2，系数矩阵秩为 1，不等，无解。', difficulty: 1 },
  { title: '通解结构', content: '已知 $Ax=b$ 的特解为 $\\eta=(1,2)^T$，$Ax=0$ 的基础解系为 $\\xi=(1,-1)^T$，求 $Ax=b$ 的通解。', answer: '通解 $x=\\eta+k\\xi=(1,2)^T+k(1,-1)^T$，$k\\in\\mathbb{R}$。', difficulty: 1 },
  { title: '克拉默法则应用', content: '当 $a$ 为何值时，$\\begin{cases}ax+y=1\\\\ x+ay=1\\end{cases}$ 有唯一解？', answer: '$D=\\begin{vmatrix}a&1\\\\ 1&a\\end{vmatrix}=a^2-1=(a-1)(a+1)$。当 $a\\neq\\pm 1$ 时有唯一解。', difficulty: 1 },
  { title: '解空间维数', content: '设 $A$ 为 $4\\times 5$ 矩阵，$r(A)=3$，求 $Ax=0$ 解空间的维数。', answer: '解空间维数 $=n-r(A)=5-3=2$。', difficulty: 1 },
  { title: '高斯消元', content: '用高斯消元法解 $\\begin{cases}2x+y-z=1\\\\ x+2y+z=2\\\\ x-y+2z=3\\end{cases}$。', answer: '增广矩阵经行变换得 $\\begin{pmatrix}1&0&0&1\\\\ 0&1&0&0\\\\ 0&0&1&1\\end{pmatrix}$，解为 $(1,0,1)^T$。', difficulty: 2 },

  // 特征值与特征向量（8道）
  { title: '特征值计算', content: '求 $A=\\begin{pmatrix}2&1\\\\ 1&2\\end{pmatrix}$ 的特征值。', answer: '$|\\lambda I-A|=(\\lambda-2)^2-1=(\\lambda-1)(\\lambda-3)=0$，$\\lambda_1=1,\\lambda_2=3$。', difficulty: 1 },
  { title: '特征向量', content: '求 $A=\\begin{pmatrix}2&1\\\\ 1&2\\end{pmatrix}$ 对应 $\\lambda=1$ 的特征向量。', answer: '$(I-A)x=0$，$\\begin{pmatrix}-1&-1\\\\ -1&-1\\end{pmatrix}x=0$，$\\xi=(1,-1)^T$。', difficulty: 1 },
  { title: '矩阵对角化', content: '将 $A=\\begin{pmatrix}2&1\\\\ 1&2\\end{pmatrix}$ 对角化。', answer: '$P=\\begin{pmatrix}1&1\\\\ -1&1\\end{pmatrix}$，$P^{-1}AP=\\begin{pmatrix}1&0\\\\ 0&3\\end{pmatrix}$。', difficulty: 2 },
  { title: '实对称矩阵性质', content: '证明实对称矩阵不同特征值对应的特征向量正交。', answer: '设 $A\\vec{x}=\\lambda_1\\vec{x}$，$A\\vec{y}=\\lambda_2\\vec{y}$，$\\lambda_1\\neq\\lambda_2$。$\\vec{y}^TA\\vec{x}=\\lambda_1\\vec{y}^T\\vec{x}$，又 $=\\lambda_2\\vec{y}^T\\vec{x}$。故 $(\\lambda_1-\\lambda_2)\\vec{y}^T\\vec{x}=0$，$\\vec{y}^T\\vec{x}=0$。', difficulty: 3 },
  { title: '特征值与行列式', content: '设 $A$ 为 3 阶矩阵，特征值为 1,2,3，求 $|A|$ 和 $|A^{-1}|$。', answer: '$|A|=1\\cdot 2\\cdot 3=6$。$|A^{-1}|=\\frac{1}{|A|}=\\frac{1}{6}$。', difficulty: 1 },
  { title: '相似矩阵', content: '若 $A$ 与 $B$ 相似，证明 $A$ 与 $B$ 有相同特征值。', answer: '$B=P^{-1}AP$，$|\\lambda I-B|=|P^{-1}(\\lambda I-A)P|=|\\lambda I-A|$，特征多项式相同。', difficulty: 2 },
  { title: '幂等矩阵特征值', content: '设 $A^2=A$，证明 $A$ 的特征值只能是 0 或 1。', answer: '设 $A\\vec{x}=\\lambda\\vec{x}$，$A^2\\vec{x}=\\lambda^2\\vec{x}=A\\vec{x}=\\lambda\\vec{x}$，故 $\\lambda^2=\\lambda$，$\\lambda=0$ 或 $1$。', difficulty: 2 },
  { title: '凯莱-哈密顿', content: '设 $A=\\begin{pmatrix}1&2\\\\ 3&4\\end{pmatrix}$，用凯莱-哈密顿定理求 $A^2$。', answer: '特征多项式 $\\lambda^2-5\\lambda-2=0$，故 $A^2=5A+2I=\\begin{pmatrix}7&10\\\\ 15&22\\end{pmatrix}$。', difficulty: 3 },

  // 二次型（6道）
  { title: '二次型矩阵', content: '写出二次型 $f(x_1,x_2,x_3)=x_1^2+2x_2^2+3x_3^2+2x_1x_2+4x_2x_3$ 的矩阵。', answer: '$A=\\begin{pmatrix}1&1&0\\\\ 1&2&2\\\\ 0&2&3\\end{pmatrix}$。', difficulty: 1 },
  { title: '正定性判定', content: '判定 $f(x_1,x_2)=2x_1^2+2x_1x_2+2x_2^2$ 是否正定。', answer: '$A=\\begin{pmatrix}2&1\\\\ 1&2\\end{pmatrix}$，$\\Delta_1=2>0$，$\\Delta_2=3>0$，正定。', difficulty: 1 },
  { title: '配方法', content: '用配方法将 $f=x_1^2+2x_1x_2+2x_2^2$ 化为标准形。', answer: '$f=(x_1+x_2)^2+x_2^2=y_1^2+y_2^2$。', difficulty: 2 },
  { title: '惯性定理', content: '求 $f(x_1,x_2,x_3)=x_1^2+x_2^2-x_3^2$ 的正负惯性指数。', answer: '标准形已为 $y_1^2+y_2^2-y_3^2$，正惯性指数 $p=2$，负惯性指数 $q=1$。', difficulty: 1 },
  { title: '合同变换', content: '若 $A$ 正定，证明 $A^{-1}$ 也正定。', answer: '$A$ 正定的特征值 $\\lambda_i>0$。$A^{-1}$ 特征值 $\\frac{1}{\\lambda_i}>0$，故正定。', difficulty: 2 },
  { title: '正交变换化标准形', content: '用正交变换将 $f=2x_1^2+2x_2^2+2x_1x_2$ 化为标准形。', answer: '$A=\\begin{pmatrix}2&1\\\\ 1&2\\end{pmatrix}$，特征值 $\\lambda_1=1,\\lambda_2=3$。标准形 $f=y_1^2+3y_2^2$。', difficulty: 3 },

  // 线性空间与线性变换（8道）
  { title: '子空间判定', content: '判断 $W=\\{(x,y,z)|x+y+z=0\\}$ 是否为 $\\mathbb{R}^3$ 的子空间。', answer: '是。$(0,0,0)\\in W$；若 $\\vec{u},\\vec{v}\\in W$，则 $(\\vec{u}+\\vec{v})$ 分量之和仍为 0；数乘也封闭。', difficulty: 1 },
  { title: '维数与基', content: '求 $\\mathbb{R}^3$ 的子空间 $W=\\{(x,y,z)|x=y=z\\}$ 的维数和一组基。', answer: '$W$ 中向量形如 $(t,t,t)=t(1,1,1)$，维数为 1，基为 $\\{(1,1,1)\\}$。', difficulty: 1 },
  { title: '过渡矩阵', content: '设 $\\mathbb{R}^2$ 的两组基 $\\alpha_1=(1,0)^T,\\alpha_2=(0,1)^T$ 和 $\\beta_1=(1,1)^T,\\beta_2=(1,-1)^T$，求从 $\\alpha$ 到 $\\beta$ 的过渡矩阵。', answer: '$\\beta_1=\\alpha_1+\\alpha_2$，$\\beta_2=\\alpha_1-\\alpha_2$，过渡矩阵 $P=\\begin{pmatrix}1&1\\\\ 1&-1\\end{pmatrix}$。', difficulty: 2 },
  { title: '线性变换矩阵', content: '设 $T: \\mathbb{R}^2\\to\\mathbb{R}^2$，$T(x,y)=(2x,y)$，求 $T$ 在标准基下的矩阵。', answer: '$T(1,0)=(2,0)$，$T(0,1)=(0,1)$，矩阵 $A=\\begin{pmatrix}2&0\\\\ 0&1\\end{pmatrix}$。', difficulty: 1 },
  { title: '核与像', content: '设 $T(x,y)=(x-y,0)$，求 $\\ker(T)$ 和 $\\text{Im}(T)$。', answer: '$\\ker(T)=\\{(x,y)|x=y\\}$，维数 1，基 $(1,1)$。$\\text{Im}(T)=\\{(x,0)|x\\in\\mathbb{R}\\}$，维数 1，基 $(1,0)$。', difficulty: 2 },
  { title: '不变子空间', content: '证明 $\\ker(T)$ 和 $\\text{Im}(T)$ 都是 $T$ 的不变子空间。', answer: '若 $x\\in\\ker(T)$，$T(x)=0\\in\\ker(T)$。若 $y\\in\\text{Im}(T)$，$y=T(x)$，$T(y)=T^2(x)\\in\\text{Im}(T)$。', difficulty: 2 },
  { title: '同构', content: '证明 $\\mathbb{R}^{m\\times n}$ 与 $\\mathbb{R}^{mn}$ 同构。', answer: '映射 $\\varphi: A\\mapsto \\text{vec}(A)$（按列拉直）是双射且保持线性运算，故同构。', difficulty: 2 },
  { title: '直和分解', content: '设 $V=\\mathbb{R}^3$，$W_1=\\{(x,y,0)\\}$，$W_2=\\{(0,0,z)\\}$，证明 $V=W_1\\oplus W_2$。', answer: '$V=W_1+W_2$ 显然。若 $\\vec{v}\\in W_1\\cap W_2$，则 $\\vec{v}=(x,y,0)=(0,0,z)$，$x=y=z=0$。故 $W_1\\cap W_2=\\{0\\}$，直和成立。', difficulty: 2 },
];

// 根据日期选择题目 - 使用更好的哈希避免短期循环
export function getDailyQuestionsByDate(date: string): { moduleId: string; title: string; content: string; answer: string; difficulty: number }[] {
  // 使用更复杂的哈希函数，使日期分布更均匀
  const dateHash = hashDate(date);

  const modules = ['highschool-math', 'advanced-math', 'linear-algebra'];
  const questionBanks = [
    HIGH_SCHOOL_HARD_QUESTIONS,
    ADVANCED_MATH_QUESTIONS,
    LINEAR_ALGEBRA_QUESTIONS,
  ];

  const selected: { moduleId: string; title: string; content: string; answer: string; difficulty: number }[] = [];

  for (let i = 0; i < modules.length; i++) {
    const bank = questionBanks[i];
    const index = (dateHash + i * 31) % bank.length;
    selected.push({
      moduleId: modules[i],
      ...bank[index],
    });
  }

  return selected;
}

// 更好的日期哈希函数
function hashDate(date: string): number {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    const char = date.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转为 32bit 整数
  }
  return Math.abs(hash);
}

// 获取所有备用题目
export function getAllBackupQuestions() {
  return {
    'highschool-math': HIGH_SCHOOL_HARD_QUESTIONS,
    'advanced-math': ADVANCED_MATH_QUESTIONS,
    'linear-algebra': LINEAR_ALGEBRA_QUESTIONS,
  };
}

// 获取某模块指定索引的题目
export function getQuestionByIndex(moduleId: string, index: number) {
  const banks: Record<string, typeof HIGH_SCHOOL_HARD_QUESTIONS> = {
    'highschool-math': HIGH_SCHOOL_HARD_QUESTIONS,
    'advanced-math': ADVANCED_MATH_QUESTIONS,
    'linear-algebra': LINEAR_ALGEBRA_QUESTIONS,
  };
  const bank = banks[moduleId];
  if (!bank) return null;
  return bank[index % bank.length];
}
