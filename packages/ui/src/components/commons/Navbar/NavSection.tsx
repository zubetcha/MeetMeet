import classes from "./Navbar.module.scss";
import { NavItem } from "..";
import React from "react";

export type NavItemType = {
  icon: string;
  label: string;
  rightElement?: JSX.Element;
  path: string;
  isModal: boolean;
  Modal?: (isOpen: boolean) => JSX.Element;
};

interface Props {
  headerLabel?: string;
  itemList: NavItemType[];
}

export const NavSection = ({ headerLabel, itemList }: Props) => {
  return (
    <div className={classes.NavSectionBox}>
      {headerLabel && (
        <div className={classes.sectionHeader}>
          <div className={classes.divider}></div>
          <div className={classes.label}>{headerLabel}</div>
        </div>
      )}
      {itemList.map((item, idx) => {
        return <NavItem item={item} key={`NavItem'_${idx}`} />;
      })}
    </div>
  );
};