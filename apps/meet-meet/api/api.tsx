import { api } from "./axios";

export const AuthAPI = {
  googleLogin: () => api.get("/oauth2/authorization/google?redirect_uri=localhost:8001/oauth2/redirect"),
  addUserInfo: (userInfo: {[key: string]: string | number}) => api.post("/account/info", userInfo)
}

