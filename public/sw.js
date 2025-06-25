
const CACHE_NAME = 'msr-freight-v1';
const STATIC_CACHE_NAME = 'msr-freight-static-v1';
const DYNAMIC_CACHE_NAME = 'msr-freight-dynamic-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/.*\.supabase\.co\/rest\/v1\//,
  /^https:\/\/.*\.supabase\.co\/auth\/v1\//
];

// Image cache patterns
const IMAGE_CACHE_PATTERNS = [
  /^https:\/\/images\.unsplash\.com\//,
  /^https:\/\/.*\.lovableproject\.com\/.*\.(jpg|jpeg|png|gif|webp|svg)$/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests that aren't API calls or images
  if (url.origin !== location.origin && 
      !isAPIRequest(request) && 
      !isImageRequest(request)) {
    return;
  }

  // Handle different types of requests with appropriate caching strategies
  if (request.method === 'GET') {
    if (isImageRequest(request)) {
      // Cache-first strategy for images
      event.respondWith(cacheFirstStrategy(request, DYNAMIC_CACHE_NAME));
    } else if (isAPIRequest(request)) {
      // Network-first strategy for API calls
      event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE_NAME));
    } else if (isStaticAsset(request)) {
      // Cache-first strategy for static assets
      event.respondWith(cacheFirstStrategy(request, STATIC_CACHE_NAME));
    } else {
      // Network-first strategy for HTML pages
      event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE_NAME));
    }
  }
});

// Cache-first strategy: Check cache first, fallback to network
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('Service Worker: Serving from cache', request.url);
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log('Service Worker: Cached new resource', request.url);
    }
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Cache-first strategy failed', error);
    return new Response('Network error', { status: 503 });
  }
}

// Network-first strategy: Try network first, fallback to cache
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log('Service Worker: Updated cache with network response', request.url);
    }
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Resource not available', { status: 503 });
  }
}

// Helper functions
function isAPIRequest(request) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(request.url));
}

function isImageRequest(request) {
  return IMAGE_CACHE_PATTERNS.some(pattern => pattern.test(request.url)) ||
         request.destination === 'image';
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.origin === location.origin && 
         (url.pathname.endsWith('.js') || 
          url.pathname.endsWith('.css') || 
          url.pathname.endsWith('.woff2') ||
          url.pathname.endsWith('.woff') ||
          url.pathname === '/' ||
          url.pathname.endsWith('.html'));
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any queued form submissions or API calls
  try {
    const cache = await caches.open('offline-requests');
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        await fetch(request);
        await cache.delete(request);
        console.log('Service Worker: Synced offline request', request.url);
      } catch (error) {
        console.error('Service Worker: Failed to sync request', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}
