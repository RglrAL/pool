const CACHE_NAME = 'pool-tournament-v5';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // NEVER cache the live tournament data (GitHub API or the raw-gist CDN) or non-GET requests —
  // it must always be fresh. (Caching it was why refreshes did nothing and players "disappeared".)
  if (e.request.method !== 'GET' || url.includes('api.github.com') || url.includes('gist.githubusercontent.com')) return;

  // Network-first for everything (CDN libs AND the local app shell): always serve the
  // freshest app/index.html when online, falling back to cache only when offline.
  // (Cache-first on the app shell meant redeploys never reached installed devices —
  // e.g. new features like the admin lock button silently never appeared.)
  e.respondWith(
    fetch(e.request).then(resp => {
      const clone = resp.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return resp;
    }).catch(() => caches.match(e.request))
  );
});
