import React, { useState } from "react";
import { Alarm } from "./Alarm.types";

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

  return (
    <div className={classes.alarmItem}>
      {isTune && (
        <div id={String(id)} className={classes.radio} onClick={(e) => onClickRadio(e)}>
          <SVG name={isToRead ? "selectedRadio" : "unSelectedRadio"} width="20" height="20"/>
        </div>
      )}
      <div className={classes.notification}>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
        <Text>{location}<br/>{date}</Text>
        <Text>{createdAt}</Text>
      </div>
    </div>
  );
}
