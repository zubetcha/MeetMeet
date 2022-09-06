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
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [selected, setSelected] = useState<any[]>();
  const [isHoverFilter, setIsHoverFilter] = useState(false);
  const wrapperRef = useRef(null as any);

  useEffect(() => {
    if (filterValue === undefined) {
      setSelected(undefined);
    } else {
      let selectedValues = filterValue.map((value: string, idx: number) => {
        return {
          id: idx,
          name: value,
        };
      });
      setSelected([...selectedValues]);
    }
    console.log(filterValue);
  }, [filterValue]);

  const dropdownItems = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    const dropdownItems = [...options.values()].map(
      (option: any, idx: number) => {
        return {
          id: idx,
          name: option,
        };
      }
    );
    return dropdownItems;
  }, [id, preFilteredRows]);

  // useEffect(()=>{
  //   if(selected){
  //     setFilter(selected?.map((item)=>item.name));
  //   }
  // },[selected]);

  // Render a multi-select box
  return (
    <>
      <span
        className={classes.columnFilter_container}
        onMouseEnter={() => setIsHoverFilter(true)}
        onMouseLeave={() => setIsHoverFilter(false)}
      >
        {/* <span onClick={() => setIsShowFilter(!isShowFilter)}>
          <SVG name={"filter"} width={"20"} height={"20"}></SVG>
        </span> */}
        <span
          id={`${id}-filter-wrapper`}
          // className={classes.multiselect_container}
        >
          <MultiSelect
            style={{ width: "250px" }}
            isSearch={true}
            defaultIsOpen={true}
            onChange={(items) =>
              setFilter(items?.map((item: any) => item.name))
            }
          >
            {dropdownItems?.map((item, i) => (
              <MultiSelect.Option
                id={`${item.id}`}
                name={item.name}
                key={`multi-option-${i}`}
              ></MultiSelect.Option>
            ))}
          </MultiSelect>
        </span>
      </span>
    </>
  );
}
