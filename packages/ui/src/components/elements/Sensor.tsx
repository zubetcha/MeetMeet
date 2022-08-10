import React, {useState} from 'react'
import classes from './elements.module.scss';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { useEffect } from 'react';

interface SensorProps{
    name?:string;
    id?: string;
    status:string; 
    isTooltip:boolean;
    isSelected?: boolean;
    selectColor? : string;
    onClick?:(e:React.MouseEvent<HTMLDivElement>)=>void;
    cursor?: string;
}

/**
 * @param name 센서 이름
 * @param id 센서id
 * @param status on | off | runUp | runDown | idle | exception
 * @param isTooltip true | false
 * @param isSelected 선택 됐는지 true | false
 * @param selectColor 선택 됐을 때 border color
 * @param onClick 클릭 이벤트
 * @returns 
 */
export const Sensor=({name, id, status, isTooltip, isSelected, selectColor, onClick, cursor="pointer"}:SensorProps)=> {
  const [isShowTooltip, setIsShowTooltip]=useState(false);
  const [isSelect, setIsSelect]=useState(isSelected);

  useEffect(()=>{
    if(isSelected!=undefined){
      setIsSelect(isSelected)
    } 
  },[isSelected])

  return (
    <div className={classes.sensor_wrapper} style={{ cursor }}>
      {isShowTooltip&&isTooltip&&<div
          onMouseOver={()=>setIsShowTooltip(true)}
          className={classes.sensor_tooltip} >
          <div className={classNames(classes.body, classes[status])}>{name&&name}</div>
      </div>}
      <div 
        className={classNames(classes[status],classes.sensor_outer)}
        style={{border: isSelect? `2px solid ${selectColor}`: '', cursor}} 
        onMouseOver={()=>setIsShowTooltip(true)}
        onMouseLeave={()=>setIsShowTooltip(false)}
        id={id}
        onClick={onClick&&onClick}
      >
          <div className={classNames(classes.sensor_inner, classes[status])}
           onMouseOver={()=>setIsShowTooltip(true)}
           id={id}
           onClick={onClick&&onClick}
           style={{ cursor }}
          ></div>
      </div>
    </div>
  )
}

