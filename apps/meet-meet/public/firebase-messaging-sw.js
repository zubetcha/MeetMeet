if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>n(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),i)))}}define(["./workbox-1834391d"],(function(e){"use strict";importScripts("worker-fmVroB0nm_E41lBt7nosv.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/164-6ed86214e05cec39.js",revision:"6ed86214e05cec39"},{url:"/_next/static/chunks/450-26a606ce80e52f82.js",revision:"26a606ce80e52f82"},{url:"/_next/static/chunks/582-18abb31450dd5217.js",revision:"18abb31450dd5217"},{url:"/_next/static/chunks/651-1b90f16008b50046.js",revision:"1b90f16008b50046"},{url:"/_next/static/chunks/framework-c02f198d58d34563.js",revision:"c02f198d58d34563"},{url:"/_next/static/chunks/main-d0fd5375da8e3a51.js",revision:"d0fd5375da8e3a51"},{url:"/_next/static/chunks/pages/_app-66301932ea5eb8da.js",revision:"66301932ea5eb8da"},{url:"/_next/static/chunks/pages/_error-e755336071b61fcc.js",revision:"e755336071b61fcc"},{url:"/_next/static/chunks/pages/home-d8e65ee206fa7d36.js",revision:"d8e65ee206fa7d36"},{url:"/_next/static/chunks/pages/index-81bb6f12c6bb5658.js",revision:"81bb6f12c6bb5658"},{url:"/_next/static/chunks/pages/join-c05df43309f9dd5a.js",revision:"c05df43309f9dd5a"},{url:"/_next/static/chunks/pages/join/onboarding-aa1eaf7b9efee78d.js",revision:"aa1eaf7b9efee78d"},{url:"/_next/static/chunks/pages/login-f768bd734a77703e.js",revision:"f768bd734a77703e"},{url:"/_next/static/chunks/pages/management-ce42d663fef5e2e1.js",revision:"ce42d663fef5e2e1"},{url:"/_next/static/chunks/pages/mypage-366156c3c097051c.js",revision:"366156c3c097051c"},{url:"/_next/static/chunks/pages/oauth/redirect-b68d5894f7f7732a.js",revision:"b68d5894f7f7732a"},{url:"/_next/static/chunks/pages/reservation/create-2eff45458a91a89e.js",revision:"2eff45458a91a89e"},{url:"/_next/static/chunks/pages/reservation/update/%5Bid%5D-1d26261dc8285e0e.js",revision:"1d26261dc8285e0e"},{url:"/_next/static/chunks/pages/table-d502b34442169e62.js",revision:"d502b34442169e62"},{url:"/_next/static/chunks/pages/test-b0d123a94e37ea37.js",revision:"b0d123a94e37ea37"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-5a514192048cebb3.js",revision:"5a514192048cebb3"},{url:"/_next/static/css/130a37df7399c777.css",revision:"130a37df7399c777"},{url:"/_next/static/css/2c5eb24b38336bb2.css",revision:"2c5eb24b38336bb2"},{url:"/_next/static/css/3c93c2e6477ca278.css",revision:"3c93c2e6477ca278"},{url:"/_next/static/css/3ed47592d65d768b.css",revision:"3ed47592d65d768b"},{url:"/_next/static/css/5ec5c440d6da36ef.css",revision:"5ec5c440d6da36ef"},{url:"/_next/static/css/636d6faeb438598a.css",revision:"636d6faeb438598a"},{url:"/_next/static/css/93f12d6234c1a214.css",revision:"93f12d6234c1a214"},{url:"/_next/static/css/bfe99f4ea710aac9.css",revision:"bfe99f4ea710aac9"},{url:"/_next/static/css/c617073ab54e3b3f.css",revision:"c617073ab54e3b3f"},{url:"/_next/static/fmVroB0nm_E41lBt7nosv/_buildManifest.js",revision:"b84b95c9f128c0a7900fc2c13f8e31f2"},{url:"/_next/static/fmVroB0nm_E41lBt7nosv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/main-loading.e79d0eae.png",revision:"d694fb2759ac74767922775f3a85cf40"},{url:"/favicon_Factoroid_pov.ico",revision:"e38a29489479d4c2541d1e99638ac977"},{url:"/icon-192x192.png",revision:"ded39fe854ff4b4226333b40dbc7efa8"},{url:"/icon-256x256.png",revision:"93d706bd93dd9efa96c8b0225813f482"},{url:"/icon-384x384.png",revision:"f976c8b99346876a281e291048707aad"},{url:"/icon-512x512.png",revision:"5577f8bd790a5452da08e0f6c307078b"},{url:"/manifest.json",revision:"d874e5d60d5771b548b1a13190daac55"},{url:"/svg/meetmeet_horizontal.svg",revision:"a9c83b8470e5d3e2aca88626089b58a4"},{url:"/svg/meetmeet_vertical.svg",revision:"f0ebda92dd56d96be5f8bec157cfd511"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
