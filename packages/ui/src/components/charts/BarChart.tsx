import ReactEcharts from "echarts-for-react";

// const option = {
//   tooltip: {
//     trigger: "axis",
//     position: function (pt: any) {
//       return [pt[0], "10%"];
//     },
//   },
//   title: {
//     left: "center",
//     text: "바차트",
//   },
//   xAxis: {
//     type: "category",
//     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//   },
//   yAxis: {
//     type: "value",
//   },
//   series: [
//     {
//       data: [120, 200, 150, 80, 70, 110, 130],
//       type: "bar",
//     },
//   ],
// };

/**
 *
 * @param option (object) eCharts Option
 */

export const BarChart = ({ option }: any) => {
  return (
    <ReactEcharts option={option} style={{ height: "100%", width: "100%" }} />
  );
};
