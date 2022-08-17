import React from "react";
import { useTriggerButton } from "../hooks";
import classes from "../style/button.module.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

export function TriggerButton({ isOpen, setIsOpen }: Props) {
  const { selected, defaultValue } = useTriggerButton();

  return (
    <button
      className={classes.button}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsOpen(!isOpen)}
    >
      {selected
        ? selected.name
        : defaultValue
        ? `${defaultValue}`
        : `선택하세요.`}
    </button>
  );
}
