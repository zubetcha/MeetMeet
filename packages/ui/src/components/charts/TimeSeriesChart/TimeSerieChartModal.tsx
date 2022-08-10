import React from 'react';
import ReactEcharts from "echarts-for-react";
import { Modal, Button, Text, Sensor } from '../../elements';
import { color } from '../../../utils/consts';

interface TimeSeriesChartProps {
  title : string;
  sensor :any[];
  option : any;
  eChartRef : React.RefObject<any>;
  isSelected : {[key:string] :boolean};
  setIsSelected: (e:boolean) => void;
  onClick : ()=>void;
}

export const TimeSeriesChartModal=({
  // 장비 이름 (차트 이름)
  title, 
  // 센서 라벨 만들기 위해 필요한 sensor 리스트
  sensor, 
  // 차트 옵션
  option, 
  // 차트 DOM 선택을 위한 Ref
  eChartRef,
   // 선택된 센서 값들 (키 : 센서 이름)
  isSelected, 
  // 선택된 센서 값 setState 함수
  setIsSelected, 
  // 차트 선택했을 때 이벤트 onClick 함수
  onClick,
}:TimeSeriesChartProps) =>{
   
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
          <Modal>
              <div style={{height:"100%", width:"1000px"}}>
                <div style={{display:"flex", flexDirection:"column", rowGap:"16px", marginBottom: "24px"}}>
                  <Text text="선택 센서 실간 그래프" type="header5"></Text>
                  <Text text={`${title}`} type="header3" weight='bold'></Text>
                  <div style={{display:"flex", columnGap:"8px"}}>
                    {sensor&&sensor.map((st,i)=>{
                      const status=st.status == "PASS"? "on": "off";
                      const name = `${st.type}${st.uniqueNumber}`;

                      return (
                      <Sensor 
                        isTooltip={true} 
                        name={name} 
                        status={status} 
                        key={`sensor-modal-${st}-${i}`} 
                        onClick={(e)=> onClickSensor(e, eChartRef, isSelected, setIsSelected)}
                        selectColor={color[i]}
                        isSelected={isSelected[name] && isSelected[name]}
                       ></Sensor>)
                    })}
                  </div>
                </div>
                  <div style={{marginBottom: "24px", height:"500px", width:"100%", boxShadow:"inset 0px 0px 8px rgba(0, 0, 0, 0.16)"}}>
                  <ReactEcharts 
                      option={option} 
                      style={{ height: "100%", width: "100%" }}
                      ref={eChartRef}
                  ></ReactEcharts>
                  </div>
                  <div style={{height:"100%", width:"100%"}}>
                      <Button text="창 닫기" onClick={onClick} width={"100%"}></Button>
                  </div> 
              </div>
          </Modal>
    
        </>
    )
}
