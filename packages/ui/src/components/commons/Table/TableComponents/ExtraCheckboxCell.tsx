import React, { useState, useEffect } from "react";
import { Checkbox } from "../../../elements";

interface Props {
  row: any;
  onChange: (checked: boolean) => void;
  defaultChecked: boolean;
}

export function ExtraCheckboxCell({ row, onChange, defaultChecked }: Props) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked]);

  return (
    <div>
      <Checkbox
        id={`checkbox-btn-${row.id}`}
        name={`checkbox-btn-${row.id}`}
        checked={isChecked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setIsChecked(e.target.checked)
        }
      ></Checkbox>
    </div>
  );
}
