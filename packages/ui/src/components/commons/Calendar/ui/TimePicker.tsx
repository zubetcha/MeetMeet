import React, { useState } from 'react'
import { Button } from '../../../elements'
import classes from './calendar.module.scss'

interface Props {
  text: string;
  children: JSX.Element
}

export const TimePicker = ({
  text,
  children
}:Props) => {
  const [calendar, setCalendar] = useState<boolean>(false);

  return (
    <div>
      <Button
        configuration="input"
        label={text}
        onClick={() => setCalendar(true)}
      />
      {calendar &&
      <div style={{position: 'relative'}} >
        {React.cloneElement(children, {
          setCalendar: setCalendar,
        })}
      </div>
      }
    </div>
  )
}

