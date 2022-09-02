import React, { createContext, useState, useReducer, useEffect } from "react";
import { SelectItemType } from "../types/select.types";

export const SelectContext = createContext({
  values: [] as SelectItemType[] | undefined,
  searchResult: [] as SelectItemType[] | undefined,
  defaultValues: undefined as string[] | undefined,
  isOpen: false,
  setValues: (e: SelectItemType) => {},
  setSearchResult: (e: SelectItemType[] | undefined) => {},
  setIsOpen: (e: boolean) => {},
  setCheckedItem: (id: string, checked: boolean) => {},
  onClickCheckedAll: () => {},
  onClickUncheckedAll: () => {},
});

export const useSelect = () => {
  const context = React.useContext(SelectContext);

  if (context === undefined) {
    throw new Error("useSelect must be used within a <MultiSelect />");
  }
  return context;
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      const stateIdList = state.map((item: any) => item.id);
      if (stateIdList.includes(action.value.id)) return [...state];
      return [...state, action.value];
    case "UPDATE": {
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
    }
    case "CHECKED_ALL": {
      let newState: any[] = [];
      state.map((item: any) => {
        const newItem = {
          id: item.id,
          name: item.name,
          checked: true,
        };
        newState.push(newItem);
      });
      return [...newState];
    }
    case "UNCHECKED_ALL": {
      let newState: any[] = [];
      state.map((item: any) => {
        const newItem = {
          id: item.id,
          name: item.name,
          checked: false,
        };
        newState.push(newItem);
      });
      return [...newState];
    }
    default:
      return state;
  }
}

interface SelectProps {
  setValue: (e: any) => void;
  defaultValues?: string[];
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  children: React.ReactElement[] | React.ReactElement | any;
}

export const SelectProvider = ({
  setValue,
  defaultValues,
  isOpen,
  setIsOpen,
  children,
}: SelectProps) => {
  const [state, dispatch] = useReducer(reducer, []);
  const [selected, setSelected] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState<SelectItemType[]>();

  useEffect(() => {
    if (selected) {
      setValue(selected);
    }
  }, [selected]);

  useEffect(() => {
    console.log("state", state);
    const selectedItems = state.filter((item: any) => item.checked);
    setSelected(selectedItems);
  }, [state]);

  return (
    <>
      <SelectContext.Provider
        value={{
          values: state,
          searchResult: searchResult,
          isOpen: isOpen,
          defaultValues: defaultValues,
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
          onClickCheckedAll: () => {
            dispatch({
              type: "CHECKED_ALL",
            });
          },
          onClickUncheckedAll: () => {
            dispatch({
              type: "UNCHECKED_ALL",
            });
          },
        }}
      >
        {children}
      </SelectContext.Provider>
    </>
  );
};
