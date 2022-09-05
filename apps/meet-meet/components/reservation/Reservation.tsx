import { useState } from 'react'
import classes from './reservation.module.scss'
import { TitleLayout } from './TitleLayout'
import { SingleCalendar, Select, Text, TimePicker } from '@components/ui'
import { formatDate } from 'ui/src/utils'

export const Reservation = () => {
  const [date, setDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
  ));

  const roomList = new Array(4).fill(null).map((_, idx) => {
    return {
      id: `${idx + 1}`,
      name: `${idx+1}회의실`
    }
  })

  return (
    <div className={classes["page-container"]} >
      <Text type={'title-large'} style={{fontWeight: 'bold'}} >회의실 예약</Text>
      <TitleLayout title="회의실 선택" >
        <Select
          isSearch={false}
          defaultValue={roomList[0].name}
          onChange={() => {}}
        >
          {roomList.map((room, idx) => {
            return <Select.Option id={room.id} name={room.name} key={`room-selectOption-${idx}`} />
          })}
        </Select>
      </TitleLayout>
      <TitleLayout title="날짜 선택" subTitle="2022-8-8 (목)" >
          <TimePicker 
            text={formatDate(date)}  
          >
            <SingleCalendar
              date={date}
              onClickSubmitBtn={(date:Date) => {setDate(date)}}
            />
          </TimePicker>
          
      </TitleLayout>
    </div>
  )
}

