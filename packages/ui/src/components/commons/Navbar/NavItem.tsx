import { useState } from "react";
import classes from "./Navbar.module.scss";
import { NavItemType } from "..";
import classNames from "classnames";
import { useRouter } from "next/router";
import { SVG } from "../../elements";

interface Props {
  item: NavItemType;
  isClose: boolean;
}

export const NavItem = ({ item, isClose }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className={classNames(
            classes.NavItem,
            router.pathname === `/${item.path}` && classes.focused
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
          </div>
          <div className={classes.label}>{item.label}</div>
          <div className={classes.rightElement}>{item.rightElement}</div>
          <div className={classes.stateLayer}></div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: isClose ? "80px" : "180px",
            zIndex: "100",
            transition: "left 0.3s ease-in-out",
          }}
        >
          {item.isModal && item.Modal && item.Modal(isOpen)}{" "}
        </div>
      </div>
    </>
  );
};
