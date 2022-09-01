import React, { useEffect, useState } from "react";
import { useOption } from "../hooks";
import classes from "../style/select.module.scss";
import classNames from "classnames";
import { Checkbox } from "../../Checkbox";

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
  const { isChecked, isShowOption, setIsChecked } = useOption({
    id: id,
    name: name,
  });

  return (
    <li
      id={id}
      style={{ display: isShowOption }}
      className={classNames(classes.option, isChecked ? classes.selected : "")}
    >
      <Checkbox
        id={id}
        name={name}
        checked={isChecked}
        onChange={(checked: boolean) => setIsChecked(checked)}
      >
        <Checkbox.Label style={{ marginLeft: "11px" }}>{name}</Checkbox.Label>
      </Checkbox>
    </li>
  );
}
