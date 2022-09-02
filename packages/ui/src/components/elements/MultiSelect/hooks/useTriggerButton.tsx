import React, { useMemo } from "react";
import { useSelect } from "./SelectContext";

export function useTriggerButton() {
  const { values, defaultValues, isOpen, setIsOpen } = useSelect();

  const trueNum = useMemo(
    () => values?.filter((value: any) => value.checked === true).length || 0,
    [values]
  );

  const label =
    values && trueNum > 0
      ? values
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
    onClick,
  };
}
