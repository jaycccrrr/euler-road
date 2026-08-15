'use client';

import { useEffect } from 'react';
import { syncFromCloud } from '@/lib/cloud-sync';

/**
 * 应用启动时触发一次云端全量同步（内部有 60s 节流）。
 * 渲染内容为空，仅作为副作用挂载点。
 */
export function CloudSyncProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void syncFromCloud().catch((err) => {
      console.warn('[CloudSync] initial sync failed:', err);
    });
  }, []);

  return <>{children}</>;
}
