import classes from "./Card.module.scss";
import classNames from "classnames";

export const CardDepth1Main = ({children}: Props) => {

  return (
    <>
      <div className={classNames(classes["card-container"], classes["depth1"])}>
        {children}
      </div>
    </>
  )
};

export const CardDepth2Main = ({children}: Props) => {

  return (
    <>
      <div className={classNames(classes["card-container"], classes["depth2"])}>
        {children}
      </div>
    </>
  )
};

interface Props {
  children: JSX.Element[] | JSX.Element;
}