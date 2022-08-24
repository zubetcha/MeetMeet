import React from "react";
import ReservationRow from "./ReservationRow";
import classes from "./reservation.module.scss";

interface Props {
  dates: string[];
  meetingRoom: string[];
  onChange: (selectedData: any, date: string) => void;
}

export default function ReservationBody({
  dates,
  meetingRoom,
  onChange,
}: Props) {
  return (
    <>
      {dates.map((date: string) => (
        <>
          <div>
            {meetingRoom.map((room, index) => (
              <ReservationRow
                key={`reservation-row-${index}`}
                meetingRoom={room}
                onChange={(selectedData: any) => onChange(selectedData, date)}
              />
            ))}
          </div>
        </>
      ))}
    </>
  );
}
