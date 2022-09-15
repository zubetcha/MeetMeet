import { useEffect, useState } from "react"


export type timeIdType = {
  start:number | null,
  end:number| null
}


interface Props {

}

export const useReservation = () => {

  const [date, setDate] = useState<Date>(new Date());
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(-1);
  const [selectedTimeId, setSelectedTimeId] = useState<timeIdType>({
    start:null,
    end:null
  });
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [meetingAgenda, setMeetingAgenda] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  const [btnState, setBtnState] = useState<boolean>(false);


  useEffect(() => { 
    console.log(selectedRoomId, selectedTimeId, meetingTitle, meetingAgenda, selectedMembers)


    if(selectedRoomId > 0 
      && typeof(selectedTimeId.start) === 'number'
      && typeof(selectedTimeId.end) === 'number'
      && meetingTitle 
      && meetingAgenda 
      && selectedMembers
    ) setBtnState(true);

    else setBtnState(false);
  }, [
    selectedRoomId,
    selectedTimeId,
    meetingTitle,
    meetingAgenda,
    selectedMembers
  ])

  return {
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
  }
} 