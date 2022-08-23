import classes from "./Card.module.scss";
import classNames from "classnames";

export const CardContents = ({children, depth}: Props) => {

  return (
    <div className={classNames(
      classes["card-contents"],
      classes[`depth${depth}`]
      )}
    >
      {children}
    </div>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element;
  depth: string;
}