import axios from 'axios';

//로컬서버가 아닌 배포된 서버일 때 BASE_URL을 productionURL로 지정
const isProduction = process.env.NODE_ENV === "production";

export const api = axios.create({
  baseURL: "http://localhost:8001",
  withCredentials: true,
}); 

api.interceptors.request.use((config: any) => {
  const jwt = localStorage.getItem("jwtToken");
  jwt
  ? config.headers!.common["Authorization"] = `Bearer ${jwt}`
  : config.headers!.common["Authorization"] = null;

  return config;
});