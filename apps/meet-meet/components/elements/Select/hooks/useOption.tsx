import React, { useEffect, useState } from "react";
import { useSelect } from "./SelectContext";

interface Props {
  id: string;
  name: string;
}

export function useOption({ id, name }: Props) {
  const [isShow, setIsShow] = useState(true);
  const { searchResult, setValues, setSelected } = useSelect();

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
    setValues({ id: id, name: name });
  }, []);

  const onClick = () => setSelected({ id: id, name: name });
  const isShowOption = isShow ? "block" : "none";

  return {
    onClick,
    isShowOption,
  };
}
