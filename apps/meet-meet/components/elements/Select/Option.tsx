import React from "react";
import { useOption } from "./hooks";
import classes from "./select.module.scss";

interface OptionProps {
  id: string;
  name: string;
}

export function Option({ id, name }: OptionProps) {
  const { onClick, isShowOption } = useOption({ id: id, name: name });

  return (
    <li
      id={id}
      onClick={onClick}
      style={{ display: isShowOption }}
      className={classes.option}
    >
      {name}
    </li>
  );
}
