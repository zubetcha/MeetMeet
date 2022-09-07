import React, { createContext, useState, useReducer, useEffect } from "react";
import { SelectItemType } from "../@types/select.types";

export const SelectContext = createContext({
  values: [] as SelectItemType[] | undefined,
  searchResult: [] as SelectItemType[] | undefined,
  selected: undefined as SelectItemType | undefined,
  defaultValue: undefined as string | undefined,
  label: "" as string | undefined,
  isOpen: false,
  setValues: (e: SelectItemType) => {},
  setSelected: (e: SelectItemType) => {},
  setSearchResult: (e: SelectItemType[] | undefined) => {},
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
