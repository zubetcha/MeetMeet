import { useState } from 'react'
import classes from './reservation.module.scss'
import { TitleLayout } from './TitleLayout'
import { SingleCalendar, Select, Text, TimePicker, CellGroup, Cell, TextField, Button } from '@components/ui'
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

  const teamList = new Array(4).fill(null).map((_, idx) => {
    return {
      id: `${idx + 1}`,
      name: `ICT${idx+1}팀`
    }
  })

  const memeberList = new Array(4).fill(null).map((_, idx) => {
    return {
      id: `${idx + 1}`,
      name: `이대호${idx+1}`
    }
  })

  const timeList = Array.from({length: 22}, (_, idx:number) => `${Math.floor((idx + 16)/2)}:${idx%2*3}0`)
  const disabledIndex = [1,2,3,4,5]

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
          <TimePicker text={formatDate(date)}>
            <SingleCalendar
              date={date}
              onClickSubmitBtn={(date:Date) => {setDate(date)}}
            />
          </TimePicker>
      </TitleLayout>

      <TitleLayout title="이용시간 선택" subTitle="12:00 ~ 12:30" >
          <CellGroup disableIndex={disabledIndex}>
            {timeList.map((time, idx) => {
              return <Cell label={time} key={`reservation-time-${idx}`} />
            })}
          </CellGroup>
      </TitleLayout>

      <TitleLayout title="회의 정보 입력" >
          <TextField status='default' name='meetingTitle' >
            <TextField.Label>회의 제목</TextField.Label>
            <TextField.Input
              type='text'
              value=''
              placeholder='회의의 제목을 입력해주세요.'
            />
          </TextField>
          <TextField status='default' name='meetingAgenda' >
            <TextField.Label>회의 안건</TextField.Label>
            <TextField.Textarea
              value=''
              placeholder='회의 안건을 적어주세요.'
            />
          </TextField>
      </TitleLayout>

      <TitleLayout  title='참여자 초대'>
        <div className={classes['children-wrapper']} >
          <div className={classes['team-select']} >
            <Select
              isSearch={false}
              defaultValue={''}
              onChange={() => {}}
              style={{width: '100%'}}
            >
              {teamList.map((team, idx) => {
              return <Select.Option id={team.id} name={team.name} key={`team-selectOption-${idx}`} />
            })}
            </Select>
          </div>
          <div className={classes['member-select']} >
            <Select
                isSearch={false}
                defaultValue={''}
                onChange={() => {}}
                style={{width: '100%'}}
              >
                {memeberList.map((member, idx) => {
                return <Select.Option id={member.id} name={member.name} key={`team-selectOption-${idx}`} />
              })}
            </Select>
          </div>
        </div>
      </TitleLayout>

      <footer>
        <div className={classes['button-wrapper']} >
          <Button
            label='회의실 예약하기'
            configuration='filled'
          />
        </div>
      </footer>
    </div>
  )
}

