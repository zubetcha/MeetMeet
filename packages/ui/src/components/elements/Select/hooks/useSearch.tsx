import React, { useState, useEffect } from "react";
import { useSelect } from "./SelectContext";

export function useSearch() {
  const [searchValue, setSearchValue] = useState("");

  const { values, setSearchResult } = useSelect();

  useEffect(() => {
    if (searchValue.length > 0) {
      const result = values.filter((value: any) =>
        value.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (result) setSearchResult(result);
    } else {
      setSearchResult(undefined);
    }
  }, [searchValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return {
    searchValue,
    onChange,
  };
}
