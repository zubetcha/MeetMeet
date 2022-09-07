import React from "react";
import { useSelect } from "./SelectContext";

export function useTriggerButton() {
  const { label, selected, defaultValue, isOpen, setIsOpen } = useSelect();

  const value = selected
    ? selected.name
    : defaultValue
    ? `${defaultValue}`
    : `선택하세요.`;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setIsOpen(!isOpen);

  return {
    label,
    value,
    onClick,
  };
}
