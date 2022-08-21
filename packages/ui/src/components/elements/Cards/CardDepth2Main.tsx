import classes from "./Card.module.scss";

export const CardDepth2Main = ({children}: Props) => {


  return (
    <>
      <div className={classes["cardDepth2-container"]}>
        {children}
      </div>
    </>
  )
};

interface Props {
  children: JSX.Element[] | JSX.Element;
}