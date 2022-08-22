import classes from './Navbar.module.scss';
import { NavItemType } from '..';
import classNames from 'classnames';
import { SVG } from '../../elements';

interface Props {
  item: NavItemType;
}

export const NavItem = ({
  item
}:Props) => {
  return (
    <div className={classes.NavItem} >
      <div className={classes.icon} ><SVG width="24px" height="24px" name={item.icon} color="onSurfaceVariant"/></div>
      <div className={classes.label}>{item.label}</div>
      <div className={classes.rightElement} >{item.rightElement}</div>
    </div>
  )
}