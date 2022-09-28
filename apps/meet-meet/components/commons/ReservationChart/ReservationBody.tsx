import classes from "./reservation.module.scss";
import ReservationRow from "./ReservationRow";
import { meetRoomType, selectedDataType } from "./@types/reservationChart.types";
interface Props {
  dates: string[][];
  timeList: string[];
  meetingRoomList: meetRoomType[];
  unavailableRoomList: any;
  onChange: (e: selectedDataType) => void;
  onClickReservedCell: (e: any) => void;
}

export default function ReservationBody({
  dates,
  timeList,
  meetingRoomList,
  unavailableRoomList,
  onChange,
  onClickReservedCell,
}: Props) {
  const getUnavailableRoomList = (date: string, room: string) => {
    try {
      return unavailableRoomList[date][room];
    } catch {
      return [];
    }
  };

  return (
    <div className={classes.reservationBody}>
      {unavailableRoomList &&
        dates?.map((date: string[], index: number) => (
          <div key={`reservation-row-group-${index}`}>
            {meetingRoomList.map((room, index) => (
              <ReservationRow
                key={`reservation-row-${index}`}
                meetingRoom={room}
                timeList={timeList}
                date={date}
                onChange={onChange}
                onClickReservedCell={onClickReservedCell}
                unavailableRoomList={getUnavailableRoomList(date[1], room.name)}
              />
            ))}
          </div>
        ))
      }
    </div>
  );
}
