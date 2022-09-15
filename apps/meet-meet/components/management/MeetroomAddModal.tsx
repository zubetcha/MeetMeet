import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useUploadImages, useCreateMeetroom } from "@hooks/queries/meetroom/useMutationQueries";
import { useMeetroomForm } from "@hooks/meetroom/useMeetroomForm";
import { availableMergeState } from "recoil/meetroom";
import classes from "./management.module.scss";

import { MeetRoom } from "graphql/meetroom/types";

import { ImagePlaceholder } from "./ImagePlaceholder";
import { ImagePreview } from "./ImagePreview";
import { Modal, TextField, Checkbox, Button, Select, Text } from "ui/src/pages"

/**
 * 회의실 생성 모달
 * 
 * @param {function} setIsAddModal
 * @returns 
 */
export const MeetroomAddModal = ({setIsAddModal}: Props) => {

  const initialValues = { name: "", seat: "", location: "", mergeRoomId: null, hasMonitor: false };
  const initialImages = new Array(3).fill({ file: null, url: "" });

  const { availableMergeList } = useRecoilValue(availableMergeState);
  const upload = useUploadImages();
  const create = useCreateMeetroom(setIsAddModal);
  const {
    onChangeTextField,
    onChangeMerge,
    onChangeHasEquipment,
    onDropImages,
    setImages,
    setIsSameName,
    values,
    images,
    isOverThree,
    isOverSize,
    btnState,
    isSameName
  } = useMeetroomForm(initialValues, initialImages);

  const onClickCreate = () => {
    if (btnState === "disable") return;
    
    upload.mutateAsync(images).then(res => {
      const meetroom = { ...values, images: res.data };
      create.mutateAsync(meetroom);
    })
  }

    useEffect(() => {
    const { isError, error }: { isError: boolean, error: any } = create;
    if (isError && error.response.data.code === -301) {
      setIsSameName(true);
    }
  }, [create.error, create.isError])

  return (
    <>
      <Modal setIsOpen={setIsAddModal}>
        <Modal.Title type="title-large" weight="700">회의실 생성</Modal.Title>
        <Modal.Contents>
          <div className={classes["meetroom-form-wrapper"]}>
            <TextField name="name" status={isSameName ? "danger" : "default"}>
              <TextField.Label>회의실 이름</TextField.Label>
              <TextField.Input type="text" value={values.name} placeholder="회의실 이름을 입력해주세요." autoFocus onChange={onChangeTextField}/>
              <TextField.HelperText>{isSameName && "이미 존재하는 회의실입니다."}</TextField.HelperText>
            </TextField>

            <TextField name="mergeRoom" status="default">
              <TextField.Label>합칠 수 있는 회의실</TextField.Label>
              <Select isSearch defaultValue="" onChange={onChangeMerge} style={{ width: "100%" }}>
                {availableMergeList.map((meetroom: MeetRoom) => {
                  const { id, name } = meetroom;
                  return <Select.Option key={id} id={String(id)} name={name} />;
                })}
              </Select>
            </TextField>

            <TextField name="seat" status="default">
              <TextField.Label>수용 인원</TextField.Label>
              <TextField.Input type="text" value={values.seat} placeholder="수용 가능한 인원을 입력해주세요." onChange={onChangeTextField}>
                <TextField.Unit>명</TextField.Unit>
              </TextField.Input>
            </TextField>

            <TextField name="equipment" status="default">
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

          </div>

          <div className={classes["images-container"]}>
            <Text>회의실 사진</Text>
            <div className={classes["images-wrapper"]}>
              {new Array(3).fill(0).map((_, index) => {
                return images[index]?.url
                ? <ImagePreview key={images[index]?.url} url={images[index]?.url} setImages={setImages} />
                : <ImagePlaceholder key={index} onChange={onDropImages}  />
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