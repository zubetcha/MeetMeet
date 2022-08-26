import React, {useState} from 'react';
import classNames from "classnames";

import classes from './calendar.module.scss';
import { Cell } from '../../elements/Cells/Cell';
import { DatesProps } from "../../../types/ui.types";


/**
 * 
 * @param dateInfo date 정보 {condition,value,date,weekend}
 * @param onClickDate date 클릭시 이벤트 함수
 * @param btwDates date가 시작과 종료 날짜 사이에 있는지
 * @param startDate date가 시작 날짜인지
 * @param endDate date가 종료 날짜인지
 * @returns 
 */
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
    startHourMinutes
}:DatesProps) => {

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
                            new Date().getDate() - 2)
                            : new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() - 1)
                        : new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() - 1);


    return(
        <Cell 
            state={dateInfo.value.getTime() > LastDate.getTime() || checkBtwDates(dateInfo.value) || dateInfo.condition === 'other'
                ? 'disable'
                : ((startDate || endDate)
                    ? 'focusedStartEnd'
                    : (btwDates
                        ? 'focused'
                        : 'default'))}
            label={dateInfo.date}
            style={{ width: '48px', height: '48px' }}
            isHover={hoverDate}
            onClick={() => {
                if (!checkBtwDates(dateInfo.value) && dateInfo.condition === "this" && dateInfo.value.getTime() <= LastDate.getTime()) {
                    onClickDate(dateInfo.value);
                }
            } }
            onMouseOver={() => {
                if (dateInfo.condition === "this" && dateInfo.value.getTime() <= LastDate.getTime()) {
                    onMouseOverDate(dateInfo.value);
                }
            } }
            onMouseLeave={() => {
                if (dateInfo.condition === "this" && dateInfo.value.getTime() <= LastDate.getTime()) {
                    onMouseLeaveDate();
                }
            } } 
            day={'default'}        
        />   
    )    
}



export default Dates;