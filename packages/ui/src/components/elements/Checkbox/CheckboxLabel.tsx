import React from "react";
import classes from "./Checkbox.module.scss";

interface Props {
  style?: any;
  children: JSX.Element | string;
}

export const CheckboxLabel = ({ style, children }: Props) => {
  return (
    <div style={{ ...style }} className={classes.checkbox_label}>
      {children}
    </div>
  );
};
