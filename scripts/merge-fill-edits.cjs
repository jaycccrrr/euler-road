// 将“题库临时编辑模式”导出的 JSON 合并进项目
// 用法: node scripts/merge-fill-edits.cjs <导出.json> [章节名(默认 三角函数)]
// 作用:
//   1. 把编辑区上传的图片(base64)落盘到 public/images/高中数学精编题库/<章节>/
//   2. 更新 src/data/highschoolStatic.ts:
//      - 优先用新图替换 solutionBlocks 中“文件缺失”的图片引用(按顺序一一对应)
//      - 多余的图作为新的 image 块追加到 solutionBlocks(没有 solutionBlocks 时自动补上)
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DATA = 'src/data/highschoolStatic.ts';
const input = process.argv[2];
const chapter = process.argv[3] || '三角函数';

if (!input) {
  console.error('用法: node scripts/merge-fill-edits.cjs <导出.json> [章节名]');
  process.exit(1);
}

function fileExists(p) {
  if (!p || typeof p !== 'string' || !p.startsWith('/')) return false;
  return fs.existsSync(path.join(ROOT, 'public', p.replace(/^\//, '')));
}

function matchBrace(s, openIdx) {
  let depth = 0;
  let inStr = false;
  for (let i = openIdx; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

function matchArrayEnd(s, openIdx) {
  let depth = 0;
  let inStr = false;
  for (let i = openIdx; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

function md5(buf) {
  return crypto.createHash('md5').update(buf).digest('hex');
}

function extractArray(src, marker) {
  const i = src.indexOf(marker);
  if (i < 0) return null;
  const start = i + marker.length - 1;
  let depth = 0, inStr = false, end = -1;
  for (let k = start; k < src.length; k++) {
    const c = src[k];
    if (inStr) { if (c === '\\') { k++; continue; } if (c === '"') inStr = false; continue; }
    if (c === '"') { inStr = true; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) { end = k + 1; break; } }
  }
  if (end < 0) return null;
  try { return JSON.parse(src.slice(start, end)); } catch { return null; }
}

const edits = JSON.parse(fs.readFileSync(input, 'utf8')).edits;
let src = fs.readFileSync(DATA, 'utf8');

// 题目 → 章节名映射（文本解析题可能没有 /images/ 引用，需要用它推断目录）
const qb = extractArray(src, 'staticQuestionBankChapters: StaticQuestionBankChapter[] = [');
const qidToChapter = new Map();
if (qb) {
  for (const ch of qb) {
    for (const q of ch.questions) qidToChapter.set(q.id, ch.title);
  }
}
let savedCount = 0;
let replacedCount = 0;
let appendedCount = 0;

const IMG_KINDS = [
  { key: 'solutionBlocks', field: 'images', idPrefix: 'sol-' },
  { key: 'blocks', field: 'questionImages', idPrefix: 'blk-' },
  { key: 'hintBlocks', field: 'hintImages', idPrefix: 'hint-' },
];

// 把一组新图片应用到指定数组：先按顺序替换缺失引用，多余的追加为新块
function applyImagesToArray(seg, key, paths, idPrefix) {
  const keyIdx = seg.indexOf(`"${key}"`);
  if (keyIdx < 0) {
    if (!paths.length) return { seg, replaced: 0, appended: 0 };
    const blocks = paths
      .map((p, i) => `{ "id": "${idPrefix}${i + 1}", "type": "image", "content": "${p}" }`)
      .join(', ');
    return { seg: seg.slice(0, -1) + `, "${key}": [ ${blocks} ] }`, replaced: 0, appended: paths.length };
  }
  const arrOpen = seg.indexOf('[', keyIdx);
  const arrEnd = matchArrayEnd(seg, arrOpen);
  const arrText = seg.slice(arrOpen, arrEnd + 1);
  const refs = [...arrText.matchAll(/"type":\s*"image",\s*"content":\s*"([^"]+)"/g)].map((m) => m[1]);
  const missing = refs.filter((r) => !fileExists(r));
  let newArr = arrText;
  let used = 0;
  let replaced = 0;
  for (let k = 0; k < missing.length && used < paths.length; k++, used++) {
    newArr = newArr.replace(`"content": "${missing[k]}"`, `"content": "${paths[used]}"`);
    replaced++;
  }
  const extra = [...new Set(paths.slice(used))].filter((p) => !arrText.includes(`"content": "${p}"`));
  let appended = 0;
  if (extra.length) {
    const blocks = extra
      .map((p, i) => `{ "id": "${idPrefix}${i + 1}", "type": "image", "content": "${p}" }`)
      .join(', ');
    if (/^\s*\[\s*\]\s*$/.test(arrText)) newArr = `[ ${blocks} ]`;
    else newArr = newArr.replace(/(\]\s*)$/, `, ${blocks}$1`);
    appended = extra.length;
  }
  return { seg: seg.slice(0, arrOpen) + newArr + seg.slice(arrEnd + 1), replaced, appended };
}

for (const e of edits) {
  const hasAny = IMG_KINDS.some((k) => Array.isArray(e[k.field]) && e[k.field].length);
  if (!hasAny) {
    // 编辑被清空：移除之前合并脚本追加的 xN 图片块（保留原有内容）
    const qStart0 = src.indexOf(`"id": "${e.qid}"`);
    if (qStart0 >= 0) {
      const objStart0 = src.lastIndexOf('{', qStart0);
      const objEnd0 = matchBrace(src, objStart0);
      const seg0 = src.slice(objStart0, objEnd0 + 1);
      const xRe = new RegExp(
        `,\\s*\\{ "id": "(?:sol|blk|hint)-${e.qid}-x\\d+", "type": "image", "content": "[^"]+" \\}`,
        'g'
      );
      const removed0 = seg0.match(xRe);
      if (removed0) {
        src = src.slice(0, objStart0) + seg0.replace(xRe, '') + src.slice(objEnd0 + 1);
        console.log(`[清理] ${e.qid}: 移除已删除的追加图片块 ${removed0.length} 个`);
      }
    }
    continue;
  }

  // 目录：优先取该题现有 /images/ 引用目录，其次题目所属章节，最后命令行章节名
  let dir = `/images/高中数学精编题库/${chapter}`;
  let qStart = src.indexOf(`"id": "${e.qid}"`);
  let objStart = -1;
  let objEnd = -1;
  if (qStart >= 0) {
    objStart = src.lastIndexOf('{', qStart);
    objEnd = matchBrace(src, objStart);
    const seg0 = src.slice(objStart, objEnd + 1);
    const m = seg0.match(/\/images\/高中数学精编题库\/[^/"\s)]+/);
    if (m) dir = m[0];
    else if (qidToChapter.has(e.qid)) dir = `/images/高中数学精编题库/${qidToChapter.get(e.qid)}`;
  }

  const folderAbs = path.join(ROOT, 'public', dir.replace(/^\//, '').replace(/\//g, path.sep));
  fs.mkdirSync(folderAbs, { recursive: true });

  // 保存图片（按内容去重；同一题的文件名统一递增编号）
  const existingFiles = fs.existsSync(folderAbs)
    ? fs.readdirSync(folderAbs).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    : [];
  const existingMd5 = new Map();
  for (const f of existingFiles) {
    try {
      existingMd5.set(md5(fs.readFileSync(path.join(folderAbs, f))), f);
    } catch {
      // 忽略无法读取的文件
    }
  }
  let fileSeq = 0;
  const saveList = (list) =>
    list.map((img) => {
      const b64 = img.dataUrl.slice(img.dataUrl.indexOf(',') + 1);
      const buf = Buffer.from(b64, 'base64');
      const h = md5(buf);
      if (existingMd5.has(h)) return `${dir}/${existingMd5.get(h)}`;
      const mime = (img.dataUrl.match(/^data:([^;]+);/) || [])[1] || 'image/jpeg';
      const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
      const fname = `${e.qid}-${++fileSeq}.${ext}`;
      fs.writeFileSync(path.join(folderAbs, fname), buf);
      existingMd5.set(h, fname);
      savedCount++;
      return `${dir}/${fname}`;
    });

  if (qStart < 0) {
    console.warn(`[跳过] 未在数据中找到题目 ${e.qid}（图片已保存）`);
    continue;
  }

  let newSeg = src.slice(objStart, objEnd + 1);
  for (const kind of IMG_KINDS) {
    const list = Array.isArray(e[kind.field]) ? e[kind.field] : [];
    if (!list.length) continue;
    const paths = saveList(list);
    const r = applyImagesToArray(newSeg, kind.key, paths, kind.idPrefix + e.qid + '-x');
    newSeg = r.seg;
    replacedCount += r.replaced;
    appendedCount += r.appended;
  }
  src = src.slice(0, objStart) + newSeg + src.slice(objEnd + 1);
}

fs.writeFileSync(DATA, src);
console.log(
  `完成: 保存图片 ${savedCount} 张 | 替换缺失引用 ${replacedCount} 处 | 追加图片块 ${appendedCount} 个`
);
