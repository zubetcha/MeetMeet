import { useState, useCallback, useEffect } from "react";
import classes from "./Layout.module.scss";
import classNames from "classnames";
import { navInfo } from "@shared/pageInfo";
import MeetmeetLogo from "../../../public/svg/meetmeet_horizontal.svg";
import { Navbar } from "../../ui/index";
import { MyPageModal } from "@components/user/MyPageModal";
import { useRouter } from "next/router";
import { Modal, Button } from "../../ui/index";
import { Header } from "./Header";
import { useWindowSize } from "ui/src/hooks/useWindowSize";
import { useSSE } from "@hooks/notice/useSSE";
import { useRecoilValue } from "recoil";
import { noticeListStatsState } from "recoil/notice";
import userState from "recoil/user";
import PullToRefresh from 'react-simple-pull-to-refresh';
import { LoadingSpinner } from "../Loading/LoadingSpinner";

import { FCM_TOKEN } from "constants/firebase";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants/auth";
import { noticeStorage } from "@utils/localforage";
import { removeCookie } from "@utils/cookies";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { dynamicWidth } = useWindowSize();
  const isMobile = dynamicWidth < 768;
  const { totalNum } = useRecoilValue(noticeListStatsState);
  const userInfo = useRecoilValue(userState);

  useCallback(useSSE, [])();

  const [isClose, setIsClose] = useState<boolean>(false);
  const [isMenuClose, setIsMenuClose] = useState(true);
  const [isMyPageModal, setIsMyPageModal] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const handleLogout = async () => {
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
    await noticeStorage.removeItem(FCM_TOKEN).then(() => router.push("/login"));
  };

  const handleRefresh = useCallback(async () => {
    await window.location.reload()
  }, [])

  if (isMobile) {
    return (
      <>
        <PullToRefresh onRefresh={handleRefresh} pullDownThreshold={65} pullingContent={<></>} refreshingContent={<LoadingSpinner />}>
          <div className={classes.layoutContainer}>
            <Header
              isClose={isMenuClose}
              setClose={setIsMenuClose}
              onClickUsername={() => setIsMyPageModal(true)}
              Logo={MeetmeetLogo}
              navInfo={navInfo}
              onClickLogout={() => setIsLogoutModal(true)}
            />
            <div
              className={classNames(
                classes.pageBody,
                isClose ? classes.close : "",
              )}
            >
              {children}
            </div>
          </div>
        </PullToRefresh>
        <div className={!isMenuClose ? classes.overlay : classes.transparent} onClick={() => setIsMenuClose(true)}></div>
        {isMyPageModal && <MyPageModal isModal={isMyPageModal} setIsModal={setIsMyPageModal} />}
        {isLogoutModal && (
          <Modal setIsOpen={setIsLogoutModal}>
            <Modal.Icon name="error" color="warning" />
            <Modal.Contents>
              <div className={classes["modal-contents-wrapper"]}>
                <Modal.Title>로그아웃 하시겠습니까?</Modal.Title>
                <Modal.Description>로그아웃 시 로그인 화면으로 이동합니다.</Modal.Description>
              </div>
            </Modal.Contents>
            <Modal.Buttons>
              <Button
                label="취소"
                size="large"
                configuration="textGray"
                state="default"
                onClick={() => setIsLogoutModal(false)}
              />
              <Button
                label="로그아웃"
                size="large"
                configuration="filled"
                state="default"
                onClick={handleLogout}
              />
            </Modal.Buttons>
          </Modal>
        )}
      </>
    )
  }
  
  return (
    <>
      <div className={classes.layoutContainer}>
        <Navbar
          isClose={isClose}
          setClose={setIsClose}
          navInfo={navInfo}
          Logo={MeetmeetLogo}
          onClickUsername={() => setIsMyPageModal(true)}
          onClickLogout={() => setIsLogoutModal(true)}
          onClickLogo={() => router.push("/")}
          totalNum={totalNum}
          userInfo={userInfo}
        />
        <div
          className={classNames(
            classes.pageBody,
            isClose ? classes.close : "",
          )}
        >
          {children}
        </div>
      </div>
      {isMyPageModal && <MyPageModal isModal={isMyPageModal} setIsModal={setIsMyPageModal} />}
      {isLogoutModal && (
        <Modal setIsOpen={setIsLogoutModal}>
          <Modal.Icon name="error" color="warning" />
          <Modal.Contents>
            <div className={classes["modal-contents-wrapper"]}>
              <Modal.Title>로그아웃 하시겠습니까?</Modal.Title>
              <Modal.Description>로그아웃 시 로그인 화면으로 이동합니다.</Modal.Description>
            </div>
          </Modal.Contents>
          <Modal.Buttons>
            <Button
              label="취소"
              size="large"
              configuration="textGray"
              state="default"
              onClick={() => setIsLogoutModal(false)}
            />
            <Button
              label="로그아웃"
              size="large"
              configuration="filled"
              state="default"
              onClick={handleLogout}
            />
          </Modal.Buttons>
        </Modal>
      )}
    </>
  );
};
