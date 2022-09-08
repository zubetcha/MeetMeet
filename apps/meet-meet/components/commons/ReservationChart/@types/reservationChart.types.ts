interface reservationInfo {
  department: string;
  startTime: string;
  endTime: string;
  meetingRoom: string;
  host: string;
}

export type MeetingRoomObjectType = {
  [meetingRoom: string]: reservationInfo[];
};

export type UnAvailableListType = {
  [date: string]: MeetingRoomObjectType;
};

export interface ReservationProps {
  width?: string;
  startDate?: Date;
  meetingRoomList: string[];
  unavailableList: UnAvailableListType;
}
