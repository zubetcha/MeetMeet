import React, { useState, useEffect } from "react";
import { SelectProvider } from "../hooks/SelectContext";
import { useOutsideAlerter } from "../hooks";
import { MultiSelect } from "../index";
import { SelectItemType } from "../types/select.types";

interface SelectProps {
  isSearch?: boolean;
  defaultValues?: string[];
  onChange: (e: SelectItemType) => void;
  style?: any;
  children: React.ReactElement[];
}

/**
 *
 * @param isSearch (boolean) 검색 기능이 있는지
 * @param defaultValues (string[]) 초기 디폴트 값 리스트 (name 기준)
 * @param onChange ((e:SelectItemType)=>void) 선택 변경 이벤트 콜백 함수
 * @param style style 객체
 * @returns
 */
export function MultiSelectMain({
  isSearch = false,
  defaultValues,
  onChange,
  style = { width: "220px" },
  children,
}: SelectProps) {
  const [selected, setSelected] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useOutsideAlerter(() => setIsOpen(false));

  useEffect(() => {
    if (!selected) return;

    onChange(selected);
  }, [selected]);

  const isShowTriggerButton = !isOpen || (isOpen && !isSearch);
  const isShowSearchField = isOpen && isSearch;

  return (
    <>
      <SelectProvider
        setValue={setSelected}
        defaultValues={defaultValues}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        <div ref={ref} style={{ ...style }}>
          {isShowTriggerButton && <MultiSelect.Trigger />}
          {isShowSearchField && <MultiSelect.Search />}
          <MultiSelect.List>{children}</MultiSelect.List>
        </div>
      </SelectProvider>
    </>
  );
}
