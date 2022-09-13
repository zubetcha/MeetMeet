import React from "react";
import { Modal, Button, SVG } from "ui/src/pages";

interface Props {
  onClickCancle: () => void;
  reservedDate: {
    date: string;
    meetingRoom: string;
    host: string;
    department: string;
    startTime: string;
    endTime: string;
  };
}

export default function ReservedInfoModal({
  onClickCancle,
  reservedDate,
}: Props) {
  const { date, meetingRoom, host, department, startTime, endTime } =
    reservedDate;

  return (
    <Modal isToast={true}>
      <Modal.Contents>
        <Modal.Icon name="error" color="primary" />
        <Modal.Title>
          {date} <br></br>
          {startTime.slice(0, 5)} - {endTime.slice(0, 5)} [{meetingRoom}] 예약
          현황입니다.
        </Modal.Title>
        <Modal.Description>
          호스트 : {host} ({department}) 의 <br></br>상세 예약 정보를
          확인하시겠습니까?
        </Modal.Description>
      </Modal.Contents>
      <Modal.Buttons>
        <Button
          label="취소하기"
          configuration="text"
          size="large"
          onClick={onClickCancle}
        />
        <Button
          label="상세 예약 정보 확인하기"
          configuration="filled"
          size="large"
        />
      </Modal.Buttons>
    </Modal>
  );
}
