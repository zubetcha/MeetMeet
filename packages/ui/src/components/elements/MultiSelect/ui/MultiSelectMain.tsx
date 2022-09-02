import React, { useState, useEffect, useMemo } from "react";
import { SelectProvider } from "../hooks/SelectContext";
import { useOutsideAlerter } from "../hooks";
import { MultiSelect } from "../index";
import { SelectItemType } from "../types/select.types";
import { Text } from "../../Text/Text";
import classes from "../style/select.module.scss";
interface SelectProps {
  isSearch?: boolean;
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
  onChange,
  style = { width: "220px" },
  children,
}: SelectProps) {
  const [selected, setSelected] = useState<SelectItemType[]>();
  const [selectedItemNumber, setSelectedItemNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useOutsideAlerter(() => setIsOpen(false));

  useEffect(() => {
    if (!selected) return;
    onChange(selected);
    setSelectedItemNumber(selected.length);
  }, [selected]);

  const isShowTriggerButton = !isOpen || (isOpen && !isSearch);
  const isShowSearchField = isOpen && isSearch;
  // const selectedItemNumber = useMemo(()=>selected.filter((item:any)=>item.checked || 0).length,[selected])

  return (
    <>
      <SelectProvider
        setValue={setSelected}
        defaultValues={defaultValues}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        <div ref={ref} style={{ ...style }} className={classes.selectContainer}>
          {isOpen && (
            <div className={classes.label}>
              <Text
                type="body-small"
                style={{ textShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
              >
                {selectedItemNumber}개 선택
              </Text>
            </div>
          )}
          {isShowTriggerButton && <MultiSelect.Trigger />}
          {isShowSearchField && <MultiSelect.Search />}
          <MultiSelect.List>{children}</MultiSelect.List>
        </div>
      </SelectProvider>
    </>
  );
}
