import React, { useMemo } from "react";
import classes from "./reservation.module.scss";

import { Text } from "ui/src/pages";

interface Props {
  timeList: string[];
}
export default function ReservationHeader({ timeList }: Props) {
  return (
    <div className={classes.reservationHeader}>
      {timeList.map((date: string, idx:number) => {
        if(idx === timeList.length - 1) {
          return;
        }
        
        return (
          <div key={`reservation-date-${date}`} className={classes.time}>
            <Text type="body-small">{date}</Text>
            <Text type="body-small">{timeList[idx + 1]}</Text>
          </div>
        )
      })}
    </div>
  );
}
