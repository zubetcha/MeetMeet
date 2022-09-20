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

export type ReservationById = {
  reservationById: {
    id: number;
    meetRoomList: MeetRoomInReservation[];
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    content:string;
    participantList: Participant[];
  }
}

type MeetRoomInReservation = {
  id: number;
  name: string;
  hasMonitor: boolean;
}

type Participant = {
  account: {
    id:number;
    role: string;
    name: string;
    email: string;
    department: {
      id: number;
      name: string;
    }
  },
  isHost: boolean
}