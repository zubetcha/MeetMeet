export interface MeetRoom {
    id: number |  null;
    name: string;
    location: string;
    hasMonitor: boolean;
    canMerge: boolean;
    seat: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface MeetRoomData {
    meetrooms: MeetRoom[]
}

export interface MeetRoomImage {
    id: number;
    url: string;
}

export interface MeetroomImageData {
    imageByMeetRoom: MeetRoomImage[]
}

export interface MeetRoomMergeInfo {
    id: number;
    mergeRoom: {
        id: number;
        name: string;
    };
}

export interface MeetRoomMergeInfoData {
    mergeInfoByMeetRoom: MeetRoomMergeInfo;
}