import { gql } from '@apollo/client';

export const GET_RESERVATION_BY_MEETROOM_AND_DATE = gql`
    query Reservations($meetroomIdList: [Int]!, $date: String) {
      reservationByMeetRoomAndDate(meetroomIdList: $meetroomIdList, date: $date){
        startTime,
        endTime
      }
    }
`;


export const GET_RESERVATION_BY_ID = gql`
    query ReservationById($id: Int!) {
      reservationById(id: $id) {
        id,
        meetRoomList {
          id,
          name,
          hasMonitor
        },
        title,
        content,
        date,
        startTime,
        endTime,
        participantList {
          account {
            id,
            role,
            name,
            email,
            department {
              id,
              name
            }
          },
          isHost
        }
      }
    }
`