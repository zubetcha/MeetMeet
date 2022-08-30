import { useState } from "react";
import type { NextPage } from "next";
import { Reservation } from "components";
import { CalendarLayout, Button } from "@components/ui";
import { formatDate } from "ui/src/utils";
import { Text } from "ui/src/pages";

const Home: NextPage = () => {
  const [btnState, setBtnState] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    )
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        right: "40px",
        bottom: "24px",
        left: "24px",
        display: "grid",
      }}
    >
      <div>
        <Text
          type="headline-large"
          color="primary"
          style={{ fontWeight: "bold" }}
        >
          젠틀에너지 회의실 예약 현황
        </Text>
        <div>
          <Button
            configuration="outlined"
            size="large"
            label={formatDate(date)}
            onClick={() => setBtnState(true)}
          />
        </div>
        {btnState && (
          <CalendarLayout
            setCalendar={setBtnState}
            onClickSubmitBtn={(startDate: any) => {
              console.log(startDate);
              setDate(startDate);
              setBtnState(false);
            }}
            date={date}
            start={date}
            end={date}
            type="single"
          />
        )}
      </div>
      <Reservation startDate={date} />
    </div>
  );
};

export default Home;
