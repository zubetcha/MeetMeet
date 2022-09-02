import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import meetroomState from "recoil/meetroom";
import { Meetroom } from "@hooks/meetroom";
import { convertHeicToJpg, checkBiteValid } from "ui/src/utils";
import classes from "./management.module.scss";

import { MeetRoom } from "graphql/meetroom/types";
import { SelectItemType } from "ui/src/components/elements/Select/types/select.types";

import { ImagePlaceholder } from "./ImagePlaceholder";
import { Modal, TextField, Checkbox, Button, Select } from "ui/src/pages"

export const MeetroomAddModal = ({setIsAddModal}: Props) => {
  const meetroom = new Meetroom();
  const meetroomList = useRecoilValue(meetroomState);

  const [values, setValues] = useState({ name: "", seat: "", location: "", mergeRoomId: -1, images: [] })
  const [hasMonitor, setHasMonitor] = useState(false);
  const [isOverThree, setIsOverThree] = useState(false);

  const onChangeMerge = (e: SelectItemType) => {
    setValues({ ...values, mergeRoomId: parseInt(e.id) });
  }

  const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    const _value = name === "seat" ? value.replace(/[^0-9]/g, "") : value;
  
    setValues({ ...values, [name]: _value });
  }

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const fileList = Object.values(files as FileList);

    // DESCRIBE: 파일 개수 3개 제한 
    if (fileList.length > 3) {
      setIsOverThree(true);
      setTimeout(() => {
        setIsOverThree(false);
      }, 1300)
      
      return;
    }

    // DESCRIBE: 이미지 크기, 확장자 확인 및 heic -> jpg 변환 
    const newFiles = fileList.map((file: File) => {
      console.log(file.size)
      return convertHeicToJpg(file);
    });

  }

  const onClickCreate = () => {
    // meetroom.createMeetroom()
  }
  return (
    <>
      <Modal>
        <Modal.Title type="title-large" weight="700">회의실 생성</Modal.Title>
        <Modal.Contents>
          <TextField name="name" status="default">
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
              checked={hasMonitor}
              onChange={(checked) => setHasMonitor(checked)}
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
              <ImagePlaceholder onChange={onChangeImages}/>
              <ImagePlaceholder onChange={onChangeImages} />
              <ImagePlaceholder onChange={onChangeImages} />
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
            onClick={onClickCreate}
          />
        </div>
      </Modal>
      {isOverThree && (
        <Modal>
          <Modal.Icon name="error" color="error" />
          <Modal.Contents>
            <Modal.Description>이미지는 3개까지 업로드할 수 있습니다.</Modal.Description>
          </Modal.Contents>
        </Modal>
      )}
    </>
  )
}

interface Props {
  setIsAddModal: (is: boolean) => void,
}