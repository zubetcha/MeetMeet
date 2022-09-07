import React from "react";
import { useTriggerButton } from "../hooks";
import classes from "../style/select.module.scss";
import { SVG } from "../../SVG/SVG";
import { IconButton } from "../../Buttons/IconButton";

export function MultiSelectTriggerIcon() {
  const { label, onClick } = useTriggerButton();

  return (
    <span onClick={onClick}>
      <IconButton
        configuration="textGray"
        size="small"
        icon="filter"
        state="default"
        color="undefined"
      ></IconButton>
    </span>
  );
}
