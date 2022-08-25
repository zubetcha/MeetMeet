import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetGoogleLogin } from "@hooks/queries/auth/useGetQueries";

import classes from "./auth.module.scss";

import { CardDepth1, Text, Button } from 'ui/src/pages';

export const AuthCard = ({type}: Props) => {
  const router = useRouter();
  const byType = {
    login: {
      korean: "로그인",
      routing: "회원가입",
      path: "/join",
      info: "아직 회원이 아니신가요?",
    },
    join: {
      korean: "회원가입",
      routing: "로그인",
      path: "/login",
      info: "이미 계정이 있으신가요?",
    }
  }
  
  const googleLogin = useGetGoogleLogin();

  const onClickAuth = () => {
    console.log("인증 버튼 클릭")
    googleLogin.refetch()
  }

  return (
      <CardDepth1>
        <CardDepth1.Contents>
          <div className={classes["card-contents-wrapper"]}>
            <div className={classes["card-title-wrapper"]}>
              <Text type="display-medium" style={{ fontWeight: "700" }}>MEETMEET</Text>
              <Text type="title-medium">간편한 회의실 예약 관리</Text>
            </div>
            <Button
              label={`구글로 ${byType[type].korean}하기`}
              size="large"
              configuration="filled"
              style={{width: "360px", justifyContent: "center"}}
              showIcon
              icon="google"
              onClick={onClickAuth}
            />
            <div className={classes["card-information-wrapper"]}>
              <Text color="outline">{byType[type].info}</Text>
              <Button 
                label={`${byType[type].routing}`}
                size="medium"
                configuration="textGray"
                style={{textDecoration: "underline"}}
                onClick={() => router.replace(byType[type].path)}
              />
            </div>
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
  )
}

interface Props {
  type: "login" | "join";
}
