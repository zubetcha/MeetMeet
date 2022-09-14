import { api } from "./axios";
import { MeetRoom } from "graphql/meetroom/types";
import { DeviceInfo } from "@hooks/queries/alarm/alarm.types";

export const AuthAPI = {
  addUserInfo: (userInfo: {[key: string]: string | number}) => api.post("/account/info", userInfo),
  getUserInfo: () => api.get("/account/info"),
  updateUserInfo: (userInfo: {[key: string]: string | number}) => api.post("/account/info", userInfo),
}

export const MeetroomAPI = {
  uploadImages: (images: any) => api.post("/images", images),
  deleteImages: (urls: string[]) => api.delete("/images", { data: { images: urls } }),

  createMeetroom: (meetroom: any) => api.post("/meetroom", meetroom),
  updateMeetroom: (meetroom: any) => api.put(`/meetroom/${meetroom.meetroomId}`, meetroom.info)
}

export const AlarmAPI = {
  sendDeviceInfo: (deviceInfo: DeviceInfo) => api.post("/accounts/device", deviceInfo),
  deleteDeviceInfo: (fcmToken: string) => api.delete("/accounts/device", { params: { fcmToken }}),
}