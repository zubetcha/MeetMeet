import { handleConvertDiff } from "ui/src/utils";
import classes from "./alarm.module.scss";

import { Alarm } from "./Alarm.types";
import { WEEK_DAY } from "constants/date";
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
  const [_, meetingDate, startTime, __, endTime] = date.split(" ");
  const meetingDay = WEEK_DAY[new Date(meetingDate).getDay()];

  return (
    <div className={classes.alarmItem}>
      {isTune && (
        <div id={String(id)} className={classes.radio} onClick={(e) => onClickRadio(e)}>
          <SVG name={isToRead ? "selectedRadio" : "unSelectedRadio"} width="20" height="20"/>
        </div>
      )}
      <div className={classes.notification}>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
        <Text type="label-medium" style={{ fontWeight: '500' }}>{location}<br/>일시: {meetingDate} {meetingDay}<br/>시작 시간: {startTime}<br/>종료 시간: {endTime}</Text>
        <Text type="label-small" style={{ textAlign: "end" }}>{diff} 전</Text>
      </div>
    </div>
  );
}
