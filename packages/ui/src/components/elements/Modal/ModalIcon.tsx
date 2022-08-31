import classes from "./Modal.module.scss";
import { SVG } from "../SVG/SVG";
import { ColorUnionType } from "../../../types/union.types";

export const ModalIcon = ({name, color}: Props) => {

  return (
    <>
      <div className={classes["modal-icon"]}>
        <SVG name={name} color={color}/>
      </div>
    </>
  )
}

interface Props {
  name: string;
  color: ColorUnionType;
}