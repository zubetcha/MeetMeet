import { useGetReservationByRoomAndDate } from "@hooks/queries/reservation/useGetQueries";
import { useAddReservation } from "@hooks/queries/reservation/useMutationQueries";
import { useEffect, useState } from "react";
import { getDisabledIndex } from "../utils/getDisabledIndex";
import { formatDate } from "ui/src/utils";
import { ReservationInfo } from "graphql/reservation/types";
import { useGetMeetrooms } from "@hooks/queries/meetroom/useGetQueries";


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
  const [isModal, setIsModal] = useState<boolean>(false);
  const [reservedInfo, setReservedInfo] = useState<ReservationInfo>();

  const addReservation = useAddReservation();
  const {data: reservedTime, refetch: refetchReservedTime} = useGetReservationByRoomAndDate(mergedRoomId > 0 ? [selectedRoomId, mergedRoomId] : [selectedRoomId], formatDate(date));

  const timeList = Array.from({length: 22}, (_, idx:number) => {
    const hour = Math.floor((idx + 16)/2);
    return `${hour < 10 ? '0' + hour : hour}:${idx%2*3}0`
  })

  useEffect(() => {
    if(reservedTime){
      const indexedList = getDisabledIndex(timeList, reservedTime?.reservationByMeetRoomAndDate);
      setDisabledIndex(indexedList);
    }
  }, [reservedTime])

  useEffect(() => {
    setIsChecked(false);
  }, [selectedRoomId])

  useEffect(() => { 
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

      const result = await addReservation.mutateAsync(request);
      setReservedInfo(result.data);
      setIsModal(true);
      refetchReservedTime();
      setSelectedTimeId({
        start: null,
        end: null
      });
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
    disabledIndex,
    isModal,
    setIsModal,
    reservedInfo
  }
} 