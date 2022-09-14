import { gql } from '@apollo/client';

export const GET_RESERVATION_BY_MEETROOM_AND_DATE = gql`
    query Reservations($meetRoomIdList: [Int]!, $date: String) {
      reservationByMeetRoomAndDate(meetRoomIdList: $meetRoomIdList, date: $date){
        startTime,
        endTime
      }
    }
`;