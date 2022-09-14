import React from "react";
import { useTriggerButton } from "../@hooks";
import { TextField } from "../../TextField";
import classes from "../@style/select.module.scss";

export function MultiSelectTriggerButton() {
  const { label, value, isOpen, onClick } = useTriggerButton();

  return (
    <span className={classes.selectButtonWrapper} onClick={onClick}>
      <TextField name="multiSelectSearch" status="default">
        {!isOpen && <TextField.Label>{label}</TextField.Label>}
        <TextField.Input
          type="text"
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
