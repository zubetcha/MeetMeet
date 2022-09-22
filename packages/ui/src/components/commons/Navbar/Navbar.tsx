
import classes from "./Navbar.module.scss";
import classNames from "classnames";
import { Button, ButtonGroup, ExitBtn, IconButton, SVG } from "../../elements";
import { NavItemType, NavSection } from "..";

interface NavbarProps {
  isClose: boolean;
  setClose: React.Dispatch<boolean>;
  navInfo: {
    itemList: NavItemType[];
    headerLabel?: string;
  }[];
  Logo: React.ElementType;
  onClickUsername: () => void;
  onClickLogout: () => void;
  totalNum: number;
}

export const Navbar = ({
  isClose,
  setClose,
  navInfo,
  Logo,
  onClickUsername,
  onClickLogout,
  totalNum
}: NavbarProps) => {

  return (
    <div
      className={classNames(
        classes.navbarContainer,
        isClose ? classes.close : ""
      )}
    >
      <div className={classes.topBtnLayout}>
        <div className={classes.exitBtnBox}>
          <ExitBtn isClose={isClose} setClose={setClose} />
        </div>
        <div className={classes.rightBtnBox}>
          <Button
            size="small"
            label="홍길동"
            configuration="text"
            onClick={onClickUsername}
          />
          <Button size="small" label="로그아웃" configuration="text" onClick={onClickLogout} />
        </div>
      </div>
      <div className={classes.logoLayout}>
        <Logo width="140px" />
        <div className={classes.customerName}>젠틀에너지</div>
      </div>
      <div className={classes.menuLayout}>
        {navInfo.map((info, idx) => {
          return (
            <NavSection
              headerLabel={info.headerLabel && info.headerLabel}
              itemList={info.itemList}
              key={`navSection_${idx}`}
              totalNum={totalNum}
            />
          );
        })}
      </div>
      <div className={classes.lightDarkLayout}>
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
    </div>
  );
};
