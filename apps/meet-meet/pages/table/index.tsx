import React, { useMemo } from "react";
import {
  Table,
  CheckboxColumn,
  RadioColumn,
  ExtraCheckboxColumn,
} from "ui/src/components/commons/Table";

export default function TablePage() {
  const columns: any = React.useMemo(
    () => [
      // CheckboxColumn(),
      RadioColumn("라디오 박스"),
      ExtraCheckboxColumn("extra checkbox"),
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

  return (
    <Table
      columns={columns}
      data={rows}
      height={"700px"}
      defaultRadio={"0"}
      onChangeCheckedRow={(checkedRowList: any[]) =>
        console.log(checkedRowList)
      }
      onChangeClickedRow={(clickedRow: any) => console.log(clickedRow)}
      onChangeRadio={(selectedRadioRow: string) =>
        console.log("selectedRadioRow", selectedRadioRow)
      }
      onChangeExtraCheckedRow={(extraCheckedRowList: any[]) =>
        console.log(extraCheckedRowList)
      }
      initialFilterState={[
        {
          id: "sensorName",
          value: ["김서연", "이대호"],
        },
      ]}
    ></Table>
  );
}
