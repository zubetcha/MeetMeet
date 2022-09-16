import classes from './reservation.module.scss'
import { Text, Button, Modal } from '@components/ui'
import { useReservation } from '../hooks/useReservation'
import { SelectDate } from './SelectDate'
import { SelectMeetingRoom } from './SelectMeetingRoom'
import { SelectTime } from './SelectTime'
import { WriteMeetingInfo } from './WriteMeetingInfo'
import { SelectMemeber } from './SelectMember'
import { ConfirmModal } from './ConfirmModal'


export const Reservation = () => {
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
    reservedInfo
  } = useReservation();


  return (
    <div className={classes["page-container"]} >
      <Text type={'title-large'} style={{fontWeight: 'bold'}} >회의실 예약</Text>
      
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

      <footer>
        <div className={classes['button-wrapper']} >
          <Button
            label='회의실 예약하기'
            configuration='filled'
            state={btnState ? 'default' : 'disable'}
            onClick={submitReservation}
          />
        </div>
      </footer>
      {(isModal && reservedInfo) &&
        <ConfirmModal
          setIsModal={setIsModal}
          reservedInfo={reservedInfo}
        />
      }
    </div>
  )
}

