self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mycache').then(function(cache) {
      return cache.addAll([
        '/',
        'css/sytles.css',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'sw.js'
      ]);
    })
  );
});
self.addEventListener('fetch', function(event) {
 event.respondWith(
 	caches.open('mycache').then(function(cache) {
		return caches.match(event.request).then(function(response) {
		  if(response) return response;
		  fetch(event.request).then(function(response) {
			cache.put(event.request, response.clone());
			return response;
		  })
		});
	})
 );
});