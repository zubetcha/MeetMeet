export interface MeetRoom {
    id: number;
    name: string;
    location: string;
    hasMonitor: boolean;
    canMerge: boolean;
    seat: number;
    createdAt: string;
    updatedAt: string;
}

export interface MeetRoomData {
    meetrooms: MeetRoom[]
}

export interface MeetRoomImage {
    id: number;
    meetRoom: MeetRoom;
    url: string;
}

export interface MeetRoomMergeInfo {
    id: number;
    meetRoom: MeetRoom;
    mergeRoom: MeetRoom;
}