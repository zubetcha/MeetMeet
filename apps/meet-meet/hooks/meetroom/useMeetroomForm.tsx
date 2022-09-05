import { useState, useEffect, ChangeEvent, useCallback } from "react"
import { checkBiteValid, convertHeicToJpg } from "ui/src/utils";

import { SelectItemType } from "ui/src/components/elements/Select/types/select.types";
import { StateType } from "ui/src/components/elements/Buttons/types/button.types"

export const useMeetroomForm = (initialValues: meetroomFormType, initialImages: meetroomImagesType[]) => {
    const [values, setValues] = useState<meetroomFormType>(initialValues);
    const [images, setImages] = useState<meetroomImagesType[]>(initialImages);
    const [isOverThree, setIsOverThree] = useState(false);
    const [isOverSize, setIsOverSize] = useState(false);
    const [btnState, setBtnState] = useState<StateType>("disable");

    const onChangeMerge = (e: SelectItemType) => {
        setValues({ ...values, mergeRoomId: parseInt(e.id) });
    };

    const onChangeTextField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, id } = e.target;
        const _value = name === "seat" ? value.replace(/[^0-9]/g, "") : value;
        
        setValues({ ...values, [name]: _value });
    };

    const onChangeHasEquipment = (checked: boolean) => {
      console.log(checked)
        setValues({ ...values, hasMonitor: !values.hasMonitor });
    }

    const onDropImages = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const droppedImages = images.filter((image) => image.preview !== "");
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

    // DESCRIBE: 언마운트 시 상태 초기화 및 객체 url 메모리 해제 
    const clearStates = () => {
      setValues({ name: "", seat: "", location: "", mergeRoomId: null, hasMonitor: false });
      setImages(new Array(3).fill({ file: null, preview: "" }));
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
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

    useEffect(() => {
      return () => clearStates();
    }, [])

    return {
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
    }
};

export interface meetroomFormType {
    name: string;
    seat: string;
    mergeRoomId: number | null;
    location: string;
    hasMonitor: boolean;
}


export interface meetroomImagesType {
    file: File | null;
    preview: string;
}