import React from "react";
import { CardDepth1, IconButton, Select, Text } from "ui/src/pages";
import classes from "./alarm.module.scss";

interface Props {
  onClickButton: () => void;
}

export default function AlarmSetting({ onClickButton }: Props) {
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
            <div>
              <Text type="label-medium">기준</Text>
              <Select
                isSearch={false}
                defaultValue="5분"
                onChange={() => {}}
                style={{ width: "100%" }}
              >
                <Select.Option id="1" name="5분" />
                <Select.Option id="2" name="10분" />
                <Select.Option id="3" name="15분" />
              </Select>
            </div>
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
    </>
  );
}
