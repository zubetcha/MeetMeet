import { useQuery } from "react-query";
import { useQuery as useQueryGql } from "@apollo/client";
import { ReservationById, ReservationByMeetRoomAndDate } from "graphql/reservation/types";
import { GET_RESERVATION_BY_ID, GET_RESERVATION_BY_MEETROOM_AND_DATE } from "graphql/reservation/query";

export const useGetReservationByRoomAndDate = (idList:number[], date:string) => {
  console.log(idList, date);

  const result = useQueryGql<ReservationByMeetRoomAndDate>(GET_RESERVATION_BY_MEETROOM_AND_DATE, {
      variables: {meetroomIdList: idList, date: date},
      fetchPolicy: 'network-only'
  })
  return { ...result }
}

export const useGetReservationById = (id:number) => {
  const result = useQueryGql<ReservationById>(GET_RESERVATION_BY_ID, {
    variables: {id: id}
  })

  return { ...result }
}