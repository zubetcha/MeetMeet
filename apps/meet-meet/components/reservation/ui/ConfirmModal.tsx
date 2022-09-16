import { Modal, Button } from "@components/ui"
import { ReservationInfo } from "graphql/reservation/types"
import { formatDate } from "ui/src/utils"
import { formatReservationTime } from "../utils/formatReservationTime"

interface Props {
  setIsModal: (st:boolean) => void
  reservedInfo:ReservationInfo
}

export const ConfirmModal = ({
  setIsModal,
  reservedInfo
}:Props) => {
  const meetRoomNames = reservedInfo.meetRoomList.map((room) => {
    return room.name
  })

  const hasMonitor = reservedInfo.meetRoomList.map((room) => {
    return room.hasMonitor;
  })

  
  
  return (
    <Modal>
      <Modal.Icon name='done' color='primary' />
          <Modal.Title>[{meetRoomNames.toString()} 회의실] 예약이 완료되었습니다.</Modal.Title>
          <Modal.Description>
            <div>시간 : {formatReservationTime(reservedInfo.date, reservedInfo.startTime, reservedInfo.endTime)}</div>
            <div>내용 : {reservedInfo.title} / 모니터 여부 : {hasMonitor.includes(true) ? 'O' : 'X'}</div>
            <div>참여자 : {reservedInfo.participantList.toString()} ({reservedInfo.participantCnt}명)</div>
          </Modal.Description>
          <Modal.Buttons>
            <Button label="닫기" configuration='text' onClick={() => setIsModal(false)} />
          </Modal.Buttons>
    </Modal>
  )
}