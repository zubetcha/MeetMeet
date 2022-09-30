import { useState } from "react";
import classNames from "classnames";
import classes from "./management.module.scss";
import { SVG } from "ui/src/pages"

export const ImagePlaceholder = ({ onChange }: Props) => {
  const [fileValue, setFileValue] = useState('')
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setFileValue('')
  }

  if (onChange) {
    return (
    <>
      <div className={classes["imagePlaceholder-container"]}>
        <label className={classNames(classes["imagePlaceholder-wrapper"], classes.onDrop)} htmlFor="image-upload">
          <SVG width="32px" height="32px" name="add" />
        </label>
        <input className={classes.input} onClick={(e) => onClick(e)} type="file" id="image-upload" value={fileValue} accept=".jpg, .jpeg, .png, .heic" multiple onChange={(e) => onChange && onChange(e)}/>
      </div>
    </>
    )
  }

  return (
    <>
      <div className={classes["imagePlaceholder-container"]}>
        <div className={classes["imagePlaceholder-wrapper"]}></div>
      </div>
    </>
  )
}

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}