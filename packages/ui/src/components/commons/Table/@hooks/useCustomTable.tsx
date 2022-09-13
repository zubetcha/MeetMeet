import React, { useEffect, useState } from "react";
import { Row } from "react-table";

interface Props {
  onChangeCheckedRow: (checkedRowList: any[]) => void;
  onChangeClickedRow: (clickedRow: any) => void;
  onChangeRadio: (selectedRadioRow: string) => void;
  onChangeExtraCheckedRow: (checkedRowList: any[]) => void;
  selectedFlatRows: Row[];
  defaultRadioValue?: string;
}

export default function useCustomTable({
  onChangeCheckedRow,
  onChangeClickedRow,
  onChangeRadio,
  onChangeExtraCheckedRow,
  selectedFlatRows,
  defaultRadioValue,
}: Props) {
  const [selectedRadio, setSelectedRadio] = useState(defaultRadioValue);
  const [extraCheckbox, setExtraCheckbox] = useState<any>([]);

  // DESCRIBE: 체크박스 관련
  useEffect(() => {
    onChangeCheckedRow([...selectedFlatRows.map((row: any) => row.original)]);
  }, [selectedFlatRows]);

  // DESCRIBE: row 클릭 관련
  const handleClickRow = (id: string, row: Row) => {
    if (["selection", "radio"].includes(id)) return;
    onChangeClickedRow({ ...row.original });
  };

  // DESCRIBE: 라디오 버튼 관련
  const handleRadioButton = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedRow: any
  ) => {
    setSelectedRadio(e.target.value);
    onChangeRadio({ ...selectedRow });
  };

  // DESCRIBE: Extra Checkbox (추가 체크박스) 관련
  useEffect(() => {
    onChangeExtraCheckedRow(extraCheckbox);
  }, [extraCheckbox]);

  const handleExtraCheckbox = (checked: boolean, row: Row) => {
    if (checked) {
      setExtraCheckbox([...extraCheckbox, row.original]);
    } else {
      setExtraCheckbox([
        ...extraCheckbox.filter(
          (rowItem: any) =>
            JSON.stringify(rowItem) !== JSON.stringify(row.original)
        ),
      ]);
    }
  };

  return {
    selectedRadio,
    handleClickRow,
    handleRadioButton,
    handleExtraCheckbox,
  };
}
