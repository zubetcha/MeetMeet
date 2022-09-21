import { useState } from "react";
import classNames from "classnames"
import classes from "./Layout.module.scss";
import { useRecoilValue } from "recoil";

import { noticeListStatsState } from "recoil/notice";
import { NavItemType } from "ui/src/pages";


import { Alarm } from "../Alarm/Alarm";
import { SideMenu } from "./SideMenu";
import { MenuItem } from "./MenuItem";
import { SVG, Button, ButtonGroup, Text } from "ui/src/pages";
import { navInfo } from "@shared/pageInfo";

interface Props {
  isClose: boolean;
  setClose: (is: boolean) => void;
  navInfo: {
    itemList: NavItemType[];
    headerLabel?: string;
  }[];
  Logo: React.ElementType;
  onClickUsername: () => void;
  onClickLogout: () => void;
};
export const Header = ({
  isClose,
  setClose,
  navInfo,
  Logo,
  onClickUsername,
  onClickLogout
}: Props) => {
  const { totalNum } = useRecoilValue(noticeListStatsState);
  const [isOpenAlarm, setIsOpenAlarm] = useState(false);

  return (
      <>
        <div className={classNames(
          classes.m_headerContainer,
          
        )}>
          <div className={classes.iconWrapper} onClick={() => setClose(!isClose)}>
              <SVG name="menu" color="onSurfaceVariant" width="24" height="24" />
          </div>
          <div className={classes.rightBtnBox}>
            <div className={classes.iconWrapper} onClick={() => setIsOpenAlarm(!isOpenAlarm)}>
              <SVG name="alert" color="onSurfaceVariant" width="24" height="24" />
              {/* {totalNum > 0 && ( */}
                <div className={classes.numOfAlarm}>{totalNum}</div>
              {/* )} */}
            </div>
            <div className={classes.iconWrapper} onClick={onClickUsername}>
              <SVG name="user" color="onSurfaceVariant" width="24" height="24" />
            </div> 
          </div>
        </div>
        <SideMenu
          isClose={isClose}
          setClose={setClose}
          navInfo={navInfo}
          Logo={Logo}
          onClickLogout={onClickLogout}
        />
        {isOpenAlarm && (
          <div className={classes.m_alarmWrapper}>
            <Alarm isOpen={isOpenAlarm} setIsOpen={setIsOpenAlarm} />
          </div>
        )}
      </>
  )
}
