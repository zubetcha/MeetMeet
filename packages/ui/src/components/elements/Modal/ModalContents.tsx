import classes from "./Modal.module.scss";

export const ModalContents = ({children}: Props) => {

  return (
    <>
      <div className={classes["modal-contents"]}>
        {children}
      </div>
    </>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element
}