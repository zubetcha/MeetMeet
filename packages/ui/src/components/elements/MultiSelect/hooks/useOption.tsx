import { useEffect, useState } from "react";
import { useSelect } from "./SelectContext";

interface Props {
  id: string;
  name: string;
}

export function useOption({ id, name }: Props) {
  const {
    values,
    defaultValues,
    searchResult,
    firstRender,
    triggerButtonType,
    setValues,
    setCheckedItem,
  } = useSelect();

  const [isShow, setIsShow] = useState(true);
  const [isChecked, setIsChecked] = useState(
    triggerButtonType === "button" ? false : true
  );

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
    setValues({
      id: id,
      name: name,
      checked: isChecked,
    });
  }, []);

  useEffect(() => {
    if (!values) return;
    values?.filter((value: any) => value.name === name)[0]?.checked
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [values]);

  // // TOOD: defaultValue 버그 수정해야됨.
  useEffect(() => {
    if (firstRender && defaultValues && defaultValues.includes(name)) {
      setCheckedItem(name, true);
    }
  }, [defaultValues]);

  const isShowOption = isShow ? "block" : "none";

  return {
    isChecked,
    isShowOption,
    defaultValues,
    setCheckedItem,
  };
}
