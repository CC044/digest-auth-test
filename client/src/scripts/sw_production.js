const CACHE_NAME = 'my-cache';

const urlsToCache = [
  '/',
  '/style.css',
  '/logos/'
];

const cacheResources = async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(urlsToCache);
    console.log('Resources added to cache');
  } catch (error) {
    console.log('Error caching resources:', error);
  }
};

const fetchResource = async (event) => {
  try {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const fetchResponse = await fetch(event.request);

    if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
      return fetchResponse;
    }

    const responseToCache = fetchResponse.clone();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(event.request, responseToCache);

    return fetchResponse;
  } catch (error) {
    console.log('Error fetching resource:', error);
  }
};

self.addEventListener('install', async (event) => {
  console.log('Service worker installed');
  event.waitUntil(cacheResources());
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});

self.addEventListener('fetch', async (event) => {
  event.respondWith(fetchResource(event));
});

