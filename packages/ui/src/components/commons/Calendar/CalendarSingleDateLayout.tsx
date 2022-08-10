 import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import classes from './calendar.module.scss';
import { Button, Text, Tooltip } from '../../elements';
import { SVG } from '../../elements';
import { Calendar } from '..';
import { formatDate } from '../../../utils';
import { colors } from '../../../shared/style';
import { divide } from 'lodash';


export const CalendarSigleDateLayout = ({
        date,
        start,
        end,
        setCalendar,
        downloadRawData,
        btwDates
      }:any) => {

  // 달력 안에서 시작 일시
  const [startDate, setStartDate] = useState<Date>(start);
  // 달력 안에서 종료 일시
  const [endDate, setEndDate] = useState<Date>(end);
  // 달력 날짜
  const [currentDate, setCurrentDate] = useState<Date>(date);
  // 달력 selected된 date type  ex)start, end
  const [selectedDateType, setSelectedDateType] = useState<string>('start');
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
    setStartDate(value);
    setEndDate(value);
  }

  // DESCRIBE: Dates MouseOver했을 때
  const onMouseOverDate = (value:Date) => {
      setHoverDates([value, value]);
  }

  // DESCRIBE: Dates mouseLeave했을 때
  const onMouseLeaveDate = () => {
      // hoverDates를 시작일에서 종료일로 설정
      // 그렇게하면 사실상 시각적으로 hover가되는 Date가 없음
      let _hoverDates:Date[] = [startDate, endDate]

      setHoverDates(_hoverDates);
  }

  // 날짜 적용하기 버튼 눌렀을 때 상위 컴포넌트에 적용된 날짜 전달 함수 
  const onClickSubmitDate = () => {
      // onClickSubmitBtn(startDate, endDate);
      downloadRawData(endDate)
  }

  // dateTypeButton 선택했을 때  
  const clickSelectDateType = (dateType:string) => {
      if(dateType !== selectedDateType){
          setSelectedDateType(dateType);
      }
  }

  return (
    <div>
          <div className={classes.calendar_outer_box} onClick={() => {setCalendar(false)}} >
            </div>
            <div className={classNames(classes.calendar_container, classes.singleDate)} >
                <div className={classes.calendar_description} >
                  <Text
                    text="센서 Raw data는 하루 단위로 다운로드가 가능합니다. 다운로드 받을 날짜를 선택하세요."
                    type="Body1"
                    weight="bold"
                  />
                </div>
                <div className={classes.calendar_header} >
                    <div className={classes.prevBtn} onClick={prevMonth} > {'<'} </div>
                    <div className={classes.nextBtn} onClick={nextMonth} > {'>'} </div>
                </div>
                <div className={classes.calendar_body} >
                    <Calendar hoverDates={hoverDates} onMouseLeaveDate={onMouseLeaveDate} onMouseOverDate={onMouseOverDate} date={new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1)} start={startDate} end={endDate} onClickDate={onClickDate} btwDates={btwDates} />
                    <Calendar hoverDates={hoverDates} onMouseLeaveDate={onMouseLeaveDate} onMouseOverDate={onMouseOverDate} date={currentDate} start={startDate} end={endDate} onClickDate={onClickDate} btwDates={btwDates} />
                </div>
                <div className={classes.calendar_footer} >
                    <Button
                      text="취소하기"
                      style="textGray"
                      size="large"
                      onClick={() => setCalendar(false)}
                    />
                    <Button 
                        onClick={onClickSubmitDate} 
                        text="Raw data 다운로드" 
                        size="large"  
                        style="solid"
                    />
                </div>
            </div>
        </div>
  )
}