import { useGetReservationByRoomAndDate } from "@hooks/queries/reservation/useGetQueries";
import { useAddReservation, useUpdateReservation } from "@hooks/queries/reservation/useMutationQueries";
import { useEffect, useState } from "react";
import { getDisabledIndex } from "../utils/getDisabledIndex";
import { formatDate } from "ui/src/utils";
import { ReservationInfo, ReservationInfoType } from "graphql/reservation/types";
import { useRouter } from "next/router";
import { useGetMeetrooms } from "@hooks/queries/meetroom/useGetQueries";


export type timeIdType = {
  start:number | null,
  end:number| null
}


interface Props {
  reservationInfo?: ReservationInfoType
}

export const useReservation = ({
  reservationInfo
}:Props) => {

  console.log(reservationInfo);

  const timeList = Array.from({length: 22}, (_, idx:number) => {
    const hour = Math.floor((idx + 16)/2);
    return `${hour < 10 ? '0' + hour : hour}:${idx%2*3}0`
  })

  const startTimeIdx = timeList.findIndex(time => time === reservationInfo?.startTime);
  const endTimeIdx = timeList.findIndex(time => time === reservationInfo?.endTime) - 1;
  const reservationParticipants = reservationInfo?.participantList.filter(participant => !participant.isHost).map(participant => {return {id :participant.account.id, name: participant.account.name}})

  const [date, setDate] = useState<Date>(new Date());
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(-1);
  const [mergedRoomId, setMergedRoomId] = useState(-1);
  const [selectedTimeId, setSelectedTimeId] = useState<timeIdType>({
    start: startTimeIdx >= 0 ? startTimeIdx : null,
    end: endTimeIdx >=0 ? startTimeIdx : null
  });
  const [meetingTitle, setMeetingTitle] = useState<string>(reservationInfo ? reservationInfo.title : '');
  const [meetingAgenda, setMeetingAgenda] = useState<string>(reservationInfo ? reservationInfo.content : '');
  const [selectedMembers, setSelectedMembers] = useState<any[]>(reservationParticipants ? reservationParticipants : []);
  const [btnState, setBtnState] = useState<boolean>(false);
  const [disabledIndex, setDisabledIndex] = useState<any[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [reservedInfo, setReservedInfo] = useState<ReservationInfo>();

  const addReservation = useAddReservation();
  const updateReservationMutation = useUpdateReservation()
  const {data: reservedTime, refetch: refetchReservedTime} = useGetReservationByRoomAndDate(mergedRoomId > 0 ? [selectedRoomId, mergedRoomId] : [selectedRoomId], formatDate(date));
  const router = useRouter();

  

  useEffect(() => {
    if(reservedTime){
      let indexedList = getDisabledIndex(timeList, reservedTime?.reservationByMeetRoomAndDate);

      if(reservationInfo && reservationInfo.date === formatDate(date) && reservationInfo.meetRoomList.map(room => room.id).includes(selectedRoomId)){
        indexedList = indexedList.filter((index) => index < startTimeIdx || index > endTimeIdx);
      }

      setDisabledIndex(indexedList);
    }
  }, [reservedTime])

  useEffect(() => {
    if(selectedRoomId >= 0) {
      router.push({
        query:{
          ...router.query,
          isChecked: false
        }
      })
    }
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

  useEffect(() => {
    if(router.query.roomId) {
      setSelectedRoomId(parseInt(router.query.roomId as string))
    }
  }, [router.query.roomId])

  useEffect(() => {
    if(router.query.date) {
      setDate(new Date(router.query.date as string))
    }
  }, [router.query.date])

  useEffect(() => {
    if(router.query.startTimeId && !router.query.endTimeId) {
      setSelectedTimeId({ 
        start: parseInt(router.query.startTimeId as string), 
        end: null
      })
    } else if (router.query.startTimeId && router.query.endTimeId) {
      setSelectedTimeId({ 
        start: parseInt(router.query.startTimeId as string),
        end: parseInt(router.query.endTimeId as string) 
      })
    } 
  }, [router.query.startTimeId, router.query.endTimeId])

  useEffect(() => {
    if(router.query.isChecked){
      setIsChecked((router.query.isChecked as string) === '1' ? true : false);
    }
  }, [router.query.isChecked])

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

  const updateReservation = async() => {
    if(
      selectedMembers.length > 0 &&
      typeof(selectedTimeId.start) === 'number' && 
      typeof(selectedTimeId.end) === 'number' &&
      reservationParticipants &&
      reservationInfo
    ){
      const selectedMembersId = selectedMembers.map(m => parseInt(m.id));
      const reservationParticipantsId = reservationParticipants.map(p => p.id)

      const request = {
        meetRoomId: selectedRoomId,
        mergeRoomId: mergedRoomId > 0 ? mergedRoomId : null,
        startDateTime: `${formatDate(date)} ${timeList[selectedTimeId.start]}`,
        endDateTime: `${formatDate(date)} ${timeList[selectedTimeId.end + 1]}`,
        title: meetingTitle,
        content: meetingAgenda,
        exceptParticipantList: reservationParticipantsId.filter(id => !selectedMembersId.includes(id)),
        newParticipantList: selectedMembersId.filter(id => !reservationParticipantsId.includes(id)),
      }

      const result = await updateReservationMutation.mutateAsync({reservationId: reservationInfo.id, reservationInfo: request})
      setReservedInfo(result.data);
      setIsModal(true);
      refetchReservedTime();
      setSelectedTimeId({
        start:null,
        end:null
      })
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
    reservedInfo,
    updateReservation
  }
} 