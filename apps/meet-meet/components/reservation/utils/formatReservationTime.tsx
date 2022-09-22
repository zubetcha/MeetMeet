import { formatDate } from "ui/src/utils"


export const formatReservationTime = (date: string, startTime:string, endTime: string) => {
  const _date = formatDate(new Date(date), true);
  const _hour = `${startTime.split(':', 2).join(':')} ~ ${endTime.split(':', 2).join(':')}`;

  return `${_date} ${_hour}`;
}