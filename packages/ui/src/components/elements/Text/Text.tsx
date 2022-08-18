import React from "react";
import classNames from "classnames";
import classes from "./Text.module.scss";

/**
 *
 * @param text text = 컴포넌트에 들어가는 text
 * @param type value = header | body | caption
 * @param color value from color 모듈
 * @param weight defaultValue = regular
 * @param cursor defaultValue = default
 * @returns
 */

// global title 컴포넌트
export const Text = ({
  text,
  type = "label-large",
  color = "onBackground",
  weight = "500",
  cursor = "default",
}: TextProps) => {
  return (
    <p
      className={classNames(classes["first-class"], classes[type], `${color}`)}
      style={{
        fontWeight: weight,
        cursor: cursor,
      }}
    >
      {text}
    </p>
  );
};

export interface TextProps {
  text: string;
  color?: string;
  weight?: string;
  type?: string;
  cursor?: string;
}