import { Dispatch, SetStateAction } from 'react';
import classes from "./management.module.scss";
import Image from "next/image";
import { IconButton } from 'ui/src/pages';

export const ImagePreview = ({ url, setImages }: Props) => {
  const onClickCancel = () => {
    if (setImages) {
      setImages(prev => prev.filter(image => image.url !== url));
      URL.revokeObjectURL(url as string);
    }
  }
  return (
      <div className={classes["preview-container"]}>
        <div className={classes["preview-wrapper"]}>
          <Image src={url} className={classes.preview} layout="fill" alt="preview"/>
        </div>
        {setImages && (
          <div className={classes["button-wrapper"]}>
            <IconButton icon="close" configuration="filled" size="small" state="default" onClick={onClickCancel} />
          </div>
        )} 
      </div>
  )
}

interface Props {
  url: string;
  setImages?: Dispatch<SetStateAction<{ file: File | null; url: string; }[]>>;
}