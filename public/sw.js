var cacheName = 'appCachev1';

var fileName = ['/', 
        '/index.html',
        '/manifest.json',
        '/web/app.js',
        '/bower_components/jquery/dist/jquery.min.js',
        '/bower_components/angular/angular.min.js',
        '/bower_components/materialize/js/materialize.min.js',
        '/bower_components/materialize/css/materialize.min.css',
        '/web/services/service.js',
        '/web/services/service.authen.js',
        '/web/services/service.js',
        '/web/services/factory.js',
        '/web/controllers/accountController.js',
        '/web/controllers/accostController.js',
        '/web/diractive/header.js',
        '/web/views/login.html',
        '/web/views/profile.html',
        '/web/views/list.html',
        '/web/views/select.html',
        '/web/views/about.html',
        '/web/resources/images/1.png',
        '/web/resources/images/2.png',
        '/web/resources/images/3.png',
        '/web/views/layout/header.html', ];
        
self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(fileName);
        }).then(function(){
            return self.skipWaiting();
        })
    )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();

            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});