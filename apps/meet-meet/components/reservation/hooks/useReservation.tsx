import { useGetReservationById, useGetReservationByRoomAndDate } from "@hooks/queries/reservation/useGetQueries";
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
  reservationId: number
}

export const useReservation = ({
  reservationId = -1
}:Props) => {

  const timeList = Array.from({length: 23}, (_, idx:number) => {
    const hour = Math.floor((idx + 16)/2);
    return `${hour < 10 ? '0' + hour : hour}:${idx%2*3}0`
  })

  const { data: reservationInfo } = useGetReservationById(reservationId)

  const startTimeIdx = timeList.findIndex(time => time === reservationInfo?.reservationById.startTime);
  const endTimeIdx = timeList.findIndex(time => time === reservationInfo?.reservationById.endTime) - 1;
  const reservationParticipants = reservationInfo?.reservationById.participantList.filter(participant => !participant.isHost).map(participant => participant.account)

  const [date, setDate] = useState<Date>(new Date());
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(-1);
  const [mergedRoomId, setMergedRoomId] = useState(-1);
  const [selectedTimeId, setSelectedTimeId] = useState<timeIdType>({
    start: startTimeIdx >= 0 ? startTimeIdx : null,
    end: endTimeIdx >=0 ? startTimeIdx : null
  });
  const [meetingTitle, setMeetingTitle] = useState<string>(reservationInfo ? reservationInfo.reservationById.title : '');
  const [meetingAgenda, setMeetingAgenda] = useState<string>(reservationInfo ? reservationInfo.reservationById.content : '');
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

      if(reservationInfo && reservationInfo.reservationById.date === formatDate(date) && reservationInfo.reservationById.meetRoomList.map(room => room.id).includes(selectedRoomId)){
        indexedList = indexedList.filter((index) => index < startTimeIdx || index > endTimeIdx);
      }

      if(indexedList.includes(selectedTimeId.start) || indexedList.includes(selectedTimeId.end)) {
        setSelectedTimeId({start: null, end: null});
      }

      setDisabledIndex(indexedList);
    }
  }, [reservedTime, reservationInfo])

  useEffect(() => {
    if(reservationInfo && reservationParticipants){
      setMeetingTitle(reservationInfo.reservationById.title);
      setMeetingAgenda(reservationInfo.reservationById.content);
      setSelectedMembers(reservationParticipants);
      setSelectedTimeId({
        start: startTimeIdx >= 0 ? startTimeIdx : null,
        end: endTimeIdx >=0 ? startTimeIdx : null
      })

    }
  }, [reservationInfo])

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
      selectedMembers.length > 0
    ) setBtnState(true);

    else setBtnState(false);
  }, [
    selectedRoomId,
    selectedTimeId,
    meetingTitle,
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
      setTimeout(() => {
        router.push('/home');
      }, 1300)
      // refetchReservedTime();
      // setSelectedTimeId({
      //   start: null,
      //   end: null
      // });
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

      const result = await updateReservationMutation.mutateAsync({reservationId: reservationInfo.reservationById.id, reservationInfo: request})
      setReservedInfo(result.data);
      setIsModal(true);
      setTimeout(() => {
        router.push('/home');
      }, 1300)
      // refetchReservedTime();
      // setSelectedTimeId({
      //   start:null,
      //   end:null
      // })
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