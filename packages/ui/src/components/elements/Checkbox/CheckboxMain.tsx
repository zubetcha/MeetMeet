import React, { useRef } from "react";
import classes from "./Checkbox.module.scss";
import { SVG } from "../SVG/SVG";
import { colors } from "ui/src/shared/style";

interface CheckboxProps {
  name: string;
  id: string;
  onChange: (e: boolean) => void;
  checked?: boolean;
  label?: string;
  labelWidth?: string;
  width?: number;
  isHalf?: boolean;
  status?: string;
  children?: JSX.Element | undefined;
}

/**
 *
 * @param name  checkbox name
 * @param id checkbox id
 * @param onChange input[type="checkbox"] onChange 이벤트 핸들러
 * @param checked boolean
 * @param label string
 * @param status string "disable" || "default"
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
                <SVG name="checked" color={colors.primary500} />
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
