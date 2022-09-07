import React, { useState, useEffect } from "react";
import "./@style/table.scss";
import { IconButton } from "../../elements";

export default function Th({ column, idx, isLast }: any) {
  const [isShowIcon, setIsShowIcon] = useState(false);

  useEffect(() => {
    const filterComponent = document.querySelector(
      `#${column.id}-filter-wrapper #multiSelectBody`
    ) as HTMLSpanElement;
    if (isLast) {
      filterComponent.style.left = "-250px";
    }
  }, []);

  useEffect(() => {
    const filterIcon = document.querySelector(
      `#${column.id}_filter_icon svg`
    ) as HTMLElement;

    if (!filterIcon) return;

    if (isShowIcon) {
      filterIcon.style.fill = "null";
    } else {
      filterIcon.style.fill = "transparent";
    }
  }, [isShowIcon]);

  useEffect;

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
              <div className={"sort_icon"} id={`${column.id}_sort_icon`}>
                {/* Add a sort direction indicator */}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <IconButton
                      configuration="textGray"
                      size="small"
                      icon="downward"
                      state="default"
                      color={
                        column.isSorted || isShowIcon
                          ? undefined
                          : "transparent"
                      }
                    ></IconButton>
                  ) : (
                    <IconButton
                      configuration="textGray"
                      size="small"
                      icon="upward"
                      state="default"
                      color={
                        column.isSorted || isShowIcon
                          ? undefined
                          : "transparent"
                      }
                    ></IconButton>
                  )
                ) : (
                  <IconButton
                    configuration="textGray"
                    size="small"
                    icon="downward"
                    state="default"
                    color={
                      column.isSorted || isShowIcon ? undefined : "transparent"
                    }
                  ></IconButton>
                )}
              </div>
            ) : null}
          </div>
          {column.id !== "selection" && (
            <div className={"filter_icon"} id={`${column.id}_filter_icon`}>
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
