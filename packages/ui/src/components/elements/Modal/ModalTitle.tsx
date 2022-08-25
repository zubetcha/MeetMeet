import { Text } from "../Text/Text";
import { TextTypeUnionType } from "../Text/Text.types";
import { ColorUnionType } from "../../../types/union.types";

export const ModalTitle = ({children, type = "title-medium", color = "on-surface", weight = "500"}: Props) => {

  return (
    <>
      <Text type={type} color={color} style={{ fontWeight: weight }}>
        {children}
      </Text>
    </>
  )
}

interface Props {
  children: any;
  type?: TextTypeUnionType;
  color?: ColorUnionType;
  weight: string;
}