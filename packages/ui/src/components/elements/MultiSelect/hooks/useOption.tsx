import React, { useEffect, useState } from "react";
import { useSelect } from "./SelectContext";

interface Props {
  id: string;
  name: string;
}

export function useOption({ id, name }: Props) {
  const [isShow, setIsShow] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [item, setItem] = useState({ id: id, name: name });
  const { defaultValue, searchResult, setValues, setCheckedItem, setIsOpen } =
    useSelect();

  useEffect(() => {
    if (searchResult) {
      searchResult?.map((result: any) => result.id).includes(id)
        ? setIsShow(true)
        : setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [searchResult]);

  useEffect(() => {
    setValues({
      id: id,
      name: name,
      checked: isChecked,
    });
  }, []);

  // DESCRIBE:
  useEffect(() => {
    setCheckedItem(id, isChecked);
  }, [id, isChecked]);

  // useEffect(() => {
  //   if (defaultValue === name) {
  //     setSelected(item);
  //   }
  // }, [defaultValue]);

  const isShowOption = isShow ? "block" : "none";

  return {
    isChecked,
    isShowOption,
    setIsChecked,
  };
}
