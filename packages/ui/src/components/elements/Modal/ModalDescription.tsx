import classes from "./Modal.module.scss";

export const ModalDescription = ({children}: Props) => {

  return (
    <>
      <p className={classes["modal-description"]}>
        {children}
      </p>
    </>
  )
}

interface Props {
  children: any;
}