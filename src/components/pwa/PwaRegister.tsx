'use client';

import { useEffect } from 'react';

/** 注册 Service Worker，使站点可安装为桌面 / 手机 App */
export function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // 注册失败不影响正常浏览
      });
    }
  }, []);

  return null;
}
