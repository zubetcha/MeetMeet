import {Echart} from './Echart';
import * as echarts from "echarts";
import { useRef } from "react";

import classes from "./chart.module.scss";
import { HistoryChartProps } from "../../types/ui.types";
import { getDataZoomStart, formatDateHour } from "../../utils";
import ExceptionPattern from '../../assets/img/exception_pattern.png';


interface HistoryChartPropsType {
  data: HistoryChartProps;
}

/**
 *
 * @param type (string) 차트 컨테이너 타입, value = "card" || "modal"
 * @param chartData (array) 차트를 그리는 데 사용되는 데이터
 * @param categories (array) 차트 레전드에 사용되는 데이터
 * @param startTime (number) 조회 기간 시작 날짜의 time
 * @param endTime (number) 조회 기간 종료 날짜의 time
 * @param handleConvertDiff 범위의 최대값
 */

const HistoryChart = ({ data }: HistoryChartPropsType) => {
  const { type, chartData, categories, startTime, endTime, handleConvertDiff, btwHours, timeStampList } =
    data;
  
  const {startTimestampList, stopTimestampList} = timeStampList;

  const standard = type === "modal" ? 12 : 6;

  const renderItem = (params: any, api: any) => {
    let categoryIndex = api.value(0);
    let start = api.coord([api.value(1), categoryIndex]);
    let end = api.coord([api.value(2), categoryIndex]);
    let height =
      type === "modal"
        ? api.size([0, 1])[1] * 0.66
        : api.size([0, 1])[1] * 0.53;
    let rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: type === "modal" ? height : height + height / 2,
        width: end[0] - start[0],
        height: height,
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      }
    );
    return (
      rectShape && {
        type: "rect",
        transition: ["shape"],
        shape: rectShape,
        style: api.style(),
      }
    );
  };

  const options = {
    tooltip: {
      formatter: (params: any) => {

        const [name, idx]=params.name.split('-');
        const idx_=parseInt(idx);

        if(!startTimestampList || !stopTimestampList) return; 
        
        const startTime = startTimestampList[idx_];
        const stopTime = stopTimestampList[idx_];

        if(!params.value) return;

        const tooltipValue = handleConvertDiff(params?.value[3]);
        return `${name==="분석중"? 
          `<span 
              style="display: inline-block;
              margin-right: 4px;
              border-radius: 10px;
              width: 10px;
              height: 10px;
              background: repeating-linear-gradient(135deg, #CACACC, #CACACC 1px, #EAEAEB 0, #EAEAEB 2px);"
          ></span>`
        : params.marker} ${name} : <span style="font-weight:700">${tooltipValue}</span><br/>시작시간: ${startTime} <br/>종료시간: ${stopTime}`;
      },
      textStyle: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 12,
        fontWeight:400,
        overflow: "truncate",
        ellipsis: "...",
      },
      padding:8,
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
        throttle: 150,
        brushSelect: false,
        height: 8,
        bottom: 2,
        backgroundColor: "transparent",
        borderColor: "transparent",
        fillerColor: "rgba(0, 0, 0, 0.28)",
        handleIcon: "",
        // start: getDataZoomStart("history", chartData.length, standard),
      },
      {
        type: "inside",
        filterMode: "weakFilter",
      },
    ],
    grid: {
      id: "history-chart",
      show: false,
      width: "fit-content",
      height: type === "modal" ? 100 : 50,
      containLabel: false,
      // top: 0,
      left: type === "modal" ? 20 : 13,
      right: 0,
      bottom: 12,
    },
    xAxis: {
      type: "time",
      // min: startTime,
      // max: endTime + 1000 * 60 * 0.5,
      scale: true,
      position: "top",
      minInterval:  1000 * 60 ,
      // maxInterval: 1000 * 60 * 60 * 60 *60 * 60,
      axisLabel: {
        formatter: (value: number, index: number) => {
          const newDate = new Date(value);
          const hour = newDate.getHours();
          const minute = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : `${newDate.getMinutes()}`;
          const formattedDate = formatDateHour(newDate);
          const [year, month, date]=formattedDate.split(" ")[0].split("-")
          
          return hour === 0 ? 
            date==="01" && type!=="modal"
              ?``
              : `${month}/${date}`
            :`${hour}:${minute}`;
        },
        color: "#8D8D8F",
        fontSize: type === "modal" ? 18 : 11,
        margin: 4,
        width: type === "modal" ? 200 : 30,
        verticalAlign: "bottom",
        show: true,
        showMinLabel: false,
        showMaxLabel: false,
        // overflow: "breakAll",
        align: "center",
        rich: {
          first: {
            align: "left",
          },
          last: {
            align: "right",
          },
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: true,
        inside: true,
        length: type === "modal" ? 100 : 50,
        lineStyle: {
          color: "#8D8D8F",
        },
      },
      zlevel: 1,
    },
    yAxis: {
      data: categories,
      show: false,
    },
    series: [
      {
        type: "custom",
        renderItem: renderItem,
        itemStyle: {
          opacity: 1,
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: chartData,
        markArea: {
          itemStyle: {
            color: '#000',
            opacity: 0.28
          },
          data : btwHours
        },
      },
    ]
  };

  return (
    <>
      <div
        className={classes.historyChart_container}
        style={{
          height: type === "modal" ? "150px" : "84px",
        }}
      >
        <Echart
          option={options}
        ></Echart>
      </div>
    </>
  );
};

// 배포

export default HistoryChart;
