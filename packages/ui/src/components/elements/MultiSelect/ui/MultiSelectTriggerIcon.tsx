import React, { useState } from "react";
import { useTriggerButton } from "../@hooks";
import { IconButton } from "../../Buttons/IconButton";

export function MultiSelectTriggerIcon() {
  const [isHover, setIsHover] = useState(false);
  const { label, onClick } = useTriggerButton();

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <IconButton
        configuration="textGray"
        size="small"
        icon="filter"
        state="default"
        color={isHover ? undefined : "transparent"}
      ></IconButton>
    </span>
  );
}
