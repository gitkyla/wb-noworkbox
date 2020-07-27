const cache_Name = 'WB-v3.8.2';

const baseCache = [
  '/',
  '/index.html',
  '/nav.js',
  '/index.js',
  '/nav.html',
  '/footer.html',
  '/info.html',
  '/info.js',
  '/player.html',
  '/player.js',
  '/pages/home.html',
  '/pages/klasemen.html',
  '/pages/save.html',
  '/pages/tim.html',
  '/logo.png',
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/klasemen.png",
  "/img/squad.png",
  "/img/team.png",
  "/img/player.png",
  "/icons/icon_96x96.png",
  "/icons/icon_128x128.png",
  "/icons/icon_192x192.png",
  "/icons/icon_256x256.png",
  "/icons/icon_384x384.png",
  "/icons/icon_512x512.png",
  "/favicon/apple-touch-icon.png",
  "/favicon/favicon-16x16.png",
  "/favicon/favicon-32x32.png",
  "/favicon/mstile-150x150.png",
  "/favicon/safari-pinned-tab.svg",
  "/manifest.json",
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install' , e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(cache_Name)
        .then(cache => {
          return cache.addAll(baseCache); 
        })
    )
})

self.addEventListener("fetch", event => {
  const base_url = "https://api.football-data.org/v2/"

  if(event.request.url.indexOf(base_url) > -1){
    event.respondWith(
      caches.open(cache_Name)
      .then(cache => {
        return fetch(event.request)
        .then(response => {
          cache.put(event.request.url , response.clone());
          return response;
        })
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request , {ignoreSearch : true})
      .then(response => {
        return response || fetch(event.request);
      })
    )
  }
})

self.addEventListener('activate' , e => {
  e.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != cache_Name){
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: './logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('WaveBallers Push Notification', options)
  );
});