import ReactEcharts from "echarts-for-react";

export function DoughnutChart({ color, data }: any) {
  const option = {
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        color: color,
        emphasis: {
          label: {
            show: false,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };

  return (
    <ReactEcharts option={option} style={{ height: "100%", width: "100%" }} />
  );
}
