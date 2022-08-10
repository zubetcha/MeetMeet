import { useRef } from "react";
import classes from "./card.module.scss";
import { getDataZoomStart,getElecValueUnit } from "../../../utils";
import { Text, BarChart } from "ui/src/pages";
import { SVG } from "../../elements";
import { Tooltip } from "ui/src/pages";
import { colors } from "../../../shared/style";

interface ElectricityCardProps {
  data: {
    totalElectricity: number;
    dates: string[];
    values: number[];
    electricSensorMain:boolean;
    currentDepth:string;
    voltage:number;
  };
}

/**
 *
 * @param totalElectricity (number) 총 전력량
 * @param dates (array) Bar Chart의 Xaxis label에 사용되는 데이터
 * @param values (array) Bar Chart에 사용되는 데이터?
 */

export const ElectricityCard = ({ data }: ElectricityCardProps) => {
  const { totalElectricity, dates, values , currentDepth, electricSensorMain } = data;
  const voltage = data.voltage;

  const chartRef = useRef(null as any);

  const standard = 24;

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        let {value, unit} = getElecValueUnit(params[0].value, true);
        // const unit = "kWh";
        if(value === undefined && unit === undefined){
          value="-";
          unit="kWh";
        }
        return `${params[0].name}<br/><span style="font-weight:700">${value} ${unit}</span>`;
      },
      backgroundColor: "#FFFFFF",
      padding: 8,
      textStyle: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 12,
        fontWeight:400,
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
        borderColor: "transparent",
        fillerColor: "rgba(0, 0, 0, 0.28)",
        handleIcon: "",
        start: getDataZoomStart("bar", values?.length, standard),
      },
      {
        type: "inside",
        filterMode: "weakFilter",
      },
    ],
    grid: {
      top: 0,
      right: 0,
      bottom: 9,
      left: 0,
    },
    xAxis: {
      type: "category",
      data: dates,
      show: false,
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        data: values,
        type: "bar",
        itemStyle: {
          color: "#116D38",
        },
      },
    ],
  };

  const renderTotalElectricity = (totalElectricity:number)=>{
    let {value, unit}= getElecValueUnit(totalElectricity, true);

    // DESCRIBE: value null 일떄 예외처리
    if(value === "" && unit === ""){
      value="-";
      unit="kWh";
    }

    return(
        <>
          <p className={classes.electricity}>
            {value}
          </p>
          <p className={classes.electricity_unit}>{unit}</p>
        </>
    )
    
}

  return (
    <div className={classes.electricityCard_container}>
      <div className={classes.header}>
        <Text text="전력 사용량" type="header5" weight="regular" />
        <div className={classes.betaFlag}>Beta</div>
        <Tooltip
          text1={currentDepth==="customer" || voltage === undefined
              ? <div>전류센서가 설치된 설비만 감지가 가능합니다.</div>
              : <div>전류센서가 설치된 설비만 감지가 가능하며, </div>}

          text2={currentDepth==="customer" || voltage === undefined
          ? <div>결과 값은 각 공장의 정격 전압을 대입해 계산했습니다.</div>
          : <div>결과 값은 공장 정격 전압({voltage}V)을 대입해 계산했습니다.</div>}
        />
      </div>
      {electricSensorMain || currentDepth!=="equipment" ? 
        <>
          <div className={classes.electricity_wrapper}>
            {renderTotalElectricity(totalElectricity)}
          </div>
          <div className={classes.barChart_wrapper}>
            <p className={classes.barChart_title}>일간 트렌드</p>
            <div 
              className={classes.electricity_barChart}
              >
              <BarChart option={option} />
            </div>
          </div>
        </>
      :
        <>
           <div className={classes.barChart_wrapper}>
             <section className={classes.exception}>
              <SVG
                name="error"
                width="40"
                height="40"
                color={colors.warningMedium}
              ></SVG>
              <p>
                <Text text={currentDepth==="equipment"? "전력 사용량 조회 센서가 부착되지 않았습니다.":"전력 사용량 조회 센서가 부착된 설비가 없습니다."} type="body1" weight="400" color="darkMedium"/>
              </p>
             </section>
          </div>
        </>
      }
      
    </div>
  );
};
