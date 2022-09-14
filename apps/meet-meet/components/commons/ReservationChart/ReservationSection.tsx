import React from "react";
import classes from "./reservation.module.scss";
import ReservationSectionItem from "./ReservationSectionItem";

interface Props {
  dateList: string[][] | undefined;
  meetingRoomList: string[];
}

/**
 *
 * @param dateList (string[][]) 날짜 리스트 (총 3개)
 * @param meetingRoomList (string[]) 미팅룸 리스트
 * @returns
 */
export default function ReservationSection({
  dateList,
  meetingRoomList,
}: Props) {
  return (
    <div className={classes.reservationFixedSection}>
      <div className={classes.emptySection}></div>
      {dateList?.map((date: string[]) => (
        <ReservationSectionItem
          key={`reservation-section-${date}`}
          date={date[0]}
          meetingRoomList={meetingRoomList}
        />
      ))}
    </div>
  );
}
