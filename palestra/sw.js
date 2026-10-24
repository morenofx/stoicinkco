// Vecchio indirizzo dell'app: questo service worker si toglie da solo,
// cancella la copia vecchia e porta le pagine aperte su ../allenamento/.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('palestra-')) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(new URL('../allenamento/', self.registration.scope).href);
  })());
});
