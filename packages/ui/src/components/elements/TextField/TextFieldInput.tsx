import { useRef, useEffect, Children, cloneElement } from "react";
import classes from "./TextField.module.scss";
import classNames from "classnames";
import { TextFieldStatusUnion } from "./TextField.types";

export const TextFieldInput = ({
  type,
  name,
  status = "default",
  value,
  placeholder,
  maxLength,
  onChange,
  autoFocus,
  isFocused,
  setIsFocused,
  children,
}: Props) => {
  const inputElement = useRef(null as any);

  useEffect(() => {
    if (inputElement.current && autoFocus) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <div className={classes["wrapper__input-box"]}>
      <input
        className={classNames(
          classes["wrapper__input-box__input"],
          classes[`wrapper__input-box__input--${status}`], {
          [classes.focused]: isFocused,
        })}
        type={type}
        name={name}
        value={value}
        onFocus={() => setIsFocused && setIsFocused(true)}
        onBlur={() => setIsFocused && setIsFocused(false)}
        disabled={status == "disable" || status == "fixed" ? true : false}
        onChange={onChange}
        placeholder={isFocused ? "" : placeholder}
        maxLength={maxLength as number}
        ref={inputElement}
        autoComplete="off"
      />
      <div className={classes["wrapper__input-box__children"]}>
        {Children.toArray(children).map((child: any, i) => {
          return cloneElement(child, {
              key: i,
              status,
              isFocused,
            })
        })}
      </div>
    </div>
  );
};

interface Props {
  type: string;
  value: string;
  status?: TextFieldStatusUnion;
  isFocused?: boolean;
  setIsFocused?: (focused: boolean) => void;
  children?: any;
  autoFocus?: boolean;
  maxLength?: number;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
}
