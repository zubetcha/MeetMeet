import classes from "./management.module.scss";
import { SVG } from "ui/src/pages"
import React from "react";

export const ImagePlaceholder = ({ onChange }: Props) => {
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
}