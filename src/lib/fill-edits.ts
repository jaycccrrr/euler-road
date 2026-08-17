// 题库“临时编辑区”数据存储（IndexedDB）
// 用途：在浏览器里为题目补充解析文本与图片，编辑结果保存在本机；
// 页面上的“导出编辑数据”可下载 JSON，之后合并回 highschoolStatic.ts 与 public/。
import { openDB, type DBSchema } from 'idb';

export interface FillImage {
  ref: string; // 目标引用路径（如 /images/高中数学精编题库/函数/xxx.webp），额外图为 custom-*
  dataUrl: string; // data:image/...;base64,...
  name?: string; // 原始文件名（提示用）
}

export interface FillEdit {
  qid: string;
  solutionText: string; // 解析文本（覆盖/补充）
  images: FillImage[];
  questionImages?: FillImage[]; // 题目配图（blocks 中的图片）
  hintImages?: FillImage[]; // 提示图（hintBlocks 中的图片）
  updatedAt: number;
}

interface FillEditsDBSchema extends DBSchema {
  edits: { key: string; value: FillEdit };
}

const DB_NAME = 'euler-fill-edits';
const STORE = 'edits';

function getDb() {
  return openDB<FillEditsDBSchema>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'qid' });
    },
  });
}

export async function loadAllEdits(): Promise<Record<string, FillEdit>> {
  try {
    const db = await getDb();
    const all = await db.getAll(STORE);
    const map: Record<string, FillEdit> = {};
    for (const e of all) map[e.qid] = e;
    return map;
  } catch {
    return {};
  }
}

export async function saveFillEdit(edit: FillEdit): Promise<void> {
  const db = await getDb();
  await db.put(STORE, edit);
}

export async function deleteFillEdit(qid: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE, qid);
}

export function downloadFillEdits(edits: Record<string, FillEdit>): void {
  const payload = {
    generatedAt: new Date().toISOString(),
    source: 'euler-road-fill-edits',
    edits: Object.values(edits).sort((a, b) => a.qid.localeCompare(b.qid)),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'euler-fill-edits.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
