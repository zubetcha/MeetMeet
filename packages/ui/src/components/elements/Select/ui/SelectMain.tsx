import React, { useState, useEffect } from "react";
import { SelectProvider } from "../hooks/SelectContext";
import { useOutsideAlerter } from "../hooks";
import { Select } from "../index";

interface SelectProps {
  isSearch?: boolean;
  defaultValue?: string;
  onChange: (e: any) => void;
  style?: any;
  children: React.ReactElement[];
}

export function SelectMain({
  isSearch = false,
  defaultValue,
  onChange,
  style,
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
        <div ref={ref} style={{ ...style }}>
          {(!isOpen || (isOpen && !isSearch)) && (
            <Select.Trigger isOpen={isOpen} setIsOpen={setIsOpen} />
          )}
          {isOpen && isSearch && <Select.Search />}
          <Select.List searchResult={searchResult} isShow={isOpen}>
            {children}
          </Select.List>
        </div>
      </SelectProvider>
    </>
  );
}
