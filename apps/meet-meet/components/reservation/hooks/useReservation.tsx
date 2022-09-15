import { useGetReservationByRoomAndDate } from "@hooks/queries/reservation/useGetQueries";
import { useAddReservation } from "@hooks/queries/reservation/useMutationQueries";
import { useEffect, useState } from "react";
import { getDisabledIndex } from "../utils/getDisabledIndex";
import { formatDate } from "ui/src/utils";


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
  const [mergedRoomId, setMergedRoomId] = useState(-1);
  const [selectedTimeId, setSelectedTimeId] = useState<timeIdType>({
    start:null,
    end:null
  });
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [meetingAgenda, setMeetingAgenda] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  const [btnState, setBtnState] = useState<boolean>(false);
  const [disabledIndex, setDisabledIndex] = useState<any[]>([]);
  const addReservation = useAddReservation()

  const timeList = Array.from({length: 22}, (_, idx:number) => `${Math.floor((idx + 16)/2) < 10 ? '0' + Math.floor((idx + 16)/2) : Math.floor((idx + 16)/2)}:${idx%2*3}0`)

  const {data: reservedTime} = useGetReservationByRoomAndDate(mergedRoomId > 0 ? [selectedRoomId, mergedRoomId] : [selectedRoomId], formatDate(date))

  useEffect(() => {
    const indexedList = getDisabledIndex(timeList, reservedTime?.reservationByMeetRoomAndDate);
    setDisabledIndex(indexedList);

  }, [reservedTime])

  useEffect(() => { 
    // console.log(selectedRoomId, selectedTimeId, meetingTitle, meetingAgenda, selectedMembers)


    if(
      selectedRoomId > 0 && 
      typeof(selectedTimeId.start) === 'number' && 
      typeof(selectedTimeId.end) === 'number' && 
      meetingTitle && 
      meetingAgenda && 
      selectedMembers.length > 0
    ) setBtnState(true);

    else setBtnState(false);
  }, [
    selectedRoomId,
    selectedTimeId,
    meetingTitle,
    meetingAgenda,
    selectedMembers
  ])

  const submitReservation = async() => {
    if(
      selectedRoomId > 0 && 
      typeof(selectedTimeId.start) === 'number' && 
      typeof(selectedTimeId.end) === 'number' && 
      meetingTitle && 
      meetingAgenda && 
      selectedMembers.length > 0
    ){
      const request = {
        meetRoomIdList: mergedRoomId > 0 ? [selectedRoomId, mergedRoomId] : [selectedRoomId],
        startDateTime: `${formatDate(date)} ${timeList[selectedTimeId.start]}`,
        endDateTime: `${formatDate(date)} ${timeList[selectedTimeId.end + 1]}`,
        title: meetingTitle,
        content: meetingAgenda,
        participantIdList: selectedMembers.map((m) => parseInt(m.id))
      }

      const result = await addReservation.mutateAsync(request)
      console.log(result);
    }
  }

  return {
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
    disabledIndex
  }
} 