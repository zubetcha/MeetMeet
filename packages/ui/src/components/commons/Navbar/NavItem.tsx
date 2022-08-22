import classes from './Navbar.module.scss';
import { NavItemType } from '..';
import classNames from 'classnames';
import { SVG } from '../../elements';

interface Props {
  item: NavItemType;
  isFocused: boolean;
}

export const NavItem = ({
  item,
  isFocused
}:Props) => {
  return (
    <div className={classNames(classes.NavItem, isFocused && classes.focused)} >
      <div className={classes.icon} ><SVG width="24px" height="24px" name={item.icon} color="onSurfaceVariant"/></div>
      <div className={classes.label}>{item.label}</div>
      <div className={classes.rightElement} >{item.rightElement}</div>
      <div className={classes.stateLayer} ></div>
    </div>
  )
}