import React from "react";
import ReservationRow from "./ReservationRow";
import classes from "./reservation.module.scss";

interface Props {
  dates: string[][];
  meetingRoomList: string[];
  unavailableRoomList: any;
  onChange: (selectedData: any, date: string) => void;
}

export default function ReservationBody({
  dates,
  meetingRoomList,
  unavailableRoomList,
  onChange,
}: Props) {
  const getUnavailableRoomList = (date: string, room: string) => {
    try {
      return unavailableRoomList[date][room];
    } catch {
      return [];
    }
  };

  return (
    <>
      {unavailableRoomList &&
        dates?.map((date: string[], index: number) => (
          <>
            <div key={`reservation-row-group-${index}`}>
              {meetingRoomList.map((room, index) => (
                <ReservationRow
                  key={`reservation-row-${index}`}
                  meetingRoom={room}
                  onChange={(selectedData: any) =>
                    onChange(selectedData, date[0])
                  }
                  unavailableRoomList={getUnavailableRoomList(date[1], room)}
                />
              ))}
            </div>
          </>
        ))}
    </>
  );
}
