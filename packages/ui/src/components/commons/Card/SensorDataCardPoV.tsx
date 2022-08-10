import {useRef} from 'react';

import { Button, LineChart, SVG, Text } from "ui/src/pages";
import classes from "./card.module.scss";
import { getSensorValueUnit } from "../../../utils/handleSensorInfo";
import { getDataZoomStart } from "../../../utils";
import { SensorDataType, SensorDataTypePov } from "ui/src/assets/types/common-types";
import { colors } from "../../../shared/style";
import { Echart } from '../../charts/Echart';


interface SensorDataCardProps {
  sensorData: SensorDataTypePov;
  openCalendarLayout: (id:string) => void
}

/**
 *
 * @param data (array) 차트를 그리는 데 사용되는 데이터
 * @param _label (array) Line Chart의 Xaxis label에 사용되는 데이터
 * @param type (string) 어디에 쓰이는 Line Chart인지?
 * @param sensorType (string) type이 sensorLineChart인 경우 센서의 종류
 */

export const SensorDataCardPoV = ({ sensorData, openCalendarLayout }: SensorDataCardProps) => {
  const { sensorName, data, label, sensorType, btwHours, sensorId } = sensorData;
  const IndexOfValue1 = data[0].findIndex((f) => f !== null);
  const IndexOfValue2 = data[1].findIndex((f) => f !== null);

  const standard = 24;

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        // console.log(params)
        if(params[0].value === undefined){
          return `${params[0].name}<br/> <b> 데이터없음 </b>`;
        };
        
        if(sensorType === "TL"){
          return `${params[0].name}<br/> <b> ${params[0].value.toFixed(1)}</b>`;
        }

        const { value, unit }:any = getSensorValueUnit(params[0].value, sensorType);
    
        return `${params[0].name}<br/> <b> ${typeof value ==="string"? value : value.toFixed(1)} ${unit} </b>`;
      },
      backgroundColor: "#FFFFFF",
      padding: 8,
      textStyle: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 12,
        fontWeight: 400,
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
        height: 8,
        bottom: 0,
        backgroundColor: "transparent",
        handleStyle: {
          borderColor: "transparent",
          borderWidth: 10,
        },
        fillerColor: "rgba(0, 0, 0, 0.28)",
        handleIcon: "",
        start: getDataZoomStart("line", data[0].length, standard),
        animation: false
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
      height: 65,
      top: 15,
      left: 35,
      right: 0,
      bottom: 35,
      // borderColor: "transparent",
      borderWidth: 0,
    },
    xAxis: {
      type: "category",
      show: true,
      data: label,
      // axisLine: {
      //   show: true,
      // },
      splitLine: {
        show: false
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      minInterval: 1000 * 60 * 60,
      maxInterval: 1000 * 60 * 60,
      interval: 1000 * 60 * 60,
    },
    yAxis: {
      type: "value",
      show: true,
      axisLine: {
        show: true,
      },
      splitLine: {
        show: false
      }
    },
    series: data.map((d:any) => {
      return {
          type: "line",
          data: d,
          showSymbol:false,
          showAllSymbol:false,
          itemStyle: {
            color: "#116D38",
          },
          lineStyle: {
            color: "#116D38",
            width: 1,
          },
          markArea: {
            itemStyle: {
              color: 'rgba(0, 0, 0, 0.20)'
            },
            data: btwHours,
          },
        }
    }),
  };

  return (
    <>
      <div className={classes.sensorDataCard_container}>
        <div className={classes.cardHeader_layout} >
          <p className={classes.sensorName}>{sensorName}</p>
          <Button
            style="line"
            size="small"
            text="Raw data 다운로드"
            icon={<SVG name="document" color={colors.primary500} width="16" height="16"></SVG>}
            iconLocation="left"
            onClick={() => openCalendarLayout(sensorId)}
          />
        </div>
        {(IndexOfValue1 !== -1 || IndexOfValue2 !== -1)
          ? <div className={classes.sensorLineChart_boxShadow} >
              <Echart option={option}/>
            </div>
          : <div className={classes.sensorLineChart_noData} >
              <SVG name="error" color={colors.warningMedium}></SVG>
              <Text 
                  text= {"조회 기간 내 센서 데이터가 없습니다."}
                  type="body1"
                  weight="regular"
                  color="darkMedium"
              />
            </div>
        }
      </div>
    </>
  );
};