import { useState } from "react";
import classes from "./Layout.module.scss";
import classNames from "classnames";
import { navInfo } from "@shared/pageInfo";
import MeetmeetLogo from "../../../public/svg/meetmeet_horizontal.svg";
import { Navbar } from "../../ui/index";
import { useRouter } from "next/router";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const [isClose, setIsClose] = useState<boolean>(false);

  const onClickUsername = () => {
    router.push("/mypage");
  };

  return (
    <div className={classes.layoutContainer}>
      <Navbar
        isClose={isClose}
        setClose={setIsClose}
        navInfo={navInfo}
        Logo={MeetmeetLogo}
        onClickUsername={onClickUsername}
      />
      <div
        className={classNames(classes.pageBody, isClose ? classes.close : "")}
      >
        {children}
      </div>
    </div>
  );
};
