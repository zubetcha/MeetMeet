import React, {useEffect, useState} from "react";

import classes from "./calendar.module.scss"
import { MultipleCalendarsProps } from "../../../types/ui.types";
import {Button} from "../../elements"; 
import { Calendar } from "../Calendar/Calendar";
import { formatDate } from "../../../utils";

/**
 * 
 * @param date 달력 날짜
 * @param start 조회 시작 날짜
 * @param end 조회 종료 날짜
 * @param onClickSubmitBtn 날짜 적용하기 벝는 클릭시 이벤트 함수
 * @returns 
 */
export const MultipleCalendars = ({
        date,
        start,
        end,
        onClickSubmitBtn,
        setCalendar,
        startTime
    }:MultipleCalendarsProps) => {

    useEffect(()=>{
        // 이 컴포넌트가 없어질 때 return 안에 코드가 실행됨
        // 처음 달력이 렌더됬을 때로 시작 & 종료 돌아감
        return(()=> {
            setStartDate(start);
            setEndDate(end);
        })
    },[])

    // 달력 안에서 시작 일시
    const [startDate, setStartDate] = useState<Date>(start);
    // 달력 안에서 종료 일시
    const [endDate, setEndDate] = useState<Date>(end);
    // 달력 날짜
    const [currentDate, setCurrentDate] = useState<Date>(date);
    // 달력 selected된 date type  ex)start, end
    const [selectedDateType, setSelectedDateType] = useState<string>('start');
    // // 달력 selected된 date type이 있는지 없는지 
    // const [isSelected, setIsSelected] = useState<boolean>(false);
    // 달력 hover효과 적용되는 dates[]
    const [hoverDates, setHoverDates] = useState<Date[]|any[]>([]);

    // 달력 한 달 앞으로 넘어가기
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, currentDate.getDate()))
    }
    // 달력 한 달 뒤로 넘어가기
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate()))
    }
    // Date를 클릭했을 때
    const onClickDate= (value:Date) => {
            if(selectedDateType === "start"){
                // 선택된 날짜가 종료일보다 미래일 경우 
                if(value.getTime() > endDate.getTime()){
                    setStartDate(value);
                    setEndDate(value);
                }
                // 종료일보다 과거이거나 같을경우
                else{
                    setStartDate(value);
                }
                // selectedDateType을 end로 변환
                setSelectedDateType('end');
            }
            // selectedDateType이 end일 때
            else{
                // 선택된 날짜가 시작일보다 과거일경우
                if(value.getTime() < startDate.getTime()){
                    setStartDate(value);
                }
                // 선택된 날짜가 시작일보다 미래이거나 같을경우
                else{
                    setEndDate(value);
                }
            }
    }

    // DESCRIBE: Dates MouseOver했을 때
    const onMouseOverDate = (value:Date) => {
        //  _hoverDates = [시작일, 종료일]
        let _hoverDates:undefined[]|Date[] = []
        
            if(selectedDateType === "start"){
                // value가 종료일보다 미래일경우 value만 hover적용
                if(value.getTime() > endDate.getTime()){
                    _hoverDates = [value, value];
                }
                // value가 시작일 종료일 사이일경우 value에만 hover적용 
                // 하지만 시각적으로 hover효괴되는 Date가 없음
                else if(value.getTime() <= endDate.getTime() 
                    && value.getTime() >= startDate.getTime()){
                    _hoverDates = [value, endDate];
                }
                // value가 시작일보다 과거일경우 value부터 시작일까지 hover효과줌
                else{
                    _hoverDates = [value, endDate];
                }
            }else{
                // value가 시작일보다 과거일경우 value부터 시작일까지 hover효과줌
                if(value.getTime() < startDate.getTime()){
                    _hoverDates = [value, endDate];
                }
                // value가 시작일 종료일 사이일경우 value에만 hover적용 
                // 하지만 시각적으로 hover효괴되는 Date가 없음
                else if(value.getTime() <= endDate.getTime() && value.getTime() >= startDate.getTime()){
                    _hoverDates = [startDate, value];
                }
                // value가 종료일보다 미래일 경우 종료일부터 value까지 hover적용
                else{
                    _hoverDates = [startDate, value];
                }
            }

        setHoverDates(_hoverDates);
    }

    // DESCRIBE: Dates mouseLeave했을 때
    const onMouseLeaveDate = () => {
        // hoverDates를 시작일에서 종료일로 설정
        // 그렇게하면 사실상 시각적으로 hover가되는 Date가 없음
        let _hoverDates:Date[] = []

        setHoverDates(_hoverDates);
    }

    // 날짜 적용하기 버튼 눌렀을 때 상위 컴포넌트에 적용된 날짜 전달 함수 
    const onClickSubmitDate = () => {
        onClickSubmitBtn(startDate, endDate);
    }

    // dateTypeButton 선택했을 때  
    const clickSelectDateType = (dateType:string) => {
        if(dateType !== selectedDateType){
            setSelectedDateType(dateType);
        }
    }

    return(
        <div>
            <div className={classes.calendar_outer_box} onClick={() => {setCalendar(false)}} >

            </div>
            <div className={classes.calendar_container} >
                <div className={classes.startEnd_selectBox} >
                    <Button 
                        size="medium" 
                        style="line" 
                        text={formatDate(startDate)}
                        state={selectedDateType === "start" ? 'focused':'default'} 
                        onClick={() => clickSelectDateType('start')}
                    />
                    <div>~</div>
                    <Button 
                        size="medium" 
                        style="line" 
                        text={formatDate(endDate)}
                        state={selectedDateType === "end" ? 'focused':'default'}
                        onClick={() => clickSelectDateType('end')} 
                    />
                </div>
                <div className={classes.calendar_header} >
                    <div className={classes.prevBtn} onClick={prevMonth} > {'<'} </div>
                    <div className={classes.nextBtn} onClick={nextMonth} > {'>'} </div>
                </div>
                <div className={classes.calendar_body} >
                    <Calendar startTime={startTime} hoverDates={hoverDates} onMouseLeaveDate={onMouseLeaveDate} onMouseOverDate={onMouseOverDate} date={new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1)} start={startDate} end={endDate} onClickDate={onClickDate} />
                    <Calendar startTime={startTime} hoverDates={hoverDates} onMouseLeaveDate={onMouseLeaveDate} onMouseOverDate={onMouseOverDate} date={currentDate} start={startDate} end={endDate} onClickDate={onClickDate} />
                </div>
                <div className={classes.calendar_footer} >
                    <Button 
                        onClick={onClickSubmitDate} 
                        text="조회일 적용하기" 
                        size="large"  
                        style="solid"
                        width="100%"
                    />
                </div>
            </div>
        </div>
    )
}