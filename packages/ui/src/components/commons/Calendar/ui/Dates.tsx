import React, {useState} from 'react';
import classNames from "classnames";

import classes from './calendar.module.scss';
import { Cell } from '../../../elements/Cells/Cell';
import { DateType } from '../../../../types/ui.types';

export interface Props {
    dateInfo: {
        condition: string;
        weekend: string;
        date: number;
        value: Date;
    };
    onClickDate: (value: Date) => void;
    btwDates: boolean;
    startDate: boolean;
    endDate: boolean;
    hoverDate: boolean;
    onMouseOverDate: (value: Date) => void;
    onMouseLeaveDate: () => void;
    availableDates?: DateType;
    startHourMinutes?:number;
    timeType:'pastCurrent' | 'futureCurrent'
    weekendIncluded:boolean;
}


const Dates = ({
    dateInfo,
    onClickDate,
    btwDates, 
    startDate,
    endDate,
    hoverDate,
    onMouseOverDate,
    onMouseLeaveDate,
    availableDates,
    startHourMinutes,
    timeType,
    weekendIncluded
}:Props) => {
    const checkBtwDates = (d:Date) => {
        
        if(!availableDates) return false;

        if(availableDates.startDate.getTime() <= d.getTime() 
        && d.getTime() <= availableDates.endDate.getTime()) {
            return false;
        } else {
            return true;
        }

    }
    
    const currentHourMinutes = parseInt(`${new Date().getHours()}${new Date().getMinutes() >= 10 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`)
    const LastDate = startHourMinutes 
                        ? startHourMinutes + 30 >= currentHourMinutes 
                            ? new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() - 1)
                            : new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() - 0)
                        : new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() - 0);

    const checkDisableDate = () =>{
        return timeType === 'pastCurrent' 
            ? dateInfo.value.getTime() <= LastDate.getTime() 
            : dateInfo.value.getTime() >= LastDate.getTime()
    }

    const checkDisableWeekend = () => {
        return weekendIncluded 
            ? false
            : (dateInfo.weekend === 'weekday' ? false : true) 
    }

    const getDateColor = () => {
        let color;
        if(weekendIncluded && checkDisableDate() && dateInfo.condition === 'this'){
            if(dateInfo.weekend === 'saturday') color = `var(--color-tertiary)`
            else if(dateInfo.weekend === 'sunday') color = `var(--color-error)`
            else color = ''
        }else{
            color = ''
        }

        return color;
    }

    const getDateCursor = () => {
        let cursor;
        if(!weekendIncluded && dateInfo.weekend !== 'weekday'){
            cursor = 'default';
        } else {
            cursor = ''
        }

        return cursor;
    }


    return(
        <Cell 
            state={
                !checkDisableDate() || dateInfo.condition === 'other' 
                ? 'disable'
                : ((startDate || endDate)
                    ? 'focusedStartEnd'
                    : (btwDates && !checkDisableWeekend()
                        ? 'focused'
                        : 'default'))}
            label={dateInfo.date}
            style={{ 
                width: '48px', 
                height: '48px', 
                color:  getDateColor(),
                cursor: getDateCursor()
            }}
            isHover={!checkDisableWeekend() && hoverDate}
            onClick={() => {
                if (!checkBtwDates(dateInfo.value) && dateInfo.condition === "this" && checkDisableDate() && !checkDisableWeekend()) {
                    onClickDate(dateInfo.value);
                }
            }}
            onMouseOver={() => {
                if (dateInfo.condition === "this" && checkDisableDate() && !checkDisableWeekend()) {
                    onMouseOverDate(dateInfo.value);
                }
            }}
            onMouseLeave={() => {
                if (dateInfo.condition === "this" && checkDisableDate() && !checkDisableWeekend()) {
                    onMouseLeaveDate();
                }
            }} 
        />   
    )    
}



export default Dates;