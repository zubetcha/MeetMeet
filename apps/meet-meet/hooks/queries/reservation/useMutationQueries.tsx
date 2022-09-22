import { ReservationAPI } from "@api/api";
import { reservationCreateInfoType, reservationUpdateInfoType } from "@api/types";
import { useMutation } from "react-query";


export const useAddReservation = () => {
  return useMutation((reservationInfo:reservationCreateInfoType) => ReservationAPI.addReservation(reservationInfo),{

  })
}

export const useDeleteReservation = () => {
  return useMutation((reservationId:number) => ReservationAPI.deleteReservation(reservationId), {
    
  })
}

type useUpdateReservationType = {
  reservationId: number,
  reservationInfo: reservationUpdateInfoType
}

export const useUpdateReservation = () => {
  return useMutation(({reservationId, reservationInfo}:useUpdateReservationType) => ReservationAPI.updateReservation(reservationId, reservationInfo), {

  })
}