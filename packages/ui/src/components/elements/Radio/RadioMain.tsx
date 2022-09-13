import React, { useState, useEffect, Children } from "react";
import classes from "./radio.module.scss";

import { SVG } from "../SVG/SVG";

interface RadioProps {
  name: string;
  id: string;
  selectedValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children?: JSX.Element | string;
}

/**
 * @param name (string) radio input name
 * @param id (string) radio input id
 * @param selectedValue (string) 디폴트로 선택할 value 값
 * @param onChange (function) radio input 이벤트 핸들러
 * @param value (string) radio input value
 * @param children (JSX.Element | string) RadioLabel을 넣을 children 객체
 * @returns
 */
export const RadioMain = ({
  name,
  id,
  selectedValue,
  onChange,
  value,
  children,
}: RadioProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    selectedValue == value ? setChecked(true) : setChecked(false);
  }, [selectedValue]);

  return (
    <>
      <label htmlFor={id} className={classes.radio}>
        {checked == true ? (
          <SVG name="selectedRadio" color={"primary"} />
        ) : (
          <SVG name="unSelectedRadio" color={"onSurfaceVariant"} />
        )}
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
          style={{ display: "none" }}
        ></input>
        {children}
      </label>
    </>
  );
};
