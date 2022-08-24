import classes from "./managementPage.module.scss";

import { MeetingRoomCard } from "@components/management/MeetingRoomCard"
import { CardDepth1, Button, IconButton } from "ui/src/pages"

const ManagementPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes["button-wrapper"]}>
        <Button
          label="회의실 생성하기"
          size="large"
          configuration="filled"
          showIcon
          icon="add"
        />
      </div>
      <CardDepth1>
        <CardDepth1.TitleBar>
          <CardDepth1.Title>회의실 목록</CardDepth1.Title>
            {/* <IconButton 
              configuration="text"
              size="small"
              state="default"
              negativeMood={false}
              icon="add"
            /> */}
        </CardDepth1.TitleBar>
        <CardDepth1.Contents>
          <div>
            <MeetingRoomCard />
          </div>
        </CardDepth1.Contents>
      </CardDepth1>
    </div>
  )
}

export default ManagementPage