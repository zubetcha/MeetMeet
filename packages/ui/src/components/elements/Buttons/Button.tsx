import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

import RotateIcon from "../../../assets/img/rotate-icon.png";
import classes from "./button.module.scss";
import classNames from "classnames";
import { getSVGColorsByButtonStatus } from "./Button.utils";
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
          color={getSVGColorsByButtonStatus(configuration, negativeMood, state === 'disable' ? true : false)} 
        />}
        
        {label}
      
      {showRightIcon && 
        <SVG 
          name="downward" 
          color={getSVGColorsByButtonStatus(configuration, negativeMood, state === 'disable' ? true : false)}
        />}
      <div className={classes.stateLayer} ></div>
    </button>
  );
};