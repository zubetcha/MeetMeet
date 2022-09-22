import React, { useState } from "react";
import { Alarm } from "./Alarm.types";
import { handleConvertDiff } from "ui/src/utils";

import classes from "./alarm.module.scss";
import { Text, SVG, IconButton } from "ui/src/pages";

interface Props {
  isTune: boolean;
  isToRead: boolean;
  onClickRadio: (e: React.MouseEvent<HTMLDivElement>) => void;
  alarm: Alarm;
}

export default function AlarmItem({ isTune, isToRead, onClickRadio, alarm }: Props) {

  const { id, title, location, date, createdAt } = alarm;
  const diff = handleConvertDiff(+new Date() - +new Date(createdAt))

  return (
    <div className={classes.alarmItem}>
      {isTune && (
        <div id={String(id)} className={classes.radio} onClick={(e) => onClickRadio(e)}>
          <SVG name={isToRead ? "selectedRadio" : "unSelectedRadio"} width="20" height="20"/>
        </div>
      )}
      <div className={classes.notification}>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
        <Text type="label-medium">{location}<br/>{date}</Text>
        <Text type="label-small" style={{ textAlign: "end" }}>{diff} 전</Text>
      </div>
    </div>
  );
}
