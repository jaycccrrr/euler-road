// 把 D:\学习\欧拉之路\教材 下的 PDF 上传到 GitHub Releases（tag: textbooks）
// 用法: node scripts/upload-textbooks-github.cjs
// 需要 GitHub Token（经典 token，勾选 repo 权限），写入 .env.local 的 GITHUB_TOKEN
const fs = require('fs');
const path = require('path');

function loadEnv(file) {
  const out = {};
  try {
    const text = fs.readFileSync(file, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
      if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  } catch {}
  return out;
}

const env = { ...loadEnv(path.join(__dirname, '..', '.env.local')), ...process.env };
const TOKEN = env.GITHUB_TOKEN || '';
const REPO = 'jaycccrrr/euler-road';
const TAG = 'textbooks';
const TEXTBOOK_DIR = 'D:/学习/欧拉之路/教材';

const API = `https://api.github.com/repos/${REPO}`;

async function ghJson(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json', ...(options.headers || {}) },
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch {}
  return { status: res.status, data };
}

async function findOrCreateRelease() {
  const get = await ghJson(`${API}/releases/tags/${TAG}`);
  if (get.status === 200) return get.data.id;
  if (get.status === 404) {
    const { status, data } = await ghJson(`${API}/releases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag_name: TAG, name: '常用教材', draft: false, generate_release_notes: false }),
    });
    if (status === 201 || status === 200) return data.id;
    throw new Error('创建 Release 失败: ' + status + ' ' + JSON.stringify(data).slice(0, 200));
  }
  throw new Error('查询 Release 失败: ' + get.status);
}

async function uploadAsset(releaseId, filename, buffer) {
  const name = encodeURIComponent(filename);
  const url = `${API.replace('api.github.com', 'uploads.github.com')}/releases/${releaseId}/assets?name=${name}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/pdf' },
        body: new Uint8Array(buffer),
      });
      if (res.ok) return true;
      const t = await res.text();
      console.log(`  尝试 ${attempt} 失败 ${res.status}: ${t.slice(0, 120)}`);
    } catch (e) {
      console.log(`  尝试 ${attempt} 异常: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 5000 * attempt));
  }
  return false;
}

async function main() {
  if (!TOKEN) {
    console.error('缺少 GITHUB_TOKEN：请创建 GitHub 经典 token（勾选 repo 权限）并填入 .env.local');
    process.exit(1);
  }
  const releaseId = await findOrCreateRelease();
  console.log('Release 就绪:', TAG, 'id=' + releaseId);

  const files = fs.readdirSync(TEXTBOOK_DIR).filter((f) => f.endsWith('.pdf'));
  let ok = 0;
  for (const name of files) {
    const full = path.join(TEXTBOOK_DIR, name);
    const buf = fs.readFileSync(full);
    process.stdout.write(`上传中: ${name} (${(buf.length / 1048576).toFixed(1)}MB) ... `);
    const success = await uploadAsset(releaseId, name, buf);
    if (success) {
      console.log('OK');
      ok++;
    } else {
      console.log('FAIL');
    }
  }
  console.log(`完成：${ok}/${files.length}`);
  if (ok > 0) {
    console.log('下载地址前缀：');
    console.log(`https://github.com/${REPO}/releases/download/${TAG}/`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });