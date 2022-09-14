import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage, Messaging, MessagePayload} from "firebase/messaging";
import { firebaseConfig, FIREBASE_APP_NAME, FCM_TOKEN, VAPID_KEY } from "constants/firebase";
import localforage from 'localforage';

export const initFirebaseApp = () => {
  const apps = getApps();

  if (!apps.length) {
    const app = initializeApp(firebaseConfig);
    return getMessaging(app);
  }
}

export const getFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const messaging = getMessaging();
      try {
        const derivedFcmToken = await getToken(messaging, { vapidKey: VAPID_KEY })
        console.log(derivedFcmToken)
        if (derivedFcmToken) {
          await localforage.setItem(FCM_TOKEN, derivedFcmToken);
          return derivedFcmToken;
        }
      }
      catch (error) {
        console.log(error);
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  }
  catch (error) {
    console.log(error);
  }
}

export const getMessage = () => {
  const messaging: Messaging | undefined = initFirebaseApp();

  if (messaging) {
    onMessage(messaging, (payload: MessagePayload) => {
      const title = payload?.notification?.title;
      const options = {
          body : payload?.notification?.body
      };
      navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title as string, options);
      })
    })
  }
}