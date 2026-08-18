'use client';

import { useEffect, useState } from 'react';
import { assetPath } from '@/lib/asset';

// 缓存图片引用是否缺失（HEAD 探测，结果跨组件/跨题目复用）
const refStatusCache: Record<string, boolean> = {};

export function useMissingRefs(refs: string[]) {
  const [missing, setMissing] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(refs.filter((r) => r in refStatusCache).map((r) => [r, refStatusCache[r]]))
  );
  const key = refs.join('|');
  useEffect(() => {
    let alive = true;
    for (const ref of refs) {
      if (ref in refStatusCache) continue;
      fetch(assetPath(ref), { method: 'HEAD' })
        .then((r) => {
          refStatusCache[ref] = !r.ok;
          if (alive) setMissing((prev) => ({ ...prev, [ref]: !r.ok }));
        })
        .catch(() => {
          refStatusCache[ref] = true;
          if (alive) setMissing((prev) => ({ ...prev, [ref]: true }));
        });
    }
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return missing;
}
