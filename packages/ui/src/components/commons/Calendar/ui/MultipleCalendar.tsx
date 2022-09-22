import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import classes from "./calendar.module.scss";
import { Button } from "../../../elements";
import { Calendar } from "./Calendar";
import { formatDate } from "../../../../utils";
import { useDates } from "../hooks/useDates";

interface Props {
  date: Date;
  start: Date;
  end: Date;
  setCalendar?: Dispatch<SetStateAction<boolean>>;
  onClickSubmitBtn?: (startDate: Date, endDate: Date) => void;
  startTime?: number;
  timeType?: "pastCurrent" | "futureCurrent";
}

export const MultipleCalendar = ({
  date,
  start,
  end,
  onClickSubmitBtn,
  setCalendar,
  startTime,
  timeType = "pastCurrent",
}: Props) => {
  const [selectedDateType, setSelectedDateType] = useState<'start'|'end'>("start");
  const [weekendIncluded, setWeekendIncluded] = useState<boolean>(true);
  const {
    startDate,
    endDate,
    currentDate,
    hoverDates,
    onClickDate,
    prevMonth,
    nextMonth,
    onMouseOverDate,
    onMouseLeaveDate
  } = useDates({
    start,
    end,
    date,
    selectedDateType,
    setSelectedDateType
  })
  

  // 날짜 적용하기 버튼 눌렀을 때 상위 컴포넌트에 적용된 날짜 전달 함수
  const onClickSubmitDate = () => {
    onClickSubmitBtn && onClickSubmitBtn(startDate, endDate)
  };

  // dateTypeButton 선택했을 때
  const clickSelectDateType = (dateType: 'start'|'end') => {
    if (dateType !== selectedDateType) {
      setSelectedDateType(dateType);
    }
  };

  return (
    <div>
      <div
        className={classes.calendar_outer_box}
        onClick={() => {
          setCalendar && setCalendar(false);
        }}
      ></div>
      <div className={classes.calendar_container}>
          <div className={classes.startEnd_selectBox}>
            <Button
              size="medium"
              configuration="outlined"
              label={formatDate(startDate)}
              state={selectedDateType === "start" ? "focused" : "default"}
              onClick={() => clickSelectDateType("start")}
            />
            <div>~</div>
            <Button
              size="medium"
              configuration="outlined"
              label={formatDate(endDate)}
              state={selectedDateType === "end" ? "focused" : "default"}
              onClick={() => clickSelectDateType("end")}
            />
            <Button
              size="medium"
              configuration="textGray"
              label="주말 및 공휴일 포함"
              showIcon={true}
              icon={weekendIncluded ? "checked" : "unchecked"}
              onClick={() => {
                weekendIncluded
                  ? setWeekendIncluded(false)
                  : setWeekendIncluded(true);
              }}
            />
          </div>

        <div className={classes.calendar_header}>
          <div className={classes.prevBtn} onClick={prevMonth}>
            {" "}
            {"<"}{" "}
          </div>
          <div className={classes.nextBtn} onClick={nextMonth}>
            {" "}
            {">"}{" "}
          </div>
        </div>
        <div className={classes.calendar_body}>
          <Calendar
            startTime={startTime}
            hoverDates={hoverDates}
            onMouseLeaveDate={onMouseLeaveDate}
            onMouseOverDate={onMouseOverDate}
            date={
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1
              )
            }
            start={startDate}
            end={endDate}
            onClickDate={onClickDate}
            timeType={timeType}
            weekendIncluded={weekendIncluded}
          />
          <Calendar
            startTime={startTime}
            hoverDates={hoverDates}
            onMouseLeaveDate={onMouseLeaveDate}
            onMouseOverDate={onMouseOverDate}
            date={currentDate}
            start={startDate}
            end={endDate}
            onClickDate={onClickDate}
            timeType={timeType}
            weekendIncluded={weekendIncluded}
          />
        </div>
        <div className={classes.calendar_footer}>
          <Button
            onClick={onClickSubmitDate}
            label="조회일 적용하기"
            size="large"
            configuration="filled"
            style={{ width: "100%", justifyContent: "center" }}
          />
        </div>
      </div>
    </div>
  );
};
