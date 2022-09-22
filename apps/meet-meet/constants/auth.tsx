import { isProduction } from "./common";
import { API_BASE_URL } from "./common";

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const LOCAL_OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth/redirect';
export const PROD_OAUTH2_REDIRECT_URI = 'https://www.meetmeet.me/oauth/redirect';
export const OAUTH2_REDIRECT_URI = isProduction ? PROD_OAUTH2_REDIRECT_URI : LOCAL_OAUTH2_REDIRECT_URI;

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorization/google?redirect_uri' + OAUTH2_REDIRECT_URI;