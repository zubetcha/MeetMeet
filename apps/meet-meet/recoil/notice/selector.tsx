import { selector, RecoilValueReadOnly } from "recoil";
import { noticeDataState } from "./atom";
import { NoticeListStatsState } from "./types";

export const noticeListStatsState: RecoilValueReadOnly<NoticeListStatsState> = selector({
  key: "noticeListStats",
  get: ({ get }) => {
    const { noticeList } = get(noticeDataState);
    const totalNum = noticeList.length;

    return {
      totalNum,
    }
  }
})