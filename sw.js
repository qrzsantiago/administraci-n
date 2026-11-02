/* Service worker: permite abrir la app sin conexión desde la pantalla de inicio del iPhone.
   - La página (index.html) se busca primero en la red para recibir actualizaciones; si no hay red, se usa la copia guardada.
   - Tailwind, Lucide, fuentes e íconos se sirven desde caché (y se actualizan en segundo plano). */
const CACHE = 'finanzas-stock-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
const CDN = [
  'https://cdn.tailwindcss.com/3.4.16',
  'https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(SHELL);
    // Los scripts de CDN se guardan en modo no-cors (respuesta opaca), igual que los pide la etiqueta <script>.
    await Promise.all(CDN.map(url => fetch(url, { mode: 'no-cors' }).then(r => cache.put(url, r)).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || (url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname));

  if (isPage) {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
        return res;
      } catch {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Resto de recursos: caché primero, actualizando en segundo plano.
  event.respondWith((async () => {
    const hit = await caches.match(req);
    const net = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit || Response.error());
    if (hit) { event.waitUntil(net.catch(() => {})); return hit; }
    return net;
  })());
});
