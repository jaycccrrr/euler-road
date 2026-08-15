const fs = require('fs');

// 读取生成的数据文件
const content = fs.readFileSync('src/data/advancedMathBlocks.ts', 'utf8');

// 查找文件中存储的原始字符串
const idx = content.indexOf('\\mathbf{a}');
if (idx !== -1) {
  console.log('Found \\\\mathbf{a} at position:', idx);
  console.log('Context in file:');
  console.log(content.substring(idx - 20, idx + 40));
  console.log('\n');

  // 数一下反斜杠的数量
  const backslashCount = (content.substring(idx, idx + 10).match(/\\/g) || []).length;
  console.log('Backslash count in "\\\\mathbf{a}":', backslashCount);
} else {
  console.log('No \\\\mathbf{a} found');
}

// 检查实际的存储
const idx2 = content.indexOf('$\\mathbf{a}$');
if (idx2 !== -1) {
  console.log('\nFound $\\\\mathbf{a}$ at position:', idx2);
  console.log('Context:');
  console.log(content.substring(idx2 - 5, idx2 + 20));

  // 检查实际存储
  const stored = content.substring(idx2, idx2 + 15);
  console.log('\nStored bytes:');
  for (let i = 0; i < stored.length; i++) {
    console.log(`  [${i}] '${stored[i]}' = ${stored.charCodeAt(i)}`);
  }
}
