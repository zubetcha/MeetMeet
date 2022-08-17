import React from "react";
import { useTriggerButton } from "./hooks";

interface Props {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

export default function TriggerButton({ isOpen, setIsOpen }: Props) {
  const { selected, defaultValue } = useTriggerButton();

  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsOpen(!isOpen)}
    >
      {selected
        ? selected.name
        : defaultValue
        ? `${defaultValue}`
        : `트리거 버튼`}
    </button>
  );
}
