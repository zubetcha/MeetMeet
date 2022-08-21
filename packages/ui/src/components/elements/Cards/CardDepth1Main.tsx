import classes from "./Card.module.scss";

export const CardDepth1Main = ({children}: Props) => {


  return (
    <>
      <div className={classes["cardDepth1-container"]}>
        {children}
      </div>
    </>
  )
};

interface Props {
  children: JSX.Element[] | JSX.Element;
}