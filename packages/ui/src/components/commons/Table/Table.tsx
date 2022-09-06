import React, { useState, useEffect } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useRowSelect,
  useBlockLayout,
  useResizeColumns,
  useFlexLayout,
} from "react-table";
import { SelectColumnFilter } from "./Filter/SelectColumnFilter";
// import { DefaultColumnFilter } from "./Filter/DefaultColumnFilter";
import "./table.scss";
import Th from "./Th";
import { Radio } from "../../elements";
import { TablePropsType, TableInstanceWithHooks } from "./types/table.types";

export const Table = ({
  columns,
  data,
  height = "500px",
  selectedRadio,
  setSelectedRadio = () => {},
  setCheckedRow = () => {},
  setClickedRow = () => {},
  isResetResizingButton = false,
  isResetFilteringButton = false,
  initialFilterState = [],
}: TablePropsType) => {
  const defaultColumn = React.useMemo(
    (): any => ({
      // Let's set up our default Filter UI
      Filter: SelectColumnFilter,
      // filter: MultiFilter,
      minWidth: 150,
      width: 150,
      maxWidth: 600,
    }),
    []
  );

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value);
  };

  const initialState_: any = {
    filters: initialFilterState || [],
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    resetResizing,
    setAllFilters,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      // filterTypes
      initialState: initialState_,
    },
    useFilters, // useFilters!
    // useGlobalFilter, // useGlobalFilter!
    useSortBy,
    useRowSelect,
    useFlexLayout,
    useResizeColumns
  ) as TableInstanceWithHooks<any>;

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 100);

  useEffect(() => {
    setCheckedRow([...selectedFlatRows.map((row: any) => row.original)]);
  }, [selectedFlatRows]);

  const headerProps = (props: any, { column }: any) =>
    getStyles(props, column.align);

  const cellProps = (props: any, { cell }: any) =>
    getStyles(props, cell.column.align);

  const getStyles = (props: any, align = "left") => [
    props,
    {
      style: {
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        display: "flex",
      },
    },
  ];

  return (
    <>
      {isResetResizingButton && (
        <button onClick={resetResizing}>Reset Resizing</button>
      )}
      {isResetFilteringButton && (
        <button onClick={() => setAllFilters([])}>Reset Filter</button>
      )}
      <div className="tableWrap">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <>
                <tr {...headerGroup.getHeaderGroupProps({})} className="tr">
                  {headerGroup.headers.map((column: any, idx: number) => (
                    <>
                      <Th
                        column={column}
                        idx={idx}
                        isLast={idx === headerGroup.headers.length - 1}
                        key={`Th-${idx}`}
                      ></Th>
                    </>
                  ))}
                </tr>
              </>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="tbody"
            style={{ height: height }}
          >
            {rows.map((row, i) => {
              console.log(row);
              prepareRow(row);
              return (
                <>
                  <tr {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => {
                      return (
                        <>
                          <td
                            {...cell.getCellProps(cellProps)}
                            className="td"
                            onClick={() => {
                              if (
                                ["selection", "radio"].includes(cell.column.id)
                              )
                                return;
                              setClickedRow(row.original);
                            }}
                          >
                            {cell.column.id === "radio" && selectedRadio ? (
                              <div>
                                <Radio
                                  name={`radio-btn-${row.id}`}
                                  id={`radio-btn-${row.id}`}
                                  selectedValue={selectedRadio}
                                  onChange={onChangeRadio}
                                  value={row.id}
                                ></Radio>
                              </div>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        </>
                      );
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
