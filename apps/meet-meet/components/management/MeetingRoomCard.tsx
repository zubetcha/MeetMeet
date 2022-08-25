import { useState } from "react";
import Image from "next/image";
import classes from "./management.module.scss";

import { CardDepth2, IconButton, Text, SVG, Checkbox } from "ui/src/pages"
import { EquipmentCheckbox } from "./EquipmentCheckbox";
import { MeetingroomEditModal } from "./MeetingroomEditModal";

import logo from "ui/src/assets/img/logo_gec.png";

export const MeetingroomCard = () => {
  const [isEditModal, setIsEditModal] = useState(false);

  return (
    <>
      <div className={classes.container}>
        <CardDepth2>
          <CardDepth2.TitleBar>
            <CardDepth2.Title>회의실</CardDepth2.Title>
            <IconButton 
              configuration="text"
              size="small"
              state="default"
              negativeMood={false}
              icon="settings"
              onClick={() => {
                setIsEditModal(true)
                console.log("제앨")
              }}
            />
          </CardDepth2.TitleBar>
          <CardDepth2.Contents>
            <div className={classes["images-wrapper"]}>
              <Image src={logo} width={100} height={100} alt="_" />
              <Image src={logo} width={100} height={100} alt="_" />
              <Image src={logo} width={100} height={100} alt="_" />
            </div>
            <div className={classes["text-wrapper"]}>
              <Text type="body-medium" color="on-surface-variant" style={{ fontWeight: "500" }}>수용 인원 : </Text>
              <Text type="body-medium" color="on-surface-variant" style={{ fontWeight: "500" }}>위치 : </Text>
              <Text type="body-medium" color="on-surface-variant" style={{ fontWeight: "500" }}>장비 여부</Text>
              <div className={classes["checkbox-container"]}>
                <EquipmentCheckbox />
              </div>
            </div>
          </CardDepth2.Contents>
        </CardDepth2>
      </div>
      {isEditModal && <MeetingroomEditModal setIsEditModal={setIsEditModal} />}
    </>
  )
}

interface Props {
  data: any;
}
