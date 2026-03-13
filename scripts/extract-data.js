// 数据提取脚本 - 使用模块加载方式
const fs = require('fs');
const path = require('path');

// 复制数据文件到临时位置并添加模块导出
const rawDataPath = 'D:/学习/高等数学学习工具/js/data.js';
const tempDataPath = path.join(__dirname, 'temp-data.js');

let rawData = fs.readFileSync(rawDataPath, 'utf-8');

// 在文件末尾添加导出语句
rawData += '\nmodule.exports = { learningData, errorTypes, learningPaths };';

// 写入临时文件
fs.writeFileSync(tempDataPath, rawData, 'utf-8');

// 加载数据
delete require.cache[require.resolve(tempDataPath)];
const { learningData, errorTypes, learningPaths } = require(tempDataPath);

// 删除临时文件
fs.unlinkSync(tempDataPath);

if (!learningData) {
  console.error('无法找到 learningData 对象');
  process.exit(1);
}

console.log(`成功加载数据，共 ${Object.keys(learningData).length} 个课时\n`);

// 定义模块映射
const moduleMapping = {
  'am-1': ['direction-cosines', 'cross-product', 'triple-product', 'plane-line', 'quadric-surfaces', 'coordinate-systems', 'vector-fields', 'multivariable-concept'],
  'am-2': ['partial-derivative', 'total-differential', 'chain-rule', 'implicit-function', 'directional-derivative', 'extrema', 'taylor', 'lagrange'],
  'am-3': ['integral-concept', 'double-integral', 'triple-integral', 'change-variables', 'applications', 'polar-coordinates', 'cylindrical-spherical'],
  'am-4': ['surface-integral-first', 'surface-integral-second', 'gauss-theorem', 'stokes-theorem', 'greens-theorem', 'differential-forms'],
  'am-5': ['ode-basic', 'first-order', 'higher-order', 'linear-system', 'laplace', 'series-solution'],
  'am-6': ['numerical', 'physics', 'engineering', 'ml', 'graphics', 'economics', 'biology']
};

// 标题映射
const titleMapping = {
  'direction-cosines': '方向角与方向余弦',
  'cross-product': '叉乘（向量积）',
  'triple-product': '混合积与三重积',
  'plane-line': '平面与直线方程',
  'quadric-surfaces': '二次曲面',
  'coordinate-systems': '坐标系变换',
  'vector-fields': '向量场基础',
  'multivariable-concept': '多元函数概念',
  'partial-derivative': '偏导数',
  'total-differential': '全微分',
  'chain-rule': '链式法则',
  'implicit-function': '隐函数求导',
  'directional-derivative': '方向导数与梯度',
  'extrema': '多元函数极值',
  'taylor': '泰勒展开',
  'lagrange': '拉格朗日乘数法',
  'integral-concept': '重积分概念',
  'double-integral': '二重积分',
  'triple-integral': '三重积分',
  'change-variables': '变量替换',
  'applications': '重积分应用',
  'polar-coordinates': '极坐标积分',
  'cylindrical-spherical': '柱坐标与球坐标',
  'surface-integral-first': '第一类曲面积分',
  'surface-integral-second': '第二类曲面积分',
  'gauss-theorem': '高斯定理',
  'stokes-theorem': '斯托克斯定理',
  'greens-theorem': '格林定理',
  'differential-forms': '微分形式',
  'ode-basic': '微分方程基础',
  'first-order': '一阶微分方程',
  'higher-order': '高阶微分方程',
  'linear-system': '线性方程组',
  'laplace': '拉普拉斯变换',
  'series-solution': '级数解法',
  'numerical': '数值方法',
  'physics': '物理应用',
  'engineering': '工程应用',
  'ml': '机器学习应用',
  'graphics': '计算机图形学',
  'economics': '经济学应用',
  'biology': '生物学应用'
};

// 可视化类型映射
const vizTypeMapping = {
  'direction-cosines': 'directionCosines',
  'cross-product': 'crossProduct',
  'triple-product': 'tripleProduct',
  'plane-line': 'planeAndLine',
  'quadric-surfaces': 'quadricSurfaces',
  'coordinate-systems': 'coordinateSystems',
  'vector-fields': 'vectorFields',
  'multivariable-concept': 'multivariableConcept',
  'partial-derivative': 'partialDerivative',
  'total-differential': 'totalDifferential',
  'chain-rule': 'chainRule',
  'implicit-function': 'implicitFunction',
  'directional-derivative': 'directionalDerivative',
  'extrema': 'extrema',
  'taylor': 'taylor',
  'lagrange': 'lagrange',
  'integral-concept': 'integralConcept',
  'double-integral': 'doubleIntegral',
  'triple-integral': 'tripleIntegral',
  'change-variables': 'changeVariables',
  'applications': 'applications',
  'polar-coordinates': 'polarCoordinates',
  'cylindrical-spherical': 'cylindricalSpherical',
  'surface-integral-first': 'surfaceIntegralFirst',
  'surface-integral-second': 'surfaceIntegralSecond',
  'gauss-theorem': 'gaussTheorem',
  'stokes-theorem': 'stokesTheorem',
  'greens-theorem': 'greensTheorem',
  'differential-forms': 'differentialForms',
  'ode-basic': 'odeBasic',
  'first-order': 'firstOrder',
  'higher-order': 'higherOrder',
  'linear-system': 'linearSystem',
  'laplace': 'laplace',
  'series-solution': 'seriesSolution',
  'numerical': 'numerical',
  'physics': 'physics',
  'engineering': 'engineering',
  'ml': 'ml',
  'graphics': 'graphics',
  'economics': 'economics',
  'biology': 'biology'
};

// 转义模板字符串中的特殊字符
function escapeTemplateString(str) {
  if (!str) return '';
  // 转义反引号
  str = str.replace(/`/g, '\\`');
  // 转义 ${ 防止被解析为模板表达式
  str = str.replace(/\$\{/g, '\\${');
  return str;
}

// 转换HTML为Markdown
function convertHtmlToMarkdown(html) {
  if (!html) return '';

  let md = html;

  // 移除开头的换行和缩进
  md = md.replace(/^\s+/, '');

  // 转换标题
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1');
  md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1');

  // 转换强调
  md = md.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<em>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<b>(.*?)<\/b>/gi, '**$1**');
  md = md.replace(/<i>(.*?)<\/i>/gi, '*$1*');

  // 转换列表
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1');
  md = md.replace(/<\/?ul[^>]*>/gi, '');
  md = md.replace(/<\/?ol[^>]*>/gi, '');

  // 转换换行和段落
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<\/p>/gi, '\n');
  md = md.replace(/<p[^>]*>/gi, '');

  // 处理div容器
  md = md.replace(/<div[^>]*class="highlight-box"[^>]*>/gi, '\n**思考引导**\n\n');
  md = md.replace(/<div[^>]*class="tip-box"[^>]*>/gi, '\n> **提示**\n> ');
  md = md.replace(/<div[^>]*class="warning-box"[^>]*>/gi, '\n> ⚠️ **注意**\n> ');
  md = md.replace(/<div[^>]*class="math-formula"[^>]*>/gi, '\n```\n');
  md = md.replace(/<\/div>/gi, '\n');
  md = md.replace(/<div[^>]*>/gi, '');

  // 处理span
  md = md.replace(/<span[^>]*>(.*?)<\/span>/gi, '$1');

  // 处理SVG图表
  md = md.replace(/<svg[\s\S]*?<\/svg>/gi, '\n*[3D可视化图表]*\n');

  // 处理图片
  md = md.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*>/gi, '\n[图片: $1]\n');
  md = md.replace(/<img[^>]*>/gi, '\n[图片]\n');

  // 处理HTML实体
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&times;/g, '×');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&rarr;/g, '→');
  md = md.replace(/&larr;/g, '←');
  md = md.replace(/&infin;/g, '∞');
  md = md.replace(/&sum;/g, '∑');
  md = md.replace(/&int;/g, '∫');
  md = md.replace(/&part;/g, '∂');
  md = md.replace(/&nabla;/g, '∇');
  md = md.replace(/&perp;/g, '⊥');
  md = md.replace(/&parallel;/g, '∥');
  md = md.replace(/&ang;/g, '∠');
  md = md.replace(/&sim;/g, '∼');
  md = md.replace(/&cong;/g, '≅');
  md = md.replace(/&prop;/g, '∝');
  md = md.replace(/&ne;/g, '≠');
  md = md.replace(/&le;/g, '≤');
  md = md.replace(/&ge;/g, '≥');
  md = md.replace(/&plusmn;/g, '±');
  md = md.replace(/&minus;/g, '−');
  md = md.replace(/&middot;/g, '·');
  md = md.replace(/&sdot;/g, '⋅');
  md = md.replace(/&radic;/g, '√');
  md = md.replace(/&infin;/g, '∞');
  md = md.replace(/&alpha;/g, 'α');
  md = md.replace(/&beta;/g, 'β');
  md = md.replace(/&gamma;/g, 'γ');
  md = md.replace(/&delta;/g, 'δ');
  md = md.replace(/&theta;/g, 'θ');
  md = md.replace(/&lambda;/g, 'λ');
  md = md.replace(/&mu;/g, 'μ');
  md = md.replace(/&pi;/g, 'π');
  md = md.replace(/&sigma;/g, 'σ');
  md = md.replace(/&phi;/g, 'φ');
  md = md.replace(/&omega;/g, 'ω');
  md = md.replace(/&Delta;/g, 'Δ');
  md = md.replace(/&Sigma;/g, 'Σ');
  md = md.replace(/&Phi;/g, 'Φ');
  md = md.replace(/&Omega;/g, 'Ω');
  md = md.replace(/&rArr;/g, '⇒');
  md = md.replace(/&hArr;/g, '⇔');

  // 清理多余空白
  md = md.replace(/\n\s*\n\s*\n/g, '\n\n');
  md = md.replace(/^[\s\n]+|[\s\n]+$/g, '');

  return md;
}

// 清理例题内容
function cleanExample(text) {
  if (!text) return '';
  return convertHtmlToMarkdown(text);
}

// 生成课时代码
function generateLessonCode(key, data) {
  const title = titleMapping[key] || data.title || key;
  const theory = escapeTemplateString(convertHtmlToMarkdown(data.theory));
  const formula = escapeTemplateString(convertHtmlToMarkdown(data.formula));
  const examples = (data.examples || []).map(ex => ({
    id: ex.id,
    difficulty: ex.difficulty,
    question: cleanExample(ex.question),
    options: (ex.options || []).map(opt => cleanExample(opt)),
    correct: ex.correct ?? 0,
    explanation: cleanExample(ex.explanation)
  }));

  const hasViz = data.visualization || vizTypeMapping[key];
  const vizType = data.visualization?.type || vizTypeMapping[key];

  const varName = key.replace(/-/g, '') + 'Lesson';

  return `export const ${varName}: SubLesson = {
  id: '${key}',
  title: '${title}',
  has3D: ${!!hasViz},
  ${vizType ? `vizType: '${vizType}',` : ''}
  theory: \`
${theory}
  \`,
  formula: \`
${formula}
  \`,
  examples: ${JSON.stringify(examples, null, 2)}
};`;
}

// 主转换函数
function convertData() {
  const allLessons = [];
  const moduleLessons = {};

  for (const [key, data] of Object.entries(learningData)) {
    if (!data) {
      console.warn(`⚠ ${key}: 数据为空`);
      continue;
    }

    try {
      const code = generateLessonCode(key, data);
      allLessons.push(code);
      console.log(`✓ ${key}: ${data.examples?.length || 0} 道例题`);

      // 分类到模块
      for (const [moduleId, keys] of Object.entries(moduleMapping)) {
        if (keys.includes(key)) {
          if (!moduleLessons[moduleId]) moduleLessons[moduleId] = [];
          moduleLessons[moduleId].push(`${key.replace(/-/g, '')}Lesson`);
        }
      }
    } catch (err) {
      console.error(`✗ ${key}: ${err.message}`);
    }
  }

  // 生成输出
  const output = [];
  output.push('// 高等数学详细内容 - 完全迁移自高等数学学习工具');
  output.push('// 生成时间: ' + new Date().toLocaleString());
  output.push('');
  output.push('export interface Example {');
  output.push('  id: string;');
  output.push('  difficulty: "easy" | "medium" | "hard";');
  output.push('  question: string;');
  output.push('  options: string[];');
  output.push('  correct: number;');
  output.push('  explanation: string;');
  output.push('}');
  output.push('');
  output.push('export interface SubLesson {');
  output.push('  id: string;');
  output.push('  title: string;');
  output.push('  theory: string;');
  output.push('  formula: string;');
  output.push('  examples: Example[];');
  output.push('  has3D: boolean;');
  output.push('  vizType?: string;');
  output.push('}');
  output.push('');
  output.push(allLessons.join('\n\n'));
  output.push('');

  // 生成模块映射
  output.push('// 所有课时映射');
  output.push('export const allLessons: Record<string, SubLesson[]> = {');
  for (const [moduleId, lessonNames] of Object.entries(moduleLessons)) {
    output.push(`  '${moduleId}': [${lessonNames.join(', ')}],`);
  }
  output.push('};');
  output.push('');

  // 生成获取函数
  output.push('// 获取课时内容');
  output.push('export function getLessonContent(moduleId: string, lessonId: string): SubLesson | undefined {');
  output.push('  const lessons = allLessons[moduleId];');
  output.push('  if (!lessons) return undefined;');
  output.push('  return lessons.find(l => l.id === lessonId);');
  output.push('}');
  output.push('');
  output.push('// 获取模块下所有课时');
  output.push('export function getModuleLessons(moduleId: string): SubLesson[] {');
  output.push('  return allLessons[moduleId] || [];');
  output.push('}');
  output.push('');

  // 保存文件
  const outputPath = path.join(__dirname, '../src/data/advancedMathFull.ts');
  fs.writeFileSync(outputPath, output.join('\n'), 'utf-8');

  console.log(`\n================================`);
  console.log(`转换完成！`);
  console.log(`总课时数: ${allLessons.length}`);
  console.log(`输出文件: ${outputPath}`);
  console.log(`================================`);
}

convertData();
