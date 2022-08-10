import React, { InputHTMLAttributes, useEffect } from "react";
import classes from "./elements.module.scss";
import { SVG } from "./SVG/SVG";
import { colors } from "ui/src/shared/style";

interface CheckboxProps {
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string;
  labelWidth? : string;
  width?: number;
  isHalf? : boolean;
  status? : string;
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
function CheckBox({
  name,
  id,
  onChange,
  checked,
  label,
  labelWidth,
  width,
  isHalf=false,
  status = "default"
}: CheckboxProps) {

  return (
    <>
      <label
        htmlFor={id}
        style={{
          display: "flex",
          width: width ? `${width}px` : "",
          justifyContent: "center",
        }}
        className={classes.checkbox_hover}
      >
        {status === "disable" ? (
          <span className={classes.checkbox_hover} style={{ width: "20px" }}>
            <SVG name="checkDisabled" />
          </span>
        ) : checked == true ? (
          <>
            {isHalf ? (
              <span
                className={classes.checkbox_hover}
                style={{ width: "20px" }}
              >
                <SVG name="checkIndeterminated" />
              </span>
            ) : (
              <span
                className={classes.checkbox_hover}
                style={{ width: "20px" }}
              >
                <SVG name="checked" color={colors.primary500} />
              </span>
            )}
          </>
        ) : (
          <span className={classes.checkbox_hover} style={{ width: "20px" }}>
            <SVG name="unchecked" />
          </span>
        )}
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          style={{ display: "none" }}
          onChange={onChange}
        />
        {label &&
        <div
          style={{
            whiteSpace: "nowrap",
            marginLeft: "7px",
            // minWidth:"150px",
            width: labelWidth ? labelWidth : "fit-content",
            fontWeight: label == "전체 선택" ? "bold" : "normal",
            color: status === "disable" ? colors.gray300 : colors.darkMedium,
          }}
        >
          {label}
        </div>
        }
      </label>
    </>
  );
}

export const Checkbox = React.memo(CheckBox);