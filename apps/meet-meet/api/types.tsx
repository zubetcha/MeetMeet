export type reservationCreateInfoType = {
  meetRoomIdList: number[],
  startDateTime: string,
  endDateTime: string,
  title: string,
  content: string,
  participantIdList: number[]
}

export type reservationUpdateInfoType = {
  meetRoomId: number,
  mergeRoomId: number | null,
  startDateTime: string,
  title: string,
  content: string,
  exceptParticipantList: number[],
  newParticipantList: number[],
}

