import classes from "./Modal.module.scss";

export const ModalButtons = ({children}: Props) => {

  return (
    <>
      <div className={classes["modal-buttonss"]}>
        {children}
      </div>
    </>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element
}