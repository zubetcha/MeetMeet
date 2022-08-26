import React from "react";
import { Text } from "ui/src/pages";
import classes from "./alarm.module.scss";

export default function AlarmItem() {
  return (
    <div className={classes.alarmItem}>
      <Text style={{ fontWeight: "bold" }}>[주간회의]회의에 초대됐습니다.</Text>
      <Text>08.15(화) 10:00-11:00 / 2층 백범</Text>
      <Text>10초 전</Text>
    </div>
  );
}
