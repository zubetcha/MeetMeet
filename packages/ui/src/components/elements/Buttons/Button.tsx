import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

import RotateIcon from "../../../assets/img/rotate-icon.png";
import classes from "./button.module.scss";
import classNames from "classnames";
interface ButtonProps {
  configuration: string;
  size: string;
  state: string;
  negativeMood?: boolean;
  showIcon: boolean;
  icon?: string;
  label: string;
  showRightIcon: boolean;
}


export const Button = ({
  label,
  size,
  configuration,
  state,
  negativeMood = false,
  showIcon,
  icon,
  showRightIcon,          
}:ButtonProps) => {

  const [btnState, setbtnState] = useState(state);

  return (
    <button className={classNames(
      classes.buttonContainer, 
      classes[state], 
      classes[size], 
      classes[configuration],
      negativeMood && classes.negativeMood
      )}>
        {label}
    </button>
  );
};