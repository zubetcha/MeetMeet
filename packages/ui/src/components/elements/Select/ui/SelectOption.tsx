import React, { useEffect } from "react";
import { useOption } from "../hooks";
import classes from "../style/select.module.scss";
import classNames from "classnames";

interface OptionProps {
  id: string;
  name: string;
}

/**
 *
 * @param id (string) 구분 id 값
 * @param name (string) 표시 데이터
 */
export function SelectOption({ id, name }: OptionProps) {
  const { isSelected, onClick, isShowOption } = useOption({
    id: id,
    name: name,
  });

  return (
    <li
      id={id}
      onClick={onClick}
      style={{ display: isShowOption }}
      className={classNames(classes.option, isSelected ? classes.selected : "")}
    >
      {name}
    </li>
  );
}
