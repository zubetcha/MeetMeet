import classes from "./Modal.module.scss";
import { Text } from "../Text/Text";

export const ModalTitle = ({children}: Props) => {

  return (
    <>
      <p className={classes["modal-title"]}>
        {children}
      </p>
    </>
  )
}

interface Props {
  children: any;

}