import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig, FIREBASE_APP_NAME, FCM_TOKEN } from "constants/firebase";

const firebaseCloudMessaging = {
  init: async () => {
    const apps = getApps();
    if (!apps.length) {

      // Initialize the Firebase app with the credentials
      const app = initializeApp(firebaseConfig);

      try {
        const messaging = getMessaging(app);
        // const tokenInLocalForage = await localforage.getItem("fcm_token");

         // Return the token if it is alredy in our local storage
        // if (tokenInLocalForage !== null) {
        //   return tokenInLocalForage;
        // }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
        // Get new token from Firebase
          const derivedFcmToken = await getToken(messaging, { vapidKey: '' });

          // Set token in our local storage
          if (derivedFcmToken) {
            localStorage.setItem(FCM_TOKEN, derivedFcmToken);
            return derivedFcmToken;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };