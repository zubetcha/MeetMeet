import classes from "./Modal.module.scss";

export const ModalIcon = ({children}: Props) => {

  return (
    <>
      <div className={classes["modal-icon"]}>
        {children}
      </div>
    </>
  )
}

interface Props {
  children: JSX.Element;
}