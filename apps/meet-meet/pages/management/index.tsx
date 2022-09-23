import { useEffect, useState } from "react";
import classes from "./managementPage.module.scss";
import { useGetMeetrooms } from "@hooks/queries/meetroom/useGetQueries";

import { MeetroomCard } from "@components/management/MeeroomCard";
import { MeetroomAddModal } from "@components/management/MeetroomAddModal";
import { CardDepth1, Button, IconButton, Text } from "ui/src/pages"

import { MeetRoom } from "graphql/meetroom/types";

const ManagementPage = () => {
  const { data } = useGetMeetrooms();
  const [isAddModal, setIsAddModal] = useState(false);

  return (
    <>
      <div className={classes.container}>
        <Text
          type="headline-large"
          color="primary"
          style={{ fontWeight: "bold" }}
        >
          젠틀에너지 회의실 관리
        </Text>
        <div className={classes["meetroomCard-container"]}>
          <CardDepth1>
            <CardDepth1.TitleBar>
              <CardDepth1.Title>회의실 목록</CardDepth1.Title>
              <CardDepth1.TitleButtons>
                <IconButton 
                  configuration="text"
                  size="small"
                  state="default"
                  negativeMood={false}
                  icon="add"
                  onClick={() => setIsAddModal(true)}
                />
              </CardDepth1.TitleButtons>
            </CardDepth1.TitleBar>
            <CardDepth1.Contents>
              <div className={classes["meetroomCards-wrapper"]}>
                {data && data.meetrooms.map((meetroom: MeetRoom) => <MeetroomCard key={meetroom.id} meetroom={meetroom} />)}
              </div>
            </CardDepth1.Contents>
          </CardDepth1>
        </div>
      </div>

      {isAddModal && <MeetroomAddModal setIsAddModal={setIsAddModal} />}
    </>
  )
}

export default ManagementPage