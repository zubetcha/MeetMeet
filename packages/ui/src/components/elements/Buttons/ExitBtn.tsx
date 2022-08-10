import React, { useState } from "react";
import classes from "./button.module.scss";
import classNames from "classnames";
import { ExitToBurgerProps } from "../../../types/ui.types";

// $TODO: 버튼 length에따라서
export const ExitBtn: React.FC<ExitToBurgerProps> = ({ close, setClose }) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      onClick={() => {
        setOpen(open ? false : true);
        setClose(close ? false : true);
      }}
      className={classes.exitToBurgerContainer}
    >
      <div className={classNames(classes.exitBtn, open ? classes.open : "")}>
        <div className={classNames(classes.stick, classes.stick1)}></div>
        <div className={classNames(classes.stick, classes.stick2)}></div>
        <div className={classNames(classes.stick, classes.stick3)}></div>
      </div>
    </div>
  );
};
