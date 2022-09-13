import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetUserInfo } from "@hooks/queries/user/useGetQueries";

import { ACCESS_TOKEN } from "constants/auth";

export const RouterGuard = ({ children }: Props) => {
  const router = useRouter();
  const exceptionList = [
    "/login",
    "/join",
    "/join/onboarding",
    "/oauth/redirect",
  ];
  const { refetch } = useGetUserInfo();

  // DESCRIBE: 웹스토리지 토큰 유무 여부 확인
  const checkAuth = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken) {
      router.replace("/login");
      return;
    } else if (accessToken) {
      handleUserInfo();
    }
  };

  // DESCRIBE: 토큰으로 받은 유저 정보에 유저 이름, 전화번호, 소속 부서 중에 하나라도 없을 경우 온보딩 페이지로 리다이렉트
  const handleUserInfo = () => {
    refetch().then(({ data }) => {
      console.log(data);
      const { name, department, phone } = data?.data;

      if (!name || !department || !phone) {
        router.replace("/join/onboarding");
        return;
      }
    });
  };

  useEffect(() => {
    // DESCRIBE: 토큰 확인이 필요 없는 페이지의 경우에만 checkAuth 함수 실행
    if (!exceptionList.includes(router.pathname)) {
      checkAuth();
    }
  }, []);

  return <>{children}</>;
};

interface Props {
  children: JSX.Element[] | JSX.Element;
}
