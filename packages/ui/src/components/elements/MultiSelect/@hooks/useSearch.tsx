import React, { useState, useEffect } from "react";
import { useMultiSelect } from "./MultiSelectContext";
import { SelectItemType } from "../types/select.types";

export function useSearch() {
  const [searchValue, setSearchValue] = useState("");

  const { values, setSearchResult } = useMultiSelect();

  useEffect(() => {
    if (searchValue.length === 0) {
      setSearchResult(undefined);
      return;
    }

    handleSearchResult(searchValue);
  }, [searchValue]);

  const handleSearchResult = (searchValue: string) => {
    const result = values?.filter((value: SelectItemType) =>
      value.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (result) setSearchResult(result);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return {
    searchValue,
    onChange,
  };
}
