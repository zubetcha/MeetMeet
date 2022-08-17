
import Image from 'next/image';
import classes from './Navbar.module.scss';
import classNames from 'classnames';
import { Button, ExitBtn } from '../../elements';

interface NavbarProps {
  close: boolean;
  setClose: React.Dispatch<boolean>
}


export const Navbar = ({close, setClose}:NavbarProps) => {


  return (
    <div className={classNames(
      classes.navbarContainer,
      close ? classes.close : ""
    )}>
      <div className={classes.exitBox}>
        <ExitBtn close={close} setClose={setClose} />
      </div>
      <div className={classes.headerContainer} >
        <div className={classes.logoutBox} >
          <Button
            size="medium"
            text="로그아웃"
            style="textWhite"
          />
        </div>
        <div className={classes.menuBox}>

        </div>
      </div>
    </div>
  )
}