import React, { useMemo, useState, useEffect } from "react";
import { timeList } from "ui/src/utils";
import { useOutsideAlerter } from "ui/src/hooks/useOutsideAlerter";

interface Props {
  unavailableList: any[];
  onChange: (e: any) => void;
  meetingRoom: string;
}

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

    if (startIndex !== endIndex && onChange) {
      onChange({
        startTime: newTimeList[startIndex],
        endTime: newTimeList[endIndex],
        meetingRoom: meetingRoom,
      });
    }
  }, [selectedInfo.startIndex, selectedInfo.endIndex]);

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

  const handleMeetingCellWidth = (dummyList: any) => {
    let widthList: number[] = [];
    dummyList.map((item: any) => {
      const startTime = changeStringDateToMinute(item.startTime);
      const endTime = changeStringDateToMinute(item.endTime);

      const slots = (endTime - startTime) / 30 + 1;
      widthList.push(50 * slots);
    });
    setUnavailableSlotWidthList(widthList);
  };

  const changeStringDateToMinute = (date: string) => {
    const [hour, minute] = date.split(":");
    const totalMinute = parseInt(hour) * 60 + parseInt(minute);
    return totalMinute;
  };

  const handleCellList = (dummyList: any[]) => {
    let index = 0;
    let newTimeList: any[] = [];
    const dateList = timeList();
    dateList.map((item: any, _) => {
      dummyList.map((selected: any) => {
        const startTime = changeStringDateToMinute(selected.startTime);
        const endTime = changeStringDateToMinute(selected.endTime);
        const slotTime = changeStringDateToMinute(item);

        if (slotTime === startTime) {
          newTimeList.push(`start:${index}`);
          return;
        }

        if (slotTime > startTime && slotTime <= endTime) {
          return;
        }

        newTimeList.push(item);
      });
    });
    setNewTimeList(newTimeList);
  };

  const { ref } = useOutsideAlerter(onCancleAllSlot);

  return {
    unavailableSlotWidthList,
    onChangeCellGroup,
    newTimeList,
    defaultIndex,
    ref,
  };
}
