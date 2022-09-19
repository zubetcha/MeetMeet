import { useState } from "react";
import classNames from "classnames"
import classes from "./Layout.module.scss";
import { NavItemType } from "ui/src/pages";

import { Alarm } from "../Alarm/Alarm";
import { NavSection } from "ui/src/pages";
import { SVG, Button, ButtonGroup, Text } from "ui/src/pages";

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
export const Header = ({ isClose, setClose, navInfo, Logo, onClickUsername, onClickLogout }: Props) => {
  const [isOpenAlarm, setIsOpenAlarm] = useState(false);


  return (
      <>
        <div className={classNames(
          classes.m_headerContainer,
          
        )}>
          <div className={classes.iconWrapper} onClick={() => setClose(!isClose)}>
              <SVG name="menu" color="primary" width="24" height="24" />
          </div>
          <div className={classes.rightBtnBox}>
            <div className={classes.iconWrapper} onClick={() => setIsOpenAlarm(!isOpenAlarm)}>
              <SVG name="alert" color="primary" width="24" height="24" />
            </div>
            <div className={classes.iconWrapper} onClick={onClickUsername}>
              <SVG name="user" color="primary" width="24" height="24" />
            </div> 
          </div>
        </div>
        {isOpenAlarm && (
          <div className={classes.m_alarmWrapper}>
            <Alarm isOpen={isOpenAlarm} setIsOpen={setIsOpenAlarm} />
          </div>
        )}
        <div className={classNames(classes.m_menuContainer, isClose ? classes.close : classes.open)}>
          <div className={classes.m_menuWrapper}>
            <div className={classes.m_topBtnWrapper}>
              <div className={classes.iconWrapper} onClick={() => setClose(!isClose)}>
                <SVG name="menuOpened" color="primary" width="24" height="24" />
              </div>
              <Button size="medium" label="로그아웃" configuration="text" onClick={onClickLogout} />
            </div>
            <div className={classes.logoLayout}>
              <Logo width="140px" />
              <Text type="title-medium" color="primary">젠틀에너지</Text>
            </div>
            <div>
              {navInfo.map((info, idx) => {
                return (
                  <NavSection
                    headerLabel={info.headerLabel && info.headerLabel}
                    itemList={info.itemList}
                    key={`navSection_${idx}`}
                  />
                );
              })}
            </div>
          </div>

          <ButtonGroup
            configuration="text"
            size="medium"
            defaultIndex={0}
            label="화면 모드"
            onChange={(selectedIndex) => {
              selectedIndex === 0
                ? document.documentElement.setAttribute("data-theme", "light")
                : document.documentElement.setAttribute("data-theme", "dark");
            }}
          >
            <Button label="라이트" key={`button-group-라이트`} />
            <Button label="다크" key={`button-group-다크`} />
          </ButtonGroup>
        </div>
      </>
  )
}
