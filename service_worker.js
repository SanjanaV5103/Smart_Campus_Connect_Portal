const CACHE_NAME = "smart-campus-cache-v1";
const urlsToCache = [
  "index.html",
  "styles.css",
  "feedback_form_validation.js",
  "images/aiworkshop.jpg",
  "images/al.png",
  "images/asm.jpeg",
  "images/cln.png",
  "images/techfest.png",
  "images/wmremove-transformed.jpeg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
