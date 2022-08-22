import classes from "./Card.module.scss";
import classNames from "classnames";

export const CardDepth1Contents = ({children}: Props) => {

  return (
    <div className={classNames(
      classes["card-contents"],
      classes["depth1"]
      )}
    >
      {children}
    </div>
  )
}

export const CardDepth2Contents = ({children}: Props) => {

  return (
    <div className={classNames(
      classes["card-contents"],
      classes["depth2"]
      )}
    >
      {children}
    </div>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element;
}
