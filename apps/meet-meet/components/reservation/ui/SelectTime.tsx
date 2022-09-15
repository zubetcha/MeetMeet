import { TitleLayout } from "./TitleLayout"
import { timeIdType } from "../hooks/useReservation"
import { CellGroup, Cell } from "@components/ui"
import { useState } from "react"


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

  const [defaultIndex, setDefaultIndex] = useState({
    start: null,
    end: null
  })
  
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