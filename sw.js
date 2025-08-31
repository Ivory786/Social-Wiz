// very small cache-first service worker
const CACHE = 'swiz-v1';
const ASSETS = [
  './',
  './index.html',
  './favicon-32.png',
  './favicon-64.png',
  './logo.png',
  './logo@2x.png'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(res=>res || fetch(e.request)));
});