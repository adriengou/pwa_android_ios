const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/styles/App.css",
  // Add other assets to cache
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title, data));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(openUrl("http://grafikart.fr"));
});

/**
 * Ouvre l'url ou focus la page qui est déjà ouverte sur cette URL
 * @param {string} url
 **/
async function openUrl(url) {
  const windowClients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  for (let i = 0; i < windowClients.length; i++) {
    const client = windowClients[i];
    if (client.url === url && "focus" in client) {
      return client.focus();
    }
  }
  if (self.clients.openWindow) {
    return self.clients.openWindow(url);
  }
  return null;
}
