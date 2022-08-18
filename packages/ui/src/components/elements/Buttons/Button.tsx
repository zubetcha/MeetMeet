import React, { useEffect, useState, useCallback } from "react";
import classes from "./button.module.scss";
import classNames from "classnames";
import { getSVGColorsByButtonStatus, getSVGSizeByButtonSize } from "./Button.utils";
import { SVG } from "..";
import { ConfigurationType, StateType } from "./types/button.types";

interface ButtonProps {
  configuration?: ConfigurationType;
  size?: string;
  state?: StateType;
  negativeMood?: boolean;
  showIcon?: boolean;
  icon?: string;
  label: string;
  showRightIcon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: any;
}

export const Button = ({
  label,
  size,
  configuration,
  state,
  negativeMood = false,
  showIcon,
  icon = "",
  showRightIcon,
  onClick = () => {},
  style,
}: ButtonProps) => {
  const [btnState, setbtnState] = useState(state);
  const { width: iconWidth, height: iconHeight } = getSVGSizeByButtonSize(size as string);
  const iconColor = getSVGColorsByButtonStatus(configuration as ConfigurationType, negativeMood, state === 'disable' ? true : false)

  return (
    <button
      className={classNames(
        classes.buttonContainer,
        classes.button,
        state === "focused" && classes.focused,
        state === "disable" && classes.disable,
        classes[size as string],
        classes[configuration as ConfigurationType],
        negativeMood && classes.negativeMood
      )}
      onClick={onClick}
      style={{ ...style }}
    >
      {showIcon && (
        <SVG
          name={icon}
          color={iconColor}
          width={iconWidth}
          height={iconHeight}
        />
      )}

      {label}

      {showRightIcon && (
        <SVG
          name="downward"
          color={iconColor}
          width={iconWidth}
          height={iconHeight}
        />
      )}
      <div className={classes.stateLayer}></div>
    </button>
  );
};
