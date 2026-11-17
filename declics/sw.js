/* Service worker de la Boîte à déclics.
   Portée limitée au dossier declics/ : le reste du site n'est pas concerné.
   Stratégie : réponse immédiate depuis le cache, mise à jour en arrière-plan.
   Pour forcer une mise à jour chez tout le monde, changer le numéro de version ci-dessous. */
const VERSION = "declics-v2";
const ASSETS = [
  "./",
  "index.html",
  "app.css",
  "app.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "fonts/bricolage-grotesque.woff2",
  "fonts/instrument-sans.woff2",
  "fonts/dm-mono-500.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("declics-") && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  const update = caches.open(VERSION).then((cache) =>
    fetch(req).then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
  );
  event.waitUntil(update.catch(() => {}));

  event.respondWith(
    caches.open(VERSION)
      .then((cache) => cache.match(req, { ignoreSearch: true }))
      .then((cached) =>
        cached ||
        update.catch(() =>
          req.mode === "navigate"
            ? caches.open(VERSION).then((cache) => cache.match("index.html"))
            : new Response("Hors ligne", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } })
        )
      )
  );
});
