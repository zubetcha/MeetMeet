import React from "react";
import { useSelect } from "./SelectContext";

export function useTriggerButton() {
  const { values, defaultValues, isOpen, setIsOpen } = useSelect();

  const label =
    values && values.filter((value: any) => value.checked === true).length > 0
      ? values
          .filter((value: any) => value.checked === true)
          .map((value) => value.name)
          .join(",")
      : defaultValues
      ? `${defaultValues.join(",")}`
      : `선택하세요.`;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setIsOpen(!isOpen);

  return {
    label,
    onClick,
  };
}
