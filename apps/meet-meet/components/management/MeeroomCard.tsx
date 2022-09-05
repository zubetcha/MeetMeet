import { useState } from "react";
import { useGetMeetroomImages, useGetMeetroomMergeInfo } from "@hooks/queries/meetroom/useGetQueries";
import Image from "next/image";
import classes from "./management.module.scss";

import { MeetRoom } from "graphql/meetroom/types";
import { CardDepth2, IconButton, Text, Checkbox } from "ui/src/pages"
import { EquipmentCheckbox } from "./EquipmentCheckbox";
import { MeetroomEditModal } from "./MeetroomEditModal";

import logo from "ui/src/assets/img/logo_gec.png";

export const MeetroomCard = ({meetroom}: Props) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const { id, name, location, seat, canMerge, hasMonitor } = meetroom;
  const textProps: any = { type: "body-medium", color: "on-surface-variant", style: { fontWeight: "500" } }

  const { data: imagesList } = useGetMeetroomImages(id);
  const { data: mergeInfo } = useGetMeetroomMergeInfo(id);
  
  return (
    <>
      <div className={classes.container}>
        <CardDepth2>
          <CardDepth2.TitleBar>
            <CardDepth2.Title>{name}</CardDepth2.Title>
            <IconButton 
              configuration="text"
              size="small"
              state="default"
              negativeMood={false}
              icon="settings"
              onClick={() => setIsEditModal(true)}
            />
          </CardDepth2.TitleBar>
          <CardDepth2.Contents>
            <div className={classes["images-wrapper"]}>
              <Image src={logo} width={100} height={100} alt="_" />
              <Image src={logo} width={100} height={100} alt="_" />
              <Image src={logo} width={100} height={100} alt="_" />
            </div>
            <div className={classes["text-wrapper"]}>
              <Text {...textProps}>수용 인원 : {seat}명</Text>
              <Text {...textProps}>위치 : {location}</Text>
              <Text {...textProps}>합칠 수 있는 회의실 유무 : {canMerge ? "O" : "X"}</Text>
              <Text {...textProps}>장비 여부</Text>
              <div className={classes["checkbox-container"]}>
                <EquipmentCheckbox equipment="모니터" has={hasMonitor} />
              </div>
            </div>
          </CardDepth2.Contents>
        </CardDepth2>
      </div>
      {isEditModal && <MeetroomEditModal setIsEditModal={setIsEditModal} meetroom={meetroom} mergeInfo={mergeInfo?.mergeInfoByMeetRoom} imageList={imagesList?.imageByMeetRoom} />}
    </>
  )
}

interface Props {
  meetroom: MeetRoom;
}
