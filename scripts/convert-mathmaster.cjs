// Convert Math-master LaTeX textbooks into knowledge-base data.
// Usage: node scripts/convert-mathmaster.cjs
const fs = require('fs');
const path = require('path');

const SRC_ROOT = 'D:/学习/欧拉之路/Math-master/Math-master';
const DATA_OUT = path.join(__dirname, '..', 'src', 'data', 'mathmaster');

const SUBJECTS = [
  {
    id: 'probability',
    name: '概率论与数理统计',
    dir: 'probability-theory-and-mathematical-statistics',
    icon: '🎲',
  },
];

function readBraceGroup(s, start) {
  let depth = 0;
  let i = start;
  for (; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  return { inner: s.slice(start + 1, i), end: i + 1 };
}

function replaceCommand(s, cmd, wrap) {
  const re = new RegExp(`\\\\${cmd}\\{`, 'g');
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(s))) {
    const idx = m.index;
    const grp = readBraceGroup(s, idx + cmd.length + 1);
    if (grp.end > s.length) break;
    out += s.slice(last, idx) + wrap(grp.inner);
    last = grp.end;
    re.lastIndex = grp.end;
  }
  return out + s.slice(last);
}

function replaceTextColor(s) {
  let changed = true;
  while (changed) {
    changed = false;
    const re = /\\textcolor\{/g;
    let m;
    while ((m = re.exec(s))) {
      const idx = m.index;
      const colorGrp = readBraceGroup(s, idx + '\\textcolor'.length);
      if (colorGrp.end >= s.length) break;
      const contentGrp = readBraceGroup(s, colorGrp.end);
      if (contentGrp.end >= s.length) break;
      s = s.slice(0, idx) + contentGrp.inner + s.slice(contentGrp.end);
      changed = true;
      re.lastIndex = idx;
      break;
    }
  }
  return s;
}

// Apply fn only to text outside math segments ($...$, $$...$$)
function mapOutsideMath(s, fn) {
  let out = '';
  let last = 0;
  const re = /\$\$[\s\S]*?\$\$|\$[^$]*?\$/g;
  let m;
  while ((m = re.exec(s))) {
    out += fn(s.slice(last, m.index)) + m[0];
    last = m.index + m[0].length;
  }
  out += fn(s.slice(last));
  return out;
}

function removeEnvironments(s, names, replacement = '') {
  for (const name of names) {
    const beginRe = new RegExp(`\\\\begin\\{${name}\\}`, 'g');
    let m;
    while ((m = beginRe.exec(s))) {
      const endRe = new RegExp(`\\\\end\\{${name}\\}`);
      const rest = s.slice(m.index);
      const em = endRe.exec(rest);
      if (!em) break;
      const endIdx = m.index + em.index + em[0].length;
      s = s.slice(0, m.index) + replacement + s.slice(endIdx);
      beginRe.lastIndex = m.index;
    }
  }
  return s;
}

function extractEnvironment(s, name) {
  const beginRe = new RegExp(`\\\\begin\\{${name}\\}`);
  const m = beginRe.exec(s);
  if (!m) return null;
  const endRe = new RegExp(`\\\\end\\{${name}\\}`);
  const rest = s.slice(m.index);
  const em = endRe.exec(rest);
  if (!em) return null;
  return {
    content: rest.slice(m.index + m[0].length, em.index),
    start: m.index,
    end: m.index + em.index + em[0].length,
  };
}

function texToMarkdown(raw) {
  let s = raw;
  // strip comments (keep \%)
  s = s.replace(/(^|[^\\])%.*$/gm, '$1');
  // keep only document body
  const docStart = s.indexOf('\\begin{document}');
  if (docStart >= 0) s = s.slice(docStart + '\\begin{document}'.length);
  const docEnd = s.indexOf('\\end{document}');
  if (docEnd >= 0) s = s.slice(0, docEnd);

  // drop structural commands
  s = s.replace(
    /\\maketitle|\\tableofcontents|\\newpage|\\clearpage|\\pagestyle\{[^}]*\}|\\thispagestyle\{[^}]*\}|\\setcounter\{[^}]*\}\{[^}]*\}|\\renewcommand\{[^}]*\}|\\addcontentsline\{[^}]*\}|\\label\{[^}]*\}|\\ref\{[^}]*\}|\\pageref\{[^}]*\}|\\cite\{[^}]*\}|\\footnote\{[^}]*\}|\\par|\\noindent|\\hfill|\\centering|\\rule\{[^}]*\}\{[^}]*\}|\\vspace\{[^}]*\}|\\hspace\{[^}]*\}|\\smallskip|\\medskip|\\bigskip|\\indent/g,
    ''
  );

  // drop graphics environments
  s = removeEnvironments(s, ['tikzpicture', 'figure', 'wrapfigure', 'center', 'abstract'], '');
  s = s.replace(/\\includegraphics(\[[^\]]*\])?\{[^}]*\}/g, '');

  // math environments -> $$...$$
  for (const env of ['equation*', 'equation', 'align*', 'align', 'gather*', 'gather', 'multline*', 'multline', 'eqnarray*', 'eqnarray']) {
    let ext;
    while ((ext = extractEnvironment(s, env))) {
      const content = ext.content.trim();
      s = s.slice(0, ext.start) + `\n\n$$\n${content}\n$$\n\n` + s.slice(ext.end);
    }
  }

  // lists -> markdown
  let ext;
  while ((ext = extractEnvironment(s, 'itemize'))) {
    const items = ext.content
      .split(/\\item\b/)
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => `- ${x.replace(/\n+/g, ' ')}`)
      .join('\n');
    s = s.slice(0, ext.start) + `\n${items}\n` + s.slice(ext.end);
  }
  while ((ext = extractEnvironment(s, 'enumerate'))) {
    const items = ext.content
      .split(/\\item\b/)
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x, i) => `${i + 1}. ${x.replace(/\n+/g, ' ')}`)
      .join('\n');
    s = s.slice(0, ext.start) + `\n${items}\n` + s.slice(ext.end);
  }

  // tabular -> markdown table (best effort)
  while ((ext = extractEnvironment(s, 'tabular'))) {
    const rows = ext.content
      .split(/\\\\/)
      .map((r) => r.split('&').map((c) => c.replace(/\\hline/g, '').trim()))
      .filter((r) => r.some((c) => c !== ''));
    if (rows.length > 0 && rows[0].length > 1) {
      const mdRows = rows.map((r) => `| ${r.join(' | ')} |`);
      const header = rows[0];
      const sep = `| ${header.map(() => '---').join(' | ')} |`;
      const table = [mdRows[0], sep, ...mdRows.slice(1)].join('\n');
      s = s.slice(0, ext.start) + `\n${table}\n` + s.slice(ext.end);
    } else {
      s = s.slice(0, ext.start) + '\n（表格内容见原书）\n' + s.slice(ext.end);
    }
  }

  // sectioning -> markdown headings
  const sectionMap = [
    ['subsubsection', '####'],
    ['subsection', '###'],
    ['section', '##'],
    ['paragraph', '**'],
  ];
  for (const [cmd, marker] of sectionMap) {
    s = replaceCommand(s, cmd, (inner) => `\n\n${marker} ${inner.trim()}${marker === '**' ? '**' : ''}\n\n`);
  }

  // text styling: only outside math (math commands like \mathbf, \text stay untouched)
  s = mapOutsideMath(s, (t) => {
    t = replaceTextColor(t);
    t = replaceCommand(t, 'textbf', (inner) => `**${inner}**`);
    t = replaceCommand(t, 'textit', (inner) => `*${inner}*`);
    t = replaceCommand(t, 'emph', (inner) => `*${inner}*`);
    return t;
  });

  // cleanup (outside math): spacing macros + text escapes
  s = mapOutsideMath(s, (t) => t.replace(/\\quad|\\qquad|\\,|\\;|\\!/g, ' ').replace(/\\%/g, '%').replace(/\\&/g, '&').replace(/\\_/g, '_').replace(/\\#/g, '#'));
  s = s.replace(/\r\n/g, '\n');
  s = s.replace(/~/g, ' ');
  s = s.replace(/\n{3,}/g, '\n\n');
  s = s.split('\n').map((line) => line.replace(/^ +/, '')).join('\n');

  return s.trim();
}

function getTitle(raw) {
  const m = raw.match(/\\title\{([^}]*)\}/);
  return m ? m[1].trim() : '';
}

function main() {
  fs.mkdirSync(DATA_OUT, { recursive: true });

  for (const subject of SUBJECTS) {
    const knowledgeDir = path.join(SRC_ROOT, subject.dir, 'knowledge');
    if (!fs.existsSync(knowledgeDir)) {
      console.error('missing dir:', knowledgeDir);
      continue;
    }

    const chapterDirs = fs
      .readdirSync(knowledgeDir)
      .filter((d) => fs.statSync(path.join(knowledgeDir, d)).isDirectory())
      .sort((a, b) => {
        const na = parseInt(a.split('-')[0], 10);
        const nb = parseInt(b.split('-')[0], 10);
        return (isNaN(na) ? 99 : na) - (isNaN(nb) ? 99 : nb);
      });

    const chapters = [];

    chapterDirs.forEach((dir, ci) => {
      const folderSlug = dir.replace(/^\d+-/, '');
      const texPath = path.join(knowledgeDir, dir, `${folderSlug}.tex`);
      if (!fs.existsSync(texPath)) return;
      const raw = fs.readFileSync(texPath, 'utf8');
      const title = getTitle(raw) || folderSlug;
      const markdown = texToMarkdown(raw);

      // split by \section into lessons
      const sections = markdown
        .split(/\n##\s+/)
        .map((part, i) => (i === 0 ? { title: '概述', content: part } : { title: part.split('\n')[0].trim(), content: part }))
        .filter((sec) => {
          const c = sec.content.trim();
          return c && !/^\{?\d+\}?$/.test(c);
        });

      const lessons = sections.map((sec, si) => ({
        id: `prob-${ci + 1}-${si + 1}`,
        title: sec.title,
        has3D: false,
        blocks: [
          {
            id: `prob-${ci + 1}-${si + 1}-0`,
            type: 'text',
            content: sec.content.trim(),
          },
        ],
      }));

      chapters.push({
        id: `prob-${ci + 1}`,
        title,
        icon: subject.icon,
        description: `${lessons.length} 个课时`,
        lessons,
      });
    });

    const dataFile = path.join(DATA_OUT, `${subject.id}.ts`);
    const content = `// Generated by scripts/convert-mathmaster.cjs (Math-master open source textbook, LaTeX text)
import type { Chapter } from '@/data/advancedMathBlocks';

export const ${subject.id}Chapters: Chapter[] = ${JSON.stringify(chapters, null, 2)};
`;
    fs.writeFileSync(dataFile, content, 'utf8');
    console.log(`generated: ${dataFile} (${chapters.length} chapters)`);
  }
}

main();