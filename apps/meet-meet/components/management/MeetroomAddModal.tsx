import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useUploadImages, useCreateMeetroom } from "@hooks/queries/meetroom/useMutationQueries";
import { useMeetroomForm } from "@hooks/meetroom/useMeetroomForm";
import { useHandleSuccess } from "@hooks/common/useHandleSuccess";
import meetroomState from "recoil/meetroom";
import classes from "./management.module.scss";

import { MeetRoom } from "graphql/meetroom/types";

import { ImagePlaceholder } from "./ImagePlaceholder";
import { Modal, TextField, Checkbox, Button, Select } from "ui/src/pages"

// TODO: code: -301, message: 이미 존재하는 회의실입니다.
export const MeetroomAddModal = ({setIsAddModal}: Props) => {

  const initialValues = { name: "", seat: "", location: "", mergeRoomId: null, hasMonitor: false };
  const initialImages = new Array(3).fill({ file: null, preview: "" });

  const meetroomList = useRecoilValue(meetroomState);
  const upload = useUploadImages();
  const create = useCreateMeetroom();
  const { handleSuccess } = useHandleSuccess();
  const {
    onChangeTextField,
    onChangeMerge,
    onChangeHasEquipment,
    onDropImages,
    setImages,
    values,
    images,
    isOverThree,
    isOverSize,
    btnState
  } = useMeetroomForm(initialValues, initialImages);

  const onClickCreate = () => {
    if (btnState === "disable") return;
    
    // upload.mutateAsync(images).then(res => {
      // const meetroom = { ...values, images: res.data };
      const meetroom = { ...values, seat: parseInt(values.seat), images: [""] }; // TODO: images s3 url로 수정 
      create.mutateAsync(meetroom);
    // })
  }

  useEffect(() => {
    if (create.isSuccess) {
      handleSuccess({ title: "회의실 생성 완료", setIsModal: setIsAddModal })
    }
  }, [create.isSuccess])

  return (
    <>
      <Modal>
        <Modal.Title type="title-large" weight="700">회의실 생성</Modal.Title>
        <Modal.Contents>
          <TextField name="name" status="default">
            <TextField.Label>이름</TextField.Label>
            <TextField.Input type="text" value={values.name} placeholder="회의실 이름을 입력해주세요." autoFocus onChange={onChangeTextField}/>
            <TextField.HelperText> </TextField.HelperText>
          </TextField>
          <TextField name="meetingroom-merge" status="default">
            <TextField.Label>합칠 수 있는 회의실 이름</TextField.Label>
            <Select isSearch defaultValue="" onChange={onChangeMerge} style={{ width: "100%" }}>
              {meetroomList.map((meetroom: MeetRoom) => {
                const { id, name } = meetroom;
                return <Select.Option key={id} id={String(id)} name={name} />;
              })}
            </Select>
          </TextField>
          <TextField name="seat" status="default">
            <TextField.Label>수용 인원</TextField.Label>
            <TextField.Input type="text" value={values.seat} placeholder="수용 인원을 입력해주세요." onChange={onChangeTextField}>
              <TextField.Unit>명</TextField.Unit>
            </TextField.Input>
          </TextField>
          <TextField name="meetingroom-equipment" status="default">
            <TextField.Label>장비 여부</TextField.Label>
            <Checkbox
              name="monitor"
              id="monitor"
              checked={values.hasMonitor}
              onChange={onChangeHasEquipment}
            >
              <Checkbox.Label>
                모니터
              </Checkbox.Label>
            </Checkbox>
          </TextField>
          <TextField name="location" status="default">
            <TextField.Label>위치</TextField.Label>
            <TextField.Textarea value={values.location} placeholder="회의실 위치 정보를 입력해주세요." onChange={onChangeTextField}/>
          </TextField>
          <div className={classes["images-container"]}>
            <TextField.Label>회의실 사진</TextField.Label>
            <div className={classes["images-wrapper"]}>
              {new Array(3).fill(0).map((_, index) => {
                return <ImagePlaceholder key={index} onChange={onDropImages} preview={images[index]?.preview || undefined} setImages={setImages}  />
              })}
            </div>
          </div>
        </Modal.Contents>
        <div className={classes["modal-buttons-wrapper"]}>
          <Button
            label="취소"
            size="medium"
            configuration="text"
            onClick={() => setIsAddModal(false)}
          />
          <Button
            label="회의실 생성"
            size="medium"
            configuration="filled"
            state={btnState}
            onClick={onClickCreate}
          />
        </div>
      </Modal>
      {isOverThree && (
        <Modal>
          <Modal.Icon name="error" color="warning" />
          <Modal.Contents>
            <Modal.Title>이미지는 3개까지 업로드할 수 있습니다.</Modal.Title>
          </Modal.Contents>
        </Modal>
      )}
      {isOverSize && (
        <Modal>
          <Modal.Icon name="error" color="warning" />
          <Modal.Contents>
            <Modal.Title>이미지는 한 개당 10MB까지 업로드할 수 있습니다.</Modal.Title>
          </Modal.Contents>
        </Modal>
      )}
    </>
  )
}

interface Props {
  setIsAddModal: (is: boolean) => void,
}