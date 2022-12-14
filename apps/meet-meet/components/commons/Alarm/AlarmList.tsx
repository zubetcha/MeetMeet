import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { noticeDataState } from "recoil/notice";
import { useReadAlarm, useReadAllAlarms } from "@hooks/queries/alarm/useMutationQueries";

import { Notice } from "recoil/notice";
import classes from "./alarm.module.scss";
import { Button, CardDepth1, IconButton, Modal, Text } from "ui/src/pages";
import AlarmItem from "./AlarmItem";

interface Props {
  onClickButton: () => void;
  setIsOpen?: (is: boolean) => void;
}

export default function AlarmList({ onClickButton, setIsOpen }: Props) {
  const [{ noticeList, lastEventId }, setNoticeData] = useRecoilState(noticeDataState);
  const [isTune, setIsTune] = useState(false);
  const [isToRead, setIsToRead] = useState(Object.fromEntries(new Map(noticeList.map(({ id }) => { 
    return [ id, false ]
   }))));
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const iconButtonProps = { configuration: "text", size: "medium", state: "default" };
  
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

  const read = useReadAlarm();
  const readAll = useReadAllAlarms(setIsConfirmModal);

  const onClickRead = () => {
    // TODO: mutateAsync
    if (!selectedId) return;

    read.mutateAsync(Number(selectedId));
  };

  const onClickReadAll = () => {
    console.log('read all')
    readAll.mutateAsync();
  }

  const handleInitState = (lastEventId: string, noticeList: Notice[]) => {
    setSelectedId(null);
    setIsTune(false);
    setNoticeData({ lastEventId, noticeList })
  }

  // DESCRIBE: 특정 알람 읽음 성공 시 기존 상태에서 필터링 
  useEffect(() => {
    if (read.isSuccess) {
      const filteredList = noticeList.filter(({id}) => String(id) !== selectedId);
      handleInitState(lastEventId, filteredList)
    }
  }, [read.isSuccess]);

  // DESCRIBE: 알람 모두 읽음 성공 시 컴포넌트 및 recoil 상태 초기화 
  useEffect(() => {
    if (readAll.isSuccess) {
      handleInitState("", []);
    };
  }, [readAll.isSuccess]);

  return (
    <>
      <CardDepth1>
        <CardDepth1.TitleBar>
          <CardDepth1.Title>알림 내역</CardDepth1.Title>
          <CardDepth1.TitleButtons>
            {isTune ? (
              selectedId ? <Button label="읽음" size="medium" configuration="text" onClick={onClickRead} />
              : <Button label="모두 읽음" size="medium" configuration="text" onClick={onClickReadAll} />
            ) : <></>}
            {noticeList.length > 0 ? (
              <IconButton {...iconButtonProps} icon="tune" onClick={() => setIsTune(prev => !prev)} />
            ): <></>}
            <IconButton {...iconButtonProps} icon="settings" onClick={onClickButton} />
            <IconButton {...iconButtonProps} icon="close" onClick={() => setIsOpen && setIsOpen(false)} />
          </CardDepth1.TitleButtons>
        </CardDepth1.TitleBar>
        <CardDepth1.Contents>
          <div className={classes.alarmInnerContainer}>
            {noticeList.length > 0 ? noticeList.map(({ title, body, createdAt, id }, i) => {
              const [location, date] = body?.split(", ");
              const alarm = { location, date, title, id, createdAt };
              return <AlarmItem key={i} isTune={isTune} isToRead={isToRead[id]} onClickRadio={onClickRadio} alarm={alarm}/>
            }) : <Text>알림 내역이 없습니다.</Text>}
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
      {isConfirmModal && (
        <Modal>
          <Modal.Icon name="error" color="warning" />
          <div className={classes["modal-contents-wrapper"]}>
            <Modal.Title>알림을 모두 읽으시겠습니까?</Modal.Title>
          </div>
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
              onClick={onClickReadAll}
            />
          </Modal.Buttons>
        </Modal>
      )}
    </>
  );
}
