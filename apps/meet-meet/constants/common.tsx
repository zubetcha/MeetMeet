export const S3_BASE_URL = 'https://s3.ap-northeast-2.amazonaws.com/';
export const SERVER_LOCAL_URL = 'http://localhost:8001';
export const SERVER_URL = process.env.SERVER_BASE_URL;
export const CLIENT_LOCAL_URL = 'http://localhost:3000';
export const CLIENT_URL = 'https://www.meetmeet.me'
// export const SERVER_URL = "https://meetmeet-server-spring.eunji-jjang.com";

export const isProduction = process.env.NODE_ENV === 'production';
export const API_BASE_URL = isProduction ? SERVER_URL : SERVER_LOCAL_URL;
// export const API_BASE_URL = SERVER_URL;
export const CLIENT_BASE_URL = isProduction ? CLIENT_URL : CLIENT_LOCAL_URL;
