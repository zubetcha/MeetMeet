import React from "react";
import { Checkbox } from "../../Checkbox";
import { Button } from "../../Buttons/Button";
import classes from "../style/select.module.scss";
import useIndeterminateCheckbox from "../hooks/useIndeterminateCheckbox";

export const IndeterminateCheckbox = () => {
  const {
    isChecked,
    onClickCheckedAll,
    onClickUncheckedAll,
  } = useIndeterminateCheckbox();

  return (
    <div
      id={"select-indetermindate-checkbox"}
      className={classes.option_intedeterminateCheckbox}
    >
      {isChecked ? (
        <Button
          configuration="text"
          size="small"
          state="focused"
          label="검색 결과 전체 선택"
          showIcon={true}
          icon="checked"
          onClick={onClickUncheckedAll}
          // iconColor="primary"
        ></Button>
      ) : (
        <Button
          configuration="text"
          size="small"
          state="default"
          label="검색 결과 전체 선택"
          showIcon={true}
          icon="unchecked"
          onClick={onClickCheckedAll}
        ></Button>
      )}
      {/* <Checkbox
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
      </Checkbox> */}
    </div>
  );
};
