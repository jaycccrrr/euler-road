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

const edits = JSON.parse(fs.readFileSync(input, 'utf8')).edits;
let src = fs.readFileSync(DATA, 'utf8');
let savedCount = 0;
let replacedCount = 0;
let appendedCount = 0;

for (const e of edits) {
  if (!e.images || !e.images.length) {
    // 编辑被清空：移除之前合并脚本追加的 xN 图片块（保留原有内容）
    const qStart0 = src.indexOf(`"id": "${e.qid}"`);
    if (qStart0 >= 0) {
      const objStart0 = src.lastIndexOf('{', qStart0);
      const objEnd0 = matchBrace(src, objStart0);
      const seg0 = src.slice(objStart0, objEnd0 + 1);
      const xRe = new RegExp(`,\\s*\\{ "id": "sol-${e.qid}-x\\d+", "type": "image", "content": "[^"]+" \\}`, 'g');
      const removed0 = seg0.match(xRe);
      if (removed0) {
        src = src.slice(0, objStart0) + seg0.replace(xRe, '') + src.slice(objEnd0 + 1);
        console.log(`[清理] ${e.qid}: 移除已删除的追加图片块 ${removed0.length} 个`);
      }
    }
    continue;
  }

  // 目录：优先取该题现有缺失图片引用的目录，否则用命令行章节名
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
  }

  const folderAbs = path.join(ROOT, 'public', dir.replace(/^\//, '').replace(/\//g, path.sep));
  fs.mkdirSync(folderAbs, { recursive: true });

  // 1) 保存图片
  // 去重：已存在于目录中的图片（内容相同）不再重复保存
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
  const paths = [];
  for (let i = 0; i < e.images.length; i++) {
    const img = e.images[i];
    const b64 = img.dataUrl.slice(img.dataUrl.indexOf(',') + 1);
    const buf = Buffer.from(b64, 'base64');
    const h = md5(buf);
    if (existingMd5.has(h)) {
      paths.push(`${dir}/${existingMd5.get(h)}`);
      continue;
    }
    const mime = (img.dataUrl.match(/^data:([^;]+);/) || [])[1] || 'image/jpeg';
    const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
    const fname = `${e.qid}-${i + 1}.${ext}`;
    fs.writeFileSync(path.join(folderAbs, fname), buf);
    existingMd5.set(h, fname);
    savedCount++;
    paths.push(`${dir}/${fname}`);
  }

  if (qStart < 0) {
    console.warn(`[跳过] 未在数据中找到题目 ${e.qid}（图片已保存）`);
    continue;
  }

  const seg = src.slice(objStart, objEnd + 1);
  const sbIdx = seg.indexOf('"solutionBlocks"');
  let newSeg;
  let used = 0;

  if (sbIdx >= 0) {
    const arrOpen = seg.indexOf('[', sbIdx);
    const arrEnd = matchArrayEnd(seg, arrOpen);
    const arrText = seg.slice(arrOpen, arrEnd + 1);
    const refs = [...arrText.matchAll(/"type":\s*"image",\s*"content":\s*"([^"]+)"/g)].map((m) => m[1]);
    const missing = refs.filter((r) => !fileExists(r));

    // 2a) 按顺序替换缺失引用
    let newArr = arrText;
    for (let k = 0; k < missing.length && used < paths.length; k++, used++) {
      newArr = newArr.replace(`"content": "${missing[k]}"`, `"content": "${paths[used]}"`);
      replacedCount++;
    }
    // 2b) 多余的追加为新的 image 块（跳过已存在于数组中的路径）
    const extra = [...new Set(paths.slice(used))].filter((p) => !arrText.includes(`"content": "${p}"`));
    if (extra.length) {
      const blocks = extra
        .map((p, i) => `{ "id": "sol-${e.qid}-x${i + 1}", "type": "image", "content": "${p}" }`)
        .join(', ');
      if (/^\s*\[\s*\]\s*$/.test(arrText)) newArr = `[ ${blocks} ]`;
      else newArr = newArr.replace(/(\]\s*)$/, `, ${blocks}$1`);
      appendedCount += extra.length;
    }
    newSeg = seg.slice(0, arrOpen) + newArr + seg.slice(arrEnd + 1);
  } else {
    // 该题没有 solutionBlocks：补一个
    const blocks = paths
      .map((p, i) => `{ "id": "sol-${e.qid}-x${i + 1}", "type": "image", "content": "${p}" }`)
      .join(', ');
    newSeg = seg.slice(0, -1) + `, "solutionBlocks": [ ${blocks} ] }`;
    appendedCount += paths.length;
  }

  src = src.slice(0, objStart) + newSeg + src.slice(objEnd + 1);
}

fs.writeFileSync(DATA, src);
console.log(
  `完成: 保存图片 ${savedCount} 张 | 替换缺失引用 ${replacedCount} 处 | 追加图片块 ${appendedCount} 个`
);
