import React from "react";
import { useSearch } from "../hooks";
import { TextField } from "../../TextField";
import classes from "../style/input.module.scss";

export function SelectSearchField() {
  const { searchValue, onChange } = useSearch();

  return (
    <>
      <div className={classes.input}>
        <TextField status="default" name="selectSearch">
          <TextField.Input
            type="input"
            name="selectSearchInput"
            value={searchValue}
            placeholder="키워드로 검색하세요"
            onChange={onChange}
          />
        </TextField>
      </div>
    </>
  );
}
