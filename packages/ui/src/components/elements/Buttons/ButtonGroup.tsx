import React, { useState, Children, useEffect } from "react";
import classes from "./button.module.scss";
import classNames from "classnames";
import useButtonGroup from "./hooks/useButtonGroup";

interface ButtonGroupProps {
  configuration: "filled" | "tonal" | "outlined" | "text" | "textGray";
  size?: string;
  defaultIndex?: any;
  children: JSX.Element[];
  label?: string;
  onChange: (e: any) => void;
}



export function ButtonGroup({
  configuration,
  size,
  defaultIndex,
  children,
  onChange,
  label,
}: ButtonGroupProps) {
  const { btnState, onClick } = useButtonGroup({
    defaultIndex: defaultIndex,
    childrenLength: Children.toArray(children).length,
    onChange: onChange,
  });

  return (
    <div className={classes.btnGroupBox} >
      <div className={classes.btnGroupLabel} >{label}</div>
      <div className={classNames(classes[configuration], classes.btnGroup)}>
        {Children.toArray(children).map((child: any, index: number) => {
          return (
            <>
              {React.cloneElement(child, {
                configuration: configuration,
                state: btnState[index],
                size: size,
                onClick: () => onClick(index),
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ButtonGroup;
