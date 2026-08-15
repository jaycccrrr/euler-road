const fs = require('fs');
const katex = require('katex');

// The raw file has: $ \ \ c o s $  (two backslash chars in file)
// When TypeScript compiles: \\ -> \ (escape sequence = one backslash)
// At runtime: $ \ c o s $  (single backslash, 6 chars)

// But what if Next.js is NOT compiling this file with TypeScript?
// What if it's being treated as JSON data? Let me check...

// The file IS a .ts file, so SWC/tsc SHOULD compile it properly.
// But let me check if there's a different interpretation.

// Let me check the STRUCTURE of the content strings more carefully
const src = fs.readFileSync('src/data/advancedMathBlocks.ts', 'utf-8');

// Find the opening quote of the very first content string
const firstContentStart = src.indexOf('"content": "## 一、方向角的概念');
const quoteIdx = firstContentStart + '"content": '.length;
console.log('Opening char:', src[quoteIdx]); // should be "
console.log('Char at quoteIdx:', src.charCodeAt(quoteIdx));

// The content value starts with a double quote. This is a standard JS/TS string.
// So TypeScript will parse escape sequences: \\ -> \, \r -> CR, \n -> LF, etc.

// Now let me verify: when we have $\\\\cos$ in the FILE (two backslash chars):
// This is the SOURCE TEXT of the TS file.
// The string literal in the source code is: "$\\\\cos$"
// In this source: $ is just $ (not special in strings),
// \\\\ is escape for ONE backslash,
// cos is literal,
// $ is just $.
// So COMPILED: $\cos$ (with one backslash).

// NOW the question is: does the MathRenderer's regex match this at runtime?
// MathRenderer receives: "$\cos$ α = ..." as a JS string (one backslash)
// The regex: /\$([^\n$]+?)\$/g
// This should match the substring "$\cos$" and extract "\cos"
// KaTeX receives "\cos" -> renders cos operator

// The test-pipeline.js test confirmed this works! 1202 formulas, 0 failures.

// So WHY does the user see raw text? Let me think...
// Maybe the user hasn't rebuilt the dev server?
// Maybe there's a CDN cache issue?
// Or maybe the ACTUAL runtime code paths are different.

// Let me check: does the dev server hot-reload the .ts file changes?
// When running 'npm run dev', Next.js watches .ts files and recompiles on change.
// If the user changed the .ts file and the dev server recompiled, it should see the new content.

// BUT - wait. Let me re-read the MathRenderer more carefully.
// Maybe there's a subtle issue with how the regex interacts with the Markdown processing.

// Actually, I just realized something.
// Let me check the SCREENSHOT again. The user showed formulas like:
// "\ \\ cos α = a₁/|a| = a₁/√(a₁² + a₂² + a₃²)"
// The formula shows raw "cos" with a backslash before it.
// If the file was properly converted and compiled, the regex /\$([^\n$]+?)\$/g
// would match "$\cos$" and render it as KaTeX HTML.
// But instead we see RAW TEXT, which means the regex DID NOT match.

// The regex /\$([^\n$]+?)\$/g requires the text between $ signs to NOT contain $ or newline.
// What if the runtime string is actually "$\\cos$" with TWO backslashes?
// Let me check what Next.js actually compiles.

// Build the project and check the compiled output
// Actually, let me just test the compiled build artifacts

// First, let me check: maybe the issue is that the content is being treated as
// a literal string with NO escape processing because it's loaded dynamically?

// Let me check if the file is being read as text (fs.readFileSync) at runtime
// rather than compiled as a module.

// Check how the data is imported
const contentBlocks = fs.readFileSync('src/data/advancedMathBlocks.ts', 'utf-8');

// Find ALL the escaped backtick patterns: \\`
const escapedBacktick = contentBlocks.indexOf('\\`');
console.log('Found escaped backtick at:', escapedBacktick);

// If the file uses template literals with escaped backticks, the interpretation
// would be different!

// Check if content values are template literals (backticks) or regular strings
// Earlier test showed: "Block 2 content starts with: \"/i"  meaning it starts with "
// So the content fields use DOUBLE QUoted strings, not template literals.

// I think the REAL issue might be different.
// Let me check: is the conversion script output CORRECT?

// The conversion script reads the file and replaces:
// <span class=\"math\">\\cos</span> -> $\\cos$
// But in the file, the original span had \" escaped quotes
// Let me check what the ORIGINAL span looked like:

// Search for any remaining span patterns (there should be 0)
const spanIdx = contentBlocks.indexOf('<span class');
console.log('Remaining span tags:', spanIdx);

// Check the conversion result for a specific formula
// The original was: <span class=\"math\">\\cos</span>
// After conversion: $\\cos$
// But in the FILE, this would be written as: $\\\\cos$ (escaping backslash for TS string)

// Wait, the conversion script does NOT use JSON.stringify!
// It does: content.substring(0, openIdx) + '$' + latex + '$' + content.substring(closeIdx + closeLen)
// Where latex is the TEXT BETWEEN the span tags.
// So if the span was: <span class=\"math\">\\cos</span>
// The latex extracted is: \\cos  (two chars: backslash + cos, from the FILE)
// Then replacement: $\\cos$  (5 chars: $, \, \, c, o, s, $... no wait)
// '$' + latex + '$' = '$' + '\\cos' + '$' = '$\\cos$' (5 chars)

// But the FILE needs escape sequences!
// The original file had: content: "...<span class=\"math\">\\cos</span>..."
// After replacement: content: "...$\\cos$..."
// The $ is NOT escaped (not special in strings), so it stays as $.
// The \ in the latex stays as \ (single backslash in file).
// BUT in a JS/TS STRING, a SINGLE \ followed by 'c' is NOT an escape sequence!
// \c is NOT a valid JS escape, so it's kept as-is: \c
// So the COMPILED string has: $ + \ + cos + $ = $\cos$ (single backslash at runtime)

// NOW this is the problem!
// The conversion script wrote $\\cos in the file (single backslash)
// TypeScript compiles: since \c is not a valid escape, it's kept as \c
// Runtime: $\cos$ (single backslash)
// The regex should match this!

// UNLESS... the conversion script wrote something WRONG.
// Let me check the ACTUAL file content.

// Find the first $...$ formula after the conversion
let dollarIdx = 0;
let dollarCount = 0;
const dollarRegex = /\$([^\n${]+)\$/g;
let match;
const matches = [];

while ((match = dollarRegex.exec(contentBlocks)) !== null) {
  dollarCount++;
  if (dollarCount <= 10) {
    matches.push({
      formula: match[0],
      latex: match[1],
      index: match.index,
    });
  }
  if (dollarCount >= 200) break;
}

console.log('Total $...$ formulas found:', dollarCount);
console.log('First 5 matches:');
matches.slice(0, 5).forEach((m, i) => {
  console.log('  ' + (i+1) + ': ' + JSON.stringify(m.formula) + ' latex=' + JSON.stringify(m.latex));
});

// Check for formulas that might have issues
// e.g., $ cos $ without backslash (would render as italics, not math)
let noBackslashCount = 0;
dollarRegex.lastIndex = 0;
while ((match = dollarRegex.exec(contentBlocks)) !== null) {
  const latex = match[1];
  // Check if the latex starts with a letter (no backslash)
  if (latex[0] !== '\\' && latex[0] !== '$' && latex.match(/[a-zA-Z]/)) {
    // This might be an issue if it's supposed to be LaTeX
    noBackslashCount++;
    if (noBackslashCount <= 5) {
      console.log('  No-backslash formula: ' + JSON.stringify(match[0]));
    }
  }
}
console.log('Formulas without leading backslash:', noBackslashCount);

// The REAL issue: let me check if maybe the file was written incorrectly
// by the conversion script. Specifically, the script might have written
// raw characters with NO escaping.

// The ORIGINAL span was: <span class=\"math\">\\cos</span>
// The \" in the file is a LITERAL backslash + quote (to escape the quote in the TS string).
// When the script extracts the latex between the span tags, it gets:
// The TEXT from the FILE between the closing > and the opening <
// So latex from the file would be: \cos  (literal text)
// But wait, does it include the file's own escaping?

// The conversion script does:
// const openIdx = content.indexOf(openStr);
// const closeIdx = content.indexOf(closeStr, openIdx);
// const latex = content.substring(openIdx + openLen, closeIdx);
// content = content.substring(0, openIdx) + '$' + latex + '$' + content.substring(closeIdx + closeLen);

// So latex = the RAW TEXT between the span tags.
// If the file had: <span class=\"math\">\\cos</span>
// Then latex = "\\cos" (the raw text between > and <)
// And the replacement = "$\\cos$" written directly into the file.

// Now in the file, the context is still inside a TS string "...".
// So "$\\ cos$" in the file means:
// In a TS string, $ is literal, \c is not valid escape so kept as \c
// At runtime: $\cos$ (5 chars: $, \, c, o, s, $)

// Let me verify by actually importing the data through Next.js's build
// ...but first, let me check if the dev server is even running

console.log('\n=== Testing with node require() simulation ===');

// Create a minimal test that simulates exactly what the TS compiler does
function tsStringParse(str) {
  // Simulate TypeScript compilation of a string
  let result = '';
  let i = 0;
  while (i < str.length) {
    if (str[i] === '\\' && str[i+1]) {
      const next = str[i+1];
      switch (next) {
        case '\\': result += '\\'; i += 2; break;
        case '"': result += '"'; i += 2; break;
        case "'": result += "'"; i += 2; break;
        case 'n': result += '\n'; i += 2; break;
        case 'r': result += '\r'; i += 2; break;
        case '`': result += '`'; i += 2; break;
        case 't': result += '\t'; i += 2; break;
        default: result += str[i] + str[i+1]; i += 2; break;
      }
    } else {
      result += str[i];
      i++;
    }
  }
  return result;
}

// Test the first content string
const firstContentMatch = contentBlocks.match(/"content":\s*"([^"]*?)"/s);
if (firstContentMatch) {
  const rawStr = firstContentMatch[1];
  const compiled = tsStringParse(rawStr);
  console.log('Raw string (first 100 chars):', JSON.stringify(rawStr.substring(0, 100)));
  console.log('Compiled string (first 100 chars):', JSON.stringify(compiled.substring(0, 100)));

  // Find $...$ formulas in the compiled string
  const formulas = compiled.match(/\$[^\n$]+\$/g) || [];
  console.log('Formulas in compiled string:', formulas.length);
  formulas.slice(0, 10).forEach((f, i) => {
    const latex = f.slice(1, -1);
    console.log('  ' + (i+1) + ': ' + JSON.stringify(f) + ' -> latex: ' + JSON.stringify(latex));
    try {
      katex.renderToString(latex, { displayMode: false, throwOnError: false, strict: false });
      console.log('      OK');
    } catch (e) {
      console.log('      ERROR: ' + e.message);
    }
  });
}
