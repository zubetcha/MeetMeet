import { TitleLayout } from "./TitleLayout"
import { TextField } from "@components/ui"


interface Props {

}

export const WriteMeetingInfo = ({

}:Props) => {

  return (
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
  )
}