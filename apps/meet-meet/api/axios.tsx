import axios from 'axios';

//로컬서버가 아닌 배포된 서버일 때 BASE_URL을 productionURL로 지정
const isProduction = process.env.NODE_ENV === "production";
const productionURL =`${process.env.PRODUCTION_API_ENDPOINT}`;

const BASE_URL = isProduction ? productionURL : "https://daeho-jjang.eunji-jjang.com";

export const api = axios.create({
  withCredentials: true,
}); 
