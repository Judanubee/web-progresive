const CACHE_NAME = 'app-cache-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/manifest.json',
    '/images/im192.png',
    '/images/im512.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// FASE 1: Instalación y Almacenamiento en Caché
self.addEventListener('install', event => {
    console.log('SW: 1. Instalando y guardando recursos estáticos en la caché...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('SW: Caché abierta con éxito:', CACHE_NAME);
                return cache.addAll(STATIC_ASSETS); 
            })
            .then(() => {
                console.log('SW: Todos los archivos del App Shell fueron almacenados.');
                return self.skipWaiting(); 
            })
            .catch(err => {
                console.error('SW: Falló el almacenamiento en caché del App Shell:', err);
            })
    );
});

// FASE 2: Activación
self.addEventListener('activate', event => {
    console.log('SW: 2. Activado y listo para controlar la app.');
    return self.clients.claim(); 
});

// FASE 3: Intercepción de Peticiones (Fetch)
self.addEventListener('fetch', event => {
    console.log('SW: 3. Interceptando petición hacia ->', event.request.url);
});

