import React from "react";
import { useRouter } from "next/router";
import { Modal, Button, SVG } from "ui/src/pages";

interface Props {
  onClickCancle: () => void;
  reservationData: {
    date: string[];
    meetingRoom: {
      name: string;
      id: number;
    };
    startTime: string;
    endTime: string;
  };
}

export default function ReservationModal({
  onClickCancle,
  reservationData,
}: Props) {
  console.log(reservationData);
  const router  = useRouter();
  const { date, meetingRoom, startTime, endTime } = reservationData;
  const timeList = Array.from({length: 22}, (_, idx:number) => {
    const hour = Math.floor((idx + 16)/2);
    return `${hour < 10 ? '0' + hour : hour}:${idx%2*3}0`
  })
  
  const routeToReservation = () => {
    const startTimeIdx = timeList.findIndex(time => time === startTime);
    const endTimeIdx = timeList.findIndex(time => time === endTime);

    console.log(startTimeIdx, endTimeIdx);

    router.push({
      pathname:'/reservation',
      query: {
        roomId: meetingRoom.id,
        date: date[1],
        startTimeId: startTimeIdx,
        endTimeId: endTimeIdx,
      }
    })
  }

  return (
    <Modal isToast={true}>
      <Modal.Contents>
        <Modal.Icon name="done" color="primary" />
        <Modal.Title>
          {date[0]} {startTime} - {endTime} [{meetingRoom.name}] 회의실
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
        <Button 
          label="에약하기" 
          configuration="filled" 
          size="large" 
          onClick={routeToReservation}
        />
      </Modal.Buttons>
    </Modal>
  );
}
