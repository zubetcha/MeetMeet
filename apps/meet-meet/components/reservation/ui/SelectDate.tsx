import { TitleLayout } from "./TitleLayout";
import { TimePicker, SingleCalendar } from "@components/ui";
import { useRouter } from "next/router";
import { formatDate } from "ui/src/utils";

interface Props {
  date: Date;
  setDate: (st:Date) => void;
}

export const SelectDate = ({
  date,
  setDate
}:Props) => {
  const router = useRouter();

  return (
    <TitleLayout title="날짜 선택" subTitle={formatDate(date, true)} >
          <TimePicker text={formatDate(date, true)}>
            <SingleCalendar
              date={date}
              onClickSubmitBtn={(date:Date) => {  
                router.push({
                  query: {
                    ...router.query,
                    date: formatDate(date)
                  }
                })
              }}
              timeType='futureCurrent'
            />
          </TimePicker>
      </TitleLayout>

  )
}