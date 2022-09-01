import React, { createContext, useState, useReducer, useEffect } from "react";
import { SelectItemType } from "../types/select.types";

export const SelectContext = createContext({
  values: [] as SelectItemType[] | undefined,
  searchResult: [] as SelectItemType[] | undefined,
  defaultValue: undefined as string | undefined,
  isOpen: false,
  setValues: (e: SelectItemType) => {},
  setSearchResult: (e: SelectItemType[] | undefined) => {},
  setIsOpen: (e: boolean) => {},
  setCheckedItem: (id: string, checked: boolean) => {},
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
    case "UPDATE":
      const { id, checked } = action.value;
      let newState: any[] = [];
      state.map((item: any) => {
        const newItem = {
          id: item.id,
          name: item.name,
          checked: id === item.id ? checked : item.checked,
        };
        newState.push(newItem);
      });
      return [...newState];
    default:
      return state;
  }
}

interface SelectProps {
  setValue: (e: any) => void;
  defaultValue?: string;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  children: React.ReactElement[] | React.ReactElement | any;
}

export const SelectProvider = ({
  setValue,
  defaultValue,
  isOpen,
  setIsOpen,
  children,
}: SelectProps) => {
  const [state, dispatch] = useReducer(reducer, []);
  const [selected, setSelected] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState<SelectItemType[]>();

  useEffect(() => {
    if (selected) {
      console.log("selected", selected);
      setValue(selected);
    }
  }, [selected]);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  return (
    <>
      <SelectContext.Provider
        value={{
          values: state,
          searchResult: searchResult,
          isOpen: isOpen,
          defaultValue: defaultValue,
          setValues: (value: any) => {
            dispatch({
              type: "ADD",
              value: value,
            });
          },
          setSearchResult: (e: SelectItemType[] | undefined) =>
            setSearchResult(e),
          setIsOpen: setIsOpen,
          setCheckedItem: (id: string, checked: boolean) => {
            dispatch({
              type: "UPDATE",
              value: { id: id, checked: checked },
            });
          },
        }}
      >
        {children}
      </SelectContext.Provider>
    </>
  );
};
