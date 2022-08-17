import React from "react";
import classes from "./style/select.module.scss";
interface Props {
  searchResult: any[] | undefined;
  isShow: boolean;
  children: any;
}

export default function OptionList({ searchResult, isShow, children }: Props) {
  const display = isShow ? "block" : "none";

  return (
    <>
      {searchResult && searchResult.length === 0 ? (
        <div style={{ display: display }}>검색 결과 없음</div>
      ) : (
        <div className={classes.optionWrapper}>
          <div style={{ display: display }} className={classes.optionList}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
