import classes from "./TextField.module.scss";
import classNames from "classnames";
import { TextFieldStatusUnion } from "./TextField.types";

export const TextFieldHelperText = ({
  status = "default",
  isFocused,
  children,
}: Props) => {
  return (
    <>
      <p
        className={classNames(
          classes["wrapper__helperText"],
          classes[`wrapper__helperText--${status}`],
          { [classes.focused]: isFocused }
        )}
      >
        {children}
      </p>
    </>
  );
};

interface Props {
  status?: TextFieldStatusUnion;
  isFocused?: boolean;
  children: any;
}
