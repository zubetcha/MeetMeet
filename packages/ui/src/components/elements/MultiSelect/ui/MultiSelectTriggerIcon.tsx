import React from "react";
import { useTriggerButton } from "../hooks";
import classes from "../style/select.module.scss";
import { SVG } from "../../SVG/SVG";

export function MultiSelectTriggerIcon() {
  const { label, onClick } = useTriggerButton();

  return (
    <span onClick={onClick}>
      <SVG name={"filter"} width={"20"} height={"20"}></SVG>
    </span>
  );
}
