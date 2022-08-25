import classNames from "classnames";
import classes from './Cell.module.scss'

interface Props {
  state?: 'default' | 'hover' | 'focused' | 'disable' | 'focusedStartEnd';
  label?: string | number;
  labelColor?: 'default' | 'error' | 'tertiary';
  isHover?: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  style?: any; 
}



export const Cell = ({
  state = 'default',
  label,
  style,
  labelColor = 'default',
  onClick,
  onMouseLeave,
  onMouseOver,
  isHover = false,
}:Props) => {

  return (
    <div 
      className={classNames(classes.cellContainer, classes[state], classes[labelColor], isHover && classes.isHover)}
      style={{...style}}
    >
      <div className={classes.cellText}>
        {label}
      </div>
      <div 
        className={classes.stateLayer}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave} 
      > 
      </div>
    </div>
  )
}