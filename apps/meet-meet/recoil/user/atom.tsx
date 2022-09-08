import { atom } from "recoil";
import { UserInfo } from "./types";

const userState = atom<UserInfo>({
    key: "user",
    default: {
        id: null,
        role: "",
        name: "",
        email: "",
        phone: "",
        department: {
            id: null,
            name: "",
        },
        noticeTime: null,
    }
})

export default userState;