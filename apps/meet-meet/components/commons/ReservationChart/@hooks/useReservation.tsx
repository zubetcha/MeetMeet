import React, { useState, useEffect } from "react";
import { changeDateToMinute } from "ui/src/utils";
import { RservationRowProps } from "../@types/reservationChart.types";

/**
 *
 * @param unavailableList (서버 데이터) 이미 예약된 회의실 리스트 정보
 * @param onChange 선택된 영역 변경시 이벤트
 * @param meetingRoom 현재 Row 의 미팅룸 이름
 * @param date 현재 row 의 날짜
 * @returns
 */
export default function useReservation({
  unavailableRoomList,
  timeList,
  onChange,
  meetingRoom,
  date,
}: RservationRowProps) {
  // DESCRIBE: 예약 정보를 입력받고 cellGroup 을 구성하는 데 사용될 timelist
  const [newTimeList, setNewTimeList] = useState<any[]>([]);
  // DESCRIBE: 현재 선택된 cell index
  const [selectedInfo, setSelectedInfo] = useState({
    startIndex: -1,
    endIndex: -1,
  });
  // DESCRIBE: cell 선택 해제를 위한 상태값
  const [defaultIndex, setDefaultIndex] = useState({ start: null, end: null });
  // DESCRIBE: 이미 예약되어 있는 cell들의 index 리스트
  const [disabledIndex, setDisabledIndex] = useState<number[]>([]);
  // DESCRIBE: 이미 예약되어 있는 cell들의 width를 저장하는 리스트
  const [unavailableSlotWidthList, setUnavailableSlotWidthList] = useState<
    number[]
  >([]);

  // DESCRIBE: row 의 CellGroup 의 Cell 에 들어갈 newTimeList 를 만드는 부분
  useEffect(() => {
    handleCellList(unavailableRoomList);
    handleMeetingCellWidth(unavailableRoomList);
  }, [unavailableRoomList]);

  // DESCRIBE: row 에 Cell 채워넣는 로직
  const handleCellList = (unavailableRoomList: any[]) => {
    let widthListindex = 0;
    const timeList_ = timeList;
    let newTimeList: any = [];
    unavailableRoomList?.sort((a, b) => a.startDate - b.startDate);
    // 1. 기본 날짜 리스트를 순회하며 조건에 만족하는지 체크하는 로직
    timeList_.map((item: any) => {
      const slotTime = changeDateToMinute(item);
      let newItem = item;
      let flag = true;
      // 2. 예약 불가능한(이미 예약되어 있는 방) 과 비교하는 로직
      // 조건: 예약이 가능한 cell (예약 내역이 없는 셀)과 병합 cell (disabled cell) 의 시작시간만을 newTimeList 에 저장함.
      unavailableRoomList?.map((selected: any) => {
        const startTime = changeDateToMinute(selected.startTime);
        const endTime = changeDateToMinute(selected.endTime);

        // 3. 만약 현재 slotTime 이 예약 불가능한 시간의 시작 시간과 같다면
        // newItem 에 start:${widthListindex} 로 명시해서 넣어줌
        // (나중에 병합된 셀로 집어넣기 위해서, widthListindex 는 병합된 cell의 width를 저장해놓은 리스트의 인덱스로 사용하기 위해 저장)
        if (slotTime === startTime) {
          newItem = `start:${widthListindex++}`;
          return;
        }

        // 4. 만약 사이에있는 시간이면, 병합된 셀로 넣어줘야 하기 때문에 추가하지 않고 건너뜀.
        if (slotTime > startTime && slotTime <= endTime) {
          flag = false;
          return;
        }

        return;
      });

      // 5. 조건을 만족하는 셀이면 리스트에 추가
      if (flag) {
        newTimeList.push(newItem);
      }
    });
    setNewTimeList(newTimeList);
    handleDisabledList(newTimeList);
  };

  // DESCRIBE: 이미 선택되어 있는 cell 들의 index 를 구하는 함수
  const handleDisabledList = (newTimeList: any[]) => {
    let disabeldIndexList: number[] = [];
    newTimeList.map((item, idx) =>
      item.includes("start") ? disabeldIndexList.push(idx) : ""
    );
    setDisabledIndex(disabeldIndexList);
  };

  // DESCRIBE: 병합 셀의 width 를 구하는 로직
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

  // DESCRIBE: Cell 클릭 했을 떄 동작하는 로직과 관련된 부분
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
        date: date,
      });
    }
  }, [selectedInfo.startIndex, selectedInfo.endIndex]);

  // DESCRIBE: 회의실이 중간에 끼여있으면 선택 취소시키는 로직
  const handleBetweenMeetingCancel = () => {
    let flag = false;
    unavailableRoomList?.map((meeting: any) => {
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

  return {
    unavailableSlotWidthList,
    newTimeList,
    defaultIndex,
    disabledIndex,
    onChangeCellGroup,
    onCancleAllSlot,
  };
}
