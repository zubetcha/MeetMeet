import React, { useMemo } from "react";
import { formatTime, formatDate } from "ui/src/utils";

export default function useReservation(startDate?: Date) {
  const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  const timeList = useMemo(() => {
    let date = new Date("2022-05-05 08:30");
    let newList = [];
    for (let i = 0; i < 24; i++) {
      newList.push(formatTime(date).slice(0, 5));
      const result = addMinutes(date, 30);
      date = result;
    }
    return newList;
  }, []);

  const dateList = useMemo(() => {
    if (!startDate) return;
    let date = startDate;
    let newList = [];
    for (let i = 0; i < 3; i++) {
      newList.push(formatDate(date, true, ".").slice(5));
      const result = addMinutes(date, 60 * 24);
      date = result;
    }
    return newList;
  }, [startDate]);

  return {
    timeList,
    dateList,
  };
}
