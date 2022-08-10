/**
 *
 * @description 데이터 길이에 따라 차트의 스크롤 길이 유동적으로 변경해주는 dataZoom 옵션의 start 값을 설정해주는 함수
 * @param chart (string) 차트 종류
 * @param length (number) 차트 데이터 배열의 길이
 * @param standard (number) DataZoom start 설정 기준
 */

export const getDataZoomStart = (
  chart: string,
  length: number,
  standard: number
) => {
  switch (chart) {
    case "history":
      return handleDataZoomStart(length, standard);

    case "line":
      return handleDataZoomStart(length, standard);

    case "bar":
      return handleBarDataZoomStart(length, standard);

    default:
      break;
  }
};

// DESCRIBE: HistoryChart | LineChart
const handleDataZoomStart = (length: number, standard: number) => {
  if (length <= standard * 1) return 0;
  else if (length <= standard * 2) return 10;
  else if (length <= standard * 3) return 20;
  else if (length <= standard * 4) return 30;
  else if (length <= standard * 5) return 40;
  else if (length <= standard * 6) return 50;
  else if (length <= standard * 7) return 60;
  else if (length <= standard * 8) return 70;
  else if (length <= standard * 9) return 80;
  else if (length <= standard * 10) return 90;
  else return 95;
};

// DESCRIBE: BarChart
const handleBarDataZoomStart = (length: number, standard: number) => {
  if (length <= standard * 1) return 0;
  else if (length <= standard * 2) return 20;
  else if (length <= standard * 3) return 40;
  else if (length <= standard * 4) return 60;
  else if (length <= standard * 5) return 80;
  else return 99;
};
