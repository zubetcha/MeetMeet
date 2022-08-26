import { classExpression } from "@babel/types";
import { Button, CellGroup, ScrollDrag } from "@components/ui";
import { useState } from "react";
import { MultipleCalendars, Cell } from "@components/ui";
import ScrollContainer from "react-indiana-drag-scroll";
import { formatDate } from "ui/src/utils";
import { start } from "repl";

const Home = () => {
  const [btnState, setBtnState] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    )
  );

  return (
    <div>
      <Button
        configuration="outlined"
        size="large"
        label={formatDate(date)}
        onClick={() => setBtnState(true)}
      />
      {btnState && (
        <MultipleCalendars
          setCalendar={setBtnState}
          onClickSubmitBtn={(startDate) => {
            console.log(startDate);
            setDate(startDate);
            setBtnState(false);
          }}
          date={date}
          start={date}
          end={date}
          type="single"
        />
      )}

      <div style={{ width: "500px" }}>
        <CellGroup onChange={(e: any) => console.log(e)} disableIndex={[3]}>
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell
            label="18:00"
            style={{
              width: "300px",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-onSurface)",
            }}
          />
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell label="18:00" />
          <Cell label="18:00" />
        </CellGroup>
      </div>
    </div>
  );
};

export default Home;
