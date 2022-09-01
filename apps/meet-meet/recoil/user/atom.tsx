import { atom } from "recoil";

const userState = atom({
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