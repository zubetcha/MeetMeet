import { api } from "./axios";
import { MeetRoom } from "graphql/meetroom/types";
import { reservationInfoType } from "./types";

export const AuthAPI = {
  addUserInfo: (userInfo: { [key: string]: string | number }) =>
    api.post("/account/info", userInfo),
  getUserInfo: () => api.get("/account/info"),
  updateUserInfo: (userInfo: { [key: string]: string | number }) =>
    api.post("/account/info", userInfo),
};

export const MeetroomAPI = {
  uploadImages: (images: any) => api.post("/images", images),
  deleteImages: (urls: string[]) =>
    api.delete("/images", { data: { images: urls } }),

  createMeetroom: (meetroom: any) => api.post("/meetroom", meetroom),
  updateMeetroom: (meetroom: any) =>
    api.put(`/meetroom/${meetroom.meetroomId}`, meetroom.info),
};

export const ReservationAPI = {
  getAllReservationInfo: (startDate: string, endDate: string) =>
    api.get(`reservations?startDateStr=${startDate}&endDateStr=${endDate}`),
  
  getReservationInfobyHost: (startDate: string, endDate: string) =>
    api.get(
      `host/reservations?startDateStr=${startDate}&endDateStr=${endDate}`
    ),
  
  getReservationInfobyParticipant: (startDate: string, endDate: string) =>
    api.get(
      `participant/reservations?startDateStr=${startDate}&endDateStr=${endDate}`
    ),
  
  addReservation: (reservationInfo:reservationInfoType) => 
    api.post(`/reservation`, reservationInfo),
  
  deleteReservation: (reservationId:number) => 
      api.delete(`/reservations/${reservationId}`),
};


