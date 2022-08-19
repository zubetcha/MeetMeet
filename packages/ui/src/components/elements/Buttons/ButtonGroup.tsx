import React, { useState, Children, useEffect } from "react";
import classes from "./button.module.scss";
import classNames from "classnames";
import useButtonGroup from "./hooks/useButtonGroup";

interface ButtonGroupProps {
  configuration: "filled" | "tonal" | "outlined" | "text" | "textGray";
  size?: string;
  defaultIndex?: any;
  children: JSX.Element[];
  onChange: (e: any) => void;
}

/**
 *
 * @param size 크기
 * @param style solid | line | text
 * @param setSelectedId 선택 버튼 setState 함수
 * @param selected 선택된 버튼 인덱스
 * @param onClick 버튼 onClick event
 * @returns
 */
export function ButtonGroup({
  configuration,
  size,
  defaultIndex,
  children,
  onChange,
}: ButtonGroupProps) {
  const { btnState, onClick } = useButtonGroup({
    defaultIndex: defaultIndex,
    childrenLength: Children.toArray(children).length,
    onChange: onChange,
  });

  return (
    <div className={classNames(classes[configuration], classes.btnGroup)}>
      {Children.toArray(children).map((child: any, index: number) => {
        return (
          <>
            {React.cloneElement(child, {
              configuration: configuration,
              state: btnState[index],
              size: size,
              onClick: () => onClick(index),
            })}
          </>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
