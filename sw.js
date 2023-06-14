const shellFiles = [
    "/app.js",
    "/icon.png",
    "/index.html",
    "/manifest.webmanifest",
    "/style.css"
]

self.addEventListener("install", (e) => {
    e.waitUntil(
        (async () => {
          const cache = await caches.open("PWAExample");
          await cache.addAll(shellFiles);
        })()
      );
  });

self.addEventListener("fetch", (e) => {
    e.respondWith(
      (async () => {
        const r = await caches.match(e.request);
        if (r) {
          return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open("PWAExample");
        cache.put(e.request, response.clone());
        return response;
      })()
    );
  });