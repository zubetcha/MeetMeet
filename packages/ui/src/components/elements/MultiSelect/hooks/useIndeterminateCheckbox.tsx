import React, { useState, useEffect } from "react";
import { useSelect } from "./SelectContext";

export default function useIndeterminateCheckbox() {
  const { values, onClickCheckedAll, onClickUncheckedAll } = useSelect();

  const [isChecked, setIsChecked] = useState(false);
  const [isHalf, setIsHalf] = useState(false);

  useEffect(() => {
    if (!values) return;
    const totalNum = values?.length;
    const trueNum = values.filter((value: any) => value.checked).length;

    // DESCRIBE: 1. 모두 true 일 때 -> checked: true / isHalf = false
    if (totalNum === trueNum) {
      setIsChecked(true);
      setIsHalf(false);
    }
    // DESCRIBE: 2. 모두 false 일 때  -> checkd: false / isHalf = true
    else if (trueNum === 0) {
      setIsChecked(false);
      setIsHalf(true);
    }
    // DESCRIBE: 3. 일부 true 일 때 -> checked: true / isHalf = true
    else {
      setIsChecked(true);
      setIsHalf(true);
    }
  }, [values]);

  return {
    isChecked,
    isHalf,
    setIsChecked,
    onClickCheckedAll,
    onClickUncheckedAll,
  };
}
