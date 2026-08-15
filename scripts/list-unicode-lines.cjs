// 列出数据文件中残留 Unicode 数学字符的行号及内容预览
const fs = require('fs');
const file = process.argv[2];
const src = fs.readFileSync(file, 'utf-8');
const unicodeRe = /[₀₁₂₃₄₅₆₇₈₉ₙₘₖₐₗₚᵣₛₜ⁰¹²³⁴⁵⁶⁷⁸⁹ⁿⁱᵀᵃᵇᶜᵈᵉᶠᵍʰᵏᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻ⁻αβγδεζηθκλμνξπρστυφχψωΓΔΘΛΞΠΣΥΦΨΩ∂∇∞→⇒⇔≤≥≠≈≡∈∉⊂⊆∪∩∅±∓×÷·∫∬∭∮∯∑∏√∀∃⊥∥⟹⟺]/g;
const iconLines = new Set();
for (const im of src.matchAll(/icon:\s*['"][^'"]*['"]/g)) {
  iconLines.add(src.slice(0, im.index).split('\n').length);
}
const lines = new Map();
let m;
while ((m = unicodeRe.exec(src)) !== null) {
  const line = src.slice(0, m.index).split('\n').length;
  if (iconLines.has(line)) continue;
  lines.set(line, (lines.get(line) || 0) + 1);
}
console.log('共', lines.size, '行有残留 Unicode:');
for (const [line, count] of [...lines.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  L${line}: ${count} 个`);
}
