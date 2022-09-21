import { atom, RecoilState } from "recoil";
import { MeetRoom } from "graphql/meetroom/types";

export const meetroomState = atom<MeetRoom[]>({
    key: "meetroom",
    default: [],
})