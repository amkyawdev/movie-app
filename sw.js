/* ===============================================
   BURME MOVIE APP — SERVICE WORKER
   Version: 1.0.0
   =============================================== */

const CACHE_NAME = 'burme-v1';
const OFFLINE_PAGE = '/offline.html';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/app.js',
  '/js/auth.js',
  '/js/animations.js',
  '/js/responsive-menu.js',
  '/js/pwa.js',
  '/manifest.json',
  '/assets/icons/favicon.svg',
];

// ---- INSTALL ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Precaching assets');
      return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })))
        .catch(err => console.warn('[SW] Precache failed for some assets:', err));
    }).then(() => self.skipWaiting())
  );
});

// ---- ACTIVATE ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ---- FETCH ----
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, cross-origin Firebase/API calls
  if (request.method !== 'GET') return;
  if (url.hostname.includes('firebaseapp.com') || url.hostname.includes('googleapis.com')) return;
  if (url.hostname.includes('picsum.photos') || url.hostname.includes('mega.nz')) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        // Cache successful responses for same-origin assets
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for HTML navigation
        if (request.headers.get('Accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// ---- BACKGROUND SYNC ----
self.addEventListener('sync', event => {
  if (event.tag === 'sync-watchlist') {
    event.waitUntil(syncWatchlist());
  }
});

async function syncWatchlist() {
  // TODO: Sync local watchlist changes to Firestore when online
  console.log('[SW] Background sync: watchlist');
}

// ---- PUSH NOTIFICATIONS ----
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Burme Movies', {
      body: data.body || 'New movies available!',
      icon: '/assets/icons/favicon.svg',
      badge: '/assets/icons/favicon.svg',
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
});
