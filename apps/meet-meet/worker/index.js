"use strict";

// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging
//
// self.__WB_DISABLE_DEV_LOGS = true

const util = require("./util");

util();

// listen to message event from window
self.addEventListener("message", (event) => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log("안녕", event.data);
});


// import { initializeApp } from "firebase/app";
// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB5MsSaVHen868J6lRWD1R4bQX0jH5K7qE",
  authDomain: "meetmeet-a49ad.firebaseapp.com",
  projectId: "meetmeet-a49ad",
  storageBucket: "meetmeet-a49ad.appspot.com",
  messagingSenderId: "831729942382",
  appId: "1:831729942382:web:4aa84d00b6d73b28ad4b7f",
  measurementId: "G-41K21FTLLR"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.getMessaging(firebaseApp);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const title = payload.notification.title;
//   const options = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(title, options);
// });

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      const title = payload.notification.title;
      const body = payload.notification.body;

      self.registration.showNotification(title, { body });
    });
}