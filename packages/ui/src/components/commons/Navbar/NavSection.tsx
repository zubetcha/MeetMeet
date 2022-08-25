import classes from "./Navbar.module.scss";
import { NavItem } from "..";
import classNames from "classnames";
import { SetStateAction } from "react";
import React from "react";

export type NavItemType = {
  icon: string;
  label: string;
  rightElement?: JSX.Element;
  path: string;
  isModal: boolean;
  Modal?: (isOpen?: boolean) => JSX.Element;
};

interface Props {
  headerLabel?: string;
  itemList: NavItemType[];
  isClose: boolean;
}

export const NavSection = ({ headerLabel, itemList, isClose }: Props) => {
  return (
    <div className={classes.NavSectionBox}>
      {headerLabel && (
        <div className={classes.sectionHeader}>
          <div className={classes.divider}></div>
          <div className={classes.label}>{headerLabel}</div>
        </div>
      )}
      {itemList.map((item, idx) => {
        return (
          <NavItem item={item} isClose={isClose} key={`NavItem'_${idx}`} />
        );
      })}
    </div>
  );
};
