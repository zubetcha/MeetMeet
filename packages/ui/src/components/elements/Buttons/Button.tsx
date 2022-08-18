import React, { useEffect, useState, useCallback } from "react";
import classes from "./button.module.scss";
import classNames from "classnames";
import { getSVGColorsByButtonStatus } from "../../../utils/getColors";
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
          color={getSVGColorsByButtonStatus(
            configuration as ConfigurationType,
            negativeMood,
            state === "disable" ? true : false
          )}
        />
      )}

      {label}

      {showRightIcon && (
        <SVG
          name="downward"
          color={getSVGColorsByButtonStatus(
            configuration as ConfigurationType,
            negativeMood,
            state === "disable" ? true : false
          )}
        />
      )}
      <div className={classes.stateLayer}></div>
    </button>
  );
};
