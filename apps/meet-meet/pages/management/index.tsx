import { useEffect, useState } from "react";
import classes from "./managementPage.module.scss";
import Script from "next/script";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useGetMeetrooms } from "@hooks/queries/meetroom/useGetQueries";

import { MeetroomCard } from "@components/management/MeeroomCard";
import { MeetroomAddModal } from "@components/management/MeetroomAddModal";
import { CardDepth1, Button, IconButton } from "ui/src/pages"

import { MeetRoom } from "graphql/meetroom/types";

const ManagementPage = () => {
  const { data } = useGetMeetrooms();
  const [isAddModal, setIsAddModal] = useState(false);

  
  const firebaseConfig = {
    apiKey: "AIzaSyB5MsSaVHen868J6lRWD1R4bQX0jH5K7qE",
    authDomain: "meetmeet-a49ad.firebaseapp.com",
    projectId: "meetmeet-a49ad",
    storageBucket: "meetmeet-a49ad.appspot.com",
    messagingSenderId: "831729942382",
    appId: "1:831729942382:web:4aa84d00b6d73b28ad4b7f",
    measurementId: "G-41K21FTLLR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

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