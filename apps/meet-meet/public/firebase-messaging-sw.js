if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>n(e,t),o={module:{uri:t},exports:i,require:r};s[t]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-1834391d"],(function(e){"use strict";importScripts("worker-SwjE5vvKJAg4HEUo-VcKm.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/SwjE5vvKJAg4HEUo-VcKm/_buildManifest.js",revision:"e2864ba3a192a6c02bfb4c3c80f53ecf"},{url:"/_next/static/SwjE5vvKJAg4HEUo-VcKm/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/164-01a736d833ef21a5.js",revision:"01a736d833ef21a5"},{url:"/_next/static/chunks/534-8c7664c92558a52f.js",revision:"8c7664c92558a52f"},{url:"/_next/static/chunks/582-18abb31450dd5217.js",revision:"18abb31450dd5217"},{url:"/_next/static/chunks/framework-c02f198d58d34563.js",revision:"c02f198d58d34563"},{url:"/_next/static/chunks/main-41d4532d3725473e.js",revision:"41d4532d3725473e"},{url:"/_next/static/chunks/pages/_app-dfb5aef525922430.js",revision:"dfb5aef525922430"},{url:"/_next/static/chunks/pages/_error-e755336071b61fcc.js",revision:"e755336071b61fcc"},{url:"/_next/static/chunks/pages/home-75549881df22f53d.js",revision:"75549881df22f53d"},{url:"/_next/static/chunks/pages/index-81bb6f12c6bb5658.js",revision:"81bb6f12c6bb5658"},{url:"/_next/static/chunks/pages/join-dbccf59a78b5ec3f.js",revision:"dbccf59a78b5ec3f"},{url:"/_next/static/chunks/pages/join/onboarding-9e6bf5dd4e89bb55.js",revision:"9e6bf5dd4e89bb55"},{url:"/_next/static/chunks/pages/login-870b6bd2bb618c10.js",revision:"870b6bd2bb618c10"},{url:"/_next/static/chunks/pages/management-4bbb815c9663a955.js",revision:"4bbb815c9663a955"},{url:"/_next/static/chunks/pages/mypage-8d6e162d427ca305.js",revision:"8d6e162d427ca305"},{url:"/_next/static/chunks/pages/oauth/redirect-b68d5894f7f7732a.js",revision:"b68d5894f7f7732a"},{url:"/_next/static/chunks/pages/reservation-3a9a8c634b08afa2.js",revision:"3a9a8c634b08afa2"},{url:"/_next/static/chunks/pages/table-f0c9d95071c1e31f.js",revision:"f0c9d95071c1e31f"},{url:"/_next/static/chunks/pages/test-b3b235f0db074313.js",revision:"b3b235f0db074313"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-5a514192048cebb3.js",revision:"5a514192048cebb3"},{url:"/_next/static/css/05101d38e1ae160e.css",revision:"05101d38e1ae160e"},{url:"/_next/static/css/1695502757efad88.css",revision:"1695502757efad88"},{url:"/_next/static/css/2c5eb24b38336bb2.css",revision:"2c5eb24b38336bb2"},{url:"/_next/static/css/636d6faeb438598a.css",revision:"636d6faeb438598a"},{url:"/_next/static/css/7f560b3f2b5ed8ab.css",revision:"7f560b3f2b5ed8ab"},{url:"/_next/static/css/9dc0934c502492ab.css",revision:"9dc0934c502492ab"},{url:"/_next/static/css/b02a658327c6e70a.css",revision:"b02a658327c6e70a"},{url:"/_next/static/css/c45fa9e2c571fbfb.css",revision:"c45fa9e2c571fbfb"},{url:"/_next/static/media/main-loading.e79d0eae.png",revision:"d694fb2759ac74767922775f3a85cf40"},{url:"/favicon_Factoroid_pov.ico",revision:"e38a29489479d4c2541d1e99638ac977"},{url:"/icon-192x192.png",revision:"ded39fe854ff4b4226333b40dbc7efa8"},{url:"/icon-256x256.png",revision:"93d706bd93dd9efa96c8b0225813f482"},{url:"/icon-384x384.png",revision:"f976c8b99346876a281e291048707aad"},{url:"/icon-512x512.png",revision:"5577f8bd790a5452da08e0f6c307078b"},{url:"/manifest.json",revision:"43d1f794804adff224a46bcb9b406b5f"},{url:"/svg/meetmeet_horizontal.svg",revision:"a9c83b8470e5d3e2aca88626089b58a4"},{url:"/svg/meetmeet_vertical.svg",revision:"f0ebda92dd56d96be5f8bec157cfd511"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
