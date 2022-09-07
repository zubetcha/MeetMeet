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
        Modal: (isOpen: boolean) => Alarm({ isOpen: isOpen }),
      },
      {
        icon: "calendar",
        label: "회의실 예약",
        path: "reservation",
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
