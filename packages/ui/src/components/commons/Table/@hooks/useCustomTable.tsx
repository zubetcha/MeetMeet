import React, { useEffect, useState } from "react";
import { Row } from "react-table";

interface Props {
  onChangeCheckedRow: (checkedRowList: any[]) => void;
  onChangeClickedRow: (clickedRow: any) => void;
  onChangeRadio: (selectedRadioRow: string) => void;
  selectedFlatRows: Row[];
  defaultRadio?: string;
}

export default function useCustomTable({
  onChangeCheckedRow,
  onChangeClickedRow,
  onChangeRadio,
  selectedFlatRows,
  defaultRadio,
}: Props) {
  const [selectedRadio, setSelectedRadio] = useState(defaultRadio);

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

  return {
    selectedRadio,
    handleClickRow,
    handleRadioButton,
  };
}
