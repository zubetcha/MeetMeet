import { atom, RecoilState } from "recoil";
import { MeetRoomData } from "graphql/meetroom/types";

const meetroomState = atom({
    key: "meetroom",
    default: [],
})

export default meetroomState;