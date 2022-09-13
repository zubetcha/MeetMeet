import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage, Messaging, MessagePayload} from "firebase/messaging";
import { firebaseConfig, FIREBASE_APP_NAME, FCM_TOKEN } from "constants/firebase";
import localforage from 'localforage';

const firebaseCloudMessaging = {
  init: async () => {
    const apps = getApps();

    if (!apps.length) {

      // Initialize the Firebase app with the credentials
      const app = initializeApp(firebaseConfig);

      try {
        const messaging = getMessaging(app);
        const storedFcnToken = await localforage.getItem(FCM_TOKEN);
        console.log(messaging);
        console.log(storedFcnToken)

        //  Return the token if it is alredy in our local storage
        if (storedFcnToken !== null) {
          return storedFcnToken;
        }

        try {
          const status = await Notification.requestPermission();
          console.log(status)

          if (status && status === "granted") {
            try {
              // Get new token from Firebase
                  if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}
              const derivedFcmToken = await getToken(messaging, { vapidKey: 'BGAOShBkQkH4X2sBwyJ1qzCLg6-S6RhZS2awLd809-UeUYN8kRPmmClidLDwn7_mHpwU5A_aXsYGwBGGqkaklu8' });
              console.log(derivedFcmToken)

              // Set token in our local storage
              if (derivedFcmToken) {
                localStorage.setItem(FCM_TOKEN, derivedFcmToken);
                return derivedFcmToken;
              }
            }
            catch (error) {
              console.log("getToken", error);
              return null;
            }
          }
        }
        catch (error) {
          console.log("notification request permission", error);
          return null;
        }
      } catch (error) {
        console.error("getMassaging", error);
        return null;
      }
    }
  },

  setToken: async () => {
    try {
      const fcmToken = await firebaseCloudMessaging.init();
      if (fcmToken) {
        console.log(fcmToken)
        return firebaseCloudMessaging.getMessage();
      }
    }
    catch (error) {
      console.log('setToken', error);
    }
  },

  getMessage: () => {
    const messaging: Messaging = getMessaging();
    let message;

    onMessage(messaging, (payload: MessagePayload) => {
      console.log('Message received. ', payload);
      message = { ...payload };
    })

    return message;
  },
};
export { firebaseCloudMessaging };