import classes from "./Card.module.scss";

interface Props {
  children: JSX.Element[] | JSX.Element;
}



export const CardTitleButtons = ({ children }: Props) => {
  return (
    <div className={classes["title-buttons"]}>{children}</div>
  )
}
