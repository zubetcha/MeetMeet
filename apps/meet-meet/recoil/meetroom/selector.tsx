import { selector } from "recoil";
import { meetroomState } from "./atom";

export const availableMergeState = selector({
  key: 'availableMergeState',
  get: ({get}) => {
    const meetroomList = get(meetroomState);
    const availableMergeList = [
      ...meetroomList,
      { id: null, name: '없음', canMerge: false, hasMonitor: false, seat: 0, location: "" }
    ];

    return {
      availableMergeList
    };
  },
});