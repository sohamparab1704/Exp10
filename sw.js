if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
        navigator.serviceWorker.register("/",{scope:"/"}).then(function(registration){
            console.log('ServiceWorker registration successfully with scope',registration.scope);
        }, function(err){
            console.log('ServiceWorker registration failed',err);
        });
    })
}
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
 '/',
  'home.html', /* '/styles/main.css', '/script/main.js' */
  ];
   self.addEventListener('install', function (event) { // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })) });
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    );
});