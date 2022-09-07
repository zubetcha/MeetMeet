import React, { useState, useEffect, useRef } from "react";
import { MultiSelect } from "../../../elements";
import classes from "./filter.module.scss";
import { SVG } from "../../../elements";

export const MultiFilter = (rows: any, columnIds: any, filterValues: any) => {
  return rows.filter((row: any) =>
    filterValues.includes(row.values[columnIds[0]])
  );
};

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const [dropdownItems, setDropdownItems] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any[]>([]);
  const [isHoverFilter, setIsHoverFilter] = useState(false);
  const wrapperRef = useRef(null as any);
  const firstRef = useRef(true);

  useEffect(() => {
    const options = new Set();
    console.log(preFilteredRows);

    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    console.log("preFilteredRows", id, preFilteredRows);
    const newDropdownItems = [...options.values()].map(
      (option: any, idx: number) => {
        return {
          id: idx,
          name: option,
        };
      }
    );
    console.log("newDropdownItems", newDropdownItems);
    setDropdownItems(newDropdownItems);
  }, [id, preFilteredRows]);

  useEffect(() => {
    console.log("filterValue", filterValue);
  }, [filterValue]);

  useEffect(() => {
    if (firstRef && dropdownItems && dropdownItems.length > 0) {
      setInitialValues([...dropdownItems.map((item) => item.name)]);
      firstRef.current = false;
    }
  }, [dropdownItems]);

  return (
    <>
      <span
        className={classes.columnFilter_container}
        onMouseEnter={() => setIsHoverFilter(true)}
        onMouseLeave={() => setIsHoverFilter(false)}
      >
        <span id={`${id}-filter-wrapper`}>
          {dropdownItems && (
            <MultiSelect
              style={{ width: "250px" }}
              isSearch={true}
              triggerButtonType="icon"
              defaultValues={filterValue}
              onChange={(items) => {
                console.log(
                  "새로바뀌는 items 들",
                  items?.map((item: any) => item.name)
                );
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
