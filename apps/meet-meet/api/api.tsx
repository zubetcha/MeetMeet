import { api } from "./axios";
import { MeetRoom } from "graphql/meetroom/types";
import { reservationCreateInfoType, reservationUpdateInfoType,  } from "./types";
import { DeviceInfo } from "@hooks/queries/alarm/alarm.types";

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
  
  addReservation: (reservationInfo:reservationCreateInfoType) => 
    api.post(`/reservation`, reservationInfo),
  
  deleteReservation: (reservationId:number) => 
    api.delete(`/reservations/${reservationId}`),
  
  updateReservation: (reservationId:number, reservationInfo:reservationUpdateInfoType) =>
    api.put(`/reservations/${reservationId}`, reservationInfo)
};


export const AlarmAPI = {
  sendDeviceInfo: (deviceInfo: DeviceInfo) => api.post("/accounts/device", deviceInfo),
  deleteDeviceInfo: (fcmToken: string) => api.delete("/accounts/device", { params: { fcmToken }}),

  setAlarmConfig: (noticeTime: number | null) => api.patch(`/account/notice-time?noticeTime=${noticeTime}`),
  readAlarm: (noticeId: number) => api.delete(`/notices/${noticeId}`),
  readAllAlarms: () => api.delete("/notices")
}
