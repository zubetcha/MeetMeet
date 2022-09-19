import { atom } from "recoil";
import { NoticeListState } from "./types";

export const noticeListState = atom<NoticeListState>({
  key: "notice",
  default: [],
})