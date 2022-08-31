import { useState } from "react";
import { useQuery } from "@apollo/client";
import classes from "./managementPage.module.scss";

import { GET_MEETROOMS } from "graphql/meetroom/query";
import { MeetRoomData } from "graphql/meetroom/types";

import { MeetroomCard } from "@components/management/MeeroomCard";
import { MeetroomAddModal } from "@components/management/MeetroomAddModal";
import { CardDepth1, Button, IconButton } from "ui/src/pages"

const ManagementPage = () => {
  const [isAddModal, setIsAddModal] = useState(false);

  const { data } = useQuery<MeetRoomData>(GET_MEETROOMS)

  return (
    <>
      <div className={classes.container}>
        <div className={classes["button-wrapper"]}>
          <Button
            label="회의실 생성하기"
            size="large"
            configuration="filled"
            showIcon
            icon="add"
            onClick={() => setIsAddModal(true)}
          />
        </div>
        <CardDepth1>
          <CardDepth1.TitleBar>
            <CardDepth1.Title>회의실 목록</CardDepth1.Title>
              <IconButton 
                configuration="text"
                size="small"
                state="default"
                negativeMood={false}
                icon="add"
              />
          </CardDepth1.TitleBar>
          <CardDepth1.Contents>
            <div>
              {data && data.meetrooms.map((meetroom) => <MeetroomCard key={meetroom.id} meetroom={meetroom} />)}
            </div>
          </CardDepth1.Contents>
        </CardDepth1>
      </div>

      {isAddModal && <MeetroomAddModal setIsAddModal={setIsAddModal} />}
    </>
  )
}

export default ManagementPage