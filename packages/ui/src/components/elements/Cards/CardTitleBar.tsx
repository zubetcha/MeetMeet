import { Children, isValidElement, ReactNode } from "react";
import classes from "./Card.module.scss";
import classNames from "classnames";
import { CardTitle } from "./CardTitle";
import { IconButton } from "../Buttons/IconButton";

export const CardTitleBar = ({children, depth}: Props) => {

  const CardTitleType = (<CardTitle />).type;
  const IconButtonType = (<IconButton size="small" negativeMood={false} state="default" configuration="text" icon="" />).type;

  const getCardTitleContents = (children: ReactNode, type: any) => {
    const childrenArray = Children.toArray(children);
    const cardContents = childrenArray.filter((child) => isValidElement(child) && child.type === type);

    return cardContents;
  }

  const cardTitle = getCardTitleContents(children, CardTitleType);
  const iconButton = getCardTitleContents(children, IconButtonType);


  return (
    <div className={classNames(
      classes["title-bar"],
      classes[`depth${depth}`]
      )}
    >
      <div>
        {cardTitle && (
          {cardTitle}
        )}
      </div>
      <div className={classes["title-buttons"]}>
        {iconButton && (
          {iconButton}
        )}
      </div>
    </div>
  )
}

interface Props {
  children: JSX.Element[] | any;
  depth: string;
}