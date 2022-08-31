import { api } from "./axios";
import { MeetRoom } from "graphql/meetroom/types";

export const AuthAPI = {
  addUserInfo: (userInfo: {[key: string]: string | number}) => api.post("/account/info", userInfo),
  getUserInfo: () => api.get(""),
  updateUserInfo: () => api.put("")
}

export const MeetroomAPI = {
  uploadImages: () => api.post(``),
  updateImages: () => api.delete(``),
  deleteImages: () => api.delete(``),

  createMeetroom: (meetroom: MeetRoom) => api.post("/meetroom", meetroom),
  updateMeetroom: () => api.put(`/meetroom`)
}