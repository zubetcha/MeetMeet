import classes from "./Card.module.scss";
import classNames from "classnames";
import { CardDepth1Title, CardDepth2Title } from "./CardTitle";
import { IconButton } from "../Buttons/IconButton";
import { getCardTitleContents, getComponentType } from "./Card.utils";

export const CardDepth1TitleBar = ({children}: Props) => {

  const CardDepth1TitleType = getComponentType(<CardDepth1Title />);
  const IconButtonType = getComponentType(<IconButton size="small" negativeMood={false} state="default" configuration="text" icon="" />);

  const cardTitle = getCardTitleContents(children, CardDepth1TitleType);
  const iconButton = getCardTitleContents(children, IconButtonType);

  return (
    <div className={classNames(
      classes["title-bar"],
      classes["depth1"]
      )}
    >
      {/* <div>
        {cardTitle && (
          {cardTitle}
        )}
      </div>
      <div className={classes["title-buttons"]}>
        {iconButton && (
          {iconButton}
        )}
      </div> */}
    </div>
  )
}

export const CardDepth2TitleBar = ({children}: Props) => {

  const CardDepth2TitleType = getComponentType(<CardDepth2Title />);
  const IconButtonType = getComponentType(<IconButton size="small" negativeMood={false} state="default" configuration="text" icon="" />);

  const cardTitle = getCardTitleContents(children, CardDepth2TitleType);
  const iconButton = getCardTitleContents(children, IconButtonType);

  return (
    <div className={classNames(
      classes["title-bar"],
      classes["depth2"]
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
}