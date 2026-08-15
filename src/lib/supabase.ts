import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;
let initAttempted = false;

/** 获取 Supabase 客户端单例；未配置环境变量时返回 null（纯本地模式） */
export function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') return null;
  if (client) return client;
  if (initAttempted) return null;
  initAttempted = true;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    client = createClient(url, key);
    return client;
  } catch (error) {
    console.error('[Supabase] Failed to create client:', error);
    return null;
  }
}

export function isCloudEnabled(): boolean {
  return getSupabase() !== null;
}
