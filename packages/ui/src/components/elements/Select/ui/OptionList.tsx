import React from "react";
import classes from "../style/select.module.scss";
import classNames from "classnames";

interface Props {
  searchResult: any[] | undefined;
  isShow: boolean;
  children: any;
}

export function OptionList({ searchResult, isShow, children }: Props) {
  const display = isShow ? "block" : "none";

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
