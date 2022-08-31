import { useState, useMemo } from "react";
import type { NextPage } from "next";
import { ReservationChart } from "components";
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

  const meetingRoomList = useMemo(()=> ["백범", "마당", "백범2", "청파2"], []);
  
  const dummyList = useMemo(() => {
    return {
      "2022-08-30": {
        백범: [
          {
            department: "ICT팀",
            startTime: "13:30",
            endTime: "14:30",
            meetingRoom: "백범",
            host: "김서연",
          },
        ],
        청파2: [
          {
            department: "ICT팀",
            startTime: "09:30",
            endTime: "10:30",
            meetingRoom: "청파2",
            host: "김서연",
          },
        ],
      },
      "2022-08-31": {
        백범: [
          {
            department: "ICT팀",
            startTime: "13:30",
            endTime: "14:30",
            meetingRoom: "백범",
            host: "김서연",
          },
        ],
        청파2: [
          {
            department: "ICT팀",
            startTime: "09:30",
            endTime: "10:30",
            meetingRoom: "청파2",
            host: "김서연",
          },
        ],
      },
    };
  }, []);


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
      <ReservationChart 
        startDate={date} 
        meetingRoomList={meetingRoomList} 
        unavailableList={dummyList}
      />
    </div>
  );
};

export default Home;
