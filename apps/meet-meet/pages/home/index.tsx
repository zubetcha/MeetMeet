import { classExpression } from "@babel/types";
import { Button, CellGroup, ScrollDrag } from "@components/ui";
import { useEffect, useState } from "react";
import { CalendarLayout, Cell } from "@components/ui";
import ScrollContainer from 'react-indiana-drag-scroll'
import { formatDate } from "ui/src/utils";
import { isCompositeType } from "graphql";

const Home = () => {

  const [btnState, setBtnState] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() - 1));
  const [defaultIndex, setDefaultIndex] = useState({start:null, end:null})


  useEffect(() => {
    console.log(defaultIndex)
  }, [defaultIndex])

  return (
    <div>
      <Button
        configuration="outlined"
        size="large"
        label={formatDate(date)}
        onClick={() => setBtnState(true)}
      />
      {
        btnState 
        && <CalendarLayout 
            setCalendar={setBtnState} 
            onClickSubmitBtn={(startDate) => {
              setDate(startDate);
              setBtnState(false);

            }} 
            date={date} 
            start={date} 
            end={date}
            type="single"
            timeType="futureCurrent"          
          />
      }

      <div
        style={{width:'500px'}}
      >

            <CellGroup
              disableIndex={[3]}
              defaultIndex={defaultIndex}
            >
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
                style={{
                  width:'300px',
                  backgroundColor:'var(--color-primary)',
                  color: 'var(--color-onSurface)'
                }}
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />
              <Cell
                label="18:00"
              />

            </CellGroup>
        </div>
        <Button
          label='버튼'
          onClick={() => {setDefaultIndex({start:null, end:null})}}
        />
      </div>
  )
}

export default Home;