
import Image from 'next/image';
import classes from './Navbar.module.scss';
import classNames from 'classnames';
import { Button, ExitBtn } from '../../elements';
import { NavItemType, NavSection } from '..';

interface NavbarProps {
  isClose: boolean;
  setClose: React.Dispatch<boolean>
  navInfo: {
    itemList:NavItemType[];
    headerLabel?:string;
  }[]
}




export const Navbar = ({isClose, setClose, navInfo}:NavbarProps) => {

  

  const itemList = [
    {
      icon: "calendar",
      label: "알림 내역",
    },
    {
      icon: "calendar",
      label: "알림 내역",
    },
    {
      icon: "calendar",
      label: "알림 내역",
    },
  ]

  return (
    <div className={classNames(
      classes.navbarContainer,
      isClose ? classes.close : ""
    )}>
      <div className={classes.topBtnLayout}>
        <div className={classes.exitBtnBox} >
          <ExitBtn isClose={isClose} setClose={setClose}/>
        </div>
        <div className={classes.rightBtnBox}>
          <Button
            size="small"
            label="홍길동"
            configuration="text"
          />
          <Button
            size="small"
            label="로그아웃"
            configuration="text"
          />
        </div>
      </div>
      <div className={classes.logoLayout} >

      </div>
      <div className={classes.menuLayout} >
        {navInfo.map((info, idx) => {
          return (
            <NavSection headerLabel={info.headerLabel && info.headerLabel} itemList={info.itemList} key={`navSection_${idx}`} />
          )
        })}
      </div>
    </div>
  )
}