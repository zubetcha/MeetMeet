import React from "react";
import classes from "./reservation.module.scss";
import useReservation from "./hooks/useReservation";
import { Text } from "ui/src/pages";

export default function ReservationHeader() {
  const { timeList } = useReservation();

  return (
    <div className={classes.reservationHeader}>
      {timeList.map((date: string) => (
        <div key={`reservation-date-${date}`} className={classes.time}>
          <Text type="body-small">{date}</Text>
        </div>
      ))}
    </div>
  );
}
