import { Department } from "graphql/department/types";


export type Reservation = {
  id: number;
  name: string;
  department: Department;
  email: string;
  phone: string;
  noticeTime: number;
  createdAt:string;
  updateAt: string;
}

export type ReservationByMeetRoomAndDate = {
  reservationByMeetRoomAndDate : ReservationWithTime[]
}

export type ReservationWithTime = {
  startTime: string;
  endTime: string;
} | undefined

export type ReservationInfo = {
  content: string;
  date: string;
  endTime: string;
  startTime: string;
  meetRoomList: MeetRoomInReservation[];
  participantCnt: number;
  participantList: string[];
  title: string;
}

type MeetRoomInReservation = {
  id: number;
  name: string;
  hasMonitor: boolean;
}