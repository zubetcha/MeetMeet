import { atom } from "recoil";
import { EventSourcePolyfill } from "event-source-polyfill";
import { NoticeDataState } from "./types";

export const noticeDataState = atom<NoticeDataState>({
  key: "notice",
  default: {
    noticeList: [],
    lastEvnetId: "",
  },
})