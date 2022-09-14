import { useQuery } from "@apollo/client"
import { useSetRecoilState } from "recoil"
import { meetroomState } from "recoil/meetroom"
import { GET_MEETROOMS, GET_MEETROOM_BY_ID, GET_MEETROOM_IMAGES, GET_MEETROOM_MERGE_INFO } from "graphql/meetroom/query"
import { MeetRoom, MeetRoomData, MeetroomImageData, MeetRoomMergeInfoData } from "graphql/meetroom/types"
import { GET_RESERVATION_BY_MEETROOM_AND_DATE } from "graphql/reservation/query"
import { GET_DEPARTMENTS } from "graphql/department/query"
import { DepartmentData } from "graphql/department/types"
import { ReservationByMeeetRoomAndDate } from "graphql/reservation/types"
import { GET_ACCOUNT_BY_DEPARTMENT } from "graphql/account/query"
import { AccountByDepartment } from "graphql/account/types"

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
    const result = useQuery<ReservationByMeeetRoomAndDate>(GET_RESERVATION_BY_MEETROOM_AND_DATE, {
        variables: {meetRoomIdList: idList, date: date}
    })
    return { ...result }
}

export const useGetDepartments = () => {
    const result = useQuery<DepartmentData>(GET_DEPARTMENTS, {

    })
    return { ...result }
}

export const useGetAccountsByDepartment = (id: number) => {
    const result = useQuery<AccountByDepartment>(GET_ACCOUNT_BY_DEPARTMENT, {
        variables: {departmentId: id}
    })  
    return { ...result }
}