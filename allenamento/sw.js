// Service worker della palestra: tiene la pagina sul telefono per usarla offline.
// A ogni modifica dei file cambia VER, cosi' il telefono scarica la versione nuova.
const VER = 'allenamento-v5';
const FILES = ['./', './index.html', './attrezzi.js', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('allenamento-') && k !== VER).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// pagina e catalogo: prima la rete, cosi' le novita' arrivano subito.
// Se la rete non risponde entro 3 secondi (palestra senza campo) si usa la copia salvata.
const NET_FIRST = /\/(index\.html|attrezzi\.js)?$/;
const fromNet = (req, key) => new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('lenta')), 3000);
  // no-cache: chiede sempre al server se il file e' cambiato (non la copia del browser)
  fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(r => {
    clearTimeout(t);
    if (r.ok) { const copy = r.clone(); caches.open(VER).then(c => c.put(key, copy)); }
    res(r);
  }, err => { clearTimeout(t); rej(err); });
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fromNet(req, './index.html').catch(() => caches.match('./index.html').then(r => r || fetch(req))));
    return;
  }
  if (NET_FIRST.test(new URL(req.url).pathname)) {
    e.respondWith(fromNet(req, req).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req))));
    return;
  }
  // icone e manifest: la copia salvata risponde subito; intanto, se c'e' rete, si aggiorna
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VER).then(c => c.put(req, copy)); } return r; });
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
