import { classExpression } from "@babel/types";
import { Button } from "@components/ui";
import { useState } from "react";
import { MultipleCalendars } from "@components/ui";
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
    </div>
  )
}

export default Home;