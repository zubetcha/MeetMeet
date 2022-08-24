import React, { useState, useEffect } from "react";
import classes from "./reservation.module.scss";
import ReservationHeader from "./ReservationHeader";
import ReservationRow from "./ReservationRow";
import ReservationSection from "./ReservationSection";
import ReservationModal from "./ReservationModal";

export const Reservation = () => {
  const [selectedData, setSelectedData] = useState({
    meetingRoom: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const dates = ["08.23 (화)", "08.24 (수)", "08.25 (목)"];

  return (
    <>
      <div className={classes.reservationContainer}>
        <ReservationHeader />
        {dates.map((date: string) => (
          <ReservationSection
            key={`reservation-section-${date}`}
            date={date}
            onChange={(e: any) => {
              setSelectedData({
                date: date,
                meetingRoom: e.meetingRoom,
                startTime: e.startTime,
                endTime: e.endTime,
              });
              setIsOpen(true);
            }}
          />
        ))}
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
