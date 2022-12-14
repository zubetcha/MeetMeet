import axios from 'axios';
import { getCookie } from '@utils/cookies';
import { API_BASE_URL } from 'constants/common';
import { ACCESS_TOKEN } from 'constants/auth';

//로컬서버가 아닌 배포된 서버일 때 BASE_URL을 productionURL로 지정
const isProduction = process.env.NODE_ENV === "production";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
}); 

api.interceptors.request.use((config: any) => {
  const accessToken = getCookie(ACCESS_TOKEN);
  config.headers!.common["Authorization"] = accessToken ? `Bearer ${accessToken}` : null;

  return config;
});