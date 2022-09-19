import { selector, RecoilValueReadOnly } from "recoil";
import { noticeListState } from "./atom";
import { NoticeListStatsState } from "./types";

export const noticeListStatsState: RecoilValueReadOnly<NoticeListStatsState> = selector({
  key: "noticeListStats",
  get: ({ get }) => {
    const noticeList = get(noticeListState);
    const totalNum = noticeList.length;
    const lastEventId = noticeList[totalNum - 1]?.id;

    return {
      totalNum,
      lastEventId,
    }
  }
})