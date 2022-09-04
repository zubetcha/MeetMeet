import { useQuery } from "@apollo/client"
import { GET_MEETROOMS, GET_MEETROOM_BY_ID } from "graphql/meetroom/query"
import { MeetRoom, MeetRoomData } from "graphql/meetroom/types"

export const useGetMeetrooms = () => {
    const result =  useQuery<MeetRoomData>(GET_MEETROOMS);
    return { ...result };
}

export const useGetMeetroom = (id: number) => {
    const result = useQuery<MeetRoom>(GET_MEETROOM_BY_ID, { variables: { id } })
    return { ...result };
}