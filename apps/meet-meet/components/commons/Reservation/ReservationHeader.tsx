import React from "react";
import classes from "./reservation.module.scss";
import useReservation from "./hooks/useReservation";
import { Text } from "ui/src/pages";

export default function ReservationHeader() {
  const { timeList } = useReservation();

  return (
    <div className={classes.dateList}>
      <div className={classes.emptyItem}>{""}</div>
      {timeList.map((time, index) => (
        <div key={`reservation-header-${index}`} className={classes.dateItem}>
          <Text type="body-small">{time}</Text>
        </div>
      ))}
    </div>
  );
}
