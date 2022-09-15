import React, { useMemo } from "react";
import { useMultiSelect } from "../@context/MultiSelectContext";

export function useTriggerButton() {
  const { label, confirmedValues, defaultValues, isOpen, setIsOpen } =
    useMultiSelect();

  const trueNum = useMemo(
    () =>
      confirmedValues?.filter((value: any) => value.checked === true).length ||
      0,
    [confirmedValues]
  );

  const value =
    confirmedValues && trueNum > 0
      ? confirmedValues
          .filter((value: any) => value.checked === true)
          .map((value) => value.name)
          .join(",")
      : trueNum === 0
      ? "선택하세요."
      : defaultValues
      ? `${defaultValues.join(",")}`
      : "선택하세요.";

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setIsOpen(!isOpen);

  return {
    label,
    value,
    isOpen,
    onClick,
  };
}
