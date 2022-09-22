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
  startTime?: string;
  endTime?: string;
  meetingRoomList: meetRoomType[];
  unavailableList: UnAvailableListType;
}

export interface selectedDataType {
  date: string[];
  meetingRoom: meetRoomType;
  startTime: string;
  endTime: string;
}

export interface RservationRowProps {
  meetingRoom: meetRoomType;
  timeList: string[];
  onChange: (e: selectedDataType) => void;
  unavailableRoomList: any;
  date: string[];
  onClickReservedCell?: (e: any) => void;
}

export type meetRoomType = {
  id: number;
  name: string;
}
