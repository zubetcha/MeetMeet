import React, { useState, useCallback } from "react";
import classes from "../style/select.module.scss";
import { useOutsideAlerter } from "../hooks";
import { Text } from "../../Text/Text";
import { MultiSelect } from "../index";
import { useSelect } from "../hooks";
import classNames from "classnames";
interface Props {
  style: any;
  label?: string;
  isOpen: boolean;
  triggerButtonType: "button" | "icon";
  setIsOpen: (e: boolean) => void;
  isShowSearchField: boolean;
  children: React.ReactElement[];
}
export default function MultiSelectWrapper({
  style,
  isOpen,
  triggerButtonType = "button",
  isShowSearchField,
  children,
}: Props) {
  const { confirmedValues, currentSelectedNumber, onClickCancel } = useSelect();

  const handleCancle = useCallback(() => {
    onClickCancel();
  }, [confirmedValues]);

  const { ref } = useOutsideAlerter(() => handleCancle());

  return (
    <div ref={ref} className={classes.selectContainer}>
      {triggerButtonType === "button" ? (
        <div
          style={{ ...style, display: isShowSearchField ? "none" : "block" }}
        >
          <MultiSelect.Trigger />
        </div>
      ) : (
        <MultiSelect.TriggerIcon />
      )}
      <div
        style={{ ...style }}
        className={classNames(classes.selectBody, classes[triggerButtonType])}
        id="multiSelectBody"
      >
        {isOpen && (
          <div
            className={classNames(classes.label, classes[triggerButtonType])}
          >
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
