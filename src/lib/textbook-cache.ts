import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'euler-textbook-cache';
const STORE = 'pdfs';
const DB_VERSION = 1;

interface CachedPdf {
  file: string;
  data: ArrayBuffer;
  size: number;
  savedAt: number;
}

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'file' });
        }
      },
    });
  }
  return dbPromise;
}

/** 读取已缓存的教材 PDF 字节 */
export async function getCachedTextbook(
  file: string
): Promise<{ data: ArrayBuffer; size: number } | null> {
  try {
    const db = await getDb();
    const record = (await db.get(STORE, file)) as CachedPdf | undefined;
    if (record?.data) return { data: record.data, size: record.size };
    return null;
  } catch {
    return null;
  }
}

/** 保存教材 PDF 字节到本地缓存 */
export async function saveCachedTextbook(
  file: string,
  data: ArrayBuffer,
  size: number
): Promise<void> {
  try {
    const db = await getDb();
    const record: CachedPdf = { file, data, size, savedAt: Date.now() };
    await db.put(STORE, record);
  } catch {
    // 缓存失败不影响阅读
  }
}

/** 删除教材缓存（文件更新时使用） */
export async function removeCachedTextbook(file: string): Promise<void> {
  try {
    const db = await getDb();
    await db.delete(STORE, file);
  } catch {
    // ignore
  }
}
