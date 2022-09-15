import { TitleLayout } from "./TitleLayout"
import { timeIdType } from "../hooks/useReservation"
import { CellGroup, Cell } from "@components/ui"
import { useEffect, useState } from "react"


interface Props {
  selectedTimeId: timeIdType
  setSelectedTimeId: (st:timeIdType) => void
  timeList: string[]
  disabledIndex: number[] | undefined
}


export const SelectTime = ({
  selectedTimeId,
  setSelectedTimeId,
  timeList,
  disabledIndex
}:Props) => {

  const [defaultIndex, setDefaultIndex] = useState<timeIdType>({
    start: null,
    end: null
  })

  useEffect(() => {
    if(selectedTimeId.start && selectedTimeId.end){
      const start = selectedTimeId.start;
      const end = selectedTimeId.end;
      const found = disabledIndex?.find(idx => idx > start && end > idx);
      
      if(found){
        if(selectedTimeId.start === defaultIndex.start) setDefaultIndex({start:end, end:end});
        else setDefaultIndex({start:start, end:start});
      }
      else setDefaultIndex(selectedTimeId);
    }
  }, [selectedTimeId])
  
  return (
    <TitleLayout 
        title="이용시간 선택" 
        subTitle={(typeof(selectedTimeId.start) === 'number' && typeof(selectedTimeId.end) === 'number') 
          ? (timeList[selectedTimeId.start] + '~' + timeList[selectedTimeId.end + 1]) 
          : ''
      }>
          <CellGroup 
            disableIndex={disabledIndex}
            onChange={(timeId) => setSelectedTimeId(timeId)}
            defaultIndex={defaultIndex}
          >
            {timeList.map((time, idx) => {
              return <Cell label={time} key={`reservation-time-${idx}`} />
            })}
          </CellGroup>
      </TitleLayout>
  )
}