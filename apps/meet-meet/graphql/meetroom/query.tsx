import { gql } from "@apollo/client";

export const GET_MEETROOMS = gql`
    query MeetRooms {
        meetrooms {
            id,
            name,
            location,
            seat,
            hasMonitor,
            canMerge
        }
    }
`;

export const GET_MEETROOM_BY_ID = gql`
    query MeetRoom($id: Int!) {
        meetroomById(id: $id) {
            id,
            name,
            location,
            seat,
            hasMonitor,
            canMerge
        }
    }
`;

