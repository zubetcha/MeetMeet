import { useEffect, useState, useRef } from "react";
import { Echart } from "./Echart";
import classes from "./chart.module.scss";

interface ChartProps {
  data: Array<any>;
  color: Array<string>;
  height?: string;
  name: Array<string>;
  isTooltip?: boolean
}

StickChart.defaultProps = {
  data: [10, 30, 20],
  color: ["rgb(255, 198, 0)", "rgb(255, 159, 139)", "rgb(180, 139, 255)"],
  name: ['가동', '유휴', '비가동']
};

/**
 *
 * @param data: 차트에 들어가는 데이터 리스트
 * @param color: 차트에 사용되는 컬러 리스트
 * @returns
 */
export function StickChart({
  // data : 차트에 들어가는 데이터 리스트
  data,
  // color : 차트에 사용되는 컬러 리스트
  color,
  height='16px',
  name,
  isTooltip=true
}: ChartProps) {
  const chartRef = useRef(null as any);

  const [option, setOption] = useState<any>({
    tooltip: {
      trigger: 'axis',
      show: isTooltip,
      formatter: (params:any) => {
        return `${params.map((p:any) => {
          if(p.seriesName === '예외가동') return;
          
          return `<div style="display:flex; align-items:center; gap:4px ">
                      <svg height="10" width="10">
                        <circle cx="5" cy="5" r="5" stroke="black" stroke-width="0" fill=${p.color} />
                      </svg> 
                      <div>${p.seriesName}: <b> ${p.value} </b></div> <br/>
                    </div>`
        }).join('')}`
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
    legend: {
      show:false
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top:-15,
      // containLabel: true,
      width:'100%',
      height:100,
    },
    xAxis: {
      type: 'value',
      show: false,
      splitLine: {
          show: false
        },
    },
    yAxis: {
      type: 'category',
      show: false,
      data: ['가동실적']
    },
    series: data.map((d:string, idx:number) => {
      return {
        name: name[idx],
        type: 'bar',
        stack: 'total',
        data: [d],
        color: color[idx]
      }
    })
  });

  useEffect(() => {
    console.log(data, color)
    
    const _option = {
      tooltip: {
        trigger: 'axis',
        show: isTooltip,
        formatter: (params:any) => {
          return `${params.map((p:any) => {
            if(p.seriesName === '예외가동') return;
            
            return `<div style="display:flex; align-items:center; gap:4px ">
                      <svg height="10" width="10">
                        <circle cx="5" cy="5" r="5" stroke="black" stroke-width="0" fill=${p.color} />
                      </svg> 
                      <div>${p.seriesName}: <b> ${p.value} </b></div> <br/>
                    </div>`
          }).join('')}`
        },
        backgroundColor: "#FFFFFF",
        padding: 8,
        textStyle: {
          color: "rgba(0, 0, 0, 0.87)",
          fontSize: 11,
          fontWeight: 400,
        },
        extraCssText: "box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);",
      },
      legend: {
        show:false
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 0,
        top:-15,
        // containLabel: true,
        width:'fit-content',
        height:100,
      },
      xAxis: {
        type: 'value',
        show: false,
        splitLine: {
            show: false
          },
        // height:'100%'
      },
      yAxis: {
        type: 'category',
        show: false,
        data: ['가동실적']
      },
      series: data.map((d:number, idx:number) => {
        return {
          name: name[idx],
          type: 'bar',
          stack: 'total',
          data: [d < 0 ? 0 : d],
          color: color[idx],
          cursor: isTooltip ? 'pointer' : 'default'
        }
      })
    };

    setOption(_option)
  }, [data]);

  return (
    <div 
      className={classes.base_line}
      style={{ height:height}} 
      onMouseOver={()=>chartRef?.current?.getZr().setCursorStyle('default')}
    >
      <Echart 
        option={option && option} ref={chartRef}/>
    </div>
  );
}
