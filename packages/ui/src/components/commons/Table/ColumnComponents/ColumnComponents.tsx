import { IndeterminateCheckbox } from "../TableComponents/IndeterminateCheckbox";

/**
 * @description 체크박스 열을 만들고 싶을 때 사용하는 Column 컴포넌트 입니다.
 * @param Header IndetermintateCheckbox (중간체크박스) 대신 Header 에 표시해줄 수 있는 Checkbox 입니다.
 * @param width (number) 체크박스 열의 width 를 지정합니다.
 * @returns
 */
export const CheckboxColumn = (Header?: JSX.Element, width?: number) => {
  return {
    id: "selection",
    Header: ({ getToggleAllRowsSelectedProps }: any) => {
      if (Header) return Header;
      return (
        <div>
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
      );
    },
    Cell: ({ row }: any) => (
      <div>
        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
      </div>
    ),
    width: width || 50,
    minWidth: width || 50,
    maxWidth: width || 50,
    canResize: false,
    canSort: false,
    canFilter: false,
  };
};

/**
 * @description radio 열을 만들고 싶을 때 사용하는 Column 컴포넌트 입니다.
 * @param headerName (string) radio 열의 headerName 을 지정합니다.
 * @param width (number) radio 열의 width 를 지정합니다.
 * @returns
 */
export const RadioColumn = (headerName: string, width?: number) => {
  return {
    id: "radio",
    Header: ({ getToggleAllRowsSelectedProps }: any) => <div>{headerName}</div>,
    width: width || 150,
    minWidth: width || 150,
    maxWidth: width || 150,
    canSort: false,
    canFilter: false,
  };
};
