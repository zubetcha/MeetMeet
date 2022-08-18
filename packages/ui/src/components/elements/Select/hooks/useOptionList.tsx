import React from "react";
import { useSelect } from "./SelectContext";
export function useOptionList() {
  const { isOpen, searchResult } = useSelect();

  return {
    isOpen,
    searchResult,
  };
}
