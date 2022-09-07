import { atom, RecoilState } from "recoil";
import { MeetRoomData } from "graphql/meetroom/types";

export const meetroomState = atom({
    key: "meetroom",
    default: [],
})