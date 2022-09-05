import { useState } from 'react'

interface Props {
  date: Date;
}

export const useDate = ({
  date,
}:Props) => {
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
      setCurrentDate(value);
  };

   // DESCRIBE: Dates MouseOver했을 때
   const onMouseOverDate = (value: Date) => {
      //  _hoverDates = [시작일, 종료일]
      let _hoverDates: undefined[] | Date[] = [];

      _hoverDates = [value];

      setHoverDates(_hoverDates);
  };

  // DESCRIBE: Dates mouseLeave했을 때
  const onMouseLeaveDate = () => {
    let _hoverDates: Date[] = [];

    setHoverDates(_hoverDates);
  };


  return {
    currentDate,
    hoverDates,
    onClickDate,
    prevMonth,
    nextMonth,
    onMouseOverDate,
    onMouseLeaveDate
  }
}