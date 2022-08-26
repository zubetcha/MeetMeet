import React from "react";
import classes from "./reservation.module.scss";
import { Text } from "ui/src/pages";

interface Props {
  date: string;
  meetingRoom: string[];
}

export default function ReservationSection({ date, meetingRoom }: Props) {
  return (
    <div className={classes.roomList}>
      <div className={classes.infoContainer}>
        <div className={classes.dateContainer}>
          <Text color="on-primary" style={{ weight: "bold" }}>
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
