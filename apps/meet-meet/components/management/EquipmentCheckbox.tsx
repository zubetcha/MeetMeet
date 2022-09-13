import classes from "./management.module.scss";
import { SVG, Text } from "ui/src/pages"


export const EquipmentCheckbox = ({ equipment, has }: Props) => {
  return (
    <div className={classes["checkbox-wrapper"]}>
      <SVG name={has ? "checked" : "unchecked"} color={has? "primary" : "onSurface"} />
      <Text type="body-medium" color="on-surface" style={{ fontWeight: "500" }}>{equipment}</Text>
    </div>
  )
}

interface Props {
  equipment: string;
  has: boolean;
}