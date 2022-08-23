
import classNames from "classnames";
import classes from "./Text.module.scss";
import { ColorUnionType } from "../../../types/union.types";
import { TextTypeUnionType } from "./Text.types";

/**
 *
 * @param text {string} 컴포넌트에 들어가는 text
 * @param type {string} 텍스트 크기 타입 / defaultValue = label-large 
 * @param color {string} 텍스트 컬러 / defaultValue = onBackground
 * @returns
 */

// global title 컴포넌트
export const Text = ({
  children,
  type = "label-large",
  color = "on-background",
  style,
  onClick
}: TextProps) => {
  return (
    <p
      className={classNames(classes["first-class"], classes[type], `${color}`)}
      onClick={onClick}
      style={{ ...style }}
    >
      {children}
    </p>
  );
};

interface TextProps {
  children: any;
  color?: ColorUnionType;
  type?: TextTypeUnionType;
  style?: { [key: string]: string };
  onClick?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
}