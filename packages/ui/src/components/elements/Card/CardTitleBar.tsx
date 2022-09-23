import classes from "./Card.module.scss";
import classNames from "classnames";
import { getCardTitleContents } from "./Card.utils";

export const CardDepth1TitleBar = ({children}: Props) => {
  const cardTitle = getCardTitleContents(children, "CardDepth1Title");
  const cardIconButtons = getCardTitleContents(children, "IconButton");
  const cardButtons = getCardTitleContents(children, "Button");

  return (
    <div className={classNames(
      classes["title-bar"],
      classes["depth1"]
      )}
    >
      {children}
      {/* <div>
        {cardTitle && cardTitle}
      </div>
      <div className={classes["title-buttons"]}>
        {cardButtons && cardButtons}
        {cardIconButtons && cardIconButtons}
      </div> */}
    </div>
  )
}

export const CardDepth2TitleBar = ({children}: Props) => {
  const cardTitle = getCardTitleContents(children, "CardDepth2Title")
  const cardIconButtons = getCardTitleContents(children, "IconButton")

  return (
    <div className={classNames(
      classes["title-bar"],
      classes["depth2"]
      )}
    >
      {children}
      {/* <div>
        {cardTitle && cardTitle}
      </div>
      <div className={classes["title-buttons"]}>
        {cardIconButtons && cardIconButtons}
      </div> */}
    </div>
  )
}

interface Props {
  children: JSX.Element[] | any;
}