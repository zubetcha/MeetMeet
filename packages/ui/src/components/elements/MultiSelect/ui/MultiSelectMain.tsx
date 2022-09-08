import React, { useState, useEffect } from "react";
import { MultiSelectProvider } from "../@hooks/MultiSelectContext";
import { SelectItemType } from "../@types/select.types";
import MultiSelectWrapper from "./MultiSelectWrapper";

interface SelectProps {
  isSearch?: boolean;
  triggerButtonType?: "button" | "icon";
  defaultCheckedAll?: boolean;
  defaultValues?: string[];
  label?: string;
  onChange: (e: SelectItemType[]) => void;
  style?: any;
  children: React.ReactElement[];
}

/**
 *
 * @param isSearch (boolean) 검색 기능이 있는지
 * @param defaultValues (string[]) 초기 디폴트 값 리스트 (name 기준)
 * @param triggerButtonType ("button" | "icon") 드롭다운 열고 닫는 trigger button 타입 (Table 에서만 icon 사용합니다.)
 * @param onChange ((e:SelectItemType)=>void) 선택 변경 이벤트 콜백 함수
 * @param label (string) TextField 의 label 텍스트
 * @param style style 객체
 * @returns
 */
export function MultiSelectMain({
  isSearch = false,
  defaultValues,
  triggerButtonType = "button",
  defaultCheckedAll = false,
  label,
  style = { width: "220px" },
  onChange,
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
      <MultiSelectProvider
        setValue={setSelected}
        defaultValues={defaultValues}
        label={label}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        defaultCheckedAll={defaultCheckedAll}
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
      </MultiSelectProvider>
    </>
  );
}
