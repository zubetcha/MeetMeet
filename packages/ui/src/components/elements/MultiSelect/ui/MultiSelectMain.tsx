import React, { useState, useEffect } from "react";
import { SelectProvider } from "../hooks/SelectContext";
import { SelectItemType } from "../types/select.types";
import MultiSelectWrapper from "./MultiSelectWrapper";

interface SelectProps {
  isSearch?: boolean;
  triggerButtonType?: "button" | "icon";
  defaultValues?: string[];
  onChange: (e: SelectItemType[]) => void;
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
  triggerButtonType = "button",
  onChange,
  style = { width: "220px" },
  children,
}: SelectProps) {
  const [selected, setSelected] = useState<SelectItemType[]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!selected) return;
    onChange(selected);
  }, [selected]);

  const isShowSearchField = isOpen && isSearch;

  return (
    <>
      <SelectProvider
        setValue={setSelected}
        defaultValues={defaultValues}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        triggerButtonType={triggerButtonType}
      >
        <MultiSelectWrapper
          style={style}
          isOpen={isOpen}
          triggerButtonType={triggerButtonType}
          setIsOpen={setIsOpen}
          isShowSearchField={isShowSearchField}
        >
          {children}
        </MultiSelectWrapper>
      </SelectProvider>
    </>
  );
}
