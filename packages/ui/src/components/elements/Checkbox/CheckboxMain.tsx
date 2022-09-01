import React, { useRef } from "react";
import classes from "./Checkbox.module.scss";
import { SVG } from "../SVG/SVG";
import { colors } from "ui/src/shared/style";

interface CheckboxProps {
  name: string;
  id: string;
  onChange: (e: boolean) => void;
  checked?: boolean;
  isHalf?: boolean;
  status?: string;
  children?: JSX.Element | undefined;
}

/**
 *
 * @param name  (string) checkbox name
 * @param id (string) checkbox id
 * @param onChange (function) input[type="checkbox"] onChange 이벤트 핸들러
 * @param isHalf (boolean) 반쪽자리 checkbox 여부
 * @param checked (boolean) 체크여부
 * @param status (string) "disable" || "default"
 * @returns
 */
export const CheckboxMain = ({
  name,
  id,
  onChange,
  checked,
  isHalf = false,
  status = "default",
  children,
}: CheckboxProps) => {
  const inputRef = useRef(null as any);
  return (
    <>
      <label
        htmlFor={id}
        className={classes.checkbox_hover}
        onClick={() => inputRef.current.click()}
      >
        <span className={classes.checkbox_hover} style={{ width: "20px" }}>
          {status === "disable" ? (
            <SVG name="checkDisabled" />
          ) : checked === true ? (
            <>
              {isHalf ? (
                <SVG name="checkIndeterminated" />
              ) : (
                <SVG name="checked" color={"primary"} />
              )}
            </>
          ) : (
            <SVG name="unchecked" />
          )}
        </span>
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          style={{ display: "none" }}
          ref={inputRef}
          onChange={(e: any) => onChange(e.target.checked)}
        />
        {children}
      </label>
    </>
  );
};
