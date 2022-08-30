import React, { useState, useMemo, useEffect } from "react";
import classes from "./reservation.module.scss";
import useReservation from "./hooks/useReservation";
import { CellGroup, Cell } from "@components/ui";

interface Props {
  meetingRoom: string;
  onChange: (e: any) => void;
}

export default function ReservationRow({ meetingRoom, onChange }: Props) {
  const dummyList = useMemo(
    () => [
      {
        date: "2022-08-29",
        department: "ICT팀",
        startTime: "13:30",
        endTime: "14:30",
        meetingRoom: "백범",
        host: "김서연",
      },
    ],
    []
  );

  const {
    ref,
    onChangeCellGroup,
    newTimeList,
    defaultIndex,
    unavailableSlotWidthList,
  } = useReservation({
    unavailableList: dummyList,
    onChange: onChange,
    meetingRoom: meetingRoom,
  });

  return (
    <>
      <div className={classes.slotList} ref={ref}>
        <div>
          <CellGroup onChange={onChangeCellGroup} defaultIndex={defaultIndex}>
            {newTimeList.map((item, idx) => {
              if (item.includes("start")) {
                const widthIndex = parseInt(item.split(":")[1]);
                return (
                  <Cell
                    label="18:00"
                    key={`reservation-item-${idx}`}
                    style={{
                      width: `${unavailableSlotWidthList[widthIndex]}px`,
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-onSurface)",
                    }}
                  />
                );
              }
              return (
                <Cell
                  key={`reservation-item-${idx}`}
                  state="default"
                  style={{
                    height: "40px",
                    width: "50px",
                    border:
                      "1px solid var(--color-onSurfaceVariant-opacity-12)",
                  }}
                />
              );
            })}
          </CellGroup>
        </div>
      </div>
    </>
  );
}
