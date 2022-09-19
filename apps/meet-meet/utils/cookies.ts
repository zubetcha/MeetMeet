import Cookies, { CookieSetOptions } from "universal-cookie";
import { isProduction } from "constants/common";

const cookies = new Cookies();

/**
 * 쿠키 세팅
 * 
 * @param {string} name 
 * @param {any} value 
 * @param {number} maxAge 
 */
export const setCookie = (name: string, value: any, maxAge?: number) => {
  const option: CookieSetOptions = {
    path: "/",
    secure: isProduction,
    maxAge: maxAge || undefined,
  }
  cookies.set(name, value, option);
}

/**
 * 
 * @param name 
 * @returns 
 */
export const getCookie = (name: string) => {
  return cookies.get(name);
}

/**
 * 
 * @param name 
 */
export const removeCookie = (name: string) => {
  cookies.remove(name);
}