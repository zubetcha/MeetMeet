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