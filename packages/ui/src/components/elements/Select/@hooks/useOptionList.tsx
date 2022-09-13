import React from "react";
import { useSelect } from "../@context/SelectContext";
export function useOptionList() {
  const { isOpen, searchResult } = useSelect();

  return {
    isOpen,
    searchResult,
  };
}
