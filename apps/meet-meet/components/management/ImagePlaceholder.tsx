import classNames from "classnames";
import classes from "./management.module.scss";
import { SVG } from "ui/src/pages"

export const ImagePlaceholder = ({ onChange }: Props) => {

  if (onChange) {
    return (
    <>
      <label className={classNames(classes["imagePlaceholder-container"], classes.onDrop)} htmlFor="image-upload">
        <SVG width="32px" height="32px" name="add" />
      </label>
      <input className={classes.input} type="file" id="image-upload" accept=".jpg, .jpeg, .png, .heic" multiple onChange={(e) => onChange && onChange(e)}/>
    </>
    )
  }

  return (
    <>
      <div className={classes["imagePlaceholder-container"]}>
      </div>
    </>
  )
}

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}