import React, { useEffect, useState } from "react";
import { useSelect } from "./SelectContext";

interface Props {
  id: string;
  name: string;
}

export function useOption({ id, name }: Props) {
  const [isShow, setIsShow] = useState(true);
  const [item, setItem] = useState({ id: id, name: name });
  const { selected, defaultValue, searchResult, setValues, setSelected } =
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
    setValues(item);
  }, []);

  useEffect(() => {
    if (defaultValue === name) {
      setSelected(item);
    }
  }, [defaultValue]);

  const onClick = () => setSelected(item);

  const isShowOption = isShow ? "block" : "none";

  const isSelected = JSON.stringify(selected) === JSON.stringify(item);

  return {
    onClick,
    isSelected,
    isShowOption,
  };
}
