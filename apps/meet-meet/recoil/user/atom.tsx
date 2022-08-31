import { atom } from "recoil";

const userAtom = atom({
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

export default userAtom;