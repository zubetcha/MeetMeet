import { useRef, useEffect } from "react";
import classes from "./TextField.module.scss";
import classNames from "classnames";
import { TextFieldStatusUnion } from "./TextField.types";

export const TextFieldTextarea = ({
  name,
  status = "default",
  value,
  placeholder,
  maxLength,
  onChange,
  autoFocus,
  isFocused,
  setIsFocused,
}: Props) => {
  const textareaElement = useRef(null as any);

  useEffect(() => {
    if (textareaElement.current && autoFocus) {
      textareaElement.current.focus();
    }
  }, []);

  return (
    <>
      <div className={classes["wrapper__textarea-box"]}>
        <textarea
          className={classNames(
            classes["wrapper__input-box__textarea"],
            classes[`wrapper__input-box__textarea--${status}`], {
            [classes.focused]: isFocused,
          })}
          name={name}
          value={value}
          onFocus={() => setIsFocused && setIsFocused(true)}
          onBlur={() => setIsFocused && setIsFocused(false)}
          disabled={status == "disable" || status == "fixed" ? true : false}
          onChange={onChange}
          placeholder={isFocused ? "" : placeholder}
          maxLength={maxLength as number}
          ref={textareaElement}
          autoComplete="off"
        />
      </div>
    </>
  );
};

interface Props {
  value: string;
  status?: TextFieldStatusUnion;
  isFocused?: boolean;
  setIsFocused?: (focused: boolean) => void;
  autoFocus?: boolean;
  maxLength?: number;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
}
