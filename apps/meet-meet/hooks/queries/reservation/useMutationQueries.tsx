import { ReservationAPI } from "@api/api";
import { reservationInfoType } from "@api/types";
import { useMutation } from "react-query";


export const useAddReservation = () => {
  return useMutation((reservationInfo:reservationInfoType) => ReservationAPI.addReservation(reservationInfo),{

  })
}