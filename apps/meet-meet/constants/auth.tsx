import { API_BASE_URL } from "./common";

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorization/google?redirect_uri' + OAUTH2_REDIRECT_URI;