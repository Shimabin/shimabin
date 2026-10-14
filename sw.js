/* しま便フェリー Service Worker
   - ページ本体(index.html)は「ネット優先」: 公開後の修正がすぐ届く。オフラインなら保存版を使う。
   - アイコンなどは「保存優先」。
   更新したら CACHE の番号を上げる。 */
var CACHE = 'shimabin-v41';
var CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method!=='GET') return;
  var url = new URL(req.url);
  if(url.origin!==location.origin) return;           // フォントなど外部は触らない
  if(req.mode==='navigate' || url.pathname.endsWith('/index.html')){
    e.respondWith(fetch(req).then(function(res){
      var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put('index.html', copy); });
      return res;
    }).catch(function(){ return caches.match('index.html').then(function(r){ return r || caches.match('./'); }); }));
    return;
  }
  e.respondWith(caches.match(req).then(function(r){
    return r || fetch(req).then(function(res){
      var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); });
      return res;
    });
  }));
});
