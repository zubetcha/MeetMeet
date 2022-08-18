import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

import RotateIcon from "../../../assets/img/rotate-icon.png";
import classes from "./button.module.scss";
import classNames from "classnames";
import { getSVGColorsByButtonStatus, getSVGSizeByButtonSize } from "./Button.utils";
import { SVG } from "..";
interface ButtonProps {
  configuration: string;
  size: string;
  state: string;
  negativeMood?: boolean;
  showIcon: boolean;
  icon?: string;
  label: string;
  showRightIcon: boolean;
  onClick?: () => void;
}


export const Button = ({
  label,
  size,
  configuration,
  state,
  negativeMood = false,
  showIcon,
  icon="",
  showRightIcon,
  onClick
}:ButtonProps) => {

  const [btnState, setbtnState] = useState(state);
  const { width: iconWidth, height: iconHeight } = getSVGSizeByButtonSize(size);
  const iconColor = getSVGColorsByButtonStatus(configuration, negativeMood, state === 'disable' ? true : false)

  return (
    <button 
      className={classNames(
        classes.buttonContainer,
        classes.button,
        state === 'focused' && classes.focused,
        state === 'disable' && classes.disable, 
        classes[size], 
        classes[configuration],
        negativeMood && classes.negativeMood
      )}
      onClick={onClick}
    >
      {showIcon && 
        <SVG 
          name={icon} 
          color={iconColor} 
          width={iconWidth}
          height={iconHeight}
        />}
        
        {label}
      
      {showRightIcon && 
        <SVG 
          name="downward" 
          color={iconColor}
          width={iconWidth}
          height={iconHeight}
        />}
      <div className={classes.stateLayer} ></div>
    </button>
  );
};