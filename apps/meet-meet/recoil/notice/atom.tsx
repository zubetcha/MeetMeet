import { atom } from "recoil";
import { NoticeDataState } from "./types";
import { loggingEffect, localForageEffect } from "./effect";

const NOTICE_DATA = "noticeData";

export const noticeDataState = atom<NoticeDataState>({
  key: "notice",
  default: {
    noticeList: [],
    lastEventId: "",
  },
  effects: [loggingEffect(), localForageEffect(NOTICE_DATA)]
})