import React from "react";
import { useSelect } from "./SelectContext";

export function useTriggerButton() {
  const { selected, defaultValue, isOpen, setIsOpen } = useSelect();

  const label = selected
    ? selected.name
    : defaultValue
    ? `${defaultValue}`
    : `선택하세요.`;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setIsOpen(!isOpen);

  return {
    label,
    onClick,
  };
}
