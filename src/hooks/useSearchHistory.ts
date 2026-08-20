'use client';

import { useCallback, useState } from 'react';

// 搜索历史：按 scope（如 course / community）分别持久化到 localStorage。
// 最多保留 maxItems 条，最新搜索排在最前，自动去重。
const MAX_ITEMS = 10;

function readHistory(scope: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`euler-search-history-${scope}`);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeHistory(scope: string, items: string[]) {
  try {
    localStorage.setItem(`euler-search-history-${scope}`, JSON.stringify(items));
  } catch {
    // 存储失败不影响搜索
  }
}

export function useSearchHistory(scope: string, maxItems = MAX_ITEMS) {
  const [history, setHistory] = useState<string[]>(() => readHistory(scope));

  const addHistory = useCallback(
    (term: string) => {
      const t = term.trim();
      if (!t) return;
      setHistory((prev) => {
        const next = [t, ...prev.filter((x) => x !== t)].slice(0, maxItems);
        writeHistory(scope, next);
        return next;
      });
    },
    [scope, maxItems]
  );

  const removeHistory = useCallback(
    (term: string) => {
      setHistory((prev) => {
        const next = prev.filter((x) => x !== term);
        writeHistory(scope, next);
        return next;
      });
    },
    [scope]
  );

  const clearHistory = useCallback(() => {
    writeHistory(scope, []);
    setHistory([]);
  }, [scope]);

  return { history, addHistory, removeHistory, clearHistory };
}
