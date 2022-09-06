import React, { useEffect, useState, useMemo } from "react";
import { Table, CheckboxColumn } from "ui/src/components/commons/Table";
import { Column, Row } from "react-table";

interface ISensorType {
  createdAt: string;
  customerId: number;
  customerName: string;
  equipmentId: number;
  equipmentName: string;
  factoryId: number;
  factoryName: string;
  isMain: boolean;
  location: string;
  mac: string;
  sensorHistory: any[];
  sensorId: string;
  sensorName: string;
  sensorNum: string;
  signalPeriod: number;
  type: string;
  updatedAt: string;
}

export default function TablePage() {
  //   const [rows, setRows] = useState<readonly Row<ISensorType>[]>([]);
  const [selectedRadio, setSelectedRadio] = useState("3");
  const [checkedRow, setCheckedRow] = useState();
  const [clickedRow, setClickedRow] = useState([]);

  useEffect(() => {
    console.log(selectedRadio);
  }, [selectedRadio]);

  useEffect(() => {
    console.log(checkedRow);
  }, [checkedRow]);

  useEffect(() => {
    console.log(clickedRow);
  }, [clickedRow]);

  const columns: any = React.useMemo(
    () => [
      CheckboxColumn(),
      {
        Header: "메인 전류 센서",
        accessor: "isMain_string",
        width: 170,
        Cell: ({ cell }: any) => {
          return cell.value === "true" ? <div>메인센서</div> : "";
        },
      },
      {
        Header: "센서 ID",
        accessor: "sensorId",
        width: 223,
      },
      {
        Header: "센서 이름",
        accessor: "sensorName",
        width: 200,
      },
    ],
    []
  );

  const rows: any = useMemo(
    () => [
      {
        isMain_string: "true",
        sensorId: "1",
        sensorName: "김서연",
      },
      {
        isMain_string: "false",
        sensorId: "2",
        sensorName: "이대호",
      },
      {
        isMain_string: "true",
        sensorId: "3",
        sensorName: "정주혜",
      },
    ],
    []
  );
  //   const rows = [
  //     {
  //       isMain_string: "true",
  //       sensorId: "1",
  //       sensorName: "김서연",
  //     },
  //     {
  //       isMain_string: "false",
  //       sensorId: "2",
  //       sensorName: "이대호",
  //     },
  //     {
  //       isMain_string: "true",
  //       sensorId: "3",
  //       sensorName: "정주혜",
  //     },
  //   ];

  return (
    <Table
      columns={columns}
      data={rows}
      height={"700px"}
      selectedRadio={selectedRadio}
      setSelectedRadio={setSelectedRadio}
      setCheckedRow={setCheckedRow}
      setClickedRow={setClickedRow}
      initialFilterState={[
        {
          id: "sensorName",
          value: ["전류"],
        },
      ]}
    ></Table>
  );
}
