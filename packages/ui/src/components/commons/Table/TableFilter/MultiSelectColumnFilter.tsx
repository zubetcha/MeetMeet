import React, { useState, useEffect, useRef } from "react";
import { MultiSelect } from "../../../elements";
import classes from "./filter.module.scss";

export const MultiFilter = (rows: any, columnIds: any, filterValues: any) => {
  return rows.filter((row: any) =>
    filterValues.includes(row.values[columnIds[0]])
  );
};

/**
 * @ㅇㄷㄴ
 * @param column 각 column 의 상태를 나타내는 React Table 에서 제공되는 column 객체입니다.
 * @returns
 */
export function MultiSelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const [dropdownItems, setDropdownItems] = useState<any[]>([]);

  useEffect(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    setDropdownItems(
      [...options.values()].map((option: any, idx: number) => {
        return {
          id: idx,
          name: option,
        };
      })
    );
  }, [id, preFilteredRows]);

  console.log(filterValue);

  return (
    <>
      <span className={classes.columnFilter_container}>
        <span id={`${id}-filter-wrapper`}>
          {dropdownItems && (
            <MultiSelect
              style={{ width: "250px" }}
              isSearch={true}
              triggerButtonType="icon"
              onChange={(items) => {
                setFilter(items?.map((item: any) => item.name));
              }}
            >
              {dropdownItems?.map((item, i) => (
                <MultiSelect.Option
                  id={`${item.id}`}
                  name={item.name}
                  key={`multi-option-${i}`}
                ></MultiSelect.Option>
              ))}
            </MultiSelect>
          )}
        </span>
      </span>
    </>
  );
}
