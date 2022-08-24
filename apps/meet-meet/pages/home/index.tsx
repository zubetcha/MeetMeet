import { classExpression } from "@babel/types";
import { Button, ScrollDrag } from "@components/ui";
import { useState } from "react";
import { MultipleCalendars, Cell } from "@components/ui";
import ScrollContainer from 'react-indiana-drag-scroll'
import { formatDate } from "ui/src/utils";

const Home = () => {

  const [btnState, setBtnState] = useState<boolean>(true);

  return (
    <div>
      <Button
        configuration="outlined"
        size="large"
        label={formatDate(new Date())}
        onClick={() => setBtnState(true)}
      />
      {
        btnState 
        && <MultipleCalendars 
            setCalendar={setBtnState} 
            onClickSubmitBtn={() => {}} 
            date={new Date()} 
            start={new Date()} 
            end={new Date()}
            type="single"          
          />
      }

      <div
        style={{width:'500px'}}
      >
          <ScrollContainer
            vertical={false}
          >
            <div style={{display:'flex'}} >
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
              <Cell
                state="default"
                label="18:00"
                labelColor="default"
              />
            </div>
          </ScrollContainer>
        </div>
      </div>
  )
}

export default Home;