import React, { useEffect, useState, useRef } from "react";

import classes from "./TextField.module.scss";
import classNames from "classnames";

/**
 *
 * @param type input 태그 type
 * @param name input 태그 name
 * @param label input 태그 label
 * @param placeholder input 태그 placeholder
 * @param value input 태그 value
 * @param helperText 버튼 클릭 전 또는 클릭 후 결과에 따른 안내
 * @param status , value = dafault || nice || danger || disable
 * @param icon input 필드에 아이콘이 들어가는지, value = true || false
 * @param onChange Input value onChange 함수
 * @returns
 */

export const TextField = ({
  type,
  name,
  value,
  status,
  placeholder,
  maxLength,
  autoFocus,
  labelText = "",
  helperText = "",
  icon,
  unitText,
  onChange,
  onClickIcon,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputElement = useRef(null as any);

  useEffect(() => {
    if (inputElement.current && autoFocus) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <>
      <div className={classes.textField_wrapper}>
        {labelText && (
          <label htmlFor={name} className={classes.label} >
            {labelText}
          </label>
        )}
        <div style={{ position: "relative" }}>
          <input
            className={classNames(classes.input, classes[status], {[classes.focused]: isFocused})}
            type={type}
            name={name}
            value={value}
            onFocus={() => setIsFocused((prev) => !prev)}
            onBlur={() => setIsFocused((prev) => !prev)}
            disabled={(status == "disable") || (status == "fixed")? true : false}
            onChange={onChange}
            placeholder={isFocused ? "" : placeholder}
            maxLength={maxLength as number}
            ref={inputElement}       
            autoComplete="off"
          />
          <div className={classes.unit_icon_wrapper}>
            {unitText &&
              <p className={classNames(classes.unit, classes[status])} >
                {unitText}
              </p>
            }
            {icon && (
              <div className={classNames(classes.icon, classes[status], {[classes.focused]: isFocused})} onClick={onClickIcon}>
                {icon}
              </div>
            )}
          </div>
        </div>
        {helperText &&
          <p className={classNames(classes.helperText, classes[status], {[classes.focused]: isFocused})}>
            {helperText}
          </p>
        }
      </div>
    </>
  );
};

interface TextFieldProps {
  type: string;
  name: string;
  value: string;
  status: "default" | "nice" | "danger" | "disable" | "fixed";
  placeholder?: string;
  maxLength?: number;
  autoFocus?:boolean;
  labelText?: string;
  helperText?: string;
  icon?: JSX.Element;
  unitText?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onClickIcon?: (e: React.MouseEvent<HTMLDivElement>) => void;

  children?: JSX.Element[];
}
