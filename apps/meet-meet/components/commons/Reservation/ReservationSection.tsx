import React from "react";
import classes from "./reservation.module.scss";
import ReservationRow from "./ReservationRow";
import { Text } from "ui/src/pages";

interface Props {
  date: string;
  onChange: (e: any) => void;
}

export default function ReservationSection({ date, onChange }: Props) {
  const meetingRoom = ["백범", "마당", "백범", "청파"];

  return (
    <div className={classes.roomList}>
      <div className={classes.dateContainer}>
        <Text color="fff" weight="bold">
          {date}
        </Text>
      </div>
      <div className={classes.rowWrapper}>
        {meetingRoom.map((room, index) => (
          <ReservationRow
            key={`reservation-row-${index}`}
            meetingRoom={room}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}
