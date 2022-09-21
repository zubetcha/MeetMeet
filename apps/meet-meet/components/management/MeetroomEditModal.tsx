import { useEffect, useState } from "react";
import { useMeetroomForm } from "@hooks/meetroom/useMeetroomForm";
import { useRecoilValue } from "recoil";
import { useUploadImages, useUpdateMeetroom, useDeleteImages, useDeleteMeetroom } from "@hooks/queries/meetroom/useMutationQueries";
import { availableMergeState } from "recoil/meetroom";
import classes from "./management.module.scss";

import { MeetRoom, MeetRoomImage, MeetRoomMergeInfo } from "graphql/meetroom/types";
import { S3_BASE_URL } from '../../constants/common';

import { ImagePlaceholder } from "./ImagePlaceholder";
import { ImagePreview } from "./ImagePreview";
import { Modal, TextField, Checkbox, Button, Select, Text } from "ui/src/pages"

/**
 * 회의실 수정 모달
 * 
 * @param param
 * @returns 
 */
export const MeetroomEditModal = ({setIsEditModal, meetroom, imageList, mergeInfo}: Props) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { id, name, location, seat, canMerge, hasMonitor } = meetroom;
  const { availableMergeList } = useRecoilValue(availableMergeState);
  const oldImages = imageList?.map(image => image.url);
  const initialValues = { name, seat: String(seat), location, mergeRoomId: mergeInfo?.mergeRoom?.id || null, hasMonitor };
  const initialImages = new Array(3).fill(0).map((_, index) => {
    return { file: null, url: imageList && imageList[index]?.url || "" }
  });

  const {
    onChangeMerge,
    onChangeTextField,
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

  const [ deleteMeetroom, { data } ] = useDeleteMeetroom();
  const upload = useUploadImages();
  const updateMeetroom = useUpdateMeetroom(setIsEditModal, id as number);
  const deleteImages = useDeleteImages(setIsEditModal, setIsDeleteModal);

  const onClickUpdate = () => {
    if (btnState === "disable") return;

    const newImages = images.filter(image => image.url.includes(S3_BASE_URL)).map(image => image.url);
    const imagesToS3 = images.filter(image => image.url.includes("http://localhost:"));

    if (imagesToS3.length) {
      upload.mutateAsync(imagesToS3)
      .then(res => {
        const info = { ...values, seat: parseInt(values.seat), oldImages, newImages: newImages.concat(res.data) };
        updateMeetroom.mutateAsync({ meetroomId: id, info });
      })
    }

    else if (!imagesToS3.length) {
      const info = { ...values, seat: parseInt(values.seat), oldImages, newImages };
      updateMeetroom.mutateAsync({ meetroomId: id, info });
    }
  }

  const onClickDelete = () => {
    deleteMeetroom({ variables: { id } })
    .then(() => {
      if (oldImages && oldImages.length) {
        deleteImages.mutateAsync(oldImages);
      }
    });
  };

  useEffect(() => {
    const { isError, error }: { isError: boolean, error: any } = updateMeetroom;
    if (isError && error.response.data.code === -301) {
      setIsSameName(true);
    }
  }, [updateMeetroom.error, updateMeetroom.isError])

  return (
    <>
      <Modal setIsOpen={setIsEditModal}>
        <Modal.Title type="title-large" weight="700">회의실 수정</Modal.Title>
        <Modal.Contents>
          <div className={classes["meetroom-form-wrapper"]}>
            <TextField name="name"  status={isSameName ? "danger" : "default"}>
              <TextField.Label>회의실 이름</TextField.Label>
              <TextField.Input type="text" value={values.name} placeholder="회의실 이름을 입력해주세요." autoFocus onChange={onChangeTextField}/>
              <TextField.HelperText>{isSameName && "이미 존재하는 회의실입니다."}</TextField.HelperText>
            </TextField>

            <TextField name="mergeRoom" status="default">
              <TextField.Label>합칠 수 있는 회의실</TextField.Label>
              <Select isSearch defaultValue={mergeInfo?.mergeRoom?.name} onChange={onChangeMerge} style={{ width: "100%" }}>
                {availableMergeList.map((meetroom: MeetRoom) => {
                  const { id, name } = meetroom;
                  return <Select.Option key={id} id={String(id)} name={name} />;
                })}
              </Select>
            </TextField>

            <TextField name="seat" status="default">
              <TextField.Label>수용 인원</TextField.Label>
              <TextField.Input type="text" value={values.seat} placeholder="수용 가능한 인원을 선택해주세요." onChange={onChangeTextField}>
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
                <Checkbox.Label>모니터</Checkbox.Label>
              </Checkbox>
            </TextField>

            <TextField name="location" status="default">
              <TextField.Label>위치</TextField.Label>
              <TextField.Textarea value={values.location} placeholder="회의실 위치 정보를 입력해주세요."  onChange={onChangeTextField}/>
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
            onClick={() => setIsEditModal(false)}
          />
          <Button
            label="회의실 삭제"
            size="medium"
            configuration="outlined"
            state="default"
            onClick={() => setIsDeleteModal(true)}
          />
          <Button
            label="회의실 수정"
            size="medium"
            configuration="filled"
            state={btnState}
            onClick={onClickUpdate}
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
      {isDeleteModal && (
        <Modal>
          <Modal.Icon name="error" color="error"/>
          <Modal.Contents>
            <Modal.Title>회의실을 삭제하시겠습니까?</Modal.Title>
            <Modal.Description>삭제된 회의실 정보는 다시 되돌릴 수 없습니다.</Modal.Description>
          </Modal.Contents>
          <Modal.Buttons>
            <Button
              label="취소"
              size="medium"
              configuration="text"
              state="default"
              onClick={() => setIsDeleteModal(false)}
            />
            <Button
              label="삭제하기"
              size="medium"
              configuration="filled"
              state="default"
              onClick={onClickDelete}
            />
          </Modal.Buttons>
        </Modal>
      )}
    </>
  )
}

interface Props {
  setIsEditModal: (is: boolean) => void,
  meetroom: MeetRoom,
  imageList: MeetRoomImage[] | null | undefined,
  mergeInfo: MeetRoomMergeInfo | null | undefined,
}