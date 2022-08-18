import React from "react";
import { useTriggerButton } from "../hooks";
import { Button } from "../../Buttons/Button";

export function SelectTriggerButton() {
  const { label, onClick } = useTriggerButton();

  return (
    <Button
      label={label}
      size="large"
      state="hover"
      showIcon={false}
      showRightIcon={false}
      configuration="filled"
      onClick={onClick}
      style={{ width: "220px" }}
    />
  );
}
