/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import classes from './reservation.module.scss'
import { TitleLayout } from './TitleLayout'
import classNames from 'classnames'
import { SingleCalendar, Select, Text, TimePicker, CellGroup, Cell, TextField, Button, Checkbox } from '@components/ui'
import { useGetMeetroomMergeInfo, useGetMeetrooms } from '@hooks/queries/meetroom/useGetQueries'
import { formatDate } from 'ui/src/utils'

export const Reservation = () => {
  const [date, setDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
  ));
  const [selectedRoomId, setSelectedRoomId] = useState<number>(-1);

  const {data: meetRoomList} = useGetMeetrooms();
  const {data: meetRoomMergeInfo} = useGetMeetroomMergeInfo(selectedRoomId);

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
        <div className={classes['children-wrapper']} >
          <div className={classes['room-select']} >
            <Select
              isSearch={false}
              defaultValue={meetRoomList?.meetrooms[0].name}
              onChange={(room) => {console.log(room); setSelectedRoomId(parseInt(room.id))}}
              style={{width: '100%'}}
              label="회의실"
            >
              {meetRoomList?.meetrooms.map((room, idx) => {
                return <Select.Option id={`${room.id}`} name={room.name} key={`room-selectOption-${idx}`} />
              })}
            </Select>
          </div>
          {meetRoomMergeInfo?.mergeInfoByMeetRoom &&
            <div className={classes['mergeRoom-checkbox']} >
              <Checkbox
                name="함께 사용할 회의실"
                id='meetingRoomMerged-checkbox'
                checked={false}
                onChange={() => {}}
              >
                <Checkbox.Label>{`${meetRoomMergeInfo?.mergeInfoByMeetRoom?.mergeRoom.name} 회의실과 함께 사용`}</Checkbox.Label>
              </Checkbox>
            </div>
          }
        </div>
      </TitleLayout>

      <TitleLayout title="날짜 선택" subTitle="2022-8-8 (목)" >
          <TimePicker text={formatDate(date)}>
            <SingleCalendar
              date={date}
              onClickSubmitBtn={(date:Date) => { 
                console.log(date); 
                setDate(date);
              }}
              timeType='futureCurrent'
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
        <div className={classNames(classes['children-wrapper'], classes['space-between'])} >
          <div className={classes['team-select']} >
            <Select
              isSearch={false}
              defaultValue={''}
              onChange={() => {}}
              style={{width: '100%'}}
              label="팀"
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
                label="참여자 이름"
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

