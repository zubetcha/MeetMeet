
import classes from "./management.module.scss";
import { CardDepth1 } from "ui/src/pages"

export const MeetingRoomCard = () => {
  console.log((<CardDepth1><p></p></CardDepth1>).key)
  return (
    <>
      <div className={classes.container}>
        <CardDepth1>
          <CardDepth1.TitleBar>
            <CardDepth1.Title>회의실</CardDepth1.Title>
          </CardDepth1.TitleBar>
          <CardDepth1.Contents>
            <p>gd</p>
          </CardDepth1.Contents>
        </CardDepth1>
      </div>
    </>
  )
}
