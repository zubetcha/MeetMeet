import React, {ReactChild, ReactFragment, ReactPortal} from "react";
import { useSelect } from "../@context/SelectContext";

interface Props {
  _children: any
}

export function useOptionList() {
  const { isOpen, searchResult, setSelected } = useSelect();

  return {
    isOpen,
    searchResult,
    setSelected
  };
}
