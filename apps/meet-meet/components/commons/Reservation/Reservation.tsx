import React from "react";
import classes from "./reservation.module.scss";
import ReservationHeader from "./ReservationHeader";
import ReservationRow from "./ReservationRow";
import ReservationSection from "./ReservationSection";

export const Reservation = () => {
  return (
    <>
      <div>
        <ReservationHeader />
        <ReservationSection />
        <ReservationSection />
        <ReservationSection />
      </div>
    </>
  );
};
