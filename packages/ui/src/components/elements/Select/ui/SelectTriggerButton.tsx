import React from "react";
import { useTriggerButton } from "../hooks";
import { TextField } from "../../TextField";
import classes from "../style/select.module.scss";

export function SelectTriggerButton() {
  const { label, onClick } = useTriggerButton();

  return (
    <span className={classes.selectButtonWrapper} onClick={onClick}>
      <TextField status="default" name="selectSearch">
        <TextField.Input
          type="input"
          name="selectSearchInput"
          value={label}
          placeholder=""
          onChange={() => {}}
        />
        <TextField.Icon name="dropdown" />
      </TextField>
    </span>
  );
}
