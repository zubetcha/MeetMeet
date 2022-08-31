import React, { useState, useMemo } from "react";
import classes from "./reservation.module.scss";
import ReservationSection from "./ReservationSection";
import ReservationHeader from "./ReservationHeader";
import ReservationModal from "./ReservationModal";
import ReservationBody from "./ReservationBody";
import { getThreeDateFromNow } from "ui/src/utils";

interface reservationInfo {
  department: string;
  startTime: string;
  endTime: string;
  meetingRoom: string;
  host:string;
}

interface ReservationProps {
  width?: string;
  startDate?: Date;
  meetingRoomList: string[];
  unavailableList : {
    [date:string]:{
      [meetingRoom:string]:reservationInfo[]
    }
  }
}

export const ReservationChart = ({
  width = "100%",
  startDate,
  meetingRoomList,
  unavailableList
}: ReservationProps) => {
  const [selectedData, setSelectedData] = useState({
    meetingRoom: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const dateList = useMemo(
    () => getThreeDateFromNow(startDate as Date),
    [startDate]
  );

  const [isOpen, setIsOpen] = useState(false);

  const onChange = (e: any, date: string) => {
    setTimeout(() => {
      setIsOpen(true);
    }, 500);

    setSelectedData({
      date: date,
      meetingRoom: e.meetingRoom,
      startTime: e.startTime,
      endTime: e.endTime,
    });
  };

  return (
    <>
      <div className={classes.reservationContainer}>
        {/* 고정된 영역 (날짜, 회의실 표시) */}
        <div className={classes.reservationFixedSection}>
          <div className={classes.emptySection}></div>
          {dateList?.map((date: string[]) => (
            <ReservationSection
              key={`reservation-section-${date}`}
              date={date[0]}
              meetingRoomList={meetingRoomList}
            />
          ))}
        </div>

        <div
          className={classes.reservationScrollSection}
          style={{ width: width }}
        >
          <ReservationHeader />
          <ReservationBody
            dates={dateList as string[][]}
            meetingRoomList={meetingRoomList}
            unavailableRoomList={unavailableList}
            onChange={onChange}
          />
        </div>

        {isOpen && (
          <ReservationModal
            reservationData={selectedData}
            onClickCancle={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};
