// 高中数学知识库“临时编辑区”数据存储（IndexedDB）
// 与题库编辑模式同思路：在浏览器里为知识库缺失图片上传内容，导出 JSON 后合并落盘。
import { openDB, type DBSchema } from 'idb';

export interface KbFillImage {
  ref: string; // 目标引用路径（/images/高中数学精编题库/...）
  dataUrl: string;
  name?: string;
}

export interface KbFillEdit {
  key: string; // topicId + ':' + subTopicId
  topicId: string;
  subId: string;
  images: KbFillImage[];
  updatedAt: number;
}

interface KbFillDBSchema extends DBSchema {
  kbEdits: { key: string; value: KbFillEdit };
}

const DB_NAME = 'euler-kb-fill-edits';
const STORE = 'kbEdits';

function getDb() {
  return openDB<KbFillDBSchema>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'key' });
    },
  });
}

export async function loadKbEdits(): Promise<Record<string, KbFillEdit>> {
  try {
    const db = await getDb();
    const all = await db.getAll(STORE);
    const map: Record<string, KbFillEdit> = {};
    for (const e of all) map[e.key] = e;
    return map;
  } catch {
    return {};
  }
}

export async function saveKbEdit(edit: KbFillEdit): Promise<void> {
  const db = await getDb();
  await db.put(STORE, edit);
}

export async function deleteKbEdit(key: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE, key);
}

export function downloadKbFillEdits(edits: Record<string, KbFillEdit>): void {
  const payload = {
    generatedAt: new Date().toISOString(),
    source: 'euler-road-kb-fill-edits',
    edits: Object.values(edits).sort((a, b) => a.key.localeCompare(b.key)),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'euler-kb-fill-edits.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
