import React, { useState, useEffect } from "react";
import classes from "./alarm.module.scss";
import AlarmSetting from "./AlarmSetting";
import AlarmList from "./AlarmList";

interface Props {
  isOpen: boolean;
}

export function Alarm({ isOpen }: Props) {
  const [isSetting, setIsSetting] = useState(false);

  const onClickButton = () => setIsSetting(!isSetting);

  useEffect(() => {
    if (!isOpen) {
      setIsSetting(false);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className={classes.alarmContainer}>
          {!isSetting ? (
            <AlarmList onClickButton={onClickButton} />
          ) : (
            <AlarmSetting onClickButton={onClickButton} />
          )}
        </div>
      )}
    </>
  );
}
