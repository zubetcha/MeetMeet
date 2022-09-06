import React, { useState, useCallback } from "react";
import classes from "../style/select.module.scss";
import { useOutsideAlerter } from "../hooks";
import { Text } from "../../Text/Text";
import { MultiSelect } from "../index";
import { useSelect } from "../hooks";
interface Props {
  style: any;
  isOpen: boolean;
  triggerButtonType?: "button" | "icon";
  setIsOpen: (e: boolean) => void;
  isShowTriggerButton: boolean;
  isShowSearchField: boolean;
  children: React.ReactElement[];
}
export default function MultiSelectWrapper({
  style,
  isOpen,
  triggerButtonType,
  isShowTriggerButton,
  isShowSearchField,
  setIsOpen,
  children,
}: Props) {
  // const [selectedItemNumber, setSelectedItemNumber] = useState(0);
  const { confirmedValues, currentSelectedNumber, onClickCancel } = useSelect();

  const handleCancle = useCallback(() => {
    onClickCancel();
  }, [confirmedValues]);

  const { ref } = useOutsideAlerter(() => handleCancle());

  return (
    <div ref={ref} className={classes.selectContainer}>
      {isShowTriggerButton && triggerButtonType === "button" ? (
        <MultiSelect.Trigger />
      ) : (
        <MultiSelect.TriggerIcon />
      )}
      <div style={{ ...style }} className={classes.selectBody}>
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
        {isShowSearchField && <MultiSelect.Search />}
        <MultiSelect.List>{children}</MultiSelect.List>
      </div>
    </div>
  );
}
