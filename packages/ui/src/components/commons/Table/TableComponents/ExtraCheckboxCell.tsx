import React, { useState, useEffect } from "react";
import { Checkbox } from "../../../elements";

interface Props {
  row: any;
  onChange: (checked: boolean) => void;
}

export function ExtraCheckboxCell({ row, onChange }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  console.log("checkbox row id", row.id, row.original);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked]);

  return (
    <div>
      <Checkbox
        id={`checkbox-btn-${row.id}`}
        name={`checkbox-btn-${row.id}`}
        checked={isChecked}
        onChange={(checked: boolean) => setIsChecked(checked)}
      />
    </div>
  );
}
