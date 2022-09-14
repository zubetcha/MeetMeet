import React from "react";
import { useTriggerButton } from "../@hooks";
import { TextField } from "../../TextField";
import classes from "../@style/select.module.scss";

export function SelectTriggerButton() {
  const { label, value, onClick } = useTriggerButton();

  return (
    <span className={classes.selectButtonWrapper} onClick={onClick}>
      <TextField status="default" name="selectSearch">
        <TextField.Label>{label}</TextField.Label>
        <TextField.Input
          type="input"
          name="selectSearchInput"
          value={value}
          placeholder=""
          onChange={() => {}}
          disabled
        >
          <TextField.Icon name="dropdown" />
        </TextField.Input>
      </TextField>
    </span>
  );
}
