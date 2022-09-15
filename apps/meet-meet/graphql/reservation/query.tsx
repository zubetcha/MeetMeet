import { gql } from '@apollo/client';

export const GET_RESERVATION_BY_MEETROOM_AND_DATE = gql`
    query Reservations($meetroomIdList: [Int]!, $date: String) {
      reservationByMeetRoomAndDate(meetroomIdList: $meetroomIdList, date: $date){
        startTime,
        endTime
      }
    }
`;