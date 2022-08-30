import React, { useState, useMemo } from "react";
import classes from "./reservation.module.scss";
import ReservationSection from "./ReservationSection";
import ReservationHeader from "./ReservationHeader";
import ReservationModal from "./ReservationModal";
import ReservationBody from "./ReservationBody";
import useReservation from "./hooks/useReservation";
import { formatDate } from "ui/src/utils";

interface ReservationProps {
  width?: string;
  startDate?: Date;
}

export const Reservation = ({
  width = "100%",
  startDate,
}: ReservationProps) => {
  const [selectedData, setSelectedData] = useState({
    meetingRoom: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  const dateList = useMemo(() => {
    if (!startDate) return;
    let date = startDate;
    let newList = [];
    for (let i = 0; i < 3; i++) {
      newList.push(formatDate(date, true, ".").slice(5));
      const result = addMinutes(date, 60 * 24);
      date = result;
    }
    return newList;
  }, [startDate]);
  // const { dateList } = useReservation({startDate:startDate});

  const [isOpen, setIsOpen] = useState(false);
  const meetingRoom = ["백범", "마당", "백범", "청파"];

  const onChange = (e: any, date: string) => {
    console.log(e);
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
          {dateList?.map((date: string) => (
            <ReservationSection
              key={`reservation-section-${date}`}
              date={date}
              meetingRoom={meetingRoom}
            />
          ))}
        </div>

        <div
          className={classes.reservationScrollSection}
          style={{ width: width }}
        >
          <ReservationHeader />
          <ReservationBody
            dates={dateList as string[]}
            meetingRoom={meetingRoom}
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
