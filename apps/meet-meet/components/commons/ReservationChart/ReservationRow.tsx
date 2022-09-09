import React, { useState, useMemo, useEffect } from "react";
import classes from "./reservation.module.scss";
import useReservation from "./@hooks/useReservation";
import { CellGroup, Cell } from "@components/ui";
import { useOutsideAlerter } from "ui/src/hooks/useOutsideAlerter";
import { RservationRowProps } from "./@types/reservationChart.types";

export default function ReservationRow({
  meetingRoom,
  onChange,
  unavailableRoomList,
  date,
  onClickReservedCell,
}: RservationRowProps) {
  const {
    newTimeList,
    defaultIndex,
    disabledIndex,
    unavailableSlotWidthList,
    onChangeCellGroup,
    onCancleAllSlot,
  } = useReservation({
    unavailableRoomList: unavailableRoomList,
    onChange: onChange,
    meetingRoom: meetingRoom,
    date: date,
  });

  const { ref } = useOutsideAlerter(onCancleAllSlot);

  const onClickDisabledCell = (reservedInfo: any) => {
    if (onClickReservedCell) {
      onClickReservedCell({
        date: date,
        meetingRoom: meetingRoom,
        ...reservedInfo,
      });
    }
  };

  return (
    <>
      <div className={classes.slotList} ref={ref}>
        <div>
          <CellGroup
            onChange={onChangeCellGroup}
            defaultIndex={defaultIndex}
            disableIndex={disabledIndex}
          >
            {newTimeList.map((item, idx) => {
              if (item.includes("start")) {
                const widthIndex = parseInt(item.split(":")[1]);
                const { department, host } = unavailableRoomList[
                  widthIndex
                ] || { department: "", host: "" };
                return (
                  <span
                    onClick={() =>
                      onClickDisabledCell(unavailableRoomList[widthIndex])
                    }
                  >
                    <Cell
                      label={`${department} (${host})`}
                      key={`reservation-item-${idx}`}
                      style={{
                        height: "40px",
                        width: `${unavailableSlotWidthList[widthIndex]}px`,
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-onPrimary)",
                      }}
                      onClick={() =>
                        onClickDisabledCell(unavailableRoomList[widthIndex])
                      }
                    />
                  </span>
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
