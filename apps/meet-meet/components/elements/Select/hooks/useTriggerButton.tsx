import React from "react";
import { useSelect } from "./SelectContext";

export function useTriggerButton() {
  const { selected } = useSelect();

  return {
    selected,
  };
}
