/* 설치형 데스크 · 빌드 6c43420e2f */
var CACHE='hfdesk-6c43420e2f';
var SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./data/fundamentals.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var req=e.request;if(req.method!=='GET')return;
  var url=new URL(req.url);if(url.origin!==location.origin)return;
  e.respondWith(fetch(req).then(function(res){if(res&&res.ok){var copy=res.clone();caches.open(CACHE).then(function(c){c.put(req,copy)})}return res}).catch(function(){return caches.match(req).then(function(hit){return hit||(req.mode==='navigate'?caches.match('./index.html'):Response.error())})}));
});
