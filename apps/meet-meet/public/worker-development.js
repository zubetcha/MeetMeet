/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
 // To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging

self.__WB_DISABLE_DEV_LOGS = true;
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js"); // Initialize the Firebase app in the service worker by passing in
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
}); // Retrieve an instance of Firebase Messaging so that it can handle background messages.

const isSupported = firebase.messaging.isSupported();

if (isSupported) {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(payload => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const {
      notification: {
        title,
        body
      },
      data: {
        reservation
      }
    } = payload;
    const reservationId = parseInt(reservation);
    self.registration.showNotification(title, {
      body
    });
  });
}
/******/ })()
;