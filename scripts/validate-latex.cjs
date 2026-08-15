// 校验数据文件中所有 $...$ / $$...$$ 片段能否被 KaTeX 正常渲染
// 先按 JS 字符串解码（与运行时一致），再提取公式片段
// 用法: node scripts/validate-latex.cjs [file...]
const fs = require('fs');
const path = require('path');
const katex = require('katex');

const files = process.argv.slice(2).length > 0
  ? process.argv.slice(2)
  : [
      '../src/data/advancedMathBlocks.ts',
      '../src/data/linearAlgebraBlocks.ts',
    ];

let totalBlocks = 0;
let totalErrors = 0;

for (const rel of files) {
  const file = path.resolve(__dirname, rel);
  const src = fs.readFileSync(file, 'utf-8');
  let errors = 0;
  let count = 0;

  // 提取字符串字面量并按 JS 语义解码（\\ → \，\n → 换行，与运行时一致）
  const strRe = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g;
  let sm;
  const decodedParts = [];
  while ((sm = strRe.exec(src)) !== null) {
    try {
      const decoded = sm[1] !== undefined
        ? JSON.parse('"' + sm[1] + '"')
        : JSON.parse('"' + sm[2].replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');
      decodedParts.push({ text: decoded, offset: sm.index });
    } catch {
      // 非内容字符串，跳过
    }
  }

  const segments = [];
  for (const part of decodedParts) {
    const re = /\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g;
    let m;
    while ((m = re.exec(part.text)) !== null) {
      const display = m[1] !== undefined;
      const latex = (display ? m[1] : m[2]).trim();
      if (!latex) continue;
      const line = src.slice(0, part.offset).split('\n').length;
      segments.push({ latex, display, line });
    }
  }

  for (const seg of segments) {
    count++;
    try {
      katex.renderToString(seg.latex, {
        displayMode: seg.display,
        throwOnError: true,
        strict: false,
      });
    } catch (e) {
      errors++;
      console.log(`[ERROR] ${path.basename(file)}:${seg.line} ${e.message}`);
      console.log(`        LaTeX: ${seg.latex.slice(0, 140).replace(/\n/g, '|')}`);
    }
  }

  // 残留 Unicode 数学字符检查（在源码层，排除 icon 字段行）
  const unicodeRe = /[₀₁₂₃₄₅₆₇₈₉ₙₘₖₐₗₚᵣₛₜ⁰¹²³⁴⁵⁶⁷⁸⁹ⁿⁱᵀᵃᵇᶜᵈᵉᶠᵍʰᵏᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻ⁻αβγδεζηθκλμνξπρστυφχψωΓΔΘΛΞΠΣΥΦΨΩ∂∇∞→⇒⇔≤≥≠≈≡∈∉⊂⊆∪∩∅±∓×÷·∫∬∭∮∯∑∏√∀∃⊥∥]/g;
  const iconLines = new Set();
  for (const im of src.matchAll(/icon:\s*['"][^'"]*['"]/g)) {
    iconLines.add(src.slice(0, im.index).split('\n').length);
  }
  const unicodeHits = [];
  let um;
  while ((um = unicodeRe.exec(src)) !== null) {
    const line = src.slice(0, um.index).split('\n').length;
    if (!iconLines.has(line)) unicodeHits.push(`${um[0]}@L${line}`);
  }

  console.log(`${path.basename(file)}: ${count} 个公式片段, ${errors} 个 KaTeX 错误, ${unicodeHits.length} 个残留 Unicode（icon 字段已排除）`);
  if (unicodeHits.length > 0 && unicodeHits.length <= 30) {
    console.log('  残留:', unicodeHits.join(' '));
  }
  totalBlocks += count;
  totalErrors += errors;
}

console.log(`\n总计: ${totalBlocks} 个公式, ${totalErrors} 个错误`);
process.exit(totalErrors > 0 ? 1 : 0);
