import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { MessagePayload } from 'firebase/messaging';
import { getFcmToken, getMessage } from "@utils/firebase";

import Script from "next/script";
import { Text, Modal } from 'ui/src/pages';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const PushNotificationLayout = ({ children }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState<MessagePayload | null>(null);

  useEffect(() => {
    const _getFcmToken = async () => {
      const fcmToken = await getFcmToken();
      console.log(fcmToken);
    }
    _getFcmToken();
  }, [])

  useEffect(() => {
    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }
    getMessage();
  })

  if (message) {
    <>
      <div onClick={() => router.push(message?.data?.url as string)}>
        <Text>{message?.notification?.title}</Text>  
        <Text>{message?.notification?.body}</Text>  
      </div>
      {children}
    </>  
  }

  return null;
}

