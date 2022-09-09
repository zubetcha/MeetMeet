import React, { useState, useEffect, Children } from "react";
import classes from "./radio.module.scss";

import { SVG } from "../SVG/SVG";

interface RadioProps {
  name: string;
  id: string;
  checked?: boolean;
  selectedValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  children?: JSX.Element;
}

/**
 * @param name radio 그룹 이름
 * @param id 해당 input[type="radio"]의 id
 * @param selectedValue 선택된 input 의 value ( 상위 컴포넌트에서 관리 )
 * @param onChange input onChange 이벤트 핸들러 ( 상위 컴포넌트에서 관리 )
 * @param value  해당 input[type="radio"]의 value
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
