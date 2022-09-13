import React from "react";
import { useMultiSelect } from "../@context/MultiSelectContext";
export function useOptionList() {
  const { isOpen, searchResult } = useMultiSelect();

  return {
    isOpen,
    searchResult,
  };
}
