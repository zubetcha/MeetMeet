import { Alarm } from "components";
export const navInfo = [
  {
    itemList: [
      {
        icon: "home",
        label: "Home",
        path: "home",
        isModal: false,
      },
      {
        icon: "alert",
        label: "알림 내역",
        path: "alert",
        isModal: true,
        Modal: ({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (is:boolean) => void }) => Alarm({ isOpen, setIsOpen }),
      },
      {
        icon: "calendar",
        label: "회의실 예약",
        path: "reservation/create",
        isModal: false,
      },
      {
        icon: "map",
        label: "회의실 관리",
        path: "management",
        isModal: false,
      },
    ],
  },
];
