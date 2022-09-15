import React, { useMemo } from "react";
import classes from "./reservation.module.scss";

import { Text } from "ui/src/pages";

interface Props {
  timeList: string[];
}
export default function ReservationHeader({ timeList }: Props) {
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
