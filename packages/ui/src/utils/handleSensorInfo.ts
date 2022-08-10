import { koreanSensorType } from "./consts";
import { colors } from "../shared/style";
import patternImageSrc from '@public/images/exception_pattern.png';

export const getSensorValueUnit = (
  value: number,
  sensorType: string,
  valueType?: string
) => {
  if (value === null || value === undefined) {
    return { value: "-", unit: "" };
  }

  switch (sensorType) {
    case "CU":
      return {
        value: value >= 1000 ? value / 1000 : value,
        unit: value >= 1000 ? " kA" : " A",
      };

    case "CT":
      if (value < 1000) {
        return {
          value: value,
          unit: " 회",
        };
      } else if (1000 <= value && value < 1000000) {
        return {
          value: value / 1000,
          unit: "k 회",
        };
      } else if (1000000 <= value && value < 1000000000) {
        return {
          value: value / 1000000,
          unit: "m 회",
        };
      } else {
        return {
          value: value / 1000000000,
          unit: "B 회",
        };
      }

    case "SC":
      if (value < 1000) {
        return {
          value: value,
          unit: " g",
        };
      } else if (1000 <= value && value < 1000000) {
        return {
          value: value / 1000,
          unit: " kg",
        };
      } else {
        return {
          value: value / 1000000,
          unit: " t",
        };
      }

    case "US":
      if (value < 100) {
        return {
          value: value,
          unit: " cm",
        };
      } else if (100 <= value && value < 100000) {
        return {
          value: value / 100,
          unit: " m",
        };
      } else {
        return {
          value: value / 100000,
          unit: " km",
        };
      }

    case "NH":
    case "HS":
    case "TV":
      if (value < 10000) {
        return {
          value: value,
          unit: " ppm",
        };
      } else {
        return {
          value: value / 10000,
          unit: " %",
        };
      }

    case "TH":
      if (value < 1000) {
        return {
          value: value,
          unit: valueType === "major" ? " ℃" : " %",
        };
      } else {
        return {
          value: value / 1000,
          unit: valueType === "major" ? "k ℃" : "k %",
        };
      }

    case "TP":
      if (value < 1000) {
        return {
          value: value,
          unit: " ℃",
        };
      } else {
        return {
          value: value / 1000,
          unit: "k ℃",
        };
      }

    case "VO":
      if (value < 1000) {
        return {
          value: value,
          unit: " V",
        };
      } else if (1000 <= value && value < 1000000) {
        return {
          value: value / 1000,
          unit: " kV",
        };
      } else {
        return {
          value: value / 1000000,
          unit: " MV",
        };
      }

    case "TL":
      switch (value) {
        case 0:
          return { value: value.toFixed(0), unit: "불빛 없음" };
        case 1:
          return { value: value.toFixed(0), unit: "아래 불빛" };
        case 2:
          return { value: value.toFixed(0), unit: "중간 불빛" };
        case 4:
          return { value: value.toFixed(0), unit: "맨위 불빛" };
      }

    case "FT":
      return { value: value.toFixed(0), unit: "신호 발생" };

    case "PX":
      return {
        value: value.toFixed(0),
        unit: value === 1 ? "열림 상태" : "닫힘 상태",
      };

    default:
      return {
        value: null,
        unit: null,
      };
  }
};

export const getElecValueUnit = (value: number, isHour: boolean = false) => {
  if (value === null) {
    return { value: "", unit: "" };
  }
  switch (true || false) {
    case value < 1000:
      return { value: value.toFixed(1), unit: isHour ? "Wh" : "W" };

    case value < 1000 ** 2:
      return { value: (value / 1000).toFixed(1), unit: isHour ? "kWh" : "kW" };

    case value < 1000 ** 3:
      return {
        value: (value / 1000 ** 2).toFixed(1),
        unit: isHour ? "MWh" : "MW",
      };

    case value < 1000 ** 4:
      return {
        value: (value / 1000 ** 3).toFixed(1),
        unit: isHour ? "GWh" : "GW",
      };

    default:
      return {};
  }
};

// DESCRIBE: ex.전류 01 의 형태로 만들어주는 함수
export const getSensorName = (sensorType: string, sensorId: string) => {
  return `${koreanSensorType[sensorType]} ${sensorId.slice(13)}`;
};

// DESCRIBE
export const getTooltipName = (sensorType: string, name: string) => {
  let tooltipName: string[] = [];
  const number = name.slice(name.length -2);

  if (sensorType !== "TH" && sensorType !== "TP") {
    tooltipName = [name, name];
  }
  if (sensorType === "TH") {
    tooltipName = [`온도`, `습도`]
  }
  if (sensorType === "TP") {
    tooltipName = [`감지부 온도`, `주변 온도`]
  }

  return tooltipName;
}

export const getTLSensorChartData = (value1: number, name: string, now: number) => {
  const duration = 1000 * 10;

  const patternImage = new Image()
  patternImage.src = patternImageSrc.src;
  const pattern = { image: patternImage, repeat: "repeat" };

  const lightColors = [["없음", colors.gray200], ["초록", colors.niceMedium], ["주황", colors.warningMedium], ["빨강", colors.dangerMedium], ["-", pattern ]];
  const colorIndexByValue: { [key: string]: number[] } = {
    null: [4, 4, 4],
    0: [0, 0, 0], // gray
    1: [1, 0, 0], // green
    2: [0, 2, 0], // yellow
    3: [1, 2, 0], // green + yellow
    4: [0, 0, 3], // red
    5: [1, 0, 3], // green + red
    6: [0, 2, 3], // yellow + red
    7: [1, 2, 3] // green + yellow + red
  };

  const TLSensorChartData = colorIndexByValue[String(value1)].map((colorIndex, index) => {
    return {
      name,
      value: [index, now - duration, now, duration],
      itemStyle: {
        color: lightColors[colorIndex][1],
      },
      groupId: lightColors[colorIndex][0] + "," + colorIndexByValue[String(value1)].map((colorIndex) => {
        return lightColors[colorIndex][1]
      }).join(),
    }
  })

  return TLSensorChartData;
}