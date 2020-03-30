var CACHE_NAME = "WiW";
var cacheList = [
    "index.html",
    "click.mp3",
    "done-word.mp3",
    "favicon.png",
    "favicon-dark.png",
    "new-level.mp3",
    "reset.min.css",
    "star.mp3",
    "wrong-word2.mp3",
    "css/app.fd099c20.css",
    "fonts/PTMono-Regular.4c6c13c8.otf",
    "fonts/PTMono-Regular.547563b8.woff",
    "img/angle-right_gray.30e8b091.svg",
    "img/angle-right_menu.b38c40bd.svg",
    "img/angle-right_white.93a869f9.svg",
    "img/bars.25a02d66.svg",
    "img/cart__item-2.cbd62021.png",
    "img/cart__item-3.ea343ffa.png",
    "img/cart__item-4.17d5d6d1.png",
    "img/close-level.47a626ea.png",
    "img/game-background.d8667d89.png",
    "img/levels-background.2ea71d79.png",
    "img/shop.6516816e.png",
    "js/app.70215e98.js",
    "js/chunk-vendors.17363d8c.js"
];
this.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(cacheList);
        })
    );
});
const CACHE_PREFIX = "WiW-4";

this.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

this.addEventListener("fetch", function (event) {
    if (
        event.request.method !== "GET" ||
        event.request.url.indexOf("http://") === 0 ||
        event.request.url.indexOf("an.yandex.ru") !== -1
    ) {
        return;
    }
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
