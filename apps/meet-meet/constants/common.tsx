export const S3_BASE_URL = 'https://s3.ap-northeast-2.amazonaws.com/';
export const LOCALHOST_URL = 'http://localhost:8001';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const isProduction = process.env.NODE_ENV === 'production';
export const API_BASE_URL = isProduction ? SERVER_URL : LOCALHOST_URL;
