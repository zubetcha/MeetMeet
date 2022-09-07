import classes from "./Modal.module.scss";

export const ModalButtons = ({ children }: Props) => {
  return (
    <>
      <div className={classes["modal-buttons"]}>{children}</div>
    </>
  );
};

interface Props {
  children: JSX.Element[] | JSX.Element;
}
