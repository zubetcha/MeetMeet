import React,{ useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

import { Text, Button } from "../../elements";
import classes from './inquiry-layout.module.scss';
import { TimePickerProps } from "../../../types/ui.types";
import { MultipleCalendars } from "../Calendar/CalendarLayout";


// 달력을 사용한 조회 기간 컴포넌트
export const TimePicker = ({
    start = new Date(),
    end = new Date(),
    startTime
}:TimePickerProps) => {
    const router = useRouter();
    // 달력이 있고 없고 조작하는 상태 값
    const [calendar, setCalendar] = useState<boolean>(false);
    // 달력이 보여줘야될 현재 날짜
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    // 조회 시작 일시 상태 값
    const [startDate, setStartDate] = useState<Date>(new Date(start.getFullYear(), start.getMonth(), start.getDate()));
    // 조회 종료 일시 상태 값
    const [endDate, setEndDate] = useState<Date>(new Date(end.getFullYear(), end.getMonth(), end.getDate()))

    console.debug('[TimePicker] renders');

    // DESCRIBE: props 변경될때마다 state값 업데이트
    useEffect(()=>{
        setStartDate(new Date(start.getFullYear(), start.getMonth(), start.getDate()));
        setEndDate(new Date(end.getFullYear(), end.getMonth(), end.getDate()));
    },[start, end])
    


    // DESCRIBE: 조회 시작 일시 클릭했을 때 
    const handleStartCalendar = () => {
        if(calendar){
            setCalendar(false)
        }else{
            setCurrentDate(startDate)
            setCalendar(true)
        }
    }
    // DESCRIBE: 조회 종료 일시 클릭했을 때
    const handleEndCalendar = () => {
        if(calendar){
            setCalendar(false);
        }else{
            setCurrentDate(endDate);
            setCalendar(true);
        }
    }

    // DESCRIBE: 날짜 적용하기 버튼 클릭 했을 때
    // TODO: 예외 처리
    const onClickSubmitBtn = (start:Date, end:Date) => {
        setStartDate(start);
        setEndDate(end);
        // console.log(router.query)
        router.push(
            {query:{
                ...router.query,
                startDate:start.toDateString(),
                endDate:end.toDateString(),
            }},
            undefined,
            {shallow:true}
        )

        setCalendar(false);
    }



    return(
        <div className={classes.inquiryBox} >
            <div className={classes.description} >
                <Text text="조회 기간" weight="regular" type="caption1" />
            </div>
            <Button 
                text={startDate.getFullYear() + '. ' + (startDate.getMonth()+1) + '. ' + startDate.getDate() + ' ~ ' + endDate.getFullYear() + '. ' + (endDate.getMonth()+1) + '. ' + endDate.getDate()}  
                size="large"
                style="line"
                onClick={() => calendar? setCalendar(false) : setCalendar(true)}
            />

            <div className={classNames(classes.calendar)} >
            {/* 삼항 연산자로 달력 렌더링 */}
            {calendar
                ? <MultipleCalendars startTime={startTime} setCalendar={setCalendar} onClickSubmitBtn={onClickSubmitBtn} date={endDate} start={startDate} end={endDate} />
                : null
            }
            </div>
        </div>
    )
}