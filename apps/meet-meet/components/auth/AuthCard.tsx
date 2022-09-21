import { useRouter } from "next/router";
import Link from "next/link";
import { GOOGLE_AUTH_URL } from "constants/auth";
import classes from "./auth.module.scss";

import Image from "next/image";
import MeetmeetLogo from "../../public/svg/meetmeet_horizontal.svg";
// import Logo
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
  
  return (
      <CardDepth1>
        <CardDepth1.Contents>
          <div className={classes["card-contents-wrapper"]}>
            <div className={classes["card-title-wrapper"]}>
              <MeetmeetLogo width="240px" />
              <Text type="title-medium" color="on-surface-variant" style={{ fontWeight: "500" }}>젠틀에너지 회의실 예약 관리</Text>
            </div>
            <Link href={GOOGLE_AUTH_URL} passHref>
              <Button
                label={`구글로 ${byType[type].korean}하기`}
                size="large"
                configuration="filled"
                style={{width: "100%", justifyContent: "center"}}
                showIcon
                icon="google"
              />
            </Link>
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
