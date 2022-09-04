import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useCreateMeetroom } from "@hooks/queries/meetroom/useMutationQueries";
import meetroomState from "recoil/meetroom";
import { convertHeicToJpg, checkBiteValid } from "ui/src/utils";
import classes from "./management.module.scss";

import { MeetRoom } from "graphql/meetroom/types";
import { SelectItemType } from "ui/src/components/elements/Select/types/select.types";
import { StateType } from "ui/src/components/elements/Buttons/types/button.types";

import { ImagePlaceholder } from "./ImagePlaceholder";
import { Modal, TextField, Checkbox, Button, Select } from "ui/src/pages"

export const MeetroomAddModal = ({setIsAddModal}: Props) => {
  const meetroomList = useRecoilValue(meetroomState);

  const [values, setValues] = useState<{ name: string, seat: string, location: string, mergeRoomId: number | null }>({ name: "", seat: "", location: "", mergeRoomId: null })
  const [images, setImages] = useState<{file: File | null, preview: string}[]>(new Array(3).fill({ file: null, preview: "" }));
  const [hasMonitor, setHasMonitor] = useState(false);
  const [isOverThree, setIsOverThree] = useState(false);
  const [isOverSize, setIsOverSize] = useState(false);
  const [btnState, setBtnState] = useState<StateType>("default");

  const { upload, create } = useCreateMeetroom();

  const onChangeMerge = (e: SelectItemType) => {
    setValues({ ...values, mergeRoomId: parseInt(e.id) });
  }

  const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    const _value = name === "seat" ? value.replace(/[^0-9]/g, "") : value;
  
    setValues({ ...values, [name]: _value });
  }

  const onDropImages = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const droppedImages = images.filter((image) => image.file !== null);
    const { files } = e.target;
    const fileList = Object.values(files as FileList);

    // DESCRIBE: 파일 개수 3개 제한 
    if ((droppedImages.length + fileList.length) > 3) {
      console.log("이미지 개수 3개 넘음")
      setIsOverThree(true);
      setTimeout(() => {
        setIsOverThree(false);
      }, 1300);

      return;
    }

    // DESCRIBE: 이미지 크기 확인 
    fileList.forEach((file) => {
      const isOver = checkBiteValid(file.size, "MB", 10);

      if (isOver) {
        setIsOverSize(true);
        setTimeout(() => {
          setIsOverSize(false);
        }, 1300)
        
        return;
      }
    })

    // DESCRIBE: 이미지 확장자 확인 및 heic -> jpg 변환 
    const newFiles = await Promise.all(fileList.map((file: File) => convertHeicToJpg(file)))

    setImages([...droppedImages, ...newFiles]);
  }, [images])

  const onClickCreate = () => {
    if (btnState === "disable") return;

    const form = {...values, hasMonitor}

    upload.mutateAsync(images).then(res => {
      const meetroom = { ...form, images: res.data };
      create.mutateAsync(meetroom);
    })
  }

  useEffect(() => {
    const { name, seat, location } = values;

    if (!name || !seat || !location) {
      setBtnState("disable");
    }
    else if (name && seat && location) {
      setBtnState("default");
    }
  }, [values])

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
              onChange={(checked) => setHasMonitor(prev => !prev)}
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