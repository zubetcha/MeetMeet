
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useUrlParameter } from "ui/src/hooks/useUrlParameter";

import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/auth';

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

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      JSON.parse(isFirst) ? router.replace("/join/onboarding") : router.replace("/");
    }
    else if (!accessToken) {
      router.replace("/login")
    }
  }, [accessToken, refreshToken])

  return (
    <></>
  )
}

export default Oauth2RedirectHandler;
