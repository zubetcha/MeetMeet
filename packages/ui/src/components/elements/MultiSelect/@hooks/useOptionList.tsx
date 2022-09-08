import React from "react";
import { useMultiSelect } from "./MultiSelectContext";
export function useOptionList() {
  const { isOpen, searchResult } = useMultiSelect();

  return {
    isOpen,
    searchResult,
  };
}
