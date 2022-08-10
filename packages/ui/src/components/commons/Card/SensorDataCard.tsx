import { LineChart } from "ui/src/pages";

import classes from "./card.module.scss";
import { getDataZoomStart } from "../../../utils";
import { SensorDataType } from "ui/src/assets/types/common-types";

interface SensorDataCardProps {
  sensorData: SensorDataType;
}

/**
 *
 * @param data (array) 차트를 그리는 데 사용되는 데이터
 * @param _label (array) Line Chart의 Xaxis label에 사용되는 데이터
 * @param type (string) 어디에 쓰이는 Line Chart인지?
 * @param sensorType (string) type이 sensorLineChart인 경우 센서의 종류
 */

export const SensorDataCard = ({ sensorData }: SensorDataCardProps) => {
  const { sensorName, data, label, sensorType } = sensorData;
  const standard = 24;

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const unit =
          sensorType && sensorType === "CU"
            ? "A"
            : sensorType === "TH"
            ? "℃"
            : "μJ";
        return `${params[0].name}<br/>${params[0].value} ${unit}`;
      },
      backgroundColor: "#FFFFFF",
      padding: 8,
      textStyle: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 11,
        fontWeight: 700,
      },
      extraCssText: "box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);",
    },
    title: {
      show: false,
    },
    dataZoom: [
      {
        type: "slider",
        filterMode: "weakFilter",
        showDataShadow: false,
        labelFormatter: "",
        throttle: 100,
        brushSelect: false,
        height: 4,
        // top: 92,
        bottom: 0,
        backgroundColor: "transparent",
        borderColor: "transparent",
        fillerColor: "rgba(0, 0, 0, 0.28)",
        handleIcon: "",
        start: getDataZoomStart("line", data.length, standard),
      },
      {
        type: "inside",
        filterMode: "weakFilter",
      },
    ],
    grid: {
      id: "sensor-line-chart",
      show: true,
      width: "fit-content",
      height: 84,
      top: 4,
      left: 0,
      right: 0,
      bottom: 8,
      borderColor: "transparent",
      borderWidth: 0,
    },
    xAxis: {
      type: "category",
      show: false,
      data: label,
      axisLine: {
        show: false,
      },
      minInterval: 1000 * 60 * 60,
      maxInterval: 1000 * 60 * 60,
      interval: 1000 * 60 * 60,
    },
    yAxis: {
      type: "value",
      show: false,
      axisLine: {
        show: false,
      },
    },
    series: [
      {
        type: "line",
        data: data,
        symbol: "emptyCircle",
        itemStyle: {
          color: "#116D38",
        },
        lineStyle: {
          color: "#116D38",
          width: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={classes.sensorDataCard_container}>
        <p className={classes.sensorName}>{sensorName}</p>
        <div className={classes.sensorLineChart_boxShadow}>
          <LineChart option={option} />
        </div>
      </div>
    </>
  );
};
