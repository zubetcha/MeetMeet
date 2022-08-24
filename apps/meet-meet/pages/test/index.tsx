import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

export default function TestPage() {
  const [sampleDataList, setSampleDataList] = useState<number[]>([]);
  const [sampleLabelList, setSampleLabelList] = useState<number[]>([]);

  useEffect(() => {
    console.log(getRandomFloat(1.5, 5.5, 2));
    let dataList = [];
    let labelList = [];
    for (let i = 0; i < 800000; i++) {
      dataList.push(getRandomFloat(1.5, 5.5, 2));
      labelList.push(i);
    }
    setSampleDataList(dataList);
    setSampleLabelList(labelList);
  }, []);

  const getRandomFloat = (min: number, max: number, decimals: number) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
  };

  const option = {
    xAxis: {
      type: "category",
      data: sampleLabelList,
    },
    yAxis: {
      type: "value",
    },
    dataZoom: [
      {
        type: "slider",
        start: 99.9,
        end: 100,
      },
    ],
    series: [
      {
        data: sampleDataList,
        type: "line",
      },
    ],
  };

  return (
    <div style={{ height: "500px" }}>
      <ReactEcharts
        option={option}
        notMerge={true}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
