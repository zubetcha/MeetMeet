import React, { useState } from "react";
import { useReadAlarm, useReadAllAlarms } from "@hooks/queries/alarm/useMutationQueries";
import { Alarm } from "./Alarm.types";

import classes from "./alarm.module.scss";
import { Button, CardDepth1, IconButton, Modal } from "ui/src/pages";
import AlarmItem from "./AlarmItem";

interface Props {
  onClickButton: () => void;
}

export default function AlarmList({ onClickButton }: Props) {
  const alarmList: Array<Alarm> = new Array(20).fill(0).map((_, i) => {
    return {
      notification: {
        title: "[회의명]회의에 초대됐습니다.",
        description: "08.15(화) 10:00-11:00 / 2층 백범"
      },
      data: {
        reservationId: i,
        createdAt: new Date().toISOString()
      }
    }
  });
  const [isTune, setIsTune] = useState(false);
  const [isToRead, setIsToRead] = useState(Object.fromEntries(new Map(alarmList.map(alarm => { 
    return [ alarm.data.reservationId, false ]
   }))));
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  
  // DESCRIBE: 알림의 라디오 버튼 클릭 함수 
  const onClickRadio = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id: reservationId } = e.currentTarget;

    // 기존에 선택되어 있는 알람의 라디오 버튼을 다시 클릭한 경우 선택 해제
    if (selectedId === reservationId) {
      setSelectedId(null);
      setIsToRead(prev => {
        return { ...prev, [reservationId]: false };
      })
    }

    // 다른 알람의 라디오 버튼을 클릭한 경우 기존 선택 해제 및 클릭한 알람 선택
    if (selectedId !== reservationId) {
      setSelectedId(reservationId);
      setIsToRead(prev => {
        return selectedId
        ? { ...prev, [selectedId]: false, [reservationId]: true }
        : { ...prev, [reservationId]: true };
      });
    }
  };

  const { mutateAsync: read } = useReadAlarm();
  const { mutateAsync: readAll } = useReadAllAlarms();

  const onClickRead = () => {
    // TODO: mutateAsync
    if (!selectedId) return;

    read(Number(selectedId));

    // TODO: isToRead에서 읽음 처리한 알람 제거 
    const filteredList = alarmList.filter(alarm => alarm.data.reservationId !== selectedId);
    setSelectedId(null);
    setIsToRead(Object.fromEntries(new Map(filteredList.map(alarm => { 
      return [alarm.data.reservationId, false];
   }))))
  };

  const onClickReadAll = () => {
    readAll();
    setSelectedId(null);
    setIsToRead({});
  }

  return (
    <>
      <CardDepth1>
        <CardDepth1.TitleBar>
          <CardDepth1.Title>알림 내역</CardDepth1.Title>
          {isTune && (
            selectedId ? <Button label="읽음" size="medium" configuration="text" />
            : <Button label="모두 읽음" size="medium" configuration="text" onClick={() => setIsConfirmModal(true)} />
          )}
          <IconButton
            configuration="text"
            size="medium"
            state="default"
            icon="tune"
            onClick={() => setIsTune(prev => !prev)}
          />
          <IconButton
            configuration="text"
            size="medium"
            state="default"
            icon="settings"
            onClick={onClickButton}
          />
        </CardDepth1.TitleBar>
        <CardDepth1.Contents>
          <div className={classes.alarmInnerContainer}>
            {alarmList.map((alarm, i) => {
              return <AlarmItem key={i} isTune={isTune} isToRead={isToRead[alarm.data.reservationId]} onClickRadio={onClickRadio} alarm={alarm}/>
            })}
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
      {isConfirmModal && (
        <Modal>
          <Modal.Icon name="error" color="warning" />
          <Modal.Title>알림을 모두 읽으시겠습니까?</Modal.Title>
          <Modal.Buttons>
            <Button
              label="취소"
              configuration="textGray"
              size="large"
              state="default"
              onClick={() => setIsConfirmModal(false)}
            />
            <Button
              label="모두 읽기"
              configuration="filled"
              size="large"
              state="default"
              onClick={() => {}}
            />
          </Modal.Buttons>
        </Modal>
      )}
    </>
  );
}
