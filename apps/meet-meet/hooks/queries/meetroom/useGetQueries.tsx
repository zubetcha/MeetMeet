import { useQuery } from "@apollo/client"
import { useSetRecoilState } from "recoil"
import { meetroomState } from "recoil/meetroom"
import { GET_MEETROOMS, GET_MEETROOM_BY_ID, GET_MEETROOM_IMAGES, GET_MEETROOM_MERGE_INFO } from "graphql/meetroom/query"
import { MeetRoom, MeetRoomData, MeetroomImageData, MeetRoomMergeInfoData } from "graphql/meetroom/types"
import { GET_RESERVATION_BY_MEETROOM_AND_DATE } from "graphql/reservation/query"

export const useGetMeetrooms = () => {
    const setMeetrooms = useSetRecoilState(meetroomState);
    const result =  useQuery<MeetRoomData>(GET_MEETROOMS, {
        onCompleted: res => {
            setMeetrooms(res.meetrooms);
        },
    });
    return { ...result };
}

export const useGetMeetroom = (id: number) => {
    const result = useQuery<MeetRoom>(GET_MEETROOM_BY_ID, { variables: { id } })
    return { ...result };
}

export const useGetMeetroomImages = (id: number) => {
    const result = useQuery<MeetroomImageData>(GET_MEETROOM_IMAGES, { variables: { meetroomId: id } });
    return { ...result };
}

export const useGetMeetroomMergeInfo = (id: number) => {
    const result = useQuery<MeetRoomMergeInfoData>(GET_MEETROOM_MERGE_INFO, { 
        variables: { meetroomId: id },
    });
    return { ...result };
}

export const useGetReservationByRoomAndDate = (idList:number[], date:Date) => {
    const result = useQuery(GET_RESERVATION_BY_MEETROOM_AND_DATE, {
        variables: {meetRoomIdList: idList, date: date}
    })

    return { ...result }
}