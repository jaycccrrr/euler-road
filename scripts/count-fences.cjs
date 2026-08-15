// 统计数据文件中围栏序列的数量（原始文件字符：两个反斜杠+一个反引号 ×3）
const fs = require('fs');
const fence = '\\\\`'.repeat(0) + '\\'.repeat(2) + '`'; // 原始： \\`
const pattern = fence + fence + fence;
for (const f of process.argv.slice(2)) {
  const s = fs.readFileSync(f, 'utf-8');
  let n = 0, i = 0;
  while ((i = s.indexOf(pattern, i)) !== -1) { n++; i += pattern.length; }
  console.log(f, n, '个成对围栏序列');
}
