const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../src/data/advancedMathFull.ts');
const BAK = SRC + '.bak';

let content = fs.readFileSync(SRC, 'utf-8');

// Backup original (only once)
if (!fs.existsSync(BAK)) {
  fs.writeFileSync(BAK, content, 'utf-8');
  console.log('Backup saved.');
}

// ── Unicode → LaTeX ──
// In TS template literals, \\alpha (two chars) → \alpha at runtime → KaTeX renders α
// So in the replacement string (JS string), we need 4 backslashes → 2 in output
const REPLACEMENTS = [
  // Greek lowercase
  [/α/g,'\\\\alpha'],[/β/g,'\\\\beta'],[/γ/g,'\\\\gamma'],[/δ/g,'\\\\delta'],
  [/ε/g,'\\\\varepsilon'],[/ζ/g,'\\\\zeta'],[/η/g,'\\\\eta'],[/θ/g,'\\\\theta'],
  [/κ/g,'\\\\kappa'],[/λ/g,'\\\\lambda'],[/μ/g,'\\\\mu'],[/ν/g,'\\\\nu'],
  [/ξ/g,'\\\\xi'],[/π/g,'\\\\pi'],[/ρ/g,'\\\\rho'],[/σ/g,'\\\\sigma'],
  [/τ/g,'\\\\tau'],[/υ/g,'\\\\upsilon'],[/φ/g,'\\\\varphi'],[/χ/g,'\\\\chi'],
  [/ψ/g,'\\\\psi'],[/ω/g,'\\\\omega'],
  // Greek uppercase
  [/Γ/g,'\\\\Gamma'],[/Δ/g,'\\\\Delta'],[/Θ/g,'\\\\Theta'],[/Λ/g,'\\\\Lambda'],
  [/Ξ/g,'\\\\Xi'],[/Π/g,'\\\\Pi'],[/Σ/g,'\\\\Sigma'],[/Υ/g,'\\\\Upsilon'],
  [/Φ/g,'\\\\Phi'],[/Ψ/g,'\\\\Psi'],[/Ω/g,'\\\\Omega'],
  // Subscripts (not LaTeX commands, just chars)
  [/₀/g,'_0'],[/₁/g,'_1'],[/₂/g,'_2'],[/₃/g,'_3'],[/₄/g,'_4'],
  [/₅/g,'_5'],[/₆/g,'_6'],[/₇/g,'_7'],[/₈/g,'_8'],[/₉/g,'_9'],
  [/ₙ/g,'_n'],[/ₘ/g,'_m'],[/ₖ/g,'_k'],[/ₐ/g,'_a'],
  // Superscripts
  [/⁰/g,'^{0}'],[/¹/g,'^{1}'],[/²/g,'^{2}'],[/³/g,'^{3}'],[/⁴/g,'^{4}'],
  [/⁵/g,'^{5}'],[/⁶/g,'^{6}'],[/⁷/g,'^{7}'],[/⁸/g,'^{8}'],[/⁹/g,'^{9}'],
  // Math symbols
  [/∂/g,'\\\\partial'],[/∇/g,'\\\\nabla'],[/∞/g,'\\\\infty'],
  [/→/g,'\\\\to'],[/⇒/g,'\\\\Rightarrow'],[/⇔/g,'\\\\Leftrightarrow'],
  [/≤/g,'\\\\leq'],[/≥/g,'\\\\geq'],[/≠/g,'\\\\neq'],[/≈/g,'\\\\approx'],
  [/≡/g,'\\\\equiv'],[/∈/g,'\\\\in'],[/∉/g,'\\\\notin'],
  [/⊂/g,'\\\\subset'],[/⊆/g,'\\\\subseteq'],[/∪/g,'\\\\cup'],[/∩/g,'\\\\cap'],
  [/∅/g,'\\\\emptyset'],[/±/g,'\\\\pm'],[/∓/g,'\\\\mp'],
  [/×/g,'\\\\times'],[/÷/g,'\\\\div'],[/·/g,'\\\\cdot'],
  [/∫/g,'\\\\int'],[/∬/g,'\\\\iint'],[/∭/g,'\\\\iiint'],[/∮/g,'\\\\oint'],
  [/∑/g,'\\\\sum'],[/∏/g,'\\\\prod'],[/√/g,'\\\\sqrt'],
  [/∀/g,'\\\\forall'],[/∃/g,'\\\\exists'],
  [/⊥/g,'\\\\perp'],[/∥/g,'\\\\parallel'],
];

function convertToLatex(s) {
  // Bold vectors **a** → \mathbf{a}
  s = s.replace(/\*\*([a-zA-Z])\*\*/g, '\\\\mathbf{$1}');
  for (const [re, rep] of REPLACEMENTS) s = s.replace(re, rep);
  return s;
}

// ── Step 1: Remove HTML comments and 3D placeholders ──
content = content.replace(/[ \t]*<!--[\s\S]*?-->[ \t]*\n?/g, '');
content = content.replace(/[ \t]*\*\[3D可视化图表\]\*[ \t]*\n?/g, '');

// ── Step 2: Convert code fence blocks → $$...$$ display math ──
// In the raw TS file, code fences appear as the 6-char sequence: \`\`\`
// (each backtick is escaped with backslash inside the template literal)
// Regex: match \\` three times = literal \`\`\` in the file
content = content.replace(/\\`\\`\\`[ \t]*\n([\s\S]*?)[ \t]*\\`\\`\\`/g, (_m, body) => {
  const lines = body.split('\n')
    .map(l => l.replace(/^[ \t]+/, ''))  // strip leading indent
    .filter(l => l.trim());
  if (lines.length === 0) return '';
  const converted = lines.map(convertToLatex).join('\n');
  return '\n\n$$\n' + converted + '\n$$\n';
});

// ── Step 3: Convert inline Unicode math in paragraph text ──
// Only process lines that contain math chars and are not headings/tables/etc.
const MATH_RE = /[αβγδεζηθκλμνξπρστυφχψωΑΒΓΔΘΛΞΠΣΥΦΨΩ∂∇∞→⇒⇔≤≥≠≈≡∈∉⊂⊆∪∩∅±∓×÷·∫∬∭∮∑∏√₀₁₂₃₄₅₆₇₈₉ₙₘₖ⁰¹²³⁴⁵⁶⁷⁸⁹]/;

content = content.split('\n').map(line => {
  if (!MATH_RE.test(line)) return line;
  const t = line.trim();
  // Skip headings, table rows, block quotes, list markers, already-dollar lines
  if (!t || /^[#|>`*-]/.test(t) || t.startsWith('$$') || t.startsWith('export') ||
      t.startsWith('const') || t.startsWith('//') || t.startsWith('id:') ||
      t.startsWith('title:') || t.includes('`')) return line;

  // Replace math spans: consecutive chars containing at least one math character
  return line.replace(
    /([a-zA-Z0-9_()\[\]{}.*/+\-=, ]*[αβγδεζηθκλμνξπρστυφχψωΑΒΓΔΘΛΞΠΣΥΦΨΩ∂∇∞→⇒⇔≤≥≠≈≡∈∉⊂⊆∪∩∅±∓×÷·∫∬∭∮∑∏√₀₁₂₃₄₅₆₇₈₉ₙₘₖ⁰¹²³⁴⁵⁶⁷⁸⁹][a-zA-Z0-9_()\[\]{}.*/+\-=, αβγδεζηθκλμνξπρστυφχψωΑΒΓΔΘΛΞΠΣΥΦΨΩ∂∇∞→⇒⇔≤≥≠≈≡∈∉⊂⊆∪∩∅±∓×÷·∫∬∭∮∑∏√₀₁₂₃₄₅₆₇₈₉ₙₘₖ⁰¹²³⁴⁵⁶⁷⁸⁹]*)/g,
    (match) => '$' + convertToLatex(match) + '$'
  );
}).join('\n');

// ── Step 4: Fix double-wrapped $$ from Step 3 applied to already-converted lines ──
content = content.replace(/\$\$\$/g, '$$');

// ── Step 5: Clean up excessive indentation (8+ spaces = HTML-style indent) ──
content = content.replace(/^[ \t]{8,}/gm, '');

// ── Write result ──
fs.writeFileSync(SRC, content, 'utf-8');
console.log('Done:', SRC, '—', content.split('\n').length, 'lines');
