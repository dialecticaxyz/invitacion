const CACHE_NAME = 'static-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/',
  'index.html',
  'detalle.html',
  'parroquia.html',
  'salon.html',

  '/font/Splatch.ttf',
  '/video/video1.mp4',
  '/musica/boda1.mp3',
];

self.addEventListener('install', (evt) => {
  evt.waitUntil( caches.open(CACHE_NAME).then((cache) => { return cache.addAll(FILES_TO_CACHE); })  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) { return caches.delete(key); }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request).then((response) => {  return response || fetch(evt.request); });
    })
  );
});
