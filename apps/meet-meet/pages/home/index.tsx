import { useState, useMemo, useEffect } from "react";
import type { NextPage } from "next";
import { ReservationChart } from "components";
import { CalendarLayout, Button } from "@components/ui";
import { formatDate, addThreeDateFromNow } from "ui/src/utils";
import { Text } from "ui/src/pages";
import { ReservationAPI } from "@api/api";
import {
  UnAvailableListType,
  MeetingRoomObjectType,
} from "@components/commons/ReservationChart/@types/reservationChart.types";

const Home: NextPage = () => {
  const [btnState, setBtnState] = useState<boolean>(false);
  const [reservationList, setReservationList] = useState<any>({});
  // const [date, setDate] = useState<Date>(
  //   new Date(
  //     new Date().getFullYear(),
  //     new Date().getMonth(),
  //     new Date().getDate()
  //   )
  // );

  // TODO: 나중에 오늘 시간을 가져오는 것으로 바꿔야함.
  const [date, setDate] = useState<Date>(new Date("2022-08-31"));
  const meetingRoomList = useMemo(() => ["청파", "마당", "백범", "성지"], []);

  useEffect(() => {
    ReservationAPI.getAllReservationInfo(
      formatDate(date),
      formatDate(addThreeDateFromNow(date))
    )
      .then((res) => handleResult(res))
      .catch((err) => console.log(err));
  }, []);

  // DESCRIBE: 결과값 ReservationChart 에 맞게 수정 하는 로직 (각 정보를 key 값으로 접근할 수 있도록 변경하는 작업)
  const handleResult = (result: any) => {
    if (result.status === 200) {
      let dateObject: UnAvailableListType = {};
      result.data.map((item: any) => {
        let meetRoomObject: MeetingRoomObjectType = {};
        item.meetroomList.map((meetRoomItem: any) => {
          meetRoomObject[meetRoomItem.meetroomName] =
            meetRoomItem.reservationList;
        });
        dateObject[item.date] = meetRoomObject;
      });
      setReservationList(dateObject);
    }
  };

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
              setDate(startDate);
              setBtnState(false);
            }}
            date={date}
            start={date}
            end={date}
            type="single"
            timeType="futureCurrent"
          />
        )}
      </div>
      <ReservationChart
        startDate={date}
        meetingRoomList={meetingRoomList}
        unavailableList={reservationList}
      />
    </div>
  );
};

export default Home;
