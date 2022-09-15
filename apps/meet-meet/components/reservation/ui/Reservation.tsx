/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import classes from './reservation.module.scss'
import { TitleLayout } from './TitleLayout'
import classNames from 'classnames'
import { SingleCalendar, Select, Text, TimePicker, CellGroup, Cell, TextField, Button, Checkbox } from '@components/ui'
import { useGetDepartments, useGetMeetroomMergeInfo, useGetMeetrooms, useGetReservationByRoomAndDate } from '@hooks/queries/meetroom/useGetQueries'
import { formatDate } from 'ui/src/utils'
import { useReservation } from '../hooks/useReservation'
import { SelectDate } from './SelectDate'
import { SelectMeetingRoom } from './SelectMeetingRoom'
import { SelectTime } from './SelectTime'
import { WriteMeetingInfo } from './WriteMeetingInfo'
import { SelectMemeber } from './SelectMember'


export const Reservation = () => {
  const {
    date,
    setDate,
    isChecked,
    setIsChecked,
    selectedRoomId,
    setSelectedRoomId,
    selectedTimeId,
    setSelectedTimeId,
    meetingTitle,
    setMeetingTitle,
    meetingAgenda,
    setMeetingAgenda,
    selectedMembers,
    setSelectedMembers,
    btnState
  } = useReservation();

  const timeList = Array.from({length: 22}, (_, idx:number) => `${Math.floor((idx + 16)/2)}:${idx%2*3}0`)

  const disabledIndex: number[] | undefined = []

  return (
    <div className={classes["page-container"]} >
      <Text type={'title-large'} style={{fontWeight: 'bold'}} >회의실 예약</Text>
      
      <SelectMeetingRoom
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
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
          />
        </div>
      </footer>
    </div>
  )
}

