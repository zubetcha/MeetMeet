import { api } from "./axios";

export const AuthAPI = {
  googleLogin: () => api.get("/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth2/redirect"),
  addUserInfo: (userInfo: {[key: string]: string | number}) => api.post("/account/info", userInfo),
  getUserInfo: () => api.get(""),
  updateUserInfo: () => api.put(""),
  uploadImage: (images: any) => api.post("/images", images)
}

