// 把 D:\学习\欧拉之路\教材 下的 PDF 上传到 Supabase Storage（公共桶 textbooks）
// 用法: node scripts/upload-textbooks.cjs
// 需要 .env.local 中配置 NEXT_PUBLIC_SUPABASE_URL 与 NEXT_PUBLIC_SUPABASE_ANON_KEY
// （或提供 SUPABASE_SERVICE_ROLE_KEY，服务密钥可自动建桶并上传）
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

const env = {
  ...loadEnv(path.join(__dirname, '..', '.env.local')),
  ...process.env,
};

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const KEY = SERVICE_KEY || ANON_KEY;

const TEXTBOOK_DIR = 'D:/学习/欧拉之路/教材';
const BUCKET = 'textbooks';

async function main() {
  if (!SUPABASE_URL || !KEY) {
    console.error('缺少配置：请在 .env.local 填入 NEXT_PUBLIC_SUPABASE_URL 与 NEXT_PUBLIC_SUPABASE_ANON_KEY（或 SUPABASE_SERVICE_ROLE_KEY）');
    process.exit(1);
  }
  const api = SUPABASE_URL.replace(/\/$/, '');
  const auth = `Bearer ${KEY}`;

  // 用服务密钥尝试创建公共桶（anon 无权限时可忽略）
  if (SERVICE_KEY) {
    try {
      const r = await fetch(`${api}/storage/v1/bucket`, {
        method: 'POST',
        headers: { Authorization: auth, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
      });
      console.log('创建桶:', r.status, r.status === 200 || r.status === 409 ? 'OK（已存在也可）' : await r.text());
    } catch (e) {
      console.warn('创建桶失败（可忽略，请确认已手动建桶）:', e.message);
    }
  }

  const files = fs.readdirSync(TEXTBOOK_DIR).filter((f) => f.endsWith('.pdf'));
  console.log(`待上传 ${files.length} 个文件（总约 370MB，请耐心等待）`);
  let ok = 0;
  for (const name of files) {
    const full = path.join(TEXTBOOK_DIR, name);
    const buf = fs.readFileSync(full);
    const objectName = encodeURIComponent(name);
    const url = `${api}/storage/v1/object/${BUCKET}/${objectName}`;
    process.stdout.write(`上传中: ${name} (${(buf.length / 1048576).toFixed(1)}MB) ... `);
    const t0 = Date.now();
    const res = await fetch(url, {
      method: 'PUT',
      headers: { Authorization: auth, 'Content-Type': 'application/pdf', 'x-upsert': 'true' },
      body: new Uint8Array(buf),
    });
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    if (res.ok) {
      console.log(`OK ${secs}s`);
      ok++;
    } else {
      console.log(`FAIL ${res.status} ${(await res.text()).slice(0, 200)}`);
    }
  }
  console.log(`完成：${ok}/${files.length} 成功`);
  if (ok < files.length) {
    console.log('提示：匿名 Key 上传需要给 textbooks 桶添加 anon insert 策略，或用 SUPABASE_SERVICE_ROLE_KEY');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});