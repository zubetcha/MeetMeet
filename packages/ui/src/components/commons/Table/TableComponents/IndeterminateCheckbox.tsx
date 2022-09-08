import React, { useRef, forwardRef, useEffect } from "react";
import { SVG } from "../../../elements";
import classes from "./indeterminateCheckbox.module.scss";

/**
 * @description
 * Column 에 들어가는 전체선택/해제 체크박스
 * & Table body Cell 에 들어가는 체크박스에 표시되는 테이블 컴포넌트입니다.
 */
// eslint-disable-next-line react/display-name
export const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <label>
          <span className={classes.checkbox}>
            {indeterminate ? (
              <SVG
                name="checkIndeterminated"
                width={"20px"}
                height={"20px"}
              ></SVG>
            ) : rest.checked ? (
              <SVG
                name="checked"
                width={"20px"}
                height={"20px"}
                color={"primary"}
              ></SVG>
            ) : (
              <SVG
                name="unchecked"
                width={"20px"}
                height={"20px"}
                color={"onSurfaceVariant"}
              ></SVG>
            )}
          </span>
          <input
            type="checkbox"
            ref={resolvedRef}
            {...rest}
            style={{ display: "none" }}
          />
        </label>
      </>
    );
  }
);
