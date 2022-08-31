import { useQuery } from "@apollo/client";
import classes from "./management.module.scss";

import { GET_MEETROOM_BY_ID } from "graphql/meetroom/query";
import { MeetRoom } from "graphql/meetroom/types";

import { ImagePlaceholder } from "./ImagePlaceholder";
import { Modal, TextField, Checkbox, Button, TextArea } from "ui/src/pages"

export const MeetingroomEditModal = ({setIsEditModal, meetroom}: Props) => {
  const onChangeCheckbox = () => {}
  const onChangeTextField = () => {
  }

  return (
    <>
      <Modal>
        <Modal.Title type="title-large" weight="700">회의실 이름</Modal.Title>
        <Modal.Contents>
          <TextField name="meetingroom-name" status="default">
            <TextField.Label>이름</TextField.Label>
            <TextField.Input type="text" value="" placeholder="회의실 이름을 입력해주세요." autoFocus onChange={onChangeTextField}/>
          </TextField>
          <TextField name="meetingroom-accommodate" status="default">
            <TextField.Label>수용 인원</TextField.Label>
            <TextField.Input type="text" value="" placeholder="수용 인원을 선택해주세요." onChange={onChangeTextField}>
              <TextField.Unit>명</TextField.Unit>
              <TextField.Icon name="dropdown" />
            </TextField.Input>
          </TextField>
          <TextField name="meetingroom-equipment" status="default">
            <TextField.Label>장비 여부</TextField.Label>
            <Checkbox
              name="monitor"
              id="monitor"
              checked={false}
              label="모니터"
              onChange={onChangeCheckbox}
            />
          </TextField>
          <TextField name="meetingroom-location" status="default">
            <TextField.Label>위치</TextField.Label>
            <TextField.Textarea value="" placeholder="회의실 위치 정보를 입력해주세요."  onChange={onChangeTextField}/>
          </TextField>
          <div className={classes["images-container"]}>
            <TextField.Label>회의실 사진</TextField.Label>
            <div className={classes["images-wrapper"]}>
              <ImagePlaceholder />
              <ImagePlaceholder />
              <ImagePlaceholder />
            </div>
          </div>
        </Modal.Contents>
        <div className={classes["modal-buttons-wrapper"]}>
          <Button
            label="취소"
            size="medium"
            configuration="text"
            onClick={() => setIsEditModal(false)}
          />
          <Button
            label="회의실 생성"
            size="medium"
            configuration="filled"
          />
        </div>
      </Modal>
    </>
  )
}

interface Props {
  setIsEditModal: (is: boolean) => void,
  meetroom: MeetRoom,
}