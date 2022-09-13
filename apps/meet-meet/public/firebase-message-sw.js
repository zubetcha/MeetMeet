importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyB5MsSaVHen868J6lRWD1R4bQX0jH5K7qE",
  authDomain: "meetmeet-a49ad.firebaseapp.com",
  projectId: "meetmeet-a49ad",
  storageBucket: "meetmeet-a49ad.appspot.com",
  messagingSenderId: "831729942382",
  appId: "1:831729942382:web:4aa84d00b6d73b28ad4b7f",
  measurementId: "G-41K21FTLLR"
}
firebase.initializeApp(config);

const messaging = firebase.messaging()