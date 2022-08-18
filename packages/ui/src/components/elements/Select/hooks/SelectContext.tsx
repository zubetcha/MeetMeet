import React, { createContext, useState, useReducer, useEffect } from "react";

export const SelectContext = createContext({
  values: [] as any,
  searchResult: [] as any,
  selected: undefined as any,
  defaultValue: undefined as any,
  isOpen: false,
  setValues: (e: any) => {},
  setSelected: (e: any) => {},
  setSearchResult: (e: any) => {},
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
  const [selected, setSelected] = useState();
  const [searchResult, setSearchResult] = useState();

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
          isOpen: isOpen,
        }}
      >
        {children}
      </SelectContext.Provider>
    </>
  );
};
