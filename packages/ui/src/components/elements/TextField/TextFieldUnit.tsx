import classes from "./TextField.module.scss";
import classNames from "classnames";
import { TextFieldStatusUnion } from "./TextField.types";

export const TextFieldUnit = ({children, status = "default"}: Props) => {

  return (
    <>
      <p className={classNames(classes.unit, classes[status])} >
        {children}
      </p>
    </>
  )
}

interface Props {
  children: any;
  status?: TextFieldStatusUnion;
}