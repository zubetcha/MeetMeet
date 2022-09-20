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
import { ReservationInfoModal } from "@components/reservation/ui/modal/ReservationInfoModal";

/**
 *
 * @param width (string) 예약 간트 차트 스크롤 영역 width 값
 * @param startDate (Date) 간트 차트 시작 날짜 (+2) 까지 보임. (총 3개 날짜)
 * @param startTime (string) 간트 차트 시작 시간
 * @param endTime (string) 간트 차트 종료 시간
 * @param meetingRoomList (string[]) 미팅룸 리스트
 * @param unavailableList (UnAvailableListType) 이미 예약된 예약 정보 리스트
 * @returns
 */
export const ReservationChart = ({
  width = "100%",
  startDate,
  startTime = "08:00",
  endTime = "20:00",
  meetingRoomList,
  unavailableList,
}: ReservationProps) => {
  console.log(unavailableList);


  // DESCRIBE: 빈 영역 클릭헀을 때 세팅되는 상태값 (새로운 예약 정보)
  const [selectedData, setSelectedData] = useState({
    meetingRoom: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  // DESCRIBE: 이미 차있는 영역 클릭했을 때 세팅되는 상태값 (기존 예약 정보)
  const [reservedDate, setReservedDate] = useState({
    date: "",
    meetingRoom: "",
    host: "",
    department: "",
    startTime: "",
    endTime: "",
    reservationId: -1
  });

  // DESCRIBE: 간트 차트 날짜 리스트
  const dateList = useMemo(
    () => getThreeDateFromNow(startDate as Date),
    [startDate]
  );

  // DESCRIBE: 간트 차트 시간 리스트
  const timeList = useMemo(() => getTimeList(startTime, endTime), []);

  // DESCRIBE: 예약 등록 모달 open 여부
  const [isOpen, setIsOpen] = useState(false);

  // DESCRIBE: 예약 상세정보 확인 모달 open 여부
  const [isOpenReservedModal, setIsOpenReservedModal] = useState(false);

  const [isReservationInfoModal, setIsReservationInfoModal] = useState(false);



  // DESCRIBE: 빈 영역 클릭했을 때
  const onClickEmptyCells = (selectedInfo: selectedDataType) => {
    setTimeout(() => {
      setIsOpen(true);
    }, 500);

    console.log("새로 선택된 정보", selectedInfo);

    setSelectedData({
      ...selectedInfo,
    });
  };

  // DESCRIBE: 이미 예약된 정보 cell 클릭했을 때
  const onClickReservedCell = (reservedInfo: any) => {
    console.log("기존 예약 정보", reservedInfo);

    setIsOpenReservedModal(true);
    setReservedDate({
      ...reservedInfo,
    });
  };

  return (
    <>
      <div className={classes.reservationContainer}>
        {/* 고정된 영역 (날짜, 회의실 표시) */}
        <ReservationSection
          dateList={dateList}
          meetingRoomList={meetingRoomList}
        />

        <div
          className={classes.reservationScrollSection}
          style={{ width: width }}
        >
          {/* 시간 표시하는 header 영역 */}
          <ReservationHeader timeList={timeList} />
          {/* cell 클릭하는 body 영역  */}
          <ReservationBody
            dates={dateList as string[][]}
            timeList={timeList}
            meetingRoomList={meetingRoomList}
            unavailableRoomList={unavailableList}
            onChange={onClickEmptyCells}
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
            onClickConfirm={() => {
              setIsOpenReservedModal(false);
              setIsReservationInfoModal(true);
            }}
          />
        )}
        {isReservationInfoModal && (
          <ReservationInfoModal
            reservationId={reservedDate.reservationId}
            setIsOpen={setIsReservationInfoModal}
          />
        )

        }
      </div>
    </>
  );
};
