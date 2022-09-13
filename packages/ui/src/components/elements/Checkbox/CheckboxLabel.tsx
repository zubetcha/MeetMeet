import React from "react";
import classes from "./Checkbox.module.scss";

interface Props {
  style?: any;
  children: JSX.Element | string;
}

/**
 *
 * @param style (style Object) 인라인 스타일 적용을 위한 props 객체
 * @param children (JSX.Element | string) label 로 사용할 JSX 엘리먼트 또는 string
 * @returns
 */
export const CheckboxLabel = ({ style, children }: Props) => {
  return (
    <div style={{ ...style }} className={classes.checkbox_label}>
      {children}
    </div>
  );
};
