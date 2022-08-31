import classes from "./management.module.scss";
import { SVG } from "ui/src/pages"

export const ImagePlaceholder = () => {
  return (
    <>
      <div className={classes["imagePlaceholder-container"]}>
        <SVG width="48px" height="48px" name="add" />
      </div>
    </>
  )
}
