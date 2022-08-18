import React from "react";
import classes from "../style/select.module.scss";
import classNames from "classnames";
import { useOptionList } from "../hooks";

interface Props {
  children: any;
}

export function SelectOptionList({ children }: Props) {
  const { isOpen, searchResult } = useOptionList();
  const display = isOpen ? "block" : "none";

  return (
    <>
      <div className={classes.optionWrapper}>
        {searchResult && searchResult.length === 0 ? (
          <div
            style={{ display: display }}
            className={classNames(classes.optionList, classes.noresult)}
          >
            검색 결과 없음
          </div>
        ) : (
          <div style={{ display: display }} className={classes.optionList}>
            {children}
          </div>
        )}
      </div>
    </>
  );
}
