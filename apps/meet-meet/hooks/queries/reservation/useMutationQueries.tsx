import { ReservationAPI } from "@api/api";
import { reservationCreateInfoType, reservationUpdateInfoType } from "@api/types";
import { useMutation } from "react-query";
import { useGetReservationById } from "./useGetQueries";


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

export const useUpdateReservation = (id:number) => {
  const reservationInfo = useGetReservationById(id);
  return useMutation(({reservationId, reservationInfo}:useUpdateReservationType) => ReservationAPI.updateReservation(reservationId, reservationInfo), {
    onSuccess: () => {
      reservationInfo.refetch()
    }
  })
}