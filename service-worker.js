const CACHE_NAME = 'church-site-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/media/logo.jpg',
  '/media/preview.jpg',
  '/media/hero1.jpg',
  '/media/hero3.jpg',
  '/media/hero4.jpg',
  '/media/hero5.jpg',
  '/media/church_1.jpg',
  '/media/church.jpg',
  '/media/Dark-hallway.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
