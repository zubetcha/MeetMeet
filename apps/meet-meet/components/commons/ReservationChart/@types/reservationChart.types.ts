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

export interface selectedDataType {
  date: string;
  meetingRoom: string;
  startTime: string;
  endTime: string;
}

export interface RservationRowProps {
  meetingRoom: string;
  onChange: (e: selectedDataType) => void;
  unavailableRoomList: any;
  date: string;
  onClickReservedCell?: (e: any) => void;
}
