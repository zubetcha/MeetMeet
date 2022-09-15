import React, {Children, useEffect} from "react";
import classes from "../@style/select.module.scss";
import classNames from "classnames";
import { useOptionList } from "../@hooks";

interface Props {
  children: any;
}

export function SelectOptionList({ children }: Props) {
  const { isOpen, searchResult, setSelected } = useOptionList();
  const display = isOpen ? "block" : "none";

  useEffect(()=>{
    Children.toArray(children).length===0 && setSelected(undefined);
    
  },[children])

  return (
    <>
      <div className={classes.optionContainer} style={{ display: display }}>
        <div className={classes.optionWrapper}>
          {searchResult && searchResult.length === 0 ? (
            <div className={classNames(classes.optionList, classes.noresult)}>
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className={classes.optionList}>{children}</div>
          )}
        </div>
      </div>
    </>
  );
}
