import { useMemo, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useRecoilState, useRecoilValue } from "recoil";
import { noticeDataState, noticeListStatsState } from "recoil/notice";
import { getCookie } from "@utils/cookies";

import { ACCESS_TOKEN } from "constants/auth";
import { SSE_STREAM_URL } from "@api/sse";
import { useEffect } from "react";

export const useSSE = () => {
  const [messages, setMessages] = useState<any>([]);
  const [noticeData, setNoticeData] = useRecoilState(noticeDataState);
  const accessToken = getCookie(ACCESS_TOKEN);
  const connectionStartMessage = "EventStream Created.";

  const generateEventSource = () => {
    if (accessToken) {
      console.log("generateEventSource");
      return new EventSourcePolyfill(SSE_STREAM_URL, { 
        withCredentials: true,
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "null",
          
        }
      })
    }
  };

  const sse = useMemo(generateEventSource, [accessToken]);

  useEffect(() => {
    if (sse) {
      sse.addEventListener("message", (e) => {
        const { data, lastEventId } = e;
        if (!e.data?.includes(connectionStartMessage)) {
          console.log("Server-Sent Event", e)

          // setNoticeData({...noticeData, lastEventId});
          setMessages((prev: any) => [...prev, JSON.parse(data)]);
        }
      }, { once: true })
    }
  }, [sse]);

  useEffect(() => {
    if (sse && !accessToken) {
      sse.close();
    }
  }, [accessToken, sse])

  useEffect(() => {
    if (messages.length) {
      const newMessages = [...noticeData.noticeList, ...messages];
      const uniqueIdList = new Set(newMessages.map((message) => message.id));
      const filteredList = [...uniqueIdList].map((id) => {
        const index = newMessages.findIndex(message => message.id === id);
        if (index !== -1) {
          return newMessages[index];
        }
      })

      setNoticeData({ ...noticeData, noticeList: [...filteredList].reverse() });
      setMessages([]);
    }
  }, [messages])

  return {

  };
}
