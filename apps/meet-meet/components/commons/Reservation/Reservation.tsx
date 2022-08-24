import React, { useState, useEffect } from "react";
import classes from "./reservation.module.scss";
import ReservationSection from "./ReservationSection";
import ReservationHeader from "./ReservationHeader";
import ReservationModal from "./ReservationModal";
import ReservationBody from "./ReservationBody";

export const Reservation = () => {
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
    setSelectedData({
      date: date,
      meetingRoom: e.meetingRoom,
      startTime: e.startTime,
      endTime: e.endTime,
    });
    setIsOpen(true);
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
            />
          ))}
        </div>

        {/* 선택 영역 */}
        <div className={classes.reservationBody}>
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
