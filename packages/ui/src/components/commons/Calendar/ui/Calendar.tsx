import React, {useState, useEffect} from "react";

import { Text } from "../../../elements";
import classes from './calendar.module.scss'
import { CalendarProps } from "../../../../types/ui.types";
import { DateType } from "../../../../types/ui.types";
import Dates from "./Dates";

interface Props {
    date: Date;
    onClickDate: (value: Date) => void;
    start: Date;
    end: Date;
    hoverDates: Date[];
    onMouseOverDate: (value: Date) => void;
    onMouseLeaveDate: () => void;
    btwDates?:DateType;
    startTime?:number;
    timeType: 'pastCurrent' | 'futureCurrent';
    weekendIncluded: boolean
}

export const Calendar = ({
        date,
        onClickDate,
        start,
        end,
        hoverDates,
        onMouseOverDate,
        onMouseLeaveDate,
        btwDates,
        startTime,
        timeType,
        weekendIncluded
    }:Props) => {

    // 달력 1달치 날짜를 주별로 나눠서 상태관리
    const [month, setMonth] = useState<(number | Object)[][]>([]);

    useEffect(()=>{

        // DESCRIBE: date의 년도, 월
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();
        
        // DESCRIBE: date의 저번달, 이번달 마지막 일
        const prevLast = new Date(viewYear, viewMonth, 0);
        const thisLast = new Date(viewYear, viewMonth + 1, 0);

        const PLDate = prevLast.getDate();
        const PLDay = prevLast.getDay();

        const TLDate = thisLast.getDate();
        const TLDay = thisLast.getDay();

        // DESCRIBE: dates array에는 해당 달에 보이는 dates를 number로 정리
        const prevDates:number[] = [];
        const thisDates:number[] = [...Array(TLDate + 1).keys()].slice(1);
        const nextDates:number[] = [];

        // DESCRIBE: Month array에는 해당 달에 보이는 dates를 Date()로 정리
        const prevMonth:Date[] = [];
        const thisMonth:Date[] = [];
        const nextMonth:Date[] = [];


        // DESCRIBE: 토요일(6)이 아닐때; 달력에서 저번 달 몇일까지 보여야되는지 계산;
        if(PLDay !== 6){
            for (let i = 0; i < PLDay + 1; i++){
                prevDates.unshift(PLDate - i);
                prevMonth.unshift(new Date(viewYear, viewMonth, -i));
            }
        }

        // DESCRIBE: 달력에 이번 달이 몇일부터 몇일까지 있는지 정리
        for(let i = 1; i < TLDate+1; i++){
            thisMonth.push(new Date(viewYear, viewMonth, i))
        }

        // DESCRIBE: 달력에 다음달 몇일까지 보여야 되는지 정리
        for(let i = 1; i < 7 -TLDay; i++ ){
            nextDates.push(i);
            nextMonth.push(new Date(viewYear, viewMonth+1, i));
        }

        const totalDates = getTotalDates(
                            prevMonth, 
                            thisMonth, 
                            nextMonth, 
                            prevDates, 
                            thisDates, 
                            nextDates,
                            TLDate
                        );

        setMonth(getTotalWeeks(totalDates));
    },[date])

    // DESCRIBE: 각 날짜에 필요한 속성값 부여
    const getTotalDates = (
        prevMonth:Date[], 
        thisMonth:Date[], 
        nextMonth:Date[], 
        prevDates:number[], 
        thisDates:number[], 
        nextDates:number[],
        TLDate:number
    ) => {
        // DESCRIBE: prev, this, next 다 합친 것;
        const totalMonths:Date[] = [...prevMonth.concat(thisMonth, nextMonth)];
        const totalDates:number[]|Object[] = [...prevDates.concat(thisDates, nextDates)];

        const firstDateIndex:number = totalDates.indexOf(1);
        const lastDateIndex:number = totalDates.lastIndexOf(TLDate);

        // DESCRIBE: 모든 날들을 object로 필요한 상태들을 저장 시켜 관리
        totalDates.map((d, i)=>{
            const condition = i >= firstDateIndex && i < lastDateIndex + 1
                ? 'this'  
                : 'other'

            const date = totalMonths[i];

            let weekend;
            if (i%7 == 0) {
                weekend = 'sunday'
            }else if (i%7 == 6) {
                weekend = 'saturday'
            }else {
                weekend = 'weekday'
            }

            totalDates[i] = {
                condition : condition,
                value : date,
                weekend : weekend,
                date : d,
            }
        })

        return totalDates;
    }

    // DESCRIBE: 날들을 주별로 나눠서 구분지음
    const getTotalWeeks = (totalDates:any) => {
        let totalWeeks = [];
        for(let i = 0; i < totalDates.length/7; i++){
            totalWeeks.push(
                [
                    totalDates[0+i*7],
                    totalDates[1+i*7],
                    totalDates[2+i*7],
                    totalDates[3+i*7],
                    totalDates[4+i*7],
                    totalDates[5+i*7],
                    totalDates[6+i*7]
                ]
            )
        }

        return totalWeeks;
    }

    


    return(
        <>  
            <div className={classes.calendar_box} >
                <div className={classes.title} >
                    <Text
                        color="on-surface"
                        type="title-large"
                    >
                        {`${date.getFullYear()}년 ${date.getMonth()+1}월`}
                    </Text>    
                </div>
                <div className={classes.calendar_layout} >
                    <div className={classes.day_week}>
                        <div className={classes.date}><span className={classes.sunday}>일</span></div>
                        <div className={classes.date}><span>월</span></div>
                        <div className={classes.date}><span>화</span></div>
                        <div className={classes.date}><span>수</span></div>
                        <div className={classes.date}><span>목</span></div>
                        <div className={classes.date}><span>금</span></div>
                        <div className={classes.date}><span className={classes.saturday}>토</span></div>
                    </div>
                    {month.map((week, idx)=>{
                        return(
                        <div key={idx} className={classes.week} >
                            
                            {week.map((d:any, idx:number)=>{
                                return(
                                    <Dates 
                                        key={`dates-${idx}`} 
                                        dateInfo={d} 
                                        onClickDate={onClickDate}
                                        btwDates={d.value.getTime() >= start.getTime() && d.value.getTime() <= end.getTime()? true:false} 
                                        startDate={d.value.getTime() === new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()}  
                                        endDate={d.value.getTime() === new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()}  
                                        hoverDate={hoverDates[0]?.getTime() <= d.value.getTime() && d.value.getTime() <= hoverDates[hoverDates.length -1]?.getTime()}
                                        onMouseOverDate={onMouseOverDate}
                                        onMouseLeaveDate={onMouseLeaveDate}
                                        availableDates={btwDates? btwDates : undefined}
                                        startHourMinutes={startTime}
                                        timeType={timeType}
                                        weekendIncluded={weekendIncluded}
                                    />
                                )
                            })}
                        </div>
                        )
                    })}
                </div>
            </div>
            {/* 테스트 이제 그만할래.. */}
        </>
    )
}