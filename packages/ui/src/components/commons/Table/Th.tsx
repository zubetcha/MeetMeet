import React, { useState, useEffect } from "react";
import "./table.scss";
import { SVG } from "../../elements";

export default function Th({ column, idx, isLast }: any) {
  const [isShowIcon, setIsShowIcon] = useState(false);

  //   useEffect(() => {
  //     const filterComponent = document.querySelector(
  //       `#${column.id}-filter-wrapper`
  //     ) as HTMLSpanElement;
  //     if (isLast) {
  //       filterComponent.style.left = "-250px";
  //     }
  //   }, []);

  return (
    <th {...column.getHeaderProps()} key={`th-${idx}`} className={"th"}>
      <div>
        {column.canGroupBy ? (
          // If the column can be grouped, let's add a toggle
          <span {...column.getGroupByToggleProps()}>
            {column.isGrouped ? "🛑 " : "👊 "}
          </span>
        ) : null}
        <div
          className={"th_inner_container"}
          onMouseEnter={() => setIsShowIcon(true)}
          onMouseLeave={() => setIsShowIcon(false)}
        >
          <div {...column.getSortByToggleProps()} className={"flex"}>
            {column.render("Header")}
            {column.canSort ? (
              <div className={"sort_icon"}>
                {/* Add a sort direction indicator */}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <SVG name="downward" width={"20"} height={"20"}></SVG>
                  ) : (
                    <SVG name="upward" width={"20"} height={"20"}></SVG>
                  )
                ) : (
                  <SVG name="downward" width={"20"} height={"20"}></SVG>
                )}
              </div>
            ) : null}
          </div>
          {column.id !== "selection" && (
            <div className={"filter_icon"}>
              {/* Render the columns filter UI */}
              {column.canFilter ? column.render("Filter") : null}
            </div>
          )}
        </div>
      </div>
      <div {...column.getResizerProps()} className={"resizer"}></div>
    </th>
  );
}
