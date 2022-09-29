import { useRouter } from "next/router";
import classes from "./Layout.module.scss";
import classNames from "classnames";

import { NavItemType } from "ui/src/pages";
import { MenuItem } from "./MenuItem";
import { SVG, Button, Text, ButtonGroup } from "ui/src/pages";

interface Props {
  isClose: boolean;
  setClose: (is: boolean) => void;
  navInfo: {
    itemList: NavItemType[];
    headerLabel?: string;
  }[];
  Logo: React.ElementType;
  onClickLogout: () => void;
}

export const SideMenu = ({
  isClose,
  setClose,
  navInfo, 
  Logo,
  onClickLogout,
}: Props) => {
  const router = useRouter();
  const menuList = navInfo[0].itemList.filter(info => info.icon !== "alert");

  return (
    <>
      <div className={classNames(classes.m_menuContainer, isClose ? classes.close : classes.open)}>
        <div className={classes.m_menuWrapper}>
          <div className={classes.m_topBtnWrapper}>
            <div className={classes.iconWrapper} onClick={() => setClose(!isClose)}>
              <SVG name="menuOpened" color="primary" width="24" height="24" />
            </div>
            <Button size="medium" label="로그아웃" configuration="text" onClick={onClickLogout} />
          </div>
          <div className={classes.logoLayout}>
            <div onClick={() => {
              router.push("/")
              setClose(true)
            }} style={{ cursor: "pointer" }}>
              <Logo width="140px" />
            </div>
            <Text type="title-medium" color="primary">젠틀에너지</Text>
          </div>
          <div className={classes.menuList_wrapper}>
            {menuList.map((menu, idx) => {
              return (
                <MenuItem key={menu.icon} menuInfo={menu} setClose={setClose}/>
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
