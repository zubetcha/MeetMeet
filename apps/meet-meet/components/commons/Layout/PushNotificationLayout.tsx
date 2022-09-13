import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { firebaseCloudMessaging } from "@utils/firebase"
import { MessagePayload } from 'firebase/messaging';

import Script from "next/script";
import { Text, Modal } from 'ui/src/pages';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const PushNotificationLayout = ({ children }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState<MessagePayload | null>(null);

  useEffect(() => {
    const message = firebaseCloudMessaging.setToken();

    // Event listener that listens for the push notification event in the background
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('../../../public/firebase-messaging-sw.js')
  //     .then(function (registration) {
  //       console.log('Registration successful, scope is:', registration.scope);
  //     }).catch(function (err) {
  //       console.log('Service worker registration failed, error:', err);
  //     });
  // }

      // Event listener that listens for the push notification event in the background

//     if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./firebase-messaging-sw.js")
//     .then(function(registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//     })
//     .catch(function(err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }


    setMessage(message);
  }, [])

  if (message) {
    <>
    <Script onLoad={() => firebaseCloudMessaging.init()}></Script>
      <div onClick={() => router.push(message?.data?.url as string)}>
        <Text>{message?.notification?.title}</Text>  
        <Text>{message?.notification?.body}</Text>  
      </div>
      {children}
    </>  
  }

  return null;
}

