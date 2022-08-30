import { formatTime } from "./formatDate";

const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const timeList = () => {
  let date = new Date("2022-05-05 08:30");
  let newList = [];
  for (let i = 0; i < 24; i++) {
    newList.push(formatTime(date).slice(0, 5));
    const result = addMinutes(date, 30);
    date = result;
  }
  return newList;
};
