import { atom } from "recoil";
import { NoticeDataState } from "./types";
import { loggingEffect, localForageEffect } from "recoil/effects";

const NOTICE_DATA = "noticeData";
const NOTICE_ATOM_KEY = "notice"

export const noticeDataState = atom<NoticeDataState>({
  key: NOTICE_ATOM_KEY,
  default: {
    noticeList: [],
    lastEventId: "",
  },
  effects: [loggingEffect(NOTICE_ATOM_KEY), localForageEffect(NOTICE_DATA)]
})