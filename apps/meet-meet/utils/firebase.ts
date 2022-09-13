import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage, Messaging, MessagePayload} from "firebase/messaging";
import { firebaseConfig, FIREBASE_APP_NAME, FCM_TOKEN } from "constants/firebase";
import localforage from 'localforage';

export const initFirebaseApp = () => {
  const apps = getApps();

  if (!apps.length) {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    console.log(messaging);
  }
}

export const getFcmToken = async () => {
  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
  try {
    const storedFcmToken = await localforage.getItem(FCM_TOKEN);
    console.log(storedFcmToken)

    if (storedFcmToken) return storedFcmToken;

    if (!storedFcmToken) {
     try {
      const messaging = getMessaging();
      const derivedFcmToken = await getToken(messaging, { vapidKey: 'BGAOShBkQkH4X2sBwyJ1qzCLg6-S6RhZS2awLd809-UeUYN8kRPmmClidLDwn7_mHpwU5A_aXsYGwBGGqkaklu8' });
      console.log(derivedFcmToken)
      if (derivedFcmToken) return derivedFcmToken;
     } 
     catch (error) {
      throw error;
      return null;
     }
    }
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export const getMessage = async () => {
  const messaging: Messaging = getMessaging();
  onMessage(messaging, (payload: MessagePayload) => {
    console.log('Message received. ', payload);
  })
}