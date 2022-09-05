import React from "react";
import { Button } from "../../Buttons/Button";
import classes from "../style/button.module.scss";
import { useSelect } from "../hooks";

export const MultiSelectConfirmButton = () => {
  const {onClickCancel, onClickConfirm} = useSelect();
  return (
    <div className={classes.selectConfirmButton_wrapper}>
      <Button
        configuration="tonal"
        size="large"
        state="default"
        label="창 닫기"
        onClick={onClickCancel}
      ></Button>
      <Button
        configuration="filled"
        size="large"
        state="default"
        label="선택 완료"
        style={{ justifyContent: "center" }}
        onClick={onClickConfirm}
      ></Button>
    </div>
  );
};
