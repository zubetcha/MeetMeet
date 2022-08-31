import React, { useState, useMemo, useEffect } from "react";
import classes from "./reservation.module.scss";
import useReservation from "./hooks/useReservation";
import { CellGroup, Cell } from "@components/ui";
import { useOutsideAlerter } from "ui/src/hooks/useOutsideAlerter";

interface Props {
  meetingRoom: string;
  onChange: (e: any) => void;
  unavailableRoomList: any;
}

export default function ReservationRow({
  meetingRoom,
  onChange,
  unavailableRoomList,
}: Props) {
  const {
    newTimeList,
    defaultIndex,
    unavailableSlotWidthList,
    onChangeCellGroup,
    onCancleAllSlot,
  } = useReservation({
    unavailableList: unavailableRoomList,
    onChange: onChange,
    meetingRoom: meetingRoom,
  });

  const { ref } = useOutsideAlerter(onCancleAllSlot);

  return (
    <>
      <div className={classes.slotList} ref={ref}>
        <div>
          <CellGroup onChange={onChangeCellGroup} defaultIndex={defaultIndex}>
            {newTimeList.map((item, idx) => {
              if (item.includes("start")) {
                const widthIndex = parseInt(item.split(":")[1]);
                const {department, host}=unavailableRoomList[widthIndex];
                return (
                  <Cell
                    label={`${department} (${host})`}
                    key={`reservation-item-${idx}`}
                    style={{
                      height: "40px",
                      width: `${unavailableSlotWidthList[widthIndex]}px`,
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-onPrimary)",
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
