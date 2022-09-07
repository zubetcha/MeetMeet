import { TableInstance, Column, Row } from "react-table";
import { Dispatch, SetStateAction } from "react";

type Filter = {
  id: string;
  value: any | any[];
};

export interface TablePropsType {
  columns: readonly Column<any>[];
  data: readonly Row<any>[];
  height?: string;
  defaultRadio?: string;
  onChangeCheckedRow?: (checkedRowList: any[]) => void;
  onChangeClickedRow?: (clickedRow: any) => void;
  onChangeRadio?: (selectedRadioRow: string) => void;
  onChangeExtraCheckedRow?: (checkedRowList: any[]) => void;
  isResetResizingButton?: boolean;
  isResetFilteringButton?: boolean;
  initialFilterState?: Filter[];
}

export type TableInstanceWithHooks<T extends object> = TableInstance<T> & {
  resetResizing: any;
  selectedFlatRows: any;
  state: any;
  setAllFilters: any;
};
