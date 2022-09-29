import classes from "./Loading.module.scss";
import { SVG } from "ui/src/pages"

export const LoadingSpinner = () => {
  return (
    <div className={classes.container}>
      <SVG name="loading" color="primary" />
    </div>
  )
}
