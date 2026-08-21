/* 欧拉之路 PWA Service Worker */
const CACHE = 'euler-road-v2';
const SHELL_URL = '/shell';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll([
          '/',
          '/courses',
          '/question-bank',
          '/daily',
          '/community',
          '/icons/icon-192.png',
          '/icons/icon-512.png',
        ])
      )
      .catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  // 页面导航与 JS/静态资源统一使用网络优先：保证新版本部署后立即生效，
  // 不会继续执行旧版缓存脚本；离线时才回退缓存中的应用壳。
  if (request.mode === 'navigate' || url.pathname.includes('/_next/static/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match(SHELL_URL) || caches.match('/'))
        )
    );
    return;
  }

  // 其余静态资源：缓存优先，未命中时请求并回填
  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response.ok && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
    )
  );
});
