import React, { useState, useEffect } from "react";
import { timeList, changeDateToMinute } from "ui/src/utils";

interface Props {
  unavailableList: any[];
  onChange: (e: any) => void;
  meetingRoom: string;
}

/**
 *
 * @param unavailableList (서버 데이터) 이미 예약된 회의실 리스트 정보
 * @param onChange 선택된 영역 변경시 이벤트
 * @param meetingRoom 현재 Row 의 미팅룸 이름
 * @returns
 */
export default function useReservation({
  unavailableList,
  onChange,
  meetingRoom,
}: Props) {
  const [newTimeList, setNewTimeList] = useState<any[]>([]);
  const [selectedInfo, setSelectedInfo] = useState({
    startIndex: -1,
    endIndex: -1,
  });
  const [defaultIndex, setDefaultIndex] = useState({ start: null, end: null });

  const [unavailableSlotWidthList, setUnavailableSlotWidthList] = useState<
    number[]
  >([]);

  useEffect(() => {
    handleCellList(unavailableList);
    handleMeetingCellWidth(unavailableList);
  }, [unavailableList]);

  useEffect(() => {
    const { startIndex, endIndex } = selectedInfo;
    if (startIndex === -1 || endIndex === -1 || startIndex === endIndex) {
      return;
    }

    if (handleBetweenMeetingCancel()) {
      return;
    }

    if (onChange) {
      onChange({
        startTime: newTimeList[startIndex],
        endTime: newTimeList[endIndex],
        meetingRoom: meetingRoom,
      });
    }
  }, [selectedInfo.startIndex, selectedInfo.endIndex]);

  // DESCRIBE: 회의실이 중간에 끼여있으면 선택 취소시키는 로직
  const handleBetweenMeetingCancel = () => {
    let flag = false;
    unavailableList?.map((meeting: any) => {
      const { startTime, endTime } = meeting;
      const meetingStartTime = changeDateToMinute(startTime);
      const meetingEndTime = changeDateToMinute(endTime);

      const { startIndex, endIndex } = selectedInfo;
      const selectedStartTime = changeDateToMinute(newTimeList[startIndex]);
      const selectedEndTime = changeDateToMinute(newTimeList[endIndex]);

      if (
        selectedStartTime <= meetingStartTime &&
        meetingEndTime <= selectedEndTime
      ) {
        onCancleAllSlot();
        flag = true;
        return;
      }
    });
    return flag;
  };

  const onChangeCellGroup = (selectedInfo: any) => {
    if (
      selectedInfo.start === null ||
      selectedInfo.end === null ||
      selectedInfo.start === selectedInfo.end
    ) {
      return;
    }

    setSelectedInfo({
      startIndex: selectedInfo.start,
      endIndex: selectedInfo.end,
    });
  };

  const onCancleAllSlot = () => {
    setDefaultIndex({
      start: null,
      end: null,
    });
    setSelectedInfo({
      startIndex: -1,
      endIndex: -1,
    });
  };

  const handleMeetingCellWidth = (unavailableList: any) => {
    let widthList: number[] = [];
    unavailableList?.map((item: any) => {
      const startTime = changeDateToMinute(item.startTime);
      const endTime = changeDateToMinute(item.endTime);

      const slots = (endTime - startTime) / 30 + 1;
      widthList.push(50 * slots);
    });
    setUnavailableSlotWidthList(widthList);
  };

  const handleCellList = (unavailableList: any[]) => {
    let index = 0;
    let newTimeList: any[] = [];
    const dateList = timeList();
    dateList.map((item: any, _) => {
      unavailableList?.map((selected: any) => {
        const startTime = changeDateToMinute(selected.startTime);
        const endTime = changeDateToMinute(selected.endTime);
        const slotTime = changeDateToMinute(item);

        if (slotTime === startTime) {
          newTimeList.push(`start:${index}`);
          return;
        }

        if (slotTime > startTime && slotTime <= endTime) {
          return;
        }
        newTimeList.push(item);
        return;
      });
      if (!unavailableList || unavailableList.length === 0) {
        newTimeList.push(item);
      }
    });
    setNewTimeList(newTimeList);
  };

  return {
    unavailableSlotWidthList,
    newTimeList,
    defaultIndex,
    onChangeCellGroup,
    onCancleAllSlot,
  };
}
