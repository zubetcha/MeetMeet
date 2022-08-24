import React from "react";
import classes from "./reservation.module.scss";
import ReservationRow from "./ReservationRow";
import { Text } from "ui/src/pages";
import ReservationHeader from "./ReservationHeader";

interface Props {
  date: string;
}

export default function ReservationSection({ date }: Props) {
  const meetingRoom = ["백범", "마당", "백범", "청파"];

  return (
    <div className={classes.roomList}>
      <div className={classes.infoContainer}>
        <div className={classes.dateContainer}>
          <Text color="fff" weight="bold">
            {date}
          </Text>
        </div>
        <div className={classes.roomContainer}>
          {meetingRoom.map((room: string, index) => (
            <div className={classes.slotRoom} key={`room-${index}`}>
              <Text type="body-small">{room}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
