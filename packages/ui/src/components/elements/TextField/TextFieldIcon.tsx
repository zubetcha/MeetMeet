import classes from "./TextField.module.scss";
import classNames from "classnames";
import { TextFieldStatusUnion } from "./TextField.types";

export const TextFieldIcon = ({children, status = "default", isFocused, onClickIcon}: Props) => {

  return (
    <>
      <div className={classNames(classes.icon, classes[status], {[classes.focused]: isFocused})} onClick={onClickIcon}>
        {children}
      </div>
    </>
  )
}

interface Props {
  children: any;
  status?: TextFieldStatusUnion;
  isFocused?: boolean;
  onClickIcon?: (e: React.MouseEvent<HTMLDivElement>) => void;
}