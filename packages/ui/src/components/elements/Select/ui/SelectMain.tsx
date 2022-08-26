import React, { useState, useEffect } from "react";
import { SelectProvider } from "../hooks/SelectContext";
import { useOutsideAlerter } from "../hooks";
import { Select } from "../index";
import { SelectItemType } from "../types/select.types";

interface SelectProps {
  isSearch?: boolean;
  defaultValue?: string;
  onChange: (e: SelectItemType) => void;
  style?: any;
  children: React.ReactElement[];
}

/**
 *
 * @param isSearch (boolean) 검색 기능이 있는지
 * @param defaultValue (string) 초기 디폴트 값
 * @param onChange ((e:SelectItemType)=>void) 선택 변경 이벤트 콜백 함수
 * @param style style 객체
 * @returns
 */
export function SelectMain({
  isSearch = false,
  defaultValue,
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
        defaultValue={defaultValue}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        <div ref={ref} style={{ ...style }}>
          {isShowTriggerButton && <Select.Trigger />}
          {isShowSearchField && <Select.Search />}
          <Select.List>{children}</Select.List>
        </div>
      </SelectProvider>
    </>
  );
}
