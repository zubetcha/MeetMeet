import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useSetAlarmConfig } from "@hooks/queries/alarm/useMutationQueries";
import userState from "recoil/user";

import { CardDepth1, IconButton, Select, Text, Button } from "ui/src/pages";
import classes from "./alarm.module.scss";

interface Props {
  onClickButton: () => void;
}

export default function AlarmSetting({ onClickButton }: Props) {
  const { noticeTime: curNoticeTime } = useRecoilValue(userState);
  const [noticeTime, setNoticeTime] = useState<number | null>(curNoticeTime);
  const alarmSetObj: { [key: string]: null | number } = {
    "1": 5,
    "2": 10,
    "3": 15,
    "4": null,
  }

  const { mutateAsync } = useSetAlarmConfig();

  const onChange = (selectedValue: { id: string, name: string }) => {
    setNoticeTime(alarmSetObj[selectedValue.id]);
  };

  const onClickSetAlarm = () => {
    mutateAsync(noticeTime);
  }

  return (
    <>
      <CardDepth1>
        <CardDepth1.TitleBar>
          <CardDepth1.Title>알림 세팅</CardDepth1.Title>
          <IconButton
            configuration="text"
            size="medium"
            state="default"
            icon="close"
            onClick={onClickButton}
          />
        </CardDepth1.TitleBar>
        <CardDepth1.Contents>
          <div className={classes.alarmInnerContainer}>
            <div className={classes.alarmSelectWrapper}>
              <div>
                <Text type="label-medium">기준</Text>
                <Select
                  isSearch={false}
                  defaultValue={`${curNoticeTime}분`}
                  onChange={onChange}
                  style={{ width: "100%" }}
                >
                  <Select.Option id="1" name={`${alarmSetObj["1"]}분`} />
                  <Select.Option id="2" name={`${alarmSetObj["2"]}분`} />
                  <Select.Option id="3" name={`${alarmSetObj["3"]}분`} />
                  {/* <Select.Option id="3" name="알람 끄기" /> */}
                </Select>
              </div>
              <div className={classes.button}>
                <Button label="변경하기" size="large" configuration="filled" onClick={onClickSetAlarm} />
              </div>
            </div>
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
    </>
  );
}
