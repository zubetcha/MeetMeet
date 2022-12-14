import { useState } from "react";
import { useGetMeetroomImages, useGetMeetroomMergeInfo } from "@hooks/queries/meetroom/useGetQueries";
import classes from "./management.module.scss";

import { MeetRoom } from "graphql/meetroom/types";

import { CardDepth2, IconButton, Text, Checkbox } from "ui/src/pages"
import { EquipmentCheckbox } from "./EquipmentCheckbox";
import { MeetroomEditModal } from "./MeetroomEditModal";
import { ImagePreview } from "./ImagePreview";
import { ImagePlaceholder } from "./ImagePlaceholder";

export const MeetroomCard = ({meetroom}: Props) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const { id, name, location, seat, canMerge, hasMonitor } = meetroom;
  const textProps: any = { type: "body-medium", color: "on-surface-variant", style: { fontWeight: "500" } }

  const { data: imagesList } = useGetMeetroomImages(id as number);
  const { data: mergeInfo } = useGetMeetroomMergeInfo(id as number);
  
  return (
    <>
      <div className={classes.container}>
        <CardDepth2>
          <CardDepth2.TitleBar>
            <CardDepth2.Title>{name}</CardDepth2.Title>
            <CardDepth2.TitleButtons>
              <IconButton 
                configuration="text"
                size="small"
                state="default"
                negativeMood={false}
                icon="settings"
                onClick={() => setIsEditModal(true)}
              />
            </CardDepth2.TitleButtons>
          </CardDepth2.TitleBar>
          <CardDepth2.Contents>
            <div className={classes["images-wrapper"]}>
              {new Array(3).fill(0).map((_, index) => {
                return imagesList?.imageByMeetRoom[index]?.url
                ? <ImagePreview key={imagesList?.imageByMeetRoom[index]?.id} url={imagesList?.imageByMeetRoom[index]?.url} />
                : <ImagePlaceholder key={index} />
              })}
            </div>
            <div className={classes["text-wrapper"]}>
              <Text {...textProps}>수용 인원 : {seat}명</Text>
              <Text {...textProps}>위치 : {location}</Text>
              <Text {...textProps}>합칠 수 있는 회의실 : {!canMerge ? "없음" : mergeInfo?.mergeInfoByMeetRoom?.mergeRoom.name}</Text>
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
