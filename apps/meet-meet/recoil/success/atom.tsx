import { atom } from "recoil";

const successState = atom({
    key: "success",
    default: {
      isOpen: false,
      title: "",
    },
})

export default successState;