import { ReservationWithTime } from "graphql/reservation/types"


export const getDisabledIndex = (timeList:string[], reservationTime: ReservationWithTime[] | undefined) => {
  
  let indexList: any[] = [];
  if(reservationTime){
    reservationTime.map((time) => {
      const startTimeIndex = timeList.findIndex((f) => f === time?.startTime);
      const endTimeIndex = timeList.findIndex((f) => f === time?.endTime);
      const startToEndIndex = Array.from({length:endTimeIndex - startTimeIndex}, (v,k) => startTimeIndex + k)
      indexList.push(...startToEndIndex);
    })
  }

  return Array.from(new Set(indexList));
}