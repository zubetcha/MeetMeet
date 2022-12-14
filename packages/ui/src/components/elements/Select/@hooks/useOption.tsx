import React, { useEffect, useState } from "react";
import { useSelect } from "../@context/SelectContext";

interface Props {
  id: string;
  name: string;
}

export function useOption({ id, name }: Props) {
  const [isShow, setIsShow] = useState(true);
  const [item, setItem] = useState({ id: id, name: name });
  const {
    selected,
    defaultValue,
    searchResult,
    setValues,
    setSelected,
    setIsOpen,
  } = useSelect();

  useEffect(() => {
    if (searchResult) {
      searchResult?.map((result: any) => result.name).includes(name)
        ? setIsShow(true)
        : setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [searchResult]);

  useEffect(() => {
    setValues(item);
  }, []);

  useEffect(() => {
    if (defaultValue === name) {
      setSelected(item);
    }
  }, [defaultValue]);

  const onClick = () => {
    setSelected(item);
    setIsOpen(false);
  };

  const isShowOption = isShow ? "block" : "none";

  const isSelected = JSON.stringify(selected) === JSON.stringify(item);

  return {
    onClick,
    isSelected,
    isShowOption,
  };
}
