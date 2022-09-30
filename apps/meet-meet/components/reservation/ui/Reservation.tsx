import classes from './reservation.module.scss'
import { Text, Button, Modal } from '@components/ui'
import { useReservation } from '../hooks/useReservation'
import { SelectDate } from './SelectDate'
import { SelectMeetingRoom } from './SelectMeetingRoom'
import { SelectTime } from './SelectTime'
import { WriteMeetingInfo } from './WriteMeetingInfo'
import { SelectMemeber } from './SelectMember'
import { ConfirmModal } from './ConfirmModal'
import { ReservationInfoType } from 'graphql/reservation/types'

interface Props {
  reservationId?: number
}


export const Reservation = ({
  reservationId
}:Props) => {

  const {
    date,
    setDate,
    isChecked,
    setIsChecked,
    selectedRoomId,
    setSelectedRoomId,
    mergedRoomId,
    setMergedRoomId,
    selectedTimeId,
    setSelectedTimeId,
    meetingTitle,
    setMeetingTitle,
    meetingAgenda,
    setMeetingAgenda,
    selectedMembers,
    setSelectedMembers,
    btnState,
    timeList,
    submitReservation,
    disabledIndex,
    isModal,
    setIsModal,
    reservedInfo,
    updateReservation
  } = useReservation({reservationId : reservationId ? reservationId : -1});


  return (
    <div className={classes["page-container"]} >
      <Text type={'title-large'} style={{fontWeight: 'bold', height:'fit-content' }} >{reservationId ? '회의 수정' : '회의 예약'}</Text>

      <div className={classes["page-body"]} >
        <SelectMeetingRoom
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
          mergedRoomId={mergedRoomId}
          setMergedRoomId={setMergedRoomId}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />

        <SelectDate
          date={date}
          setDate={setDate}
        />

        <SelectTime
          selectedTimeId={selectedTimeId}
          setSelectedTimeId={setSelectedTimeId}
          timeList={timeList}
          disabledIndex={disabledIndex}
        />

        <WriteMeetingInfo
          meetingTitle={meetingTitle}
          meetingAgenda={meetingAgenda}
          setMeetingAgenda={setMeetingAgenda}
          setMeetingTitle={setMeetingTitle}
        />

        <SelectMemeber
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      </div>

        <div className={classes['button-wrapper']} >
          <Button
            label={reservationId ? '회의 수정하기' : '회의 예약하기'}
            configuration='filled'
            state={btnState ? 'default' : 'disable'}
            onClick={reservationId ? updateReservation : submitReservation}
          />
        </div>
      {(isModal && reservedInfo) &&
        <ConfirmModal
          setIsModal={setIsModal}
          reservedInfo={reservedInfo}
        />
      }
    </div>
  )
}

