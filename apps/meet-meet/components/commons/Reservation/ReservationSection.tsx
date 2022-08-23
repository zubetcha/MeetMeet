import React from "react";
import classes from "./reservation.module.scss";
import ReservationRow from "./ReservationRow";
import { Text } from "ui/src/pages";

export default function ReservationSection() {
  const meetingRoom = ["백범", "마당", "백범", "청파"];

  return (
    <div className={classes.roomList}>
      <div className={classes.dateContainer}>
        <Text color="fff" weight="bold">
          08.23 (화)
        </Text>
      </div>
      <div className={classes.rowWrapper}>
        {meetingRoom.map((room, index) => (
          <ReservationRow key={`reservation-row-${index}`} meetingRoom={room} />
        ))}
      </div>
    </div>
  );
}
