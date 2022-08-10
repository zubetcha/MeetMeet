import React, {useState, useEffect} from 'react';
import classes from './lightSensor.module.scss';
import classNames from 'classnames';
import {ILightSensorProps} from './LightSensor.types';

/**
 * 
 * @param value 경광등 센싱 값 "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7";
 * @returns 
 */
export function LightSensor({value}:ILightSensorProps) {
    const [sensorStatus, setSensorStatus]=useState({
        "red" : false,
        "yellow": false,
        "green" : false,
    })

    useEffect(()=>{
        handleLightBox(value);
    },[value]);

    useEffect(()=>{
        console.log(sensorStatus);
    },[sensorStatus])
    

    const makeLightStatus=(onList:string[])=>{
        let newStatus:any = {...sensorStatus};
        ["red", "yellow", "green"].map((sensor:string)=>{
            if(onList.includes(sensor)){
               newStatus[sensor]= true;
            }else{
                newStatus[sensor]= false;
            }
        })
        setSensorStatus({...newStatus})
    }

    // DESCRIBE : 경광등 신호등 만드는 함수. 
    // ( 색 없음 : 0, Green : 1, Yellow : 2, Red : 4, Green+Yellow : 3, Green + Red: 5, Yellow+Red : 6, Green+Yellow+Red: 7 )
    const  handleLightBox=(value:string)=>{

        switch(value){
            case '0': return makeLightStatus([]); 
            case '1': return makeLightStatus(['green']);
            case '2': return makeLightStatus(['yellow']);
            case '3': return makeLightStatus(['green', 'yellow']);
            case '4': return makeLightStatus(['red']);
            case '5': return makeLightStatus(['red', 'green']);
            case '6': return makeLightStatus(['yellow', 'red']);
            case '7': return makeLightStatus(['red','yellow','green']);
        }
    }


  return (
    <div className={classes.equipment_light_box}>
        <div className={classNames(classes.red, classes.color_box)}>
        {sensorStatus.red 
            ? <div className={classes.on}></div>
            : <div className={classes.off}></div> 
        }
            <div className={classes.base}></div>
        </div>
        <div className={classNames(classes.yellow, classes.color_box)}>
        {sensorStatus.yellow 
            ? <div className={classes.on}></div>
            : <div className={classes.off}></div> 
        }
            <div className={classes.base}></div>
        </div>
        <div className={classNames(classes.green, classes.color_box)}>
        {sensorStatus.green 
            ? <div className={classes.on}></div>
            : <div className={classes.off}></div> 
        }
            <div className={classes.base}></div>
        </div>
    </div>
  )
}