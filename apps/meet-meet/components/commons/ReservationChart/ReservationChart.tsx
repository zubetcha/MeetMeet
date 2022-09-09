import React, { useState, useMemo } from "react";
import classes from "./reservation.module.scss";
import ReservationSection from "./ReservationSection";
import ReservationHeader from "./ReservationHeader";
import ReservationModal from "./modal/ReservationModal";
import ReservedInfoModal from "./modal/ReservedInfoModal";
import ReservationBody from "./ReservationBody";
import { getThreeDateFromNow } from "ui/src/utils";
import {
  ReservationProps,
  selectedDataType,
} from "./@types/reservationChart.types";
import { getTimeList } from "ui/src/utils";

export const ReservationChart = ({
  width = "100%",
  startDate,
  startTime = "08:30",
  endTime = "20:00",
  meetingRoomList,
  unavailableList,
}: ReservationProps) => {
  const [selectedData, setSelectedData] = useState({
    meetingRoom: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [reservedDate, setReservedDate] = useState({
    date: "",
    meetingRoom: "",
    host: "",
    department: "",
    startTime: "",
    endTime: "",
  });

  const dateList = useMemo(
    () => getThreeDateFromNow(startDate as Date),
    [startDate]
  );

  const timeList = useMemo(() => getTimeList(startTime, endTime), []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReservedModal, setIsOpenReservedModal] = useState(false);

  const onChange = (e: selectedDataType) => {
    setTimeout(() => {
      setIsOpen(true);
    }, 500);

    setSelectedData({
      date: e.date,
      meetingRoom: e.meetingRoom,
      startTime: e.startTime,
      endTime: e.endTime,
    });
  };

  const onClickReservedCell = (reservedInfo: any) => {
    setIsOpenReservedModal(true);
    setReservedDate({
      ...reservedInfo,
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
          <ReservationHeader timeList={timeList} />
          <ReservationBody
            dates={dateList as string[][]}
            timeList={timeList}
            meetingRoomList={meetingRoomList}
            unavailableRoomList={unavailableList}
            onChange={onChange}
            onClickReservedCell={onClickReservedCell}
          />
        </div>

        {isOpen && (
          <ReservationModal
            reservationData={selectedData}
            onClickCancle={() => setIsOpen(false)}
          />
        )}
        {isOpenReservedModal && (
          <ReservedInfoModal
            reservedDate={reservedDate}
            onClickCancle={() => setIsOpenReservedModal(false)}
          />
        )}
      </div>
    </>
  );
};
