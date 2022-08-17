import classes from "./TextField.module.scss";

export const TextFieldLabel = ({children, name}: Props) => {

  return (
    <>
      <label htmlFor={name} className={classes.label} >
        {children}
      </label>
    </>
  )
}

interface Props {
  children: any;
  name?: string;
}