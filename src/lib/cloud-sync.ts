import { getSupabase } from './supabase';

/**
 * 云端同步层：IndexedDB store ↔ Supabase jsonb 镜像表
 *
 * 写路径：db.ts 的每个变更函数在本地写入后 fire-and-forget 调用 cloudUpsert/cloudDelete。
 * 读路径：应用启动时 syncFromCloud() 全量下行，之后本地直读 IndexedDB。
 */

type StoreName =
  | 'users'
  | 'dailyQuestions'
  | 'answerRecords'
  | 'posts'
  | 'comments'
  | 'messages'
  | 'notes'
  | 'customLessons';

const STORE_TO_TABLE: Record<StoreName, string> = {
  users: 'users',
  dailyQuestions: 'daily_questions',
  answerRecords: 'answer_records',
  posts: 'posts',
  comments: 'comments',
  messages: 'messages',
  notes: 'notes',
  customLessons: 'custom_lessons',
};

/** 从业务对象提取索引列（与 001_init.sql 的列对应） */
function buildIndexColumns(store: StoreName, row: Record<string, unknown>): Record<string, unknown> {
  switch (store) {
    case 'users':
      return { nickname: row.nickname };
    case 'dailyQuestions':
      return { date: row.date, module_id: row.moduleId };
    case 'answerRecords':
      return { user_id: row.userId, question_id: row.questionId };
    case 'posts':
      return { user_id: row.userId, module_id: row.moduleId, created_at: row.createdAt };
    case 'comments':
      return { post_id: row.postId };
    case 'messages':
      return { sender_id: row.senderId, receiver_id: row.receiverId };
    case 'notes':
      return { user_id: row.userId, module_id: row.moduleId };
    case 'customLessons':
      return { module_id: row.moduleId, status: row.status };
  }
}

/** 本地写入后同步上行（调用方需自行 catch 或使用 fire-and-forget） */
export async function cloudUpsert(store: StoreName, row: { id: string }): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from(STORE_TO_TABLE[store]).upsert({
    id: row.id,
    ...buildIndexColumns(store, row as unknown as Record<string, unknown>),
    data: row,
    updated_at: new Date().toISOString(),
  });
  if (error) console.warn(`[CloudSync] upsert ${store} failed:`, error.message);
}

export async function cloudDelete(store: StoreName, id: string): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from(STORE_TO_TABLE[store]).delete().eq('id', id);
  if (error) console.warn(`[CloudSync] delete ${store} failed:`, error.message);
}

const SYNC_FLAG_KEY = 'euler-cloud-sync-at';
const SYNC_INTERVAL = 60 * 1000; // 每次会话最多每分钟同步一次

/**
 * 全量双向同步：
 * 1. 先把本地所有数据上行（补足云端缺失）
 * 2. 再把云端全量下行覆盖本地（云端为共享真源）
 */
export async function syncFromCloud(): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  // 节流
  try {
    const lastSync = Number(localStorage.getItem(SYNC_FLAG_KEY) || 0);
    if (Date.now() - lastSync < SYNC_INTERVAL) return false;
    localStorage.setItem(SYNC_FLAG_KEY, String(Date.now()));
  } catch {
    // localStorage 不可用时照常同步
  }

  // 动态引入避免循环依赖（cloud-sync ← db ← cloud-sync）
  const dbModule = await import('./db');
  const database = await dbModule.initDB();

  const stores = Object.keys(STORE_TO_TABLE) as StoreName[];

  for (const store of stores) {
    const table = STORE_TO_TABLE[store];
    try {
      // 1. 本地 → 云端
      const localRows = (await database.getAll(store)) as { id: string }[];
      if (localRows.length > 0) {
        const payload = localRows.map((row) => ({
          id: row.id,
          ...buildIndexColumns(store, row as unknown as Record<string, unknown>),
          data: row,
          updated_at: new Date().toISOString(),
        }));
        // 分批上行，避免单包过大
        for (let i = 0; i < payload.length; i += 100) {
          const { error } = await sb.from(table).upsert(payload.slice(i, i + 100));
          if (error) {
            console.warn(`[CloudSync] push ${store} failed:`, error.message);
            break;
          }
        }
      }

      // 2. 云端 → 本地（云端覆盖同 id 本地记录）
      const { data: cloudRows, error } = await sb.from(table).select('data');
      if (error) {
        console.warn(`[CloudSync] pull ${store} failed:`, error.message);
        continue;
      }
      if (cloudRows && cloudRows.length > 0) {
        const tx = database.transaction(store, 'readwrite');
        for (const row of cloudRows) {
          await tx.store.put(row.data);
        }
        await tx.done;
      }
    } catch (err) {
      console.warn(`[CloudSync] sync ${store} failed:`, err);
    }
  }

  console.log('[CloudSync] full sync completed');
  return true;
}

/** 订阅某张表的实时变更（用于聊天等场景），返回取消订阅函数 */
export function subscribeToTable(
  store: StoreName,
  callback: (payload: { eventType: string; new: unknown; old: unknown }) => void
): (() => void) | null {
  const sb = getSupabase();
  if (!sb) return null;

  const channel = sb
    .channel(`${STORE_TO_TABLE[store]}-changes`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: STORE_TO_TABLE[store] },
      (payload) => {
        callback({
          eventType: payload.eventType,
          new: payload.new,
          old: payload.old,
        });
      }
    )
    .subscribe();

  return () => {
    void sb.removeChannel(channel);
  };
}
