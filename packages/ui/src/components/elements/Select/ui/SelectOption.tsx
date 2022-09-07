import React, { useEffect, useMemo } from "react";
import { useOption } from "../@hooks";
import classes from "../@style/select.module.scss";
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
  const info = useMemo(() => {
    return { id: id, name: name };
  }, [id, name]);

  const { isSelected, onClick, isShowOption } = useOption(info);

  useEffect(() => {
    console.log("selectOption 리렌더링");
  }, []);

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
