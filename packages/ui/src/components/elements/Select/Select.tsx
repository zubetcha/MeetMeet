import React, { useState, useEffect } from "react";
import { SelectProvider } from "./hooks/SelectContext";
import TriggerButton from "./TriggerButton";
import SearchField from "./SearchField";
import OptionList from "./OptionList";
import { useOutsideAlerter } from "./hooks";

interface SelectProps {
  isSearch?: boolean;
  defaultValue?: string;
  onChange: (e: any) => void;
  children: React.ReactElement[];
}

export function Select({
  isSearch = false,
  defaultValue,
  onChange,
  children,
}: SelectProps) {
  const [selected, setSelected] = useState();
  const [searchResult, setSearchResult] = useState<any[]>();
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useOutsideAlerter(() => setIsOpen(false));

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <>
      <SelectProvider
        setValue={setSelected}
        setSearchList={setSearchResult}
        defaultValue={defaultValue}
        setIsOpen={setIsOpen}
      >
        <span ref={ref}>
          {(!isOpen || (isOpen && !isSearch)) && (
            <TriggerButton isOpen={isOpen} setIsOpen={setIsOpen} />
          )}
          {isOpen && isSearch && <SearchField />}
          <OptionList searchResult={searchResult} isShow={isOpen}>
            {children}
          </OptionList>
        </span>
      </SelectProvider>
    </>
  );
}
