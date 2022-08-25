import classes from "./management.module.scss";
import { SVG, Text } from "ui/src/pages"


export const EquipmentCheckbox = () => {
  return (
    <div className={classes["checkbox-wrapper"]}>
      <SVG name="checked" />
      <Text type="body-medium" color="on-surface" style={{ fontWeight: "500" }}>모니터</Text>
    </div>
  )
}
