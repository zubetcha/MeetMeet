import React from "react";
import { useSearch } from "./hooks";

export default function SearchField() {
  const { searchValue, onChange } = useSearch();

  return (
    <input
      id="select-search"
      value={searchValue}
      onChange={onChange}
      placeholder="placeholder"
    ></input>
  );
}
