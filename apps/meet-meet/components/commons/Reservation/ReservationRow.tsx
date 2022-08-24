import React, { useState, useEffect } from "react";
import classes from "./reservation.module.scss";
import classNames from "classnames";
import useReservation from "./hooks/useReservation";
import { useOutsideAlerter } from "ui/src/hooks/useOutsideAlerter";
import { Text } from "ui/src/pages";

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

  const onClickSlot = (index: number) => {
    if (selectedInfo.startIndex === -1 && selectedInfo.endIndex === -1) {
      setSelectedInfo({
        startIndex: index,
        endIndex: index,
      });
      return;
    }

    if (selectedInfo.startIndex > index) {
      setSelectedInfo({
        startIndex: index,
        endIndex: selectedInfo.startIndex,
      });
    } else {
      setSelectedInfo({
        startIndex: selectedInfo.startIndex,
        endIndex: index,
      });
    }
  };

  const onCancleAllSlot = () => {
    setSelectedInfo({
      startIndex: -1,
      endIndex: -1,
    });
  };

  const { ref } = useOutsideAlerter(onCancleAllSlot);

  return (
    <>
      <div className={classes.slotList} ref={ref}>
        {/* <div className={classes.slotRoom}>
          <Text type="body-small">{meetingRoom}</Text>
        </div> */}
        {timeList.map((item, index) => (
          // 나중에 GellGroup 으로 갈아껴야됨.
          <div
            key={`reservation-item-${index}`}
            className={classNames(
              classes.slotItem,
              selectedInfo.startIndex <= index && index <= selectedInfo.endIndex
                ? classes.selected
                : ""
            )}
            onClick={() => onClickSlot(index)}
          >
            {}
          </div>
        ))}
      </div>
    </>
  );
}
