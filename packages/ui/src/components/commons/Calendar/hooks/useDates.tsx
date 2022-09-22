import { useState } from 'react'

interface Props {
  start: Date;
  end: Date;
  date: Date;
  selectedDateType: 'start'|'end';
  setSelectedDateType: (st:'start'|'end') => void
}

export const useDates = ({
  start,
  end,
  date,
  selectedDateType,
  setSelectedDateType
}:Props) => {
  const [startDate, setStartDate] = useState<Date>(start);
  const [endDate, setEndDate] = useState<Date>(end);
  const [currentDate, setCurrentDate] = useState<Date>(date);
  const [hoverDates, setHoverDates] = useState<Date[] | any[]>([]);

  const prevMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };

  const onClickDate = (value: Date) => {
      if (selectedDateType === "start") {
        if (value.getTime() > endDate.getTime()) {
          setStartDate(value);
          setEndDate(value);
        }
        else {
          setStartDate(value);
        }
        setSelectedDateType("end");
      }
      else {
        if (value.getTime() < startDate.getTime()) {
          setStartDate(value);
        }
        else {
          setEndDate(value);
        }
      }
  };

   // DESCRIBE: Dates MouseOver했을 때
   const onMouseOverDate = (value: Date) => {
      //  _hoverDates = [시작일, 종료일]
      let _hoverDates: undefined[] | Date[] = [];

      if (selectedDateType === "start") {
        // value가 종료일보다 미래일경우 value만 hover적용
        if (value.getTime() > endDate.getTime()) {
          _hoverDates = [value, value];
        }
        // value가 시작일 종료일 사이일경우 value에만 hover적용
        // 하지만 시각적으로 hover효괴되는 Date가 없음
        else if (
          value.getTime() <= endDate.getTime() &&
          value.getTime() >= startDate.getTime()
        ) {
          _hoverDates = [value, endDate];
        }
        // value가 시작일보다 과거일경우 value부터 시작일까지 hover효과줌
        else {
          _hoverDates = [value, endDate];
        }
      } else {
        // value가 시작일보다 과거일경우 value부터 시작일까지 hover효과줌
        if (value.getTime() < startDate.getTime()) {
          _hoverDates = [value, endDate];
        }
        // value가 시작일 종료일 사이일경우 value에만 hover적용
        // 하지만 시각적으로 hover효괴되는 Date가 없음
        else if (
          value.getTime() <= endDate.getTime() &&
          value.getTime() >= startDate.getTime()
        ) {
          _hoverDates = [startDate, value];
        }
        // value가 종료일보다 미래일 경우 종료일부터 value까지 hover적용
        else {
          _hoverDates = [startDate, value];
        }
      }
      setHoverDates(_hoverDates);
  };

  // DESCRIBE: Dates mouseLeave했을 때
  const onMouseLeaveDate = () => {
    let _hoverDates: Date[] = [];

    setHoverDates(_hoverDates);
  };


  return {
    startDate,
    endDate,
    currentDate,
    hoverDates,
    onClickDate,
    prevMonth,
    nextMonth,
    onMouseOverDate,
    onMouseLeaveDate
  }
}