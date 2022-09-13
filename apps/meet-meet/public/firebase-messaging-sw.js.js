// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
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
const messaging = firebase.messaging();