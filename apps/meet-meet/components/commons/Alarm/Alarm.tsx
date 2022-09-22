import React, { useState, useEffect } from "react";
import classes from "./alarm.module.scss";

import AlarmSetting from "./AlarmSetting";
import AlarmList from "./AlarmList";

interface Props {
  isOpen: boolean;
  setIsOpen?: (is:boolean) => void;
}

export function Alarm({ isOpen, setIsOpen }: Props) {
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
            <AlarmList onClickButton={onClickButton} setIsOpen={setIsOpen} />
          ) : (
            <AlarmSetting onClickButton={onClickButton} />
          )}
        </div>
      )}
    </>
  );
}
