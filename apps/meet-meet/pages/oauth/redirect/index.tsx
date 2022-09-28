
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useUrlParameter } from "ui/src/hooks/useUrlParameter";
import { useSendDeviceInfo } from '@hooks/queries/alarm/useMutationQueries';
import { getFcmToken } from '@utils/firebase';
import { osName } from 'react-device-detect';
import { setCookie } from '@utils/cookies';

import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/auth';
import { DeviceInfo } from '@hooks/queries/alarm/alarm.types';

/**
 * 구글 로그인에 성공한 경우에 페이지 리다이렉트 핸들러
 * 
 * 리다이렉트 url에서 access_token, refresh_token, is_First 값 파싱
 * 1. access_token 값이 있으면
 * 1-1. 로컬 스토리지에 토큰 세팅
 * 1-2. FCM 토큰 받아와서 유저가 접속한 OS 정보 및 FCM 토큰 값 서버에 전송
 * 1-3. is_First가 true이면 유저 정보 추가 입력 페이지로 리다이렉트
 * 1-4. is_First가 false이면 메인 페이지로 리다이렉트
 * 
 * 2. access_token 값이 없으면 다시 로그인 페이지로 리다이렉트
 * 
 * @returns {ReactFragment} <></>
 */
const Oauth2RedirectHandler = () => {
  // DESCRIBE: redirect-uri format 
  // http://localhost:3000/oauth/redirect
  // ?access_token=eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE4Nzc0NzcwNjAsInN1YiI6Miwicm9sZSI6IlJPTEVfVVNFUiIsImVtYWlsIjoienVoeWU1QGdtYWlsLmNvbSJ9.sPGCrEE9_uaaAqyPdf4Ms74PP2ArLFZabWUy58HbrPc8pzMIXFmTrfXAKEJub6c6PMV4j-74Cjqh_hf2LIeS9Q
  // &refresh_token=eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjc0NjY2MjE0NzcwNjB9.AU0MTCAoTwlOAmmqiYszIjN_aGoOLad7KaelmMIuWJWczf-IRCappO9FyxycdbLwec8cvIX2DUfgDJsYVKFjPw
  // &is_first=false

  const router = useRouter();
  const accessToken = useUrlParameter("access_token");
  const refreshToken = useUrlParameter("refresh_token");
  const isFirst = useUrlParameter("is_first");
  const { mutateAsync, isSuccess } = useSendDeviceInfo();

  useEffect(() => {
    if (accessToken) {
      setCookie(ACCESS_TOKEN, accessToken, 60 * 60 * 24)
      setCookie(REFRESH_TOKEN, refreshToken, 60 * 60 * 24)

      getFcmToken().then(fcmToken => {
        const deviceInfo: DeviceInfo = { device: osName, fcmToken: fcmToken !== undefined ? fcmToken : null };
        mutateAsync(deviceInfo);
      })
    }
    else if (!accessToken) {
      router.replace("/login")
    }
  }, [accessToken, refreshToken])

  useEffect(() => {
    if (isSuccess) {
      JSON.parse(isFirst) === true
      ? router.replace("/join/onboarding")
      : router.replace("/home");
    }
  }, [isSuccess])

  return (
    <></>
  )
}

export default Oauth2RedirectHandler;
