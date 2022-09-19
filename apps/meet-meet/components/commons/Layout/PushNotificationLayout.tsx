import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { getMessaging, onMessage, Messaging } from "firebase/messaging";
import classes from "./Layout.module.scss";
import { Text, SVG } from "ui/src/pages";

import { getFcmToken } from "@utils/firebase";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

/**
 * 브라우저 포커스(포그라운드) 상태에서 푸시 알림이 온 경우
 * 알림 메시지를 우측 상단에서 토스트 팝업의 형태로 보여주는 레이아웃 컴포넌트
 * 
 * @param {(JSX.Element[] | JSX.Element)} children
 * @returns 
 */
export const PushNotificationLayout = ({ children }: Props) => {

  useEffect(() => {
    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    getFcmToken().then(fcmToken => {
      if (fcmToken) {
        getMessage();
      }
    })
  })

  const getMessage = () => {
    const messaging: Messaging = getMessaging();

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);

      if (payload.notification) {
        const title = payload.notification.title;
        const [location, date] = payload.notification.body?.split(", ") as string[];
        // const reservationId = payload.data?.reservation;

        navigator.serviceWorker.ready.then(registration => {
          toast(
            <div className={classes.toast_wrapper}>
              <SVG name="alert" color="primary" />
              <div className={classes.content_wrapper}>
                <Text type="body-medium" color="surface" style={{ fontWeight: "500", cursor: "pointer" }}>
                  {title}
                </Text>
                <Text type="body-small" color="surface" style={{ cursor: "pointer" }}>
                  {location}
                  <br/>
                  {date}
                </Text>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
            }
          );

          // registration.showNotification(title as string, { body });
        })
      }
    });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
      {children}
    </>
  );
}

