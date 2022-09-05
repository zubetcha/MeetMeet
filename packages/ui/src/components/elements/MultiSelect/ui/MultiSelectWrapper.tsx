import React, {useState, useCallback} from 'react'
import classes from "../style/select.module.scss";
import { useOutsideAlerter } from "../hooks";
import { Text } from "../../Text/Text";
import { MultiSelect } from "../index";
import {useSelect} from "../hooks";
interface Props{
    style: any;
    isOpen: boolean;
    setIsOpen: (e:boolean)=>void;
    isShowTriggerButton: boolean;
    isShowSearchField: boolean;
    children: React.ReactElement[];
}
export default function MultiSelectWrapper({style, isOpen, isShowTriggerButton, isShowSearchField, setIsOpen, children}:Props) {
    // const [selectedItemNumber, setSelectedItemNumber] = useState(0);
    const {confirmedValues, currentSelectedNumber, onClickCancel} =useSelect();

    const handleCancle =useCallback(()=>{
      onClickCancel();
    },[confirmedValues]);

    const { ref } = useOutsideAlerter(()=>handleCancle());

    return (
    <div ref={ref} style={{ ...style }} className={classes.selectContainer}>
    {isOpen && (
      <div className={classes.label}>
        <Text
          type="body-small"
          style={{ textShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
        >
          {currentSelectedNumber}개 선택
        </Text>
      </div>
    )}
    {isShowTriggerButton && <MultiSelect.Trigger />}
    {isShowSearchField && <MultiSelect.Search />}
    <MultiSelect.List>{children}</MultiSelect.List>
  </div>
  )
}
