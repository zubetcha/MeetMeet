import { Dispatch, SetStateAction } from "react";
import classes from "./management.module.scss";
import Image from "next/image";
import { SVG, IconButton } from "ui/src/pages"

export const ImagePlaceholder = ({ onChange, preview, setImages }: Props) => {

  const onClickCancel = () => {
    setImages(prev => prev.filter(image => image.preview !== preview));
  }

  if (preview) {
    return (
      <div className={classes["preview-container"]}>
        <Image src={preview} className={classes.preview} width={120} height={120} alt="preview"/>
        <IconButton icon="close" configuration="filled" size="small" state="default" onClick={onClickCancel} />
      </div>
    )
  }
  return (
    <>
      <label className={classes["imagePlaceholder-container"]} htmlFor="image-upload">
        <SVG width="48px" height="48px" name="add" />
      </label>
      <input className={classes.input} type="file" id="image-upload" accept=".jpg, .jpeg, .png, .heic" multiple onChange={(e) => onChange(e)}/>
    </>
  )
}

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
  setImages: Dispatch<SetStateAction<{ file: File | null; preview: string; }[]>>;
}