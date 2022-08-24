import classes from "./management.module.scss";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Modal, TextField, Checkbox, Button, TextArea } from "ui/src/pages"

export const MeetingroomAddModal = () => {
  const onChangeCheckbox = () => {

  }
  return (
    <>
      <Modal>
        <Modal.Title type="title-large" weight="700">회의실 이름</Modal.Title>
        <Modal.Contents>
          <TextField name="meetingroom-name" status="default">
            <TextField.Label>이름</TextField.Label>
            <TextField.Input type="text" value="" placeholder="회의실 이름을 입력해주세요." autoFocus/>
          </TextField>
          <TextField name="meetingroom-merge" status="default">
            <TextField.Label>합칠 수 있는 회의실 이름</TextField.Label>
            <TextField.Input type="text" value="" placeholder="선택해주세요.">
              <TextField.Icon name="dropdown" />
            </TextField.Input>
          </TextField>
          <TextField name="meetingroom-accommodate" status="default">
            <TextField.Label>수용 인원</TextField.Label>
            <TextField.Input type="text" value="" placeholder="수용 인원을 선택해주세요.">
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
            <TextField.Input type="textarea" value="" placeholder="회의실 위치 정보를 입력해주세요." />
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
  setIsAddModal: (is: boolean) => void,
}