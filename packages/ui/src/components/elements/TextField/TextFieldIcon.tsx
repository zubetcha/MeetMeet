import classes from "./TextField.module.scss";
import classNames from "classnames";
import { TextFieldStatusUnion } from "./TextField.types";
import { SVG } from "../SVG/SVG";

export const TextFieldIcon = ({name, status = "default", isFocused, onClickIcon}: Props) => {

  return (
    <div
      className={classNames(
        classes["wrapper__input-box__children__icon"], 
        classes[`wrapper__input-box__children__icon--${status}`], 
        {[classes.focused]: isFocused}
      )}
      onClick={onClickIcon}
    >
      <SVG name={name} />
    </div>
  )
}

interface Props {
  name: string;
  status?: TextFieldStatusUnion;
  isFocused?: boolean;
  onClickIcon?: (e: React.MouseEvent<HTMLDivElement>) => void;
}