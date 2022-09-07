import { Text } from "../Text/Text";
import { TextTypeUnionType } from "../Text/Text.types";
import { ColorUnionType } from "../../../types/union.types";

export const ModalDescription = ({children, type = "body-medium", color = "on-surface-variant"}: Props) => {

  return (
    <>
      <Text type={type} color={color}>
        {children}
      </Text>
    </>
  )
}

interface Props {
  children: any;
  type?: TextTypeUnionType;
  color?: ColorUnionType;
}