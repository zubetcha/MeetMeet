import React from "react";
import { useTriggerButton } from "../hooks";
import { TextField } from "../../TextField";
import classes from "../style/select.module.scss";

export function MultiSelectTriggerButton() {
  const { label, onClick } = useTriggerButton();

  return (
    <span className={classes.selectButtonWrapper} onClick={onClick}>
      <TextField name="multiSelectSearch" status="default">
        <TextField.Label>라벨자리</TextField.Label>
        <TextField.Input
          type="text"
          value={label}
          placeholder=""
          onChange={() => {}}
        >
          <TextField.Icon name="dropdown" />
        </TextField.Input>
        <TextField.HelperText>테스트</TextField.HelperText>
      </TextField>
    </span>
  );
}
