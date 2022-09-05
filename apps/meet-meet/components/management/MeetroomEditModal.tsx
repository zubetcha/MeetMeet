import { useEffect, useState } from "react";
import { useMeetroomForm } from "@hooks/meetroom/useMeetroomForm";
import { useRecoilValue } from "recoil";
import { useUploadImages, useUpdateMeetroom, useDeleteImages, useDeleteMeetroom } from "@hooks/queries/meetroom/useMutationQueries";
import { useHandleSuccess } from "@hooks/common/useHandleSuccess";
import meetroomState from "recoil/meetroom";
import classes from "./management.module.scss";

import { MeetRoom, MeetRoomImage, MeetRoomMergeInfo } from "graphql/meetroom/types";

import { ImagePlaceholder } from "./ImagePlaceholder";
import { Modal, TextField, Checkbox, Button, Select } from "ui/src/pages"

export const MeetroomEditModal = ({setIsEditModal, meetroom, imageList, mergeInfo}: Props) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { id, name, location, seat, canMerge, hasMonitor } = meetroom;
  const meetroomList = useRecoilValue(meetroomState);
  const imageUrls = imageList?.map((image) => image.url);
  const initialValues = { name, seat: String(seat), location, mergeRoomId: null, hasMonitor };
  const initialImages = new Array(3).fill({ file: null, preview: "" }); // TODO: preview에 imageList의 url 넣어주기 

  const [ deleteMeetroom, { data } ] = useDeleteMeetroom();
  const uploadImages = useUploadImages();
  const updateMeetroom = useUpdateMeetroom();
  const deleteImages = useDeleteImages();
  const { handleSuccess } = useHandleSuccess();
  const {
    onChangeMerge,
    onChangeTextField,
    onChangeHasEquipment,
    onDropImages,
    setImages,
    values,
    images,
    isOverThree,
    isOverSize,
    btnState
  } = useMeetroomForm(initialValues, initialImages);

  const onClickUpdate = () => {
    if (btnState === "disable") return;

    // TODO: images에서 file이 null이 아닌 것만 s3 이미지 업로드 
    // TODO: oldImages: imageList 
    // TODO: newImages: images 중 file이 null이고 preview는 s3 url인 요소들.concat(새로 변환한 s3 url들) 
    // upload.mutateAsync(images).then(res => {
      // const meetroom = { ...values, images: res.data };
      const oldImages = imageList;
      // const newImages = [...images에서 file이 null인 preview들, ...res.data];
      const meetroom = { ...values, seat: parseInt(values.seat), images: [""] }; // TODO: images s3 url로 수정 
      updateMeetroom.mutateAsync(meetroom);
    // })
  }

  const onClickDelete = () => {
    deleteMeetroom({ variables: { id } }).then(({data}) => {
      // deleteImages.mutateAsync({ images: imageList });
      // TODO: s3 이미지 삭제 API 
      if (data.deleteMeetroom.code === 200) {
        handleSuccess({ title: "회의실 삭제 완료", setIsModal: setIsEditModal })
      }
    });
  };

  return (
    <>
      <Modal>
        <Modal.Title type="title-large" weight="700">회의실 수정</Modal.Title>
        <Modal.Contents>

          <TextField name="meetingroom-name" status="default">
            <TextField.Label>이름</TextField.Label>
            <TextField.Input type="text" value={values.name} placeholder="회의실 이름을 입력해주세요." autoFocus onChange={onChangeTextField}/>
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

          <TextField name="meetingroom-accommodate" status="default">
            <TextField.Label>수용 인원</TextField.Label>
            <TextField.Input type="text" value={values.seat} placeholder="수용 인원을 선택해주세요." onChange={onChangeTextField}>
              <TextField.Unit>명</TextField.Unit>
              <TextField.Icon name="dropdown" />
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
              <Checkbox.Label>모니터</Checkbox.Label>
            </Checkbox>
          </TextField>

          <TextField name="meetingroom-location" status="default">
            <TextField.Label>위치</TextField.Label>
            <TextField.Textarea value={values.location} placeholder="회의실 위치 정보를 입력해주세요."  onChange={onChangeTextField}/>
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
  mergeInfo: MeetRoomMergeInfo[] | null | undefined,
}