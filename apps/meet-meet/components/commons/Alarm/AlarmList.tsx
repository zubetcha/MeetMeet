import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { noticeDataState } from "recoil/notice";
import { useReadAlarm, useReadAllAlarms } from "@hooks/queries/alarm/useMutationQueries";

import classes from "./alarm.module.scss";
import { Button, CardDepth1, IconButton, Modal } from "ui/src/pages";
import AlarmItem from "./AlarmItem";

interface Props {
  onClickButton: () => void;
  setIsOpen?: (is: boolean) => void;
}

export default function AlarmList({ onClickButton, setIsOpen }: Props) {
  const [{ noticeList }, setNoticeData] = useRecoilState(noticeDataState);
  const [isTune, setIsTune] = useState(false);
  const [isToRead, setIsToRead] = useState(Object.fromEntries(new Map(noticeList.map(({ id }) => { 
    return [ id, false ]
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
  const { mutateAsync: readAll } = useReadAllAlarms(setIsConfirmModal);

  const onClickRead = () => {
    // TODO: mutateAsync
    if (!selectedId) return;

    read(Number(selectedId));

    // TODO: isToRead에서 읽음 처리한 알람 제거 
    const filteredList = noticeList.filter(({id}) => String(id) !== selectedId);
    setSelectedId(null);
    setIsToRead(Object.fromEntries(new Map(filteredList.map(({id}) => { 
      return [String(id), false];
   }))))

   // TODO: Recoil에서도 읽음 처리한 알람 제거
  };

  const onClickReadAll = () => {
    readAll();
    setSelectedId(null);
    setIsToRead({});
    setNoticeData({ lastEventId: "", noticeList: [] });
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
          <IconButton
            configuration="text"
            size="medium"
            state="default"
            icon="close"
            onClick={() => setIsOpen && setIsOpen(false)}
          />
        </CardDepth1.TitleBar>
        <CardDepth1.Contents>
          <div className={classes.alarmInnerContainer}>
            {noticeList.map(({ title, body, createdAt, id }, i) => {
              // const { title, id, createdAt } = data;
              const [location, date] = body?.split(", ");
              const alarm = { location, date, title, id, createdAt };
              return <AlarmItem key={i} isTune={isTune} isToRead={isToRead[id]} onClickRadio={onClickRadio} alarm={alarm}/>
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
              // onClick={() => }
            />
            <Button
              label="모두 읽기"
              configuration="filled"
              size="large"
              state="default"
              onClick={onClickReadAll}
            />
          </Modal.Buttons>
        </Modal>
      )}
    </>
  );
}
