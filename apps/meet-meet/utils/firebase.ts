import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage, Messaging, MessagePayload} from "firebase/messaging";
import { firebaseConfig, FIREBASE_APP_NAME, FCM_TOKEN } from "constants/firebase";
import localforage from 'localforage';

const VAPID_KEY = "BGAOShBkQkH4X2sBwyJ1qzCLg6-S6RhZS2awLd809-UeUYN8kRPmmClidLDwn7_mHpwU5A_aXsYGwBGGqkaklu8";

export const initFirebaseApp = () => {
  const apps = getApps();

  if (!apps.length) {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    console.log(messaging);
  }
}

export const getFcmToken = async () => {
  Notification.requestPermission().then(async(permission) =>  {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      try {
        const storedFcmToken = await localforage.getItem(FCM_TOKEN);
        console.log(storedFcmToken)
      
        if (storedFcmToken) return storedFcmToken;
      
        if (!storedFcmToken) {
         try {
          const messaging = getMessaging();
          const derivedFcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
          console.log(derivedFcmToken)
          if (derivedFcmToken) return derivedFcmToken;
         } 
         catch (error) {
          console.log(error);
          return null;
         }
        }
      }
      catch (error) {
        console.log(error);
        return null;
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

export const getMessage = async () => {
  const messaging: Messaging = getMessaging();
  onMessage(messaging, (payload: MessagePayload) => {
    console.log('Message received. ', payload);
  })
}