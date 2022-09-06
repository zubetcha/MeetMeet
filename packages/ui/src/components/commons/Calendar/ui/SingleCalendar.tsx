

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import classes from "./calendar.module.scss";
import { Button } from "../../../elements";
import { Calendar } from "./Calendar";
import { formatDate } from "../../../../utils";
import { useDate } from "../hooks/useDate";

interface Props {
  date: Date;
  setCalendar?: Dispatch<SetStateAction<boolean>>;
  onClickSubmitBtn: (date: Date) => void;
  startTime?: number;
  timeType?: "pastCurrent" | "futureCurrent";
}

export const SingleCalendar = ({
  date,
  onClickSubmitBtn,
  setCalendar,
  timeType = "pastCurrent",
  startTime
}:Props) => {
  const [weekendIncluded, setWeekendIncluded] = useState<boolean>(true);
  const {
    currentDate,
    selectedDate,
    hoverDates,
    onClickDate,
    prevMonth,
    nextMonth,
    onMouseOverDate,
    onMouseLeaveDate
  } = useDate({
    date,
  })

  // 날짜 적용하기 버튼 눌렀을 때 상위 컴포넌트에 적용된 날짜 전달 함수
  const onClickSubmitDate = () => {
    setCalendar && setCalendar(false)
    onClickSubmitBtn(currentDate)
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
          {/* <div className={classes.startEnd_selectBox}>
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
          </div> */}

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
            date={currentDate}
            start={selectedDate}
            end={selectedDate}
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



}