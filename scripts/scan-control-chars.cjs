// 扫描数据文件字符串字面量解码后的控制字符（单反斜杠转义被 JS 吞掉的 LaTeX 命令会留下控制字符）
// 用法: node scripts/scan-control-chars.cjs [file...]
const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2).length > 0
  ? process.argv.slice(2)
  : ['../src/data/advancedMathBlocks.ts', '../src/data/linearAlgebraBlocks.ts'];

for (const rel of files) {
  const file = path.resolve(__dirname, rel);
  const src = fs.readFileSync(file, 'utf-8');
  const re = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g;
  let m;
  const issues = {};
  while ((m = re.exec(src)) !== null) {
    let decoded;
    try {
      if (m[1] !== undefined) {
        decoded = JSON.parse('"' + m[1] + '"');
      } else {
        // 单引号字符串：转成 JSON 双引号解码（\' → '，内部 " 需转义）
        decoded = JSON.parse('"' + m[2].replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');
      }
    } catch {
      continue;
    }
    for (let i = 0; i < decoded.length; i++) {
      const c = decoded.charCodeAt(i);
      if ((c < 32 && c !== 10 && c !== 13) || c === 127) {
        const ctx = decoded.slice(Math.max(0, i - 20), i + 20).replace(/[\n\r]/g, '|');
        const key = '0x' + c.toString(16).padStart(2, '0');
        (issues[key] = issues[key] || { count: 0, samples: [] }).count++;
        if (issues[key].samples.length < 5) issues[key].samples.push(ctx);
      }
    }
  }
  console.log('==', path.basename(file));
  if (Object.keys(issues).length === 0) console.log('  无控制字符');
  for (const [k, v] of Object.entries(issues)) {
    console.log(`  ${k} × ${v.count}`);
    v.samples.forEach((s) => console.log('    …' + s + '…'));
  }
}
