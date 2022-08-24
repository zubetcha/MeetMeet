import React, { useState } from "react";
import classes from "./reservation.module.scss";
import ReservationSection from "./ReservationSection";
import ReservationHeader from "./ReservationHeader";
import ReservationModal from "./ReservationModal";
import ReservationBody from "./ReservationBody";

interface ReservationProps {
  width?: string;
}

export const Reservation = ({ width = "100%" }: ReservationProps) => {
  const [selectedData, setSelectedData] = useState({
    meetingRoom: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const dates = ["08.23 (화)", "08.24 (수)", "08.25 (목)"];
  const meetingRoom = ["백범", "마당", "백범", "청파"];

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
          {dates.map((date: string) => (
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
            dates={dates}
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
