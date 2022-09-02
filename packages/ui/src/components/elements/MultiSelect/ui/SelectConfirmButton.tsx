import React from "react";
import { Button } from "../../Buttons/Button";
import classes from "../style/button.module.scss";

export const SelectConfirmButton = () => {
  return (
    <div className={classes.selectConfirmButton_wrapper}>
      <Button
        configuration="tonal"
        size="large"
        state="default"
        label="창 닫기"
      ></Button>
      <Button
        configuration="filled"
        size="large"
        state="default"
        label="선택 완료"
        style={{ justifyContent: "center" }}
      ></Button>
    </div>
  );
};
