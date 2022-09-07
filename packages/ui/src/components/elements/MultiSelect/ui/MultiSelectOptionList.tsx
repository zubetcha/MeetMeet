import React from "react";
import classes from "../@style/select.module.scss";
import classNames from "classnames";
import { useOptionList } from "../@hooks";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { MultiSelectConfirmButton } from "./MultiSelectConfirmButton";
interface Props {
  children: any;
}

export function MultiSelectOptionList({ children }: Props) {
  const { isOpen, searchResult } = useOptionList();
  const display = isOpen ? "block" : "none";

  return (
    <>
      <div className={classes.optionContainer} style={{ display: display }}>
        <div className={classes.optionWrapper}>
          {searchResult && searchResult.length === 0 ? (
            <div className={classNames(classes.optionList, classes.noresult)}>
              검색 결과 없음
            </div>
          ) : (
            <div className={classes.optionList}>
              <IndeterminateCheckbox />
              {children}
            </div>
          )}
          <MultiSelectConfirmButton />
        </div>
      </div>
    </>
  );
}
