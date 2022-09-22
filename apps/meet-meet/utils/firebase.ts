import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig, FCM_TOKEN, VAPID_KEY } from "constants/firebase";
import { noticeStorage } from "./localforage";

/**
 * firebase 콘솔에 등록한 웹앱 정보로 초기화 및
 * 해당 앱과 관련된 클라우드 메시징 인스턴스 생성
 */
export const initFirebaseApp = () => {
  const apps = getApps();

  if (!apps.length) {
    const app = initializeApp(firebaseConfig);
    const messaging =  getMessaging(app);
  } 
}

/**
 * FCM 토큰을 반환
 * 
 * 만약 indexedDB의 localforage에 저장되어 있는 FCM 토큰이 있다면 저장되어 있는 토큰을,
 * localforage에 저장되어 있는 토큰이 없다면 firebase에서 토큰을 발급 받아서 반환
 * 
 * @returns {(string | undefined)} FCM 토큰
 */
export const getFcmToken = async () => {
  initFirebaseApp();
  const messaging = getMessaging();
  const storedFcmToken: string | null = await noticeStorage.getItem(FCM_TOKEN);

  if (storedFcmToken !== null) {
    return storedFcmToken;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      try {
        const derivedFcmToken = await getToken(messaging, { vapidKey: VAPID_KEY })
        console.log(derivedFcmToken)
        if (derivedFcmToken) {
          await noticeStorage.setItem(FCM_TOKEN, derivedFcmToken);
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