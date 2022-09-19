import React from "react";

import classes from "./button.module.scss";
import classNames from "classnames";
import { SVG } from "..";
import {
  getSVGColorsByButtonStatus,
  getSVGSizeByButtonSize,
} from "./Button.utils";

interface Props {
  configuration: string;
  size: string;
  state: string;
  negativeMood?: boolean;
  icon: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const IconButton = ({
  configuration,
  size,
  state,
  negativeMood = false,
  icon,
  color,
  onClick,
}: Props) => {
  const { width: iconWidth, height: iconHeight } = getSVGSizeByButtonSize(size);
  const iconColor = getSVGColorsByButtonStatus(
    configuration,
    negativeMood,
    state === "disable" ? true : false
  );

  return (
    <div
      className={classNames(
        classes.buttonContainer,
        classes.iconButton,
        state === "focused" && classes.focused,
        state === "disable" && classes.disable,
        classes[size],
        classes[configuration],
        negativeMood && classes.negativeMood
      )}
      onClick={onClick}
    >
      <SVG
        name={icon}
        color={color || iconColor}
        width={iconWidth}
        height={iconHeight}
      />
      <div className={classes.stateLayer}></div>
    </div>
  );
};