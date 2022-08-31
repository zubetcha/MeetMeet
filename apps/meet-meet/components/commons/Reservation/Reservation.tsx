import React, { useState, useMemo } from "react";
import classes from "./reservation.module.scss";
import ReservationSection from "./ReservationSection";
import ReservationHeader from "./ReservationHeader";
import ReservationModal from "./ReservationModal";
import ReservationBody from "./ReservationBody";
import { getThreeDateFromNow } from "ui/src/utils";

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

  const dateList = useMemo(
    () => getThreeDateFromNow(startDate as Date),
    [startDate]
  );

  const [isOpen, setIsOpen] = useState(false);
  const meetingRoom = ["백범", "마당", "백범2", "청파2"];

  const dummyList = useMemo(() => {
    return {
      "2022-08-30": {
        백범: [
          {
            department: "ICT팀",
            startTime: "13:30",
            endTime: "14:30",
            meetingRoom: "백범",
            host: "김서연",
          },
        ],
        청파2: [
          {
            department: "ICT팀",
            startTime: "09:30",
            endTime: "10:30",
            meetingRoom: "청파2",
            host: "김서연",
          },
        ],
      },
      "2022-08-31": {
        백범: [
          {
            department: "ICT팀",
            startTime: "13:30",
            endTime: "14:30",
            meetingRoom: "백범",
            host: "김서연",
          },
        ],
        청파2: [
          {
            department: "ICT팀",
            startTime: "09:30",
            endTime: "10:30",
            meetingRoom: "청파2",
            host: "김서연",
          },
        ],
      },
    };
  }, []);

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
            dates={dateList as string[][]}
            meetingRoom={meetingRoom}
            unavailableRoomList={dummyList}
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
