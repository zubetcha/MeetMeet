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

export type ReservationByMeeetRoomAndDate = {
  startTime: string;
  endTime: string
}[]