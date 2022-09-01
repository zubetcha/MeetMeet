import React from "react";
import { Checkbox } from "../../Checkbox";
import classes from "../style/select.module.scss";
import useIndeterminateCheckbox from "../hooks/useIndeterminateCheckbox";

export const IndeterminateCheckbox = () => {
  const {
    isChecked,
    isHalf,
    setIsChecked,
    onClickCheckedAll,
    onClickUncheckedAll,
  } = useIndeterminateCheckbox();

  return (
    <div
      id={"select-indetermindate-checkbox"}
      className={classes.option_intedeterminateCheckbox}
    >
      <Checkbox
        id={"select-indetermindate-checkbox"}
        name={"select-indetermindate-checkbox"}
        checked={isChecked}
        isHalf={isHalf}
        onChange={(checked: boolean) => {
          checked ? onClickCheckedAll() : onClickUncheckedAll();
          setIsChecked(checked);
        }}
      >
        <Checkbox.Label style={{ marginLeft: "11px" }}>
          전체 선택
        </Checkbox.Label>
      </Checkbox>
    </div>
  );
};
