import React from "react";
import { CardDepth1, IconButton } from "ui/src/pages";
import classes from "./alarm.module.scss";
import AlarmItem from "./AlarmItem";

interface Props {
  onClickButton: () => void;
}

export default function AlarmList({ onClickButton }: Props) {
  return (
    <>
      <CardDepth1>
        <CardDepth1.TitleBar>
          <CardDepth1.Title>알림 내역</CardDepth1.Title>
          <IconButton
            configuration="text"
            size="medium"
            state="default"
            icon="settings"
            onClick={onClickButton}
          />
        </CardDepth1.TitleBar>
        <CardDepth1.Contents>
          <div className={classes.alarmInnerContainer}>
            <AlarmItem />
            <AlarmItem />
            <AlarmItem />
            <AlarmItem />
            <AlarmItem />
            <AlarmItem />
            <AlarmItem />
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
    </>
  );
}
