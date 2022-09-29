import React from "react";
import classes from "./reservation.module.scss";
import useReservation from "./@hooks/useReservation";
import { CellGroup, Cell } from "@components/ui";
import { useOutsideAlerter } from "ui/src/hooks/useOutsideAlerter";
import { RservationRowProps } from "./@types/reservationChart.types";

export default function ReservationRow({
  meetingRoom,
  timeList,
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
    timeList: timeList,
    onChange: onChange,
    meetingRoom: meetingRoom,
    date: date,
  });


  const { ref } = useOutsideAlerter(onCancleAllSlot);

  const onClickDisabledCell = (reservedInfo: any) => {
    if (onClickReservedCell) {
      onClickReservedCell({
        date: date,
        meetingRoom: meetingRoom.name,
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
              if(idx === newTimeList.length - 1) {
                return (
                  <></>
                )
              }

              if (item.includes("start") && unavailableRoomList) {
                const widthIndex = parseInt(item.split(":")[1]);
                const { department, host } = unavailableRoomList[
                  widthIndex
                ] || { department: "", host: "" };
                return (
                  <div
                    onClick={() =>
                      onClickDisabledCell(unavailableRoomList[widthIndex])
                    }
                    className={classes['cell-box']}
                  >
                    <Cell
                      label={`${department} (${host})`}
                      key={`reservation-item-${idx}`}
                      style={{
                        height: "40px",
                        width: `${unavailableSlotWidthList[widthIndex]}px`,
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-onPrimary)",
                        fontSize: '13px',
                      }}
                      onClick={() =>
                        onClickDisabledCell(unavailableRoomList[widthIndex])
                      }
                    />
                  </div>
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
