import { useState } from "react";

import classes from './elements.module.scss';
import { SVG } from "./SVG/SVG";
import { Button } from ".";
import { colors } from "../../shared/style";

interface TooltipProps {
  text1: JSX.Element
  text2?: JSX.Element
}

export const Tooltip  = ({text1, text2}:TooltipProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={classes.tooltip_container} >
      <Button
        style="textPrimary"
        size="medium" 
        icon={<SVG name="help" color={colors.primary500} height="20" width="20" />}
        iconLocation="left"
        onHover={setIsHover}
      />
      {isHover &&
        <div className={classes.tooltip_box} >
          {text1} 
          {text2}
        </div>
      }
    </div>
  )
}