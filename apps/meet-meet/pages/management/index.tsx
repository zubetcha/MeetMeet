import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import classes from "./managementPage.module.scss";
import { Meetroom } from "@hooks/meetroom";
import meetroomState from "recoil/meetroom";

import { MeetroomCard } from "@components/management/MeeroomCard";
import { MeetroomAddModal } from "@components/management/MeetroomAddModal";
import { CardDepth1, Button, IconButton } from "ui/src/pages"

const ManagementPage = () => {
  const meetroom = new Meetroom();
  
  const setMeetrooms = useSetRecoilState(meetroomState);
  const [isAddModal, setIsAddModal] = useState(false);

  const { data } = meetroom.getAll();

  useEffect(() => {
    if (data) {
      setMeetrooms(data.meetrooms);
    }
  }, [data])

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