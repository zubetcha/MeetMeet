import classes from "./management.module.scss";
import { SVG } from "ui/src/pages"

export const ImagePlaceholder = () => {
  return (
    <>
      <label className={classes["imagePlaceholder-container"]} htmlFor="image-upload">
        <SVG width="48px" height="48px" name="add" />
      </label>
      <input className={classes.input} type="file" id="image-upload" accept=".jpg, .jpeg, .png, .heic" multiple/>
    </>
  )
}
