import React from "react";
import { useTriggerButton } from "../hooks";
import { TextField } from "../../TextField";
import { Button } from "../../Buttons/Button";
import { SVG } from "../../SVG/SVG";
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
          placeholder="키워드로 검색하세요"
          onChange={() => {}}
        />
        <TextField.Icon name="dropdown" />
      </TextField>
      {/* <Button
        label={label}
        size="large"
        state="hover"
        showIcon={false}
        showRightIcon={false}
        configuration="input"
        onClick={onClick}
        style={{ width: "100%" }}
      />
      <p className={classes.selectButtonIcon}>
        <SVG name="dropdown" color="onSurfaceVariant" />
      </p> */}
    </span>
  );
}
