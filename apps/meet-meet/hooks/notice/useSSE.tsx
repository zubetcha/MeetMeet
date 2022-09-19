import { useMemo } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { noticeListState, noticeListStatsState } from "recoil/notice";
import { getCookie } from "@utils/cookies";

import { ACCESS_TOKEN } from "constants/auth";
import { SSE_STREAM_URL } from "@api/sse";
import { useEffect } from "react";


export const useSSE = () => {
  const setNoticeList = useSetRecoilState(noticeListState);
  const { lastEventId } = useRecoilValue(noticeListStatsState);
  const accessToken = getCookie(ACCESS_TOKEN);

  const generateEventSource = () => {
    return new EventSourcePolyfill(SSE_STREAM_URL, { 
      withCredentials: true,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "null",
        "Last-Event-ID": lastEventId ? String(lastEventId) : "null",
      }
    })
  };

  const sse = useMemo(generateEventSource, []);

  sse.addEventListener("message", (e) => {
    console.log("Server-Sent Event", e);
  })


  useEffect(() => {
    if (!accessToken) {
      sse.close();
    }
  }, [accessToken])

  return {

  };
}
