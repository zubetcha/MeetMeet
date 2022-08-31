import { SVG } from "../SVG/SVG";

import classes from "./Card.module.scss";

export const CardExpandButton = () => {

  return (
    <>        
    <div className={classes["expand-button"]}>
      <SVG name="dropdown" />
    </div>
    </>
  )
}

