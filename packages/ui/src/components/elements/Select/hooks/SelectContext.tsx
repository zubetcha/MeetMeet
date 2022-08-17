import React, { createContext, useState, useReducer, useEffect } from "react";

export const SelectContext = createContext({
  values: [] as any,
  searchResult: [] as any,
  selected: undefined as any,
  setValues: (e: any) => {},
  setSelected: (e: any) => {},
  defaultValue: undefined as any,
  setSearchResult: (e: any) => {},
  setIsOpen: (e: boolean) => {},
});

export const useSelect = () => {
  const context = React.useContext(SelectContext);

  if (context === undefined) {
    throw new Error("useToggle must be used within a <Toggle />");
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
  setSearchList: (e: any) => void;
  defaultValue?: string;
  setIsOpen: (e: boolean) => void;
  children: React.ReactElement[] | React.ReactElement | any;
}

export const SelectProvider = ({
  setValue,
  setSearchList,
  defaultValue,
  setIsOpen,
  children,
}: SelectProps) => {
  const [state, dispatch] = useReducer(reducer, []);
  const [selected, setSelected] = useState();
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    if (selected) {
      setValue(selected);
    }
  }, [selected]);

  useEffect(() => {
    setSearchList(searchResult);
  }, [searchResult]);

  return (
    <>
      <SelectContext.Provider
        value={{
          values: state,
          searchResult: searchResult,
          selected: selected,
          setValues: (value: any) => {
            dispatch({
              type: "ADD",
              value: value,
            });
          },
          defaultValue: defaultValue,
          setSelected: (value: any) => setSelected(value),
          setSearchResult: setSearchResult,
          setIsOpen: setIsOpen,
        }}
      >
        {children}
      </SelectContext.Provider>
    </>
  );
};
