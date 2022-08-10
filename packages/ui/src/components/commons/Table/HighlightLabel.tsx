
import classes from "./table.module.scss";

interface HighlightProps {
  text: string
}

export const HighlightLabel = ({text}: HighlightProps) => {

  return (
    <>
    <div className={`${classes.highlightLabel} ${classes.body3}`}>
      {text}
      </div>
    </>
  )
}