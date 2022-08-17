import React, { useState, useEffect } from "react";
import { SelectProvider } from "./hooks/SelectContext";
import TriggerButton from "./TriggerButton";
import SearchField from "./SearchField";
import { useOutsideAlerter } from "./hooks";

interface SelectProps {
  isSearch?: boolean;
  defaultValue?: string;
  children: React.ReactElement[];
}

export function Select({
  isSearch = false,
  defaultValue,
  children,
}: SelectProps) {
  const [selected, setSelected] = useState();
  const [searchResult, setSearchResult] = useState<any[]>();
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useOutsideAlerter(() => setIsOpen(false));

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  useEffect(() => {
    console.log("searchResult", searchResult);
  }, [searchResult]);

  return (
    <>
      <SelectProvider
        setValue={setSelected}
        setSearchList={setSearchResult}
        defaultValue={defaultValue}
      >
        <span ref={ref}>
          <TriggerButton isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen && isSearch && <SearchField />}
          {searchResult && searchResult.length === 0 ? (
            <div style={{ display: isOpen ? "block" : "none" }}>
              검색 결과 없음
            </div>
          ) : (
            <div style={{ display: isOpen ? "block" : "none" }}>{children}</div>
          )}
        </span>
      </SelectProvider>
    </>
  );
}
