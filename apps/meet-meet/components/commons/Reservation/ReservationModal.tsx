import React from "react";
import { Modal, Button, SVG } from "ui/src/pages";

interface Props {
  onClickCancle: () => void;
  reservationData: {
    date: string;
    meetingRoom: string;
    startTime: string;
    endTime: string;
  };
}

export default function ReservationModal({
  onClickCancle,
  reservationData,
}: Props) {
  const { date, meetingRoom, startTime, endTime } = reservationData;

  return (
    <Modal isToast={true}>
      <Modal.Contents>
        <Modal.Icon>
          <SVG name="done" color="primary" />
        </Modal.Icon>
        <Modal.Title>
          {date} {startTime} - {endTime} [{meetingRoom}] 회의실
        </Modal.Title>
        <Modal.Description>위 시간에 예약하시겠습니까?</Modal.Description>
      </Modal.Contents>
      <Modal.Buttons>
        <Button
          label="취소하기"
          configuration="text"
          size="large"
          onClick={onClickCancle}
        />
        <Button label="에약하기" configuration="filled" size="large" />
      </Modal.Buttons>
    </Modal>
  );
}
