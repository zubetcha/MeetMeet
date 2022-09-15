import { TitleLayout } from "./TitleLayout"
import classes from './reservation.module.scss'
import { Select, Checkbox } from "@components/ui"
import { useGetMeetroomMergeInfo, useGetMeetrooms, } from "@hooks/queries/meetroom/useGetQueries"
import { useEffect, useState } from "react"

interface Props {
  selectedRoomId: number
  setSelectedRoomId: (st:number) => void
  isChecked: boolean
  setIsChecked: (st:boolean) => void
  mergedRoomId: number
  setMergedRoomId: (st:number) => void
}

export const SelectMeetingRoom = ({
  selectedRoomId,
  setSelectedRoomId,
  mergedRoomId,
  setMergedRoomId,
  isChecked,
  setIsChecked
}:Props) => {
  const {data: meetRoomList} = useGetMeetrooms();
  const {data: meetRoomMergeInfo} = useGetMeetroomMergeInfo(selectedRoomId);

  useEffect(() => {
    if(isChecked && meetRoomMergeInfo?.mergeInfoByMeetRoom?.mergeRoom) {
      setMergedRoomId(meetRoomMergeInfo?.mergeInfoByMeetRoom?.mergeRoom.id)
    }
    else if (!isChecked) setMergedRoomId(-1);
  }, [isChecked])

  return (
    <TitleLayout title="회의실 선택" >
        <div className={classes['children-wrapper']} >
          <div className={classes['room-select']} >
            <Select
              isSearch={false}
              defaultValue={''}
              onChange={(room) => {setSelectedRoomId(parseInt(room.id))}}
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
                checked={isChecked}
                onChange={() => {setIsChecked(!isChecked)}}
              >
                <Checkbox.Label>{`${meetRoomMergeInfo?.mergeInfoByMeetRoom?.mergeRoom.name} 회의실과 함께 사용`}</Checkbox.Label>
              </Checkbox>
            </div>
          }
        </div>
      </TitleLayout>
  )
}