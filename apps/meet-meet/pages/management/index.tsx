import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import classes from "./managementPage.module.scss";
import { useGetMeetrooms, useGetMeetroomImages, useGetMeetroomMergeInfo } from "@hooks/queries/meetroom/useGetQueries";
import meetroomState from "recoil/meetroom";

import { MeetroomCard } from "@components/management/MeeroomCard";
import { MeetroomAddModal } from "@components/management/MeetroomAddModal";
import { CardDepth1, Button, IconButton } from "ui/src/pages"

const ManagementPage = () => {
  const { data } = useGetMeetrooms();
  
  const [meetrooms, setMeetrooms] = useRecoilState(meetroomState);
  const [isAddModal, setIsAddModal] = useState(false);

  // TODO: meetrooms call
  // TODO: -> meetroomId로 meetroomImages, meetroomMergeInfo call
  // TODO: -> 데이터 합쳐서 recoil에 저장 
  // TODO: -> 저장한 meetroom 리스트로 MeetroomCard 컴포넌트 렌더링 

  useEffect(() => {
    if (data) {
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
        <div className={classes["meetroomCard-container"]}>
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