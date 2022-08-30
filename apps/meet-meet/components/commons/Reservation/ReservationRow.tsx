import React, { useState, useEffect } from "react";
import classes from "./reservation.module.scss";
import useReservation from "./hooks/useReservation";
import { useOutsideAlerter } from "ui/src/hooks/useOutsideAlerter";
import { CellGroup, Cell } from "@components/ui";

interface Props {
  meetingRoom: string;
  onChange: (e: any) => void;
}

export default function ReservationRow({ meetingRoom, onChange }: Props) {
  const { timeList } = useReservation();

  const [selectedInfo, setSelectedInfo] = useState({
    startIndex: -1,
    endIndex: -1,
  });

  useEffect(() => {
    const { startIndex, endIndex } = selectedInfo;

    if (startIndex !== endIndex) {
      onChange({
        startTime: timeList[startIndex],
        endTime: timeList[endIndex],
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
  const [defaultIndex, setDefaultIndex] = useState({ start: null, end: null });

  const onCancleAllSlot = () => {
    setDefaultIndex({ start: null, end: null });
    setSelectedInfo({
      startIndex: -1,
      endIndex: -1,
    });
  };

  const { ref } = useOutsideAlerter(onCancleAllSlot);

  return (
    <>
      <div className={classes.slotList} ref={ref}>
        <div>
          <CellGroup onChange={onChangeCellGroup} defaultIndex={defaultIndex}>
            {timeList.map((item, index) => (
              <Cell
                key={`reservation-item-${index}`}
                state="default"
                style={{
                  height: "40px",
                  width: "50px",
                  border: "1px solid var(--color-onSurfaceVariant-opacity-12)",
                }}
              />
            ))}
          </CellGroup>
        </div>
      </div>
    </>
  );
}
