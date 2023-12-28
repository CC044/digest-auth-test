const CACHE_NAME = 'my-cache';

const urlsToCache = [
  '/',
  'manifest.json',
  'sw.js',
  '/style.css',
  '/logos/aldiBW.svg','/logos/aldi.png','/logos/aldiSued.png','/logos/aldiSued.svg','/logos/apple-mail.png','/logos/apple-mail.svg','/logos/f-droid.png','/logos/asb.ico','/logos/asb.svg','/logos/bahn.svg','/logos/bbb.ico','/logos/bg.jpg','/logos/businessInsider_big.png','/logos/businessInsider_black.svg','/logos/businessInsider_small.svg','/logos/calendar.png','/logos/cb.png','/logos/cb.svg','/logos/chatGpt1.svg','/logos/ChatGPT.svg','/logos/cloud.png',
  '/logos/ct.svg','/logos/curseforge.ico','/logos/curseforge.svg','/logos/discord-bubble.png','/logos/discord.png','/logos/discord.svg','/logos/extend.png','/logos/fsi.png','/logos/fsi.svg','/logos/getpocket.png','/logos/getpocket.svg','/logos/gmail-2020.png','/logos/gmail-2020.svg','/logos/gmail.png','/logos/gmail.svg',
  '/logos/googleblog.webp','/logos/google-calendar.png','/logos/google-calendar.svg','/logos/google-drive-new.png','/logos/google-drive-new.svg','/logos/google-drive.png','/logos/google-drive.svg','/logos/google-maps-pin.png','/logos/google-maps-pin.svg','/logos/google-maps.png','/logos/google-maps.svg','/logos/grade.png','/logos/grade.svg','/logos/heise.ico','/logos/Hentai-Haven-Logo.png','/logos/Hentai-Haven-Logo.svg','/logos/hermitcraft.png',
  '/logos/hermitcraft.svg','/logos/heroku.png','/logos/home.svg','/logos/howtogeek.png','/logos/howtogeek.svg','/logos/hvv.png','/logos/icloud.svg','/logos/icon.png','/logos/idealo.ico','/logos/instagram2016.png','/logos/instagram2016.svg','/logos/instagram.png',
  '/logos/invidious.png','/logos/invidious.svg','/logos/kalender.svg','/logos/kauflandBW.svg','/logos/kaufland.png','/logos/kaufland.svg','/logos/markdown.svg','/logos/mcs.webp','/logos/mediathekview.png','/logos/mensa.png','/logos/mensa.svg','/logos/messenger.png','/logos/messenger.svg','/logos/microsoft-azure.png','/logos/minecraft-block.png','/logos/minecraft-extend.png','/logos/minecraft-text.png','/logos/muo.svg','/logos/netzclub.png',
  '/logos/omgubuntu.png','/logos/openstreetmap.png','/logos/panopto.png','/logos/panopto.svg','/logos/pocket-audio-icon.svg','/logos/pocket-colourful-books.svg','/logos/pocket-tag-icon.svg','/logos/pocket-text-icon.svg','/logos/pornhub.png','/logos/pornhub.svg','/logos/proxer-me.png','/logos/proxer-me.svg','/logos/qis.png','/logos/raspberry.png','/logos/raspberry.svg','/logos/render.svg','/logos/sharedrop.png','/logos/steam.png','/logos/steam.svg','/logos/studip.png','/logos/studip.svg','/logos/studiwerk.png','/logos/tagesschau.svg','/logos/tarnkappe.png','/logos/tarnkappe.svg','/logos/twitch.png','/logos/ubuntu.png',
  '/logos/ubuntu.svg','/logos/ubuntu-text.png','/logos/ubuntuusers.ico','/logos/ubuntu_white_hex_su-ubuntu_Deutschland_eV-no_font.svg','/logos/verbraucherzentrale.ico','/logos/warnungBund.ico','/logos/weather.png','/logos/webmail_f.png','/logos/webmail_f.svg','/logos/webmail.png','/logos/webmail.svg','/logos/wetter.svg','/logos/whatsapp.png','/logos/whatsapp.svg','/logos/youtube-music-dark.png','/logos/youtube-music.png','/logos/youtube-music.svg','/logos/youtube.png','/logos/youtube.svg','/logos/ytv-logo.svg','/logos/ytv.png'
];

const cacheResources = async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    for (const url of urlsToCache) {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
        console.log(`${url} zum cache hinzugefügt`);
      } else {
        console.error(`${url} konnte nicht gecached werden`);
      }
    }
  } catch (error) {
    console.log('Fehler caching resources:', error);
  }
};

const fetchResource = async (event) => {
  try {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const fetchResponse = await fetch(event.request);

    if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
      return fetchResponse;
    }

    const responseToCache = fetchResponse.clone();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(event.request, responseToCache);

    return fetchResponse;
  } catch (error) {
    console.log('Fehler fetching resource:', error);
  }
};

self.addEventListener('install', async (event) => {
  console.log('Service worker installiert');
  event.waitUntil(cacheResources());
});

self.addEventListener('activate', (event) => {
  console.log('Service worker aktiviert');
});

self.addEventListener('fetch', async (event) => {
  event.respondWith(fetchResource(event));
});

