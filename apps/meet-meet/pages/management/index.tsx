import { useState, useEffect } from "react";
import classes from "./managementPage.module.scss";
import { useGetMeetrooms } from "@hooks/queries/meetroom/useGetQueries";

import { MeetroomCard } from "@components/management/MeeroomCard";
import { MeetroomAddModal } from "@components/management/MeetroomAddModal";
import { CardDepth1, Button, IconButton } from "ui/src/pages"

const ManagementPage = () => {
  const { data } = useGetMeetrooms();
  const [isAddModal, setIsAddModal] = useState(false);

  return (
    <>
      <div className={classes.container}>
        {/* <div className={classes["button-wrapper"]}>
          <Button
            label="회의실 생성하기"
            size="large"
            configuration="filled"
            showIcon
            icon="add"
            onClick={() => setIsAddModal(true)}
          />
        </div> */}
        <div className={classes["meetroomCard-container"]}>
          <CardDepth1>
            <CardDepth1.TitleBar>
              <CardDepth1.Title>회의실 목록</CardDepth1.Title>
                <IconButton 
                  configuration="text"
                  size="small"
                  state="default"
                  negativeMood={false}
                  icon="add"
                  onClick={() => setIsAddModal(true)}
                />
            </CardDepth1.TitleBar>
            <CardDepth1.Contents>
              <div className={classes["meetroomCards-wrapper"]}>
                {data && data.meetrooms.map((meetroom) => <MeetroomCard key={meetroom.id} meetroom={meetroom} />)}
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