import React, { useState, useEffect } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useRowSelect,
  useResizeColumns,
  useFlexLayout,
  Column,
} from "react-table";
import {
  MultiSelectColumnFilter,
  MultiFilter,
} from "./TableFilter/MultiSelectColumnFilter";
import "./@style/table.scss";
import Th from "./Th";
import { Radio } from "../../elements";
import { TablePropsType, TableInstanceWithHooks } from "./@types/table.types";

/**
 *
 * @param columns (Column) 컬럼 객체 (상위 컴포넌틑에서 useMemo 또는 useState 로 감싸야 함).
 * @param rows (Row) 데이터 객체 리스트 (상위 컴포넌틑에서 useMemo 또는 useState 로 감싸야 함).
 * @param height (string) 테이블 height 지정
 * @param defaultRadio (string) 디폴트로 선택할 radio button index (0 부터 시작)
 * @param onChangeCheckedRow (function) 체크박스 클릭시, 체크 선택된 객체 리스트를 상위 컴포넌트로 넘겨주는 콜백함수
 * @param onChangeClickedRow (function) 열 클릭시, 클릭된 객체를 상위 컴포넌트로 넘겨주는 콜백함수
 * @param onChangeRadio (function) 라디오버튼 클릭시, 선택된 객체를 상위 컴포넌트로 넘겨주는 콜백함수
 * @param isResetResizingButton (boolean) colunm resize 를 초기화시키는 버튼 사용 여부
 * @param isResetFilteringButton (boolean) 필터 초기화 버튼 사용 여부
 * @param initialFilterState <{id:string, value:string[]}>[] 초기 필터링을 걸기 위한 상태값
 * @returns
 */
export const Table = ({
  columns,
  data,
  height = "500px",
  defaultRadio,
  onChangeCheckedRow = () => {},
  onChangeClickedRow = () => {},
  onChangeRadio = () => {},
  isResetResizingButton = false,
  isResetFilteringButton = false,
  initialFilterState = [],
}: TablePropsType) => {
  const [selectedRadio, setSelectedRadio] = useState(defaultRadio);
  const initialFilterState_ = React.useMemo(
    () => initialFilterState,
    [initialFilterState]
  );

  const defaultColumn = React.useMemo(
    (): any => ({
      // Let's set up our default Filter UI
      Filter: (column: Column) =>
        MultiSelectColumnFilter({
          ...column,
          initialFilterState: initialFilterState_,
        }),
      filter: MultiFilter,
      minWidth: 150,
      width: 150,
      maxWidth: 600,
    }),
    []
  );

  const handleRadioButton = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedRow: any
  ) => {
    setSelectedRadio(e.target.value);
    onChangeRadio(selectedRow);
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
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    useRowSelect,
    useFlexLayout,
    useResizeColumns
  ) as TableInstanceWithHooks<any>;

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 100);

  useEffect(() => {
    onChangeCheckedRow([...selectedFlatRows.map((row: any) => row.original)]);
  }, [selectedFlatRows]);

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
          {/* DESCRIBE: Thead */}
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
          {/* DESCRIBE: Tbody */}
          <tbody
            {...getTableBodyProps()}
            className="tbody"
            style={{ height: height }}
          >
            {rows.map((row, i) => {
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
                              onChangeClickedRow(row.original);
                            }}
                          >
                            {/* DESCRIBE: Radio Row Cell */}
                            {cell.column.id === "radio" && selectedRadio ? (
                              <div>
                                <Radio
                                  name={`radio-btn-${row.id}`}
                                  id={`radio-btn-${row.id}`}
                                  selectedValue={selectedRadio}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => handleRadioButton(e, row.original)}
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
