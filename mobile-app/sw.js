// Service Worker for FinergyCloud Mobile App

const CACHE_NAME = 'finergycloud-mobile-v1.0.0';
const STATIC_CACHE = 'finergycloud-static-v1.0.0';
const DYNAMIC_CACHE = 'finergycloud-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    '/mobile-app/',
    '/mobile-app/index.html',
    '/mobile-app/styles/app.css',
    '/mobile-app/scripts/app.js',
    '/mobile-app/scripts/calculator.js',
    '/mobile-app/scripts/charts.js',
    '/mobile-app/manifest.json',
    '/assets/images/finergycloud-logo.png',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css'
];

// Files to cache on demand
const DYNAMIC_FILES = [
    '/assets/images/',
    'https://fonts.gstatic.com/',
    'https://cdn.jsdelivr.net/'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Error caching static files', error);
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
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
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

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache', request.url);
                    return cachedResponse;
                }
                
                // Fetch from network and cache dynamic content
                return fetch(request)
                    .then((networkResponse) => {
                        // Check if we should cache this response
                        if (shouldCache(request.url)) {
                            const responseClone = networkResponse.clone();
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseClone);
                                });
                        }
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.log('Service Worker: Fetch failed', error);
                        
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/mobile-app/offline.html');
                        }
                        
                        // Return offline fallback for images
                        if (request.destination === 'image') {
                            return caches.match('/mobile-app/offline-image.svg');
                        }
                        
                        throw error;
                    });
            })
    );
});

// Helper function to determine if a URL should be cached
function shouldCache(url) {
    // Cache images, fonts,  and API responses
    return DYNAMIC_FILES.some(pattern => url.includes(pattern)) ||
           url.includes('/api/') ||
           url.includes('.jpg') ||
           url.includes('.png') ||
           url.includes('.svg') ||
           url.includes('.woff') ||
           url.includes('.woff2');
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Sync offline data when connection is restored
        const offlineData = await getOfflineData();
        if (offlineData.length > 0) {
            await syncOfflineData(offlineData);
            await clearOfflineData();
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

async function getOfflineData() {
    // Get data stored while offline
    const cache = await caches.open('offline-data');
    const requests = await cache.keys();
    return requests;
}

async function syncOfflineData(data) {
    // Sync offline data with server
    for (const request of data) {
        try {
            await fetch(request);
        } catch (error) {
            console.error('Failed to sync:', request.url, error);
        }
    }
}

async function clearOfflineData() {
    // Clear offline data cache
    await caches.delete('offline-data');
}

// Push notification handling
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: '/assets/images/finergycloud-logo.png',
        badge: '/assets/images/finergycloud-logo.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Open App',
                icon: '/assets/images/finergycloud-logo.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/finergycloud-logo.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('FinergyCloud', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/mobile-app/')
        );
    }
});

// Message handling from main app
self.addEventListener('message', (event) => {
    console.log('Service Worker: Message received', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                    return cache.addAll(event.data.urls);
                })
        );
    }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
    console.log('Service Worker: Periodic sync', event.tag);
    
    if (event.tag === 'data-sync') {
        event.waitUntil(syncAppData());
    }
});

async function syncAppData() {
    try {
        // Sync app data in background
        const response = await fetch('/api/sync');
        const data = await response.json();
        
        // Store updated data in cache
        const cache = await caches.open('app-data');
        await cache.put('/api/sync', new Response(JSON.stringify(data)));
        
        console.log('App data synced successfully');
    } catch (error) {
        console.error('Failed to sync app data:', error);
    }
}

// Handle app updates
self.addEventListener('appinstalled', (event) => {
    console.log('FinergyCloud app installed successfully');
    
    // Track app installation
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        navigator.serviceWorker.ready.then((registration) => {
            return registration.sync.register('app-installed');
        });
    }
});

// Cache management utilities
async function cleanupOldCaches() {
    const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];
    const cacheNames = await caches.keys();
    
    return Promise.all(
        cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
                console.log('Deleting old cache:', cacheName);
                return caches.delete(cacheName);
            }
        })
    );
}

// Preload critical resources
async function preloadCriticalResources() {
    const cache = await caches.open(STATIC_CACHE);
    const criticalResources = [
        '/mobile-app/styles/app.css',
        '/mobile-app/scripts/app.js',
        '/assets/images/finergycloud-logo.png'
    ];
    
    return cache.addAll(criticalResources);
}

// Initialize service worker
console.log('Service Worker: Initialized');