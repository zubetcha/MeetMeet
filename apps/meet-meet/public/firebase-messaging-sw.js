if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const o=e=>a(e,i),r={module:{uri:i},exports:t,require:o};s[i]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(c(...e),t)))}}define(["./workbox-1834391d"],(function(e){"use strict";importScripts("worker-Otg1oTr8-cf52dn8krZV6.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Otg1oTr8-cf52dn8krZV6/_buildManifest.js",revision:"1a31c8b8b5fde28dcd45673d7b4224b9"},{url:"/_next/static/Otg1oTr8-cf52dn8krZV6/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/164-6ed86214e05cec39.js",revision:"6ed86214e05cec39"},{url:"/_next/static/chunks/450-26a606ce80e52f82.js",revision:"26a606ce80e52f82"},{url:"/_next/static/chunks/582-18abb31450dd5217.js",revision:"18abb31450dd5217"},{url:"/_next/static/chunks/651-a87890289f36240c.js",revision:"a87890289f36240c"},{url:"/_next/static/chunks/framework-c02f198d58d34563.js",revision:"c02f198d58d34563"},{url:"/_next/static/chunks/main-93156d1ea793a2e2.js",revision:"93156d1ea793a2e2"},{url:"/_next/static/chunks/pages/_app-fa8733345832b943.js",revision:"fa8733345832b943"},{url:"/_next/static/chunks/pages/_error-e755336071b61fcc.js",revision:"e755336071b61fcc"},{url:"/_next/static/chunks/pages/home-962ef0323d86de36.js",revision:"962ef0323d86de36"},{url:"/_next/static/chunks/pages/index-81bb6f12c6bb5658.js",revision:"81bb6f12c6bb5658"},{url:"/_next/static/chunks/pages/join-c05df43309f9dd5a.js",revision:"c05df43309f9dd5a"},{url:"/_next/static/chunks/pages/join/onboarding-aa1eaf7b9efee78d.js",revision:"aa1eaf7b9efee78d"},{url:"/_next/static/chunks/pages/login-f768bd734a77703e.js",revision:"f768bd734a77703e"},{url:"/_next/static/chunks/pages/management-30d24c8cbd1e8770.js",revision:"30d24c8cbd1e8770"},{url:"/_next/static/chunks/pages/mypage-366156c3c097051c.js",revision:"366156c3c097051c"},{url:"/_next/static/chunks/pages/oauth/redirect-569a21bbdc142fe2.js",revision:"569a21bbdc142fe2"},{url:"/_next/static/chunks/pages/reservation/create-2eff45458a91a89e.js",revision:"2eff45458a91a89e"},{url:"/_next/static/chunks/pages/reservation/update/%5Bid%5D-1d26261dc8285e0e.js",revision:"1d26261dc8285e0e"},{url:"/_next/static/chunks/pages/table-213fe549e0f30b20.js",revision:"213fe549e0f30b20"},{url:"/_next/static/chunks/pages/test-30d5ed60b553f50e.js",revision:"30d5ed60b553f50e"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-5761f3a204ffdf4a.js",revision:"5761f3a204ffdf4a"},{url:"/_next/static/css/2c5eb24b38336bb2.css",revision:"2c5eb24b38336bb2"},{url:"/_next/static/css/3c93c2e6477ca278.css",revision:"3c93c2e6477ca278"},{url:"/_next/static/css/3d8d397299ecdf54.css",revision:"3d8d397299ecdf54"},{url:"/_next/static/css/57eee0ab7c9a44da.css",revision:"57eee0ab7c9a44da"},{url:"/_next/static/css/636d6faeb438598a.css",revision:"636d6faeb438598a"},{url:"/_next/static/css/8a05839b0e28918f.css",revision:"8a05839b0e28918f"},{url:"/_next/static/css/bfe99f4ea710aac9.css",revision:"bfe99f4ea710aac9"},{url:"/_next/static/css/c617073ab54e3b3f.css",revision:"c617073ab54e3b3f"},{url:"/_next/static/css/fd9423fe58c22ebd.css",revision:"fd9423fe58c22ebd"},{url:"/_next/static/media/Spoqa Han Sans Neo Bold.34d3d399.woff2",revision:"34d3d399"},{url:"/_next/static/media/Spoqa Han Sans Neo Light.19b7c9e6.woff2",revision:"19b7c9e6"},{url:"/_next/static/media/Spoqa Han Sans Neo Medium.292ec9b9.woff2",revision:"292ec9b9"},{url:"/_next/static/media/Spoqa Han Sans Neo Regular.a7f45aa4.woff2",revision:"a7f45aa4"},{url:"/_next/static/media/Spoqa Han Sans Neo Thin.84f5b988.woff2",revision:"84f5b988"},{url:"/_next/static/media/main-loading.e79d0eae.png",revision:"d694fb2759ac74767922775f3a85cf40"},{url:"/android-icon-144x144.png",revision:"691c4bf8163bb9cf25aac9162c18333e"},{url:"/android-icon-192x192.png",revision:"aad3c04e2cce73dd946d668145717ced"},{url:"/android-icon-36x36.png",revision:"301e9872c038475470914cbe378955a9"},{url:"/android-icon-48x48.png",revision:"a443cc04e2b136c748a5f6519bc1a4f2"},{url:"/android-icon-72x72.png",revision:"70445aaf8bc2f95bfaab23c7198dca0f"},{url:"/android-icon-96x96.png",revision:"2e4df152b9e546d4564c093413038784"},{url:"/apple-icon-114x114.png",revision:"a708530a027ed6a896af2481cc2e0e6d"},{url:"/apple-icon-120x120.png",revision:"0aec76c795283a7680604f3471210280"},{url:"/apple-icon-144x144.png",revision:"691c4bf8163bb9cf25aac9162c18333e"},{url:"/apple-icon-152x152.png",revision:"a010bd8a1a951e2b2bf966e856228b7b"},{url:"/apple-icon-180x180.png",revision:"9e41568eb98398fc55d79a543934c585"},{url:"/apple-icon-57x57.png",revision:"73ee2be23f4d354c2d6bac06ca18257b"},{url:"/apple-icon-60x60.png",revision:"515877332b73a356fabc14a8b05ff355"},{url:"/apple-icon-72x72.png",revision:"70445aaf8bc2f95bfaab23c7198dca0f"},{url:"/apple-icon-76x76.png",revision:"4c7b90210fe219719a59764dce728926"},{url:"/apple-icon-precomposed.png",revision:"1892e2ec2c75f92e26cca605e9c59bc8"},{url:"/apple-icon.png",revision:"1892e2ec2c75f92e26cca605e9c59bc8"},{url:"/favicon-16x16.png",revision:"496d32cc515ddefac3bb67376170682e"},{url:"/favicon-32x32.png",revision:"f72cb5326fb285be98779b0bf5c8f292"},{url:"/favicon-96x96.png",revision:"2e4df152b9e546d4564c093413038784"},{url:"/favicon.ico",revision:"0edd97315a6f5ae6f3bef7dc1fccb148"},{url:"/font/Spoqa Han Sans Neo Bold.woff2",revision:"c1f434247980fc7b797cfd0e36301655"},{url:"/font/Spoqa Han Sans Neo Light.woff2",revision:"684c6b6705034b7f2bc9348b74ba87cc"},{url:"/font/Spoqa Han Sans Neo Medium.woff2",revision:"be01c9e874d69e5665fdc645f4ed9622"},{url:"/font/Spoqa Han Sans Neo Regular.woff2",revision:"faf550e17e2e5a805490cac83c0faca1"},{url:"/font/Spoqa Han Sans Neo Thin.woff2",revision:"fd65dc48fb5d6d815caafd2d4b577148"},{url:"/icon-192x192.png",revision:"ded39fe854ff4b4226333b40dbc7efa8"},{url:"/icon-256x256.png",revision:"93d706bd93dd9efa96c8b0225813f482"},{url:"/icon-384x384.png",revision:"f976c8b99346876a281e291048707aad"},{url:"/icon-512x512.png",revision:"5577f8bd790a5452da08e0f6c307078b"},{url:"/manifest.json",revision:"bcba625fdc488a1b70267632c1fce4d7"},{url:"/ms-icon-144x144.png",revision:"691c4bf8163bb9cf25aac9162c18333e"},{url:"/ms-icon-150x150.png",revision:"feeeb2e6602aaaf55033c3d3726feea4"},{url:"/ms-icon-310x310.png",revision:"61c5cb577639aed2d50f50af96e146f4"},{url:"/ms-icon-70x70.png",revision:"50710ea0d160acac767e3e26daa79cde"},{url:"/svg/meetmeet_horizontal.svg",revision:"a9c83b8470e5d3e2aca88626089b58a4"},{url:"/svg/meetmeet_vertical.svg",revision:"f0ebda92dd56d96be5f8bec157cfd511"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
