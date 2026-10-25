// Service worker della palestra: tiene la pagina sul telefono per usarla offline.
// A ogni modifica dei file cambia VER, cosi' il telefono scarica la versione nuova.
const VER = 'allenamento-v2';
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

// pagina: prima la rete (cosi' gli aggiornamenti arrivano), se manca la rete la copia salvata.
// catalogo, icone e manifest: prima la copia salvata.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(r => { const copy = r.clone(); caches.open(VER).then(c => c.put('./index.html', copy)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // la copia salvata risponde subito; intanto, se c'e' rete, si aggiorna per la prossima volta
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VER).then(c => c.put(req, copy)); } return r; });
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
