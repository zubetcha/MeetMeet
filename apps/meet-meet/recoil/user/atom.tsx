import { atom } from "recoil";
import { UserInfo } from "./types";
import { loggingEffect } from "recoil/effects";

const USER_ATOM_KEY = "user";

const userState = atom<UserInfo>({
    key: USER_ATOM_KEY,
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
    },
    effects: [loggingEffect(USER_ATOM_KEY)]
})

export default userState;