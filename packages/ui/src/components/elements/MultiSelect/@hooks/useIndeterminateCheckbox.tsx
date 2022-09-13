import React, { useState, useEffect } from "react";
import { useMultiSelect } from "../@context/MultiSelectContext";

export default function useIndeterminateCheckbox() {
  const { searchResult, values, onClickCheckedAll, onClickUncheckedAll } =
    useMultiSelect();

  const [isChecked, setIsChecked] = useState(false);
  const [isHalf, setIsHalf] = useState(false);

  useEffect(() => {
    if (!values) return;
    const totalNum = values?.length;
    const trueNum = values.filter((value: any) => value.checked).length;

    // DESCRIBE: 검색 결과가 있을 때
    if (searchResult && searchResult.length > 0) {
      handleIfSearchResultExists(searchResult, values);
      return;
    }

    setIsChecked(totalNum === trueNum);
  }, [values, searchResult]);

  const handleIfSearchResultExists = (searchResult: any[], values: any) => {
    const searchResultIdList = searchResult.map((item: any) => item.id);
    let isCheckedAll = true;
    values.map((value: any) => {
      if (searchResultIdList.includes(value.id) && value.checked === false) {
        isCheckedAll = false;
      }
    });

    setIsChecked(isCheckedAll);
  };

  return {
    isChecked,
    isHalf,
    setIsChecked,
    onClickCheckedAll,
    onClickUncheckedAll,
  };
}
