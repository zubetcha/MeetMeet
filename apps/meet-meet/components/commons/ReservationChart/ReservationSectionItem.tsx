import React from "react";
import classes from "./reservation.module.scss";
import { Text } from "ui/src/pages";

interface Props {
  date: string;
  meetingRoomList: string[];
}

/**
 *
 * @param date (string) 날짜 ex) 08.23(화)
 * @param meetingRoomList (string) 미팅룸 리스트
 * @returns
 */
export default function ReservationSectionItem({
  date,
  meetingRoomList,
}: Props) {
  return (
    <div className={classes.roomList}>
      <div className={classes.infoContainer}>
        <div className={classes.dateContainer}>
          <Text color="on-primary" style={{ weight: "bold", textAlign: "center" }}>
            {date}
          </Text>
        </div>
        <div className={classes.roomContainer}>
          {meetingRoomList.map((room: string, index) => (
            <div className={classes.slotRoom} key={`room-${index}`}>
              <Text type="body-small">{room}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
