import { gql } from "@apollo/client";

export const DELETE_MEETROOM = gql`
    mutation MeetRoom($id: Int!) {
        deleteMeetroom(id: $id) {
            code,
            message
        }
    }
`;