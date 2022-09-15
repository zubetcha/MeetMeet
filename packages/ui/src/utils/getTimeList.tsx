import { formatTime, formatDate } from "./formatDate";

const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const getTimeList = (startTime: string, endTime: string) => {
  let date = new Date(`2022-05-05 ${startTime}`);
  let newList = [];
  while (true) {
    newList.push(formatTime(date).slice(0, 5));
    const result = addMinutes(date, 30);
    date = result;
    if (formatTime(date).slice(0, 5) === endTime) {
      newList.push(formatTime(date).slice(0, 5));
      break;
    }
  }
  return newList;
};

export const getThreeDateFromNow = (startDate: Date) => {
  if (!startDate) return;
  let date = startDate;
  let newList = [];
  for (let i = 0; i < 3; i++) {
    newList.push([
      formatDate(date, true, ".").slice(5),
      formatDate(date, false, "-"),
    ]);
    const result = addMinutes(date, 60 * 24);
    date = result;
  }
  return newList;
};

export const addThreeDateFromNow = (startDate: Date) => {
  return addMinutes(startDate, 60 * 24 * 3);
};

export const changeDateToMinute = (date: string) => {
  const [hour, minute] = date.split(":");
  const totalMinute = parseInt(hour) * 60 + parseInt(minute);
  return totalMinute;
};
