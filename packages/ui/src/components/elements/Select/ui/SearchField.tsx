import React from "react";
import { useSearch } from "../hooks";
import { Input } from "../../Input";
import classes from "../style/input.module.scss";

export function SearchField() {
  const { searchValue, onChange } = useSearch();

  return (
    <>
      <div className={classes.input}>
        <Input
          type="input"
          status="default"
          size="large"
          name="select-search"
          value={searchValue}
          onChange={onChange}
          placeholder="키워드로 검색하세요"
          isHelperText={false}
        ></Input>
      </div>
    </>
  );
}
