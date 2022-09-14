import React, { useState, useMemo, useEffect } from "react";
import type { NextPage } from "next";
import { ReservationChart } from "components";
import { SingleCalendar, Button, Text, Radio } from "@components/ui";
import { formatDate, addThreeDateFromNow } from "ui/src/utils";
import { ReservationAPI } from "@api/api";
import {
  UnAvailableListType,
  MeetingRoomObjectType,
} from "@components/commons/ReservationChart/@types/reservationChart.types";
import classes from "./home.module.scss";
// import { useGetMeetrooms } from "@hooks/queries/meetroom/useGetQueries";

// TODO: 1. 처음 조회 시간을 2022-08-21로 되어있는데, 오늘을 기준으로 조회하는 로직으로 바꿔야함.
// TODO: 2. reservation id 로 상세 예약 정보 조회하는 로직 추가해야함.
// TODO: 3. 가능하다면, 병합된 미팅룸은 다른 색으로 표시해서 병합된 회의실임을 명시해줄 수 있어야 함.
const Home: NextPage = () => {
  const [btnState, setBtnState] = useState<boolean>(false);
  const [reservationList, setReservationList] = useState<any>({});

  // TODO: 나중에 오늘 시간을 가져오는 것으로 바꿔야함.
  const [date, setDate] = useState<Date>(new Date("2022-09-05"));
  // DESCRIBE: 회의실 조회 옵션 선택 (radio button) 과 관련된 상태값들.
  const [selectedValue, setSelectedValue] = useState("total");
  const radioInfo = useMemo(
    () => [
      { id: "total", label: "전체 리스트" },
      { id: "userHost", label: "내가 호스트인 회의실" },
      { id: "userParticipate", label: "내가 참여하는 회의실" },
    ],
    []
  );

  // TODO: 미팅룸 전체 리스트 가져오는 부분입니다. 나중에 아 주석 풀고, 위 주석 처리하면 됩니다. (meetingRoomList)
  const meetingRoomList = useMemo(() => ["청파", "마당", "성지", "백범"], []);

  // const { data } = useGetMeetrooms();
  // const meetingRoomList = useMemo(
  //   () => data?.meetrooms.map((meetRoom: any) => meetRoom.name) || [],
  //   [data]
  // );

  useEffect(() => {
    let reservationAPI: any = {
      total: ReservationAPI.getAllReservationInfo,
      userHost: ReservationAPI.getReservationInfobyHost,
      userParticipate: ReservationAPI.getReservationInfobyParticipant,
    };

    reservationAPI[selectedValue](
      formatDate(date),
      formatDate(addThreeDateFromNow(date))
    )
      .then((res: any) => handleResult(res))
      .catch((err: any) => console.log(err));
  }, [selectedValue]);

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
        height: "fit-content",
        width: "fit-content",
        margin: "20px auto 0 auto",
        display: "grid",
        rowGap: "30px",
        position: "relative",
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
          <SingleCalendar
            setCalendar={setBtnState}
            onClickSubmitBtn={(startDate: any) => {
              setDate(startDate);
              setBtnState(false);
            }}
            date={date}
            timeType="futureCurrent"
          />
        )}
      </div>
      <div className={classes.checkboxFlex}>
        {radioInfo.map((info: any) => (
          <>
            <Radio
              name={info.id}
              id={info.id}
              selectedValue={selectedValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedValue(e.target.id)
              }
              value={info.id}
            >
              <Radio.Label style={{ marginLeft: "5px" }}>
                <Text type="body-medium">{info.label}</Text>
              </Radio.Label>
            </Radio>
          </>
        ))}
      </div>
      <ReservationChart
        startDate={date}
        // startTime="06:00"
        // endTime="20:00"
        meetingRoomList={meetingRoomList}
        unavailableList={reservationList}
      />
    </div>
  );
};

export default Home;
