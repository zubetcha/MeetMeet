import React from 'react';
import classes from './TimeSeries.module.scss';
import ReactEcharts from "echarts-for-react";
import { Text, Sensor } from '../../elements';
import { color } from '../../../utils/consts';

interface TimeSeriesChartProps {
  sensor :any[];
  option : any;
  eChartRef : React.RefObject<any>;
  isSelected : {[key:string] :boolean};
  setIsSelected: (e:boolean) => void;
  onClick : ()=>void;
}

export const TimeSeriesChart=({ 
  // 센서 라벨 만들기 위해 필요한 sensor 리스트
  sensor, 
  // 차트 옵션
  option, 
  // 차트 DOM 선택을 위한 ref 
  eChartRef, 
  // 선택된 센서 값들 (키 : 센서 이름)
  isSelected, 
  // 선택된 센서 값 setState 함수
  setIsSelected, 
  // 차트 선택했을 때 이벤트 onClick 함수
  onClick
}:TimeSeriesChartProps) => {

   // DESCRIBE: 센서 클릭 시, 차트 업데이트
   const onClickSensor=(e:React.MouseEvent<HTMLDivElement>, ref:any, selected:any, setSelected:any)=>{
    const {id} = e.target as HTMLDivElement
    if(ref && ref.current){
      ref.current?.getEchartsInstance().dispatchAction({
        type : selected[id] ? 'legendUnSelect' :'legendSelect',
        name: id,
      })
        setSelected({   
          ...selected,
          [id]:selected[id]?false:true,
        })  
      }
    }


    return (
        <>
        {option && 
        <>
          <div className={classes.sensor_wrapper}>
            <Text text="센서 상태"></Text>
            <ul className={classes.sensor_list}>
                {sensor.map((st:any,i:number)=>{
                    const status=st.status == "PASS"? "on": "off";
                    const name:string = `${st.type}${st.uniqueNumber}`;

                    return <Sensor 
                      isTooltip={true} 
                      name={name} 
                      status={status} 
                      key={`sensor-card-${st}-${i}`} 
                      onClick={(e)=> onClickSensor(e, eChartRef, isSelected, setIsSelected)}
                      selectColor={color[i]}
                      isSelected={isSelected[name] && isSelected[name]}
                      
                    ></Sensor>
                })}
            </ul>
          </div>
          <div className={classes.graph_wrapper}>
            <div className={classes.hide_left}></div>
              <div style={{marginBottom: "8px"}}>
                <Text text="선택 센서 실시간 그래프" type="caption1"></Text>
              </div>
            <div className={classes.graph_outer}>
            <div className={classes.graph_inner}>
              <div style={{height:'100%', position:'relative', display:'flex'}} onClick={onClick}>
                <ReactEcharts 
                    option={option} 
                    style={{ height: "100%", width: "100%" }}
                    ref={eChartRef}
                ></ReactEcharts>
              </div>
              </div>
            </div>
          <div className={classes.hide_right}></div>
          </div>
        </>
        }
        </>
    )
}
