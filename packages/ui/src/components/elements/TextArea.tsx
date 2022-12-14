import React, { useEffect, useState } from "react";

import { inputs } from "../../shared/style";
import classes from "./elements.module.scss";
import classNames from "classnames";

/**
 *
 * @param type input 태그 type
 * @param name input 태그 name
 * @param label input 태그 label
 * @param placeholder input 태그 placeholder
 * @param value input 태그 value
 * @param helperText 버튼 클릭 전 또는 클릭 후 결과에 따른 안내
 * @param focused focus 상태인지에 따라 Input box border, value = true || false
 * @param status , value = dafault || nice || danger || disable
 * @param size input box 높이, value = small || medium
 * @param icon input 필드에 아이콘이 들어가는지, value = true || false
 * @param iconPaths icon 이미지 경로, focused: onFocus 상태일 때, active: status가 nice 또는 danger 일 때, default: status가 default일 때
 * @param width input 태그 넓이, 필요 시 px로 재할당
 * @param borderRadius input 태그 테두리 둥글기, 필요 시 px로 재할당
 * @param onChange Input value onChange 함수
 * @param onClick icon === true 일 때 icon onClick 함수
 *
 * @returns
 */

export const TextArea = ({
  name,
  label,
  value,
  helperText,
  status,
  setIsFocused,
  onChange,
  placeholder,
  size,
  icon,
  iconMarginBottom = "0px",
  iconMarginRight = "0px",
  height,
  width = "100%",
  borderRadius = "4px",
  onClick,
  isMargin = true,
  isBoxShadow = false,
}: any) => {
  const [focused, setFocused] = useState<boolean>(false);

  const handleOnFocus = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    if (focused) return;
    setFocused(true);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    if (!focused) return;
    setFocused(false);
  };

  useEffect(() => {
    if (setIsFocused) {
      setIsFocused(focused);
    }
  }, [focused]);

  const handleColor = (): string => {
    if (status == "disable") {
      return "rgba(0, 0, 0, 0.87)";
    }
    return focused
      ? inputs[status].focused.color.gray
      : inputs[status].default.color.gray;
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          borderRadius: borderRadius,
        }}
      >
        {label && (
          <label
            htmlFor={name}
            style={{
              display: "block",
              height: inputs.size[size].height.label,
              color: inputs[status].focused.color.default,
              // focused || value.length > 0 || type == "select"
              //   ? inputs[status].focused.color.default
              //   : inputs[status].default.color.white,
              fontSize: inputs.size[size].fontSize.labelText,
              fontWeight: inputs.fontWeight.bold,
            }}
          >
            {label}
          </label>
        )}
        <div
          style={{
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <span
            style={{
              display: "block",
              boxShadow: isBoxShadow
                ? "0px 4px 8px rgba(0, 0, 0, 0.16)"
                : "none",
              margin: isMargin ? inputs.size[size].margin : "none",
              borderRadius: borderRadius,
            }}
          >
            <textarea
              className={classNames(classes.textArea, classes.hover)}
              name={name}
              value={value}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              style={{
                height: height,
                width: width,
                backgroundColor: focused
                  ? inputs[status].focused.backgroundColor
                  : inputs[status].default.backgroundColor,
                borderRadius: borderRadius,
                outline: focused
                  ? inputs[status].focused.outline
                  : inputs[status].default.outline,
                fontSize: inputs.size[size].fontSize.mainText,
                color: handleColor(),
                cursor: focused
                  ? inputs[status].focused.cursor
                  : inputs[status].default.cursor,
                padding:
                  status === "disable" ? "16px 0px" : inputs.size[size].padding,
              }}
              disabled={status == "disable" ? true : false}
              onChange={onChange}
              placeholder={focused ? "" : placeholder}
            />
          </span>
        </div>
        <p
          style={{
            height: inputs.size[size].height.helperText,
            fontSize: inputs.size[size].fontSize.helperText,
            color: helperText
              ? inputs[status].default.color[status]
              : inputs[status].default.color.white,
          }}
        >
          {(helperText && (status == "danger" || focused)) ||
          (status === "default" && focused) ||
          (status === "nice" && focused)
            ? helperText
            : ""}
        </p>
      </div>
    </>
  );
};
