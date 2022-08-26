import axios from 'axios';
import { ACCESS_TOKEN } from 'constants/auth';

//로컬서버가 아닌 배포된 서버일 때 BASE_URL을 productionURL로 지정
const isProduction = process.env.NODE_ENV === "production";

export const api = axios.create({
  baseURL: "http://localhost:8001",
  withCredentials: true,
}); 

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

api.interceptors.request.use((config: any) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  accessToken
  ? config.headers!.common["Authorization"] = `Bearer ${accessToken}`
  : config.headers!.common["Authorization"] = null;

  return config;
});