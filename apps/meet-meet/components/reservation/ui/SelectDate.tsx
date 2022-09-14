import { TitleLayout } from "./TitleLayout";
import { TimePicker, SingleCalendar } from "@components/ui";
import { formatDate } from "ui/src/utils";

interface Props {
  date: Date;
  setDate: (st:Date) => void;
}

export const SelectDate = ({
  date,
  setDate
}:Props) => {


  return (
    <TitleLayout title="날짜 선택" subTitle={formatDate(date, true)} >
          <TimePicker text={formatDate(date, true)}>
            <SingleCalendar
              date={date}
              onClickSubmitBtn={(date:Date) => {  
                setDate(date);
              }}
              timeType='futureCurrent'
            />
          </TimePicker>
      </TitleLayout>

  )
}