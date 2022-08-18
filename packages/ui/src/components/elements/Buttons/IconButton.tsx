import React from 'react';

import classes from './button.module.scss';
import classNames from 'classnames';
import { SVG } from '..';
import { getSVGColorsByButtonStatus } from './Button.utils';


interface Props {
  configuration: string;
  size: string;
  state: string;
  negativeMood: boolean;
  icon: string;
  onClick?: () => void;
}

export const IconButton = ({
  configuration,
  size,
  state,
  negativeMood,
  icon,
  onClick
}:Props) => {
  return(
    <div className={classNames(
      classes.buttonContainer,
      classes.iconButton,
      state === 'focused' && classes.focused,
      state === 'disable' && classes.disable, 
      classes[size], 
      classes[configuration],
      negativeMood && classes.negativeMood
    )} >
      <SVG
        name={icon}
        color={getSVGColorsByButtonStatus(configuration, negativeMood, state === 'disable' ? true : false)}
      />
      <div className={classes.stateLayer} ></div>
    </div>
  )
}