import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useGetUserInfo } from "@hooks/queries/user/useGetQueries";
import { getCookie } from "@utils/cookies";
import userState from "recoil/user";
import { useRecoilValue } from "recoil";

import { Modal } from "ui/src/pages";
import { ACCESS_TOKEN } from "constants/auth";

export const RouterGuard = ({ children }: Props) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userState)
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [sec, setSec] = useState(3);
  // const sec = useRef(3);
  const { id: accountId } = useRecoilValue(userState);
  const exceptionList = [
    "/login",
    "/join",
    "/join/onboarding",
    "/oauth/redirect",
  ];
  const { refetch } = useGetUserInfo();

  // DESCRIBE: 웹스토리지 토큰 유무 여부 확인
  const checkAuth = () => {
    const accessToken = getCookie(ACCESS_TOKEN);

    if (!accessToken) {
      return handleRedirect();
    } else if (accessToken) {
      handleUserInfo();
    }
  };

  const handleRedirect = () => {
    setIsAlertModal(true);

    setTimeout(() => {
      setIsAlertModal(false);
      router.replace("/login");
    }, 3000)
  }

  // DESCRIBE: 토큰으로 받은 유저 정보에 유저 이름, 전화번호, 소속 부서 중에 하나라도 없을 경우 온보딩 페이지로 리다이렉트
  const handleUserInfo = () => {
    refetch().then(({ data }) => {
      const { name, department, phone } = data?.data;

      if (!name || !department || !phone) {
        router.replace("/join/onboarding");
        return;
      }
      setUserInfo(data?.data);
    }).catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isAlertModal) {
      const interval = setInterval(() => {
        setSec(prev => prev - 1);
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [isAlertModal])

  useLayoutEffect(() => {
    // DESCRIBE: 토큰이 필요한 페이지로 이동하려고 하는 경우 checkAuth 함수 실행 
    router.events.on("routeChangeStart", (nextPath) => {
      if (!exceptionList.includes(nextPath)) {
        checkAuth();
      }
    });
  }, []);

  // DESCRIBE: 새로고침해서 recoil에 있는 유저 정보 초기화된 경우 checkAuth 함수 실행 
  useLayoutEffect(() => {
    if (!accountId && !exceptionList.includes(router.pathname)) {
      checkAuth();
    }
  }, [])

  return (
    <>
      {children}
      {isAlertModal && (
        <Modal>
          <Modal.Icon name="error" color="warning" />
          <Modal.Contents>
              <Modal.Title>로그인이 만료되었습니다.</Modal.Title>
              <Modal.Description><b>{sec}초</b> 후 로그인 화면으로 이동합니다.</Modal.Description>
          </Modal.Contents>
        </Modal>
      )}
    </>
  );
};

interface Props {
  children: JSX.Element[] | JSX.Element;
}
