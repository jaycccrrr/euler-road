const fs = require('fs');

const content = fs.readFileSync('src/data/advancedMathFull.ts', 'utf8');
const match = content.match(/theory: `([\s\S]*?)`,\s*\n  formula:/);
if (match) {
  const theory = match[1];
  console.log('First 500 chars of theory:');
  console.log(theory.substring(0, 500));
  console.log('\n---\n');
  console.log('Sample with backslashes:');
  // Find lines with \mathbf
  const lines = theory.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('\\')) {
      console.log(`Line ${i}: ${JSON.stringify(line)}`);
    }
  });
}
