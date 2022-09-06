import { api } from "./axios";
import { MeetRoom } from "graphql/meetroom/types";

export const AuthAPI = {
  addUserInfo: (userInfo: {[key: string]: string | number}) => api.post("/account/info", userInfo),
  getUserInfo: () => api.get("/account/info"),
  updateUserInfo: (userInfo: {[key: string]: string | number}) => api.post("/account/info", userInfo),
}

export const MeetroomAPI = {
  uploadImages: (images: any) => api.post("/images", images),
  deleteImages: (images: string[] ) => api.delete("/images", { images }),

  createMeetroom: (meetroom: any) => api.post("/meetroom", meetroom),
  updateMeetroom: (meetroom: any) => api.put(`/meetroom/${meetroom.meetroomId}`, meetroom.info)
}