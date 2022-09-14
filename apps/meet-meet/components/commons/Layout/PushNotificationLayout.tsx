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

      const title = payload?.notification?.title;
      const body = payload?.notification?.body;

      navigator.serviceWorker.ready.then(registration => {
        toast(
          <div className={classes.toast_wrapper}>
            <SVG name="alert" color="primary" />
            <div className={classes.content_wrapper}>
              <Text type="body-medium" color="on-surface" style={{ fontWeight: "500", cursor: "pointer" }}>{title}</Text>
              <Text type="body-small" color="on-surface-variant" style={{ cursor: "pointer" }}>{body}</Text>
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
    });
  }

  useEffect(() => {
        toast(
          <div className={classes.toast_wrapper}>
            <SVG name="alert" color="primary" />
            <div className={classes.content_wrapper}>
              <Text type="body-medium" color="on-surface" style={{ fontWeight: "500", cursor: "pointer" }}>어쩌구저쩌구 이러쿵 회의에 초대되셨습니다.</Text>
              <Text type="body-small" color="on-surface-variant" style={{ cursor: "pointer" }}>위치: 회의실 위치, 일시: 회의 시작 날짜 및 시간!</Text>
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
  }, [])

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

