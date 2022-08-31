import React, { useMemo } from "react";
import classes from "./reservation.module.scss";
import { timeList } from "ui/src/utils";

import { Text } from "ui/src/pages";

export default function ReservationHeader() {
  const dateList = useMemo(timeList, []);

  return (
    <div className={classes.reservationHeader}>
      {dateList.map((date: string) => (
        <div key={`reservation-date-${date}`} className={classes.time}>
          <Text type="body-small">{date}</Text>
        </div>
      ))}
    </div>
  );
}
