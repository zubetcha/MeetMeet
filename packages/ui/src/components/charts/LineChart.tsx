import ReactEcharts from "echarts-for-react";

/**
 *
 * @param option (array) 차트를 그리는 데 사용되는 데이터
 */

export function LineChart({ option }: any) {
  return (
    <ReactEcharts option={option} style={{ height: "100%", width: "100%" }} />
  );
}
