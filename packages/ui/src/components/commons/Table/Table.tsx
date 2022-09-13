import React from "react";
import {
  useTable,
  useFilters,
  useSortBy,
  useRowSelect,
  useResizeColumns,
  useBlockLayout,
  useFlexLayout,
  Column,
  Row,
} from "react-table";
import {
  MultiSelectColumnFilter,
  MultiFilter,
} from "./TableFilter/MultiSelectColumnFilter";
import "./@style/table.scss";
import Th from "./Th";
import { Radio } from "../../elements";
import { TablePropsType, TableInstanceWithHooks } from "./@types/table.types";
import useCustomTable from "./@hooks/useCustomTable";
import {
  ResetResizingButton,
  ResetFilteringButton,
  ExtraCheckboxCell,
} from "./TableComponents";

/**
 *
 * @param columns (Column) 컬럼 객체 (상위 컴포넌트에서 useMemo 또는 useState 로 감싸야 함).
 * @param rows (Row) 데이터 객체 리스트 (상위 컴포넌트에서 useMemo 또는 useState 로 감싸야 함).
 * @param height (string) 테이블 height 지정
 * @param defaultRadioValue (string) 디폴트로 선택할 radio button index (0 부터 시작)
 * @param defaultExtraCheckboxValues (string[]) 디폴트로 extra checkbox 에서 선택될 체크 박스 index 리스트 (0부터 시작)
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
  defaultRadioValue,
  defaultExtraCheckboxValues = [],
  onChangeCheckedRow = () => {},
  onChangeClickedRow = () => {},
  onChangeRadio = () => {},
  onChangeExtraCheckedRow = () => {},
  isResetResizingButton = false,
  isResetFilteringButton = false,
  initialFilterState = [],
}: TablePropsType) => {
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
      defaultColumn,
    },
    useFilters,
    useSortBy,
    useRowSelect,
    // OPTION 1: 반응형 아닐 때
    // useBlockLayout,
    // OPTION 2: 반응형 일 때
    useFlexLayout,
    useResizeColumns
  ) as TableInstanceWithHooks<any>;

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

  const {
    selectedRadio,
    handleClickRow,
    handleRadioButton,
    handleExtraCheckbox,
  } = useCustomTable({
    onChangeCheckedRow: onChangeCheckedRow,
    onChangeClickedRow: onChangeClickedRow,
    onChangeRadio: onChangeRadio,
    onChangeExtraCheckedRow: onChangeExtraCheckedRow,
    selectedFlatRows: selectedFlatRows,
    defaultRadioValue: defaultRadioValue,
  });

  const renderCell = (cell: any, row: Row) => {
    // DESCRIBE: ColumnComponent 중 RadioColumn 을 사용했을 경우
    if (cell.column.id === "radio") {
      return (
        <Radio
          name={`radio-btn-${row.id}`}
          id={`radio-btn-${row.id}`}
          selectedValue={selectedRadio}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleRadioButton(e, row.original)
          }
          value={row.id}
        ></Radio>
      );
    }
    // DESCRIBE: ColumnComponent 중 ExtraCheckboxColumn 을 사용했을 경우
    if (cell.column.id === "extraCheckbox") {
      return (
        <ExtraCheckboxCell
          row={row}
          onChange={(checked) => handleExtraCheckbox(checked, row)}
          defaultChecked={defaultExtraCheckboxValues.includes(row.id)}
        />
      );
    }

    return cell.render("Cell");
  };

  return (
    <>
      <ResetResizingButton
        isShow={isResetResizingButton}
        onClick={resetResizing}
      />
      <ResetFilteringButton
        isShow={isResetFilteringButton}
        onClick={() => setAllFilters([])}
      />
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
                            onClick={() => handleClickRow(cell.column.id, row)}
                          >
                            {renderCell(cell, row)}
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
