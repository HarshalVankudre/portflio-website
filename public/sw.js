const CACHE_NAME = 'hv-portfolio-v3'; // bumped: offline fallback + cache strategy rework
const RUNTIME_CACHE = `${CACHE_NAME}-runtime`;
const MAX_RUNTIME_ENTRIES = 60;
const OFFLINE_URL = '/offline';
const PRECACHE_URLS = [OFFLINE_URL, '/manifest.json'];

// Only cache complete, same-origin 200s — never errors, opaque, or partial responses.
function isCacheable(response) {
  return response && response.ok && response.status === 200 && response.type === 'basic';
}

// Evict oldest runtime entries (cache.keys() returns insertion order) to cap growth.
async function trimRuntimeCache() {
  const cache = await caches.open(RUNTIME_CACHE);
  const keys = await cache.keys();
  if (keys.length <= MAX_RUNTIME_ENTRIES) return;
  await Promise.all(
    keys.slice(0, keys.length - MAX_RUNTIME_ENTRIES).map((key) => cache.delete(key))
  );
}

function putInRuntimeCache(request, response) {
  return caches
    .open(RUNTIME_CACHE)
    .then((cache) => cache.put(request, response))
    .then(trimRuntimeCache)
    .catch(() => {
      // Quota or storage errors — serving the response still works.
    });
}

// Next.js build assets are content-hashed and immutable: cache-first.
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (isCacheable(response)) {
    putInRuntimeCache(request, response.clone());
  }
  return response;
}

// Navigations/HTML: network-first, then cached copy, then the precached offline page.
async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      putInRuntimeCache(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;
    // Last resort — keep respondWith resolved so navigation never throws a TypeError.
    return new Response('Offline', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

// Other same-origin GETs (images, fonts, …): network-first with cache fallback.
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (isCacheable(response)) {
      putInRuntimeCache(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('', { status: 503 });
  }
}

// Install - precache the offline fallback and manifest
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip API routes and external requests
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/') || url.origin !== location.origin) {
    return;
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  const isNavigation =
    request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');

  if (isNavigation) {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
