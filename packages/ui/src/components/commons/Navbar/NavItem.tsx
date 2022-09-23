import { useState } from "react";
import classes from "./Navbar.module.scss";
import { NavItemType } from "..";
import classNames from "classnames";
import { useRouter } from "next/router";
import { SVG } from "../../elements";
import { useOutsideAlerter } from "ui/src/hooks/useOutsideAlerter";

interface Props {
  item: NavItemType;
  totalNum: number;
}

export const NavItem = ({ item, totalNum }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isFocused =
    (item.isModal && isOpen) || router.pathname === `/${item.path}`;

  const { ref } = useOutsideAlerter(() => setIsOpen(false));

  return (
    <>
      <div style={{ position: "relative" }} ref={ref}>
        <div
          className={classNames(
            classes.NavItem,
            isFocused && classes.focused
            // classes.focused
          )}
          onClick={() => {
            if (item.isModal) {
              setIsOpen(!isOpen);
            }
            item.isModal || router.push(`/${item.path}`);
          }}
        >
          <div className={classes.icon}>
            <SVG
              width="24px"
              height="24px"
              name={item.icon}
              color="onSurfaceVariant"
            />
            {item.icon === "alert" && totalNum > 0 && (
              <div className={classes.numOfAlarm}>{totalNum}</div>
            )}
          </div>
          <div className={classes.label}>{item.label}</div>
          <div className={classes.rightElement}>{item.rightElement}</div>
          <div className={classes.stateLayer}></div>
        </div>
        <div className={classes.modalItem}>
          {item.isModal && item.Modal && item.Modal({ isOpen, setIsOpen })}{" "}
        </div>
      </div>
    </>
  );
};
