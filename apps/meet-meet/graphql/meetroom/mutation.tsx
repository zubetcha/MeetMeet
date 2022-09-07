import { gql } from "@apollo/client";

export const DELETE_MEETROOM = gql`
    mutation deleteMeetRoom($id: Int!) {
        deleteMeetroom(id: $id) {
            code,
            message
        }
    }
`;