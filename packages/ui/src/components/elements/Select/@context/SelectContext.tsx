import React, { createContext, useState, useReducer, useEffect } from "react";
import { SelectItemType } from "../@types/select.types";

export const SelectContext = createContext({
  // 현재 Option 요소 리스트 (id, name)[]
  values: [] as SelectItemType[] | undefined,
  // 검색 결과에 일치하는 Option 요소들
  searchResult: [] as SelectItemType[] | undefined,
  // 현재 선택된 option (id, name)
  selected: undefined as SelectItemType | undefined,
  // 초기 선택되어있는 option (id, name)
  defaultValue: undefined as string | undefined,
  // TriggerButton TextField Label
  label: "" as string | undefined,
  // 현재 드롭다운 열려있는지/ 닫혀있는지 상태값
  isOpen: false,
  // values ADD dispatch 함수
  setValues: (e: SelectItemType) => {},
  // 현재 선택된 요소 setState 함수
  setSelected: (e: SelectItemType) => {},
  // 검색 결과 setState 함수
  setSearchResult: (e: SelectItemType[] | undefined) => {},
  // isOpen setState 함수
  setIsOpen: (e: boolean) => {},
});

export const useSelect = () => {
  const context = React.useContext(SelectContext);

  if (context === undefined) {
    throw new Error("useSelect must be used within a <Select />");
  }
  return context;
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      return [...state, action.value];
    default:
      return state;
  }
}

interface SelectProps {
  setValue: (e: any) => void;
  defaultValue?: string;
  label?: string;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  children: React.ReactElement[] | React.ReactElement | any;
}

export const SelectProvider = ({
  setValue,
  defaultValue,
  label,
  isOpen,
  setIsOpen,
  children,
}: SelectProps) => {
  const [state, dispatch] = useReducer(reducer, []);
  const [selected, setSelected] = useState();
  const [searchResult, setSearchResult] = useState<SelectItemType[]>();

  useEffect(() => {
    if (selected) {
      setValue(selected);
    }
  }, [selected]);

  return (
    <>
      <SelectContext.Provider
        value={{
          values: state,
          searchResult: searchResult,
          selected: selected,
          label: label,
          setValues: (value: any) => {
            dispatch({
              type: "ADD",
              value: value,
            });
          },
          defaultValue: defaultValue,
          setSelected: (value: any) => setSelected(value),
          setSearchResult: (e: SelectItemType[] | undefined) =>
            setSearchResult(e),
          setIsOpen: setIsOpen,
          isOpen: isOpen,
        }}
      >
        {children}
      </SelectContext.Provider>
    </>
  );
};
