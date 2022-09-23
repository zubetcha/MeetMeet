import { TitleLayout } from "./TitleLayout"
import { TextField } from "@components/ui"
import classes from './reservation.module.scss';
import classNames from "classnames"


interface Props {
  meetingTitle: string
  setMeetingTitle: (st:string) => void
  meetingAgenda: string
  setMeetingAgenda: (st:string) => void
}

export const WriteMeetingInfo = ({
  meetingAgenda,
  meetingTitle,
  setMeetingAgenda,
  setMeetingTitle
}:Props) => {

  return (
    <TitleLayout title="회의 정보 입력" >
      <div className={classes['write-info']} >
          <TextField status='default' name='meetingTitle' >
            <TextField.Label>회의 제목</TextField.Label>
            <TextField.Input
              type='text'
              value={meetingTitle}
              placeholder='회의의 제목을 입력해주세요.'
              onChange={(e) => setMeetingTitle(e.target.value)}
            />
          </TextField>
      </div>
      <div className={classes['write-info']} >
          <TextField status='default' name='meetingAgenda' >
            <TextField.Label>회의 안건</TextField.Label>
            <TextField.Textarea
              value={meetingAgenda}
              placeholder='회의 안건을 적어주세요.'
              onChange={(e) => setMeetingAgenda(e.target.value)}
            />
          </TextField>
      </div>
      </TitleLayout>
  )
}