import { atom } from "recoil";
import { RefetchType } from "./types";

export const refetchState = atom<RefetchType>({
  key: 'reservationRefetch',
  default: {
    refetch: false
  }
})